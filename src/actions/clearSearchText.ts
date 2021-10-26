import { searchPage } from '../const';
import { clearElement } from '../lib/clearElement';

/**
 * clearSearchText is an action that clears the contents of the search box.
 *
 * @category Action
 */
export async function clearSearchText() {
  await clearElement(searchPage.searchTextBox);
}
