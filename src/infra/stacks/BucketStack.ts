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

export class BucketStack extends Stack {
  public readonly bucket!: cdk.aws_s3.IBucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    const s3CorsRule: cdk.aws_s3.CorsRule = {
      allowedMethods: [cdk.aws_s3.HttpMethods.GET, cdk.aws_s3.HttpMethods.HEAD],
      allowedOrigins: ["*"],
      allowedHeaders: ["*"],
      maxAge: 300,
    };

    const s3Bucket = new cdk.aws_s3.Bucket(this, "S3Bucket", {
      bucketName: `medium-s3-cloudfront-${suffix}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: cdk.aws_s3.BucketAccessControl.PRIVATE,
      cors: [s3CorsRule],
    });

    new CfnOutput(this, "SpaceFInderUrl", {
      value: s3Bucket.bucketDomainName,
    });
    this.bucket = s3Bucket;
  }
}
