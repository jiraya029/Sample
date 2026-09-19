# Voice Mode Troubleshooting

Covers the two issues hit while setting up live voice calls: the browser
never asking for microphone permission, and the call failing right after
"Start the call" with credential errors on the server.

---

## 1. Browser never asks for microphone permission

Open the voice page, press **F12 → Console**, and run:

```js
navigator.mediaDevices.getUserMedia({ audio: true }).then(() => console.log('OK')).catch(e => console.log(e.name, e.message))
```

If Chrome/Edge blocks the paste with a warning banner, type `allow pasting`
and press Enter first, then paste again.

The error name tells you the cause.

### `TypeError: Cannot read properties of undefined (reading 'getUserMedia')`

`navigator.mediaDevices` doesn't exist. This means the page is not on a
**secure origin**. Browsers only expose the microphone on `https://` or on
`http://localhost`. Check the address bar:

- `http://localhost:3000` → OK
- `http://127.0.0.1:3000`, `http://<hostname>:3000`, or a LAN IP like
  `http://192.168.x.x:3000` → **blocked**, the API doesn't exist at all

**Fix:** use `http://localhost:3000` exactly. If you need to reach the app
from another device on your network, either put a real TLS certificate in
front of it (e.g. `mkcert`) or, for local testing only, add the origin to
`chrome://flags/#unsafely-treat-insecure-origin-as-secure` and relaunch the
browser.

### `NotAllowedError`

Permission was denied, either by you or by OS/browser policy.

- Click the lock/tune icon left of the address bar → **Site settings →
  Microphone → Allow**, then reload. If you ever clicked "Block" on the
  permission prompt, the browser remembers it and won't ask again.
- **Windows:** check *Settings → Privacy & security → Microphone*. Both
  "Microphone access" and "Let desktop apps access your microphone" must be
  on, or every browser fails silently with this error.
- Confirm the server is sending the right header:
  ```bash
  curl -I http://localhost:3000/voice
  ```
  Look for `Permissions-Policy: ... microphone=(self) ...`. If it says
  `microphone=()` instead, you're running an older build that blocks the mic
  at the header level — update to the version that ships the voice feature.
- Check `http://localhost:3000/api/health` returns `"voice": true`. If it's
  `false`, the server has no Bedrock credentials configured and the setup
  page disables voice mode entirely (see part 2 below).

### `NotFoundError`

No microphone is available — nothing plugged in, or the OS default input
device is disconnected/disabled. Check your OS sound settings for a working
input device.

### `NotReadableError`

Another application (Teams, Zoom, Discord, etc.) has an exclusive lock on the
microphone. Close it and try again.

---

## 2. "The voice connection failed" right after pressing Start

Chat can work perfectly while voice fails — they authenticate to AWS
differently. The browser message is intentionally generic; the real cause is
in the **server log**, not the browser console.

### Find the real error

```bash
pm2 logs sdt --err --lines 30
```
(or check your process manager's log file directly if you're not using pm2)

### `CredentialsProviderError: Could not load credentials from any providers`

This is the one to expect. **Cause:** Bedrock API keys
(`AWS_BEARER_TOKEN_BEDROCK`) work for normal calls like `Converse` /
`ConverseStream` — which is why chat mode works — but Nova Sonic's
bidirectional streaming API (`InvokeModelWithBidirectionalStream`) does not
support bearer tokens. It only accepts classic AWS SigV4 credentials (an
access key + secret key, or an assumed role) and falls through the standard
credential chain (env vars → shared config file → EC2/ECS instance role). On
a VM with no instance role attached — Azure, most bare VMs, etc. — that chain
finds nothing and fails exactly like this.

**Fix:**

1. **Create an IAM user** (or reuse one) with permission to call Nova Sonic:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": ["bedrock:InvokeModelWithBidirectionalStream"],
       "Resource": "arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-sonic-v1:0"
     }]
   }
   ```
   Match the region and model ID to your actual configuration.

2. **Generate an access key** for that user: IAM console → Users → your user
   → Security credentials → Create access key.

3. **Add both to `.env`, alongside the existing bearer token** — keep both,
   they're used for different things:

   ```
   AWS_ACCESS_KEY_ID=AKIA...
   AWS_SECRET_ACCESS_KEY=...
   ```

4. **Restart with the environment actually reloaded.** pm2 caches env vars
   from the first start and a plain `pm2 restart` will not pick up `.env`
   changes:

   ```bash
   pm2 restart sdt --update-env
   ```

   If that still doesn't take, delete and start fresh:

   ```bash
   pm2 delete sdt
   pm2 start server.js --name sdt
   ```

### Other causes of the same generic browser message

If credentials load fine (no `CredentialsProviderError`) but the call still
fails, check the server log for one of these instead:

| Server log shows | Cause | Fix |
| --- | --- | --- |
| `AccessDeniedException` | Nova Sonic model access not granted in the Bedrock console for this account/region (Claude and Nova Sonic are enabled separately) | Bedrock console → **Model access** → grant Amazon Nova Sonic |
| `ValidationException` / `ResourceNotFoundException` | Wrong model ID, or Nova Sonic's streaming API isn't offered in this region | Verify the exact model ID and an available region in your account's Bedrock model catalog; set `BEDROCK_VOICE_MODEL` / `AWS_REGION` accordingly |
| `ThrottlingException` | Rate/quota limit hit | Wait and retry; request a quota increase if it persists |
| Nothing at all in the log after "Start the call" | The WebSocket never reached the server (proxy/firewall stripping the upgrade) | If running behind nginx/Caddy, confirm `Upgrade`/`Connection` headers are forwarded on the proxy config |

---

## Quick reference: two different AWS credentials, two different jobs

| Env var | Used for | Auth type |
| --- | --- | --- |
| `AWS_BEARER_TOKEN_BEDROCK` | Chat + scoring (Claude, via `Converse`/`ConverseStream`) | Bedrock API key |
| `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` | Live voice calls (Nova Sonic, via `InvokeModelWithBidirectionalStream`) | Classic SigV4 |

Both must point at an account/region where the respective model is enabled.
