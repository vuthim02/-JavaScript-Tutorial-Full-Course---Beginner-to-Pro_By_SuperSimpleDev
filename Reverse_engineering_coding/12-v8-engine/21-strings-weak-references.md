# 21 — String Interning & Weak References

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## String Interning

### Implicit Interning

V8 automatically interns identical string literals:

```javascript
let a = "hello";
let b = "hello";

// Both point to the same memory location
// This is safe because strings are immutable
```

### How Interning Works

```
String Table (internal)
┌──────────────────────┐
│ "hello" ── refcount 3│
│ "world" ── refcount 1│
│ "foo" ──── refcount 2│
└──────────────────────┘

Variables:
a ───┐
b ───┤
c ───┘── all point to same "hello"
```

### When Interning Helps

```javascript
// Dynamic strings are NOT automatically interned
function getKey(name) {
    return `user:${name}`;  // New string each call
}

// But repeated object keys benefit from internal interning
const obj = {};
for (let i = 0; i < 10000; i++) {
    obj[`key${i}`] = i;  // Property keys may be interned
}
```

### String Comparison Performance

Interned strings can be compared by reference (pointer equality) rather than character-by-character:

```javascript
// Both strings are literals → interned → O(1) pointer comparison
if (str === "hello") { /* fast when str is interned */ }
```

## Weak References

### WeakMap and WeakSet

### The Problem

```javascript
const metadata = new Map();

function processElement(el) {
    metadata.set(el, { processed: true });
    // Later, el is removed from DOM
    // But metadata still holds reference
    // el can never be GC'd → memory leak
}
```

### The Solution: WeakMap

```javascript
const metadata = new WeakMap();

function processElement(el) {
    metadata.set(el, { processed: true });
    // When el is removed from DOM and all other references are gone
    // The WeakMap entry is automatically removed
    // el can be GC'd
}
```

### WeakMap vs Map

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any | Objects only |
| Prevents GC of keys | Yes | No |
| Iterable | Yes | No |
| `.size` available | Yes | No |
| Use case | General caching | Metadata, private data, DOM nodes |

### WeakRef (ES2021)

```javascript
// WeakRef — hold a weak reference to an object
let obj = { data: "large" };
const weakRef = new WeakRef(obj);

// Later (obj may have been GC'd)
const deref = weakRef.deref();
if (deref) {
    console.log('Object still alive:', deref.data);
} else {
    console.log('Object was collected');
}

obj = null; // Now the object can be GC'd
```

### FinalizationRegistry

```javascript
// Run cleanup when an object is GC'd
const registry = new FinalizationRegistry((heldValue) => {
    console.log(`Object with ID ${heldValue} was collected`);
});

let obj = { data: "test" };
registry.register(obj, "obj123");

obj = null; // When GC runs, callback fires
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are identical strings duplicated? | Check if they're literals (interned) or dynamically created |
| Can string building be optimized? | `template strings` vs `+` vs `join` |
| Is object used as a key? | Consider WeakMap if object may be removed |
| Need automatic cleanup on GC? | WeakMap, WeakRef, FinalizationRegistry |
## Next Steps

[Back to Chapter 20](20-immutability-object-pooling.md): 20 — Immutability & Object Pooling
[Proceed to Chapter 22](22-tactical-questions.md): 22 — Reverse Engineering Tactical Questions, Senior Process & Projects to learn about 22 — reverse engineering tactical questions, senior process & projects.
