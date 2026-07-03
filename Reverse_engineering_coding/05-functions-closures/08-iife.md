# IIFE — Immediately Invoked Function Expression

## Syntax Patterns

```javascript
// Classic — function wrapped in (), then called with ()
(function() {
    console.log("IIFE");
})();

// Arrow version
(() => {
    console.log("Arrow IIFE");
})();

// With arguments
(function(name) {
    console.log("Hello, " + name);
})("Alice");

// Alternative wrapping style
(function() {
    console.log("IIFE");
}());
```

## Why Use an IIFE?

### 1. Private Scope (Pre-ES6 Modules)

```javascript
// Without IIFE — pollutes global scope
var config = "production";
function init() { /* ... */ }

// With IIFE — everything is private
(function() {
    var config = "production"; // private
    function init() { /* ... */ }

    // Selectively expose
    window.myApp = { init };
})();

console.log(config); // ❌ ReferenceError — never leaked
```

### 2. Revealing Module Pattern

```javascript
const counter = (function() {
    let count = 0; // private

    return {
        increment() { return ++count; },
        decrement() { return --count; },
        reset()     { count = 0; },
        value()     { return count; }
    };
})();

counter.increment(); // 1
counter.increment(); // 2
counter.value();     // 2
counter.count;       // undefined — truly private
```

### 3. The Classic Loop Problem (var + closure)

```javascript
// ❌ Problem: all callbacks share the same `i`
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Logs: 3, 3, 3

// ✅ Fix with IIFE: each iteration gets its own `j`
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);
    })(i);
}
// Logs: 0, 1, 2

// ✅ Modern fix: use let (block-scoped — creates new binding per iteration)
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Logs: 0, 1, 2
```

**Why does `let` work?** The ECMAScript spec says that `let` in a `for` loop creates a **new lexical declaration** for each iteration — every iteration gets its own `i` with the current value. This is baked into the language since ES6. `const` in `for...of`/`for...in` behaves the same way. `var` does not — it shares one binding across all iterations, which is why the IIFE was needed before ES6.

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Does it run immediately? | Yes — IIFE runs as soon as it's defined. |
| Why wrap in parentheses? | To make it an expression instead of a declaration. |
| What is the main use? | Creating private scope before ES6 modules. |
| Does an IIFE have access to outer scope? | Yes — it closes over variables from the surrounding scope. |
| Can an IIFE return a value? | Yes — assign it: `const x = (function() { return 42; })();`. |
| Is the module pattern still relevant? | Less so with ES modules, but useful for quick private state. |
## Next Steps

[Back to Chapter 7](07-higher-order-functions.md): Higher-Order Functions
[Proceed to Chapter 9](09-scope-chain-and-tdz.md): Scope Chain to learn about scope chain.
