# 21 — Memory Behavior

## Heap vs Stack

```
Stack (function calls, primitives):
  - Function frames
  - Primitives (numbers, strings, booleans) stored inline
  - Fast, limited size (~1MB)

Heap (objects, closures, references):
  - Objects, arrays, functions
  - Garbage collected
  - Larger, slower allocation
```

---

## References and Garbage Collection

```javascript
let user = { name: "John" }; // Object in heap, user reference on stack
let ref = user;              // Two references to the same object

user = null;  // Object still reachable via ref
ref = null;   // Object now unreachable → GC can collect it
```

---

## WeakMaps Prevent Leaks

```javascript
// Without WeakMap – strong reference prevents GC
const cache = new Map();

function process(obj) {
    cache.set(obj, "processed");
    // obj can NEVER be GC'd because cache holds a reference
    // MEMORY LEAK
}

// With WeakMap – weak reference allows GC
const wmCache = new WeakMap();

function process(obj) {
    wmCache.set(obj, "processed");
    // When obj is no longer referenced, GC can collect both obj and its cache entry
}
```

---

## Closures Keep Objects Alive

```javascript
function createLeak() {
    const hugeData = new Array(1000000).fill("data");

    // This closure keeps hugeData alive as long as the timer runs
    setInterval(() => {
        console.log(hugeData.length); // Closure reference prevents GC
    }, 1000);
}

createLeak(); // hugeData lives forever
```

---

## Detached DOM Nodes

```javascript
const detached = [];

function createElement() {
    const div = document.createElement("div");
    div.textContent = "Hello";
    document.body.appendChild(div);
    detached.push(div); // Reference kept in array

    document.body.removeChild(div); // Removed from DOM
    // BUT: detached array still references it → memory leak
}
```

---

## Memory Leak Detection

```javascript
// Chrome DevTools → Memory tab → Heap snapshot
// Look for:
// - Detached DOM nodes
// - Growing array sizes
// - Closures retaining large objects

// Node.js
const used = process.memoryUsage();
console.log(`Heap used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can garbage collector free this memory? | Only if no references remain. Check closures, WeakMaps, event listeners. |
| Why is this object not being GC'd? | Something still holds a reference: closure, array, Map, event listener. |
| Does this closure keep objects alive? | Yes. The closure's scope chain retains references to outer variables. |
| Is a WeakMap used for cache? | If not, the cache entries may prevent GC (memory leak risk). |
## Next Steps

[Back to Chapter 20](20-metaprogramming.md): 20 — Meta-programming
[Proceed to Chapter 22](22-es2022-es2023.md): 22 — ES2022 & ES2023 Features to learn about 22 — es2022 & es2023 features.
