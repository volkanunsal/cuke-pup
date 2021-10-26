import { Browser, launch, Page } from 'puppeteer';

let browser: Browser;
let page: Page;

/**
 * getPage initializes or returns the Puppeteer page. It also starts page coverage metrics.
 */
export async function getPage() {
  if (page) return page;

  try {
    browser = await launch({
      headless: true,
      args: [
        '–no-sandbox',
        '–disable-setuid-sandbox',
        '--disable-notifications',
        '--start-maximized',
      ],
      ignoreHTTPSErrors: true,
      dumpio: false,
    });
    page = await browser.newPage();

    // TODO: does this work canary runtime?
    await page.coverage.startJSCoverage();
  } catch (e) /* istanbul ignore next */ {
    throw new Error(e.toString());
  }
}
