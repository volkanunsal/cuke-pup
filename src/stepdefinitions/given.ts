import { Given } from 'cucumber';
import { verifyTitle } from '../actions/verifyTitle';

Given(/^I am on "(.*?)" search page$/, verifyTitle);
