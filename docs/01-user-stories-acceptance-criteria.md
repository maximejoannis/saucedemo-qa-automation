# User stories et critères d’acceptation

Référentiel fonctionnel du site SauceDemo, structuré pour assurer la traçabilité exigence -> critère -> test.

## US01 - Authentification

**User story :** En tant qu’utilisateur, je veux me connecter avec mes identifiants afin d’accéder au catalogue.

### US01-AC01
La connexion est autorisée uniquement avec des identifiants valides.

### US01-AC02
Les erreurs de connexion sont explicites et l’accès reste refusé.

## US02 - Catalogue produits

**User story :** En tant que client connecté, je veux consulter et trier les produits afin de choisir un article.

### US02-AC01
Le catalogue affiche les six produits avec nom, description, prix et action panier.

### US02-AC02
Le tri réorganise correctement les produits selon le critère choisi.

## US03 - Gestion du panier

**User story :** En tant que client, je veux gérer mon panier afin de préparer ma commande.

### US03-AC01
L’ajout et le retrait mettent à jour le contenu et le badge du panier.

### US03-AC02
Le panier conserve les bons produits et permet de revenir au catalogue ou de passer au checkout.

## US04 - Saisie des informations de livraison

**User story :** En tant que client, je veux saisir mes informations afin de continuer la commande.

### US04-AC01
Les trois champs obligatoires contrôlent les valeurs manquantes.

### US04-AC02
Des informations valides donnent accès au récapitulatif de commande.

## US05 - Finalisation de commande

**User story :** En tant que client, je veux vérifier et finaliser ma commande afin de recevoir une confirmation.

### US05-AC01
Le récapitulatif présente les produits et montants cohérents.

### US05-AC02
La finalisation affiche une confirmation et permet le retour au catalogue.
