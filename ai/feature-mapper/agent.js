const fs = require('node:fs');
const config = require('./config');
const { parseFunctionalMap } = require('./parsers/functional-map-parser');
const { writeJsonReport } = require('./reporters/json-reporter');
const { validateFunctionalMapFile } = require('./validators/input-validator');
const { validateFeatureMap } = require('./validators/result-validator');

function runFeatureMapper() {
  validateFunctionalMapFile(config.functionalMapPath);

  const markdown = fs.readFileSync(config.functionalMapPath, 'utf8');
  const parsed = parseFunctionalMap(markdown);
  validateFeatureMap(parsed);

  const result = {
    metadata: {
      generatedAt: new Date().toISOString(),
      agent: 'AI Feature Mapper',
      version: 'v1',
      schemaVersion: config.schemaVersion,
      source: 'docs/functional-map.md',
    },
    summary: {
      featuresAnalyzed: parsed.features.length,
    },
    features: parsed.features,
  };

  writeJsonReport(config.outputPath, result);
  return result;
}

if (require.main === module) {
  try {
    const result = runFeatureMapper();
    console.log(
      `AI Feature Mapper V1 : ${result.summary.featuresAnalyzed} fonctionnalités exportées.`,
    );
    console.log(`Résultat : ${config.outputPath}`);
  } catch (error) {
    console.error(`Échec de l'AI Feature Mapper : ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { runFeatureMapper };
