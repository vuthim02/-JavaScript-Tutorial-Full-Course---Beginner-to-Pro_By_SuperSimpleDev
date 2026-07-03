# Function Composition

## What Is It?

Combining functions so that the **output of one** becomes the **input of the next**.

```javascript
// Compose: right-to-left (mathematical convention: f∘g)
const compose = (...fns) => x =>
    fns.reduceRight((value, fn) => fn(value), x);

// Pipe: left-to-right (more readable)
const pipe = (...fns) => x =>
    fns.reduce((value, fn) => fn(value), x);

const add1   = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const process1 = compose(square, double, add1); // square(double(add1(x)))
const process2 = pipe(add1, double, square);    // same thing, reads left→right

process1(3); // square(double(4)) = square(8) = 64
process2(3); // same: 64
```

## Point-Free Style

```javascript
// ❌ Not point-free — mentions the data argument
const doubleAll = arr => arr.map(x => x * 2);

// ✅ Point-free — function defined without mentioning data
const double   = x => x * 2;
const doubleAll = arr => arr.map(double);

// Even more point-free with a curried map:
const map = fn => arr => arr.map(fn);
const doubleAll = map(double); // no array mentioned anywhere
```

## Real-World Data Pipeline

```javascript
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const processUserInput = pipe(
    str => str.trim(),
    str => str.toLowerCase(),
    str => str.replace(/[^a-z0-9\s]/g, ""),
    str => str.split(/\s+/).filter(Boolean),
    words => [...new Set(words)], // deduplicate
    words => words.sort()
);

processUserInput("  Hello! Hello, World? Yes, world!  ");
// ["hello", "world", "yes"]
```

---

# Pure Functions

## The Two Laws

1. **Same input → same output** (deterministic)
2. **No side effects** (does not touch anything outside itself)

```javascript
// ✅ PURE
function add(a, b) { return a + b; }
function square(x) { return x * x; }
function double(arr) { return arr.map(x => x * 2); } // creates new array

// ❌ IMPURE — depends on external state
let taxRate = 0.1;
function calcPrice(base) { return base + base * taxRate; } // result changes if taxRate changes

// ❌ IMPURE — modifies external state
let total = 0;
function addToTotal(n) { total += n; return total; }

// ❌ IMPURE — side effect (I/O)
function addAndLog(a, b) { console.log("adding"); return a + b; }

// ❌ IMPURE — mutates argument
function addItem(arr, item) { arr.push(item); return arr; } // mutates original!

// ✅ PURE version — creates new array
function addItem(arr, item) { return [...arr, item]; }
```

## Why Pure Functions Matter

### Testability

```javascript
// Pure function — zero setup needed
test("add returns correct sum", () => {
    expect(add(2, 3)).toBe(5);   // always true
    expect(add(-1, 1)).toBe(0);  // always true
});

// Impure — needs mocks, cleanup, setup
test("calcPrice uses tax rate", () => {
    taxRate = 0.2; // setup
    expect(calcPrice(100)).toBe(120);
    taxRate = 0.1; // must clean up — test contamination risk
});
```

### Memoizability

```javascript
// Only pure functions can be safely memoized
function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) cache.set(key, fn(...args));
        return cache.get(key);
    };
}

const memoAdd = memoize(add); // ✅ safe — add is pure
const memoBadFn = memoize(calcPrice); // ❌ wrong results when taxRate changes
```

### Parallelization

Pure functions can safely run in parallel (e.g., in Web Workers) because they share no mutable state.

## Reverse Engineering Checklist

### For Function Composition

| Question | Answer |
|----------|--------|
| Is this `compose` or `pipe`? | Compose = right-to-left. Pipe = left-to-right. |
| What is the data flow? | Input → fn1 → fn2 → fn3 → output. |
| Are all functions pure? | For reliable composition, each step should be deterministic. |
| Can the pipeline be read clearly? | If too long, break into named intermediate steps. |
| Is this point-free style? | Function defined without mentioning the data argument explicitly. |

### For Pure Functions

| Question | Answer |
|----------|--------|
| Is the result deterministic? | Same input always → same output? |
| Does it have side effects? | No I/O, no mutations, no DOM, no random/Date? |
| Can it be safely memoized? | Yes — only pure functions can be memoized correctly. |
| Can it be tested without mocks? | Yes — pure functions need zero setup. |
| Does it mutate its arguments? | If yes → impure. Use spread/map/filter to create new data. |
## Next Steps

[Back to Chapter 23](23-weakref-finalization.md): `WeakRef` & `FinalizationRegistry`
[Proceed to Chapter 25](25-side-effects-and-checklist.md): Side Effects to learn about side effects.
