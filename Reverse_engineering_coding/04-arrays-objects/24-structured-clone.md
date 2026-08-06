# Chapter 24 — Structured Clone Algorithm

## Overview

`structuredClone()` is the modern, built-in way to create deep copies of values in JavaScript.

---

## Basic Usage

```javascript
const original = { name: 'Alice', scores: [90, 85, 92] };
const copy = structuredClone(original);

copy.scores.push(100);
console.log(original.scores.length); // 3 (not affected)
```

---

## What It Supports

```javascript
// All basic types
structuredClone(42);           // number
structuredClone("hello");      // string
structuredClone(true);         // boolean
structuredClone(null);         // null

// Complex types
structuredClone({ a: 1 });     // plain object
structuredClone([1, 2, 3]);    // array
structuredClone(new Date());   // Date
structuredClone(/regex/gi);    // RegExp
structuredClone(new Map());    // Map
structuredClone(new Set());    // Set
structuredClone(new Error());  // Error
structuredClone(new Blob());   // Blob
structuredClone(new ArrayBuffer()); // ArrayBuffer
```

---

## What It Does NOT Support

```javascript
// Functions
structuredClone(() => {});     // DataCloneError

// DOM nodes
structuredClone(document.body); // DataCloneError

// Class instances (loses prototype)
class User { constructor(name) { this.name = name; } }
const copy = structuredClone(new User('Alice'));
copy instanceof User; // false — plain object
```

---

## Comparison with Alternatives

| Method | Deep? | Handles circular? | Handles Map/Set? | Handles Date? |
|--------|-------|-------------------|------------------|---------------|
| `structuredClone()` | Yes | Yes | Yes | Yes |
| `JSON.parse(JSON.stringify())` | Yes | No | No | No |
| Spread `{...obj}` | No (shallow) | N/A | N/A | N/A |
| `Object.assign({}, obj)` | No (shallow) | N/A | N/A | N/A |

---

## Next Steps

[Back to Chapter 23](23-es2023-immutable-methods.md): ES2023+ Immutable Array Methods
[Proceed to Chapter 25](25-for-loops-iteration.md): For Loops and Iteration
