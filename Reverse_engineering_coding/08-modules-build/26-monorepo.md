# 26 — Monorepo

## Single Repository, Multiple Packages

```
frontend/     ← React app
backend/      ← Express API
mobile/       ← React Native app
shared/       ← Shared types, utilities
tools/        ← ESLint config, build scripts
```

## Benefits

```
Shared code:
  - Types, utilities, configs shared across projects
  - Change once, update everywhere

Unified versioning:
  - All packages in one repo
  - Atomic commits (change API + consumer together)

Simplified CI/CD:
  - One pipeline
  - One test suite

Easier refactoring:
  - Rename a shared type → all consumers updated
```

## Monorepo Tools

| Tool | Key Feature |
|------|-------------|
| Nx | Dependency graph, affected commands, caching |
| Turborepo | Parallel builds, caching, task orchestration |
| pnpm workspaces | Built-in workspace support, disk efficient |
| Lerna | Publishing, versioning (older, often used with Nx) |
| Rush | Microsoft's monorepo manager |

## pnpm Workspaces Example

```yaml
# pnpm-workspace.yaml
packages:
  - "frontend"
  - "backend"
  - "shared"
  - "tools/*"
```

```json
// shared/package.json
{
    "name": "@myapp/shared",
    "main": "index.js"
}

// frontend/package.json
{
    "name": "@myapp/frontend",
    "dependencies": {
        "@myapp/shared": "workspace:*"
    }
}
```

## Turborepo Example

```json
// turbo.json
{
    "pipeline": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**"]
        },
        "test": {
            "dependsOn": ["build"]
        },
        "dev": {
            "cache": false
        }
    }
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How many packages are in this repo? | Check `packages/` or `package.json`'s `workspaces` field. |
| Which monorepo tool is used? | Check for `turbo.json`, `nx.json`, `pnpm-workspace.yaml`, `lerna.json`. |
| Where is shared code? | Usually in a `shared/` or `packages/shared/` directory. |
| Can one package depend on another? | Yes, via workspace protocol (`workspace:*`). |
## Next Steps

[Back to Chapter 25](25-project-structure.md): 25 — Project Structure
[Proceed to Chapter 27](27-package-managers.md): 27 — Package Managers to learn about 27 — package managers.
