const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const config = require('../config');
const { parsePlaywrightTestFile } = require('../parsers/test-parser');
const { analyzeTests } = require('../tools/test-analysis-tool');

const authenticationSpecPath = path.join(
  config.testsPath,
  'us01-authentication',
  'ac01-login.spec.js'
);

test('analyse un fichier de tests Playwright réel', () => {
  const source = fs.readFileSync(authenticationSpecPath, 'utf8');
  const result = parsePlaywrightTestFile({
    source,
    filePath: authenticationSpecPath,
    projectRoot: config.projectRoot,
  });

  assert.equal(result.file, 'tests/us01-authentication/ac01-login.spec.js');
  assert.deepEqual(result.suites, ['US01 - Authentification']);
  assert.equal(result.tests.length, 9);
  assert.deepEqual(result.dataSources, [
    {
      file: 'src/data/users.js',
      imports: ['users'],
    },
  ]);

  const firstTest = result.tests[0];
  assert.equal(firstTest.title, 'TC-US01-AC01-01 connexion standard valide @smoke');
  assert.equal(firstTest.suite, 'US01 - Authentification');
  assert.deepEqual(firstTest.fixtures, ['page', 'loginPage', 'inventoryPage']);
  assert.deepEqual(firstTest.pageObjects, ['loginPage']);
  assert.deepEqual(firstTest.methodCalls, ['loginPage.goto', 'loginPage.login']);
  assert.equal(Number.isInteger(firstTest.line), true);
});

test('analyse tous les fichiers .spec.js du projet', () => {
  const result = analyzeTests({
    testsPath: config.testsPath,
    projectRoot: config.projectRoot,
  });

  assert.equal(result.testFiles.length, 5);
  assert.equal(result.tests.length, 43);
  assert.deepEqual(
    result.testFiles.map((file) => file.file),
    [
      'tests/us01-authentication/ac01-login.spec.js',
      'tests/us02-catalogue/ac01-catalogue.spec.js',
      'tests/us03-panier/ac01-panier.spec.js',
      'tests/us04-checkout/ac01-informations.spec.js',
      'tests/us05-e2e/ac01-commande.spec.js',
    ]
  );
});

test('refuse un contenu de test invalide', () => {
  assert.throws(
    () =>
      parsePlaywrightTestFile({
        source: null,
        filePath: authenticationSpecPath,
        projectRoot: config.projectRoot,
      }),
    /chaîne de caractères/
  );
});
