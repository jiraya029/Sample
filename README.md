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





export AWS_PAGER=""
aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1 \
  --query "StackEvents[?ResourceStatus=='CREATE_FAILED']" --output json
  
  
  
  
  aws cloudformation describe-stack-events --stack-name sdt-prod-voice-build-helper --region us-east-1 --output json | grep -A2 "CREATE_FAILED\|ResourceStatusReason"
