import { Construct } from '@aws-cdk/core';

import { CloudFront, CloudFrontProps } from '../../modules/cloudfront';
import { S3, S3Props } from '../../modules/s3';

type Props = Omit<S3Props & CloudFrontProps, 'domainName'>;

export class Web extends Construct {
  constructor(parent: Construct, name: string, { bucketName, ...context }: Props) {
    super(parent, name);

    const { bucketDomainName } = new S3(this, 'webBucket', {
      bucketName,
      ...context,
    });

    new CloudFront(this, 'webDistribution', { domainName: bucketDomainName, ...context });
  }
}
