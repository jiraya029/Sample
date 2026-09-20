#!/usr/bin/env bash
# Builds and pushes the voice-service image using AWS CodeBuild, so a
# workstation that can't run Docker (e.g. a VM with no nested virtualization,
# which is common on cloud "jump box" VMs) can still produce the image.
#
#   ./infra/build-voice-codebuild.sh <stack-name> <region>
#
# Prints the pushed image URI on success. Feed it straight into deploy.sh:
#
#   IMAGE=$(./infra/build-voice-codebuild.sh sdt-prod us-east-1 | tail -1)
#   VOICE_IMAGE="$IMAGE" ./infra/deploy.sh sdt-prod us-east-1 --with-voice
set -euo pipefail
STACK="${1:?stack name}"; REGION="${2:?region}"
cd "$(dirname "$0")/.."
HELPER_STACK="${STACK}-voice-build-helper"
TAG="$(date +%Y%m%d%H%M%S)"
REPO_NAME="${STACK}-voice"

echo "Making sure the ECR repository exists (idempotent)..." >&2
aws ecr describe-repositories --repository-names "$REPO_NAME" --region "$REGION" >/dev/null 2>&1 \
  || aws ecr create-repository --repository-name "$REPO_NAME" --region "$REGION" >/dev/null

echo "Deploying the CodeBuild helper stack (idempotent - safe to re-run)..." >&2
# A stack that failed on its first-ever create lands in ROLLBACK_COMPLETE, a
# dead end CloudFormation can never update - only delete. Clear it automatically
# so a failed attempt (e.g. a missing IAM permission, now granted) doesn't
# permanently block every retry with a ValidationError.
EXISTING_STATUS=$(aws cloudformation describe-stacks --stack-name "$HELPER_STACK" --region "$REGION" --query 'Stacks[0].StackStatus' --output text 2>/dev/null || echo "NONE")
if [[ "$EXISTING_STATUS" == "ROLLBACK_COMPLETE" ]]; then
  echo "Previous attempt left the stack in ROLLBACK_COMPLETE (dead end) - deleting it first..." >&2
  aws cloudformation delete-stack --stack-name "$HELPER_STACK" --region "$REGION"
  aws cloudformation wait stack-delete-complete --stack-name "$HELPER_STACK" --region "$REGION"
fi

aws cloudformation deploy \
  --template-file infra/codebuild-voice.yaml \
  --stack-name "$HELPER_STACK" \
  --region "$REGION" \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides StackName="$STACK" EcrRepositoryName="$REPO_NAME" \
  --no-fail-on-empty-changeset >&2

out() { aws cloudformation describe-stacks --stack-name "$HELPER_STACK" --region "$REGION" --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text; }
REPO_URI=$(out EcrRepositoryUri)
BUCKET=$(out SourceBucketName)
PROJECT=$(out BuildProjectName)

echo "Zipping source (excluding node_modules, .git, test fixtures)..." >&2
ZIP=/tmp/sdt-voice-source-$TAG.zip
rm -f "$ZIP"

if command -v zip >/dev/null 2>&1; then
  zip -qr "$ZIP" . \
    -x "node_modules/*" ".git/*" ".aws-sam/*" "test/*" "public/*" "*.zip" ".env"
else
  # Some Git Bash installs ship no package manager and no zip.exe (only unzip).
  # Fall back to Windows' own PowerShell Compress-Archive - always present,
  # nothing to install. Stage only the wanted top-level items first, since
  # Compress-Archive has no exclude flag the way `zip -x` does.
  echo "  (zip not found - using PowerShell Compress-Archive instead)" >&2
  STAGE="$(mktemp -d)"
  for item in * .[!.]*; do
    case "$item" in
      node_modules|.git|.aws-sam|test|public|.env|*.zip) continue ;;
    esac
    [ -e "$item" ] || continue
    cp -r "$item" "$STAGE/"
  done
  WIN_STAGE=$(cygpath -w "$STAGE")
  WIN_ZIP=$(cygpath -w "$ZIP")
  # Compress-Archive with a wildcard -Path can silently drop nested files on
  # some PowerShell/Windows combinations (observed: subdirectory contents like
  # infra/buildspec-voice.yml missing from the resulting zip). ZipFile's own
  # .NET API zips a whole directory tree with no wildcard-expansion ambiguity,
  # so use that instead.
  powershell.exe -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${WIN_STAGE}', '${WIN_ZIP}')"
  rm -rf "$STAGE"

  echo "Verifying the archive actually contains infra/buildspec-voice.yml..." >&2
  FOUND=$(powershell.exe -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; \$z = [System.IO.Compression.ZipFile]::OpenRead('${WIN_ZIP}'); (\$z.Entries | Where-Object { \$_.FullName -eq 'infra/buildspec-voice.yml' }).Count; \$z.Dispose()" | tr -d '\r')
  if [[ "$FOUND" != "1" ]]; then
    echo "The generated zip does not contain infra/buildspec-voice.yml (found: ${FOUND:-0} matches)." >&2
    echo "Listing what it does contain, for debugging:" >&2
    powershell.exe -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; \$z = [System.IO.Compression.ZipFile]::OpenRead('${WIN_ZIP}'); \$z.Entries | ForEach-Object { \$_.FullName }; \$z.Dispose()" >&2
    exit 1
  fi
  echo "  confirmed present." >&2
fi

[ -s "$ZIP" ] || { echo "Failed to create the source zip (both zip and Compress-Archive unavailable/failed)." >&2; exit 1; }

echo "Uploading source to s3://${BUCKET}/source.zip ..." >&2
aws s3 cp "$ZIP" "s3://${BUCKET}/source.zip" --region "$REGION" >&2
rm -f "$ZIP"

echo "Starting CodeBuild ($PROJECT), tag=$TAG ..." >&2
BUILD_ID=$(aws codebuild start-build \
  --project-name "$PROJECT" \
  --region "$REGION" \
  --environment-variables-override "name=IMAGE_TAG,value=$TAG,type=PLAINTEXT" \
  --query 'build.id' --output text)

echo "Build started: $BUILD_ID - polling (usually 2-4 minutes)..." >&2
STATUS="IN_PROGRESS"
while [[ "$STATUS" == "IN_PROGRESS" || "$STATUS" == "QUEUED" ]]; do
  sleep 10
  STATUS=$(aws codebuild batch-get-builds --ids "$BUILD_ID" --region "$REGION" --query 'builds[0].buildStatus' --output text)
  echo "  status: $STATUS" >&2
done

if [[ "$STATUS" != "SUCCEEDED" ]]; then
  echo "Build did not succeed (status: $STATUS)." >&2
  echo "Logs:" >&2
  aws codebuild batch-get-builds --ids "$BUILD_ID" --region "$REGION" --query 'builds[0].logs.{group:groupName,stream:streamName}' --output text >&2
  echo "  aws logs tail <group> --log-stream-names <stream> --region $REGION" >&2
  exit 1
fi

IMAGE="${REPO_URI}:${TAG}"
echo "Build succeeded." >&2
echo "$IMAGE"
