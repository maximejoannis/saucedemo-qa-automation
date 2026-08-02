const assert = require('node:assert/strict');
const test = require('node:test');

const { parsePlaywrightResults } = require('../execution/playwright-results-parser');

function createPlaywrightReport() {
  return {
    status: 'failed',
    suites: [
      {
        title: 'tests/us01-authentication/ac01-login.spec.js',
        suites: [
          {
            title: 'Authentification',
            specs: [
              {
                title: 'connexion utilisateur',
                file: 'tests/us01-authentication/ac01-login.spec.js',
                line: 10,
                tests: [
                  {
                    projectName: 'chromium',
                    expectedStatus: 'passed',
                    results: [{ status: 'passed', duration: 120, attachments: [] }],
                  },
                  {
                    projectName: 'firefox',
                    expectedStatus: 'passed',
                    results: [
                      { status: 'failed', duration: 90, attachments: [] },
                      {
                        status: 'passed',
                        duration: 100,
                        attachments: [{ name: 'trace', path: 'test-results/trace.zip' }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

test('extrait les statuts réels et les traces du rapport Playwright', () => {
  const result = parsePlaywrightResults(createPlaywrightReport());

  assert.equal(result.executions.length, 2);
  assert.equal(result.executions[0].status, 'passed');
  assert.equal(result.executions[1].flaky, true);
  assert.equal(result.executions[1].traceAvailable, true);
  assert.equal(result.executions[1].attempts, 2);
});
