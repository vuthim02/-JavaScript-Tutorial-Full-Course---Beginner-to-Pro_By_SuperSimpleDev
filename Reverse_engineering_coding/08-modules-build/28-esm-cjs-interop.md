# 28 — ESM / CJS Interoperability

## The Compatibility Problem

ES Modules (`import`/`export`) and CommonJS (`require`/`module.exports`) are different module systems. In Node.js, you often need to use both.

## Importing CJS from ESM

```javascript
// cjs-module.js (CommonJS)
module.exports = {
    greet: (name) => `Hello, ${name}`,
    PI: 3.14
};

// esm-file.mjs (ES Module)
import cjsModule from "./cjs-module.js";

console.log(cjsModule.greet("World")); // "Hello, World"
console.log(cjsModule.PI);             // 3.14
```

The entire `module.exports` becomes the **default export** when imported from ESM.

## Named Exports from CJS (Limited)

```javascript
// For CJS modules that use named exports pattern:
const { greet, PI } = await import("./cjs-module.js");
// Works with dynamic import()

// Static import with named bindings:
// Node.js can "detect" named exports from CJS in some cases
// But it's unreliable — prefer default import for CJS
```

## Importing ESM from CJS (Requires Dynamic Import)

```javascript
// esm-module.mjs
export const greet = (name) => `Hello, ${name}`;
export default function() { return "Default"; }

// cjs-file.cjs (CommonJS)
async function loadESM() {
    const esmModule = await import("./esm-module.mjs");

    console.log(esmModule.greet("World")); // "Hello, World"
    console.log(esmModule.default());      // "Default"
}

loadESM();
```

`require()` cannot load ES modules. You must use `import()` which returns a Promise.

## Package.json Dual Exports

Many packages ship both CJS and ESM versions:

```json
{
    "name": "my-library",
    "exports": {
        ".": {
            "import": "./dist/index.mjs",
            "require": "./dist/index.cjs"
        }
    }
}
```

The `exports` map lets Node.js pick the right format automatically:
- `import` → ESM version
- `require` → CJS version

## The Dual Package Hazard

If a package has both CJS and ESM instances, they may hold separate state:

```javascript
// counter.cjs
let count = 0;
module.exports = { increment: () => count++, getCount: () => count };

// counter.mjs
import cjs from "./counter.cjs"; // One instance
import cjs2 from "./counter.cjs"; // Same instance (cached)
// No issue — CJS modules are cached

// But if ESM and CJS both import differently:
// Different module systems → potential dual instance
```

## .mjs and .cjs Extensions

| Extension | Always treated as |
|-----------|------------------|
| `.mjs` | ES module |
| `.cjs` | CommonJS |
| `.js` | Depends on `"type"` in package.json |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this file ESM or CJS? | Check `"type": "module"` in package.json, or `.mjs`/`.cjs` extension. |
| Can require() load ESM? | No. Use `import()` dynamic import. |
| Can import load CJS? | Yes. Entire `module.exports` becomes default export. |
| Which format does a package use? | Check the `"exports"` field in its package.json. |
| What happens if both formats are loaded? | Potential dual instance problem — state not shared. |
## Next Steps

[Back to Chapter 27](27-package-managers.md): 27 — Package Managers
[Proceed to Chapter 29](29-import-meta.md): 29 — import.meta to learn about 29 — import.meta.
