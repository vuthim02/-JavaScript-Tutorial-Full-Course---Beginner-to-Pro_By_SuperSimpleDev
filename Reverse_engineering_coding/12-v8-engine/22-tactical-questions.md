# 22 — Reverse Engineering Tactical Questions, Senior Process & Projects

## Tactical Questions

Whenever reading performance-sensitive code, ask these questions:

| # | Question | Focus |
|---|----------|-------|
| 1 | **Stack or Heap?** | Determine where each value lives |
| 2 | **Which objects are allocated?** | Every `new`, `{}`, `[]`, `() =>`, `function()` creates heap allocation |
| 3 | **Who owns references?** | Walk the reference chain. Every reference keeps the object alive |
| 4 | **Which references prevent GC?** | Global variables, closures, caches, event listeners, timers |
| 5 | **Can memory leak occur?** | Check: globals, timers, listeners, closures, caches, detached DOM |
| 6 | **Are hidden classes stable?** | Same shape + same order → stable. Adding/deleting → unstable |
| 7 | **Are parameter types consistent?** | Same types every call → JIT optimizes. Mixed → deopt |
| 8 | **Can JIT optimize this?** | Stable types + single shape + hot code → yes |
| 9 | **Could deoptimization happen?** | Type changes, shape changes, try/catch in hot code |
| 10 | **CPU bottleneck?** | Performance tab → Scripting. Nested loops, repeated computation |
| 11 | **Memory bottleneck?** | Memory tab → Heap size + GC frequency |
| 12 | **Network bottleneck?** | Network tab → waterfall, payload size, caching |
| 13 | **DOM bottleneck?** | Performance tab → Rendering + Painting. Forced reflow |
| 14 | **Can caching help?** | Repeated computations or API responses → cache |
| 15 | **Can memoization help?** | Pure functions with repeated inputs → memoize |
| 16 | **Can concurrency help?** | Independent work → Web Workers |
| 17 | **Can complexity be reduced?** | O(n²) → O(n log n) → O(n) → O(1) |
| 18 | **Is object creation excessive?** | High allocation rate → pool or reuse |
| 19 | **Is GC expensive?** | Frequent yellow bars → reduce allocation, use pools |
| 20 | **Which operation happens millions of times?** | That's where to optimize |

## Senior Reverse Coding Tactical Process

When seeing a loop:

```javascript
for (let i = 0; i < something; i++) {
    // Loop body
}
```

Ask:

1. **How many iterations?** 10? 1000? 1,000,000? Scale matters.
2. **Time complexity?** O(n), O(n log n), O(n²)? Nested loops inside?
3. **Can hashing replace loops?** Set lookups, Map lookups — O(1) vs O(n).
4. **Can sorting help?** Binary search O(log n) vs linear scan O(n).
5. **Can memoization help?** Are inputs repeated? Cache results.
6. **Can lazy evaluation help?** Compute only when needed, not all at once.
7. **Can work be parallelized?** Split work into chunks, use Web Workers.
8. **Will object allocation explode?** New objects per iteration? Array push inside loop?
9. **Will GC pressure increase?** Many short-lived objects → frequent young GC.
10. **Can engine optimize this?** Stable types + monomorphic shapes + simple loop body → JIT compiles.

## Projects

### 1. Custom LRU Cache

Implement an LRU cache with O(1) get/set using `Map`.

- `get(key)` — returns value, marks as recently used.
- `set(key, value)` — inserts, evicts LRU if at capacity.
- `delete(key)` — removes entry.
- `clear()` — empties cache.
- Bonus: add TTL (time-to-live) expiration.

### 2. Memoization Library

Build a generalized `memoize` function.

- Support for custom key resolver (not just `JSON.stringify`).
- Configurable cache size limit (LRU eviction).
- Support for async functions (cache before promise resolves).
- Debug mode: log cache hits/misses.
- `memoize.clear(fn)` to clear a specific function's cache.

### 3. Object Pool System

Build a generic object pool.

- `Pool.create(factory, reset, initialSize)`.
- `pool.acquire(...args)` — get object from pool or create new.
- `pool.release(obj)` — return object to pool.
- Track pool hits/misses for profiling.
- Auto-grow pool if exhausted.
- Auto-shrink pool if too many idle objects.

### 4. Performance Benchmark Tool

Build a mini benchmarking framework.

- `bench(name, fn, iterations)` — runs fn N times, reports avg/median/min/max.
- Compare two functions: `benchCompare(fn1, fn2, iterations)`.
- Warmup phase before measurement.
- GC measurement (`performance.memory?.usedJSHeapSize`).
- Output formatted results to console.

### 5. Web Worker Image Processor

Build an image processing system using Web Workers.

- Load an image into a canvas.
- Spawn N workers based on CPU core count.
- Split image into horizontal strips.
- Each worker applies a filter (grayscale, blur, edge detection) on its strip.
- Main thread reassembles strips.
- Compare performance with single-threaded version.

### 6. Heap Snapshot Analyzer

Build a tool that analyzes Chrome DevTools heap snapshots.

- Parse snapshot JSON format (`.heapsnapshot` files).
- Report: total heap size, top 10 largest objects, detached DOM nodes, common constructors, retained size by root path.

### 7. Mini Garbage Collector Simulator

Build a visual simulator demonstrating GC concepts.

- Stack, heap, roots representations.
- Mark phase highlights reachable objects (green).
- Sweep phase removes unreachable (red).
- Generational movement: young → old.
- Fragmentation and compaction display.
- Step through GC cycle manually.

### 8. Hidden Class Demonstrator

Build a tool showing hidden class changes.

- Create objects with different property orders.
- Show when objects share the same shape (same color/group).
- Show transition when a property is added.
- Show deoptimization when mixing shapes at a call site.
- Benchmark property access speed per scenario.

### 9. Event Loop Visualizer

Build a visualizer showing the event loop cycle.

- Macrotask queue (setTimeout, events, I/O).
- Microtask queue (Promise.then, queueMicrotask, MutationObserver).
- Render step.
- Animate through trace: Execute macrotask → Drain microtasks → Render → Next macrotask.
- Demonstrate starvation (infinite microtask loop blocks macrotasks).

### 10. Memory Leak Detector

Build a tool that detects common memory leak patterns.

- Detect accidental globals (no `let`/`const`/`var`).
- Detect forgotten timer IDs.
- Detect detached DOM nodes (nodes with `isConnected === false` but referenced in JS).
- Detect growing caches without size limits.
- Detect closure-retained large arrays.
- Output report with leak location, retained size, and fix suggestion.
## Next Steps

[Back to Chapter 21](21-strings-weak-references.md): 21 — String Interning & Weak References
[Proceed to Module 13](../13-nodejs/README.md): Node.js Ecosystem, Runtime Internals, Streams, Buffers, Processes to learn about the Node.js runtime and server-side JavaScript.
