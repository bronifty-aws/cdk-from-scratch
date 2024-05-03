```shell
cdk bootstrap aws://851725517932/us-east-1
```

```shell
ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
REGION=$(aws configure get region)
cdk bootstrap aws://$ACCOUNT_ID/$REGION
```

working on using express in lambda to drop in an existing vite ssr app into cdk LambdaStack

on this lecture https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/37487170#overview

need to access website bucket from cdn distribution

update: lambda using express with "serverless-http" framework that hits a bucket fronted by a cloudfront distribution.
next steps are to:

1. clean up the repo; get rid of unused items, consolidate wherever possible
2. add a vite ssr service and swap out the lambda function
