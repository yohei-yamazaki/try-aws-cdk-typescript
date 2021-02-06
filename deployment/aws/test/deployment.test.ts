import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';

import { DeploymentStack } from '../lib/deployment-stack';

test('Empty Stack', () => {
  const app = new App();
  // WHEN
  const stack = new DeploymentStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT,
    ),
  );
});
