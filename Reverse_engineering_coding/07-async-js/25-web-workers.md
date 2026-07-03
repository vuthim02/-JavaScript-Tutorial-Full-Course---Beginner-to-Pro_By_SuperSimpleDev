# Web Workers — True Parallelism

## What Are Web Workers?

Web Workers allow JavaScript to run in **separate threads** — true parallel execution, not just concurrency.

```javascript
// main.js
const worker = new Worker("worker.js");
worker.postMessage("Hello from main");
worker.onmessage = (event) => {
    console.log("Main received:", event.data);
};
```

```javascript
// worker.js
self.onmessage = (event) => {
    console.log("Worker received:", event.data);
    self.postMessage("Hello from worker");
};
```

## Why Workers?

JavaScript is single-threaded. Heavy computation blocks the UI. Workers solve this:

```javascript
// BLOCKING — freezes UI for 5 seconds
function heavyComputation() {
    const start = Date.now();
    while (Date.now() - start < 5000) {}
}
heavyComputation(); // UI frozen

// NON-BLOCKING with Worker
const worker = new Worker("heavy.js");
worker.postMessage(data);
worker.onmessage = (e) => {
    console.log("Result:", e.data);
};
// UI stays responsive
```

## Worker Limitations

| Can Do | Cannot Do |
|--------|-----------|
| `postMessage` (send data) | Access `document` / DOM |
| `fetch`, `XMLHttpRequest` | Access `window`, `parent` |
| `setTimeout`, `setInterval` | Access `localStorage` |
| `importScripts()` (load scripts) | Access `document.cookies` |
| `WebAssembly` | Directly manipulate page |
| `IndexedDB` | Access parent scope variables |

## Transferable Objects (Zero-Copy)

For large data, use **transferable objects** — ownership moves, no copy overhead.

```javascript
// main.js
const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB

console.log(buffer.byteLength); // 104857600

worker.postMessage(buffer, [buffer]); // Transfer ownership

console.log(buffer.byteLength); // 0 — ownership transferred!
```

### Without Transfer (Copy)

```javascript
// The ENTIRE 100MB is cloned/structure-copied
worker.postMessage({ data: largeArray });
```

### With Transfer (Zero-Copy)

```javascript
worker.postMessage(largeArray.buffer, [largeArray.buffer]);
// Only the reference is moved. O(1) transfer.
```

## SharedArrayBuffer

For even more advanced shared memory between threads:

```javascript
// Both main and worker can read/write the same buffer
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);
```

**Note:** Requires `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers.

## Worker Types

### Dedicated Worker

One main-thread script per worker. Most common.

```javascript
const worker = new Worker("worker.js");
```

### Shared Worker

Shared across multiple tabs/iframes of the same origin.

```javascript
const sharedWorker = new SharedWorker("shared-worker.js");
sharedWorker.port.postMessage("Hello");
```

### Service Worker

Acts as a network proxy — enables offline support, caching, push notifications.

```javascript
// Registered in main thread
navigator.serviceWorker.register("/sw.js");
```

## Error Handling in Workers

```javascript
// main.js
worker.onerror = (event) => {
    console.error("Worker error:", event.message);
    console.error("Source:", event.filename, "Line:", event.lineno);
};

// Worker can also throw
self.postMessage = function() { throw new Error("Oops"); };
self.onerror = (event) => {
    console.error("Error in worker:", event.message);
};
```

## Terminating Workers

```javascript
const worker = new Worker("worker.js");

// Start work
worker.postMessage(data);

// Cancel
worker.terminate(); // Immediately kills the worker thread
```

## Use Cases

| Use Case | Description |
|----------|-------------|
| Image/video processing | Pixel manipulation off main thread |
| Data compression | Compress large files without freezing UI |
| WebGL compute | Offload shader compilation |
| Real-time data parsing | Parse streams/binary data |
| Code validation | Run user-submitted code safely |
| Large dataset filtering | Filter/search thousands of records |

## Q&A

| Question | Answer |
|----------|--------|
| Is JS truly parallel with workers? | Yes — separate OS thread, separate V8 instance |
| Can workers access DOM? | No. DOM is main-thread only |
| How do workers and main thread communicate? | `postMessage()` / `onmessage` — structured clone algorithm |
| What gets cloned in postMessage? | Everything that's structured-cloneable (objects, arrays, Map, Set, Date, RegExp) |
| How to avoid copying large data? | Use Transferable objects (ArrayBuffer, MessagePort, ImageBitmap) |
| Are workers expensive? | Each worker: ~5-10MB memory, separate V8 instance. Don't create hundreds |
| What about Node.js? | Use `worker_threads` module — similar API |
## Next Steps

[Back to Chapter 24](24-request-animation-frame.md): requestAnimationFrame
[Proceed to Chapter 26](26-generators-async-iteration.md): Generators & Async Iteration to learn about generators & async iteration.
