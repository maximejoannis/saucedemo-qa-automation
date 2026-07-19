# Stratégie de test — Projet SauceDemo QA Automation

## Objectif

Définir une stratégie de test simple, maintenable et reproductible pour automatiser les parcours critiques de l'application SauceDemo avec Playwright.

## Types de tests

| Type | Objectif |
|------|----------|
| Smoke | Vérifier rapidement les fonctionnalités essentielles avant une livraison |
| Régression | Vérifier que les fonctionnalités existantes restent stables après une évolution |
| Critique | Sécuriser les parcours ayant le plus fort impact métier |
| Fonctionnel | Valider le comportement attendu de l'application |
| Négatif | Vérifier la gestion des erreurs et des cas invalides |
| E2E | Simuler un parcours utilisateur complet de bout en bout |

## Priorités

| Priorité | Description | Exemples |
|----------|-------------|----------|
| P1 | Critique | Authentification, parcours d'achat complet |
| P2 | Important | Gestion du panier, validation du checkout |
| P3 | Secondaire | Tri et consultation des produits |

## Tags utilisés

Les tests utilisent actuellement les tags suivants :

| Tag | Usage |
|------|-------|
| `@smoke` | Validation rapide des fonctionnalités essentielles |
| `@critical` | Parcours métier critiques |

> Les autres catégories (régression, login, panier, checkout, etc.) sont couvertes par les scénarios mais ne sont pas actuellement matérialisées par des tags Playwright.

## Exécution des tests

Les tests sont exécutés sur deux navigateurs :

- Chromium
- Firefox

Configuration d'exécution :

- exécution parallèle en local ;
- 2 tentatives automatiques en CI en cas d'échec ;
- 1 worker en CI pour garantir la stabilité des exécutions ;
- génération automatique des traces, captures d'écran et vidéos en cas d'échec.

## Reporting

Chaque exécution génère :

- le rapport HTML Playwright (`playwright-report`) ;
- les résultats Allure (`allure-results`) ;
- les traces (`trace`), captures d'écran et vidéos des tests en échec.

Dans GitHub Actions :

- les rapports sont publiés en artefacts ;
- le rapport Allure est publié automatiquement sur GitHub Pages afin de conserver un historique des exécutions.

## Intégration Continue

Le workflow GitHub Actions exécute automatiquement la suite de tests sur chaque Push et Pull Request afin de détecter rapidement les régressions.
