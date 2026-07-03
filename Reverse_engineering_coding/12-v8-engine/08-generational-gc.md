# 08 — Generational Garbage Collection

## The Generational Hypothesis

**"Most objects die young."**

Empirical observation: in most programs, the majority of allocated objects become unreachable very quickly. V8 exploits this by dividing the heap into **generations**.

| Generation | Size | GC Frequency | Contents |
|------------|------|-------------|----------|
| **Young (Nursery)** | ~1-8 MB | Frequent | Newly allocated objects |
| **Old** | Large | Infrequent | Objects surviving multiple GCs |

## Young Generation (Scavenge)

```javascript
function process() {
    let a = { temp: true };   // Young generation
    let b = { temp: true };   // Young generation
    // Do work...
}   // a, b go out of scope → collected in next young GC
```

Young GC (called **Scavenge**) uses Cheney's algorithm — a **semi-space copy collector**:

```
Young Space (before GC):
┌──────────────────────┬──────────────────────┐
│   From-space         │   To-space           │
│   [obj1] [obj2]      │   [empty]            │
│   [obj3]             │                      │
└──────────────────────┴──────────────────────┘

Young Space (after GC — survivors copied to To-space, then swap):
┌──────────────────────┬──────────────────────┐
│   To-space (new From)│   From-space (new To)│
│   [obj1] (survived)  │   [empty]            │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

### How Scavenge Works

1. Live objects in **From-space** are traced.
2. Survivors are copied to **To-space** (compacting them in the process).
3. From-space is cleared (becomes new To-space).
4. To-space becomes new From-space.
5. Pointer swap — allocation resumes in the new From-space.

## Promotion to Old Generation

If an object survives multiple young GCs (typically 2), it gets **promoted** to the old generation.

```javascript
let cache = {};           // Young initially
cache.data = "important"; // Still referenced after multiple GCs
                          // Promoted to old generation
```

Promotion criteria:
- Object survives N young collections (default: 2).
- Object is large enough that copying is expensive.
- To-space is nearly full (early promotion to avoid overflow).

## Old Generation (Mark-Sweep-Compact)

- **Mark-Sweep**: As described in the GC basics chapter.
- **Mark-Compact**: Defragments memory by moving objects together, reducing fragmentation.

### Compaction

```
Before compaction:
[objA] [free] [objB] [free] [free] [objC]

After compaction:
[objA] [objB] [objC] [free space (contiguous)]
```

## Orinoco (V8's GC Implementation)

V8's GC is codenamed **Orinoco**. It implements:

| Technique | Benefit |
|-----------|---------|
| **Parallel marking** | Multiple threads mark concurrently |
| **Concurrent sweeping** | Sweep runs while JS executes |
| **Incremental marking** | Break GC work into small chunks between JS execution |
| **Idle-time GC** | Run GC during browser idle periods |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Short-lived object? | Young generation |
| Long-lived cache? | Old generation |
| Why separate generations? | Most objects die young; GC can focus on small young space |
| What is promotion? | Moving survivor from young to old |
| What is Scavenge? | Young generation copy collector (Cheney's algorithm) |
| What is Orinoco? | V8's parallel/concurrent GC implementation |
## Next Steps

[Back to Chapter 7](07-garbage-collection-basics.md): 07 — Garbage Collection Basics
[Proceed to Chapter 9](09-memory-leaks-globals-timers-dom.md): 09 — Memory Leaks: Globals, Timers & Detached DOM to learn about 09 — memory leaks: globals, timers & detached dom.
