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

export class UiDeploymentStack extends Stack {
  public readonly distribution!: cdk.aws_cloudfront.IDistribution;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const uiDir = join(__dirname, "..", "..", "services", "testing123");

    // const suffix = getSuffixFromStack(this);

    // const deploymentBucket = new cdk.aws_s3.Bucket(this, "uiDeploymentBucket", {
    //   bucketName: `space-finder-frontend-${suffix}`,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true,
    //   publicReadAccess: true,
    //   websiteIndexDocument: "index.html",
    //   blockPublicAccess: {
    //     blockPublicAcls: false,
    //     blockPublicPolicy: false,
    //     ignorePublicAcls: false,
    //     restrictPublicBuckets: false,
    //   },
    //   objectOwnership: cdk.aws_s3.ObjectOwnership.OBJECT_WRITER,
    //   enforceSSL: true,
    //   cors: [
    //     {
    //       allowedMethods: [
    //         cdk.aws_s3.HttpMethods.HEAD,
    //         cdk.aws_s3.HttpMethods.GET,
    //         cdk.aws_s3.HttpMethods.POST,
    //         cdk.aws_s3.HttpMethods.PUT,
    //         cdk.aws_s3.HttpMethods.DELETE,
    //       ],
    //       allowedOrigins: ["*"],
    //       allowedHeaders: ["*"],
    //     },
    //   ],
    // });

    // if (!existsSync(uiDir)) {
    //   console.warn("Ui dir not found: " + uiDir);
    //   return;
    // }

    // new BucketDeployment(this, "SpacesFinderDeployment", {
    //   destinationBucket: deploymentBucket,
    //   sources: [Source.asset(uiDir)],
    // });

    // const originIdentity = new OriginAccessIdentity(
    //   this,
    //   "OriginAccessIdentity"
    // );
    // deploymentBucket.grantRead(originIdentity);

    // const distribution = new Distribution(this, "SpacesFinderDistribution", {
    //   defaultRootObject: "index.html",
    //   defaultBehavior: {
    //     origin: new S3Origin(deploymentBucket, {
    //       originAccessIdentity: originIdentity,
    //     }),
    //   },
    // });

    const suffix = getSuffixFromStack(this);
    // const uiDir = path.join(__dirname, "..", "dist");
    const uiDir = path.join(__dirname, "..", "..", "services", "testing123");

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

    if (!fs.existsSync(uiDir)) {
      console.warn("Ui dir not found: " + uiDir);
      return;
    }

    new cdk.aws_s3_deployment.BucketDeployment(
      this,
      "distro-stack-deployment",
      {
        destinationBucket: s3Bucket,
        sources: [cdk.aws_s3_deployment.Source.asset(uiDir)],
      }
    );

    const oai = new cdk.aws_cloudfront.OriginAccessIdentity(this, "OAI");
    s3Bucket.grantRead(oai);

    const backendCloudfront = new cdk.aws_cloudfront.CloudFrontWebDistribution(
      this,
      "BackendCF",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: s3Bucket,
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

    // if (existsSync(uiDir)) {
    // new BucketDeployment(this, "space-finder-ui-deployment", {
    //   destinationBucket: props.deploymentBucket,
    //   sources: [Source.asset(uiDir)],
    // });

    // const originIdentity = new OriginAccessIdentity(
    //   this,
    //   "OriginAccessIdentity"
    // );
    // props.deploymentBucket.grantRead(originIdentity);

    // const distribution = new Distribution(this, "SpacesFinderDistribution", {
    //   defaultRootObject: "index.html",
    //   defaultBehavior: {
    //     origin: new S3Origin(props.deploymentBucket, {
    //       originAccessIdentity: originIdentity,
    //     }),
    //   },
    // });

    // new CfnOutput(this, "SpaceFInderUrl", {
    //   value: distribution.distributionDomainName,
    // });
    // } else {
    //   console.warn("Ui directory not found: " + uiDir);
    // }
  }
}
