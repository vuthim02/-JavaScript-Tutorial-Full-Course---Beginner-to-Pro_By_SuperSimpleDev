# Hoisting and the Temporal Dead Zone

<img src="https://media.giphy.com/media/SvFocn0wNMx0iv2rYz/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is Hoisting?

**Hoisting** is what JavaScript does **before** it runs your code.

Before executing any code, JavaScript does a quick **first pass** through your file. During this pass, it:
1. Finds all `var` declarations and creates them (with value `undefined`)
2. Finds all `function` declarations and stores the entire function
3. Creates space for `let` and `const` but does NOT initialize them

**Important:** Only **declarations** are hoisted. **Assignments** stay where they are.

---

## `var` Hoisting — Creates `undefined` First

```javascript
// What YOU write:
console.log(myName);    // What happens?
var myName = "Tim";
console.log(myName);    // What happens?

// What JAVASCRIPT SEES (after hoisting):
var myName;             // ← hoisted declaration (value is undefined)
console.log(myName);    // → undefined  (exists but has no value)
myName = "Tim";         // ← assignment stays in place
console.log(myName);    // → "Tim"
```

**Key insight:** `var` hoisting creates the variable immediately but gives it `undefined` until the assignment line is reached.

```javascript
function greetUser() {
    console.log("Greeting: " + message);  // "Greeting: undefined"
    var message = "Hello, Tim!";
    console.log("Greeting: " + message);  // "Greeting: Hello, Tim!"
}

greetUser();
```

---

## `let` and `const` Hoisting — The Temporal Dead Zone (TDZ)

`let` and `const` are hoisted (the engine knows they exist), but they are **NOT initialized**. They live in the **Temporal Dead Zone (TDZ)** until their declaration line is reached.

Accessing a variable in the TDZ causes a `ReferenceError` — NOT `undefined` like `var`.

```javascript
console.log(score);    // ❌ ReferenceError: Cannot access 'score' before initialization
let score = 100;
console.log(score);    // ✅ 100
```

### The Temporal Dead Zone — Visualized

```
function example() {

    // ══════════════════════════════════════════════
    //    🚫 TEMPORAL DEAD ZONE (TDZ) for `score`
    //       score EXISTS but is NOT initialized
    //       Accessing it → ReferenceError
    // ══════════════════════════════════════════════

    let score = 100;   // ← TDZ ENDS HERE — score is initialized

    // ══════════════════════════════════════════════
    //    ✅ SAFE ZONE — score = 100, accessing is fine
    // ══════════════════════════════════════════════

    console.log(score);  // 100
}
```

### Why Does TDZ Exist?

TDZ makes bugs easier to find. With `var`, accessing before declaration silently gives `undefined`, which can cause mysterious bugs. With `let`/`const`, you get an immediate loud error.

```javascript
// var — silent bug that's hard to find:
var count;
function increment() {
    count = count + 1;  // NaN if count is undefined... but where's the bug?
}

// let — immediate, clear error:
function process() {
    return value;        // ❌ Clear ReferenceError at this exact line
    let value = 100;
}
```

---

## Function Declarations Are Fully Hoisted

Function **declarations** are completely hoisted — both the name AND the body. You can call them before they appear:

```javascript
sayHello();    // → "Hello!"  ✅ Works before declaration

function sayHello() {
    console.log("Hello!");
}
```

---

## Function Expressions Are NOT Fully Hoisted

If you assign a function to a variable, only the **variable** is hoisted (as `undefined`), not the function:

```javascript
greet();    // ❌ TypeError: greet is not a function

var greet = function() {
    console.log("Hello!");
};

// What JavaScript sees:
var greet;           // ← only declaration hoisted (value: undefined)
greet();             // ❌ TypeError: undefined is not a function
greet = function() { // ← assignment stays here
    console.log("Hello!");
};
```

With `let` you get a TDZ error instead:

```javascript
greet();    // ❌ ReferenceError: Cannot access 'greet' before initialization
let greet = function() {
    console.log("Hello!");
};
```

---

## Hoisting Priority: Functions Win Over Variables

When both a function AND a variable share the same name, function declarations win during hoisting:

```javascript
console.log(value);     // → [Function: value]  (not undefined!)

var value = "a string";
function value() {
    return "a function";
}

console.log(value);     // → "a string" (assignment happened after)
```

**What JavaScript sees:**

```javascript
// Step 1: Functions hoisted FIRST
function value() { return "a function"; }

// Step 2: var declaration — ignored (value already exists)
var value;  // ignored

// Step 3: Execution begins
console.log(value);  // [Function: value] — function wins at hoisting
value = "a string";  // assignment changes value
console.log(value);  // "a string" — assignment wins after execution
```

---

## Complete Hoisting Summary

| Code Pattern | Result | Why |
|-------------|--------|-----|
| `console.log(x); var x = 5;` | `undefined` | `var` hoisted, not yet assigned |
| `console.log(x); let x = 5;` | `ReferenceError` | TDZ — `let` not initialized |
| `console.log(x); const x = 5;` | `ReferenceError` | TDZ — `const` not initialized |
| `foo(); function foo() {}` | Works! | Function declaration fully hoisted |
| `foo(); var foo = function() {}` | `TypeError` | `var` hoisted as `undefined` |
| `foo(); let foo = () => {}` | `ReferenceError` | TDZ |

---

## Reverse Engineering Questions

### For `console.log(x)` before `x` is declared:

| Question | Answer |
|----------|--------|
| Was `x` declared with `var`? | You get `undefined` — no crash |
| Was `x` declared with `let` or `const`? | You get `ReferenceError` — crash |
| Was `x` never declared at all? | You get `ReferenceError: x is not defined` |
| Is `x` a function declaration? | You get the function — it works! |
| Is `x` a function expression stored in `var`? | You get `TypeError` — `undefined` is not callable |
## Next Steps

[Back to Chapter 3](03-var-let-const.md): var vs let vs const
[Proceed to Chapter 5](05-value-vs-reference-mutation.md): Value vs Reference and Mutation to learn about value vs reference and mutation.
