const { spawnSync } = require('node:child_process');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '../../..');
const cliPath = require.resolve('@playwright/test/cli');
const outputFile = path.join(
  projectRoot,
  'ai',
  'feature-mapper',
  'output',
  'playwright-results.json'
);

const result = spawnSync(process.execPath, [cliPath, 'test'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    AI_COVERAGE_EXECUTION: 'true',
    PLAYWRIGHT_JSON_OUTPUT_FILE: outputFile,
  },
});

process.exitCode = result.status ?? 1;
