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
