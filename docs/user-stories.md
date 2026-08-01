# User Stories

## Objectif

Ce document recense les User Stories couvertes par le framework d'automatisation.

Chaque User Story décrit un besoin métier et référence les fonctionnalités définies dans le document `functional-map.md`.

---

# US01 — Authentification

## En tant qu'

Utilisateur enregistré

## Je souhaite

M'authentifier avec mes identifiants.

## Afin de

Pouvoir accéder au catalogue des produits.

### Fonctionnalités associées

- F01 — Connexion utilisateur
- F02 — Refus d'accès pour un utilisateur bloqué
- F03 — Refus d'accès avec des identifiants invalides

### Critères d'acceptation

- Un utilisateur valide peut se connecter.
- Un utilisateur bloqué ne peut pas accéder à l'application.
- Des identifiants invalides provoquent un message d'erreur.

---

# US02 — Consultation du catalogue

## En tant qu'

Utilisateur authentifié

## Je souhaite

Consulter les produits disponibles.

## Afin de

Choisir les articles que je souhaite acheter.

### Fonctionnalités associées

- F10 — Consultation du catalogue
- F11 — Tri des produits
- F12 — Consultation d'un produit

### Critères d'acceptation

- Les produits sont affichés après authentification.
- Le tri modifie correctement l'ordre d'affichage.
- Les informations d'un produit sont accessibles.

---

# US03 — Gestion du panier

## En tant qu'

Utilisateur authentifié

## Je souhaite

Gérer le contenu de mon panier.

## Afin de

Préparer ma commande.

### Fonctionnalités associées

- F20 — Ajouter un produit au panier
- F21 — Retirer un produit du panier
- F22 — Consulter le panier
- F23 — Continuer les achats

### Critères d'acceptation

- Un produit peut être ajouté au panier.
- Un produit peut être retiré du panier.
- Le contenu du panier est affiché.
- L'utilisateur peut revenir au catalogue.

---

# US04 — Checkout

## En tant qu'

Utilisateur authentifié

## Je souhaite

Finaliser ma commande.

## Afin de

Acheter les produits présents dans mon panier.

### Fonctionnalités associées

- F30 — Saisie des informations client
- F31 — Consultation du récapitulatif
- F32 — Validation de la commande
- F33 — Confirmation de commande

### Critères d'acceptation

- Les informations client sont obligatoires.
- Le récapitulatif de commande est affiché.
- La commande peut être validée.
- Une confirmation est affichée.

---

# US05 — Parcours utilisateur complet

## En tant qu'

Utilisateur

## Je souhaite

Réaliser un achat complet.

## Afin de

Commander un produit depuis la connexion jusqu'à la confirmation.

### Fonctionnalités associées

- F01
- F10
- F20
- F30
- F31
- F32
- F33

### Critères d'acceptation

- Le parcours complet peut être réalisé sans erreur.
- La commande est confirmée avec succès.
