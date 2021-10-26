import { After, AfterAll, Before, BeforeAll } from 'cucumber';
import { afterEach } from '../actions/afterEach';
import { beforeEach } from '../actions/beforeEach';
import { closePage } from '../lib/closePage';
import { getPage } from '../lib/getPage';

BeforeAll({ timeout: 100 * 1000 }, async () => {
  await getPage();
});

Before(beforeEach);

After(afterEach);

AfterAll({ timeout: 100 * 1000 }, async () => {
  await closePage();
});
