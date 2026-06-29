# `WeakRef` & `FinalizationRegistry`

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem They Solve

Sometimes you want to **hold a reference** to an object **without preventing GC**. This is exactly what `WeakRef` and `FinalizationRegistry` enable.

## `WeakRef` — A Weak Reference

A `WeakRef` holds a reference to an object but **does not prevent garbage collection**. If the object has no other strong references, the GC can reclaim it.

```javascript
let target = { name: "Alice", data: new Array(1000000) };

const weakRef = new WeakRef(target); // weak reference — doesn't prevent GC

// Access the object
const obj = weakRef.deref();
if (obj) {
    console.log(obj.name); // "Alice" — still alive
} else {
    console.log("Object has been garbage collected");
}

// Remove the strong reference
target = null;

// Now the object MAY be GC'd (timing is non-deterministic)
// deref() returns undefined if it's been collected
const later = weakRef.deref();
console.log(later); // might be { name: "Alice" } or undefined
```

> ⚠️ **Critical Rule:** Always check `deref()` result before using it. It can return `undefined` at any time.

## `WeakRef` for Optional Caching

```javascript
// Cache that doesn't prevent GC of its values
class WeakCache {
    #cache = new Map();

    set(key, value) {
        this.#cache.set(key, new WeakRef(value));
    }

    get(key) {
        const ref = this.#cache.get(key);
        if (!ref) return undefined;

        const value = ref.deref();
        if (!value) {
            // Object was GC'd — clean up the dead entry
            this.#cache.delete(key);
            return undefined;
        }
        return value;
    }
}

const cache = new WeakCache();
let bigObj = { data: new Array(10000000).fill(0) };
cache.set("key", bigObj);

cache.get("key"); // { data: [...] }

bigObj = null; // remove strong reference
// After GC runs: cache.get("key") returns undefined
```

## `FinalizationRegistry` — Cleanup Callbacks

`FinalizationRegistry` lets you register a **cleanup callback** that fires when an object is garbage collected.

```javascript
const registry = new FinalizationRegistry((heldValue) => {
    console.log(`Object with id ${heldValue} was GC'd`);
});

let obj = { name: "temporary" };
registry.register(obj, "obj-123"); // register obj, pass "obj-123" as held value

obj = null; // remove strong reference

// Later, when GC runs:
// "Object with id obj-123 was GC'd"
```

> **Important:** The callback receives `heldValue` (the second argument to `register`), NOT the object itself (it's already been collected).

## Real-World: Resource Cleanup

```javascript
// Automatically close file handles when their holder is GC'd
class FileHandleManager {
    #registry = new FinalizationRegistry((handle) => {
        console.log(`Auto-closing handle: ${handle}`);
        handle.close(); // cleanup!
    });

    open(path) {
        const handle = fs.openSync(path, "r");
        const wrapper = { read: () => /* ... */ {} };

        // If `wrapper` is GC'd, close the handle automatically
        this.#registry.register(wrapper, handle);
        return wrapper;
    }
}
```

## WeakRef + FinalizationRegistry Pattern

```javascript
function createCacheWithCleanup() {
    const cache = new Map();
    const registry = new FinalizationRegistry((key) => {
        // Clean up dead WeakRef entries from the Map
        if (!cache.get(key)?.deref()) {
            cache.delete(key);
            console.log(`Cleaned up cache entry: ${key}`);
        }
    });

    return {
        set(key, value) {
            cache.set(key, new WeakRef(value));
            registry.register(value, key); // when value is GC'd, clean the key
        },
        get(key) {
            return cache.get(key)?.deref();
        },
        size() {
            return cache.size; // may include dead entries until GC runs
        }
    };
}
```

## `WeakMap` and `WeakSet` (Related Tools)

Before `WeakRef`, `WeakMap` and `WeakSet` offered weak references for specific patterns:

```javascript
// WeakMap: keys are weakly held — when key is GC'd, entry disappears
const metadata = new WeakMap();

let el = document.querySelector("#button");
metadata.set(el, { clickCount: 0, created: Date.now() });

metadata.get(el).clickCount++; // 1

el = null; // element GC'd → metadata entry automatically removed!

// WeakSet: weakly holds objects — useful for tracking "seen" objects
const seen = new WeakSet();

function processOnce(obj) {
    if (seen.has(obj)) return "Already processed";
    seen.add(obj);
    return "Processing...";
}
```

| | `Map` | `WeakMap` |
|--|-------|-----------|
| Key type | Any | Objects only |
| Prevents GC of keys | ✅ Yes | ❌ No (weak) |
| Iterable | ✅ Yes | ❌ No |
| `.size` property | ✅ Yes | ❌ No |

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| What is `WeakRef`? | A reference that doesn't prevent GC |
| What does `.deref()` return? | The object, or `undefined` if GC'd |
| When to use `WeakRef`? | Optional caches where GC should be allowed |
| What is `FinalizationRegistry`? | Runs a callback when a registered object is GC'd |
| Is GC timing deterministic? | No — never rely on it for program correctness |
| What is `WeakMap`? | Map with weakly-held keys — entries disappear with key |
| Can you iterate a `WeakMap`? | No — because entries can vanish at any time |
## Next Steps

[Back to Chapter 22](22-memory-leaks.md): Memory Leaks
[Proceed to Chapter 24](24-composition-and-pure-functions.md): Function Composition to learn about function composition.
