import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { BucketStack } from "./stacks/BucketStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";
import { DataStack2 } from "./stacks/DataStack2";

const app = new App();
const dataStack = new DataStack2(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  spacesTable: dataStack.spacesTable,
  deploymentBucket: dataStack.deploymentBucket,
});
new ApiStack(app, "ApiStack", {
  helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
});
new UiDeploymentStack(app, "UiDeploymentStack", {
  deploymentBucket: dataStack.deploymentBucket,
});
