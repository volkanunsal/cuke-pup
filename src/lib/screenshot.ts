import { getPage } from './getPage';

/**
 * screenshot takes a screenshot of the page.
 *
 * @export
 */
export async function screenshot(): Promise<any> {
  const page = await getPage();
  try {
    return await page.screenshot();
  } catch (Exception) /* istanbul ignore next */ {
    throw new Error(Exception.toString());
  }
}
