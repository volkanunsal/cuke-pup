import { page } from '../support/hooks';
import { Given } from 'cucumber';
import expect from 'expect';

Given(/^I am on "(.*?)" search page$/, async (text) => {
  await expect(page.getTitle()).resolves.toEqual(text);
});
