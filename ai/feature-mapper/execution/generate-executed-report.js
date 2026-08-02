const { spawnSync } = require('node:child_process');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '../../..');
const cliPath = require.resolve('@playwright/test/cli');
const outputFile = path.join(projectRoot, 'ai', 'feature-mapper', 'output', 'playwright-results.json');

const testRun = spawnSync(process.execPath, [cliPath, 'test'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: { ...process.env, AI_COVERAGE_EXECUTION: 'true', PLAYWRIGHT_JSON_OUTPUT_FILE: outputFile },
});

for (const script of ['ai/feature-mapper/agent.js', 'ai/feature-mapper/report/generate-coverage-report.js']) {
  const run = spawnSync(process.execPath, [path.join(projectRoot, script)], { cwd: projectRoot, stdio: 'inherit' });
  if (run.status !== 0) process.exit(run.status || 1);
}

process.exitCode = testRun.status ?? 1;
