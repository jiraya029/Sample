# Setup guide — Service Desk Trainer (serverless build)

This walks through deploying the `serverless` branch to your AWS account from
a blank slate. Budget about 45 minutes the first time; later deploys are one
command.

What you end up with:

- a public HTTPS URL for the app (CloudFront)
- an API on API Gateway + Lambda
- an S3 bucket holding users and reports
- optionally, an App Runner service for live voice calls

---

## Part 0 — What you need before starting

| Thing | Why | Check |
| --- | --- | --- |
| An AWS account where you can create IAM roles, S3 buckets, Lambda, API Gateway, CloudFront | The stack creates all of these | You can open the IAM console |
| **AWS CLI v2** | Talks to AWS | `aws --version` |
| **AWS SAM CLI** | Builds and deploys the template | `sam --version` |
| **Node.js 22** | Lambda runtime is Node 22; needed for `npm ci` during build | `node --version` |
| **Docker Desktop** | Only if you want voice mode (builds the voice container) | `docker --version` |
| The code: `service-desk-trainer-v4-serverless.zip` (or the repo's `serverless` branch) | | |

Install links: [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html), [Node.js](https://nodejs.org), [Docker](https://www.docker.com/products/docker-desktop/).

**Windows users:** run everything below in **Git Bash** or **WSL**, not PowerShell — `infra/deploy.sh` is a bash script.

---

## Part 1 — Give the AWS CLI credentials that can deploy

The deploy needs to create IAM roles, so it can't run as a locked-down user.

1. In the AWS console go to **IAM → Users → Create user**. Name it something like `sdt-deployer`.
2. Attach permissions: for a first deploy the simplest is the AWS-managed **`AdministratorAccess`** policy. If your organisation won't allow that, the deploy needs create/update/delete on: CloudFormation, S3, Lambda, API Gateway, CloudFront, IAM (roles + policies), App Runner, ECR, and `iam:PassRole`.
3. Open the user → **Security credentials → Create access key** → choose *Command Line Interface* → create. Copy both values.
4. In your terminal:
   ```bash
   aws configure
   ```
   Paste the access key ID and secret, set default region to the one you'll deploy to (e.g. `us-east-1`), output `json`.
5. Confirm it works:
   ```bash
   aws sts get-caller-identity
   ```
   You should see your account id and the `sdt-deployer` ARN.

> This deployer user is only for running deploys from your machine. It is **not** used by the running application — the app uses IAM *roles* the template creates, with only the permissions it needs.

---

## Part 2 — Make sure Bedrock can be used in that region

1. Console region selector (top right) → pick the region you configured in Part 1 (e.g. **US East (N. Virginia)**).
2. Open **Amazon Bedrock → Model catalog**.
3. Confirm **Anthropic Claude Sonnet** and **Amazon Nova Sonic** appear for this region. Model access is enabled automatically on first invocation now, so there's nothing to "request" — but note the exact **model ID** shown for Claude Sonnet (it looks like `anthropic.claude-sonnet-4-5-20250929-v1:0` or an inference-profile id starting `us.`). You'll pass it in Part 4 if it differs from the template default.

> If Nova Sonic isn't listed in your region, voice mode won't work there; pick another region for the whole stack (everything must be in one region).

---

## Part 3 — Get the code onto your machine

```bash
unzip service-desk-trainer-v4-serverless.zip -d service-desk-trainer
cd service-desk-trainer
npm ci
npm test        # optional: runs all three suites locally, no AWS needed
```

All three suites should end in `ALL ... TESTS PASS`. If `npm ci` fails on Node version, install Node 22.

---

## Part 4 — Set the secrets and run the deploy

Everything sensitive is passed as environment variables into the deploy script; nothing is written to disk.

```bash
# Required
export JWT_SECRET="$(openssl rand -base64 48)"        # keep a copy somewhere safe; you'll reuse it on every deploy

# Recommended: bootstrap admin (created once, only if it doesn't exist)
export ADMIN_EMAIL="you@company.com"
export ADMIN_PASSWORD="a-strong-password-with-a-number1"

# Strongly recommended: email for one-time codes (see Part 6 if you don't have SMTP yet)
export SMTP_URL="smtps://USER:PASSWORD@smtp.example.com:465"
export MAIL_FROM="Service Desk Trainer <no-reply@example.com>"

# Only if the model id in Part 2 differed from the default
# export TEXT_MODEL_ID="us.anthropic.claude-sonnet-4-5-20250929-v1:0"
```

Then deploy. Pick a stack name (letters, numbers, hyphens) and the region from Part 1:

```bash
./infra/deploy.sh sdt-prod us-east-1                 # API + frontend, no voice
```
or, if Docker is running and you want voice:
```bash
./infra/deploy.sh sdt-prod us-east-1 --with-voice    # also builds/pushes the voice image and deploys App Runner
```

What happens (5–15 minutes, CloudFront is the slow part):

1. `sam build` bundles the Lambda.
2. `sam deploy` creates the CloudFormation stack: 2 buckets, CloudFront distribution, HTTP API, Lambda + role, and (with `--with-voice`) an ECR repo, roles, and the App Runner service.
3. The script writes the API URL into `public/assets/config.js`, uploads `public/` to the frontend bucket, and invalidates the CloudFront cache.
4. It prints:
   ```
   Frontend : https://d1abc23xyz.cloudfront.net
   API      : https://abcd1234.execute-api.us-east-1.amazonaws.com
   Voice    : wss://xyz.us-east-1.awsapprunner.com/ws/voice   (or "voice disabled")
   ```

**On the very first run** `sam deploy` may ask a couple of interactive questions (confirm changeset, allow IAM role creation). Answer `y`.

> **Reuse the same `JWT_SECRET` on every future deploy.** Changing it signs everyone out and invalidates trusted devices. Put it in a password manager.

---

## Part 5 — Verify it works

1. Open the **API** URL + `/api/health` in a browser:
   ```
   https://abcd1234.execute-api.us-east-1.amazonaws.com/api/health
   ```
   Expect JSON with `"ok":true`, `"storage":"s3"`, `"serverless":true`, and `"mail":true` if you set SMTP.

2. Open the **Frontend** URL. You should see the sign-in page.

3. Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`. You'll be asked for a 6-digit code:
   - If SMTP is configured, it arrives by email.
   - If not, see Part 6 — production never shows or logs the code.

4. Tick **Trust this device for 30 days** so you're not asked every time.

5. You land on the **Admin** page. Create a normal agent account via *Create account* in another browser profile (or incognito) to test the agent flow, run one chat ticket, and check the report appears under both the agent's dashboard and the admin's Sessions tab.

6. If you deployed voice: pick *Live voice call* on the setup page, allow the microphone, and make one call. Then check App Runner → your service → **Logs** for any `[voice]` errors. Nova Sonic's event names were written from documentation and this is the one component I couldn't test against the live service — if it fails, the log line tells you exactly which event mismatched, and they're all in `lib/voice.js`.

---

## Part 6 — Email for one-time codes

Sign-in, sign-up and password reset all require a code emailed to the user. In production, if SMTP isn't configured, **codes are not delivered, not logged, and not shown** (deliberate — see the v3 security notes). So set this up before real users arrive.

**Quick option — Gmail (free):**
1. Google account → Security → 2-Step Verification on → **App passwords** → create one.
2. ```bash
   export SMTP_URL="smtps://you@gmail.com:abcdabcdabcdabcd@smtp.gmail.com:465"
   export MAIL_FROM="Service Desk Trainer <you@gmail.com>"
   ```
   (16-char app password, no spaces; `MAIL_FROM` must be the same Gmail address.)
3. Re-run `./infra/deploy.sh sdt-prod us-east-1` — the script only updates what changed.

**Proper option — Amazon SES** (same account, no extra vendor): verify your sending domain in SES, create SMTP credentials (SES → SMTP settings), and use `smtps://SMTP_USER:SMTP_PASS@email-smtp.us-east-1.amazonaws.com:465`. Note new SES accounts start in *sandbox* mode and can only send to verified addresses until you request production access.

**Testing without any email:** deploy locally instead (`npm start` with `NODE_ENV` unset) — in development the code is returned to the browser. Don't do this in AWS.

---

## Part 7 — Updating the app later

Edit code, then re-run the same command with the same secrets exported:

```bash
export JWT_SECRET="…same value as before…"
./infra/deploy.sh sdt-prod us-east-1 [--with-voice]
```

Frontend-only changes still go through the script (it's what uploads to S3 and clears the CDN cache). Users may need a hard refresh for a minute or two after a deploy because of CloudFront caching.

---

## Part 8 — Optional: your own domain

Out of the box, the frontend and API are on different AWS domains, so cookies use `SameSite=None`. With a custom domain it gets simpler and stricter:

1. Request an ACM certificate **in us-east-1** (CloudFront requires that region) for `app.example.com` and `api.example.com`.
2. Add the certificate + alias to the CloudFront distribution, and a custom domain to the HTTP API, then create the DNS records (Route 53 or your DNS provider).
3. Set `COOKIE_DOMAIN=.example.com` on the Lambda (Lambda → Configuration → Environment variables) and update `FRONTEND_ORIGIN` to `https://app.example.com`.
4. Update `public/assets/config.js` `apiBase` to `https://api.example.com` and re-upload.

This is the one step not automated by the template, since domains and certificates are account-specific.

---

## Part 9 — Costs and switching things off

| Component | Idle cost | Notes |
| --- | --- | --- |
| S3 (2 buckets) | ~$0 | Pennies per GB stored |
| CloudFront | ~$0 | Generous free tier |
| API Gateway + Lambda | $0 when idle | Pay per request; free tier covers a training tool |
| App Runner (voice) | ~$5/month **while running** | App Runner → service → **Pause** when not in use; Resume takes ~1 min |
| Bedrock | per token / per second of audio | Only when sessions run |

To remove everything:
```bash
aws cloudformation delete-stack --stack-name sdt-prod --region us-east-1
```
The two S3 buckets have to be emptied first (CloudFormation won't delete non-empty buckets):
```bash
aws s3 rm s3://<FrontendBucketName> --recursive
aws s3 rm s3://<DataBucketName> --recursive       # this deletes all users and reports
```
Bucket names are in the stack **Outputs** tab.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `sam deploy` fails with `AccessDenied` creating a role | Deployer user lacks IAM permissions | Attach `AdministratorAccess` to `sdt-deployer` for the deploy, or the permission list in Part 1 |
| Frontend loads but every API call fails with a CORS error in the browser console | `config.js` points at the wrong API URL, or the deploy script didn't finish the upload step | Re-run the deploy script; check `https://<frontend>/assets/config.js` shows the right `apiBase` |
| Sign-in says "code sent" but nothing arrives | SMTP not set, or set but wrong | `/api/health` → `"mail"` should be `true`; check SMTP credentials; check spam |
| Chat fails with "client simulator is misconfigured" | Model id wrong for your region, or Bedrock not available in region | Check the id in Bedrock → Model catalog; redeploy with `TEXT_MODEL_ID=…` |
| Voice: "Voice calls are not configured on this deployment" | Deployed without `--with-voice` | Re-run with `--with-voice` (Docker required) |
| Voice: connection fails, App Runner log shows `AccessDeniedException` | Nova Sonic not available in this region / model id wrong | Check Bedrock catalog; redeploy with `VOICE_MODEL_ID=…` |
| Voice: log shows an unrecognised Nova Sonic event | AWS changed an event name since this was written | Event handling is in `lib/voice.js` `handle()`; the log shows the raw event |
| Old UI after a deploy | CloudFront cache | Hard refresh; the invalidation takes 1–2 minutes |
| `./infra/deploy.sh: Permission denied` | Script not executable (Windows checkout) | `chmod +x infra/deploy.sh` or run `bash infra/deploy.sh …` |

For anything else, the three log locations are: **Lambda** (CloudWatch → Log groups → `/aws/lambda/sdt-prod-ApiFunction-…`), **App Runner** (service → Logs), and **CloudFront** (rarely needed).
