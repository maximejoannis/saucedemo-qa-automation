# SauceDemo QA Automation

[![Playwright Tests](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-QA%20Reports-222222?logo=github)](https://maximejoannis.github.io/saucedemo-qa-automation/)
[![Playwright](https://img.shields.io/badge/Playwright-1.61.1-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![Allure](https://img.shields.io/badge/Allure-Test%20Report-orange)](https://allurereport.org/)

Framework d’automatisation QA basé sur **Playwright** et JavaScript, appliqué à l’application web de démonstration [SauceDemo](https://www.saucedemo.com/).

Le projet comprend :

- une suite de tests End-to-End ;
- une architecture Page Object Model ;
- des données et fixtures réutilisables ;
- des rapports Playwright et Allure ;
- des contrôles ESLint et Prettier ;
- un référentiel QA reconstruit a posteriori ;
- un rapport factuel de couverture automatisée ;
- un portail de rapports publié avec GitHub Pages.

> Ce dépôt est un projet personnel, pédagogique et démonstratif. Il n’est ni affilié à Sauce Labs ni maintenu par les propriétaires de SauceDemo.

---

## Indicateurs principaux

| Indicateur | Résultat |
|---|---:|
| Cas de test inclus dans le calcul | 44 |
| Cas couverts par une automatisation complète | 22 |
| Cas non automatisés ou partiellement automatisés | 22 |
| Couverture automatisée globale | **50,0 %** |
| Couverture P0 | **69,6 %** |
| Couverture P1 | **31,6 %** |
| Couverture P2 | **0,0 %** |

La couverture est calculée à partir des cas de test du référentiel QA, et non à partir du nombre de lignes de code ou du nombre brut de scénarios Playwright.

[Consulter le portail QA Coverage](https://maximejoannis.github.io/saucedemo-qa-automation/)

---

## Sommaire

- [Présentation](#présentation)
- [Contexte documentaire](#contexte-documentaire)
- [Objectifs](#objectifs)
- [Périmètre fonctionnel](#périmètre-fonctionnel)
- [Stratégie d’automatisation](#stratégie-dautomatisation)
- [Mesure de la couverture](#mesure-de-la-couverture)
- [Rapports disponibles](#rapports-disponibles)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Exécution des tests](#exécution-des-tests)
- [Rapport Allure](#rapport-allure)
- [Documentation QA](#documentation-qa)
- [Agent de cartographie fonctionnelle](#agent-de-cartographie-fonctionnelle)
- [Qualité du code](#qualité-du-code)
- [Intégration continue](#intégration-continue)
- [Publication GitHub Pages](#publication-github-pages)
- [Ajouter ou modifier un test](#ajouter-ou-modifier-un-test)
- [Limites](#limites)
- [Axes d’amélioration](#axes-damélioration)
- [Technologies](#technologies)
- [Licence et avertissement](#licence-et-avertissement)
- [Auteur](#auteur)

---

## Présentation

Ce projet automatise les principaux parcours fonctionnels de SauceDemo avec Playwright.

Les tests couvrent notamment :

- l’authentification ;
- l’affichage et le tri du catalogue ;
- la consultation d’un produit ;
- l’ajout et le retrait d’articles ;
- la consultation du panier ;
- les validations du checkout ;
- le récapitulatif de commande ;
- la finalisation d’une commande.

Le framework utilise le Page Object Model afin de séparer :

- les scénarios de test ;
- les interactions avec les pages ;
- les données de test ;
- les mécanismes de préparation de session ;
- les assertions fonctionnelles.

---

## Contexte documentaire

La documentation présente dans `docs/qa-audit/` a été élaborée **après la réalisation initiale de la suite d’automatisation**.

Elle constitue un référentiel d’audit et de consolidation QA.

Elle ne représente pas les spécifications historiques ayant piloté le développement initial des tests. Elle a été créée pour :

- reconstruire le périmètre fonctionnel de SauceDemo ;
- formaliser les user stories et leurs critères d’acceptation ;
- recenser les cas de test attendus ;
- mettre en relation ces cas avec les tests Playwright existants ;
- mesurer factuellement la couverture automatisée ;
- identifier les écarts à traiter lors des prochaines évolutions.

Deux systèmes d’identification coexistent donc dans le dépôt :

| Référentiel | Rôle |
|---|---|
| `US01` à `US05` | Organisation technique initiale des tests Playwright |
| `US-001` à `US-014` | Référentiel fonctionnel d’audit construit a posteriori |
| `TC-USxx-ACxx-xx` | Identifiants historiques présents dans les tests |
| `TC-001` à `TC-050` | Cas de test du référentiel QA d’audit |

Les dossiers techniques `us01` à `us05` ne doivent pas être assimilés automatiquement aux quatorze user stories du référentiel d’audit.

La correspondance est réalisée à partir :

- des préconditions ;
- des actions ;
- des données utilisées ;
- des assertions ;
- du résultat fonctionnel réellement vérifié.

---

## Objectifs

Le projet poursuit les objectifs suivants :

1. automatiser les parcours essentiels de SauceDemo ;
2. maintenir une architecture de tests lisible et réutilisable ;
3. intégrer les tests et contrôles qualité dans GitHub Actions ;
4. produire des rapports d’exécution consultables ;
5. mesurer la couverture fonctionnelle réelle de l’automatisation ;
6. identifier les cas entièrement couverts, partiellement couverts ou absents ;
7. publier les résultats dans un portail GitHub Pages unique.

---

## Périmètre fonctionnel

### Organisation technique initiale

Les tests Playwright sont répartis dans cinq ensembles techniques :

| Dossier | Domaine |
|---|---|
| `us01-authentication` | Authentification |
| `us02-catalogue` | Catalogue et fiches produit |
| `us03-panier` | Gestion du panier |
| `us04-checkout` | Informations client et validations |
| `us05-e2e` | Récapitulatif et finalisation |

```text
tests/
├── us01-authentication/
│   └── ac01-login.spec.js
├── us02-catalogue/
│   └── ac01-catalogue.spec.js
├── us03-panier/
│   └── ac01-panier.spec.js
├── us04-checkout/
│   └── ac01-informations.spec.js
└── us05-e2e/
    └── ac01-commande.spec.js
```

### Référentiel fonctionnel d’audit

L’audit fonctionnel distingue quatorze user stories :

| ID | User story |
|---|---|
| US-001 | Se connecter |
| US-002 | Consulter le catalogue |
| US-003 | Trier le catalogue |
| US-004 | Consulter un produit |
| US-005 | Ajouter au panier |
| US-006 | Retirer du panier |
| US-007 | Consulter le panier |
| US-008 | Fournir les informations client |
| US-009 | Contrôler le récapitulatif |
| US-010 | Finaliser la commande |
| US-011 | Annuler ou revenir |
| US-012 | Gérer la session |
| US-013 | Réinitialiser l’application |
| US-014 | Utiliser le menu |

Ce référentiel permet une mesure plus précise que le seul regroupement technique des fichiers de tests.

---

## Stratégie d’automatisation

Les cas de test sont priorisés selon leur risque.

### P0 — Critique

Parcours dont l’échec bloque l’utilisation principale de l’application ou compromet une fonction essentielle :

- connexion ;
- accès au catalogue ;
- gestion essentielle du panier ;
- validations obligatoires ;
- calcul du récapitulatif ;
- finalisation ;
- déconnexion et protection de la session.

Ces cas doivent être exécutés en priorité à chaque build ou déploiement.

### P1 — Important

Fonctionnalités à usage fréquent ou à impact significatif mais généralement contournable :

- tris ;
- fiches produit ;
- navigation ;
- annulations ;
- actualisation ;
- réinitialisation ;
- comportements associés aux profils spéciaux.

Ces cas appartiennent à la régression régulière.

### P2 — Complémentaire

Contrôles moins fréquents ou nécessitant davantage de vérifications manuelles :

- responsive design ;
- accessibilité approfondie ;
- données extrêmes ;
- contrôles visuels ;
- scénarios exploratoires.

---

## Mesure de la couverture

### Règle de calcul

L’unité de mesure est le cas de test de référence `TC-nnn`.

Un cas est considéré comme automatisé uniquement lorsqu’au moins un test Playwright :

1. reproduit ses préconditions essentielles ;
2. exécute l’action décrite ;
3. vérifie substantiellement le résultat attendu avec des assertions.

La présence d’un fichier de test, d’un titre similaire, d’un Page Object ou d’une navigation sans assertion suffisante ne constitue pas une couverture complète.

Une couverture partielle est comptabilisée comme **non couverte**.

### Couverture globale

```text
Taux global =
nombre de cas couverts par une automatisation complète
÷ nombre total de cas inclus
× 100
```

```text
22 ÷ 44 × 100 = 50,0 %
```

| Cas inclus | Cas automatisés | Cas non automatisés | Taux |
|---:|---:|---:|---:|
| 44 | 22 | 22 | **50,0 %** |

### Couverture par priorité

| Priorité | Cas inclus | Cas automatisés | Cas non automatisés | Taux |
|---|---:|---:|---:|---:|
| P0 — Critique | 23 | 16 | 7 | **69,6 %** |
| P1 — Important | 19 | 6 | 13 | **31,6 %** |
| P2 — Complémentaire | 2 | 0 | 2 | **0,0 %** |
| **Total** | **44** | **22** | **22** | **50,0 %** |

Contrôle de cohérence :

```text
23 + 19 + 2 = 44 cas inclus
16 + 6 + 0 = 22 cas automatisés
```

### Couverture par user story

| User story | Cas automatisés | Cas inclus | Taux |
|---|---:|---:|---:|
| US-001 — Se connecter | 5 | 5 | **100,0 %** |
| US-002 — Consulter le catalogue | 0 | 2 | **0,0 %** |
| US-003 — Trier le catalogue | 4 | 5 | **80,0 %** |
| US-004 — Consulter un produit | 1 | 3 | **33,3 %** |
| US-005 — Ajouter au panier | 1 | 4 | **25,0 %** |
| US-006 — Retirer du panier | 2 | 2 | **100,0 %** |
| US-007 — Consulter le panier | 1 | 3 | **33,3 %** |
| US-008 — Fournir les informations client | 4 | 4 | **100,0 %** |
| US-009 — Contrôler le récapitulatif | 1 | 4 | **25,0 %** |
| US-010 — Finaliser la commande | 2 | 3 | **66,7 %** |
| US-011 — Annuler ou revenir | 0 | 2 | **0,0 %** |
| US-012 — Gérer la session | 1 | 4 | **25,0 %** |
| US-013 — Réinitialiser l’application | 0 | 1 | **0,0 %** |
| US-014 — Utiliser le menu | 0 | 2 | **0,0 %** |

### Exclusions

Les cas suivants sont exclus du dénominateur :

- `TC-029`, `TC-030` et `TC-031` : résultats attendus encore soumis à une décision personnelle et insuffisamment déterministes ;
- `TC-048`, `TC-049` et `TC-050` : cas transverses sans rattachement direct à une user story.

`TC-048` et `TC-049` correspondent également à des contrôles manuels ou seulement partiellement automatisables.

### Couverture et réussite

Le taux de couverture ne doit pas être confondu avec le taux de réussite.

| Indicateur | Question traitée |
|---|---|
| Couverture automatisée | Les comportements attendus sont-ils réellement vérifiés par des tests ? |
| Résultats d’exécution | Les tests exécutés ont-ils réussi ou échoué ? |

Un test peut exister et échouer lors d’une exécution. Il reste alors automatisé, mais son résultat d’exécution est en échec.

Les résultats `passed`, `failed`, `skipped` ou `flaky` sont disponibles dans les rapports Playwright et Allure.

---

## Rapports disponibles

Tous les rapports sont publiés dans un portail GitHub Pages unique.

### Portail principal

[Accéder au portail QA Coverage](https://maximejoannis.github.io/saucedemo-qa-automation/)

### Rapports publiés

| Rapport | Description | Accès |
|---|---|---|
| Couverture automatisée | Couverture globale, par user story et par priorité | [Ouvrir](https://maximejoannis.github.io/saucedemo-qa-automation/coverage/) |
| Allure | Résultats détaillés des exécutions Playwright | [Ouvrir](https://maximejoannis.github.io/saucedemo-qa-automation/allure/) |
| Qualité du code | Résultats ESLint et Prettier | [Ouvrir](https://maximejoannis.github.io/saucedemo-qa-automation/quality/) |

Les rapports Playwright, les résultats Allure et les rapports complémentaires sont également conservés comme artefacts GitHub Actions pendant 30 jours.

---

## Architecture

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
│   ├── qa-audit/
│   │   ├── README.md
│   │   ├── 01-cartographie-fonctionnelle.md
│   │   ├── 02-user-stories-criteres-acceptation.md
│   │   ├── 03-scenarios-gherkin.md
│   │   ├── 04-strategie-de-test.md
│   │   ├── 05-plan-de-test.md
│   │   ├── 06-cas-de-test.md
│   │   ├── 07-matrice-tracabilite.md
│   │   └── 08-rapport-final-couverture-automatisation.md
│   ├── business-rules.md
│   ├── functional-map.md
│   ├── glossary.md
│   └── user-stories.md
│
├── reports/
│   ├── coverage/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── app.js
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

- `tests/` : scénarios Playwright organisés selon les cinq regroupements techniques initiaux ;
- `src/pages/` : Page Objects représentant les écrans de SauceDemo ;
- `src/data/` : utilisateurs, produits et données du checkout ;
- `src/fixtures/` : fixtures Playwright personnalisées ;
- `docs/qa-audit/` : référentiel fonctionnel d’audit construit a posteriori ;
- `ai/feature-mapper/` : moteur expérimental de cartographie et de corrélation ;
- `reports/coverage/` : rapport web statique de couverture automatisée ;
- `scripts/` : scripts de génération des rapports complémentaires.

---

## Prérequis

Installer :

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

### Une suite fonctionnelle

```bash
npx playwright test tests/us01-authentication
```

### Un fichier précis

```bash
npx playwright test tests/us03-panier/ac01-panier.spec.js
```

### Rapport Playwright local

```bash
npx playwright show-report
```

---

## Rapport Allure

Exécuter les tests :

```bash
npm test
```

Générer le rapport Allure :

```bash
npm run allure:generate
```

Ouvrir le rapport :

```bash
npm run allure:open
```

Le rapport HTML est généré dans :

```text
allure-report/
```

---

## Documentation QA

Le référentiel d’audit se trouve dans :

```text
docs/qa-audit/
```

| Document | Contenu |
|---|---|
| `README.md` | Contexte, périmètre et conventions |
| `01-cartographie-fonctionnelle.md` | Fonctionnalités et parcours |
| `02-user-stories-criteres-acceptation.md` | User stories et critères d’acceptation |
| `03-scenarios-gherkin.md` | Scénarios Gherkin |
| `04-strategie-de-test.md` | Stratégie de test et priorisation |
| `05-plan-de-test.md` | Organisation des campagnes |
| `06-cas-de-test.md` | Cas positifs, négatifs, limites et erreurs |
| `07-matrice-tracabilite.md` | Correspondance entre exigences et tests |
| `08-rapport-final-couverture-automatisation.md` | Indicateurs de couverture automatisée |

Le rapport Markdown et le rapport HTML doivent présenter les mêmes valeurs.

Toute modification d’un indicateur doit être répercutée dans :

```text
docs/qa-audit/08-rapport-final-couverture-automatisation.md
reports/coverage/index.html
reports/coverage/app.js
```

---

## Agent de cartographie fonctionnelle

Le dossier `ai/feature-mapper/` contient un moteur expérimental d’analyse de la documentation, des Page Objects, des tests et des résultats Playwright.

### Générer la cartographie

```bash
npm run ai:map-features
```

### Générer la cartographie et le rapport

```bash
npm run ai:report
```

### Exécuter les tests avec collecte de preuves

```bash
npm run test:coverage
```

### Générer un rapport enrichi

```bash
npm run ai:report:executed
```

### Tester le moteur d’analyse

```bash
npm run test:ai
```

Les sorties principales sont enregistrées dans :

```text
ai/feature-mapper/output/
```

> Les indicateurs publiés dans `reports/coverage/` proviennent de l’audit strict fondé sur les cas `TC-nnn`. Ils ne doivent pas être remplacés automatiquement par une ancienne métrique produite par le moteur expérimental sans vérification du référentiel et des assertions.

---

## Qualité du code

### ESLint

```bash
npm run lint
```

Correction automatique :

```bash
npm run lint:fix
```

### Prettier

Vérification :

```bash
npm run format:check
```

Formatage :

```bash
npm run format
```

### Contrôle complet

```bash
npm run quality
```

### Rapport qualité

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

### Étapes principales

1. récupération du dépôt ;
2. installation de Node.js et des dépendances ;
3. analyse ESLint ;
4. vérification Prettier ;
5. génération du rapport qualité ;
6. installation des navigateurs Playwright ;
7. exécution des tests ;
8. génération du rapport Allure ;
9. validation des rapports statiques ;
10. téléversement des artefacts GitHub Actions ;
11. construction du site GitHub Pages ;
12. publication des trois rapports.

Les contrôles ESLint et Prettier utilisent une Quality Gate différée afin que les rapports puissent être générés et téléversés avant le verdict final du contrôle qualité.

---

## Publication GitHub Pages

Le dépôt utilise un seul workflow responsable de la publication GitHub Pages.

### Arborescence publiée

```text
pages-site/
├── .nojekyll
├── index.html
├── allure/
├── quality/
└── coverage/
```

### Configuration

Dans GitHub :

1. ouvrir `Settings` ;
2. sélectionner `Pages` ;
3. choisir `GitHub Actions` dans `Build and deployment`.

Le job de déploiement utilise les permissions suivantes :

```yaml
permissions:
  pages: write
  id-token: write
```

Il utilise également l’environnement :

```yaml
environment:
  name: github-pages
```

La concurrence est contrôlée avec :

```yaml
concurrency:
  group: github-pages
  cancel-in-progress: true
```

> Il ne doit rester qu’un seul appel à `actions/deploy-pages@v4` dans l’ensemble des workflows du dépôt.

---

## Ajouter ou modifier un test

Pour ajouter un nouveau comportement automatisé :

1. identifier la user story d’audit concernée ;
2. identifier le critère d’acceptation ;
3. identifier ou créer le cas `TC-nnn` ;
4. choisir la priorité P0, P1 ou P2 ;
5. ajouter ou adapter le Page Object ;
6. ajouter les données nécessaires ;
7. créer le scénario Playwright ;
8. écrire les assertions vérifiant l’intégralité du résultat attendu ;
9. exécuter le test ;
10. mettre à jour la matrice de traçabilité ;
11. recalculer la couverture globale, par user story et par priorité ;
12. mettre à jour les rapports Markdown et HTML.

Organisation recommandée :

```text
tests/usXX-domaine/acXX-description.spec.js
```

Un test ne doit pas être déclaré couvrant uniquement parce qu’il traverse une page. Les assertions doivent démontrer le comportement attendu.

---

## Limites

Le taux de couverture automatisée ne représente pas :

- la couverture des lignes de code de SauceDemo ;
- la couverture de toutes les combinaisons de données ;
- la couverture exhaustive des navigateurs et appareils ;
- une garantie d’absence de défaut ;
- une analyse complète de performance ;
- une analyse de charge ;
- un audit complet d’accessibilité ;
- un audit de sécurité ;
- le taux de réussite de la dernière exécution.

SauceDemo est une application de démonstration. Le paiement, le stock, la livraison et la commande ne sont pas reliés à des systèmes réels.

Les règles suivantes nécessitent encore une décision personnelle documentée :

- comportement attendu avec un panier vide ;
- formats et longueurs des informations client ;
- traitement des espaces seuls ;
- règle générale de calcul et d’arrondi fiscal ;
- persistance et durée de la session ;
- périmètre attendu pour les profils volontairement dégradés.

---

## Axes d’amélioration

Les prochains efforts doivent prioritairement porter sur :

1. les sept cas P0 non automatisés ;
2. la consultation complète du catalogue ;
3. l’ajout au panier depuis une fiche produit ;
4. la cohérence détaillée du panier ;
5. les calculs et informations du récapitulatif ;
6. les annulations et retours ;
7. la protection des routes après déconnexion ;
8. l’actualisation et le retour navigateur ;
9. `Reset App State` ;
10. les actions du menu ;
11. les contrôles P2 d’accessibilité et de responsive design.

La couverture P0 est prioritaire avant l’augmentation du volume global de tests.

---

## Technologies

- [Playwright](https://playwright.dev/)
- [Node.js](https://nodejs.org/)
- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Allure Report](https://allurereport.org/)
- [GitHub Actions](https://github.com/features/actions)
- [GitHub Pages](https://pages.github.com/)

---

## Licence et avertissement

Ce dépôt est proposé comme projet personnel open source de démonstration QA.

SauceDemo est utilisé uniquement comme application support pour l’apprentissage et l’expérimentation autour de l’automatisation des tests.

Les marques, noms et contenus associés restent la propriété de leurs détenteurs respectifs.

---

## Auteur

Projet développé et maintenu par [maximejoannis](https://github.com/maximejoannis).

- Application testée : [saucedemo.com](https://www.saucedemo.com/)
- Portail des rapports : [QA Coverage](https://maximejoannis.github.io/saucedemo-qa-automation/)
- Dépôt : [saucedemo-qa-automation](https://github.com/maximejoannis/saucedemo-qa-automation)
