# SauceDemo QA Automation & Functional Coverage

[![Playwright Tests](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Reports-222222?logo=github)](https://maximejoannis.github.io/saucedemo-qa-automation/)
[![Playwright](https://img.shields.io/badge/Playwright-1.61.1-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![ESLint](https://img.shields.io/badge/ESLint-Quality-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Formatting-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![Allure](https://img.shields.io/badge/Allure-Test%20Report-orange)](https://allurereport.org/)

Framework d’automatisation QA basé sur **Playwright**, appliqué à l’application web de démonstration [SauceDemo](https://www.saucedemo.com/).

Le projet associe tests End-to-End, Page Object Model, reporting Allure, contrôle qualité du code et analyse de la couverture fonctionnelle par User Story.

> Ce dépôt est un projet open source à vocation pédagogique et démonstrative. Il n’est ni affilié à Sauce Labs ni maintenu par les propriétaires de SauceDemo.

---

## Sommaire

- [Présentation](#présentation)
- [Objectifs](#objectifs)
- [Fonctionnalités testées](#fonctionnalités-testées)
- [Indicateurs de couverture](#indicateurs-de-couverture)
- [Rapports disponibles](#rapports-disponibles)
- [Architecture](#architecture)
- [Installation](#installation)
- [Exécution des tests](#exécution-des-tests)
- [Agent de cartographie fonctionnelle](#agent-de-cartographie-fonctionnelle)
- [Qualité du code](#qualité-du-code)
- [Intégration continue](#intégration-continue)
- [Publication GitHub Pages](#publication-github-pages)
- [Ajouter de nouveaux tests](#ajouter-de-nouveaux-tests)
- [Limites de l’analyse](#limites-de-lanalyse)
- [Contribution](#contribution)

---

## Présentation

Ce projet automatise les principaux parcours fonctionnels de SauceDemo avec **Playwright** et JavaScript.

Il contient également un agent d’analyse capable de parcourir :

- la documentation fonctionnelle ;
- les User Stories et leurs critères d’acceptation ;
- les Page Objects ;
- les fichiers de tests Playwright ;
- les résultats d’exécution disponibles.

L’agent met ensuite en relation les exigences métier et les tests automatisés afin de produire une cartographie de couverture.

L’objectif est de répondre à plusieurs questions :

- Quelles fonctionnalités sont automatisées ?
- Quelles règles métier sont réellement vérifiées ?
- Quels critères d’acceptation disposent d’un scénario associé ?
- Dispose-t-on de cas passants, non passants et de cas d’erreur ?
- Quels sont les principaux angles morts de la stratégie de test ?

---

## Objectifs

Le dépôt poursuit quatre objectifs principaux :

1. Automatiser les parcours critiques de SauceDemo.
2. Structurer les tests par User Story et critère d’acceptation.
3. Mesurer la couverture fonctionnelle au-delà du nombre de tests.
4. Publier automatiquement les résultats dans un portail GitHub Pages unique.

---

## Fonctionnalités testées

Le framework couvre actuellement cinq ensembles fonctionnels.

| User Story | Domaine          | Exemples de comportements vérifiés                                    |
| ---------- | ---------------- | --------------------------------------------------------------------- |
| US01       | Authentification | Connexion valide, identifiants invalides et utilisateurs particuliers |
| US02       | Catalogue        | Affichage des produits, informations produit et tri                   |
| US03       | Panier           | Ajout, suppression, compteur et conservation des articles             |
| US04       | Checkout         | Informations client, validations et récapitulatif                     |
| US05       | Parcours E2E     | Commande complète, de la connexion à la confirmation                  |

Les tests sont organisés dans des répertoires correspondant aux User Stories :

```text
tests/
├── us01-authentication/
├── us02-catalogue/
├── us03-panier/
├── us04-checkout/
└── us05-e2e/
```

---

## Indicateurs de couverture

Le projet distingue plusieurs niveaux de couverture afin d’éviter de résumer toute la qualité à un seul pourcentage.

### Couverture des règles métier

Le premier rapport identifie :

- **12 règles métier analysées** ;
- **10 règles couvertes par les tests** ;
- **2 règles sans preuve suffisante** ;
- une couverture fonctionnelle estimée à **83,3 %**.

Le taux de **83,3 %** correspond donc à la couverture des règles métier détectées. Il ne signifie pas que 83,3 % de toutes les combinaisons, erreurs techniques ou conditions limites possibles sont testées.

### Couverture des critères d’acceptation

L’analyse détaillée des User Stories porte un regard différent sur la profondeur des scénarios :

| Type de scénario | Couverture observée |
| ---------------- | ------------------: |
| Cas passants     |      14/16 — 87,5 % |
| Cas non passants |       3/16 — 18,8 % |
| Cas d’erreur     |          0/16 — 0 % |

Ces chiffres ne remplacent pas les **83,3 %** du premier rapport. Ils mesurent une autre dimension : la présence de différents profils de tests pour chaque critère d’acceptation.

> Un cas non passant correspond à un refus fonctionnel attendu, par exemple des identifiants invalides. Un cas d’erreur représente plutôt une défaillance technique contrôlée, comme une indisponibilité réseau ou une réponse serveur invalide.

---

## Rapports disponibles

Tous les rapports sont regroupés dans un seul site GitHub Pages :

### Portail principal

[Accéder au portail QA Coverage](https://maximejoannis.github.io/saucedemo-qa-automation/)

### Rapports publiés

| Rapport                  | Description                                                | Accès                                                                         |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Allure                   | Résultats détaillés des tests automatisés                  | [Ouvrir](https://maximejoannis.github.io/saucedemo-qa-automation/allure/)     |
| Qualité du code          | Résultats ESLint et Prettier                               | [Ouvrir](https://maximejoannis.github.io/saucedemo-qa-automation/quality/)    |
| Couverture fonctionnelle | Cartographie des fonctionnalités et règles métier          | [Ouvrir](https://maximejoannis.github.io/saucedemo-qa-automation/coverage/)   |
| Critères d’acceptation   | Analyse par User Story, cas passant, non passant et erreur | [Ouvrir](https://maximejoannis.github.io/saucedemo-qa-automation/acceptance/) |

Les rapports Playwright, les résultats Allure bruts et les autres fichiers générés sont également conservés comme artefacts GitHub Actions pendant 30 jours.

---

## Architecture

Le framework utilise une architecture Page Object Model afin de séparer les scénarios de test des interactions avec l’interface.

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── ai/
│   └── feature-mapper/
│       ├── execution/
│       ├── explorers/
│       ├── output/
│       ├── parsers/
│       ├── reasoning/
│       ├── report/
│       ├── reporters/
│       ├── tests/
│       ├── tools/
│       └── validators/
│
├── docs/
│   ├── architecture/
│   ├── business-rules.md
│   ├── functional-map.md
│   ├── glossary.md
│   └── user-stories.md
│
├── reports/
│   ├── acceptance/
│   ├── coverage/
│   └── index.html
│
├── scripts/
│   └── generate-quality-report.js
│
├── src/
│   ├── data/
│   ├── fixtures/
│   └── pages/
│
├── tests/
│   ├── us01-authentication/
│   ├── us02-catalogue/
│   ├── us03-panier/
│   ├── us04-checkout/
│   └── us05-e2e/
│
├── global-setup.js
├── playwright.config.js
├── eslint.config.js
├── package.json
└── README.md
```

### Principaux composants

- `tests/` : scénarios Playwright organisés par User Story.
- `src/pages/` : Page Objects représentant les écrans de l’application.
- `src/data/` : utilisateurs, produits et données de checkout.
- `src/fixtures/` : fixtures Playwright personnalisées.
- `docs/` : référentiel fonctionnel utilisé pour l’analyse.
- `ai/feature-mapper/` : moteur de cartographie et de corrélation.
- `reports/` : rapports web statiques publiés sur GitHub Pages.
- `scripts/` : génération des rapports complémentaires.

---

## Prérequis

Avant de lancer le projet, installer :

- [Node.js](https://nodejs.org/) en version LTS ;
- npm ;
- Git ;
- les dépendances système nécessaires aux navigateurs Playwright.

Vérification :

```bash
node --version
npm --version
git --version
```

---

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/maximejoannis/saucedemo-qa-automation.git
cd saucedemo-qa-automation
```

Installer les dépendances :

```bash
npm ci
```

Installer les navigateurs Playwright :

```bash
npx playwright install
```

Sous Linux, GitHub Codespaces ou dans un environnement CI :

```bash
npx playwright install --with-deps
```

---

## Exécution des tests

### Tous les tests

```bash
npm test
```

### Mode visible

```bash
npm run test:headed
```

### Interface Playwright

```bash
npm run test:ui
```

### Exécuter une User Story

```bash
npx playwright test tests/us01-authentication
```

### Exécuter un fichier précis

```bash
npx playwright test tests/us03-panier/ac01-panier.spec.js
```

### Afficher le rapport Playwright local

```bash
npx playwright show-report
```

---

## Rapport Allure

Exécuter les tests afin de produire les résultats Allure :

```bash
npm test
```

Générer le rapport :

```bash
npm run allure:generate
```

Ouvrir le rapport localement :

```bash
npm run allure:open
```

Le contenu HTML est généré dans :

```text
allure-report/
```

---

## Agent de cartographie fonctionnelle

L’AI Feature Mapper analyse le référentiel fonctionnel et le code du projet.

### Générer la cartographie

```bash
npm run ai:map-features
```

Cette commande génère notamment :

```text
ai/feature-mapper/output/feature-map.json
```

### Générer la cartographie et le rapport de couverture

```bash
npm run ai:report
```

Résultats principaux :

```text
ai/feature-mapper/output/coverage-report.html
ai/feature-mapper/output/coverage-report.json
ai/feature-mapper/output/feature-map.json
```

### Exécuter les tests avec collecte de preuves

```bash
npm run test:coverage
```

### Générer un rapport enrichi avec l’exécution

```bash
npm run ai:report:executed
```

### Tester l’agent

```bash
npm run test:ai
```

Ces tests vérifient les parseurs, les moteurs de corrélation et de couverture, les validateurs ainsi que la génération du rapport.

---

## Qualité du code

### Exécuter ESLint

```bash
npm run lint
```

### Corriger les erreurs ESLint automatiquement

```bash
npm run lint:fix
```

### Vérifier le formatage Prettier

```bash
npm run format:check
```

### Formater le projet

```bash
npm run format
```

### Exécuter le contrôle complet

```bash
npm run quality
```

Cette commande exécute successivement ESLint et Prettier :

```bash
npm run lint && npm run format:check
```

### Générer le rapport qualité

```bash
npm run quality:report
```

Le rapport est créé dans :

```text
quality-report/
```

---

## Intégration continue

Le workflow principal est défini dans :

```text
.github/workflows/playwright.yml
```

Il se déclenche :

- à chaque `push` sur `main` ;
- à chaque Pull Request ciblant `main` ;
- manuellement avec `workflow_dispatch`.

### Étapes du pipeline

1. Récupération du dépôt.
2. Installation de Node.js et des dépendances.
3. Analyse ESLint.
4. Vérification Prettier.
5. Génération du rapport qualité.
6. Installation des navigateurs Playwright.
7. Exécution des tests automatisés.
8. Génération du rapport Allure.
9. Validation des rapports HTML et JavaScript.
10. Téléversement des artefacts GitHub Actions.
11. Construction d’un site GitHub Pages unique.
12. Publication des quatre rapports.

Les contrôles ESLint et Prettier utilisent une Quality Gate différée. Les rapports peuvent ainsi être générés et téléversés avant que le job signale finalement une erreur de qualité.

---

## Publication GitHub Pages

Le projet utilise un seul workflow responsable du déploiement GitHub Pages.

Cette règle est importante : deux workflows utilisant séparément `actions/deploy-pages` publieraient chacun un artefact complet. Le dernier déploiement remplacerait alors les fichiers du précédent.

### Arborescence publiée

```text
pages-site/
├── index.html
├── .nojekyll
├── allure/
├── quality/
├── coverage/
└── acceptance/
```

### Configuration GitHub

Dans le dépôt GitHub :

1. Ouvrir `Settings`.
2. Sélectionner `Pages`.
3. Dans `Build and deployment`, choisir `GitHub Actions`.
4. Vérifier que le workflow dispose des permissions :

```yaml
permissions:
  pages: write
  id-token: write
```

Le job de déploiement utilise l’environnement protégé :

```yaml
environment:
  name: github-pages
```

### Concurrence

Le workflow utilise également :

```yaml
concurrency:
  group: github-pages
  cancel-in-progress: true
```

Cette configuration empêche deux publications concurrentes de modifier le site simultanément.

> Il ne doit rester qu’un seul appel à `actions/deploy-pages@v4` dans l’ensemble des workflows du dépôt.

---

## Ajouter de nouveaux tests

Pour ajouter une nouvelle User Story :

1. Documenter le besoin dans `docs/user-stories.md`.
2. Ajouter ou mettre à jour les règles dans `docs/business-rules.md`.
3. Compléter la cartographie dans `docs/functional-map.md`.
4. Créer le Page Object nécessaire dans `src/pages/`.
5. Ajouter les données de test dans `src/data/`.
6. Créer le répertoire de tests correspondant dans `tests/`.
7. Ajouter les cas passants, non passants et les cas d’erreur pertinents.
8. Relancer l’agent de cartographie.
9. Vérifier les nouveaux taux de couverture.

Convention recommandée :

```text
tests/usXX-nom-fonctionnalite/acXX-description.spec.js
```

Exemple :

```text
tests/us06-deconnexion/ac01-deconnexion.spec.js
```

---

## Stratégie de test recommandée

Pour chaque critère d’acceptation, rechercher si possible les trois catégories suivantes :

| Catégorie       | Objectif                                                  | Exemple                                  |
| --------------- | --------------------------------------------------------- | ---------------------------------------- |
| Cas passant     | Vérifier le comportement attendu avec des données valides | Connexion avec un utilisateur autorisé   |
| Cas non passant | Vérifier un refus fonctionnel attendu                     | Connexion avec un mot de passe invalide  |
| Cas d’erreur    | Vérifier la réaction à une défaillance technique          | Réponse serveur indisponible ou invalide |

Toutes les fonctionnalités ne nécessitent pas obligatoirement les trois catégories. Chaque absence doit toutefois être analysée et justifiée en fonction du risque métier.

---

## Limites de l’analyse

La couverture produite par l’agent est une couverture fonctionnelle issue de la corrélation entre la documentation, les tests et les résultats disponibles.

Elle ne représente pas directement :

- la couverture des lignes de code de SauceDemo ;
- la couverture de toutes les combinaisons de données ;
- la couverture exhaustive des navigateurs et appareils ;
- la performance ou la charge ;
- l’accessibilité complète ;
- la sécurité de l’application ;
- les pannes réseau et erreurs serveur non simulées.

Le taux doit donc être interprété comme un indicateur d’aide à la décision, et non comme une preuve absolue d’absence de défaut.

---

## Roadmap

Les axes d’amélioration identifiés sont notamment :

- renforcer les scénarios non passants ;
- ajouter des cas d’erreur technique ;
- couvrir les règles métier encore sans preuve ;
- intégrer des tests d’accessibilité ;
- ajouter des tests responsive et multi-navigateurs ;
- améliorer la traçabilité entre exigences, tests et exécutions ;
- calculer automatiquement les indicateurs à chaque pipeline ;
- ajouter une Quality Gate sur la couverture fonctionnelle.

---

## Technologies utilisées

- [Playwright](https://playwright.dev/)
- [Node.js](https://nodejs.org/)
- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Allure Report](https://allurereport.org/)
- [GitHub Actions](https://github.com/features/actions)
- [GitHub Pages](https://pages.github.com/)

---

## Contribution

Les contributions sont les bienvenues.

1. Créer un fork du dépôt.
2. Créer une branche :

```bash
git switch -c feature/nom-de-la-fonctionnalite
```

3. Effectuer les modifications.
4. Vérifier la qualité et les tests :

```bash
npm run quality
npm run test:ai
npm test
```

5. Créer un commit :

```bash
git commit -m "feat: ajouter une nouvelle couverture fonctionnelle"
```

6. Publier la branche et ouvrir une Pull Request.

Toute contribution liée aux tests devrait préciser :

- la User Story concernée ;
- le critère d’acceptation associé ;
- le type de scénario ajouté ;
- le risque fonctionnel couvert.

---

## Licence et avertissement

Ce dépôt est proposé comme projet open source de démonstration QA.

SauceDemo est utilisé uniquement comme application support pour l’apprentissage et l’expérimentation autour de l’automatisation des tests. Les marques, noms et contenus associés restent la propriété de leurs détenteurs respectifs.

---

## Auteur

Projet développé et maintenu par [maximejoannis](https://github.com/maximejoannis).

Application testée : [saucedemo.com](https://www.saucedemo.com/)

Portail des rapports : [QA Coverage](https://maximejoannis.github.io/saucedemo-qa-automation/)
