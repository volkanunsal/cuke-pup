declare module 'Synthetics' {
  import { Page } from 'puppeteer';

  interface Synthetics {
    getDefaultLaunchOptions(): Promise<Record<string, any>>;
    launch(args: any): any;
    getPage(): Page;
    getConfiguration(): this;
    enableStepScreenshots(): boolean;
    runPuppeteer(): Promise<any>;
    takeScreenshot(name: string, ...rest: any[]): Promise<any>;
    executeStep(name: string, callback: () => any): Promise<any>;
  }

  const api: Synthetics;
  export default api;
}
