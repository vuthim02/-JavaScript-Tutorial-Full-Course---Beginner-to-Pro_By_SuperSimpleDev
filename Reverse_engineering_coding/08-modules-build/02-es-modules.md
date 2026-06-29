# 02 — ES Modules

<img src="https://media.giphy.com/media/f4ztZcdm9Fi90vL4Zd/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Modern Standard

Introduced in ES6 (2015). Native support in modern browsers and Node.js.

```javascript
// math.js
export function add(a, b) {
    return a + b;
}
```

```javascript
// main.js
import { add } from "./math.js";

console.log(add(2, 3));
```

Output: `5`

## Flow

```
main.js (entry point)
   │
   │  import { add } from "./math.js"
   ▼
math.js (module)
   │
   │  export function add() { ... }
   ▼
add() executed in main.js scope
```

## How the Browser Loads ES Modules

```html
<script type="module" src="main.js"></script>
```

Key differences from regular scripts:

| Feature | Regular `<script>` | `<script type="module">` |
|---------|-------------------|-------------------------|
| Default scope | Global | Module scope (not global) |
| Deferred by default | No | Yes (equivalent to `defer`) |
| Strict mode | Opt-in | Always strict mode |
| Top-level `await` | Not allowed | Allowed |
| CORS | Same-origin | Cross-origin requires CORS headers |
| Duplicate | Allowed | Error if duplicate `type="module"` |

## Module Resolution

```javascript
// Relative paths (must start with ./ or ../)
import { add } from "./math.js";
import { sub } from "../utils/math.js";

// Bare specifiers (npm packages)
import lodash from "lodash";

// URL imports
import { format } from "https://cdn.example.com/utils.js";
```

## Module Execution is Deferred

```html
<script type="module">
    console.log("Module"); // Runs after HTML parsed
</script>
<script>
    console.log("Regular"); // Runs immediately when encountered
</script>
// Output order: Regular → Module (if module is in head)
```

## Strict Mode by Default

```javascript
// Inside a module, this is undefined (not window)
console.log(this); // undefined

// Variables are not global
var x = 5;
console.log(window.x); // undefined
```

## import.meta

Each ES module has access to `import.meta` for module metadata:

```javascript
console.log(import.meta.url);
// Browser: "https://example.com/js/app.js"
// Node:    "file:///home/user/project/src/main.mjs"

// Load assets relative to current module:
const dataUrl = new URL("./data.json", import.meta.url);
```

## Dynamic import()

Load modules on demand:

```javascript
const module = await import("./feature.js");
module.doSomething();

// Useful for code splitting, conditional loading
if (condition) {
    const { helper } = await import("./helpers.js");
    helper();
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where does this function come from? | Check the `import` statement path. The function is exported from that file. |
| Which file exports it? | Look for `export` keyword in the imported file. |
| Is the file an ES module? | Check for `"type": "module"` in package.json, or `.mjs` extension. |
| What happens if the import path is wrong? | Module not found error (404 for browser, ERR_MODULE_NOT_FOUND for Node). |
| Are ES modules cached? | Yes. Each module is loaded and executed once, then cached. |
| How to get the current module's URL? | `import.meta.url`. |
| How to dynamically load a module? | `const m = await import("./path.js")`. |
## Next Steps

[Back to Chapter 1](01-why-modules.md): 01 — Why Modules Exist
[Proceed to Chapter 3](03-named-exports.md): 03 — Named Exports to learn about 03 — named exports.
