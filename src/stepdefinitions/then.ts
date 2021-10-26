import { Then } from 'cucumber';
import { searchPage } from '../const';
import { clearElement } from '../lib/clearElement';
import { clickElement } from '../lib/clickElement';

Then(/^I clear the search text$/, async () => {
  await clearElement(searchPage.searchTextBox);
});

Then(/^I click on google logo$/, async () => {
  await clickElement(searchPage.logo);
});
