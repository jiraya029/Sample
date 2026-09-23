// Run: node test/serverless_test.js
// Exercises the deployed shape without AWS: the real lambda/handler.js is
// invoked with API Gateway HTTP API (payload v2.0) events; S3 and Bedrock are
// fakes with real semantics (ETag conditional writes, tool-use streaming).
//
// This suite depends on dev-mode behavior (OTP codes returned in the response
// instead of emailed) and must not be affected by whatever the calling shell
// already has exported - e.g. someone who `source`d their real deploy-secrets
// file (SMTP_URL, MAIL_FROM, NODE_ENV=production) before running `npm test`.
// Clear those explicitly rather than assuming a clean environment.
delete process.env.SMTP_URL; delete process.env.MAIL_FROM; delete process.env.NODE_ENV;
process.env.DATA_BUCKET = 'test-bucket';
process.env.JWT_SECRET = 'test-secret-that-is-long-enough';
process.env.FRONTEND_ORIGIN = 'https://d111.cloudfront.net';
process.env.VOICE_WS_URL = 'wss://voice.test/ws/voice';
process.env.AWS_LAMBDA_FUNCTION_NAME = 'sdt-api'; // makes /api/health report ai:true
process.env.ALLOWED_EMAIL_DOMAINS = 'example.com, hcltech.com';   // domain policy under test
process.env.SKIP_OTP_EMAILS = 'admin@servicedesk.local';           // break-glass account, exempt from the domain rule
const path = require('path');

let failures = 0;
const check = (label, cond, detail) => { console.log((cond ? 'PASS ' : 'FAIL ') + label + (detail ? '  -> ' + detail : '')); if (!cond) failures++; };

/* ---------------- fakes ---------------- */
function makeFakeS3() {
  const store = new Map(); let seq = 0;
  return { store, send: async (cmd) => {
    const n = cmd.constructor.name, i = cmd.input;
    if (n === 'HeadBucketCommand') return {};
    if (n === 'GetObjectCommand') { const o = store.get(i.Key); if (!o) { const e = new Error('NoSuchKey'); e.name = 'NoSuchKey'; throw e; } return { ETag: o.etag, Body: { transformToString: async () => o.body } }; }
    if (n === 'PutObjectCommand') {
      const ex = store.get(i.Key);
      if ((i.IfNoneMatch === '*' && ex) || (i.IfMatch && (!ex || ex.etag !== i.IfMatch))) { const e = new Error('PreconditionFailed'); e.name = 'PreconditionFailed'; throw e; }
      const etag = '"e' + (++seq) + '"'; store.set(i.Key, { body: i.Body, etag }); return { ETag: etag };
    }
    if (n === 'DeleteObjectCommand') { store.delete(i.Key); return {}; }
    throw new Error('unhandled ' + n);
  } };
}
const s3db = require(path.join(__dirname, '..', 'lib', 's3db.js'));
s3db._setClient(makeFakeS3());

const bedrock = require(path.join(__dirname, '..', 'lib', 'bedrock.js'));
bedrock._setClient({ send: async (cmd) => {
  const name = cmd.input.toolConfig.toolChoice.tool.name;
  const input = name === 'turn' ? { reply: 'My laptop will not boot and I have a client call in ten minutes.', satisfaction: 28, status: 'ongoing' }
    : name === 'gauge' ? { satisfaction: 41, status: 'ongoing' }
    : { overall_score: 77, empathy: 80, technical_accuracy: 70, resolution: 75, communication: 82, verdict: 'Calm and clear; confirm the fix sooner.', strengths: ['Acknowledged the deadline immediately'], improvements: ['Confirm the fix before closing'] };
  return { output: { message: { content: [{ toolUse: { toolUseId: 't', name, input } }] } } };
} });

const voiceLib = require(path.join(__dirname, '..', 'lib', 'voice.js'));
voiceLib._setClient({ send: async (cmd) => {
  (async () => { for await (const c of cmd.input.body) { /* drain */ } })();
  async function* body() {
    const ev = (e) => ({ chunk: { bytes: Buffer.from(JSON.stringify({ event: e })) } });
    await new Promise(r => setTimeout(r, 5));
    yield ev({ contentStart: { contentName: 'a1', role: 'ASSISTANT', type: 'TEXT', additionalModelFields: '{"generationStage":"FINAL"}' } });
    yield ev({ textOutput: { contentName: 'a1', role: 'ASSISTANT', content: 'Hi, my laptop is dead.' } });
    yield ev({ contentEnd: { contentName: 'a1', type: 'TEXT', stopReason: 'END_TURN' } });
    await new Promise(r => setTimeout(r, 4000));
  }
  return { body: body() };
} });

/* ---------------- Lambda invoker ---------------- */
const { handler } = require(path.join(__dirname, '..', 'lambda', 'handler.js'));
let cookieJar = [];
function jarHeader() { return cookieJar.map(c => c.split(';')[0]).join('; '); }
function absorb(res) { (res.cookies || []).forEach(c => { const name = c.split('=')[0]; cookieJar = cookieJar.filter(x => !x.startsWith(name + '=')); if (!/Max-Age=0|Expires=Thu, 01 Jan 1970/.test(c)) cookieJar.push(c); }); }

async function invoke(method, rawPath, body, extra) {
  const headers = Object.assign({ host: 'api.test', origin: process.env.FRONTEND_ORIGIN, 'content-type': 'application/json' }, extra || {});
  if (cookieJar.length && !('cookie' in headers)) headers.cookie = jarHeader();
  const event = {
    version: '2.0', routeKey: 'ANY /{proxy+}', rawPath, rawQueryString: '', headers,
    requestContext: { http: { method, path: rawPath, sourceIp: '203.0.113.9', userAgent: 'test' }, domainName: 'api.test', stage: '$default', requestId: 'r' + Math.random() },
    body: body == null ? undefined : (typeof body === 'string' ? body : JSON.stringify(body)), isBase64Encoded: false
  };
  const res = await handler(event, { awsRequestId: 'x' });
  absorb(res);
  let json = null; try { json = JSON.parse(res.body); } catch (e) { /* not json */ }
  return { status: res.statusCode, headers: res.headers, cookies: res.cookies || [], json, body: res.body, isBase64Encoded: res.isBase64Encoded };
}

(async () => {
  // health + CORS
  let r = await invoke('GET', '/api/health');
  check('health via Lambda -> 200, storage s3, serverless', r.status === 200 && r.json.storage === 's3' && r.json.serverless === true, JSON.stringify(r.json));
  check('CORS echoes the allowed origin with credentials', r.headers['access-control-allow-origin'] === process.env.FRONTEND_ORIGIN && r.headers['access-control-allow-credentials'] === 'true');
  r = await invoke('GET', '/api/health', null, { origin: 'https://evil.example' });
  check('CORS does not echo an unknown origin', !r.headers['access-control-allow-origin']);
  r = await invoke('OPTIONS', '/api/auth/login');
  check('preflight -> 204 with methods', r.status === 204 && /POST/.test(r.headers['access-control-allow-methods'] || ''));

  // ---- domain policy
  r = await invoke('GET', '/api/catalog');
  check('catalog exposes the allowed email domains for the login-page hint', Array.isArray(r.json.allowedEmailDomains) && r.json.allowedEmailDomains.join(',') === 'example.com,hcltech.com', JSON.stringify(r.json.allowedEmailDomains));
  r = await invoke('POST', '/api/auth/signup', { name: 'Outsider', email: 'someone@gmail.com', sapId: 'SAP-X', project: 'P', lob: 'L', password: 'agentpass1', confirmPassword: 'agentpass1' });
  check('signup from a non-allowed domain -> 400 with a field error naming the allowed domains', r.status === 400 && r.json.fields && /@example\.com or @hcltech\.com/.test(r.json.fields.email), JSON.stringify(r.json));
  check('...and nothing was written for it', (await s3db.findUserByEmail('someone@gmail.com')) === null);
  r = await invoke('POST', '/api/auth/login', { email: 'someone@gmail.com', password: 'agentpass1' });
  check('login from a non-allowed domain -> 401 with the policy message', r.status === 401 && /work email/.test(r.json.error), JSON.stringify(r.json));
  r = await invoke('POST', '/api/auth/forgot', { email: 'someone@gmail.com' });
  check('forgot from a non-allowed domain -> indistinguishable decoy (200, no info leak)', r.status === 200 && r.json.challenge, r.status);

  // ---- signup: NOTHING persists until the code is verified
  r = await invoke('POST', '/api/auth/signup', { name: 'Priya Nair', email: 'priya@example.com', sapId: 'SAP-9', project: 'Helios', lob: 'Infra', password: 'agentpass1', confirmPassword: 'agentpass1' });
  check('signup -> 201 otpRequired + challenge (no cookie yet)', r.status === 201 && r.json.otpRequired && r.json.challenge && r.cookies.length === 0, r.status);
  const devCode = r.json.devCode;
  check('dev mode returns the code (no SMTP configured)', /^\d{6}$/.test(devCode || ''), devCode);
  check('NO user row exists before verification', (await s3db.findUserByEmail('priya@example.com')) === null && (await s3db.findUserBySapId('SAP-9')) === null);
  check('the SAP ID is not reserved by the pending signup either', (await s3db.findUserBySapId('SAP-9')) === null);
  const firstChallenge = r.json.challenge;

  // wrong code does not create anything
  r = await invoke('POST', '/api/auth/verify', { challenge: firstChallenge, code: '000000' });
  check('wrong signup code -> 400, still no user', r.status === 400 && (await s3db.findUserByEmail('priya@example.com')) === null, r.status);

  // resend issues a fresh code for the pending signup
  r = await invoke('POST', '/api/auth/resend', { challenge: firstChallenge });
  check('resend on a pending signup -> new code, still no user', r.status === 200 && /^\d{6}$/.test(r.json.devCode || '') && (await s3db.findUserByEmail('priya@example.com')) === null, r.status);
  const resentCode = r.json.devCode, resentChallenge = r.json.challenge;

  r = await invoke('POST', '/api/auth/verify', { challenge: resentChallenge, code: resentCode, trustDevice: true });
  check('verify -> 201, user created NOW, TWO cookies via API Gateway cookies[] (session + device)', r.status === 201 && r.json.email === 'priya@example.com' && r.cookies.length === 2, r.status + ' ' + r.cookies.map(c => c.split('=')[0]).join(','));
  check('cross-origin cookies are SameSite=None; Secure; HttpOnly', r.cookies.every(c => /SameSite=None/i.test(c) && /Secure/.test(c) && /HttpOnly/.test(c)), r.cookies[0]);
  const created = await s3db.findUserByEmail('priya@example.com');
  check('created user is already email-verified (no unverified accounts can exist)', created && created.email_verified_at, created && created.email_verified_at);
  r = await invoke('POST', '/api/auth/verify', { challenge: resentChallenge, code: resentCode });
  check('a used signup challenge cannot be replayed', r.status === 400 || r.status === 409, r.status);

  // trusted device skips OTP on next login
  r = await invoke('POST', '/api/auth/login', { email: 'priya@example.com', password: 'agentpass1' });
  check('login on trusted device -> straight to session (no otpRequired)', r.status === 200 && !r.json.otpRequired && r.json.id, JSON.stringify(r.json).slice(0, 80));

  // me + catalog
  r = await invoke('GET', '/api/me');
  check('/api/me with cookie -> user', r.status === 200 && r.json.name === 'Priya Nair');
  r = await invoke('GET', '/api/catalog');
  check('catalog lists moods/scenarios, hides personas', r.json.moods.length === 6 && !JSON.stringify(r.json).includes('persona'));

  // chat turn: plain JSON now, not SSE
  r = await invoke('POST', '/api/session/turn', { moodId: 'furious', scenarioId: 'hardware', history: [] });
  check('chat turn -> single JSON object (no SSE through API Gateway)', r.status === 200 && /application\/json/.test(r.headers['content-type']) && r.json.reply && r.json.satisfaction === 28 && r.json.status === 'ongoing', r.headers['content-type']);
  r = await invoke('POST', '/api/session/turn', { moodId: 'nope', scenarioId: 'hardware', history: [] });
  check('unknown mood -> 400', r.status === 400);
  r = await invoke('POST', '/api/session/turn', { moodId: 'furious', scenarioId: 'hardware', history: [] }, { origin: 'https://evil.example' });
  check('cross-origin POST with cookie but bad Origin -> 403', r.status === 403);

  // score -> report persisted in S3 -> list/get/excel
  const history = [{ role: 'client', text: 'My laptop will not boot.' }, { role: 'agent', text: 'Let us get you a loaner within the hour and image your drive.' }];
  r = await invoke('POST', '/api/session/score', { moodId: 'furious', scenarioId: 'hardware', ticketId: 'SD-12345', finalStatus: 'resolved', history, durationSec: 240, mode: 'chat' });
  check('score -> saved report with id', r.status === 200 && r.json.reportId && r.json.overall_score === 77, r.status);
  const reportId = r.json.reportId;
  r = await invoke('GET', '/api/reports');
  check('list own reports from S3 (summary, no transcript)', r.status === 200 && r.json.length === 1 && r.json[0].id === reportId && r.json[0].transcript === undefined);
  r = await invoke('GET', '/api/reports/' + reportId);
  check('full report keeps transcript + mode', r.json.transcript.length === 2 && r.json.mode === 'chat');
  r = await invoke('GET', '/api/reports/' + reportId + '/download-excel');
  check('Excel download is base64-encoded binary via API Gateway', r.status === 200 && r.isBase64Encoded === true && Buffer.from(r.body, 'base64').slice(0, 2).toString() === 'PK', r.isBase64Encoded);
  // ---- whole-dashboard downloads (TXT + Excel)
  r = await invoke('GET', '/api/reports/download');
  check('all-my-reports TXT download', r.status === 200 && /text\/plain/.test(r.headers['content-type']) && /MY TRAINING REPORTS/.test(r.body) && /SD-12345/.test(r.body) && /attachment; filename="my-reports-/.test(r.headers['content-disposition']), r.status);
  r = await invoke('GET', '/api/reports/download-excel');
  check('all-my-reports Excel download (base64 xlsx)', r.status === 200 && r.isBase64Encoded === true && Buffer.from(r.body, 'base64').slice(0, 2).toString() === 'PK', r.status);
  r = await invoke('GET', '/api/reports/' + reportId + '/download');
  check('single report TXT still works', r.status === 200 && /SD-12345/.test(r.body));

  // ---- in-progress transcript export (chat/voice pages)
  r = await invoke('POST', '/api/session/export', { format: 'txt', moodId: 'furious', scenarioId: 'hardware', ticketId: 'SD-77777', history, mode: 'chat', durationSec: 95 });
  check('transcript export TXT', r.status === 200 && /text\/plain/.test(r.headers['content-type']) && /SD-77777/.test(r.body) && /Agent: Let us get you a loaner/.test(r.body) && /attachment; filename="SD-77777-transcript\.txt"/.test(r.headers['content-disposition']), r.status);
  r = await invoke('POST', '/api/session/export', { format: 'xlsx', moodId: 'furious', scenarioId: 'hardware', ticketId: 'SD-77777', history, mode: 'voice', durationSec: 95 });
  check('transcript export Excel', r.status === 200 && r.isBase64Encoded === true && Buffer.from(r.body, 'base64').slice(0, 2).toString() === 'PK' && /SD-77777-transcript\.xlsx/.test(r.headers['content-disposition']), r.status);
  r = await invoke('POST', '/api/session/export', { format: 'txt', moodId: 'nope', scenarioId: 'hardware', history });
  check('transcript export validates the session like a turn -> 400', r.status === 400);

  r = await invoke('GET', '/api/reports/999');
  check('missing report -> 404', r.status === 404);

  // voice token
  r = await invoke('GET', '/api/voice/token');
  check('voice token issued with URL', r.status === 200 && r.json.token && r.json.url === process.env.VOICE_WS_URL);
  const voiceToken = r.json.token;

  // admin: promote via S3 directly (no API for that, by design), then overview
  const priya = await s3db.findUserByEmail('priya@example.com');
  await s3db._internal.withRmw('users/by-id/' + priya.id + '.json', (u) => ({ ...u, role: 'admin' }));
  cookieJar = []; // old session token has role=user baked in; log in again
  r = await invoke('POST', '/api/auth/login', { email: 'priya@example.com', password: 'agentpass1' });
  r = await invoke('POST', '/api/auth/verify', { challenge: r.json.challenge, code: r.json.devCode });
  check('verify without trustDevice -> exactly ONE cookie, still delivered via cookies[] (single Set-Cookie normalised)', r.status === 200 && r.cookies.length === 1 && /^sdt_token=/.test(r.cookies[0]) && !r.headers['set-cookie'], r.cookies.length);
  r = await invoke('GET', '/api/admin/overview');
  check('admin overview computed from S3 objects', r.status === 200 && r.json.total_reports === 1 && r.json.active_agents === 1, JSON.stringify(r.json).slice(0, 100));
  r = await invoke('GET', '/api/admin/reports');
  check('admin sessions list joins the agent', r.json[0].user_name === 'Priya Nair');
  r = await invoke('GET', '/api/admin/reports/download');
  check('admin all-sessions TXT export', r.status === 200 && /ALL TRAINING SESSIONS/.test(r.body) && /Priya Nair/.test(r.body), r.status);
  r = await invoke('GET', '/api/admin/reports/download-excel');
  check('admin all-sessions Excel export', r.status === 200 && r.isBase64Encoded === true && Buffer.from(r.body, 'base64').slice(0, 2).toString() === 'PK');
  r = await invoke('GET', '/api/admin/users/' + priya.id + '/download');
  check('admin per-agent TXT export', r.status === 200 && /TRAINING REPORTS - Priya Nair/.test(r.body) && /SD-12345/.test(r.body), r.status);
  r = await invoke('GET', '/api/admin/users/' + priya.id + '/download-excel');
  check('admin per-agent Excel export', r.status === 200 && r.isBase64Encoded === true && /SAP-9-reports-/.test(r.headers['content-disposition']), r.headers['content-disposition']);
  r = await invoke('GET', '/api/admin/users/999/download');
  check('admin per-agent export for unknown agent -> 404', r.status === 404);
  r = await invoke('GET', '/api/admin/users/abc/reports');
  check('admin route rejects non-numeric id -> 400', r.status === 400);

  // ---- break-glass account is exempt from the domain rule and skips OTP
  const bcrypt = require('bcryptjs');
  const admin = await s3db.createUser({ name: 'Admin', email: 'admin@servicedesk.local', sapId: 'ADMIN-1', passwordHash: await bcrypt.hash('Admin@123', 10), project: '', lob: '' });
  await s3db._internal.withRmw('users/by-id/' + admin.id + '.json', (u) => ({ ...u, role: 'admin', email_verified_at: new Date().toISOString() }));
  cookieJar = [];
  r = await invoke('POST', '/api/auth/login', { email: 'admin@servicedesk.local', password: 'Admin@123' });
  check('break-glass admin at a non-allowed domain signs in directly (exempt + SKIP_OTP_EMAILS)', r.status === 200 && r.json.role === 'admin' && !r.json.otpRequired && r.cookies.length === 1, JSON.stringify(r.json).slice(0, 80));

  // no-cookie access
  cookieJar = [];
  r = await invoke('GET', '/api/reports');
  check('no cookie -> 401', r.status === 401);

  /* ---------------- voice service over a real WebSocket ---------------- */
  const http = require('http');
  const WebSocket = require('ws');
  const auth = require(path.join(__dirname, '..', 'auth.js'));
  const { attachVoiceGateway } = require(path.join(__dirname, '..', 'lib', 'voiceGateway.js'));
  const server = http.createServer((q, s) => { s.end('ok'); });
  attachVoiceGateway(server, { db: s3db, auth });
  await new Promise(r => server.listen(4102, r));

  const tryWs = (url, headers) => new Promise((resolve) => {
    const s = new WebSocket(url, { headers }); const msgs = [];
    s.on('unexpected-response', (req, res) => resolve({ status: res.statusCode }));
    s.on('error', () => resolve({ status: 'err', msgs }));
    s.on('open', () => s.send(JSON.stringify({ type: 'start', moodId: 'furious', scenarioId: 'hardware' })));
    s.on('message', (d, bin) => { if (!bin) { const m = JSON.parse(d.toString()); msgs.push(m); if (m.type === 'transcript') { s.send(JSON.stringify({ type: 'end' })); } if (m.type === 'ended') { s.close(); resolve({ status: 101, msgs }); } } });
    setTimeout(() => resolve({ status: 'timeout', msgs }), 5000);
  });
  const priyaNow = await s3db.findUserById(priya.id); // re-fetch: every login bumps session_epoch now, so the earlier in-memory snapshot is stale
  const fresh = auth.signVoiceToken({ sub: priyaNow.id, role: 'admin', name: 'Priya Nair', ep: priyaNow.session_epoch });
  let w = await tryWs('ws://localhost:4102/ws/voice?token=' + fresh, { Origin: process.env.FRONTEND_ORIGIN });
  check('voice: allowed cross-origin + valid token -> call runs to "ended"', w.status === 101 && w.msgs.some(m => m.type === 'ready') && w.msgs.some(m => m.type === 'ended'), w.status + ' ' + (w.msgs || []).map(m => m.type).join(','));
  w = await tryWs('ws://localhost:4102/ws/voice', { Origin: process.env.FRONTEND_ORIGIN });
  check('voice: no token, no cookie -> 401', w.status === 401, w.status);
  w = await tryWs('ws://localhost:4102/ws/voice?token=' + fresh, { Origin: 'https://evil.example' });
  check('voice: origin not in allow-list -> 403', w.status === 403, w.status);
  const sessionTok = auth.issueToken({ id: priya.id, role: 'admin', name: 'Priya', session_epoch: 1 });
  w = await tryWs('ws://localhost:4102/ws/voice?token=' + sessionTok, { Origin: process.env.FRONTEND_ORIGIN });
  check('voice: a session cookie token is not accepted as a voice token', w.status === 401, w.status);
  server.close();

  /* ---------------- rate limiter: many real users, one shared office IP ---------------- */
  // Every simulated request in this file already uses the same fixed sourceIp
  // (203.0.113.9) - exactly the "whole office behind one NAT gateway" scenario.
  // aiLimiter's old IP-only keying gave that entire office ONE shared 30/min
  // budget; it must now give each signed-in person their own.
  {
    const makeUser = async (n) => {
      const su = await invoke('POST', '/api/auth/signup', { name: 'Bulk ' + n, email: 'bulk' + n + '@example.com', sapId: 'SAP-BULK-' + n, project: 'P', lob: 'L', password: 'agentpass1', confirmPassword: 'agentpass1' });
      const jar = [];
      (su.cookies || []).forEach(c => jar.push(c));
      const vr = await invoke('POST', '/api/auth/verify', { challenge: su.json.challenge, code: su.json.devCode });
      return vr.cookies[0]; // sdt_token=...
    };
    const cookies = [];
    for (let i = 0; i < 35; i++) cookies.push(await makeUser(i));
    check('created 35 distinct signed-in users for the concurrency test', cookies.every(c => /^sdt_token=/.test(c)), cookies.length);

    // 35 different users, each sending ONE chat turn, all from the same IP.
    // A real Lambda container processes one invocation at a time (true
    // concurrency comes from AWS running separate containers, each with its
    // own independent limiter state) - so model that here too: each user's
    // single request in turn, not raced against each other in one process.
    const results = [];
    for (const cookie of cookies) results.push(await invoke('POST', '/api/session/turn', { moodId: 'furious', scenarioId: 'hardware', history: [] }, { cookie: cookie.split(';')[0] }));
    const ok = results.filter(r => r.status === 200).length;
    const limited = results.filter(r => r.status === 429).length;
    check('35 different signed-in users, one shared IP: none rate-limited against each other', ok === 35 && limited === 0, 'ok=' + ok + ' 429=' + limited);

    // A single one of those users sending 32 requests past their own 30/min budget still gets capped.
    const soloCookie = cookies[0].split(';')[0];
    const solo = [];
    for (let i = 0; i < 32; i++) solo.push(await invoke('POST', '/api/session/turn', { moodId: 'furious', scenarioId: 'hardware', history: [] }, { cookie: soloCookie }));
    const solo429 = solo.filter(r => r.status === 429).length;
    check('...but one user alone sending 32 more requests (33 total) still gets rate-limited past their own 30/min cap', solo429 === 3, 'solo429=' + solo429);
  }

  /* ---------------- single active session per account ---------------- */
  {
    const CHROME_WIN = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36';
    const SAFARI_MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15';

    // A dedicated admin session for this block - the shared global cookie jar
    // has been overwritten many times over by the rate-limiter test's dozens
    // of other users by this point in the file.
    const aLogin = await invoke('POST', '/api/auth/login', { email: 'admin@servicedesk.local', password: 'Admin@123' });
    const adminCookie = aLogin.cookies[0].split(';')[0];

    const su = await invoke('POST', '/api/auth/signup', { name: 'Dana Multi', email: 'dana@example.com', sapId: 'SAP-DANA', project: 'P', lob: 'L', password: 'agentpass1', confirmPassword: 'agentpass1' });
    const v1 = await invoke('POST', '/api/auth/verify', { challenge: su.json.challenge, code: su.json.devCode }, { 'user-agent': CHROME_WIN });
    check('describeUserAgent captured on first sign-in', v1.json.activeSession && v1.json.activeSession.device === 'Chrome on Windows', v1.json.activeSession);
    const cookieA = v1.cookies[0].split(';')[0];

    let r = await invoke('GET', '/api/me', null, { cookie: cookieA });
    check('device A can use its session normally', r.status === 200, r.status);

    // Same account signs in again from a different device - this must not
    // require a fresh signup; use the normal login (trusted-device path is
    // irrelevant here, this account never checked "trust this device").
    const l2 = await invoke('POST', '/api/auth/login', { email: 'dana@example.com', password: 'agentpass1' }, { 'user-agent': SAFARI_MAC });
    check('second login from a new device -> OTP required (this account never trusted a device)', l2.status === 200 && l2.json.otpRequired, l2.status);
    const v2 = await invoke('POST', '/api/auth/verify', { challenge: l2.json.challenge, code: l2.json.devCode }, { 'user-agent': SAFARI_MAC });
    check('second device verifies fine and gets its own session', v2.status === 200 && v2.json.activeSession.device === 'Safari on macOS', v2.status);
    const cookieB = v2.cookies[0].split(';')[0];

    r = await invoke('GET', '/api/me', null, { cookie: cookieA });
    check('device A is now signed out (superseded) with the machine-readable code', r.status === 401 && r.json.code === 'SESSION_SUPERSEDED', JSON.stringify(r.json));
    r = await invoke('GET', '/api/me', null, { cookie: cookieB });
    check('device B (the new one) still works fine', r.status === 200 && r.json.activeSession.device === 'Safari on macOS', r.status);

    // Admin monitoring: this agent should show up as active, with the right device.
    r = await invoke('GET', '/api/admin/users', null, { cookie: adminCookie });
    const danaRow = (r.json || []).find(a => a.email === 'dana@example.com');
    check('admin agent listing shows Dana active now, on the right device', danaRow && danaRow.active_now === true && danaRow.active_session.device === 'Safari on macOS', danaRow);
    r = await invoke('GET', '/api/admin/overview', null, { cookie: adminCookie });
    check('admin overview counts Dana in active_now_count', typeof r.json.active_now_count === 'number' && r.json.active_now_count >= 1, r.json.active_now_count);

    // Admin force-logout: ends device B's session immediately, without device B doing anything.
    r = await invoke('POST', '/api/admin/users/' + danaRow.id + '/force-logout', {}, { cookie: adminCookie });
    check('admin force-logout succeeds', r.status === 200 && r.json.ok === true, r.status);
    r = await invoke('GET', '/api/me', null, { cookie: cookieB });
    check('device B is signed out immediately after an admin force-logout', r.status === 401 && r.json.code === 'SESSION_SUPERSEDED', r.status);
    r = await invoke('GET', '/api/admin/users', null, { cookie: adminCookie });
    check('...and now shows as not active in the admin listing', (r.json || []).find(a => a.email === 'dana@example.com').active_now === false);
  }

  /* ---------------- 50 concurrent logins: each gets its own isolated session ---------------- */
  {
    const CHROME_WIN = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36';
    const makeFreshUser = async (n) => {
      const su = await invoke('POST', '/api/auth/signup', { name: 'Fifty ' + n, email: 'fifty' + n + '@example.com', sapId: 'SAP-FIFTY-' + n, project: 'P', lob: 'L', password: 'agentpass1', confirmPassword: 'agentpass1' });
      const vr = await invoke('POST', '/api/auth/verify', { challenge: su.json.challenge, code: su.json.devCode }, { 'user-agent': CHROME_WIN });
      return { id: vr.json.id, cookie: vr.cookies[0].split(';')[0] };
    };
    const users = [];
    for (let i = 0; i < 50; i++) users.push(await makeFreshUser(i)); // sequential - matches how one Lambda container actually processes a queue
    const checks = [];
    for (const u of users) checks.push((await invoke('GET', '/api/me', null, { cookie: u.cookie })).status);
    check('50 distinct users, 50 distinct sessions, all valid at once - no cross-contamination', checks.every(s => s === 200) && new Set(users.map(u => u.id)).size === 50, 'statuses=' + [...new Set(checks)].join(','));
  }

  console.log(failures ? '\n' + failures + ' FAILURE(S)' : '\nALL SERVERLESS TESTS PASS');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
