# Comparison Operators



## Comparison Operators

These compare two values and return a boolean (`true` or `false`):

| Operator | Name | Example | Result |
|---|---|---|---|
| `>` | Greater than | `5 > 3` | `true` |
| `<` | Less than | `5 < 3` | `false` |
| `>=` | Greater than or equal | `5 >= 5` | `true` |
| `<=` | Less than or equal | `5 <= 3` | `false` |
| `==` | Loose equality | `5 == "5"` | `true` |
| `===` | Strict equality | `5 === "5"` | `false` |
| `!=` | Loose inequality | `5 != "5"` | `false` |
| `!==` | Strict inequality | `5 !== "5"` | `true` |

---

## Loose vs Strict Equality

This is one of the most important concepts in JavaScript.

**Strict Equality `===`** — checks both the **value AND the type**. No type conversion. Use this almost always.

```javascript
1 === 1        // true  — same type (number), same value
1 === "1"      // false — different types (number vs string)
null === undefined // false — different types
```

**Loose Equality `==`** — performs **type coercion** before comparing. This leads to surprising results:

```javascript
1 == "1"          // true  — JavaScript converts "1" to number 1
0 == false        // true  — JavaScript converts false to 0
"" == false       // true  — both become 0
null == undefined // true  — special rule
[] == false       // true  — [] becomes "" becomes 0
[1] == 1          // true  — [1] becomes "1" becomes 1
```

> **Golden Rule: Always use `===` (strict equality).** Use `==` only for `null == undefined` if you want to check for both at once.

---

## Reverse Engineering: Comparison Operators

**For `===` vs `==`:**

| Question | Answer |
|---|---|
| Why not use `==`? | It performs type coercion, leading to unexpected results |
| What does `1 == "1"` return? | `true` — "1" becomes number 1 |
| What does `1 === "1"` return? | `false` — different types, no conversion |
| When is `==` ever acceptable? | `null == undefined` is one common case |
## Next Steps

[Back to Chapter 7](07-arithmetic-operators.md): Arithmetic Operators
[Proceed to Chapter 9](09-logical-operators.md): Logical Operators and Short-Circuit Evaluation to learn about logical operators and short-circuit evaluation.
