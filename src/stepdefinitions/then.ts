import { Then } from '@cucumber';
import { clearSearchText } from '../actions/clearSearchText';
import { clickOnGoogleLogo } from '../actions/clickOnGoogleLogo';

Then(/^I clear the search text$/, clearSearchText);

Then(/^I click on google logo$/, clickOnGoogleLogo);
