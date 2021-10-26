import { BeforeAll, Before, After, AfterAll, Status } from 'cucumber';
import { PageHelper } from '../pages/pageHelper';
import { searchPage } from '../pages/searchPage';

export const page = new PageHelper();

BeforeAll({ timeout: 100 * 1000 }, async () => {
  await page.init();
  // await page.open(searchPage.url);
});

Before(async () => {
  await page.open(searchPage.url);
});

/* istanbul ignore next */
After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    // screenShot is a base-64 encoded PNG
    const screenShot = await page.screenshot();
    this.attach(screenShot, 'image/png');
  }
});

AfterAll({ timeout: 100 * 1000 }, async () => {
  await page.close();
});
