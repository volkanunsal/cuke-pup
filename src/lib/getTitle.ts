import { retryCount } from '../const';
import { getPage } from './getPage';

/**
 * getTitle extracts the title of a page.
 *
 * @category PageAdapter
 */
export async function getTitle(): Promise<string> {
  const page = await getPage();
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.title();
    } catch (Exception) /* istanbul ignore next */ {
      i++;
      if (i === retryCount) {
        throw new Error(Exception.toString());
      }
    }
  }
}
