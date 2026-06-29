# Web Workers

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Running Code in Background Threads

JavaScript is single-threaded — long computations block the UI. Web Workers run scripts in a separate thread.

```javascript
// main.js
const worker = new Worker("worker.js");

worker.postMessage({ type: "compute", data: [1, 2, 3, 4, 5] });

worker.onmessage = (e) => {
    console.log("Result:", e.data);  // Received from worker
};

worker.onerror = (e) => {
    console.error("Worker error:", e.message);
};
```

```javascript
// worker.js
self.onmessage = (e) => {
    const { type, data } = e.data;

    if (type === "compute") {
        const result = data.map(x => x * 2);  // Heavy computation
        self.postMessage(result);
    }
};

// self refers to the worker's global scope (not window)
```

## What Workers Can and Cannot Do

```
Can do:
  - JavaScript computations
  - fetch() / XMLHttpRequest
  - setTimeout / setInterval
  - importScripts() (legacy)
  - ES Modules (with type: "module")
  - WebAssembly
  - IndexedDB
  - Web Crypto API
  - Web Locks API

Cannot do:
  - DOM manipulation (no document, no window)
  - Access to window, document, parent
  - Canvas (but can transfer OffscreenCanvas)
  - Local storage / session storage
  - Alert / confirm / prompt
```

## Worker Lifecycle

```
main.js: new Worker("worker.js")  →  Worker starts
                │
worker.js: self.onmessage = handler
                │
main.js: worker.postMessage(data)  →  message event in worker
                │
worker.js: self.postMessage(result)  →  message event in main
                │
main.js: worker.terminate()  →  Worker stops immediately
```

## Transferable Objects (Zero-Copy)

For large data (ArrayBuffer), transfer ownership instead of copying:

```javascript
const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB

// Without transfer: COPY (slow)
worker.postMessage({ data: buffer });

// With transfer: MOVE (instant) — main thread loses access
worker.postMessage({ data: buffer }, [buffer]);
console.log(buffer.byteLength); // 0 — transferred away!
```

## SharedWorkers (Shared Between Tabs)

```javascript
// main.js
const worker = new SharedWorker("shared-worker.js");
worker.port.postMessage("Hello from tab 1");
worker.port.onmessage = (e) => console.log("Received:", e.data);

// shared-worker.js
self.onconnect = (e) => {
    const port = e.ports[0];
    port.onmessage = (e) => {
        port.postMessage(`Echo: ${e.data}`);
    };
};
```

## Error Handling

```javascript
// main.js
worker.onerror = (event) => {
    console.error("Worker error:", event.message, event.filename, event.lineno);
    event.preventDefault();  // Prevent default error handling
};

// Inside worker
self.onerror = (event) => {
    console.error("Error in worker:", event.message);
};
```

## Terminating Workers

```javascript
// Main thread terminates worker
worker.terminate();

// Worker self-terminates
self.close();
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is heavy computation blocking the UI? | Check if there's a long-running synchronous loop. Should use a Worker. |
| Is a Worker used? | Look for `new Worker("...")` or `new SharedWorker("...")`. |
| What runs in the Worker? | Check the worker file — it contains the background logic. |
| How does main thread communicate? | `worker.postMessage()` and `worker.onmessage`. |
| Is data being copied or transferred? | Check `postMessage` second argument for transferable objects. |
## Next Steps

[Back to Chapter 34](34-resizeobserver.md): ResizeObserver
[Proceed to Chapter 36](36-service-workers.md): Service Workers to learn about service workers.
