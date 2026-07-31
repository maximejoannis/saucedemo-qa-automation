const fs = require('node:fs');
const path = require('node:path');
const { chromium, expect } = require('@playwright/test');
const { LoginPage } = require('./src/pages/LoginPage');
const { InventoryPage } = require('./src/pages/InventoryPage');
const { standard } = require('./src/data/users');

const authDirectory = path.join(__dirname, 'playwright', '.auth');
const authFile = path.join(authDirectory, 'user.json');

module.exports = async function globalSetup(config) {
  fs.mkdirSync(authDirectory, { recursive: true });

  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({
      baseURL: config.projects[0].use.baseURL,
    });

    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(standard.username, standard.password);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toBeVisible();

    await context.storageState({
      path: authFile,
    });

    console.log(`StorageState généré : ${authFile}`);

    await context.close();
  } finally {
    await browser.close();
  }
};
