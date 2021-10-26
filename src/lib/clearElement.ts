import { retryCount } from '../const';
import { getPage } from './getPage';

/**
 * clearElement clears the contents of the element specified by a selector.
 *
 * @category PageAdapter
 */
export async function clearElement(selector: string): Promise<void> {
  const page = await getPage();
  let i: number = 0;
  while (i < retryCount) {
    try {
      await page.evaluate(
        () =>
          ((document.querySelector(selector) as HTMLInputElement).value = ''),
      );
      const elementHandle = await page.$(selector);
      await elementHandle.click({ clickCount: 3 });
      return await elementHandle.press('Backspace');
    } catch (Exception) /* istanbul ignore next */ {
      try {
        i++;
        await page.waitForSelector(selector);
        await page.evaluate('arguments[0].click()', selector);
        continue;
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }
}
