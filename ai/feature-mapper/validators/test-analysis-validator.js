function validateTestAnalysis(analysis) {
  if (!analysis || !Array.isArray(analysis.testFiles) || !Array.isArray(analysis.tests)) {
    throw new Error("Le résultat de l'analyse des tests est invalide.");
  }

  const invalidTest = analysis.tests.find(
    (testCase) =>
      !testCase.title ||
      !testCase.file ||
      !Number.isInteger(testCase.line) ||
      !Array.isArray(testCase.fixtures) ||
      !Array.isArray(testCase.pageObjects) ||
      !Array.isArray(testCase.methodCalls)
  );

  if (invalidTest) {
    throw new Error(`Scénario Playwright invalide dans ${invalidTest.file || 'un fichier inconnu'}.`);
  }
}

module.exports = { validateTestAnalysis };
