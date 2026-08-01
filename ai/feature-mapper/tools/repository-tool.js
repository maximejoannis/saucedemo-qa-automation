const fs = require('node:fs');
const path = require('node:path');
const { parsePageObject } = require('../parsers/page-object-parser');

function listJavaScriptFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Le répertoire des Page Objects est introuvable : ${directoryPath}`);
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
    .map((entry) => path.join(directoryPath, entry.name))
    .sort();
}

function analyzePageObjects({ pagesPath, projectRoot }) {
  const files = listJavaScriptFiles(pagesPath);
  const pageObjects = files.map((filePath) => {
    const source = fs.readFileSync(filePath, 'utf8');
    return parsePageObject(source, filePath, projectRoot);
  });

  return { pageObjects };
}

module.exports = { analyzePageObjects };
