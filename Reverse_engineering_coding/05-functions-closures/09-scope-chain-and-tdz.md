# Scope Chain

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Lexical Scope

Scope is determined at **write time**, not **run time**.

```javascript
const x = "global";

function outer() {
    const x = "outer"; // shadows global x

    function inner() {
        const x = "inner"; // shadows outer x
        console.log(x); // "inner" — always the closest one
    }
    inner();
    console.log(x); // "outer"
}
outer();
console.log(x); // "global"
```

## The Chain Resolution

```
inner() scope:
  innerVar: "inner" ← found here, search stops
        ↑
middle() scope:
  middleVar: "middle"
        ↑
outer() scope:
  outerVar: "outer"
        ↑
Global scope:
  x: "global"
        ↑
null → ReferenceError
```

## Shadowing

```javascript
let value = "global";

function shadow() {
    let value = "local"; // new binding — shadows outer
    console.log(value);  // "local"
}
shadow();
console.log(value); // "global" — outer unchanged
```

> ⚠️ Once a variable is shadowed, there is **no way** to access the outer one from within that scope (unlike some other languages).

## Block Scope (`let` / `const`)

```javascript
{
    let blockScoped = "only here";
    const alsoBlockScoped = "also only here";
    var functionScoped = "leaks out!";
}

console.log(blockScoped);     // ❌ ReferenceError
console.log(alsoBlockScoped); // ❌ ReferenceError
console.log(functionScoped);  // ✅ "leaks out!"
```

---

# TDZ — Temporal Dead Zone (Deep Dive)

## What Is the TDZ?

The **Temporal Dead Zone** is the time between when a `let` or `const` variable is **hoisted** (at the start of its block scope) and when it is **initialized** (the line where you write `let x = ...`).

During this window, the variable **exists in memory but is inaccessible**. Any attempt to read or write it throws a `ReferenceError`.

```
Block enters scope
      │
      │  ← TDZ begins here for x
      │     (x is hoisted but NOT initialized)
      │
      ▼
let x = 10;  ← TDZ ends here, x = 10
      │
      ▼
console.log(x); // 10 — safe to use
```

## TDZ in Code

```javascript
console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization
let a = 5;

console.log(b); // ✅ undefined — var is hoisted AND initialized to undefined
var b = 5;
```

## TDZ Inside Blocks

```javascript
let x = "outer";

{
    // TDZ for the inner x begins here
    console.log(x); // ❌ ReferenceError — NOT "outer"!
    // The inner `let x` is hoisted to the block top, shadowing the outer x
    // but it's in TDZ until the next line
    let x = "inner";
    console.log(x); // "inner"
}
```

> This is the **most common TDZ surprise**: even though `let x = "outer"` exists in the outer scope, once a `let x` is declared in the inner block, the inner `x` immediately shadows the outer one from the top of the block — but is in TDZ until its declaration line.

## TDZ With `const`

```javascript
const y; // ❌ SyntaxError: Missing initializer in const declaration
// const MUST be initialized at declaration
```

```javascript
{
    console.log(y); // ❌ ReferenceError (TDZ)
    const y = 42;
    y = 43;         // ❌ TypeError: Assignment to constant variable
}
```

## TDZ With Default Parameters

```javascript
// Default parameters have their own TDZ!
function test(a = b, b = 1) { // ❌ ReferenceError
    // `b` is in TDZ when `a`'s default tries to use it
}

function valid(a = 1, b = a) { // ✅ — a is already initialized
    return a + b;
}
valid(); // 2
```

## TDZ With `typeof`

```javascript
console.log(typeof undeclaredVar); // "undefined" — no error for truly undeclared

console.log(typeof letVar); // ❌ ReferenceError — TDZ overrides even typeof!
let letVar = 5;
```

## `var` vs `let`/`const` Hoisting — The Full Picture

```
var declaration:
  Phase 1 (Creation): variable created, initialized to undefined
  Phase 2 (Execution): assigned actual value when line is reached

let/const declaration:
  Phase 1 (Creation): variable created, placed in TDZ (NOT initialized)
  Phase 2 (Execution): initialized when line is reached, TDZ ends
```

```javascript
// What the engine sees with var:
var a = undefined; // hoisted initialization
// ... code before declaration ...
a = 5;             // actual assignment

// What the engine sees with let:
// a is in TDZ
// ... any access here → ReferenceError ...
let a = 5;         // TDZ ends, a = 5
```

## Why TDZ Exists

TDZ was introduced to **catch bugs**. With `var`, reading a variable before its declaration silently gives `undefined`, hiding mistakes. With `let`/`const`, the TDZ makes the error explicit and immediate.

## TDZ Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Is this a `let`/`const`? | TDZ exists from start of block to declaration line |
| Does `var` have TDZ? | No — `var` initializes to `undefined` on hoist |
| Does `typeof` help? | No — `typeof` throws ReferenceError in TDZ |
| What about function declarations? | No TDZ — fully hoisted |
| Default parameters — any TDZ? | Yes — parameters have their own TDZ |
## Next Steps

[Back to Chapter 8](08-iife.md): IIFE — Immediately Invoked Function Expression
[Proceed to Chapter 10](10-module-scope.md): Module Scope to learn about module scope.
