import { Response } from 'puppeteer';
import { getPage } from './getPage';

const retryCount: number = 3;

/**
 * openPage navigates the Puppeteer page to the specified url.
 *
 * @category PageAdapter
 */
export async function openPage(url: string): Promise<Response> {
  const page = await getPage();
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.goto(url);
    } catch (Exception) /* istanbul ignore next */ {
      i++;
      if (i === retryCount) {
        throw new Error(Exception.toString());
      }
    }
  }
}
