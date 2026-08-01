const path = require('node:path');

const TEST_CALL_PATTERN =
  /\btest\s*\(\s*(['"`])([\s\S]*?)\1\s*,\s*async\s*\(\s*\{([\s\S]*?)\}\s*\)\s*=>\s*\{/g;

function lineNumberAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function findClosingBrace(source, openingBraceIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = openingBraceIndex; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      continue;
    }

    if (character === '{') depth += 1;
    if (character === '}') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  throw new Error('Bloc de test JavaScript non fermé.');
}

function parseFixtures(rawFixtures) {
  return rawFixtures
    .split(',')
    .map((fixture) => fixture.trim())
    .filter(Boolean)
    .map((fixture) => fixture.split(':')[0].trim());
}

function parseDataSources(source, fileDirectory, projectRoot) {
  const dataSources = [];
  const requirePattern =
    /const\s+(\{[^}]+\}|[A-Za-z_$][\w$]*)\s*=\s*require\((['"])([^'"]*src\/data\/[^'"]+)\2\)/g;
  let match;

  while ((match = requirePattern.exec(source)) !== null) {
    const importExpression = match[1].trim();
    const importedNames = importExpression.startsWith('{')
      ? importExpression
          .slice(1, -1)
          .split(',')
          .map((name) => name.trim().split(':')[0].trim())
          .filter(Boolean)
      : [importExpression];

    let absolutePath = path.resolve(fileDirectory, match[3]);
    if (!path.extname(absolutePath) && require('node:fs').existsSync(`${absolutePath}.js`)) {
      absolutePath = `${absolutePath}.js`;
    }
    dataSources.push({
      file: path.relative(projectRoot, absolutePath).split(path.sep).join('/'),
      imports: importedNames,
    });
  }

  return dataSources;
}

function findSuiteAt(source, testIndex) {
  const describePattern = /test\.describe\(\s*(['"`])([\s\S]*?)\1\s*,\s*\(\)\s*=>\s*\{/g;
  let match;
  let suite = null;

  while ((match = describePattern.exec(source)) !== null) {
    if (match.index > testIndex) break;
    const openingBrace = source.indexOf('{', match.index);
    const closingBrace = findClosingBrace(source, openingBrace);
    if (testIndex > openingBrace && testIndex < closingBrace) {
      suite = match[2].trim();
    }
  }

  return suite;
}

function extractCalls(body, fixtureNames) {
  const fixtureSet = new Set(fixtureNames);
  const pageObjects = new Set();
  const methodCalls = [];
  const callPattern = /\b([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*\(/g;
  let match;

  while ((match = callPattern.exec(body)) !== null) {
    const object = match[1];
    const method = match[2];
    if (!fixtureSet.has(object) || object === 'page') continue;

    pageObjects.add(object);
    methodCalls.push(`${object}.${method}`);
  }

  return {
    pageObjects: [...pageObjects],
    methodCalls: [...new Set(methodCalls)],
  };
}

function parsePlaywrightTestFile({ source, filePath, projectRoot }) {
  if (typeof source !== 'string') {
    throw new TypeError('Le contenu du fichier de test doit être une chaîne de caractères.');
  }

  const relativeFile = path.relative(projectRoot, filePath).split(path.sep).join('/');
  const dataSources = parseDataSources(source, path.dirname(filePath), projectRoot);
  const tests = [];
  let match;

  TEST_CALL_PATTERN.lastIndex = 0;
  while ((match = TEST_CALL_PATTERN.exec(source)) !== null) {
    const openingBrace = source.indexOf('{', match.index + match[0].length - 1);
    const closingBrace = findClosingBrace(source, openingBrace);
    const body = source.slice(openingBrace + 1, closingBrace);
    const fixtures = parseFixtures(match[3]);
    const calls = extractCalls(body, fixtures);

    tests.push({
      title: match[2].trim(),
      suite: findSuiteAt(source, match.index),
      file: relativeFile,
      line: lineNumberAt(source, match.index),
      fixtures,
      pageObjects: calls.pageObjects,
      methodCalls: calls.methodCalls,
      dataSources,
    });

    TEST_CALL_PATTERN.lastIndex = closingBrace + 1;
  }

  return {
    file: relativeFile,
    suites: [...new Set(tests.map((testCase) => testCase.suite).filter(Boolean))],
    dataSources,
    tests,
  };
}

module.exports = { parsePlaywrightTestFile };
