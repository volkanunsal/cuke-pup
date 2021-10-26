import { After, AfterAll, Before, BeforeAll, Status } from 'cucumber';
import { searchPage } from '../const/searchPage';
import { close, init, open, screenshot } from '../lib/PageAdapter';

BeforeAll({ timeout: 100 * 1000 }, async () => {
  await init();
});

Before(async () => {
  await open(searchPage.url);
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
  await close();
});
