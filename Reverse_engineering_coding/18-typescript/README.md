# Part 18 — TypeScript Deep Dive

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


TypeScript is **JavaScript with types** — a static analysis layer that catches bugs at compile time and is erased at runtime.

## Files

| #  | File | Topic |
|----|------|-------|
| 01 | [01-ts-setup.md](01-ts-setup.md) | What Is TypeScript, setup, tsconfig.json, strict mode |
| 02 | [02-primitive-types.md](02-primitive-types.md) | Primitive types, type annotations, inference |
| 03 | [03-interfaces-type-aliases.md](03-interfaces-type-aliases.md) | Interfaces vs type aliases, optional, readonly, index signatures |
| 04 | [04-union-intersection.md](04-union-intersection.md) | Union types, intersection types, narrowing |
| 05 | [05-literal-enums.md](05-literal-enums.md) | Literal types, template literal types, enums |
| 06 | [06-generics.md](06-generics.md) | Generic functions, interfaces, classes, constraints |
| 07 | [07-advanced-types.md](07-advanced-types.md) | keyof, typeof, indexed access, mapped types, conditional types |
| 08 | [08-utility-types.md](08-utility-types.md) | Partial, Required, Pick, Omit, Record, Exclude, Extract, etc. |
| 09 | [09-type-narrowing.md](09-type-narrowing.md) | typeof, instanceof, discriminated unions, type predicates |
| 10 | [10-declaration-files.md](10-declaration-files.md) | .d.ts files, DefinitelyTyped, ambient declarations |
| 11 | [11-react.md](11-react.md) | TypeScript with React: props, useState, useRef, events |
| 12 | [12-node-express.md](12-node-express.md) | TypeScript with Node.js/Express, typed middleware |
| 13 | [13-module-resolution.md](13-module-resolution.md) | Module resolution strategies, path aliases |
| 14 | [14-migration.md](14-migration.md) | JS to TS migration strategy, incremental adoption |
| 15 | [15-practical-patterns.md](15-practical-patterns.md) | Builder pattern, Result type, branded types, DeepPartial |
| 16 | [16-pitfalls.md](16-pitfalls.md) | Common pitfalls, best practices |
| 17 | [17-project.md](17-project.md) | Full TypeScript API with type-safe patterns |

## Key Principles

- Types are **erased** at compile time — zero runtime cost.
- Always enable `"strict": true` for maximum safety.
- Prefer `unknown` over `any`.
- Use discriminated unions to model states explicitly.
- Generics preserve type information across reusable code.

## Next Steps

[Back to Module 17](../17-testing/README.md): Testing, Quality Assurance, and CI/CD

[Proceed to Module 19](../19-design-patterns/README.md): Design Patterns in JavaScript to learn about design patterns in JavaScript.
