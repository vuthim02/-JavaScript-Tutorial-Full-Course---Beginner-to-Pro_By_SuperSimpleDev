# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 7 — Asynchronous JavaScript, Event Loop, Promises, async/await, and Internal Execution

---

# Mission

This is one of the most important and most misunderstood parts of JavaScript.

Understanding asynchronous JavaScript explains:

* Why JavaScript can perform multiple tasks despite being single-threaded.
* Why websites do not freeze while waiting for network requests.
* How frameworks like React, Vue.js, and runtimes like Node.js handle concurrency.
* How APIs, databases, timers, and file systems work.
* How to debug race conditions, deadlocks, and timing bugs.

---

# Big Picture

JavaScript itself has:

### One Call Stack

```text
Call Stack
```

But the environment provides:

```text
Web APIs / Node APIs
```

Together with:

```text
Task Queues
```

And coordinated by:

```text
Event Loop
```

---

# Overall Architecture

```text
┌─────────────────────────────────────────────┐
│            JavaScript Engine (V8)            │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │   Call Stack     │  │  Heap (Memory)   │  │
│  └─────────────────┘  └──────────────────┘  │
└───────────────────────┬─────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────┐
│           Web APIs / Node APIs               │
│  setTimeout  fetch  DOM  fs  http  process   │
└───────────────────────┬─────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────┐
│              Task Queues                     │
│  ┌────────────────┐ ┌──────────────────┐    │
│  │  Microtask Queue│ │  Macrotask Queue │    │
│  └────────────────┘ └──────────────────┘    │
└───────────────────────┬─────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────┐
│               Event Loop                    │
│  (coordinates stack + queues)               │
└─────────────────────────────────────────────┘
```

---

# Chapter 1 — Synchronous Execution

## What is Synchronous Execution?

Each operation blocks until it finishes. The call stack processes one function at a time from top to bottom.

Example

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output

```text
A
B
C
```

---

Execution visualization:

```text
Call Stack Timeline:

t=0:  [Global]
t=0:  [Global, console.log("A")]
t=0:  [Global]                    // console.log("A") pops
t=0:  [Global, console.log("B")]
t=0:  [Global]                    // console.log("B") pops
t=0:  [Global, console.log("C")]
t=0:  [Global]                    // console.log("C") pops
t=0:  []                          // Global pops, stack empty
```

Everything waits. No interleaving. No concurrency.

---

## Blocking Example

```javascript
function wait(seconds) {
    const start = Date.now();
    while (Date.now() - start < seconds * 1000) {
        // Busy-wait: completely blocks the thread
    }
}

console.log("Start");
wait(3);  // Browser freezes for 3 seconds
console.log("End");
```

Output (after 3 second freeze):

```text
Start
End
```

---

## Why Blocking is a Problem

| Scenario | Effect |
|----------|--------|
| Network request (3s) | Entire page frozen for 3s |
| Large file parse (500ms) | Buttons unresponsive for 500ms |
| Image processing (2s) | Animations stop, UI dead |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which line executes first? | Line 1 |
| Can line 3 run before line 2? | No. Synchronous code is strictly sequential. |
| What happens to the call stack during `wait(3)`? | `wait` sits on the stack for 3 seconds. No other code can execute. |
| How can you detect blocking code in production? | Chrome DevTools Performance tab shows long tasks (>50ms) in red. |
| What is the maximum time a synchronous operation should take? | Under 50ms (RAIL model: Response, Animation, Idle, Load). |

---

# Chapter 2 — The Problem

## Real-World Scenario

Imagine:

```javascript
downloadHugeFile();
```

takes 10 seconds.

If JavaScript waits:

```javascript
downloadHugeFile();

console.log("Done");
```

Browser freezes for 10 seconds.

Bad user experience.

---

## What Happens During a Freeze

```text
User tries to click a button
         │
         ▼
Click event enqueued → but stack is blocked by downloadHugeFile()
         │
         ▼
Event Loop cannot process the click (stack not empty)
         │
         ▼
After 10 seconds, stack empties → click finally processed
         │
         ▼
User already closed the tab
```

---

## The Real Cost

```text
10 second freeze = 50% of users will leave
               = 0 conversions during that time
               = Broken user trust
```

---

## The Solution

Need:

```text
Non-blocking execution
```

Where:

1. Start the long operation
2. Return immediately
3. Get notified when done
4. Handle the result later

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why does a freeze happen? | The call stack is occupied. The event loop cannot push new work. |
| Can the browser render during a freeze? | No. Rendering is also a task that needs the stack empty. |
| How does DevTools show long tasks? | Performance panel → "Long Task" markers in red. |
| What is the RAIL model? | Response (<50ms), Animation (<16ms), Idle (50ms chunks), Load (<1s initial). |

---

# Chapter 3 — setTimeout()

## How setTimeout Works

The timer is managed by the Web API environment, not by the JavaScript engine.

Example

```javascript
console.log("A");

setTimeout(() => {

    console.log("B");

},1000);

console.log("C");
```

Output

```text
A
C
B
```

---

Many beginners expect:

```text
A
B
C
```

Wrong.

---

## Step-by-Step Execution Trace

### Step 1

```javascript
console.log("A")
```

Stack state:

```text
┌──────────────┐
│   Global      │
├──────────────┤
│ console.log  │  ← executing
└──────────────┘
```

Output:

```text
A
```

---

### Step 2

Encounter:

```javascript
setTimeout()
```

The timer registration is handed to the Web API environment.

Stack state after setTimeout returns:

```text
┌──────────────┐
│   Global      │
└──────────────┘
```

Web API state:

```text
┌─────────────────────────────────────┐
│  Web APIs                           │
│  ┌──────────────────────────────┐   │
│  │ Timer: 1000ms                │   │
│  │ Callback: ()=>console.log(B) │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

The timer is now running **outside** JavaScript.

---

### Step 3

Continue immediately.

```javascript
console.log("C")
```

Stack:

```text
┌──────────────┐
│   Global      │
├──────────────┤
│ console.log  │  ← "C"
└──────────────┘
```

Output

```text
C
```

---

### After 1000ms

The Web API timer fires. The callback enters the **Task Queue**.

```text
┌─────────────────────────────────────┐
│  Task Queue (Macrotask)             │
│  ┌──────────────────────────────┐   │
│  │ ()=>console.log("B")         │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### When Stack Empty

The Event Loop checks: "Is the stack empty? Is there a task in the queue?"

Both yes → pushes callback onto the stack.

Stack:

```text
┌──────────────┐
│ ()=>log("B") │
├──────────────┤
│ console.log  │  ← "B"
└──────────────┘
```

Output:

```text
B
```

---

## Key Insight: setTimeout(fn, 0)

Even with 0 delay, the callback is **deferred**.

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A C B
```

The minimum delay is 0ms, but the callback **must wait** for:
1. Current synchronous code to finish
2. All pending microtasks to drain
3. The event loop to pick the next macrotask

---

## Nested setTimeout

```javascript
setTimeout(function tick() {
    console.log("tick");
    setTimeout(tick, 500); // Schedule next after finishing
}, 500);
```

This is **recursive setTimeout**. Unlike setInterval, it guarantees a delay between the **end** of one execution and the **start** of the next.

---

## setTimeout Variation: Passing Arguments

```javascript
function greet(name) {
    console.log("Hello, " + name);
}

setTimeout(greet, 1000, "Alice"); // Third arg becomes first arg to greet
// After 1s: "Hello, Alice"
```

---

## Cancelling setTimeout

```javascript
const timerId = setTimeout(() => {
    console.log("This never runs");
}, 5000);

clearTimeout(timerId); // Cancelled
```

`clearTimeout` on an already-fired timer is a no-op.

---

## The Minimum Delay Rule

| Nested Call Depth | Minimum Delay |
|------------------|---------------|
| 1st - 5th call   | 0ms           |
| 6th+ call        | 4ms           |

HTML spec mandates 4ms minimum after 5 nested calls to prevent abuse.

```javascript
let depth = 0;
function recurse() {
    depth++;
    console.log(depth, Date.now());
    setTimeout(recurse, 0);
}
recurse();
// After depth 5, each call is ~4ms apart
```

---

## setTimeout with Strings (Do Not Use)

```javascript
setTimeout("console.log('evil')", 1000); // Works but uses eval()
```

Never pass a string. Always pass a function. Strings are evaluated in the global scope.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who owns the timer? | The Web API environment, not the JS engine. |
| Is callback immediately executed? | No. It is deferred until the stack is empty. |
| What must happen before callback runs? | Stack must be empty, microtasks drained, event loop picks it up. |
| What is the actual minimum delay of `setTimeout(fn, 0)`? | 0ms in theory, but the callback cannot run until current execution finishes. |
| What happens if the stack never empties? | The callback never runs. |
| Does `setTimeout` block? | No. It returns immediately. The timer runs in the background. |
| Can you rely on `setTimeout(fn, 1000)` being exactly 1000ms? | No. It's a minimum delay. If the stack is busy, it may run much later. |
| What is the difference between setInterval and recursive setTimeout? | setInterval drifts (delay from schedule, not end). Recursive setTimeout waits for completion before scheduling next. |

---

# Chapter 4 — Call Stack

## What is the Call Stack?

A LIFO (Last In, First Out) data structure that tracks function execution.

```text
Push: function call
Pop:  function return
```

---

## Example

```javascript
function one()
{
    two();
}

function two()
{
    three();
}

function three()
{
    console.log("Done");
}

one();
```

---

## Stack Trace Visualization

```text
t=0:  [Global]
t=1:  [Global, one]          // one() called
t=2:  [Global, one, two]     // one() calls two()
t=3:  [Global, one, two, three]  // two() calls three()
t=4:  [Global, one, two, three, console.log]  // "Done"
t=4:  [Global, one, two, three]  // console.log returns
t=4:  [Global, one, two]     // three() returns
t=4:  [Global, one]          // two() returns
t=4:  [Global]               // one() returns
t=4:  []                     // Global returns
```

---

## Stack Overflow

When the stack exceeds its maximum size (usually ~10,000 frames).

```javascript
function explode() {
    explode(); // Infinite recursion
}

explode();
// RangeError: Maximum call stack size exceeded
```

---

## Stack Trace in Errors

```javascript
function a() { b(); }
function b() { c(); }
function c() { throw new Error("Boom"); }

a();
```

Output:

```text
Error: Boom
    at c (script.js:3:23)
    at b (script.js:2:15)
    at a (script.js:1:15)
    at Global (script.js:5:1)
```

The stack trace shows the **path** to the error.

---

## Async Stack Traces

Modern engines preserve async stack traces:

```javascript
async function a() {
    await b();
}
async function b() {
    await c();
}
async function c() {
    throw new Error("Async Boom");
}

a().catch(err => console.log(err.stack));
```

Output:

```text
Error: Async Boom
    at c (script.js:7:11)
    at async b (script.js:4:5)
    at async a (script.js:1:5)
```

Note the `async` markers.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which function entered last? | `three()` |
| Which exits first? | `three()` — LIFO order |
| How many frames can the stack hold? | ~10,000 (varies by engine, ~1MB size limit) |
| How do you read a stack trace? | Bottom is entry point, top is where error occurred. |
| What causes stack overflow? | Infinite recursion or extremely deep call chain. |
| Can you inspect the stack programmatically? | `console.trace()` prints current stack; `new Error().stack` captures it. |
| Are async functions on the same stack? | No. `await` suspends the function; the continuation runs in a new microtask on an empty stack. |

---

# Chapter 5 — Web APIs

## What Web APIs Provide

The browser provides APIs that run **outside** the JavaScript engine:

```text
setTimeout / setInterval  → Timer management
DOM API                   → Document manipulation
fetch / XMLHttpRequest    → Network requests
Geolocation               → Device location
Events (click, keydown)   → User interaction
localStorage / sessionStorage   → Persistent storage
requestAnimationFrame     → Animation frames
Canvas / WebGL            → Graphics rendering
Web Audio                 → Audio processing
```

---

## Node.js Provides

```text
File System (fs)     → Read/write files
HTTP / HTTPS         → Network servers and clients
TCP / UDP (net)      → Socket programming
Process              → Environment, argv, exit
Timers               → setTimeout, setInterval, setImmediate
Streams              → Streaming data
Child Processes      → Spawn system processes
Crypto               → Hashing, encryption
```

---

## How Web APIs Interact with JS

```text
JS Call Stack
    │
    │  calls setTimeout(callback, delay)
    ▼
Web API: Timer starts (runs in background thread)
    │
    │  timer expires after delay ms
    ▼
Web API: callback → Task Queue
    │
    │  Event Loop: "Is stack empty?"
    ▼
JS Call Stack: callback executes
```

---

## Is This Feature Part of JavaScript?

```javascript
// YES – Part of ECMAScript
Array, Object, Map, Set, Promise (ES6)
String, Number, Boolean
Math, Date, RegExp
JSON, Error, Symbol
Proxy, Reflect, WeakMap, WeakSet

// NO – Provided by Browser (Web APIs)
document.getElementById("x")        // DOM
fetch("/api")                       // Fetch API
localStorage.getItem("key")         // Web Storage
new WebSocket("ws://...")           // WebSocket
Notification.requestPermission()    // Notification API

// NO – Provided by Node.js
fs.readFileSync("file.txt")        // File System
http.createServer()                 // HTTP
process.argv                        // Process
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this feature part of JavaScript itself? | Check ECMAScript spec. If it's DOM, Node, or Browser API → environment-provided. |
| Or environment? | `setTimeout` is defined in the HTML spec (Web API), not ECMAScript. `fetch` is a Web API. `fs` is Node.js. |
| How to tell if code depends on a specific runtime? | Look for `document`, `window`, `process`, `require('fs')` – these are environment specific. |
| Can you polyfill a Web API? | Yes. You can implement `setTimeout` using other primitives (e.g., MessageChannel). |

---

# Chapter 6 — Callback Functions

## Definition

A callback is a function passed into another function to be executed later.

Example

```javascript
setTimeout(
    ()=>{
        console.log("Hello");
    },
1000
);
```

The arrow function is the callback.

Executed later (after 1 second).

---

## Callbacks Are Everywhere

```javascript
// Event callback
button.addEventListener("click", () => {
    console.log("Clicked");
});

// Promise callback
fetch("/api")
    .then(response => response.json())     // callback
    .then(data => console.log(data));      // callback

// Array callback
[1, 2, 3].map(x => x * 2);      // synchronous callback
arr.filter(x => x > 0);         // synchronous callback
arr.sort((a, b) => a - b);      // synchronous callback

// Node.js callback (error-first)
fs.readFile("file.txt", (err, data) => {
    if (err) return console.error(err);
    console.log(data.toString());
});
```

---

## Synchronous vs Asynchronous Callbacks

```javascript
// SYNCHRONOUS callback – executes immediately
function syncCallback(cb) {
    cb(); // Called before syncCallback returns
}

syncCallback(() => console.log("Sync"));
console.log("After"); // "Sync" then "After"

// ASYNCHRONOUS callback – executes later
function asyncCallback(cb) {
    setTimeout(cb, 1000); // Returns immediately, cb runs later
}

asyncCallback(() => console.log("Async"));
console.log("After"); // "After" then (1s later) "Async"
```

---

## How to Identify Sync vs Async

```text
SYNC callback:    Called inside the function body before return
ASYNC callback:   Called after the function returns (via Web API + queue)
```

---

## Callback Hell Setup

When async callbacks are nested:

```javascript
// One level – fine
login(user, () => {
    showDashboard();
});

// Two levels – ok
login(user, () => {
    loadProfile(() => {
        showDashboard();
    });
});

// Three levels – getting ugly
login(user, () => {
    loadProfile(() => {
        loadOrders(() => {
            showDashboard();
        });
    });
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who calls this callback? | For `setTimeout`, the Web API calls it. For `addEventListener`, the browser event system. For `map`, the JS engine (synchronously). |
| When will it execute? | Depends: sync callbacks run immediately; async callbacks run after the stack is empty. |
| Is this callback sync or async? | Check if it's called before or after the outer function returns. |
| What pattern does this callback follow? | Error-first (Node.js: `(err, result) => {}`) or success-only (`result => {}`). |
| Can the callback be called more than once? | With raw callbacks, yes (if the library has bugs or is malicious). Promises prevent this. |

---

# Chapter 7 — Callback Hell

## The Pyramid of Doom

Example

```javascript
login(user,function(){

    loadProfile(function(){

        loadOrders(function(){

            loadPayments(function(){

                console.log("Done");

            });

        });

    });

});
```

Shape:

```text
\
 \
  \
   \
    \
```

Called:

### Pyramid of Doom

---

## Problems

### 1. Hard to Read

The code flows rightward, not downward. Your eyes must track multiple indentation levels.

### 2. Hard to Debug

Which `function` contains the error? Stack traces show the callback, not the context.

### 3. Hard to Maintain

Adding a step requires restructuring the entire pyramid.

### 4. No Error Propagation

Each level needs its own error handling:

```javascript
login(user, function(err) {
    if (err) return handleError(err);
    loadProfile(function(err) {
        if (err) return handleError(err);
        loadOrders(function(err) {
            if (err) return handleError(err);
            loadPayments(function(err) {
                if (err) return handleError(err);
                console.log("Done");
            });
        });
    });
});
```

Error handling doubles the size!

### 5. No Parallelism

Each step must wait for the previous one, even if independent.

---

## Inversion of Control

When you give a callback to a library, you lose control:

```javascript
// You give your callback to a third-party library
paymentGateway.charge(amount, function(err, result) {
    // Can you trust this to be called exactly once?
    // With the right arguments?
    // At the right time?
});
```

**Problems with raw callbacks:**
- Called multiple times (double charge!)
- Called zero times (silent failure)
- Called synchronously (unexpected)
- Called with wrong arguments

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why deeply nested? | Each async step requires a callback. Steps that depend on previous results naturally nest. |
| Can promises flatten structure? | Yes. Promise chaining (`.then()`) converts nesting into a flat chain. |
| How many levels before code becomes unmanageable? | Typically 3+ levels of nesting. |
| What is "inversion of control"? | Giving your callback to someone else, trusting they will call it correctly. Promises restore control: you own the `.then()`. |
| What debugging tools work in callback hell? | Logging at each callback, named functions (instead of anonymous), breakpoints at each `.call()` site. |

---

# Chapter 8 — Promise

## What is a Promise?

A Promise represents a **future value** – the result of an asynchronous operation that hasn't completed yet.

---

## Three States

```text
┌────────────┐
│  Pending   │
└─────┬──────┘
      │
      ├──────────────→ ┌────────────┐
      │                │ Fulfilled  │  (resolve called)
      │                └────────────┘
      │
      └──────────────→ ┌────────────┐
                       │ Rejected   │  (reject called or error thrown)
                       └────────────┘
```

Once a promise settles (fulfilled or rejected), its state is **immutable** – it cannot change.

---

## Creating a Promise

```javascript
let promise =
new Promise(
(resolve,reject)=>{

}
);
```

The executor function runs **synchronously** when the Promise is constructed.

---

## Resolve vs Reject

```javascript
let promise = new Promise((resolve, reject) => {

    // Do async work
    let success = Math.random() > 0.5;

    if (success) {
        resolve(100);      // → Fulfilled with value 100
    } else {
        reject("Error");   // → Rejected with reason "Error"
    }

});
```

---

## The Executor Runs Synchronously

```javascript
console.log("A");

new Promise(() => {
    console.log("B"); // Runs immediately
});

console.log("C");

// Output: A B C
```

The executor function is called immediately by the Promise constructor.

But `resolve()` / `reject()` called **inside** can be sync or async – that's up to the programmer.

---

## Promise.resolve() and Promise.reject()

```javascript
// Immediately fulfilled promise
const p1 = Promise.resolve(42);
p1.then(value => console.log(value)); // 42

// Immediately rejected promise
const p2 = Promise.reject(new Error("Fail"));
p2.catch(err => console.error(err)); // Error: Fail
```

These are useful for converting values to promises (e.g., in a function that might return a value or a promise).

---

## Promise with Async Operation

```javascript
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Done waiting");
        }, ms);
    });
}

delay(1000).then(msg => console.log(msg));
// After 1s: "Done waiting"
```

---

## What Happens After Reject

```javascript
const p = new Promise((resolve, reject) => {
    reject("First reject");
    resolve("This is ignored"); // No effect – already settled
    reject("Also ignored");     // No effect
});

p.then(console.log).catch(console.error); // Only "First reject"
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is operation finished? | Check promise state: pending = not finished, fulfilled = success, rejected = failure. |
| Success? | `.then()` will fire. |
| Failure? | `.catch()` will fire. |
| Can a promise change from fulfilled to rejected? | No. Immutable once settled. |
| Does the executor run immediately? | Yes, synchronously, during `new Promise(executor)`. |
| What happens if you call both resolve and reject? | Only the first call wins. The rest are ignored. |
| Can you inspect the state of a promise? | Not directly (no `.state` property). You must use `.then` / `.catch`. |

---

# Chapter 9 — then()

## The .then() Method

Attaches fulfillment and rejection handlers to a promise. Returns a new promise.

```javascript
promise.then(
value=>{

    console.log(value);

}
);
```

Runs after success.

---

## Two Arguments

```javascript
promise.then(
    function onFulfilled(value) { /* success */ },
    function onRejected(error)   { /* failure */ }
);
```

The second argument handles errors – equivalent to `.catch()` for that specific `.then()`.

---

## Flow

```text
Pending
 ↓
Fulfilled
 ↓
then(onFulfilled)
```

or

```text
Pending
 ↓
Rejected
 ↓
then(undefined, onRejected)
```

---

## Return Value of .then()

```javascript
const p1 = Promise.resolve(1);
const p2 = p1.then(value => {
    return value + 1; // return a value
});

p2.then(v => console.log(v)); // 2
```

Every `.then()` returns a **new promise**. The returned promise settles with the return value of the handler.

---

## Returning a Promise from .then() (Flattening)

If the `.then()` handler returns a promise, the next `.then()` waits for it:

```javascript
Promise.resolve(1)
    .then(value => {
        return Promise.resolve(value + 1); // Returns a promise
    })
    .then(value => {
        console.log(value); // 2 (waited for inner promise)
    });
```

This is called **auto-unwrapping** or **thenable flattening**.

---

## Chaining Behavior

```javascript
const p = new Promise(resolve => {
    console.log("1: executor");
    resolve("A");
});

p.then(result => {
    console.log("2: then", result);
    return "B";
}).then(result => {
    console.log("3: then", result);
    return "C";
}).then(result => {
    console.log("4: then", result);
});

// Output:
// 1: executor
// 2: then A
// 3: then B
// 4: then C
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does `.then()` run synchronously? | No. The handler runs as a **microtask** after current code. |
| What does `.then()` return? | A new promise. |
| What happens if the handler throws? | The returned promise rejects with the error. |
| What happens if the handler returns a promise? | The returned promise "adopts" the state of that promise (flattening). |
| Can `.then()` be called on an already-fulfilled promise? | Yes. The handler still runs asynchronously (microtask). It does NOT run synchronously. |

---

# Chapter 10 — catch()

## The .catch() Method

Handles rejections. Equivalent to `.then(null, onRejected)`.

```javascript
promise.catch(
error=>{

}
);
```

---

## Flow

```text
Rejected
 ↓
catch()
```

---

## catch() Returns a Fulfilled Promise (Unless It Throws)

```javascript
Promise.reject("Error")
    .catch(err => {
        console.log("Caught:", err);
        return "Recovered";
    })
    .then(value => {
        console.log(value); // "Recovered" – catch recovered!
    });
```

If `.catch()` does not throw, the **returned promise is fulfilled**, not rejected.

---

## Catching in a Chain

```javascript
fetch("/data")
    .then(response => response.json())
    .catch(err => {
        console.error("Network or JSON error:", err);
        return { error: true }; // Recovery value
    })
    .then(data => {
        console.log(data); // Either parsed data or { error: true }
    });
```

---

## The Positioning of .catch() Matters

```javascript
// Catch at END – catches any error in the chain
step1()
    .then(step2)
    .then(step3)
    .catch(finalErrorHandler);

// Catch in MIDDLE – recovers for subsequent steps
step1()
    .catch(err => { console.warn("step1 failed, using default"); return default; })
    .then(step2)
    .then(step3)
    .catch(finalErrorHandler);
```

---

## Error Propagation

If no `.catch()` is attached and the promise rejects:

```javascript
const p = Promise.reject("Unhandled");
// Nothing attached → unhandled rejection
```

In browser: `window.addEventListener("unhandledrejection", handler)`
In Node.js: `process.on("unhandledRejection", handler)`

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does `.catch()` catch errors from `.then()` handlers? | Yes. If a `.then()` throws, the next `.catch()` in the chain catches it. |
| Is `.catch()` the same as `.then(null, handler)`? | Yes, but `.catch()` is more readable. However, `.then(null, handler)` does NOT catch errors from the same `.then()`'s first handler. |
| Can a `.catch()` recover from an error? | Yes. If it returns a value (not throwing), the chain continues as fulfilled. |
| What happens if `.catch()` throws? | The returned promise rejects with the new error. |
| Where should `.catch()` be placed? | At the end of the chain for general errors, or mid-chain for recovery. |

---

# Chapter 11 — finally()

## The .finally() Method

Always runs, regardless of fulfillment or rejection.

```javascript
promise.finally(
()=>{
    console.log("Cleanup");
});
```

---

## Key Properties

1. **No arguments** – the callback receives nothing (you don't know if it fulfilled or rejected).
2. **Does not change the state** – the promise passes through with its original value/reason.
3. **Returns a new promise** that mirrors the original promise.

---

## Used For

* Closing resources (database connections, file handles)
* Stopping loading spinners
* Hiding loading indicators
* Cleanup (regardless of success or failure)

---

## Example

```javascript
function loadData() {
    showSpinner();

    return fetch("/data")
        .then(response => response.json())
        .finally(() => {
            hideSpinner(); // Always called
        });
}

loadData()
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

---

## .finally() Pass-Through Behavior

```javascript
Promise.resolve(42)
    .finally(() => {
        console.log("Cleanup");
        // return value is ignored
    })
    .then(value => {
        console.log(value); // Still 42
    });

Promise.reject("Error")
    .finally(() => {
        console.log("Cleanup");
    })
    .catch(err => {
        console.log(err); // Still "Error"
    });
```

---

## .finally() with Thrown Error

If `.finally()` throws, the promise rejects with that new error:

```javascript
Promise.resolve(42)
    .finally(() => {
        throw new Error("Cleanup failed");
    })
    .catch(err => {
        console.log(err.message); // "Cleanup failed" – original value lost
    });
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does `.finally()` know the state? | No. It receives no arguments. |
| Can `.finally()` change the promise value? | No. It passes through the original value/reason (unless it throws). |
| When should you use `.finally()` vs `.then()` for cleanup? | `.finally()` is unconditional. `.then()` only runs on success. |
| What happens if `.finally()` throws? | The promise rejects with the new error, replacing the original outcome. |

---

# Chapter 12 — Promise Chaining

## The Problem: Nested Callbacks

```javascript
login(user, function(err, userData) {
    if (err) return handleError(err);
    loadProfile(userData.id, function(err, profile) {
        if (err) return handleError(err);
        loadOrders(profile.id, function(err, orders) {
            if (err) return handleError(err);
            loadPayments(orders[0].id, function(err, payments) {
                if (err) return handleError(err);
                render(payments);
            });
        });
    });
});
```

---

## The Solution: Promise Chain

```javascript
login(user)
    .then(loadProfile)
    .then(loadOrders)
    .then(loadPayments)
    .catch(handleError);
```

---

## Flow

```text
login(user)
   │
   ▼ (fulfills with userData)
loadProfile(userData.id)
   │
   ▼ (fulfills with profile)
loadOrders(profile.id)
   │
   ▼ (fulfills with orders)
loadPayments(orders[0].id)
   │
   ▼ (fulfills with payments)
render(payments)
   │
   ▼ (if any step rejects)
catch(handleError)
```

---

## How Chaining Works Internally

Each `.then()` returns a **new promise**:

```javascript
const step1 = login(user);
const step2 = step1.then(loadProfile);
const step3 = step2.then(loadOrders);
const step4 = step3.then(loadPayments);
const step5 = step4.catch(handleError);
// step5 is the final promise
```

---

## Passing Results Down the Chain

```javascript
fetch("/user/1")
    .then(response => response.json())    // returns parsed object
    .then(user => user.id)                // returns just the id
    .then(id => fetch(`/posts/${id}`))    // uses id, returns promise
    .then(response => response.json())    // returns parsed posts
    .then(posts => console.log(posts));   // logs the posts
```

Each step transforms the value.

---

## Error Handling in Chains

```javascript
getUser()
    .then(user => {
        // If this throws... 
        return getPosts(user.id);
    })
    .then(posts => {
        // ...or this throws...
        return getComments(posts[0].id);
    })
    .then(comments => {
        // ...or this throws...
        render(comments);
    })
    .catch(err => {
        // ...it's caught here
        console.error("Something failed:", err);
    });
```

---

## Conditional Chaining

```javascript
getUser()
    .then(user => {
        if (user.role === "admin") {
            return getAdminDashboard(); // Different path
        }
        return getUserDashboard(user.id);
    })
    .then(dashboard => render(dashboard))
    .catch(handleError);
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which promise returns next promise? | Every `.then()` returns a new promise. |
| Where can error occur? | At any `.then()` handler. The error skips subsequent `.then()` until a `.catch()`. |
| How does data flow between `.then()` calls? | Return value of one `.then()` becomes input to the next. |
| Can you skip a `.then()` conditionally? | Yes. Throw an error (or return `Promise.reject()`) to skip to `.catch()`. Return `undefined` to proceed with `undefined`. |
| What happens if you don't return from a `.then()`? | The next `.then()` receives `undefined`. |

---

# Chapter 13 — async Functions

## What is an async Function?

A function declared with the `async` keyword. It **always returns a promise**.

Example

```javascript
async function test()
{
    
}
```

---

## Return Value

Even:

```javascript
async function test()
{
    return 5;
}
```

Actually returns:

```javascript
Promise.resolve(5)
```

---

## Equivalent Without async

```javascript
// These are equivalent:
async function foo() {
    return 5;
}

function foo() {
    return Promise.resolve(5);
}
```

---

## async with No Return

```javascript
async function bar() {
    // No return statement
}

bar(); // Returns Promise<undefined>
bar().then(console.log); // undefined
```

---

## async Function Expressions

```javascript
const foo = async function() {
    return "Hello";
};

// Arrow function
const bar = async () => {
    return "World";
};

// IIFE (Immediately Invoked Function Expression)
(async () => {
    const data = await fetch("/data");
    console.log(await data.json());
})();
```

---

## async Methods in Objects

```javascript
const obj = {
    async getData() {
        return await fetch("/data");
    }
};

class DataService {
    async load() {
        const response = await fetch("/data");
        return response.json();
    }
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is return value normal? | No. It's always wrapped in a promise, even if you return a primitive. |
| Or wrapped in promise? | Yes. Any return value is wrapped in `Promise.resolve()`. |
| Does an async function that throws return a rejected promise? | Yes. `async function fail() { throw new Error("Oops"); }` returns a rejected promise. |
| Can you tell from outside if a function is async? | It returns a promise. You can also check `func.constructor.name` or use `toString()`. |

---

# Chapter 14 — await

## What await Does

Pauses execution of the **current async function** until the promise settles.

```javascript
let data =
await fetchData();
```

---

## Meaning

Pause current async function.

Not entire program.

The thread is free to execute other code (handle events, run other tasks).

---

## Equivalent Without await

```javascript
// With await:
async function get() {
    let data = await fetchData();
    console.log(data);
}

// Without await (using .then()):
function get() {
    return fetchData()
        .then(data => {
            console.log(data);
        });
}
```

---

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

---

## await with Non-Promise Values

```javascript
const x = await 42;           // Same as await Promise.resolve(42)
const y = await "hello";      // Same as await Promise.resolve("hello")
const z = await undefined;    // Same as await Promise.resolve(undefined)
```

Non-promise values are wrapped with `Promise.resolve()`.

---

## await in Loops

```javascript
// Sequential: one at a time (slow but safe)
async function processItems(items) {
    for (const item of items) {
        await process(item); // Waits for each
    }
}

// Parallel: all at once (fast but careful)
async function processItems(items) {
    await Promise.all(items.map(item => process(item)));
}
```

---

## await Needs an async Function

```javascript
// ERROR: await is only valid in async functions
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

---

## Common Mistake: Forgetting await

```javascript
async function load() {
    const data = fetch("/data"); // Missing await!
    // data is a Promise, not the response
    console.log(data); // Promise { <pending> }
    const json = await data.json(); // Error: data.json is not a function
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which function pauses? | The current async function (the one containing `await`). |
| Entire application? | No. Only the async function. Other code continues. |
| Or only current async function? | Correct. The rest of the runtime is unblocked. |
| Can you use `await` at the top level of a script? | No (unless it's an ES module). |
| What does `await` return? | The fulfillment value of the promise (or throws if rejected). |
| Is `await` blocking the event loop? | No. It suspends the function; the event loop continues. |

---

# Chapter 15 — Fetch API

## What is Fetch?

A browser API for making HTTP requests. It returns a **Promise**.

Example

```javascript
async function load()
{
    let response =
        await fetch(url);

    let data =
        await response.json();

    console.log(data);
}
```

---

## Flow

```text
fetch(url)
   │
   ▼ (Promise resolves with Response object)
response.json()
   │
   ▼ (Promise resolves with parsed JSON)
data (object/array)
```

---

## The Response Object

```javascript
async function inspectResponse() {
    const response = await fetch("/api/data");

    console.log(response.status);      // 200, 404, 500
    console.log(response.ok);          // true if status 200-299
    console.log(response.headers.get("Content-Type"));

    const text = await response.text(); // Or .json(), .blob(), .formData()
    console.log(text);
}
```

---

## Handling HTTP Errors

```javascript
async function load() {
    const response = await fetch("/api/data");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

load().catch(err => console.error("Failed:", err.message));
```

Note: `fetch` only rejects on **network errors**, not HTTP error statuses (4xx, 5xx).

---

## POST Request with Fetch

```javascript
async function createUser(user) {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
}
```

---

## Fetch with Options

```javascript
const response = await fetch(url, {
    method: "GET",              // or POST, PUT, DELETE, PATCH
    headers: {
        "Authorization": "Bearer " + token,
        "Accept": "application/json",
    },
    cache: "no-cache",
    credentials: "include",     // Send cookies
    signal: AbortSignal.timeout(5000), // Timeout after 5s
});
```

---

## Aborting a Fetch Request

```javascript
const controller = new AbortController();

// Start request
const promise = fetch("/large-file", {
    signal: controller.signal,
});

// Abort after 3 seconds
setTimeout(() => controller.abort(), 3000);

try {
    const response = await promise;
    console.log("Done");
} catch (err) {
    if (err.name === "AbortError") {
        console.log("Request was aborted");
    } else {
        console.error("Request failed", err);
    }
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does fetch return? | A Promise that resolves to a Response object. |
| Does fetch reject on 404? | No. It only rejects on network failure (no internet, DNS failure, CORS error). |
| How do you read the body? | Call `.json()`, `.text()`, `.blob()`, or `.formData()` on the Response object. |
| How do you cancel a fetch? | Use `AbortController` and pass `signal` in options. |
| What is CORS? | Cross-Origin Resource Sharing – a security mechanism that restricts cross-origin requests. |

---

# Chapter 16 — Promise.all()

## Running Tasks Concurrently

Waits for **all** promises to fulfill. Rejects immediately if **any** rejects.

```javascript
Promise.all([
    p1,
    p2,
    p3
]);
```

---

## Example

```javascript
let result =
await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
]);
```

---

## Execution

```text
Time ──────────────────────────────────>
fetchUser()   ████████████████████░░░░░░░░░░░░
fetchPosts()  ██████████████████████████████░░
fetchComments() ██████████░░░░░░░░░░░░░░░░░░░░
              ↑ all start at same time
                            ↑ all finish → Promise.all resolves
```

All three start at roughly the same time (concurrently).

---

## Parallel vs Sequential Timing

```javascript
// SEQUENTIAL: 3 seconds total (if each takes 1s)
async function sequential() {
    const a = await delay(1000);
    const b = await delay(1000);
    const c = await delay(1000);
    return [a, b, c];
}

// PARALLEL: 1 second total
async function parallel() {
    const [a, b, c] = await Promise.all([
        delay(1000),
        delay(1000),
        delay(1000),
    ]);
    return [a, b, c];
}
```

---

## Destructuring the Result

```javascript
const [users, posts, comments] = await Promise.all([
    fetch("/users").then(r => r.json()),
    fetch("/posts").then(r => r.json()),
    fetch("/comments").then(r => r.json()),
]);
```

The result array matches the order of the input promises.

---

## Error Behavior

```javascript
const fast = Promise.reject("Fast error");
const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 3000));

Promise.all([fast, slow])
    .then(results => console.log("All done", results))
    .catch(err => console.log("Failed:", err));
// Output (immediately): "Failed: Fast error"
// (slow continues executing but its result is discarded)
```

`Promise.all` **short-circuits** on the first rejection.

---

## Empty Array

```javascript
Promise.all([]).then(results => {
    console.log(results); // [] – resolves immediately
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Independent tasks? | If none depend on each other's results, they can run in parallel. |
| Can they run together? | Yes. `Promise.all` starts all promises concurrently. |
| What happens if one rejects? | `Promise.all` rejects immediately with that error. Others continue but their results are ignored. |
| What if you need all results even if some fail? | Use `Promise.allSettled` instead. |
| Does order of results match input order? | Yes. Always. |

---

# Chapter 17 — Promise.race()

## First Settled Wins

Returns a promise that settles with the first promise to settle (fulfill or reject).

```javascript
Promise.race([
    p1,
    p2
]);
```

---

## Useful For: Timeout Systems

```javascript
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), ms);
    });

    return Promise.race([promise, timeout]);
}

// Usage
try {
    const result = await withTimeout(fetch("/slow-api"), 3000);
    console.log("Got result:", result);
} catch (err) {
    console.error("Failed or timed out:", err.message);
}
```

---

## Race Condition Detection

```js
const p1 = new Promise(r => setTimeout(() => r("First"), 100));
const p2 = new Promise(r => setTimeout(() => r("Second"), 200));

Promise.race([p1, p2]).then(winner => {
    console.log(winner); // "First" (after 100ms)
});
```

---

## Important: Promise.race Does Not Cancel Losers

```javascript
const slow = new Promise(resolve => {
    setTimeout(() => {
        console.log("Slow still finished");
        resolve("Slow");
    }, 2000);
});

const fast = new Promise(resolve => {
    setTimeout(() => resolve("Fast"), 500);
});

Promise.race([fast, slow]).then(console.log);
// After 500ms: "Fast"
// After 2000ms: "Slow still finished" (loser still runs)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does `Promise.race` cancel the losing promises? | No. They continue executing. Their results are simply ignored. |
| When would you use `Promise.race`? | Timeouts, request racing (fastest server), user interaction timeouts. |
| What happens if the first settled promise rejects? | `Promise.race` rejects with that reason. |

---

# Chapter 18 — Promise.allSettled()

## Wait for All Results (Even Failures)

Returns when **all** promises settle. Never rejects.

```javascript
Promise.allSettled([
    p1,
    p2
]);
```

---

## Result Structure

```javascript
const results = await Promise.allSettled([
    fetch("/success").then(r => r.json()),
    fetch("/fail").then(r => r.json()),
]);

// results is an array of:
// { status: "fulfilled", value: ... }
// { status: "rejected",  reason: ... }
```

---

## Example

```javascript
const promises = [
    Promise.resolve(1),
    Promise.reject("Error"),
    Promise.resolve(3),
];

Promise.allSettled(promises).then(results => {
    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(`Promise ${i} fulfilled:`, result.value);
        } else {
            console.log(`Promise ${i} rejected:`, result.reason);
        }
    });
});
// Output:
// Promise 0 fulfilled: 1
// Promise 1 rejected: Error
// Promise 2 fulfilled: 3
```

---

## When to Use

```javascript
async function loadAllEndpoints() {
    const results = await Promise.allSettled([
        fetch("/users").then(r => r.json()),
        fetch("/posts").then(r => r.json()),
        fetch("/slow-service").then(r => r.json()),
    ]);

    const data = {
        users: results[0].status === "fulfilled" ? results[0].value : [],
        posts: results[1].status === "fulfilled" ? results[1].value : [],
        extra: results[2].status === "fulfilled" ? results[2].value : null,
    };

    return data;
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does `Promise.allSettled` ever reject? | No. It always fulfills with an array of result objects. |
| How do you check individual results? | Each result has `{ status: "fulfilled", value }` or `{ status: "rejected", reason }`. |
| When should you use `allSettled` instead of `all`? | When you need partial results even if some operations fail. |

---

# Chapter 19 — Promise.any()

## First Success Wins

Returns as soon as **one** promise fulfills. Ignores rejections until all reject.

```javascript
Promise.any([
    p1,
    p2
]);
```

---

## If All Reject

```javascript
Promise.any([
    Promise.reject("A"),
    Promise.reject("B"),
    Promise.reject("C"),
]).catch(err => {
    console.log(err instanceof AggregateError); // true
    console.log(err.errors); // ["A", "B", "C"]
});
```

---

## Use Case: Fastest Successful Server

```javascript
const servers = [
    fetch("https://us-east.server.com/data"),
    fetch("https://eu-west.server.com/data"),
    fetch("https://ap-south.server.com/data"),
];

try {
    const fastest = await Promise.any(servers);
    const data = await fastest.json();
    console.log("Got data from fastest server:", data);
} catch (err) {
    console.error("All servers failed:", err.errors);
}
```

---

## Combinator Summary

| Method | Short-circuits | Resolves | Rejects |
|--------|---------------|----------|---------|
| `Promise.all` | First rejection | Array of values | First error |
| `Promise.allSettled` | Never | Array of result objects | Never |
| `Promise.race` | First settlement | First settled value | First settled reason |
| `Promise.any` | First fulfillment | First fulfilled value | `AggregateError` (all) |

---

## Visual Decision Tree

```text
Need all results?
    ├─ Yes → Need all even if some fail?
    │        ├─ Yes → Promise.allSettled
    │        └─ No  → Promise.all
    └─ No  → Need first result?
             ├─ Any result (success or failure)?
             │       └─ Promise.race
             └─ Only success?
                     └─ Promise.any
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What if one promise fulfills and another rejects? | `Promise.any` resolves with the first fulfillment. The rejection is ignored. |
| What error does `Promise.any` give when all reject? | `AggregateError` with an `errors` array property. |
| How is `any` different from `race`? | `race` settles on first settlement (success or failure). `any` only settles on first success; if all fail, it rejects. |

---

# Chapter 20 — Event Loop

## The Brain Coordinating Everything

The event loop is the mechanism that coordinates the call stack, Web APIs, and task queues.

---

## The Core Algorithm

```text
while (true) {
    // 1. Execute all synchronous code (current task on stack)

    // 2. Drain the microtask queue (entirely)
    while (microtaskQueue.length > 0) {
        processMicrotask();
    }

    // 3. Render (browser) – if needed

    // 4. Pick one macrotask from the macrotask queue
    if (macrotaskQueue.length > 0) {
        processMacrotask();
    }

    // 5. Repeat
}
```

---

## Process

```text
1. Execute synchronous code (stack)
           │
           ▼
2. Empty microtask queue (all promises, queueMicrotask)
           │
           ▼
3. Render UI (browser) – if update pending
           │
           ▼
4. Execute one macrotask (setTimeout, event, I/O)
           │
           ▼
5. Back to step 2
```

---

## Rule

### Never interrupt stack.

Only when stack empty.

---

## Example: Full Event Loop Cycle

```javascript
console.log("1"); // sync

setTimeout(() => {               // macrotask
    console.log("2");
    Promise.resolve().then(() => console.log("3")); // microtask
}, 0);

Promise.resolve().then(() => {   // microtask
    console.log("4");
});

console.log("5"); // sync

// Output: 1 5 4 2 3
```

**Step by step:**

| Step | Stack | Microtask Q | Macrotask Q | Console |
|------|-------|-------------|-------------|---------|
| 1 | `console.log("1")` | [] | [] | `1` |
| 2 | `setTimeout()` → Web API | [] | `[()=>log("2")]` | |
| 3 | `Promise.resolve().then(...)` | `[()=>log("4")]` | `[()=>log("2")]` | |
| 4 | `console.log("5")` | `[()=>log("4")]` | `[()=>log("2")]` | `5` |
| 5 | stack empty → drain microtasks | | | |
| 6 | `log("4")` runs | [] | `[()=>log("2")]` | `4` |
| 7 | microtask Q empty → pick macrotask | | | |
| 8 | `log("2")` runs | | [] | `2` |
| 9 | microtask from `log("2")`'s Promise | `[()=>log("3")]` | | |
| 10 | drain microtasks: `log("3")` | [] | | `3` |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How does the event loop decide what to run next? | It checks: Is stack empty? If yes, drain microtasks, then pick one macrotask. |
| Can the event loop be blocked? | Yes. If the stack never empties (infinite loop), no tasks are processed. |
| Does the event loop run at a fixed speed? | No. It runs as fast as the stack allows, typically 60+ cycles per second. |
| What is the event loop's relationship to rendering? | Rendering occurs after microtask drain, before the next macrotask, but not on every cycle. |

---

# Chapter 21 — Task Queue (Macrotask Queue)

## Macrotasks

Lower priority than microtasks. One macrotask is processed per event loop iteration.

Examples:

```text
setTimeout
setInterval
setImmediate (Node.js)
DOM events (click, keydown, mousemove)
I/O callbacks (Node.js)
UI rendering
```

---

## Example

```javascript
setTimeout(()=>{

},0);
```

Still waits.

Because queue is checked only after stack empty and microtasks drained.

---

## Multiple Macrotasks

```javascript
setTimeout(() => console.log("A"), 0);
setTimeout(() => console.log("B"), 0);
setTimeout(() => console.log("C"), 0);

// Output: A B C (one per event loop iteration)
```

Each `setTimeout` callback is a separate macrotask. They are processed one per iteration, in FIFO order.

---

## Macrotask Queue Behavior

```text
Event Loop Iteration 1:
  - Process macrotask A (log "A")
  - Drain microtasks (none)

Event Loop Iteration 2:
  - Process macrotask B (log "B")
  - Drain microtasks (none)

Event Loop Iteration 3:
  - Process macrotask C (log "C")
  - Drain microtasks (none)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What goes in the macrotask queue? | setTimeout, setInterval, DOM events, I/O callbacks. |
| How many macrotasks are processed per event loop iteration? | One. |
| Does `setTimeout(fn, 0)` guarantee immediate execution? | No. It must wait for the current stack + microtask queue to clear. |

---

# Chapter 22 — Microtask Queue

## Higher Priority

Microtasks are processed **immediately after the current task**, before the next macrotask.

Contains:

```text
Promise.then / catch / finally
queueMicrotask()
MutationObserver (browser)
process.nextTick (Node.js – even higher priority)
```

---

## Example

```javascript
console.log("A");

setTimeout(
()=>console.log("B")
);

Promise.resolve()

.then(
()=>console.log("C")
);

console.log("D");
```

Output

```text
A
D
C
B
```

---

## Why?

Microtasks execute before macrotasks.

---

## Execution Breakdown:

```text
Synchronous code:
  log("A") → "A"
  setTimeout → macrotask queue: [log("B")]
  Promise.resolve().then(...) → microtask queue: [log("C")]
  log("D") → "D"

Stack empty → drain microtask queue:
  log("C") → "C"
  microtask queue: []

Stack empty → pick next macrotask:
  log("B") → "B"
  macrotask queue: []
```

---

## Microtask Inside Microtask

```javascript
Promise.resolve()
    .then(() => {
        console.log("A");
        Promise.resolve().then(() => console.log("B"));
    })
    .then(() => console.log("C"));

// Output: A B C
```

Wait, why "C" after "B"? Because the second `.then()` (for "C") is chained to the **first** promise. Let's trace:

```javascript
const p = Promise.resolve(); // fulfilled immediately

const p1 = p.then(() => {
    console.log("A");
    // Returns undefined (after microtask completes)
    Promise.resolve().then(() => console.log("B"));
    // Return undefined → p1 fulfills with undefined
});

const p2 = p1.then(() => console.log("C"));
// p2 waits for p1

// Microtask order:
// 1. p1 handler: logs "A", queues microtask for "B", returns undefined
// 2. p1 is now fulfilled → p1.then handler (for "C") is queued as microtask
// 3. "B" microtask from inside p1: logs "B"
// 4. "C" microtask: logs "C"

// Wait, actually let me think again...

// Promise.resolve() → p is fulfilled
// p.then(f1) → p1 (pending, will settle when f1 runs)
// p1.then(f2) → p2 (pending, will settle when f1 runs and p1 settles)

// Microtask queue after current sync code:
// [f1]

// f1 runs:
//   logs "A"
//   Promise.resolve().then(() => log("B")) → queues microtask for log("B")
//   returns undefined → p1 fulfills → p1.then(f2) queues f2 as microtask

// Microtask queue after f1:
// [log("B"), f2]  (both are microtasks)

// log("B") runs: logs "B"
// f2 runs: logs "C"

// Output: A B C
```

---

## Microtask Starvation

If microtasks keep queueing new microtasks, macrotasks never run:

```javascript
function loop() {
    Promise.resolve().then(loop); // Queue another microtask
}

loop();

setTimeout(() => console.log("Never runs"), 1000);
```

The `setTimeout` callback never executes because microtasks are infinite.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Promise? | Goes to microtask queue (`.then()`, `.catch()`, `.finally()`). |
| Timer? | Goes to macrotask queue (`setTimeout`, `setInterval`). |
| Which queue has priority? | Microtask queue is drained completely before the next macrotask. |
| Can microtasks starve macrotasks? | Yes. If microtasks queue more microtasks, macrotasks never run. |
| What about `queueMicrotask()`? | Explicit microtask queueing, same priority as promise callbacks. |

---

# Chapter 23 — Event Listeners

## How Events Work

When a user interacts with the page (click, keydown, scroll), an event is generated and placed in the **macrotask queue**.

```javascript
button.addEventListener(
"click",
()=>{
    console.log("Clicked");
});
```

---

## Event Task Flow

```text
User clicks button
       │
       ▼
Browser creates: "click" event
       │
       ▼
Event added to macrotask queue
       │
       ▼
Event Loop picks it (when stack + microtasks are clear)
       │
       ▼
Event handler executes on the stack
       │
       ▼
"Clicked" logged
```

---

## Multiple Handlers

```javascript
button.addEventListener("click", () => console.log("Handler 1"));
button.addEventListener("click", () => console.log("Handler 2"));

// On click: Handler 1, then Handler 2
// (both run in the same macrotask)
```

---

## Event Listener Removal

```javascript
function handler() {
    console.log("Clicked");
}

button.addEventListener("click", handler);

// Later:
button.removeEventListener("click", handler);
// handler will no longer fire
```

Important: To remove, you must pass the **same function reference**. Anonymous functions cannot be removed.

---

## Event Propagation

```text
Capturing phase:  window → document → body → button
Target phase:     button
Bubbling phase:   button → body → document → window
```

```javascript
// Bubbling (default: third arg false)
button.addEventListener("click", () => console.log("button"));

// Capturing (third arg true)
document.addEventListener("click", () => console.log("document"), true);
```

---

## Asynchronous Event Handlers

```javascript
button.addEventListener("click", async () => {
    // This works but the returned promise is ignored
    const data = await fetch("/api");
    console.log(await data.json());
});

// If it rejects → unhandled rejection!
// Fix:
button.addEventListener("click", async () => {
    try {
        const data = await fetch("/api");
        console.log(await data.json());
    } catch (err) {
        console.error("Failed:", err);
    }
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What queue does an event handler go into? | Macrotask queue. |
| Does `preventDefault()` stop propagation? | No. It prevents the default browser action (like navigating on a link). `stopPropagation()` stops propagation. |
| Can you have both capturing and bubbling handlers? | Yes. Capturing fires before target, bubbling fires after. |
| What happens if the event handler throws? | The error goes to the global `error` event. It does not affect other handlers. |

---

# Chapter 24 — Error Handling

## Async Error Handling with try/catch

Example

```javascript
try
{
    await fetchData();
}
catch(error)
{
    console.log(error);
}
```

---

## Catching in Promise Chains

```javascript
fetch("/data")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    })
    .then(data => process(data))
    .catch(err => {
        // Catches any error: network, HTTP, JSON parse, process
        console.error("Something went wrong:", err);
        showErrorMessage(err.message);
    });
```

---

## Multiple Catch Blocks

```javascript
try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return comments;
} catch (err) {
    if (err.message.includes("404")) {
        console.warn("Resource not found, using defaults");
        return [];
    }
    if (err.message.includes("NetworkError")) {
        console.error("Network is down");
        throw new Error("Please check your connection");
    }
    // Re-throw unknown errors
    throw err;
}
```

---

## Global Error Handlers

```javascript
// Browser: unhandled promise rejections
window.addEventListener("unhandledrejection", event => {
    console.error("Unhandled rejection:", event.reason);
    event.preventDefault(); // Suppress console warning
});

// Browser: general errors
window.addEventListener("error", event => {
    console.error("Uncaught error:", event.error);
});

// Node.js
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1); // Clean up and exit
});
```

---

## Nested Error Handling Pattern

```javascript
async function robustLoad() {
    let user;
    try {
        user = await fetchUser();
    } catch {
        user = { name: "Guest", id: -1 }; // Fallback
    }

    let posts;
    try {
        posts = await fetchPosts(user.id);
    } catch {
        posts = [];
    }

    return { user, posts };
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can a `try/catch` around an async function call catch its rejection? | Yes, if you `await` it. |
| What happens if you don't `await` inside a `try` block? | The rejection is not caught. The `try` block exits before the promise rejects. |
| Why does `.catch()` at the end of a chain catch all errors? | Errors propagate down the chain. If any `.then()` throws or returns a rejected promise, the chain skips to the first `.catch()`. |
| What is an unhandled rejection? | A rejected promise with no `.catch()` attached. Triggers a global event. |

---

# Chapter 25 — Sequential Execution

## One at a Time

```javascript
await a();

await b();

await c();
```

Order:

```text
a
↓
b
↓
c
```

---

## Total Time

```
3 + 3 + 3 = 9 sec
```

(assuming each takes 3 seconds)

---

## When Sequential is Correct

Use sequential when each step depends on the previous:

```javascript
const user = await fetchUser(id);       // Need user
const profile = await fetchProfile(user.id); // Need user.id
const posts = await fetchPosts(profile.id);  // Need profile.id
```

---

## Sequential Loop

```javascript
async function processAll(items) {
    const results = [];
    for (const item of items) {
        const result = await process(item); // One at a time
        results.push(result);
    }
    return results;
}
// Total time: N * time_per_item
```

---

## Sequential with Error Handling

```javascript
async function sequential() {
    const a = await step1();
    const b = await step2(a); // Depends on a
    const c = await step3(b); // Depends on b
    return c;
}
// If step1 fails, step2 and step3 never run
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| When must you use sequential? | When each step depends on the previous step's result. |
| What is the cost of sequential? | Total time = sum of all operation times. |
| Can sequential cause a freeze? | No, because the function is suspended between `await`s. Other code can run. |

---

# Chapter 26 — Parallel Execution

## All at Once

```javascript
await Promise.all([
    a(),
    b(),
    c()
]);
```

Time:

```
3 sec
```

(much faster if all take 3 seconds)

---

## When Parallel is Correct

Use parallel when operations are **independent**:

```javascript
// Independent: no dependency between user, posts, comments
const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
]);
```

---

## Parallel Map

```javascript
async function processAll(items) {
    // All items processed concurrently
    return Promise.all(items.map(item => process(item)));
}
// Total time: time_of_slowest_item (if truly parallel)
```

---

## Mixed Sequential + Parallel

```javascript
async function mixed() {
    // Step 1: parallel (independent)
    const [user, config] = await Promise.all([
        fetchUser(),
        fetchConfig(),
    ]);

    // Step 2: sequential (depends on step 1)
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);

    return { user, config, posts, comments };
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Independent tasks? | Do any depend on each other's results? If not, parallel. |
| Can they run concurrently? | Yes. Start all at once with `Promise.all`. |
| What is the fastest possible time? | The time of the slowest single operation (bottleneck). |
| Can you control the degree of parallelism? | Not directly with `Promise.all`. Use a task queue with concurrency limit. |

---

# Chapter 27 — Debouncing

## Wait Before Executing

Debouncing ensures a function is called only after a certain amount of time has passed **since the last invocation**.

Search boxes use this.

---

## Without Debounce

User types "Hello":

```text
H       → API call (search "H")
He      → API call (search "He")
Hel     → API call (search "Hel")
Hell    → API call (search "Hell")
Hello   → API call (search "Hello")
```

Five API calls for one word.

---

## With Debounce

```text
H
He
Hel
Hell
Hello   → (300ms pause) → API call (search "Hello")
```

One API call.

---

## Debounce Implementation

```javascript
function debounce(fn, delay) {
    let timerId = null;

    return function(...args) {
        clearTimeout(timerId); // Cancel previous
        timerId = setTimeout(() => {
            fn.apply(this, args); // Execute after delay
        }, delay);
    };
}

// Usage
const search = debounce(async (query) => {
    const results = await fetch(`/search?q=${query}`);
    console.log(await results.json());
}, 300);

searchInput.addEventListener("input", (e) => {
    search(e.target.value);
});
```

---

## Immediate Debounce (Leading Edge)

```javascript
function debounce(fn, delay, immediate = false) {
    let timerId = null;

    return function(...args) {
        const callNow = immediate && !timerId;

        clearTimeout(timerId);

        timerId = setTimeout(() => {
            timerId = null;
            if (!immediate) fn.apply(this, args);
        }, delay);

        if (callNow) fn.apply(this, args);
    };
}
```

---

## Real-world Use Cases

```text
Search input     → 300-500ms debounce
Window resize    → 200ms debounce
Button click     → prevent double-submit (immediate + no trailing)
Auto-save        → 1000ms debounce
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What problem does debounce solve? | Reduces frequency of expensive operations (API calls, re-renders). |
| How does debounce work internally? | Cancels previous timer, sets new timer. Only the last call in a burst fires. |
| What is the difference between debounce and throttle? | Debounce delays until activity stops. Throttle limits rate (max once per interval). |
| What happens to the return value of a debounced function? | It returns undefined (the actual result is lost). Use promises for async debouncing. |

---

# Chapter 28 — Throttling

## Limits Frequency

Throttling ensures a function is called **at most once** in a given time interval.

Useful:

* Scroll events
* Resize events
* Mouse movement
* Game input (keyboard, mouse)

---

## Throttle Implementation

```javascript
function throttle(fn, limit) {
    let inThrottle = false;

    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Usage
const handleScroll = throttle(() => {
    console.log("Scrolled at", Date.now());
}, 200);

window.addEventListener("scroll", handleScroll);
// Logs at most once every 200ms, regardless of scroll speed
```

---

## Throttle vs Debounce Visual

```text
Events:     X   X   X   X   X   X   X   X
            │   │   │   │   │   │   │   │
Debounce:   ───────────────────────X──────
            (only last event after pause)

Throttle:   X──────X──────X──────X──────X──
            (one per interval)
```

---

## Throttle with Trailing Edge

```javascript
function throttle(fn, limit) {
    let inThrottle = false;
    let lastArgs = null;

    return function(...args) {
        if (inThrottle) {
            lastArgs = args; // Remember latest call
            return;
        }

        fn.apply(this, args);
        inThrottle = true;

        setTimeout(() => {
            inThrottle = false;
            if (lastArgs) {
                fn.apply(this, lastArgs); // Execute last remembered call
                lastArgs = null;
            }
        }, limit);
    };
}
```

---

## Real-world Use Cases

```text
Scroll handler         → 100-200ms throttle
Resize handler         → 200ms throttle
Mouse move tracking    → 50-100ms throttle
Game loop input        → match frame rate (16ms throttle)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| When should you use throttle instead of debounce? | When you want periodic updates during continuous activity (scroll, resize, mouse move). |
| Can a throttled function miss the last call? | Yes, unless trailing-edge handling is implemented. |
| How does throttle affect performance? | Reduces call frequency, preventing layout thrashing and excessive computation. |
| What is "leading" vs "trailing" throttle? | Leading: first call fires immediately. Trailing: the last call fires after the interval. |

---

# Chapter 29 — Memory Leaks

## The Danger of Forgotten Timers

Repeated timers that are never stopped:

```javascript
// Memory leak!
setInterval(
()=>{

},1000);
```

Forgot to stop.

Runs forever.

The callback (and its closure) cannot be garbage collected.

---

## Closures Holding Large Objects

```javascript
function createLeak() {
    const hugeData = new Array(1000000).fill("data");

    setInterval(() => {
        // hugeData is in the closure → never GC'd
        console.log(hugeData.length);
    }, 1000);
}

createLeak();
// hugeData lives forever because the closure keeps a reference
```

---

## Forgotten Event Listeners

```javascript
class Component {
    mount() {
        this.handler = () => {
            this.update();
        };
        window.addEventListener("resize", this.handler);
        // If component is unmounted but handler is not removed:
        // → component cannot be GC'd
        // → handler still runs (accessing unmounted component)
    }

    destroy() {
        // Must do this:
        window.removeEventListener("resize", this.handler);
    }
}
```

---

## Unresolved Promises

```javascript
function leakingPromise() {
    return new Promise((resolve) => {
        // Promise never resolves → .then() callbacks wait forever
        // If these callbacks reference objects, those objects leak
    });
}

const leak = leakingPromise();
leak.then(() => {
    // This callback is held forever
});
```

---

## Detached DOM Nodes

```javascript
const elements = [];

function leak() {
    const div = document.createElement("div");
    div.textContent = "Hello";
    document.body.appendChild(div);
    elements.push(div); // Reference stored in array

    // Even after removing from DOM:
    // document.body.removeChild(div);
    // The div is still referenced by `elements` → still in memory
}
```

---

## Preventing Memory Leaks

```javascript
// 1. Clean up timers
const timerId = setInterval(fn, 1000);
clearInterval(timerId);

// 2. Remove event listeners
element.removeEventListener("click", handler);

// 3. Clear references
data = null;

// 4. Use WeakMap / WeakSet for optional references
const cache = new WeakMap(); // Keys can be GC'd if no other references

// 5. Avoid retaining large objects in closures
function safe() {
    const data = getHugeData();
    process(data);
    // data goes out of scope after function returns
}
```

---

## Detecting Memory Leaks

```javascript
// Chrome DevTools:
// 1. Performance tab → record activity
// 2. Memory tab → take heap snapshots
// 3. Look for detached DOM nodes, growing object counts

// Node.js:
// process.memoryUsage()
console.log(process.memoryUsage());
// { rss, heapTotal, heapUsed, external }
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What causes a closure to leak? | A reference to the closure is held by a long-lived object (timer, event listener, global). |
| How do forgotten event listeners cause leaks? | The listener holds a reference to the object it was bound to, preventing GC. |
| Can promises cause memory leaks? | Yes, if they never settle or if they're held in a long-lived array. |
| How do you detect a memory leak? | Growing memory over time, heap snapshots showing retained objects, performance degradation. |
| What tool do you use? | Chrome DevTools Memory tab, Node.js `--inspect`, `process.memoryUsage()`. |

---

# Senior Reverse Engineering Checklist

Whenever reading asynchronous code ask:

### Is operation synchronous or asynchronous?

Look for callbacks, promises, `async/await`, timers, fetch, event listeners.

---

### Who owns this callback?

Does a library own it? The runtime? Can it be called multiple times?

---

### Which queue?

Microtask? (Promise, queueMicrotask)
Macrotask? (setTimeout, setInterval, event listener, I/O)

---

### What starts execution?

User action? Timer? Network response? Promise resolution?

---

### What pauses execution?

`await`? Missing callback? Deadlock? Race condition?

---

### Is code sequential?

Could it be parallel? Are there dependencies between operations?

---

### Can tasks run concurrently?

If independent, use `Promise.all`. If dependent, chain them.

---

### Which promise resolves first?

Trace the timings. Are there race conditions?

---

### What happens on failure?

Is there a `.catch()`? A `try/catch`? An unhandled rejection?

---

### Will memory be cleaned?

Are timers cleared? Listeners removed? Closures released?

---

### Can callback run multiple times?

Raw callbacks can be invoked multiple times (unlike promises).

---

# Projects

## Countdown Timer

Using:

```javascript
setInterval()
```

```javascript
function countdown(seconds) {
    const intervalId = setInterval(() => {
        console.log(seconds);
        seconds--;
        if (seconds < 0) {
            clearInterval(intervalId);
            console.log("Time's up!");
        }
    }, 1000);
}

countdown(5);
// Output: 5 4 3 2 1 0 Time's up!
```

---

## Delayed Message System

Using:

```javascript
setTimeout()
```

```javascript
function delayedMessage(message, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(message);
            resolve(message);
        }, delay);
    });
}

async function run() {
    console.log("Starting...");
    await delayedMessage("First message", 1000);
    await delayedMessage("Second message", 2000);
    await delayedMessage("Third message", 1500);
    console.log("Done");
}
// Only "First message" → "Second message" → "Third message" (sequential)
```

---

## API Client

Using:

```javascript
fetch()
```

and:

```javascript
async
await
```

```javascript
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (!response.ok) throw new Error(`GET ${endpoint}: ${response.status}`);
        return response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`POST ${endpoint}: ${response.status}`);
        return response.json();
    }
}

const api = new APIClient("https://jsonplaceholder.typicode.com");
const posts = await api.get("/posts/1");
console.log(posts);
```

---

## Parallel Downloader

Using:

```javascript
Promise.all()
```

```javascript
async function downloadAll(urls) {
    const fetchPromises = urls.map(async (url, index) => {
        const response = await fetch(url);
        const text = await response.text();
        return { index, url, data: text };
    });

    return Promise.all(fetchPromises);
}

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
];

downloadAll(urls)
    .then(results => {
        results.forEach(r => console.log(`Downloaded ${r.url}: ${r.data.length} chars`));
    })
    .catch(err => console.error("Download failed:", err));
```

---

## Retry Mechanism

If request fails: retry three times.

```javascript
async function retry(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt === maxRetries) throw err;
            const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usage
const data = await retry(() =>
    fetch("https://unreliable-api.com/data").then(r => r.json())
);
console.log(data);
```

---

## Debounced Search Bar

Using:

```javascript
clearTimeout()
```

```javascript
class DebouncedSearch {
    constructor(inputElement, onSearch, delay = 300) {
        this.inputElement = inputElement;
        this.onSearch = onSearch;
        this.delay = delay;
        this.timerId = null;
        this.setup();
    }

    setup() {
        this.inputElement.addEventListener("input", (e) => {
            clearTimeout(this.timerId);
            this.timerId = setTimeout(() => {
                this.onSearch(e.target.value);
            }, this.delay);
        });
    }
}

// Usage
const searchInput = document.querySelector("#search");
new DebouncedSearch(searchInput, async (query) => {
    if (query.length < 2) return;
    const results = await fetch(`/api/search?q=${query}`).then(r => r.json());
    displayResults(results);
});
```

---

# Part 7 Summary

| Concept | Key Takeaway |
|---------|-------------|
| Synchronous | Blocking, sequential, LIFO stack |
| Asynchronous | Non-blocking, deferred execution |
| setTimeout | Deferred callback (macrotask) |
| Call Stack | Single-threaded, LIFO |
| Web APIs | Environment-provided, run outside engine |
| Callback | Function executed later |
| Callback Hell | Deeply nested async callbacks |
| Promise | Future value with states (pending/fulfilled/rejected) |
| .then() | Handles fulfillment |
| .catch() | Handles rejection |
| .finally() | Always runs |
| Chaining | Flat async sequence |
| async function | Always returns promise |
| await | Pauses current async function |
| Fetch API | Browser HTTP client (returns promise) |
| Promise.all | Parallel, short-circuits on error |
| Promise.race | First settled wins |
| Promise.allSettled | All results, never rejects |
| Promise.any | First success wins |
| Event Loop | Coordinates stack + queues |
| Macrotask Queue | setTimeout, events, I/O |
| Microtask Queue | Promise callbacks, higher priority |
| Event Listeners | User interaction → macrotask |
| Error Handling | try/catch with async/await, .catch() in chains |
| Sequential | One at a time, depends on previous |
| Parallel | All at once with Promise.all |
| Debouncing | Wait until pause before executing |
| Throttling | Limit execution rate |
| Memory Leaks | Forgot timers, listeners, closures |

---

# Next Part (Part 8)

We enter one of the most important areas of modern JavaScript engineering:

# Modules, Package Management, npm, Bundlers, Build Tools, and Project Architecture

including:

* ES Modules
* CommonJS
* import
* export
* npm
* package.json
* dependencies
* devDependencies
* semantic versioning
* npx
* bundlers
* transpilers
* Babel
* Webpack
* Vite
* Rollup
* tree shaking
* project structures
* reverse engineering tactics used by senior JavaScript engineers.
