# Generator Functions & `yield`

## What Is a Generator?

A **generator function** is a function that can be **paused and resumed**. It uses the `function*` syntax and the `yield` keyword to produce a sequence of values on demand.

```javascript
function* simpleGenerator() {
    console.log("Before first yield");
    yield 1;
    console.log("Between yields");
    yield 2;
    console.log("After last yield");
    return 3;  // final value (done: true)
}

const gen = simpleGenerator(); // creates a generator object — nothing runs yet!

console.log(gen.next()); // "Before first yield" → { value: 1, done: false }
console.log(gen.next()); // "Between yields"     → { value: 2, done: false }
console.log(gen.next()); // "After last yield"   → { value: 3, done: true }
console.log(gen.next()); //                      → { value: undefined, done: true }
```

## How Generators Work Internally

```
State machine: each call to .next() advances from one yield to the next

function* gen() {
    [START]
    yield 1;   ← checkpoint 1
    yield 2;   ← checkpoint 2
    return 3;  ← end
}

gen.next() → runs from [START] to yield 1, pauses, returns {value:1, done:false}
gen.next() → runs from yield 1 to yield 2, pauses, returns {value:2, done:false}
gen.next() → runs from yield 2 to return, returns {value:3, done:true}
gen.next() → nothing left, returns {value:undefined, done:true}
```

## Generators Are Iterables

```javascript
function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
}

// Use with for...of (calls .next() automatically)
for (const n of range(1, 5)) {
    console.log(n); // 1, 2, 3, 4, 5
}

// Spread
console.log([...range(0, 10, 2)]); // [0, 2, 4, 6, 8, 10]

// Destructure
const [first, second, third] = range(100, 200, 50);
console.log(first, second, third); // 100, 150, 200
```

## Two-Way Communication — Sending Values IN

`yield` is an expression — `gen.next(value)` passes `value` back into the generator as the result of the `yield` expression.

```javascript
function* calculator() {
    let result = 0;
    while (true) {
        const input = yield result; // pauses AND receives next value
        if (input === null) break;
        result += input;
    }
    return result;
}

const calc = calculator();
calc.next();      // start the generator → { value: 0, done: false }
calc.next(10);    // send 10 in → { value: 10, done: false }
calc.next(5);     // send 5 in  → { value: 15, done: false }
calc.next(null);  // signal end → { value: 15, done: true }
```

## `yield*` — Delegate to Another Iterable

```javascript
function* letters() {
    yield "a";
    yield "b";
}

function* numbers() {
    yield 1;
    yield* letters(); // delegate — yields all of letters()'s values
    yield 2;
}

console.log([...numbers()]); // [1, "a", "b", 2]

// Works with any iterable
function* flattenArray(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* flattenArray(item); // recursive delegation
        } else {
            yield item;
        }
    }
}

console.log([...flattenArray([1, [2, [3, 4]], 5])]); // [1, 2, 3, 4, 5]
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Does a generator run when created? | No — `function*()` returns a generator object, nothing runs until `.next()`. |
| What does `yield` do? | Pauses execution and emits a value to the caller. |
| What does `.next()` return? | `{ value: any, done: boolean }`. |
| Can you send values into a generator? | Yes — `gen.next(value)` makes `value` the result of the `yield` expression. |
| Is a generator iterable? | Yes — works with `for...of`, spread, destructuring. |
| What is `yield*`? | Delegates to another iterable — yields all its values. |
| When do generators stop? | When the function returns or falls off the end (`done: true`). |
## Next Steps

[Back to Chapter 18](18-async-patterns-and-event-loop.md): Async Function Anti-Patterns & Microtask Queue
[Proceed to Chapter 20](20-generators-advanced.md): Generators — Advanced Topics to learn about generators — advanced topics.
