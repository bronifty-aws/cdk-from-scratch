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

    // this.deploymentBucket = new Bucket(this, "SpaceFinderFrontend", {
    //   bucketName: `space-finder-frontend-${suffix}`,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true,
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
    //   objectOwnership: cdk.aws_s3.ObjectOwnership.OBJECT_WRITER,
    //   publicReadAccess: true,
    //   websiteIndexDocument: "index.html",
    //   blockPublicAccess: {
    //     blockPublicAcls: true,
    //     blockPublicPolicy: false,
    //     ignorePublicAcls: true,
    //     restrictPublicBuckets: false,
    //   },
    // });

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
      cors: [
        {
          allowedMethods: [
            cdk.aws_s3.HttpMethods.HEAD,
            cdk.aws_s3.HttpMethods.GET,
            cdk.aws_s3.HttpMethods.POST,
            cdk.aws_s3.HttpMethods.PUT,
            cdk.aws_s3.HttpMethods.DELETE,
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
      enforceSSL: true,
    });

    this.spacesTable = new Table(this, "SpacesTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: `SpaceTable-${suffix}`,
    });
  }
}
