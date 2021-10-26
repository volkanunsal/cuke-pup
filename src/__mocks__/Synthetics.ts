import { getPage } from '../lib/getPage';
import { getPuppeteerOptions } from '../lib/getPuppeteerOptions';
import { screenshot } from '../lib/screenshot';

export default {
  getDefaultLaunchOptions: () => Promise.resolve(getPuppeteerOptions()),
  launch: () => Promise.resolve(),
  runPuppeteer: getPage,
  getPage,
  takeScreenshot: screenshot,
  executeStep: async (name: string, func: () => Promise<void>) => {
    console.log(`step : ${name}`);
    await func();
  },
  getConfiguration: () => ({
    enableStepScreenshots: () => {},
  }),
};
