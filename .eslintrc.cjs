module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: ['eslint:recommended'],
  ignorePatterns: [
    'node_modules/',
    'playwright-report/',
    'test-results/',
    'allure-results/',
    'allure-report/',
    'playwright/.auth/',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  rules: {
    'no-empty-pattern': 'off',
  },
};
