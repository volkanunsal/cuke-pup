import { pressKey } from '../lib/pressKey';

/**
 * pressEnter is an action that presses the Enter key.
 *
 * @category Action
 */
export async function pressEnter(text: string) {
  await pressKey('Enter');
}
