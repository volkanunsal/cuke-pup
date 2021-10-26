import { searchPage } from '../const';
import { openPage } from '../lib/openPage';

/**
 * beforeEach is a Cucumber hook executed before each scenario.
 *
 * @category Hook
 */
export async function beforeEach() {
  await openPage(searchPage.url);
}
