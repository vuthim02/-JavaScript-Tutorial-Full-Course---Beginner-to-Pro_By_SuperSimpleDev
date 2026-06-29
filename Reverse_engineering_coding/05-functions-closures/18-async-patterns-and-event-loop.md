# Async Function Anti-Patterns & Microtask Queue

<img src="https://miro.medium.com/0*SArZ3CHPasWNmOyG.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Async Function Anti-Patterns

```javascript
// ❌ Unnecessary await on return
async function bad() { return await Promise.resolve(42); }
async function good() { return Promise.resolve(42); }

// ❌ Forgetting to await
async function fetchUser(id) {
    const user = fetchUserFromDB(id);
    console.log(user); // Promise — not the user!
}

// ❌ await in .forEach — all fire in parallel
async function wrong() {
    [1, 2, 3].forEach(async (n) => { await doSomething(n); });
}
async function right() {
    for (const n of [1, 2, 3]) { await doSomething(n); }
}
```
## Reverse Engineering Checklist (Async)

| Question | Answer |
|----------|--------|
| What does `async` return? | Always a Promise |
| What does `await` do? | Suspends until Promise settles, returns resolved value |
| Does `await` block the thread? | No — suspends only the async function |
| Sequential or parallel? | Sequential by default; use `Promise.all` for parallel |
| How to catch errors? | `try/catch` inside async, or `.catch()` on the call |
| Can `await` be used outside `async`? | Only at top level of modules (ES2022) |

---
# Microtask Queue & Event Loop
## The Big Picture

JavaScript is **single-threaded** — it can only do one thing at a time. The **Event Loop** lets it handle async operations without blocking.

```
┌─────────────────────────────────────────────────────────────────┐
│                         EVENT LOOP                              │
│                                                                 │
│  ┌─────────────┐   ┌──────────────────┐   ┌─────────────────┐  │
│  │ Call Stack  │   │  Microtask Queue │   │  Macrotask Queue│  │
│  │             │   │                  │   │                 │  │
│  │ fn3()       │   │ Promise callback │   │ setTimeout cb   │  │
│  │ fn2()       │   │ .then()          │   │ setInterval cb  │  │
│  │ fn1()       │   │ queueMicrotask() │   │ I/O callback    │  │
│  │ global      │   │ MutationObserver │   │ requestAnimFrame│  │
│  └─────────────┘   └──────────────────┘   └─────────────────┘  │
│                                                                 │
│  Execution order:                                               │
│  1. Run everything on call stack                                │
│  2. Drain entire microtask queue (repeat until empty)          │
│  3. Run ONE macrotask                                           │
│  4. Drain microtask queue again                                 │
│  5. Repeat from step 3                                          │
└─────────────────────────────────────────────────────────────────┘
```
## Macrotasks vs Microtasks

| Macrotasks (Task Queue) | Microtasks (Microtask Queue) |
|------------------------|------------------------------|
| `setTimeout` | `Promise.then/.catch/.finally` |
| `setInterval` | `queueMicrotask()` |
| `setImmediate` (Node) | `MutationObserver` |
| I/O callbacks | `await` resumption |
| `requestAnimationFrame` | `process.nextTick` (Node, highest priority) |

**Key rule:** The entire microtask queue is **drained** after every macrotask and after the synchronous code finishes. Microtasks run before the next macrotask.

## Step-by-Step Example

```javascript
console.log("1 — sync");

setTimeout(() => console.log("2 — setTimeout"), 0);

Promise.resolve()
    .then(() => console.log("3 — Promise.then"));

queueMicrotask(() => console.log("4 — queueMicrotask"));

console.log("5 — sync");

// Output:
// 1 — sync              (synchronous)
// 5 — sync              (synchronous)
// 3 — Promise.then      (microtask)
// 4 — queueMicrotask    (microtask)
// 2 — setTimeout        (macrotask — runs after microtask queue is empty)
```

## Why Microtasks First?

```javascript
// This guarantees .then() always runs AFTER the current sync code
const p = Promise.resolve(42);
p.then(v => console.log("then:", v)); // always async — even already-resolved!
console.log("sync");

// Output:
// sync
// then: 42
```

## Async/Await and the Microtask Queue

Every `await` creates a microtask checkpoint:

```javascript
async function asyncFn() {
    console.log("A");             // sync
    await Promise.resolve();      // suspends, schedules resumption as microtask
    console.log("B");             // runs in microtask
}

console.log("1");
asyncFn();
console.log("2");

// Output:
// 1 → A → 2 → B
// "B" is a microtask — runs after "2" (sync) but before any macrotasks
```

## Multiple Awaits — Each Is a Microtask

```javascript
async function chain() {
    await null;              // 1st microtask checkpoint
    console.log("after 1st await");
    await null;              // 2nd microtask checkpoint
    console.log("after 2nd await");
}

chain();
console.log("sync");

// Output:
// sync
// after 1st await    ← 1 microtask later
// after 2nd await    ← 1 more microtask later
```

## Starvation Warning

If you continuously add microtasks, **macrotasks will never run**:

```javascript
function infiniteMicrotasks() {
    Promise.resolve().then(infiniteMicrotasks);
}
infiniteMicrotasks();
// setTimeout callbacks will NEVER run!
// The microtask queue is never empty.
```

## Node.js Event Loop Phases (Extra Detail)

Node.js has additional phases in its event loop:

```
Node.js Event Loop Phases (per iteration):
1. timers         — setTimeout / setInterval callbacks
2. pending I/O    — deferred I/O callbacks
3. idle/prepare   — internal use
4. poll           — fetch new I/O events, execute I/O callbacks
5. check          — setImmediate() callbacks
6. close          — close event callbacks

Between EACH phase → microtask queue is drained
process.nextTick() → runs before other microtasks (highest priority in Node)
```

```javascript
// Node.js priority order:
setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("setTimeout"), 0);
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));

// Output:
// nextTick     ← Node's highest priority microtask
// Promise      ← regular microtask
// setTimeout   ← macrotask (timers phase)
// setImmediate ← macrotask (check phase, after poll)
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Does synchronous code always run first? | Yes — the call stack is always cleared first |
| Which runs first: Promise or setTimeout? | Promise (.then) — it's a microtask |
| When does an async function resume? | As a microtask after the awaited Promise settles |
| Can microtasks block macrotasks? | Yes — infinite microtasks starve macrotasks |
| What is `process.nextTick`? | Node.js only — highest-priority microtask |
## Next Steps

[Back to Chapter 17](17-async-functions.md): Async Functions & `async`/`await`
[Proceed to Chapter 19](19-generators-basics.md): Generator Functions & `yield` to learn about generator functions & `yield`.
