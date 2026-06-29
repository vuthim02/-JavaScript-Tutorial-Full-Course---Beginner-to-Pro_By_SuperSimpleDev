# 11 — Hidden Classes (Shapes)

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Are Hidden Classes?

V8 assigns a **hidden class** (also called **Map** or **Shape**) to every object. The hidden class describes the object's **property layout** — it maps property names to memory offsets.

```javascript
let user = {
    name: "John",
    age: 25
};
```

V8 internally:

```
HiddenClass HC1
├── property: "name", offset: 0
└── property: "age",  offset: 8

Object user:
├── HiddenClass → HC1
├── name: "John"
└── age: 25
```

## Shared Hidden Classes

Objects with the same property structure (same properties in the same order) share the same hidden class.

```javascript
let user1 = { name: "John", age: 25 };
let user2 = { name: "Jane", age: 30 };

// Both share the same HiddenClass HC1
```

```
HC1 ←── user1
       └── user2
```

This enables extremely fast property access because the engine knows the exact offset.

## Property Lookup Without Hidden Classes (Naive)

```
1. Look up "name" in object's properties
2. If not found, check prototype
3. If not found, check prototype's prototype
4. ...
```

This is slow — requires string comparison for each property name.

## Property Lookup With Hidden Classes

```
1. Read object's HiddenClass
2. Look up "name" offset from HiddenClass
3. Read memory at that offset directly
```

Skip prototype chain traversal for own properties. The offset lookup is a single integer index into the object's memory.

## Why Hidden Classes Matter for JIT

When TurboFan compiles a function, it records the hidden class of objects at each access site. The compiled machine code looks like:

```javascript
// High-level pseudocode of generated machine code
if (obj.hiddenClass == HC1) {
    return obj[offsetOfName];  // single memory load
}
```

This check is extremely cheap (one integer comparison) and the branch is highly predictable.

## Hidden Classes Prevent Hash Table Lookups

Without hidden classes, objects would need a dictionary (hash table) mapping property names to values. This is what happens when hidden classes are **broken** (e.g., via `delete` or adding properties out of order). Dictionary mode is 10-100x slower.

## Hidden Classes Enable Monomorphic ICs

Hidden classes are the foundation of **Inline Caching** (IC). When the JIT compiler sees:

```javascript
function getName(obj) {
    return obj.name;
}
```

It records the hidden class of `obj` on every call. If all calls use the same hidden class (monomorphic), the JIT emits:

```javascript
// Conceptual compiled code
if (obj.hiddenClass === expectedHC) {
    return *(obj + offsetOfName);  // Single memory load
}
```

If objects have different hidden classes, this optimization breaks.

## Hidden Class Internals: Descriptor Arrays

Each hidden class has a **descriptor array** mapping property names to details:

```
HiddenClass HC1 {
    descriptors: [
        { key: "name", value: Field(0) },  // stored at offset 0
        { key: "age",  value: Field(8) },  // stored at offset 8
    ],
    backpointer: null,           // points to previous HC in transition chain
    prototype: User.prototype,   // prototype link
}
```

The engine uses the descriptor array to resolve property accesses to concrete memory offsets in O(1) time.

## Element Kinds for Arrays

V8 also tracks array **element kinds** — analogous to hidden classes for arrays:

```javascript
const arr1 = [1, 2, 3];            // PACKED_SMI_ELEMENTS (fastest)
const arr2 = [1.5, 2.5];           // PACKED_DOUBLE_ELEMENTS
const arr3 = [1, "two", true];     // PACKED_ELEMENTS (generic)
```

Adding a different-type value degrades the element kind and slows array operations.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Do objects share the same shape? | If properties added in same order → yes |
| What is a hidden class? | Internal structure describing property layout |
| Why does it help? | Direct memory offset instead of property name lookup |
| What happens without hidden classes? | Fallback to dictionary (hash table) mode — much slower |
| What are element kinds? | Array type metadata (PACKED_SMI, PACKED_DOUBLE, etc.) |
| How does IC use hidden classes? | Records expected HC → single guard check |
## Next Steps

[Back to Chapter 10](10-memory-leaks-closures-caches.md): 10 — Memory Leaks: Closures & Cache Growth
[Proceed to Chapter 12](12-hidden-class-transitions.md): 12 — Hidden Class Transitions to learn about 12 — hidden class transitions.
