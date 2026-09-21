// patch.js
// Inserts the SKIP_OTP_EMAILS break-glass bypass into the login handler in
// server.js, right after the failed-login counter is cleared. Safe to run
// more than once - it checks first and does nothing if already patched.
//
// Usage (from the same folder as server.js):
//   node patch.js

const fs = require('fs');
const path = 'server.js';

let s = fs.readFileSync(path, 'utf8');

if (s.includes('SKIP_OTP_EMAILS')) {
  console.log('already patched - no changes made');
  process.exit(0);
}

const needle = "await db.clearFailedLogins(user.id);";
const idx = s.indexOf(needle);
if (idx === -1) {
  console.log('ANCHOR NOT FOUND - server.js does not look like the expected file. No changes made.');
  process.exit(1);
}

const lineEnd = s.indexOf('\n', idx) + 1;

const inject = [
  '',
  '    const skipOtpEmails = (process.env.SKIP_OTP_EMAILS || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);',
  '    if (skipOtpEmails.includes(email)) {',
  '      await db.markEmailVerified(user.id);',
  '      auth.setAuthCookie(res, auth.issueToken(user));',
  '      return res.json(publicUser(user));',
  '    }',
  ''
].join('\n');

s = s.slice(0, lineEnd) + inject + s.slice(lineEnd);
fs.writeFileSync(path, s);

console.log('patched successfully - new file length:', s.length);
