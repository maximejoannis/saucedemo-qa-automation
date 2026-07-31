# 01 – Cadrage QA

## 1. Objet du document

Ce document présente le cadrage du projet d'automatisation des tests fonctionnels du site **SauceDemo**.

Il décrit le périmètre de la suite de tests, son organisation technique ainsi que les principaux composants identifiés dans le dépôt.

Toutes les informations présentées dans ce document proviennent exclusivement des fichiers du projet.

---

# 2. Présentation du projet

Le fichier `README.md` décrit le projet comme une **suite de tests end-to-end** du site SauceDemo développée avec **Playwright** en JavaScript.

Le projet est organisé autour d'une traçabilité entre :

- les User Stories ;
- les critères d'acceptation ;
- les cas de test.

Le README indique que la suite couvre les parcours suivants :

- authentification ;
- consultation du catalogue ;
- tri du catalogue ;
- gestion du panier ;
- saisie des informations client ;
- finalisation d'une commande.

---

# 3. Organisation du dépôt

L'arborescence du projet met en évidence les principaux répertoires suivants.

```

.github/
docs/
src/
tests/
package.json
playwright.config.js
README.md

```

Les responsabilités observées sont les suivantes.

| Répertoire | Contenu observé |
|------------|-----------------|
| docs | Documentation QA du projet |
| src/pages | Implémentation des Page Objects |
| src/data | Données utilisées par les tests |
| src/fixtures | Fixtures Playwright |
| tests | Suites de tests Playwright |
| .github/workflows | Workflow GitHub Actions |

---

# 4. Technologies utilisées

Les dépendances déclarées dans `package.json` sont les suivantes.

## Framework de test

- Playwright (`@playwright/test`)

## Langage

Le projet est développé en JavaScript (CommonJS).

## Outils de reporting

- allure-playwright
- allure-commandline

## Scripts disponibles

Les scripts npm déclarés sont :

| Script | Commande |
|---------|----------|
| test | playwright test |
| test:headed | playwright test --headed |
| test:ui | playwright test --ui |
| allure:generate | génération du rapport Allure |
| allure:open | ouverture du rapport Allure |

---

# 5. Configuration Playwright

Le fichier `playwright.config.js` définit les paramètres suivants.

## Répertoire des tests

```

tests/

```

## Timeout global

30 secondes.

## Exécution parallèle

Le paramètre `fullyParallel` est activé.

## Retry

- hors CI : 0 retry ;
- en CI : 2 retries.

## Workers

- environnement local : valeur par défaut de Playwright ;
- environnement CI : 1 worker.

## Navigateurs configurés

Deux projets Playwright sont déclarés :

- Chromium
- Firefox

## Paramètres d'exécution

La configuration `use` contient les paramètres suivants.

| Paramètre | Valeur |
|------------|---------|
| baseURL | https://www.saucedemo.com/ |
| headless | true |
| trace | on-first-retry |
| screenshot | only-on-failure |
| video | retain-on-failure |
| actionTimeout | 10000 ms |
| navigationTimeout | 15000 ms |

---

# 6. Reporting

La configuration Playwright déclare les reporters suivants.

- list
- HTML Report
- Allure

Le README précise également que :

- le rapport HTML est généré dans `playwright-report/` ;
- les résultats Allure sont produits dans `allure-results/` ;
- un rapport Allure HTML peut être généré avec le script `npm run allure:generate`.

---

# 7. Intégration continue

Le workflow GitHub Actions est défini dans :

```

.github/workflows/playwright.yml

```

Les événements déclencheurs observés sont :

- push sur la branche `main` ;
- pull request vers `main` ;
- déclenchement manuel (`workflow_dispatch`).

Le workflow réalise les étapes suivantes :

1. récupération du dépôt ;
2. installation de Node.js ;
3. installation des dépendances (`npm ci`) ;
4. installation des navigateurs Playwright ;
5. exécution des tests (`npm test`) ;
6. génération du rapport Allure ;
7. publication des rapports comme artefacts ;
8. publication du rapport Allure sur GitHub Pages (hors Pull Request).

---

# 8. Périmètre fonctionnel observé

Le dossier `tests/` contient cinq suites de tests.

| Dossier | Domaine fonctionnel |
|----------|---------------------|
| us01-authentication | Authentification |
| us02-catalogue | Catalogue |
| us03-panier | Panier |
| us04-checkout | Checkout |
| us05-e2e | Parcours complet |

Chaque domaine fonctionnel possède actuellement un fichier de spécification Playwright.

---

# 9. État actuel de la suite

Le README indique les caractéristiques suivantes :

- 36 tests Playwright ;
- 5 fichiers de spécification ;
- exécution sur Chromium et Firefox ;
- architecture Page Object Model ;
- fixtures centralisées ;
- données de test centralisées ;
- exécution parallèle activée hors CI.

Aucune autre métrique n'est explicitement fournie dans le dépôt.

---

# 10. Limites de ce cadrage

Ce document décrit uniquement les éléments observables dans le dépôt.

Les informations suivantes ne sont pas documentées dans le projet et ne peuvent donc pas être considérées comme des faits :

- organisation de l'équipe projet ;
- rôles QA ;
- planning ;
- stratégie de recette ;
- niveaux de criticité métier ;
- objectifs de couverture ;
- indicateurs qualité ;
- SLA ou critères de validation métier.

Ces éléments pourront être proposés ultérieurement comme recommandations, mais ne font pas partie de l'état actuel du projet.

---

# 11. Conclusion

Le dépôt met à disposition une suite de tests end-to-end Playwright structurée autour de cinq domaines fonctionnels correspondant au parcours d'achat de SauceDemo.

La configuration du framework, les outils de reporting, l'organisation des sources et l'intégration GitHub Actions sont explicitement définis dans le projet et constituent le périmètre décrit dans ce document.
