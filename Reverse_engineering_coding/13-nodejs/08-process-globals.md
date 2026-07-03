# Global Objects and Process

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

## Process Object

### Properties

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
// { rss: 30_000_000, heapTotal: 10_000_000, heapUsed: 5_000_000,
//   external: 1_000_000, arrayBuffers: 500_000 }

// CPU usage
console.log(process.cpuUsage());
// { user: 50000, system: 30000 }
```

### Methods

```javascript
// Exit with code
process.exit(0);   // Success
process.exit(1);   // Error

// Exit on next tick (graceful)
process.exitCode = 1;

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

### Events

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

### process.nextTick() Deep Dive

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

### Q&A

| Question | Answer |
|----------|--------|
| Which environment variables affect behavior? | `NODE_ENV`, `PORT`, `DATABASE_URL`, `UV_THREADPOOL_SIZE` |
| What is the process ID? | `process.pid` |
| Is shutdown graceful? | Listen to `SIGTERM`, close connections, then exit |
| What runs on next tick? | `process.nextTick()` — highest priority callback queue |
## Next Steps

[Back to Chapter 7](07-module-system.md): Module System — CommonJS (CJS) and ES Modules (ESM)
[Proceed to Chapter 9](09-networking.md): Networking — HTTP, TCP (net), TLS to learn about networking — http, tcp (net), tls.
