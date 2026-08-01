# Règles métier

## Objectif

Ce document recense les règles métier applicables à l'application **SauceDemo**.

Une règle métier décrit une contrainte ou un comportement attendu du système, indépendamment de son implémentation technique. Une même règle peut être vérifiée par plusieurs scénarios de tests et concerner plusieurs fonctionnalités.

---

# Authentification

## BR01 — Seuls les utilisateurs valides peuvent accéder au catalogue

### Description

L'accès au catalogue est autorisé uniquement après une authentification réussie.

### Fonctionnalités concernées

- F01 — Connexion utilisateur
- F10 — Consultation du catalogue

---

## BR02 — Un utilisateur bloqué ne peut pas se connecter

### Description

Un compte marqué comme bloqué doit être systématiquement refusé.

### Fonctionnalités concernées

- F02 — Refus d'accès pour un utilisateur bloqué

---

## BR03 — Des identifiants invalides empêchent l'authentification

### Description

Toute tentative de connexion avec un identifiant ou un mot de passe incorrect doit être rejetée.

### Fonctionnalités concernées

- F03 — Refus d'accès avec des identifiants invalides

---

# Catalogue

## BR04 — Le catalogue est accessible uniquement après authentification

### Description

Les produits ne doivent pas être consultables sans connexion préalable.

### Fonctionnalités concernées

- F10 — Consultation du catalogue

---

## BR05 — Le tri modifie uniquement l'ordre d'affichage

### Description

Le changement de critère de tri ne modifie ni le contenu ni le nombre de produits affichés.

### Fonctionnalités concernées

- F11 — Tri des produits

---

# Panier

## BR06 — Un produit ajouté apparaît dans le panier

### Description

Tout produit ajouté doit être immédiatement visible dans le panier.

### Fonctionnalités concernées

- F20 — Ajouter un produit au panier
- F22 — Consulter le panier

---

## BR07 — Un produit retiré disparaît du panier

### Description

Après suppression, le produit ne doit plus apparaître dans le panier.

### Fonctionnalités concernées

- F21 — Retirer un produit du panier

---

## BR08 — Le panier reflète toujours les actions de l'utilisateur

### Description

Le contenu du panier doit rester cohérent avec les ajouts et suppressions effectués.

### Fonctionnalités concernées

- F20
- F21
- F22

---

# Checkout

## BR09 — Le checkout nécessite au moins un produit

### Description

Le processus de commande ne peut être engagé que si le panier contient au moins un article.

### Fonctionnalités concernées

- F22 — Consulter le panier
- F30 — Saisie des informations client

---

## BR10 — Les informations client sont obligatoires

### Description

Le prénom, le nom et le code postal doivent être renseignés avant de poursuivre.

### Fonctionnalités concernées

- F30 — Saisie des informations client

---

## BR11 — Le récapitulatif affiche les informations de la commande

### Description

Le récapitulatif présente les produits sélectionnés ainsi que les informations de commande avant validation.

### Fonctionnalités concernées

- F31 — Consultation du récapitulatif

---

## BR12 — Une commande validée affiche une confirmation

### Description

Après validation, une page de confirmation doit être affichée à l'utilisateur.

### Fonctionnalités concernées

- F32 — Validation de la commande
- F33 — Confirmation de commande
