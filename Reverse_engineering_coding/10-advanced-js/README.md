# Part 10 — Advanced JavaScript

## Overview

This section covers deep JavaScript capabilities: Symbols, Iterators, Generators, Maps, Sets, WeakMaps, WeakSets, Property Descriptors, Proxies, Reflect, BigInt, RegExp, Internationalization API, Meta-programming, Memory Internals, and modern ES2022–ES2024 features.

---

## File Index

| # | File | Topic |
|---|------|-------|
| 01 | [01-symbols.md](01-symbols.md) | Symbol basics, uniqueness, property keys, enumerability |
| 02 | [02-well-known-global-symbols.md](02-well-known-global-symbols.md) | Well-known symbols (Symbol.iterator, toStringTag, etc.), Symbol.for(), global registry |
| 03 | [03-iterator-protocol.md](03-iterator-protocol.md) | Iterator protocol, next(), done, built-in iterables |
| 04 | [04-for-of-manual.md](04-for-of-manual.md) | Manual iteration, spread, Array.from, destructuring, for...of internals |
| 05 | [05-custom-iterators.md](05-custom-iterators.md) | Custom iterators, Symbol.iterator, return() cleanup, Range example |
| 06 | [06-generators.md](06-generators.md) | function*, generator objects, execution state, iterability |
| 07 | [07-yield.md](07-yield.md) | yield pause/resume, two-way communication, yield* delegation, return, throw |
| 08 | [08-map.md](08-map.md) | Map vs Object, methods, serialization, key types, NaN handling |
| 09 | [09-set.md](09-set.md) | Set, unique values, deduplication, set operations (union, intersection, difference) |
| 10 | [10-weakmap-weakset.md](10-weakmap-weakset.md) | WeakMap, WeakSet, garbage collection, private data, caching, DOM metadata |
| 11 | [12-freeze-seal.md](12-freeze-seal.md) | Object.freeze, Object.seal, Object.preventExtensions, comparison |
| 12 | [14-bigint.md](14-bigint.md) | BigInt, large integers, operations, mixing with Number |
| 13 | [15-regexp.md](15-regexp.md) | Regular expressions, patterns, flags, groups, lookahead/lookbehind |
| 14 | [16-tagged-templates.md](16-tagged-templates.md) | Tagged template literals, safe HTML, CSS-in-JS |
| 15 | [17-intl.md](17-intl.md) | Intl API, number/date formatting, relative time, collation |
| 16 | [18-proxy.md](18-proxy.md) | Proxy traps (get, set, has, deleteProperty, apply, construct), revocable |
| 17 | [19-reflect.md](19-reflect.md) | Reflect API, default behavior in Proxy handlers, Reflect.ownKeys |
| 18 | [20-metaprogramming.md](20-metaprogramming.md) | Meta-programming patterns, Proxy, descriptors, framework usage |
| 19 | [21-memory-behavior.md](21-memory-behavior.md) | Heap vs stack, GC, closures, memory leaks, detection |
| 20 | [22-es2022-es2023.md](22-es2022-es2023.md) | ES2022: Array.at(), Object.hasOwn(), Error.cause, class fields, top-level await; ES2023: findLast, hashbang, Symbol WeakMap keys |
| 21 | [23-es2024.md](23-es2024.md) | ES2024: Promise.withResolvers(), Object.groupBy, Atomics.waitAsync, RegExp v flag; Summary table |
| 22 | [24-reveng-checklist.md](24-reveng-checklist.md) | Senior reverse engineering checklist, Part 10 summary table |
| 23 | [25-es2025-es2026.md](25-es2025-es2026.md) | ES2025/2026: Iterator Helpers (lazy map/filter/take), Pattern Matching, Records & Tuples, Promise.try, Temporal, Decorators, Set methods, RegExp.escape, Float16Array, JSON Modules |

---

## How to Use

Each file is self-contained (100–200 lines). Read them in order or jump to specific topics. Every file includes code examples and a Reverse Engineering Q&A table for quick reference.

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/10-advanced-js.js
```

## Next Steps

[Back to Module 9](../09-browser-dom/README.md): Browser DOM, BOM, Events, Forms, Storage, Rendering Pipeline

[Proceed to Module 11](../11-data-structures/README.md): Data Structures, Algorithms, Big-O Analysis to learn about data structures and algorithms.
