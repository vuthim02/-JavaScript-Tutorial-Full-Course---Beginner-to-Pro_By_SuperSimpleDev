# Closures

## The Core Idea

A **closure** is a function bundled together with its **lexical environment** — the set of variables that were in scope when the function was defined. The closure keeps those variables alive even after the outer function has returned.

```javascript
function makeGreeter(greeting) {
    // greeting lives in makeGreeter's scope
    return function(name) {
        console.log(`${greeting}, ${name}!`);
        // ^ this function CLOSES OVER `greeting`
    };
}

const sayHello = makeGreeter("Hello");
const sayHi    = makeGreeter("Hi");

// makeGreeter has returned — but greeting is still alive inside each function
sayHello("Alice"); // "Hello, Alice!"
sayHi("Bob");      // "Hi, Bob!"
```

## Memory Model

```
After makeGreeter("Hello") returns:

Heap:
┌─────────────────────────────────────────────────────┐
│  sayHello (Function Object)                         │
│  ┌─────────────────────────────────────────────┐    │
│  │  [[Environment]] ──────────────────────┐    │    │
│  └─────────────────────────────────────────┼───┘    │
│                                            │         │
│  makeGreeter's Lexical Environment ◄───────┘         │
│  ┌─────────────────────────────────────────────┐    │
│  │  greeting: "Hello"  (STILL ALIVE!)          │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## Closures Share References, Not Copies

```javascript
function makeCounter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        value:     () => count
    };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.value();     // 1
// All three methods share the SAME count variable
```

## Production Closure Patterns

### Pattern 1 — Data Privacy

```javascript
function createBankAccount(initial) {
    let balance = initial;  // TRULY private — no way to access directly

    return {
        deposit(amount) {
            if (amount <= 0) throw new Error("Invalid amount");
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > balance) throw new Error("Insufficient funds");
            balance -= amount;
            return balance;
        },
        getBalance() { return balance; }
    };
}

const account = createBankAccount(1000);
account.deposit(500);         // 1500
account.balance;              // undefined — truly private
account.getBalance();         // 1500
```

### Pattern 2 — Memoization

```javascript
function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("Cache hit!");
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    // imagine this takes a long time
    return n * n;
});

expensiveCalc(10); // computed
expensiveCalc(10); // Cache hit! — instant
expensiveCalc(20); // computed
```

### Pattern 3 — Once (Run Only Once)

```javascript
function once(fn) {
    let called = false;
    let result;

    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const initDatabase = once(() => {
    console.log("Connecting to DB...");
    return { connection: true };
});

initDatabase(); // "Connecting to DB..."
initDatabase(); // silent — returns same result
initDatabase(); // silent — same result
```

### Pattern 4 — Iterator via Closure

```javascript
function createRange(start, end) {
    let current = start;

    return {
        next() {
            if (current > end) return { done: true, value: undefined };
            return { done: false, value: current++ };
        },
        [Symbol.iterator]() { return this; }
    };
}

const range = createRange(1, 3);
for (const n of range) {
    console.log(n); // 1, 2, 3
}
```

## Closure Memory Leak Warning

```javascript
// ⚠️ This closure retains ALL of bigData just to read its length
function createProcessor(bigData) {
    return {
        size() { return bigData.length; }
        // bigData (potentially huge) stays alive as long as this object lives!
    };
}

// ✅ Extract only what you need
function createProcessor(bigData) {
    const size = bigData.length; // capture just what's needed
    // bigData can now be GC'd after this function returns
    return {
        size() { return size; }
    };
}
```

## ⚠️ Classic Trap: Closure in Loops with `var`

The classic interview puzzle: all callbacks see the final loop value:

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Logs: 3, 3, 3 — not 0, 1, 2!
```

**Why?** `var` is function-scoped, not block-scoped. All three closures reference the **same** `i` variable, which ends at `3`.

**Fix with `let`:** `let` creates a **new** binding for each loop iteration:

```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Logs: 0, 1, 2 — each closure gets its own `i`
```

See [Chapter 8 — The Classic Loop Problem](08-iife.md#3-the-classic-loop-problem-var--closure) for the historical IIFE workaround.

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| What variables does this closure capture? | Trace which outer variables are referenced inside the inner function. |
| How long does the closure live? | As long as the inner function is referenced somewhere. |
| Are captured variables shared or independent? | Each call to the outer function creates a new environment — independent unless same call. |
| Is there a memory risk? | If the closure lives longer than needed, captured data can't be GC'd. |
| Can the closure mutate captured variables? | Yes — closures share references, not copies. |
| What if only part of the data is needed? | Extract only what's needed before creating the closure. |
## Next Steps

[Back to Chapter 10](10-module-scope.md): Module Scope
[Proceed to Chapter 12](12-factory-functions.md): Factory Functions to learn about factory functions.
