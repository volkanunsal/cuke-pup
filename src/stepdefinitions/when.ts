import { When } from 'cucumber';
import { searchPage } from '../const';
import { enterKeys } from '../lib/enterKeys';
import { sendElementText } from '../lib/sendElementText';

When(/^I type "(.*?)"$/, async (text) => {
  await sendElementText(searchPage.searchTextBox, text);
});

When(/^I click on search button$/, async () => {
  await enterKeys('Enter');
});
