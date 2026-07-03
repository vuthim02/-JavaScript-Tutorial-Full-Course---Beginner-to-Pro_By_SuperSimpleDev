# Complete Function Mastery Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                  JAVASCRIPT FUNCTIONS — COMPLETE MAP                │
│                                                                     │
│  DEFINITION                                                         │
│  ├── Declaration (hoisted)                                          │
│  ├── Expression (named / anonymous)                                 │
│  ├── Arrow (lexical this, no arguments)                             │
│  ├── async function (always returns Promise)                        │
│  ├── function* Generator (pauseable with yield)                     │
│  └── async function* Async Generator                                │
│                                                                     │
│  INVOCATION                                                         │
│  ├── Direct call — fn()                                             │
│  ├── Method call — obj.fn()                                         │
│  ├── Constructor call — new Fn()                                    │
│  ├── Explicit — fn.call/apply/bind()                                │
│  ├── await fn()                                                     │
│  └── gen.next()                                                     │
│                                                                     │
│  SCOPE & CLOSURES                                                   │
│  ├── Lexical scope (defined at write time)                          │
│  ├── Block scope (let/const in {})                                  │
│  ├── Module scope (ES modules)                                      │
│  ├── TDZ (let/const before declaration)                             │
│  └── Closure (function + captured environment)                      │
│                                                                     │
│  `this` BINDING (priority: new > explicit > implicit > default)     │
│  ├── Default — global / undefined (strict)                          │
│  ├── Implicit — obj.method()                                        │
│  ├── Explicit — .call/.apply/.bind                                  │
│  ├── new — fresh object                                             │
│  └── Arrow — lexically inherited                                    │
│                                                                     │
│  ASYNC MODEL                                                        │
│  ├── Call Stack (synchronous, LIFO)                                 │
│  ├── Microtask Queue (Promises, await, queueMicrotask)              │
│  └── Macrotask Queue (setTimeout, I/O, requestAnimationFrame)       │
│                                                                     │
│  MEMORY                                                             │
│  ├── Reachability (roots → reference chains)                        │
│  ├── Mark-and-Sweep GC                                              │
│  ├── Closure retention (variables stay alive)                       │
│  ├── WeakRef (weak reference, allows GC)                            │
│  ├── WeakMap/WeakSet (weak keys)                                    │
│  └── FinalizationRegistry (cleanup on GC)                          │
│                                                                     │
│  PATTERNS                                                           │
│  ├── First-class (store, pass, return)                              │
│  ├── Higher-order (takes/returns functions)                         │
│  ├── Factory (creates objects, closures for privacy)                │
│  ├── Callback (passed, called later)                                │
│  ├── IIFE (runs immediately)                                        │
│  ├── Pure function (deterministic, no side effects)                 │
│  ├── Composition/Pipe (chaining transformations)                    │
│  ├── Debounce/Throttle (timing control)                             │
│  ├── Memoize (cache pure function results)                          │
│  ├── Partial/Curry (pre-fill arguments)                             │
│  └── Iterator protocol (Symbol.iterator, yield)                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# What's Next: Part 6

**Objects, Prototypes, Classes, Inheritance, and the Prototype Chain:**

- The prototype chain (full memory model)
- `__proto__` vs `prototype`
- `Object.create()`
- Constructor functions and `new`
- `instanceof` operator
- ES6 `class` syntax (syntactic sugar over prototypes)
- Private fields (`#field`) and methods
- Static methods and properties
- Getters and setters
- Inheritance with `extends`
- `super` keyword
- Mixins and composition vs inheritance
- Polymorphism
- `call()`, `apply()`, `bind()` with classes
- Built-in prototypes (`Array.prototype`, `Function.prototype`, etc.)
- Monkey patching and its pitfalls
- Performance implications of deep prototype chains
## Next Steps

[Back to Chapter 27](27-projects-part2.md): Projects — Part 2
[Proceed to Chapter 29](29-method-shorthand-computed-get-set.md): Method Shorthand, Computed Properties, Getters & Setters to learn about method shorthand, computed properties, getters & setters.
