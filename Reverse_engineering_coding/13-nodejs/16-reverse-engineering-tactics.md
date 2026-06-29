# Reverse Engineering Tactics & Projects

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Tactics for Reading Backend Code

### Which module is imported?

Every `require('x')` or `import x from 'x'` reveals the subsystem.

### Which API handles requests?

`http.createServer()`, `Express`, `Koa`, `Fastify`.

### Is operation synchronous?

Sync blocks the entire event loop. Check for `Sync` suffix or `await`.

### Is file I/O involved?

Streams or buffers? Entire file or chunks?

### Is networking involved?

`http`, `net`, `dns` — which protocol?

### Which process executes?

Main thread? Child process? Worker thread?

### Is memory copied?

Buffer copy vs slice (shares memory).

### Are streams used?

If large data, streams should be used. If `readFile` on large data → potential OOM.

### Are buffers used?

Binary data? Encoding matters.

### Is event emitter involved?

Many Node APIs emit events. Check listener count for leaks.

### Is child_process involved?

`exec` (shell, buffered) or `spawn` (streamed)? Memory implications.

### Is worker thread involved?

CPU-bound computation? Shared memory?

### Is cluster involved?

Multi-core scaling? Shared port?

### Is task CPU-bound?

Worker threads or cluster.

### Is task I/O-bound?

Async + thread pool sufficient.

### Is blocking occurring?

Sync function in async path → blocked event loop.

### Which thread pool operation executes?

`fs`, `crypto`, `dns.lookup`.

### Is Event Loop affected?

Long sync code blocks all phases.

### Is backpressure handled?

Streams: `pipe()` handles it. Manual: check `write()` return value + `drain` event.

### Is memory leak possible?

Unclosed streams, growing collections, forgotten timers, leaked listeners.

### Which environment variable controls behavior?

`process.env.X` — check for config via env.

---

## Senior Reverse Coding Tactical Process

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

## Projects

### 1. CLI Todo App
- `node todo.js add "Buy milk"` — add task.
- `node todo.js list` — list all tasks.
- `node todo.js done <id>` — mark complete.
- `node todo.js delete <id>` — remove.
- Store tasks in a JSON file using `fs`. Use `process.argv` for arguments.

### 2. File Explorer
- Recursively list directory tree with `fs.readdirSync`.
- Show file sizes, last modified dates. Filter by extension. Sort by size/name/date.

### 3. HTTP Server
- `node server.js` starts on port 3000. Routes: `GET /`, `GET /about`, `GET /api/time`, `GET /api/headers`, `POST /api/echo`. Proper 404 handling.

### 4. REST API
- CRUD for users: `GET/POST/PUT/DELETE /api/users[/:id]`. Store in JSON file. Validate input. Return proper status codes.

### 5. Chat Server
- TCP-based chat room using `net` module. Clients connect via `telnet` or `nc`. Broadcast messages. Handle disconnections.

### 6. TCP Server
- Custom protocol: `PING` → `PONG`, `TIME`, `ECHO`, `QUIT`. Support multiple clients. Rate limiting.

### 7. Stream-based Video Server
- Serve large video using streams. Support `Range` header for seeking. `206 Partial Content`.

### 8. Mini npm Package
- Create a utility package. Export a function. Include `package.json`, README, tests.

### 9. Process Manager
- `pm start server.js`, `pm list`, `pm stop <id>`, `pm logs <id>`. Use `child_process.spawn`. Auto-restart on crash.

### 10. Worker Thread Image Processor
- Split image processing across N workers. Use `SharedArrayBuffer`. Compare speedup.

### 11. Multi-core Cluster Server
- HTTP server using all cores via `cluster`. Graceful shutdown. Health monitoring. `/status` endpoint.

### 12. Custom EventEmitter
- Implement `on`, `once`, `emit`, `off`, `removeAllListeners`, `listeners`, `listenerCount`. Handle `error` event specially.

### 13. File Compression Tool
- `node compress.js input.txt output.gz`. Use `zlib` with streams. Show compression ratio.

---

*Next: Networking, HTTP, REST APIs, WebSockets, GraphQL, Authentication, Security, Cookies, Sessions, JWT, OAuth, CORS, and API Architecture*
## Next Steps

[Back to Chapter 15](15-package-management.md): Package Management — npm, package.json, Semver, Environment
[Proceed to Module 14](../14-networking/README.md): Networking, HTTP, REST APIs, WebSockets, GraphQL, Security to learn about networking and API development.
