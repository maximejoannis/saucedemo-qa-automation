const { chromium } = require('@playwright/test');

class PlaywrightExplorer {
  constructor(config = {}) {
    this.baseURL = config.baseURL || 'https://www.saucedemo.com/';
    this.headless = config.headless ?? true;

    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async start() {
    this.browser = await chromium.launch({
      headless: this.headless,
    });

    this.context = await this.browser.newContext({
      baseURL: this.baseURL,
    });

    this.page = await this.context.newPage();
  }

  async stop() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async login(username, password) {
    await this.page.goto('/');

    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);

    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);

    await this.page
      .getByRole('button', {
        name: 'Login',
        exact: true,
      })
      .click();

    await this.page.waitForURL('**/inventory.html');
  }

  async observeCurrentPage() {
    const title = await this.page.title();
    const url = this.page.url();

    const buttons = await this.page
      .locator('button')
      .evaluateAll((elements) => elements.map((button) => button.innerText.trim()).filter(Boolean));

    const links = await this.page
      .locator('a')
      .evaluateAll((elements) => elements.map((link) => link.innerText.trim()).filter(Boolean));

    const inputs = await this.page
      .locator('input')
      .evaluateAll((elements) =>
        elements
          .map(
            (input) =>
              input.getAttribute('placeholder') ||
              input.getAttribute('name') ||
              input.getAttribute('id')
          )
          .filter(Boolean)
      );

    return {
      title,
      url,
      buttons,
      links,
      inputs,
    };
  }

  async explore() {
    const observations = [];

    observations.push(await this.observeCurrentPage());

    await this.page.locator('[data-test="shopping-cart-link"]').click();

    await this.page.waitForURL('**/cart.html');

    observations.push(await this.observeCurrentPage());

    return observations;
  }
}

module.exports = {
  PlaywrightExplorer,
};
