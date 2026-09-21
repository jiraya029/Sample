#!/usr/bin/env bash
# Resets a user's password directly in the S3 "database", bypassing the
# app entirely (no OTP, no email). Use for accounts that can't receive mail
# (e.g. a bootstrap admin at a fake/internal domain) or when you're locked out.
#
# Edit the three variables below, then run:  bash fixpass.sh
set -euo pipefail

STACK=sdt-prod
REGION=us-east-1
EMAIL="admin@servicedesk.local"
NEWPASS="ChangeMe123"          # <-- edit this to the real new password (8+ chars, letter + number)

echo "Installing bcryptjs (one-off, not saved to package.json)..."
npm install bcryptjs --no-save --no-audit --no-fund >/dev/null

BUCKET=$(aws cloudformation describe-stacks --stack-name "$STACK" --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='DataBucketName'].OutputValue" --output text)
echo "Data bucket: $BUCKET"

EMAIL_HASH=$(node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1]).digest('hex'))" "$EMAIL")

aws s3 cp "s3://$BUCKET/index/users-by-email/$EMAIL_HASH.json" /tmp/idx.json --region "$REGION"
USER_ID=$(node -e "console.log(JSON.parse(require('fs').readFileSync('/tmp/idx.json','utf8')).userId)")
echo "User id: $USER_ID"

aws s3 cp "s3://$BUCKET/users/by-id/$USER_ID.json" /tmp/user.json --region "$REGION"

node -e "
const bcrypt = require('bcryptjs');
const fs = require('fs');
const u = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'));
u.password_hash = bcrypt.hashSync(process.argv[1], 10);
u.session_epoch = (u.session_epoch || 1) + 1;   // invalidates any existing sessions/trusted devices
u.failed_logins = 0;
u.locked_until = null;
fs.writeFileSync('/tmp/user.json', JSON.stringify(u));
console.log('patched user', u.id, u.email);
" "$NEWPASS"

aws s3 cp /tmp/user.json "s3://$BUCKET/users/by-id/$USER_ID.json" --region "$REGION"

echo ""
echo "Done. New password for $EMAIL is: $NEWPASS"
