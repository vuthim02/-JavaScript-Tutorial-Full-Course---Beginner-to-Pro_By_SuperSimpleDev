# 25 — Project Structure

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Small Project

```
src/
│
├── main.js          ← Entry point
├── app.js           ← Application logic
├── utils.js         ← Utility functions
└── config.js        ← Configuration
```

## Medium Project (Feature-based)

```
src/
│
├── components/       ← Reusable UI components
│   ├── Button.js
│   ├── Card.js
│   └── Modal.js
│
├── pages/            ← Route-level components
│   ├── Home.js
│   ├── Dashboard.js
│   └── Settings.js
│
├── services/         ← API calls, external integrations
│   ├── api.js
│   └── auth.js
│
├── utils/            ← Pure utility functions
│   ├── format.js
│   └── validation.js
│
├── store/            ← State management
│   └── index.js
│
├── assets/           ← Images, fonts, SVGs
│   └── logo.svg
│
├── styles/           ← Global styles
│   └── global.css
│
└── main.js           ← Entry point
```

## Large Project (Module/Feature-based)

```
src/
│
├── core/             ← Core framework, base classes
│   ├── App.js
│   ├── Router.js
│   └── ErrorBoundary.js
│
├── features/         ← Each feature is self-contained
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── index.js
│   │
│   ├── dashboard/
│   │   └── ...
│   │
│   └── settings/
│       └── ...
│
├── shared/           ← Shared across features
│   ├── components/
│   ├── hooks/
│   └── utils/
│
├── services/         ← Shared API layer
│   └── api.js
│
├── config/           ← Environment config
│   └── constants.js
│
├── store/            ← Global state
│   └── index.js
│
├── tests/            ← Test setup, mocks
│   └── setup.js
│
├── types/            ← TypeScript types
│   └── index.d.ts
│
└── main.js           ← Entry point
```

## Key Principles

```
Separation of concerns:
  - UI components ≠ business logic ≠ data fetching

Feature colocation:
  - Everything a feature needs is in one folder

Explicit boundaries:
  - Features don't import from other features' internals
  - Shared code goes in shared/ or core/

Consistent naming:
  - PascalCase for components
  - camelCase for utilities
  - kebab-case for files
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How is the project organized? | Feature-based (by domain) or type-based (by file type)? |
| What's the entry point? | Check `main.js` or `index.js` in `src/`. |
| How do I find a specific component? | Check `components/` or `features/<name>/components/`. |
## Next Steps

[Back to Chapter 24](24-environment-variables.md): 24 — Environment Variables
[Proceed to Chapter 26](26-monorepo.md): 26 — Monorepo to learn about 26 — monorepo.
