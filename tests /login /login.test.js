const { test } = require('../testBase');
const { users } = require('../../fixtures/users');

const loginErrorCases = [
  { title: 'erreur avec mot de passe invalide', user: users.invalidPassword, message: 'Username and password do not match' },
  { title: 'erreur avec utilisateur bloqué', user: users.lockedOut, message: 'Sorry, this user has been locked out' },
  { title: 'erreur username obligatoire', user: users.emptyUsername, message: 'Username is required' },
  { title: 'erreur password obligatoire', user: users.emptyPassword, message: 'Password is required' },
];

test.describe('Authentification SauceDemo', () => {
  test('@smoke @login connexion valide avec standard_user', async ({ loginPage }) => {
    await test.step('learn - ouvrir la page de connexion', async () => {
      await loginPage.open();
    });

    await test.step('build - soumettre des identifiants valides', async () => {
      await loginPage.login(users.standard);
    });

    await test.step('deploy - vérifier l’accès au catalogue', async () => {
      await loginPage.expectSuccessfulLogin();
    });
  });

  for (const { title, user, message } of loginErrorCases) {
    test(`@regression @login ${title}`, async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.login(user);
      await loginPage.expectErrorContains(message);
    });
  }
});
