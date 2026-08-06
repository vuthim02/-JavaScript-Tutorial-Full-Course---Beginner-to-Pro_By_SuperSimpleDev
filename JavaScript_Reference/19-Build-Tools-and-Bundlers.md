# 19 - Build Tools and Tooling: Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents
1. [Bundlers Overview](#1-bundlers-overview)
2. [Webpack 5](#2-webpack-5)
3. [Vite](#3-vite)
4. [Rollup](#4-rollup)
5. [esbuild](#5-esbuild)
6. [Parcel](#6-parcel)
7. [Transpilers](#7-transpilers)
8. [Babel](#8-babel)
9. [SWC](#9-swc)
10. [CSS Processing](#10-css-processing)
11. [PostCSS](#11-postcss)
12. [Sass/SCSS](#12-sassscss)
13. [Linting & Formatting](#13-linting--formatting)
14. [ESLint](#14-eslint)
15. [Prettier](#15-prettier)
16. [Git Hooks & Pre-commit](#16-git-hooks--pre-commit)
17. [Husky + lint-staged](#17-husky--lint-staged)
18. [TypeScript Tooling](#18-typescript-tooling)
19. [Package Managers](#19-package-managers)
20. [npx and Package Execution](#20-npx-and-package-execution)
21. [npm Scripts](#21-npm-scripts)
22. [Environment Variables](#22-environment-variables)
23. [Source Maps](#23-source-maps)
24. [Asset Handling](#24-asset-handling)
25. [Code Splitting](#25-code-splitting)
26. [Bundle Analysis](#26-bundle-analysis)
27. [Monorepo Tools](#27-monorepo-tools)
28. [Dev Servers & Proxy Configuration](#28-dev-servers--proxy-configuration)
29. [Hot Module Replacement (HMR)](#29-hot-module-replacement-hmr)
30. [Module Federation](#30-module-federation)
31. [Import Maps & ES Modules in Browsers](#31-import-maps--es-modules-in-browsers)
32. [Alternative Runtimes: Deno and Bun](#32-alternative-runtimes-deno-and-bun)
33. [package.json Fields](#33-packagejson-fields)

---

## 1. Bundlers Overview

A **bundler** takes JavaScript modules and their dependencies and combines them into optimized files (bundles) for browsers or other runtimes. Modern bundlers go far beyond concatenation — they handle code splitting, tree shaking, asset processing, and development servers.

### Comparison Matrix

| Feature | Webpack 5 | Vite | Rollup | esbuild | Parcel 2 |
|---|---|---|---|---|---|
| **Written in** | JavaScript | JavaScript + Rust (Rolldown) | JavaScript | Go | Rust |
| **Config complexity** | High | Low-Medium | Medium | Low | Zero |
| **Dev server** | webpack-dev-server | Built-in (esbuild) | None (use plugin) | Built-in | Built-in |
| **HMR** | Yes (manual setup) | Yes (instant) | No | Limited | Yes |
| **Tree shaking** | Yes | Yes (via Rollup/Rolldown) | Yes | Yes | Yes |
| **Code splitting** | Yes | Yes (dynamic import) | Yes (manual) | Yes | Yes |
| **CSS modules** | Via loaders | Built-in | Via plugin | Built-in | Built-in |
| **TypeScript** | Via loaders | Built-in (esbuild) | Via plugin | Built-in | Built-in |
| **SSR** | Via config | Built-in | Via plugin | Limited | Limited |
| **Best for** | Large legacy apps | Modern SPAs | Libraries | Speed, scripts | Prototypes |
| **Module Federation** | Yes (native) | Via plugin | No | No | No |

---

## 2. Webpack 5

**Webpack** is a static module bundler for JavaScript applications. It builds a dependency graph starting from entry points and produces optimized bundles.

### Mental Model

Webpack builds two related graphs:
- **Module graph**: every `import` becomes an edge, every file is a module
- **Chunk graph**: modules are grouped into chunks based on entry points, dynamic imports, and optimization rules

### Configuration (`webpack.config.js`)

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',

    entry: {
      app: path.resolve(__dirname, 'src/app/index.tsx'),
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProd ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
      clean: true,
      publicPath: '/',
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp)$/i,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        },
        {
          test: /\.(svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };
};
```

### Loaders

Loaders transform files into modules webpack can understand:

| Loader | Purpose |
|---|---|
| `ts-loader` / `babel-loader` | Transpile TypeScript/JSX |
| `css-loader` | Resolves CSS imports |
| `style-loader` | Injects CSS into DOM |
| `file-loader` / `asset modules` | Handle files (images, fonts) |
| `url-loader` / `asset` | Inline small files as base64 |
| `sass-loader` | Compile Sass/SCSS |
| `postcss-loader` | PostCSS transformations |
| `json-loader` | Import JSON files |

### Plugins

Plugins extend the compiler and affect chunking, output, and build lifecycle:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
```

### Code Splitting

Webpack supports code splitting via:
1. **Entry points**: Multiple entry points create separate bundles
2. **Dynamic imports**: `import()` creates split points
3. **SplitChunksPlugin**: Extract shared dependencies

```js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
},
```

### Tree Shaking

Tree shaking eliminates dead code. Works with ES2015 module syntax:

```js
// webpack.config.js
module.exports = {
  mode: 'production', // enables tree shaking
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
};
```

**In `package.json`** to help tree shaking:
```json
{
  "sideEffects": false,
  "sideEffects": ["./src/polyfills.js", "*.css"]
}
```

**Requirements for tree shaking:**
- Use ES2015 `import`/`export` (not CommonJS `require`)
- Mark side-effect-free modules in `package.json`
- Use `mode: 'production'`

### HMR (Hot Module Replacement)

```js
devServer: {
  port: 3000,
  hot: true,
  historyApiFallback: true,
  static: { directory: path.resolve(__dirname, 'public') },
  client: { overlay: true },
},
```

**How HMR works:**
1. Webpack watches files for changes
2. Changed modules are sent to the browser via WebSocket
3. If a module has an HMR handler, it runs (e.g., `style-loader` swaps CSS)
4. If no handler, the update bubbles up to the entry point
5. The app state is preserved

### Dev Server

```js
const WebpackDevServer = require('webpack-dev-server');

const server = new WebpackDevServer({
  port: 3000,
  hot: true,
  proxy: {
    '/api': 'http://localhost:8080',
  },
  historyApiFallback: true,
}, compiler);

server.start();
```

---

## 3. Vite

**Vite** is a next-generation frontend build tool. During development, it uses esbuild for pre-bundling and serves modules over native ESM. For production, it uses Rollup (or Rolldown in future versions).

### Key Advantages
- **Instant dev server startup**: No bundling in dev — serves files over ESM
- **Instant HMR**: HMR speed is independent of app size
- **Optimized production builds**: Uses Rollup/Rolldown for code splitting and tree shaking

### Configuration (`vite.config.js`)

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },

  envPrefix: 'VITE_',
});
```

### Official Plugins
- `@vitejs/plugin-react` — React Fast Refresh via Oxc Transformer
- `@vitejs/plugin-react-swc` — Uses SWC instead of Oxc (faster for large projects)
- `@vitejs/plugin-vue` — Vue 3 SFC support
- `@vitejs/plugin-legacy` — Legacy browser support
- `@vitejs/plugin-rsc` — React Server Components

### CSS Modules

```css
/* component.module.css */
.title { color: red; }
```

```js
import styles from './component.module.css';
document.getElementById('app').className = styles.title;
```

Vite supports CSS Modules out of the box — any file ending in `.module.css` is treated as one.

### SSR Support

Vite has built-in SSR support:

```js
// server.js
import express from 'express';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*all', async (req, res) => {
    const url = req.originalUrl;
    let template = fs.readFileSync('./index.html', 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    const { render } = await vite.ssrLoadModule('/src/entry-server.js');
    const appHtml = await render(url);
    const html = template.replace('<!--ssr-outlet-->', appHtml);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  app.listen(5173);
}

createServer();
```

### Environment Variables

Vite loads `.env` files with these priorities:
```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode (development/production)
.env.[mode].local   # only loaded in specified mode, ignored by git
```

Only variables prefixed with `VITE_` are exposed to client-side code:
```env
VITE_API_URL=https://api.example.com
DB_PASSWORD=secret  # NOT exposed to client
```

Access in code:
```js
console.log(import.meta.env.VITE_API_URL);
```

---

## 4. Rollup

**Rollup** is a module bundler primarily designed for building JavaScript libraries. It excels at tree shaking and producing optimized ES module output.

### Configuration (`rollup.config.js`)

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'MyLibrary',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    terser(),
  ],
};
```

### Output Formats

| Format | Description | Use Case |
|---|---|---|
| `es` | ES Modules | Modern bundlers, browsers with ESM support |
| `cjs` | CommonJS | Node.js (`require`) |
| `umd` | Universal Module Definition | Browsers + AMD + CommonJS |
| `iife` | Immediately Invoked Function Expression | `<script>` tag, no module system |
| `systemjs` | SystemJS | SystemJS loader |

### Tree Shaking

Rollup pioneered tree shaking. It only works with ES modules:
```js
// Use `format: 'es'` for tree shaking
// CommonJS (require) cannot be tree-shaken
```

### Common Plugins

```js
import resolve from '@rollup/plugin-node-resolve';    // Resolve node_modules
import commonjs from '@rollup/plugin-commonjs';        // Convert CJS to ESM
import babel from '@rollup/plugin-babel';              // Babel transforms
import typescript from '@rollup/plugin-typescript';    // TypeScript support
import postcss from 'rollup-plugin-postcss';           // CSS processing
import image from '@rollup/plugin-image';              // Image processing
import replace from '@rollup/plugin-replace';          // String replacement
import alias from '@rollup/plugin-alias';              // Path aliasing
```

### Plugin API

Rollup plugins have hooks:
- **`resolveId`**: Resolve import paths
- **`load`**: Load module contents
- **`transform`**: Transform module code
- **`generateBundle`**: Modify output bundle

---

## 5. esbuild

**esbuild** is an extremely fast JavaScript/TypeScript bundler and minifier written in Go. It's 10-100x faster than traditional bundlers.

### Speed Benchmarks (production bundle of 10x three.js)

| Bundler | Time | Relative Speed |
|---|---|---|
| esbuild | 0.39s | 1x |
| Parcel 2 | 14.91s | 38x slower |
| Rollup + Terser | 34.10s | 87x slower |
| Webpack 5 | 41.21s | 105x slower |

### CLI Usage

```bash
# Basic bundling
esbuild src/app.ts --bundle --outdir=dist

# With minification and source maps
esbuild --bundle entry_point.js --outdir=dist --minify --sourcemap

# TypeScript and JSX support (built-in)
esbuild --bundle src/index.tsx --outfile=out.js --loader:.tsx

# Target specific browsers
esbuild --bundle src/index.ts --target=es2020 --outfile=dist/app.js

# Define global constants
esbuild --bundle src/index.ts --define:RELEASE=true --outfile=out.js
```

### JavaScript API

```js
const esbuild = require('esbuild');

// Build API
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'browser', // or 'node'
  target: 'es2020',
  outdir: 'dist',
});

// Transform API (single file, in memory)
const result = await esbuild.transform('const x: number = 1', {
  loader: 'tsx',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
});
console.log(result.code);
```

### Built-in Features
- JavaScript, TypeScript, JSX, TSX support (no config needed)
- CSS bundling and CSS modules
- Tree shaking and minification
- Source maps
- Local dev server
- Watch mode
- Plugins API

### Configuration Options

```js
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  outfile: 'dist/bundle.js', // single output
  format: 'esm',            // 'iife', 'cjs', 'esm'
  platform: 'browser',      // 'browser', 'node'
  target: 'es2020',         // or ['es2020', 'chrome58']
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  external: ['react', 'react-dom'],
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.png': 'dataurl',
    '.svg': 'dataurl',
  },
  jsx: 'automatic',        // or 'transform'
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  treeShaking: true,
});
```

---

## 6. Parcel

**Parcel** is a zero-configuration web application bundler. It automatically handles all asset types and transforms without any configuration.

### Key Features
- **Zero config**: No configuration file needed
- **HTML as entry**: Start from an HTML file, everything is discovered
- **Automatic transforms**: Babel, PostCSS, TypeScript — all automatic
- **Built-in HMR**: Fast hot module replacement
- **Code splitting**: Automatic via `import()`
- **Multi-target**: Automatically generates `nomodule` fallbacks

### Getting Started

```bash
npm install --save-dev parcel

# Development
parcel src/index.html

# Production build
parcel build src/index.html
```

### Configuration

Parcel requires minimal configuration. Most behavior is configured via `package.json`:

```json
{
  "name": "my-app",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html"
  },
  "targets": {
    "default": {
      "distDir": "dist"
    }
  },
  "browserslist": "> 0.5%, last 2 versions, not dead",
  "devDependencies": {
    "parcel": "^2.0.0"
  }
}
```

### `.parcelrc` (Extending Configuration)

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.svg": ["@parcel/transformer-svgo"]
  }
}
```

### Features
- Automatic TypeScript/JSX/Flow compilation
- Automatic CSS vendor prefixing
- Built-in dev server with HMR
- Differential bundling (`<script type="module">` + `nomodule` fallback)
- Web workers, service workers, and worklets out of the box
- Image optimization and resizing
- Content hashing for long-term caching

---

## 7. Transpilers

A **transpiler** (transcompiler) converts source code from one language version to another (e.g., modern JavaScript → older JavaScript). Key transpilers:

| Tool | Language | Speed | Used By |
|---|---|---|---|
| Babel | JavaScript | Baseline | Many legacy projects |
| SWC | Rust | 20-70x faster | Next.js, Vite, Parcel, Deno |
| esbuild | Go | 100x faster | Vite (dev), Bun |
| TypeScript (tsc) | TypeScript | Slower | Direct TS compilation |
| Buble | JavaScript | Fast | Rollup (legacy) |

---

## 8. Babel

**Babel** is a JavaScript compiler/transpiler that converts modern JavaScript (ES2015+) into backwards-compatible versions.

### Configuration Files

| File | Scope | Use Case |
|---|---|---|
| `.babelrc` | Project-relative (walks up tree) | Single package |
| `.babelrc.json` | Project-relative | Recommended for Babel 7+ |
| `babel.config.json` | Root-level, applies everywhere | Monorepo root, transform node_modules |
| `babel.config.js` | Root-level, programmatic | Dynamic config |

**Key difference**: `.babelrc` does NOT apply inside `node_modules`. `babel.config.json` does.

### Presets

#### `@babel/preset-env`
Compiles ES2015+ based on target environments:

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",
      "corejs": 3,
      "modules": false
    }]
  ]
}
```

**Key options:**
- `targets`: Browser/runtime targets (browserslist query, or `{ "chrome": "58", "ie": "11" }`)
- `useBuiltIns`: `"usage"` (auto polyfill per file), `"entry"` (import all polyfills), `false`
- `corejs`: Version of core-js polyfills (2 or 3)
- `modules`: `"auto"`, `"commonjs"`, `"amd"`, `false` (let bundler handle ESM)

#### `@babel/preset-react`
Transforms JSX syntax:

```json
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"  // No need to import React
    }]
  ]
}
```

#### `@babel/preset-typescript`
Strips TypeScript type annotations (no type checking):

```json
{
  "presets": ["@babel/preset-typescript"]
}
```

### Plugins

```json
{
  "plugins": [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }],
    "@babel/plugin-proposal-class-properties"
  ]
}
```

### Complete Configuration Example

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", { "corejs": 2 }]
  ],
  "env": {
    "test": {
      "presets": ["@babel/preset-env", { "targets": { "node": "current" } }]
    }
  }
}
```

### Babel in 2026

Babel is still relevant for:
- Projects with legacy Babel plugin dependencies (babel-plugin-macros, decorators)
- Custom AST transforms
- Environments where SWC/esbuild don't support needed plugins

For most new projects, SWC or esbuild have replaced Babel.

---

## 9. SWC

**SWC (Speedy Web Compiler)** is a Rust-based platform for fast JavaScript/TypeScript compilation. It's 20x faster than Babel on a single thread and 70x faster on four cores.

### Speed Comparison

| Benchmark | SWC | Babel |
|---|---|---|
| Single-thread (es3) | 616 ops/sec | 34 ops/sec |
| Single-thread (es5) | 677 ops/sec | 34 ops/sec |
| Multi-core async | 3948+ ops/sec | 27-32 ops/sec |

### Configuration (`.swcrc`)

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true
    },
    "target": "es2020",
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    }
  },
  "module": {
    "type": "commonjs"
  }
}
```

### Usage

```bash
# Install
npm install -D @swc/core @swc/cli

# Transform a file
npx swc ./file.js

# Use in webpack
npm install -D swc-loader

# Use in Jest
npm install -D @swc/jest
```

### SWC vs Babel

| Dimension | SWC | Babel |
|---|---|---|
| Speed | 20-70x faster | Baseline |
| Language | Rust | JavaScript |
| TypeScript | Native strip | Via `@babel/preset-typescript` |
| JSX | Native | Via `@babel/preset-react` |
| Plugin ecosystem | Growing | Mature (thousands) |
| Babel macros | Not supported | First-class |
| Next.js default | Yes (since v12) | Opt-in via `.babelrc` |
| Jest transform | `@swc/jest` | `babel-jest` |

### Migration from Babel

```bash
# Remove Babel
npm uninstall @babel/core @babel/preset-env @babel/preset-react babel-jest

# Install SWC
npm install -D @swc/core @swc/jest

# Create .swcrc
echo '{"jsc":{"parser":{"syntax":"typescript","tsx":true},"target":"es2020"},"module":{"type":"commonjs"}}' > .swcrc
```

---

## 10. CSS Processing

### CSS in Bundlers

Modern bundlers handle CSS differently:

| Tool | CSS Handling |
|---|---|
| **Webpack** | `css-loader` + `style-loader` or `MiniCssExtractPlugin` |
| **Vite** | Built-in CSS support, CSS modules, PostCSS |
| **esbuild** | Built-in CSS bundling and CSS modules |
| **Parcel** | Built-in, zero-config |
| **Rollup** | Via `rollup-plugin-postcss` |

### CSS Modules

CSS Modules scope class names locally by default:

```css
/* component.module.css */
.title { color: red; }
.container { padding: 16px; }
```

```jsx
import styles from './component.module.css';

function Component() {
  return <div className={styles.container}><h1 className={styles.title}>Hello</h1></div>;
}
```

Output: `.title` becomes `_title_1a2b3c` (unique hash).

### CSS-in-JS Solutions

| Tool | Approach | Performance |
|---|---|---|
| Styled Components | Runtime CSS-in-JS | Slower |
| Emotion | Runtime CSS-in-JS | Moderate |
| Linaria | Zero-runtime | Fast |
| Vanilla Extract | Zero-runtime, type-safe | Fast |
| Panda CSS | Zero-runtime, design tokens | Fast |

---

## 11. PostCSS

**PostCSS** is a tool for transforming CSS with JavaScript plugins. It's the backbone of CSS processing in modern toolchains.

### What PostCSS Does
- Transforms modern CSS to backward-compatible CSS
- Adds vendor prefixes (autoprefixer)
- Enables future CSS syntax (custom properties, nesting)
- Lints CSS (stylelint)
- Minifies CSS (cssnano)

### Configuration (`postcss.config.js`)

```js
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    },
    'cssnano': {
      preset: 'default',
    },
  },
};
```

### Key Plugins

| Plugin | Purpose |
|---|---|
| `autoprefixer` | Adds vendor prefixes (`-webkit-`, `-moz-`) |
| `postcss-preset-env` | Polyfills future CSS features |
| `tailwindcss` | Utility-first CSS framework |
| `cssnano` | CSS minification |
| `postcss-import` | Resolves `@import` rules |
| `stylelint` | CSS linting |
| `postcss-modules` | CSS Modules support |
| `postcss-nesting` | CSS nesting (native CSS nesting alternative) |

### Autoprefixer

```bash
npm install -D autoprefixer
```

```css
/* Input */
.container { display: flex; }

/* Output (with autoprefixer) */
.container { display: -webkit-box; display: -ms-flexbox; display: flex; }
```

### Tailwind CSS Integration (v4)

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

```css
/* app.css */
@import "tailwindcss";
```

**Tailwind v4 features:**
- Zero configuration (no `tailwind.config.js` needed)
- Automatic content detection
- Built-in `@import` support
- Uses Lightning CSS under the hood

### Tailwind CSS Integration (v3)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 12. Sass/SCSS

**Sass** (Syntactically Awesome Stylesheets) is a CSS preprocessor that adds programming features to CSS. **SCSS** is the newer syntax that's fully compatible with CSS.

### Variables

```scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: Helvetica, sans-serif;
$border-radius: 4px;

body {
  font-family: $font-stack;
  color: $primary-color;
}

.button {
  border-radius: $border-radius;
  background-color: $secondary-color;
}
```

### Nesting

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      a {
        text-decoration: none;
        color: white;
        padding: 10px 20px;

        &:hover {
          color: darken(white, 10%);
        }
      }
    }
  }
}
```

**Parent selector `&`** references the parent:
```scss
.button {
  background: blue;
  &:hover { background: darkblue; }
  &-primary { background: green; }  // .button-primary
  & > .icon { margin-right: 8px; }  // .button > .icon
}
```

### Mixins

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  @include border-radius(10px);
  @include flex-center;
}
```

### Partials and Imports

```scss
// _variables.scss (partial — starts with underscore)
$primary-color: #3498db;
$spacing: 16px;

// _mixins.scss (partial)
@mixin truncate($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// main.scss (imports partials)
@import 'variables';
@import 'mixins';

.container {
  color: $primary-color;
  @include truncate(2);
}
```

### Functions and Operations

```scss
// Built-in functions
 darken($primary-color, 10%);
 lighten($primary-color, 10%);
 rgba($primary-color, 0.5);
 percentage(0.5);  // 50%

// Operations
$width: 100px;
$margin: 20px;

.container {
  width: $width;
  margin: $margin / 2;
  padding: $margin * 1.5;
}

// Loops
@for $i from 1 through 12 {
  .col-#{$i} {
    width: 100% / 12 * $i;
  }
}

@each $color in blue, red, green {
  .bg-#{$color} {
    background-color: $color;
  }
}
```

### Sass Compilation

```bash
# Install
npm install -g sass

# Compile
sass input.scss output.css

# Watch mode
sass --watch input.scss output.css

# Watch directory
sass --watch app/sass:public/stylesheets
```

---

## 13. Linting & Formatting

The standard JavaScript code quality stack:

| Tool | Purpose | Config File |
|---|---|---|
| **ESLint** | Code quality (errors, patterns) | `eslint.config.js` |
| **Prettier** | Code formatting (style) | `.prettierrc` |
| **Stylelint** | CSS linting | `.stylelintrc.json` |
| **TypeScript** | Type checking | `tsconfig.json` |

### Why Both ESLint and Prettier?

- **ESLint**: catches bugs, enforces patterns (`==` vs `===`, unused variables)
- **Prettier**: enforces formatting (indentation, quotes, line breaks)

They're complementary — ESLint checks logic, Prettier checks appearance.

---

## 14. ESLint

**ESLint** is a pluggable JavaScript linter. Since v9.0.0 (April 2024), **flat config** is the default.

### Flat Config (`eslint.config.js`)

```js
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  // Global ignores
  {
    ignores: ['dist/', 'node_modules/', '*.config.js'],
  },

  // JavaScript recommended
  js.configs.recommended,

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // React files
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // Prettier compatibility (disables conflicting rules)
  prettier,
];
```

### Key Concepts

| Concept | Old (eslintrc) | New (flat config) |
|---|---|---|
| Config file | `.eslintrc.js` | `eslint.config.js` |
| Extends | `"extends": ["eslint:recommended"]` | Spread config objects in array |
| Overrides | `"overrides": [{ "files": ["*.ts"] }]` | Separate config objects with `files` |
| Plugins | String names: `"@typescript-eslint"` | Imported JS objects |
| Parser | String name | Imported parser object |

### Rule Severities

```js
rules: {
  'no-unused-vars': 'off',     // or 0
  'no-console': 'warn',        // or 1
  'no-debugger': 'error',      // or 2
}
```

### ESLint v10 (2026)

- Flat config is the only option (eslintrc removed)
- JSX reference tracking built-in (no more `jsx-uses-vars` plugin)
- Config resolution starts from file's directory (better for monorepos)
- Requires Node.js ^20.19.0 || ^22.13.0 || >=24

---

## 15. Prettier

**Prettier** is an opinionated code formatter. It supports JavaScript, TypeScript, HTML, CSS, JSON, Markdown, and more.

### Configuration (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Integration with ESLint

```bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

**`eslint-config-prettier`**: Disables ESLint rules that conflict with Prettier

**`eslint-plugin-prettier`**: Runs Prettier as an ESLint rule

```js
// eslint.config.js
import prettier from 'eslint-config-prettier';

export default [
  // ... other configs
  prettier, // Must be LAST to override conflicting rules
];
```

**Recommended approach**: Use Prettier separately, don't run it through ESLint (faster):

```json
{
  "scripts": {
    "format": "prettier --write .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

## 16. Git Hooks & Pre-commit

**Git hooks** are scripts that run automatically when Git events occur:

| Hook | When it Runs | Use Case |
|---|---|---|
| `pre-commit` | Before commit is created | Linting, formatting |
| `commit-msg` | After message is written | Validate commit message format |
| `pre-push` | During `git push` | Full test suites |
| `prepare-commit-msg` | Before editor opens | Template insertion |

**Without Husky**, Git hooks live in `.git/hooks/` which is NOT tracked by version control. New team members don't get hooks automatically.

---

## 17. Husky + lint-staged

### Husky

**Husky** stores Git hooks in a tracked directory (`.husky/`) so hooks are shared with the team.

### lint-staged

**lint-staged** runs linters only on staged files (files about to be committed), not the entire codebase. This keeps pre-commit hooks fast.

### Complete Setup

```bash
# 1. Install
npm install --save-dev husky lint-staged

# 2. Initialize Husky
npx husky init
# Creates .husky/pre-commit and adds "prepare": "husky" to package.json
```

```json
// package.json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,md,json,yaml}": ["prettier --write"]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged
```

### Commit Message Validation

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

```bash
# .husky/commit-msg
npx --no -- commitlint --edit "$1"
```

Valid format: `feat: add user authentication`, `fix: resolve null pointer`, `docs: update API`

### Skipping Hooks

```bash
# Skip for a single commit (emergency)
git commit --no-verify -m "emergency fix"

# Disable Husky entirely (CI, Docker)
HUSKY=0
```

---

## 18. TypeScript Tooling

### `tsc` (TypeScript Compiler)

```bash
# Compile all files
tsc

# Compile with specific config
tsc --project tsconfig.build.json

# Type check without emitting
tsc --noEmit

# Watch mode
tsc --watch
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Key Compiler Options

| Option | Description |
|---|---|
| `strict` | Enables all strict type-checking options |
| `target` | ECMAScript target version |
| `module` | Module system (`CommonJS`, `ESNext`, `NodeNext`) |
| `moduleResolution` | How modules are resolved (`bundler`, `node`, `nodenext`) |
| `noEmit` | Type check only, don't emit files |
| `declaration` | Generate `.d.ts` declaration files |
| `isolatedModules` | Ensure each file can be transpiled independently |
| `jsx` | JSX handling (`react-jsx`, `react`, `preserve`) |
| `baseUrl` / `paths` | Path aliasing |

### Project References

For monorepos — split TypeScript projects into smaller pieces:

```json
// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "composite": true,    // Required for referenced projects
    "declaration": true,
    "outDir": "./dist"
  }
}

// packages/app/tsconfig.json
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    { "path": "../shared" }
  ]
}
```

```bash
# Build all referenced projects in dependency order
tsc --build --verbose

# Build specific project and its dependencies
tsc --build packages/app
```

**Benefits:**
- Faster builds (incremental, skips unaffected projects)
- Editor responsiveness in large codebases
- Enforced project boundaries

---

## 19. Package Managers

### Comparison

| Feature | npm | Yarn (Berry) | pnpm |
|---|---|---|---|
| **Install speed** | Moderate | Fast (PnP) | Fastest (hard links) |
| **Disk usage** | High (duplicate copies) | Low (PnP) | Lowest (content-addressable store) |
| **Lockfile** | `package-lock.json` | `yarn.lock` | `pnpm-lock.yaml` |
| **Monorepo support** | Workspaces (basic) | Workspaces (advanced) | Workspaces + filtering (best) |
| **Strictness** | Flat node_modules (phantom deps) | Strict with PnP | Strict by default (symlinked) |
| **Bundled with Node** | Yes | No (via corepack) | No (via corepack) |
| **Best for** | Simple projects | PnP adoption | Monorepos, strict deps |

### How pnpm Saves Disk

pnpm uses a **content-addressable store** — each package version is stored once globally. Projects link to the store via hard links:

```
# With 10 React projects:
npm:  10 × React copies = ~1GB
pnpm: 1 global React copy = ~100MB (shared via symlinks)
```

### Workspaces

All three support workspaces for monorepos:

**npm/Yarn workspaces** (`package.json`):
```json
{
  "workspaces": ["packages/*"]
}
```

**pnpm workspaces** (`pnpm-workspace.yaml`):
```yaml
packages:
  - 'packages/*'
```

### Lockfiles

Lockfiles pin exact dependency versions for reproducible builds:

| Manager | Lockfile | Format |
|---|---|---|
| npm | `package-lock.json` | JSON |
| Yarn | `yarn.lock` | Custom text format |
| pnpm | `pnpm-lock.yaml` | YAML |
| Bun | `bun.lockb` | Binary |

### Choosing in 2026

- **pnpm**: Best default for most projects (fast, strict, efficient)
- **Yarn Berry**: Best if you need PnP mode or zero-installs
- **npm**: Still fine for simple projects, best compatibility

---

## 20. npx and Package Execution

**npx** (bundled with npm) executes packages without installing them globally:

```bash
# Run a package once
npx create-react-app my-app

# Run a locally installed package
npx eslint .

# Execute a specific version
npx eslint@8.57.0 .

# Run a binary from a locally installed package
npx --no-install eslint .
```

**pnpm equivalent**: `pnpx` or `pnpm dlx`
**Yarn equivalent**: `yarn dlx`
**Bun equivalent**: `bunx`

---

## 21. npm Scripts

### Basic Scripts

```json
{
  "scripts": {
    "start": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint .",
    "format": "prettier --write .",
    "dev": "vite",
    "preview": "vite preview"
  }
}
```

### Lifecycle Hooks

npm lifecycle hooks run automatically:

```json
{
  "scripts": {
    "prepare": "husky",           // After `npm install`
    "prebuild": "npm run lint",   // Before `npm run build`
    "postbuild": "echo 'Build complete'", // After `npm run build`
    "prepublishOnly": "npm run build"     // Before `npm publish`
  }
}
```

**Complete lifecycle order:**
1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish`
5. `prepare` (runs after `npm install`, used by Husky)

### Cross-Platform Scripts

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development vite",
    "clean": "rimraf dist",
    "copy": "cpx src/assets/** dist/assets"
  }
}
```

```bash
npm install -D cross-env rimraf cpx
```

---

## 22. Environment Variables

### `.env` Files

```
.env                    # All modes
.env.local              # All modes, git-ignored
.env.development        # Development mode only
.env.production         # Production mode only
.env.development.local  # Development only, git-ignored
.env.production.local   # Production only, git-ignored
```

### Vite

```env
# .env
VITE_API_URL=https://api.example.com
DB_PASSWORD=secret

# Access in client code:
import.meta.env.VITE_API_URL  // "https://api.example.com"
import.meta.env.DB_PASSWORD   // undefined (not exposed)
```

**Security rule**: Only `VITE_`-prefixed variables are exposed to client code.

### Webpack (via DefinePlugin or dotenv-webpack)

```js
// webpack.config.js
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
};
```

### CRA (Create React App)

```env
# Only REACT_APP_ prefixed variables are exposed
REACT_APP_API_URL=https://api.example.com

// Access:
process.env.REACT_APP_API_URL
```

### Node.js

```env
# .env file
DATABASE_URL=postgresql://localhost/mydb
PORT=3000
```

```js
require('dotenv').config();
console.log(process.env.DATABASE_URL);
```

---

## 23. Source Maps

Source maps map minified/bundled code back to original source code for debugging.

### Webpack `devtool` Options

| Option | Quality | Speed | Use Case |
|---|---|---|---|
| `source-map` | Full quality | Slow | Production (separate .map file) |
| `hidden-source-map` | Full quality | Slow | Production (don't reference in bundle) |
| `inline-source-map` | Full quality | Slow | Development (inline as data URL) |
| `eval-source-map` | Full quality | Fast | Development (best for most cases) |
| `cheap-module-source-map` | Medium quality | Faster | Development |
| `eval` | No source map | Fastest | Development (no original source) |
| `false` | No source map | Fastest | Don't generate any source maps |

**Recommended:**
- **Development**: `eval-source-map` (fast, accurate)
- **Production**: `source-map` or `hidden-source-map`

### Vite

```js
export default defineConfig({
  build: {
    sourcemap: true,          // Generate source maps
    // sourcemap: 'inline',  // Inline source maps
    // sourcemap: 'hidden',  // Generate but don't reference
  },
});
```

### esbuild

```js
await esbuild.build({
  sourcemap: true,      // External .map file
  // sourcemap: 'linked',  // Reference in bundle
  // sourcemap: 'inline',  // Inline as data URL
  // sourcemap: 'external', // Generate .map file, no reference
});
```

---

## 24. Asset Handling

### Webpack 5 Asset Modules

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      // Inline if < 8KB, otherwise emit file
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
      },
      // Always emit file
      { test: /\.(svg)$/i, type: 'asset/resource' },
      // Always inline as data URL
      { test: /\.svg$/i, type: 'asset/inline' },
      // Emit as-is (raw file)
      { test: /\.txt$/i, type: 'asset/source' },
    ],
  },
};
```

### Vite Static Assets

```js
// Import returns URL
import logoUrl from './logo.png';  // string (URL)

// In <img> tags
<img src={logoUrl} />

// Dynamic imports
const module = await import(`./assets/${name}.png`);
```

### Dynamic Imports

```js
// Lazy load a module
const module = await import('./heavy-module.js');

// React.lazy for components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Route-based splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings'));
```

---

## 25. Code Splitting

### Dynamic `import()`

```js
// Instead of:
import { formatDate } from './utils';

// Use:
button.addEventListener('click', async () => {
  const { formatDate } = await import('./utils');
  formatDate(new Date());
});
```

### React.lazy + Suspense

```jsx
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Route-Based Splitting

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Webpack SplitChunks

```js
optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 20000,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
      common: {
        minChunks: 2,
        priority: -10,
        reuseExistingChunk: true,
      },
    },
  },
},
```

---

## 26. Bundle Analysis

### webpack-bundle-analyzer

```bash
npm install -D webpack-bundle-analyzer
```

```js
// webpack.config.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};
```

Opens an interactive treemap visualization of your bundle contents.

### source-map-explorer

```bash
npm install -D source-map-explorer
```

```bash
# Generate source map, then analyze
source-map-explorer dist/**/*.js
```

### Rollup visualizer

```bash
npm install -D rollup-plugin-visualizer
```

```js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [visualizer({ open: true })],
};
```

---

## 27. Monorepo Tools

### Turborepo

**Turborepo** is a high-performance build system for JavaScript/TypeScript monorepos. It's a wrapper around existing tools (npm, pnpm, yarn workspaces) that adds caching and parallelization.

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

```bash
# Run build across all packages (with caching)
npx turbo run build

# Run with specific filter
npx turbo run build --filter=@myorg/utils
```

**Features:**
- Remote caching (Vercel Remote Cache)
- Task parallelization
- Incremental builds
- Content-hash based caching

### Nx

**Nx** is a smart, fast, open-source build system with first-class monorepo support.

```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "outputs": ["{projectRoot}/dist"]
    }
  }
}
```

**Features:**
- Affected commands (only rebuild what changed)
- Distributed caching
- Task graph visualization
- Generators and schematics
- Plugin ecosystem

### Lerna

**Lerna** (now maintained by Nx) is focused on versioning and publishing packages.

```json
// lerna.json
{
  "version": "independent",
  "npmClient": "pnpm",
  "packages": ["packages/*"],
  "command": {
    "version": {
      "conventionalCommits": true
    }
  }
}
```

```bash
# Version packages
npx lerna version

# Publish to npm
npx lerna publish
```

### pnpm Workspaces

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```json
// packages/utils/package.json
{
  "name": "@myorg/utils",
  "dependencies": {
    "@myorg/shared": "workspace:*"  // Link to local package
  }
}
```

### Comparison

| Feature | Turborepo | Nx | Lerna | pnpm workspaces |
|---|---|---|---|---|
| **Primary focus** | Build orchestration | Full dev platform | Version/publish | Package management |
| **Caching** | Local + remote | Local + remote | No | No |
| **Task parallelization** | Yes | Yes | No | No |
| **Package publishing** | No | Via plugins | Yes | No |
| **Learning curve** | Low | Medium-High | Low | Low |
| **Best for** | Build speed | Large org monorepos | npm publishing | Simple monorepos |

---

## 28. Dev Servers & Proxy Configuration

### Webpack Dev Server

```js
devServer: {
  port: 3000,
  hot: true,
  open: true,
  historyApiFallback: true,  // SPA routing support
  static: {
    directory: path.resolve(__dirname, 'public'),
  },
  proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  ],
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
},
```

### Vite Dev Server

```js
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      },
    },
    cors: true,
    hmr: {
      overlay: true,
    },
  },
});
```

### esbuild Dev Server

```js
const esbuild = require('esbuild');

const server = await esbuild.context({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  serve: {
    port: 3000,
    servedir: 'dist',
  },
});

await server.watch();
```

---

## 29. Hot Module Replacement (HMR)

HMR updates modules in the browser without a full page reload.

### How HMR Works (Webpack)

1. **File change detected**: Webpack rebuilds affected modules
2. **Update sent**: Changed modules sent to browser via WebSocket
3. **Module evaluation**: If HMR handler exists, it runs (e.g., swap CSS)
4. **Fallback**: If no handler, update bubbles up toward entry point
5. **State preserved**: Application state is maintained

### HMR in Different Tools

| Tool | HMR Speed | How It Works |
|---|---|---|
| **Vite** | Instant (independent of app size) | ESM-based, native browser imports |
| **Webpack** | Depends on app size | Full module graph in memory |
| **Parcel** | Fast | Worker-thread based compilation |
| **esbuild** | Limited | Watch mode with manual reload |

### Vite HMR Advantages

Vite's HMR is instant because:
- Dev server uses **native ESM** — no bundling in dev
- Changed modules are replaced via browser's module system
- HMR speed is independent of application size

### React HMR

React Fast Refresh (used by Vite, CRA):
```jsx
// Changes to components preserve state
// No need to write HMR code manually
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
// Editing this component preserves `count` state
```

---

## 30. Module Federation

**Module Federation** (Webpack 5) allows multiple independently built applications to share modules at runtime — a micro-frontend architecture.

### Key Concepts

- **Host**: Application that consumes remote modules
- **Remote**: Application that exposes modules
- **Bidirectional**: An application can be both host and remote
- **Shared**: Dependencies shared across applications (e.g., React)

### Remote Application

```js
// remote/webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
        './Header': './src/Header',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  devServer: { port: 3001 },
};
```

### Host Application

```js
// host/webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: 'remote@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  devServer: { port: 3000 },
};
```

### Using Remote Modules

```jsx
import React, { lazy, Suspense } from 'react';

const RemoteButton = lazy(() => import('remote/Button'));

function App() {
  return (
    <div>
      <h1>Host Application</h1>
      <Suspense fallback="Loading Button...">
        <RemoteButton />
      </Suspense>
    </div>
  );
}
```

### Shared Configuration

```js
shared: {
  // Simple sharing (auto-detect version)
  react: { singleton: true },

  // Version constraints
  lodash: {
    singleton: true,
    requiredVersion: '^4.17.0',
    eager: false,  // Load on demand (default)
  },

  // Array shorthand
  ['react', 'react-dom'],
}
```

---

## 31. Import Maps & ES Modules in Browsers

### Native ES Modules

Modern browsers support ES modules natively:

```html
<script type="module">
  import { formatDate } from './utils.js';
  console.log(formatDate(new Date()));
</script>
```

### Import Maps

Import maps let you control how module specifiers are resolved:

```html
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@18",
    "react-dom/client": "https://esm.sh/react-dom@18/client",
    "lodash": "https://cdn.jsdelivr.net/npm/lodash@4/lodash.js",
    "@myorg/utils": "./node_modules/@myorg/utils/dist/index.mjs"
  }
}
</script>

<script type="module">
  import React from 'react';
  import { createRoot } from 'react-dom/client';
  import { formatDate } from '@myorg/utils';
</script>
```

### ESM CDN Services

- **esm.sh**: `https://esm.sh/react@18`
- **Skypack**: `https://cdn.skypack.dev/react@18`
- **jsDelivr**: `https://cdn.jsdelivr.net/npm/react@18/+esm`

### Use Cases
- **Prototyping**: No build step needed
- **Browser-native development**: No bundler for small projects
- **Library demos**: Share code directly via CDN

---

## 32. Alternative Runtimes: Deno and Bun

### Deno

**Deno** is a secure JavaScript/TypeScript runtime built on V8 (by the creator of Node.js).

**Key features:**
- TypeScript support out of the box (no transpilation needed)
- Secure by default (no file/network/env access without permission)
- Uses URLs for imports (no `node_modules` by default)
- Built-in tooling (formatter, linter, test runner, bundler)
- npm compatibility (via `npm:` specifier)

```ts
// Deno native
import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

serve((req) => new Response("Hello World"), { port: 8000 });

// npm compatibility
import express from "npm:express@4";
```

### Bun

**Bun** is an all-in-one JavaScript runtime, package manager, bundler, and test runner — focused on speed.

**Key features:**
- Written in Zig (native performance)
- npm-compatible package manager (fastest installs)
- Built-in bundler and transpiler
- Jest-compatible test runner
- Native TypeScript/JSX support

```bash
# Package management
bun install    # Fastest npm-compatible install

# Running scripts
bun run dev
bun run build

# Testing
bun test

# Bundling
bun build src/index.ts --outdir dist
```

### Comparison

| Feature | Node.js | Deno | Bun |
|---|---|---|---|
| **TypeScript** | Requires compilation | Native | Native |
| **Package manager** | npm/yarn/pnpm | Built-in + npm compat | Built-in (fastest) |
| **Security** | Permissive | Strict by default | Permissive |
| **Bundler** | None built-in | Built-in | Built-in |
| **Test runner** | None built-in | Built-in | Built-in (Jest compat) |
| **npm compat** | Native | Via `npm:` specifier | Native |
| **Maturity** | Very mature | Growing rapidly | Growing rapidly |

---

## 33. package.json Fields

### Module Entry Points

| Field | Type | Purpose |
|---|---|---|
| `main` | `string` | CommonJS entry point (Node.js `require`) |
| `module` | `string` | ES module entry point (bundlers) |
| `browser` | `string` | Browser entry point |
| `types` | `string` | TypeScript declaration entry |
| `exports` | `object` | Modern conditional exports (replaces `main`/`module`/`browser`) |
| `sideEffects` | `boolean\|string[]` | Hint for tree shaking |

### `exports` Field (Modern)

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./utils": "./dist/utils.mjs",
    "./styles": "./dist/styles.css"
  }
}
```

### `type` Field

```json
{
  "type": "module"  // .js files are treated as ES modules
  // or
  "type": "commonjs"  // .js files are treated as CommonJS (default)
}
```

### `sideEffects` Field

```json
{
  "sideEffects": false  // All files are safe to tree-shake
}
```

```json
{
  "sideEffects": [
    "./src/polyfills.js",
    "./src/global.css",
    "*.css"
  ]
}
```

### Complete package.json Example

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.mjs" },
      "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
    }
  },
  "sideEffects": false,
  "files": ["dist"],
  "scripts": {
    "build": "rollup -c",
    "test": "vitest",
    "lint": "eslint .",
    "prepare": "husky"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "rollup": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

---

## Quick Reference: Build Tool Selection Guide

| Use Case | Recommended Tool |
|---|---|
| **New SPA (React/Vue)** | Vite |
| **Library publishing** | Rollup or tsup |
| **Large legacy project** | Webpack 5 (or migrate to Vite) |
| **Maximum build speed** | esbuild |
| **Zero-config prototype** | Parcel |
| **Next.js project** | Turbopack (built-in) |
| **Monorepo builds** | Turborepo + pnpm |
| **Monorepo publishing** | Lerna + pnpm |
| **CI transform speed** | esbuild or SWC |
| **TypeScript compilation** | tsc (for types) + SWC/esbuild (for output) |
