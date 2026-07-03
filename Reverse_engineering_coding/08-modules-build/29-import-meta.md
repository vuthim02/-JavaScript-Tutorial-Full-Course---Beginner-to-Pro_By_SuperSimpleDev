# 29 — import.meta

## Module Metadata

`import.meta` is an object available inside ES modules that provides metadata about the current module.

```javascript
// main.mjs
console.log(import.meta);
// { url: "file:///home/user/project/src/main.mjs" }
```

## import.meta.url

The absolute URL of the current module file:

```javascript
// Works in browsers:
console.log(import.meta.url);
// "https://example.com/js/app.js"

// Works in Node.js:
console.log(import.meta.url);
// "file:///home/user/project/src/utils.mjs"
```

## Resolving Paths Relative to Current Module

```javascript
// browser: construct URL relative to current module
const dataUrl = new URL("./data.json", import.meta.url);
const response = await fetch(dataUrl);

// Node.js: resolve file paths
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname); // Directory of current module
```

## Vite / Build Tool Env Variables

```javascript
// Vite exposes env vars via import.meta.env
console.log(import.meta.env.MODE);     // "development" or "production"
console.log(import.meta.env.BASE_URL); // "/"
console.log(import.meta.env.PROD);     // true/false
console.log(import.meta.env.DEV);      // true/false

// Custom env vars (prefixed with VITE_)
console.log(import.meta.env.VITE_API_URL);
```

## import.meta.resolve (Experimental)

```javascript
// Resolve a module specifier to its absolute URL
const resolvedUrl = await import.meta.resolve("./utils.js");
console.log(resolvedUrl);
// "file:///home/user/project/src/utils.js"
```

Note: `import.meta.resolve` is still experimental in Node.js and not widely supported in browsers.

## Import Meta in Different Contexts

| Context | `import.meta.url` example | Notes |
|---------|---------------------------|-------|
| Browser module | `https://site.com/js/app.js` | Full URL of the script |
| Node.js module | `file:///path/to/app.mjs` | File path as file:// URL |
| Web Worker (module) | `https://site.com/worker.js` | Worker script URL |
| Vite dev mode | `http://localhost:5173/src/main.js` | Dev server URL |

## Common Use Cases

```javascript
// 1. Loading assets relative to current module
const img = new Image();
img.src = new URL("./logo.png", import.meta.url);

// 2. Dynamic imports relative to current module
const module = await import(new URL("./feature.js", import.meta.url));

// 3. Determine if running in dev or prod (Vite)
if (import.meta.env.DEV) {
    console.log("Running in development mode");
}

// 4. Get current file path (Node.js)
import { fileURLToPath } from "url";
const currentFile = fileURLToPath(import.meta.url);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the current module's URL? | `import.meta.url`. |
| How to load a file relative to current module? | `new URL("./file", import.meta.url)`. |
| Can I access environment variables in ESM? | Yes: `import.meta.env` (Vite) or `process.env` (Node.js). |
| Is `__dirname` available in ESM? | No. Use `fileURLToPath(import.meta.url)` + `dirname()`. |
## Next Steps

[Back to Chapter 28](28-esm-cjs-interop.md): 28 — ESM / CJS Interoperability
[Proceed to Chapter 30](30-module-resolution.md): 30 — Module Resolution Algorithm to learn about 30 — module resolution algorithm.
