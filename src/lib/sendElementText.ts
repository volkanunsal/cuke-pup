import { retryCount } from '../const';
import { getPage } from './getPage';

/**
 * sendElementText types a text to the element specified by a selector.
 *
 * @category PageAdapter
 */
export async function sendElementText(
  selector: string,
  text: string,
): Promise<void> {
  const page = await getPage();
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.type(selector, text);
    } catch (_) /* istanbul ignore next */ {
      try {
        i++;
        await page.waitForSelector(selector);
        await page.evaluate('arguments[0].click()', selector);
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
