# Catalogue de 50 cas de test

Chaque critère d’acceptation possède exactement cinq cas de test. Les techniques ISTQB utilisées incluent partitions d’équivalence, valeurs limites, tables de décision, transitions d’état et tests de parcours.

## US01 - Authentification

### US01-AC01 - La connexion est autorisée uniquement avec des identifiants valides.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US01-AC01-01 | Connexion standard valide | standard_user / secret_sauce | Accès à /inventory et titre Products | Haute | Partition d’équivalence |
| TC-US01-AC01-02 | Connexion problem_user | problem_user / secret_sauce | Accès autorisé au catalogue | Haute | Cas négatif / table de décision |
| TC-US01-AC01-03 | Connexion performance_glitch_user | performance_glitch_user / secret_sauce | Accès autorisé malgré le délai | Moyenne | Valeur limite |
| TC-US01-AC01-04 | Soumission par clic | Identifiants valides puis clic | Connexion réussie | Moyenne | Transition d’état |
| TC-US01-AC01-05 | Nouvelle session après déconnexion | Déconnexion puis reconnexion | Nouvelle connexion réussie | Haute | Parcours utilisateur |

### US01-AC02 - Les erreurs de connexion sont explicites et l’accès reste refusé.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US01-AC02-01 | Mot de passe invalide | standard_user / wrong_password | Message identifiants incorrects | Haute | Partition d’équivalence |
| TC-US01-AC02-02 | Utilisateur bloqué | locked_out_user | Message utilisateur bloqué | Haute | Cas négatif / table de décision |
| TC-US01-AC02-03 | Username vide | Password seul | Username is required | Moyenne | Valeur limite |
| TC-US01-AC02-04 | Password vide | Username seul | Password is required | Moyenne | Transition d’état |
| TC-US01-AC02-05 | Deux champs vides | Aucune donnée | Username is required | Haute | Parcours utilisateur |

## US02 - Catalogue produits

### US02-AC01 - Le catalogue affiche les six produits avec nom, description, prix et action panier.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US02-AC01-01 | Nombre de produits | Catalogue chargé | 6 produits visibles | Haute | Partition d’équivalence |
| TC-US02-AC01-02 | Données produit | Chaque carte | Nom, description et prix visibles | Haute | Cas négatif / table de décision |
| TC-US02-AC01-03 | Lien détail | Cliquer sur un nom | Page détail correcte | Moyenne | Valeur limite |
| TC-US02-AC01-04 | Retour catalogue | Depuis détail | Retour à Products | Moyenne | Transition d’état |
| TC-US02-AC01-05 | Boutons panier | Toutes les cartes | Bouton Add to cart disponible | Haute | Parcours utilisateur |

### US02-AC02 - Le tri réorganise correctement les produits selon le critère choisi.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US02-AC02-01 | Tri A-Z | az | Ordre alphabétique croissant | Haute | Partition d’équivalence |
| TC-US02-AC02-02 | Tri Z-A | za | Ordre alphabétique décroissant | Haute | Cas négatif / table de décision |
| TC-US02-AC02-03 | Prix croissant | lohi | Prix non décroissants | Moyenne | Valeur limite |
| TC-US02-AC02-04 | Prix décroissant | hilo | Prix non croissants | Moyenne | Transition d’état |
| TC-US02-AC02-05 | Changement successif | A-Z puis prix décroissant | Chaque sélection remplace le tri précédent | Haute | Parcours utilisateur |

## US03 - Gestion du panier

### US03-AC01 - L’ajout et le retrait mettent à jour le contenu et le badge du panier.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US03-AC01-01 | Ajout d’un produit | Backpack | Badge 1 et bouton Remove | Haute | Partition d’équivalence |
| TC-US03-AC01-02 | Ajout de trois produits | 3 références | Badge 3 | Haute | Cas négatif / table de décision |
| TC-US03-AC01-03 | Retrait catalogue | Produit ajouté | Badge supprimé | Moyenne | Valeur limite |
| TC-US03-AC01-04 | Retrait panier | Produit dans panier | Ligne supprimée | Moyenne | Transition d’état |
| TC-US03-AC01-05 | Retrait partiel | 3 produits puis retrait 1 | Badge 2 et deux lignes | Haute | Parcours utilisateur |

### US03-AC02 - Le panier conserve les bons produits et permet de revenir au catalogue ou de passer au checkout.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US03-AC02-01 | Panier vide | Ouvrir sans ajout | 0 ligne | Haute | Partition d’équivalence |
| TC-US03-AC02-02 | Contenu exact | Ajouter 2 produits | Noms et quantité corrects | Haute | Cas négatif / table de décision |
| TC-US03-AC02-03 | Persistance navigation | Ajouter, détail, retour, panier | Produit conservé | Moyenne | Valeur limite |
| TC-US03-AC02-04 | Continuer achats | Depuis panier | Retour /inventory | Moyenne | Transition d’état |
| TC-US03-AC02-05 | Accès checkout | Panier non vide | Ouverture checkout-step-one | Haute | Parcours utilisateur |

## US04 - Saisie des informations de livraison

### US04-AC01 - Les trois champs obligatoires contrôlent les valeurs manquantes.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US04-AC01-01 | Prénom manquant | Nom + code postal | First Name is required | Haute | Partition d’équivalence |
| TC-US04-AC01-02 | Nom manquant | Prénom + code postal | Last Name is required | Haute | Cas négatif / table de décision |
| TC-US04-AC01-03 | Code postal manquant | Prénom + nom | Postal Code is required | Moyenne | Valeur limite |
| TC-US04-AC01-04 | Tous champs vides | Aucune donnée | Erreur sur le premier champ requis | Moyenne | Transition d’état |
| TC-US04-AC01-05 | Correction après erreur | Erreur puis saisie complète | Erreur disparaît et navigation autorisée | Haute | Parcours utilisateur |

### US04-AC02 - Des informations valides donnent accès au récapitulatif de commande.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US04-AC02-01 | Données nominales | Maxime/JOANNIS/94340 | Accès checkout-step-two | Haute | Partition d’équivalence |
| TC-US04-AC02-02 | Valeurs avec tiret | Jean-Pierre/DUPONT/75001 | Accès autorisé | Haute | Cas négatif / table de décision |
| TC-US04-AC02-03 | Code postal alphanumérique | John/Smith/SW1A 1AA | Comportement accepté par l’application | Moyenne | Valeur limite |
| TC-US04-AC02-04 | Valeurs longues | Chaînes longues | Aucune erreur technique | Moyenne | Transition d’état |
| TC-US04-AC02-05 | Retour annulation | Formulaire puis Cancel | Retour au panier | Haute | Parcours utilisateur |

## US05 - Finalisation de commande

### US05-AC01 - Le récapitulatif présente les produits et montants cohérents.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US05-AC01-01 | Récapitulatif 1 produit | Backpack | Produit et $29.99 visibles | Haute | Partition d’équivalence |
| TC-US05-AC01-02 | Récapitulatif 3 produits | Backpack + Bike Light + T-Shirt | Trois lignes et sous-total $55.97 | Haute | Cas négatif / table de décision |
| TC-US05-AC01-03 | Taxe visible | Commande valide | Tax label visible | Moyenne | Valeur limite |
| TC-US05-AC01-04 | Total cohérent | Sous-total + taxe | Total = somme affichée | Moyenne | Transition d’état |
| TC-US05-AC01-05 | Annuler récapitulatif | Cliquer Cancel | Retour catalogue | Haute | Parcours utilisateur |

### US05-AC02 - La finalisation affiche une confirmation et permet le retour au catalogue.

| ID | Cas de test | Données / préconditions | Résultat attendu | Priorité | Technique |
|---|---|---|---|---|---|
| TC-US05-AC02-01 | Finaliser 1 produit | Commande nominale | Thank you for your order! | Haute | Partition d’équivalence |
| TC-US05-AC02-02 | Finaliser plusieurs produits | 3 produits | Confirmation affichée | Haute | Cas négatif / table de décision |
| TC-US05-AC02-03 | Texte expédition | Après Finish | Message dispatched visible | Moyenne | Valeur limite |
| TC-US05-AC02-04 | Retour produits | Back Home | Retour /inventory | Moyenne | Transition d’état |
| TC-US05-AC02-05 | Panier après commande | Retour catalogue | Badge absent / panier réinitialisé | Haute | Parcours utilisateur |
