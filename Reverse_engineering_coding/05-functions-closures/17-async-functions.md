# Async Functions & `async`/`await`

<img src="https://media.giphy.com/media/10zxDv7Hv5RF9C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem Async Functions Solve

Before `async`/`await`, chaining asynchronous operations required nesting Promises or callbacks:

```javascript
// Promise chains — better than callbacks, but still verbose
fetchUser(id)
    .then(user => fetchPosts(user.id))
    .then(posts => fetchComments(posts[0].id))
    .then(comments => console.log(comments))
    .catch(err => console.error(err));
```

`async`/`await` makes async code look and reason like synchronous code:

```javascript
// Same logic, far clearer
async function loadData(id) {
    const user     = await fetchUser(id);
    const posts    = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
}
```

## `async` Functions Always Return a Promise

```javascript
async function getValue() {
    return 42;
}

// Equivalent to:
function getValue() {
    return Promise.resolve(42);
}

getValue().then(v => console.log(v)); // 42

// Even returning undefined becomes Promise<undefined>
async function doNothing() {}
doNothing(); // Promise { undefined }
```

## `await` — Pauses Execution Until Promise Resolves

```javascript
async function example() {
    console.log("before");
    const result = await Promise.resolve("hello");
    console.log("after:", result); // runs when promise settles
}

example();
console.log("synchronous"); // this runs BEFORE "after"

// Output:
// before
// synchronous    ← ran while await was waiting
// after: hello
```

## What `await` Does Internally

```
async function runs
    │
    ├─→ hits `await somePromise`
    │   └─→ suspends the async function (returns control to caller)
    │       └─→ call stack continues with other code
    │
    ├─→ somePromise settles
    │   └─→ function is scheduled to resume (as microtask)
    │
    └─→ function resumes after the await line
```

## Error Handling With `try`/`catch`

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.error("Fetch failed:", err.message);
        throw err; // re-throw if caller needs to handle it
    }
}

// Caller
async function main() {
    try {
        const data = await fetchData("/api/users");
        console.log(data);
    } catch (err) {
        console.error("main caught:", err.message);
    }
}
```

## Parallel vs Sequential Execution

```javascript
// ❌ Sequential — waits for each one before starting the next
async function sequential() {
    const a = await fetchA(); // waits 1s
    const b = await fetchB(); // then waits 1s
    const c = await fetchC(); // then waits 1s
    // Total: ~3 seconds
    return [a, b, c];
}

// ✅ Parallel — all start at the same time
async function parallel() {
    const [a, b, c] = await Promise.all([
        fetchA(), // all start immediately
        fetchB(),
        fetchC()
    ]);
    // Total: ~1 second (whichever is slowest)
    return [a, b, c];
}

// ✅ Parallel with individual error handling
async function parallelSafe() {
    const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
    return results.map(r => r.status === "fulfilled" ? r.value : null);
}
```

## Promise Combinators — Full List

```javascript
const p1 = fetch("/api/a");
const p2 = fetch("/api/b");
const p3 = fetch("/api/c");

// All must succeed — rejects if any fails
await Promise.all([p1, p2, p3]);

// First to settle (resolve OR reject) wins
await Promise.race([p1, p2, p3]);

// All settle — never rejects, gives {status, value/reason} for each
await Promise.allSettled([p1, p2, p3]);

// First to RESOLVE wins (ignores rejections unless ALL reject)
await Promise.any([p1, p2, p3]);
```

## `await` Can Be Used on Non-Promises

```javascript
async function test() {
    const x = await 42;       // await wraps it in Promise.resolve(42)
    const y = await "hello";  // same
    const z = await null;     // Promise.resolve(null)
    console.log(x, y, z);    // 42 "hello" null
}
```

## Async Iteration (`for await...of`)

```javascript
// Async generator (produces values asynchronously)
async function* streamData(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield data; // pause and emit one value
    }
}

// Consume with for await...of
async function processAll(urls) {
    for await (const item of streamData(urls)) {
        console.log("Got:", item);
    }
}
```

## Top-Level Await (ES2022, Modules Only)

```javascript
// In a module (.mjs or type="module")
const config = await fetch("/config.json").then(r => r.json());
export { config }; // other modules that import this will wait
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Does an `async` function return a Promise? | Always — even if you return a plain value. |
| Does `await` block the whole thread? | No — only suspends the async function. Other code can run. |
| Is this sequential or parallel? | Multiple `await` = sequential. `Promise.all()` = parallel. |
| How to handle errors? | `try/catch` inside async or `.catch()` on the returned Promise. |
| What happens if you forget `await`? | You get a Promise instead of the resolved value — common bug. |
| Can `await` be used outside async? | Only in modules (top-level await, ES2022). |
| What does `await Promise.reject()` do? | Throws — catch with `try/catch`. |
| How to safely run multiple parallel operations? | `Promise.all()` or `Promise.allSettled()`. |
## Next Steps

[Back to Chapter 16](16-new-target-and-call-stack.md): `new.target`
[Proceed to Chapter 18](18-async-patterns-and-event-loop.md): Async Function Anti-Patterns & Microtask Queue to learn about async function anti-patterns & microtask queue.
