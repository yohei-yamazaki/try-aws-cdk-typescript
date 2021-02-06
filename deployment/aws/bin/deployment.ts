#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { DeploymentStack } from '../src/main/deployment-stack';

const app = new cdk.App();
new DeploymentStack(app, 'DeploymentStack');