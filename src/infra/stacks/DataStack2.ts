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
      bucketName: `space-finder-photos-${suffix}`,
      cors: [
        {
          allowedMethods: [
            cdk.aws_s3.HttpMethods.HEAD,
            cdk.aws_s3.HttpMethods.GET,
            cdk.aws_s3.HttpMethods.PUT,
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
      // accessControl: BucketAccessControl.PUBLIC_READ, // currently not working,
      objectOwnership: cdk.aws_s3.ObjectOwnership.OBJECT_WRITER,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      //   bucketName: `space-finder-frontend-${suffix}`,
      //   publicReadAccess: true,
      //   websiteIndexDocument: "index.html",
      //   blockPublicAccess: {
      //     blockPublicAcls: true,
      //     blockPublicPolicy: false,
      //     ignorePublicAcls: true,
      //     restrictPublicBuckets: false,
      //   },
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
