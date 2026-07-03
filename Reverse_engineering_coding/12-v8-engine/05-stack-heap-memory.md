# 05 — Stack & Heap Memory

## Stack Memory

### Characteristics

| Property | Detail |
|----------|--------|
| **Size** | Small (~1-8 MB per thread) |
| **Speed** | Very fast (push/pop) |
| **Lifetime** | Automatic (function scope) |
| **Stores** | Primitives, references, call frames |

### What Lives on the Stack

```javascript
let age = 20;           // Primitive → stack
let name = "Alice";     // Primitive (string) → stack or interned
let active = true;      // Primitive → stack
let user = {};          // Reference (pointer) → stack, object → heap
```

Memory layout:

```
Stack (high to low address)
┌─────────────────────┐
│  Call Frame: test()  │
│  ├── age: 20        │
│  ├── name: "Alice"  │
│  └── user: ref ────┐│
├─────────────────────┤│
│  Call Frame: main()  ││
│  └── ...            ││
└─────────────────────┘│
                       │
Heap                   │
┌───────────────────┐  │
│ { name: "Alice" }  ◄─┘
└───────────────────┘
```

### Stack Overflow

```javascript
function recurse() {
    recurse();
}
recurse();
// RangeError: Maximum call stack size exceeded
```

Each recursive call pushes a new frame. When the stack limit is reached, the engine throws.

## Heap Memory

### Characteristics

| Property | Detail |
|----------|--------|
| **Size** | Large (GBs, limited by RAM) |
| **Speed** | Slower (allocation + GC) |
| **Lifetime** | Manual/automatic (GC) |
| **Stores** | Objects, arrays, closures, functions |

### What Lives on the Heap

```javascript
let user = { name: "John" };           // Object → heap
let items = [1, 2, 3];                 // Array → heap
let greet = function() { return "hi"; }; // Function → heap
let bigData = new Array(1000000);       // Large array → heap
```

Memory diagram:

```
Stack
┌──────────────┐
│ user: ref ─────┐
│ items: ref ───┐│
│ greet: ref ──┐││
└──────────────┘│││
                │││
Heap            │││
┌───────────────┘││
│  Object        ││
│  └── name: "John"│
│                ││
│  Array         ◄┘│
│  └── [1, 2, 3]  │
│                 │
│  Function      ◄┘
│  └── body: return "hi"
└─────────────────┘
```

### Key Distinction

| Value | Storage |
|-------|---------|
| Primitive (`number`, `boolean`, `undefined`, `null`) | Stack |
| String (primitive) | Stack or interned |
| Object `{}` | Heap (reference on stack) |
| Array `[]` | Heap (reference on stack) |
| Function | Heap (reference on stack) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What lives on the stack? | Primitives, references, call frames |
| Is `let x = 5` on stack? | Yes (primitive) |
| Is `let x = {}` on stack? | The reference is on stack; the object is on heap |
| What happens on stack overflow? | RangeError thrown |
| What lives on the heap? | Objects, arrays, closures, functions |
| Is `[1, 2, 3]` on heap? | Yes, array is an object |
## Next Steps

[Back to Chapter 4](04-jit-compiler.md): 04 — TurboFan JIT Compiler
[Proceed to Chapter 6](06-references.md): 06 — References to learn about 06 — references.
