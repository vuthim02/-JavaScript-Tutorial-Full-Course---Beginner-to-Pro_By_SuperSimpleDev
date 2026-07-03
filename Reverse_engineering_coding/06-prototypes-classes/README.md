# Part 6 — Objects, Prototypes, Classes, Constructors, `this`, and the Prototype Chain

Split from the original master document into focused subtopic files.

## Files

| # | File | Topic |
|---|------|-------|
| 01 | [01-object-internals.md](01-object-internals.md) | Object literals, hidden classes, property access, methods, dynamic properties, references |
| 02 | [02-property-descriptors.md](02-property-descriptors.md) | `Object.defineProperty`, descriptors, `freeze`/`seal`/`preventExtensions` |
| 03 | [04-prototypes.md](04-prototypes.md) | Constructor functions, prototypes, prototype chain, `Object.create()` |
| 04 | [05-classes.md](05-classes.md) | ES6+ class syntax, inheritance, `extends`, `super`, `instanceof`, built-in constructors |
| 05 | [06-encapsulation-polymorphism.md](06-encapsulation-polymorphism.md) | Encapsulation (private fields, closures), polymorphism, duck typing, composition vs inheritance |
| 06 | [07-project.md](07-project.md) | Full student management system demo |
| 07 | [08-object-static-methods.md](08-object-static-methods.md) | `Object.keys`, `values`, `entries`, `fromEntries`, `assign`, `is`, `groupBy` |
| 08 | [10-getters-setters.md](10-getters-setters.md) | Getters/setters in plain objects, `Object.defineProperty`, lazy values, validation |
| 09 | [11-object-equality.md](11-object-equality.md) | Reference vs shallow vs deep equality, `Object.is`, SameValueZero |
| 10 | [12-review-checklist.md](12-review-checklist.md) | Full reverse engineering checklist for all Part 6 topics |

## Mission

This part explains one of the deepest topics in JavaScript:

- How objects are stored in memory
- What prototypes are
- Why inheritance works
- How `this` is determined
- What classes really are
- How methods are shared
- Why the prototype chain exists

Frameworks and runtimes like Node.js, React, and Vue.js depend heavily on these concepts.

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/06-prototypes-classes.js
```

## Next Steps

[Back to Module 5](../05-functions-closures/README.md): Functions & Closures

[Proceed to Module 7](../07-async-js/README.md): Asynchronous JavaScript to learn about asynchronous programming in JavaScript.
