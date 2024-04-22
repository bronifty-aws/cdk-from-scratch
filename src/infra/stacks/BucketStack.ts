import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class BucketStack extends cdk.Stack {
  public readonly helloBucket: cdk.aws_s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new cdk.aws_s3.Bucket(this, "WebsiteBucket", {
      publicReadAccess: true,
    });

    // new cdk.aws_s3_deployment.BucketDeployment(this, "DeployWebsite", {
    //   sources: [
    //     cdk.aws_s3_deployment.Source.asset(
    //       "./src/services/testing123/dist/client"
    //     ),
    //   ],
    //   destinationBucket: websiteBucket,
    // });

    this.helloBucket = websiteBucket;
  }
}
