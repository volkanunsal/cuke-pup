import { Given } from 'cucumber';
import expect from 'expect';
import { getTitle } from '../lib/PageAdapter';

Given(/^I am on "(.*?)" search page$/, async (text) => {
  await expect(getTitle()).resolves.toEqual(text);
});
