import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "LambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
        handler: "handler",
        entry: path.join(__dirname, "../../services/hello2.js"),
      }
    );
    this.helloLambdaIntegration = new LambdaIntegration(helloLambda);
  }
}
