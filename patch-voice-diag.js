// patch-voice-diag.js
// Adds a diagnostic console.log at the very top of the WebSocket upgrade
// handler in lib/voiceGateway.js, logging every relevant header BEFORE any
// origin/auth check runs. This settles definitively whether App Runner's
// load balancer is even delivering the WebSocket upgrade request to the
// Node process, or rejecting it earlier - the current 403 is otherwise
// silent either way, since reject() doesn't log.
//
// Usage (from the project root, same folder as lib/):
//   node patch-voice-diag.js

const fs = require('fs');
const path = 'lib/voiceGateway.js';

let s = fs.readFileSync(path, 'utf8');

if (s.includes('[voice-diag]')) {
  console.log('already patched - no changes made');
  process.exit(0);
}

const needle = "if (url.pathname !== '/ws/voice') return socket.destroy();";
const idx = s.indexOf(needle);
if (idx === -1) {
  console.log('ANCHOR NOT FOUND - lib/voiceGateway.js does not look like the expected file. No changes made.');
  process.exit(1);
}

const insertAfter = idx + needle.length;
const diagLine = "\n\n    console.log('[voice-diag] upgrade received - origin:', req.headers.origin, ' host:', req.headers.host, ' x-forwarded-host:', req.headers['x-forwarded-host'], ' url:', req.url);";

s = s.slice(0, insertAfter) + diagLine + s.slice(insertAfter);
fs.writeFileSync(path, s);

console.log('patched successfully - new file length:', s.length);
