# Memory, STDIO, and Signals

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

### Q&A

| Question | Answer |
|----------|--------|
| Is memory usage growing? | Check `process.memoryUsage().heapUsed` over time |
| Are Buffers large? | Check `process.memoryUsage().external` |
| Is GC running frequently? | Profile with `--trace-gc` or `gc-stats` |

---

## STDIN / STDOUT / STDERR

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

### Piping in CLI

```bash
echo "hello" | node app.js   # stdin receives "hello\n"
node app.js < input.txt      # stdin reads from file
node app.js > output.txt     # stdout writes to file
node app.js 2> error.log     # stderr writes to file
```

---

## Signals

```javascript
process.on('SIGINT', () => {
    console.log('\nSIGINT received (Ctrl+C)');
    cleanup();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received — graceful shutdown');
    server.close(() => {
        db.close(() => process.exit(0));
    });
    setTimeout(() => process.exit(1), 10000);
});

process.on('SIGUSR1', () => {
    console.log('SIGUSR1 — reopen log files');
    logger.reopen();
});

// SIGKILL cannot be handled (OS kills immediately)
// SIGSTOP cannot be handled (OS stops immediately)
```

### Common Signals

| Signal | Action | Can Handle? |
|--------|--------|-------------|
| `SIGINT` | Ctrl+C | Yes |
| `SIGTERM` | Termination request (kill default) | Yes |
| `SIGUSR1` | User-defined | Yes |
| `SIGHUP` | Terminal closed | Yes |
| `SIGKILL` | Force kill | No |
| `SIGSTOP` | Stop process | No |
## Next Steps

[Back to Chapter 13](13-crypto-dns.md): Crypto and DNS
[Proceed to Chapter 15](15-package-management.md): Package Management — npm, package.json, Semver, Environment to learn about package management — npm, package.json, semver, environment.
