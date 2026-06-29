# Module System — CommonJS (CJS) and ES Modules (ESM)

<img src="https://media.giphy.com/media/f4ztZcdm9Fi90vL4Zd/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## CommonJS (CJS)

### How require Works

```javascript
// greet.js
const greeting = 'Hello World';
module.exports = greeting;

// app.js
const greet = require('./greet.js');
console.log(greet); // 'Hello World'
```

### require() Internals

When `require('./greet.js')` is called, Node performs:

```
1. Resolve path
   - Check if relative path ✓ → './greet.js'
   - Check core module → 'fs', 'http'
   - Check node_modules
   - Try extensions: .js, .json, .node

2. Load file content
   - Read file from disk (via libuv thread pool)

3. Wrap in IIFE
   (function(exports, require, module, __filename, __dirname) {
       // file content here
   });

4. Execute
   - Run the wrapped function
   - module.exports is what gets returned

5. Cache
   - Store in require.cache['./greet.js']
   - Subsequent require() calls return cached version
```

### The Wrapper Function

Node wraps every module in a function:

```javascript
// What you write:
const x = 10;

// What Node executes:
(function(exports, require, module, __filename, __dirname) {
    const x = 10;
});
```

This is why `__dirname` and `__filename` exist even though they're not declared.

### Caching

```javascript
// module.js
console.log('Will this run twice?');
module.exports = { data: 'important' };

// app.js
const a = require('./module'); // Prints: 'Will this run twice?'
const b = require('./module'); // NOTHING printed — cached
console.log(a === b); // true (same object)
```

### Clearing Cache

```javascript
delete require.cache[require.resolve('./module.js')];
// Forces re-execution on next require()
```

### module.exports vs exports

```javascript
// This works:
exports.foo = 'bar';

// This does NOT work:
exports = { foo: 'bar' }; // Reassigns exports, not module.exports

// This works:
module.exports = { foo: 'bar' }; // Proper way
```

Because `exports` is just a reference to `module.exports`. Reassigning it breaks the connection.

### Q&A

| Question | Answer |
|----------|--------|
| Is file executed twice? | No — `require()` caches after first execution |
| What is wrapped around module? | IIFE with `exports`, `require`, `module`, `__filename`, `__dirname` |
| Why does `exports = {}` not work? | It detaches from `module.exports` |
| Can cache be cleared? | Yes, with `delete require.cache[...]` |

---

## ES Modules (ESM)

### Syntax

```javascript
// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14159;
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add, PI } from './math.js';
```

### How Node Decides

| package.json field | Module system |
|-------------------|---------------|
| `"type": "commonjs"` or no field | CommonJS (`.js` files) |
| `"type": "module"` | ESM (`.js` files) |

Or use explicit extensions: `.mjs` → always ESM, `.cjs` → always CommonJS.

### Differences

| Feature | CommonJS | ESM |
|---------|----------|-----|
| Loading | Synchronous | Asynchronous |
| Top-level `await` | ❌ No | ✅ Yes |
| `__dirname` / `__filename` | ✅ Available | ❌ Not available (use `import.meta.url`) |
| Static analysis | ❌ No | ✅ Yes (tree-shaking possible) |
| Circular dependencies | Works (partial exports) | Works (live bindings) |

### ESM __dirname Equivalent

```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

### Live Bindings

```javascript
// counter.js
export let count = 0;
export function increment() { count++; }

// app.js
import { count, increment } from './counter.js';
console.log(count); // 0
increment();
console.log(count); // 1 — live binding!
```

ESM exports are **live bindings** — changes in the exporting module are visible in the importing module.

### Q&A

| Question | Answer |
|----------|--------|
| CJS or ESM? | Check `package.json` `"type"` field or file extension |
| Is top-level `await` used? | ESM only |
| Is static analysis possible? | ESM only (enables tree-shaking) |
## Next Steps

[Back to Chapter 6](06-file-system.md): File System (fs) and Path Module
[Proceed to Chapter 8](08-process-globals.md): Global Objects and Process to learn about global objects and process.
