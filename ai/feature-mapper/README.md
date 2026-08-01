# AI Feature Mapper Agent

L’AI Feature Mapper construit progressivement une cartographie structurée du projet QA à partir du référentiel fonctionnel et du dépôt Playwright.

## Capacités disponibles

### V1 — Référentiel fonctionnel

- lecture de `docs/functional-map.md` ;
- extraction des fonctionnalités, domaines, descriptions, préconditions et résultats attendus ;
- génération d’un fichier JSON validé.

### V2 — Analyse des Page Objects

- découverte des fichiers de `src/pages/` ;
- extraction des classes, exports, locators et méthodes ;
- identification des principales actions Playwright.

### V3 — Analyse des tests Playwright

- découverte récursive des fichiers `.spec.js` ;
- extraction des suites `test.describe` et des scénarios `test` ;
- identification des fixtures injectées ;
- identification des appels de méthodes effectués sur les Page Objects ;
- identification des fichiers de données référencés ;
- conservation des chemins et numéros de ligne.

La V3 ne rapproche pas encore les tests des fonctionnalités et ne calcule aucun taux de couverture.

## Commandes

```bash
npm run ai:map-features
npm run test:ai
```

## Sortie

Le résultat est généré dans :

```text
ai/feature-mapper/output/feature-map.json
```
