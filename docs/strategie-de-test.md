# Stratégie de test — Projet SauceDemo QA Automation

## Objectif

Définir une approche QA maintenable pour automatiser les parcours critiques de SauceDemo avec Playwright.

## Types de tests

| Type | Objectif |
|---|---|
| Smoke | Vérifier rapidement les fonctions vitales |
| Régression | Vérifier que les fonctionnalités existantes restent stables |
| Critique | Sécuriser le tunnel d’achat |
| Fonctionnel | Valider le comportement visible utilisateur |
| Négatif | Valider la gestion des erreurs |
| E2E | Simuler un parcours utilisateur complet |

## Priorités

| Priorité | Description | Exemples |
|---|---|---|
| P1 | Critique | Connexion, achat complet |
| P2 | Important | Suppression panier, erreurs checkout |
| P3 | Secondaire | Tri produits |

## Tags

| Tag | Usage |
|---|---|
| @smoke | Validation rapide |
| @regression | Non-régression |
| @critical | Parcours métier critique |
| @login | Authentification |
| @products | Catalogue |
| @cart | Panier |
| @checkout | Checkout |
| @e2e | End-to-end |

## Reporting

Le rapport HTML Playwright est publié localement et en artifact GitHub Actions. Les screenshots, vidéos et traces sont conservés en cas d’échec pour faciliter l’analyse.
