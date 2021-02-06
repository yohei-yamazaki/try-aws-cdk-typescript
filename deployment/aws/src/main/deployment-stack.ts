import * as cdk from '@aws-cdk/core';

import { S3 } from '../modules/s3';
import { Context } from '../types/context';

export class DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const context: Context = {
      appName: this.node.tryGetContext('appName'),
      env: this.node.tryGetContext('env'),
      region: this.node.tryGetContext('region'),
    };

    new S3(this, 'StaticSite', {
      bucketName: 'web',
      ...context,
    });
  }
}
