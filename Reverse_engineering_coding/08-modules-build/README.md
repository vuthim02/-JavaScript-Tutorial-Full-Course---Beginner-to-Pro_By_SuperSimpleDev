# Part 8 — Modules, npm, Bundlers & Build Tools

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


Split chapter files derived from `part8-modules-npm-bundlers-build-tools.md`.

## Ecosystem Overview

```
Developer writes code (ES modules, TypeScript, JSX)
         │
         ▼
Modules imported and exported
         │
         ▼
Dependencies installed via package manager (npm, yarn, pnpm)
         │
         ▼
Package.json tracks everything
         │
         ▼
Build tools process (Babel transpilation, PostCSS)
         │
         ▼
Bundler combines (Webpack, Vite, Rollup, esbuild)
         │
         ▼
Optimization (minification, tree shaking, code splitting)
         │
         ▼
Source maps generated for debugging
         │
         ▼
Output: static files (HTML, JS, CSS) for browser / server
```

## File Index

| # | File | Topic |
|---|------|-------|
| 01 | [01-why-modules.md](01-why-modules.md) | Why modules exist, global scope problems, timeline |
| 02 | [02-es-modules.md](02-es-modules.md) | ES Modules: syntax, browser loading, resolution |
| 03 | [03-named-exports.md](03-named-exports.md) | Named exports, multiple exports, live bindings |
| 04 | [04-default-exports.md](04-default-exports.md) | Default exports, forms, named vs default |
| 05 | [05-import-aliases.md](05-import-aliases.md) | Import/export aliases, renaming, name conflicts |
| 06 | [06-barrel-files.md](06-barrel-files.md) | Barrel files, re-exporting, circular deps |
| 07 | [07-module-scope.md](07-module-scope.md) | Module scope, private vs public, caching |
| 08 | [08-commonjs.md](08-commonjs.md) | CommonJS: require/module.exports, sync loading |
| 09 | [09-package-json.md](09-package-json.md) | package.json: fields, exports, directory layout |
| 10 | [10-npm.md](10-npm.md) | npm: init, install, ci, audit, outdated |
| 11 | [11-node-modules.md](11-node-modules.md) | node_modules: structure, dedup, gitignore |
| 12 | [12-package-lock-json.md](12-package-lock-json.md) | package-lock.json: why needed, contents, versions |
| 13 | [13-dependencies.md](13-dependencies.md) | Production dependencies, transitive deps |
| 14 | [14-devdependencies.md](14-devdependencies.md) | devDependencies: build tools, testing, separation |
| 15 | [15-semver.md](15-semver.md) | Semantic versioning: ^ ~ exact, major/minor/patch |
| 16 | [16-npm-scripts.md](16-npm-scripts.md) | npm scripts: hooks, chaining, pre/post |
| 17 | [17-npx.md](17-npx.md) | npx: temporary execution, vs global install |
| 18 | [18-bundlers.md](18-bundlers.md) | Bundlers: Webpack, Vite, Rollup, esbuild, Parcel |
| 19 | [19-transpilers.md](19-transpilers.md) | Transpilers: Babel, SWC, esbuild, presets |
| 20 | [20-tree-shaking.md](20-tree-shaking.md) | Tree shaking: unused code removal, side effects |
| 21 | [21-source-maps.md](21-source-maps.md) | Source maps: debugging, types, production notes |
| 22 | [22-minification.md](22-minification.md) | Minification: techniques, tools, gzip comparison |
| 23 | [23-code-splitting.md](23-code-splitting.md) | Code splitting: dynamic import, lazy loading, chunks |
| 24 | [24-environment-variables.md](24-environment-variables.md) | Environment variables: .env, security, build vs runtime |
| 25 | [25-project-structure.md](25-project-structure.md) | Project structure: small/medium/large, principles |
| 26 | [26-monorepo.md](26-monorepo.md) | Monorepo: tools, workspaces, Turborepo |
| 27 | [27-package-managers.md](27-package-managers.md) | Package managers: npm, Yarn, pnpm, Bun comparison |
| 28 | [28-esm-cjs-interop.md](28-esm-cjs-interop.md) | ESM/CJS interop, dual exports, mixed projects |
| 29 | [29-import-meta.md](29-import-meta.md) | import.meta.url, import.meta.env, module metadata |
| 30 | [30-module-resolution.md](30-module-resolution.md) | Module resolution algorithm, require.resolve, caching |

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| ES Modules | `import`/`export` – the standard module system |
| Named export | `export function name() {}` → `import { name }` |
| Default export | `export default {}` → `import name` (no `{}`) |
| Barrel files | `index.js` that re-exports multiple modules |
| Module scope | Variables are private unless exported |
| CommonJS | `require()`/`module.exports` – Node.js legacy system |
| package.json | Project metadata, dependencies, scripts |
| npm | Default package manager |
| node_modules | Dependency storage (do not commit) |
| package-lock.json | Exact version lock for reproducibility |
| dependencies | Production packages |
| devDependencies | Development-only tools |
| Semantic versioning | `Major.Minor.Patch` with `^` `~` ranges |
| npm scripts | Shortcuts: `npm run dev`, `npm run build` |
| npx | Run packages without installing |
| Bundlers | Combine many files into optimized bundles |
| Transpilers | Convert modern JS to older versions (Babel) |
| Tree shaking | Remove unused code from bundles |
| Source maps | Map minified code back to original |
| Minification | Compress code (smaller files) |
| Code splitting | Load code on demand with `import()` |
| Environment variables | `.env` files for configuration |
| Project structure | Feature-based or type-based organization |
| Monorepo | Multiple packages in one repository |
| Package managers | npm, Yarn, pnpm, Bun (different trade-offs) |
| ESM/CJS interop | How to use both module systems together, dual exports |
| import.meta | Module metadata, resolving assets relative to current file |
| Module resolution | How Node.js finds modules in node_modules |

## Next Steps

[Back to Module 7](../07-async-js/README.md): Asynchronous JavaScript

[Proceed to Module 9](../09-browser-dom/README.md): Browser DOM, BOM, Events, Forms, Storage, Rendering Pipeline to learn about browser APIs and the DOM.
