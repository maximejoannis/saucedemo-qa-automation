const { test, expect } = require('../../src/fixtures/test');
const users = require('../../src/data/users');

test.describe('US01 - Authentification', () => {
  test('TC-US01-AC01-01 connexion standard valide @smoke', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('TC-US01-AC01-02 connexion problem_user autorisée', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.problem.username, users.problem.password);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('TC-US01-AC01-03 connexion performance_glitch_user autorisée', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    test.slow();
    await loginPage.goto();
    await loginPage.login(users.performance.username, users.performance.password);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('TC-US01-AC01-05 déconnexion puis nouvelle connexion', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();

    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.loginButton).toBeVisible();

    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test('TC-US01-AC02-01 mot de passe invalide', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, 'wrong_password');

    await expect(loginPage.error).toContainText('Username and password do not match');
  });

  test('TC-US01-AC02-02 utilisateur bloqué', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.error).toContainText('locked out');
  });

  test('TC-US01-AC02-03 username obligatoire', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.password.fill(users.standard.password);
    await loginPage.submit();

    await expect(loginPage.error).toContainText('Username is required');
  });

  test('TC-US01-AC02-04 password obligatoire', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.username.fill(users.standard.username);
    await loginPage.submit();

    await expect(loginPage.error).toContainText('Password is required');
  });

  test('TC-US01-AC02-05 deux champs vides', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.submit();

    await expect(loginPage.error).toContainText('Username is required');
  });
});
