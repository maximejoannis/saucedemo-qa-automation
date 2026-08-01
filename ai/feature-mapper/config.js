const path = require('node:path');

const projectRoot = path.resolve(__dirname, '../..');

module.exports = {
  projectRoot,
  functionalMapPath: path.join(projectRoot, 'docs', 'functional-map.md'),
  outputPath: path.join(__dirname, 'output', 'feature-map.json'),
  schemaVersion: '1.0.0',
};
