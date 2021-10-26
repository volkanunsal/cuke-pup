import { When } from 'cucumber';
import { pressEnter } from '../actions/pressEnter';
import { typeTextIntoSearchBox } from '../actions/typeTextIntoSearchBox';

When(/^I type "(.*?)"$/, typeTextIntoSearchBox);

When(/^I click on search button$/, pressEnter);
