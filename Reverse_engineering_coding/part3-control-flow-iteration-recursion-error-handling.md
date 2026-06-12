# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

## Part 3 — Control Flow, Iteration, Recursion, Error Handling, and Reverse Engineering

---

# Mission

At this stage, you are no longer just learning syntax.

You are learning:

- How programs make decisions.
- How programs repeat tasks.
- How algorithms are built.
- How JavaScript handles failures.
- How to reverse engineer complex code.

---

# Chapter 1 — Control Flow Fundamentals

## What Is Control Flow?

**Control flow** determines the order in which individual statements, instructions, or function calls are executed. By default, JavaScript executes code **top to bottom, left to right** — this is called **sequential execution**.

```javascript
console.log("A");  // executes first
console.log("B");  // executes second
console.log("C");  // executes third
```

Execution trace:

```text
Step 1: console.log("A")  → output: A
Step 2: console.log("B")  → output: B
Step 3: console.log("C")  → output: C
```

Control flow structures allow us to break out of this linear sequence by introducing **branching** (decisions), **looping** (repetition), and **jumping** (function calls, returns, breaks).

## Types of Control Flow

| Type           | Structures                                      | Purpose                       |
|----------------|-------------------------------------------------|-------------------------------|
| Sequential     | `;` (statement separator)                       | Execute in order              |
| Conditional    | `if`, `else`, `switch`, ternary `? :`          | Execute based on condition    |
| Iterative      | `for`, `while`, `do...while`, `for...in`, `for...of` | Repeat execution        |
| Jump           | `break`, `continue`, `return`, `throw`          | Transfer control elsewhere    |
| Invocation     | `()`, `call`, `apply`, `bind`                   | Execute a function            |

## Reverse Engineering Questions

### For any control flow structure

| Question                              | Answer                                               |
|---------------------------------------|------------------------------------------------------|
| Why is this line executed now?        | Because the preceding statement completed and flow reached it. |
| What condition led here?              | What evaluated to what to reach this branch?         |
| Which branch was skipped?             | The alternative paths that were not taken.           |
| What happens if the condition changes?| Would a different branch execute?                    |
| What is the path of execution?        | Trace the exact order of statements.                 |

---

# Chapter 2 — Boolean Logic Deep Dive

## What Is Boolean Logic?

Boolean logic deals with values that are either `true` or `false`. All conditions in JavaScript ultimately evaluate to a boolean.

## Comparison Operators — Detailed

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

### Comparison of Different Types

When comparing different types with relational operators (`>`, `<`, `>=`, `<=`), JavaScript coerces both to numbers (generally):

```javascript
"10" > 5    // true  ("10" → 10)
"abc" < 5   // false ("abc" → NaN, and NaN comparisons always return false)
"10" > "5"  // false (string comparison — "1" is less than "5" lexicographically!)
"10" > "05" // true  (string comparison — "1" > "0")
null >= 0   // true  (null → 0)
null > 0    // false (null → 0, 0 > 0 is false)
null == 0   // false (special rule — null only == undefined)
undefined >= 0 // false (undefined → NaN, NaN comparison always false)
```

### Special Values in Comparisons

```javascript
NaN === NaN     // false — NaN is never equal to anything, including itself
NaN < 5         // false
NaN > 5         // false
NaN == NaN      // false

Infinity > 1000000  // true
-Infinity < 0       // true
Infinity === Infinity // true
```

## Logical Operators — Detailed

### AND (`&&`)

Returns the first **falsy** operand, or the last operand if all are truthy.

```javascript
true && true         // → true
true && false        // → false
false && true        // → false
false && false       // → false

// Short-circuit behavior
0 && console.log("never runs")    // → 0  (short-circuits: console.log never called)
1 && console.log("runs")          // → logs "runs" (evaluates both)

// Practical examples
let user = { name: "John" };
user && console.log(user.name);   // "John" (guard: only access if user exists)

let isAdmin = false;
let result = isAdmin && "Admin panel";
console.log(result);              // false (isAdmin is falsy, returns it)
```

### OR (`||`)

Returns the first **truthy** operand, or the last operand if all are falsy.

```javascript
true || true         // → true
true || false        // → true
false || true        // → true
false || false       // → false

// Short-circuit behavior
1 || console.log("never runs")     // → 1  (short-circuits)
0 || console.log("runs")           // → logs "runs" (0 is falsy, evaluates second)

// Practical examples
let name = "";
let displayName = name || "Guest";
console.log(displayName);          // "Guest" (empty string is falsy)

let count = 0;
let displayCount = count || 10;
console.log(displayCount);         // 10  (0 is falsy — note: 0 might be a valid value!)
```

**Important caveat with `||`:** `0`, `""`, and `false` are all falsy, so `||` will replace them. Use `??` (nullish coalescing) if you only want to replace `null`/`undefined`.

### NOT (`!`)

Returns the **opposite boolean** of its operand.

```javascript
!true   // false
!false  // true
!0      // true  (0 is falsy, !0 → true)
!1      // false (1 is truthy, !1 → false)
!"hello" // false ("hello" is truthy)
!""     // true
!null   // true
!undefined // true
!NaN    // true
```

### Double NOT (`!!`)

Coerces any value to its boolean equivalent:

```javascript
!!0       // false
!!1       // true
!!""      // false
!!"hello" // true
!!null    // false
!!{}      // true
!![]      // true
```

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

Useful for simplifying negated conditions:

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

## Operator Precedence (Boolean context)

1. `!` (NOT) — highest
2. `&&` (AND) — middle
3. `||` (OR) — lowest

```javascript
true || false && false
// Step 1: false && false → false
// Step 2: true || false → true
// Result: true

// Equivalent to:
true || (false && false)

// Use parentheses for clarity:
(true || false) && false  // → false  (different!)
```

## Nullish Coalescing Operator `??` (ES2020)

Returns the right operand only if the left operand is `null` or `undefined`:

```javascript
let value;

value = 0 ?? "default";       // 0  (0 is not null/undefined)
value = "" ?? "default";      // "" (empty string is not null/undefined)
value = false ?? "default";   // false (false is not null/undefined)
value = null ?? "default";    // "default"
value = undefined ?? "default"; // "default"

// Contrast with ||:
0 || "default";              // "default" (0 is falsy)
0 ?? "default";              // 0 (nullish check only)
```

## Reverse Engineering Questions

### For `if (a && b)`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Must both be true?                    | Yes — both `a` and `b` must be truthy.              |
| What if only one is true?             | The condition is false — `if` block is skipped.     |
| Which condition failed?               | If entire condition is false, at least one is falsy. Short-circuit means if `a` is false, `b` is never evaluated. |
| Which operand was evaluated second?   | Only if the first was truthy.                       |
| Could this be simplified?             | Often yes — complex boolean logic can be extracted to a named variable. |

### Reverse engineering complex conditions

```javascript
if (!user || !user.isActive || user.role !== "admin") {
    // block A — error/denied
} else {
    // block B — access granted
}

// Reverse engineered: This checks three failure conditions:
// 1. user is null/undefined
// 2. user.isActive is falsy
// 3. user.role is not "admin"
// Only if ALL three are false does execution reach block B.
```

---

# Chapter 3 — `if` Statement in Depth

## Syntax and Execution

```javascript
if (condition) {
    // block — executes if condition is truthy
}
```

The condition is evaluated in a boolean context. If the result is **truthy**, the block executes. If **falsy**, it is skipped.

```javascript
let score = 80;

if (score >= 50) {
    console.log("Pass");   // executes because 80 >= 50 is true
}
```

Execution trace:

```text
1. Evaluate `score >= 50`
2. `80 >= 50` → `true`
3. Enter the `if` block
4. Execute `console.log("Pass")`
```

Memory during execution:

```text
┌─────────────────────┐
│ score: 80            │
│ condition: true      │
│ (enters block)       │
└─────────────────────┘
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

If the block contains only one statement, braces are optional:

```javascript
if (condition) console.log("Single statement");

// Equivalent to:
if (condition) {
    console.log("Single statement");
}
```

**Warning:** Without braces, only the immediate next statement is conditional. This is a common source of bugs:

```javascript
if (condition)
    console.log("This is conditional");
    console.log("This ALWAYS executes"); // NOT part of the if!
```

Always use braces to avoid ambiguity.

## `if...else`

```javascript
if (condition) {
    // block A — executes if condition is truthy
} else {
    // block B — executes if condition is falsy
}
```

Exactly one branch executes. Never both. Never neither.

```javascript
let age = 15;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
// Output: "Minor"
```

Execution trace:

```text
1. Evaluate `age >= 18`
2. `15 >= 18` → `false`
3. Skip `if` block
4. Enter `else` block
5. Execute `console.log("Minor")`
```

### Nested `if...else`

```javascript
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

Execution tree:

```text
         age >= 18?
        /          \
      YES           NO
      /               \
hasLicense?         "Minor"
  /       \
YES        NO
 |          |
"Can     "Adult but
drive"    no license"
```

## `if...else if...else`

```javascript
if (condition1) {
    // block A
} else if (condition2) {
    // block B
} else if (condition3) {
    // block C
} else {
    // block D (fallback)
}
```

**Rules:**
- Conditions are evaluated **top to bottom**.
- The **first** truthy condition's block executes.
- All subsequent `else if` and `else` blocks are skipped.
- If no condition is truthy, the `else` block executes.
- You can have any number of `else if` clauses.

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

Execution trace:

```text
1. score >= 90 → 85 >= 90 → false → skip
2. score >= 80 → 85 >= 80 → true → enter block
3. Execute console.log("B")
4. Skip remaining else-if and else
```

**Critical insight:** Order matters. If you place `score >= 70` before `score >= 80`, then a score of 85 would match `score >= 70` and never reach `score >= 80`:

```javascript
// WRONG ORDER
if (score >= 70) {
    console.log("C");   // 85 matches this first!
} else if (score >= 80) {
    console.log("B");   // never reached
} else if (score >= 90) {
    console.log("A");   // never reached
}
// Output: "C" — wrong!
```

## Reverse Engineering Questions

### For any `if` statement

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the condition being tested?   | The expression inside the parentheses.              |
| What value is being tested?           | The result of evaluating the condition.             |
| What happens if the condition is truthy?  | The `if` block executes.                        |
| What happens if the condition is falsy?   | `else` block (if present) executes, or nothing. |
| Could the condition ever evaluate unexpectedly? | Check for coercion pitfalls (e.g., `0`, `""`, `null`). |
| Is this the most readable order?      | Could conditions be reordered for clarity?          |
| Are there redundant conditions?       | e.g., `if (x > 5) ... else if (x <= 5) ...` — second is unnecessary. |

### Detecting `if` patterns in unknown code

```javascript
// Pattern: Guard clause (early return)
function process(data) {
    if (!data) return null;          // guard
    if (!data.isValid) return null;  // guard
    // main logic
}

// Pattern: Conditional assignment
let role;
if (user.isAdmin) {
    role = "admin";
} else if (user.isModerator) {
    role = "moderator";
} else {
    role = "user";
}

// Pattern: Flag check
if (featureFlags.newUI) {
    renderNewUI();
} else {
    renderOldUI();
}
```

---

# Chapter 4 — `else if` Patterns and Design

## Common Patterns

### Range Checking

```javascript
function getGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}
```

Note: when each branch returns, `else if` is not syntactically required (but the logic is the same).

### Exhaustive Conditions

```javascript
function getDayName(num) {
    if (num === 1) return "Monday";
    if (num === 2) return "Tuesday";
    if (num === 3) return "Wednesday";
    if (num === 4) return "Thursday";
    if (num === 5) return "Friday";
    if (num === 6) return "Saturday";
    if (num === 7) return "Sunday";
    return "Invalid day"; // exhaustive fallback
}
```

### When to Prefer `else if` Over Separate `if`s

Use separate `if`s when each condition is independent:

```javascript
// Independent checks — all may execute
if (hasDrink) pourDrink();
if (hasFood) serveFood();
if (hasMusic) playMusic();
```

Use `else if` when conditions are mutually exclusive:

```javascript
// Mutually exclusive — only one grade assigned
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
// exactly one grade
```

---

# Chapter 5 — Nested Conditionals

## When Nesting Is Necessary

```javascript
function canBorrowBook(user, book) {
    if (user.isActive) {
        if (!book.isCheckedOut) {
            if (user.borrowedCount < user.maxBorrowLimit) {
                return true;
            }
        }
    }
    return false;
}
```

## Refactoring Nested Conditionals

Nested conditionals are often a sign that the code can be simplified.

### Technique 1: Early Returns (Guard Clauses)

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

### Technique 2: Combine Conditions

```javascript
// Before — nested
if (user) {
    if (user.isActive) {
        if (user.role === "admin") {
            // allow
        }
    }
}

// After — combined
if (user && user.isActive && user.role === "admin") {
    // allow
}
```

### Technique 3: Extract to Function

```javascript
// Before
if (user && user.cart && user.cart.items.length > 0) {
    // ...
}

// After
function hasItemsInCart(user) {
    return user && user.cart && user.cart.items.length > 0;
}

if (hasItemsInCart(user)) {
    // ...
}
```

## Reverse Engineering Questions

### For nested conditionals

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which condition is outer?             | Evaluated first — gatekeeper.                       |
| Which condition is inner?             | Only evaluated if outer passes.                     |
| What prevents reaching the inner block? | Any outer condition being falsy.                  |
| Can any conditions be combined?       | Logical AND could flatten some nesting.             |
| Could early returns simplify this?    | If the function exits early, nesting depth reduces. |

---

# Chapter 6 — Ternary Operator (`? :`)

## Syntax

```javascript
condition ? expressionIfTrue : expressionIfFalse
```

The ternary operator is an **expression** — it produces a value.

```javascript
let result = age >= 18 ? "Adult" : "Minor";
// If age >= 18 is true → result = "Adult"
// If age >= 18 is false → result = "Minor"
```

## Equivalent `if...else`

```javascript
// Ternary:
let status = age >= 18 ? "Adult" : "Minor";

// Equivalent if-else:
let status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}
```

## When to Use Ternary

Use ternary for **simple, single-value** conditional assignments.

```javascript
// Good — simple, fits on one line
let access = user.isAdmin ? "full" : "restricted";

// Good — used in template literal
console.log(`User is ${age >= 18 ? "an adult" : "a minor"}`);

// Good — used in return
return count === 0 ? "empty" : `${count} items`;
```

## When NOT to Use Ternary

```javascript
// Bad — nested ternary (hard to read)
let result = a ? (b ? "both" : "only a") : (c ? "only c" : "none");

// Bad — multiple actions
isValid ? (doSomething(), doAnother()) : doSomethingElse(); // side effects in ternary

// Bad — ignored result (use if-else instead)
isActive ? activateUser() : deactivateUser(); // clearer as if-else
```

**Rule of thumb:** If the ternary spans more than one line or is nested, use `if...else`.

## Ternary as Expression (Can Be Used Anywhere a Value Is Expected)

```javascript
// Inside console.log
console.log(`Score: ${score}, Status: ${score >= 50 ? "Pass" : "Fail"}`);

// Inside template literal
const message = `You have ${items.length === 0 ? "no" : items.length} items`;

// Function return
function min(a, b) {
    return a < b ? a : b;
}

// Object property
const config = {
    theme: user.prefersDark ? "dark" : "light"
};
```

## Reverse Engineering Questions

### For ternary

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which part is the condition?          | Before `?`.                                         |
| Which part runs if true?              | Between `?` and `:`.                                |
| Which part runs if false?             | After `:`.                                          |
| Is this clearer as `if...else`?       | If multiple expressions or side effects, yes.       |
| What is the type of the result?       | The type of the chosen expression.                  |
| Could there be a type mismatch?       | `condition ? 1 : "string"` — result type depends on branch. |

---

# Chapter 7 — `switch` Statement

## Syntax

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

## How `switch` Works

1. Evaluate the `switch` expression **once**.
2. Compare the result to each `case` using **strict equality** (`===`).
3. Execute the matching `case` block.
4. Continue until `break` or end of `switch`.

```javascript
let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    default:
        dayName = "Weekend or invalid";
}

console.log(dayName); // "Wednesday"
```

## The `break` Keyword — Fall-Through

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
// Output:
// Two
// Three
```

### Intentional Fall-Through

Sometimes fall-through is useful:

```javascript
let grade = "B";

switch (grade) {
    case "A":
        console.log("Excellent!");
        break;
    case "B":
    case "C":
        console.log("Good");
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
// "B" and "C" both print "Good"
```

### Fall-Through with Multiple Values

```javascript
switch (input) {
    case "y":
    case "yes":
    case "Y":
    case "YES":
        result = "confirmed";
        break;
    case "n":
    case "no":
    case "N":
    case "NO":
        result = "cancelled";
        break;
    default:
        result = "unknown";
}
```

## `switch` with Ranges (Using `true`)

`switch(true)` is a pattern to use `switch` with boolean expressions:

```javascript
let score = 85;
let grade;

switch (true) {
    case score >= 90:
        grade = "A";
        break;
    case score >= 80:
        grade = "B";
        break;
    case score >= 70:
        grade = "C";
        break;
    case score >= 60:
        grade = "D";
        break;
    default:
        grade = "F";
}
```

## `switch` vs `if...else`

| Aspect              | `switch`                                   | `if...else`                       |
|---------------------|--------------------------------------------|-----------------------------------|
| Comparison          | Strict equality (`===`) only               | Any condition                     |
| Readability         | Good for many discrete values              | Good for ranges and complex conditions |
| Fall-through        | Possible (intentional or accidental)       | Not possible                      |
| Type coercion       | None (strict)                              | Depends on condition              |
| Expression evaluated | Once                                       | Each condition re-evaluated      |

## Reverse Engineering Questions

### For `switch`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why is `break` needed?                | Without it, execution falls through to the next case. |
| Which case matched?                   | The one where `switch(expr) === case value`.         |
| What happens without `break`?         | All subsequent cases execute until `break` or end.   |
| Is there a `default` case?            | Always include one for unexpected values.            |
| Could this be clearer as `if...else`? | If conditions are ranges or complex, yes.            |
| Is the comparison strict?             | Yes — `switch` uses `===`.                           |

---

# Chapter 8 — `while` Loop

## Syntax

```javascript
while (condition) {
    // body — executes as long as condition is truthy
}
```

## Execution Flow

```text
1. Evaluate condition
2. If truthy → execute body → go to step 1
3. If falsy → exit loop
```

```javascript
let i = 1;

while (i <= 5) {
    console.log(i);  // 1, 2, 3, 4, 5
    i++;
}
```

Step-by-step:

```text
i=1: condition 1<=5 → true → print 1 → i=2
i=2: condition 2<=5 → true → print 2 → i=3
i=3: condition 3<=5 → true → print 3 → i=4
i=4: condition 4<=5 → true → print 4 → i=5
i=5: condition 5<=5 → true → print 5 → i=6
i=6: condition 6<=5 → false → exit loop
```

## Infinite Loop

```javascript
while (true) {
    // runs forever — use break to exit
    if (someCondition) break;
}

// Or accidentally:
let i = 1;
while (i <= 5) {
    console.log(i);
    // forgot i++ — i stays 1, loop runs forever!
}
```

## Common `while` Patterns

### Reading Until Sentinel Value

```javascript
let input;
let sum = 0;

while (input !== 0) {
    input = Number(prompt("Enter a number (0 to stop):"));
    sum += input;
}
```

### Processing Data Until Empty

```javascript
let queue = ["task1", "task2", "task3"];

while (queue.length > 0) {
    let task = queue.shift();
    console.log(`Processing ${task}`);
}
```

### Countdown

```javascript
let count = 10;

while (count > 0) {
    console.log(count);
    count--;
}
console.log("Blast off!");
```

## Reverse Engineering Questions

### For `while` loop

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which variable changes in each iteration? | The loop variable (e.g., `i`).                    |
| Can the condition ever become false?   | If yes, the loop terminates. If no, infinite loop.  |
| Is there a risk of infinite loop?      | Check if the condition variable is guaranteed to change toward the exit condition. |
| What is the initial value?             | Set before the loop.                                |
| What is the exit condition?            | When the condition becomes falsy.                   |
| How many iterations?                   | Trace the variable changes to count.                |
| Does the loop run at least once?       | Only if the initial condition is truthy.            |

---

# Chapter 9 — `do...while` Loop

## Syntax

```javascript
do {
    // body — executes at least once
} while (condition);
```

## Key Difference from `while`

A `do...while` loop always executes the body **at least once**, even if the condition is falsy from the start.

```javascript
let i = 10;

do {
    console.log(i);  // 10 (executes once)
    i++;
} while (i <= 5);    // 11 <= 5 → false → exit

// Equivalent while never runs:
let j = 10;
while (j <= 5) {     // 10 <= 5 → false → body never executes
    console.log(j);
}
```

## When to Use `do...while`

Use when you need the body to execute before checking the condition:

```javascript
// User input validation — ask at least once
let input;
do {
    input = prompt("Enter a positive number:");
} while (input <= 0);

// Game loop — play at least one round
let playAgain;
do {
    playGame();
    playAgain = confirm("Play again?");
} while (playAgain);
```

## Reverse Engineering Questions

### For `do...while`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why use `do...while`?                 | Because the body must execute at least once.        |
| What executes before the first check? | The entire body.                                    |
| How is this different from `while`?   | `while` may execute 0 times. `do...while` always executes at least once. |
| Is the condition checked before or after the body? | After.                              |

---

# Chapter 10 — `for` Loop

## Syntax

```javascript
for (initialization; condition; update) {
    // body
}
```

## Execution Flow

```text
1. Initialization (executed ONCE before loop)
2. Condition check (before each iteration)
3. If truthy → execute body → execute update → go to step 2
4. If falsy → exit loop
```

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

Step-by-step:

```text
Init:   let i = 0
Iter 1: i < 5 → 0 < 5 → true → print 0 → i++ → i = 1
Iter 2: i < 5 → 1 < 5 → true → print 1 → i++ → i = 2
Iter 3: i < 5 → 2 < 5 → true → print 2 → i++ → i = 3
Iter 4: i < 5 → 3 < 5 → true → print 3 → i++ → i = 4
Iter 5: i < 5 → 4 < 5 → true → print 4 → i++ → i = 5
Iter 6: i < 5 → 5 < 5 → false → exit
```

## All Three Parts of `for`

### Initialization

Executed once. Usually declares the loop variable:

```javascript
for (let i = 0; ...)     // most common
for (let x = 10, y = 20; ...)  // multiple variables
for (; ...)               // empty initialization (variable declared outside)
```

### Condition

Checked before each iteration:

```javascript
for (...; i < arr.length; ...)  // iteration count based on array length
for (...; true; ...)             // infinite loop (use break)
for (...; ; ...)                 // omitted = always true (infinite)
```

### Update

Executed after each iteration:

```javascript
for (...; ...; i++)       // increment
for (...; ...; i--)       // decrement
for (...; ...; i += 2)    // step by 2
for (...; ...; )          // empty update (update inside body)
```

## Common `for` Loop Patterns

### Iterating Array

```javascript
const arr = [10, 20, 30, 40, 50];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

### Reverse Iteration

```javascript
for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);  // 50, 40, 30, 20, 10
}
```

### Stepping

```javascript
for (let i = 0; i < 10; i += 2) {
    console.log(i);  // 0, 2, 4, 6, 8
}
```

### Two Variables

```javascript
for (let i = 0, j = 10; i <= j; i++, j--) {
    console.log(i, j);  // (0,10) (1,9) (2,8) (3,7) (4,6) (5,5)
}
```

### Infinite Loop with Break

```javascript
for (;;) {
    let input = prompt("Enter 'quit' to exit:");
    if (input === "quit") break;
}
```

## `for` Loop Memory

```javascript
for (let i = 0; i < 3; i++) {
    console.log(i);
}
console.log(i); // ReferenceError — i is block-scoped to the for loop!

for (var j = 0; j < 3; j++) {
    console.log(j);
}
console.log(j); // 3 — var leaks outside the loop
```

## Equivalent `while` Loop

```javascript
// for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// equivalent while
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```

## Reverse Engineering Questions

### For `for` loop

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the initialization?           | Executed once — usually sets loop variable.         |
| What is the condition?                | Checked before each iteration.                      |
| What is the update?                   | Executed after each body.                           |
| How many times does the loop run?     | Trace the loop variable: `(end - start) / step`.    |
| Could the loop condition be false initially? | Then body never executes (0 iterations).    |
| What is the loop variable's scope?    | `let i` — block-scoped to the for loop. `var i` — function-scoped. |

### Breaking down any `for` loop

```javascript
for (let i = 0; i < arr.length; i++) {
    // body
}
// Q: What does this loop do?
// A: Iterates through arr from index 0 to arr.length-1.
// Q: What if arr is empty?
// A: 0 < 0 → false → body never executes.
// Q: What if arr.length changes during iteration?
// A: Each iteration recomputes arr.length — can cause unexpected behavior.
```

---

# Chapter 11 — `break` and `continue`

## `break` — Exit Loop Immediately

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;          // loop stops immediately
    }
    console.log(i);     // 0, 1, 2, 3, 4
}
// Execution continues here after break
```

### `break` in Various Loops

```javascript
// while with break
let i = 0;
while (true) {
    if (i >= 5) break;
    console.log(i);
    i++;
}

// do...while with break
let j = 0;
do {
    if (j > 5) break;
    console.log(j);
    j++;
} while (true);
```

### `break` in `switch`

```javascript
switch (value) {
    case 1:
        // ...
        break;  // exits switch
}
```

## `continue` — Skip to Next Iteration

```javascript
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue;       // skip rest of this iteration
    }
    console.log(i);     // 0, 1, 3, 4
}
```

### `continue` in Different Loop Types

```javascript
// for — continue goes to update, then condition
for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) continue;
    console.log(i);     // 1, 3
}

// while — continue goes to condition check
let j = 0;
while (j < 5) {
    j++;
    if (j % 2 === 0) continue;
    console.log(j);     // 1, 3, 5
}

// do...while — continue goes to condition check
let k = 0;
do {
    k++;
    if (k % 2 === 0) continue;
    console.log(k);     // 1, 3, 5
} while (k < 5);
```

**Important:** In `while` and `do...while`, ensure the loop variable is updated BEFORE `continue`, or you may create an infinite loop.

### Filtering with `continue`

```javascript
const arr = [1, "hello", null, 3, undefined, 5, ""];

for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") {
        continue;       // skip non-numbers
    }
    console.log(arr[i]); // 1, 3, 5
}
```

## Labeled Statements

You can label loops and use `break` or `continue` with the label to control outer loops:

```javascript
outer: for (let i = 0; i < 3; i++) {
    inner: for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer;    // breaks BOTH loops
        }
        console.log(i, j);
    }
}
// Output: (0,0) (0,1) (0,2) (1,0)
// Note: (1,1) is never logged, and the outer loop stops after (1,0)
```

```javascript
outer: for (let i = 0; i < 3; i++) {
    inner: for (let j = 0; j < 3; j++) {
        if (j === 1) {
            continue outer; // skips to next i iteration
        }
        console.log(i, j);
    }
}
// Output: (0,0) (1,0) (2,0)
```

## Reverse Engineering Questions

### For `break`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which line terminated the loop?       | The `break` statement.                              |
| Why didn't later iterations run?      | Because `break` exits the loop entirely.            |
| Is `break` inside a loop or switch?   | In loops: exits the loop. In switch: exits the switch. |
| Could this be rewritten without `break`? | Often yes — by making the condition more specific. |

### For `continue`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which iteration was skipped?          | The one where `continue` was triggered.              |
| Why was it skipped?                   | The condition before `continue` was truthy.          |
| Is the loop variable updated correctly? | Ensure update happens before/after `continue` appropriately. |
| Could this be rewritten without `continue`? | Yes — using `if...else` inside the loop body. |

---

# Chapter 12 — `for...of` Loop

## Syntax

```javascript
for (const element of iterable) {
    // body
}
```

`for...of` iterates over **values** of an iterable (arrays, strings, Maps, Sets, etc.).

## Iterating Arrays

```javascript
const numbers = [10, 20, 30];

for (const num of numbers) {
    console.log(num);     // 10, 20, 30
}
```

## Iterating Strings

```javascript
const text = "Hello";

for (const char of text) {
    console.log(char);    // "H", "e", "l", "l", "o"
}
```

## Iterating Maps and Sets

```javascript
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
    console.log(key, value);
}

const set = new Set([1, 2, 3]);
for (const value of set) {
    console.log(value);
}
```

## `for...of` with Index

`for...of` does not give you the index directly. To get both, use `.entries()`:

```javascript
const colors = ["red", "green", "blue"];

for (const [index, color] of colors.entries()) {
    console.log(index, color);
}
// 0 "red"
// 1 "green"
// 2 "blue"
```

## `for...of` vs `for`

| Aspect              | `for...of`                               | `for` loop                               |
|---------------------|------------------------------------------|------------------------------------------|
| Readability         | Clean, intent-revealing                  | More verbose                             |
| Index access        | Requires `.entries()`                    | Direct index                             |
| Control             | Less control — always full iteration     | Full control (step, reverse, etc.)       |
| Performance         | Slightly slower (iterator protocol)      | Slightly faster (direct index)           |
| Works with          | All iterables                            | Anything accessible by index             |
| Destructuring       | Built-in (`const [k,v] of map`)          | Manual                                   |

## Reverse Engineering Questions

### For `for...of`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Are we accessing values? Or indexes?  | Values — `for...of` gives the element, not the index. |
| Is the iterable an array, string, or other? | Any iterable. Check what is being iterated. |
| Do we need the index?                 | If yes, use `.entries()` or a `for` loop.            |
| Can we modify the original array?     | Modifying the element variable does NOT affect the original. `for (const item of arr) { item = 5; }` — no effect. But `arr[i] = 5` does. |

---

# Chapter 13 — `for...in` Loop

## Syntax

```javascript
for (const key in object) {
    // body
}
```

`for...in` iterates over **enumerable property keys** of an object (including inherited ones).

## Iterating Objects

```javascript
const user = {
    name: "John",
    age: 25,
    city: "Boston"
};

for (const key in user) {
    console.log(key, user[key]);
}
// name John
// age 25
// city Boston
```

## `for...in` on Arrays (Not Recommended)

```javascript
const arr = [10, 20, 30];

for (const key in arr) {
    console.log(key, arr[key]);  // 0 10, 1 20, 2 30
}
// key is a STRING "0", "1", "2", not a number!
```

**Why not use `for...in` on arrays:**
1. Keys are strings, not numbers.
2. Iterates over inherited properties (e.g., array methods added to `Array.prototype`).
3. Iterates in arbitrary order (not guaranteed to be insertion order).
4. Slower than `for` or `for...of`.

## `for...in` with `hasOwnProperty`

To filter inherited properties:

```javascript
for (const key in obj) {
    if (obj.hasOwnProperty(key)) {     // or Object.hasOwn(obj, key) (ES2022)
        console.log(key, obj[key]);    // own properties only
    }
}
```

## `for...in` with Prototype Chain

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.walk = function() {};

const dog = new Animal("Rex");

for (const key in dog) {
    console.log(key);     // "name", "walk" — both own and inherited!
}
```

## `for...in` vs `for...of`

| Aspect        | `for...in`                           | `for...of`                           |
|---------------|--------------------------------------|--------------------------------------|
| Iterates      | Keys (property names)                | Values                               |
| Works on      | Objects (also arrays but not ideal)  | Iterables (arrays, strings, Map, Set)|
| Inherited     | Includes inherited enumerable keys   | Does not apply                       |
| Use case      | Objects                              | Arrays, strings, collections         |

## Reverse Engineering Questions

### For `for...in`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this an array or object?           | If it's an array, `for...in` is likely wrong.       |
| Am I iterating keys or values?        | Keys (property names as strings).                   |
| Are inherited properties included?    | Yes — use `hasOwnProperty` to filter.                |
| Could `Object.keys()` be better?      | Often yes — gives an array of own keys only.         |

---

# Chapter 14 — Recursion

## What Is Recursion?

A function that calls itself is **recursive**.

```javascript
function countdown(n) {
    if (n === 0) return;     // base case
    console.log(n);          // 5, 4, 3, 2, 1
    countdown(n - 1);        // recursive call
}

countdown(5);
```

## The Two Essential Parts

### 1. Base Case

The condition that stops recursion. Without it, the function calls itself forever.

```javascript
function countdown(n) {
    if (n === 0) return;     // ← BASE CASE: stops when n reaches 0
    console.log(n);
    countdown(n - 1);
}
```

### 2. Recursive Case

The function calls itself with modified arguments, moving toward the base case.

```javascript
countdown(n - 1);            // ← RECURSIVE CASE: moves toward 0
```

## Classic Recursive Examples

### Factorial

```javascript
function factorial(n) {
    // base case
    if (n <= 1) return 1;
    // recursive case
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

**Call stack for `factorial(5)`:**

```text
factorial(5)
  → 5 * factorial(4)
      → 4 * factorial(3)
          → 3 * factorial(2)
              → 2 * factorial(1)
                  → return 1          (base case)
              → return 2 * 1 = 2
          → return 3 * 2 = 6
      → return 4 * 6 = 24
  → return 5 * 24 = 120
```

Maximum stack depth: 5 frames.

### Fibonacci

```javascript
function fibonacci(n) {
    if (n <= 1) return n;         // base cases: fib(0)=0, fib(1)=1
    return fibonacci(n - 1) + fibonacci(n - 2);  // recursive case
}

console.log(fibonacci(6)); // 8
```

**Call tree for `fibonacci(4)`:**

```text
                 fib(4)
                /      \
          fib(3)        fib(2)
          /    \        /    \
     fib(2)   fib(1) fib(1) fib(0)
     /    \
 fib(1) fib(0)
```

Many redundant calculations — this is why memoization is needed.

### Sum of Array (Recursive)

```javascript
function sumArray(arr) {
    if (arr.length === 0) return 0;         // base case
    return arr[0] + sumArray(arr.slice(1)); // recursive case
}

console.log(sumArray([1, 2, 3, 4, 5])); // 15
```

### Reverse a String (Recursive)

```javascript
function reverse(str) {
    if (str === "") return "";                          // base case
    return reverse(str.slice(1)) + str[0];               // recursive case
}

console.log(reverse("hello")); // "olleh"
```

**Trace for `reverse("hello")`:**

```text
reverse("hello")
  → reverse("ello") + "h"
      → reverse("llo") + "e"
          → reverse("lo") + "l"
              → reverse("o") + "l"
                  → reverse("") + "o"   (base case)
                  → "" + "o" = "o"
              → "o" + "l" = "ol"
          → "ol" + "l" = "oll"
      → "oll" + "e" = "olle"
  → "olle" + "h" = "olleh"
```

### Flatten Nested Arrays

```javascript
function flatten(arr) {
    let result = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));  // recursive
        } else {
            result.push(item);                      // base case
        }
    }
    return result;
}

console.log(flatten([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]
```

## Recursion vs Iteration

| Aspect              | Recursion                        | Iteration                        |
|---------------------|----------------------------------|----------------------------------|
| Memory              | Stack frames (O(depth))          | Single frame (O(1))              |
| Performance         | Slower (function call overhead)  | Faster                           |
| Readability         | Often more elegant               | Can be verbose                   |
| Stack overflow risk | Yes (deep recursion)             | No                               |
| Best for            | Tree traversal, divide-and-conquer | Simple linear tasks            |
| Mutual recursion    | Possible                         | Not applicable                   |

## Tail Recursion

A recursive call is **tail-recursive** if it is the **last operation** in the function and its result is returned directly (no further computation).

```javascript
// NOT tail-recursive — result is used in multiplication
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);   // multiplication after recursive call
}

// Tail-recursive — result is returned directly
function factorialTail(n, accumulator = 1) {
    if (n <= 1) return accumulator;
    return factorialTail(n - 1, n * accumulator);  // no pending operation
}
```

**Tail call optimization (TCO):** Some engines can optimize tail-recursive calls to reuse the current stack frame instead of creating a new one, preventing stack overflow. However, V8 (Node/Chrome) does NOT implement TCO for performance and debugging reasons. Deno and Bun may vary.

## Memoization (Optimizing Recursion)

Store computed results to avoid redundant calculations:

```javascript
function memoizedFibonacci() {
    const cache = {};              // closure for private cache

    function fib(n) {
        if (n <= 1) return n;
        if (cache[n] !== undefined) {
            return cache[n];       // return cached result
        }
        cache[n] = fib(n - 1) + fib(n - 2);
        return cache[n];
    }

    return fib;
}

const fib = memoizedFibonacci();
console.log(fib(50)); // 12586269025 — instant, no stack overflow
```

## Reverse Engineering Questions

### For recursion

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Where is the base case?               | The condition that stops recursion.                 |
| Which parameter changes each call?    | Moves toward the base case.                         |
| Does recursion eventually stop?       | Only if the base case is reachable.                 |
| What is the depth of recursion?       | How many nested calls before base case?             |
| Is this stack-safe?                   | Could it overflow for large input?                  |
| Could this be rewritten iteratively?  | Recursion can always be converted to iteration (with a manual stack). |
| Is there redundant computation?       | Fibonacci without memoization recomputes subtrees.  |
| Is this tail-recursive?               | If the recursive call is the last operation.        |

### Detecting recursion in unknown code

```javascript
function traverse(node) {
    if (!node) return;
    console.log(node.value);
    traverse(node.left);   // ← recursive (tree traversal)
    traverse(node.right);  // ← recursive
}

function process(item) {
    if (condition) {
        return process(subItem); // ← tail-recursive
    }
    return result;
}
```

---

# Chapter 15 — Stack Overflow

## What Is Stack Overflow?

Each function call creates a stack frame. If calls are nested too deeply, the call stack runs out of memory, throwing a `RangeError: Maximum call stack size exceeded`.

```javascript
function infiniteRecursion() {
    infiniteRecursion();  // no base case
}

infiniteRecursion();
// RangeError: Maximum call stack size exceeded
```

## Typical Stack Limits

| Environment | Approximate Limit | Notes                     |
|-------------|-------------------|---------------------------|
| Node.js     | ~10,000 frames    | Varies by system memory   |
| Chrome      | ~10,000 frames    |                           |
| Firefox     | ~30,000 frames    | Larger stack              |
| Safari      | ~50,000 frames    | Largest of major browsers |

## Causes of Stack Overflow

### 1. Missing Base Case

```javascript
function recurse() {
    recurse();
}
```

### 2. Base Case Never Reached

```javascript
function countdown(n) {
    if (n === 0) return;
    console.log(n);
    countdown(n - 2);  // n goes: 5, 3, 1, -1, -3... never hits 0
}
// Still overflows because n === 0 is never true
```

### 3. Too Deep Recursion (Valid but Exceeds Stack)

```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

factorial(100000); // RangeError — valid algorithm, but too deep
```

### 4. Accidental Recursion

```javascript
const obj = {
    get value() {
        return this.value;  // infinite recursion! getter calls itself
    }
};
obj.value; // RangeError
```

## Preventing Stack Overflow

### Solution 1: Iterative Rewrite

```javascript
// Recursive — may overflow for large n
function factorialR(n) {
    if (n <= 1) return 1;
    return n * factorialR(n - 1);
}

// Iterative — no stack growth
function factorialI(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

### Solution 2: Trampoline

A trampoline converts recursive calls into a loop:

```javascript
function trampoline(fn) {
    return function(...args) {
        let result = fn(...args);
        while (typeof result === "function") {
            result = result();     // keep calling until non-function
        }
        return result;
    };
}

// Tail-recursive with trampoline
function factorialT(n, acc = 1) {
    if (n <= 1) return acc;
    return () => factorialT(n - 1, n * acc);  // return THUNK (function) instead of calling
}

const factorial = trampoline(factorialT);
console.log(factorial(100000)); // Works — no stack overflow
```

### Solution 3: Increase Stack Size (Node.js)

```bash
node --stack-size=100000 script.js
```

Not recommended for production — masks the problem.

## Reverse Engineering Questions

### For stack overflow

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why isn't the function returning?     | Because there is no base case or it's unreachable.  |
| Is the call stack growing forever?    | Check if each call moves toward or away from base case. |
| How deep does it go before crashing?  | Environment limit (~10k-50k).                       |
| Can this be converted to iteration?   | Almost always yes.                                  |
| Is this a bug or intentional?         | Usually a bug — but deep recursion may be intentional (e.g., for very deep trees). |

---

# Chapter 16 — Error Handling

## The Problem

Errors happen. Without error handling, the program crashes:

```javascript
console.log("Start");
console.log(user.name);   // TypeError: Cannot read properties of undefined
console.log("End");       // never executed — program crashes
```

## `try...catch`

```javascript
try {
    // code that may throw
} catch (error) {
    // handle the error
}
```

The program survives and continues:

```javascript
console.log("Start");

try {
    console.log(user.name);   // throws ReferenceError
} catch (error) {
    console.log("Error caught:", error.message);
}

console.log("End");           // executes normally

// Output:
// Start
// Error caught: user is not defined
// End
```

## The `error` Object

The `catch` block receives an error object with useful properties:

```javascript
try {
    JSON.parse("{invalid}");
} catch (error) {
    console.log(error.name);      // "SyntaxError"
    console.log(error.message);   // "Unexpected token i in JSON at position 0"
    console.log(error.stack);     // stack trace string
}
```

### Error Object Properties

| Property  | Description                    | Example                              |
|-----------|--------------------------------|--------------------------------------|
| `name`    | Type of error                  | `"TypeError"`                        |
| `message` | Human-readable description     | `"Cannot read property 'x' of null"` |
| `stack`   | Call stack at error point      | Multi-line string with trace         |

## `try...catch...finally`

`finally` executes **regardless** of whether an error occurred or was caught:

```javascript
function processFile(filename) {
    let file;
    try {
        file = openFile(filename);    // may throw
        // process file
    } catch (error) {
        console.error("Error:", error.message);
        throw error;                  // re-throw
    } finally {
        if (file) {
            file.close();             // ALWAYS executes — cleanup
        }
    }
}
```

### Execution Flow

```text
Case 1: No error
  try → finally → continue

Case 2: Error, caught
  try (error) → catch → finally → continue

Case 3: Error, caught, re-thrown
  try (error) → catch → finally → error propagates

Case 4: Error, not caught
  try (error) → finally → error propagates (catch skipped)
```

### When `finally` Runs (Even on `return`)

```javascript
function test() {
    try {
        return "from try";    // return is deferred
    } finally {
        console.log("finally runs");  // executes BEFORE the return
    }
}

console.log(test());
// Output:
// finally runs
// from try
```

## `throw`

You can throw your own errors:

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (error) {
    console.log(error.message); // "Cannot divide by zero"
}
```

### What Can Be Thrown

```javascript
throw new Error("message");         // most common
throw new TypeError("type error");
throw new SyntaxError("syntax");
throw new RangeError("range");
throw "string error";               // works but not recommended
throw 42;                           // works but not recommended
throw { code: 500, message: "Server error" }; // works but not recommended
```

**Best practice:** Always throw `Error` instances (or subclasses). They include stack traces.

## Error Types

### `Error` — Base

```javascript
throw new Error("Generic error");
```

### `SyntaxError`

```javascript
// Triggered by the parser — cannot catch at runtime because parsing failed before execution
// eval() is an exception:
try {
    eval("if(");            // SyntaxError from eval can be caught
} catch(e) {
    console.log(e.name);    // "SyntaxError"
}
```

### `ReferenceError`

```javascript
try {
    console.log(notDefined);
} catch(e) {
    console.log(e.name);    // "ReferenceError"
}
```

### `TypeError`

```javascript
try {
    null.name;              // cannot read property of null
} catch(e) {
    console.log(e.name);    // "TypeError"
}

try {
    const x = 5;
    x();                    // number is not a function
} catch(e) {
    console.log(e.name);    // "TypeError"
}
```

### `RangeError`

```javascript
try {
    const arr = new Array(-1);  // invalid array length
} catch(e) {
    console.log(e.name);        // "RangeError"
}

// Also from infinite recursion (stack overflow)
```

### `URIError`

```javascript
try {
    decodeURI("%invalid");
} catch(e) {
    console.log(e.name);    // "URIError"
}
```

### Custom Error Types

```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

try {
    throw new ValidationError("Email is required", "email");
} catch(error) {
    if (error instanceof ValidationError) {
        console.log(`Field '${error.field}': ${error.message}`);
    }
}
```

## The Outer `catch` (Optional Binding)

If you don't need the error object, you can omit it (ES2019+):

```javascript
try {
    JSON.parse(data);
} catch {
    console.log("Invalid JSON");      // no error variable needed
}
```

## `try...catch` Is Synchronous

`try...catch` only works for synchronous errors, not async operations:

```javascript
// This does NOT work:
try {
    setTimeout(() => {
        throw new Error("Async error");  // not caught by outer try!
    }, 1000);
} catch(e) {
    console.log("Never reached");
}
```

For async errors, use:
- Promise `.catch()`:
  ```javascript
  Promise.reject("async error").catch(e => console.log(e));
  ```
- `async/await` with `try...catch`:
  ```javascript
  async function run() {
      try {
          await riskyOperation();
      } catch(e) {
          console.log(e);
      }
  }
  ```

## Reverse Engineering Questions

### For error handling

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which line may fail?                  | The code inside `try`.                               |
| What happens after failure?           | `catch` runs (if error type matches), program continues. |
| What resources need cleanup?          | Put cleanup in `finally`.                           |
| Is this error recoverable?            | Can the program continue meaningfully?              |
| Should we re-throw?                   | If the caller needs to handle it too.               |
| What type of error is expected?       | Check if specific error types are caught.           |
| Is the error handled or swallowed?    | Empty `catch` swallows errors — makes debugging hard. |
| Is `try...catch` covering async code? | If so, it won't work — need promises or async/await. |

---

# Chapter 17 — Defensive Programming

## What Is Defensive Programming?

Writing code that anticipates and handles invalid inputs, edge cases, and unexpected states — rather than assuming everything works.

## Guard Clauses

Check for invalid conditions at the **start** of a function:

```javascript
// Without guards — nested and fragile
function processUser(user) {
    if (user) {
        if (user.profile) {
            if (user.profile.email) {
                sendEmail(user.profile.email);
            }
        }
    }
}

// With guards — flat and robust
function processUser(user) {
    if (!user) return;
    if (!user.profile) return;
    if (!user.profile.email) return;
    sendEmail(user.profile.email);
}
```

## Type Checking

```javascript
function greet(name) {
    if (typeof name !== "string") {
        throw new TypeError("Expected string for 'name', got " + typeof name);
    }
    console.log("Hello, " + name.toUpperCase());
}
```

## Default Values

```javascript
function createUser(name, role) {
    return {
        name: name || "Anonymous",
        role: role || "user",
        createdAt: new Date()
    };
}

// Better with nullish coalescing (preserves valid falsy values like 0):
function config(options) {
    return {
        timeout: options.timeout ?? 5000,
        retries: options.retries ?? 3
    };
}
```

## Input Validation

```javascript
function divide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Both arguments must be numbers");
    }
    if (b === 0) {
        throw new RangeError("Division by zero");
    }
    return a / b;
}
```

## Boundary Checks

```javascript
function getElement(arr, index) {
    if (!Array.isArray(arr)) {
        throw new TypeError("First argument must be an array");
    }
    if (index < 0 || index >= arr.length) {
        throw new RangeError(`Index ${index} out of bounds (0-${arr.length - 1})`);
    }
    return arr[index];
}
```

## Common Defensive Patterns

### Null/Undefined Check

```javascript
// Old
if (value !== null && value !== undefined) { }

// Modern — optional chaining
value?.property

// Modern — nullish coalescing
value ?? defaultValue
```

### Empty Collection Check

```javascript
function processItems(items) {
    if (!items || items.length === 0) {
        return [];      // return empty result instead of crashing
    }
    return items.map(process);
}
```

### Number Validation

```javascript
function calculateInterest(principal, rate, years) {
    if (!Number.isFinite(principal) || principal <= 0) {
        throw new RangeError("Principal must be a positive finite number");
    }
    if (!Number.isFinite(rate) || rate < 0) {
        throw new RangeError("Rate must be a non-negative finite number");
    }
    // ...
}
```

## The Cost of Being Too Defensive

Too many checks can obscure the main logic. Balance defense with readability:

```javascript
// Too defensive — hard to read
function process(data) {
    if (data === null || data === undefined) throw ...;
    if (typeof data !== "object") throw ...;
    if (!Array.isArray(data.items)) throw ...;
    if (data.items.length === 0) return [];
    // main logic
}

// Better — document assumptions and trust internal calls
function process(data) {
    if (!data?.items?.length) return [];
    // main logic
}
```

## Reverse Engineering Questions

### For defensive programming

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What invalid inputs could exist?      | null, undefined, wrong type, empty, out of range.   |
| How could users break this function?  | What happens with edge case inputs?                 |
| What assumptions are dangerous?       | Assuming a value exists, is a certain type, or is within range. |
| Is the function defensive or trusting?| Defensive: checks everywhere. Trusting: assumes valid input. |
| What is the cost of a crash here?     | If catastrophic, add defense. If minor, may be acceptable. |

---

# Chapter 18 — Algorithmic Thinking

## The Problem-Solving Mindset

Algorithmic thinking is breaking down a problem into discrete steps and expressing those steps as code.

### General Problem-Solving Template

```text
1. Understand the problem (input → output)
2. Break it down (smaller subproblems)
3. Find patterns (repetition, conditions, transformations)
4. Write pseudocode (English-like steps)
5. Implement (translate to JavaScript)
6. Test (edge cases, expected cases, invalid cases)
7. Optimize (if needed)
```

## Example: Find Maximum

**Problem:** Given an array of numbers, find the largest number.

**Step 1 — Understand:**
```text
Input:  [5, 3, 9, 1, 7]
Output: 9
```

**Step 2 — Break down:**
```text
- Need to examine each element
- Need to keep track of the largest seen so far
- Need to compare each element with current largest
```

**Step 3 — Pseudocode:**
```text
1. Assume first element is the maximum
2. For each remaining element:
     If element > current max:
         Update max to element
3. Return max
```

**Step 4 — Implement:**
```javascript
function findMax(arr) {
    if (arr.length === 0) return undefined;

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
```

**Step 5 — Test:**
```javascript
console.log(findMax([5, 3, 9, 1, 7]));    // 9
console.log(findMax([-5, -2, -10]));       // -2
console.log(findMax([1]));                 // 1
console.log(findMax([]));                  // undefined
```

## Example: Contains Duplicate

**Problem:** Does the array contain any duplicate values?

```javascript
function hasDuplicates(arr) {
    const seen = new Set();

    for (const value of arr) {
        if (seen.has(value)) return true;
        seen.add(value);
    }
    return false;
}

console.log(hasDuplicates([1, 2, 3, 4]));    // false
console.log(hasDuplicates([1, 2, 3, 2]));    // true
```

## Example: Palindrome Check

**Problem:** Is a string the same forwards and backwards?

```javascript
function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("a"));       // true
console.log(isPalindrome(""));        // true
```

## Example: Two Sum

**Problem:** Find two numbers in an array that add up to a target.

```javascript
function twoSum(nums, target) {
    const complements = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (complements.has(complement)) {
            return [complements.get(complement), i];
        }
        complements.set(nums[i], i);
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

## Reverse Engineering Question Template

### For any algorithmic code

```text
Input:
  What type? What values? Empty? Invalid?

Process:
  What happens first? What repeats? What changes?

Output:
  What type? What does the result represent?

Edge Cases:
  What if input is empty? What if all same? What if negative?
  What if very large? What if invalid?

Complexity:
  How many steps for n inputs? (time complexity)
  How much memory? (space complexity)
```

---

# Chapter 19 — Senior Engineer Reverse Engineering Checklist

## Complete Question Set for Any Code

### Entry Point

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| What starts execution?                | Event? Timer? User action? Script load?              |
| Which function is called first?       | The entry point of the logical flow.                 |
| What triggers this code path?         | The initiating condition or event.                   |

### Flow Control

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Which condition controls flow?        | The branching decision.                               |
| Which variables change?               | The mutable state driving the program.               |
| What stops the loop?                  | The exit condition.                                   |
| Could the loop become infinite?       | Check if exit condition is reachable.                 |
| Which branches are possible?          | All condition outcomes.                               |
| Is there dead code?                   | A branch that can never execute.                     |

### Functions

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Which function calls which?           | The call graph — hierarchy of execution.             |
| What is on the call stack?            | Current execution context depth.                      |
| What is the return value?             | What does each function produce?                     |
| What side effects exist?              | Mutations, I/O, network calls.                       |
| Is recursion involved?                | Look for functions calling themselves or mutual recursion. |
| Where is the base case?               | For recursive functions — termination condition.     |

### Data

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| What data structures are used?        | Arrays, objects, Maps, Sets, etc.                    |
| How does data flow?                   | Input → transform → output path.                     |
| Is data mutated or immutable?         | Side effects vs pure transformations.                |
| What errors are possible?             | What could go wrong?                                 |

### Errors

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| What errors are possible?             | Invalid input, missing data, type errors.            |
| Are errors handled?                   | try/catch? Guard clauses?                            |
| Can invalid data arrive?              | External input (user, API, file) is always suspect.  |
| What assumptions does the code make?  | Implicit dependencies that could break.              |

### Mastery

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Can I rewrite this from scratch without looking? | True comprehension.                       |
| Can I explain each line's purpose?    | Complete understanding, not pattern matching.        |
| Can I identify potential bugs?        | Off-by-one, missing edge cases, type issues.         |
| Can I improve the code?               | Performance, readability, maintainability.           |
| What would break if I removed this line? | Essential vs accidental complexity.              |

---

# Chapter 20 — Projects

## Project 1: Multiplication Table Generator

```javascript
function multiplicationTable(size) {
    for (let i = 1; i <= size; i++) {
        let row = "";
        for (let j = 1; j <= size; j++) {
            row += (i * j).toString().padStart(4, " ");
        }
        console.log(row);
    }
}

multiplicationTable(10);
```

**Reverse engineering questions:**
- Which loop runs first (outer vs inner)?
- How many iterations total? (size × size)
- What does `padStart(4, " ")` do?
- Could this be made without nested loops?

## Project 2: Guess the Number Game

```javascript
function guessGame() {
    const secret = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let guess;

    console.log("Guess a number between 1 and 100");

    do {
        guess = Number(prompt("Enter your guess:"));
        attempts++;

        if (guess === secret) {
            console.log(`Correct! It took you ${attempts} attempts.`);
            break;
        } else if (guess < secret) {
            console.log("Too low!");
        } else {
            console.log("Too high!");
        }
    } while (true);
}
```

**Reverse engineering questions:**
- What happens if the user enters non-numeric input?
- What if the user never guesses correctly? (infinite loop)
- How does `Math.random()` work? What does `Math.floor()` do?
- Why `+ 1` after `Math.random() * 100`?

## Project 3: Recursive Factorial with Error Handling

```javascript
function factorial(n) {
    if (typeof n !== "number") {
        throw new TypeError("Input must be a number");
    }
    if (!Number.isInteger(n)) {
        throw new RangeError("Input must be an integer");
    }
    if (n < 0) {
        throw new RangeError("Input must be non-negative");
    }
    if (n > 100) {
        throw new RangeError("Input too large — may cause stack overflow");
    }
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Interactive
function computeFactorial() {
    const input = prompt("Enter a non-negative integer:");
    try {
        const n = Number(input);
        const result = factorial(n);
        console.log(`${n}! = ${result}`);
    } catch (error) {
        console.error(`Error: ${error.name} — ${error.message}`);
    }
}
```

## Project 4: Prime Number Checker

```javascript
function isPrime(n) {
    if (typeof n !== "number" || !Number.isInteger(n) || n < 2) {
        return false;
    }
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    const limit = Math.sqrt(n);
    for (let i = 3; i <= limit; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

function listPrimes(limit) {
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}

console.log(listPrimes(50));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

**Reverse engineering questions:**
- Why check only up to `Math.sqrt(n)`?
- Why check `n % 2 === 0` before the loop?
- Why does the loop start at 3 and increment by 2?
- What is the time complexity? (O(√n) per number)

## Project 5: Calculator with Error Handling

```javascript
function calculate(expression) {
    // Remove whitespace
    expression = expression.replace(/\s+/g, "");

    // Parse: "5+3" → { a: 5, op: "+", b: 3 }
    const match = expression.match(/^(-?\d+)([+\-*/])(-?\d+)$/);

    if (!match) {
        throw new Error(`Invalid expression: "${expression}"`);
    }

    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);

    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                throw new RangeError("Division by zero");
            }
            return a / b;
        default:
            throw new Error(`Unknown operator: ${op}`);
    }
}

function runCalculator() {
    const input = prompt("Enter expression (e.g., 5+3):");
    try {
        const result = calculate(input);
        console.log(`${input} = ${result}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}
```

## Project 6: FizzBuzz (Classic)

```javascript
function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) result.push("FizzBuzz");
        else if (i % 3 === 0) result.push("Fizz");
        else if (i % 5 === 0) result.push("Buzz");
        else result.push(i.toString());
    }
    return result;
}

console.log(fizzBuzz(15).join(", "));
// 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

**Key insight:** Check `% 15` first (FizzBuzz) before `% 3` or `% 5` alone, because `% 15 === 0` implies both `% 3 === 0` and `% 5 === 0`.

---

## Next: Part 4

**Part 4 — Arrays, Objects, Memory Model, and Built-in Methods**

Including:

- Internal memory structure of arrays and objects
- Array algorithms and manipulation
- `map()`, `filter()`, `reduce()` in depth
- `find()`, `findIndex()`, `some()`, `every()`
- `sort()` — comparator functions, stability
- `splice()` vs `slice()`
- `Object.keys()`, `Object.values()`, `Object.entries()`
- Destructuring (objects and arrays)
- Spread operator (`...`) and Rest operator (`...`)
- Shallow copy and Deep copy (expanded)
- Immutability patterns
- Chaining methods
- Performance considerations
- Reverse engineering tactics used by senior JavaScript engineers
