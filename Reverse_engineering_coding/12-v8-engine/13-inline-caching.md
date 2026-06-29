# 13 — Inline Caching (IC)

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem

```javascript
function getName(user) {
    return user.name;
}
```

Without optimization, every call would:
1. Look up `name` in the object.
2. Walk the hidden class.
3. Find the offset.
4. Read the value.

## The Optimization

After `getName` executes a few times, V8 records the hidden class of `user` and the offset of `name`. Next calls skip the lookup entirely.

```
Call 1: Lookup "name" → offset 0 (slow)
Call 2: Lookup "name" → offset 0 (slow)
Call 3: Cache: HC1.name @ offset 0
Call 4: Check hidden class == HC1? Yes → read offset 0 directly (fast)
Call 5: Check hidden class == HC1? Yes → read offset 0 directly (fast)
```

## Monomorphic vs Polymorphic vs Megamorphic

| State | Hidden Classes Seen | Performance |
|-------|-------------------|-------------|
| **Monomorphic** | 1 | Fastest (direct offset) |
| **Polymorphic** | 2-4 | Fast (check multiple, then offset) |
| **Megamorphic** | 5+ | Slow (full dictionary lookup) |

## Example

```javascript
// Monomorphic — all same shape
getName({ name: "A" });  // HC1
getName({ name: "B" });  // HC1
getName({ name: "C" });  // HC1

// Polymorphic — different shapes
getName({ name: "A" });       // HC1
getName({ name: "B", id: 1 }); // HC2

// Megamorphic — many shapes
getName({ name: "A" });
getName({ name: "B", id: 1 });
getName({ name: "C", role: "admin" });
getName({ name: "D", age: 30 });
getName({ name: "E", score: 100 });
```

## Why Monomorphic is Fastest

```javascript
// Monomorphic IC — generates code like:
if (obj.hiddenClass == expectedHC) {
    return obj[offsetOfName];  // single memory read
}

// Polymorphic IC — generates code like:
if (obj.hiddenClass == HC1) {
    return obj[offset1];
} else if (obj.hiddenClass == HC2) {
    return obj[offset2];
}
// More checks = slower

// Megamorphic IC — falls back to:
return obj["name"];  // full hash table lookup
```

## IC in the Compiler Pipeline

```
Ignition runs bytecode
  → creates IC slots for each property/keyed access
  → records hidden class + offset on each hit
  ↓
TurboFan compiles optimized code
  → reads IC data
  → emits type-specific fast paths with guards
  ↓
Machine code checks HC then reads at known offset
```

## IC for Keyed Access (Bracket Notation)

IC also applies to bracket notation `obj[key]`:

```javascript
function getValue(obj, key) {
    return obj[key];  // Keyed load — IC caches (hidden class, key)
}
```

For keyed access, V8 maintains an IC that records:
- The hidden class of `obj`.
- The value of `key`.
- The resulting offset.

When the same (`hidden class`, `key`) pair repeats, IC skips the lookup.

## Array IC: Element Kinds

```javascript
function getFirst(arr) {
    return arr[0];  // IC caches element kind
}

getFirst([1, 2, 3]);          // PACKED_SMI → fast
getFirst([1.5, 2.5]);         // PACKED_DOUBLE → medium
getFirst([1, "two", true]);   // PACKED_ELEMENTS → slow
```

Each element kind transition degrades performance:
```
PACKED_SMI → PACKED_DOUBLE → PACKED_ELEMENTS → DICTIONARY
(fastest)                                           (slowest)
```

## IC Lifetime and Feedback Vectors

Ignition maintains a **Feedback Vector** for each function, containing IC slots:

```
Function: getName
┌──────────────────────────┐
│ Feedback Vector           │
│ ┌────────┐               │
│ │ Slot 0 │ IC for      │
│ │        │ user.name   │
│ │ HC: 5  │ offset: 0   │
│ └────────┘               │
│ ┌────────┐               │
│ │ Slot 1 │ IC for      │
│ │        │ user.age    │
│ │ HC: 5  │ offset: 8   │
│ └────────┘               │
└──────────────────────────┘
```

TurboFan reads this feedback when compiling the function, allowing it to emit optimized code speculatively.

### When IC Is Cleared

- When the engine performs a full GC.
- When a function is deoptimized.
- When IC transitions from monomorphic → polymorphic.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is property access predictable? | Monomorphic → fast, megamorphic → slow |
| How many shapes flow through this function? | 1 = fast, 2-4 = okay, 5+ = slow |
| What ruins IC? | Different-shaped objects at same call site |
| What is megamorphic? | 5+ different hidden classes at one call site |
| Does IC apply to array indexing? | Yes, same concept for element kinds |
| Where does IC data live? | Feedback Vector attached to each function |
| What clears IC? | GC, deoptimization, mode transition |
## Next Steps

[Back to Chapter 12](12-hidden-class-transitions.md): 12 — Hidden Class Transitions
[Proceed to Chapter 14](14-deoptimization.md): 14 — Deoptimization to learn about 14 — deoptimization.
