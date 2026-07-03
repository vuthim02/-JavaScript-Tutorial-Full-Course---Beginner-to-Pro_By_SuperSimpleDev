# 18 — Bundlers

## The Problem

Browser cannot efficiently load thousands of files.

```html
<!-- Loading individual modules is slow -->
<script type="module" src="a.js"></script>
<script type="module" src="b.js"></script>
<script type="module" src="c.js"></script>
<!-- ... 500 more requests ... -->
```

Each file = one HTTP request. Hundreds of requests = slow.

## The Solution: Bundle

Bundler combines:

```
500 source files
    ↓
1 optimized bundle (or several chunks)
```

## What a Bundler Does

```
Input:     src/main.js
              import { add } from './math.js'
              import { format } from './date.js'
              import React from 'react'
              import './styles.css'

Processing:
  1. Resolve all imports (follow dependency graph)
  2. Transform files (JSX → JS, TS → JS, SCSS → CSS)
  3. Tree shaking (remove unused code)
  4. Code splitting (optional: split into chunks)
  5. Minify (compress code)

Output:     dist/assets/index.a1b2c3d4.js
            dist/assets/index.e5f6g7h8.css
```

## Popular Bundlers

| Bundler | Speed | Configuration | Best For |
|---------|-------|---------------|----------|
| Webpack | Moderate | Complex (webpack.config.js) | Large apps, legacy projects |
| Vite | Fast | Minimal (vite.config.js) | Modern apps, fast dev server |
| Rollup | Fast | Moderate (rollup.config.js) | Libraries, tree-shaking focus |
| Parcel | Fast | Zero config | Prototypes, simple projects |
| esbuild | Very fast | Minimal | Speed-critical, used inside Vite |
| Turbopack | Very fast | Minimal | Next.js (Rust-based, experimental) |

## How Webpack Works (Simplified)

```
Entry: src/index.js
         │
         ▼
Webpack walks the dependency graph
         │
         ▼
For each file, a "loader" processes it:
  - babel-loader: JSX → JS
  - ts-loader: TypeScript → JS
  - css-loader + style-loader: CSS → JS
  - file-loader: images → copied to dist
         │
         ▼
Webpack wraps everything in a runtime
         │
         ▼
Output: dist/bundle.js
```

## How Vite Works (Dev vs Prod)

```
Development:
  Uses native ES modules (no bundling needed)
  - Browser imports modules directly
  - esbuild pre-bundles dependencies
  - Fast Hot Module Replacement (HMR)

Production:
  Uses Rollup for optimized bundling
  - Tree shaking
  - Code splitting
  - Minification
```

## Entry and Output (Webpack Example)

```javascript
// webpack.config.js
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
    },
};
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How do thousands of modules become one application? | The bundler resolves the dependency graph, transforms files, and combines them. |
| Which bundler is this project using? | Check for config files: `vite.config.js`, `webpack.config.js`, `rollup.config.js`. |
| What is the entry point? | Check the bundler config for `entry` field, or `index.html`'s `<script>` tag. |
| Where does the output go? | Usually `dist/`, `build/`, or `out/`. |
## Next Steps

[Back to Chapter 17](17-npx.md): 17 — npx
[Proceed to Chapter 19](19-transpilers.md): 19 — Transpilers to learn about 19 — transpilers.
