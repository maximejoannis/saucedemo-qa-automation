const path = require('node:path');

const CLASS_PATTERN = /class\s+([A-Za-z_$][\w$]*)\s*{/;
const EXPORT_PATTERN = /module\.exports\s*=\s*{\s*([A-Za-z_$][\w$]*)\s*}/;
const LOCATOR_PATTERN = /this\.([A-Za-z_$][\w$]*)\s*=\s*page\.(getBy[A-Za-z]+|locator)\s*\(([^;]+)\);/gs;
const METHOD_PATTERN = /\n\s*(async\s+)?([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*{/g;
const PLAYWRIGHT_ACTION_PATTERN = /\.(goto|click|fill|selectOption|waitFor|textContent|allTextContents)\s*\(/g;

function getLineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function normalizeArguments(argumentsText) {
  return argumentsText
    .split(',')
    .map((argument) => argument.trim())
    .filter(Boolean);
}

function extractLocators(source) {
  const locators = [];

  for (const match of source.matchAll(LOCATOR_PATTERN)) {
    locators.push({
      name: match[1],
      strategy: match[2],
      expression: match[3].replace(/\s+/g, ' ').trim(),
      line: getLineNumber(source, match.index),
    });
  }

  return locators;
}

function findMatchingBrace(source, openingBraceIndex) {
  let depth = 0;

  for (let index = openingBraceIndex; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return index;
  }

  return -1;
}

function extractMethods(source) {
  const methods = [];

  for (const match of source.matchAll(METHOD_PATTERN)) {
    const name = match[2];
    if (name === 'constructor') continue;

    const openingBraceIndex = source.indexOf('{', match.index);
    const closingBraceIndex = findMatchingBrace(source, openingBraceIndex);
    const body = closingBraceIndex === -1 ? '' : source.slice(openingBraceIndex + 1, closingBraceIndex);
    const actions = [...body.matchAll(PLAYWRIGHT_ACTION_PATTERN)].map((actionMatch) => actionMatch[1]);

    methods.push({
      name,
      async: Boolean(match[1]),
      parameters: normalizeArguments(match[3]),
      actions: [...new Set(actions)],
      line: getLineNumber(source, match.index),
    });
  }

  return methods;
}

function parsePageObject(source, filePath, projectRoot) {
  if (typeof source !== 'string' || source.trim() === '') {
    throw new TypeError('Le contenu du Page Object doit être une chaîne non vide.');
  }

  const classMatch = source.match(CLASS_PATTERN);
  if (!classMatch) {
    throw new Error(`Aucune classe Page Object trouvée dans ${filePath}.`);
  }

  const className = classMatch[1];
  const exportMatch = source.match(EXPORT_PATTERN);

  return {
    name: className,
    file: path.relative(projectRoot, filePath).split(path.sep).join('/'),
    exported: exportMatch?.[1] === className,
    locators: extractLocators(source),
    methods: extractMethods(source),
  };
}

module.exports = { parsePageObject };
