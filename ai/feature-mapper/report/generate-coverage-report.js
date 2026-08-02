const fs = require('node:fs');
const path = require('node:path');
const { readPlaywrightResults } = require('../execution/playwright-results-parser');

const projectRoot = path.resolve(__dirname, '../../..');
const defaultInputPath = path.join(
  projectRoot,
  'ai',
  'feature-mapper',
  'output',
  'feature-map.json'
);
const defaultJsonOutputPath = path.join(
  projectRoot,
  'ai',
  'feature-mapper',
  'output',
  'coverage-report.json'
);
const defaultHtmlOutputPath = path.join(
  projectRoot,
  'ai',
  'feature-mapper',
  'output',
  'coverage-report.html'
);
const defaultExecutionInputPath = path.join(
  projectRoot,
  'ai',
  'feature-mapper',
  'output',
  'playwright-results.json'
);

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function round(value) {
  return Number(value.toFixed(2));
}

function calculateRate(covered, total) {
  return total === 0 ? 0 : round((covered / total) * 100);
}

function normalizeFile(file) {
  return String(file || '')
    .replaceAll('\\', '/')
    .replace(/^\.\//, '');
}

function executionKey(file, title) {
  return `${normalizeFile(file)}::${String(title || '').trim()}`;
}

function aggregateExecutions(executionData) {
  const byTest = new Map();

  for (const execution of executionData?.executions || []) {
    const key = executionKey(execution.file, execution.title);
    const current = byTest.get(key) || {
      title: execution.title,
      file: execution.file,
      projects: [],
      executed: false,
      passed: true,
      failed: false,
      skipped: true,
      flaky: false,
      traceAvailable: false,
    };

    current.projects.push({
      project: execution.project,
      status: execution.status,
      attempts: execution.attempts,
      duration: execution.duration,
      traceAvailable: execution.traceAvailable,
      traces: execution.traces,
    });
    current.executed = current.executed || !execution.skipped;
    current.passed = current.passed && (execution.passed || execution.skipped);
    current.failed = current.failed || execution.failed;
    current.skipped = current.skipped && execution.skipped;
    current.flaky = current.flaky || execution.flaky;
    current.traceAvailable = current.traceAvailable || execution.traceAvailable;
    byTest.set(key, current);
  }

  return byTest;
}

function buildCoverageReport(featureMap, executionData = null) {
  const featuresById = new Map((featureMap.features || []).map((feature) => [feature.id, feature]));
  const executionIndex = aggregateExecutions(executionData);
  const executionAvailable = Boolean(executionData);

  const details = (featureMap.mapping || []).map((mapping) => {
    const feature = featuresById.get(mapping.featureId) || {};
    const tests = unique(mapping.tests);
    const pageObjects = unique(mapping.pageObjects);
    const references = mapping.testReferences || tests.map((title) => ({ title, file: null }));
    const executionTests = references.map((reference) => {
      const exact = executionIndex.get(executionKey(reference.file, reference.title));
      if (exact) return { ...exact, line: reference.line || null };

      const candidates = [...executionIndex.values()].filter(
        (item) => item.title === reference.title
      );
      return candidates.length === 1
        ? { ...candidates[0], line: reference.line || null }
        : {
            title: reference.title,
            file: reference.file || null,
            line: reference.line || null,
            projects: [],
            executed: false,
            passed: false,
            failed: false,
            skipped: false,
            flaky: false,
            traceAvailable: false,
          };
    });

    const covered = tests.length > 0;
    const executedTests = executionTests.filter((testCase) => testCase.executed);
    const passedTests = executionTests.filter(
      (testCase) => testCase.executed && testCase.passed && !testCase.failed
    );
    const failedTests = executionTests.filter((testCase) => testCase.failed);
    const executionStatus = !executionAvailable
      ? 'non-disponible'
      : !covered
        ? 'non-couverte'
        : executedTests.length === 0
          ? 'non-exécutée'
          : failedTests.length > 0
            ? 'en-échec'
            : executedTests.length < executionTests.length
              ? 'partiellement-exécutée'
              : 'validée';

    return {
      id: mapping.featureId,
      name: mapping.featureName || feature.name || mapping.featureId,
      domain: feature.domain || 'Non renseigné',
      description: feature.description || '',
      status: covered ? 'couverte' : 'non-couverte',
      covered,
      testCount: tests.length,
      tests,
      testReferences: references,
      pageObjectCount: pageObjects.length,
      pageObjects,
      execution: {
        available: executionAvailable,
        status: executionStatus,
        associated: executionTests.length,
        executed: executedTests.length,
        passed: passedTests.length,
        failed: failedTests.length,
        notExecuted: Math.max(executionTests.length - executedTests.length, 0),
        traceCount: executionTests.filter((testCase) => testCase.traceAvailable).length,
        tests: executionTests,
      },
    };
  });

  const domainGroups = new Map();
  for (const feature of details) {
    const domain = domainGroups.get(feature.domain) || {
      domain: feature.domain,
      total: 0,
      covered: 0,
      uncovered: 0,
      executed: 0,
      validated: 0,
      failed: 0,
      testAssociations: 0,
    };
    domain.total += 1;
    domain.covered += feature.covered ? 1 : 0;
    domain.uncovered += feature.covered ? 0 : 1;
    domain.executed += feature.execution.executed > 0 ? 1 : 0;
    domain.validated += feature.execution.status === 'validée' ? 1 : 0;
    domain.failed += feature.execution.status === 'en-échec' ? 1 : 0;
    domain.testAssociations += feature.testCount;
    domainGroups.set(feature.domain, domain);
  }

  const domains = [...domainGroups.values()]
    .map((domain) => ({
      ...domain,
      coverage: calculateRate(domain.covered, domain.total),
      executionCoverage: calculateRate(domain.executed, domain.total),
      validatedCoverage: calculateRate(domain.validated, domain.total),
    }))
    .sort((a, b) => a.domain.localeCompare(b.domain, 'fr'));

  const total = details.length;
  const covered = details.filter((feature) => feature.covered).length;
  const uncovered = total - covered;
  const executed = details.filter((feature) => feature.execution.executed > 0).length;
  const validated = details.filter((feature) => feature.execution.status === 'validée').length;
  const failed = details.filter((feature) => feature.execution.status === 'en-échec').length;

  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      title: 'Rapport de couverture fonctionnelle des tests automatisés',
      application: 'SauceDemo',
      sourceGeneratedAt: featureMap.metadata?.generatedAt || null,
      sourceAgentVersion: featureMap.metadata?.version || null,
      sources: featureMap.metadata?.sources || [],
      calculationMode: executionAvailable
        ? 'corrélation statique enrichie par la dernière exécution Playwright'
        : 'corrélation statique',
      executionResultsAvailable: executionAvailable,
      executionSource: executionData?.source || null,
    },
    calculation: {
      static: {
        rule: "Une fonctionnalité est couverte lorsqu'au moins un test automatisé distinct lui est associé.",
        numerator: covered,
        denominator: total,
        formula: `${covered} / ${total} × 100`,
        result: calculateRate(covered, total),
      },
      executed: {
        rule: "Une fonctionnalité est exécutée lorsqu'au moins un test associé apparaît comme exécuté dans le rapport JSON Playwright.",
        numerator: executed,
        denominator: total,
        formula: `${executed} / ${total} × 100`,
        result: calculateRate(executed, total),
        available: executionAvailable,
      },
      validated: {
        rule: 'Une fonctionnalité est validée lorsque tous ses tests associés observés dans la dernière exécution sont exécutés sans échec.',
        numerator: validated,
        denominator: total,
        formula: `${validated} / ${total} × 100`,
        result: calculateRate(validated, total),
        available: executionAvailable,
      },
    },
    summary: {
      features: total,
      covered,
      uncovered,
      coverage: calculateRate(covered, total),
      executionAvailable,
      executed,
      executionCoverage: calculateRate(executed, total),
      validated,
      validatedCoverage: calculateRate(validated, total),
      failed,
      testsAnalyzed: featureMap.summary?.testsAnalyzed || 0,
      testFilesAnalyzed: featureMap.summary?.testFilesAnalyzed || 0,
      pageObjectsAnalyzed: featureMap.summary?.pageObjectsAnalyzed || 0,
      methodsAnalyzed: featureMap.summary?.methodsAnalyzed || 0,
      locatorsAnalyzed: featureMap.summary?.locatorsAnalyzed || 0,
      fixturesReferenced: featureMap.summary?.fixturesReferenced || 0,
      methodCallsAnalyzed: featureMap.summary?.methodCallsAnalyzed || 0,
    },
    domains,
    features: details.sort((a, b) => a.id.localeCompare(b.id, 'fr')),
    uncoveredFeatures: details.filter((feature) => !feature.covered),
    failedFeatures: details.filter((feature) => feature.execution.status === 'en-échec'),
    limitations: executionAvailable
      ? [
          'La relation entre fonctionnalité et test reste issue de la corrélation statique.',
          "Les résultats Playwright confirment l'exécution et le statut des tests associés, mais ne prouvent pas encore quelle assertion correspond précisément à chaque fonctionnalité.",
          "Les traces sont signalées lorsqu'elles existent ; elles ne sont pas encore analysées action par action.",
        ]
      : [
          "Aucun rapport JSON Playwright n'a été trouvé : seules les associations statiques sont affichées.",
          'Exécuter npm run ai:report:executed pour enrichir le rapport avec les statuts réels.',
        ],
    evolution: {
      title: "Évolution fondée sur l'exécution Playwright",
      current: executionAvailable
        ? 'Le rapport relie désormais les tests associés à leur dernière exécution Playwright, leur statut par navigateur et la présence de traces.'
        : 'Le rapport peut être enrichi par une exécution Playwright au format JSON.',
      future: [
        'Analyser les étapes et assertions des traces pour attribuer une preuve précise à chaque fonctionnalité.',
        "Historiser les exécutions pour mesurer l'évolution de la couverture et de la stabilité.",
      ],
    },
  };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatPercent(value) {
  return `${Number(value).toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} %`;
}

function renderList(items, emptyLabel) {
  if (!items.length) {
    return `<p class="empty">${escapeHtml(emptyLabel)}</p>`;
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function buildHtml(report) {
  const domainRows = report.domains
    .map(
      (domain) => `
        <tr>
          <td>${escapeHtml(domain.domain)}</td>
          <td class="number">${domain.total}</td>
          <td class="number">${domain.covered}</td>
          <td class="number">${domain.uncovered}</td>
          <td class="number">${domain.testAssociations}</td>
          <td class="number strong">${formatPercent(domain.coverage)}</td>
          <td class="number strong">${report.summary.executionAvailable ? formatPercent(domain.executionCoverage) : 'N/D'}</td>
          <td class="number strong">${report.summary.executionAvailable ? formatPercent(domain.validatedCoverage) : 'N/D'}</td>
        </tr>`
    )
    .join('');

  const featureRows = report.features
    .map(
      (feature) => `
        <tr>
          <td class="code">${escapeHtml(feature.id)}</td>
          <td>${escapeHtml(feature.name)}</td>
          <td>${escapeHtml(feature.domain)}</td>
          <td><span class="status ${feature.covered ? 'covered' : 'uncovered'}">${
            feature.covered ? 'Couverte' : 'Non couverte'
          }</span></td>
          <td class="number strong">${feature.testCount}</td>
          <td class="number">${feature.execution.available ? feature.execution.executed : 'N/D'}</td>
          <td class="number">${feature.execution.available ? feature.execution.passed : 'N/D'}</td>
          <td>${feature.execution.available ? escapeHtml(feature.execution.status) : 'N/D'}</td>
          <td class="number">${feature.pageObjectCount}</td>
        </tr>
        <tr class="detail-row">
          <td colspan="9">
            <details>
              <summary>Détail de ${escapeHtml(feature.id)}</summary>
              <div class="details-grid">
                <section>
                  <h4>Description</h4>
                  <p>${escapeHtml(feature.description || 'Non renseignée')}</p>
                </section>
                <section>
                  <h4>Tests associés (${feature.testCount})</h4>
                  ${renderList(feature.tests, 'Aucun test associé')}
                </section>
                <section>
                  <h4>Exécution Playwright</h4>
                  <p>Statut : <strong>${escapeHtml(feature.execution.status)}</strong></p>
                  <p>Exécutés : ${feature.execution.executed} — Réussis : ${feature.execution.passed} — Échoués : ${feature.execution.failed} — Traces : ${feature.execution.traceCount}</p>
                </section>
                <section>
                  <h4>Page Objects associés (${feature.pageObjectCount})</h4>
                  ${renderList(feature.pageObjects, 'Aucun Page Object associé')}
                </section>
              </div>
            </details>
          </td>
        </tr>`
    )
    .join('');

  const uncovered = report.uncoveredFeatures.length
    ? report.uncoveredFeatures
        .map(
          (feature) =>
            `<li><strong>${escapeHtml(feature.id)}</strong> — ${escapeHtml(
              feature.name
            )} <span>${escapeHtml(feature.domain)}</span></li>`
        )
        .join('')
    : '<li>Aucune fonctionnalité sans test associé dans le résultat actuel.</li>';

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(report.metadata.title)}</title>
  <style>
    :root { color-scheme: light; --ink:#172033; --muted:#667085; --line:#d9dee8; --panel:#f7f9fc; --accent:#2457d6; --ok:#16794b; --bad:#b42318; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color:var(--ink); background:#eef2f7; line-height:1.5; }
    main { width:min(1180px, calc(100% - 32px)); margin:32px auto; background:white; border:1px solid var(--line); box-shadow:0 18px 50px rgba(23,32,51,.08); }
    header { padding:48px; border-bottom:1px solid var(--line); background:linear-gradient(135deg,#172033,#28447d); color:white; }
    header p { margin:8px 0 0; color:#d8e1f5; }
    .meta { display:flex; flex-wrap:wrap; gap:12px 28px; margin-top:28px; font-size:.92rem; }
    .content { padding:40px 48px 56px; }
    section.block { margin-bottom:44px; }
    h1 { margin:0; font-size:clamp(2rem,4vw,3.1rem); line-height:1.12; }
    h2 { margin:0 0 18px; font-size:1.45rem; border-bottom:2px solid var(--ink); padding-bottom:10px; }
    h3, h4 { margin-top:0; }
    .cards { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; }
    .card { border:1px solid var(--line); border-radius:12px; padding:20px; background:var(--panel); }
    .card .label { color:var(--muted); font-size:.86rem; }
    .card .value { display:block; margin-top:8px; font-size:1.8rem; font-weight:750; }
    .coverage-card { border-color:#adc3fa; background:#eef4ff; }
    .calculation { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:20px; padding:24px; border:1px solid var(--line); border-radius:12px; background:var(--panel); text-align:center; }
    .calculation strong { display:block; font-size:2rem; }
    .formula { margin-top:18px; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:1.05rem; color:var(--accent); }
    table { width:100%; border-collapse:collapse; font-size:.94rem; }
    th { text-align:left; background:#172033; color:white; padding:12px 10px; }
    td { padding:11px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
    tbody tr:not(.detail-row):hover { background:#f7f9fc; }
    .number { text-align:right; font-variant-numeric:tabular-nums; }
    .strong { font-weight:750; }
    .code { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-weight:700; }
    .status { display:inline-block; padding:4px 9px; border-radius:999px; font-size:.8rem; font-weight:700; }
    .covered { color:var(--ok); background:#e7f6ee; }
    .uncovered { color:var(--bad); background:#feeceb; }
    .detail-row td { padding:0 10px 10px; background:#fbfcfe; }
    details { border-left:3px solid #b8c7e8; padding:8px 12px; }
    summary { cursor:pointer; font-weight:700; color:var(--accent); }
    .details-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; padding:18px 0 6px; }
    ul { padding-left:20px; margin-bottom:0; }
    li { margin:6px 0; }
    .empty, .note { color:var(--muted); }
    .warning { padding:18px 20px; border-left:4px solid #e49b0f; background:#fff8e7; }
    .uncovered-list li { display:flex; gap:8px; align-items:baseline; }
    .uncovered-list span { color:var(--muted); }
    footer { padding:22px 48px; border-top:1px solid var(--line); color:var(--muted); font-size:.85rem; }
    @media (max-width:850px) { .cards { grid-template-columns:repeat(2,1fr); } .details-grid { grid-template-columns:1fr; } .content, header, footer { padding-left:24px; padding-right:24px; } .table-wrap { overflow:auto; } }
    @media print { body { background:white; } main { width:100%; margin:0; border:0; box-shadow:none; } details { break-inside:avoid; } }
  </style>
</head>
<body>
<main>
  <header>
    <h1>${escapeHtml(report.metadata.title)}</h1>
    <p>${escapeHtml(report.metadata.application)} — ${escapeHtml(report.metadata.calculationMode)}.</p>
    <div class="meta">
      <span>Généré le ${escapeHtml(new Date(report.metadata.generatedAt).toLocaleString('fr-FR'))}</span>
      <span>Version source : ${escapeHtml(report.metadata.sourceAgentVersion || 'non renseignée')}</span>
      <span>Mode : ${escapeHtml(report.metadata.calculationMode)}</span>
    </div>
  </header>
  <div class="content">
    <section class="block">
      <h2>1. Synthèse globale</h2>
      <div class="cards">
        <div class="card"><span class="label">Fonctionnalités recensées</span><span class="value">${report.summary.features}</span></div>
        <div class="card"><span class="label">Fonctionnalités couvertes</span><span class="value">${report.summary.covered}</span></div>
        <div class="card"><span class="label">Fonctionnalités non couvertes</span><span class="value">${report.summary.uncovered}</span></div>
        <div class="card coverage-card"><span class="label">Couverture statique</span><span class="value">${formatPercent(report.summary.coverage)}</span></div>
        <div class="card"><span class="label">Fonctionnalités exécutées</span><span class="value">${report.summary.executionAvailable ? report.summary.executed : 'N/D'}</span></div>
        <div class="card"><span class="label">Fonctionnalités validées</span><span class="value">${report.summary.executionAvailable ? report.summary.validated : 'N/D'}</span></div>
        <div class="card"><span class="label">Fonctionnalités en échec</span><span class="value">${report.summary.executionAvailable ? report.summary.failed : 'N/D'}</span></div>
      </div>
    </section>

    <section class="block">
      <h2>2. Détail du calcul</h2>
      <p>${escapeHtml(report.calculation.static.rule)}</p>
      <div class="calculation">
        <div><span>Fonctionnalités couvertes</span><strong>${report.calculation.static.numerator}</strong></div>
        <div>÷</div>
        <div><span>Fonctionnalités recensées</span><strong>${report.calculation.static.denominator}</strong></div>
      </div>
      <p class="formula">${escapeHtml(report.calculation.static.formula)} = ${formatPercent(report.calculation.static.result)}</p>
      <div class="warning">La couverture statique indique les fonctionnalités auxquelles au moins un test est associé. ${report.summary.executionAvailable ? `La dernière exécution Playwright permet aussi de mesurer ${formatPercent(report.summary.executionCoverage)} de fonctionnalités exécutées et ${formatPercent(report.summary.validatedCoverage)} de fonctionnalités validées.` : 'Aucun résultat Playwright n’est disponible pour confirmer l’exécution.'}</div>
      ${report.summary.executionAvailable ? `<p class="formula">Exécution : ${escapeHtml(report.calculation.executed.formula)} = ${formatPercent(report.calculation.executed.result)}<br>Validation : ${escapeHtml(report.calculation.validated.formula)} = ${formatPercent(report.calculation.validated.result)}</p>` : ''}
    </section>

    <section class="block">
      <h2>3. Couverture par domaine</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Domaine</th><th class="number">Fonctionnalités</th><th class="number">Couvertes</th><th class="number">Non couvertes</th><th class="number">Associations de tests</th><th class="number">Couverture statique</th><th class="number">Exécutée</th><th class="number">Validée</th></tr></thead>
        <tbody>${domainRows}</tbody>
      </table></div>
    </section>

    <section class="block">
      <h2>4. Détail par fonctionnalité</h2>
      <p class="note">La colonne « Tests » indique le nombre de titres de tests distincts associés à la fonctionnalité.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>ID</th><th>Fonctionnalité</th><th>Domaine</th><th>Couverture statique</th><th class="number">Tests associés</th><th class="number">Exécutés</th><th class="number">Réussis</th><th>Statut exécution</th><th class="number">Page Objects</th></tr></thead>
        <tbody>${featureRows}</tbody>
      </table></div>
    </section>

    <section class="block">
      <h2>5. Fonctionnalités non couvertes</h2>
      <ul class="uncovered-list">${uncovered}</ul>
    </section>

    <section class="block">
      <h2>6. Périmètre technique analysé</h2>
      <div class="cards">
        <div class="card"><span class="label">Tests Playwright</span><span class="value">${report.summary.testsAnalyzed}</span></div>
        <div class="card"><span class="label">Fichiers de tests</span><span class="value">${report.summary.testFilesAnalyzed}</span></div>
        <div class="card"><span class="label">Page Objects</span><span class="value">${report.summary.pageObjectsAnalyzed}</span></div>
        <div class="card"><span class="label">Méthodes analysées</span><span class="value">${report.summary.methodsAnalyzed}</span></div>
        <div class="card"><span class="label">Locators analysés</span><span class="value">${report.summary.locatorsAnalyzed}</span></div>
        <div class="card"><span class="label">Fixtures référencées</span><span class="value">${report.summary.fixturesReferenced}</span></div>
        <div class="card"><span class="label">Appels de méthodes</span><span class="value">${report.summary.methodCallsAnalyzed}</span></div>
      </div>
    </section>

    <section class="block">
      <h2>7. Limites de la mesure actuelle</h2>
      ${renderList(report.limitations, 'Aucune limite renseignée')}
    </section>

    <section class="block">
      <h2>8. ${escapeHtml(report.evolution.title)}</h2>
      <p>${escapeHtml(report.evolution.current)}</p>
      ${renderList(report.evolution.future, 'Aucune évolution renseignée')}
    </section>
  </div>
  <footer>Sources : ${escapeHtml(report.metadata.sources.join(', ') || 'non renseignées')}.</footer>
</main>
</body>
</html>`;
}

function generateCoverageReport({
  inputPath = defaultInputPath,
  executionInputPath = defaultExecutionInputPath,
  jsonOutputPath = defaultJsonOutputPath,
  htmlOutputPath = defaultHtmlOutputPath,
} = {}) {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Fichier source introuvable : ${inputPath}`);
  }

  const featureMap = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const executionData = readPlaywrightResults(executionInputPath);
  const report = buildCoverageReport(featureMap, executionData);

  fs.mkdirSync(path.dirname(jsonOutputPath), { recursive: true });
  fs.mkdirSync(path.dirname(htmlOutputPath), { recursive: true });
  fs.writeFileSync(jsonOutputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.writeFileSync(htmlOutputPath, buildHtml(report), 'utf8');

  return { report, jsonOutputPath, htmlOutputPath };
}

if (require.main === module) {
  try {
    const result = generateCoverageReport();
    console.log('Rapport de couverture généré.');
    console.log(`JSON : ${result.jsonOutputPath}`);
    console.log(`HTML : ${result.htmlOutputPath}`);
  } catch (error) {
    console.error(`Échec de la génération du rapport : ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  buildCoverageReport,
  buildHtml,
  calculateRate,
  generateCoverageReport,
};
