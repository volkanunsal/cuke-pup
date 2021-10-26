import { getPage } from './getPage';

/**
 * closePage closes the Puppeteer page.
 *
 * @export
 */
export async function closePage() {
  const page = await getPage();
  try {
    const pti = require('puppeteer-to-istanbul');
    const [jsCoverage] = await Promise.all([page.coverage.stopJSCoverage()]);
    pti.write(jsCoverage);
  } catch (Exception) /* istanbul ignore next */ {
    console.error(Exception.toString());
  }
  await page.close();
}
