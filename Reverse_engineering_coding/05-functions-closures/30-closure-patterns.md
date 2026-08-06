# Chapter 30 — Common Closure Patterns

## Overview

Practical closure patterns used in real-world JavaScript development.

---

## Module Pattern

```javascript
const counter = (function () {
    let count = 0;
    return {
        increment() { count++; },
        decrement() { count--; },
        getCount() { return count; },
    };
})();

counter.increment();
counter.increment();
counter.getCount(); // 2
```

---

## Once Function

```javascript
function once(fn) {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const initialize = once(() => console.log('Initialized'));
initialize(); // "Initialized"
initialize(); // (nothing — already called)
```

---

## Debounce

```javascript
function debounce(fn, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const search = debounce((query) => fetchResults(query), 300);
```

---

## Throttle

```javascript
function throttle(fn, limit) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => { inThrottle = false; }, limit);
        }
    };
}
```

---

## State Machine

```javascript
function createFSM(initial) {
    let state = initial;
    const transitions = {};
    return {
        transition(event) {
            const next = transitions[state]?.[event];
            if (next) state = next;
        },
        getState() { return state; },
        on(event, to) {
            transitions[state] = transitions[state] || {};
            transitions[state][event] = to;
        },
    };
}
```

---

## Next Steps

[Back to Chapter 29](29-method-shorthand-computed-get-set.md): Method Shorthand and Computed Properties
[Proceed to Chapter 31](31-optional-chaining-function-calls.md): Optional Chaining for Function Calls
