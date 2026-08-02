const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
  buildCoverageReport,
  generateCoverageReport,
} = require('../report/generate-coverage-report');

function createFeatureMap() {
  return {
    metadata: {
      generatedAt: '2026-08-02T10:00:00.000Z',
      version: 'v5',
      sources: ['docs/functional-map.md', 'tests/'],
    },
    summary: {
      testsAnalyzed: 3,
      testFilesAnalyzed: 2,
      pageObjectsAnalyzed: 2,
      methodsAnalyzed: 5,
      locatorsAnalyzed: 8,
      fixturesReferenced: 2,
      methodCallsAnalyzed: 7,
    },
    features: [
      { id: 'F01', name: 'Connexion', domain: 'Authentification' },
      { id: 'F20', name: 'Ajouter au panier', domain: 'Panier' },
      { id: 'F21', name: 'Retirer du panier', domain: 'Panier' },
    ],
    mapping: [
      {
        featureId: 'F01',
        featureName: 'Connexion',
        tests: ['test connexion', 'test connexion'],
        pageObjects: ['LoginPage'],
      },
      {
        featureId: 'F20',
        featureName: 'Ajouter au panier',
        tests: ['test ajout'],
        pageObjects: ['InventoryPage'],
      },
      {
        featureId: 'F21',
        featureName: 'Retirer du panier',
        tests: [],
        pageObjects: ['CartPage'],
      },
    ],
  };
}

test('calcule la couverture globale à partir des tests associés', () => {
  const report = buildCoverageReport(createFeatureMap());

  assert.equal(report.summary.features, 3);
  assert.equal(report.summary.covered, 2);
  assert.equal(report.summary.uncovered, 1);
  assert.equal(report.summary.coverage, 66.67);
  assert.equal(report.calculation.static.formula, '2 / 3 × 100');
});

test('compte les titres de tests distincts pour chaque fonctionnalité', () => {
  const report = buildCoverageReport(createFeatureMap());
  const login = report.features.find((feature) => feature.id === 'F01');

  assert.equal(login.testCount, 1);
  assert.deepEqual(login.tests, ['test connexion']);
});

test('calcule la couverture par domaine', () => {
  const report = buildCoverageReport(createFeatureMap());
  const cart = report.domains.find((domain) => domain.domain === 'Panier');

  assert.equal(cart.domain, 'Panier');
  assert.equal(cart.total, 2);
  assert.equal(cart.covered, 1);
  assert.equal(cart.uncovered, 1);
  assert.equal(cart.testAssociations, 1);
  assert.equal(cart.coverage, 50);
});

test('génère les fichiers JSON et HTML en français', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'coverage-report-'));
  const inputPath = path.join(tempDir, 'feature-map.json');
  const jsonOutputPath = path.join(tempDir, 'coverage-report.json');
  const htmlOutputPath = path.join(tempDir, 'coverage-report.html');

  fs.writeFileSync(inputPath, JSON.stringify(createFeatureMap()), 'utf8');

  generateCoverageReport({ inputPath, jsonOutputPath, htmlOutputPath });

  assert.equal(fs.existsSync(jsonOutputPath), true);
  assert.equal(fs.existsSync(htmlOutputPath), true);

  const html = fs.readFileSync(htmlOutputPath, 'utf8');
  assert.match(html, /Rapport de couverture fonctionnelle/);
  assert.match(html, /Couverture par domaine/);
  assert.match(html, /Détail du calcul/);
});

test('enrichit le rapport avec la dernière exécution Playwright', () => {
  const featureMap = createFeatureMap();
  featureMap.mapping[0].testReferences = [
    {
      title: 'test connexion',
      file: 'tests/us01-authentication/ac01-login.spec.js',
      line: 10,
    },
  ];

  const executionData = {
    source: 'Playwright JSON reporter',
    executions: [
      {
        title: 'test connexion',
        file: 'tests/us01-authentication/ac01-login.spec.js',
        project: 'chromium',
        status: 'passed',
        passed: true,
        failed: false,
        skipped: false,
        flaky: false,
        attempts: 1,
        duration: 100,
        traceAvailable: false,
        traces: [],
      },
    ],
  };

  const report = buildCoverageReport(featureMap, executionData);
  const login = report.features.find((feature) => feature.id === 'F01');

  assert.equal(report.summary.executionAvailable, true);
  assert.equal(login.execution.executed, 1);
  assert.equal(login.execution.passed, 1);
  assert.equal(login.execution.status, 'validée');
});
