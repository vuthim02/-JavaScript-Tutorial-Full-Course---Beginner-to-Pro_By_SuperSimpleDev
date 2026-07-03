# 30 — Module Resolution Algorithm

## How Node.js Finds Modules

When you write `require("lodash")` or `import "lodash"`, Node.js follows a specific algorithm to find the file.

## Three Types of Module Specifiers

```
1. Core modules:     require("fs"), require("path")  — built into Node.js
2. Relative paths:   require("./utils"), require("../helpers/utils")
3. Bare specifiers:  require("lodash"), require("express") — from node_modules
```

## Bare Specifier Resolution

Node.js walks up the directory tree looking for `node_modules`:

```
/home/user/project/
    index.js           ← require("lodash")
    node_modules/
        lodash/        ← Found here!
    src/
        utils/
            helper.js  ← require("lodash")
            node_modules/
                lodash/ ← OR here (closest node_modules wins)
```

Resolution order:
```
/home/user/project/src/utils/node_modules/lodash   ← closest
/home/user/project/src/node_modules/lodash
/home/user/project/node_modules/lodash              ← most common
/home/user/node_modules/lodash
/home/node_modules/lodash
/node_modules/lodash
```

## package.json Resolution

Once Node.js finds the package directory, it reads `package.json` to find the entry point:

```json
{
    "name": "lodash",
    "main": "lodash.js",      ← CJS entry point
    "module": "index.mjs",    ← ESM entry point (bundlers)
    "exports": {              ← Modern (overrides main)
        ".": "./lodash.js",
        "./fp": "./fp.js"
    }
}
```

Resolution priority when `"exports"` exists:
1. `"exports"` field (highest priority)
2. `"main"` field (fallback)
3. `index.js` (last resort)

## File Extension Resolution

```javascript
require("./data");
// Node.js tries (in order):
// 1. ./data.js
// 2. ./data.json
// 3. ./data.node
// 4. ./data/index.js
// 5. ./data/index.json
// 6. ./data/index.node
```

You can omit the extension for `.js`, `.json`, `.node` files.

## Directory Resolution

```javascript
require("./utils");
// If ./utils is a directory:
// 1. ./utils/package.json (look for "main" field)
// 2. ./utils/index.js
// 3. ./utils/index.json
// 4. ./utils/index.node
```

## require.resolve()

```javascript
// Resolve without loading
const path = require.resolve("lodash");
console.log(path);
// "/home/user/project/node_modules/lodash/lodash.js"

// Useful for debugging "which file is being loaded?"
```

## Module Caching

Once resolved, modules are cached:

```javascript
// Both return the SAME object (singleton)
const a = require("./data");
const b = require("./data");
console.log(a === b); // true
```

Cache key is the **resolved absolute path**. Different paths = different instances.

## ESM Resolution Differences

ES modules have stricter resolution:

```javascript
// ESM requires file extensions (mostly)
import { add } from "./math";     // ❌ Error in browsers
import { add } from "./math.js";  // ✅ Required

// ESM does NOT search for index.js automatically
import "./utils";                 // ❌ Must specify full path
import "./utils/index.js";        // ✅

// Import maps can override resolution
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which file does `require("x")` load? | Check `node_modules/x/package.json` → `"main"` field. |
| Can I see the resolved path? | `require.resolve("x")` returns the absolute path. |
| Why is the wrong version loaded? | Check `node_modules` hoisting. There may be a nested `node_modules` with a different version. |
| How does Node.js find my file? | It walks up the directory tree looking in each `node_modules` folder. |
| Why does ESM require `.js` extension? | ESM spec requires explicit file extensions for static analysis. |
## Next Steps

[Back to Chapter 29](29-import-meta.md): 29 — import.meta
[Proceed to Module 9](../09-browser-dom/README.md): Browser DOM, BOM, Events, Forms, Storage, Rendering Pipeline to learn about browser APIs and the DOM.
