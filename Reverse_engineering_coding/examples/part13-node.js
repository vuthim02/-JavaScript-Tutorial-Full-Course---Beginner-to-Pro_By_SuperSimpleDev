/**
 * PART 13 — Node.js: streams, file read/write, HTTP server basics
 * Run with: node part13-node.js
 *
 * NOTE: This file writes to /tmp/ for temporary files.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// ---------------------------------------------------------------
// 1. File read — fs.readFile (async callback)
// ---------------------------------------------------------------

// Read this source file itself
fs.readFile(__filename, 'utf8', (err, data) => {
  if (err) {
    console.error('Read error:', err.message);
    return;
  }
  const lineCount = data.split('\n').length;
  console.log(`Read ${lineCount} lines from this file`);
});

// ---------------------------------------------------------------
// 2. File read — fs.promises (Promise-based)
// ---------------------------------------------------------------

async function readFilePromise() {
  try {
    const data = await fs.promises.readFile(__filename, 'utf8');
    const lines = data.split('\n').length;
    console.log(`[promises] Read ${lines} lines`);
  } catch (err) {
    console.error('Promise read error:', err.message);
  }
}

readFilePromise();

// ---------------------------------------------------------------
// 3. Stream pipe — copy a file using streams
// ---------------------------------------------------------------

// Create a temporary source file first
const tmpDir = '/tmp';
const sourcePath = path.join(tmpDir, 'stream-source.txt');
const destPath = path.join(tmpDir, 'stream-dest.txt');

// Write some content to the source file
fs.writeFileSync(sourcePath, 'Hello from streams!\n'.repeat(100));

// Create a readable stream from source
const readStream = fs.createReadStream(sourcePath, 'utf8');
// Create a writable stream to destination
const writeStream = fs.createWriteStream(destPath);

// Pipe: readable → writable (efficient — doesn't buffer entire file in memory)
readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log(`Stream pipe complete: ${sourcePath} → ${destPath}`);

  // Cleanup
  fs.unlinkSync(sourcePath);
  fs.unlinkSync(destPath);
});

readStream.on('error', err => console.error('Read stream error:', err));
writeStream.on('error', err => console.error('Write stream error:', err));

// ---------------------------------------------------------------
// 4. Transform stream — modify data as it passes through
// ---------------------------------------------------------------

const { Transform } = require('stream');

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Convert each chunk to uppercase
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

const inPath = path.join(tmpDir, 'transform-in.txt');
const outPath = path.join(tmpDir, 'transform-out.txt');

fs.writeFileSync(inPath, 'hello\nworld\nthis is a transform stream\n');

fs.createReadStream(inPath, 'utf8')
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream(outPath))
  .on('finish', () => {
    const output = fs.readFileSync(outPath, 'utf8');
    console.log('Transform stream result:', output.trim());
    // Cleanup
    fs.unlinkSync(inPath);
    fs.unlinkSync(outPath);
  });

// ---------------------------------------------------------------
// 5. Simple HTTP server (run separately; see part14 for full example)
// ---------------------------------------------------------------

// This part just shows the basic structure.
// Uncomment and run to see it work:
//
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello from Node.js!\n');
// });
// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000/');
// });

console.log('Part 13 — Node.js examples loaded');
console.log('See part14-http-server.js for a full HTTP server example');
