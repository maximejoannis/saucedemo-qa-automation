function validateRepositoryAnalysis(repository) {
  if (!repository || !Array.isArray(repository.pageObjects)) {
    throw new TypeError("L'analyse du dépôt doit contenir une liste de Page Objects.");
  }

  if (repository.pageObjects.length === 0) {
    throw new Error("Aucun Page Object n'a été identifié.");
  }

  const names = new Set();

  for (const pageObject of repository.pageObjects) {
    if (!pageObject.name || !pageObject.file) {
      throw new Error('Un Page Object analysé est incomplet.');
    }

    if (names.has(pageObject.name)) {
      throw new Error(`Page Object dupliqué : ${pageObject.name}`);
    }

    if (!Array.isArray(pageObject.locators) || !Array.isArray(pageObject.methods)) {
      throw new Error(`Structure invalide pour le Page Object ${pageObject.name}.`);
    }

    names.add(pageObject.name);
  }
}

module.exports = { validateRepositoryAnalysis };
