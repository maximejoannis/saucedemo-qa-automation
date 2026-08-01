const path = require('node:path');

const projectRoot = path.resolve(__dirname, '../..');

module.exports = {
  projectRoot,
  functionalMapPath: path.join(projectRoot, 'docs', 'functional-map.md'),
  pagesPath: path.join(projectRoot, 'src', 'pages'),
  outputPath: path.join(__dirname, 'output', 'feature-map.json'),
  schemaVersion: '1.1.0',
};
