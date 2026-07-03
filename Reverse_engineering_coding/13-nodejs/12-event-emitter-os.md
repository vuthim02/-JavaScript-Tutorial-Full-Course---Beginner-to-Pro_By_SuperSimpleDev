# Event Emitter and OS Module

## The Event Emitter Pattern

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

users.on('login', (data) => {
    console.log(`Audit log: ${data.username} at ${data.timestamp}`);
});

users.on('login', (data) => {
    console.log(`Email sent to ${data.username}`);
});

users.on('logout', (data) => {
    console.log(`Session ended for ${data.username}`);
});

users.login('alice');
users.logout('alice');
```

### Key Methods

```javascript
const emitter = new EventEmitter();

// Register listener
emitter.on('event', handler);           // Alias: addListener
emitter.once('event', handler);         // Fires once then removed

// Remove listener
emitter.off('event', handler);          // Alias: removeListener
emitter.removeAllListeners('event');

// Emit event
emitter.emit('event', arg1, arg2);

// Get listeners
emitter.listeners('event');             // Array of handlers
emitter.listenerCount('event');         // Number of handlers

// Max listeners warning (default 10)
emitter.setMaxListeners(20);
EventEmitter.defaultMaxListeners = 20;  // Global change
```

### Error Handling

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

### Streams are EventEmitters

```javascript
const stream = fs.createReadStream('file.txt');

// All of these are EventEmitter methods:
stream.on('data', handler);
stream.on('end', handler);
stream.on('error', handler);
stream.once('open', handler);
```

### Q&A

| Question | Answer |
|----------|--------|
| Is event emitter involved? | Many Node APIs extend EventEmitter |
| Who listens to which event? | Check `.on()` calls |
| Is there an error listener? | If not, error will crash the process |
| What is max listeners? | Default 10 — warning for potential leaks |

---

## OS Module — System Information

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

### Practical: Cluster Configuration

```javascript
const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Forking ${numCPUs} workers`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    http.createServer(handler).listen(3000);
}
```
## Next Steps

[Back to Chapter 11](11-cluster-worker-threads.md): Cluster and Worker Threads
[Proceed to Chapter 13](13-crypto-dns.md): Crypto and DNS to learn about crypto and dns.
