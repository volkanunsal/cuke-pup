// import {
//   BootstrapStack,
//   CodeReviewVerificationApprovalWorkflowStep,
//   DeploymentPipeline,
//   SoftwareType,
//   VersionSetPlatform,
// } from '@amzn/pipelines';
// import * as cdk from '@aws-cdk/core';

// // Set up your CDK App
// const app = new cdk.App();

// // TODO:
// const ACCOUNT_ID = 'ACCOUNT_ID';
// // TODO:
// const PIPELINE_ID = 'PIPELINE_ID';
// // TODO:
// const PIPELINE_EMAIL = 'PIPELINE_EMAIL';
// // TODO:
// const PIPELINE_POSIX = 'PIPELINE_POSIX';
// // TODO:
// const bindle = 'bindle';
// const US_WEST_2 = 'us-west-2';
// enum Stage {
//   GAMMA = 'gamma',
// }

// const pipeline = new DeploymentPipeline(app, 'Pipeline', {
//   account: ACCOUNT_ID,
//   pipelineName: 'SMCanvasUISyntheticCanary',
//   versionSet: 'SMCanvasUISyntheticCanary/development',
//   versionSetPlatform: VersionSetPlatform.AL2012,
//   trackingVersionSet: 'live',
//   bindleGuid: bindle,
//   description: 'A CDK Managed pipeline for SMCanvasUISyntheticCanary',
//   pipelineId: PIPELINE_ID,
//   selfMutate: true,
//   changeSetApproverProps: {
//     emailList: PIPELINE_EMAIL,
//     posixApproverGroup: PIPELINE_POSIX,
//     autoAddChangeSetApproval: false,
//   },
// });

// // setupWaves(app, pipeline);
// const waves = [
//   {
//     waveName: 'Gamma-PDX',
//     stage: Stage.GAMMA,
//     deploymentGroups: [
//       {
//         name: `${Stage.GAMMA}-PDX`,
//         region: US_WEST_2,
//         cell: '1',
//         softwareType: SoftwareType.INFRASTRUCTURE,
//       },
//       {
//         name: `${Stage.GAMMA}-PDX`,
//         region: US_WEST_2,
//         cell: '2',
//         softwareType: SoftwareType.INFRASTRUCTURE,
//       },
//     ],
//   },
// ];
// waves.forEach(() => {
//   // const pStage = pipeline.addStage(name, {
//   //   prod: stage === STAGE.PROD,
//   // });
//   // deploymentGroups.forEach(({ name, region, cell, softwareType }) => {
//   // const airportCode =
//   //   getAirportFromRegion[region].toLocaleUpperCase();
//   // const group = pStage.addDeploymentGroup({
//   //   name: `${getFirstLetterUpperCase(stage)}-${airportCode}-Cell-${cell}`,
//   // });
//   // const account = canaryAccountId[region][`${stage}-${cell}`];
//   // const stackProps = {
//   //   softwareType,
//   //   env: pipeline.deploymentEnvironmentFor(account, region),
//   //   terminationProtection: true,
//   // };
//   // const stack = new UIStack(
//   //   app,
//   //   `${STACK_NAME}-${name}-Cell-${cell}`,
//   //   { ...stackProps },
//   //   stage,
//   //   cell,
//   // );
//   // const dashboardStack = new CloudWatchStack(
//   //   app,
//   //   `${STACK_NAME}-Dashboard-${name}-Cell-${cell}`,
//   //   { ...stackProps },
//   //   stage,
//   //   cell,
//   // );
//   // group.addStacks(stack, dashboardStack);
//   // const stageApprovalWorkflow = getStageApprovalWorkflow(pStage, group);
//   // if (stage === STAGE.PROD) {
//   //   cell === '1' &&
//   //     pStage.addInboundTimeWindowBlocker({
//   //       windowName: `Lily-${getAirportFromRegion[
//   //         region as REGION_NAME
//   //       ].toLocaleUpperCase()}`,
//   //     });
//   // } else {
//   //   cell === '2' &&
//   //     stageApprovalWorkflow.addStep(
//   //       createChangeSetApprovalStep(pipeline, stack),
//   //     );
//   // }
//   // // Gamma-PDX-Cell-1 => (cf and nginx), Gamma-PDX-Cell-2 => (nginx) and rest all prod => cf, so we need extra (cf) monitors for Gamma-PDX-Cell-1
//   // if (stage === 'gamma' && cell === '1') {
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         `cf-${APP_NAME.HUDSON}`,
//   //       ),
//   //     ),
//   //   );
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         `cf-${APP_NAME.LOCKE}`,
//   //       ),
//   //     ),
//   //   );
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         `cf-${APP_NAME.CLOVER}`,
//   //       ),
//   //     ),
//   //   );
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         `cf-${APP_NAME.HUDSON_V2}`,
//   //       ),
//   //     ),
//   //   );
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         `cf-${APP_NAME.HUDSON_V2_NO_WIDGETS}`,
//   //       ),
//   //     ),
//   //   );
//   // }
//   // if (enableCanary(region, APP_NAME.HUDSON)) {
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         APP_NAME.HUDSON,
//   //       ),
//   //     ),
//   //   );
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         APP_NAME.HUDSON_V2,
//   //       ),
//   //     ),
//   //   );
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         APP_NAME.HUDSON_V2_NO_WIDGETS,
//   //       ),
//   //     ),
//   //   );
//   // }
//   // if (enableCanary(region, APP_NAME.LOCKE)) {
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         APP_NAME.LOCKE,
//   //       ),
//   //     ),
//   //   );
//   // }
//   // if (enableCanary(region, APP_NAME.CLOVER)) {
//   //   stageApprovalWorkflow.addStep(
//   //     composeCloudwatchToCarnavalStep(
//   //       createCarnavalProps(
//   //         { stage, cell, region },
//   //         `${STACK_NAME}-${name}-Cell-${cell}`,
//   //         account,
//   //         APP_NAME.CLOVER,
//   //       ),
//   //     ),
//   //   );
//   // }
//   // stageApprovalWorkflow.addStep(
//   //   createBakeTimeApprovalStep(name, { stage, region, cell }),
//   // );
//   // });
//   // stage === STAGE.PROD && addPipelineInboundTimeBlockers(pStage);
// });

// // Add CR verification
// pipeline
//   .versionSetStage()
//   .addApprovalWorkflow('Code Review Verification')
//   .addStep(new CodeReviewVerificationApprovalWorkflowStep());

// BootstrapStack.personalBootstrap(app, {
//   account: 'your account',
//   region: 'target region',
//   disambiguator: 'string to identify personal stacks',
// });
