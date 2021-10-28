import { HookScenarioResult, Status, World } from '@cucumber';
import { screenshot } from '../lib/screenshot';

/**
 * afterEach is a Cucumber hook executed after each scenario. It's configured to take a
 * screenshot if the scenario fails.
 *
 * @category Hook
 */
export async function afterEach(this: World, scenario: HookScenarioResult) {
  if (scenario.result.status === Status.FAILED) {
    // screenShot is a base-64 encoded PNG
    const screenShot = await screenshot();
    this.attach(screenShot, 'image/png');
  }
}
