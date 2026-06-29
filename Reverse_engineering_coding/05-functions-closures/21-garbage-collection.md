# Garbage Collection

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Core Concept: Reachability

The GC doesn't ask "Is this still needed?" It asks "**Is this still reachable?**"

If an object can be reached from a **root** through any chain of references, it is kept alive. Roots include:
- Global variables
- Currently executing functions' local variables
- Variables on the call stack
- Active closures

```javascript
let obj = { name: "Alice" }; // reachable from global root
obj = null;                   // reference removed → object unreachable → GC eligible
```

## Mark-and-Sweep (The Algorithm)

```
Phase 1 — MARK:
  Start from roots (global, call stack, closures)
  Traverse ALL reachable objects recursively
  Mark each visited object as "alive"

Phase 2 — SWEEP:
  Walk through all heap memory
  Objects NOT marked → reclaim their memory
  Reset marks for next cycle

Repeat continuously in the background
```

## Generational Collection (V8's Approach)

```
New Object
    │
    ▼
Young Generation (Nursery)
  ← small, collected frequently (milliseconds)
  ← most objects die here ("infant mortality")
    │
    │ survived multiple collections?
    ▼
Old Generation
  ← larger, collected infrequently
  ← objects that have "proven" they need to live longer
```

## Closures and the GC

```javascript
function createClosure() {
    let alive = "I stay alive"; // referenced by returned fn
    let dead  = "I can be GC'd"; // NOT referenced by any returned fn

    return function() {
        return alive; // only `alive` is captured
    };
}

const fn = createClosure();
// `alive` is retained in memory as long as `fn` exists
// `dead` can be GC'd immediately (modern engines are smart enough)
fn = null; // now `alive` is also GC eligible
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Is this object reachable from a root? | Trace all reference chains back to global, stack, or closures. |
| What counts as a root? | Global variables, executing functions' locals, call stack variables, active closures. |
| Why is this object still in memory? | Something holds a reference — find it by tracing references. |
| Can I force garbage collection? | No — but you can remove all references (`obj = null`) to make it eligible. |
| How does mark-and-sweep work? | Mark all reachable objects from roots, then sweep unmarked. |
| How does generational GC help? | New objects are collected frequently (most die young); survivors are moved to old generation. |
## Next Steps

[Back to Chapter 20](20-generators-advanced.md): Generators — Advanced Topics
[Proceed to Chapter 22](22-memory-leaks.md): Memory Leaks to learn about memory leaks.
