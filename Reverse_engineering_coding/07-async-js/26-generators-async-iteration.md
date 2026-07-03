# Generators & Async Iteration

## What Is a Generator?

A function that can pause (`yield`) and resume. Returns a **Generator** object.

```javascript
function* counter() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = counter();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

## Generator Syntax

```javascript
function* myGenerator() {
    yield "first";
    yield "second";
    return "done";
}
```

The `*` marks it as a generator. `yield` pauses and returns a value.

## Generators Are Iterable

```javascript
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const num of range(1, 5)) {
    console.log(num); // 1 2 3 4 5
}

console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]
```

## Two-Way Communication with .next(value)

```javascript
function* dialog() {
    const name = yield "What's your name?";
    yield `Hello, ${name}!`;
    const age = yield "How old are you?";
    yield `${name} is ${age} years old.`;
}

const gen = dialog();
console.log(gen.next().value);        // "What's your name?"
console.log(gen.next("Alice").value); // "Hello, Alice!"
console.log(gen.next().value);        // "How old are you?"
console.log(gen.next("30").value);    // "Alice is 30 years old."
```

## Generator Throw and Return

```javascript
function* safeGen() {
    try {
        yield 1;
        yield 2;
    } catch (e) {
        yield `Caught: ${e.message}`;
    }
}

const gen = safeGen();
console.log(gen.next());      // { value: 1, done: false }
console.log(gen.throw(new Error("Boom"))); // { value: "Caught: Boom", done: false }

// gen.return(value) finishes the generator early
```

## Delegating Generators (yield*)

```javascript
function* inner() {
    yield "a";
    yield "b";
}

function* outer() {
    yield "start";
    yield* inner(); // Delegates to inner generator
    yield "end";
}

console.log([...outer()]); // ["start", "a", "b", "end"]
```

Useful for composing generators.

## Practical Generator Examples

### Lazy Sequence

```javascript
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
// Infinite — but lazy! Only computes on demand
```

### Pagination

```javascript
async function* paginate(url) {
    let nextUrl = url;
    while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        yield data.items;
        nextUrl = data.nextPageUrl;
    }
}

for await (const page of paginate("/api/items")) {
    console.log(`Got ${page.length} items`);
}
```

## Async Generators (async function*)

Combines `async` and generators. Yields promises that get automatically awaited.

```javascript
async function* asyncCounter(max) {
    for (let i = 1; i <= max; i++) {
        await new Promise(r => setTimeout(r, 1000));
        yield i;
    }
}

const gen = asyncCounter(3);
for await (const num of gen) {
    console.log(num); // 1 (after 1s), 2 (after 2s), 3 (after 3s)
}
```

## for await...of

```javascript
async function* streamData() {
    yield await fetch("/part1").then(r => r.json());
    yield await fetch("/part2").then(r => r.json());
    yield await fetch("/part3").then(r => r.json());
}

async function process() {
    for await (const chunk of streamData()) {
        console.log("Received:", chunk);
    }
}
```

## Big Caveat: Generators Are Not Async Themselves

```javascript
function* notAsync() {
    fetch("/data").then(data => {
        // Can't yield here — already returned
    });
    yield "immediate";
}
```

Generators run synchronously until `yield`. For async operations, use `async function*` or `for await...of`.

## Generators vs Async Iterators

| Feature | Generator (`function*`) | Async Generator (`async function*`) |
|---------|------------------------|-------------------------------------|
| Yields | Values | Promises (auto-unwrapped) |
| Iteration | `for...of`, `...spread` | `for await...of` |
| `.next()` returns | `{ value, done }` | `Promise<{ value, done }>` |
| Use case | Lazy sequences, ranges | Paginated API, streams |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does this function use `yield`? | If yes, it's a generator (`function*`) |
| What does `.next()` return? | `{ value: any, done: boolean }` |
| Can you pass values back? | Yes — `generator.next(value)` feeds into `yield` |
| Is this lazy? | Yes — generators compute values on demand |
| Is this async iteration? | Look for `async function*` + `for await...of` |
| Does `yield*` delegate? | Delegates to another generator or iterable |
| Can generators be infinite? | Yes — `while(true) yield x` — but only with lazy consumption |
## Next Steps

[Back to Chapter 25](25-web-workers.md): Web Workers — True Parallelism
[Proceed to Module 8](../08-modules-build/README.md): Modules, npm, Bundlers & Build Tools to learn about modules and build tooling in JavaScript.
