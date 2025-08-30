# Home Cycle Home - Frontend

Application frontend pour la gestion de cycles à domicile construite avec React, TanStack Router et Vite.

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- pnpm (gestionnaire de paquets recommandé)
- Le backend `hch-back` en cours d'exécution

## 🚀 Démarrage en local

### 1. Installation des dépendances

```bash
pnpm install
```

### 2. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```bash
touch .env
```

Ajoutez les variables d'environnement :

```env
PORT=3000
VITE_API_URL=http://localhost:8081
```

### 3. Démarrage en mode développement

```bash
pnpm dev
```

L'application sera disponible par défaut sur `http://localhost:3000`

## 📜 Scripts disponibles

```bash
pnpm dev          # Démarrage en mode développement (port 3000)
pnpm start        # Alias pour dev
pnpm build        # Build pour la production
pnpm serve        # Prévisualisation du build
pnpm test         # Tests unitaires avec Vitest
pnpm test:e2e     # Tests end-to-end avec Playwright
pnpm test:e2e:ui  # Interface des tests e2e
pnpm lint         # Vérification du code avec Biome
pnpm lint:fix     # Correction automatique + formatage
pnpm format       # Formatage du code
pnpm check        # Vérification complète
```

## 🏗 Build pour la production

```bash
pnpm build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 🧪 Tests

### Tests unitaires avec Vitest

```bash
pnpm test
```

### Tests E2E avec Playwright

```bash
pnpm test:e2e           # Exécution des tests
pnpm test:e2e:debug     # Mode debug
pnpm test:e2e:ui        # Interface graphique
```

## 🎨 Styling

Ce projet utilise [Tailwind CSS](https://tailwindcss.com/) pour le styling.

## 🔧 Linting & Formatting

Ce projet utilise [Biome](https://biomejs.dev/) pour le linting et le formatage :

```bash
pnpm lint         # Vérification du code
pnpm lint:fix     # Correction automatique + formatage
pnpm format       # Formatage uniquement
pnpm check        # Vérification complète
```

## 🧩 Composants UI

Ce projet utilise [Shadcn/ui](https://ui.shadcn.com/) pour les composants :

```bash
pnpx shadcn@latest add button    # Ajouter un composant
```

## 🐳 Déploiement avec Docker


### Déploiement avec docker-compose

```bash 
docker compose --env-file .env up -d --build
```

## 🛠 Technologies utilisées

- **React 18** avec TypeScript
- **TanStack Router** pour le routing
- **Vite** comme build tool
- **Tailwind CSS** pour le styling
- **Shadcn/ui** + Radix UI pour les composants
- **TanStack Query** pour la gestion des données
- **TanStack Form** pour les formulaires
- **Vitest** pour les tests unitaires
- **Playwright** pour les tests E2E
- **Biome** pour le linting et formatage

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (Shadcn)
│   ├── Client/         # Composants clients
│   ├── Comptes/        # Gestion des comptes
│   └── forfait/        # Composants forfaits
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires
├── routes/             # Pages et routes
├── services/           # Services API
└── styles.css          # Styles globaux
```

## ⚙️ Configuration requise

Assurez-vous que le backend `hch-back` est démarré sur `http://localhost:8081` avant de lancer le frontend.

