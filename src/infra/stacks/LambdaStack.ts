import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";

// interface LambdaStackProps extends cdk.StackProps {
//   helloBucket: cdk.aws_s3.Bucket;
// }

export class LambdaStack extends cdk.Stack {
  public readonly helloLambdaIntegration: cdk.aws_apigatewayv2.HttpRouteIntegration;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "LambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
        handler: "handler",
        entry: path.join(__dirname, "../../services/testing123/index.js"),
        // environment: {
        //   BUCKET_URL: props.helloBucket.bucketWebsiteUrl,
        // },
      }
    );

    this.helloLambdaIntegration =
      new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
        "HelloLambdaIntegration",
        helloLambda
      );
  }
}
