# sdt-deployer IAM policy — corrected

This supersedes the two policy options given earlier. The original S3
statement was missing `s3:PutLifecycleConfiguration` (and its `Get`
counterpart) — that action doesn't follow the `PutBucket*` naming pattern
the rest of the list used, so it was missed, and the first real deploy of
`infra/codebuild-voice.yaml` failed on exactly this:

```
User: .../sdt-deployer is not authorized to perform: s3:PutLifecycleConfiguration
on resource: "arn:aws:s3:::sdt-prod-voice-build-helper-sourcebucket-..."
```

## Immediate fix (already applied live via CLI, no waiting)

```bash
aws iam put-user-policy --user-name sdt-deployer --policy-name sdt-voice-build-extra --policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:PutLifecycleConfiguration", "s3:GetLifecycleConfiguration"],
    "Resource": "arn:aws:s3:::sdt-prod-voice-build-helper-*"
  }]
}'
```

## Corrected S3 statement for the main custom policy (Option B)

If you're using the single custom policy from before, replace its
`"Sid": "S3Buckets"` statement's `Action` list with this (adds the two
missing actions; everything else unchanged):

```json
{
  "Sid": "S3Buckets",
  "Effect": "Allow",
  "Action": [
    "s3:CreateBucket", "s3:DeleteBucket", "s3:ListBucket", "s3:GetBucket*", "s3:PutBucket*",
    "s3:DeleteBucketPolicy", "s3:PutEncryptionConfiguration", "s3:GetEncryptionConfiguration",
    "s3:PutBucketVersioning", "s3:PutBucketPublicAccessBlock", "s3:GetBucketPublicAccessBlock",
    "s3:PutBucketTagging", "s3:PutLifecycleConfiguration", "s3:GetLifecycleConfiguration",
    "s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucketVersions", "s3:DeleteObjectVersion"
  ],
  "Resource": [
    "arn:aws:s3:::sdt-prod-*", "arn:aws:s3:::sdt-prod-*/*",
    "arn:aws:s3:::aws-sam-cli-managed-default-*", "arn:aws:s3:::aws-sam-cli-managed-default-*/*"
  ]
}
```

## If you used Option A (managed policies)

`AmazonS3FullAccess` already covers this — Option A was never affected by
this gap. Only the fully-custom Option B policy needed the fix above.

## Lesson for next time

When a least-privilege policy is assembled by listing actions from memory
against a template rather than from AWS's own "access denied" errors, gaps
like this are the expected failure mode — the fix is always the same
pattern: read the exact `Action` string from the `AccessDenied`/
`GeneralServiceException` message and add precisely that, scoped to the
narrowest resource ARN that covers it.
