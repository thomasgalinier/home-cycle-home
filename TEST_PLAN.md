## Plan de test — Frontend Home Cycle Home

Version: 1.0 • Dernière maj: 2025-08-18 • Portée: app front `home-cycle-home` (Vite + React + TS)

### Objectifs
- Garantir la qualité fonctionnelle, UX, accessibilité et performance du front.
- Sécuriser les parcours critiques (authentification, navigation “auth”, gestion comptes, forfaits, planning).
- Définir outils, critères d’acceptation, priorités, et responsabilités.

### Contexte projet (déduit du repo)
- Stack: Vite, React + TypeScript, TanStack Router (`src/routeTree.gen.ts`), TanStack Query (`src/integrations/tanstack-query`), composants UI (`src/components/ui/*`, shadcn-like), hooks maison (`src/hooks/*`), services API (`src/services/*`).
- Routes clés: `src/routes/__root.tsx`, `src/routes/_authenticated.tsx`, `src/routes/auth.tsx`, `src/routes/_authenticated/*`, `src/routes/auth/*`.
- Domaines: Comptes (`src/components/Comptes/*`), Forfaits (`src/components/forfait/*`), Planning (`src/hooks/planning/*`), Carte (`src/hooks/carte/*`).

## Stratégie de test

### Niveaux et objectifs
- Unitaires (Vitest): logique pure (utils, hooks, composants UI isolés).
- Intégration (Testing Library + MSW): composants/pages avec providers (Router, QueryClient, Theme), validations formulaire, états de requêtes, règles d’affichage.
- E2E (Playwright): parcours utilisateur bout-en-bout (auth -> navigation sécurisée -> opérations clés -> déconnexion).
- Accessibilité (axe + Playwright a11y scans): règles WCAG AA sur pages et composants critiques.
- Performance (Lighthouse CI sur pages clés): LCP, TBT, CLS budgets.
- Non-régression visuelle (optionnel): Playwright trace/video + snapshots ciblés.

### Outils et librairies
- Vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom
- MSW (mock API réseau) avec handlers par service `src/services/api/*`
- Playwright (chromium, webkit, firefox en CI matrix)
- axe-core / jest-axe pour a11y; Lighthouse CI (optionnel)
- ESLint plugin testing-library & jest-dom; Biome pour format

### Environnements
- Local: jsdom (unit/int), serveur dev mocké pour E2E rapide (MSW) + env `.env` local.
- CI: build prod + tests unit/int, E2E headless sur serveur de prévisualisation.
- Staging (optionnel E2E live): smoke sur API réelle avec jeu de données de test.

## Périmètre et priorités

1) Parcours critiques (P0)
- Authentification (`src/routes/auth.tsx`): login, états d’erreur, redirection, refresh token via services.
- Navigation sécurisée (`src/routes/_authenticated.tsx`): guard, redirection si non auth.
- Forfaits: liste, création/modification via `DialogModificationForfait`, affichages `CardForfait`.
- Comptes: recherche/sélection utilisateur (`components/selectUser.tsx`, `Comptes/DialogUpdateUser.tsx`).
- Planning: affichage, filtres de dates (`DatePicker`, `DateRangePicker`).

2) Base UI & Accessibilité (P1)
- Boutons, modales/dialogs (`components/ui/alert-dialog.tsx`, `button.tsx`), focus trap, labels, aria.
- Formulaires (`FormContainer`, `FormHelperText`), erreurs/validation.

3) Performances (P2)
- Pages principales: LCP < 2.5s sur devices moyens; CLS < 0.1; TBT < 200ms.

Hors périmètre (v1): régression visuelle exhaustive, tests cross-device très larges.

## Critères de réussite (Definition of Done)
- Couverture: 80% lignes/branches sur `src/lib`, hooks et services; 70% composants; P0 à 100% cas critiques couverts.
- E2E: 100% smoke P0 verts; pas d’échec flaky répété (>1/10).
- A11y: axe “serious/critical” = 0 sur pages P0.
- Perf (prod build): budgets respectés sur routes d’entrée.

## Données de test
- Fixtures stables pour comptes, forfaits, planning.
- MSW handlers par ressource (`GET/POST/PATCH/DELETE`), scénarios succès / 4xx / 5xx / timeouts.
- Utilisateurs: admin, technicien, viewer (rôles différents) + utilisateur invalide.

## Plan d’exécution

1) Mise en place
- Config Vitest + setup providers: QueryClientProvider, RouterProvider mock, Theme.
- Setup Testing Library, jest-dom, user-event, jest-axe/axe.
- MSW: server + handlers de base pour auth, forfaits, comptes, planning.
- Playwright: config baseUrl, storageState (session), traces on-failure.

2) Suite de tests
- Unitaires (exemples):
  - `src/lib/utils.ts`: formats, helpers.
  - Hooks: `useDebouncedValue`, `useLocalStorage`, `useSigninForm`, `useTheme`.
  - UI primitives: button, card, alert-dialog (rendu, états disabled, callbacks).
- Intégration (exemples):
  - Auth form: validation, erreurs serveur, redirection sur succès.
  - Forfaits: `DialogModificationForfait` (ouverture, édition, états loading/error, invalidation cache Query).
  - Comptes: `DialogUpdateUser` (pré-remplissage, sauvegarde, snackbar/toast éventuels).
  - Date pickers: sélection range, min/max, formatage.
- E2E (parcours):
  - Login -> accès `_authenticated` -> consulter forfaits -> modifier -> vérifier persistance -> logout.
  - Login -> comptes -> mise à jour utilisateur -> vérif sur liste/détail.
  - Login -> planning -> filtrer par date -> vérifier résultats.

3) Accès & a11y
- Chaque page critique: `axe` scan sans violations serious/critical.
- Focus management: tab order, visible focus, escape modales.
- Labels/aria: champs obligatoires, helper texts.

4) Performance (Lighthouse CI)
- Mesure pages d’entrée (post-login) et listes lourdes (forfaits, comptes).
- Traquer régressions > tolérance (5%).

## Matrice rapide fonctionnalités → scénarios clés

- Auth (P0)
  - [ ] Login: champs requis, erreurs API, succès redirige.
  - [ ] Guard: accès refusé sans session; refresh token.
- Forfaits (P0)
  - [ ] Liste: chargement, vide, erreur.
  - [ ] Modifier: validation, erreur 409/422, succès invalide cache et UI.
- Comptes (P0)
  - [ ] Recherche/sélection: debounce, vide, not found.
  - [ ] Edition: contraintes champs (email/téléphone), succès/erreur.
- Planning (P0)
  - [ ] Sélecteurs de dates: single/range, limites, format.
  - [ ] Données: états loading/error/empty.
- UI (P1)
  - [ ] Dialogs: open/close clavier/souris, focus trap, aria.
  - [ ] Boutons/links: disabled, spinner, accesskeys éventuels.

## Exemples de cas de test (résumé)

1) Intégration — Auth: redirection après succès
- Préconditions: MSW renvoie 200 + token; route protégée active.
- Etapes: ouvrir `/auth`, saisir email/pass valides, submit.
- Attendu: bouton en loading puis redirect vers `/_authenticated`; pas d’alerte d’erreur; session stockée.

2) Intégration — Forfait: erreur validation serveur
- Préconditions: MSW `PATCH /forfaits/:id` → 422 { field: "prix", message }.
- Etapes: ouvrir dialog, changer prix invalide, sauvegarder.
- Attendu: message d’erreur visible, bouton redevient actif, état formulaire cohérent, pas d’invalidation cache.

3) E2E — Parcours Forfait
- Etapes: login → accéder Forfaits → ouvrir modification → changer champ valide → sauvegarder.
- Attendu: toast/signalement succès, carte mise à jour, persistance après refresh.

## Mesures et reporting
- Seuils coverage: unités/intégration par dossier (utils/hooks/services 80%, composants 70%).
- CI: jobs séparés unit/int (Vitest) + E2E (Playwright) + a11y lint/axe; artefacts traces/vidéos sur échec.
- Rapport: summary JUnit + HTML coverage; commentaire PR avec statut et diff couverture.

## Risques & atténuations
- Requêtes réseau flakies → MSW par défaut; E2E live seulement en staging.
- Flaky E2E → `await expect(...).toBeVisible()` avec timeouts raisonnables; data-testids stables.
- Changements UI → couvrir logique via rôles/labels plutôt que classes; limiter snapshots.

## Maintenance
- Convention data-testid: `data-testid="<Composant>-<Action|Zone>"` pour éléments non atteignables par rôle.
- Wrappers de test partagés: provider router/query/theme dans `test/utils.tsx` (à créer).
- Mise à jour handlers MSW lors d’ajout d’API; garder fixtures dans `src/services/__fixtures__`.

## Backlog d’améliorations (optionnel)
- Lancer Lighthouse CI sur PR préviews.
- Ajouter tests a11y Playwright (axe plugin) sur pages P0.
- Smoke E2E nightly contre staging.

---

Contact/Responsables: Front Team • Référent QA: à définir • MEP du plan: immédiate pour P0, P1 sous 1 sprint.
