# 27 — Package Managers

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## npm (Node Package Manager)

Default. Ships with Node.js.

```bash
npm install axios
```

```
Advantages:
  - Comes with Node (no separate install)
  - Largest ecosystem
  - Familiar to everyone

Disadvantages:
  - Slower than alternatives
  - Lock file can become large
  - Less strict about dependency hoisting
```

## Yarn

Created by Facebook/Meta. Faster than npm.

```bash
yarn add axios
```

```
Advantages:
  - Faster than npm v1-v6 (similar to npm v7+)
  - Offline cache (install without internet)
  - yarn.lock is deterministic
  - Workspaces built-in

Disadvantages:
  - Separate install required
  - Slightly different commands
  - Two versions (Classic vs Berry) with different behaviors
```

## pnpm

Disk-efficient. Uses hard links.

```bash
pnpm add axios
```

```
Advantages:
  - Extremely fast
  - Disk efficient (hard links, single copy of each version)
  - Strict (packages can only access their declared dependencies)
  - Workspaces built-in
  - Monorepo-friendly

How pnpm saves space:
  node_modules/.pnpm/
    lodash@4.17.21/  ← single copy (hard linked)
    react@18.2.0/    ← single copy

  Each project's node_modules contains symlinks to .pnpm
```

## Bun

Newest. Written in Zig. Includes runtime + package manager + bundler + test runner.

```bash
bun add axios
```

```
Advantages:
  - Extremely fast (10-30x npm)
  - Built-in: runtime, bundler, test runner
  - Node.js compatible
  - Native TypeScript support

Disadvantages:
  - Newer (less battle-tested)
  - Smaller ecosystem of plugins
  - Some Node.js APIs not fully implemented
```

## Comparison

| Feature | npm | Yarn | pnpm | Bun |
|---------|-----|------|------|-----|
| Install speed | Moderate | Fast | Fast | Very fast |
| Disk usage | High | High | Low | Moderate |
| Workspaces | Yes | Yes | Yes | Yes |
| Lock file | package-lock.json | yarn.lock | pnpm-lock.yaml | bun.lockb |
| Offline cache | Limited | Yes | Yes | Yes |
| Strict deps | No | No | Yes | No |
| Run scripts | npm run | yarn | pnpm | bun run |
| Monorepo tools | Limited | Berry | Built-in | Minimal |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which package manager is being used? | Check lock files: `package-lock.json` (npm), `yarn.lock` (Yarn), `pnpm-lock.yaml` (pnpm), `bun.lockb` (Bun). |
| Can I switch package managers? | Yes, but delete the old lock file and `node_modules` first. |
| Which is fastest? | Bun > pnpm > Yarn > npm (generally). |
## Next Steps

[Back to Chapter 26](26-monorepo.md): 26 — Monorepo
[Proceed to Chapter 28](28-esm-cjs-interop.md): 28 — ESM / CJS Interoperability to learn about 28 — esm / cjs interoperability.
