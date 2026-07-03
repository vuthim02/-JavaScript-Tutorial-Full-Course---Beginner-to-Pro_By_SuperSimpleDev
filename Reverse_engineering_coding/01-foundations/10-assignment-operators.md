# Assignment Operators

<img src="https://i.pinimg.com/originals/7c/31/ff/7c31ff4eba5829382925296494daad8f.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Are Assignment Operators?

These assign a value to a variable, often combining with an operation:

| Operator | Example | What It Actually Does |
|---|---|---|
| `=` | `x = 5` | Assigns 5 to x |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 3` | `x = x - 3` |
| `*=` | `x *= 3` | `x = x * 3` |
| `/=` | `x /= 3` | `x = x / 3` |
| `%=` | `x %= 3` | `x = x % 3` |
| `**=` | `x **= 3` | `x = x ** 3` |
| `&&=` | `x &&= 5` | Assigns 5 to x only if x is truthy |
| `\|\|=` | `x \|\|= 5` | Assigns 5 to x only if x is falsy |
| `??=` | `x ??= 5` | Assigns 5 to x only if x is null or undefined |

---

## Logical Assignment Operators (ES2021)

These combine a logical operator with assignment — assign only when a condition is met:

```javascript
// AND assignment — assigns only if x is truthy
let x = 1;
x &&= 5;     // x = 5 (because 1 is truthy)

let y = 0;
y &&= 5;     // y = 0 (because 0 is falsy — no assignment happens)

// OR assignment — assigns only if x is falsy
let a = null;
a ||= "default"; // a = "default" (null is falsy)

let b = "hello";
b ||= "default"; // b = "hello" (already truthy, no assignment)

// Nullish assignment — assigns only if x is null or undefined
let c = 0;
c ??= "default"; // c = 0 (0 is not null or undefined, so no assignment)

let d = null;
d ??= "default"; // d = "default" (null triggers assignment)
```

**When to use each:**
- `||=` — set a default when value is any falsy (`""`, `0`, `false`, etc.)
- `??=` — set a default only when value is `null` or `undefined` (preferred)
- `&&=` — update value only if it's already truthy (less common)

---

## Practical Example — Updating Object Properties

```javascript
const settings = {
    theme: null,
    volume: 50,
};

settings.theme ??= "dark";   // theme was null → now "dark"
settings.volume ||= 100;     // volume is 50 (truthy) → stays 50
settings.volume &&= 75;      // volume is 50 (truthy) → now 75

console.log(settings); // { theme: "dark", volume: 75 }
```

---

## Reverse Engineering: Assignment Operators

**For `a += 5`:**

| Question | Answer |
|---|---|
| What is the long form? | `a = a + 5` |
| Why use `+=`? | Shorter, avoids repeating the variable name |
| What if `a` is a string? | `+=` will do string concatenation, not addition |
## Next Steps

[Back to Chapter 9](09-logical-operators.md): Logical Operators and Short-Circuit Evaluation
[Proceed to Chapter 12](12-input-and-output.md): Input and Output to learn about input and output.
