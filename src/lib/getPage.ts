import pup, { Page } from 'puppeteer';
import { getPuppeteerOptions } from './getPuppeteerOptions';

let page: Page;

/**
 * getPage initializes or returns the Puppeteer page. It also starts page coverage metrics.
 *
 * @category PageAdapter
 */
export async function getPage() {
  if (page) return page;

  try {
    const browser = await pup.launch(getPuppeteerOptions());
    page = await browser.newPage();
    await page.coverage.startJSCoverage();
  } catch (e) /* istanbul ignore next */ {
    throw new Error(e.toString());
  }

  return page;
}
