const fs = require('node:fs');
const path = require('node:path');

function normalizeFile(file) {
  return String(file || '').split(path.sep).join('/').replace(/^\.\//, '');
}

function finalStatus(results) {
  if (!Array.isArray(results) || results.length === 0) return 'non-exécute';
  return results.at(-1).status || 'inconnu';
}

function walkSuite(suite, inheritedTitles, output) {
  const titles = [...inheritedTitles, suite.title].filter(Boolean);

  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const results = test.results || [];
      const status = finalStatus(results);
      const attachments = results.flatMap((result) => result.attachments || []);
      const tracePaths = attachments
        .filter((attachment) => attachment.name === 'trace' || /trace\.zip$/i.test(attachment.path || ''))
        .map((attachment) => attachment.path)
        .filter(Boolean);

      output.push({
        title: spec.title,
        suite: titles.join(' › ') || null,
        file: normalizeFile(spec.file),
        line: spec.line || null,
        project: test.projectName || null,
        expectedStatus: test.expectedStatus || null,
        status,
        passed: status === 'passed',
        failed: ['failed', 'timedOut', 'interrupted'].includes(status),
        skipped: status === 'skipped',
        flaky: status === 'passed' && results.slice(0, -1).some((result) => result.status !== 'passed'),
        attempts: results.length,
        duration: results.reduce((total, result) => total + (result.duration || 0), 0),
        traceAvailable: tracePaths.length > 0,
        traces: tracePaths,
      });
    }
  }

  for (const child of suite.suites || []) walkSuite(child, titles, output);
}

function parsePlaywrightResults(report) {
  if (!report || typeof report !== 'object') {
    throw new TypeError('Le rapport Playwright doit être un objet JSON.');
  }

  const executions = [];
  for (const suite of report.suites || []) walkSuite(suite, [], executions);

  return {
    generatedAt: new Date().toISOString(),
    source: 'Playwright JSON reporter',
    overallStatus: report.status || report.stats?.status || null,
    stats: report.stats || {},
    executions,
  };
}

function readPlaywrightResults(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return parsePlaywrightResults(JSON.parse(fs.readFileSync(filePath, 'utf8')));
}

module.exports = { parsePlaywrightResults, readPlaywrightResults };
