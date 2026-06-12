# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 13 — Node.js Ecosystem, Runtime Internals, Streams, Buffers, Processes, Networking, and Server Engineering

---

# Mission

JavaScript originally lived inside browsers.

But with Node.js, JavaScript became capable of building:

- Web servers
- APIs
- Databases
- CLIs
- Dev tools
- Build tools
- Desktop applications
- AI systems
- Streaming platforms
- Microservices

---

# Overall Architecture

```
Application Code
        ↓
Node APIs (fs, http, crypto, etc.)
        ↓
V8 Engine (JS execution, GC)
        ↓
libuv (Event Loop, Thread Pool, I/O)
        ↓
OS Kernel
        ↓
CPU / Disk / Network
```

Node is composed of three main layers:

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

# PART I — NODE.JS RUNTIME COMPONENTS

---

# Chapter 1 — V8

## Role in Node

V8 is the JavaScript engine inside Node.js. It handles:

| Responsibility | Detail |
|---------------|--------|
| **Parsing** | Converts source code to AST |
| **Compiling** | JIT-compiles hot functions via TurboFan |
| **Executing** | Runs bytecode and machine code |
| **Garbage Collection** | Manages heap memory (generational mark-sweep) |
| **Optimization** | Hidden classes, inline caching, deoptimization |

```javascript
let x = 10;  // V8 parses, compiles, executes this
```

V8 has no concept of files, networks, or timers. It only runs JavaScript.

## V8 Limits

| Resource | Default Limit |
|----------|---------------|
| Heap size (young) | ~1-8 MB |
| Heap size (old) | ~1.4 GB (64-bit) |
| Stack size | ~984 KB per thread |

Configurable via flags:

```bash
node --max-old-space-size=4096 app.js   # 4 GB heap
node --stack-size=2000 app.js           # 2 MB stack
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is operation handled by V8? | Pure JS computation → V8 |
| Is operation handled by libuv? | I/O, timers, networking → libuv |
| Can V8 access the file system? | No — that goes through libuv |
| Can V8 make network requests? | No — libuv handles that |

---

# Chapter 2 — libuv

## The Heart of Node's Asynchrony

libuv is the C library that gives Node.js its asynchronous capabilities. Originally written for Node, now used by other projects (Luvit, Julia).

## What libuv Provides

| Feature | Explanation |
|---------|-------------|
| **Event Loop** | Core loop that dispatches callbacks |
| **Thread Pool** | 4 threads (default) for blocking operations |
| **File I/O** | `fs` operations are delegated here |
| **DNS** | `dns.lookup()` uses thread pool |
| **Timers** | `setTimeout`, `setInterval` |
| **TCP/UDP** | `net` module networking |
| **Signal handling** | `SIGINT`, `SIGTERM`, etc. |
| **Child process** | `spawn`, `exec`, `fork` |

```javascript
const fs = require('fs');

// This operation does NOT execute in V8
// It's handled by libuv's thread pool
fs.readFile('/big/file.txt', (err, data) => {
    console.log('Done');
});
// Meanwhile, V8 continues executing other code
```

## Thread Pool Internals

```
┌──────────┐
│ V8 (main)│  ← JavaScript executes here
└────┬─────┘
     │  File read request
     ▼
┌──────────┐
│  libuv   │
│ ┌────────┐
│ │ Thread │──► Read file from disk
│ │ Pool   │──► DNS lookup
│ │ (4)    │──► Crypto operation
│ └────────┘
│     │
│     ▼  Callback queued
│  Event Loop
└──────────┘
```

## Configuring Thread Pool

```javascript
// Increase thread pool size
process.env.UV_THREADPOOL_SIZE = 8;
```

Default is 4. Max is 1024 (but rarely useful beyond ~8).

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which operations use thread pool? | `fs`, `dns.lookup()`, `crypto.pbkdf2`, `crypto.randomBytes` |
| Is async always thread pool? | No — network I/O uses OS async (epoll/kqueue), not thread pool |
| How many threads available? | Default 4, configurable via `UV_THREADPOOL_SIZE` |
| What happens if thread pool is saturated? | Operations queue up, wait for free thread |

---

# Chapter 3 — Node APIs

## Architecture

When you call a Node API:

```javascript
const fs = require('fs');
fs.readFile('file.txt', callback);
```

The flow is:

```
JavaScript call (fs.readFile)
       ↓
Node.js C++ binding (fs binding)
       ↓
libuv thread pool request
       ↓
OS system call (read from disk)
       ↓
Callback queued on Event Loop
       ↓
JavaScript callback executes
```

## Core Modules

| Module | Purpose |
|--------|---------|
| `fs` | File system operations |
| `http` / `https` | HTTP servers and clients |
| `path` | File path manipulation |
| `os` | Operating system info |
| `crypto` | Cryptographic operations |
| `stream` | Streaming data interface |
| `buffer` | Binary data handling |
| `child_process` | Spawn external programs |
| `cluster` | Multi-core server scaling |
| `worker_threads` | True multi-threading |
| `net` | TCP networking |
| `tls` | TLS/SSL encryption |
| `dns` | DNS resolution |
| `events` | Event emitter pattern |

## Internal Structure of a Node Module

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which module handles this? | Each concern maps to one module |
| What does the C++ binding do? | Bridges JS to native code |
| How deep does the call stack go? | JS → C++ → libuv → OS syscall |

---

# PART II — MODULE SYSTEM

---

# Chapter 4 — CommonJS (CJS)

## How require Works

```javascript
// greet.js
const greeting = 'Hello World';
module.exports = greeting;

// app.js
const greet = require('./greet.js');
console.log(greet); // 'Hello World'
```

## require() Internals

When `require('./greet.js')` is called, Node performs these steps:

```
1. Resolve path
   - Check if relative path ✓ → './greet.js'
   - Check core module → 'fs', 'http'
   - Check node_modules
   - Try extensions: .js, .json, .node

2. Load file content
   - Read file from disk (via libuv thread pool)

3. Wrap in IIFE
   (function(exports, require, module, __filename, __dirname) {
       // file content here
   });

4. Execute
   - Run the wrapped function
   - module.exports is what gets returned

5. Cache
   - Store in require.cache['./greet.js']
   - Subsequent require() calls return cached version
```

## The Wrapper Function

Node wraps every module in a function:

```javascript
// What you write:
const x = 10;

// What Node executes:
(function(exports, require, module, __filename, __dirname) {
    const x = 10;
});
```

This is why `__dirname` and `__filename` exist even though they're not declared.

## Caching

```javascript
// module.js
console.log('Will this run twice?');
module.exports = { data: 'important' };

// app.js
const a = require('./module'); // Prints: 'Will this run twice?'
const b = require('./module'); // NOTHING printed — cached
console.log(a === b); // true (same object)
```

## Clearing Cache

```javascript
delete require.cache[require.resolve('./module.js')];
// Forces re-execution on next require()
```

## module.exports vs exports

```javascript
// This works:
exports.foo = 'bar';

// This does NOT work:
exports = { foo: 'bar' }; // Reassigns exports, not module.exports

// This works:
module.exports = { foo: 'bar' }; // Proper way
```

Because `exports` is just a reference to `module.exports`. Reassigning it breaks the connection.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is file executed twice? | No — `require()` caches after first execution |
| What is wrapped around module? | IIFE with `exports`, `require`, `module`, `__filename`, `__dirname` |
| Why does `exports = {}` not work? | It detaches from `module.exports` |
| Can cache be cleared? | Yes, with `delete require.cache[...]` |

---

# Chapter 5 — ES Modules (ESM)

## Syntax

```javascript
// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14159;
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add, PI } from './math.js';
```

## How Node Decides

| package.json field | Module system |
|-------------------|---------------|
| `"type": "commonjs"` or no field | CommonJS (`.js` files) |
| `"type": "module"` | ESM (`.js` files) |

Or use explicit extensions:

- `.mjs` → always ESM
- `.cjs` → always CommonJS

## Differences from CommonJS

| Feature | CommonJS | ESM |
|---------|----------|-----|
| Loading | Synchronous | Asynchronous |
| Top-level `await` | ❌ No | ✅ Yes |
| `__dirname` / `__filename` | ✅ Available | ❌ Not available (use `import.meta.url`) |
| Static analysis | ❌ No | ✅ Yes (tree-shaking possible) |
| Circular dependencies | Works (partial exports) | Works (live bindings) |

## ESM `__dirname` Equivalent

```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## Live Bindings

```javascript
// counter.js
export let count = 0;
export function increment() {
    count++;
}

// app.js
import { count, increment } from './counter.js';
console.log(count); // 0
increment();
console.log(count); // 1 — live binding!
```

ESM exports are **live bindings** — changes in the exporting module are visible in the importing module.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| CJS or ESM? | Check `package.json` `"type"` field or file extension |
| Is top-level `await` used? | ESM only |
| Is static analysis possible? | ESM only (enables tree-shaking) |

---

# PART III — GLOBAL OBJECTS

## Browser vs Node

| Browser | Node | Universal |
|---------|------|-----------|
| `window` | `global` | `globalThis` |

```javascript
// Works everywhere:
console.log(globalThis === global);     // true in Node
console.log(globalThis === window);    // true in browser
```

## Key Node Globals

| Global | Purpose |
|--------|---------|
| `global` | Node's global object |
| `process` | Current process info and control |
| `Buffer` | Binary data handling |
| `__dirname` | Current directory path (CJS only) |
| `__filename` | Current file path (CJS only) |
| `exports` | Shortcut to `module.exports` (CJS only) |

---

# Chapter 6 — process Object

## Properties

```javascript
// Process ID
console.log(process.pid); // e.g., 12345

// Command line arguments
console.log(process.argv);
// ['node', '/path/to/app.js', 'arg1', 'arg2']

// Environment variables
console.log(process.env.HOME);
console.log(process.env.NODE_ENV); // 'development', 'production'

// Current working directory
console.log(process.cwd());

// Memory usage
console.log(process.memoryUsage());
// {
//   rss: 30_000_000,      // Resident Set Size
//   heapTotal: 10_000_000, // Total heap allocated
//   heapUsed: 5_000_000,   // Heap actually used
//   external: 1_000_000,   // C++ binding memory
//   arrayBuffers: 500_000  // ArrayBuffer memory
// }

// CPU usage
console.log(process.cpuUsage());
// { user: 50000, system: 30000 }
```

## Methods

```javascript
// Exit with code
process.exit(0);   // Success
process.exit(1);   // Error

// Exit on next tick (graceful)
process.exitCode = 1;
// Process will exit after pending callbacks

// Change directory
process.chdir('/tmp');

// Next iteration of event loop
process.nextTick(() => {
    console.log('Runs before any I/O callback');
});

// Kill another process
process.kill(pid, 'SIGTERM');

// Uptime
console.log(process.uptime()); // seconds since process started
```

## Events

```javascript
// Process will exit
process.on('exit', (code) => {
    console.log(`Exiting with code ${code}`);
    // Only synchronous operations here
});

// Uncaught exception
process.on('uncaughtException', (err) => {
    console.error('Uncaught:', err);
    process.exit(1);
});

// Unhandled promise rejection
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

// Signal handling
process.on('SIGINT', () => {
    console.log('Received SIGINT (Ctrl+C)');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM — shutting down gracefully');
    server.close(() => process.exit(0));
});
```

## process.nextTick() Deep Dive

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);
setImmediate(() => console.log('Immediate'));
process.nextTick(() => console.log('NextTick'));
Promise.resolve().then(() => console.log('Promise'));

console.log('End');

// Output:
// Start
// End
// NextTick     ← runs after each phase, before macrotasks
// Promise      ← microtask, runs after nextTick
// Timeout      ← timers phase
// Immediate    ← check phase
```

`process.nextTick()` is **not** part of the event loop's phases. It interrupts the event loop between phases.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which environment variables affect behavior? | `NODE_ENV`, `PORT`, `DATABASE_URL`, `UV_THREADPOOL_SIZE` |
| What is the process ID? | `process.pid` |
| Is shutdown graceful? | Listen to `SIGTERM`, close connections, then exit |
| What runs on next tick? | `process.nextTick()` — highest priority callback queue |

---

# PART IV — FILE SYSTEM

---

# Chapter 7 — Reading Files

## Three Approaches

```javascript
const fs = require('fs');

// 1. Synchronous — blocks the thread
try {
    const data = fs.readFileSync('/path/to/file.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}

// 2. Callback-based — uses thread pool
fs.readFile('/path/to/file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// 3. Promise-based — modern, clean
async function readFile() {
    try {
        const data = await fs.promises.readFile('/path/to/file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

## Execution Flow

```
fs.readFile('/big/file', callback)
       │
       ▼
Node C++ binding (fs.bindings.open, fs.bindings.read)
       │
       ▼
libuv: uv_fs_open() → uv_fs_read()
       │
       ▼
Thread Pool: Thread #1 reads from disk
       │
       ▼
Disk I/O completes → libuv queues callback
       │
       ▼
Event Loop: Poll phase picks up callback
       │
       ▼
JavaScript: callback executes
```

## Performance Comparison

| Method | Blocking | Recommended For |
|--------|----------|-----------------|
| `readFileSync` | Yes (blocks entire process) | Startup config, scripts |
| `readFile` (callback) | No | General use |
| `fs.promises.readFile` | No | Modern code, async/await |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Blocking or non-blocking? | Sync blocks, async doesn't |
| Which thread executes? | Thread pool thread (async) or main thread (sync) |
| What if file is 10 GB? | `readFile` loads entire file into memory — use streams |

---

# Chapter 8 — Writing Files

```javascript
const fs = require('fs');

// Write (overwrites)
fs.writeFileSync('/path/to/output.txt', 'Hello World');
fs.writeFile('/path/to/output.txt', 'Hello World', callback);

// Append
fs.appendFileSync('/path/to/log.txt', 'New log entry\n');
fs.appendFile('/path/to/log.txt', 'New log entry\n', callback);

// Delete
fs.unlinkSync('/path/to/file.txt');
fs.unlink('/path/to/file.txt', callback);

// Rename/Move
fs.renameSync('/path/to/old.txt', '/path/to/new.txt');
fs.rename('/path/to/old.txt', '/path/to/new.txt', callback);

// Copy
fs.copyFileSync('/path/to/source.txt', '/path/to/dest.txt');
fs.copyFile('/path/to/source.txt', '/path/to/dest.txt', callback);

// Watch for changes
fs.watch('/path/to/file.txt', (eventType, filename) => {
    console.log(`${filename} changed: ${eventType}`);
});
```

## Flags

```javascript
fs.readFile('/file.txt', { flag: 'r' });    // read (default)
fs.writeFile('/file.txt', data, { flag: 'w' });  // write (overwrite)
fs.writeFile('/file.txt', data, { flag: 'a' });  // append
fs.writeFile('/file.txt', data, { flag: 'wx' }); // write, fail if exists
```

---

# Chapter 9 — Directories

```javascript
const fs = require('fs');

// Create directory
fs.mkdirSync('/path/to/newdir', { recursive: true });
// recursive: true creates parent directories if missing

// Read directory contents
const files = fs.readdirSync('/path/to/dir');
console.log(files); // ['file1.txt', 'file2.txt', ...]

// Remove directory (must be empty)
fs.rmdirSync('/path/to/emptydir');

// Remove recursively (rm -rf equivalent)
fs.rmSync('/path/to/dir', { recursive: true, force: true });

// Check if path exists
const exists = fs.existsSync('/path/to/file');
console.log(exists); // true or false

// Get file info
const stat = fs.statSync('/path/to/file');
console.log(stat.isFile());     // true
console.log(stat.isDirectory()); // false
console.log(stat.size);          // bytes
console.log(stat.mtime);         // last modified time
console.log(stat.birthtime);     // creation time
```

---

# PART V — PATH MODULE

---

# Chapter 10 — Path Operations

```javascript
const path = require('path');

// Join path segments
const fullPath = path.join('/users', 'tim', 'docs', 'readme.md');
console.log(fullPath); // '/users/tim/docs/readme.md'

// Resolve to absolute path
const absPath = path.resolve('docs/readme.md');
console.log(absPath); // '/current/working/dir/docs/readme.md'

// Get directory name
console.log(path.dirname('/users/tim/docs/readme.md'));
// '/users/tim/docs'

// Get file name (with extension)
console.log(path.basename('/users/tim/docs/readme.md'));
// 'readme.md'

// Get file name (without extension)
console.log(path.basename('/users/tim/docs/readme.md', '.md'));
// 'readme'

// Get extension
console.log(path.extname('/users/tim/docs/readme.md'));
// '.md'

// Parse path into components
const parsed = path.parse('/users/tim/docs/readme.md');
console.log(parsed);
// {
//   root: '/',
//   dir: '/users/tim/docs',
//   base: 'readme.md',
//   ext: '.md',
//   name: 'readme'
// }

// Check if path is absolute
console.log(path.isAbsolute('/users/tim')); // true
console.log(path.isAbsolute('docs/file.txt')); // false

// Normalize (resolve .. and .)
console.log(path.normalize('/users/../tmp/./file.txt'));
// '/tmp/file.txt'

// Platform separator
console.log(path.sep); // '/' on POSIX, '\\' on Windows
```

## __dirname and __filename

```javascript
console.log(__dirname);  // /current/directory/path
console.log(__filename); // /current/directory/path/current-file.js
```

These are available in CommonJS. In ESM, use:

```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

# PART VI — BUFFER

---

# Chapter 11 — Binary Data Handling

## What is a Buffer?

`Buffer` is a Node.js global for handling raw binary data. It represents a fixed-size chunk of memory allocated outside the V8 heap.

```javascript
const buf = Buffer.from('hello');
console.log(buf);
// <Buffer 68 65 6c 6c 6f>
// h  e  l  l  o  (ASCII: 104, 101, 108, 108, 111)
```

## Why Buffer Exists

JavaScript's native `Uint8Array` (TypedArray) existed, but Node needed:

- Better performance for I/O operations.
- Mutable byte arrays (unlike strings which are immutable).
- Direct allocation outside V8's heap (avoids GC pressure).

## Creating Buffers

```javascript
// From string (default utf8)
Buffer.from('hello');
Buffer.from('hello', 'utf8');
Buffer.from('hello', 'base64');   // decode base64
Buffer.from('68656c6c6f', 'hex'); // decode hex

// With specific size (zero-filled)
const buf = Buffer.alloc(1024); // 1 KB buffer, initialized to 0

// Without initialization (faster but contains old data)
const buf2 = Buffer.allocUnsafe(1024); // Not zeroed — may contain old data!

// From array
Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]);

// From another buffer (copy)
const copy = Buffer.from(originalBuffer);
```

## Reading and Writing Buffers

```javascript
const buf = Buffer.alloc(10);

// Write at offset
buf.write('hello', 0);       // offset 0, 'hello'
buf.write(' ', 5);           // offset 5, space
buf.write('world', 6);       // offset 6, 'world'

console.log(buf.toString()); // 'hello world'

// Read individual bytes
console.log(buf[0]);  // 104 ('h')
console.log(buf[1]);  // 101 ('e')

// Set bytes
buf[0] = 0x48; // 'H' in hex
console.log(buf.toString()); // 'Hello world'

// Slice (no copy — shares memory)
const slice = buf.slice(0, 5);
slice[0] = 0x4a; // 'J'
console.log(buf.toString()); // 'Jello world' — original changed too!

// Copy (actual copy)
const target = Buffer.alloc(5);
buf.copy(target, 0, 0, 5);
target[0] = 0x4d; // 'M'
console.log(buf.toString()); // 'Jello world' — original unchanged
```

## Buffer Encoding

| Encoding | Description | Example |
|----------|-------------|---------|
| `'utf8'` | Standard text encoding | `Buffer.from('✓')` → `<Buffer e2 9c 93>` |
| `'ascii'` | 7-bit ASCII (faster) | `Buffer.from('hello', 'ascii')` |
| `'base64'` | Base64 encoded string | `Buffer.from('aGVsbG8=', 'base64')` → 'hello' |
| `'hex'` | Hex encoded | `Buffer.from('68656c6c6f', 'hex')` → 'hello' |
| `'latin1'` | ISO-8859-1 | `Buffer.from('hello', 'latin1')` |

## Buffer vs String Performance

```javascript
// String concatenation (creates new strings — GC pressure)
let str = '';
for (let i = 0; i < 100000; i++) {
    str += 'a';  // Creates 100,000 intermediate strings
}

// Buffer (mutates in place — no GC pressure)
const buf = Buffer.alloc(100000);
for (let i = 0; i < 100000; i++) {
    buf[i] = 0x61; // 'a'
}
console.log(buf.toString());
```

## Buffer Pool

Node internally uses a Buffer pool (8 KB by default) for small `Buffer.allocUnsafe()` calls. This reduces allocation overhead.

```javascript
// These small buffers share the same underlying memory pool
const a = Buffer.allocUnsafe(100);
const b = Buffer.allocUnsafe(200);
// Both allocated from the same 8 KB pool
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| String or binary data? | String → string type. Binary → Buffer |
| Is data mutable? | Strings are immutable. Buffers are mutable |
| What encoding? | Set explicitly to avoid surprises |
| Is Buffer.allocUnsafe safe? | Yes but contains old data — always overwrite before reading |

---

# PART VII — STREAMS

---

# Chapter 12 — Why Streams

## The Problem

```javascript
const fs = require('fs');

// Bad: loads entire 5 GB file into memory
fs.readFile('/massive-video.mp4', (err, data) => {
    // data is 5 GB in RAM
    // Server probably crashes here
});
```

Reading an entire file into memory is impossible for large files.

## The Solution

```javascript
const fs = require('fs');

// Good: processes in chunks
const readStream = fs.createReadStream('/massive-video.mp4', {
    highWaterMark: 64 * 1024 // 64 KB chunks
});

readStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes`);
    // Process 64 KB at a time
    // Memory usage stays at ~64 KB + overhead
});

readStream.on('end', () => {
    console.log('Finished reading');
});
```

## Memory Comparison

| Approach | Memory Usage |
|----------|-------------|
| `readFile` (5 GB file) | 5 GB + overhead |
| `createReadStream` (64 KB chunks) | ~64 KB + overhead |

That's ~80,000x less memory.

---

# Chapter 13 — Stream Types

## Readable Streams

Source of data.

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('file.txt', 'utf8');

// Event-based
readStream.on('data', chunk => process(chunk));
readStream.on('end', () => console.log('Done'));
readStream.on('error', err => console.error(err));

// Or using async iterator (Node 10+)
async function read() {
    for await (const chunk of readStream) {
        process(chunk);
    }
}
```

## Writable Streams

Destination for data.

```javascript
const fs = require('fs');
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello ');
writeStream.write('World');
writeStream.end();  // Signal no more data

writeStream.on('finish', () => console.log('Write completed'));
writeStream.on('error', err => console.error(err));
```

### Backpressure

When a writable stream cannot keep up with the readable stream:

```javascript
const readable = fs.createReadStream('bigfile.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
    const canContinue = writable.write(chunk);
    if (!canContinue) {
        console.log('Backpressure: pausing read');
        readable.pause();  // Stop reading until drain
    }
});

writable.on('drain', () => {
    console.log('Drained: resuming read');
    readable.resume();
});
```

`writable.write()` returns `false` when the internal buffer exceeds `highWaterMark`. Listen for `'drain'` to resume.

## Duplex Streams

Both readable and writable.

```javascript
const net = require('net');
const server = net.createServer(socket => {
    // socket is a Duplex stream
    socket.write('Hello from server\n');
    socket.on('data', data => {
        console.log('Received:', data.toString());
    });
});
```

## Transform Streams

Modify data passing through.

```javascript
const { Transform } = require('stream');

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        // chunk is a Buffer
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

// Usage
process.stdin     // Readable: keyboard input
    .pipe(upperCaseTransform)  // Transform: uppercase
    .pipe(process.stdout);     // Writable: console output
```

## Built-in Transform Streams

```javascript
const zlib = require('zlib'); // Compression

// Gzip compress a file
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));

const crypto = require('crypto');

// Encrypt a file
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

fs.createReadStream('input.txt')
    .pipe(crypto.createCipheriv('aes-256-cbc', key, iv))
    .pipe(fs.createWriteStream('input.encrypted'));
```

---

# Chapter 14 — Pipe

## The pipe() Method

```javascript
readable.pipe(writable);
```

`pipe()` automatically handles:

- **Data flow**: as fast as writable can consume.
- **Backpressure**: pauses readable when writable is full, resumes when drained.
- **Errors**: does NOT forward errors (must handle separately).
- **End**: ends writable when readable ends.

## Manual pipe vs piped

```javascript
// Manual (with backpressure handling)
readable.on('data', (chunk) => {
    const canContinue = writable.write(chunk);
    if (!canContinue) readable.pause();
});
writable.on('drain', () => readable.resume());
readable.on('end', () => writable.end());

// Using pipe (all the above handled automatically)
readable.pipe(writable);
```

## Chain of Pipes

```javascript
// Read → Gzip → Encrypt → Write
fs.createReadStream('source.txt')
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipheriv('aes-256-cbc', key, iv))
    .pipe(fs.createWriteStream('source.txt.gz.encrypted'));
```

## Error Handling with Pipes

```javascript
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream
    .pipe(writeStream)
    .on('finish', () => console.log('Done'));

// pipe() does NOT forward errors — handle each stream separately
readStream.on('error', err => console.error('Read error:', err));
writeStream.on('error', err => console.error('Write error:', err));
```

For cleaner error handling (Node 10+):

```javascript
const { pipeline } = require('stream');

pipeline(
    fs.createReadStream('input.txt'),
    zlib.createGzip(),
    fs.createWriteStream('input.txt.gz'),
    (err) => {
        if (err) {
            console.error('Pipeline failed:', err);
        } else {
            console.log('Pipeline succeeded');
        }
    }
);
```

`pipeline()` also automatically destroys all streams on error — preventing memory leaks.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Entire data or chunks? | Entire → `readFile`. Chunks → `createReadStream` |
| Is backpressure handled? | `pipe()` handles it automatically |
| Is data being transformed? | Use `Transform` stream |
| What if source is faster than destination? | Backpressure: writable buffers, readable pauses |
| Error handling in pipeline? | Use `pipeline()` from `stream` module |

---

# Chapter 15 — Stream Modes

## Flowing Mode

Data is read and emitted as fast as possible.

```javascript
const stream = fs.createReadStream('file.txt');

// Attaching 'data' listener puts stream in flowing mode
stream.on('data', (chunk) => {
    // Chunks arrive automatically
});
```

## Paused Mode

Data must be explicitly read.

```javascript
const stream = fs.createReadStream('file.txt');

// Stream starts in paused mode
// Must call read() to get data
stream.on('readable', () => {
    let chunk;
    while ((chunk = stream.read()) !== null) {
        // Manually read chunks
    }
});
```

## Switching Modes

| Action | Result |
|--------|--------|
| `stream.on('data', cb)` | Flowing mode |
| `stream.pause()` | Paused mode |
| `stream.resume()` | Flowing mode |
| `stream.pipe(dest)` | Flowing mode (pipe resumes) |
| `stream.unpipe(dest)` | May pause if no other destinations |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Flowing or paused? | Depends on listener attachment |
| Who controls pace? | Flowing: source pushes. Paused: consumer pulls |
| Which is easier? | Flowing (`data` event). Paused gives more control |

---

# PART VIII — HTTP SERVER

---

# Chapter 16 — Creating an HTTP Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // req: IncomingMessage (Readable Stream)
    // res: ServerResponse (Writable Stream)

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

## Request Object (IncomingMessage)

```javascript
http.createServer((req, res) => {
    // URL and method
    console.log(req.method);       // 'GET', 'POST', etc.
    console.log(req.url);          // '/api/users?id=123'
    console.log(req.headers);      // { 'content-type': 'application/json', ... }
    console.log(req.httpVersion);  // '1.1'

    // Read request body (stream)
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log('Body:', body);
        res.end('OK');
    });
});
```

## Response Object (ServerResponse)

```javascript
http.createServer((req, res) => {
    // Set status code
    res.statusCode = 200;
    res.statusMessage = 'OK'; // optional

    // Set headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Custom-Header', 'value');

    // Write header (alternative)
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'value'
    });

    // Write body (stream)
    res.write(JSON.stringify({ message: 'Hello' }));

    // End response
    res.end();

    // Or end with body directly
    res.end(JSON.stringify({ message: 'Hello' }));
});
```

## Routing (Manual)

```javascript
http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home</h1>');
    } else if (url === '/api/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([{ id: 1, name: 'Alice' }]));
    } else if (url === '/api/users' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const user = JSON.parse(body);
            console.log('Creating user:', user);
            res.writeHead(201);
            res.end(JSON.stringify({ id: 2, ...user }));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});
```

## Request Flow

```
Browser
  │
  ▼  TCP connection (3-way handshake)
  │
  ▼  HTTP request sent
  │
  ▼  libuv receives TCP data
  │
  ▼  Event loop: poll phase picks up
  │
  ▼  http parser parses request
  │
  ▼  Request handler callback invoked
  │
  ▼  Response sent back
  │
  ▼  TCP connection closed (or kept alive)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which route received request? | Check `req.url` and `req.method` |
| Is request body a stream? | Yes — `req` is a Readable stream |
| Is response a stream? | Yes — `res` is a Writable stream |
| What if response is large? | Stream it with `res.write()` in chunks |

---

# PART IX — EVENT EMITTER

---

# Chapter 17 — The Event Emitter Pattern

```javascript
const EventEmitter = require('events');

class UserService extends EventEmitter {
    login(username) {
        console.log(`${username} logged in`);
        this.emit('login', { username, timestamp: Date.now() });
    }

    logout(username) {
        console.log(`${username} logged out`);
        this.emit('logout', { username });
    }
}

const users = new UserService();

// Register listeners
users.on('login', (data) => {
    console.log(`Audit log: ${data.username} at ${data.timestamp}`);
});

users.on('login', (data) => {
    // Send welcome email
    console.log(`Email sent to ${data.username}`);
});

users.on('logout', (data) => {
    console.log(`Session ended for ${data.username}`);
});

// Trigger events
users.login('alice');
users.logout('alice');
```

## Key Methods

```javascript
const emitter = new EventEmitter();

// Register listener
emitter.on('event', handler);        // Alias: addListener
emitter.once('event', handler);      // Fires once then removed

// Remove listener
emitter.off('event', handler);       // Alias: removeListener
emitter.removeAllListeners('event');

// Emit event
emitter.emit('event', arg1, arg2);

// Get listeners
emitter.listeners('event');          // Array of handlers
emitter.listenerCount('event');      // Number of handlers

// Max listeners warning (default 10)
emitter.setMaxListeners(20);         // Increase limit
EventEmitter.defaultMaxListeners = 20; // Global change
```

## Error Handling

```javascript
const emitter = new EventEmitter();

// If 'error' is emitted and no listener exists, Node throws
emitter.on('error', (err) => {
    console.error('Error event:', err);
});

emitter.emit('error', new Error('Something broke'));
// Safe — caught by listener
```

Always attach an `'error'` listener on EventEmitters.

## Streams are EventEmitters

```javascript
const stream = fs.createReadStream('file.txt');

// All of these are EventEmitter methods:
stream.on('data', handler);
stream.on('end', handler);
stream.on('error', handler);
stream.once('open', handler);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is event emitter involved? | Many Node APIs extend EventEmitter |
| Who listens to which event? | Check `.on()` calls |
| Is there an error listener? | If not, error will crash the process |
| What is max listeners? | Default 10 — warning for potential leaks |

---

# PART X — OS MODULE

---

# Chapter 18 — System Information

```javascript
const os = require('os');

// CPU
console.log(os.cpus());
// [{ model: 'Intel...', speed: 2400, times: { user, nice, sys, idle, irq } }, ...]
console.log(os.cpus().length); // Number of cores

// Memory
console.log(os.totalmem());   // Total RAM in bytes
console.log(os.freemem());    // Free RAM in bytes

// System
console.log(os.platform());  // 'linux', 'darwin', 'win32'
console.log(os.release());   // OS version
console.log(os.type());      // 'Linux', 'Darwin', 'Windows_NT'
console.log(os.arch());      // 'x64', 'arm64'
console.log(os.hostname());  // Machine hostname
console.log(os.homedir());   // User home directory
console.log(os.tmpdir());    // Temp directory
console.log(os.uptime());    // System uptime in seconds

// Network
console.log(os.networkInterfaces());
// { lo: [...], eth0: [{ address: '192.168.1.5', family: 'IPv4', ... }] }

// User info
console.log(os.userInfo());
// { uid: 1000, gid: 1000, username: 'tim', homedir: '/home/tim', shell: '/bin/zsh' }

// Load average (1, 5, 15 minute averages)
console.log(os.loadavg()); // [1.5, 1.2, 1.0] (Unix only)
```

## Practical: Cluster Configuration

```javascript
const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
    // Fork one worker per CPU core
    const numCPUs = os.cpus().length;
    console.log(`Forking ${numCPUs} workers`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    // Worker process — runs server
    http.createServer(handler).listen(3000);
}
```

---

# PART XI — CRYPTO

---

# Chapter 19 — Cryptographic Operations

## Hashing

```javascript
const crypto = require('crypto');

// Create a hash
const hash = crypto.createHash('sha256');
hash.update('Hello World');
console.log(hash.digest('hex'));
// 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'

// Streaming hashing
const hashStream = crypto.createHash('sha256');

fs.createReadStream('file.txt')
    .pipe(hashStream)
    .on('finish', () => {
        console.log(hashStream.digest('hex'));
    });
```

## HMAC (Hash-based Message Authentication Code)

```javascript
const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('message');
console.log(hmac.digest('hex'));
// Different from plain hash — requires key
```

## Random Bytes

```javascript
crypto.randomBytes(32, (err, buffer) => {
    if (err) throw err;
    console.log(buffer.toString('hex'));
    // 32 random bytes → 64 hex characters
});

// Synchronous (blocks)
const buf = crypto.randomBytes(32);
```

## Password Hashing (PBKDF2)

```javascript
const crypto = require('crypto');

const password = 'user-password';
const salt = crypto.randomBytes(16).toString('hex');

// PBKDF2: computationally expensive (key stretching)
crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
    if (err) throw err;
    console.log(key.toString('hex')); // Hashed password
    // Store salt + hashed password in database
});
```

## Encryption / Decryption

```javascript
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encrypt
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('Secret message', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('Encrypted:', encrypted);

// Decrypt
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('Decrypted:', decrypted);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is data being hashed or encrypted? | Hash: one-way. Encrypt: reversible with key |
| Is password being stored securely? | Use PBKDF2, bcrypt, or argon2 — never plain SHA |
| Are random values truly random? | `crypto.randomBytes` is cryptographically secure |

---

# PART XII — DNS

```javascript
const dns = require('dns');

// Lookup (uses thread pool)
dns.lookup('google.com', (err, address, family) => {
    console.log(address); // '142.250.80.46'
    console.log(family);  // 4 (IPv4)
});

// Resolve (uses network directly, not thread pool)
dns.resolve('google.com', 'A', (err, addresses) => {
    console.log(addresses); // ['142.250.80.46', ...]
});

// Reverse lookup
dns.reverse('8.8.8.8', (err, hostnames) => {
    console.log(hostnames); // ['dns.google']
});
```

Difference: `dns.lookup()` goes through libuv thread pool (like OS `getaddrinfo`). `dns.resolve()` uses Node's DNS implementation directly.

---

# PART XIII — NET MODULE (TCP)

---

# Chapter 20 — TCP Server

```javascript
const net = require('net');

const server = net.createServer((socket) => {
    // socket is a Duplex stream
    console.log('Client connected');

    socket.write('Welcome to TCP server!\n');

    socket.on('data', (data) => {
        console.log('Received:', data.toString());

        if (data.toString().trim() === 'quit') {
            socket.end('Goodbye!\n');
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(9000, () => {
    console.log('TCP server on port 9000');
});
```

## TCP Client

```javascript
const net = require('net');

const client = net.createConnection({ port: 9000 }, () => {
    console.log('Connected to server');
    client.write('Hello from client!\n');
});

client.on('data', (data) => {
    console.log('Server says:', data.toString());
});

client.on('end', () => {
    console.log('Disconnected from server');
});
```

## Applications

- **Redis**: uses TCP (custom protocol).
- **MySQL/PostgreSQL**: uses TCP.
- **IRC**: chat protocol over TCP.
- **Custom protocol servers**: game servers, real-time data feeds.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this TCP? | Yes — `net` module |
| Is socket a stream? | Yes — Duplex (readable + writable) |
| What protocol runs over TCP? | HTTP, FTP, SMTP, custom protocols |

---

# PART XIV — TLS

```javascript
const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),
    ca: fs.readFileSync('ca-cert.pem')
};

const server = tls.createServer(options, (socket) => {
    console.log('Client connected (encrypted)');
    socket.write('Secure connection established!\n');
    socket.end();
});

server.listen(4433, () => {
    console.log('TLS server on port 4433');
});
```

HTTPS uses TLS under the hood:

```javascript
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, (req, res) => {
    res.end('Secure Hello!');
}).listen(443);
```

---

# PART XV — CHILD PROCESS

---

# Chapter 21 — Spawning External Programs

```javascript
const { exec, spawn, fork, execFile } = require('child_process');
```

## exec() — Shell Command (Buffered)

```javascript
const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout:\n${stdout}`);
});
```

**Limitation**: buffers entire output in memory. Not for large output.

## spawn() — Streamed

```javascript
const { spawn } = require('child_process');

// Spawn a long-running process
const child = spawn('ffmpeg', [
    '-i', 'input.mp4',
    '-c:v', 'libx264',
    'output.mp4'
]);

// Stream stdout/stderr
child.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`Error: ${data}`); // ffmpeg writes progress to stderr
});

child.on('close', (code) => {
    console.log(`Child exited with code ${code}`);
});

child.on('error', (err) => {
    console.error('Failed to start:', err);
});
```

**Benefit**: streams data — memory efficient.

## execFile() — Execute Binary Directly (No Shell)

```javascript
const { execFile } = require('child_process');

execFile('/usr/bin/python3', ['script.py'], (error, stdout, stderr) => {
    if (error) throw error;
    console.log(stdout);
});
```

Safer than `exec()` because it doesn't spawn a shell (no command injection risk).

## fork() — New Node Process

```javascript
// parent.js
const { fork } = require('child_process');

const child = fork('worker.js');

child.on('message', (msg) => {
    console.log('From child:', msg);
});

child.send({ task: 'compute', data: [1, 2, 3, 4, 5] });

// worker.js
process.on('message', (msg) => {
    if (msg.task === 'compute') {
        const result = msg.data.reduce((a, b) => a + b, 0);
        process.send({ result });
    }
});
```

`fork()` is like `spawn('node', ...)` but with built-in IPC (inter-process communication) via `send()` and `message` events.

## Execution Flow

```
Node Process (parent)
    │
    ├── exec()     → Shell → Command (buffered)
    ├── spawn()    → Command (streamed)
    ├── execFile() → Binary directly (no shell)
    └── fork()     → Node Child (with IPC)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| New process or same process? | `child_process` creates new OS process |
| Is output large? | Use `spawn()` (stream) not `exec()` (buffer) |
| Is shell needed? | No → `spawn` / `execFile` (safer). Yes → `exec` |
| Communication needed? | `fork()` for IPC with Node child |

---

# PART XVI — CLUSTER

---

# Chapter 22 — Multi-Core Scaling

## The Problem

```javascript
const http = require('http');

http.createServer((req, res) => {
    res.end('Hello');
}).listen(3000);

// Single process → single core used
// Other 7 cores (on 8-core machine) are idle
```

## The Solution: Cluster

```javascript
const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Handle worker exit
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Replace the dead worker
        cluster.fork();
    });

    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

} else {
    // Worker process — runs server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Handled by worker ${process.pid}\n`);
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}
```

## How Cluster Works

```
Master Process (pid: 1000)
    │
    ├── Worker 1 (pid: 1001) — handles requests
    ├── Worker 2 (pid: 1002) — handles requests
    ├── Worker 3 (pid: 1003) — handles requests
    └── Worker 4 (pid: 1004) — handles requests

All workers share port 3000.
OS kernel load-balances incoming connections across workers.
```

## Graceful Shutdown

```javascript
if (cluster.isMaster) {
    process.on('SIGTERM', () => {
        console.log('Master received SIGTERM — shutting down gracefully');

        const workers = Object.values(cluster.workers);
        let completed = 0;

        workers.forEach(worker => {
            worker.on('exit', () => {
                completed++;
                if (completed === workers.length) {
                    process.exit(0);
                }
            });
            worker.send('shutdown');
            worker.disconnect();
        });

        // Force exit after timeout
        setTimeout(() => process.exit(1), 10000);
    });
}

if (cluster.isWorker) {
    process.on('message', (msg) => {
        if (msg === 'shutdown') {
            server.close(() => {
                console.log('Worker closed connections');
                process.exit(0);
            });
        }
    });
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the server using all cores? | Check with `os.cpus().length` vs number of workers |
| What happens if a worker dies? | Master should fork a replacement |
| Shared state? | Workers don't share memory — use Redis/DB for shared state |

---

# PART XVII — WORKER THREADS

---

# Chapter 23 — True Multithreading

## Difference from Cluster

| Feature | Cluster | Worker Threads |
|---------|---------|---------------|
| Process or thread? | Separate processes | Same process, separate threads |
| Memory sharing | No (separate processes) | Yes (SharedArrayBuffer) |
| Startup cost | Higher (new process) | Lower (new thread) |
| Isolation | Full (crash doesn't affect others) | Partial (thread can crash process) |
| Use case | HTTP server scaling | CPU-intensive computation |

## Worker Threads Example

```javascript
const { Worker } = require('worker_threads');

function runWorker(data) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: data
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

async function main() {
    console.log('Main thread: starting worker');

    const result = await runWorker({ iterations: 1000000000 });
    console.log('Main thread: result from worker:', result);
}

main();
```

```javascript
// worker.js
const { parentPort, workerData } = require('worker_threads');

// CPU-intensive work here
let count = 0;
for (let i = 0; i < workerData.iterations; i++) {
    count += i;
}

// Send result back to main thread
parentPort.postMessage({ count, threadId: require('worker_threads').threadId });
```

## Shared Memory Between Threads

```javascript
const { Worker, SharedArrayBuffer } = require('worker_threads');

const sharedBuffer = new SharedArrayBuffer(4); // 4 bytes
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker('./worker-shared.js');
worker.postMessage(sharedBuffer);
```

## When to Use

| Scenario | Solution |
|----------|----------|
| HTTP server, I/O-heavy | Cluster (fork processes) |
| CPU-heavy computation | Worker Threads |
| Need memory sharing | Worker Threads (SharedArrayBuffer) |
| Need maximum isolation | Cluster (separate processes) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| CPU-bound? | Worker threads needed |
| I/O-bound? | Async + thread pool is sufficient |
| Shared state needed? | SharedArrayBuffer + Atomics |
| Crash isolation needed? | Use cluster (separate processes) |

---

# PART XVIII — THREAD POOL (libuv)

## Default: 4 Threads

```javascript
// Before any async file system operations:
console.log(process.env.UV_THREADPOOL_SIZE); // undefined (defaults to 4)
```

## Configuring

```bash
# Environment variable
UV_THREADPOOL_SIZE=8 node app.js

# Or in code (before using fs/crypto)
process.env.UV_THREADPOOL_SIZE = '8';
```

## How Threads Are Used

```javascript
const crypto = require('crypto');
const fs = require('fs');

// These all use the thread pool
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', callback);
fs.readFile('file.txt', callback);
dns.lookup('google.com', callback);
```

## Saturation

```javascript
const start = Date.now();

function logTime(label) {
    console.log(`${label}: ${Date.now() - start}ms`);
}

// 4 operations with 4 threads:
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('1')); // ~250ms
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('2')); // ~250ms
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('3')); // ~250ms
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('4')); // ~250ms
// All complete at ~250ms — parallel

// 5th operation:
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('5')); // ~500ms
// Waits for one of first 4 to finish — queued
```

## What Does NOT Use Thread Pool

- **Network I/O** (`http`, `net`) — uses OS async (epoll on Linux, kqueue on macOS, IOCP on Windows).
- **JavaScript execution** — runs on main thread (V8).
- **Timers** — handled by event loop directly.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which thread pool operation? | `fs`, `crypto.pbkdf2`, `crypto.randomBytes`, `dns.lookup` |
| Is thread pool saturated? | Check how many concurrent operations — >4 with default = queue |
| Could increasing pool size help? | If many concurrent I/O operations (but not for network I/O) |

---

# PART XIX — STDIN / STDOUT / STDERR

```javascript
// STDIN — Readable stream
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    console.log('You typed:', input.trim());
});

// STDOUT — Writable stream
process.stdout.write('Enter your name: ');

// STDERR — Writable stream (for errors)
process.stderr.write('Something went wrong\n');

// CLI prompt example
function ask(question) {
    return new Promise((resolve) => {
        process.stdout.write(question);
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim());
        });
    });
}

async function cli() {
    const name = await ask('Name: ');
    const age = await ask('Age: ');
    console.log(`Hello ${name}, you are ${age} years old`);
    process.exit(0);
}

cli();
```

## Piping in CLI

```bash
echo "hello" | node app.js   # stdin receives "hello\n"
node app.js < input.txt      # stdin reads from file
node app.js > output.txt     # stdout writes to file
node app.js 2> error.log     # stderr writes to file
```

---

# PART XX — SIGNALS

```javascript
process.on('SIGINT', () => {
    console.log('\nSIGINT received (Ctrl+C)');
    cleanup();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received — graceful shutdown');
    server.close(() => {
        db.close(() => {
            process.exit(0);
        });
    });

    // Force shutdown after timeout
    setTimeout(() => process.exit(1), 10000);
});

process.on('SIGUSR1', () => {
    console.log('SIGUSR1 — reopen log files');
    logger.reopen();
});

// SIGKILL cannot be handled (OS kills immediately)
// SIGSTOP cannot be handled (OS stops immediately)
```

## Common Signals

| Signal | Action | Can Handle? |
|--------|--------|-------------|
| `SIGINT` | Ctrl+C | Yes |
| `SIGTERM` | Termination request (kill default) | Yes |
| `SIGUSR1` | User-defined | Yes |
| `SIGHUP` | Terminal closed | Yes |
| `SIGKILL` | Force kill | No |
| `SIGSTOP` | Stop process | No |

---

# PART XXI — MEMORY IN NODE

## V8 Memory Structure in Node

```
Node Process Memory
├── Stack (per thread, ~1 MB)
│   └── Primitives, references, call frames
├── Heap (V8 managed)
│   ├── Young Generation (new objects)
│   ├── Old Generation (survivors)
│   └── Large Object Space (>1 MB objects)
├── Buffer Memory (external to V8)
│   └── Buffer.alloc() allocations
└── C++ Bindings
    └── Internal module state
```

## Monitoring Memory

```javascript
// Process-level
console.log(process.memoryUsage());
// {
//   rss: 30_000_000,      // Resident Set Size (total physical memory)
//   heapTotal: 10_000_000, // V8 heap allocated
//   heapUsed: 5_000_000,   // V8 heap used
//   external: 1_500_000,   // C++ object memory (Buffers, etc.)
//   arrayBuffers: 500_000  // ArrayBuffer/SharedArrayBuffer memory
// }

// V8 heap statistics
const v8 = require('v8');
console.log(v8.getHeapStatistics());
// {
//   total_heap_size: ...,
//   used_heap_size: ...,
//   heap_size_limit: 1_400_000_000,  // ~1.4 GB default limit
//   ...
// }

// GC event tracking (Node 16+)
const gc = require('gc-stats')(); // npm install gc-stats
gc.on('stats', (stats) => {
    console.log('GC occurred:', stats);
    // stats.type: 1=Scavenge, 2=MarkSweep, 3=IncrementalMarking
    // stats.duration: ms
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is memory usage growing? | Check `process.memoryUsage().heapUsed` over time |
| Are Buffers large? | Check `process.memoryUsage().external` |
| Is GC running frequently? | Profile with `--trace-gc` or `gc-stats` |

---

# PART XXII — NODE EVENT LOOP

---

# Chapter 24 — The Six Phases

```
   ┌──────────┐
   │  Timers  │   ← setTimeout, setInterval callbacks
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Pending  │   ← I/O callbacks deferred to next iteration
   │ Callbacks│
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Idle,   │   ← Internal use
   │ Prepare  │
   └────┬─────┘
        ▼
   ┌──────────┐
   │   Poll   │   ← Retrieve new I/O events, execute callbacks
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Check   │   ← setImmediate callbacks
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Close    │   ← close event callbacks (socket.on('close'))
   │ Callbacks│
   └──────────┘
```

## Phase Details

### 1. Timers Phase

```javascript
setTimeout(() => {
    console.log('Timer callback');
}, 0);
// Executes in the timers phase when the threshold is reached
// "0" means "as soon as possible", not "immediately"
// Minimum delay: 1ms (clamped by OS)
```

### 2. Pending Callbacks

Executes I/O callbacks deferred to the next loop iteration. For example, `TCP error` callbacks.

### 3. Idle/Prepare

Internal use only.

### 4. Poll Phase

**Most important phase**. Does:

- If timers are due → loop back to timers phase.
- If `setImmediate` callbacks are queued → proceed to check phase.
- Otherwise, wait for new I/O events (blocking with timeout).

```javascript
const fs = require('fs');

fs.readFile('file.txt', () => {
    console.log('I/O callback — executes in poll phase');
});

setImmediate(() => {
    console.log('Check phase — after poll');
});

setTimeout(() => {
    console.log('Timers phase — before poll on next iteration');
}, 0);
```

### 5. Check Phase

Executes `setImmediate()` callbacks.

```javascript
setImmediate(() => {
    console.log('Check phase: runs after poll');
});
```

### 6. Close Callbacks

Executes close event callbacks (e.g., `socket.on('close')`).

## Microtasks Between Phases

After each phase, the event loop processes:

1. **`process.nextTick()` queue** — entire queue is drained.
2. **Promise microtask queue** — entire queue is drained.

```javascript
console.log('Start');

setTimeout(() => console.log('Timer'), 0);
setImmediate(() => console.log('Immediate'));

Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('NextTick'));

console.log('End');

// Output:
// Start
// End
// NextTick        ← drained after each phase
// Promise         ← drained after nextTick
// Timer/Immediate ← depends on phase (order varies)
```

## setImmediate vs setTimeout(fn, 0)

In the event loop:

- If both are called from the **main module**, the order depends on the phase when the loop starts.
- If both are called from an **I/O callback**, `setImmediate` always runs first (check phase after poll).

```javascript
const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => console.log('timeout'), 0);
    setImmediate(() => console.log('immediate'));
});
// Output:
// immediate
// timeout
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which phase is this callback in? | Depends on what triggered it |
| Macrotask or microtask? | Macrotask: timers, I/O, setImmediate. Microtask: nextTick, Promise |
| Will this block the event loop? | Long synchronous code blocks all phases |
| Starvation possible? | Infinite microtasks starve macrotasks |

---

# PART XXIII — PACKAGE MANAGERS

---

# Chapter 25 — npm, Yarn, pnpm

## npm (Node Package Manager)

```bash
# Initialize
npm init
npm init -y # Skip prompts

# Install
npm install express
npm install --save-dev jest
npm install -g nodemon  # Global install

# Remove
npm uninstall express

# Update
npm update

# Run script
npm start
npm test
npm run build
```

## node_modules

```text
project/
├── node_modules/    ← Installed packages
│   ├── express/
│   ├── lodash/
│   └── ...
├── package.json
└── package-lock.json
```

## npm vs Yarn vs pnpm

| Feature | npm | Yarn | pnpm |
|---------|-----|------|------|
| **Lock file** | `package-lock.json` | `yarn.lock` | `pnpm-lock.yaml` |
| **Disk efficiency** | Copies packages per project | Copies per project | Hard links shared store |
| **Install speed** | Medium | Faster | Faster |
| **Plug'n'Play** | No | Yes (PnP) | No |
| **Workspaces** | Yes (npm 7+) | Yes | Yes |

## pnpm's Node Structure

```text
node_modules/
├── .pnpm/            ← Content-addressable store (hard links)
├── express           ← Symlink to .pnpm/express@4.18.2
│   └── node_modules/
│       └── body-parser → Symlink to .pnpm/body-parser@1.20.0
└── body-parser       ← Symlink to .pnpm/body-parser@1.20.0
```

**Benefit**: packages are stored once globally (content-addressable). Multiple projects sharing the same package version use the same files.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which package manager is used? | Check lockfile: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` |
| Is node_modules bloated? | `du -sh node_modules` — can be hundreds of MB |

---

# PART XXIV — package.json

```json
{
    "name": "my-app",
    "version": "1.0.0",
    "description": "My Node.js application",
    "main": "index.js",
    "type": "commonjs",
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "jest",
        "build": "webpack"
    },
    "dependencies": {
        "express": "^4.18.0",
        "lodash": "~4.17.0"
    },
    "devDependencies": {
        "jest": "^29.0.0",
        "nodemon": "^2.0.0"
    },
    "engines": {
        "node": ">=16.0.0"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/user/repo.git"
    },
    "license": "MIT"
}
```

## Key Fields

| Field | Purpose |
|-------|---------|
| `name` | Package name |
| `version` | Semver version |
| `main` | Entry point (default: `index.js`) |
| `type` | `"commonjs"` or `"module"` |
| `scripts` | Commands run via `npm run <script>` |
| `dependencies` | Production dependencies |
| `devDependencies` | Development-only dependencies |
| `peerDependencies` | Required by plugin packages |
| `engines` | Required Node.js version |

## Scripts Special Names

```bash
npm start      # runs "start" script
npm stop       # runs "stop" script
npm test       # runs "test" script
npm restart    # runs "stop" → "restart" → "start"
npm run <name> # runs any other script
```

## Pre/Post Hooks

```json
{
    "scripts": {
        "prebuild": "echo 'Running before build'",
        "build": "webpack",
        "postbuild": "echo 'Running after build'"
    }
}
```

```bash
npm run build
# Output:
# Running before build
# webpack output...
# Running after build
```

---

# PART XXV — node_modules

## Dependency Resolution

```
require('express')
    │
    ├── Look in project's node_modules/express
    ├── Look in parent's node_modules/express
    ├── Look in grandparent's node_modules/express
    └── ... up to root
```

## The node_modules Size Problem

A typical React app:

```
node_modules/ → ~200-400 MB, 50,000+ files

Why so large?
- Each package has its own dependencies
- Dependencies can be duplicated across versions
- Even small packages add up
```

## package-lock.json

Locks exact versions of every dependency:

```json
{
    "name": "my-app",
    "lockfileVersion": 2,
    "packages": {
        "node_modules/express": {
            "version": "4.18.2",
            "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
            "integrity": "sha512-...",
            "dependencies": {
                "accepts": "~1.3.8",
                ...
            }
        }
    }
}
```

**Purpose**: reproducible installs across machines.

---

# PART XXVI — SEMVER

## Format: MAJOR.MINOR.PATCH

```text
1.4.2
│ │ │
│ │ └── Patch: bug fixes (backwards-compatible)
│ └──── Minor: new features (backwards-compatible)
└────── Major: breaking changes
```

## Version Ranges

```json
{
    "dependencies": {
        "express": "^4.18.0",   // >=4.18.0 <5.0.0
        "lodash": "~4.17.0",    // >=4.17.0 <4.18.0
        "react": "18.2.0",      // Exactly 18.2.0
        "next": "*"             // Any version (not recommended)
    }
}
```

| Range | Meaning | Example matches |
|-------|---------|-----------------|
| `^4.18.0` | Compatible with minor | 4.18.0, 4.19.0, 4.99.0 |
| `~4.17.0` | Approximate (patch only) | 4.17.0, 4.17.1, 4.17.9 |
| `4.17.0` | Exact | 4.17.0 only |
| `>=4.17.0 <5.0.0` | Custom range | |

## Why Use ^ (Caret)?

**Safety + updates**: `^4.18.0` gets bug fixes (patches) and new features (minors) but not breaking changes (majors).

---

# PART XXVII — ENVIRONMENT VARIABLES

## .env File

```bash
# .env
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
JWT_SECRET=my-super-secret-key
NODE_ENV=development
REDIS_URL=redis://localhost:6379
```

## Loading .env

```bash
npm install dotenv
```

```javascript
require('dotenv').config();

console.log(process.env.PORT);         // '3000'
console.log(process.env.DATABASE_URL); // 'postgres://...'
console.log(process.env.NODE_ENV);     // 'development'
```

## Common Environment Variables

| Variable | Purpose |
|----------|---------|
| `NODE_ENV` | `'development'`, `'production'`, `'test'` |
| `PORT` | HTTP server port |
| `HOST` | Host to bind to |
| `DATABASE_URL` | Database connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_SECRET` | JWT signing key |
| `LOG_LEVEL` | `'debug'`, `'info'`, `'warn'`, `'error'` |
| `UV_THREADPOOL_SIZE` | libuv thread pool size |

## Best Practices

- Never commit `.env` to version control (add to `.gitignore`).
- Provide `.env.example` with placeholder values.
- Validate required variables at startup:

```javascript
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

const dbUrl = requireEnv('DATABASE_URL');
const port = parseInt(requireEnv('PORT'), 10);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which environment variable controls this behavior? | Look for `process.env.X` in code |
| Is there a default? | Check for `|| 'defaultValue'` patterns |
| Is validation done? | Missing env vars should throw at startup |

---

# PART XXVIII — REVERSE ENGINEERING TACTICS

When reading backend code ask:

---

### Which module is imported?

Every `require('x')` or `import x from 'x'` reveals the subsystem.

---

### Which API handles requests?

`http.createServer()`, `Express`, `Koa`, `Fastify`.

---

### Is operation synchronous?

Sync blocks the entire event loop. Check for `Sync` suffix or `await`.

---

### Is file I/O involved?

Streams or buffers? Entire file or chunks?

---

### Is networking involved?

`http`, `net`, `dns` — which protocol?

---

### Which process executes?

Main thread? Child process? Worker thread?

---

### Is memory copied?

Buffer copy vs slice (shares memory).

---

### Are streams used?

If large data, streams should be used. If `readFile` on large data → potential OOM.

---

### Are buffers used?

Binary data? Encoding matters.

---

### Is event emitter involved?

Many Node APIs emit events. Check listener count for leaks.

---

### Is child_process involved?

`exec` (shell, buffered) or `spawn` (streamed)? Memory implications.

---

### Is worker thread involved?

CPU-bound computation? Shared memory?

---

### Is cluster involved?

Multi-core scaling? Shared port?

---

### Is task CPU-bound?

Worker threads or cluster.

---

### Is task I/O-bound?

Async + thread pool sufficient.

---

### Is blocking occurring?

Sync function in async path → blocked event loop.

---

### Which thread pool operation executes?

`fs`, `crypto`, `dns.lookup`.

---

### Is Event Loop affected?

Long sync code blocks all phases.

---

### Is backpressure handled?

Streams: `pipe()` handles it. Manual: check `write()` return value + `drain` event.

---

### Is memory leak possible?

Unclosed streams, growing collections, forgotten timers, leaked listeners.

---

### Which environment variable controls behavior?

`process.env.X` — check for config via env.

---

# Senior Reverse Coding Tactical Process

Whenever you see:

```javascript
fs.readFile(...)
```

Ask:

1. **Why async?** Because I/O should never block the event loop.
2. **Which thread executes?** libuv thread pool (unless sync).
3. **Does Event Loop wait?** No — it continues processing other callbacks.
4. **How many threads available?** Default 4 (`UV_THREADPOOL_SIZE`).
5. **What if file is 10 GB?** `readFile` crashes (memory). Use streams.
6. **Stream instead?** `createReadStream` with `highWaterMark` for large files.
7. **Memory impact?** `readFile` = file size in RAM. Stream = chunk size in RAM.
8. **CPU-bound or I/O-bound?** File I/O is I/O-bound (waiting on disk).
9. **Is caching useful?** Repeated reads → cache in memory.
10. **Could worker threads help?** Not for file I/O (already on thread pool). For processing file contents after reading → yes.

---

# Projects

## 1. CLI Todo App

- `node todo.js add "Buy milk"` — add task.
- `node todo.js list` — list all tasks.
- `node todo.js done <id>` — mark complete.
- `node todo.js delete <id>` — remove.
- Store tasks in a JSON file using `fs`.
- Use `process.argv` for arguments.
- Bonus: color output with `chalk` or ANSI codes.

## 2. File Explorer

- Recursively list directory tree with `fs.readdirSync`.
- Show file sizes, last modified dates.
- Filter by extension (`node explore.js .js`).
- Sort by size/name/date.
- Display as tree with indentation.

## 3. HTTP Server

- `node server.js` starts on port 3000.
- Routes:
  - `GET /` — HTML home page.
  - `GET /about` — HTML about page.
  - `GET /api/time` — JSON with current time.
  - `GET /api/headers` — JSON with request headers.
  - `POST /api/echo` — returns JSON of request body.
- Proper 404 handling.
- Bonus: static file serving for `/public/` directory.

## 4. REST API

- `GET /api/users` — list all users.
- `GET /api/users/:id` — get single user.
- `POST /api/users` — create user.
- `PUT /api/users/:id` — update user.
- `DELETE /api/users/:id` — delete user.
- Store users in a JSON file.
- Validate input (name required, age must be number).
- Return proper status codes (200, 201, 400, 404).

## 5. Chat Server

- TCP-based chat room using `net` module.
- Clients connect via `telnet` or `nc`.
- Username registration on connect.
- Broadcast messages to all connected clients.
- Server logs all activity.
- Handle disconnections gracefully.
- Bonus: private messages (`/msg username text`).

## 6. TCP Server

- Custom protocol server using `net`.
- Commands:
  - `PING` → `PONG`.
  - `TIME` → current server time.
  - `ECHO <message>` → returns message.
  - `QUIT` → disconnects.
- Support multiple simultaneous clients.
- Connection counter.
- Rate limiting (max 10 commands/second per client).

## 7. Stream-based Video Server

- Serve a large video file using streams.
- Support `Range` header for seeking.
- `Content-Type: video/mp4`.
- `206 Partial Content` for range requests.
- Test with:
  ```bash
  curl -O http://localhost:3000/video.mp4
  ```
- Compare memory usage vs `readFile` approach.

## 8. Mini npm Package

- Create a small utility package.
- Export a function.
- Publish to npm (or test locally with `npm link`).
- Include:
  - `package.json` with proper metadata.
  - README with usage.
  - Tests.
  - `.gitignore`.

## 9. Process Manager

- Manage multiple Node processes:
  - `pm start server.js` — spawn and track.
  - `pm list` — show running processes.
  - `pm stop <id>` — kill process.
  - `pm logs <id>` — show stdout/stderr.
- Use `child_process.spawn`.
- Auto-restart on crash.
- Write logs to files.
- Bonus: graceful shutdown on PM exit.

## 10. Worker Thread Image Processor

- Main thread reads image files.
- Split processing across N worker threads.
- Each worker applies a filter to a portion.
- Results are merged and saved.
- Compare time with single-threaded version.
- Use `SharedArrayBuffer` for zero-copy sharing.
- Measure speedup by worker count.

## 11. Multi-core Cluster Server

- HTTP server that uses all CPU cores via `cluster`.
- Master forks one worker per core.
- Graceful shutdown (SIGTERM → drain → exit).
- Worker health monitoring (restart on crash).
- Request counter per worker.
- `/status` endpoint returns worker stats.
- Benchmark with:
  ```bash
  npx autocannon -c 100 -d 30 http://localhost:3000
  ```

## 12. Custom EventEmitter

- Implement your own `EventEmitter` from scratch.
- Methods:
  - `on(event, listener)` — register.
  - `once(event, listener)` — fire once then remove.
  - `emit(event, ...args)` — trigger all listeners.
  - `off(event, listener)` — remove.
  - `removeAllListeners(event)` — clear.
  - `listeners(event)` — return array.
  - `listenerCount(event)` — count.
- Handle `error` event specially (throw if no listener).
- Support `newListener` / `removeListener` events.

## 13. File Compression Tool

- `node compress.js input.txt output.gz` — gzip compress.
- `node compress.js -d input.gz output.txt` — decompress.
- Use `zlib` with streams:
  ```javascript
  fs.createReadStream(input)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(output));
  ```
- Show compression ratio.
- Support multiple files.
- Bonus: recursive directory compression.

---

# Next Part (Part 14)

We will enter one of the largest sections in the entire JavaScript ecosystem:

# Networking, HTTP, REST APIs, WebSockets, GraphQL, Authentication, Security, Cookies, Sessions, JWT, OAuth, CORS, and API Architecture

This is the foundation of modern backend and full-stack development.
