import cloudfront = require('@aws-cdk/aws-cloudfront');
import { Construct } from '@aws-cdk/core';

import { Context } from '../../types/context';

type Props = {
  domainName: string;
  // aliases: string;
  // acmCertificateArn: string;
} & Context;

export class CloudFront extends Construct {
  constructor(parent: Construct, name: string, { domainName }: Props) {
    super(parent, name);

    new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      originConfigs: [
        {
          customOriginSource: {
            domainName,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}
