# 07 — Garbage Collection Basics

## Why Garbage Collection Exists

### The Problem

Without garbage collection, every `new` or `{}` allocation would permanently consume memory.

```javascript
function createTemp() {
    let temp = { data: new Array(10000) };
    return temp.value;   // oops, meant temp.data
    // temp object is now unreachable — leak
}
```

### What GC Does

- Tracks allocated memory.
- Identifies objects no longer reachable.
- Frees their memory.
- Returns freed memory to the pool.

### Automatic vs Manual

| Language | Memory Management |
|----------|------------------|
| JavaScript | Automatic (GC) |
| C / C++ | Manual (`malloc`/`free`) |
| Rust | Ownership model (compile-time) |
| Java | Automatic (GC) |
| Go | Automatic (GC) |

## Mark and Sweep

V8 uses a **mark-and-sweep** garbage collector as its primary algorithm.

### Phase 1: Mark

Starting from **roots** (global object, stack variables, registers), the GC traverses all references and **marks** every reachable object.

```
Roots (global, stack)
  │
  ├──► user ──► address ──► city
  │
  └──► config
```

### Phase 2: Sweep

The GC iterates the heap. Unmarked objects are freed.

```
Before sweep:
Heap: [objA(marked), objB(unmarked), objC(marked), objD(unmarked)]

After sweep:
Heap: [objA(marked), objC(marked), free_space, free_space]
```

### Example

```javascript
let user = { name: "Alice" };
let temp = { data: "temporary" };

user = null;  // user object still referenced? No. Collectible.
              // temp object still referenced? No. Collectible.
```

After reassignment, both objects have no references. Next GC mark phase won't reach them. Sweep phase reclaims their memory.

## Tri-Color Abstraction

V8 (and most modern GCs) uses a **tri-color marking** algorithm:

| Color | Meaning |
|-------|---------|
| **White** | Unvisited (potentially garbage) |
| **Gray** | Visited, children not yet processed |
| **Black** | Visited, all children processed |

After marking: white objects are garbage.

```
Start:   All objects are White
Mark:    Roots become Gray
Process: Gray → scan children, mark them Gray, turn current Black
End:     All reachable = Black, unreachable = White (sweep these)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who still references this object? | Determines if GC-eligible |
| After function exits, what happens? | Local variables out of scope, objects may become collectible |
| Can I force GC? | Not in JS (`gc()` exists in Node with `--expose-gc` but not standard) |
| What are roots? | Global object, stack variables, registers |
| What colors are used? | White (unvisited), Gray (in-progress), Black (done) |
| What phase removes objects? | Sweep |
## Next Steps

[Back to Chapter 6](06-references.md): 06 — References
[Proceed to Chapter 8](08-generational-gc.md): 08 — Generational Garbage Collection to learn about 08 — generational garbage collection.
