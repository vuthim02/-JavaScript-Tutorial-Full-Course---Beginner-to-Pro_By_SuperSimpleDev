# 17 — Web Workers & SharedArrayBuffer

## Why Web Workers

### The Problem

JavaScript in the browser is **single-threaded**:

```javascript
document.querySelector('button').addEventListener('click', () => {
    // Heavy computation
    for (let i = 0; i < 1000000000; i++) {
        // Blocking...
    }
});

// UI is frozen until loop finishes
// No scrolling, no clicking, no animation
```

### The Solution

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: largeArray });

worker.addEventListener('message', (event) => {
    console.log('Result from worker:', event.data);
});

// UI stays responsive during computation
```

```javascript
// worker.js
self.addEventListener('message', (event) => {
    const result = heavyComputation(event.data);
    self.postMessage(result);
});

function heavyComputation(data) {
    // This runs in a separate thread
    return data.map(x => x * 2);
}
```

### What Workers Can/Can't Do

| Can do | Cannot do |
|--------|-----------|
| Compute, loops, math | Access DOM |
| `fetch`, `XMLHttpRequest` | Access `window`, `document` |
| `setTimeout`, `setInterval` | Access `parent` |
| `importScripts()` (classic) | Direct access to main thread variables |
| `postMessage` communication | |

### Use Cases

| Use Case | Example |
|----------|---------|
| Image processing | Canvas pixel manipulation |
| Data compression | gzip/brotli in background |
| Code compilation | Babel/TypeScript in worker |
| AI/ML inference | TensorFlow.js offloading |
| Large data processing | CSV parsing, sorting, filtering |

### Communication Pattern

```
Main Thread                 Worker Thread
    │                           │
    ├── new Worker('file.js')   │
    │                           ├── self.onmessage
    │                           │
    ├── worker.postMessage(data)│
    │                           ├── event.data → process
    │                           ├── self.postMessage(result)
    │                           │
    ├── worker.onmessage        │
    │    ← result               │
    │                           │
    ├── worker.terminate()      │
    │                           │ (worker stops)
```

## SharedArrayBuffer and Atomics

For advanced multi-threaded work where you need shared memory:

```javascript
// main.js
const buffer = new SharedArrayBuffer(1024);
const view = new Int32Array(buffer);
const worker = new Worker('worker.js');

worker.postMessage(buffer);

// Both threads share the same memory
```

```javascript
// worker.js
self.addEventListener('message', (event) => {
    const view = new Int32Array(event.data);
    Atomics.store(view, 0, 42);  // Thread-safe write
    Atomics.notify(view, 0);     // Wake up waiting thread
});
```

### Atomics API

| Function | Purpose |
|----------|---------|
| `Atomics.load(typedArray, index)` | Thread-safe read |
| `Atomics.store(typedArray, index, value)` | Thread-safe write |
| `Atomics.add(typedArray, index, value)` | Thread-safe addition |
| `Atomics.compareExchange(typedArray, index, expected, value)` | CAS operation |
| `Atomics.wait(typedArray, index, value)` | Sleep until value changes |
| `Atomics.notify(typedArray, index, count)` | Wake waiting threads |

This is highly advanced and rarely needed, but available for performance-critical scenarios.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is work CPU-heavy? | Consider Web Worker |
| Is UI blocked? | Move heavy work off main thread |
| Can work be parallelized? | Multiple workers |
| Need shared memory? | SharedArrayBuffer + Atomics |
## Next Steps

[Back to Chapter 16](16-performance-patterns-ii.md): 16 — Performance Patterns II: DOM, Debounce, Throttle, rAF
[Proceed to Chapter 18](18-event-loop.md): 18 — Event Loop: Microtasks vs Macrotasks to learn about 18 — event loop: microtasks vs macrotasks.
