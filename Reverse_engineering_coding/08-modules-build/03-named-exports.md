# 03 — Named Exports

<img src="https://media.giphy.com/media/f4ztZcdm9Fi90vL4Zd/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Multiple Exports

Export individual declarations:

```javascript
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
```

Export at the end:

```javascript
function add() {}
function subtract() {}
function multiply() {}

export { add, subtract, multiply };
```

Import:

```javascript
import {
    add,
    subtract
}
from "./math.js";
```

## Memory Layout

```
math.js (Module)
   │
   ├── export: add       → function(a,b) { return a+b; }
   ├── export: subtract  → function(a,b) { return a-b; }
   └── export: multiply  → function(a,b) { return a*b; }

main.js (Module)
   │
   └── import { add, subtract }
       │
       └── add is a live binding to math.js's add
```

## Live Bindings

ES modules create **live bindings**, not copies.

```javascript
// counter.js
export let count = 0;
export function increment() {
    count++;
}

// main.js
import { count, increment } from "./counter.js";
console.log(count); // 0
increment();
console.log(count); // 1 (live binding updated)
```

This is different from CommonJS which copies the value.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How many named exports does this module have? | Count the `export` keywords (or the `export {}` block). |
| Can I rename a named export on import? | Yes: `import { add as plus } from "./math.js"`. |
| Can a module have both named and default exports? | Yes. `export default class {}` + `export function helper() {}`. |
| What happens if I import a name that doesn't exist? | Syntax error at compile time. |
## Next Steps

[Back to Chapter 2](02-es-modules.md): 02 — ES Modules
[Proceed to Chapter 4](04-default-exports.md): 04 — Default Exports to learn about 04 — default exports.
