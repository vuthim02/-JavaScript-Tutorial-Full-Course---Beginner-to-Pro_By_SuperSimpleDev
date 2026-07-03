# Web APIs and Node APIs

## What Web APIs Provide

The browser provides APIs that run **outside** the JavaScript engine:

```
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

## Node.js Provides

```
File System (fs)     → Read/write files
HTTP / HTTPS         → Network servers and clients
TCP / UDP (net)      → Socket programming
Process              → Environment, argv, exit
Timers               → setTimeout, setInterval, setImmediate
Streams              → Streaming data
Child Processes      → Spawn system processes
Crypto               → Hashing, encryption
```

## How Web APIs Interact with JS
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1675507275018/ae02135a-6824-4028-9aa8-11d14491db0a.gif" alt="Even loop" width="600px" hieght="300px">

```
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

## Code Example: Web API in Action

```javascript
// This demonstrates Web API interaction
console.log("Start");

// setTimeout is a Web API, not JS
setTimeout(() => {
    console.log("Timeout callback");
}, 0);

// fetch is a Web API, not JS
fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log("Fetched data:", data));

console.log("End");
// Output order: Start, End, Timeout callback, Fetched data...
```

The JavaScript engine delegates these operations to the environment and continues immediately.

## Q&A

| Question | Answer |
|----------|--------|
| Is `setTimeout` part of JavaScript? | No — defined in the HTML spec (Web API), not ECMAScript. `fetch` is a Web API. `fs` is Node.js. |
| How to tell if code depends on a specific runtime? | Look for `document`, `window`, `process`, `require('fs')` — these are environment specific. |
| Can you polyfill a Web API? | Yes. You can implement `setTimeout` using other primitives (e.g., MessageChannel). |
| What happens when a Web API completes? | It places the callback into the appropriate task queue (microtask or macrotask). |
| Are Web APIs single-threaded? | No. The browser manages them in background threads. JavaScript is single-threaded, but the APIs are not. |
## Next Steps

[Back to Chapter 2](02-call-stack.md): The Call Stack
[Proceed to Chapter 4](04-set-timeout.md): setTimeout to learn about settimeout.
