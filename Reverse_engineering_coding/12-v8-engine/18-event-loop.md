# 18 — Event Loop: Microtasks vs Macrotasks

## Microtask vs Macrotask Priorities

### The Problem: Starvation

```javascript
function floodMicrotasks() {
    Promise.resolve().then(() => {
        // This microtask schedules another...
        floodMicrotasks();
    });
}

floodMicrotasks();

setTimeout(() => {
    console.log('This never runs'); // Starved by microtasks
}, 1000);
```

Microtasks have higher priority than macrotasks. The event loop processes **all** microtasks before moving to the next macrotask.

## Execution Order

```
1. Execute one macrotask (e.g., setTimeout callback)
2. Process ALL microtasks (Promise.then, queueMicrotask, MutationObserver)
3. Render (if needed)
4. Execute next macrotask
```

### Starvation Path

```
Macrotask (click handler)
  └── Microtask 1
        └── Microtask 2 (scheduled by 1)
              └── Microtask 3 (scheduled by 2)
                    └── ... infinite loop of microtasks
                            └── setTimeout callback NEVER RUNS
```

## Task Categories

| Type | Examples | Priority |
|------|----------|----------|
| **Macrotasks** | `setTimeout`, `setInterval`, I/O, UI events, `postMessage` | Lower |
| **Microtasks** | `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver` | Higher |
| **Rendering** | Style recalc, layout, paint | After microtasks |

## Avoid Microtask Starvation

```javascript
function safeRecursiveTask() {
    // Use macrotask to avoid starving other tasks
    setTimeout(() => {
        // Do work
        safeRecursiveTask(); // Schedule next iteration as macrotask
    }, 0);
}
```

## Virtual Stacks and the Event Loop

JavaScript's event loop enables **cooperative concurrency**:

```
Call Stack              Web APIs (Browser/Node)
┌──────────┐          ┌───────────────────┐
│ callback() │          │ setTimeout(fn, N) │
│ task()     │          │ fetch(url)        │
│ main()     │          │ click handler     │
└──────────┘          └───────────────────┘
     │                        │
     │ (stack empty)          │ (when ready)
     ▼                        ▼
┌──────────────────────────────────┐
│        Event Loop                 │
│  ┌─────────┐  ┌───────────┐    │
│  │ Micro   │  │ Macrotask │    │
│  │ Queue   │  │ Queue     │    │
│  │ ┌─────┐ │  │ ┌───────┐ │    │
│  │ │ .then│ │  │ │setTime│ │    │
│  │ └─────┘ │  │ └───────┘ │    │
│  └─────────┘  └───────────┘    │
└──────────────────────────────────┘
```

### Event Loop Processing Rules

1. Select next macrotask from the macrotask queue.
2. Execute it (runs to completion).
3. Drain the microtask queue (execute all until empty).
4. Perform rendering (if needed).
5. Repeat.

## Measuring Event Loop Lag

```javascript
function measureLag() {
    const start = Date.now();

    setTimeout(() => {
        const lag = Date.now() - start - 1000; // expected delay
        console.log(`Event loop lag: ${lag}ms`);

        if (lag > 50) {
            console.warn('Event loop is congested!');
        }

        measureLag(); // Measure again
    }, 1000);
}

measureLag();
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Could microtasks starve macrotasks? | Check for recursive Promise chains |
| Is rendering delayed? | Check microtask load |
| How to yield to event loop? | `setTimeout(..., 0)` or `queueMicrotask` with limits |
| What is the execution order? | Macrotask → All microtasks → Render → Next macrotask |
## Next Steps

[Back to Chapter 17](17-web-workers.md): 17 — Web Workers & SharedArrayBuffer
[Proceed to Chapter 19](19-profiling.md): 19 — Profiling & Bottleneck Identification to learn about 19 — profiling & bottleneck identification.
