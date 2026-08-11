# Cas de test

Précondition commune sauf mention contraire : application accessible. Les étapes condensées sont suffisamment déterministes pour être détaillées dans un outil de gestion de tests.

| ID | US / AC | Titre et type | P | Préconditions / données | Étapes | Résultat attendu | Auto / niveau |
|---|---|---|---|---|---|---|---|
| TC-001 | US-001 / 01 | Login standard — positif | P0 | standard/secret_sauce | Saisir; Login | Catalogue Products | Oui / E2E |
| TC-002 | US-001 / 02 | Username vide — négatif | P0 | mot de passe valide | Login | `Username is required`; URL login | Oui / E2E |
| TC-003 | US-001 / 02 | Password vide — négatif | P0 | username valide | Login | `Password is required`; aucun accès | Oui / E2E |
| TC-004 | US-001 / 03 | Identifiants faux — négatif | P0 | bad/bad | Login | Message mismatch; aucun accès | Oui / E2E |
| TC-005 | US-001 / 04 | Compte verrouillé — erreur | P0 | locked_out/secret_sauce | Login | Message locked out | Oui / E2E |
| TC-006 | US-002 / 01-02 | Catalogue complet — positif | P0 | Connecté | Compter et inspecter cartes | 6 cartes complètes et distinctes | Oui / E2E |
| TC-007 | US-002 / 01 | Donnée manquante — erreur | P1 | Profil problem/visual | Comparer à l'oracle standard | Écart détecté et signalé | Partiel / E2E+visuel |
| TC-008 | US-003 / 01 | Tri A-Z — positif | P1 | Catalogue | Choisir A-Z | Noms croissants | Oui / composant+E2E |
| TC-009 | US-003 / 01 | Tri Z-A — positif | P1 | Catalogue | Choisir Z-A | Noms décroissants | Oui / composant+E2E |
| TC-010 | US-003 / 02 | Prix ascendant — positif | P1 | Catalogue | Choisir low-high | 7.99…49.99 | Oui / composant+E2E |
| TC-011 | US-003 / 02 | Prix descendant — positif | P1 | Catalogue | Choisir high-low | 49.99…7.99 | Oui / composant+E2E |
| TC-012 | US-003 / 03 | Intégrité après tri — erreur | P1 | Snapshot initial | Appliquer les 4 tris | Même multiensemble de 6 produits | Oui / E2E |
| TC-013 | US-004 / 01-02 | Ouvrir par nom — positif | P1 | Catalogue | Cliquer Backpack | Fiche Backpack cohérente, 29.99 $ | Oui / E2E |
| TC-014 | US-004 / 01-02 | Ouvrir par image — positif | P1 | Catalogue | Cliquer image Bike Light | Bonne fiche, 9.99 $ | Oui / E2E |
| TC-015 | US-004 / 03 | Retour fiche — positif | P1 | Fiche ouverte | Back to products | Catalogue utilisable | Oui / E2E |
| TC-016 | US-005 / 01 | Ajouter un produit — positif | P0 | Panier vide | Add Backpack | Badge 1, Remove | Oui / E2E |
| TC-017 | US-005 / 02 | Ajouter trois produits — limite | P0 | Panier vide | Ajouter 3 articles | Badge 3, 3 lignes uniques | Oui / E2E |
| TC-018 | US-005 / 01 | Double ajout impossible — négatif | P1 | Produit ajouté | Rechercher second Add même produit | Action absente; quantité reste 1 | Oui / E2E |
| TC-019 | US-005 / 03 | Ajout depuis fiche — positif | P1 | Fiche Bike Light | Add; ouvrir panier | Bonne ligne et badge 1 | Oui / E2E |
| TC-020 | US-006 / 01 | Retirer parmi plusieurs — positif | P0 | 3 produits | Remove un article | Badge 2; autres intacts | Oui / E2E |
| TC-021 | US-006 / 02 | Retirer le dernier — limite | P0 | 1 produit | Remove | Badge absent; panier vide | Oui / E2E |
| TC-022 | US-007 / 01 | Exactitude panier — positif | P0 | Backpack ajouté | Ouvrir panier | Qté 1, nom/description/prix exacts | Oui / E2E |
| TC-023 | US-007 / 02 | Continuer shopping — positif | P1 | Panier 1 | Continue Shopping | Catalogue; badge 1 | Oui / E2E |
| TC-024 | US-007 / 03 | Panier vide — limite | P1 | Reset | Ouvrir panier | Aucune ligne ni badge | Oui / E2E |
| TC-025 | US-008 / 01 | Coordonnées valides — positif | P0 | Panier 1; D-01 | Checkout; saisir; Continue | Overview | Oui / E2E |
| TC-026 | US-008 / 02 | Prénom vide — négatif | P0 | D-02 | Continue | Message First Name; reste étape 1 | Oui / E2E |
| TC-027 | US-008 / 03 | Nom vide — négatif | P0 | D-03 | Continue | Message Last Name | Oui / E2E |
| TC-028 | US-008 / 04 | Code vide — négatif | P0 | D-04 | Continue | Message Postal Code | Oui / E2E |
| TC-029 | US-008 / 01 | Unicode/spéciaux — limite | P2 | D-06 | Saisir; Continue | Comportement stable; décision PO requise | Oui / E2E |
| TC-030 | US-008 / 01 | Espaces seuls — négatif/limite | P1 | D-05 | Saisir; Continue | Attendu à confirmer; aucun crash | Oui après arbitrage |
| TC-031 | US-008 / 01 | Chaînes longues — erreur | P2 | D-07 | Saisir; Continue | Aucun crash/débordement; règle PO | Partiel |
| TC-032 | US-009 / 01 | Articles récapitulés — positif | P0 | Panier 2; D-01 | Aller Overview | 2 articles/quantités/prix exacts | Oui / E2E |
| TC-033 | US-009 / 02 | Calcul Backpack — positif | P0 | Backpack seul | Overview | 29.99 + 2.40 = 32.39 | Oui / composant+E2E |
| TC-034 | US-009 / 02 | Calcul multi-articles — limite | P0 | Onesie + Jacket | Overview; recalculer | Somme/arrondi exacts | Oui / composant+E2E |
| TC-035 | US-009 / 03 | Paiement/livraison — positif | P1 | Overview | Inspecter sections | Valeurs simulées non vides | Oui / E2E |
| TC-036 | US-010 / 01 | Finish — positif | P0 | Overview | Finish | Confirmation explicite | Oui / E2E |
| TC-037 | US-010 / 02 | Back Home — positif | P0 | Confirmation | Back Home | Catalogue; panier vide | Oui / E2E |
| TC-038 | US-010 / 01 | Finish profil error — erreur | P1 | Parcours `error_user` | Finish | Défaut contrôlé/détecté, pas de faux succès | Oui / E2E dédiée |
| TC-039 | US-011 / 01 | Cancel informations — positif | P1 | Panier 1, étape info | Cancel | Panier intact | Oui / E2E |
| TC-040 | US-011 / 02 | Cancel overview — positif | P1 | Overview | Cancel | Catalogue, aucune confirmation | Oui / E2E |
| TC-041 | US-012 / 01 | Logout — positif | P0 | Connecté | Menu; Logout | Login affiché | Oui / E2E |
| TC-042 | US-012 / 02 | URL privée post-logout — sécurité | P0 | Déconnecté | Ouvrir inventory URL | Refus/redirection login | Oui / E2E |
| TC-043 | US-012 / 03 | Refresh avec panier — erreur | P1 | Connecté; panier 1 | Actualiser | UI utilisable; état cohérent | Oui / E2E |
| TC-044 | US-013 / 01-02 | Reset — positif | P1 | Panier 2 | Reset App State | Badge absent; Add restaurés; session active | Oui / E2E |
| TC-045 | US-014 / 01 | Contenu menu — positif | P2 | Connecté | Open Menu | 4 actions visibles | Oui / E2E |
| TC-046 | US-014 / 02 | Fermer/menu All Items — positif | P2 | Menu ouvert/fiche | Close puis All Items | Fermeture puis catalogue | Oui / E2E |
| TC-047 | US-012 / 02 | Back navigateur après logout — sécurité | P0 | Logout fait | Back | Pas d'accès privé exploitable | Oui / E2E |
| TC-048 | Transverse | Navigation clavier — accessibilité | P2 | Pages clés | Tab/Shift+Tab/Enter | Ordre logique, focus visible, actions utilisables | Partiel / manuel |
| TC-049 | Transverse | Zoom 200 % — accessibilité | P2 | 360 px et desktop | Zoomer; parcourir | Aucun contenu/action critique perdu | Manuel |
| TC-050 | Transverse | Temps catalogue — performance | P2 | Réseau contrôlé | Login standard, mesurer p95 | Respect budget convenu; aucun blocage | Oui / performance |

## Les cinq premières automatisations

1. `TC-001` connexion standard.
2. `TC-016` ajout panier et badge.
3. `TC-025` passage aux informations valides.
4. `TC-026` à `TC-028` validations requises en test paramétré.
5. `TC-033` + `TC-036` calcul et finalisation dans un smoke checkout.

