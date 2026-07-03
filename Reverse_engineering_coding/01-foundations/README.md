# 01 Foundations — JavaScript Language Foundations

This directory contains the split chapters from **Part 1: Foundations + Reverse Engineering Tactics**. Each file focuses on one concept and can be studied independently.

## Chapter Files

| # | File | Description |
|---|---|---|
| 01 | [01-what-is-javascript.md](01-what-is-javascript.md) | JavaScript's purpose, characteristics, history, and where it runs |
| 02 | [02-javascript-engines.md](02-javascript-engines.md) | How JS engines (V8, SpiderMonkey) translate code to machine code |
| 03 | [03-values-primitives.md](03-values-primitives.md) | Values, primitives overview: Number, String, Boolean |
| 04 | [04-null-undefined-symbol-bigint.md](04-null-undefined-symbol-bigint.md) | Null, Undefined, Symbol, BigInt, and the `typeof` operator |
| 05 | [05-variables.md](05-variables.md) | Variable declarations: `let`, `const`, `var`, naming rules, scope, semicolons |
| 06 | [07-arithmetic-operators.md](07-arithmetic-operators.md) | Arithmetic operators, pre/post increment, operator precedence, Math object, money calculations |
| 07 | [08-comparison-operators.md](08-comparison-operators.md) | Comparison operators, `==` vs `===` |
| 08 | [09-logical-operators.md](09-logical-operators.md) | Logical operators, short-circuit evaluation, nullish coalescing, truth tables |
| 09 | [10-assignment-operators.md](10-assignment-operators.md) | Assignment operators including logical assignment (ES2021) |
| 10 | [12-input-and-output.md](12-input-and-output.md) | Statements, comments, console.log, prompt, alert, confirm, Node.js input |
| 13 | [13-beginner-projects.md](13-beginner-projects.md) | 8 beginner projects: temp converter, circle area, age calculator, calculator, swap, even/odd, FizzBuzz, RPS logic |
| 14 | [14-reverse-engineering-tactics.md](14-reverse-engineering-tactics.md) | RE techniques: 3-level questions, 5 Whys, workflow, pattern recognition |
| 15 | [15-comments.md](15-comments.md) | Single-line, multi-line, JSDoc comments, best practices |
| 16 | [16-if-else.md](16-if-else.md) | If/else if/else, switch, nested conditions, control flow |
| 17 | [17-ternary-operator.md](17-ternary-operator.md) | Ternary operator, guard/default operators, nullish coalescing |
| 18 | [18-string-methods.md](18-string-methods.md) | String methods: length, indexOf, slice, replace, split, trim, and practical patterns |

## Study Order

Start from `01` and work through sequentially. Each chapter builds on the previous ones. The projects chapter applies everything from the earlier chapters. The reverse engineering tactics chapter gives you the mental framework to analyze any code you encounter. The remaining chapters fill in essential topics from the full course that belong at the foundations level.

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/01-foundations.js
```

## Next Steps

[Proceed to Module 2](../02-core-concepts/README.md): Core Programming Concepts to learn about fundamental programming concepts in JavaScript.
