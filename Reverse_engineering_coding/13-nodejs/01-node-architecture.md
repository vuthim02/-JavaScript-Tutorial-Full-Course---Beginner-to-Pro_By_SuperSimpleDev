# Node.js Architecture — V8 + libuv + Node APIs

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Overview

JavaScript originally lived in browsers. With Node.js, it became capable of building web servers, APIs, databases, CLIs, dev tools, build tools, desktop apps, AI systems, streaming platforms, and microservices.

```
Application Code → Node APIs (fs, http, crypto…) → V8 Engine (JS execution, GC) → libuv (Event Loop, Thread Pool, I/O) → OS Kernel → CPU / Disk / Network
```

Node has three main layers:

```
┌──────────────────────────┐
│     Node APIs (JS)       │  fs, http, crypto, path, stream...
├──────────────────────────┤
│     V8 Engine            │  Parsing, JIT, GC, execution
├──────────────────────────┤
│     libuv                │  Event loop, thread pool, async I/O
├──────────────────────────┤
│     OS (Linux/macOS/Win) │
└──────────────────────────┘
```

---

## V8 — JavaScript Engine

| Responsibility | Detail |
|---------------|--------|
| **Parsing** | Converts source code to AST |
| **Compiling** | JIT-compiles hot functions via TurboFan |
| **Executing** | Runs bytecode and machine code |
| **Garbage Collection** | Manages heap memory (generational mark-sweep) |
| **Optimization** | Hidden classes, inline caching, deoptimization |

V8 has no concept of files, networks, or timers. It only runs JavaScript.

```javascript
let x = 10;  // V8 parses, compiles, executes this
```

**Limits**: Heap young ~1-8 MB, old ~1.4 GB (64-bit), stack ~984 KB per thread.

```bash
node --max-old-space-size=4096 app.js   # 4 GB heap
node --stack-size=2000 app.js           # 2 MB stack
```

| Q | A |
|---|----|
| Is operation handled by V8? | Pure JS computation → V8 |
| Is operation handled by libuv? | I/O, timers, networking → libuv |
| Can V8 access the file system? | No — that goes through libuv |
| Can V8 make network requests? | No — libuv handles that |

---

## libuv — Async I/O Library

The C library that gives Node.js its asynchronous capabilities. Originally written for Node, now used by Luvit, Julia, etc.

### What libuv Provides

| Feature | Explanation |
|---------|-------------|
| **Event Loop** | Core loop dispatching callbacks |
| **Thread Pool** | 4 threads (default) for blocking ops |
| **File I/O** | `fs` operations delegated here |
| **DNS** | `dns.lookup()` uses thread pool |
| **Timers** | `setTimeout`, `setInterval` |
| **TCP/UDP** | `net` module networking |
| **Signal handling** | `SIGINT`, `SIGTERM`, etc. |
| **Child process** | `spawn`, `exec`, `fork` |

```javascript
const fs = require('fs');
fs.readFile('/big/file.txt', (err, data) => {
    console.log('Done');
}); // Handled by libuv thread pool, V8 continues executing
```

### Thread Pool Internals

```
┌──────────┐
│ V8 (main)│  ← JS executes here
└────┬─────┘
     │  File read request
     ▼
┌──────────┐
│  libuv   │──► Thread Pool (4 threads) → Read disk / DNS / Crypto
│          │──► Callback queued → Event Loop
└──────────┘
```

```javascript
process.env.UV_THREADPOOL_SIZE = 8; // Default 4, max 1024
```

| Q | A |
|---|----|
| Which operations use thread pool? | `fs`, `dns.lookup()`, `crypto.pbkdf2`, `crypto.randomBytes` |
| Is async always thread pool? | No — network I/O uses OS async (epoll/kqueue) |
| How many threads? | Default 4, configurable via `UV_THREADPOOL_SIZE` |
| Pool saturated? | Operations queue up, wait for free thread |

---

## Node APIs — Bridging JS to Native

```javascript
const fs = require('fs');
fs.readFile('file.txt', callback);
// JS call → C++ binding → libuv → OS syscall → callback on Event Loop
```

### Core Modules

`fs`, `http`/`https`, `path`, `os`, `crypto`, `stream`, `buffer`, `child_process`, `cluster`, `worker_threads`, `net`, `tls`, `dns`, `events`

### Internal Module Structure

```
┌─────────────────────────┐
│ JavaScript API          │  fs.readFile(path, callback)
├─────────────────────────┤
│ C++ Binding             │  node::fs::Open()
├─────────────────────────┤
│ libuv Request           │  uv_fs_open()
├─────────────────────────┤
│ System Call             │  open() syscall
└─────────────────────────┘
```

| Q | A |
|---|----|
| Which module handles this? | Each concern maps to one module |
| What does the C++ binding do? | Bridges JS to native code |
| How deep is the call stack? | JS → C++ → libuv → OS syscall |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-event-loop-phases.md): Event Loop — The Six Phases to learn about event loop — the six phases.
