# 🚀 Sauce demo Automatisation

[![Playwright](https://img.shields.io/badge/Playwright-1.61.1-2EAD33?logo=playwright\&logoColor=white)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript\&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![ESLint](https://img.shields.io/badge/ESLint-Code%20Quality-4B32C3?logo=eslint\&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Code%20Formatter-F7B93E?logo=prettier\&logoColor=black)](https://prettier.io/)
[![Playwright Report](https://img.shields.io/badge/Playwright-HTML%20Report-45BA63)](#)
[![Allure Report](https://img.shields.io/badge/Allure-Test%20Report-orange)](#)
[![AI Feature Mapper](https://img.shields.io/badge/AI-Feature%20Mapper-6A5ACD)](#-ai-feature-mapper-agent)
[![Coverage Report](https://img.shields.io/badge/Functional-Coverage%20Report-0080FF)](#-rapport-de-couverture-fonctionnelle)

> **Framework d'automatisation des tests End-to-End basé sur Playwright intégrant un agent QA spécialisé dans la cartographie fonctionnelle et la mesure de la couverture fonctionnelle des tests automatisés.**

---

## 🎯 Objectif

Ce projet ne se limite pas à exécuter des tests automatisés.

Il fournit également un **AI Feature Mapper Agent**, capable d'analyser automatiquement un projet Playwright afin de répondre à une question essentielle en Assurance Qualité :

> **Quel est le niveau réel de couverture fonctionnelle de mes tests automatisés ?**

L'agent analyse le dépôt, identifie les fonctionnalités métier, les met en relation avec les Page Objects et les tests Playwright, puis génère un **rapport de couverture fonctionnelle** détaillé et explicable.

L'ensemble repose sur une approche **déterministe**, sans modèle de langage (LLM), garantissant des résultats reproductibles et traçables.

---

## ✨ Fonctionnalités principales

### 🧪 Framework Playwright

* Tests End-to-End avec Playwright
* Architecture Page Object Model (POM)
* Gestion centralisée des données de test
* Authentification réutilisable
* Exécution parallèle
* Multi-navigateurs (Chromium, Firefox, WebKit)
* Compatible GitHub Actions

### 🛠️ Qualité du code

* ESLint
* Prettier
* Vérification automatique de la qualité
* Rapport qualité

### 📊 Reporting

* Rapport HTML Playwright
* Rapport Allure
* Rapport qualité
* Rapport de couverture fonctionnelle (HTML & JSON)

### 🤖 AI Feature Mapper Agent

* Analyse du référentiel fonctionnel
* Analyse des Page Objects
* Analyse des tests Playwright
* Corrélation fonctionnalités ↔ tests
* Calcul de la couverture fonctionnelle
* Génération d'un rapport HTML et JSON
* Exploitation optionnelle des résultats Playwright

---

# 📚 Sommaire

* [Présentation](#-présentation)
* [Architecture du projet](#-architecture-du-projet)
* [Architecture de l'AI Feature Mapper Agent](#-architecture-de-lai-feature-mapper-agent)
* [Installation](#-installation)
* [Exécution des tests](#-exécution-des-tests)
* [Qualité du code](#-qualité-du-code)
* [Rapports](#-rapports)
* [AI Feature Mapper Agent](#-ai-feature-mapper-agent)
* [Rapport de couverture fonctionnelle](#-rapport-de-couverture-fonctionnelle)
* [Méthode de calcul](#-méthode-de-calcul)
* [Structure du projet](#-structure-du-projet)
* [Technologies utilisées](#-technologies-utilisées)
* [Contribution](#-contribution)
* [Roadmap](#-roadmap)
