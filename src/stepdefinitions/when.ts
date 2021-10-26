import { searchPage } from '../pages/searchPage';
import { page } from '../support/hooks';
import { When, Then } from 'cucumber';

When(/^I type "(.*?)"$/, async (text) => {
  await page.sendElementText(searchPage.searchTextBox, text);
});

When(/^I click on search button$/, async () => {
  await page.enterKeys('Enter');
});
