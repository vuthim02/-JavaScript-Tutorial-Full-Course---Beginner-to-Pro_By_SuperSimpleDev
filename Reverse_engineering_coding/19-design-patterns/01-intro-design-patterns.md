# Design Patterns in JavaScript

<img src="https://media.giphy.com/media/MdA16VIoXKKxNE8Stk/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


Design patterns are reusable, battle-tested solutions to recurring software design problems. Every production codebase — from Express middleware to React internals to Node.js core — is built on top of these patterns.

## Mission

By the end you will be able to:
- Recognize each pattern by its structure and intent.
- Implement every pattern in idiomatic JavaScript.
- Choose the right pattern for a given problem.
- Reverse engineer existing codebases by identifying the patterns they use.

## Big Picture

Design patterns fall into three categories:

| Category     | Focus                                      |
|--------------|--------------------------------------------|
| **Creational**   | Object creation mechanisms                 |
| **Structural**   | Object composition and relationships       |
| **Behavioral**   | Object communication and responsibility    |

JavaScript's dynamic typing, first-class functions, and prototypal inheritance make some patterns simpler — and some unnecessary — compared to statically-typed languages.

**Key insight:** Patterns are not recipes to copy. They are *vocabulary* for describing solutions. The same pattern can look very different in different codebases.

## Overall Map

### Creational Patterns (5)

| # | Pattern        | What It Does                                      |
|---|----------------|---------------------------------------------------|
| 1 | Singleton      | Ensures only one instance of a class              |
| 2 | Factory Method | Creates objects via a method instead of `new`     |
| 3 | Abstract Factory| Creates families of related objects              |
| 4 | Builder        | Constructs complex objects step by step           |
| 5 | Prototype      | Clones objects via a prototype                    |

### Structural Patterns (6)

| # | Pattern   | What It Does                                      |
|---|-----------|---------------------------------------------------|
| 6 | Adapter   | Makes incompatible interfaces work together       |
| 7 | Decorator | Adds behavior to objects dynamically              |
| 8 | Facade    | Simplifies a complex subsystem                    |
| 9 | Proxy     | Controls access to another object                 |
| 10| Module    | Encapsulates private state                        |
| 11| Mixin     | Composes behaviors across classes                 |

### Behavioral Patterns (7)

| # | Pattern                 | What It Does                                  |
|---|-------------------------|-----------------------------------------------|
| 12| Observer                | One-to-many dependency notification           |
| 13| Mediator                | Centralizes communication between components  |
| 14| Command                 | Encapsulates requests as objects              |
| 15| Strategy                | Swaps algorithms at runtime                   |
| 16| State                   | Changes behavior based on internal state      |
| 17| Iterator                | Traverses collections uniformly               |
| 18| Chain of Responsibility | Passes requests along a chain of handlers     |

## Key Takeaways

- **Creational** patterns abstract object creation — they make a system independent of how its objects are created.
- **Structural** patterns compose objects and classes into larger structures while keeping them flexible.
- **Behavioral** patterns distribute responsibility and define how objects interact.
- JavaScript's dynamic nature makes some patterns simpler but also means some are built into the language (Proxy, Iterator, Module).
- The best pattern is the simplest one that solves the problem. Over-applying patterns is as harmful as not knowing them.
- Patterns are a vocabulary for communication — knowing them lets you read and reason about code faster.

---

*Next: 02-singleton.md*
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-singleton.md): Singleton Pattern to learn about singleton pattern.
