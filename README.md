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

- need to customize esbuild settings to include local files along with the bundle and then implement this in the lambda stack
  - requesting files from the distribution on the lambda with a fetch and then trying to read them in from the serverless function does not work.
  - ssr needs a server entry and also a template file
- once the browser receives the ssr'd document, it will need to request assets from the distribution, which proxies and caches files in the bucket
- another part of the ssr script is going to be prepending the asset links with the server's process.env.BUCKET_URL so the browser knows where to fetch these assets

```html
 <script type="module" crossorigin src=`https://${BUCKET_URL}/assets/index-D9zL7KPr.js`></script>
    <link rel="stylesheet" crossorigin href=`https://${BUCKET_URL}/assets/index-B5G87SLT.css`>
```
