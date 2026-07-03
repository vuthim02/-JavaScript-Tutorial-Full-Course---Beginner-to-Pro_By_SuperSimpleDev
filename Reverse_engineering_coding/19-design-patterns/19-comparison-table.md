# Comparison Tables & Reverse Engineering Questions

## Classification Comparison Table

| Category     | Pattern                | Intent                                          | When to Use                                        |
|--------------|------------------------|-------------------------------------------------|----------------------------------------------------|
| **Creational**   | Singleton          | One instance of a class                         | Global config, logger, connection pool             |
| **Creational**   | Factory Method     | Object creation without specifying class        | Dynamic type selection, complex creation           |
| **Creational**   | Abstract Factory   | Families of related objects                     | Cross-platform UI, theming systems                 |
| **Creational**   | Builder            | Step-by-step construction                       | Complex objects, fluent APIs, query builders       |
| **Creational**   | Prototype          | Clone existing objects                          | Object reuse, avoiding costly creation             |
| **Structural**   | Adapter            | Match incompatible interfaces                   | Third-party integration, legacy code               |
| **Structural**   | Decorator          | Add behavior dynamically                        | Middleware, HOCs, logging, caching                 |
| **Structural**   | Facade             | Simplify a subsystem                            | Library APIs, complex tool wrappers                |
| **Structural**   | Proxy              | Control access to an object                     | Lazy loading, validation, caching, logging         |
| **Structural**   | Module             | Encapsulate private state                       | Any JS codebase, library design                    |
| **Structural**   | Mixin              | Compose behaviors across classes                | Horizontal code reuse, utility sharing             |
| **Behavioral**   | Observer           | One-to-many notification                        | Event systems, pub/sub, reactive UIs               |
| **Behavioral**   | Mediator           | Centralize communication                        | Chat systems, form coordination, Air traffic ctrl  |
| **Behavioral**   | Command            | Encapsulate requests as objects                 | Undo/redo, transactions, job queues                |
| **Behavioral**   | Strategy           | Swap algorithms at runtime                      | Sorting, pricing, auth strategies                  |
| **Behavioral**   | State              | Change behavior based on state                  | Finite state machines, workflow engines            |
| **Behavioral**   | Iterator           | Traverse collections uniformly                  | Custom data structures, pagination                 |
| **Behavioral**   | Chain of Resp.     | Pass request along handlers                     | Middleware, pipeline processing, validation chains |

## Summary Table

| Pattern             | Category     | Key JS Feature Used       | Difficulty |
|---------------------|--------------|---------------------------|------------|
| Singleton           | Creational   | Static property, module cache | Easy    |
| Factory Method      | Creational   | First-class functions     | Easy        |
| Abstract Factory    | Creational   | Polymorphism via classes  | Medium      |
| Builder             | Creational   | Method chaining           | Easy        |
| Prototype           | Creational   | `Object.create()`, `__proto__` | Medium  |
| Adapter             | Structural   | Wrapper object            | Easy        |
| Decorator           | Structural   | Function composition, wrapping | Medium  |
| Facade              | Structural   | Simplified API            | Easy        |
| Proxy               | Structural   | `Proxy` built-in, closures | Medium     |
| Module              | Structural   | Closures, IIFE, ES modules | Easy       |
| Mixin               | Structural   | `Object.assign()`, `prototype` | Medium |
| Observer            | Behavioral   | Callbacks, `EventEmitter` | Medium      |
| Mediator            | Behavioral   | Central dispatcher        | Medium      |
| Command             | Behavioral   | Object + function pairs   | Medium      |
| Strategy            | Behavioral   | Function objects, first-class | Easy    |
| State               | Behavioral   | State objects, delegation | Medium      |
| Iterator            | Behavioral   | `Symbol.iterator`, generators | Medium |
| Chain of Resp.      | Behavioral   | Linked functions, `next()` | Medium     |

## Reverse Engineering Questions

### Fundamental Questions

1. What distinguishes a design pattern from a simple algorithm?
2. Why do some patterns look nearly identical in dynamic languages like JavaScript (e.g., Command and Strategy)?
3. Which patterns become unnecessary or trivial in JavaScript due to first-class functions and dynamic typing?

### Pattern Recognition

4. When reverse engineering a codebase, what cues indicate the use of each pattern?
5. How can you distinguish Adapter from Facade in an unfamiliar codebase?
6. What are the telltale signs of a Singleton (module-level instance, static property, restricted constructor)?

### Trade-Off Questions

7. When does using a design pattern become over-engineering?
8. How do patterns affect testability? Which patterns make testing harder?
9. What is the relationship between design patterns and SOLID principles?
10. How do patterns evolve as a codebase grows from small to large?

### JavaScript-Specific Questions

11. How does JavaScript's `Proxy` built-in relate to the Proxy pattern? Does it replace it?
12. Why is the Module pattern less relevant now that ES modules are standard?
13. How do JavaScript closures make some patterns (Module, Command, Strategy) simpler than in Java?
14. Which pattern does `Array.prototype.map` implement?
15. How does the Iterator pattern enable lazy evaluation in JavaScript?

### Design Questions

16. Your team has 15 legacy classes that each handle logging differently. Which pattern would you use to unify them?
17. A checkout system needs to support multiple payment gateways. Which pattern would you choose?
18. A document editor needs multi-level undo/redo. Which pattern is most appropriate?
19. You are building a real-time dashboard that updates 20 UI widgets when data changes. Which pattern fits?
20. A form with 30 interdependent fields needs validation orchestration. Which pattern would you use?

### Implementation Questions

21. Implement a Singleton that survives hot module replacement (HMR).
22. Implement a caching Proxy that invalidates entries after a TTL.
23. Implement an Observable class with lazy subscription.
24. Implement a middleware pipeline that can be interrupted at any point.
25. Implement a finite state machine for a TCP connection (CLOSED, LISTEN, SYN_SENT, SYN_RECEIVED, ESTABLISHED, FIN_WAIT, CLOSE_WAIT, CLOSED).

---

## Next Steps

[Back to Chapter 18](18-chain-of-responsibility.md): Chain of Responsibility Pattern

If this were a 20th module, Part 20 would cover **State Management: Redux, Zustand, Jotai, and Beyond**.
