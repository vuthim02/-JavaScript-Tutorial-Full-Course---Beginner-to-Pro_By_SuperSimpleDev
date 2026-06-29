# Part 13 — Node.js Ecosystem, Runtime Internals, Streams, Buffers, Processes, Networking, and Server Engineering

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


Split into focused subtopic files for easier reference.

## Chapters

| # | File | Topic |
|---|------|-------|
| 01 | [01-node-architecture.md](01-node-architecture.md) | V8 + libuv + Node APIs — the three-layer architecture |
| 02 | [02-event-loop-phases.md](02-event-loop-phases.md) | The six event loop phases, microtasks, timers vs immediate |
| 03 | [03-thread-pool.md](03-thread-pool.md) | libuv thread pool internals, configuration, saturation |
| 04 | [04-streams.md](04-streams.md) | Readable, Writable, Transform, Duplex, backpressure, pipe |
| 05 | [05-buffers.md](05-buffers.md) | Binary data handling, Buffer creation, encoding, pool |
| 06 | [06-file-system.md](06-file-system.md) | File read/write, directories, path module |
| 07 | [07-module-system.md](07-module-system.md) | CommonJS require() internals, ESM, live bindings |
| 08 | [08-process-globals.md](08-process-globals.md) | Global objects, process properties/methods/events, nextTick |
| 09 | [09-networking.md](09-networking.md) | HTTP server, TCP (net), TLS |
| 10 | [10-child-process.md](10-child-process.md) | exec, spawn, execFile, fork |
| 11 | [11-cluster-worker-threads.md](11-cluster-worker-threads.md) | Multi-core scaling with cluster, worker threads |
| 12 | [12-event-emitter-os.md](12-event-emitter-os.md) | EventEmitter pattern, OS system info |
| 13 | [13-crypto-dns.md](13-crypto-dns.md) | Hashing, HMAC, encryption, DNS lookup |
| 14 | [14-memory-stdio-signals.md](14-memory-stdio-signals.md) | V8 memory, STDIO streams, Unix signals |
| 15 | [15-package-management.md](15-package-management.md) | npm/yarn/pnpm, package.json, semver, env vars |
| 16 | [16-reverse-engineering-tactics.md](16-reverse-engineering-tactics.md) | Tactics checklist, projects |

## Usage

Each file is self-contained (100-200 lines) with code examples and Q&A tables.

## Next Steps

[Back to Module 12](../12-v8-engine/README.md): V8 Engine Internals, Memory Management, JIT, Garbage Collection & Performance

[Proceed to Module 14](../14-networking/README.md): Networking, HTTP, REST APIs, WebSockets, GraphQL, Security to learn about networking and API development.
