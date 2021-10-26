import { Browser, launch, Page, Response } from 'puppeteer';

export let browser: Browser;
export let page: Page;
export const retryCount: number = 3;

export async function init() {
  try {
    browser = await launch({
      headless: true,
      args: [
        '–no-sandbox',
        '–disable-setuid-sandbox',
        '--disable-notifications',
        '--start-maximized',
      ],
      ignoreHTTPSErrors: true,
      dumpio: false,
    });
    page = await browser.newPage();
    await Promise.all([page.coverage.startJSCoverage()]);
  } catch (Exception) /* istanbul ignore next */ {
    throw new Error(Exception.toString());
  }
}

export async function open(url: string): Promise<Response> {
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.goto(url);
    } catch (Exception) /* istanbul ignore next */ {
      i++;
      if (i === retryCount) {
        throw new Error(Exception.toString());
      }
    }
  }
}

export async function getTitle(): Promise<string> {
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.title();
    } catch (Exception) /* istanbul ignore next */ {
      i++;
      if (i === retryCount) {
        throw new Error(Exception.toString());
      }
    }
  }
}

export async function clickElement(element: string): Promise<void> {
  let i: number = 0;
  while (i < retryCount) {
    try {
      await page.waitForSelector(element);
      return await page.click(element);
    } catch (Exception) /* istanbul ignore next */ {
      try {
        i++;
        await page.waitForSelector(element);
        await page.evaluate('arguments[0].click()', element);
        continue;
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }
}

export async function sendElementText(
  element: string,
  text: string,
): Promise<void> {
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.type(element, text);
    } catch (Exception) /* istanbul ignore next */ {
      try {
        i++;
        await page.waitForSelector(element);
        await page.evaluate('arguments[0].click()', element);
        continue;
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }
}

export async function clearElement(element: string): Promise<void> {
  let i: number = 0;
  while (i < retryCount) {
    try {
      await page.evaluate(
        () =>
          ((document.querySelector(element) as HTMLInputElement).value = ''),
      );
      const elementHandle = await page.$(element);
      await elementHandle.click({ clickCount: 3 });
      return await elementHandle.press('Backspace');
    } catch (Exception) /* istanbul ignore next */ {
      try {
        i++;
        await page.waitForSelector(element);
        await page.evaluate('arguments[0].click()', element);
        continue;
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }
}
export async function enterKeys(keys: string): Promise<void> {
  let i: number = 0;
  while (i < retryCount) {
    try {
      return await page.keyboard.press(keys);
    } catch (Exception) /* istanbul ignore next */ {
      i++;
      if (i === retryCount) {
        throw new Error(Exception.toString());
      }
    }
  }
}

export async function screenshot(): Promise<any> {
  try {
    return await page.screenshot();
  } catch (Exception) /* istanbul ignore next */ {
    throw new Error(Exception.toString());
  }
}

export async function close() {
  try {
    const pti = require('puppeteer-to-istanbul');
    const [jsCoverage] = await Promise.all([page.coverage.stopJSCoverage()]);
    pti.write(jsCoverage);
  } catch (Exception) /* istanbul ignore next */ {
    console.error(Exception.toString());
  }
  await browser.close();
}
