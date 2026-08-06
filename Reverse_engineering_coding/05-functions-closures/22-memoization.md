# Chapter 22 — Memoization

## Overview

Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again.

---

## Basic Implementation

```javascript
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveAdd = memoize((a, b) => {
    console.log('Computing...');
    return a + b;
});

expensiveAdd(1, 2); // "Computing..." → 3
expensiveAdd(1, 2); // 3 (cached, no log)
```

---

## Fibonacci Example

```javascript
// Slow: O(2^n)
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// Fast: O(n) with memoization
const fastFib = memoize(function fib(n) {
    if (n <= 1) return n;
    return fastFib(n - 1) + fastFib(n - 2);
});

fastFib(50); // 12586269025 (instant)
```

---

## Limitations

```javascript
// Only works with serializable arguments
const fn = memoize((obj) => obj.x + obj.y);
fn({ x: 1, y: 2}); // 3
fn({ x: 1, y: 2}); // 3 (new object, new key — cache miss!)

// Solution: use a stable key
const fn2 = memoize((x, y) => x + y);
fn2(1, 2); // 3
fn2(1, 2); // 3 (cache hit)
```

---

## Built-in: useMemo (React)

```jsx
const result = useMemo(() => expensiveCalc(data), [data]);
```

---

## Next Steps

[Back to Chapter 21](21-garbage-collection.md): Garbage Collection
[Proceed to Chapter 23](23-weakref-finalization.md): WeakRef and FinalizationRegistry
