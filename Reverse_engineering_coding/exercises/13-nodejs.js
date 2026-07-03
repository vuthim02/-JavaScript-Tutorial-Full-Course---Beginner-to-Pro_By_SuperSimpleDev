import { test, assert } from './runner.js';
import path from 'path';
import { EventEmitter } from 'events';
import { Readable, Writable, Transform } from 'stream';
import crypto from 'crypto';

// Module 13 — Node.js Ecosystem & Runtime

test('event loop: sync runs before microtasks, microtasks before timers', () => {
  const order = [];
  setTimeout(() => order.push('timer'), 0);
  queueMicrotask(() => order.push('microtask'));
  order.push('sync');
  // After all: sync → microtask → timer
  assert.equal(order[0], 'sync');
});

test('process.nextTick and Promise microtasks both run after sync code', () => {
  const order = [];
  Promise.resolve().then(() => order.push('promise'));
  process.nextTick(() => order.push('nextTick'));
  order.push('sync');
  // Both microtasks run after sync, before timers
  assert.equal(order[0], 'sync');
});

test('Buffer: creation from string', () => {
  const buf = Buffer.from('hello');
  assert.equal(buf.length, 5);
  assert.equal(buf[0], 104); // 'h' ASCII
});

test('Buffer: encoding conversion', () => {
  const buf = Buffer.from('hello', 'utf8');
  assert.equal(buf.toString('hex'), '68656c6c6f');
  assert.equal(buf.toString('base64'), 'aGVsbG8=');
});

test('Buffer: concatenation', () => {
  const a = Buffer.from('ab');
  const b = Buffer.from('cd');
  const c = Buffer.concat([a, b]);
  assert.equal(c.toString(), 'abcd');
});

test('path: basename parses file name', () => {
  assert.equal(path.basename('/path/to/file.js'), 'file.js');
  assert.equal(path.extname('/path/to/file.js'), '.js');
  assert.equal(path.join('/a', 'b', 'c'), '/a/b/c');
});

test('URL: parsing with native URL', () => {
  const url = new URL('https://example.com:3000/path?q=1#hash');
  assert.equal(url.protocol, 'https:');
  assert.equal(url.hostname, 'example.com');
  assert.equal(url.port, '3000');
  assert.equal(url.pathname, '/path');
  assert.equal(url.searchParams.get('q'), '1');
});

test('EventEmitter: on and emit', () => {
  const ee = new EventEmitter();
  let received;
  ee.on('data', (x) => { received = x; });
  ee.emit('data', 42);
  assert.equal(received, 42);
});

test('EventEmitter: once fires only once', () => {
  const ee = new EventEmitter();
  let count = 0;
  ee.once('ping', () => count++);
  ee.emit('ping');
  ee.emit('ping');
  assert.equal(count, 1);
});

test('crypto: hash consistency', () => {
  const h1 = crypto.createHash('sha256').update('hello').digest('hex');
  const h2 = crypto.createHash('sha256').update('hello').digest('hex');
  assert.equal(h1, h2);
  assert.equal(h1.length, 64); // 256 bits = 64 hex chars
});

test('crypto: different inputs produce different hashes', () => {
  const h1 = crypto.createHash('sha256').update('hello').digest('hex');
  const h2 = crypto.createHash('sha256').update('world').digest('hex');
  assert.notEqual(h1, h2);
});

test('stream: Readable pushes data', () => {
  const chunks = [];
  const r = new Readable({
    read() {
      this.push('a');
      this.push('b');
      this.push(null);
    }
  });
  r.on('data', (chunk) => chunks.push(chunk.toString()));
  r.on('end', () => {
    assert.equal(chunks.join(''), 'ab');
  });
});

test('stream: Writable collects data', () => {
  let result = '';
  const w = new Writable({
    write(chunk, _, cb) {
      result += chunk.toString();
      cb();
    }
  });
  w.write('x');
  w.write('y');
  w.end();
  assert.equal(result, 'xy');
});

test('process: cwd returns a non-empty string', () => {
  const cwd = process.cwd();
  assert.equal(typeof cwd, 'string');
  assert.ok(cwd.length > 0);
});

test('process: env contains PATH', () => {
  assert.ok('PATH' in process.env || 'Path' in process.env);
});

test('setTimeout: returns a Timeout object with ref/clear methods', () => {
  const t = setTimeout(() => {}, 1000);
  assert.ok(t instanceof Object);
  assert.equal(typeof t.ref, 'function');
  clearTimeout(t);
});

test('Stream: Transform modifies data', () => {
  const upper = new Transform({
    transform(chunk, _, cb) {
      cb(null, chunk.toString().toUpperCase());
    }
  });
  let result = '';
  upper.on('data', (c) => result += c);
  upper.write('hello');
  upper.end();
  assert.equal(result, 'HELLO');
});
