import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";

export class LambdaStack extends cdk.Stack {
  public readonly helloLambdaIntegration: cdk.aws_apigateway.LambdaIntegration;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "LambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
        handler: "handler",
        entry: path.join(__dirname, "../../services/temp/hello2.js"),
      }
    );
    this.helloLambdaIntegration = new cdk.aws_apigateway.LambdaIntegration(
      helloLambda
    );
  }
}
