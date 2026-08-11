# Stratégie de test

## Objectifs qualité

Garantir que l'utilisateur actif peut se connecter, choisir des produits, maintenir un panier cohérent et terminer le checkout; empêcher les accès non autorisés et les commandes aux données requises incomplètes; détecter les régressions UI, calcul et navigation.

## Approche par risque

| Niveau | Définition | Exécution | Contenu |
|---|---|---|---|
| P0 | Blocage du revenu/parcours ou faille de session | Chaque commit, build et déploiement | Login, catalogue, panier, validations, calcul, finish, logout |
| P1 | Fonction fréquente ou défaut à impact élevé contournable | Quotidien + régression | Tri, fiche, annulation, reset, refresh, profils dégradés |
| P2 | Risque faible/rare, visuel ou étendu | Hebdomadaire / avant release | Responsive, compatibilité étendue, accessibilité, liens externes |

## Niveaux et types

- UI end-to-end : parcours utilisateur et intégration des états.
- Composant/intégration : tris, calculs, validations et stockage, si le code est accessible.
- API : uniquement après inventaire de contrats stables; ne pas dériver un contrat d'appels internes non documentés.
- Manuel : visuel, ergonomie, lecteur d'écran, responsive et exploratoire profils dégradés.
- Non fonctionnel : budgets de performance, WCAG 2.2 AA de premier niveau, sécurité de session et compatibilité.

## Environnements

- Chrome, Firefox, WebKit/Safari : dernière version stable; Edge couvert via Chromium avec un passage dédié avant release.
- Viewports : 360×800, 768×1024, 1440×900; zoom 200 %.
- Environnement propre et réinitialisable; données déterministes; horloge et devise stabilisées.
- Un worker/test utilisateur ou réinitialisation avant chaque scénario afin d'éviter les dépendances.

## Pyramide et automatisation

Automatiser d'abord les règles pures (tri, total, validations) au niveau composant si possible, puis un petit smoke E2E P0. Utiliser des sélecteurs stables (`data-test`), attendre les états visibles plutôt que des temporisations, isoler chaque test, capturer trace/screenshot uniquement à l'échec. Ne pas automatiser en priorité les contrôles subjectifs ou les anomalies visuelles intentionnelles.

### Ordre recommandé

1. P0 : connexion standard; login refusé; catalogue; ajout/retrait; checkout complet; champs requis; calcul; logout/protection route.
2. P1 : quatre tris; fiche; plusieurs articles; annulations; reset; refresh; robustesse des profils spéciaux.
3. P2 : responsive, visuel, accessibilité complète, navigation clavier, liens externes.

## Données de test

- Comptes : standard comme oracle; locked pour refus; problem/error/visual/performance pour campagnes de robustesse.
- Produits bas et haut prix pour bornes de tri; deux produits au même prix pour stabilité.
- Coordonnées : valides, vides, espaces, Unicode, caractères spéciaux, très longues chaînes. Les comportements hors « non vide » restent à arbitrer.

## Entrée / sortie

Entrée : build déployé, environnement accessible, comptes et jeu catalogue connus, état réinitialisable. Sortie : 100 % P0 passants, aucune anomalie bloquante/critique ouverte, ≥95 % P1 passants, couverture AC complète, anomalies restantes acceptées et documentées.

## Anomalies

Rapport : ID, titre, environnement, profil, préconditions, étapes, attendu/obtenu, fréquence, preuve, sévérité, priorité. Sévérité : bloquante, critique, majeure, mineure, cosmétique. Rejouer sur compte standard puis profil spécial pour isoler la cause.

## Risques et parades

| Risque | Impact | Parade |
|---|---|---|
| Profils volontairement défectueux confondus avec l'oracle | Faux échecs | Oracle `standard_user`; suites séparées |
| État partagé/local storage | Flakiness | Reset avant/après, contextes isolés |
| Sélecteurs textuels fragiles | Maintenance | `data-test`, page objects légers |
| Calcul fiscal non spécifié | Faux verdict | Faire confirmer règle et arrondi |
| E2E trop nombreux | Suite lente | Descendre règles aux niveaux composant/unitaire |
| Démo tierce instable | Échecs environnementaux | Retry limité au setup, diagnostic réseau distinct |

