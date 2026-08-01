const fs = require('node:fs');
const path = require('node:path');

function writeJsonReport(outputPath, payload) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

module.exports = { writeJsonReport };
