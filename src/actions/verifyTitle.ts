import expect from 'expect';
import { getTitle } from '../lib/getTitle';

/**
 * verifyTitle is an action that checks if the title of a page matches the expected result.
 * (In this context, an "action" is a callback function of a Cucumber step definition.)
 *
 * @category Action
 */
export async function verifyTitle(text: string) {
  await expect(getTitle()).resolves.toEqual(text);
}
