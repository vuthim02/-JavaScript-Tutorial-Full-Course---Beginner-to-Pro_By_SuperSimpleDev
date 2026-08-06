# Chapter 2 — Operator Precedence

## Overview

Understanding the order in which JavaScript evaluates operators in an expression.

---

## Precedence Table (High to Low)

| Precedence | Operator(s) | Description |
|-----------|-------------|-------------|
| 1 | `()` | Grouping |
| 2 | `.` `[]` `()` | Member access, call |
| 3 | `!` `+` `-` `typeof` `void` `delete` | Unary operators |
| 4 | `**` | Exponentiation |
| 5 | `*` `/` `%` | Multiplication, division, modulo |
| 6 | `+` `-` | Addition, subtraction |
| 7 | `<<` `>>` `>>>` | Bitwise shift |
| 8 | `<` `<=` `>` `>=` `in` `instanceof` | Relational |
| 9 | `==` `!=` `===` `!==` | Equality |
| 10 | `&` | Bitwise AND |
| 11 | `^` | Bitwise XOR |
| 12 | `\|` | Bitwise OR |
| 13 | `&&` | Logical AND |
| 14 | `\|\|` `??` | Logical OR, Nullish coalescing |
| 15 | `?:` | Ternary |
| 16 | `=` `+=` `-=` etc. | Assignment |
| 17 | `,` | Comma |

---

## Examples

```javascript
2 + 3 * 4;       // 14 (multiplication first)
(2 + 3) * 4;     // 20 (grouping overrides)
true || false && false;  // true (&& before ||)
```

---

## Next Steps

[Back to Chapter 1](01-expressions-vs-statements.md): Expressions vs Statements
[Proceed to Chapter 3](03-var-let-const.md): var, let, and const
