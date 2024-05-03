import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

interface ApiStackProps extends cdk.StackProps {
  helloLambdaIntegration: cdk.aws_apigatewayv2.HttpRouteIntegration;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // const api = new cdk.aws_apigateway.RestApi(this, "SpacesApi");
    // const spacesResource = api.root.addResource("spaces");
    // const proxy = spacesResource.addProxy({
    //   defaultIntegration: props.helloLambdaIntegration,
    //   anyMethod: true,
    // });
    // spacesResource.addMethod("GET", props.helloLambdaIntegration);

    const httpApi = new cdk.aws_apigatewayv2.HttpApi(this, "SpacesApi", {
      apiName: "SpacesApi",
      createDefaultStage: true,
      defaultIntegration: props.helloLambdaIntegration,
    });

    new cdk.CfnOutput(this, "httpApi.defaultStage?.domainUrl", {
      value: httpApi.apiEndpoint,
    });
    // new CfnOutput(this, "SpaceFInderUrl", {
    //   value: backendCloudfront.distributionDomainName,
    // });
  }
}
