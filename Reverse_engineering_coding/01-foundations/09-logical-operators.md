# Logical Operators and Short-Circuit Evaluation

<img src="https://media.tenor.com/7HUogy7rXs4AAAAM/feel-me-think-about-it.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Logical Operators

These combine boolean conditions:


| Operator | Name | Example | Result |
|---|---|---|---|
| `&&` | AND | `true && false` | `false` |
| `\|\|` | OR | `true \|\| false` | `true` |
| `!` | NOT | `!true` | `false` |

**AND (`&&`):** Returns `true` only if BOTH sides are true.
**OR (`||`):** Returns `true` if AT LEAST ONE side is true.
**NOT (`!`):** Flips the boolean — `true` becomes `false`, `false` becomes `true`.

---

## Short-Circuit Evaluation

JavaScript doesn't always evaluate both sides. It stops as soon as the result is determined.

**AND (`&&`) short-circuits on the first FALSY value:**

```javascript
false && anything    // Always false — "anything" is NEVER evaluated
true && "hello"      // "hello" — returns the last truthy value
0 && console.log("hi") // 0 is falsy, so console.log never runs!
```

**OR (`||`) short-circuits on the first TRUTHY value:**

```javascript
true || anything     // Always true — "anything" is NEVER evaluated
false || "hello"     // "hello" — falls through to second value
"a" || "b"           // "a" — stops at first truthy value
```

---

## Practical Patterns Using Short-Circuit

```javascript
// Pattern 1: Default value (if input is falsy, use "default")
const name = userInput || "default";

// Pattern 2: Guard clause (only run function if condition is true)
isLoggedIn && showDashboard();

// Pattern 3: Nullish coalescing ?? (ES2020) — better for defaults
// Unlike ||, this only falls through for null or undefined — NOT for 0 or ""
const name = userInput ?? "default";
// "0" ?? "default" → "0" (keeps the 0!)
// ""  ?? "default" → "" (keeps the empty string!)
// null ?? "default" → "default"
// undefined ?? "default" → "default"
```

---

## Combining Logical Operators

```javascript
let age = 25;
let income = 50000;
let hasCreditScore = true;

// All three conditions must be true
let canGetLoan = age >= 18 && income >= 30000 && hasCreditScore;
console.log(canGetLoan); // true
```

---

## Truth Table Reference

| A | B | `A && B` | `A \|\| B` | `!A` |
|---|---|---|---|---|
| `true` | `true` | `true` | `true` | `false` |
| `true` | `false` | `false` | `true` | `false` |
| `false` | `true` | `false` | `true` | `true` |
| `false` | `false` | `false` | `false` | `true` |

---

## The NOT Operator `!`

Flips truthiness to boolean and negates it:

```javascript
!true   // false
!false  // true
!0      // true (0 is falsy, so !0 is true)
!"hello" // false ("hello" is truthy, so !"hello" is false)
```

**Double NOT `!!`** — converts any value to its boolean equivalent:

```javascript
!!1        // true
!!0        // false
!!"hello"  // true
!!""       // false
!!null     // false
```

This is equivalent to `Boolean(value)`.

---

## Reverse Engineering: Logical Operators

**For short-circuit `const value = a || b`:**

| Question | Answer |
|---|---|
| What is `value` if `a` is truthy? | `a` — `b` is never evaluated |
| What is `value` if `a` is falsy? | `b` |
| Why does this matter? | If `b` is a function call, those effects won't happen if `a` is truthy |

**For `!!value`:**

| Question | Answer |
|---|---|
| What does `!!` do? | Converts any value to its boolean equivalent |
| Why not just use `Boolean(value)`? | `!!` is shorter; `Boolean()` is more readable |
| What is `!!"false"`? | `true` — the string "false" is truthy (non-empty) |
## Next Steps

[Back to Chapter 8](08-comparison-operators.md): Comparison Operators
[Proceed to Chapter 10](10-assignment-operators.md): Assignment Operators to learn about assignment operators.
