# 01 — Boolean Logic, Comparison & Coercion

## What Is Boolean Logic?

Boolean logic deals with values that are either `true` or `false`. All conditions in JavaScript ultimately evaluate to a boolean.

## Comparison Operators

```javascript
// Greater than / Less than
5 > 3   // true
5 < 3   // false

// Greater than or equal / Less than or equal
5 >= 5  // true
5 <= 4  // false

// Equality
5 == 5   // true  (loose — allows coercion)
5 === 5  // true  (strict — no coercion)
5 == "5" // true  (string "5" coerced to number 5)
5 === "5" // false (different types)

// Inequality
5 != 5   // false
5 !== 5  // false
5 != "5" // false (loose, coercion applied)
5 !== "5" // true (strict, different types)
```

## Coercion Quirks with Relational Operators

When comparing different types with relational operators (`>`, `<`, `>=`, `<=`), JavaScript coerces both to numbers (generally):

```javascript
"10" > 5    // true  ("10" → 10)
"abc" < 5   // false ("abc" → NaN, NaN comparisons always return false)
"10" > "5"  // false (string comparison — "1" is less than "5" lexicographically)
"10" > "05" // true  (string comparison — "1" > "0")
null >= 0   // true  (null → 0)
null > 0    // false (null → 0, 0 > 0 is false)
null == 0   // false (special rule — null only == undefined)
undefined >= 0 // false (undefined → NaN, NaN comparison always false)
```

## Special Values in Comparisons

```javascript
NaN === NaN     // false — NaN is never equal to anything, including itself
NaN < 5         // false
NaN > 5         // false
NaN == NaN      // false

Infinity > 1000000  // true
-Infinity < 0       // true
Infinity === Infinity // true
```

## Truthy & Falsy

Values that coerce to `false` in a boolean context:

| Falsy Value  | Why                        |
|--------------|----------------------------|
| `false`      | Already false              |
| `0`          | Zero is falsy              |
| `""`         | Empty string               |
| `null`       | No value                   |
| `undefined`  | Unassigned                 |
| `NaN`        | Not a number               |

Everything else is truthy: `"hello"`, `[]`, `{}`, `Infinity`, `-1`, etc.

## Truth Tables

### AND (`&&`)

| A     | B     | A && B |
|-------|-------|--------|
| true  | true  | true   |
| true  | false | false  |
| false | true  | false  |
| false | false | false  |

### OR (`||`)

| A     | B     | A \|\| B |
|-------|-------|----------|
| true  | true  | true     |
| true  | false | true     |
| false | true  | true     |
| false | false | false    |

### NOT (`!`)

| A     | !A    |
|-------|-------|
| true  | false |
| false | true  |

## De Morgan's Laws

```javascript
// NOT (A AND B)  =  NOT A OR NOT B
!(a && b) === !a || !b

// NOT (A OR B)  =  NOT A AND NOT B
!(a || b) === !a && !b
```

```javascript
// Without De Morgan's:
if (!(age >= 18 && hasLicense)) {
    console.log("Cannot drive");
}

// With De Morgan's:
if (age < 18 || !hasLicense) {
    console.log("Cannot drive");
}
```

## Operator Precedence (Boolean Context)

1. `!` (NOT) — highest
2. `&&` (AND) — middle
3. `||` (OR) — lowest

```javascript
true || false && false
// Step 1: false && false → false
// Step 2: true || false → true
// Result: true

// Use parentheses for clarity:
(true || false) && false  // → false (different!)
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What is the type of each operand? | Check types before and after coercion. |
| Could this comparison coerce unexpectedly? | `==` allows coercion, `===` does not. String-to-number comparisons with `>` coerce. |
| Is a strict or loose equality used? | `===` / `!==` (strict) vs `==` / `!=` (loose). |
| Which falsy values could appear? | `null`, `undefined`, `0`, `""`, `false`, `NaN` — each behaves differently. |
| Could this condition be simplified? | Complex boolean logic can be extracted to a named variable or simplified via De Morgan's. |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-logical-operators.md): 02 — Logical Operators: `&&`, `||`, `!`, `??` to learn about 02 — logical operators: `&&`, `||`, `!`, `??`.
