/**
 * Service Desk Trainer - serverless API (Lambda + API Gateway)
 * --------------------------------------------------------------
 * Same Express app as the container build, minus two things that don't fit
 * a request/response Lambda invocation:
 *
 *   - The frontend: now static files on S3 behind CloudFront (see infra/).
 *   - The voice relay: Nova Sonic needs one continuous bidirectional
 *     connection for the whole call, which a stateless, per-invocation Lambda
 *     cannot hold open. It runs on a small always-on Fargate service instead
 *     (see infra/voice-service/, lib/voiceGateway.js). Everything else -
 *     auth, chat, scoring, reports, admin - is genuinely serverless here.
 *
 * One more platform limit worth knowing: API Gateway's Lambda proxy
 * integration buffers the entire response and returns it once, when the
 * invocation finishes - there is no incremental/chunked delivery the way
 * res.write() + res.end() achieves on a real socket. So /api/session/turn
 * is NOT server-sent-events here (unlike the container build); it awaits the
 * full model reply and returns one JSON object. The frontend does a
 * client-side typewriter reveal over that text instead, so the chat still
 * feels alive - the network call itself just isn't streamed.
 *
 *   GET  /api/health
 *   GET  /api/catalog                     moods + scenarios for the setup screen
 *   POST /api/auth/signup                 creates the account, emails a code   -> { challenge }
 *   POST /api/auth/login                  checks password; emails a code unless the device is trusted
 *   POST /api/auth/verify                 { challenge, code, trustDevice } -> session cookie
 *   POST /api/auth/resend                 { challenge } -> new code
 *   POST /api/auth/forgot                 emails a reset code (never leaks account existence)
 *   POST /api/auth/reset                  { challenge, code, password } -> password changed
 *   POST /api/auth/logout
 *   GET  /api/me
 *   POST /api/session/turn                one chat turn -> { reply, satisfaction, status } (see note above)
 *   GET  /api/voice/token                 60s token + URL for the separate voice WebSocket service
 *   POST /api/session/score               end-of-session scoring for chat or voice; saves the report
 *   GET  /api/reports                     my sessions (summaries)
 *   GET  /api/reports/:id                 one full report (owner or admin)
 *   GET  /api/reports/:id/download        TXT
 *   GET  /api/reports/:id/download-excel  XLSX
 *   GET  /api/admin/overview              aggregate stats
 *   GET  /api/admin/reports               all sessions
 *   GET  /api/admin/reports/download-excel
 *   GET  /api/admin/users                 agents with stats
 *   GET  /api/admin/users/:id/reports
 *   POST /api/admin/users/:id/reset-password
 *
 * Local dev:  npm install && npm start  ->  http://localhost:3000 (needs
 * DATA_BUCKET + AWS credentials that can reach it - the same access the
 * Lambda execution role has in the deployed version). Deploy: infra/template.yaml.
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const db = require('./lib/s3db');
const auth = require('./auth');
const ai = require('./lib/bedrock');
const catalog = require('./lib/catalog');
const mailer = require('./lib/mailer');
const excel = require('./lib/excel');

const app = express();
const IS_PROD = process.env.NODE_ENV === 'production';

// API Gateway always sits in front in Lambda, and any reverse proxy in local
// dev; needed for correct client IPs in the rate limiter and `secure` cookies.
app.set('trust proxy', 1);
app.disable('x-powered-by');

/* ------------------------------------------------------------------ */
/* Global middleware                                                   */
/* ------------------------------------------------------------------ */

// The frontend (S3/CloudFront) and this API (API Gateway) are on different
// origins, so unlike the single-origin Docker build this needs real CORS -
// a specific allow-list, not '*', because credentials (the auth cookie) are
// involved and browsers refuse '*' + credentials together.
const ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
// Cross-origin cookies require SameSite=None (and therefore Secure, which API
// Gateway/CloudFront always provide over TLS). If you put the frontend and
// API behind a shared parent domain instead (COOKIE_DOMAIN=.example.com),
// they become same-site and Lax is both valid and safer - auth.js reads this.
const CROSS_SITE_COOKIES = !process.env.COOKIE_DOMAIN;

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(express.json({ limit: '1mb' }));
app.use((err, req, res, next) => {
  // Malformed JSON would otherwise fall through to Express's HTML error page.
  if (err && (err.type === 'entity.parse.failed' || err instanceof SyntaxError)) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }
  next(err);
});
app.use(cookieParser());
app.use(auth.attachUser);

const checkEpoch = auth.makeEpochGuard(db.getSessionEpoch);
const requireAuth = auth.requireAuthWith(checkEpoch);
const requireAdmin = auth.requireAdminWith(checkEpoch);

// s3db.initSchema() just confirms the bucket is reachable (S3 has no schema
// to create) and seeds an admin if configured. Memoised per Lambda execution
// environment, so warm invocations skip the HeadBucket call entirely.
app.use('/api', async (req, res, next) => {
  if (req.path === '/health' || req.path === '/catalog' || req.path === '/session/turn') return next();
  // Anonymous requests to protected routes will 401 anyway; don't wake the DB for them.
  if (!req.user && !req.path.startsWith('/auth/') && req.path !== '/me') return next();
  try { await db.initSchema(); next(); }
  catch (err) {
    console.error('[db] schema init failed:', err.message);
    res.status(503).json({ error: 'The database is not available right now.' });
  }
});

/* ------------------------------------------------------------------ */
/* Rate limits                                                         */
/* ------------------------------------------------------------------ */

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many requests. Slow down and try again shortly.' }
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again later.' }
});
const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 8, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many reset requests. Please try again later.' }
});
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many code attempts. Please wait a few minutes.' }
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, sap_id: u.sap_id, project: u.project, lob: u.lob, role: u.role });
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number(n) || 0));

function fail(res, err, fallback = 'Something went wrong.') {
  const status = err && err.status && err.status >= 400 && err.status < 600 ? err.status : 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 && !(err instanceof ai.ProviderError) ? fallback : err.message });
}

function sendXlsx(res, wb, filename) {
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
  return wb.xlsx.write(res).then(() => res.end());
}

/** Parses a route :id param strictly; returns null (and writes a 400) instead of letting NaN reach the DB. */
function parseId(req, res) {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || String(id) !== String(req.params.id)) { res.status(400).json({ error: 'Invalid id.' }); return null; }
  return id;
}

async function loadReportForViewer(req, res) {
  const id = parseId(req, res);
  if (id === null) return null;
  const report = await db.getReportById(id);
  if (!report) { res.status(404).json({ error: 'Report not found.' }); return null; }
  if (report.user_id !== req.user.sub && req.user.role !== 'admin') { res.status(403).json({ error: 'Access denied.' }); return null; }
  return report;
}

/* ------------------------------------------------------------------ */
/* Public                                                              */
/* ------------------------------------------------------------------ */

app.get('/api/health', (req, res) => {
  // In Lambda the execution role supplies Bedrock credentials, so "configured" means the model id is set.
  const aiConfigured = Boolean(process.env.AWS_BEARER_TOKEN_BEDROCK || process.env.AWS_ACCESS_KEY_ID || process.env.AWS_LAMBDA_FUNCTION_NAME);
  res.json({ ok: true, textModel: ai.MODEL, region: ai.REGION, ai: aiConfigured, voice: Boolean(process.env.VOICE_WS_URL), db: Boolean(process.env.DATA_BUCKET), storage: 's3', mail: mailer.isConfigured(), otp: true, otpBypassActive: Boolean(process.env.SKIP_OTP_EMAILS), serverless: true });
});

app.get('/api/catalog', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.json(catalog.publicCatalog());
});

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

/**
 * Issues a one-time code for `user`, emails it, and returns the signed
 * challenge the browser must echo back with the code. Throttled per account.
 */
async function startOtp(res, user, purpose) {
  if (await db.countRecentOtps(user.id, purpose, 60) >= 6) {
    res.status(429).json({ error: 'Too many codes requested for this account. Try again in an hour.' });
    return null;
  }
  const { code, codeHash, expiresAt } = auth.newOtp(user.id, purpose);
  const otpId = await db.createOtp(user.id, purpose, codeHash, expiresAt);
  const sent = await mailer.sendCode({ to: user.email, name: user.name, code, purpose, ttlMin: auth.OTP_TTL_MIN });
  const out = { challenge: auth.signChallenge({ uid: user.id, otp: otpId, purpose }), email: maskEmail(user.email), ttlMin: auth.OTP_TTL_MIN };
  if (!sent.delivered && !IS_PROD) out.devCode = code; // email not configured: let dev finish the flow
  return out;
}

/** Decoy challenge for unknown accounts so /forgot responses are indistinguishable. */
function decoyOtp(email, purpose) {
  return { challenge: auth.signChallenge({ uid: 0, otp: 0, purpose }), email: maskEmail(email), ttlMin: auth.OTP_TTL_MIN };
}

function maskEmail(e) {
  const [u, d] = String(e).split('@');
  if (!d) return e;
  return (u.length <= 2 ? u[0] + '*' : u.slice(0, 2) + '*'.repeat(Math.min(6, u.length - 2))) + '@' + d;
}

/** Shared code check. Returns the otp row's user id on success, or null after writing an error response. */
async function checkOtp(req, res, purpose) {
  const { challenge, code } = req.body || {};
  const c = auth.readChallenge(challenge, purpose);
  const digits = String(code || '').replace(/\D/g, '');
  if (!c) { res.status(400).json({ error: 'This code has expired. Request a new one.' }); return null; }
  if (digits.length !== 6) { res.status(400).json({ error: 'Enter the 6-digit code.', fields: { code: 'Enter the 6-digit code from your email.' } }); return null; }
  // Decoy challenges (unknown email at signup/forgot) carry uid 0 and never touch the
  // database; run an equivalent-cost dummy check so response time can't distinguish
  // "this account doesn't exist" from "wrong code for a real account".
  const result = c.uid ? await db.verifyOtp(c.otp, c.uid, purpose, auth.hashOtp(c.uid, purpose, digits)) : await db.dummyVerifyOtp();
  if (result === 'ok') return c.uid;
  const msg = result === 'locked' ? 'Too many wrong attempts. Request a new code.'
    : result === 'expired' ? 'This code has expired. Request a new one.'
    : 'That code is not right. Check the email and try again.';
  res.status(400).json({ error: msg, fields: { code: msg }, expired: result !== 'wrong' });
  return null;
}

app.post('/api/auth/signup', authLimiter, auth.sameOrigin, async (req, res) => {
  try {
    const b = req.body || {};
    const name = str(b.name, 80), email = str(b.email, 160).toLowerCase(), sapId = str(b.sapId, 40);
    const project = str(b.project, 80), lob = str(b.lob, 80);
    const { password, confirmPassword } = b;

    const fields = {};
    if (!name) fields.name = 'Enter your full name.';
    if (!email) fields.email = 'Enter your work email.'; else if (!EMAIL_RE.test(email)) fields.email = 'That email address does not look right.';
    if (!sapId) fields.sapId = 'Enter your SAP ID.';
    if (!project) fields.project = 'Project is required.';
    if (!lob) fields.lob = 'Line of Business is required.';
    const pwErr = auth.passwordProblem(password);
    if (pwErr) fields.password = pwErr;
    if (password !== confirmPassword) fields.confirmPassword = 'Passwords do not match.';
    if (Object.keys(fields).length) return res.status(400).json({ error: 'Please fix the highlighted fields.', fields });

    const byEmail = await db.findUserByEmail(email);
    const bySap = await db.findUserBySapId(sapId);

    // A verified account is a real, in-use account: never touch it.
    if (byEmail && byEmail.email_verified_at) return res.status(409).json({ error: 'An account with this email already exists.', fields: { email: 'Already registered. Try signing in.' } });
    if (bySap && bySap.email_verified_at && (!byEmail || bySap.id !== byEmail.id)) return res.status(409).json({ error: 'An account with this SAP ID already exists.', fields: { sapId: 'Already registered.' } });

    // An *unverified* row is just an abandoned signup attempt - nobody proved they own that
    // email, so it never should have permanently reserved it. Reclaim it instead of
    // permanently locking the real owner out with "already exists".
    let user;
    if (byEmail) {
      // If a different unverified row is squatting on this SAP ID, it's equally abandoned; drop it so the reclaim can take the ID.
      if (bySap && bySap.id !== byEmail.id) await db.deleteIfUnverified(bySap.id);
      user = await db.reclaimUnverifiedUser(byEmail.id, { name, sapId, passwordHash: await auth.hashPassword(password), project, lob });
    } else {
      if (bySap) await db.deleteIfUnverified(bySap.id);
      user = await db.createUser({ name, email, sapId, passwordHash: await auth.hashPassword(password), project, lob });
    }
    if (!user) return res.status(409).json({ error: 'An account with this email already exists.', fields: { email: 'Already registered. Try signing in.' } });

    // No cookie yet: the email has to be proven first.
    const otp = await startOtp(res, user, 'login');
    if (otp) res.status(201).json({ otpRequired: true, ...otp });
  } catch (err) { fail(res, err); }
});

app.post('/api/auth/login', authLimiter, auth.sameOrigin, async (req, res) => {
  try {
    const email = str((req.body || {}).email, 160).toLowerCase();
    const password = (req.body || {}).password;
    if (!email || typeof password !== 'string' || !password) return res.status(400).json({ error: 'Enter your email and password.' });

    const user = await db.findUserByEmail(email);
    if (user && user.locked_until && new Date(user.locked_until) > new Date()) {
      // Still run the hash so timing matches.
      await auth.verifyPassword(password, null);
      return res.status(423).json({ error: 'This account is temporarily locked after too many failed attempts. Try again in ' + db.LOCK_MINUTES + ' minutes or reset your password.' });
    }
    const ok = await auth.verifyPassword(password, user && user.password_hash);
    if (!ok) {
      if (user) await db.recordFailedLogin(user.id);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    await db.clearFailedLogins(user.id);

    // Break-glass: a small, explicit allow-list (SKIP_OTP_EMAILS, comma-separated)
    // for accounts that can never receive email - e.g. a bootstrap admin at a
    // fake/internal domain. Off by default; only the exact configured emails
    // are affected, every other account still requires the OTP step below.
    const skipOtpEmails = (process.env.SKIP_OTP_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    if (skipOtpEmails.includes(email)) {
      await db.markEmailVerified(user.id);
      auth.setAuthCookie(res, auth.issueToken(user));
      return res.json(publicUser(user));
    }

    if (auth.deviceTrusted(req, user) && user.email_verified_at) {
      auth.setAuthCookie(res, auth.issueToken(user));
      return res.json(publicUser(user));
    }
    const otp = await startOtp(res, user, 'login');
    if (otp) res.json({ otpRequired: true, ...otp });
  } catch (err) { fail(res, err); }
});

app.post('/api/auth/verify', otpLimiter, auth.sameOrigin, async (req, res) => {
  try {
    const uid = await checkOtp(req, res, 'login');
    if (!uid) return;
    await db.markEmailVerified(uid);
    const user = await db.findUserById(uid);
    if (!user) return res.status(401).json({ error: 'Account not found.' });
    auth.setAuthCookie(res, auth.issueToken(user));
    if ((req.body || {}).trustDevice === true) auth.setDeviceCookie(res, auth.issueDeviceToken(user));
    res.json(publicUser(user));
  } catch (err) { fail(res, err); }
});

app.post('/api/auth/resend', otpLimiter, auth.sameOrigin, async (req, res) => {
  try {
    const { challenge } = req.body || {};
    const c = auth.readChallenge(challenge, 'login') || auth.readChallenge(challenge, 'reset');
    if (!c) return res.status(400).json({ error: 'This sign-in attempt has expired. Start again.' });
    if (!c.uid) return res.json({ ...decoyOtp('', c.purpose), ok: true });
    const user = await db.findUserById(c.uid);
    if (!user) return res.status(400).json({ error: 'Account not found.' });
    const otp = await startOtp(res, user, c.purpose);
    if (otp) res.json({ ok: true, ...otp });
  } catch (err) { fail(res, err); }
});

app.post('/api/auth/logout', auth.sameOrigin, (req, res) => {
  auth.clearAuthCookie(res);
  if ((req.body || {}).forgetDevice) auth.clearDeviceCookie(res);
  res.json({ ok: true });
});

app.get('/api/me', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not signed in.' });
  try {
    if (!(await checkEpoch(req, res))) return;
    const user = await db.findUserById(req.user.sub);
    if (!user) { auth.clearAuthCookie(res); return res.status(401).json({ error: 'Session expired.' }); }
    res.json(publicUser(user));
  } catch (err) { fail(res, err); }
});

// Always answers with a challenge (decoy for unknown emails) so accounts can't be enumerated.
app.post('/api/auth/forgot', forgotLimiter, auth.sameOrigin, async (req, res) => {
  try {
    const email = str((req.body || {}).email, 160).toLowerCase();
    if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'Enter a valid email address.', fields: { email: 'Enter a valid email address.' } });
    const user = await db.findUserByEmail(email);
    if (!user) return res.json({ ok: true, ...decoyOtp(email, 'reset') });
    const otp = await startOtp(res, user, 'reset');
    if (otp) res.json({ ok: true, ...otp });
  } catch (err) {
    console.error('[forgot]', err);
    res.json({ ok: true, ...decoyOtp((req.body || {}).email || '', 'reset') });
  }
});

app.post('/api/auth/reset', otpLimiter, auth.sameOrigin, async (req, res) => {
  try {
    const { password, confirmPassword } = req.body || {};
    const fields = {};
    const pwErr = auth.passwordProblem(password);
    if (pwErr) fields.password = pwErr;
    if (password !== confirmPassword) fields.confirmPassword = 'Passwords do not match.';
    if (Object.keys(fields).length) return res.status(400).json({ error: 'Please fix the highlighted fields.', fields });

    const uid = await checkOtp(req, res, 'reset');
    if (!uid) return;
    await db.setUserPassword(uid, await auth.hashPassword(password));
    await db.markEmailVerified(uid);
    auth.forgetEpoch(uid);
    auth.clearAuthCookie(res); auth.clearDeviceCookie(res);
    res.json({ ok: true });
  } catch (err) { fail(res, err); }
});

/* ------------------------------------------------------------------ */
/* Training session                                                    */
/* ------------------------------------------------------------------ */

function resolveSession(body, res) {
  const mood = catalog.findMood(body.moodId);
  const scenario = catalog.findScenario(body.scenarioId);
  if (!mood || !scenario) { res.status(400).json({ error: 'Unknown mood or scenario.' }); return null; }
  const h = catalog.sanitizeHistory(body.history || []);
  if (!h.ok) { res.status(400).json({ error: h.error }); return null; }
  return { mood, scenario, history: h.history };
}

// Streams `event: partial` (reply-so-far) then `event: done` (full turn), or `event: error`.
// Not server-sent-events here - see the note at the top of this file. One
// await, one JSON response; the frontend does the "live" reveal itself.
app.post('/api/session/turn', aiLimiter, requireAuth, auth.sameOrigin, async (req, res) => {
  const s = resolveSession(req.body || {}, res);
  if (!s) return;
  try {
    const turn = await ai.generateJson(
      catalog.clientSystemPrompt(s.mood, s.scenario), catalog.clientContents(s.history), catalog.TURN_SCHEMA, { toolName: 'turn' }
    );
    const status = ['ongoing', 'resolved', 'escalated'].includes(turn.status) ? turn.status : 'ongoing';
    res.json({ reply: String(turn.reply || '').trim(), satisfaction: Math.round(clamp(turn.satisfaction, 0, 100)), status });
  } catch (err) { fail(res, err, 'The client simulator failed. Try sending again.'); }
});

// Hands the browser a 60-second token to open the voice WebSocket on the
// separate voice service (different origin, so the cookie can't be used).
app.get('/api/voice/token', requireAuth, (req, res) => {
  if (!process.env.VOICE_WS_URL) return res.status(503).json({ error: 'Voice calls are not configured on this deployment.' });
  res.json({ token: auth.signVoiceToken(req.user), url: process.env.VOICE_WS_URL });
});

app.post('/api/session/score', aiLimiter, requireAuth, auth.sameOrigin, async (req, res) => {
  const b = req.body || {};
  const s = resolveSession(b, res);
  if (!s) return;
  const finalStatus = ['resolved', 'escalated', 'ended_by_agent'].includes(b.finalStatus) ? b.finalStatus : 'ended_by_agent';
  if (!s.history.some(m => m.role === 'agent')) return res.status(400).json({ error: 'Send at least one reply before ending the test.' });

  try {
    const mode = b.mode === 'voice' ? 'voice' : 'chat';
    const data = await ai.generateJson(
      catalog.scoringPrompt(s.mood, s.scenario, finalStatus, s.history, mode),
      [{ role: 'user', parts: [{ text: 'Score this session now.' }] }],
      catalog.SCORE_SCHEMA, { toolName: 'score', temperature: 0.3 }
    );

    const report = {
      overall_score: Math.round(clamp(data.overall_score, 0, 100)),
      empathy: Math.round(clamp(data.empathy, 0, 100)),
      technical_accuracy: Math.round(clamp(data.technical_accuracy, 0, 100)),
      resolution: Math.round(clamp(data.resolution, 0, 100)),
      communication: Math.round(clamp(data.communication, 0, 100)),
      verdict: str(data.verdict, 600) || 'No verdict was produced.',
      strengths: Array.isArray(data.strengths) ? data.strengths.slice(0, 6).map(x => str(x, 300)).filter(Boolean) : [],
      improvements: Array.isArray(data.improvements) ? data.improvements.slice(0, 6).map(x => str(x, 300)).filter(Boolean) : []
    };

    const ticketId = /^SD-\d{5,6}$/.test(String(b.ticketId)) ? b.ticketId : 'SD-' + Math.floor(10000 + Math.random() * 89999);
    const saved = await db.createReport(req.user.sub, {
      ticketId, scenario: s.scenario.label, mood: s.mood.label, finalStatus,
      overallScore: report.overall_score, empathy: report.empathy, technicalAccuracy: report.technical_accuracy,
      resolution: report.resolution, communication: report.communication, verdict: report.verdict,
      strengths: report.strengths, improvements: report.improvements, transcript: s.history,
      durationSec: Number.isFinite(Number(b.durationSec)) ? Math.round(clamp(b.durationSec, 0, 86400)) : null, mode
    });
    res.json({ ...report, reportId: saved.id, ticketId, finalStatus, mode, created_at: saved.created_at });
  } catch (err) { fail(res, err, 'Could not generate your report.'); }
});

/* ------------------------------------------------------------------ */
/* Reports (own)                                                       */
/* ------------------------------------------------------------------ */

app.get('/api/reports', requireAuth, async (req, res) => {
  try { res.json(await db.listReportSummariesByUser(req.user.sub)); }
  catch (err) { fail(res, err); }
});

app.get('/api/reports/:id', requireAuth, async (req, res) => {
  try {
    const report = await loadReportForViewer(req, res);
    if (report) res.json(report);
  } catch (err) { fail(res, err); }
});

app.get('/api/reports/:id/download', requireAuth, async (req, res) => {
  try {
    const r = await loadReportForViewer(req, res);
    if (!r) return;
    const outcome = { resolved: 'Resolved', escalated: 'Escalated', ended_by_agent: 'Ended by agent' }[r.final_status] || r.final_status;
    const lines = [
      'SERVICE DESK TRAINING REPORT', '============================', '',
      'Ticket:     ' + r.ticket_id, 'Scenario:   ' + r.scenario, 'Mood:       ' + r.mood, 'Outcome:    ' + outcome,
      'Date:       ' + new Date(r.created_at).toLocaleString(), '',
      'SCORES', '------',
      'Overall:              ' + r.overall_score, 'Empathy:              ' + r.empathy, 'Technical accuracy:   ' + r.technical_accuracy,
      'Resolution:           ' + r.resolution, 'Communication:        ' + r.communication, '',
      'Verdict: ' + r.verdict, '',
      'STRENGTHS', '---------', ...(r.strengths || []).map((s, i) => (i + 1) + '. ' + s), '',
      'IMPROVEMENTS', '------------', ...(r.improvements || []).map((s, i) => (i + 1) + '. ' + s), '',
      'TRANSCRIPT', '----------', ...(r.transcript || []).map(m => (m.role === 'agent' ? 'Agent: ' : 'Client: ') + m.text), ''
    ];
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="' + r.ticket_id + '-report.txt"');
    res.send(lines.join('\n'));
  } catch (err) { fail(res, err); }
});

app.get('/api/reports/:id/download-excel', requireAuth, async (req, res) => {
  try {
    const r = await loadReportForViewer(req, res);
    if (!r) return;
    const user = await db.findUserById(r.user_id);
    await sendXlsx(res, await excel.buildReportWorkbook(r, user), r.ticket_id + '-report.xlsx');
  } catch (err) { fail(res, err); }
});

/* ------------------------------------------------------------------ */
/* Admin                                                               */
/* ------------------------------------------------------------------ */

app.get('/api/admin/overview', requireAdmin, async (req, res) => {
  try { res.json(await db.adminOverview()); } catch (err) { fail(res, err); }
});

app.get('/api/admin/reports', requireAdmin, async (req, res) => {
  try { res.json(await db.listAllReportsWithUsers({ limit: 1000 })); } catch (err) { fail(res, err); }
});

app.get('/api/admin/reports/download-excel', requireAdmin, async (req, res) => {
  try {
    const rows = await db.listAllReportsWithUsers({ limit: 5000 });
    await sendXlsx(res, await excel.buildAllSessionsWorkbook(rows), 'service-desk-sessions-' + new Date().toISOString().slice(0, 10) + '.xlsx');
  } catch (err) { fail(res, err); }
});

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  try { res.json(await db.listUsersWithStats()); } catch (err) { fail(res, err); }
});

app.get('/api/admin/users/:id/reports', requireAdmin, async (req, res) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const user = await db.findUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ user, reports: await db.listReportSummariesByUser(user.id) });
  } catch (err) { fail(res, err); }
});

app.post('/api/admin/users/:id/reset-password', requireAdmin, auth.sameOrigin, async (req, res) => {
  try {
    const { newPassword } = req.body || {};
    const pwErr = auth.passwordProblem(newPassword);
    if (pwErr) return res.status(400).json({ error: pwErr });
    const id = parseId(req, res);
    if (id === null) return;
    const user = await db.findUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    await db.setUserPassword(user.id, await auth.hashPassword(newPassword));
    auth.forgetEpoch(user.id);
    res.json({ ok: true });
  } catch (err) { fail(res, err); }
});

app.all('/api/*', (req, res) => res.status(404).json({ error: 'Not found.' }));
// Anything outside /api/* has no handler here - the frontend is static
// files on S3/CloudFront, not this Lambda.
app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

/* ------------------------------------------------------------------ */
/* Local dev / export                                                  */
/* ------------------------------------------------------------------ */

if (IS_PROD && !mailer.isConfigured()) {
  console.warn('[mailer] SMTP_URL/MAIL_FROM are not set in production. Sign-in, sign-up and password-reset codes cannot be delivered, and (unlike development) they are not printed to the log or returned to the browser.');
}

// In Lambda, lambda/handler.js requires this file for `app` and never reaches
// here. `npm start` for local development runs the same Express app directly
// on a plain port - point the frontend's API base at http://localhost:<PORT>
// and set DATA_BUCKET to a bucket your local AWS credentials can reach.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  db.initSchema()
    .then(() => console.log('[s3db] bucket reachable'))
    .catch(err => console.warn('[s3db] not reachable yet (' + err.message + '). DB-backed routes will 503 until it is.'))
    .finally(() => app.listen(PORT, () => console.log('Service Desk Trainer API (local dev) on http://localhost:' + PORT + '  (text: ' + ai.MODEL + ', region: ' + ai.REGION + ')')));
}

module.exports = app;
