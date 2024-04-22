import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import { Bucket, IBucket } from "aws-cdk-lib/aws-s3";

export class DataStack2 extends Stack {
  public readonly spacesTable: ITable;
  public readonly deploymentBucket: IBucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.deploymentBucket = new Bucket(this, "SpaceFinderFrontend", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      bucketName: `space-finder-frontend-${suffix}`,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      blockPublicAccess: {
        blockPublicAcls: true,
        blockPublicPolicy: false,
        ignorePublicAcls: true,
        restrictPublicBuckets: false,
      },
    });

    // const bucket = new aws_s3.Bucket(this, "testBucket", {
    //     blockPublicAccess: {
    //       blockPublicAcls: true,
    //       blockPublicPolicy: true,
    //       ignorePublicAcls: true,
    //       restrictPublicBuckets: true,
    //     },
    //     enforceSSL: true,
    //     publicReadAccess: false,
    //     encryption: aws_s3.BucketEncryption.S3_MANAGED,
    //     versioned: true,
    //   });

    this.spacesTable = new Table(this, "SpacesTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: `SpaceTable-${suffix}`,
    });
  }
}
