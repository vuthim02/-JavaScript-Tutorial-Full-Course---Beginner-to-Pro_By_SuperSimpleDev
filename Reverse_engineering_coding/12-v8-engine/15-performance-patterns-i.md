# 15 — Performance Patterns I: Loops, Memoization & Lazy Evaluation

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Avoid Nested Loops

**Problem:** Quadratic iteration over two arrays.
```javascript
function findDuplicates(arr1, arr2) {
    let dups = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                dups.push(arr1[i]);
            }
        }
    }
    return dups;
}
// 1000×1000 = 1,000,000 iterations; O(n×m)
```

**Fix: Hash Map**

```javascript
function findDuplicates(arr1, arr2) {
    let set = new Set(arr2);
    let dups = [];
    for (let i = 0; i < arr1.length; i++) {
        if (set.has(arr1[i])) {
            dups.push(arr1[i]);
        }
    }
    return dups;
}

// 1000 + 1000 = 2000 operations
// O(n + m) — linear
```

### Big-O Impact

| Approach | 1000 elements | 10,000 elements | 100,000 elements |
|----------|---------------|-----------------|-------------------|
| Nested loops | 1,000,000 | 100,000,000 | 10,000,000,000 |
| Hash map lookup | 2,000 | 20,000 | 200,000 |

The hash map approach is **500x faster** at 100,000 elements.

## Memoization

**Pattern:** Cache results of expensive function calls.

```javascript
const memo = new Map();

function fibonacci(n) {
    if (n <= 1) return n;

    if (memo.has(n)) {
        return memo.get(n);
    }

    const result = fibonacci(n - 1) + fibonacci(n - 2);
    memo.set(n, result);
    return result;
}
```

### Without Memoization

```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   │   ├── fib(1)
│   │   │   └── fib(0)
│   │   └── fib(1)
│   └── fib(2)
│       ├── fib(1)
│       └── fib(0)
└── fib(3)
    ├── fib(2)
    │   ├── fib(1)
    │   └── fib(0)
    └── fib(1)
```

- `fib(2)` computed 3 times.
- Total: 15 calls for `fib(5)`.

### With Memoization

- Each value computed once.
- Total: 9 calls for `fib(5)`.
- For `fib(100)`: 199 calls vs ~1.14×10²¹ calls (astronomical difference).

**Generic Memoization Utility**

```javascript
function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const fib = memoize(function(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});
```

## Lazy Evaluation

**Eager**: compute everything upfront. **Lazy**: compute only when needed.

```javascript
// Eager — computes immediately
const allData = expensiveApiCall(); // Could be wasted if not all used

// Lazy — computes on demand
function getData(key) {
    return expensiveApiCall()[key];
}
```

**Generators for Lazy Sequences**

```javascript
// Without lazy evaluation
function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

const allNumbers = range(1, 1000000);
const first = allNumbers[0]; // Must compute all 1M numbers

// With lazy evaluation (generator)
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const numbers = range(1, 1000000);
const first = numbers.next().value; // Only computes first element
```

**Lazy Initialization Pattern**

```javascript
class Config {
    constructor() {
        this._data = null;
    }

    get data() {
        if (!this._data) {
            this._data = this._loadData();
        }
        return this._data;
    }

    _loadData() {
        console.log('Loading expensive data...');
        return { key: 'value' };
    }
}

const config = new Config();
// Nothing loaded yet
console.log('Object created');
// Later:
console.log(config.data); // Loads now
console.log(config.data); // Uses cached — no reload
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How many iterations? | Multiply loop sizes |
| Can hashing replace loops? | Often O(n²) → O(n) with Set/Map |
| Is this function pure? | Yes → can memoize |
| Are inputs repeated? | Yes → memoization helps |
| Is all data needed immediately? | If no, lazy saves work |
| Can generator help? | Yes for sequences |
## Next Steps

[Back to Chapter 14](14-deoptimization.md): 14 — Deoptimization
[Proceed to Chapter 16](16-performance-patterns-ii.md): 16 — Performance Patterns II: DOM, Debounce, Throttle, rAF to learn about 16 — performance patterns ii: dom, debounce, throttle, raf.
