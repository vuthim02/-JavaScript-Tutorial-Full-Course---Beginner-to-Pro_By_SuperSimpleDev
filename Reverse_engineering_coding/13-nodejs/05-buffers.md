# Buffers — Binary Data Handling

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
Buffer.from('hello', 'base64');
Buffer.from('68656c6c6f', 'hex');

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
buf.write('hello', 0);
buf.write(' ', 5);
buf.write('world', 6);

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
    str += 'a';
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

---

## Q&A

| Question | Answer |
|----------|--------|
| String or binary data? | String → string type. Binary → Buffer |
| Is data mutable? | Strings are immutable. Buffers are mutable |
| What encoding? | Set explicitly to avoid surprises |
| Is Buffer.allocUnsafe safe? | Yes but contains old data — always overwrite before reading |
## Next Steps

[Back to Chapter 4](04-streams.md): Streams — Readable, Writable, Transform, Duplex, Backpressure
[Proceed to Chapter 6](06-file-system.md): File System (fs) and Path Module to learn about file system (fs) and path module.
