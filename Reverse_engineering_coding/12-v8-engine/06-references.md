# 06 — References

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Reference Semantics

JavaScript is **pass-by-reference** for objects (not pass-by-value).

```javascript
let a = { x: 10 };
let b = a;
```

Memory:

```
Stack

a: REF#1234 ─────────┐
b: REF#1234 ─────────┤
                     ▼
Heap: REF#1234
┌──────────────┐
│ { x: 10 }    │
└──────────────┘
```

Changing through one reference affects the other:

```javascript
b.x = 100;
console.log(a.x); // 100 — same object
```

## Assignment is Not Copy

```javascript
let a = { x: 10 };
let b = a;           // Reference copy, NOT object copy
let c = { x: 10 };   // New object, different reference

console.log(b === a); // true (same reference)
console.log(c === a); // false (different object)
```

## Null vs Undefined References

```javascript
let ref1 = null;      // Explicitly no reference
let ref2;             // undefined — not initialized
let ref3 = {};        // Valid reference
ref3 = null;          // Reference removed, object becomes collectible
```

## Reference Chain and GC Eligibility

An object becomes eligible for garbage collection when **no references** point to it from any root.

```
Roots (global, stack)
  │
  ├──► user ──► address ──► city
  │       │
  │       └── (if user = null, address and city also become collectible)
  │
  └──► config
```

### Reference Counting Mental Model

```javascript
let obj = {};       // refcount = 1 (obj)
let ref = obj;      // refcount = 2 (obj, ref)
obj = null;         // refcount = 1 (ref)
ref = null;         // refcount = 0 → eligible for GC
```

## Shallow vs Deep Copy

```javascript
const original = { a: 1, b: { c: 2 } };

const shallow = { ...original };   // b still references same object
const deep = JSON.parse(JSON.stringify(original)); // b is new object

shallow.b.c = 99;
console.log(original.b.c); // 99 — shallow copy shares nested objects
```

## Reference Chain Visualization

```javascript
let global1 = { data: "a" };           // Root: global scope
let global2 = { ref: global1 };         // Root → globa2 → global1

function process() {
    let local = { x: global1 };         // Stack → local → global1
    // global1 is referenced by: global2.ref, local.x
    // Both must lose references before global1 can be GC'd
}
```

### Unreachable Islands

```javascript
let island1 = { id: 1 };
let island2 = { id: 2, sibling: island1 };
island1.sibling = island2;

// island1 and island2 form a reference cycle
// Neither is reachable from roots if no external references exist
// Modern GC (mark-sweep) can collect these cycles
```

## Environment Records (Closure References)

```javascript
function makeCounter() {
    let count = 0;                      // Stored in closure environment

    return function() {
        return ++count;                 // References the outer environment
    };
}

const counter = makeCounter();
// The environment record { count: 0 } is retained by the closure
// It lives on the heap, not the stack, because it outlives makeCounter()
```

## Structuring Code to Avoid Reference Issues

```javascript
// Avoid: circular references that confuse manual reasoning
// OK: GC handles cycles, but they complicate mental models

// Prefer: clear ownership
function createUser(name) {
    const user = { name };
    const cleanup = () => { user.name = null; };
    return { user, cleanup };
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is object copied on assignment? | No, only reference is copied |
| Can two variables point to same object? | Yes |
| Does `b = a` create a new object? | No |
| When does an object become collectible? | When no references remain from roots |
| What's the difference between null and undefined? | `null` is explicitly assigned; `undefined` means not initialized |
| Can GC handle circular references? | Yes, mark-sweep can detect unreachable cycles |
## Next Steps

[Back to Chapter 5](05-stack-heap-memory.md): 05 — Stack & Heap Memory
[Proceed to Chapter 7](07-garbage-collection-basics.md): 07 — Garbage Collection Basics to learn about 07 — garbage collection basics.
