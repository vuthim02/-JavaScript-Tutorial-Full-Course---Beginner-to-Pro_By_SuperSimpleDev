# Chapter 11 — WeakRef

## Overview

`WeakRef` allows you to hold a weak reference to another object, preventing it from preventing garbage collection.

---

## Basic Usage

```javascript
let user = { name: 'Alice' };
const weakRef = new WeakRef(user);

// Dereference to get the object
console.log(weakRef.deref()?.name); // "Alice"

// After the original is garbage collected
user = null;
console.log(weakRef.deref()); // undefined
```

---

## Practical Use Case: Cache

```javascript
class ObjectCache {
    #cache = new Map();

    get(key) {
        const ref = this.#cache.get(key);
        if (ref) {
            const value = ref.deref();
            if (value !== undefined) return value;
            this.#cache.delete(key); // clean up stale ref
        }
        return undefined;
    }

    set(key, value) {
        this.#cache.set(key, new WeakRef(value));
    }
}
```

---

## FinalizationRegistry

```javascript
const registry = new FinalizationRegistry((heldValue) => {
    console.log(`Object cleaned up: ${heldValue}`);
});

let obj = { data: 'important' };
registry.register(obj, 'my-object');

obj = null; // When GC runs: "Object cleaned up: my-object"
```

---

## Key Rules

- `WeakRef.deref()` returns the object or `undefined` if collected
- You cannot prevent garbage collection of a weakly referenced object
- `WeakRef` is not for general use — prefer normal references
- Only use when you need cache-like or observer-like patterns

---

## Next Steps

[Back to Chapter 10](10-weakmap-weakset.md): WeakMap and WeakSet
[Proceed to Chapter 12](12-freeze-seal.md): Object.freeze and Object.seal
