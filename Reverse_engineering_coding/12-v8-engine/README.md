# Part 12 — V8 Engine Internals, Memory Management, JIT, Garbage Collection & Performance

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Chapter Files

| # | File | Topics Covered |
|---|------|----------------|
| 01 | [01-v8-architecture.md](01-v8-architecture.md) | Overall pipeline: source → parser → AST → interpreter → bytecode → JIT → machine code |
| 02 | [02-parser-ast.md](02-parser-ast.md) | Parsing modes (eager/lazy), tokenization, Abstract Syntax Tree, AST tools |
| 03 | [03-interpreter-bytecode.md](03-interpreter-bytecode.md) | Ignition interpreter, bytecode format, execution speed hierarchy |
| 04 | [04-jit-compiler.md](04-jit-compiler.md) | TurboFan JIT, hot code detection, compilation pipeline, performance impact |
| 05 | [05-stack-heap-memory.md](05-stack-heap-memory.md) | Stack memory, heap memory, call frames, stack overflow |
| 06 | [06-references.md](06-references.md) | Reference semantics, assignment behavior, null vs undefined |
| 07 | [07-garbage-collection-basics.md](07-garbage-collection-basics.md) | Why GC exists, automatic vs manual, mark-and-sweep, tri-color abstraction |
| 08 | [08-generational-gc.md](08-generational-gc.md) | Generational hypothesis, young/nursery, old generation, scavenge, promotion |
| 09 | [09-memory-leaks-globals-timers-dom.md](09-memory-leaks-globals-timers-dom.md) | Accidental globals, forgotten timers, detached DOM nodes |
| 10 | [10-memory-leaks-closures-caches.md](10-memory-leaks-closures-caches.md) | Closure-retained data, unbounded cache growth, LRU cache |
| 11 | [11-hidden-classes.md](11-hidden-classes.md) | Hidden classes (shapes), shared hidden classes, property lookup optimization |
| 12 | [12-hidden-class-transitions.md](12-hidden-class-transitions.md) | Adding/deleting properties, transition trees, deopt on delete |
| 13 | [13-inline-caching.md](13-inline-caching.md) | IC mechanism, monomorphic vs polymorphic vs megamorphic |
| 14 | [14-deoptimization.md](14-deoptimization.md) | Deoptimization cycle, type instability, common triggers table |
| 15 | [15-performance-patterns-i.md](15-performance-patterns-i.md) | Nested loops → hash map, memoization, lazy evaluation |
| 16 | [16-performance-patterns-ii.md](16-performance-patterns-ii.md) | Batch DOM updates, debounce, throttle, requestAnimationFrame |
| 17 | [17-web-workers.md](17-web-workers.md) | Web Workers, SharedArrayBuffer, Atomics |
| 18 | [18-event-loop.md](18-event-loop.md) | Microtask vs macrotask priorities, starvation prevention |
| 19 | [19-profiling.md](19-profiling.md) | Chrome DevTools Performance/Memory tabs, Node.js profiling, bottleneck identification |
| 20 | [20-immutability-object-pooling.md](20-immutability-object-pooling.md) | Immutability benefits, Immer, object pool pattern, GC pressure reduction |
| 21 | [21-strings-weak-references.md](21-strings-weak-references.md) | String interning, WeakMap vs Map, WeakRef, FinalizationRegistry |
| 22 | [22-tactical-questions.md](22-tactical-questions.md) | Reverse engineering Q&A, senior process, projects |

## Next Steps

[Back to Module 11](../11-data-structures/README.md): Data Structures, Algorithms, Big-O Analysis

[Proceed to Module 13](../13-nodejs/README.md): Node.js Ecosystem, Runtime Internals, Streams, Buffers, Processes to learn about the Node.js runtime and server-side JavaScript.
