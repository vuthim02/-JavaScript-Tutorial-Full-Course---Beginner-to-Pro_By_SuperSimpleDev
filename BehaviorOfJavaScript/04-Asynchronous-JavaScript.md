# Asynchronous JavaScript — Complete Reference

## Table of Contents

1. [Event Loop: Complete Mechanics](#1-event-loop-complete-mechanics)
2. [Callbacks and Callback Hell](#2-callbacks-and-callback-hell)
3. [Promises](#3-promises)
4. [async/await](#4-asyncawait)
5. [Generators and yield](#5-generators-and-yield)
6. [Iterators and Iterables](#6-iterators-and-iterables)
7. [setTimeout, setInterval, setImmediate](#7-settimeout-setinterval-setimmediate)
8. [requestAnimationFrame](#8-requestanimationframe)
9. [Web Workers and Shared Workers](#9-web-workers-and-shared-workers)
10. [Service Workers](#10-service-workers)
11. [Microtasks vs Macrotasks](#11-microtasks-vs-macrotasks)
12. [Job Queue](#12-job-queue)
13. [Non-Blocking I/O](#13-non-blocking-io)
14. [Event-Driven Architecture](#14-event-driven-architecture)
15. [EventTarget and addEventListener](#15-eventtarget-and-addeventlistener)
16. [Custom Events (CustomEvent)](#16-custom-events-customevent)
17. [Event Propagation: Capturing, Targeting, Bubbling](#17-event-propagation)
18. [Event Delegation](#18-event-delegation)
19. [Once Listeners](#19-once-listeners)
20. [AbortController and AbortSignal](#20-abortcontroller-and-abortsignal)
21. [Fetch API](#21-fetch-api)
22. [XMLHttpRequest (Legacy)](#22-xmlhttprequest-legacy)
23. [WebSockets](#23-websockets)
24. [Server-Sent Events](#24-server-sent-events)
25. [Broadcast Channel API](#25-broadcast-channel-api)
26. [Intersection Observer](#26-intersection-observer)
27. [Mutation Observer](#27-mutation-observer)
28. [Resize Observer](#28-resize-observer)
29. [Performance Observer](#29-performance-observer)

---

## 1. Event Loop: Complete Mechanics

### 1.1 Overview

JavaScript is single-threaded. The event loop is the mechanism that allows asynchronous operations to work without blocking the main thread. It is an endless loop where the engine waits for tasks, executes them, then sleeps waiting for more tasks.

### 1.2 Call Stack

The call stack is a LIFO (Last-In-First-Out) structure that tracks function execution contexts. When a function is called, a new stack frame is pushed onto the stack. When the function returns, its frame is popped. The engine can only do one thing at a time — it runs the function at the top of the stack until it completes.

```javascript
function first() {
  console.log("first");
  second();
  console.log("first again");
}

function second() {
  console.log("second");
}

first();
// Call stack: first() → second()
// Output: first → second → first again
```

### 1.3 Task Queue (Macrotask Queue)

The task queue (macrotask queue) holds callbacks from asynchronous operations like `setTimeout`, `setInterval`, I/O, and DOM events. When the call stack is empty, the event loop picks the next task from this queue and pushes it onto the call stack.

### 1.4 Microtask Queue

The microtask queue holds callbacks from Promises (`.then`, `.catch`, `.finally`), `queueMicrotask()`, and `MutationObserver`. After each macrotask completes, the event loop drains the **entire** microtask queue before moving to the next macrotask or rendering.

### 1.5 The Complete Event Loop Cycle

```
1. Execute the next macrotask from the task queue
2. Drain the entire microtask queue (including microtasks added during draining)
3. If a render is pending, perform rendering (browser only)
4. Repeat from step 1
```

### 1.6 Event Loop Algorithm (Detailed)

```
while (queue.hasTasks()) {
  // 1. Run one macrotask
  task = queue.dequeue();
  executeTask(task);

  // 2. Drain all microtasks
  while (microtaskQueue.hasMicrotasks()) {
    microtask = microtaskQueue.dequeue();
    executeMicrotask(microtask);
  }

  // 3. Rendering opportunity (browser only)
  if (shouldRender()) {
    render();
  }
}
```

### 1.7 Key Rules

- Rendering never happens while the engine executes a task
- A long task blocks everything (user input, rendering, other tasks)
- Microtasks can enqueue more microtasks — they all run before the next macrotask
- The microtask queue is drained to empty, including microtasks spawned during draining
- `await` in an async function yields control back to the event loop

### 1.8 Timing Example

```javascript
console.log("1");                          // Sync - call stack

setTimeout(() => console.log("2"), 0);     // Macrotask queue

Promise.resolve().then(() => console.log("3")); // Microtask queue

console.log("4");                          // Sync - call stack

// Output: 1 → 4 → 3 → 2
```

Explanation: `1` and `4` run synchronously. Then the microtask queue drains (`3`). Then the next macrotask runs (`2`).

### 1.9 Node.js Event Loop (libuv)

Node.js uses libuv's event loop with six phases per iteration:

1. **Timers** — `setTimeout()` and `setInterval()` callbacks
2. **Pending callbacks** — I/O callbacks deferred to the next iteration
3. **Idle/Prepare** — Internal use only
4. **Poll** — Retrieve new I/O events, execute I/O callbacks (where most I/O lives)
5. **Check** — `setImmediate()` callbacks
6. **Close callbacks** — Close events (e.g., `socket.on('close', ...)`)

Microtasks and `process.nextTick()` drain between every callback in any phase.

---

## 2. Callbacks and Callback Hell

### 2.1 What is a Callback?

A callback is a function passed as an argument to another function, to be executed later when an operation completes.

```javascript
// Synchronous callback
const nums = [1, 2, 3];
nums.forEach(function(num) {
  console.log(num);
});

// Asynchronous callback
setTimeout(function() {
  console.log("Runs after 1 second");
}, 1000);
```

### 2.2 Synchronous vs Asynchronous Callbacks

| Feature | Synchronous Callback | Asynchronous Callback |
|---------|---------------------|----------------------|
| Execution | Immediately | Later (event loop) |
| Example | `array.forEach()`, `array.map()` | `setTimeout()`, `fetch().then()`, event handlers |
| Blocking | Yes | No |

### 2.3 Common Callback Patterns

**Completion Callback:**
```javascript
function doSomething(callback) {
  // do work...
  callback();
}
```

**Error-First Callback (Node.js convention):**
```javascript
fs.readFile("file.txt", function(err, data) {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log(data);
});
```

### 2.4 Callback Hell (Pyramid of Doom)

When multiple dependent async operations are nested, code becomes deeply indented and unreadable:

```javascript
getUser(userId, (err, user) => {
  if (err) return handleError(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handleError(err);
    getOrderDetails(orders[0].id, (err, details) => {
      if (err) return handleError(err);
      getShippingInfo(details.shipmentId, (err, shipping) => {
        if (err) return handleError(err);
        displayTrackingInfo(shipping);
      });
    });
  });
});
```

**Problems:**
- Hard to read and maintain
- Error handling duplicated at every level
- Difficult to add new steps
- Fragmented stack traces
- Inversion of control (callee decides when/how often callback fires)

### 2.5 Solutions to Callback Hell

**1. Named Functions (flatten the pyramid):**
```javascript
function handleUser(err, user) {
  if (err) return handleError(err);
  getOrders(user.id, handleOrders);
}
function handleOrders(err, orders) {
  if (err) return handleError(err);
  getOrderDetails(orders[0].id, handleDetails);
}
function handleDetails(err, details) {
  if (err) return handleError(err);
  getShippingInfo(details.shipmentId, handleShipping);
}
function handleShipping(err, shipping) {
  if (err) return handleError(err);
  displayTrackingInfo(shipping);
}
getUser(userId, handleUser);
```

**2. Promises (flat chaining):**
```javascript
getUser(userId)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => getShippingInfo(details.shipmentId))
  .then(shipping => displayTrackingInfo(shipping))
  .catch(handleError);
```

**3. async/await (cleanest):**
```javascript
async function trackOrder(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    const shipping = await getShippingInfo(details.shipmentId);
    displayTrackingInfo(shipping);
  } catch (error) {
    handleError(error);
  }
}
```

### 2.6 Promisification

Converting a callback-based function to a Promise:

```javascript
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    });
  };
}

const getUserP = promisify(getUser);
```

---

## 3. Promises

### 3.1 What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value. Added in ES6 (2015).

### 3.2 Promise States

- **Pending** — initial state; operation not yet completed
- **Fulfilled** — operation completed successfully; has a result value
- **Rejected** — operation failed; has a reason (error)

A Promise is settled (resolved) once it transitions from pending to either fulfilled or rejected. It can only settle once.

### 3.3 Creating a Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Perform async work...
  const success = true;
  if (success) {
    resolve("Operation completed!");
  } else {
    reject(new Error("Something went wrong"));
  }
});
```

### 3.4 Consuming Promises

```javascript
myPromise
  .then(result => {
    console.log(result); // "Operation completed!"
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Always runs, regardless of outcome");
  });
```

### 3.5 Promise Chaining

`.then()` and `.catch()` always return new Promises, enabling chaining:

```javascript
fetch("/api/user")
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error("Error in chain:", error));
```

**Chaining rules:**
- If a handler returns a non-thenable value, the new promise is fulfilled with it
- If a handler returns a thenable (Promise), the new promise adopts that thenable's state
- If a handler throws an error, the new promise is rejected with it
- If no corresponding handler is attached, a rejected promise propagates down the chain

### 3.6 Error Handling Patterns

**Pattern 1: Single catch at the end**
```javascript
asyncFunc1()
  .then(result1 => asyncFunc2())
  .then(result2 => asyncFunc2())
  .catch(error => {
    // Handles errors from any step in the chain
  });
```

**Pattern 2: Individual error handling**
```javascript
asyncFunc1()
  .catch(error1 => fallback1())
  .then(result => asyncFunc2())
  .catch(error2 => fallback2());
```

### 3.7 Promise.all()

Takes an iterable of Promises. Resolves when **all** Promises resolve. Rejects with the **first** rejection reason if any Promise rejects.

```javascript
const results = await Promise.all([
  fetch("/api/user"),
  fetch("/api/posts"),
  fetch("/api/settings")
]);
// results is an array of all responses
```

**Key behavior:**
- Resolves with an array of fulfillment values, preserving input order
- Short-circuits on first rejection (ignores other results)
- Empty iterable resolves immediately with `[]`

### 3.8 Promise.allSettled()

Takes an iterable of Promises. Resolves when **all** Promises settle (fulfill or reject). Never rejects.

```javascript
const results = await Promise.allSettled([
  fetch("/api/user"),
  fetch("/api/failing-endpoint"),
  fetch("/api/settings")
]);

results.forEach(result => {
  if (result.status === "fulfilled") {
    console.log("Success:", result.value);
  } else {
    console.log("Failed:", result.reason);
  }
});
```

**Key behavior:**
- Always resolves (never rejects)
- Returns array of `{ status: "fulfilled", value }` or `{ status: "rejected", reason }`
- Use when you need results from all operations regardless of failure

### 3.9 Promise.race()

Settles as soon as the **first** Promise settles (fulfill or reject). The result is that settlement.

```javascript
const fastest = await Promise.race([
  fetch("https://cdn1.example.com/data"),
  fetch("https://cdn2.example.com/data")
]);
```

**Key behavior:**
- Result settles with the first settled Promise's value/error
- Other results are ignored (not cancelled)
- `Promise.race([])` never settles (hangs forever)

**Timeout pattern:**
```javascript
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
}

await withTimeout(fetch("/api/data"), 5000);
```

### 3.10 Promise.any()

Settles as soon as the **first** Promise fulfills. If all reject, rejects with `AggregateError`.

```javascript
const result = await Promise.any([
  fetch("https://cdn1.example.com/data"),
  fetch("https://cdn2.example.com/data"),
  fetch("https://cdn3.example.com/data")
]);

// result is the first successful response
```

**Key behavior:**
- Ignores rejections; waits for first fulfillment
- If all reject, throws `AggregateError` with all rejection reasons in `.errors`
- Use when you need at least one success from multiple sources

**Promise.any() vs Promise.race():**
| | Promise.race() | Promise.any() |
|---|---|---|
| Settles on first | fulfillment OR rejection | fulfillment only |
| All reject | Rejects with first rejection | Rejects with AggregateError |

### 3.11 Promise.resolve() and Promise.reject()

```javascript
// Promise.resolve() — wraps a value into a resolved Promise
const resolved = Promise.resolve(42);
resolved.then(val => console.log(val)); // 42

// If passed a thenable, the returned Promise follows it
const thenable = { then(resolve) { resolve(99); } };
Promise.resolve(thenable).then(val => console.log(val)); // 99

// Promise.reject() — wraps a value into a rejected Promise
const rejected = Promise.reject(new Error("fail"));
rejected.catch(err => console.log(err.message)); // "fail"
```

### 3.12 Promise.withResolvers() (ES2024)

Creates a Promise and returns `{ promise, resolve, reject }` so resolve/reject can be used outside the executor:

```javascript
const { promise, resolve, reject } = Promise.withResolvers();
// Use resolve/reject externally
resolve("done");
```

### 3.13 Promise.try() (ES2025)

Starts a Promise chain while handling synchronous exceptions:

```javascript
Promise.try(() => {
  if (Math.random() > 0.5) throw new Error("sync error");
  return "sync result";
})
  .then(val => console.log(val))
  .catch(err => console.error(err));
```

### 3.14 Key Tips

- Promise-based functions start synchronously but settle asynchronously
- Don't mix rejections and exceptions — use `.then().catch()` or try/catch, not both on the same chain
- `return await promise` inside try/catch is correct and preferred (better stack traces)
- Promises have no "cancellation" — use `AbortController` for that
- Keep Promise chains flat (avoid nesting `.then()` blocks)

---

## 4. async/await

### 4.1 Overview

`async/await` (ES2017) is syntactic sugar over Promises. It makes asynchronous code look and behave like synchronous code while remaining non-blocking.

### 4.2 async Functions

An `async` function always returns a Promise. If the function returns a non-Promise value, it's automatically wrapped in `Promise.resolve()`.

```javascript
async function getData() {
  return 42; // Wrapped in Promise.resolve(42)
}

getData().then(val => console.log(val)); // 42
```

### 4.3 The await Keyword

`await` pauses execution inside an async function until the Promise settles, then returns the fulfilled value or throws the rejection reason.

```javascript
async function fetchUser() {
  const response = await fetch("/api/user");
  const user = await response.json();
  return user;
}
```

**Key behaviors:**
- `await` only pauses the current async function, not the entire program
- Code before the first `await` runs synchronously
- Even if the awaited value is already resolved, the function pauses until the next microtask
- `await` is only valid inside async functions (or at the top level of modules)

### 4.4 Error Handling with try/catch

```javascript
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
    throw error; // Re-throw if caller needs to handle it
  }
}
```

**Alternative: .catch() on the awaited Promise**
```javascript
async function fetchData() {
  const data = await fetch("/api/data")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .catch(err => {
      console.error(err);
      return null;
    });
  return data;
}
```

### 4.5 Sequential vs Parallel Execution

**Sequential (one at a time):**
```javascript
async function sequential() {
  const user = await fetchUser();    // Waits for user
  const posts = await fetchPosts();  // Then waits for posts
  // Total time: user + posts
}
```

**Parallel (all at once):**
```javascript
async function parallel() {
  const [user, posts, settings] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchSettings()
  ]);
  // Total time: max(user, posts, settings)
}
```

### 4.6 Common Mistakes

**1. await in forEach (doesn't work):**
```javascript
// WRONG — forEach ignores the returned Promise
const ids = [1, 2, 3];
ids.forEach(async (id) => {
  await processItem(id); // forEach does NOT await this
});
// Code continues immediately!

// CORRECT — parallel
await Promise.all(ids.map(id => processItem(id)));

// CORRECT — sequential
for (const id of ids) {
  await processItem(id);
}
```

**2. Missing await in try/catch:**
```javascript
// BUG — rejection bypasses catch
async function bad() {
  try {
    return fetch("/api"); // Returns pending Promise
  } catch (err) {
    return fallback; // Never runs!
  }
}

// CORRECT
async function good() {
  try {
    return await fetch("/api"); // Await catches rejection
  } catch (err) {
    return fallback; // Runs on rejection
  }
}
```

**3. Mixing .then() and await:**
```javascript
// AVOID — confusing, unclear error semantics
async function messy() {
  try {
    return await fetch("/api").then(r => r.json());
  } catch (e) { }
}
```

### 4.7 Top-Level await (Modules)

Modules support `await` at the top level:

```javascript
// In a module script
const response = await fetch("/api/data");
const data = await response.json();
console.log(data);
```

### 4.8 Async Iteration (for await...of)

```javascript
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const res = await fetch(`${url}?page=${page}`);
    const data = await res.json();
    if (data.length === 0) return;
    yield data;
    page++;
  }
}

for await (const page of fetchPages("/api/items")) {
  processPage(page);
}
```

---

## 5. Generators and yield

### 5.1 What is a Generator?

A generator is a special function that can pause and resume execution. It's defined with `function*` and returns a Generator object (an iterator).

```javascript
function* count() {
  console.log("Step 1");
  yield 1;
  console.log("Step 2");
  yield 2;
  console.log("Step 3");
  yield 3;
  console.log("Done");
}

const gen = count();
gen.next(); // Logs "Step 1", returns { value: 1, done: false }
gen.next(); // Logs "Step 2", returns { value: 2, done: false }
gen.next(); // Logs "Step 3", returns { value: 3, done: false }
gen.next(); // Logs "Done", returns { value: undefined, done: true }
```

### 5.2 The yield Keyword

`yield` pauses the generator and returns a value to the caller. The generator resumes when `next()` is called again.

```javascript
function* twoWay() {
  const a = yield "First";
  console.log("Received:", a);
  const b = yield "Second";
  console.log("Received:", b);
}

const gen = twoWay();
gen.next();          // { value: "First", done: false }
gen.next("hello");   // Logs "Received: hello", { value: "Second", done: false }
gen.next("world");   // Logs "Received: world", { value: undefined, done: true }
```

The value passed to `next()` becomes the result of the `yield` expression the generator is paused at. The first `next()` call cannot provide a value (no suspended `yield` to receive it).

### 5.3 Generator as an Iterator

Generators are both iterators and iterables (they implement `[Symbol.iterator]` that returns `this`):

```javascript
function* range(start, end) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

// Works with for...of
for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4
}

// Works with spread
const nums = [...range(1, 5)]; // [1, 2, 3, 4]
```

### 5.4 yield* Delegation

`yield*` delegates to another iterable/generator:

```javascript
function* inner() {
  yield 1;
  yield 2;
}

function* outer() {
  yield* inner();
  yield 3;
}

[...outer()]; // [1, 2, 3]
```

### 5.5 Early Termination (return and throw)

```javascript
function* gen() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("Cleanup");
  }
}

const g = gen();
g.next();          // { value: 1, done: false }
g.return("done");  // Logs "Cleanup", { value: "done", done: true }
g.next();          // { value: undefined, done: true }
```

```javascript
function* gen() {
  try {
    const val = yield 1;
  } catch (e) {
    console.log("Error:", e);
  }
}

const g = gen();
g.next();           // { value: 1, done: false }
g.throw(new Error("oops")); // Logs "Error: oops"
```

### 5.6 Generators for Lazy Evaluation

Generators produce values on demand — ideal for infinite sequences or large datasets:

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next(); // { value: 0 }
fib.next(); // { value: 1 }
fib.next(); // { value: 1 }
fib.next(); // { value: 2 }
// Infinite — no memory issues
```

---

## 6. Iterators and Iterables

### 6.1 The Iterator Protocol

An object is an **iterator** if it has a `next()` method that returns `{ value, done }`:

```javascript
const iterator = {
  current: 0,
  last: 3,
  next() {
    if (this.current < this.last) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  }
};

iterator.next(); // { value: 0, done: false }
iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: undefined, done: true }
```

### 6.2 The Iterable Protocol

An object is **iterable** if it implements `[Symbol.iterator]()` which returns an iterator:

```javascript
const myIterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const val of myIterable) {
  console.log(val); // 10, 20, 30
}

const arr = [...myIterable]; // [10, 20, 30]
```

### 6.3 Using Generators as Iterables

```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i < this.end; i++) {
      yield i;
    }
  }
}

for (const num of new Range(1, 5)) {
  console.log(num); // 1, 2, 3, 4
}
```

### 6.4 Built-in Iterables

| Type | Symbol.iterator? | Yields |
|------|:---:|--------|
| Array | Yes | Elements |
| String | Yes | Unicode code points |
| Map | Yes | [key, value] pairs |
| Set | Yes | Values |
| TypedArray | Yes | Elements |
| arguments | Yes | Argument values |
| NodeList | Yes | DOM nodes |
| Generator | Yes | Yielded values |
| Plain `{}` | No | — |

### 6.5 Syntaxes That Use Iterables

- `for...of` loops
- Spread operator (`...`)
- Array destructuring
- `yield*`
- `Array.from()`
- `Promise.all()` / `Promise.race()` / etc.
- `new Map()`, `new Set()`

### 6.6 Async Iterators

For asynchronous data sources, use `Symbol.asyncIterator` and `for await...of`:

```javascript
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      async next() {
        if (i < 3) {
          return { value: i++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for await (const val of asyncIterable) {
  console.log(val);
}
```

---

## 7. setTimeout, setInterval, setImmediate

### 7.1 setTimeout()

Schedules a callback to run after a minimum delay (in milliseconds).

```javascript
const id = setTimeout(callback, delay, arg1, arg2);

// Cancel
clearTimeout(id);
```

**Key behaviors:**
- The callback will NOT run before the delay — it may run later
- Minimum delay is 1ms (browsers); 4ms after 5 levels of nesting
- Background tabs may throttle to 1000ms+
- Returns a numeric timer ID
- `setTimeout(fn, 0)` schedules the callback as the next macrotask (after microtasks)

### 7.2 setInterval()

Repeatedly executes a callback at a fixed interval.

```javascript
const id = setInterval(callback, delay, arg1, arg2);

// Cancel
clearInterval(id);
```

**Key behaviors:**
- Does NOT guarantee exact timing — depends on event loop
- If a callback takes longer than the interval, callbacks will queue
- Nested `setTimeout` is often preferred (allows variable delays)

**Nested setTimeout (preferred over setInterval):**
```javascript
function poll() {
  fetchData().then(() => {
    setTimeout(poll, 1000); // Next poll after current completes
  });
}
setTimeout(poll, 1000);
```

### 7.3 setImmediate() (Node.js only)

Schedules a callback to run after the current poll phase completes (check phase of the event loop).

```javascript
const id = setImmediate(callback, arg1, arg2);

// Cancel
clearImmediate(id);
```

**Key behaviors:**
- Executes after I/O callbacks, before timers
- In I/O callbacks, `setImmediate` always runs before `setTimeout(fn, 0)`
- Outside I/O, the order is non-deterministic
- Has `ref()` and `unref()` methods

### 7.4 Comparison

| Method | When | Context | Repeats |
|--------|------|---------|---------|
| `setTimeout(fn, ms)` | After minimum `ms` delay | Browser + Node | No |
| `setInterval(fn, ms)` | Every `ms` milliseconds | Browser + Node | Yes |
| `setImmediate(fn)` | After current poll phase | Node.js only | No |

### 7.5 process.nextTick() vs setImmediate() (Node.js)

- `process.nextTick()` — runs before the next event loop phase (before microtasks)
- `setImmediate()` — runs in the check phase (after I/O)
- `process.nextTick` can starve I/O if called recursively
- Prefer `setImmediate()` for most use cases

---

## 8. requestAnimationFrame

### 8.1 Overview

`requestAnimationFrame` (rAF) tells the browser to call a callback before the next repaint. It syncs with the display's refresh rate (typically 60Hz/16.67ms per frame, or 120Hz/8.33ms).

```javascript
const id = requestAnimationFrame(callback);

// Cancel
cancelAnimationFrame(id);
```

### 8.2 The Callback

The callback receives a `DOMHighResTimeStamp` (milliseconds since page load):

```javascript
let startTime = null;

function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / 1000, 1); // 1 second duration

  element.style.transform = `translateX(${progress * 300}px)`;

  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

### 8.3 Why rAF Over setTimeout/setInterval

| Feature | requestAnimationFrame | setTimeout/setInterval |
|---------|:---:|:---:|
| Syncs with display refresh | Yes | No |
| Pauses in background tabs | Yes | No |
| Batched with other visual updates | Yes | No |
| Precise timestamp | Yes | No |
| Frame-accurate | Yes | Drifts |

### 8.4 Frame Budget

At 60fps, each frame has ~16.67ms for all work: JS execution, style calculation, layout, paint, compositing. Keep rAF callbacks under ~10ms to avoid dropped frames.

### 8.5 rAF-based Throttling

```javascript
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollPosition();
      ticking = false;
    });
    ticking = true;
  }
});
```

### 8.6 Double-rAF (Post-Paint Timing)

```javascript
requestAnimationFrame(() => {
  // Before paint
  element.classList.add("visible");

  requestAnimationFrame(() => {
    // After previous paint — can measure rendered result
    const rect = element.getBoundingClientRect();
    console.log("Rendered at:", rect);
  });
});
```

### 8.7 Structured Animation Helper

```javascript
function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);
    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// Usage
animate({
  duration: 1000,
  timing: t => t, // linear
  draw: progress => {
    element.style.left = progress * 300 + "px";
  }
});
```

---

## 9. Web Workers and Shared Workers

### 9.1 Web Workers (Dedicated Workers)

Run scripts in a background thread, separate from the main thread. Workers cannot access the DOM.

```javascript
// Main thread
const worker = new Worker("worker.js");

worker.postMessage({ command: "compute", data: [1, 2, 3] });

worker.onmessage = function(event) {
  console.log("Result:", event.data);
};

worker.onerror = function(error) {
  console.error("Worker error:", error.message);
};
```

```javascript
// worker.js
self.onmessage = function(event) {
  if (event.data.command === "compute") {
    const result = heavyComputation(event.data.data);
    self.postMessage(result);
  }
};
```

**Key behaviors:**
- Runs in a completely separate thread with its own event loop
- Cannot access DOM, window, or document
- Communicates via `postMessage()` (structured cloning by default)
- Supports `Transferable` objects for zero-copy transfer
- Created via `new Worker(url)` (URL to a script)

### 9.2 Shared Workers

Can be shared by multiple scripts/windows/tabs of the same origin.

```javascript
// Main thread
const shared = new SharedWorker("shared-worker.js");
shared.port.start();

shared.port.postMessage({ type: "connect" });
shared.port.onmessage = function(event) {
  console.log(event.data);
};
```

```javascript
// shared-worker.js
self.onconnect = function(event) {
  const port = event.data.port;
  port.start();

  port.onmessage = function(e) {
    port.postMessage("Received: " + e.data);
  };
};
```

**Key differences from Dedicated Workers:**
- Shared across multiple browsing contexts (tabs, iframes)
- Uses a `MessagePort` for communication
- Has its own event loop shared by all connections

### 9.3 When to Use Which

| Worker Type | Use Case |
|-------------|----------|
| Dedicated Web Worker | CPU-intensive computation, data processing |
| Shared Worker | Cross-tab coordination, shared state |
| Service Worker | Offline support, caching, push notifications |

---

## 10. Service Workers

### 10.1 Overview

Service Workers act as proxy servers between the web app, the browser, and the network. They enable offline capabilities, background sync, and push notifications. They are a key component of Progressive Web Apps (PWAs).

### 10.2 Registration

```javascript
// Main thread
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(registration => {
      console.log("SW registered:", registration);
    })
    .catch(error => {
      console.log("SW registration failed:", error);
    });
}
```

### 10.3 Service Worker Lifecycle

1. **Registration** — Browser downloads and registers the SW script
2. **Installation** — SW installs (cache assets here)
3. **Activation** — SW activates (clean up old caches here)
4. **Idle** — SW is installed but not controlling pages
5. **Fetching** — SW intercepts network requests
6. **Termination** — SW is terminated when not in use

### 10.4 Basic Service Worker

```javascript
// sw.js
const CACHE_NAME = "v1";
const ASSETS = ["/", "/styles.css", "/app.js"];

// Install — pre-cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate — clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// Fetch — serve from cache, fall back to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

### 10.5 Key Features

- **Offline support** — Serve cached assets without network
- **Background sync** — Queue operations for when connectivity returns
- **Push notifications** — Receive push messages from a server
- **Intercept requests** — Modify, cache, or redirect network requests
- **Runs in its own thread** — Separate from main thread and Web Workers
- **Must be served over HTTPS** (except localhost)

### 10.6 Service Worker vs Web Worker

| Feature | Service Worker | Web Worker |
|---------|:---:|:---:|
| Purpose | Network proxy, caching | Background computation |
| Scope | Entire origin | Single script |
| Lifecycle | Persists across navigations | Dies when page closes |
| Access to DOM | No | No |
| Access to Fetch API | Yes (intercepts requests) | Yes |
| Requires HTTPS | Yes (except localhost) | No |

---

## 11. Microtasks vs Macrotasks

### 11.1 Macrotasks

Macrotasks are scheduled by the browser or Node.js for later execution. Each iteration of the event loop processes **at most one** macrotask.

**Sources:**
- `setTimeout()`, `setInterval()`
- I/O callbacks
- DOM events (`click`, `scroll`, etc.)
- `requestAnimationFrame` (one per render)
- `postMessage`
- MessageChannel

### 11.2 Microtasks

Microtasks are scheduled by JavaScript code. After each macrotask, the **entire** microtask queue is drained before the next macrotask or rendering.

**Sources:**
- `Promise.then()`, `.catch()`, `.finally()`
- `queueMicrotask()`
- `MutationObserver` callbacks
- `async/await` continuations

### 11.3 Execution Order

```javascript
console.log("1: sync");

setTimeout(() => {
  console.log("2: macrotask");
}, 0);

Promise.resolve().then(() => {
  console.log("3: microtask");
});

queueMicrotask(() => {
  console.log("4: microtask");
});

console.log("5: sync");

// Output: 1 → 5 → 3 → 4 → 2
```

### 11.4 Key Differences

| Property | Macrotask | Microtask |
|----------|:---------:|:---------:|
| Queue per event loop | One or more (per source) | One single queue |
| Per iteration limit | One macrotask | All microtasks (drains to empty) |
| Rendering | After microtask drain | Before rendering |
| Can cause starvation | Yes (long task) | Yes (recursive microtask) |
| Priority | Lower | Higher |

### 11.5 Microtask Starvation

A microtask that keeps queuing more microtasks prevents the event loop from processing macrotasks, rendering, or handling input:

```javascript
// DANGER: Starves the event loop
function starve() {
  queueMicrotask(starve); // Never lets the loop advance
}
starve();
```

**Solution:** Use `setTimeout(fn, 0)`, `MessageChannel`, or `scheduler.yield()` to yield to a macrotask boundary.

### 11.6 queueMicrotask()

The standard API for scheduling microtasks:

```javascript
queueMicrotask(() => {
  // Runs as a microtask after current task
  console.log("Microtask");
});
```

Prefer `queueMicrotask()` over `Promise.resolve().then()` when you only need to schedule a side effect.

---

## 12. Job Queue

### 12.1 What is a Job Queue?

The job queue (also called the microtask queue) is where microtasks are placed when they need to execute. It is a FIFO queue that is drained to empty between tasks.

### 12.2 Jobs in the ECMAScript Specification

The ECMAScript specification defines "Jobs" as abstract operations that execute in the job queue. The host environment (browser or Node.js) provides the concrete implementation.

**Types of Jobs:**
- **Promise Jobs** — Promise reactions from `then`/`catch`/`finally` handlers
- **EnqueueJob** — Generic jobs from `queueMicrotask()`
- **FinalizationRegistry Jobs** — Cleanup callbacks (optional, unreliable)

### 12.3 Job Queue Mechanics

- Each agent (execution context) has one job queue
- One job runs at a time, to completion
- Promise reactions are FIFO — handlers execute in the order they were registered
- The job queue is drained after each task/macrotask
- Microtasks scheduled by microtasks execute during the same drain

### 12.4 Promise Job Queue in Detail

```javascript
const p = Promise.resolve();
p.then(() => {
  console.log("A");
  p.then(() => console.log("B"));
}).then(() => {
  console.log("C");
}).then(() => {
  console.log("D");
});

// Output: A → C → B → D
```

---

## 13. Non-Blocking I/O

### 13.1 The Concept

JavaScript is single-threaded, but non-blocking. When performing I/O operations (file reads, network requests, database queries), the operation is offloaded to the system kernel or a thread pool. The main thread continues executing while waiting.

### 13.2 How Non-Blocking I/O Works

```
1. JavaScript calls an async function (e.g., fetch, readFile)
2. The operation is delegated to the OS kernel (multi-threaded)
3. The kernel performs the operation in the background
4. When complete, the kernel notifies the event loop
5. The event loop places the callback on the macrotask queue
6. When the call stack is empty, the callback is executed
```

### 13.3 Node.js Thread Pool (libuv)

Node.js uses libuv's thread pool (default 4 threads) for:
- File system operations (`fs.readFile`, `fs.writeFile`)
- DNS lookups (`dns.lookup`)
- Compression (`zlib`)
- Some crypto operations

### 13.4 Blocking vs Non-Blocking

```javascript
// NON-BLOCKING (async)
const fs = require("fs");
fs.readFile("large-file.txt", "utf8", (err, data) => {
  // This runs later when the file is read
  console.log(data.length);
});
console.log("This runs immediately");

// BLOCKING (sync) — freezes the event loop!
const data = fs.readFileSync("large-file.txt", "utf8");
console.log("This waits for the file read to finish");
console.log(data.length);
```

### 13.5 Performance Guidelines

| Operation | Typical Duration | Impact |
|-----------|:----------------:|--------|
| `JSON.parse` on 10MB | ~80-150ms | Blocks event loop |
| `bcrypt` hash (cost 12) | ~250ms | Blocks event loop |
| Promise resolution | ~1µs | Negligible |
| 1M-iteration loop | ~10ms | Borderline |

**For CPU-heavy work:** Use Web Workers (browser) or `worker_threads` (Node.js).

---

## 14. Event-Driven Architecture

### 14.1 Overview

Event-driven architecture is a programming pattern where the flow of the program is determined by events — user actions, sensor outputs, messages from other programs, etc.

### 14.2 Core Concepts

- **Event emitter/source** — The object that produces events
- **Event listener/handler** — The function that responds to events
- **Event loop** — The mechanism that dispatches events to handlers
- **Event queue** — Where events wait to be processed

### 14.3 How JavaScript Uses Events

JavaScript is inherently event-driven:

```javascript
// DOM events
button.addEventListener("click", handleClick);

// Node.js EventEmitter
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("data", handleData);
emitter.emit("data", payload);

// Promise events
fetch("/api").then(handleResponse).catch(handleError);
```

### 14.4 Event Emitter Pattern (Node.js)

```javascript
const EventEmitter = require("events");

class OrderManager extends EventEmitter {
  placeOrder(order) {
    this.emit("orderPlaced", order);
  }
}

const manager = new OrderManager();
manager.on("orderPlaced", (order) => {
  console.log(`Order placed: ${order.id}`);
});
manager.placeOrder({ id: 123 });
```

### 14.5 Pub/Sub Pattern

```javascript
class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    this.listeners[event] = this.listeners[event]?.filter(cb => cb !== callback);
  }

  emit(event, data) {
    this.listeners[event]?.forEach(cb => cb(data));
  }
}
```

---

## 15. EventTarget and addEventListener

### 15.1 EventTarget Interface

`EventTarget` is a base interface implemented by DOM elements, document, window, `AbortSignal`, and `BroadcastChannel`. It provides methods for event handling.

### 15.2 addEventListener()

```javascript
target.addEventListener(type, listener);
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture); // legacy
```

**Options:**
```javascript
{
  capture: false,   // true = capturing phase, false = bubbling phase
  once: false,      // true = auto-remove after first invocation
  passive: false,   // true = will not call preventDefault()
  signal: abortSignal // AbortSignal to remove the listener
}
```

### 15.3 removeEventListener()

Must pass the **exact same function reference** (not a new anonymous function):

```javascript
function handleClick(e) { console.log(e); }

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick); // Works

// WRONG — cannot remove anonymous functions
button.addEventListener("click", (e) => console.log(e));
button.removeEventListener("click", (e) => console.log(e)); // Different reference!
```

### 15.4 Passive Listeners

Passive listeners promise not to call `preventDefault()`, allowing the browser to execute default actions (like scrolling) immediately:

```javascript
// For scroll performance
document.addEventListener("scroll", handleScroll, { passive: true });

// Modern browsers default to passive:true for:
// touchstart, touchmove, wheel on document-level nodes
```

### 15.5 handleEvent() Pattern

Listeners can be objects with a `handleEvent()` method:

```javascript
const listener = {
  handleEvent(e) {
    console.log(`Event type: ${e.type}`);
  }
};

button.addEventListener("click", listener);
```

### 15.6 Event Object Properties

| Property | Description |
|----------|-------------|
| `event.target` | The element that triggered the event |
| `event.currentTarget` | The element the handler is attached to (same as `this`) |
| `event.type` | The event type (e.g., "click") |
| `event.defaultPrevented` | `true` if `preventDefault()` was called |
| `event.stopPropagation()` | Stops event from propagating further |
| `event.stopImmediatePropagation()` | Stops propagation and prevents other handlers on same element |
| `event.preventDefault()` | Prevents the default browser action |

---

## 16. Custom Events (CustomEvent)

### 16.1 Creating Custom Events

```javascript
const event = new CustomEvent("user-login", {
  detail: {
    userId: 42,
    username: "john_doe",
    timestamp: Date.now()
  },
  bubbles: true,     // Event bubbles up the DOM
  cancelable: true   // Event can be cancelled with preventDefault()
});
```

### 16.2 Dispatching Custom Events

```javascript
const element = document.getElementById("app");

// Listen
element.addEventListener("user-login", (e) => {
  console.log("User logged in:", e.detail.username);
});

// Dispatch
element.dispatchEvent(event);
```

### 16.3 CustomEvent.detail

The `detail` property is the dedicated payload for custom events. Any serializable data can be stored:

```javascript
const event = new CustomEvent("data-update", {
  detail: { items: [1, 2, 3], source: "api" }
});

element.addEventListener("data-update", (e) => {
  console.log(e.detail.items); // [1, 2, 3]
});
```

### 16.4 Using CustomEvent as an Event Bus

```javascript
class EventBus extends EventTarget {
  emit(name, data) {
    this.dispatchEvent(new CustomEvent(name, { detail: data }));
  }

  on(name, handler) {
    this.addEventListener(name, (e) => handler(e.detail));
  }

  off(name, handler) {
    this.removeEventListener(name, handler);
  }
}

const bus = new EventBus();
bus.on("message", (data) => console.log(data));
bus.emit("message", { text: "Hello!" });
```

### 16.5 Bubbling Custom Events

Without `bubbles: true`, the event only fires on the target element. With it, it propagates up the DOM:

```javascript
// In a child component
this.dispatchEvent(new CustomEvent("item-selected", {
  detail: { id: this.dataset.id },
  bubbles: true
}));

// On a parent (catches all child events)
parent.addEventListener("item-selected", (e) => {
  console.log(`Selected: ${e.detail.id}`);
});
```

### 16.6 Events-in-Events are Synchronous

When `dispatchEvent` is called from within an event handler, the new event's handlers run synchronously before the outer handler continues:

```javascript
button.addEventListener("click", () => {
  alert(1);
  button.dispatchEvent(new CustomEvent("nested", { bubbles: true }));
  alert(2); // Runs AFTER nested event is fully handled
});

document.addEventListener("nested", () => alert("nested"));
// Output: 1 → nested → 2
```

**Solution:** Wrap in `setTimeout` to make it truly async:
```javascript
button.addEventListener("click", () => {
  alert(1);
  setTimeout(() => {
    button.dispatchEvent(new CustomEvent("nested", { bubbles: true }));
  });
  alert(2);
});
// Output: 1 → 2 → nested
```

### 16.7 composed Option (Shadow DOM)

- `composed: false` (default) — Event stops at shadow root boundary
- `composed: true` — Event crosses shadow DOM boundaries into light DOM

---

## 17. Event Propagation

### 17.1 The Three Phases

1. **Capturing phase** — Event travels from `window` down to the target element
2. **Target phase** — Event reaches the target element; handlers on the target fire
3. **Bubbling phase** — Event travels from the target up to `window`

### 17.2 Capturing Phase

Handlers with `capture: true` fire during the downward journey:

```javascript
document.addEventListener("click", () => {
  console.log("Document - capturing");
}, true); // capture: true

form.addEventListener("click", () => {
  console.log("Form - capturing");
}, true);

button.addEventListener("click", () => {
  console.log("Button - capturing");
}, true);

// Clicking <button>:
// Document - capturing → Form - capturing → Button - capturing
```

### 17.3 Bubbling Phase

Handlers without `capture` (default) fire during the upward journey:

```javascript
button.addEventListener("click", () => console.log("Button"));
form.addEventListener("click", () => console.log("Form"));
document.addEventListener("click", () => console.log("Document"));

// Clicking <button>:
// Button → Form → Document
```

### 17.4 Full Sequence Example

```html
<div id="outer">
  <div id="inner">
    <p id="para">Click me</p>
  </div>
</div>

<script>
document.getElementById("outer").addEventListener("click",
  () => console.log("OUTER bubbling"), false
);
document.getElementById("outer").addEventListener("click",
  () => console.log("OUTER capturing"), true
);

document.getElementById("inner").addEventListener("click",
  () => console.log("INNER bubbling"), false
);
document.getElementById("inner").addEventListener("click",
  () => console.log("INNER capturing"), true
);

document.getElementById("para").addEventListener("click",
  () => console.log("PARA bubbling"), false
);
document.getElementById("para").addEventListener("click",
  () => console.log("PARA capturing"), true
);
</script>

<!-- Click on <p>: -->
<!-- OUTER capturing → INNER capturing → PARA capturing →
     PARA bubbling → INNER bubbling → OUTER bubbling -->
```

### 17.5 event.target vs event.currentTarget

- `event.target` — The deepest element that triggered the event (never changes)
- `event.currentTarget` — The element the handler is attached to (= `this`)

### 17.6 Stopping Propagation

```javascript
// Stop further propagation (up or down)
event.stopPropagation();

// Stop propagation AND prevent other handlers on the same element
event.stopImmediatePropagation();
```

### 17.7 Removing Capturing Listeners

Must specify the same `capture` value in `removeEventListener`:

```javascript
document.addEventListener("click", handler, true);  // capture
document.removeEventListener("click", handler, true); // Must also use true
```

---

## 18. Event Delegation

### 18.1 The Pattern

Instead of attaching event listeners to many child elements, attach a single listener to a common ancestor. Use `event.target` to determine which child triggered the event.

```javascript
// BAD: One listener per item
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", handleClick);
});

// GOOD: One delegated listener
document.querySelector("ul").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  handleClick(e, li);
});
```

### 18.2 Why Use Event Delegation

- **Memory efficient** — One listener instead of hundreds
- **Handles dynamic elements** — Works for elements added after initial render
- **Less code** — No need to add/remove listeners when DOM changes
- **No cleanup needed** — Removed DOM elements don't leak listeners

### 18.3 Using closest() vs matches()

```javascript
// Use closest() when elements may have children
// (e.g., clicking an icon inside a button)
parent.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  if (!deleteBtn) return;
  // Handles clicks on the button OR its children
});
```

### 18.4 Data-Attribute Pattern

```javascript
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
document.getElementById("menu").addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  const actions = {
    save: () => saveData(),
    load: () => loadData(),
    search: () => searchData()
  };
  actions[action]?.();
});
</script>
```

### 18.5 Limitations

- The event must bubble (some events like `focus`, `blur`, `scroll` don't bubble)
- Handlers using `stopPropagation()` break delegation
- Overhead for events that fire very frequently (mousemove) on many children

---

## 19. Once Listeners

### 19.1 The `once` Option

`addEventListener` with `{ once: true }` automatically removes the listener after its first invocation:

```javascript
button.addEventListener("click", () => {
  console.log("This runs only once");
}, { once: true });

// Equivalent to manual removal:
function handleClick() {
  console.log("This runs only once");
  button.removeEventListener("click", handleClick);
}
button.addEventListener("click", handleClick);
```

### 19.2 Use Cases

```javascript
// One-time initialization
document.addEventListener("DOMContentLoaded", () => {
  initApp();
}, { once: true });

// One-time warning
form.addEventListener("submit", (e) => {
  showWarning("Please double-check your data");
}, { once: true });

// AbortSignal-based once listener
const controller = new AbortController();
button.addEventListener("click", handleClick, {
  signal: controller.signal
});
// Later: controller.abort() removes the listener
```

---

## 20. AbortController and AbortSignal

### 20.1 Overview

`AbortController` provides a signal to abort ongoing operations (fetch requests, event listeners, streams, etc.).

### 20.2 Basic Usage

```javascript
const controller = new AbortController();
const { signal } = controller;

// Use the signal
fetch("/api/data", { signal })
  .then(response => response.json())
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Request was aborted");
    } else {
      console.error("Fetch error:", err);
    }
  });

// Abort later
controller.abort();
```

### 20.3 Aborting Event Listeners

```javascript
const controller = new AbortController();
const { signal } = controller;

document.addEventListener("scroll", handleScroll, { signal });
document.addEventListener("resize", handleResize, { signal });

// Remove all listeners at once
controller.abort();
```

### 20.4 Aborting Multiple Operations

```javascript
async function loadDashboard(signal) {
  const [user, posts, settings] = await Promise.all([
    fetch("/api/user", { signal }).then(r => r.json()),
    fetch("/api/posts", { signal }).then(r => r.json()),
    fetch("/api/settings", { signal }).then(r => r.json())
  ]);
  return { user, posts, settings };
}

const controller = new AbortController();
loadDashboard(controller.signal).catch(err => {
  if (err.name === "AbortError") console.log("Dashboard load cancelled");
});

// Cancel on component unmount
componentWillUnmount?.(() => controller.abort());
```

### 20.5 AbortSignal.timeout()

Static method to create a signal that aborts after a given time:

```javascript
// Abort after 5 seconds
await fetch("/api/slow", {
  signal: AbortSignal.timeout(5000)
});
```

### 20.6 AbortSignal.any() (Composing Signals)

Combine multiple abort signals:

```javascript
const userController = new AbortController();
const globalController = new AbortController();

const combinedSignal = AbortSignal.any([
  userController.signal,
  globalController.signal
]);

await fetch("/api/data", { signal: combinedSignal });
// Aborts if either user or global aborts
```

### 20.7 AbortSignal.reason

```javascript
const controller = new AbortController();
controller.abort(new Error("Component unmounted"));
console.log(controller.signal.reason); // Error: Component unmounted
```

---

## 21. Fetch API

### 21.1 Basic Usage

```javascript
// Simple GET request
const response = await fetch("https://api.example.com/data");
const data = await response.json();
```

### 21.2 Request Options

```javascript
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
  },
  body: JSON.stringify({ name: "John", age: 30 }),
  signal: AbortSignal.timeout(10000)
});
```

**Full options:**
| Option | Description |
|--------|-------------|
| `method` | HTTP method (GET, POST, PUT, DELETE, etc.) |
| `headers` | Request headers (Headers object or plain object) |
| `body` | Request body (string, FormData, Blob, ArrayBuffer) |
| `mode` | `cors` (default), `no-cors`, `same-origin` |
| `credentials` | `same-origin`, `include`, `omit` |
| `cache` | `default`, `no-store`, `reload`, `force-cache` |
| `redirect` | `follow` (default), `manual`, `error` |
| `signal` | AbortSignal for cancellation |
| `keepalive` | Allow request to outlive the page |

### 21.3 Response Object

```javascript
const response = await fetch("/api/data");

response.ok;          // true if status 200-299
response.status;      // 200
response.statusText;  // "OK"
response.headers;     // Headers object
response.url;         // Final URL after redirects
response.type;        // "basic", "cors", "opaque", "opaqueredirect"

// Reading the body
await response.text();     // As text
await response.json();     // As JSON
await response.blob();     // As Blob
await response.arrayBuffer(); // As ArrayBuffer
await response.formData(); // As FormData
```

### 21.4 Headers Object

```javascript
const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.set("Accept", "application/json");
headers.has("Content-Type"); // true
headers.get("Content-Type"); // "application/json"
headers.delete("Content-Type");

// Iterate
for (const [key, value] of headers) {
  console.log(`${key}: ${value}`);
}
```

### 21.5 Request Object

```javascript
const request = new Request("/api/data", {
  method: "GET",
  headers: { "Accept": "application/json" }
});

const response = await fetch(request);
```

### 21.6 Streaming

```javascript
const response = await fetch("/api/large-data");
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const text = decoder.decode(value, { stream: true });
  console.log(text);
}
```

### 21.7 Error Handling

```javascript
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.error("Fetch failed:", error.message);
    }
    throw error;
  }
}
```

### 21.8 POST with FormData

```javascript
const formData = new FormData();
formData.append("name", "John");
formData.append("avatar", fileInput.files[0]);

const response = await fetch("/api/upload", {
  method: "POST",
  body: formData
  // Don't set Content-Type — browser sets it with boundary
});
```

### 21.9 Fetch vs XMLHttpRequest

| Feature | fetch() | XMLHttpRequest |
|---------|:-------:|:--------------:|
| Promise-based | Yes | No |
| Streaming | Yes | Partial |
| Request cancellation | AbortController | .abort() |
| Simpler API | Yes | Verbose |
| Browser support | Modern (IE no) | All browsers |
| Redirect handling | Built-in | Manual |

---

## 22. XMLHttpRequest (Legacy)

### 22.1 Overview

XMLHttpRequest (XHR) is the original API for making HTTP requests from the browser. It is now superseded by `fetch()` but still widely used in legacy code.

### 22.2 Basic Usage

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data");

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error("Request failed:", xhr.status);
  }
};

xhr.onerror = function() {
  console.error("Network error");
};

xhr.send();
```

### 22.3 POST Request

```javascript
const xhr = new XMLHttpRequest();
xhr.open("POST", "/api/users");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = function() {
  if (xhr.status === 201) {
    console.log("User created:", JSON.parse(xhr.responseText));
  }
};

xhr.send(JSON.stringify({ name: "John", age: 30 }));
```

### 22.4 Progress Events

```javascript
xhr.upload.onprogress = function(e) {
  if (e.lengthComputable) {
    const percent = (e.loaded / e.total) * 100;
    console.log(`Upload: ${percent}%`);
  }
};
```

### 22.5 Key Properties and Methods

| Property/Method | Description |
|----------------|-------------|
| `.open(method, url)` | Initialize the request |
| `.send(body)` | Send the request |
| `.abort()` | Abort the request |
| `.readyState` | 0-4 (UNSENT to DONE) |
| `.status` | HTTP status code |
| `.responseText` | Response as text |
| `.response` | Response body |
| `.getResponseHeader()` | Get a response header |
| `.setRequestHeader()` | Set a request header |

---

## 23. WebSockets

### 23.1 Overview

WebSockets provide full-duplex, persistent communication between client and server over a single TCP connection. Unlike HTTP request/response, WebSockets allow real-time bidirectional data flow.

### 23.2 Connection

```javascript
const socket = new WebSocket("ws://example.com/socket");

socket.onopen = function(event) {
  console.log("Connected");
  socket.send(JSON.stringify({ type: "subscribe", channel: "news" }));
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
};

socket.onclose = function(event) {
  console.log("Disconnected:", event.code, event.reason);
};

socket.onerror = function(error) {
  console.error("WebSocket error:", error);
};
```

### 23.3 Sending Data

```javascript
// Send text
socket.send("Hello, server!");

// Send binary data
socket.send(new ArrayBuffer(8));

// Send JSON
socket.send(JSON.stringify({ type: "message", text: "Hello!" }));
```

### 23.4 States

| Constant | Value | Description |
|----------|:-----:|-------------|
| `CONNECTING` | 0 | Connection being established |
| `OPEN` | 1 | Connection open and ready |
| `CLOSING` | 2 | Connection closing |
| `CLOSED` | 3 | Connection closed |

### 23.5 Reconnection Pattern

```javascript
function connectWebSocket(url) {
  const socket = new WebSocket(url);

  socket.onclose = function() {
    console.log("Disconnected. Reconnecting in 3s...");
    setTimeout(() => connectWebSocket(url), 3000);
  };

  return socket;
}

const ws = connectWebSocket("ws://example.com/socket");
```

### 23.6 When to Use WebSockets

- Real-time chat applications
- Live notifications
- Multiplayer games
- Collaborative editing
- Live financial data feeds
- Any scenario requiring low-latency bidirectional communication

---

## 24. Server-Sent Events (SSE)

### 24.1 Overview

Server-Sent Events (SSE) provide one-way, real-time communication from server to client over HTTP. The client opens a persistent connection and the server pushes events through it.

### 24.2 Client Usage

```javascript
const eventSource = new EventSource("/api/events");

eventSource.onmessage = function(event) {
  console.log("Received:", event.data);
};

eventSource.addEventListener("custom-event", function(event) {
  console.log("Custom:", event.data);
});

eventSource.onerror = function(error) {
  console.error("SSE error:", error);
  // EventSource automatically reconnects
};

// Close the connection
eventSource.close();
```

### 24.3 Server Response Format

```
data: {"user": "John", "action": "login"}

event: custom-event
data: {"message": "Hello!"}

id: 123
data: This is multi-line
data: data for a single event
```

### 24.4 EventSource Options

```javascript
const eventSource = new EventSource("/api/events", {
  withCredentials: true  // Send cookies with the request
});
```

### 24.5 Reconnection

- EventSource automatically reconnects on connection loss
- Server can send `retry: 2000\n` to set reconnection interval
- If server sends an `id`, the client sends `Last-Event-ID` header on reconnect

### 24.6 SSE vs WebSockets

| Feature | SSE | WebSockets |
|---------|:---:|:----------:|
| Direction | Server → Client | Bidirectional |
| Protocol | HTTP | ws:// or wss:// |
| Auto-reconnect | Yes | No (manual) |
| Format | Text only | Text + Binary |
| Firewall friendly | Yes (standard HTTP) | May need special config |
| Browser support | Modern (IE/Edge no) | All modern browsers |

---

## 25. Broadcast Channel API

### 25.1 Overview

The Broadcast Channel API allows simple communication between browsing contexts (windows, tabs, iframes) and workers of the same origin.

### 25.2 Basic Usage

```javascript
// Tab 1
const channel = new BroadcastChannel("app-sync");

channel.postMessage({ type: "logout" });
channel.postMessage({ type: "theme-change", theme: "dark" });

channel.onmessage = function(event) {
  console.log("Received:", event.data);
};

// Tab 2 (same origin)
const channel = new BroadcastChannel("app-sync");
channel.onmessage = function(event) {
  if (event.data.type === "logout") {
    window.location.href = "/login";
  }
  if (event.data.type === "theme-change") {
    document.body.className = event.data.theme;
  }
};
```

### 25.3 Disconnecting

```javascript
const channel = new BroadcastChannel("app-sync");

// Later — disconnect to allow garbage collection
channel.close();
```

### 25.4 Use Cases

- **Cross-tab authentication sync** — Log out in one tab, all tabs log out
- **Cross-tab state sync** — Theme changes, preferences updates
- **Cross-tab notifications** — Alert other tabs of important events

### 25.5 Key Points

- All messages are structured-cloned (supports most data types)
- Messages are only sent to other contexts (not the sending context)
- No delivery guarantee if a context is not listening
- Same-origin policy applies

---

## 26. Intersection Observer

### 26.1 Overview

`IntersectionObserver` asynchronously observes changes in the intersection of a target element with an ancestor element or the viewport. It replaces scroll event listeners + `getBoundingClientRect()` for detecting element visibility.

### 26.2 Basic Usage

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Element is visible:", entry.target);
    }
  });
}, {
  root: null,           // viewport
  rootMargin: "0px",    // margin around root
  threshold: 0.1        // trigger when 10% visible
});

observer.observe(document.querySelector(".my-element"));
```

### 26.3 Configuration Options

| Option | Description |
|--------|-------------|
| `root` | The element used as viewport (`null` = viewport) |
| `rootMargin` | Offset around root (e.g., `"100px 0px"`) |
| `threshold` | Visibility ratio trigger (0.0 to 1.0, or array) |

### 26.4 Lazy Loading Images

```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img); // Stop observing once loaded
    }
  });
}, {
  rootMargin: "200px 0px" // Load 200px before entering viewport
});

document.querySelectorAll("img[data-src]").forEach(img => {
  imageObserver.observe(img);
});
```

### 26.5 Infinite Scroll

```javascript
const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
}, { threshold: 0 });

scrollObserver.observe(document.querySelector(".load-more-trigger"));
```

### 26.6 Entry Properties

| Property | Description |
|----------|-------------|
| `entry.isIntersecting` | `true` if element is intersecting |
| `entry.intersectionRatio` | Ratio of visible area (0-1) |
| `entry.intersectionRect` | Bounding rectangle of intersection |
| `entry.boundingClientRect` | Element's bounding rectangle |
| `entry.target` | The observed element |
| `entry.time` | Timestamp of intersection change |

### 26.7 Disconnecting

```javascript
observer.disconnect(); // Stop observing all targets
```

---

## 27. Mutation Observer

### 27.1 Overview

`MutationObserver` watches for changes to the DOM tree — nodes added/removed, attributes changed, text content changed. It is the high-performance successor to the deprecated Mutation Events.

### 27.2 Basic Usage

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log("Type:", mutation.type);
    console.log("Added:", mutation.addedNodes);
    console.log("Removed:", mutation.removedNodes);
  });
});

observer.observe(document.getElementById("app"), {
  childList: true,      // Watch for direct children added/removed
  subtree: true,        // Watch all descendants
  attributes: true,     // Watch attribute changes
  characterData: true,  // Watch text content changes
  attributeOldValue: true // Record old attribute values
});
```

### 27.3 Configuration Options

| Option | Description |
|--------|-------------|
| `childList` | Watch for added/removed child nodes |
| `subtree` | Watch the target and all descendants |
| `attributes` | Watch attribute changes |
| `attributeFilter` | Array of attribute names to watch |
| `attributeOldValue` | Record old attribute values |
| `characterData` | Watch text content changes |
| `characterDataOldValue` | Record old text values |

### 27.4 Mutation Record Properties

| Property | Description |
|----------|-------------|
| `type` | `"childList"`, `"attributes"`, or `"characterData"` |
| `target` | The changed node |
| `addedNodes` | NodeList of added nodes |
| `removedNodes` | NodeList of removed nodes |
| `attributeName` | Name of changed attribute |
| `oldValue` | Previous value (if `attributeOldValue`/`characterDataOldValue` set) |

### 27.5 Disconnecting

```javascript
// Always disconnect when done — observers with subtree: true fire frequently
observer.disconnect();
```

### 27.6 Common Use Cases

- Third-party widget integration
- Browser extensions monitoring DOM changes
- Custom directive systems
- Dynamic form validation
- Detecting content loaded by other scripts

---

## 28. Resize Observer

### 28.1 Overview

`ResizeObserver` watches for changes to an element's size (width and height). It fires when the element resizes for any reason — window resize, parent layout change, content change, CSS animation.

### 28.2 Basic Usage

```javascript
const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    const width = entry.contentBoxSize[0].inlineSize;
    const height = entry.contentBoxSize[0].blockSize;
    console.log(`Size: ${width}x${height}`);
  }
});

observer.observe(document.querySelector(".resizable-element"));
```

### 28.3 Entry Properties

| Property | Description |
|----------|-------------|
| `entry.target` | The observed element |
| `entry.contentBoxSize` | Array of content box sizes |
| `entry.borderBoxSize` | Array of border box sizes |
| `entry.contentRect` | Legacy: content rectangle (use `contentBoxSize` instead) |

### 28.4 Avoiding Infinite Loops

Changing an element's size inside a ResizeObserver callback can cause an infinite loop:

```javascript
// BAD — infinite loop
const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    entry.target.style.width = entry.contentBoxSize[0].inlineSize + "px";
  }
});

// GOOD — debounce or check before changing
let lastWidth = 0;
const observer = new ResizeObserver(entries => {
  const newWidth = entries[0].contentBoxSize[0].inlineSize;
  if (newWidth !== lastWidth) {
    lastWidth = newWidth;
    // Safe to update
  }
});
```

### 28.5 Disconnecting

```javascript
observer.disconnect();
```

---

## 29. Performance Observer

### 29.1 Overview

`PerformanceObserver` observes performance-related browser events (metrics entries). It is used to track Core Web Vitals (LCP, CLS, FID), long tasks, navigation timing, and resource timing.

### 29.2 Basic Usage

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(`${entry.name}: ${entry.startTime}ms`);
  });
});

observer.observe({ type: "largest-contentful-paint", buffered: true });
```

### 29.3 Entry Types

| Type | What it Observes |
|------|------------------|
| `"navigation"` | Page navigation timing |
| `"resource"` | Resource loading timing |
| `"paint"` | First paint, first contentful paint |
| `"largest-contentful-paint"` | Largest contentful paint (LCP) |
| `"layout-shift"` | Layout shifts (CLS) |
| `"longtask" | Tasks exceeding 50ms |
| `"element"` | Element timing |
| `"mark"` | Performance marks |
| `"measure"` | Performance measures |

### 29.4 Core Web Vitals

```javascript
// LCP (Largest Contentful Paint)
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log("LCP:", lastEntry.startTime);
});
lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

// CLS (Cumulative Layout Shift)
const clsObserver = new PerformanceObserver((list) => {
  let cls = 0;
  list.getEntries().forEach(entry => {
    if (!entry.hadRecentInput) {
      cls += entry.value;
    }
  });
  console.log("CLS:", cls);
});
clsObserver.observe({ type: "layout-shift", buffered: true });

// Long Tasks
const longTaskObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(`Long task: ${entry.duration}ms`, entry);
  });
});
longTaskObserver.observe({ type: "longtask" });
```

### 29.5 Buffered Entries

```javascript
// buffered: true includes entries that occurred before the observer was created
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(entry.name, entry.startTime);
  });
});
observer.observe({ type: "resource", buffered: true });
```

### 29.6 Disconnecting

```javascript
observer.disconnect();
```

---

## Summary: When to Use What

| Pattern/API | Use When |
|-------------|----------|
| Callbacks | Event handlers, simple one-off operations |
| Promises | Async operations needing chaining/composition |
| async/await | Sequential async code, complex error handling |
| Generators | Lazy sequences, infinite data, co-routines |
| setTimeout | Delayed execution, yielding to event loop |
| setInterval | Repeated polling (prefer nested setTimeout) |
| requestAnimationFrame | Animations, visual updates, scroll handlers |
| Web Workers | CPU-heavy computation off the main thread |
| Service Workers | Offline support, caching, push notifications |
| Broadcast Channel | Cross-tab communication |
| AbortController | Cancelling fetch, event listeners, streams |
| Fetch API | HTTP requests (use over XHR) |
| Event Delegation | Dynamic lists, many similar elements |
| IntersectionObserver | Lazy loading, infinite scroll, visibility detection |
| MutationObserver | DOM change detection |
| ResizeObserver | Element-level responsive design |
| PerformanceObserver | Core Web Vitals, performance monitoring |
| CustomEvent | Component communication, custom event buses |
| WebSockets | Real-time bidirectional communication |
| SSE | Real-time server-to-client updates |
