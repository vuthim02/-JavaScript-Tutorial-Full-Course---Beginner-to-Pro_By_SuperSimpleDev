# Module Scope

## What Is Module Scope?

When a JavaScript file is loaded as an **ES Module** (with `type="module"` in HTML or `.mjs` extension or in Node with `"type": "module"`), each file gets its own **isolated scope**. Variables declared at the top level are **not** global — they are module-scoped.

```javascript
// moduleA.js — ES Module
const secret = "only mine"; // NOT on window/global
export const shared = "I can be imported";

// moduleB.js
import { shared } from "./moduleA.js";
console.log(shared);  // "I can be imported"
console.log(secret);  // ❌ ReferenceError — not exported
```

## Module Scope vs Other Scopes

```
┌────────────────────────────────────────────────┐
│  Global Scope  (window / globalThis)           │
│  ┌──────────────────────────────────────────┐  │
│  │  Module Scope (per file)                 │  │
│  │  ┌────────────────────────────────────┐  │  │
│  │  │  Function Scope                    │  │  │
│  │  │  ┌──────────────────────────────┐  │  │  │
│  │  │  │  Block Scope { }             │  │  │  │
│  │  │  └──────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

## Exports: Named vs Default

```javascript
// math.js

// Named exports — can export many
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class Vector { /* ... */ }

// Default export — one per module
export default function multiply(a, b) { return a * b; }
```

```javascript
// main.js

// Import named exports — must use exact names
import { PI, add, Vector } from "./math.js";

// Import default — choose any name
import multiply from "./math.js";
import times from "./math.js"; // same thing, different local name

// Import everything as namespace
import * as MathUtils from "./math.js";
MathUtils.add(1, 2); // 3
MathUtils.PI;        // 3.14159
MathUtils.default(3, 4); // 12 (default export)
```

## Modules Are Singletons

```javascript
// counter.js
let count = 0;
export function increment() { return ++count; }
export function getCount() { return count; }

// fileA.js
import { increment } from "./counter.js";
increment(); // count = 1
increment(); // count = 2

// fileB.js
import { getCount } from "./counter.js";
// Same module instance — same count!
getCount(); // 2 ← not 0!
```

> Every module is **executed once** and the same module object is shared by all importers. This makes modules natural singletons.

## Dynamic Import (`import()`)

```javascript
// Load a module on demand (lazy loading)
async function loadFeature() {
    const module = await import("./heavyFeature.js");
    module.init(); // use it
}

// With destructuring
const { add } = await import("./math.js");

// Conditional loading
if (userWantsCharts) {
    const { renderChart } = await import("./charts.js");
    renderChart(data);
}
```

## Module Scope Key Facts

```javascript
// In a module — `this` at top level is undefined
console.log(this); // undefined (not window!)

// `import.meta` — module metadata
console.log(import.meta.url); // "file:///path/to/module.js"

// Top-level await (ES2022) — only in modules
const data = await fetch("/api/data").then(r => r.json());
export { data };
```

## CommonJS vs ES Modules

```javascript
// CommonJS (Node.js, .cjs)
const fs = require("fs");       // synchronous, dynamic
module.exports = { myFn };      // assign to exports
const { myFn } = require("./x");

// ES Modules (.mjs or "type":"module")
import fs from "fs";            // static, at top of file
export { myFn };                // named export
import { myFn } from "./x.js"; // must include extension
```

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| Syntax | `require` / `exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| Static analysis | ❌ No | ✅ Yes (tree-shaking!) |
| Top-level `this` | `module.exports` | `undefined` |
| Default in Node | ✅ Yes | Needs `"type":"module"` |
| Browser support | ❌ No (needs bundler) | ✅ Native |

## Module Scope Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Is this file a module? | Check for `export`/`import` or `type="module"` |
| Are top-level vars global? | No — module scoped |
| Is `this` the window? | No — `undefined` in strict mode modules |
| Can other files see this variable? | Only if explicitly exported |
| Is the module singleton? | Yes — executed once, shared by all importers |
## Next Steps

[Back to Chapter 9](09-scope-chain-and-tdz.md): Scope Chain
[Proceed to Chapter 11](11-closures.md): Closures to learn about closures.
