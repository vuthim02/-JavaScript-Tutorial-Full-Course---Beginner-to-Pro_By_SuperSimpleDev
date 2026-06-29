# Event Loop

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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

    // 3. Render (browser) – if needed

    // 4. Pick one macrotask from the macrotask queue
    if (macrotaskQueue.length > 0) {
        processMacrotask();
    }

    // 5. Repeat
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
3. Render UI (browser) – if update pending
           │
           ▼
4. Execute one macrotask (setTimeout, event, I/O)
           │
           ▼
5. Back to step 2
```

## Rule: Never interrupt stack

Only when stack empty.

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

## Q&A

| Question | Answer |
|----------|--------|
| How does event loop decide what to run next? | Checks: Is stack empty? If yes, drain microtasks, then pick one macrotask. |
| Can event loop be blocked? | Yes. If stack never empties (infinite loop), no tasks are processed. |
| Does event loop run at a fixed speed? | No. Runs as fast as stack allows, typically 60+ cycles per second. |
| Relationship to rendering? | Rendering occurs after microtask drain, before next macrotask, not on every cycle. |
## Next Steps

[Back to Chapter 13](13-promise-race-allsettled-any.md): Promise.race(), Promise.allSettled(), Promise.any()
[Proceed to Chapter 15](15-task-queues.md): Task Queues: Macrotask vs Microtask to learn about task queues: macrotask vs microtask.
