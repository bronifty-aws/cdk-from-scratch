import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";

let assetsPath = "../../services/vanilla-js-ssr";

const app = new App();
const dataStack = new DataStack(app, "DataStackViteSSR");
const uiDeploymentStack = new UiDeploymentStack(
  app,
  "UiDeploymentStackViteSSR2",
  {
    assetsPath,
  }
);
const lambdaStack = new LambdaStack(app, "LambdaStackViteSSR", {
  spacesTable: dataStack.spacesTable,
  distribution: uiDeploymentStack.distribution,
  assetsPath,
});
new ApiStack(app, "ApiStackViteSSR", {
  helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
});
