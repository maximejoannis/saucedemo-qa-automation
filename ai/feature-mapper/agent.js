const fs = require('node:fs');

const config = require('./config');

const { parseFunctionalMap } = require('./parsers/functional-map-parser');

const { writeJsonReport } = require('./reporters/json-reporter');

const { analyzePageObjects } = require('./tools/repository-tool');
const { analyzeTests } = require('./tools/test-analysis-tool');

const {
  validateFunctionalMapFile,
} = require('./validators/input-validator');

const {
  validateFeatureMap,
} = require('./validators/result-validator');

const {
  validateRepositoryAnalysis,
} = require('./validators/repository-validator');

const {
  validateTestAnalysis,
} = require('./validators/test-analysis-validator');

const {
  CorrelationEngine,
} = require('./reasoning/correlation-engine');

function runFeatureMapper() {
  validateFunctionalMapFile(config.functionalMapPath);

  const markdown = fs.readFileSync(
    config.functionalMapPath,
    'utf8',
  );

  const parsed = parseFunctionalMap(markdown);

  validateFeatureMap(parsed);

  const repository = analyzePageObjects({
    pagesPath: config.pagesPath,
    projectRoot: config.projectRoot,
  });

  validateRepositoryAnalysis(repository);

  const testAnalysis = analyzeTests({
    testsPath: config.testsPath,
    projectRoot: config.projectRoot,
  });

  validateTestAnalysis(testAnalysis);

  const correlationEngine = new CorrelationEngine();

  const mapping = correlationEngine.correlate({
    features: parsed.features,
    pageObjects: repository.pageObjects,
    tests: testAnalysis.tests,
  });

  const coveredFeatures = mapping.filter(
    (feature) => feature.status === 'covered',
  ).length;

  const result = {
    metadata: {
      generatedAt: new Date().toISOString(),
      agent: 'AI Feature Mapper',
      version: 'v4',
      schemaVersion: config.schemaVersion,
      sources: [
        'docs/functional-map.md',
        'src/pages/',
        'tests/',
      ],
    },

    summary: {
      featuresAnalyzed: parsed.features.length,

      coveredFeatures,

      uncoveredFeatures:
        parsed.features.length - coveredFeatures,

      coverage:
        parsed.features.length === 0
          ? 0
          : Number(
              (
                (coveredFeatures / parsed.features.length) *
                100
              ).toFixed(2),
            ),

      pageObjectsAnalyzed: repository.pageObjects.length,

      locatorsAnalyzed: repository.pageObjects.reduce(
        (total, pageObject) =>
          total + pageObject.locators.length,
        0,
      ),

      methodsAnalyzed: repository.pageObjects.reduce(
        (total, pageObject) =>
          total + pageObject.methods.length,
        0,
      ),

      testFilesAnalyzed: testAnalysis.testFiles.length,

      testsAnalyzed: testAnalysis.tests.length,

      fixturesReferenced: new Set(
        testAnalysis.tests.flatMap(
          (testCase) => testCase.fixtures,
        ),
      ).size,

      methodCallsAnalyzed: testAnalysis.tests.reduce(
        (total, testCase) =>
          total + testCase.methodCalls.length,
        0,
      ),
    },

    features: parsed.features,

    repository,

    testAnalysis,

    mapping,
  };

  writeJsonReport(config.outputPath, result);

  return result;
}

if (require.main === module) {
  try {
    const result = runFeatureMapper();

    console.log('');

    console.log('AI Feature Mapper');

    console.log('=================');

    console.log('');

    console.log(
      `Fonctionnalités : ${result.summary.featuresAnalyzed}`,
    );

    console.log(
      `Fonctionnalités couvertes : ${result.summary.coveredFeatures}`,
    );

    console.log(
      `Fonctionnalités non couvertes : ${result.summary.uncoveredFeatures}`,
    );

    console.log(
      `Couverture : ${result.summary.coverage}%`,
    );

    console.log('');

    console.log(
      `Page Objects : ${result.summary.pageObjectsAnalyzed}`,
    );

    console.log(`Tests : ${result.summary.testsAnalyzed}`);

    console.log('');

    console.log(`Résultat : ${config.outputPath}`);
  } catch (error) {
    console.error(`Échec de l'AI Feature Mapper : ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  runFeatureMapper,
};
