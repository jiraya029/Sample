# Fixing "sam: command not found" in Git Bash on Windows

Follow-up to `WINDOWS_DEPLOY_NOTES.md`. That guide assumed the SAM installer
puts a plain `sam.exe` on the PATH. On some installs it actually creates
**`sam.cmd`** instead — and Git Bash, unlike `cmd.exe` or PowerShell, does
**not** automatically try `.cmd` when you type a bare command name. So PATH
can be perfectly correct and `sam --version` still fails with
`command not found`.

---

## 1. Confirm this is the cause

```bash
where sam
```
If the path it prints ends in **`.cmd`** (not `.exe`), this is the issue:
```
C:\Program Files\Amazon\AWSSAMCLI\bin\sam.cmd
```

Prove the file itself works when called by its full name:
```bash
"/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd" --version
```
Expected: `SAM CLI, version 1.166.2` (or similar). If this prints correctly,
SAM is installed fine — Git Bash just isn't finding it under the plain name
`sam`.

---

## 2. Make `sam` work as a normal command

Adding the folder to PATH is not enough by itself when the file is a
`.cmd`. Define a small wrapper function instead.

**Add it to your profile**, so every future Git Bash window has it
automatically:
```bash
echo 'sam() { "/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd" "$@"; }' >> ~/.bash_profile
```
Use the exact path `where sam` printed for you, converted to bash style
(`C:\...` → `/c/...`, backslashes → forward slashes).

> Git Bash reads **`~/.bash_profile`** on startup by default. If your setup
> actually uses `~/.bashrc` instead, appending to the other file silently
> does nothing — that's a common reason this "doesn't work" on the first try.

---

## 3. Load it without restarting the terminal

A profile file is only read when a shell **starts**, so appending to it does
nothing for a window that's already open. Reload it into the current
session instead of closing and reopening:
```bash
source ~/.bash_profile
sam --version
```

If that still says `command not found` (meaning this Git Bash reads
`.bashrc`, not `.bash_profile`), define the function directly for this
session to keep moving, then fix the file afterward:
```bash
sam() { "/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd" "$@"; }
sam --version
```

---

## 4. Important: export the function before running deploy.sh

`deploy.sh` calls `sam build` / `sam deploy` from a **separate bash
process** that the script spawns. A shell function defined only in your
interactive terminal is *not* automatically visible to that child process —
only exported functions and variables are. Without this step, `sam` works
when you type it directly but the script still fails with
`sam: command not found` internally.

```bash
export -f sam
```

Run this once per terminal session, right after defining/loading the
function, before calling `./infra/deploy.sh`.

---

## Full working sequence

```bash
# one-time, or after opening a fresh window if step 2 was just added to the profile
source ~/.bash_profile
sam --version          # confirm it works standalone
export -f sam          # make it visible to deploy.sh's child process

# secrets for this deploy
export JWT_SECRET="$(openssl rand -base64 48)"
export ADMIN_EMAIL="you@company.com"
export ADMIN_PASSWORD="a-strong-password-with-a-number1"
export SMTP_URL="smtps://user:pass@smtp.example.com:465"
export MAIL_FROM="Service Desk Trainer <no-reply@example.com>"
export TEXT_MODEL_ID="anthropic.claude-sonnet-4-6-XXXXXXXX-v1:0"
export VOICE_MODEL_ID="amazon.nova-2-sonic-v1:0"

./infra/deploy.sh sdt-prod us-east-1 --with-voice
```

---

## Alternative: skip the wrapper entirely

If the function approach keeps being fiddly, the more permanent fix is to
add the SAM CLI folder to the **Windows system PATH** (not just Git Bash's),
which makes `cmd`, PowerShell, and Git Bash all resolve `sam` the normal
way without any wrapper:

1. Windows search → "Environment Variables" → **Edit the system environment
   variables**
2. **Environment Variables...** → under **System variables**, select `Path`
   → **Edit** → **New** → paste the folder (not the file):
   ```
   C:\Program Files\Amazon\AWSSAMCLI\bin
   ```
3. OK out of all dialogs, close **every** open terminal window completely,
   open a fresh Git Bash
4. `sam --version`

This still may or may not resolve `.cmd` automatically depending on your
Git Bash version — if it doesn't, fall back to the wrapper-function
approach above.
