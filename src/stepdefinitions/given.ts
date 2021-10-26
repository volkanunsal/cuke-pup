import { page } from '../support/hooks';
import { Given } from 'cucumber';
import expect from 'expect';

Given(/^I am on "(.*?)" search page$/, async (text) => {
  console.log('page.getTitle(): ', await page.getTitle());

  await expect(page.getTitle()).resolves.toEqual(text);
});
