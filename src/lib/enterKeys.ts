import { retryCount } from '../const';
import { getPage } from './getPage';

/**
 * enterKeys simulates keyboard press to send the specified key to the page.
 *
 * @category PageAdapter
 */
export async function enterKeys(keys: string): Promise<void> {
  const page = await getPage();
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.keyboard.press(keys);
    } catch (Exception) /* istanbul ignore next */ {
      i++;
      if (i === retryCount) {
        throw new Error(Exception.toString());
      }
    }
  }
}
