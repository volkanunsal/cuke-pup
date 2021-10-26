import { Browser, launch, Page, Response } from 'puppeteer';

export class PageHelper {
  private browser: Browser;
  private page: Page;
  private readonly retryCount: number = 3;

  async init() {
    try {
      this.browser = await launch({
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
      this.page = await this.browser.newPage();
      await Promise.all([this.page.coverage.startJSCoverage()]);
    } catch (Exception) /* istanbul ignore next */ {
      throw new Error(Exception.toString());
    }
  }

  async open(url: string): Promise<Response> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.goto(url);
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }

  async getTitle(): Promise<string> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.title();
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }

  async clickElement(element: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        await this.page.waitForSelector(element);
        return await this.page.click(element);
      } catch (Exception) /* istanbul ignore next */ {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) /* istanbul ignore next */ {
          i++;
          if (i === this.retryCount) {
            throw new Error(Exception.toString());
          }
        }
      }
    }
  }

  async sendElementText(element: string, text: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.type(element, text);
      } catch (Exception) /* istanbul ignore next */ {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) /* istanbul ignore next */ {
          i++;
          if (i === this.retryCount) {
            throw new Error(Exception.toString());
          }
        }
      }
    }
  }

  async clearElement(element: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        await this.page.evaluate(
          () =>
            ((document.querySelector(element) as HTMLInputElement).value = ''),
        );
        const elementHandle = await this.page.$(element);
        await elementHandle.click({ clickCount: 3 });
        return await elementHandle.press('Backspace');
      } catch (Exception) /* istanbul ignore next */ {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) /* istanbul ignore next */ {
          i++;
          if (i === this.retryCount) {
            throw new Error(Exception.toString());
          }
        }
      }
    }
  }
  async enterKeys(keys: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.keyboard.press(keys);
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }

  async screenshot(): Promise<any> {
    try {
      return await this.page.screenshot();
    } catch (Exception) /* istanbul ignore next */ {
      throw new Error(Exception.toString());
    }
  }

  async close() {
    try {
      const pti = require('puppeteer-to-istanbul');
      const [jsCoverage] = await Promise.all([
        this.page.coverage.stopJSCoverage(),
      ]);
      pti.write(jsCoverage);
    } catch (Exception) /* istanbul ignore next */ {
      console.error(Exception.toString());
    }
    await this.browser.close();
  }
}
