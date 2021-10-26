import { After, AfterAll, Before, BeforeAll, Status } from 'cucumber';
import { searchPage } from '../const';
import { closePage } from '../lib/closePage';
import { getPage } from '../lib/getPage';
import { openPage } from '../lib/openPage';
import { screenshot } from '../lib/screenshot';

BeforeAll({ timeout: 100 * 1000 }, async () => {
  await getPage();
});

Before(async () => {
  await openPage(searchPage.url);
});

/* istanbul ignore next */
After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    // screenShot is a base-64 encoded PNG
    const screenShot = await screenshot();
    this.attach(screenShot, 'image/png');
  }
});

AfterAll({ timeout: 100 * 1000 }, async () => {
  await closePage();
});
