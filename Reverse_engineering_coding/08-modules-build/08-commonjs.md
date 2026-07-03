# 08 — CommonJS

## Traditional Node.js System

Before ES modules, Node.js used CommonJS.

Export:

```javascript
// math.js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

module.exports = {
    add,
    subtract
};
```

Import:

```javascript
const math = require("./math");

console.log(math.add(2, 3)); // 5
```

## Key Differences from ES Modules

| Feature | CommonJS (`require`) | ES Modules (`import`) |
|---------|---------------------|----------------------|
| Syntax | `require()` | `import ... from` |
| Default | `module.exports = value` | `export default value` |
| Named | `exports.name = value` | `export const name = value` |
| Loading | Synchronous | Asynchronous |
| Resolution | Runtime | Static (parse-time) |
| Live bindings | No (copy of value) | Yes (live binding) |
| Top-level `this` | `module.exports` | `undefined` |
| File extension | Usually `.js` | `.js`, `.mjs` |
| Dynamic import | `require()` anywhere | `import()` (dynamic) |

## CommonJS in Node.js Today

Node.js supports both:

```json
// package.json
{
    "type": "commonjs" // default, or omit
}
// .js files → CommonJS

{
    "type": "module"
}
// .js files → ES modules
```

Or use file extensions:

```
.cjs → CommonJS always
.mjs → ES module always
```

## CommonJS is Synchronous

```javascript
const fs = require("fs");     // Synchronous
const data = fs.readFileSync("file.txt"); // Synchronous

// ES version is async:
import fs from "fs/promises";
const data = await fs.readFile("file.txt");
```

This is why CommonJS worked well for Node.js (server-side) but not browsers (which need async loading).

## require() Can Be Dynamic

```javascript
// Conditional loading
let module;
if (condition) {
    module = require("./feature-a");
} else {
    module = require("./feature-b");
}

// Dynamic variable path
const path = "./locale/" + language;
const messages = require(path);
```

Dynamic `require()` is not possible with static `import`.

## Dynamic import() Works in Both

```javascript
// Works everywhere (returns a promise)
const module = await import("./module.js");
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is project using CommonJS? | Check for `require()`, `module.exports`, or `"type": "commonjs"` in package.json. |
| Or ES modules? | Check for `import`/`export`, or `"type": "module"` in package.json, or `.mjs` extension. |
| What happens if you mix both in the same file? | Can't. A file is either CommonJS or ES module. But you can `import()` CommonJS from ES modules. |
| How to tell which system a package uses? | Check its `package.json` for `"type"` field or `"exports"` map. |
## Next Steps

[Back to Chapter 7](07-module-scope.md): 07 — Module Scope
[Proceed to Chapter 9](09-package-json.md): 09 — package.json to learn about 09 — package.json.
