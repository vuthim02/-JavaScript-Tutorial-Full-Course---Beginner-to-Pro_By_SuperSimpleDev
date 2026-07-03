# Variables

## What Is a Variable?

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIQ7CujICxg7I-oIS293UI59ZFXiOxeu2vd7MidPA1kQ&s=10">

A variable is a **named container** that holds a value in memory. The variable name is like a label on a box.

```javascript
let age = 25;
```

What happens in memory:

```
Variable name:  age
Memory address: 0x7ffe1234
Value stored:   25
```

---

## The Three Ways to Declare Variables

| Keyword | Scope | Can Reassign? | Can Redeclare? |
|---|---|---|---|
| `let` | Block `{}` | Yes | No |
| `const` | Block `{}` | No | No |
| `var` | Function | Yes | Yes |

---

## `let` — The Modern Mutable Variable

Use `let` when the value **needs to change** after creation.

```javascript
let count = 1;
count = 2;           // OK — reassignment is allowed
count = count + 1;   // OK

let count = 3;       // Error — cannot redeclare in the same scope
```

**Block scope:** the variable only exists inside the nearest `{}`.

```javascript
{
    let x = 10;
    console.log(x); // 10
}
console.log(x); // ReferenceError: x is not defined
```

---

## `const` — The Modern Constant Variable

Use `const` when the value **should not change**.

```javascript
const pi = 3.14;
pi = 3.14159;   // TypeError: Assignment to constant variable
```

**Important nuance with objects and arrays:**

```javascript
const user = { name: "John" };
user.name = "Jane";   // Allowed — changing the object's content
user = {};            // Not allowed — reassigning the variable

// Tip

const Person = {
    age: 34,
    name: "tim"
}

Person.age = 45
Person.name = 23

console.log(
    Person.age,
    Person.name
)
```


`const` protects the **binding** — the connection between the variable name and the value. It does NOT protect the contents of an object or array.

```
const user  →  [memory address 0x1234]  →  { name: "John" }
               ↑                          ↑
          This arrow is         This content CAN change
          protected by const
```

> **Rule of Thumb:** Use `const` by default. Only switch to `let` if you actually need to reassign.

---

## `var` — The Legacy Way (Avoid It)

`var` is the old way with several problems:

```javascript
var x = 10;
var x = 20;    // Allowed — no error! This hides bugs.

{
    var y = 30;
}
console.log(y); // 30 — var ignores the block!
```

**Problems with `var`:**
1. **No block scope** — leaks out of `if` statements, loops, etc.
2. **Can be redeclared** — masks mistakes silently
3. **Confusing hoisting behavior**

> **Modern Rule:** Never use `var`. Use `const` and `let` instead.

---

## Variable Naming Rules

| Rule | Valid Example | Invalid Example |
|---|---|---|
| Must start with a letter, `_`, or `$` | `let name`, `let _private` | `let 1name` |
| Can contain letters, digits, `_`, `$` | `let user1`, `let my_var` | `let user-name` |
| Cannot be a reserved keyword | `let myConst` | `let const` |
| Case-sensitive | `name` and `Name` are different | — |
| Convention: use camelCase | `let firstName` | `let first_name` (valid but unconventional) |

---

## Statements and Semicolons

A **statement** is a single instruction. Statements are usually separated by semicolons:

```javascript
let x = 5;      // statement
let y = 10;     // statement
let sum = x + y; // statement
```

JavaScript has **Automatic Semicolon Insertion (ASI)** — it tries to insert `;` for you. But relying on ASI can cause bugs:

<img src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyM2I4M2w3Nm00YnZkZzZkcmFieHBvbjR6cnZjMzN5cDZ4dmdkbjJrcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qZgHBlenHa1zKqy6Zn/giphy.gif" alt="careful" width="200px" hieght="300px">

```javascript
// This is a bug waiting to happen:
let a = 5
[1, 2, 3].forEach(console.log) // Error — ASI doesn't insert here

// Always write semicolons explicitly:
let a = 5;
[1, 2, 3].forEach(console.log); // Works correctly

//Always write semicolons:

let a = 5;
const name = "John";
[1,2,3].forEach(console.log);
```


> **Rule of Thumb:** Always end statements with `;` explicitly. Never rely on ASI.

---

## Scope: Where Variables Live

**Scope** determines where a variable is accessible:

| Scope Type | Keyword | Where It's Visible |
|---|---|---|
| **Global** | Any (declared at top level) | Everywhere in the file |
| **Function** | `var` | Inside the function where it's declared |
| **Block** | `let`, `const` | Inside the nearest `{}` |

```javascript
let globalVar = "I'm everywhere";

function myFunction() {
    let functionVar = "I'm only inside this function";
    var oldVar = "I'm function-scoped too";

    if (true) {
        let blockVar = "I'm only inside this if block";
        var notBlockVar = "I escape the block!"; // var ignores {}
    }

    console.log(blockVar);   // ReferenceError!
    console.log(notBlockVar); // "I escape the block!" — var leaks
}
```

### var at Global Scope Pollutes `window`

```javascript
var x = 5;
console.log(window.x);  // 5 — var creates window.x in browsers

let y = 10;
console.log(window.y);  // undefined — let does not
```

This is another reason to avoid `var` — it pollutes the global object, potentially conflicting with other libraries.

---

## The Temporal Dead Zone (TDZ)

`let` and `const` are **hoisted** (moved to the top of their scope), but unlike `var`, they are **not initialized** until the declaration line. The window between entering the scope and reaching the declaration is the **Temporal Dead Zone**:

```javascript
{
    // TDZ starts here for `name`
    console.log(name);    // ReferenceError: Cannot access 'name' before initialization
    let name = "John";
    // TDZ ends here
}
```

`var` behaves differently — it is hoisted AND initialized to `undefined`:

```javascript
console.log(age);  // undefined (not a ReferenceError)
var age = 25;
```

## Closures in Loops — `var` vs `let`

The most common closure-related bug in JavaScript comes from `var` in loops:

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0); // 3, 3, 3
}
```

Why? All three closures capture the **same** `i`. Fix with `let` (which creates a new binding each iteration):

```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0); // 0, 1, 2
}
```
### Key takeaways
- Closures capture variables, not copies of values.
- var is function-scoped, so a loop shares one i variable across all iterations.
- let is block-scoped, and in a for loop it creates a fresh binding for each iteration.
- setTimeout runs after the loop completes, so callbacks using var all see the final value (3 in this  example).
- Using let avoids this entire class of bugs and is the modern, recommended approach.

This is one of the strongest practical arguments for preferring `let` over `var`.

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why `const` by default? | Signals intent; prevents accidental reassignment |
| What does `const` actually protect? | The binding (name→value), not object contents |
| What happens if I redeclare `let x`? | SyntaxError — catches bugs early |
| Where does `var` leak to? | Function scope; at top level it becomes `window.x` |
| Can I access `let x` before line 5? | No — `let`/`const` are in the Temporal Dead Zone |
| Why does `var` in a loop cause bugs? | All iterations share the same variable binding |
| What is the fix for loop closure bug? | Use `let` (creates new binding per iteration) |
## Next Steps

[Back to Chapter 4](04-null-undefined-symbol-bigint.md): Null, Undefined, Symbol, BigInt, and typeof
[Proceed to Module 2 Chapter 7](../01-foundations/07-arithmetic-operators.md): Hoisting and the Temporal Dead Zone to learn about hoisting and the temporal dead zone.
