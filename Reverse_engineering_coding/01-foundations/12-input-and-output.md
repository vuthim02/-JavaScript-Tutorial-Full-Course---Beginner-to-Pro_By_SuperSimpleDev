# Input and Output, Statements, and Comments

<img src="https://media.giphy.com/media/10zxDv7Hv5RF9C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Statements

A **statement** is a single instruction in JavaScript. Think of it like a sentence — it tells the computer to do one thing.

```javascript
let x = 5;      // This is a statement (declares a variable)
console.log(x); // This is another statement (prints to console)
x = x + 1;      // This is a third statement (reassigns)
```

Statements usually end with a semicolon (`;`), though JavaScript's ASI (Automatic Semicolon Insertion) sometimes adds them for you.

---

## Comments

Comments are **notes for humans** that JavaScript ignores entirely:

```javascript
// Single-line comment — everything after // is ignored

/*
  Multi-line comment
  spans multiple lines
*/

console.log("Hello"); // Comments can go after code
```

Use comments to explain **why** you did something, not **what** the code does (the code itself shows the what).

---

## Output — Showing Information

**`console.log()` — Your Best Friend**

This is the main tool for outputting information during development.

```javascript
console.log("Hello, World!");           // Text
console.log(42);                        // Number
console.log({ name: "Alice", age: 30 }); // Object
console.log([1, 2, 3]);                 // Array
console.log("Value:", 42, "Status:", true); // Multiple values
```

**Other console methods:**

| Method | What it does |
|---|---|
| `console.log()` | Standard output |
| `console.error()` | Error output (red) |
| `console.warn()` | Warning output (yellow) |
| `console.info()` | Informational output (blue) |
| `console.debug()` | Verbose/debug output (gray) |
| `console.table()` | Displays data as a table |
| `console.group()` | Groups output in a collapsible section |
| `console.time()` / `console.timeEnd()` | Measures how long code takes |
| `console.trace()` | Shows the call stack |

```javascript
// console.table is great for arrays of objects:
console.table([
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
]);

// console.time measures performance:
console.time("myLoop");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("myLoop"); // myLoop: 3.456ms
```

**Browser-only output:**

```javascript
alert("Hello!");  // Shows a popup modal with a message and OK button
```

---

## Input — Getting Information from Users

**`prompt()` — Browser Input**

```javascript
const name = prompt("What is your name?");
// Shows a text input dialog
// Returns what the user typed as a STRING
// Returns null if the user clicked Cancel

// prompt() ALWAYS returns a string!
// If you need a number, convert it:
const age = Number(prompt("How old are you?"));
```

**`confirm()` — Browser Yes/No**

```javascript
const result = confirm("Are you sure you want to delete this?");
// Shows OK and Cancel buttons
// Returns true if OK was clicked
// Returns false if Cancel was clicked
```

---

## Node.js Input — Reading from the Terminal

```javascript
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name? ", (answer) => {
    console.log(`Hello, ${answer}!`);
    rl.close();
});
```

---

## Reverse Engineering: Input/Output

**When you see `console.log(score)`:**

| Question | Answer |
|---|---|
| Where does `score` come from? | Look for `let score`, `const score`, or `var score` |
| What if `score` isn't defined? | `ReferenceError: score is not defined` |
| What type is `score`? | Determined by what was assigned to it |
| Is it local or global? | Check if it's inside a function (local) or at top level (global) |
| Can it be `undefined`? | Yes, if it was declared but never assigned |
| Why would someone log it? | To debug or inspect its value |
## Next Steps

[Back to Chapter 11](11-type-conversion.md): Type Conversion
[Proceed to Chapter 13](13-beginner-projects.md): Beginner Projects to learn about beginner projects.
