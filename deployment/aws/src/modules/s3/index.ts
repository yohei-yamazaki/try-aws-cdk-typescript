import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';

import { Context } from '../../types/context';

type Props = {
  bucketName: string;
} & Context;

export class S3 extends Construct {
  constructor(parent: Construct, name: string, { bucketName, appName, env }: Props) {
    super(parent, name);

    new s3.Bucket(this, 'webBucket', {
      bucketName: `${env}-${appName}-${bucketName}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',

      removalPolicy: env === 'prd' ? cdk.RemovalPolicy.DESTROY : undefined,
    });
  }
}
