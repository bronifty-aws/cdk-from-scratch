import * as cdk from "aws-cdk-lib";
import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import * as path from "path";
import * as fs from "fs";
import { getSuffixFromStack } from "../Utils";

interface BucketDeploymentStackProps extends cdk.StackProps {
  bucket: cdk.aws_s3.IBucket;
}

export class BucketDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: BucketDeploymentStackProps) {
    super(scope, id, props);

    const uiDir = path.join(__dirname, "..", "..", "services", "testing123");

    if (!fs.existsSync(uiDir)) {
      console.warn("Ui dir not found: " + uiDir);
      return;
    }

    new cdk.aws_s3_deployment.BucketDeployment(
      this,
      "distro-stack-deployment",
      {
        destinationBucket: props.bucket,
        sources: [cdk.aws_s3_deployment.Source.asset(uiDir)],
      }
    );
  }
}
