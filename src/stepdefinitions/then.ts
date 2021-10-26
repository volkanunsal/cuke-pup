import { searchPage } from '../pages/searchPage';
import { page } from '../support/hooks';
import { Then } from 'cucumber';

Then(/^I clear the search text$/, async () => {
  await page.clearElement(searchPage.searchTextBox);
});

Then(/^I click on google logo$/, async () => {
  await page.clickElement(searchPage.logo);
});
