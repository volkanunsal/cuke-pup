import { When } from 'cucumber';
import { searchPage } from '../const/searchPage';
import { enterKeys, sendElementText } from '../lib/PageAdapter';

When(/^I type "(.*?)"$/, async (text) => {
  await sendElementText(searchPage.searchTextBox, text);
});

When(/^I click on search button$/, async () => {
  await enterKeys('Enter');
});
