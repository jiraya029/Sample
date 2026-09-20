# Running `deploy.sh` on Windows (Git Bash)

Notes from getting the serverless deploy script running on a Windows EC2
instance. Covers two gotchas that aren't obvious from the error messages.

---

## Gotcha 1 — `deploy.sh` does nothing in `cmd.exe`

Windows' Command Prompt has no interpreter for `.sh` files. Typing
`deploy.sh` there doesn't error, it just silently does nothing — no output,
no changes, nothing. This is not a bug in the script; **`cmd` can never run
it**, no matter what's on PATH.

**Fix:** always run `deploy.sh` from **Git Bash** (or WSL), never from `cmd`
or PowerShell. If you installed [Git for Windows](https://git-scm.com/download/win),
Git Bash is already on your machine — search the Start menu for "Git Bash."

---

## Gotcha 2 — `sam` works in `cmd` but not in Git Bash

Symptom:
```
$ sam --version        # in cmd.exe
SAM CLI, version 1.166.2

$ sam --version        # in Git Bash
bash: sam: command not found
```

Cause: the SAM CLI installer added itself to the Windows PATH, but Git Bash
builds its own `$PATH` from a slightly different set of sources and doesn't
automatically pick up every entry `cmd` sees — even after reopening the
terminal.

### Fix

**1. Find where SAM actually installed**, using `cmd` (where it works):
```cmd
where sam
```
Typical output:
```
C:\Program Files\Amazon\AWSSAMCLI\bin\sam.exe
```

**2. In Git Bash, add that folder to PATH for the current session:**
```bash
export PATH="$PATH:/c/Program Files/Amazon/AWSSAMCLI/bin"
sam --version
```
Convert the path AWS gave you: `C:\Program Files\Amazon\AWSSAMCLI\bin`
becomes `/c/Program Files/Amazon/AWSSAMCLI/bin` (drive letter lowercase with
a leading slash, backslashes → forward slashes).

**3. Make it stick across future Git Bash sessions**, so you don't have to
`export` every time you open a new window:
```bash
echo 'export PATH="$PATH:/c/Program Files/Amazon/AWSSAMCLI/bin"' >> ~/.bashrc
```
This takes effect in *new* Git Bash windows. The current one already has it
from step 2.

**4. Confirm both tools are visible together, inside Git Bash:**
```bash
aws --version
sam --version
node --version
```
All three should print a version with no errors.

If `where sam` gave a different folder (installers occasionally use
`AWS SAM CLI` with a space, or a different drive), use that exact path in
step 2 instead.

---

## Running the deploy, once both tools work in Git Bash

```bash
cd /c/Users/Administrator/Downloads/service-desk-trainer-v4-serverless
chmod +x infra/deploy.sh    # only needed once

export JWT_SECRET="$(openssl rand -base64 48)"
export ADMIN_EMAIL="you@company.com"
export ADMIN_PASSWORD="a-strong-password-with-a-number1"
export SMTP_URL="smtps://user:pass@smtp.example.com:465"
export MAIL_FROM="Service Desk Trainer <no-reply@example.com>"
export TEXT_MODEL_ID="anthropic.claude-sonnet-4-6-XXXXXXXX-v1:0"   # your exact model id from the Bedrock console
export VOICE_MODEL_ID="amazon.nova-2-sonic-v1:0"                    # your exact model id from the Bedrock console

./infra/deploy.sh sdt-prod us-east-1 --with-voice
```

Notes:
- `export` lines only last for the current terminal session — if you close
  Git Bash and reopen it, re-run them before deploying again (`JWT_SECRET`
  especially: reuse the *same* value every time, don't regenerate it, or
  every signed-in user gets logged out).
- Drop `--with-voice` if Docker Desktop isn't running or you don't want the
  voice service deployed yet.
- First deploy takes 5–15 minutes, mostly CloudFront. It may pause and ask
  `Deploy this changeset? [y/N]:` — type `y`.
- At the end it prints the Frontend, API, and Voice URLs. Open the Frontend
  URL in a browser to use the app.

---

## Quick reference: cmd vs Git Bash on this box

| Task | Shell |
| --- | --- |
| `aws configure`, `aws sts get-caller-identity`, checking tool versions | Either works |
| `./infra/deploy.sh ...` | **Git Bash only** |
| Anything with forward-slash paths, `export`, `chmod` | **Git Bash only** |
