https://service-desk-trainer.vercel.app/

http://172.198.131.2:3000/setup


echo 'sam() { "/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd" "$@"; }' >> ~/.bash_profile

IMAGE=$(./infra/build-voice-codebuild.sh sdt-prod us-east-1 | tail -1)
VOICE_IMAGE="$IMAGE" ./infra/deploy.sh sdt-prod us-east-1 --with-voice


./infra/build-voice-codebuild.sh sdt-prod us-east-1

IMAGE=$(./infra/build-voice-codebuild.sh sdt-prod us-east-1 | tail -1)
VOICE_IMAGE="$IMAGE" ./infra/deploy.sh sdt-prod us-east-1 --with-voice


aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1 --max-items 10


aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1 \
  --query "StackEvents[?ResourceStatus=='CREATE_FAILED']" --output json
export AWS_PAGER=""
aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1 \
  --query "StackEvents[?ResourceStatus=='CREATE_FAILED']" --output json

aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs" --output table




export AWS_PAGER=""
aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1 \
  --query "StackEvents[?ResourceStatus=='CREATE_FAILED']" --output json
  
  
  
  
  aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1 --output json | grep -A2 "CREATE_FAILED\|ResourceStatusReason"



$ aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1
--query "StackEvents[?ResourceStatus=='CREATE_FAILED']" --output json
{
    "StackEvents": [
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "484f8d30-b520-11f1-875b-0affeee5a513",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "6029620a-c826-4d2f-bba0-f2a891bd9ce1",
            "LogicalResourceId": "sdt-prod-voice-build-helper",
            "PhysicalResourceId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "ResourceType": "AWS::CloudFormation::Stack",
            "Timestamp": "2026-09-20T18:22:48.176000+00:00",
            "ResourceStatus": "ROLLBACK_COMPLETE",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "SourceBucket-DELETE_COMPLETE-2026-09-20T18:22:47.729Z",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "6029620a-c826-4d2f-bba0-f2a891bd9ce1",
            "LogicalResourceId": "SourceBucket",
            "PhysicalResourceId": "sdt-prod-voice-build-helper-sourcebucket-x5yoad8nxwoq",
            "ResourceType": "AWS::S3::Bucket",
            "Timestamp": "2026-09-20T18:22:47.729000+00:00",
            "ResourceStatus": "DELETE_COMPLETE",
            "ResourceProperties": "{\"PublicAccessBlockConfiguration\":{\"RestrictPublicBuckets\":\"true\",\"BlockPublicPolicy\":\"true\",\"BlockPublicAcls\":\"true\",\"IgnorePublicAcls\":\"true\"},\"LifecycleConfiguration\":{\"Rules\":[{\"Status\":\"Enabled\",\"ExpirationInDays\":\"7\",\"Id\":\"expire-source-zips\"}]}}",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "SourceBucket-DELETE_IN_PROGRESS-2026-09-20T18:22:46.363Z",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "6029620a-c826-4d2f-bba0-f2a891bd9ce1",
            "LogicalResourceId": "SourceBucket",
            "PhysicalResourceId": "sdt-prod-voice-build-helper-sourcebucket-x5yoad8nxwoq",
            "ResourceType": "AWS::S3::Bucket",
            "Timestamp": "2026-09-20T18:22:46.363000+00:00",
            "ResourceStatus": "DELETE_IN_PROGRESS",
            "ResourceProperties": "{\"PublicAccessBlockConfiguration\":{\"RestrictPublicBuckets\":\"true\",\"BlockPublicPolicy\":\"true\",\"BlockPublicAcls\":\"true\",\"IgnorePublicAcls\":\"true\"},\"LifecycleConfiguration\":{\"Rules\":[{\"Status\":\"Enabled\",\"ExpirationInDays\":\"7\",\"Id\":\"expire-source-zips\"}]}}",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "4644a200-b520-11f1-97f2-0affce96bf47",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "6029620a-c826-4d2f-bba0-f2a891bd9ce1",
            "LogicalResourceId": "sdt-prod-voice-build-helper",
            "PhysicalResourceId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "ResourceType": "AWS::CloudFormation::Stack",
            "Timestamp": "2026-09-20T18:22:44.735000+00:00",
            "ResourceStatus": "ROLLBACK_IN_PROGRESS",
            "ResourceStatusReason": "The following resource(s) failed to create: [SourceBucket]. Rollback requested by user.",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "SourceBucket-CREATE_FAILED-2026-09-20T18:22:44.397Z",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "cea3eb6e-f3c7-4cea-84a9-49cfd2146662",
            "LogicalResourceId": "SourceBucket",
            "PhysicalResourceId": "sdt-prod-voice-build-helper-sourcebucket-x5yoad8nxwoq",
            "ResourceType": "AWS::S3::Bucket",
            "Timestamp": "2026-09-20T18:22:44.397000+00:00",
            "ResourceStatus": "CREATE_FAILED",
            "ResourceStatusReason": "Resource handler returned message: \"User: arn:aws:iam::786944814826:user/sdt-deployer is not authorized to perform: s3:PutLifecycleConfiguration on resource: \"arn:aws:s3:::sdt-prod-voice-build-helper-sourcebucket-x5yoad8nxwoq\" because no identity-based policy allows the s3:PutLifecycleConfiguration action (Service: S3, Status Code: 403, Request ID: SMCKMFKT6ZG23WW7, Extended Request ID: 7JFSmEiw8F3zx+Z3NTkMu+ibtCpjozcsCuhrFT7YHSll/KtQTNihKMkZP8C2prcX9/63PdrlAys=) (SDK Attempt Count: 1)\" (RequestToken: 73116b8a-fc34-1160-4cf4-e0cf8f9b4911, HandlerErrorCode: GeneralServiceException)",
            "ResourceProperties": "{\"PublicAccessBlockConfiguration\":{\"RestrictPublicBuckets\":\"true\",\"BlockPublicPolicy\":\"true\",\"BlockPublicAcls\":\"true\",\"IgnorePublicAcls\":\"true\"},\"LifecycleConfiguration\":{\"Rules\":[{\"Status\":\"Enabled\",\"ExpirationInDays\":\"7\",\"Id\":\"expire-source-zips\"}]}}",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "SourceBucket-CREATE_IN_PROGRESS-2026-09-20T18:22:42.378Z",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "cea3eb6e-f3c7-4cea-84a9-49cfd2146662",
            "LogicalResourceId": "SourceBucket",
            "PhysicalResourceId": "sdt-prod-voice-build-helper-sourcebucket-x5yoad8nxwoq",
            "ResourceType": "AWS::S3::Bucket",
            "Timestamp": "2026-09-20T18:22:42.378000+00:00",
            "ResourceStatus": "CREATE_IN_PROGRESS",
            "ResourceStatusReason": "Resource creation Initiated",
            "ResourceProperties": "{\"PublicAccessBlockConfiguration\":{\"RestrictPublicBuckets\":\"true\",\"BlockPublicPolicy\":\"true\",\"BlockPublicAcls\":\"true\",\"IgnorePublicAcls\":\"true\"},\"LifecycleConfiguration\":{\"Rules\":[{\"Status\":\"Enabled\",\"ExpirationInDays\":\"7\",\"Id\":\"expire-source-zips\"}]}}",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "SourceBucket-CREATE_IN_PROGRESS-2026-09-20T18:22:41.334Z",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "cea3eb6e-f3c7-4cea-84a9-49cfd2146662",
            "LogicalResourceId": "SourceBucket",
            "PhysicalResourceId": "",
            "ResourceType": "AWS::S3::Bucket",
            "Timestamp": "2026-09-20T18:22:41.334000+00:00",
            "ResourceStatus": "CREATE_IN_PROGRESS",
            "ResourceProperties": "{\"PublicAccessBlockConfiguration\":{\"RestrictPublicBuckets\":\"true\",\"BlockPublicPolicy\":\"true\",\"BlockPublicAcls\":\"true\",\"IgnorePublicAcls\":\"true\"},\"LifecycleConfiguration\":{\"Rules\":[{\"Status\":\"Enabled\",\"ExpirationInDays\":\"7\",\"Id\":\"expire-source-zips\"}]}}",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "42dd8230-b520-11f1-8c2e-0e9cffe0e837",
            "StackName": "sdt-prod-voice-build-helper",
            "OperationId": "cea3eb6e-f3c7-4cea-84a9-49cfd2146662",
            "LogicalResourceId": "sdt-prod-voice-build-helper",
            "PhysicalResourceId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "ResourceType": "AWS::CloudFormation::Stack",
            "Timestamp": "2026-09-20T18:22:39.036000+00:00",
            "ResourceStatus": "CREATE_IN_PROGRESS",
            "ResourceStatusReason": "User Initiated",
            "ClientRequestToken": "e2857d3e-fb10-4fe1-ad33-a90f37b9bebe"
        },
        {
            "StackId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "EventId": "9aca2a30-b51f-11f1-8ab4-0ea8ca75f949",
            "StackName": "sdt-prod-voice-build-helper",
            "LogicalResourceId": "sdt-prod-voice-build-helper",
            "PhysicalResourceId": "arn:aws:cloudformation:us-east-1:786944814826:stack/sdt-prod-voice-build-helper/9acac670-b51f-11f1-8ab4-0ea8ca75f949",
            "ResourceType": "AWS::CloudFormation::Stack",
            "Timestamp": "2026-09-20T18:17:57.159000+00:00",
            "ResourceStatus": "REVIEW_IN_PROGRESS",
            "ResourceStatusReason": "User Initiated"
        }
    ]
}









aws cloudformation delete-stack --stack-name sdt-prod-voice-build-helper --region us-east-1
aws cloudformation wait stack-delete-complete --stack-name sdt-prod-voice-build-helper --region us-east-1


aws cloudformation delete-stack --stack-name sdt-prod-voice-build-helper --region us-east-1
aws cloudformation wait stack-delete-complete --stack-name sdt-prod-voice-build-helper --region us-east-1
IMAGE=$(./infra/build-voice-codebuild.sh sdt-prod us-east-1 | tail -1)
VOICE_IMAGE="$IMAGE" ./infra/deploy.sh sdt-prod us-east-1 --with-voice



aws logs tail /aws/codebuild/sdt-prod-voice-build --log-stream-names e45aff72-0242-49e2-8a60-e242fa120935 --region us-east-1
sam deploy -t infra/template.yaml --stack-name sdt-prod --region us-east-1 --resolve-s3 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --debug \
  --parameter-overrides JwtSecret="$JWT_SECRET" VoiceImageUri="$VOICE_IMAGE" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" 2>&1 | tail -60




  sam deploy -t infra/template.yaml --stack-name sdt-prod --region us-east-1 --resolve-s3 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --debug \
  --parameter-overrides JwtSecret="$JWT_SECRET" VoiceImageUri="$VOICE_IMAGE" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" 2>&1 | tail -60

aws cloudformation describe-stacks --stack-name aws-sam-cli-managed-default --region us-east-1 --query "Stacks[0].StackStatus" --output text



aws cloudformation describe-stack-resources --stack-name sdt-prod-voice-build-helper --region us-east-1 --query "StackResources[?LogicalResourceId=='SourceBucket'].PhysicalResourceId" --output text


aws s3 rm s3://<paste-the-bucket-name-here> --recursive --region us-east-1
aws cloudformation delete-stack --stack-name sdt-prod-voice-build-helper --region us-east-1
aws cloudformation wait stack-delete-complete --stack-name sdt-prod-voice-build-helper --region us-east-1


aws sts get-caller-identity --query Account --output text

VOICE_IMAGE="786944814826.dkr.ecr.us-east-1.amazonaws.com/sdt-prod-voice:PASTE_TAG_HERE" ./infra/deploy.sh sdt-prod us-east-1 --with-voice

./infra/deploy.sh sdt-prod us-east-1

sam deploy --stack-name sdt-prod --region us-east-1 --resolve-s3 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" VoiceImageUri="$VOICE_IMAGE" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD"


sam deploy --debug --stack-name sdt-prod --region us-east-1 --resolve-s3 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" VoiceImageUri="$VOICE_IMAGE" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" 2>&1 | tail -40



"/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd" deploy --debug --stack-name sdt-prod --region us-east-1 --resolve-s3 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" VoiceImageUri="$VOICE_IMAGE" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" 2>&1 | tail -40

export MAIL_FROM="darwinfrancis19@gmail.com"


/c/PROGRA~1/Amazon/AWSSAMCLI/bin/sam.cmd deploy --stack-name sdt-prod --region us-east-1 --resolve-s3 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" VoiceImageUri="$VOICE_IMAGE" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD"


aws s3 mb s3://sdt-prod-artifacts-786944814826 --region us-east-1


/c/PROGRA~1/Amazon/AWSSAMCLI/bin/sam.cmd deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD"

aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs" --output table

echo "window.SDT_CONFIG = { apiBase: 'https://pczygyvsg5.execute-api.us-east-1.amazonaws.com' };" > public/assets/config.js
aws s3 cp public/assets/config.js s3://sdt-prod-frontendbucket-c1xmerdfbbd3/assets/config.js --region us-east-1 --cache-control "no-cache"
aws s3 sync public/ s3://sdt-prod-frontendbucket-c1xmerdfbbd3/ --region us-east-1 --delete --cache-control "public, max-age=300"
aws cloudfront create-invalidation --distribution-id E2KDDS6JD28FB6 --paths "/*"

'
BUCKET=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text)
echo "Bucket is: $BUCKET"

DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text)

aws s3 sync public/ "s3://$BUCKET/" --region us-east-1 --delete --cache-control "public, max-age=300"
aws s3 cp public/assets/config.js "s3://$BUCKET/assets/config.js" --region us-east-1 --cache-control "no-cache"
aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*"


aws logs tail /aws/lambda/sdt-prod-ApiFunction --region us-east-1 --since 5m

aws cloudformation describe-stack-resources --stack-name sdt-prod --region us-east-1 --query "StackResources[?LogicalResourceId=='ApiFunction'].PhysicalResourceId" --output text

MSYS_NO_PATHCONV=1 aws logs tail /aws/lambda/PASTE_REAL_NAME_HERE --region us-east-1 --since 15m

MSYS_NO_PATHCONV=1 aws logs tail /aws/lambda/sdt-prod-ApiFunction-Mu2lg4dPesdJ --region us-east-1 --since 2h

MSYS_NO_PATHCONV=1 aws logs tail /aws/lambda/sdt-prod-ApiFunction-Mu2lg4dPesdJ --region us-east-1 --follow

export SMTP_URL="smtps://darwinfrancis19@gmail.com:nfplactpldotvfhp@smtp.gmail.com:465"

/c/PROGRA~1/Amazon/AWSSAMCLI/bin/sam.cmd deploy --stack-name sdt-prod --region us-east-1 --resolve-s3 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD"


/c/PROGRA~1/Amazon/AWSSAMCLI/bin/sam.cmd deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD"`


export SKIP_OTP_EMAILS="admin@servicedesk.local"
/c/PROGRA~1/Amazon/AWSSAMCLI/bin/sam.cmd deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


# 1. Get the data bucket
BUCKET=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DataBucketName'].OutputValue" --output text)
echo "$BUCKET"

# 2. Find the user's internal ID
EMAIL_HASH=$(node -e "console.log(require('crypto').createHash('sha256').update('admin@servicedesk.local').digest('hex'))")
aws s3 cp "s3://$BUCKET/index/users-by-email/$EMAIL_HASH.json" - --region us-east-1

# 3. Fetch the current record
USER_ID=1   # <-- replace with the real number from step 2
aws s3 cp "s3://$BUCKET/users/by-id/$USER_ID.json" /tmp/user.json --region us-east-1

# 4. Generate a bcrypt hash for the new password
npm install bcryptjs --no-save --no-audit --no-fund
HASH=$(node -e "console.log(require('bcryptjs').hashSync(process.argv[1],10))" "YourNewPassword1")
echo "$HASH"

# 5. Update the record: new password hash, log out any existing sessions
node -e "
const fs=require('fs');
const u=JSON.parse(fs.readFileSync('/tmp/user.json','utf8'));
u.password_hash='$HASH';
u.session_epoch=(u.session_epoch||1)+1;
u.failed_logins=0; u.locked_until=null;
fs.writeFileSync('/tmp/user.json', JSON.stringify(u));
console.log('updated');
"

# 6. Write it back
aws s3 cp /tmp/user.json "s3://$BUCKET/users/by-id/$USER_ID.json" --region us-east-1

cat > fixpass.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail
STACK=sdt-prod
REGION=us-east-1
EMAIL=admin@servicedesk.local
NEWPASS="ChangeMe123"

npm install bcryptjs --no-save --no-audit --no-fund >/dev/null

BUCKET=$(aws cloudformation describe-stacks --stack-name "$STACK" --region "$REGION" --query "Stacks[0].Outputs[?OutputKey=='DataBucketName'].OutputValue" --output text)
echo "Data bucket: $BUCKET"

EMAIL_HASH=$(node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1]).digest('hex'))" "$EMAIL")
aws s3 cp "s3://$BUCKET/index/users-by-email/$EMAIL_HASH.json" /tmp/idx.json --region "$REGION"
USER_ID=$(node -e "console.log(JSON.parse(require('fs').readFileSync('/tmp/idx.json','utf8')).userId)")
echo "User id: $USER_ID"

aws s3 cp "s3://$BUCKET/users/by-id/$USER_ID.json" /tmp/user.json --region "$REGION"

node -e "
const bcrypt = require('bcryptjs');
const fs = require('fs');
const u = JSON.parse(fs.readFileSync('/tmp/user.json','utf8'));
u.password_hash = bcrypt.hashSync(process.argv[1], 10);
u.session_epoch = (u.session_epoch || 1) + 1;
u.failed_logins = 0;
u.locked_until = null;
fs.writeFileSync('/tmp/user.json', JSON.stringify(u));
console.log('patched user', u.id, u.email);
" "$NEWPASS"

aws s3 cp /tmp/user.json "s3://$BUCKET/users/by-id/$USER_ID.json" --region "$REGION"
echo "Done. New password for $EMAIL is: $NEWPASS"
EOF



bash fixpass.sh






echo "TEXT_MODEL_ID=$TEXT_MODEL_ID"
echo "VOICE_MODEL_ID=$VOICE_MODEL_ID"


export TEXT_MODEL_ID="anthropic.claude-sonnet-4-6-XXXXXXXX-v1:0"   # your real 4.6 ID from the console
export VOICE_MODEL_ID="amazon.nova-2-sonic-v1:0"                    # your real Nova 2 ID from the console





echo '#!/usr/bin/env bash' > fixpass.sh
echo 'set -euo pipefail' >> fixpass.sh
echo 'STACK=sdt-prod' >> fixpass.sh
echo 'REGION=us-east-1' >> fixpass.sh
echo 'EMAIL=admin@servicedesk.local' >> fixpass.sh
echo 'NEWPASS="ChangeMe123"' >> fixpass.sh
echo 'npm install bcryptjs --no-save --no-audit --no-fund >/dev/null' >> fixpass.sh
echo 'BUCKET=$(aws cloudformation describe-stacks --stack-name "$STACK" --region "$REGION" --query "Stacks[0].Outputs[?OutputKey==\x27DataBucketName\x27].OutputValue" --output text)' >> fixpass.sh
echo 'echo "Data bucket: $BUCKET"' >> fixpass.sh
echo 'EMAIL_HASH=$(node -e "console.log(require(\x27crypto\x27).createHash(\x27sha256\x27).update(process.argv[1]).digest(\x27hex\x27))" "$EMAIL")' >> fixpass.sh
echo 'aws s3 cp "s3://$BUCKET/index/users-by-email/$EMAIL_HASH.json" /tmp/idx.json --region "$REGION"' >> fixpass.sh
echo 'USER_ID=$(node -e "console.log(JSON.parse(require(\x27fs\x27).readFileSync(\x27/tmp/idx.json\x27,\x27utf8\x27)).userId)")' >> fixpass.sh
echo 'echo "User id: $USER_ID"' >> fixpass.sh
echo 'aws s3 cp "s3://$BUCKET/users/by-id/$USER_ID.json" /tmp/user.json --region "$REGION"' >> fixpass.sh
echo 'node -e "const b=require(\x27bcryptjs\x27);const fs=require(\x27fs\x27);const u=JSON.parse(fs.readFileSync(\x27/tmp/user.json\x27,\x27utf8\x27));u.password_hash=b.hashSync(process.argv[1],10);u.session_epoch=(u.session_epoch||1)+1;u.failed_logins=0;u.locked_until=null;fs.writeFileSync(\x27/tmp/user.json\x27,JSON.stringify(u));console.log(\x27patched\x27,u.id,u.email);" "$NEWPASS"' >> fixpass.sh
echo 'aws s3 cp /tmp/user.json "s3://$BUCKET/users/by-id/$USER_ID.json" --region "$REGION"' >> fixpass.sh
echo 'echo "Done. New password for $EMAIL is: $NEWPASS"' >> fixpass.sh


curl -s https://pczygyvsg5.execute-api.us-east-1.amazonaws.com/api/health



export SKIP_OTP_EMAILS="admin@servicedesk.local"
/c/PROGRA~1/Amazon/AWSSAMCLI/bin/sam.cmd deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


echo "JWT=$JWT_SECRET TEXT=$TEXT_MODEL_ID VOICE=$VOICE_MODEL_ID SMTP=$SMTP_URL MAIL=$MAIL_FROM ADMIN=$ADMIN_EMAIL PASS=$ADMIN_PASSWORD SKIP=$SKIP_OTP_EMAILS"


export SKIP_OTP_EMAILS="admin@servicedesk.local"



/c/PROGRA~1/Amazon/AWSSAMCLI/bin/sam.cmd deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


curl -s https://pczygyvsg5.execute-api.us-east-1.amazonaws.com/api/health


sam build -t infra/template.yaml



sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


grep -c "SKIP_OTP_EMAILS" server.js


grep -n "startOtp(res, user, 'login')" server.js


node -e 'const fs=require("fs");let s=fs.readFileSync("server.js","utf8");if(s.includes("SKIP_OTP_EMAILS")){console.log("already patched");process.exit(0);}const needle="await db.clearFailedLogins(user.id);";const idx=s.indexOf(needle);if(idx===-1){console.log("ANCHOR NOT FOUND");process.exit(1);}const lineEnd=s.indexOf("\n",idx)+1;const inject="\n    const skipOtpEmails = (process.env.SKIP_OTP_EMAILS || \"\").split(\",\").map(x => x.trim().toLowerCase()).filter(Boolean);\n    if (skipOtpEmails.includes(email)) {\n      await db.markEmailVerified(user.id);\n      auth.setAuthCookie(res, auth.issueToken(user));\n      return res.json(publicUser(user));\n    }\n";s=s.slice(0,lineEnd)+inject+s.slice(lineEnd);fs.writeFileSync("server.js",s);console.log("patched, new length", s.length);'


grep -c "SKIP_OTP_EMAILS" server.js


sam build -t infra/template.yaml


sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"

curl -s https://pczygyvsg5.execute-api.us-east-1.amazonaws.com/api/health


node patch.js



grep -c "SKIP_OTP_EMAILS" server.js

sam build -t infra/template.yaml

sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


curl -s https://pczygyvsg5.execute-api.us-east-1.amazonaws.com/api/health


https://d2n18reac1wo1o.cloudfront.net/chat


export TEXT_MODEL_ID="us.anthropic.claude-sonnet-4-6"
sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


FUNC=$(aws cloudformation describe-stack-resources --stack-name sdt-prod --region us-east-1 --query "StackResources[?LogicalResourceId=='ApiFunction'].PhysicalResourceId" --output text)
MSYS_NO_PATHCONV=1 aws logs tail /aws/lambda/$FUNC --region us-east-1 --since 5m



aws cloudformation list-stacks --region us-east-1 --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE --query "StackSummaries[].StackName"
aws ecr describe-repositories --region us-east-1 --query "repositories[].repositoryName"
aws s3 ls | grep sdt-prod



ARN=$(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text)
echo "$ARN"


sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="786944814826.dkr.ecr.us-east-1.amazonaws.com/sdt-prod-voice:PASTE_YOUR_EXISTING_TAG" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"



aws apprunner pause-service --service-arn "$ARN" --region us-east-1



aws apprunner resume-service --service-arn "$ARN" --region us-east-1



aws logs describe-log-groups --region us-east-1 --query "logGroups[?contains(logGroupName, 'apprunner/sdt-prod-voice')].logGroupName" --output text

MSYS_NO_PATHCONV=1 aws logs tail "/aws/apprunner/sdt-prod-voice/PASTE_THE_ID_HERE/application" --region us-east-1 --since 15m


SVC_ID=$(aws apprunner describe-service --service-arn "$ARN" --region us-east-1 --query "Service.ServiceId" --output text)
echo "$SVC_ID"

MSYS_NO_PATHCONV=1 aws logs tail "/aws/apprunner/sdt-prod-voice/$SVC_ID/application" --region us-east-1 --since 20m

MSYS_NO_PATHCONV=1 aws logs tail "/aws/apprunner/sdt-prod-voice/$SVC_ID/service" --region us-east-1 --since 20m


ARN=$(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text)
echo "$ARN"

SVC_ID=$(aws apprunner describe-service --service-arn "$ARN" --region us-east-1 --query "Service.ServiceId" --output text)
echo "$SVC_ID"

MSYS_NO_PATHCONV=1 aws logs tail "/aws/apprunner/sdt-prod-voice/$SVC_ID/application" --region us-east-1 --since 30m

MSYS_NO_PATHCONV=1 aws logs tail "/aws/apprunner/sdt-prod-voice/$SVC_ID/service" --region us-east-1 --since 30m


aws apprunner describe-service --service-arn "$ARN" --region us-east-1 --query "Service.{Status:Status,ServiceId:ServiceId}" --output text



aws apprunner describe-service --service-arn $(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text) --region us-east-1 --query "Service.Status" --output text


aws apprunner list-services --region us-east-1


echo "JWT=[$JWT_SECRET] TEXT=[$TEXT_MODEL_ID] VOICE=[$VOICE_MODEL_ID] SMTP=[$SMTP_URL] MAIL=[$MAIL_FROM] ADMIN=[$ADMIN_EMAIL] PASS=[$ADMIN_PASSWORD] SKIP=[$SKIP_OTP_EMAILS]"


sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --disable-rollback --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="786944814826.dkr.ecr.us-east-1.amazonaws.com/sdt-prod-voice:PASTE_YOUR_EXISTING_TAG" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


aws ecr describe-images --repository-name sdt-prod-voice --region us-east-1 --query "sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]" --output text

aws cloudformation rollback-stack --stack-name sdt-prod --region us-east-1
aws cloudformation wait stack-rollback-complete --stack-name sdt-prod --region us-east-1


TAG=$(aws ecr describe-images --repository-name sdt-prod-voice --region us-east-1 --query "sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]" --output text)
echo "Using tag: $TAG"

sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="786944814826.dkr.ecr.us-east-1.amazonaws.com/sdt-prod-voice:$TAG" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"




aws ecr describe-images --repository-name sdt-prod-voice --region us-east-1 --query "length(imageDetails)" --output text && aws ecr describe-images --repository-name sdt-prod-voice --region us-east-1 --query "imageDetails[].imageTags[]" --output text



aws cloudformation rollback-stack --stack-name sdt-prod --region us-east-1 && aws cloudformation wait stack-rollback-complete --stack-name sdt-prod --region us-east-1



./infra/build-voice-codebuild.sh sdt-prod us-east-1


aws ecr describe-images --repository-name sdt-prod-voice --region us-east-1 --query "length(imageDetails)" --output text

aws apprunner describe-service --service-arn $(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text) --region us-east-1 --query "Service.SourceConfiguration.ImageRepository.ImageConfiguration.RuntimeEnvironmentVariables"
export VOICE_TAG="20260921152007"

sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="786944814826.dkr.ecr.us-east-1.amazonaws.com/sdt-prod-voice:$VOICE_TAG" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"



aws apprunner describe-service --service-arn $(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text) --region us-east-1 --query "Service.SourceConfiguration.ImageRepository.ImageConfiguration.RuntimeEnvironmentVariables"


   node patch-voice-origin.js

      ./infra/build-voice-codebuild.sh sdt-prod us-east-1


         sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="PASTE_THE_NEW_URI_FROM_STEP_3" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


./infra/build-voice-codebuild.sh sdt-prod us-east-1

sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="786944814826.dkr.ecr.us-east-1.amazonaws.com/sdt-prod-voice:PUT_THE_REAL_NEW_TIMESTAMP_HERE" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


https://d2n18reac1wo1o.cloudfront.net/voice



IMAGE=$(./infra/build-voice-codebuild.sh sdt-prod us-east-1 | tail -1) && echo "Using image: $IMAGE" && sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="$IMAGE" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


aws apprunner describe-service --service-arn $(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text) --region us-east-1 --query "Service.{Status:Status,Image:SourceConfiguration.ImageRepository.ImageIdentifier}"





grep -c "FRONTEND_ORIGIN" lib/voiceGateway.js



SVC_ID=$(aws apprunner describe-service --service-arn $(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text) --region us-east-1 --query "Service.ServiceId" --output text) && MSYS_NO_PATHCONV=1 aws logs tail "/aws/apprunner/sdt-prod-voice/$SVC_ID/application" --region us-east-1 --since 10m

\
\

grep -n "FRONTEND_ORIGIN\|const allowed\|reject(socket, 403)" lib/voiceGateway.js


grep -n "return reject(socket, 403)" lib/voiceGateway.js


   IMAGE=$(./infra/build-voice-codebuild.sh sdt-prod us-east-1 | tail -1) && echo "Using image: $IMAGE" && sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="$IMAGE" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


      SVC_ID=$(aws apprunner describe-service --service-arn $(aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[?ServiceName=='sdt-prod-voice'].ServiceArn" --output text) --region us-east-1 --query "Service.ServiceId" --output text) && MSYS_NO_PATHCONV=1 aws logs tail "/aws/apprunner/sdt-prod-voice/$SVC_ID/application" --region us-east-1 --since 5m



sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" VoiceImageUri="" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"


curl -s https://pczygyvsg5.execute-api.us-east-1.amazonaws.com/api/health


aws ecr delete-repository --repository-name sdt-prod-voice --region us-east-1 --force

sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS"



aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[].{Name:ServiceName,Status:Status}"



aws cloudformation update-stack --stack-name sdt-prod --region us-east-1 --use-previous-template --capabilities CAPABILITY_IAM --parameters ParameterKey=VoiceImageUri,ParameterValue= ParameterKey=JwtSecret,UsePreviousValue=true ParameterKey=TextModelId,UsePreviousValue=true ParameterKey=VoiceModelId,UsePreviousValue=true ParameterKey=SmtpUrl,UsePreviousValue=true ParameterKey=MailFrom,UsePreviousValue=true ParameterKey=AdminEmail,UsePreviousValue=true ParameterKey=AdminPassword,UsePreviousValue=true ParameterKey=SkipOtpEmails,UsePreviousValue=true && aws cloudformation wait stack-update-complete --stack-name sdt-prod --region us-east-1 && echo "DONE - voice removed"


aws apprunner list-services --region us-east-1 --query "ServiceSummaryList[].ServiceName" && curl -s https://pczygyvsg5.execute-api.us-east-1.amazonaws.com/api/health


sam build -t infra/template.yaml

sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS" AllowedEmailDomains="hcltech.com,hcl.com"


BUCKET=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text) && DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text) && aws s3 sync public/ "s3://$BUCKET/" --region us-east-1 --delete --cache-control "public, max-age=300" && aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*"



export JWT_SECRET="sdt-local-dev-secret-k8x2Qm9vPnW4rT7y" && export TEXT_MODEL_ID="us.anthropic.claude-sonnet-4-6" && export VOICE_MODEL_ID="amazon.nova-2-sonic-v1:0" && export SMTP_URL="smtps://darwinfrancis19@gmail.com:nfplactpldotvfhp@smtp.gmail.com:465" && export MAIL_FROM="darwinfrancis19@gmail.com" && export ADMIN_EMAIL="admin@servicedesk.local" && export ADMIN_PASSWORD="Admin@123" && export SKIP_OTP_EMAILS="admin@servicedesk.local" && echo "JWT=[$JWT_SECRET] SMTP=[$SMTP_URL] SKIP=[$SKIP_OTP_EMAILS]"


echo "window.SDT_CONFIG = { apiBase: 'https://pczygyvsg5.execute-api.us-east-1.amazonaws.com' };" > public/assets/config.js && BUCKET=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text) && DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text) && aws s3 cp public/assets/config.js "s3://$BUCKET/assets/config.js" --region us-east-1 --cache-control "no-cache" && aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/assets/config.js" --query "Invalidation.Status" --output text



cat > ~/sdt-env.sh << 'EOF'
export JWT_SECRET="sdt-local-dev-secret-k8x2Qm9vPnW4rT7y"
export TEXT_MODEL_ID="us.anthropic.claude-sonnet-4-6"
export VOICE_MODEL_ID="amazon.nova-2-sonic-v1:0"
export SMTP_URL="smtps://darwinfrancis19@gmail.com:nfplactpldotvfhp@smtp.gmail.com:465"
export MAIL_FROM="darwinfrancis19@gmail.com"
export ADMIN_EMAIL="admin@servicedesk.local"
export ADMIN_PASSWORD="Admin@123"
export SKIP_OTP_EMAILS="admin@servicedesk.local"
EOF

echo "window.SDT_CONFIG = { apiBase: 'https://pczygyvsg5.execute-api.us-east-1.amazonaws.com' };" > public/assets/config.js && BUCKET=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text) && DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text) && aws s3 cp public/assets/config.js "s3://$BUCKET/assets/config.js" --region us-east-1 --cache-control "no-cache" && aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/assets/config.js" --query "Invalidation.Status" --output text

curl -s https://d2n18reac1wo1o.cloudfront.net/assets/config.js


DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text) && MSYS_NO_PATHCONV=1 aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*" --query "Invalidation.Status" --output text

echo 'export JWT_SECRET="sdt-local-dev-secret-k8x2Qm9vPnW4rT7y"' > ~/sdt-env.sh && echo 'export TEXT_MODEL_ID="us.anthropic.claude-sonnet-4-6"' >> ~/sdt-env.sh && echo 'export VOICE_MODEL_ID="amazon.nova-2-sonic-v1:0"' >> ~/sdt-env.sh && echo 'export SMTP_URL="smtps://darwinfrancis19@gmail.com:nfplactpldotvfhp@smtp.gmail.com:465"' >> ~/sdt-env.sh && echo 'export MAIL_FROM="darwinfrancis19@gmail.com"' >> ~/sdt-env.sh && echo 'export ADMIN_EMAIL="admin@servicedesk.local"' >> ~/sdt-env.sh && echo 'export ADMIN_PASSWORD="Admin@123"' >> ~/sdt-env.sh && echo 'export SKIP_OTP_EMAILS="admin@servicedesk.local"' >> ~/sdt-env.sh && wc -l ~/sdt-env.sh




DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text) && MSYS_NO_PATHCONV=1 aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*" --query "Invalidation.Status" --output text


curl -s https://d2n18reac1wo1o.cloudfront.net/assets/config.js



https://www.nvidia.com/en-us/training/academy/course-player/?id=course:15139849

cd ~/Documents/service-desk-trainer-v4-serverless
pwd

grep -c "SESSION_SUPERSEDED" server.js
grep -c "force-logout" server.js

npm test

unzip -o ~/Downloads/single-session-monitoring.zip -d ~/Documents/service-desk-trainer-v4-serverless


sam build -t infra/template.yaml


sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS" AllowedEmailDomains="hcltech.com,hcl.com"


BUCKET=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text) && DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text) && aws s3 sync public/ "s3://$BUCKET/" --region us-east-1 --delete --cache-control "public, max-age=300" && MSYS_NO_PATHCONV=1 aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*"


BUCKET=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text) && DIST=$(aws cloudformation describe-stacks --stack-name sdt-prod --region us-east-1 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text) && aws s3 sync public/ "s3://$BUCKET/" --region us-east-1 --delete --cache-control "public, max-age=300" && MSYS_NO_PATHCONV=1 aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*"



source ~/sdt-env.sh


echo "JWT=[$JWT_SECRET]"

sam deploy --stack-name sdt-prod --region us-east-1 --s3-bucket sdt-prod-artifacts-786944814826 --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --parameter-overrides JwtSecret="$JWT_SECRET" TextModelId="$TEXT_MODEL_ID" VoiceModelId="$VOICE_MODEL_ID" SmtpUrl="$SMTP_URL" MailFrom="$MAIL_FROM" AdminEmail="$ADMIN_EMAIL" AdminPassword="$ADMIN_PASSWORD" SkipOtpEmails="$SKIP_OTP_EMAILS" AllowedEmailDomains="hcltech.com,hcl.com"


