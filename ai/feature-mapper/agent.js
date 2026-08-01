const fs = require('node:fs');
const config = require('./config');
const { parseFunctionalMap } = require('./parsers/functional-map-parser');
const { writeJsonReport } = require('./reporters/json-reporter');
const { analyzePageObjects } = require('./tools/repository-tool');
const { validateFunctionalMapFile } = require('./validators/input-validator');
const { validateFeatureMap } = require('./validators/result-validator');
const { validateRepositoryAnalysis } = require('./validators/repository-validator');

function runFeatureMapper() {
  validateFunctionalMapFile(config.functionalMapPath);

  const markdown = fs.readFileSync(config.functionalMapPath, 'utf8');
  const parsed = parseFunctionalMap(markdown);
  validateFeatureMap(parsed);

  const repository = analyzePageObjects({
    pagesPath: config.pagesPath,
    projectRoot: config.projectRoot,
  });
  validateRepositoryAnalysis(repository);

  const result = {
    metadata: {
      generatedAt: new Date().toISOString(),
      agent: 'AI Feature Mapper',
      version: 'v2',
      schemaVersion: config.schemaVersion,
      sources: ['docs/functional-map.md', 'src/pages/'],
    },
    summary: {
      featuresAnalyzed: parsed.features.length,
      pageObjectsAnalyzed: repository.pageObjects.length,
      locatorsAnalyzed: repository.pageObjects.reduce(
        (total, pageObject) => total + pageObject.locators.length,
        0
      ),
      methodsAnalyzed: repository.pageObjects.reduce(
        (total, pageObject) => total + pageObject.methods.length,
        0
      ),
    },
    features: parsed.features,
    repository,
  };

  writeJsonReport(config.outputPath, result);
  return result;
}

if (require.main === module) {
  try {
    const result = runFeatureMapper();
    console.log(
      `AI Feature Mapper V2 : ${result.summary.featuresAnalyzed} fonctionnalités et ` +
        `${result.summary.pageObjectsAnalyzed} Page Objects exportés.`
    );
    console.log(`Résultat : ${config.outputPath}`);
  } catch (error) {
    console.error(`Échec de l'AI Feature Mapper : ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { runFeatureMapper };
