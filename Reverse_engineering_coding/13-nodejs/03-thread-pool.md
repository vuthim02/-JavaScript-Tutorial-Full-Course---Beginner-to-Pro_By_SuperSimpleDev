# Thread Pool — libuv Internals

## Default: 4 Threads

```javascript
console.log(process.env.UV_THREADPOOL_SIZE); // undefined (defaults to 4)
```

## Configuring

```bash
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

// 4 operations → 4 threads run in parallel (~250ms each)
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('1'));
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('2'));
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('3'));
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('4'));
// All complete ~250ms

// 5th operation waits for a free thread (~500ms)
crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => logTime('5'));
```

## What Does NOT Use Thread Pool

- **Network I/O** (`http`, `net`) — uses OS async (epoll on Linux, kqueue on macOS, IOCP on Windows).
- **JavaScript execution** — runs on main thread (V8).
- **Timers** — handled by event loop directly.

---

## Shared libuv Architecture

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
│     ▼  Callback queued on Event Loop
└──────────┘
```

---

## Practical: Measuring Thread Pool Saturation

```javascript
const crypto = require('crypto');
const fs = require('fs');

// Run 8 concurrent pbkdf2 operations with default pool (4 threads)
// First 4 run in parallel, next 4 wait
const start = Date.now();
for (let i = 0; i < 8; i++) {
    crypto.pbkdf2('a', 'b', 100000, 64, 'sha512', () => {
        console.log(`#${i}: ${Date.now() - start}ms`);
    });
}

// Increase to UV_THREADPOOL_SIZE=8 to see all 8 complete in ~same time
```

---

## Q&A

| Question | Answer |
|----------|--------|
| Which operations use thread pool? | `fs`, `crypto.pbkdf2`, `crypto.randomBytes`, `dns.lookup` |
| Thread pool vs network I/O? | Network I/O uses OS async (epoll/kqueue), NOT thread pool |
| Is thread pool saturated? | >4 concurrent ops with default = queue |
| Could increasing pool size help? | Yes, for many concurrent I/O ops (not network I/O) |
| What happens when saturated? | Operations queue up, wait for free thread |
## Next Steps

[Back to Chapter 2](02-event-loop-phases.md): Event Loop — The Six Phases
[Proceed to Chapter 4](04-streams.md): Streams — Readable, Writable, Transform, Duplex, Backpressure to learn about streams — readable, writable, transform, duplex, backpressure.
