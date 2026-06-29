# 03 — Control Flow: `if`/`else`, `switch`, Ternary

<img src="https://media.giphy.com/media/yYSSBtDgbbRzq/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The `if` Statement

```javascript
if (condition) {
    // block — executes if condition is truthy
}
```

### Implicit Boolean Coercion

The condition is always coerced to boolean:

```javascript
if ("hello") { }       // truthy → executes
if (0) { }             // falsy → skips
if ([]) { }            // truthy → executes (empty array is truthy!)
if ({}) { }            // truthy → executes
if (null) { }          // falsy → skips
if (undefined) { }     // falsy → skips
if ("") { }            // falsy → skips
if (NaN) { }           // falsy → skips
```

### Single Statement Without Braces

```javascript
if (condition) console.log("Single statement");

// Warning: Without braces, only the immediate next statement is conditional:
if (condition)
    console.log("This is conditional");
    console.log("This ALWAYS executes"); // NOT part of the if!
```

Always use braces to avoid ambiguity.

## `if...else`

```javascript
if (condition) {
    // block A — executes if truthy
} else {
    // block B — executes if falsy
}
```

Exactly one branch executes. Never both. Never neither.

### Nested `if...else`

```javascript
let age = 15, hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log("Can drive");
    } else {
        console.log("Adult but no license");
    }
} else {
    console.log("Minor");
}
```

## `else if` Patterns

```javascript
let score = 85;

if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else if (score >= 70) {
    console.log("C");
} else {
    console.log("F");
}
// Output: "B"
```

**Critical insight:** Order matters. If `score >= 70` comes before `score >= 80`, a score of 85 would match the wrong branch.

### Range Checking Pattern

```javascript
function getGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}
```

### Refactoring Nested Conditionals

**Technique 1: Early Returns (Guard Clauses)**

```javascript
// Before — deeply nested
function processOrder(order) {
    if (order) {
        if (order.isPaid) {
            if (order.items.length > 0) {
                // process...
            }
        }
    }
}

// After — early returns
function processOrder(order) {
    if (!order) return;
    if (!order.isPaid) return;
    if (order.items.length === 0) return;
    // process...
}
```

**Technique 2: Combine Conditions**

```javascript
// Before
if (user) {
    if (user.isActive) {
        if (user.role === "admin") {
            // allow
        }
    }
}

// After
if (user && user.isActive && user.role === "admin") {
    // allow
}
```

**Technique 3: Extract to Function**

```javascript
function hasItemsInCart(user) {
    return user && user.cart && user.cart.items.length > 0;
}

if (hasItemsInCart(user)) {
    // ...
}
```

## Ternary Operator (`? :`)

```javascript
condition ? expressionIfTrue : expressionIfFalse
```

The ternary is an **expression** — it produces a value.

```javascript
let status = age >= 18 ? "Adult" : "Minor";

// Equivalent if-else:
let status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}
```

### When to Use Ternary

```javascript
// Good — simple, fits on one line
let access = user.isAdmin ? "full" : "restricted";

// Good — used in template literal
console.log(`User is ${age >= 18 ? "an adult" : "a minor"}`);

// Good — used in return
return count === 0 ? "empty" : `${count} items`;
```

### When NOT to Use Ternary

```javascript
// Bad — nested ternary (hard to read)
let result = a ? (b ? "both" : "only a") : (c ? "only c" : "none");

// Bad — multiple actions (side effects in ternary)
isValid ? (doSomething(), doAnother()) : doSomethingElse();

// Bad — ignored result (use if-else instead)
isActive ? activateUser() : deactivateUser();
```

## `switch` Statement

```javascript
switch (expression) {
    case value1:
        // code for value1
        break;
    case value2:
        // code for value2
        break;
    default:
        // code if no match
}
```

### How `switch` Works

1. Evaluate the `switch` expression **once**.
2. Compare the result to each `case` using **strict equality** (`===`).
3. Execute the matching `case` block.
4. Continue until `break` or end of `switch`.

### Fall-Through

Without `break`, execution **falls through** to the next case:

```javascript
let value = 2;
switch (value) {
    case 1:
        console.log("One");
    case 2:
        console.log("Two");   // matches, starts here
    case 3:
        console.log("Three"); // falls through!
}
// Output: Two, Three
```

### Intentional Fall-Through

```javascript
let grade = "B";
switch (grade) {
    case "A":
        console.log("Excellent!");
        break;
    case "B":
    case "C":
        console.log("Good");  // "B" and "C" both print "Good"
        break;
    case "D":
        console.log("Passing");
        break;
    case "F":
        console.log("Fail");
        break;
    default:
        console.log("Invalid grade");
}
```

### `switch` with Ranges (`switch(true)`)

```javascript
let score = 85, grade;

switch (true) {
    case score >= 90: grade = "A"; break;
    case score >= 80: grade = "B"; break;
    case score >= 70: grade = "C"; break;
    case score >= 60: grade = "D"; break;
    default: grade = "F";
}
```

## `switch` vs `if...else`

| Aspect              | `switch`                                   | `if...else`                       |
|---------------------|--------------------------------------------|-----------------------------------|
| Comparison          | Strict equality (`===`) only               | Any condition                     |
| Readability         | Good for many discrete values              | Good for ranges and complex conditions |
| Fall-through        | Possible (intentional or accidental)       | Not possible                      |
| Type coercion       | None (strict)                              | Depends on condition              |
| Expression evaluated | Once                                       | Each condition re-evaluated       |

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What is the condition? | The expression inside parentheses. |
| What value is being tested? | The result of evaluating the condition. |
| Which branch was skipped? | The alternative paths not taken. |
| Could the condition coerce unexpectedly? | Check for falsy pitfalls: `0`, `""`, `null`. |
| Why is `break` needed in `switch`? | Without it, execution falls through to the next case. |
| Is this clearer as `if...else`? | If conditions are ranges or complex, yes. |
| Could early returns simplify this? | Guard clauses reduce nesting depth. |
## Next Steps

[Back to Chapter 2](02-logical-operators.md): 02 — Logical Operators: `&&`, `||`, `!`, `??`
[Proceed to Chapter 4](04-iteration-loops.md): 04 — Iteration: `while`, `do...while`, `for`, `for...in`, `for...of` to learn about 04 — iteration: `while`, `do...while`, `for`, `for...in`, `for...of`.
