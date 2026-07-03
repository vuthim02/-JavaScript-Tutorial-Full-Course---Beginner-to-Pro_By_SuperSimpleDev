# File System (fs) and Path Module

## Reading Files — Three Approaches

```javascript
const fs = require('fs');

// 1. Synchronous — blocks the thread
try { const data = fs.readFileSync('/path/to/file.txt', 'utf8'); }
catch (err) { console.error(err); }

// 2. Callback-based — uses thread pool
fs.readFile('/path/to/file.txt', 'utf8', (err, data) => {
    if (err) { console.error(err); return; }
    console.log(data);
});

// 3. Promise-based — modern, clean
async function readFile() {
    try { const data = await fs.promises.readFile('/path/to/file.txt', 'utf8'); }
    catch (err) { console.error(err); }
}
```

### Execution Flow

```
fs.readFile('/big/file', callback) → Node C++ binding → libuv (uv_fs_open, uv_fs_read) → Thread Pool reads disk → I/O completes → Event Loop poll phase → callback executes
```

| Method | Blocking | Recommended For |
|--------|----------|-----------------|
| `readFileSync` | Yes | Startup config, scripts |
| `readFile` (callback) | No | General use |
| `fs.promises.readFile` | No | Modern code, async/await |

| Q | A |
|---|----|
| Blocking or non-blocking? | Sync blocks, async doesn't |
| Which thread executes? | Thread pool thread (async) or main (sync) |
| What if file is 10 GB? | Use streams — `readFile` loads all into memory |

---

## Writing Files

```javascript
fs.writeFileSync('/path/to/output.txt', 'Hello World');
fs.writeFile('/path/to/output.txt', 'Hello World', callback);
fs.appendFileSync('/path/to/log.txt', 'New log entry\n');
fs.appendFile('/path/to/log.txt', 'New log entry\n', callback);
fs.unlinkSync('/path/to/file.txt');               // Delete
fs.renameSync('/path/to/old.txt', '/path/to/new.txt'); // Rename
fs.copyFileSync('/path/to/source.txt', '/path/to/dest.txt'); // Copy
```

### Watch for changes

```javascript
fs.watch('/path/to/file.txt', (eventType, filename) => {
    console.log(`${filename} changed: ${eventType}`);
});
```

### Flags

```javascript
fs.readFile('/file.txt', { flag: 'r' });   // read (default)
fs.writeFile('/file.txt', data, { flag: 'w' });  // write (overwrite)
fs.writeFile('/file.txt', data, { flag: 'a' });  // append
fs.writeFile('/file.txt', data, { flag: 'wx' }); // write, fail if exists
```

---

## Directories

```javascript
fs.mkdirSync('/path/to/newdir', { recursive: true });  // create (recursive)
const files = fs.readdirSync('/path/to/dir');           // list contents
fs.rmdirSync('/path/to/emptydir');                       // remove (empty)
fs.rmSync('/path/to/dir', { recursive: true, force: true }); // rm -rf
const exists = fs.existsSync('/path/to/file');           // check exists
const stat = fs.statSync('/path/to/file');
console.log(stat.isFile(), stat.isDirectory(), stat.size, stat.mtime);
```

---

## Path Module

```javascript
const path = require('path');

path.join('/users', 'tim', 'docs', 'readme.md');           // '/users/tim/docs/readme.md'
path.resolve('docs/readme.md');                              // absolute path
path.dirname('/users/tim/docs/readme.md');                   // '/users/tim/docs'
path.basename('/users/tim/docs/readme.md');                  // 'readme.md'
path.basename('/users/tim/docs/readme.md', '.md');           // 'readme'
path.extname('/users/tim/docs/readme.md');                   // '.md'

path.parse('/users/tim/docs/readme.md');
// { root: '/', dir: '/users/tim/docs', base: 'readme.md', ext: '.md', name: 'readme' }

path.isAbsolute('/users/tim');       // true
path.isAbsolute('docs/file.txt');    // false
path.normalize('/users/../tmp/./file.txt'); // '/tmp/file.txt'
path.sep;                            // '/' on POSIX, '\\' on Windows
```

### __dirname and __filename

```javascript
console.log(__dirname);  // /current/directory/path (CJS)
console.log(__filename); // /current/directory/path/current-file.js (CJS)

// ESM equivalent:
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```
## Next Steps

[Back to Chapter 5](05-buffers.md): Buffers — Binary Data Handling
[Proceed to Chapter 7](07-module-system.md): Module System — CommonJS (CJS) and ES Modules (ESM) to learn about module system — commonjs (cjs) and es modules (esm).
