# 20 — Tree Shaking

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Removing Unused Code

Imported:

```javascript
import {
    add
}
from "./math";
```

Unused functions (`multiply()`, `subtract()`, `divide()`) get removed from the final bundle.

## How Tree Shaking Works

```
Requires:
1. ES module syntax (static import/export)
2. Side-effect-free modules
3. Bundler configured for tree shaking

Process:
- Bundler analyzes which exports are actually used
- Unused exports are "dead code eliminated"
- The resulting bundle only contains used code
```

```javascript
// math.js – all exported
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }

// main.js – only imports add
import { add } from "./math";

// After tree shaking, bundle contains:
// function add(a, b) { return a + b; }
// (subtract and multiply are removed)
```

## Side Effects

If a module has side effects, it cannot be tree-shaken:

```javascript
// side-effect.js
console.log("Module loaded!"); // Side effect!
export function helper() {}

// Even if helper is not imported, console.log still runs
// Bundler cannot remove this module
```

Mark packages as side-effect-free in `package.json`:

```json
{
    "sideEffects": false
}
```

Or specify files with side effects:

```json
{
    "sideEffects": [
        "*.css",
        "./src/polyfills.js"
    ]
}
```

## Benefits

```
Smaller bundles:
  - lodash: import { debounce } → only debounce included
  - moment.js: all locales removed if unused
  - UI libraries: only used components

Faster downloads
Faster parsing
Less memory
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is tree shaking working? | Check if unused imports are in the final bundle. Use bundle analyzer tools. |
| Why might tree shaking fail? | CommonJS (`require`), dynamic imports, side effects, module-level code. |
| How to check bundle contents? | Use `vite build --analyze`, `webpack-bundle-analyzer`, or source maps. |
## Next Steps

[Back to Chapter 19](19-transpilers.md): 19 — Transpilers
[Proceed to Chapter 21](21-source-maps.md): 21 — Source Maps to learn about 21 — source maps.
