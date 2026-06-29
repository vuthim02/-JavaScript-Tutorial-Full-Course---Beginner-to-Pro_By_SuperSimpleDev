# async / await

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
