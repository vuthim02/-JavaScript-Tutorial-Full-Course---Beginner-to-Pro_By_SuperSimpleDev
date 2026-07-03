# Reverse Engineering JavaScript — Full Course

A bottom-up exploration of JavaScript: from values and types through V8 internals, Node.js, Express, and design patterns.

## Modules

| # | Module | Topics |
|---|--------|--------|
| 01 | [Foundations](01-foundations/README.md) | Values, variables, operators, conditionals, strings |
| 02 | [Core Concepts](02-core-concepts/README.md) | Scope, hoisting, closures, type coercion |
| 03 | [Control Flow](03-control-flow/README.md) | Boolean logic, loops, error handling |
| 04 | [Arrays & Objects](04-arrays-objects/README.md) | Array internals, object manipulation, destructuring |
| 05 | [Functions & Closures](05-functions-closures/README.md) | Declarations, closures, IIFE, recursion, callbacks |
| 06 | [Prototypes & Classes](06-prototypes-classes/README.md) | Prototype chain, `this`, classes, OOP |
| 07 | [Async JS](07-async-js/README.md) | Callbacks, promises, async/await, event loop |
| 08 | [Modules & Build](08-modules-build/README.md) | ES modules, CommonJS, bundlers |
| 09 | [Browser DOM](09-browser-dom/README.md) | DOM API, events, rendering, storage |
| 10 | [Advanced JS](10-advanced-js/README.md) | Symbols, proxies, generators, iterators |
| 11 | [Data Structures](11-data-structures/README.md) | Big-O, maps, sets, stacks, queues, trees |
| 12 | [V8 Engine](12-v8-engine/README.md) | JIT, GC, inline caching, memory leaks |
| 13 | [Node.js](13-nodejs/README.md) | Event loop, streams, buffers, process |
| 14 | [Networking](14-networking/README.md) | HTTP, REST, WebSockets, CORS |
| 15 | [Databases](15-databases/README.md) | SQL, NoSQL, indexing, transactions |
| 16 | [Express](16-express/README.md) | Middleware, routing, error handling |
| 17 | [Testing](17-testing/README.md) | Unit tests, mocks, integration |
| 18 | [TypeScript](18-typescript/README.md) | Types, interfaces, generics |
| 19 | [Design Patterns](19-design-patterns/README.md) | Singleton, factory, observer, proxy |

## Practice

Each module has companion coding exercises to test your understanding:

[exercises/README.md](exercises/README.md)

```bash
node exercises/01-foundations.js
node exercises/02-core-concepts.js
```

## Study Approach

Read each module sequentially. After each module, run the corresponding exercise file. Use the Reverse Engineering 3-Level Q&A when stuck:

1. **What does this code do?** (observable behavior)
2. **How does JavaScript make this work?** (engine / runtime mechanics)
3. **Why was it designed this way?** (trade-offs, history, intent)
