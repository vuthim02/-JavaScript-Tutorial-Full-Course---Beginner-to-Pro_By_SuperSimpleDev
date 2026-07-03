# Part 4 — Arrays, Objects, Memory Model, Built-in Methods

## Files (Study Order)

| #  | File                          | Topic                                              |
|----|-------------------------------|----------------------------------------------------|
| 01 | [01-array-internals.md](01-array-internals.md) | Array memory structure, sparse arrays, detection, array-like objects, length, stack/queue |
| 02 | [02-array-methods-push-pop.md](02-array-methods-push-pop.md) | `push()` and `pop()` — add/remove from end        |
| 03 | [03-array-methods-shift-unshift.md](03-array-methods-shift-unshift.md) | `shift()` and `unshift()` — add/remove from start |
| 04 | [04-array-methods-slice-splice.md](04-array-methods-slice-splice.md) | `slice()` (non-destructive) and `splice()` (destructive) |
| 05 | [05-array-methods-search.md](05-array-methods-search.md) | `indexOf()`, `lastIndexOf()`, `includes()`         |
| 06 | [06-array-methods-map.md](06-array-methods-map.md) | `map()` — transform each element                   |
| 07 | [07-array-methods-filter.md](07-array-methods-filter.md) | `filter()` — select matching elements              |
| 08 | [08-array-methods-find.md](08-array-methods-find.md) | `find()` and `findIndex()` — get first match       |
| 09 | [09-array-methods-some-every.md](09-array-methods-some-every.md) | `some()` and `every()` — boolean checks            |
| 10 | [10-array-methods-reduce.md](10-array-methods-reduce.md) | `reduce()` and `reduceRight()` — aggregate         |
| 11 | [11-array-methods-sort.md](11-array-methods-sort.md) | `sort()` — ordering elements                       |
| 12 | [12-objects-internals.md](12-objects-internals.md) | Objects internal structure, `Object.keys/values/entries` |
| 13 | [13-destructuring.md](13-destructuring.md) | Array and object destructuring                     |
| 14 | [14-spread-rest.md](14-spread-rest.md) | Spread (`...`) and Rest (`...`) operators          |
| 15 | [15-references-in-depth.md](15-references-in-depth.md) | Primitives vs references, memory model             |
| 16 | [16-shallow-copy.md](16-shallow-copy.md) | Shallow copy: spread, `Object.assign`, `slice`     |
| 17 | [17-deep-copy.md](17-deep-copy.md) | Deep copy: `structuredClone`, JSON, manual, lodash |
| 18 | [18-immutability.md](18-immutability.md) | Immutability patterns, tradeoffs, update patterns  |
| 19 | [19-chaining-performance.md](19-chaining-performance.md) | Method chaining, performance considerations, senior checklist |
| 20 | [20-projects-part1.md](20-projects-part1.md) | Projects 1-3: Student Manager, Shopping Cart, Inventory |
| 21 | [21-projects-part2.md](21-projects-part2.md) | Projects 4-5: Statistics Calculator, Immutable Todo |
| 22 | [22-array-methods-extra.md](22-array-methods-extra.md) | `forEach()`, `flat()`, `flatMap()`, `at()`           |
| 23 | [23-es2023-immutable-methods.md](23-es2023-immutable-methods.md) | `toSorted()`, `toSpliced()`, `toReversed()`, `with()` |
| 24 | [25-for-loops-iteration.md](25-for-loops-iteration.md) | `for...of`, `for...in`, `for` loop iteration patterns |

## Topics Covered

- **Array internals:** sparse arrays, array-like objects, detection, `length` behavior
- **Array methods:** mutating (`push`, `pop`, `shift`, `unshift`, `splice`, `sort`) vs non-mutating (`slice`, `map`, `filter`, `find`, `reduce`, `some`, `every`, `indexOf`, `includes`)
- **Immutability patterns:** shallow vs deep copying, `structuredClone`, spread, immutable update patterns
- **ES2023 immutable array methods:** `toSorted()`, `toSpliced()`, `toReversed()`, `with()`
- **Object immutability:** `Object.freeze()`, `Object.seal()`, `Object.fromEntries()`, `Object.hasOwn()`
- **Extra array methods:** `forEach()`, `flat()`, `flatMap()`, `at()` (ES2022 relative indexing)
- **Iteration patterns:** `for...of`, `for...in`, classic `for` loop, choosing the right loop
- **Chaining and performance:** intermediate array allocation, readability vs performance, time/space complexity

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/04-arrays-objects.js
```

## Next Steps

[Back to Module 3](../03-control-flow/README.md): Control Flow, Iteration, Recursion & Error Handling

[Proceed to Module 5](../05-functions-closures/README.md): Functions & Closures to learn about functions and closures in JavaScript.
