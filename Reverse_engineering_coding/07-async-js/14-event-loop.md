# Event Loop

## The Brain Coordinating Everything

The event loop coordinates the call stack, Web APIs, and task queues.

## Overall Architecture

```
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
│  ┌──────────────────────────────────┐        │
│  │ requestAnimationFrame Queue      │        │
│  │ (runs before render, after       │        │
│  │  microtasks, before macrotask)   │        │
│  └──────────────────────────────────┘        │
└───────────────────────┬─────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────┐
│               Event Loop                    │
│  (coordinates stack + queues)               │
└─────────────────────────────────────────────┘
```

## The Core Algorithm

```text
while (true) {
    // 1. Execute all synchronous code (current task on stack)

    // 2. Drain the microtask queue (entirely)
    while (microtaskQueue.length > 0) {
        processMicrotask();
    }

    // 3. Process requestAnimationFrame callbacks (browser)
    while (rAFQueue.length > 0) {
        processRAF();
    }

    // 4. Render (browser) – if needed

    // 5. Pick one macrotask from the macrotask queue
    if (macrotaskQueue.length > 0) {
        processMacrotask();
    }

    // 6. Repeat
}
```

## Process

```text
1. Execute synchronous code (stack)
           │
           ▼
2. Empty microtask queue (all promises, queueMicrotask)
           │
           ▼
3. Process requestAnimationFrame callbacks
           │
           ▼
4. Render UI (browser) – if update pending
           │
           ▼
5. Execute one macrotask (setTimeout, event, I/O)
           │
           ▼
6. Back to step 2
```

## Rule: Stack must be empty before queued tasks run

No task ever interrupts a running function. The stack must unwind completely before the event loop picks the next task.

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

### Step by Step

| Step | Stack | Microtask Q | Macrotask Q | Console |
|------|-------|-------------|-------------|---------|
| 1 | `log("1")` | [] | [] | `1` |
| 2 | `setTimeout()` → Web API | [] | `[()=>log("2")]` | |
| 3 | `Promise.resolve().then(...)` | `[()=>log("4")]` | `[()=>log("2")]` | |
| 4 | `log("5")` | `[()=>log("4")]` | `[()=>log("2")]` | `5` |
| 5 | stack empty → drain microtasks | | | |
| 6 | `log("4")` runs | [] | `[()=>log("2")]` | `4` |
| 7 | microtask Q empty → pick macrotask | | | |
| 8 | `log("2")` runs | | [] | `2` |
| 9 | microtask from `log("2")`'s Promise | `[()=>log("3")]` | | |
| 10 | drain microtasks: `log("3")` | [] | | `3` |

## Important Nuances

### Microtask Starvation

If a microtask queues another microtask, the macrotask queue never runs:

```javascript
function recurse() {
    Promise.resolve().then(recurse); // microtask queues another microtask
}
recurse();
setTimeout(() => console.log("Never runs!"), 1000); // starved
```

Always ensure microtask chains have a termination condition.

### Node.js Event Loop Differences

Node.js uses a phase-based event loop (not the browser's simple model):

| Phase | What runs here |
|-------|---------------|
| **timers** | `setTimeout`, `setInterval` callbacks |
| **pending callbacks** | I/O callbacks deferred to next iteration |
| **idle, prepare** | Internal use |
| **poll** | Retrieve new I/O events (blocks if nothing pending) |
| **check** | `setImmediate` callbacks |
| **close callbacks** | `socket.on('close', ...)` |

`process.nextTick()` is not part of the phase loop — it interrupts the current phase and runs before any other microtask.

### `async/await` and the Event Loop

When you `await` a Promise, the rest of the function is queued as a **microtask**:

```javascript
async function example() {
    console.log("A");
    await Promise.resolve();
    console.log("B"); // runs as microtask after sync code
}
example();
console.log("C");
// Output: A C B
```

This is why `await` never blocks the event loop — it yields control and resumes as a microtask.

## Q&A

| Question | Answer |
|----------|--------|
| How does event loop decide what to run next? | Checks: Is stack empty? If yes, drain microtasks, then pick one macrotask. |
| Can event loop be blocked? | Yes. If stack never empties (infinite loop), no tasks are processed. |
| Does event loop run at a fixed speed? | No. Runs as fast as stack allows, typically 60+ cycles per second. |
| Relationship to rendering? | Rendering occurs after microtask drain, before next macrotask, not on every cycle. |
| Where does `requestAnimationFrame` fit? | After microtasks, before render, before next macrotask |
| What queue does `await` use? | Microtask queue — the resumed code runs after sync code clears |
| How does Node.js event loop differ? | Phase-based: timers → I/O → poll → check → close |
| Can microtasks starve macrotasks? | Yes — recursive Promise resolution can block timers/I/O indefinitely |
| What is `process.nextTick`? | Node.js — runs before other microtasks, interrupts current phase |
## Next Steps
[Can visit in this video](https://youtu.be/eiC58R16hb8?si=598PZUxWg4gGOoHa)

[Back to Chapter 13](13-promise-race-allsettled-any.md): Promise.race(), Promise.allSettled(), Promise.any()
[Proceed to Chapter 15](15-task-queues.md): Task Queues: Macrotask vs Microtask to learn about task queues: macrotask vs microtask.
