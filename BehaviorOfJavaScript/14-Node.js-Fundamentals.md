# Node.js Fundamentals — Complete Reference

---

## Table of Contents

1. [What is Node.js, V8 Engine, Non-Blocking I/O](#1-what-is-nodejs)
2. [Node.js Architecture: Event-Driven, Single-Threaded Event Loop](#2-architecture)
3. [Module System: CommonJS and ESM](#3-module-system)
4. [Built-in Modules](#4-built-in-modules)
5. [npm Ecosystem](#5-npm)
6. [File System Operations](#6-file-system)
7. [HTTP Server Creation](#7-http-server)
8. [HTTP Client](#8-http-client)
9. [Streams](#9-streams)
10. [Buffer](#10-buffer)
11. [Process and Environment Variables](#11-process)
12. [Child Processes](#12-child-processes)
13. [Cluster Module](#13-cluster)
14. [Worker Threads](#14-worker-threads)
15. [Event Emitter Pattern](#15-event-emitter)
16. [Error Handling in Node.js](#16-error-handling)
17. [Debugging Node.js](#17-debugging)
18. [Node.js REPL](#18-repl)
19. [Global Objects](#19-global-objects)
20. [Timers](#20-timers)
21. [Node.js and npm Ecosystem](#22-npm-ecosystem)
22. [Express.js Basics](#22-expressjs)
23. [REST API Patterns](#23-rest-api)
24. [GraphQL Basics](#24-graphql)
25. [Database Connectivity Basics](#25-database)
26. [Authentication Patterns](#26-authentication)
27. [Environment Configuration](#27-environment)
28. [Logging Patterns](#28-logging)
29. [Deployment Considerations](#29-deployment)
30. [Node.js Version Management (nvm)](#30-nvm)

---

## 1. What is Node.js, V8 Engine, Non-Blocking I/O

### What is Node.js?

Node.js is a JavaScript runtime built on the V8 engine with a **single-threaded event loop** and an **asynchronous, non-blocking I/O model** that can handle many concurrent requests without waiting on slow I/O.

```
Node.js = V8 (JavaScript engine) + libuv (async I/O) + bindings + standard library
```

Node.js is **not** a framework or a library. It is a runtime environment that lets you execute JavaScript on the server side. It gives JavaScript access to the operating system, file system, network sockets, DNS, child processes, and more.

### V8 Engine

V8 is Google's open-source JavaScript engine used in Chrome and Node.js. It compiles JavaScript to native machine code.

**Two-stage compilation:**

1. **Ignition** (Interpreter): Compiles source to compact bytecode and starts executing. Fast to compile, cheap on memory.
2. **TurboFan** (Optimizing Compiler): Ignition collects type feedback as bytecode executes. TurboFan uses this feedback to generate optimized native machine code for hot functions, making assumptions like "this argument is always a number."

**Garbage Collection:**
- **Young generation**: Short-lived allocations, collected frequently with minor GC.
- **Old generation**: Objects that survived several collections, collected less often with major GC.
- Major GC pauses the main thread, visible as event loop lag spikes.

**V8 heap** (default max): roughly 1.5GB on a 64-bit system with 8GB RAM. Configurable with `--max-old-space-size`.

### Non-Blocking I/O

Non-blocking I/O means the main JavaScript thread does not wait for I/O operations (file reads, database queries, network calls) to complete. Instead:

1. Node registers a callback/interest with the OS or thread pool.
2. Returns control to the event loop immediately.
3. When the I/O completes, the callback is queued and executed.

**Blocking vs Non-Blocking:**

```javascript
// BLOCKING — freezes the event loop
const data = fs.readFileSync('/large-file.txt');
console.log(data);

// NON-BLOCKING — event loop continues
fs.readFile('/large-file.txt', (err, data) => {
  console.log(data);
});
console.log('This runs immediately, before file is read');
```

**Key insight:** A server with 10,000 idle WebSockets is, from the CPU's perspective, doing nothing. The process sits in `epoll_wait` consuming zero CPU. This is why Node scales.

---

## 2. Architecture: Event-Driven, Single-Threaded Event Loop

### Single-Threaded Model

Node.js is **single-threaded for JavaScript execution** but **not single-threaded for all tasks**. It uses multiple threads behind the scenes for file I/O, DNS, compression, and crypto via libuv's thread pool.

- **Event loop**: The scheduler for callbacks (single JS thread).
- **Thread pool**: A small set of worker threads (default 4) for operations without non-blocking OS primitives.

### The libuv Event Loop — Six Phases

The event loop is implemented in **libuv**, a C library that handles all async I/O, timers, and cross-platform OS abstractions.

Each iteration processes these phases in order:

```
   ┌───────────────────────────┐
┌─>│        1. Timers          │ ← setTimeout(), setInterval() callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     2. Pending Callbacks  │ ← I/O callbacks deferred from previous iteration
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       3. Idle, Prepare    │ ← Internal libuv use only
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │          4. Poll           │ ← Retrieve new I/O events; execute I/O callbacks
│  └─────────────┬─────────────┘  (epoll on Linux, kqueue on macOS, IOCP on Windows)
│  ┌─────────────┴─────────────┐
│  │         5. Check          │ ← setImmediate() callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │    6. Close Callbacks     │ ← close events (socket.on('close'))
│  └─────────────┬─────────────┘
│                 │
└─────────────────┘ (loop back to timers if handles/requests remain)
```

### Between Every Phase: Microtask Queues

Between every phase transition, and between every callback within a phase, Node drains two microtask queues:

1. **`process.nextTick` queue** (higher priority)
2. **Promise microtask queue** (`.then`, `.catch`, `.finally`, `await` continuations)

```javascript
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
// Output: nextTick, promise
```

**Critical warning:** Recursive `process.nextTick` calls can **starve the event loop** entirely:

```javascript
// DANGER: This blocks the event loop forever
function recursiveNextTick() {
  process.nextTick(recursiveNextTick);
}
recursiveNextTick();
// I/O, timers, and setImmediate never run
```

### The Thread Pool

libuv maintains a thread pool (default: 4 threads, max: 1024) for operations that lack non-blocking OS primitives:

**Uses thread pool:**
- File system calls (`fs.readFile`, `fs.stat`, etc.)
- DNS lookups via `dns.lookup()` (not `dns.resolve()`)
- Crypto operations (`crypto.pbkdf2`, `crypto.scrypt`)
- Zlib compression

**Bypasses thread pool:**
- Network I/O (TCP, UDP, HTTP sockets) — uses OS non-blocking sockets
- DNS resolution via `dns.resolve*()` — uses c-ares library

**Configure size:** `UV_THREADPOOL_SIZE=8 node app.js` (set before first I/O call, cannot be resized after).

### How a Request Flows Through Node.js

```
1. Client sends HTTP request
2. Runtime accepts it, pushes handler callback onto event loop
3. Handler executes on main thread, validates input, starts async DB query
4. DB query is handled outside event loop (thread pool or OS), handler returns
5. Event loop continues processing other requests
6. When query completes, callback is queued
7. Event loop picks up callback, builds response, sends to client
```

---

## 3. Module System: CommonJS and ESM

Node.js has two module systems: **CommonJS** (CJS) and **ECMAScript Modules** (ESM).

### CommonJS (require / module.exports)

CommonJS is the original module system, available since 2009. Synchronous loading.

```javascript
// math.js — exporting
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

module.exports = { add, subtract };
// Or shorthand:
// exports.add = add;
// exports.subtract = subtract;

// app.js — importing
const math = require('./math');
console.log(math.add(2, 3));

// Destructuring import
const { add, subtract } = require('./math');
```

**How require() works (synchronously):**
1. Resolves the module path.
2. If cached, returns `module.exports` from cache.
3. If `.js` file, wraps in a function wrapper and executes.
4. If `.json` file, parses and returns.
5. If native module, returns the built-in module.

**The module wrapper:**
```javascript
(function(exports, require, module, __filename, __dirname) {
  // Your module code runs here
  // Variables are scoped to the module (not global)
});
```

**Key rules:**
- `module.exports` is the actual object returned by `require()`.
- `exports` is a shortcut reference to `module.exports`.
- Reassigning `exports` directly (e.g., `exports = {}`) does NOT change what `require()` returns.
- To export a class or function as the module's main export: `module.exports = MyClass;`
- JSON files: `require('./config.json')` returns parsed object.
- Core modules are imported by name: `require('fs')`, `require('path')`.

### ECMAScript Modules (import / export)

ESM is the standardized module system in JavaScript (ES2015+). Static analysis enables tree-shaking.

```javascript
// utils.js — exporting
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export default class Logger { /* ... */ }

// app.js — importing
import Logger, { add, subtract } from './utils.js';
import * as utils from './utils.js';
```

**Enabling ESM in Node.js:**
- Add `"type": "module"` to `package.json`, OR
- Use `.mjs` file extension.

**ESM vs CommonJS:**

| Feature | CommonJS | ESM |
|---|---|---|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Static (2-phase: resolve, execute) |
| Analysis | Dynamic (runtime) | Static (compile-time, tree-shakable) |
| Circular deps | Works (returns partial) | Works (live bindings) |
| Top-level await | Not supported | Supported |
| `__dirname` / `__filename` | Available | Not available (use `import.meta.url`) |
| File extension | Optional | Required for local files |

**ESM in CommonJS and vice versa:**
```javascript
// ESM can import CommonJS
import pkg from 'my-cjs-package';
const { foo } = pkg;

// CommonJS can require ESM (async, use dynamic import)
const mod = await import('./esm-module.mjs');
```

---

## 4. Built-in Modules

### Core Module Quick Reference

| Module | Purpose | Key APIs |
|---|---|---|
| `fs` | File system operations | readFile, writeFile, readdir, mkdir, unlink, stat, watch |
| `path` | File path utilities | join, resolve, dirname, basename, extname, normalize |
| `http` | HTTP server & client | createServer, request, get |
| `https` | HTTPS client | request, get |
| `url` | URL parsing | URL class, parse, format |
| `os` | Operating system info | platform, cpus, totalmem, homedir, tmpdir |
| `events` | Event emitter | EventEmitter, on, emit, once |
| `stream` | Stream processing | Readable, Writable, Transform, Duplex |
| `crypto` | Cryptography | randomBytes, createHash, createCipheriv |
| `child_process` | Spawn child processes | spawn, exec, fork, execFile |
| `cluster` | Multi-core processing | fork, isPrimary, isWorker |
| `worker_threads` | True parallelism | Worker, parentPort, workerData |
| `net` | TCP/IPC servers | createServer, createConnection |
| `dgram` | UDP communication | createSocket |
| `dns` | DNS resolution | lookup, resolve, resolve4, resolve6 |
| `readline` | Line-by-line input | createInterface, question |
| `util` | Utility functions | promisify, inspect, format, callbackify |
| `querystring` | Query string parsing | parse, stringify, encode, decode |
| `zlib` | Compression | gzip, gunzip, deflate, inflate |
| `assert` | Assertions | strictEqual, deepStrictEqual, ok |
| `buffer` | Binary data | from, alloc, concat, isBuffer |
| `timers` | Timer functions | setTimeout, setInterval, setImmediate |
| `process` | Process info/control | env, argv, exit, cwd, nextTick |
| `console` | Console output | log, error, warn, table, time |
| `perf_hooks` | Performance measurement | performance, monitorEventLoopDelay |
| `async_hooks` | Async context tracking | createHook, AsyncLocalStorage |
| `string_decoder` | Buffer to string | StringDecoder |
| `worker_threads` | Parallel JS execution | Worker, MessageChannel, SharedArrayBuffer |

### fs — File System

```javascript
// Three API styles:
// 1. Promise-based (RECOMMENDED)
import { readFile, writeFile } from 'node:fs/promises';
const data = await readFile('file.txt', 'utf-8');

// 2. Callback-based (legacy)
import { readFile } from 'node:fs';
readFile('file.txt', 'utf-8', (err, data) => { /* ... */ });

// 3. Synchronous (only for startup/CLI)
import { readFileSync } from 'node:fs';
const data = readFileSync('file.txt', 'utf-8');
```

### path — File Path Utilities

```javascript
import path from 'node:path';
path.join('/users', 'docs', 'file.txt');  // '/users/docs/file.txt'
path.resolve('src', 'index.js');          // absolute path from cwd
path.dirname('/users/docs/file.txt');     // '/users/docs'
path.basename('/users/docs/file.txt');    // 'file.txt'
path.extname('file.txt');                 // '.txt'
```

### events — EventEmitter

```javascript
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.on('data', (chunk) => console.log(chunk));
emitter.emit('data', 'hello');
```

---

## 5. npm Ecosystem

### What is npm?

npm (Node Package Manager) is three things in one:
1. A command-line tool for installing packages
2. An online registry (npmjs.com) hosting millions of packages
3. A way to manage project dependencies through `package.json`

### package.json

The heart of every Node.js project:

```json
{
  "name": "my-project",
  "version": "1.2.3",
  "description": "A sample project",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "tsc && vite build",
    "test": "jest --coverage",
    "lint": "eslint src/",
    "pretest": "npm run lint",
    "postbuild": "echo Build complete!"
  },
  "dependencies": {
    "express": "^4.21.0",
    "mongoose": "^7.6.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "eslint": "^8.50.0",
    "nodemon": "^3.0.1",
    "typescript": "^5.6.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### dependencies vs devDependencies

- **`dependencies`**: Packages required in production (Express, React, database drivers). Installed in production with `npm install --production`.
- **`devDependencies`**: Packages only needed for local development and testing (test runners, linters, build tools). Skipped in production.

```bash
npm install express              # Save to dependencies (default)
npm install --save-dev jest      # Save to devDependencies (-D)
```

### Version Ranges

```json
{
  "express": "4.21.0",        // Exact version
  "express": "~4.21.0",       // ~ = Patch-level: >=4.21.0 <4.22.0
  "express": "^4.21.0",       // ^ = Minor-level: >=4.21.0 <5.0.0 (DEFAULT)
  "express": ">=4.18.0",      // Any version 4.18.0+
  "express": "latest"         // Always latest (risky)
}
```

### package-lock.json

Locks exact dependency versions for reproducible installs across machines and CI. **Always commit to version control.**

### node_modules

Directory where npm installs packages. Never commit to git (add to `.gitignore`). Delete and run `npm install` to recreate from lock file.

### npx

Run packages without installing globally:

```bash
npx create-react-app my-app        # One-off scaffolding tool
npx vite@latest my-project         # Run specific version
npx jest --coverage                # Run locally installed binary
npx node@18 script.js              # Run with specific Node version
```

### npm Scripts Lifecycle Hooks

```json
{
  "scripts": {
    "preinstall": "echo 'About to install...'",
    "postinstall": "npm run build",
    "prepublishOnly": "npm test && npm run build"
  }
}
```

### Common npm Commands

```bash
npm install                        # Install all dependencies
npm install <package>              # Add dependency
npm install -D <package>           # Add dev dependency
npm uninstall <package>            # Remove package
npm update                         # Update per version ranges
npm outdated                       # Check for outdated packages
npm audit                          # Security audit
npm audit fix                      # Fix vulnerabilities
npm dedupe                         # Flatten duplicate dependencies
npm ls <package>                   # Show why package was installed
```

---

## 6. File System Operations

### Sync vs Async

| Method | Blocks Event Loop | Error Handling | When to Use |
|---|---|---|---|
| `fs.readFileSync` | Yes | try/catch | CLI one-shot scripts only |
| `fs.readFile` (callback) | No | err-first callback | Legacy code |
| `fs/promises.readFile` | No | try/catch + await | All async server code |

**Rule:** Never use sync methods in request handlers. They block the entire event loop.

### Reading Files

```javascript
import { readFile } from 'node:fs/promises';

// As text
const text = await readFile('readme.md', 'utf-8');

// As Buffer
const buf = await readFile('image.png');

// Handle missing files
async function readFileOrDefault(path, defaultValue) {
  try {
    return await readFile(path, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') return defaultValue;
    throw err;
  }
}
```

### Writing Files

```javascript
import { writeFile } from 'node:fs/promises';

// Create or overwrite
await writeFile('output.txt', 'Hello, World!');

// Write JSON
await writeFile('data.json', JSON.stringify(data, null, 2));

// Atomic write (prevent corruption on crash)
import { rename } from 'node:fs/promises';
async function atomicWrite(filePath, data) {
  const tmpPath = filePath + '.' + process.pid + '.tmp';
  await writeFile(tmpPath, data);
  await rename(tmpPath, filePath);  // rename is atomic on POSIX
}
```

### Directory Operations

```javascript
import { mkdir, readdir, rm, cp } from 'node:fs/promises';
import { join } from 'node:path';

await mkdir('data/backups/2024', { recursive: true });

const entries = await readdir('./src', { withFileTypes: true });
for (const entry of entries) {
  console.log(entry.isDirectory() ? 'DIR' : 'FILE', entry.name);
}

// Recursive directory walk (async generator)
async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkDir(fullPath);
    else yield fullPath;
  }
}

// Remove directory tree
await rm('temp', { recursive: true, force: true });
```

### File Metadata & Watching

```javascript
import { stat, watch, watchFile } from 'node:fs/promises';

const info = await stat('file.txt');
console.log(info.size, info.mtime, info.isDirectory());

// Modern async iterator watch (Node 18+)
const watcher = watch('./src', { recursive: true });
for await (const event of watcher) {
  console.log(`${event.eventType}: ${event.filename}`);
}

// Polling-based file watch
import { watchFile } from 'node:fs';
watchFile('config.json', { interval: 1000 }, (curr, prev) => {
  if (curr.mtime > prev.mtime) console.log('Config modified');
});
```

### Streaming Large Files

```javascript
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

// Always use pipeline() over .pipe() for error handling
await pipeline(
  createReadStream('input.csv'),
  createWriteStream('output.csv')
);
```

---

## 7. HTTP Server Creation

### Basic HTTP Server

```javascript
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

### Understanding Request and Response

- **`req`** (IncomingMessage): A ReadableStream with `method`, `url`, `headers`.
- **`res`** (ServerResponse): A WritableStream with `writeHead()`, `setHeader()`, `write()`, `end()`.

### Reading Request Body

```javascript
const server = http.createServer((req, res) => {
  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    body = Buffer.concat(body).toString();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ body }));
  });
});
```

### Routing with URL Module

```javascript
import http from 'node:http';
import { URL } from 'node:url';

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (method === 'GET' && pathname === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (method === 'POST' && pathname === '/api/users') {
    // Parse body, create user...
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000);
```

### Streaming Responses (Large Files)

```javascript
import http from 'node:http';
import { createReadStream } from 'node:fs';

http.createServer((req, res) => {
  if (req.url === '/video') {
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    createReadStream('video.mp4').pipe(res);
  }
}).listen(3000);
```

### Using pipe for Echo Server

```javascript
// Readable request stream piped directly to Writable response stream
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/echo') {
    req.pipe(res);
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(8080);
```

---

## 8. HTTP Client

### http.request() / http.get()

```javascript
import http from 'node:http';

const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/posts/1',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
});

req.on('error', (err) => console.error(err));
req.end();

// http.get() shorthand (sets method to GET and calls req.end() for you)
http.get('http://example.com', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
```

### https.request()

```javascript
import https from 'node:https';

const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET'
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
```

### fetch() (Global, Node 18+)

Built on Undici as the HTTP client engine. Returns a Web-standard `Response` object.

```javascript
// Simple GET
const res = await fetch('https://api.example.com/data');
const data = await res.json();

// POST with JSON body
const res = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
});

// Error handling — fetch only rejects on network failures
if (!res.ok) {
  throw new Error(`HTTP ${res.status}: ${res.statusText}`);
}

// Streaming
const reader = res.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(value);
}

// AbortController for timeout
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
const res = await fetch('https://api.example.com/slow', {
  signal: controller.signal
});
```

### Client API Comparison

| Client Path | API | Body Handling | Connection Pool |
|---|---|---|---|
| `http.request()` | ClientRequest events/streams | IncomingMessage (Node stream) | http.Agent |
| `http.get()` | Ended GET convenience | IncomingMessage (Node stream) | http.Agent |
| `fetch()` | Web-compatible Promise<Response> | Web stream + Body mixin | Undici dispatcher |
| Undici `request()` | Dispatcher API result | Node stream + Body mixin | Undici dispatcher |

---

## 9. Streams

### What Are Streams?

Streams process data in chunks rather than loading the entire dataset into memory. All streams inherit from EventEmitter.

### Four Stream Types

```javascript
import { Readable, Writable, Duplex, Transform } from 'node:stream';
```

**1. Readable** — Source of data
```javascript
// Examples: fs.createReadStream, http.IncomingMessage, process.stdin
// Two modes: paused (default) and flowing
// Consume with: for await...of (modern), .on('data'), or .pipe()
```

**2. Writable** — Destination for data
```javascript
// Examples: fs.createWriteStream, http.ServerResponse, process.stdout
// Key method: .write(chunk) returns boolean (backpressure signal)
// Key method: .end() signals no more data
```

**3. Duplex** — Both Readable AND Writable (independent sides)
```javascript
// Example: TCP socket (net.Socket)
// Data written in does NOT automatically flow out
```

**4. Transform** — Duplex where output is computed from input
```javascript
// Example: zlib.createGzip(), crypto.createCipher()
// _transform(chunk, encoding, callback) is where processing happens
// this.push(transformed) sends data downstream
```

### Piping and pipeline()

```javascript
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

// ❌ .pipe() — has error handling pitfalls
readStream.pipe(transformStream).pipe(writeStream);

// ✅ pipeline() — handles errors, cleanup, and backpressure automatically
await pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('input.txt.gz')
);
```

### Async Iterators (Modern Pattern)

```javascript
import { createReadStream } from 'node:fs';

// for await...of handles backpressure automatically
const stream = createReadStream('large-file.txt', { encoding: 'utf-8' });
for await (const chunk of stream) {
  console.log(chunk);
}
```

### Backpressure

When a fast Readable is connected to a slow Writable, the Writable's internal buffer fills up. `write()` returns `false` when the buffer exceeds `highWaterMark`. The producer should pause until `'drain'` fires.

```javascript
// Manual backpressure (verbose — use pipeline() instead)
readable.on('data', (chunk) => {
  const ok = writable.write(chunk);
  if (!ok) {
    readable.pause();
    writable.once('drain', () => readable.resume());
  }
});
```

### Creating Custom Transform Streams

```javascript
import { Transform } from 'node:stream';

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Or using class
class CSVParser extends Transform {
  constructor(options) {
    super({ ...options, objectMode: true });
  }
  _transform(chunk, encoding, callback) {
    const rows = chunk.toString().split('\n');
    for (const row of rows) {
      const [name, age] = row.split(',');
      this.push({ name, age: parseInt(age) });
    }
    callback();
  }
  _flush(callback) {
    // Emit any remaining buffered data
    callback();
  }
}
```

---

## 10. Buffer

### What is Buffer?

Buffer objects represent a fixed-length sequence of bytes. They are used for binary data handling — file I/O, network protocols, cryptography, etc.

### Creating Buffers

```javascript
import { Buffer } from 'node:buffer';

// From string
const buf = Buffer.from('hello world', 'utf-8');

// Empty buffer (zero-filled)
const buf = Buffer.alloc(1024);

// Uninitialized buffer (faster, but contains old data)
const buf = Buffer.allocUnsafe(1024);

// From array
const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
```

### Buffer and Encoding

```javascript
const buf = Buffer.from('hello');

buf.toString('utf-8');      // 'hello'
buf.toString('base64');     // 'aGVsbG8='
buf.toString('hex');        // '68656c6c6f'
buf.toString('latin1');     // 'hello'

Buffer.from('aGVsbG8=', 'base64').toString(); // 'hello'
```

**Supported encodings:** `utf8`, `utf16le`, `latin1`, `base64`, `base64url`, `hex`, `ascii`, `binary`, `ucs2`.

### Buffer Operations

```javascript
const buf = Buffer.from('Hello, World!');

buf.length;                    // 13 (bytes)
buf[0];                        // 72 (H in ASCII)
buf.slice(0, 5);               // <Buffer 48 65 6c 6c 6f>
buf.copy(newBuf, 0, 0, 5);    // Copy bytes
Buffer.concat([buf1, buf2]);   // Concatenate buffers
buf.equals(otherBuf);          // Compare buffers
Buffer.isBuffer(obj);          // Check if Buffer
Buffer.byteLength('hello');   // 5 bytes
```

### Use Cases

```javascript
// Reading binary files
const imageBuffer = await fs.readFile('photo.jpg');

// Processing network data
const packet = Buffer.alloc(1024);

// Encoding/decoding
const encoded = Buffer.from('敏感数据').toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
```

---

## 11. Process and Environment Variables

### The process Object

`process` is a global EventEmitter instance providing information about and control over the current Node.js process.

### Environment Variables

```javascript
// Access all environment variables
console.log(process.env);

// Access specific variable
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// Set environment variable
process.env.NODE_ENV = 'production';

// Command-line arguments
console.log(process.argv);
// ['/usr/bin/node', 'script.js', 'arg1', 'arg2']
```

### Process Information

```javascript
process.pid;           // Process ID
process.ppid;          // Parent process ID
process.cwd();         // Current working directory
process.platform;      // 'linux', 'darwin', 'win32'
process.arch;          // 'x64', 'arm64', etc.
process.version;       // 'v22.11.0'
process.versions;      // { node: '...', v8: '...', ... }
process.memoryUsage(); // { rss, heapTotal, heapUsed, external }
process.cpuUsage();    // { user, system } in microseconds
process.uptime();      // Seconds since process start
process.exitCode;      // Exit code (default 0)
```

### Process Events

```javascript
// Emitted when event loop is empty
process.on('beforeExit', (code) => { /* ... */ });

// Emitted when process is about to exit
process.on('exit', (code) => { /* cleanup here, sync only */ });

// Emitted on uncaught synchronous exception
process.on('uncaughtException', (err, origin) => {
  console.error('Uncaught:', err);
  process.exit(1);
});

// Emitted on unhandled Promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled:', reason);
});

// Process signals
process.on('SIGTERM', () => { /* graceful shutdown */ });
process.on('SIGINT', () => { /* ctrl+c */ });
```

### Process Control

```javascript
process.exit(1);              // Force exit with code
process.exitCode = 1;         // Set exit code for graceful exit
process.kill(pid, 'SIGTERM'); // Send signal to another process
process.chdir('/tmp');        // Change directory
process.cwd();                // Print current directory
```

---

## 12. Child Processes

### Overview

The `child_process` module spawns entirely new processes — not threads. The child can run any program: shell commands, Python scripts, compiled binaries.

### spawn, exec, execFile, fork

```javascript
import { spawn, exec, execFile, fork } from 'node:child_process';
```

| Method | Description | Output | Use Case |
|---|---|---|---|
| `spawn()` | Streams stdout/stderr | Streams | Long-running, large output |
| `exec()` | Buffers full output via shell | Buffer (1MB default) | Short commands, small output |
| `execFile()` | Like exec() but no shell | Buffer | Running binary safely |
| `fork()` | spawn() + IPC for Node.js | IPC channel | Parent/child Node messaging |

### spawn() — Streaming Output

```javascript
const child = spawn('ls', ['-la', '/tmp']);

child.stdout.on('data', (data) => console.log(`stdout: ${data}`));
child.stderr.on('data', (data) => console.error(`stderr: ${data}`));
child.on('close', (code) => console.log(`Process exited with code ${code}`));
child.on('error', (err) => console.error('Failed to start:', err));
```

### exec() — Buffered Output

```javascript
exec('ls -la', (error, stdout, stderr) => {
  if (error) { console.error(error); return; }
  console.log(stdout);
});
```

### fork() — Node-to-Node IPC

```javascript
// parent.js
const child = fork('./worker.js');
child.send({ type: 'process', data: [1, 2, 3] });
child.on('message', (msg) => console.log('From child:', msg));

// worker.js
process.on('message', (msg) => {
  const result = msg.data.reduce((a, b) => a + b, 0);
  process.send({ type: 'result', sum: result });
});
```

### Security

```javascript
// ❌ Vulnerable to shell injection
exec('ls ' + userInput);

// ✅ Safe — argument array form
execFile('ls', ['-la', userInput]);
spawn('ls', ['-la', userInput]);
```

---

## 13. Cluster Module

### Overview

`cluster` forks multiple full copies of your process, each on a different CPU core, all sharing the same server port. Built on top of `child_process.fork()`.

### Basic Usage

```javascript
import cluster from 'node:cluster';
import http from 'node:http';
import { cpus } from 'node:os';

if (cluster.isPrimary) {
  const numCPUs = cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart workers that crash
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died (${signal || code}). Restarting...`);
    cluster.fork();
  });
} else {
  // Worker process
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```

### Load Balancing

- **Round-robin** (`cluster.SCHED_RR`): Default on all platforms except Windows. Primary accepts connections and distributes evenly.
- **OS-assigned**: Primary creates socket and sends to workers, who accept directly.

### Key Points

- Workers are separate processes — no shared memory. Use external store (Redis) for shared state.
- Always handle `'exit'` events and check `worker.exitedAfterDisconnect`.
- In production, use PM2 cluster mode or container orchestrators (Kubernetes).

---

## 14. Worker Threads

### Overview

`worker_threads` spawns threads within the same Node.js process. Each thread has its own V8 instance, event loop, and isolated JavaScript heap. True parallelism for CPU-bound work.

### Basic Usage

```javascript
// main.js
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

const worker = new Worker(new URL('./worker.js', import.meta.url), {
  workerData: { input: [1, 2, 3, 4, 5] }
});

worker.on('message', (result) => console.log('Result:', result));
worker.on('error', (err) => console.error('Worker error:', err));
worker.on('exit', (code) => console.log(`Worker exited with code ${code}`));

// worker.js
import { parentPort, workerData } from 'node:worker_threads';

const result = workerData.input.reduce((a, b) => a * b, 1);
parentPort.postMessage(result);
```

### SharedArrayBuffer (True Shared Memory)

```javascript
// Shared memory between threads
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);

// Thread A
sharedArray[0] = 42;

// Thread B (can read immediately)
const value = Atomics.load(sharedArray, 0);  // 42

// Safe concurrent operations
Atomics.add(sharedArray, 0, 1);       // Atomic increment
Atomics.compareExchange(sharedArray, 0, 42, 43);  // CAS
```

### Worker Thread Pool

```javascript
import { Worker } from 'node:worker_threads';

// Use piscina library for production-ready pools
// npm install piscina
import Piscina from 'piscina';

const pool = new Piscina({
  filename: './worker.js',
  maxThreads: 4
});

const result = await pool.run({ data: [1, 2, 3] });
```

### When to Use What

| Concern | Main Thread + Thread Pool | `worker_threads` | `cluster` |
|---|---|---|---|
| Goal | Concurrent I/O | Parallel CPU work | Scale across cores |
| Memory | Shared JS heap | Separate heap; SharedArrayBuffer | Fully separate processes |
| Communication | Direct call | postMessage / MessageChannel | IPC |
| Spawn cost | None (always 4 threads) | ~10-40ms per worker | Higher (full process) |

---

## 15. Event Emitter Pattern

### The Foundation of Node.js

Most of the Node.js core API is built on the **EventEmitter** pattern. Objects that emit events are instances of `EventEmitter`.

```javascript
import { EventEmitter } from 'node:events';

class Server extends EventEmitter {
  start(port) {
    console.log(`Server listening on port ${port}`);
    this.emit('started', port);
  }
}

const server = new Server();

server.on('started', (port) => {
  console.log(`Server is up on port ${port}`);
});

server.start(3000);
```

### Key Methods

```javascript
emitter.on('event', listener)          // Add listener
emitter.once('event', listener)        // Add one-time listener
emitter.off('event', listener)         // Remove listener
emitter.emit('event', ...args)         // Trigger event
emitter.listenerCount('event')         // Count listeners
emitter.eventNames()                   // List event names
emitter.removeAllListeners('event')    // Remove all for event
emitter.prependListener('event', fn)   // Add to beginning of list
```

### Error Events

```javascript
// CRITICAL: Always add an error listener
emitter.on('error', (err) => {
  console.error('Something went wrong:', err.message);
});

// Without error handler, throwing inside emitter crashes the process
emitter.emit('error', new Error('fail'));  // Process crashes if no handler
```

### Async Event Handling

```javascript
import { once } from 'node:events';

// Wait for a specific event (promise-based)
const [value] = await once(emitter, 'data');

// Async iterator
import { on } from 'node:events';
for await (const [data] of on(emitter, 'data')) {
  console.log(data);
}
```

### Common Patterns

```javascript
// Extending EventEmitter
class Database extends EventEmitter {
  async connect() {
    try {
      await doConnect();
      this.emit('connected');
    } catch (err) {
      this.emit('error', err);
    }
  }
}

// Request/response pattern
class RPCClient extends EventEmitter {
  request(method, params) {
    const id = this.nextId++;
    this.pendingRequests.set(id, { resolve, reject });
    this.send({ id, method, params });
  }
  onMessage(msg) {
    const pending = this.pendingRequests.get(msg.id);
    if (pending) {
      pending.resolve(msg.result);
      this.pendingRequests.delete(msg.id);
    }
  }
}
```

---

## 16. Error Handling in Node.js

### Error Types

| Type | Description |
|---|---|
| `Error` | Base error class |
| `TypeError` | Wrong type of argument |
| `RangeError` | Number outside valid range |
| `SyntaxError` | Invalid code syntax |
| `ReferenceError` | Undefined variable reference |
| `URIError` | Invalid URI |
| `EvalError` | eval() error |
| `AggregateError` | Multiple errors bundled |

### Try/Catch

```javascript
try {
  JSON.parse('invalid json');
} catch (err) {
  console.error('Parse error:', err.message);
}

// Async try/catch
try {
  const data = await fs.readFile('config.json', 'utf-8');
  return JSON.parse(data);
} catch (err) {
  if (err.code === 'ENOENT') return defaultConfig;
  if (err instanceof SyntaxError) return defaultConfig;
  throw err; // Re-throw unexpected errors
}
```

### Error Codes

```javascript
// Check error.code rather than error.message (messages change between versions)
try {
  await fs.readFile('missing.txt');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('File not found');
  } else if (err.code === 'EACCES') {
    console.log('Permission denied');
  }
}
```

### Unhandled Rejections and Exceptions

```javascript
// Last resort handler (use sparingly)
process.on('uncaughtException', (err, origin) => {
  console.error('Uncaught Exception:', err);
  // Perform synchronous cleanup
  server.close(() => process.exit(1));
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
```

### Custom Error Classes

```javascript
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(`${field}: ${message}`, 400, 'VALIDATION_ERROR');
    this.field = field;
  }
}
```

### Express Error Handling Pattern

```javascript
// Centralized error handler middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

---

## 17. Debugging Node.js

### --inspect Flag

```bash
node --inspect server.js           # Start with debugger on port 9229
node --inspect-brk server.js       # Break on first line
node --inspect-wait server.js      # Wait for debugger to attach
node --inspect=9222 server.js      # Custom port
```

### Chrome DevTools

1. Start app with `node --inspect server.js`
2. Open `chrome://inspect` in Chrome
3. Click "Open dedicated DevTools for Node"
4. Set breakpoints, inspect variables, step through code

### VS Code Debugging

```jsonc
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Current File",
      "type": "node",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "skipFiles": ["/**", "node_modules/**"]
    },
    {
      "name": "Attach to Process",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true
    }
  ]
}
```

### Debug Logging

```bash
# Enable debug logs for specific modules
DEBUG=express:* node server.js
NODE_DEBUG=http,net node server.js

# Enable source maps for production stack traces
NODE_OPTIONS="--enable-source-maps" node dist/server.js

# Increase memory for large apps
NODE_OPTIONS="--max-old-space-size=4096" node server.js
```

### Console Debugging

```javascript
console.log('basic log');
console.warn('warning');
console.error('error');
console.table([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);
console.time('timer');
// ... code ...
console.timeEnd('timer');  // 125.432ms
console.trace('stack trace');
console.dir(obj, { depth: null, colors: true }); // Deep inspection
```

### Memory Debugging

```javascript
// Heap snapshot from running process
// Send SIGUSR2 to process: kill -USR2 <pid>
// Or programmatically:
const v8 = require('v8');
const fs = require('fs');
const snap = v8.writeHeapSnapshot();
console.log('Snapshot written to:', snap);
```

### Performance Monitoring

```javascript
import { monitorEventLoopDelay } from 'node:perf_hooks';

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  console.log({
    min: histogram.min / 1e6,
    max: histogram.max / 1e6,
    mean: histogram.mean / 1e6,
    p99: histogram.percentile(99) / 1e6
  });
  histogram.reset();
}, 5000);
```

---

## 18. Node.js REPL

### What is REPL?

REPL stands for **Read-Eval-Print Loop**. It provides an interactive JavaScript shell for testing code.

### Starting the REPL

```bash
node                    # Start REPL
node -i                 # Same as above
node --input-type=module  # Start REPL in ESM mode
```

### REPL Features

```bash
$ node
> 1 + 2
3
> const fs = require('fs')
undefined
> fs.readdirSync('.')
[ '.gitignore', 'index.js', 'package.json' ]
> .help
.break    Sometimes you get stuck, getting out is easy with .break
.clear    Resets the REPL context
.editor   Enable editor mode
.exit     Exit the REPL
.load     Load a file into the REPL session
.save     Save all evaluated expressions in this REPL session to a file
$ node
> .load myscript.js   # Load and execute a file
```

### REPL Commands (dot commands)

| Command | Description |
|---|---|
| `.break` | Exit multi-line expression |
| `.clear` | Reset REPL context |
| `.editor` | Enable editor mode |
| `.exit` | Exit the REPL |
| `.help` | Show help |
| `.load <file>` | Load file into session |
| `.save <file>` | Save session to file |

### REPL in Code

```javascript
import repl from 'node:repl';

// Start a REPL programmatically
const r = repl.start('my-app> ');
r.defineCommand('greet', {
  help: 'Greet someone',
  action(name) {
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  }
});
```

---

## 19. Global Objects

### Node.js-Specific Globals

```javascript
process          // Current process (EventEmitter)
console         // Console output
Buffer          // Binary data handling
setTimeout      // Schedule one-time timer
setInterval     // Schedule repeating timer
setImmediate    // Schedule immediate callback
clearTimeout    // Cancel timeout
clearInterval   // Cancel interval
clearImmediate  // Cancel immediate
queueMicrotask  // Queue microtask
URL / URLSearchParams  // Web-standard URL APIs
```

### Module Scope (not truly global)

```javascript
// These exist only within CommonJS module wrapper:
__dirname        // Directory of the current module (CJS only)
__filename       // Full path of the current module (CJS only)
module           // Current module object
exports          // Alias for module.exports
require          // Function to import modules

// In ESM, use:
import.meta.url                    // equivalent of __filename (file:// URL)
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

### process Object

```javascript
process.env          // Environment variables object
process.argv         // Command-line arguments array
process.cwd()        // Current working directory
process.pid          // Process ID
process.version      // Node.js version string
process.platform     // 'linux', 'darwin', 'win32'
process.arch         // 'x64', 'arm64', etc.
process.exit([code]) // Exit process
process.nextTick()   // Schedule microtask
```

### The global Object

```javascript
// In Node.js, the global object is `global` (not `window`)
global.myGlobalVar = 42;
console.log(global.myGlobalVar);

// process, console, Buffer, setTimeout, etc. are all properties of global
```

---

## 20. Timers

### setTimeout and setInterval

```javascript
// One-time timer
const timer = setTimeout(() => {
  console.log('Runs after 1000ms');
}, 1000);

// Repeating timer
const interval = setInterval(() => {
  console.log('Runs every 500ms');
}, 500);

// Cancel
clearTimeout(timer);
clearInterval(interval);

// Timeout is a reference object
timer.ref();     // Keep process alive (default)
timer.unref();   // Allow process to exit even if timer is pending
timer.hasRef();  // Check if ref'd
```

### setImmediate

```javascript
// Runs after I/O callbacks, before timers phase
setImmediate(() => {
  console.log('After I/O');
});

// Returns an Immediate object
const immediate = setImmediate(() => { /* ... */ });
clearImmediate(immediate);
```

### process.nextTick

```javascript
// Runs after current operation completes, before event loop continues
process.nextTick(() => {
  console.log('Next tick');
});

// Higher priority than Promise microtasks
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
// Output: nextTick, promise
```

### setImmediate vs setTimeout(0)

```javascript
// INSIDE I/O callback: setImmediate fires FIRST (deterministic)
const http = require('http');
http.createServer((req, res) => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // Always: immediate, timeout
  res.end();
}).listen(3000);

// OUTSIDE I/O: order is non-deterministic
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// Could be either order
```

### Priority Summary

| Call | Drains In | Priority | Use For |
|---|---|---|---|
| `process.nextTick(fn)` | Microtask queue | Highest | Before any I/O (error emission) |
| `queueMicrotask(fn)` | Promise queue | High | Cross-runtime compatible |
| `setImmediate(fn)` | Check phase | Normal | Yield to I/O after callback |
| `setTimeout(fn, 0)` | Timers phase | Lowest | Almost never needed |

### timers/promises API

```javascript
import { setTimeout as sleep } from 'node:timers/promises';

await sleep(1000);  // Sleep for 1 second

import { setInterval as repeat } from 'node:timers/promises';

for await (const _ of repeat(500)) {
  console.log('runs every 500ms');
}
```

### Timer Accuracy

- Timers specify a **minimum delay threshold**, not a precise schedule.
- OS scheduling and other callbacks can delay them.
- `setInterval` does not adjust for callback execution time (drift is possible).
- Millisecond resolution; sub-millisecond intervals are rounded up.

---

## 22. npm Ecosystem and Package Management

See [Section 5. npm Ecosystem](#5-npm) for comprehensive npm coverage.

### Additional npm Topics

**Workspaces (Monorepos):**
```json
{
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "npm run build --workspaces"
  }
}
```

**npm Config:**
```bash
npm config set registry https://registry.npmjs.org/
npm config get prefix  # Global install location
```

**Security:**
```bash
npm audit                    # Check for vulnerabilities
npm audit fix                # Auto-fix
npm audit fix --force        # Force fix (may break)
```

**Publishing:**
```bash
npm login
npm publish
npm pack                    # Create tarball
npm unpublish <pkg>@<version>
```

---

## 22. Express.js Basics

### What is Express?

Express is the most popular Node.js web framework. It provides a thin layer of features for building web applications and APIs.

```bash
npm install express
```

### Basic Express Server

```javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Routing

```javascript
// HTTP Methods
app.get('/users', (req, res) => { /* GET /users */ });
app.post('/users', (req, res) => { /* POST /users */ });
app.put('/users/:id', (req, res) => { /* PUT /users/:id */ });
app.patch('/users/:id', (req, res) => { /* PATCH /users/:id */ });
app.delete('/users/:id', (req, res) => { /* DELETE /users/:id */ });

// Route parameters
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

// Query strings
app.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page });
});

// Route grouping
const userRouter = express.Router();
userRouter.get('/', listUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
app.use('/api/users', userRouter);
```

### Middleware

```javascript
// Built-in middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// Route-specific middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = verifyToken(token);
  next();
};

app.get('/profile', authenticate, (req, res) => {
  res.json(req.user);
});
```

### Recommended Middleware Order

```javascript
// 1. Security headers
import helmet from 'helmet';
app.use(helmet());

// 2. CORS
import cors from 'cors';
app.use(cors());

// 3. Rate limiting
import rateLimit from 'express-rate-limit';
app.use(rateLimit({ max: 100, windowMs: 15 * 60 * 1000 }));

// 4. Request parsing
app.use(express.json({ limit: '10kb' }));

// 5. Routes
app.use('/api', routes);

// 6. Error handling (must be last, must have 4 params)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.isOperational ? err.message : 'Internal server error'
  });
});
```

### Serving Static Files

```javascript
app.use(express.static('public'));
// Serves files from ./public directory
```

### Template Engines

```javascript
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
```

---

## 23. REST API Patterns

### What is REST?

REST (Representational State Transfer) is an architectural style for designing APIs. Resources are identified by URLs and manipulated via HTTP methods.

### RESTful Conventions

| Method | Endpoint | Action | Status Code |
|---|---|---|---|
| GET | /api/users | List all users | 200 |
| GET | /api/users/:id | Get one user | 200 / 404 |
| POST | /api/users | Create user | 201 |
| PUT | /api/users/:id | Full update | 200 / 404 |
| PATCH | /api/users/:id | Partial update | 200 / 404 |
| DELETE | /api/users/:id | Delete user | 204 / 404 |

### Complete REST API Example

```javascript
import express from 'express';
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET /api/users — List all
app.get('/api/users', (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  let result = users;
  if (search) {
    result = result.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  }
  const start = (page - 1) * limit;
  res.json({
    data: result.slice(start, start + parseInt(limit)),
    total: result.length,
    page: parseInt(page),
    pages: Math.ceil(result.length / limit)
  });
});

// GET /api/users/:id — Get one
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /api/users — Create
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

// PUT /api/users/:id — Full update
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users[index] = { id: users[index].id, ...req.body };
  res.json(users[index]);
});

// DELETE /api/users/:id — Delete
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);
```

### API Best Practices

- Use plural nouns for resources (`/users`, not `/user`)
- Use HTTP status codes correctly (200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error)
- Version your API (`/api/v1/users`)
- Support pagination, filtering, and sorting via query params
- Use consistent error response format: `{ error: { message, code, details } }`
- Rate limit endpoints
- Use HATEOAS links in responses for discoverability

---

## 24. GraphQL Basics

### What is GraphQL?

GraphQL is a query language for APIs and a runtime for executing those queries. Clients request exactly the data they need — no more, no less.

### Schema Definition Language (SDL)

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  deleteUser(id: ID!): Boolean
}

input CreateUserInput {
  name: String!
  email: String!
}
```

### Setting Up Apollo Server

```javascript
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    hello: String
    users: [User!]!
  }
  type User {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo Server!',
    users: () => [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' }
    ]
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server ready at ${url}`);
```

### Resolver Arguments

```javascript
const resolvers = {
  Query: {
    // parent, args, context, info
    user: (_, { id }, context) => {
      return context.db.users.find(u => u.id === id);
    }
  },
  User: {
    // parent = the User object returned by the parent resolver
    posts: (parent, _, context) => {
      return context.db.posts.filter(p => p.authorId === parent.id);
    }
  }
};
```

- **parent**: Object returned from parent resolver
- **args**: Arguments passed in the query
- **context**: Shared across all resolvers for a request (auth, DB, loaders)
- **info**: AST and query metadata (advanced use)

### Solving the N+1 Problem

```javascript
import DataLoader from 'dataloader';

// In context creation:
const loaders = {
  user: new DataLoader(async (ids) => {
    const users = await db.users.findByIds(ids);
    return ids.map(id => users.find(u => u.id === id));
  })
};

// In resolver:
Post: {
  author: (parent, _, { loaders }) => loaders.user.load(parent.authorId);
}
```

### GraphQL vs REST

| Feature | REST | GraphQL |
|---|---|---|
| Endpoints | Multiple endpoints | Single endpoint |
| Data fetching | Server decides structure | Client specifies exactly what it needs |
| Over-fetching | Common | Avoided |
| Under-fetching | Common (multiple calls) | Avoided (nested queries) |
| Caching | HTTP caching built-in | Requires additional setup |
| Schema | Implicit (URL structure) | Explicit (SDL schema) |
| Versioning | /api/v1/, /api/v2/ | Schema evolution (no versions needed) |

---

## 25. Database Connectivity Basics

### MongoDB with Mongoose

```javascript
import mongoose from 'mongoose';

// Connection
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'myapp'
});

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0, max: 150 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Model
const User = mongoose.model('User', userSchema);

// CRUD Operations
const user = await User.create({ name: 'Alice', email: 'alice@example.com' });
const users = await User.find({ role: 'user' }).limit(10).sort({ name: 1 });
const user = await User.findById(id);
await User.findByIdAndUpdate(id, { name: 'Bob' }, { new: true });
await User.findByIdAndDelete(id);
```

### PostgreSQL with Prisma

```javascript
// prisma/schema.prisma
/*
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
generator client {
  provider = "prisma-client-js"
}
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
}
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CRUD with Prisma Client
const user = await prisma.user.create({
  data: { email: 'alice@example.com', name: 'Alice' }
});

const users = await prisma.user.findMany({
  where: { name: { contains: 'Ali' } },
  include: { posts: true },
  orderBy: { createdAt: 'desc' }
});
```

### MongoDB vs PostgreSQL

| Feature | MongoDB | PostgreSQL |
|---|---|---|
| Type | Document (NoSQL) | Relational (SQL) |
| Schema | Flexible, schemaless | Rigid, schema enforced |
| ORM/ODM | Mongoose | Prisma, Sequelize, TypeORM |
| Best for | Rapid prototyping, unstructured data | Complex queries, ACID transactions |
| Scaling | Horizontal (sharding) | Vertical, then read replicas |
| Query language | MongoDB Query API | SQL |

---

## 26. Authentication Patterns

### JWT (JSON Web Tokens) — Most Common in 2026

```javascript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ email, password: hashedPassword });
  const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });
  res.status(201).json({ accessToken, refreshToken });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });
  res.json({ accessToken, refreshToken });
});

// Protect middleware
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};

// Role-based access
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

// Usage
app.delete('/api/users/:id', protect, restrictTo('admin'), deleteUser);
```

### Session/Cookie-Based Auth

```javascript
import session from 'express-session';
import connectMongo from 'connect-mongo';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: connectMongo.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.post('/login', async (req, res) => {
  const user = await authenticate(req.body.email, req.body.password);
  req.session.userId = user._id;
  res.json({ message: 'Logged in' });
});
```

### OAuth (Passport.js)

```javascript
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({ googleId: profile.id, email: profile.emails[0].value });
  }
  done(null, user);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard');
});
```

---

## 27. Environment Configuration

### dotenv

```bash
npm install dotenv
```

```javascript
// At the very top of your entry file
import 'dotenv/config';

// Now access environment variables
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
```

### .env File

```bash
# .env (NEVER commit to git)
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=15m

# .env.production
NODE_ENV=production
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/myapp
```

### Environment-Specific Config

```javascript
// config.js
const config = {
  development: {
    port: 3000,
    dbUrl: 'mongodb://localhost:27017/myapp-dev',
    logLevel: 'debug'
  },
  production: {
    port: process.env.PORT || 8080,
    dbUrl: process.env.DATABASE_URL,
    logLevel: 'info'
  },
  test: {
    port: 3001,
    dbUrl: 'mongodb://localhost:27017/myapp-test',
    logLevel: 'silent'
  }
};

export const env = process.env.NODE_ENV || 'development';
export default config[env];
```

### Config Validation

```javascript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
```

---

## 28. Logging Patterns

### console.log vs Structured Logging

```javascript
// ❌ console.log — unstructured, hard to search
console.log('User created:', user);

// ✅ Structured logging — JSON, searchable, filterable
logger.info({ userId: user.id, email: user.email }, 'User created');
```

### Winston

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

logger.info('Server started', { port: 3000 });
logger.error('Database connection failed', { error: err.message });
```

### Pino (Fastest)

```javascript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty' }
    : undefined
});

// Request logging middleware
app.use((req, res, next) => {
  req.log = logger.child({
    requestId: crypto.randomUUID(),
    method: req.method,
    path: req.path
  });
  next();
});

// Usage
app.get('/api/users', async (req, res) => {
  req.log.info('Fetching users');
  try {
    const users = await db.findMany();
    req.log.info({ count: users.length }, 'Users fetched');
    res.json(users);
  } catch (err) {
    req.log.error({ error: err.message }, 'Failed to fetch users');
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Log Levels

| Level | Use |
|---|---|
| `error` | Errors that need attention |
| `warn` | Potential problems |
| `info` | General application flow |
| `debug` | Detailed diagnostic information |
| `trace` | Very fine-grained details |

---

## 29. Deployment Considerations

### Environment Variables

- Never commit `.env` files to git.
- Use `.env.example` (with placeholder values) as a template.
- Use platform secrets management (AWS Secrets Manager, Vercel env vars, Docker secrets).

### Process Management (PM2)

```bash
npm install -g pm2

# Start application
pm2 start server.js --name "my-app"

# Cluster mode (all CPU cores)
pm2 start server.js -i max --name "my-app"

# List processes
pm2 list

# Monitor
pm2 monit

# Logs
pm2 logs

# Restart
pm2 restart my-app

# Save and resurrect
pm2 save
pm2 startup  # Enable auto-start on boot
```

### Docker

```dockerfile
# Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongo:27017/myapp
    depends_on:
      - mongo
  mongo:
    image: mongo:7
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Security Checklist

```javascript
// Helmet — security headers
import helmet from 'helmet';
app.use(helmet());

// CORS
import cors from 'cors';
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));

// Rate limiting
import rateLimit from 'express-rate-limit';
app.use(rateLimit({ max: 100, windowMs: 15 * 60 * 1000 }));

// Body size limit
app.use(express.json({ limit: '10kb' }));

// Disable X-Powered-By (already done by helmet)
```

### Health Checks

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    db: db.isConnected() ? 'connected' : 'disconnected'
  });
});
```

### Graceful Shutdown

```javascript
const server = app.listen(PORT);

const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  server.close(async () => {
    await db.disconnect();
    console.log('Server closed');
    process.exit(0);
  });
  // Force close after 30s
  setTimeout(() => {
    console.error('Forced shutdown');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

---

## 30. Node.js Version Management (nvm)

### What is nvm?

**nvm** (Node Version Manager) is a POSIX-compliant bash script that manages multiple active Node.js installations. It lets you install, switch between, and set default Node.js versions.

### Installation

```bash
# macOS / Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash

# Verify installation
nvm --version
```

### Basic Commands

| Command | Description |
|---|---|
| `nvm install node` | Install latest Node.js |
| `nvm install --lts` | Install latest LTS version |
| `nvm install 22` | Install Node.js 22 |
| `nvm install 22.11.0` | Install exact version |
| `nvm use 22` | Switch to Node.js 22 |
| `nvm use --lts` | Switch to latest LTS |
| `nvm ls` | List installed versions |
| `nvm ls-remote` | List all available versions |
| `nvm ls-remote --lts` | List available LTS versions |
| `nvm alias default 22` | Set default version |
| `nvm uninstall 20` | Remove a version |
| `nvm which 22` | Show path to Node.js binary |
| `nvm current` | Show currently active version |
| `nvm run 22 script.js` | Run script with specific version |
| `nvm exec 22 npm test` | Execute command with specific version |
| `nvm reinstall-packages-from=current 'lts/*'` | Migrate packages to new version |

### .nvmrc File

Create a `.nvmrc` file at your project root:

```
22
```

```bash
# Now nvm use / nvm install reads this file automatically
nvm use           # Switches to Node 22
nvm install       # Installs Node 22 if missing
```

**Content options:**
```
22              # Major version
22.11.0         # Exact patch version
lts/*           # Latest LTS
lts/jod         # Named LTS line
node            # Latest (Current)
```

### Auto-Switching on cd

```bash
# Add to ~/.zshrc or ~/.bashrc
cdnvm() {
  command cd "$@" || return $?
  nvm_path="$(nvm_find_up .nvmrc | command tr -d '\n')"
  if [[ -s "${nvm_path}/.nvmrc" ]]; then
    nvm use
  fi
}
alias cd='cdnvm'
```

### Pinning Node Version in package.json

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

```bash
# Make it strict
echo "engine-strict=true" >> .npmrc
```

### Alternative Version Managers

| Tool | Speed | Reads .nvmrc | Reads .node-version | Reads package.json |
|---|---|---|---|---|
| **nvm** | Slow (bash) | Yes | No | No |
| **fnm** | Fast (Rust) | Yes | Yes | No |
| **Volta** | Fast (Rust) | No | No | Yes (volta key) |
| **n** | Fast (Node) | No | No | No |

### CI/CD Integration

```yaml
# GitHub Actions
- uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'  # Reads version from .nvmrc
```

### Version Recommendation

- Use **LTS versions** for production applications.
- Pin major versions (e.g., `22`) in `.nvmrc`, not exact patches.
- Always commit `.nvmrc` to version control.
- Use `engines` field in `package.json` for validation.

---

## Quick Reference: Key Differences

### Sync vs Async vs Promises

```javascript
// Synchronous (BLOCKS event loop)
const data = fs.readFileSync('file.txt');

// Callback-based (non-blocking)
fs.readFile('file.txt', (err, data) => {});

// Promise-based (non-blocking, recommended)
const data = await fs.promises.readFile('file.txt', 'utf-8');
```

### Common Patterns Summary

| Pattern | When to Use |
|---|---|
| `process.nextTick()` | Before any I/O (error emission from constructor) |
| `setImmediate()` | Yield to event loop after I/O callback |
| `Promise.all()` | Parallel async operations |
| `Promise.allSettled()` | Parallel, don't fail on individual errors |
| `Promise.race()` | First to complete wins |
| `AbortController` | Cancel fetch / operations |
| `pipeline()` | Connect streams safely |
| `EventEmitter` | Decoupled event-driven communication |
| `worker_threads` | CPU-bound JavaScript |
| `child_process` | External programs / full isolation |

---

## Summary: The One Principle

> **Don't wait. Register interest, go do something else, come back when notified.**

That single idea — applied to sockets, files, timers, child processes, DNS, and Promises — is what makes Node.js scalable. Once you internalize it, the runtime stops being a black box and becomes a small set of predictable mechanisms you can reason about, debug, and tune with confidence.

---

*Last updated: 2026*
