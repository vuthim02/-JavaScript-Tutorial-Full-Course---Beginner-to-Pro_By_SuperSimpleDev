# Function Expression

## Syntax

```javascript
// Anonymous expression
const greet = function() {
    console.log("Hello");
};

// Named expression
const greet = function sayHello() {
    console.log("Hello");
    console.log(sayHello); // name is visible INSIDE only
};
```

## NOT Hoisted — The Key Difference

```javascript
// ❌ ReferenceError — const is in TDZ
greet();
const greet = function() { console.log("Hello"); };

// ❌ TypeError — var is hoisted as undefined, not callable
greet2();
var greet2 = function() { console.log("Hello"); };
// var greet2 = undefined at this point → undefined() → TypeError
```

## Named Function Expression — Why Bother?

```javascript
const factorial = function calc(n) {
    if (n <= 1) return 1;
    return n * calc(n - 1); // ✅ safe recursion via name
};

factorial(5); // 120
calc(5);      // ❌ ReferenceError — name not in outer scope
```

Benefits of naming:
1. **Better stack traces** — shows `calc` instead of `<anonymous>`
2. **Safe recursion** — even if `factorial` variable is reassigned
3. **Self-documenting** — name describes purpose

## Conditional Assignment (Only Possible With Expressions)

```javascript
let validate;

if (environment === "strict") {
    validate = function strictValidate(val) { /* ... */ };
} else {
    validate = function looseValidate(val) { /* ... */ };
}
```

## Declaration vs Expression — Full Comparison

| Aspect | Declaration | Expression |
|--------|-------------|------------|
| Hoisting | ✅ Full (name + body) | ❌ Variable only |
| Anonymous allowed | ❌ No | ✅ Yes |
| Conditional assignment | ❌ Avoid in blocks | ✅ Yes |
| Stack trace name | Declaration name | Variable or expression name |
| Common use | Top-level utilities | Callbacks, closures, assignments |

---

# Anonymous Functions

## What Are They?

Functions without a name identifier.

```javascript
// Anonymous expression
const greet = function() { console.log("Hello"); };

// Anonymous arrow
const greet = () => console.log("Hello");

// Anonymous as callback
setTimeout(function() { console.log("done"); }, 1000);
setTimeout(() => console.log("done"), 1000);
```

## Named vs Anonymous in Stack Traces

```javascript
// ❌ Anonymous — stack trace shows "<anonymous>"
setTimeout(function() {
    throw new Error("Oops");
}, 0);
// Error: Oops
//   at <anonymous>:2:11   ← hard to debug

// ✅ Named — stack trace is helpful
setTimeout(function onTimeout() {
    throw new Error("Oops");
}, 0);
// Error: Oops
//   at onTimeout          ← clear!
```

## IIFE (Immediately Invoked)

```javascript
// Anonymous IIFE
(function() {
    console.log("Runs immediately");
})();

// Arrow IIFE
(() => {
    console.log("Also runs immediately");
})();
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Is this hoisted? | Expression = no. Declaration = yes (full hoist). |
| Does the function have a name? | Declaration = yes. Expression = optional (named or anonymous). |
| Why use a named expression? | Better stack traces, self-recursion, self-documentation. |
| Can I conditionally assign? | Only with expressions — declarations inside blocks are unreliable. |
| What does the stack trace show? | Named expression: the name. Anonymous: `<anonymous>`. |
| Is `calc` accessible outside? | No — the name is only visible inside the function body. |
## Next Steps

[Back to Chapter 1](01-function-declarations.md): Big Picture — What Is a Function?
[Proceed to Chapter 3](03-arrow-functions.md): Arrow Functions to learn about arrow functions.
