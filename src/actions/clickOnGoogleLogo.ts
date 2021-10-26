import { searchPage } from '../const';
import { clickElement } from '../lib/clickElement';

/**
 * clickOnGoogleLogo is an action that clicks on Google logo.
 *
 * @category Action
 */
export async function clickOnGoogleLogo() {
  await clickElement(searchPage.logo);
}
