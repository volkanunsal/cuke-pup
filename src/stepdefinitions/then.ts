import { Then } from 'cucumber';
import { searchPage } from '../const/searchPage';
import { clearElement, clickElement } from '../lib/PageAdapter';

Then(/^I clear the search text$/, async () => {
  await clearElement(searchPage.searchTextBox);
});

Then(/^I click on google logo$/, async () => {
  await clickElement(searchPage.logo);
});
