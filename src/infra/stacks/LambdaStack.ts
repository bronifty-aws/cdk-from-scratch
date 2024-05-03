import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";

interface LambdaStackProps extends cdk.StackProps {
  spacesTable: cdk.aws_dynamodb.ITable;
  distribution: cdk.aws_cloudfront.IDistribution;
}

export class LambdaStack extends cdk.Stack {
  public readonly helloLambdaIntegration: cdk.aws_apigatewayv2.HttpRouteIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const helloLambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "LambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
        handler: "handler",
        entry: path.join(__dirname, "../../services/testing123/index.js"),
        environment: {
          BUCKET_URL: props.distribution.distributionDomainName,
          TABLE_NAME: props.spacesTable.tableName,
        },
      }
    );

    this.helloLambdaIntegration =
      new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
        "HelloLambdaIntegration",
        helloLambda
      );

    helloLambda.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        resources: [props.spacesTable.tableArn],
        actions: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
      })
    );

    // props.distribution.grantReadWrite(helloLambda);

    helloLambda.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        resources: ["*"],
        actions: ["*"],
      })
    );
  }
}
