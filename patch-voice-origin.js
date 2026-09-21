// patch-voice-origin.js
// Adds the FRONTEND_ORIGIN cross-origin allow-list to lib/voiceGateway.js's
// WebSocket upgrade handler, if it's not already there. Safe to run more
// than once - it checks first and does nothing if already patched.
//
// Usage (from the project root, same folder as lib/):
//   node patch-voice-origin.js

const fs = require('fs');
const path = 'lib/voiceGateway.js';

let s = fs.readFileSync(path, 'utf8');

if (s.includes('FRONTEND_ORIGIN')) {
  console.log('already patched - no changes made');
  process.exit(0);
}

const needle = "if (origin) { try { if (new URL(origin).host !== host) return reject(socket, 403); } catch (e) { return reject(socket, 403); } }";
const idx = s.indexOf(needle);
if (idx === -1) {
  console.log('ANCHOR NOT FOUND - lib/voiceGateway.js does not look like the expected file. No changes made.');
  console.log('Paste the output of: grep -n "reject(socket, 403)" lib/voiceGateway.js  so this can be adjusted.');
  process.exit(1);
}

const replacement = [
  "const allowed = (process.env.FRONTEND_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);",
  "    if (origin) { try { if (new URL(origin).host !== host && !allowed.includes(origin)) return reject(socket, 403); } catch (e) { return reject(socket, 403); } }"
].join('\n    ');

s = s.slice(0, idx) + replacement + s.slice(idx + needle.length);
fs.writeFileSync(path, s);

console.log('patched successfully - new file length:', s.length);
