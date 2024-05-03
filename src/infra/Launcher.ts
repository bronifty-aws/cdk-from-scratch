import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { BucketStack } from "./stacks/BucketStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";
import { DataStack2 } from "./stacks/DataStack2";

const app = new App();
const dataStack = new DataStack2(app, "DataStackViteSSR");
const uiDeploymentStack = new UiDeploymentStack(app, "UiDeploymentStackViteSSR");
const lambdaStack = new LambdaStack(app, "LambdaStackViteSSR", {
  spacesTable: dataStack.spacesTable,
  distribution: uiDeploymentStack.distribution,
});
new ApiStack(app, "ApiStackViteSSR", {
  helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
});
