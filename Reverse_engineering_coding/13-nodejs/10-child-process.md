# Child Process — Spawning External Programs

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


```javascript
const { exec, spawn, fork, execFile } = require('child_process');
```

---

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

---

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
    console.error(`Error: ${data}`);
});

child.on('close', (code) => {
    console.log(`Child exited with code ${code}`);
});

child.on('error', (err) => {
    console.error('Failed to start:', err);
});
```

**Benefit**: streams data — memory efficient.

---

## execFile() — Execute Binary Directly (No Shell)

```javascript
const { execFile } = require('child_process');

execFile('/usr/bin/python3', ['script.py'], (error, stdout, stderr) => {
    if (error) throw error;
    console.log(stdout);
});
```

Safer than `exec()` because it doesn't spawn a shell (no command injection risk).

---

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

---

## Execution Flow

```
Node Process (parent)
    │
    ├── exec()     → Shell → Command (buffered)
    ├── spawn()    → Command (streamed)
    ├── execFile() → Binary directly (no shell)
    └── fork()     → Node Child (with IPC)
```

---

## Q&A

| Question | Answer |
|----------|--------|
| New process or same process? | `child_process` creates new OS process |
| Is output large? | Use `spawn()` (stream) not `exec()` (buffer) |
| Is shell needed? | No → `spawn` / `execFile` (safer). Yes → `exec` |
| Communication needed? | `fork()` for IPC with Node child |
## Next Steps

[Back to Chapter 9](09-networking.md): Networking — HTTP, TCP (net), TLS
[Proceed to Chapter 11](11-cluster-worker-threads.md): Cluster and Worker Threads to learn about cluster and worker threads.
