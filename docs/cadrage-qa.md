# Cadrage QA — Projet SauceDemo

## Contexte métier

SauceDemo est une application e-commerce de démonstration permettant de simuler un parcours d’achat complet : connexion, consultation du catalogue, ajout au panier, checkout et confirmation de commande.

## Objectif QA

Mettre en place une automatisation QA complète afin de sécuriser les parcours critiques de l’application après chaque évolution ou mise en production.

## Application sous test

- Nom : SauceDemo
- URL : https://www.saucedemo.com/
- Type : Application web e-commerce
- Outil d’automatisation : Playwright JavaScript

## Périmètre fonctionnel

- Authentification
- Catalogue produits
- Panier
- Checkout
- Confirmation de commande

## Hors périmètre

- Performance
- Sécurité avancée
- API
- Base de données
- Paiement réel
- Création de compte
- Tests mobiles approfondis

## Approche d’automatisation

Le projet est structuré avec Playwright, une architecture Page Object Model, des données de test centralisées, des tags de tests, un rapport HTML, des traces, captures et vidéos en cas d’échec, ainsi qu’une exécution CI/CD via GitHub Actions.
