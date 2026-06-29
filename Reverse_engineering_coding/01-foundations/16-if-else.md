# If-Else Statements and Control Flow

<img src="" alt="Animated GIF" style="width:400px; height:300px;">


## What Is Control Flow?

Normally, JavaScript runs your code **line by line from top to bottom**. Control flow statements let you decide which lines run based on conditions.

```javascript
if (condition) {
    // This block runs only if condition is true
}
```

---

## The Basic `if` Statement

```javascript
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
}
// Output: You are an adult
```

The code inside `{}` runs **only if** the condition in `()` evaluates to `true`.

---

## `if...else` — Two Branches

```javascript
let age = 16;

if (age >= 18) {
    console.log("You are an adult");
} else {
    console.log("You are a minor");
}
// Output: You are a minor
```

---

## `if...else if...else` — Multiple Branches

```javascript
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}
// Output: Grade: B
```

Checks conditions **top to bottom**. Stops at the first `true` condition.

---

## Nested If Statements

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log("Can drive");
    } else {
        console.log("Need a license");
    }
} else {
    console.log("Too young");
}
```

---

## Combining Conditions with Logical Operators

```javascript
// AND — both must be true
if (age >= 18 && hasLicense) {
    console.log("Can drive");
}

// OR — at least one must be true
if (isWeekend || isHoliday) {
    console.log("No work!");
}

// NOT — invert the condition
if (!isBanned) {
    console.log("Access granted");
}
```

---

## Truthy and Falsy in Conditions

You can use any value as a condition — it gets coerced to a boolean:

```javascript
let name = "";

if (name) {
    console.log("Name exists"); // Won't run — "" is falsy
} else {
    console.log("Name is empty"); // This runs
}
```

**Falsy values** (act like `false`): `false`, `0`, `""`, `null`, `undefined`, `NaN`

**Everything else** is truthy (act like `true`).

---

## Early Return Pattern

```javascript
function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero"; // Exit early
    }
    return a / b; // Main logic
}
```

Handle edge cases first, then the main logic.

---

## The `switch` Statement

For comparing a value against multiple exact matches:

```javascript
let day = "Monday";

switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        console.log("Weekday");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;
    default:
        console.log("Invalid day");
}
```

**Always use `break`** — without it, execution "falls through" to the next case.

---

## Reverse Engineering: If-Else

| Question | Answer |
|---|---|
| What makes an `if` condition true? | Any truthy value — not just `true` |
| What happens without `else`? | If condition is false, nothing runs |
| Can I use `=` instead of `===` in a condition? | `=` assigns, `===` compares — using `=` is a common bug |
| Why use `else if` instead of nested `if`? | More readable; avoids deep nesting |
| What does `break` do in `switch`? | Exits the `switch` block — prevents fall-through |
## Next Steps

[Back to Chapter 15](15-comments.md): Comments in JavaScript
[Proceed to Chapter 17](17-ternary-operator.md): Ternary Operator and Special Operators to learn about ternary operator and special operators.
