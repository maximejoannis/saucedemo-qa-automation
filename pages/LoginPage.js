const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsTitle = page.locator('[data-test="title"]');
  }

  // learn: exposer une action métier lisible plutôt que des locators dispersés dans les tests.
  async open() {
    await this.page.goto('/');
  }

  // build: méthode réutilisable pour tous les profils de connexion.
  async login({ username, password }) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // deploy: assertion stable pour valider rapidement que l'application est exploitable en CI.
  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.productsTitle).toHaveText('Products');
  }

  async expectErrorContains(message) {
    await expect(this.errorMessage).toContainText(message);
  }
}

module.exports = { LoginPage };
