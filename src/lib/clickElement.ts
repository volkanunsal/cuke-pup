import { retryCount } from '../const';
import { getPage } from './getPage';

/**
 * clickElement attempts to click an element. If element is not visible, it will wait for the element
 * to appear.
 */
export async function clickElement(element: string): Promise<void> {
  const page = await getPage();
  let i: number = 0;
  while (i < retryCount) {
    try {
      await page.waitForSelector(element);
      return await page.click(element);
    } catch (_) /* istanbul ignore next */ {
      try {
        i++;
        await page.waitForSelector(element);
        await page.evaluate('arguments[0].click()', element);
        continue;
      } catch (e) /* istanbul ignore next */ {
        i++;
        if (i === retryCount) {
          throw new Error(e.toString());
        }
      }
    }
  }
}
