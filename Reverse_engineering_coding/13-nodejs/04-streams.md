# Streams — Readable, Writable, Transform, Duplex, Backpressure

<img src="https://media.giphy.com/media/10zxDv7Hv5RF9C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem

```javascript
const fs = require('fs');
// Bad: loads entire 5 GB file into memory
fs.readFile('/massive-video.mp4', (err, data) => {
    // data is 5 GB in RAM — server probably crashes
});
```

## The Solution

```javascript
const fs = require('fs');
// Good: processes in 64 KB chunks
const readStream = fs.createReadStream('/massive-video.mp4', {
    highWaterMark: 64 * 1024
});
readStream.on('data', (chunk) => console.log(`Received ${chunk.length} bytes`));
readStream.on('end', () => console.log('Finished reading'));
```

| Approach | Memory Usage |
|----------|-------------|
| `readFile` (5 GB file) | 5 GB + overhead |
| `createReadStream` (64 KB chunks) | ~64 KB + overhead |

~80,000x less memory.

---

## Stream Types

### Readable Streams — Source of data

```javascript
const readStream = fs.createReadStream('file.txt', 'utf8');
readStream.on('data', chunk => process(chunk));
readStream.on('end', () => console.log('Done'));
readStream.on('error', err => console.error(err));
for await (const chunk of readStream) { process(chunk); } // async iterator
```

### Writable Streams — Destination for data

```javascript
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello ');
writeStream.write('World');
writeStream.end();
writeStream.on('finish', () => console.log('Write completed'));
writeStream.on('error', err => console.error(err));
```

### Backpressure

When writable cannot keep up with readable:

```javascript
readable.on('data', (chunk) => {
    const canContinue = writable.write(chunk);
    if (!canContinue) readable.pause();
});
writable.on('drain', () => readable.resume());
```

`writable.write()` returns `false` when internal buffer exceeds `highWaterMark`. Listen for `'drain'` to resume.

### Duplex Streams

```javascript
const net = require('net');
const server = net.createServer(socket => {
    // socket is a Duplex stream
    socket.write('Hello from server\n');
    socket.on('data', data => console.log('Received:', data.toString()));
});
```

### Transform Streams — Modify passing data

```javascript
const { Transform } = require('stream');
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});
process.stdin.pipe(upperCaseTransform).pipe(process.stdout);
```

### Built-in Transforms

```javascript
const zlib = require('zlib');
fs.createReadStream('input.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'));

const crypto = require('crypto');
const key = crypto.randomBytes(32), iv = crypto.randomBytes(16);
fs.createReadStream('input.txt')
    .pipe(crypto.createCipheriv('aes-256-cbc', key, iv))
    .pipe(fs.createWriteStream('input.encrypted'));
```

---

## Pipe

```javascript
readable.pipe(writable);
```

Automatically: data flow (as fast as writable consumes), backpressure (pause/resume), end (ends writable when readable ends). Does NOT forward errors.

### Manual vs pipe

```javascript
// Manual backpressure
readable.on('data', (chunk) => { if (!writable.write(chunk)) readable.pause(); });
writable.on('drain', () => readable.resume());
readable.on('end', () => writable.end());

// Same with pipe — all handled automatically
readable.pipe(writable);
```

### Error Handling

```javascript
// pipe() does NOT forward errors
readStream.on('error', err => console.error('Read error:', err));
writeStream.on('error', err => console.error('Write error:', err));

// Node 10+: pipeline() handles errors + auto-destroy
const { pipeline } = require('stream');
pipeline(
    fs.createReadStream('input.txt'),
    zlib.createGzip(),
    fs.createWriteStream('input.txt.gz'),
    (err) => err ? console.error('Failed:', err) : console.log('Done')
);
```

---

## Stream Modes

### Flowing Mode — data emitted as fast as possible

```javascript
const stream = fs.createReadStream('file.txt');
stream.on('data', (chunk) => { /* chunks arrive automatically */ });
```

### Paused Mode — data must be explicitly read

```javascript
const stream = fs.createReadStream('file.txt');
stream.on('readable', () => {
    let chunk;
    while ((chunk = stream.read()) !== null) { /* manually read */ }
});
```

### Switching Modes

| Action | Result |
|--------|--------|
| `stream.on('data', cb)` | Flowing mode |
| `stream.pause()` | Paused mode |
| `stream.resume()` | Flowing mode |
| `stream.pipe(dest)` | Flowing mode |
| `stream.unpipe(dest)` | May pause if no other destinations |

---

## Q&A

| Question | Answer |
|----------|--------|
| Entire data or chunks? | Entire → `readFile`. Chunks → `createReadStream` |
| Is backpressure handled? | `pipe()` handles it automatically |
| Is data being transformed? | Use `Transform` stream |
| Source faster than destination? | Backpressure: writable buffers, readable pauses |
| Error handling in pipeline? | Use `pipeline()` from `stream` module |
| Flowing or paused? | Depends on listener attachment |
| Who controls pace? | Flowing: source pushes. Paused: consumer pulls |
## Next Steps

[Back to Chapter 3](03-thread-pool.md): Thread Pool — libuv Internals
[Proceed to Chapter 5](05-buffers.md): Buffers — Binary Data Handling to learn about buffers — binary data handling.
