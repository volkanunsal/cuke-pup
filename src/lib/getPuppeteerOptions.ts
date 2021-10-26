import { getChromeArgs } from './getChromeArgs';

export function getPuppeteerOptions() {
  return {
    args: getChromeArgs(),
    headless: true,
    ignoreHTTPSErrors: true,
    dumpio: false,
    defaultViewport: {
      deviceScaleFactor: 1,
      hasTouch: false,
      height: 1080,
      isLandscape: true,
      isMobile: false,
      width: 1920,
    },
    ignoreDefaultArgs: ['--disable-extensions'],
    product: 'chrome',
  };
}
