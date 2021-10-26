import { searchPage } from '../const';
import { sendElementText } from '../lib/sendElementText';

/**
 * typeTextIntoSearchBox is an action that types a text into the search box.
 *
 * @category Action
 */
export async function typeTextIntoSearchBox(text: string) {
  await sendElementText(searchPage.searchTextBox, text);
}
