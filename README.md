# Fidelizon Frontend

## Structure du projet

Le projet est organisé selon les bonnes pratiques pour une application Next.js utilisant le dossier `app`.

### Organisation des dossiers

```
app/
  ├── (main)/            # Routes principales
  ├── client/            # Routes client
  │   ├── auth/
  │   │   ├── login/
  │   │   │   ├── _actions/    # Actions serveur
  │   │   │   ├── _components/ # Composants spécifiques à la page
  │   │   │   └── page.tsx     # Page de connexion
  │   │   └── register/
  │   └── dashboard/
  ├── admin/             # Routes admin
  │   ├── _components/   # Composants partagés entre les pages admin
  │   ├── auth/          # Authentification admin
  │   │   ├── login/
  │   │   │   ├── _actions/
  │   │   │   ├── _components/
  │   │   │   └── page.tsx
  │   │   └── register/
  │   │       ├── _actions/
  │   │       ├── _components/
  │   │       └── page.tsx
  │   ├── online/        # Gestion du profil en ligne
  │   │   ├── _actions/
  │   │   ├── _components/
  │   │   └── page.tsx
  │   └── dashboard/
  └── layout.tsx         # Layout principal

src/
  ├── components/        # Composants réutilisables
  │   ├── ui/            # Composants UI (Shadcn)
  │   ├── utils/         # Composants utilitaires
  │   └── forms/         # Composants de formulaire
  ├── features/          # Fonctionnalités réutilisables
  │   ├── image-carousel/ # Feature de carousel d'images
  │   └── establishment-profile/ # Feature de profil d'établissement
  ├── hooks/             # Hooks personnalisés
  ├── lib/               # Utilitaires et configurations
  └── providers/         # Providers React
```

### Principes d'organisation

1. **Dossier app** : Contient tous les fichiers liés au routing et aux pages.
   - Les composants et actions spécifiques à une page sont placés dans des dossiers `_components` et `_actions` à côté de la page.
   - Les dossiers commençant par `_` sont ignorés par le routing Next.js.

2. **Dossier src** : Contient tous les fichiers réutilisables dans l'application.
   - **components** : Composants UI réutilisables.
   - **features** : Ensembles de composants, hooks et actions formant une fonctionnalité réutilisable.
   - **hooks** : Hooks personnalisés.
   - **lib** : Configuration et utilitaires (Prisma, API, etc.).

### Convention de nommage

- Les fichiers d'actions serveur utilisent le suffixe `.action.ts`.
- Les composants React utilisent PascalCase (ex: `LoginForm.tsx`).
- Les fichiers utilitaires et hooks utilisent camelCase (ex: `useAuth.ts`).

### Actions serveur

- Les actions serveur sont regroupées par page dans des dossiers `_actions`.
- Elles sont utilisées pour remplacer les appels API côté client.
- Exemple: `register.action.ts` pour l'inscription, `profile.action.ts` pour la mise à jour du profil.

## Technologies utilisées

- [Next.js](https://nextjs.org/) avec App Router
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Shadcn UI](https://ui.shadcn.com/) pour les composants UI
