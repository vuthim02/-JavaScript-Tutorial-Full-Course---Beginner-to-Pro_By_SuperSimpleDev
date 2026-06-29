# Ternary Operator and Special Operators

<img src="" alt="Animated GIF" style="width:400px; height:300px;">


## The Ternary Operator

A compact `if...else` in one line:

```javascript
condition ? valueIfTrue : valueIfFalse
```

```javascript
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Without ternary (equivalent):
let status2;
if (age >= 18) {
    status2 = "adult";
} else {
    status2 = "minor";
}
```

**Use for simple binary choices.** For complex logic, stick with `if...else`.

---

## Chained Ternary

For 3+ options (use sparingly — readability matters):

```javascript
let score = 85;
let grade = score >= 90 ? "A"
          : score >= 80 ? "B"
          : score >= 70 ? "C"
          : "F";

console.log(grade); // "B"
```

---

## Guard Operator (`&&`)

Runs the right side **only if** the left side is truthy:

```javascript
isLoggedIn && showDashboard();
// Equivalent to: if (isLoggedIn) { showDashboard(); }

let user = { name: "Alice" };
user.name && console.log(user.name); // "Alice" — safe access
```

---

## Default Operator (`||`)

Uses the right side **if** the left side is falsy:

```javascript
const name = userInput || "default";
// If userInput is "", 0, null, undefined, etc. → use "default"
```

> ⚠️ `||` treats `0` and `""` as falsy — use `??` for `null`/`undefined` only.

---

## Nullish Coalescing (`??`)

Like `||` but only falls through for `null` or `undefined`:

```javascript
const value = input ?? "default";
// "0"     ?? "default" → "0"      (0 is kept!)
// ""      ?? "default" → ""       (empty string is kept!)
// null    ?? "default" → "default"
// undefined ?? "default" → "default"
```

---

## Reverse Engineering: Ternary

| Question | Answer |
|---|---|
| When should I use ternary? | Simple yes/no choices — not complex logic |
| What does `a ? b : c` return? | `b` if `a` is truthy, otherwise `c` |
| Can ternary replace `if...else`? | Yes, but `if...else` is more readable for complex logic |
| What does `x ?? y` do differently from `x || y`? | `??` only checks `null`/`undefined`; `||` checks all falsy values |
## Next Steps

[Back to Chapter 16](16-if-else.md): If-Else Statements and Control Flow
[Proceed to Chapter 18](18-string-methods.md): String Methods to learn about string methods.
