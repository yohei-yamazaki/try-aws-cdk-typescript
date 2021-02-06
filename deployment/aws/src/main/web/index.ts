import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';

import { CloudFront, CloudFrontProps } from '../../modules/cloudfront';
import { S3, S3Props } from '../../modules/s3';

type Props = S3Props & CloudFrontProps;

export class Web extends Construct {
  constructor(parent: Construct, name: string, { domainName, bucketName, ...context }: Props) {
    super(parent, name);

    new S3(this, 'webBucket', {
      bucketName,
      ...context,
    });

    new CloudFront(this, 'webDistribution', { domainName, ...context });
  }
}
