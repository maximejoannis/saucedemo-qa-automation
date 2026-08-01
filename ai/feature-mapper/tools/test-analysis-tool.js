const fs = require('node:fs');
const path = require('node:path');
const { parsePlaywrightTestFile } = require('../parsers/test-parser');

function discoverSpecFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return discoverSpecFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.spec.js') ? [entryPath] : [];
  });
}

function analyzeTests({ testsPath, projectRoot }) {
  if (!fs.existsSync(testsPath)) {
    throw new Error(`Le dossier de tests est introuvable : ${testsPath}`);
  }

  const files = discoverSpecFiles(testsPath)
    .sort()
    .map((filePath) =>
      parsePlaywrightTestFile({
        source: fs.readFileSync(filePath, 'utf8'),
        filePath,
        projectRoot,
      })
    );

  return {
    testFiles: files,
    tests: files.flatMap((file) => file.tests),
  };
}

module.exports = { analyzeTests, discoverSpecFiles };
