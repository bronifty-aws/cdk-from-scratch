import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { BucketStack } from "./stacks/BucketStack";

const app = new App();
new DataStack(app, "DataStack");
const bucketStack = new BucketStack(app, "BucketStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  helloBucket: bucketStack.helloBucket,
});
new ApiStack(app, "ApiStack", {
  helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
});
