import * as cdk from '@aws-cdk/core';

import { S3 } from '../modules/s3';

export class DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appName = this.node.tryGetContext('appName');
    const env = this.node.tryGetContext('env');

    new S3(this, 'StaticSite', {
      bucketName: 'web',
      appName,
      env,
    });
  }
}
