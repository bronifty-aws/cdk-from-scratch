import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

//

interface ApiStackProps extends cdk.StackProps {
  // helloLambdaIntegration: cdk.aws_apigateway.LambdaIntegration;
  helloLambdaFunction: cdk.aws_lambda_nodejs.NodejsFunction;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // aws-apigatewayv2-integrations

    // create api gateway v2 http api with a $default stage and a $default route using ANY method. use a Lambda proxy integration

    // aws apigatewayv2 create-api --name my-api --protocol-type HTTP --target arn:aws:lambda:us-east-2:123456789012:function:function-name

    // import {
    //   HttpApi,
    //   HttpMethod,
    //   LambdaProxyIntegration,
    // } from "@aws-cdk/aws-apigatewayv2";
    // import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";

    // const httpApi = new HttpApi(this, "SpacesHttpApi", {
    //   apiName: "SpacesHttpApi",
    //   createDefaultStage: true,
    // });

    // httpApi.addRoutes({
    //   path: "/{proxy+}",
    //   methods: [HttpMethod.ANY],
    //   integration: new cdk.aws_apigateway.LambdaIntegration({
    //     handler: props.helloLambdaIntegration.handler,
    //   }),
    // });

    // const api = new cdk.aws_apigateway.RestApi(this, "SpacesApi");
    // const spacesResource = api.root.addResource("spaces");
    // const proxy = spacesResource.addProxy({
    //   defaultIntegration: props.helloLambdaIntegration,
    //   anyMethod: true,
    // });
    // spacesResource.addMethod("GET", props.helloLambdaIntegration);

    // import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

    // const booksIntegration = new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration('BooksIntegration', props.helloLambdaIntegration);

    const httpLambdaIntegration =
      new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
        "HelloLambdaIntegration",
        props.helloLambdaFunction
      );

    const httpApi = new cdk.aws_apigatewayv2.HttpApi(this, "SpacesApi", {
      apiName: "SpacesApi",
      createDefaultStage: true,
      defaultIntegration: httpLambdaIntegration,
    });
  }
}
