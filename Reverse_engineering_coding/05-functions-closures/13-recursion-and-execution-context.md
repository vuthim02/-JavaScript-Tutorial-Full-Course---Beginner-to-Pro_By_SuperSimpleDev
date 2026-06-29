# Recursion Internals

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Anatomy of Recursion

Every recursive function needs:
1. **Base case** — the condition that stops recursion
2. **Recursive case** — the call that moves toward the base case
3. **Progress** — each call must get closer to the base case

```javascript
function countdown(n) {
    if (n <= 0) {         // 1. Base case
        console.log("Done!");
        return;
    }
    console.log(n);       // work
    countdown(n - 1);     // 2. Recursive case — n gets smaller (3. progress)
}
```

## Call Stack During Recursion

```
countdown(3) call:

At deepest point:
┌───────────────────────┐
│ countdown(0) ← top    │ base case, returns
├───────────────────────┤
│ countdown(1)          │
├───────────────────────┤
│ countdown(2)          │
├───────────────────────┤
│ countdown(3)          │
├───────────────────────┤
│ Global Context        │
└───────────────────────┘

Then each frame pops as returns propagate back up.
```

## Factorial — Step by Step

```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// factorial(4) traces as:
// 4 * factorial(3)
//     3 * factorial(2)
//         2 * factorial(1)
//                  ↳ 1  (base case)
//         2 * 1 = 2
//     3 * 2 = 6
// 4 * 6 = 24
```

## Tail Recursion — Stack-Safe Version

A call is **tail recursive** if it is the **very last operation** and its result is returned directly — no pending work after the recursive call.

```javascript
// ❌ NOT tail recursive — pending multiplication after the call
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1); // multiplication happens after return
}

// ✅ Tail recursive — accumulator carries all state forward
function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc); // last operation is the call
}
```

> **Note:** V8 (Chrome/Node.js) does not implement Tail Call Optimization (TCO) in practice. Use iteration for safety with large inputs.

## Converting Recursion to Iteration

```javascript
// Recursive fibonacci (exponential — O(2^n))
function fibRec(n) {
    if (n <= 1) return n;
    return fibRec(n - 1) + fibRec(n - 2);
}

// Iterative fibonacci (linear — O(n))
function fibIter(n) {
    if (n <= 1) return n;
    let [a, b] = [0, 1];
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

fibIter(50); // instant — no stack danger
```

## Stack Overflow

```javascript
function infinite() { infinite(); }
infinite(); // RangeError: Maximum call stack size exceeded

// Safe check
function safeRecurse(depth = 0) {
    try {
        safeRecurse(depth + 1);
    } catch (e) {
        console.log(`Stack overflowed at depth: ${depth}`);
    }
}
```

---

# Execution Context (Detailed)

## What Is an Execution Context?

An **Execution Context (EC)** is a container the engine creates every time code runs. It holds everything needed to track execution:

```
Execution Context
┌──────────────────────────────────────────────┐
│  1. Variable Environment                     │
│     — all variable/function bindings         │
│  2. Lexical Environment                      │
│     — scope chain (outer env reference)      │
│  3. `this` Binding                           │
│     — determined by call pattern             │
└──────────────────────────────────────────────┘
```

## Two Phases: Creation → Execution

```javascript
function example(x) {
    var a = 10;
    let b = 20;
    const c = 30;
    function inner() {}
}
example(5);
```

### Phase 1 — Creation Phase

```
ExecutionContext for example(5):
┌─────────────────────────────────────────────────────────────┐
│  Variable Environment:                                      │
│    x:     5           ← parameter, assigned immediately     │
│    inner: <fn ref>    ← function declaration, fully hoisted │
│    a:     undefined   ← var, hoisted and set to undefined   │
│    b:     <TDZ>       ← let, hoisted but uninitialized      │
│    c:     <TDZ>       ← const, hoisted but uninitialized    │
│                                                             │
│  Scope Chain:                                               │
│    [example's env] → [global env]                           │
│                                                             │
│  this: depends on call site                                 │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2 — Execution Phase

```
Line by line:
  var a = 10;     → a changes from undefined to 10
  let b = 20;     → b leaves TDZ, becomes 20
  const c = 30;   → c leaves TDZ, becomes 30
  function inner  → already hoisted, nothing happens
  // ... rest of code runs
```

## The `this` Keyword (Overview)

`this` is determined at **call time**, not definition time. It is set during the **Creation Phase** of the execution context.

```javascript
function showThis() {
    console.log(this);
}

showThis();            // global (non-strict) or undefined (strict)
const obj = { showThis };
obj.showThis();        // obj
showThis.call({x:1}); // {x: 1}
new showThis();        // newly created object
```

## Reverse Engineering Checklist

### For Recursion

| Question | Answer |
|----------|--------|
| What is the base case? | The condition that stops recursion — without it, infinite recursion. |
| Does each call make progress? | Arguments must move toward the base case. |
| What is the space complexity? | O(n) stack frames for n recursive calls (not tail-optimized in V8). |
| Can this be converted to iteration? | Usually yes — recursion is clarity, not performance. |
| Is tail call optimization used? | No — V8 does not implement TCO. Use iteration for large depths. |

### For Execution Context

| Question | Answer |
|----------|--------|
| What phase is the code in? | Creation (hoisting, TDZ setup) or Execution (line by line). |
| What is in the Variable Environment? | Parameters, `var` declarations (initialized to undefined), function declarations (hoisted). |
| Which variables are in TDZ? | `let` and `const` — hoisted but uninitialized until declaration line. |
| What is the scope chain? | Current environment → outer environments → global → null. |
| Who calls this function? | Determines `this` binding. |
## Next Steps

[Back to Chapter 12](12-factory-functions.md): Factory Functions
[Proceed to Chapter 14](14-this-keyword.md): `this` Keyword — All 5 Contexts to learn about `this` keyword — all 5 contexts.
