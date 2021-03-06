import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';

import { Context } from '../../types/context';

export type S3Props = {
  bucketName: string;
} & Context;

export class S3 extends Construct {
  readonly bucket: s3.Bucket;

  constructor(parent: Construct, name: string, { bucketName, appName, env }: S3Props) {
    super(parent, name);

    const bucket = new s3.Bucket(this, 'webBucket', {
      bucketName: `${env}-${appName}-${bucketName}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',

      removalPolicy: env === 'prd' ? cdk.RemovalPolicy.DESTROY : undefined,
    });

    this.bucket = bucket;
  }
}
