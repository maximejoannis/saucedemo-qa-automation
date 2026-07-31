const path = require('node:path');
const { chromium, expect } = require('@playwright/test');
const { LoginPage } = require('./src/pages/LoginPage');
const { InventoryPage } = require('./src/pages/InventoryPage');
const { standard } = require('./src/data/users');

const authFile = path.join(__dirname, 'playwright', '.auth', 'user.json');

module.exports = async function globalSetup(config) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL: config.projects[0].use.baseURL });
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(standard.username, standard.password);
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.title).toBeVisible();
  await page.context().storageState({ path: authFile });

  await browser.close();
};
