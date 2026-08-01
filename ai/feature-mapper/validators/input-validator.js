const fs = require('node:fs');

function validateFunctionalMapFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le référentiel fonctionnel est introuvable : ${filePath}`);
  }

  const stats = fs.statSync(filePath);
  if (!stats.isFile()) {
    throw new Error(`Le chemin du référentiel ne pointe pas vers un fichier : ${filePath}`);
  }
}

module.exports = { validateFunctionalMapFile };
