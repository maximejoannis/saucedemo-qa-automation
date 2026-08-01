const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const config = require('../config');
const { parsePageObject } = require('../parsers/page-object-parser');

const loginPagePath = path.join(config.pagesPath, 'LoginPage.js');

test('analyse un Page Object réel', () => {
  const source = fs.readFileSync(loginPagePath, 'utf8');
  const result = parsePageObject(source, loginPagePath, config.projectRoot);

  assert.equal(result.name, 'LoginPage');
  assert.equal(result.file, 'src/pages/LoginPage.js');
  assert.equal(result.exported, true);
  assert.equal(result.locators.length, 4);
  assert.deepEqual(
    result.methods.map((method) => method.name),
    ['goto', 'login', 'submit']
  );
  assert.deepEqual(result.methods[1].actions, ['fill', 'click']);
});

test('refuse un fichier sans classe Page Object', () => {
  assert.throws(
    () => parsePageObject('module.exports = {};', loginPagePath, config.projectRoot),
    /Aucune classe Page Object/
  );
});
