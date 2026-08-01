# Cartographie fonctionnelle

## Objectif

Ce document constitue le référentiel fonctionnel de l'application **SauceDemo**.

Il décrit les fonctionnalités métier couvertes par le framework d'automatisation, indépendamment de leur implémentation technique.

Chaque fonctionnalité possède un identifiant unique (`Fxx`) qui servira de référence dans les futurs outils d'analyse (cartographie, couverture fonctionnelle, recommandations de tests).

---

# Domaine 1 — Authentification

## F01 — Connexion utilisateur

### Description

Permet à un utilisateur valide de s'authentifier afin d'accéder au catalogue des produits.

### Préconditions

- L'utilisateur se trouve sur la page de connexion.
- Un compte valide est disponible.

### Résultat attendu

- L'utilisateur est authentifié.
- Le catalogue des produits est affiché.

---

## F02 — Refus d'accès pour un utilisateur bloqué

### Description

Empêche un utilisateur bloqué d'accéder à l'application.

### Préconditions

- L'utilisateur possède un compte marqué comme bloqué.

### Résultat attendu

- L'authentification est refusée.
- Un message d'erreur est affiché.

---

## F03 — Refus d'accès avec des identifiants invalides

### Description

Empêche l'authentification lorsqu'un identifiant ou un mot de passe est incorrect.

### Préconditions

- L'utilisateur saisit des identifiants invalides.

### Résultat attendu

- L'accès est refusé.
- Un message d'erreur est affiché.

---

# Domaine 2 — Catalogue

## F10 — Consultation du catalogue

### Description

Affiche la liste des produits disponibles.

### Préconditions

- L'utilisateur est authentifié.

### Résultat attendu

- Tous les produits sont visibles.

---

## F11 — Tri des produits

### Description

Permet de modifier l'ordre d'affichage des produits.

### Résultat attendu

Les produits sont triés selon le critère sélectionné.

---

## F12 — Consultation d'un produit

### Description

Permet de consulter les informations d'un produit.

### Résultat attendu

Les informations détaillées du produit sont affichées.

---

# Domaine 3 — Panier

## F20 — Ajouter un produit au panier

### Description

Ajoute un produit au panier.

### Résultat attendu

Le produit apparaît dans le panier.

---

## F21 — Retirer un produit du panier

### Description

Supprime un produit du panier.

### Résultat attendu

Le produit n'apparaît plus dans le panier.

---

## F22 — Consulter le panier

### Description

Affiche le contenu actuel du panier.

### Résultat attendu

Les produits ajoutés sont visibles.

---

## F23 — Continuer les achats

### Description

Permet de revenir au catalogue depuis le panier.

### Résultat attendu

Le catalogue est réaffiché.

---

# Domaine 4 — Checkout

## F30 — Saisie des informations client

### Description

Permet de renseigner les informations nécessaires à la commande.

### Résultat attendu

Les informations sont enregistrées et l'utilisateur passe à l'étape suivante.

---

## F31 — Consultation du récapitulatif

### Description

Présente un résumé de la commande avant validation.

### Résultat attendu

Le récapitulatif affiche les produits, les montants et les informations client.

---

## F32 — Validation de la commande

### Description

Finalise la commande.

### Résultat attendu

La commande est enregistrée.

---

## F33 — Confirmation de commande

### Description

Affiche la confirmation de commande après validation.

### Résultat attendu

L'utilisateur visualise le message de confirmation.
