# Cluster and Worker Threads

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Cluster — Multi-Core Scaling

### The Problem

```javascript
const http = require('http');

http.createServer((req, res) => {
    res.end('Hello');
}).listen(3000);

// Single process → single core used
// Other 7 cores (on 8-core machine) are idle
```

### The Solution: Cluster

```javascript
const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Replace the dead worker
    });

    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Handled by worker ${process.pid}\n`);
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}
```

### How Cluster Works

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

### Graceful Shutdown

```javascript
if (cluster.isMaster) {
    process.on('SIGTERM', () => {
        const workers = Object.values(cluster.workers);
        let completed = 0;

        workers.forEach(worker => {
            worker.on('exit', () => {
                completed++;
                if (completed === workers.length) process.exit(0);
            });
            worker.send('shutdown');
            worker.disconnect();
        });

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

### Q&A

| Question | Answer |
|----------|--------|
| Is the server using all cores? | Check `os.cpus().length` vs number of workers |
| What happens if a worker dies? | Master should fork a replacement |
| Shared state? | Workers don't share memory — use Redis/DB for shared state |

---

## Worker Threads — True Multithreading

### Difference from Cluster

| Feature | Cluster | Worker Threads |
|---------|---------|---------------|
| Process or thread? | Separate processes | Same process, separate threads |
| Memory sharing | No (separate processes) | Yes (SharedArrayBuffer) |
| Startup cost | Higher (new process) | Lower (new thread) |
| Isolation | Full (crash doesn't affect others) | Partial (thread can crash process) |
| Use case | HTTP server scaling | CPU-intensive computation |

### Worker Threads Example

```javascript
// main.js
const { Worker } = require('worker_threads');

function runWorker(data) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: data });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
        });
    });
}

async function main() {
    const result = await runWorker({ iterations: 1000000000 });
    console.log('Result:', result);
}
main();

// worker.js
const { parentPort, workerData } = require('worker_threads');

let count = 0;
for (let i = 0; i < workerData.iterations; i++) count += i;
parentPort.postMessage({ count, threadId: require('worker_threads').threadId });
```

### Shared Memory Between Threads

```javascript
const { Worker, SharedArrayBuffer } = require('worker_threads');

const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker('./worker-shared.js');
worker.postMessage(sharedBuffer);
```

### When to Use

| Scenario | Solution |
|----------|----------|
| HTTP server, I/O-heavy | Cluster (fork processes) |
| CPU-heavy computation | Worker Threads |
| Need memory sharing | Worker Threads (SharedArrayBuffer) |
| Need maximum isolation | Cluster (separate processes) |

### Q&A

| Question | Answer |
|----------|--------|
| CPU-bound? | Worker threads needed |
| I/O-bound? | Async + thread pool is sufficient |
| Shared state needed? | SharedArrayBuffer + Atomics |
| Crash isolation needed? | Use cluster (separate processes) |
## Next Steps

[Back to Chapter 10](10-child-process.md): Child Process — Spawning External Programs
[Proceed to Chapter 12](12-event-emitter-os.md): Event Emitter and OS Module to learn about event emitter and os module.
