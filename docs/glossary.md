# Glossaire

## Objectif

Ce document définit le vocabulaire fonctionnel utilisé dans l'application **SauceDemo** et dans le framework d'automatisation.

Il constitue une référence commune pour les développeurs, les testeurs et les futurs outils d'analyse assistés par IA.

---

# Termes métier

## Utilisateur

Personne utilisant l'application afin de consulter des produits et de réaliser une commande.

---

## Utilisateur valide

Utilisateur dont les identifiants permettent une authentification réussie.

---

## Utilisateur bloqué

Utilisateur dont le compte est volontairement désactivé et qui ne peut pas accéder à l'application.

---

## Authentification

Processus permettant à un utilisateur d'accéder à l'application à l'aide de son identifiant et de son mot de passe.

---

## Catalogue

Liste des produits disponibles à l'achat.

Dans l'application SauceDemo, cette page est nommée **Inventory**.

---

## Produit

Article proposé à la vente dans le catalogue.

Exemples :

- Sauce Labs Backpack
- Sauce Labs Bike Light
- Sauce Labs Bolt T-Shirt

---

## Panier

Ensemble des produits sélectionnés par l'utilisateur avant la commande.

Dans l'application, il correspond à la page **Cart**.

---

## Checkout

Processus de finalisation de la commande.

Il comprend :

- la saisie des informations client ;
- le récapitulatif de commande ;
- la validation finale.

---

## Informations client

Informations requises pour poursuivre le processus de commande :

- prénom ;
- nom ;
- code postal.

---

## Récapitulatif de commande

Écran présentant les produits sélectionnés ainsi que les informations de commande avant validation.

Dans l'application, cette étape correspond à **Checkout Overview**.

---

## Confirmation de commande

Dernière étape du processus d'achat confirmant que la commande a été validée.

---

# Termes techniques

## Page Object

Classe représentant une page ou un écran de l'application.

Elle encapsule les locators, les actions utilisateur et les comportements réutilisables.

---

## Fixture

Mécanisme Playwright permettant d'injecter automatiquement les objets nécessaires aux scénarios de tests.

---

## Test automatisé

Scénario Playwright vérifiant un comportement fonctionnel de l'application.

---

## User Story

Expression d'un besoin métier décrivant la valeur attendue pour un utilisateur.

---

## Fonctionnalité

Capacité offerte par l'application et identifiée par un identifiant unique (`Fxx`) dans le document `functional-map.md`.

---

## Règle métier

Contrainte fonctionnelle que l'application doit toujours respecter, indépendamment de son implémentation technique.

---

## Couverture fonctionnelle

Mesure du pourcentage de fonctionnalités identifiées dans le référentiel qui sont vérifiées par au moins un test automatisé.

---

## Traçabilité

Capacité à relier les fonctionnalités, les règles métier, les User Stories et les tests automatisés afin de démontrer leur couverture.

---

# Acronymes

| Acronyme | Signification             |
| -------- | ------------------------- |
| QA       | Quality Assurance         |
| E2E      | End-to-End                |
| POM      | Page Object Model         |
| CI       | Continuous Integration    |
| AI       | Artificial Intelligence   |
| HTML     | HyperText Markup Language |

---

# Références

Ce document est lié aux éléments suivants :

- `functional-map.md`
- `user-stories.md`
- `business-rules.md`
