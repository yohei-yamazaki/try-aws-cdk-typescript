import cloudfront = require('@aws-cdk/aws-cloudfront');
import { Bucket } from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

import { Context } from '../../types/context';

export type CloudFrontProps = {
  bucket: Bucket;
  // aliases: string;
  // acmCertificateArn: string;
} & Context;

export class CloudFront extends Construct {
  constructor(parent: Construct, name: string, { bucket, env, appName }: CloudFrontProps) {
    super(parent, name);

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'SiteOriginAccessIdentity', {
      comment: `${env} ${appName}: s3 get OriginAccessIdentity`,
    });

    new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      viewerCertificate: {
        aliases: [], // props.alisaes
        props: {
          cloudFrontDefaultCertificate: true,
        },
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity,
          },
          customOriginSource: {
            domainName: bucket.bucketDomainName,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}
