# Variables

<img src="https://media.giphy.com/media/SvFocn0wNMx0iv2rYz/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is a Variable?

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

```javascript
// This is a bug waiting to happen:
let a = 5
[1, 2, 3].forEach(console.log) // Error — ASI doesn't insert here

// Always write semicolons explicitly:
let a = 5;
[1, 2, 3].forEach(console.log); // Works correctly
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
## Next Steps

[Back to Chapter 4](04-null-undefined-symbol-bigint.md): Null, Undefined, Symbol, BigInt, and typeof
[Proceed to Chapter 6](06-hoisting-and-tdz.md): Hoisting and the Temporal Dead Zone to learn about hoisting and the temporal dead zone.
