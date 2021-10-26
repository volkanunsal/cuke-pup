import { getPage } from './getPage';

/**
 * screenshot takes a screenshot of the page.
 *
 * @category PageAdapter
 */
export async function screenshot(_name: string = ''): Promise<any> {
  const page = await getPage();
  try {
    // TODO: set the path? e.g. `./screenshot-${name}-${cnt++}.png`
    return await page.screenshot();
  } catch (e) /* istanbul ignore next */ {
    throw new Error(e.toString());
  }
}
