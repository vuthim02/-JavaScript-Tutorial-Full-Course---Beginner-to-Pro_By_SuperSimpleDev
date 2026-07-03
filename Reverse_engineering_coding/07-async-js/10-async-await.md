# async / await

## What is an async Function?

A function declared with the `async` keyword. It **always returns a promise**.

```javascript
async function test() { }
```

Even this:

```javascript
async function test() {
    return 5;
}
```

Actually returns `Promise.resolve(5)`.

## Equivalent Without async

```javascript
// These are equivalent:
async function foo() { return 5; }

function foo() { return Promise.resolve(5); }
```

## async with No Return

```javascript
async function bar() { /* No return */ }

bar(); // Returns Promise<undefined>
bar().then(console.log); // undefined
```

## async Function Expressions

```javascript
const foo = async function() { return "Hello"; };
const bar = async () => { return "World"; };

// IIFE
(async () => {
    const data = await fetch("/data");
    console.log(await data.json());
})();
```

## async Methods

```javascript
const obj = {
    async getData() { return await fetch("/data"); }
};

class DataService {
    async load() {
        const response = await fetch("/data");
        return response.json();
    }
}
```

## What await Does

Pauses execution of the **current async function** until the promise settles.

```javascript
let data = await fetchData();
```

## await Pauses the Function, Not the Thread

```javascript
async function demo() {
    console.log("A");
    await new Promise(r => setTimeout(r, 1000));
    console.log("C");
}

demo();
console.log("B");

// Output:
// A
// B
// (1 second pause)
// C
```

The thread logged "B" while `demo()` was suspended on `await`.

## await with Non-Promise Values

```javascript
const x = await 42;        // Same as await Promise.resolve(42)
const y = await "hello";   // Same as await Promise.resolve("hello")
```

## await in Loops

```javascript
// Sequential: one at a time
async function processItems(items) {
    for (const item of items) {
        await process(item);
    }
}

// Parallel: all at once
async function processItems(items) {
    await Promise.all(items.map(item => process(item)));
}
```

### ⚠️ TRAP: `forEach` with `await`

`Array.prototype.forEach` does **not** respect `await` — it passes your callback to the next iteration immediately:

```javascript
async function processItems(items) {
    items.forEach(async (item) => {
        await process(item); // BUG: all run in parallel, not sequential
        // Also: this promise is silently discarded — errors are unhandled!
    });
    console.log("Done"); // Runs BEFORE any await completes!
}
```

**Why?** `forEach` takes a callback and calls it synchronously for each element. If the callback returns a Promise (which `async` functions always do), `forEach` ignores it. The result: all iterations run in parallel, and any rejection becomes an **unhandled promise rejection**.

| Intent | Correct Pattern |
|--------|----------------|
| Sequential | `for (const x of items) { await fn(x); }` |
| Parallel | `await Promise.all(items.map(x => fn(x)))` |

## await Needs an async Function

```javascript
// ERROR
function bad() {
    await fetch("/data"); // SyntaxError
}

// CORRECT
async function good() {
    await fetch("/data");
}
```

Top-level await is allowed in **ES modules** (not scripts):

```javascript
// In a .mjs file or <script type="module">
const data = await fetch("/data").then(r => r.json());
export default data;
```

### ⚠️ TRAP: Top-level await delays module execution

When a module uses top-level `await`, all modules that `import` from it are **blocked** until the await resolves. This can create a waterfall where one slow network call delays your entire app's initialization. Use top-level await sparingly — prefer loading data in an explicit `init()` function if startup time matters.

## Common Mistake: Forgetting await

```javascript
async function load() {
    const data = fetch("/data"); // Missing await!
    console.log(data); // Promise { <pending> }
    const json = await data.json(); // Error: data.json is not a function
}
```

## Q&A

| Question | Answer |
|----------|--------|
| Is return value normal? | No, always wrapped in a promise. |
| Does an async function that throw return a rejected promise? | Yes. |
| Which function pauses on `await`? | The current async function. |
| Entire application pauses? | No. Only the async function. Other code continues. |
| Does `await` block the event loop? | No. It suspends the function; the event loop continues. |
| What does `await` return? | The fulfillment value (or throws if rejected). |
## Next Steps

[Back to Chapter 9](09-promise-chaining.md): Promise Chaining
[Proceed to Chapter 11](11-fetch-api.md): Fetch API to learn about fetch api.
