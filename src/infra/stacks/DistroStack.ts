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

interface DistroStackProps extends cdk.StackProps {
  bucket: cdk.aws_s3.IBucket;
}

export class DistroStack extends Stack {
  public readonly distribution!: cdk.aws_cloudfront.IDistribution;

  constructor(scope: Construct, id: string, props: DistroStackProps) {
    super(scope, id, props);

    const oai = new cdk.aws_cloudfront.OriginAccessIdentity(this, "OAI");
    props.bucket.grantRead(oai);

    const backendCloudfront = new cdk.aws_cloudfront.CloudFrontWebDistribution(
      this,
      "BackendCF",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: props.bucket,
              originAccessIdentity: oai,
            },
            behaviors: [
              { isDefaultBehavior: true },
              {
                pathPattern: "/*",
                allowedMethods:
                  cdk.aws_cloudfront.CloudFrontAllowedMethods.GET_HEAD,
              },
            ],
          },
        ],
      }
    );

    new CfnOutput(this, "SpaceFInderUrl", {
      value: backendCloudfront.distributionDomainName,
    });
    this.distribution = backendCloudfront;
  }
}
