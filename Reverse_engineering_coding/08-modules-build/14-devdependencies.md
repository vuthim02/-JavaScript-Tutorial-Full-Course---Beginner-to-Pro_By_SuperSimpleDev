# 14 — devDependencies

## Development Tools

```bash
npm install -D vite
```

Stored in `package.json`:

```json
"devDependencies": {
    "vite": "^5.0.0"
}
```

## What Goes in devDependencies

```
Build tools:
  - Vite, Webpack, Rollup (bundlers)
  - Babel (transpiler)

Testing:
  - Jest, Vitest, Mocha, Cypress

Linting/Formatting:
  - ESLint, Prettier

Type checking:
  - TypeScript

Development servers:
  - Nodemon, Vite dev server
```

## Why Separate?

```
Production deployment:
  npm install --production
  (only installs dependencies, not devDependencies)
  → Smaller, faster install
  → No build tools, no test frameworks

CI/CD pipeline:
  npm install
  (installs everything for testing and building)
```

## Common DevDependencies Examples

| Package | Purpose | Category |
|---------|---------|----------|
| `vite` | Dev server + bundler | Build |
| `@vitejs/plugin-react` | React support for Vite | Build |
| `typescript` | Type checking | Language |
| `eslint` | Code quality | Linting |
| `prettier` | Code formatting | Formatting |
| `jest` | Testing framework | Testing |
| `@testing-library/react` | UI testing | Testing |
| `sass` | SCSS compilation | Styles |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does application need this in production? | Build tools and test frameworks are not needed. |
| Or only during development? | Check if it's in `devDependencies`. |
| How to move a package from dependencies to devDependencies? | `npm install -D <package>` then remove from `dependencies` manually. |
| What happens if I put a build tool in dependencies? | It's installed in production unnecessarily, increasing size and install time. |
## Next Steps

[Back to Chapter 13](13-dependencies.md): 13 — Dependencies
[Proceed to Chapter 15](15-semver.md): 15 — Semantic Versioning to learn about 15 — semantic versioning.
