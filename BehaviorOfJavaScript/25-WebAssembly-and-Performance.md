# 25 - WebAssembly and Advanced Performance: Complete Research

---

# PART 1 — WebAssembly

---

## 1. What is WebAssembly

WebAssembly (Wasm) is a **binary instruction format** for a stack-based virtual machine, designed as a portable compilation target for languages like C, C++, Rust, Go, and AssemblyScript. It enables near-native execution speed in web browsers alongside JavaScript.

**Key characteristics:**
- **Binary format (`.wasm`):** A compact binary encoding that is faster to decode than JavaScript source code. The binary consists of sections: type, import, function, table, memory, global, export, start, element, code, data, and custom (name) sections.
- **Text format (WAT):** WebAssembly Text Format is a human-readable representation of the binary format. WAT uses S-expression syntax. It is useful for hand-writing small modules, debugging, and understanding what the compiler generates.

**WAT example:**
```wat
(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )
  (export "add" (func $add))
)
```

This compiles to `.wasm` binary and exports an `add` function callable from JavaScript.

**Module structure:**
- **Types section:** Function signatures
- **Import section:** Functions, memories, tables, globals imported from the host
- **Function section:** Maps function indices to type indices
- **Memory section:** Declares linear memories (initial/max size in 64KB pages)
- **Export section:** Makes functions, memories, tables, globals available to the host
- **Code section:** Function bodies (bytecode instructions)
- **Data section:** Initialize portions of linear memory with static data

**How it differs from JavaScript:**
- Wasm is a compilation target, not a language you write directly
- Bypasses parsing and JIT compilation steps that JavaScript requires
- Deterministic performance (no JIT warm-up phase)
- Runs in a sandboxed linear memory model
- Cross-browser standard (W3C Recommendation since 2019)

---

## 2. WebAssembly in JavaScript: compile, instantiate

The JavaScript API provides several methods to work with WebAssembly modules:

### WebAssembly.compile(bytes)
Compiles WebAssembly binary code into a `WebAssembly.Module` object. Useful when you need to compile a module once and instantiate it multiple times (e.g., sending to workers via `postMessage`).

```javascript
fetch("module.wasm")
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.compile(bytes))
  .then(module => {
    const instance = new WebAssembly.Instance(module);
    instance.exports.myFunction();
  });
```

### WebAssembly.instantiate(bytes, importObject)
The most common API — compiles and instantiates in one step. Takes raw bytes and an optional import object, returns a Promise resolving to `{ module, instance }`.

```javascript
const importObject = {
  js: {
    log: (msg) => console.log(msg)
  }
};

WebAssembly.instantiateStreaming(fetch("module.wasm"), importObject)
  .then(({ instance }) => {
    instance.exports.hello();
  });
```

### WebAssembly.instantiateStreaming(source, importObject)
The **most efficient** method — performs streaming compilation directly on the raw byte stream from the network, eliminating the ArrayBuffer intermediate step. Requires the response to have `Content-Type: application/wasm`.

```javascript
const { instance } = await WebAssembly.instantiateStreaming(
  fetch("module.wasm"),
  importObject
);
instance.exports.main();
```

### WebAssembly.compileStreaming(source)
Compiles without instantiating — useful for caching compiled modules.

### Two overload forms of instantiate
1. `WebAssembly.instantiate(bytes, importObject)` — compiles from bytes, returns `{ module, instance }`
2. `WebAssembly.instantiate(module, importObject)` — instantiates a pre-compiled module, returns `{ instance }`

### Loading via XMLHttpRequest
```javascript
const request = new XMLHttpRequest();
request.open("GET", "simple.wasm");
request.responseType = "arraybuffer";
request.onload = () => {
  WebAssembly.instantiate(request.response, importObject).then(results => {
    results.instance.exports.exported_func();
  });
};
request.send();
```

---

## 3. Loading .wasm Files

**Methods to load WebAssembly modules:**

1. **Fetch + instantiateStreaming (recommended):**
```javascript
const { instance } = await WebAssembly.instantiateStreaming(
  fetch("module.wasm"),
  importObject
);
```

2. **Fetch + arrayBuffer + instantiate:**
```javascript
const response = await fetch("module.wasm");
const bytes = await response.arrayBuffer();
const { instance } = await WebAssembly.instantiate(bytes, importObject);
```

3. **Compile + transfer to worker:**
```javascript
const module = await WebAssembly.compile(bytes);
worker.postMessage(module); // Module is serializable
```

4. **Inline via base64 (not recommended for large modules):**
```javascript
const wasmBytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
const { instance } = await WebAssembly.instantiate(wasmBytes, importObject);
```

**Important considerations:**
- The `application/wasm` MIME type must be served for streaming compilation
- CORS headers must be correct for cross-origin modules
- Modules are cacheable via standard HTTP caching mechanisms
- `WebAssembly.Module` is serializable — can be sent to workers via `postMessage`
- For production, serve `.wasm` files compressed (Brotli/gzip)

---

## 4. Memory Management: WebAssembly.Memory

WebAssembly uses **linear memory** — a contiguous, mutable, byte-addressable array of bytes that grows over time. This is the primary mechanism for data exchange between JavaScript and Wasm.

### Creating Memory
```javascript
const memory = new WebAssembly.Memory({
  initial: 10,  // 10 pages × 64KB = 640KB initial
  maximum: 100  // 100 pages × 64KB = 6.4MB maximum
});
```

- **initial:** Required. Starting size in 64KB pages.
- **maximum:** Optional. Upper bound. Allows engines to reserve memory upfront for efficient growing.
- **shared:** If `true`, memory uses `SharedArrayBuffer` for multi-threading.

### Accessing the buffer
```javascript
const buffer = memory.buffer;          // Returns ArrayBuffer
const view = new Uint8Array(buffer);   // Typed array view
view[0] = 42;                          // Write byte
```

### Growing memory
```javascript
const previousPages = memory.grow(5);  // Grow by 5 pages (320KB)
console.log(memory.buffer.byteLength); // New total size
```

**Critical detail:** After `grow()`, the previous `ArrayBuffer` is **detached** (zero length). You must re-create typed array views from `memory.buffer` after any grow operation.

### Memory from WebAssembly side
```wat
(module
  (memory (export "mem") 1 100)
  ;; Memory can now be accessed from JavaScript via exports.mem
)
```

### Multiple memories (newer feature)
```wat
(module
  (memory $mem0 1)
  (memory $mem1 1)
  (memory $mem2 1)
  (export "memory2" (memory $mem2))
)
```

### Shared memory (for threads)
```javascript
const sharedMemory = new WebAssembly.Memory({
  initial: 10,
  maximum: 100,
  shared: true
});
// memory.buffer returns SharedArrayBuffer
```

### Bulk memory operations
New instructions for efficient data manipulation:
- `memory.copy` — memcpy equivalent
- `memory.fill` — memset equivalent
- `memory.init` — copy from data segment
- `data.drop` — discard data segment contents

---

## 5. Importing/Exporting Functions

WebAssembly modules communicate with the host through imports and exports, similar to ES modules.

### Exporting functions from Wasm
```wat
(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )
  (func (export "multiply") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.mul
  )
)
```

Calling from JavaScript:
```javascript
const result = instance.exports.multiply(3, 4);  // 12
```

### Importing functions from JavaScript
```wat
(module
  (import "env" "log" (func $log (param i32)))
  (import "env" "read" (func $read (result i32)))
  
  (func (export "main")
    call $read
    call $log
  )
)
```

```javascript
const importObject = {
  env: {
    log: (value) => console.log("Wasm says:", value),
    read: () => Date.now()
  }
};
```

### Importing/exporting other entities
- **Memories:** Share linear memory between JS and Wasm
- **Tables:** Function reference tables (used for indirect calls)
- **Globals:** Mutable or immutable global values
- **Constants:** Imported string constants (newer feature)

### Calling exported functions with correct types
```javascript
// Exported functions accept and return specific types
instance.exports.add_i32(1, 2);        // i32
instance.exports.add_f64(1.5, 2.5);    // f64
```

---

## 6. WebAssembly with C/C++/Rust

### C/C++ via Emscripten
Emscripten is the original WebAssembly toolchain, using LLVM to compile C/C++ to Wasm.

```bash
# Install Emscripten SDK
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk && ./emsdk install latest && ./emsdk activate latest

# Compile C++ to Wasm
em++ src/main.cpp -O3 -s MODULARIZE -s EXPORT_ES6 \
  -s ALLOW_MEMORY_GROWTH \
  -s EXPORTED_FUNCTIONS=_main,_process \
  -o web/main.mjs
```

Key flags:
- `-O3`: Optimization level
- `-s MODULARIZE`: Generate module factory function
- `-s EXPORT_ES6`: ES module output
- `-s ALLOW_MEMORY_GROWTH`: Let heap expand at runtime
- `-s EXPORTED_FUNCTIONS`: Functions callable from JS (leading underscore required)

### Rust via wasm-pack
Rust has the most mature Wasm toolchain, producing lean binaries without garbage collector overhead.

```bash
# Install wasm-pack
cargo install wasm-pack

# Create project
cargo new --lib my-wasm-project
cd my-wasm-project

# Build for web
wasm-pack build --target web
```

**Rust source (src/lib.rs):**
```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

**Cargo.toml:**
```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

**Using in JavaScript:**
```javascript
import init, { add } from './pkg/my_wasm_project.js';

await init();
console.log(add(1, 2));  // 3
```

### When to choose which:
| Factor | Rust + wasm-pack | C/C++ + Emscripten |
|--------|-----------------|-------------------|
| Binary size | Smallest | Larger (POSIX compat layer) |
| Performance | Best | Excellent |
| Ecosystem maturity | High | Very high |
| Learning curve | Steeper (ownership model) | Familiar to C/C++ devs |
| Best for | New projects | Porting existing codebases |

---

## 7. AssemblyScript

AssemblyScript is a **TypeScript-like language** that compiles directly to WebAssembly. It offers the lowest barrier to entry for JavaScript developers.

```typescript
// assembly/index.ts
export function fibonacci(n: i32): i32 {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function factorial(n: i32): i32 {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

**Setup:**
```bash
npm init -y
npm install --save-dev assemblyscript
npx asinit . --yes
# Write code in assembly/
npx asc assembly/index.ts --outFile build/module.wasm
```

**Using in JavaScript:**
```javascript
const wasm = await WebAssembly.instantiateStreaming(
  fetch("build/module.wasm")
);
const { fibonacci, factorial } = wasm.instance.exports;
console.log(fibonacci(10));  // 55
```

**Key characteristics:**
- Uses TypeScript syntax but compiles to Wasm, not JavaScript
- Has explicit Wasm types: `i32`, `i64`, `f32`, `f64`
- No garbage collector by default (manual memory management)
- Produces larger binaries than Rust/C++
- Trade-off: lower barrier to entry, less mature ecosystem
- Best for simple performance-critical modules

---

## 8. Emscripten

Emscripten is the original and most established toolchain for compiling C/C++ to WebAssembly, using LLVM and Binaryen.

### Core workflow
```bash
# Single file compilation
emcc main.c -O2 -o output.js

# With HTML output
emcc main.c -O2 -o output.html

# Standalone Wasm
emcc main.c -O2 -s STANDALONE_WASM -o output.wasm
```

### Using emmake with build systems
```bash
emconfigure cmake .
emmake make
emcc project.o -o project.js -O2
```

### Key Emscripten features
- **POSIX compatibility:** Emulates file system, pthreads, networking on top of browser APIs
- **SDL/OpenGL support:** Port games and graphics applications
- **Memory management:** Automatic heap management with `_malloc` and `_free`
- **Embden:** C++ object binding to JavaScript
- **Asyncify:** Allows synchronous-looking code to yield to the event loop
- **WASM_BIGINT:** BigInt support for 64-bit integers
- **MINIMAL_RUNTIME:** Reduces output size for simple applications

### Loading Emscripten output
```javascript
// With MODULARIZE
const Module = await createModule();
Module._myFunction(ptr, length);

// Access heap directly
const data = new Uint8Array(Module.HEAPU8);
const floatData = new Float64Array(Module.HEAPF64);
```

---

## 9. wasm-pack

wasm-pack is Rust's **one-stop tool** for building, testing, and publishing WebAssembly packages.

### Commands
```bash
wasm-pack new my-project          # Create new project
wasm-pack build --target web      # Build for browser
wasm-pack build --target nodejs   # Build for Node.js
wasm-pack build --target bundler  # Build for Webpack/Vite
wasm-pack test --headless --chrome # Run browser tests
wasm-pack pack                    # Create npm tarball
wasm-pack publish                 # Publish to npm
```

### Build targets
| Target | Usage | Description |
|--------|-------|-------------|
| `bundler` (default) | Webpack/Vite | ES module imports, bundler handles Wasm loading |
| `web` | Native browser | ES module, manual Wasm instantiation |
| `nodejs` | Node.js | CommonJS, for `require()` |
| `no-modules` | Global script | Modifies global state, limited features |
| `deno` | Deno runtime | ES module for Deno |

### What wasm-pack generates
```
pkg/
├── my_project_bg.wasm       # The Wasm binary
├── my_project.js             # JavaScript glue code
├── my_project.d.ts           # TypeScript definitions
├── package.json              # npm package config
└── README.md
```

### Key features
- Automatic JavaScript binding generation via wasm-bindgen
- TypeScript definitions
- npm publishing support
- Integration with wasm-bindgen test framework
- Support for wasm64 (64-bit memory) with nightly Rust

---

## 10. Use Cases

WebAssembly excels at **CPU-bound, computation-heavy workloads** where JavaScript struggles:

| Use Case | Wasm Advantage | Examples |
|----------|---------------|----------|
| **Image processing** | 3-5x faster than JS for pixel manipulation | Squoosh (Google), Sharp |
| **Video encoding/decoding** | Near-native speed, real-time possible | ffmpeg.wasm |
| **Cryptography** | 2-4x faster, constant-time operations | AES, SHA, Argon2 |
| **Game physics** | Smooth at 10K entities (JS drops at 1K) | Bullet physics, Rapier |
| **CAD/3D modeling** | Computational geometry, mesh operations | AutoCAD Web, Onshape |
| **Data compression** | 2-3x faster than JS | zlib, Brotli, LZ4 in browser |
| **Scientific computing** | Large dataset processing, numerical simulations | Pyodide (Python in browser) |
| **AI/ML inference** | Privacy (local data), low latency | ONNX Runtime Web, TensorFlow.js |
| **Database** | Full SQL engine in browser | sql.js (SQLite), PocketBase |

### Performance comparison (Wasm vs JS):
| Task | JavaScript (V8) | WebAssembly | Winner |
|------|-----------------|-------------|--------|
| Image resizing (4K) | 250ms | 45ms | Wasm (5x) |
| Video encoding | Not viable | Real-time possible | Wasm |
| JSON parsing | Very fast (native) | Slower (copy overhead) | JS |
| DOM manipulation | Fast | Slow (via JS glue) | JS |
| String manipulation | Often faster | Copy overhead | JS |
| Physics simulation | Frame drops at 1K entities | Smooth at 10K | Wasm |

### Popular Wasm applications:
- **Google Earth** — Heavy 3D rendering and geospatial computation
- **Figma** — Collaborative design tool, rendering performance
- **AutoCAD Web** — Full CAD suite in the browser
- **Adobe Photoshop Web** — Image processing engine
- **Emscripten games** — Unity, Unreal Engine web builds

### When NOT to use Wasm:
- I/O-bound tasks
- Frequent JavaScript interop (marshaling overhead negates gains)
- DOM manipulation
- Simple string/JSON processing
- Small, fast computations where JIT-optimized JS is sufficient

---

## 11. WASI (WebAssembly System Interface)

WASI is a **modular system interface** that gives WebAssembly modules controlled access to operating system features beyond the browser sandbox.

### WASI versions
- **Preview 1 (p1):** POSIX-like functions — file I/O, environment variables, random numbers. No networking or threading.
- **WASI 0.2 (Preview 2):** Integrated with Component Model. Added `wasi:http`, `wasi:cli`, `wasi:filesystem`, `wasi:sockets`, `wasi:random`, `wasi:io`.
- **WASI 0.3 (2025):** Native async support via Component Model async primitives. `stream`, `future`, and `async` as first-class constructs.

### WASI worlds (0.2+)
- `wasi:http/proxy` — HTTP proxy handler
- `wasi:cli` — Command-line interface
- `wasi:sockets` — TCP/UDP networking
- `wasi:filesystem` — File system access
- `wasi:random` — Cryptographic randomness

### Capability-based security
WASI follows the **principle of least privilege** — modules only receive access to resources explicitly granted at instantiation:
```javascript
// Conceptual: WASI runtime grants specific capabilities
const wasi = new WASI({
  args: ['program', 'arg1'],
  env: { HOME: '/home/user' },
  preopens: { '/data': '/data' }  // Only /data accessible
});
```

### Running WASI modules
```bash
# With Wasmtime
wasmtime program.wasm --dir=.::./data

# With wasmer
wasmer run program.wasm --dir=.
```

### Use cases beyond the browser:
- Serverless/edge computing (Fastly, Cloudflare Workers)
- Plugin systems (envoy proxy, Shopify functions)
- Embedded/IoT devices
- Blockchain smart contracts
- Portable CLI tools

---

## 12. Component Model

The Component Model is a **specification layered atop core WebAssembly** that defines how Wasm binaries bundle, link, and communicate.

### Core concepts
- **Components:** Wasm binaries conforming to the Component Model spec
- **Interfaces (WIT):** WebAssembly Interface Type — IDL for defining component boundaries
- **Interoperability:** Components communicate over strictly-defined interfaces regardless of source language
- **Composability:** Multiple components can be combined into a single component

### WIT (WebAssembly Interface Type) example
```wit
package example:image-processor;

interface resize {
    record dimensions {
        width: u32,
        height: u32,
    }
    
    resize-image: func(
        image-data: list<u8>,
        target: dimensions,
    ) -> result<list<u8>, string>;
}

world image-processor {
    export resize;
}
```

### How components work together
```
┌─────────────────┐     ┌─────────────────┐
│  Rust Component  │────▶│  JS Component   │
│  (image resize)  │◀────│  (UI handling)  │
└─────────────────┘     └─────────────────┘
         │                       │
         ▼                       ▼
┌──────────────────────────────────────┐
│        Composed Component            │
│    (single binary, shared memory)    │
└──────────────────────────────────────┘
```

### Key benefits
- Language-agnostic: Rust calls C calls Python calls Go
- Process-level composition (nanoseconds vs network milliseconds)
- Capability-based security
- OCI packaging standard
- Backwards compatibility guarantees (P1 modules still work)

### Tools
- **Wasmtime:** Reference runtime with full Component Model support
- **wasm-tools:** CLI for component manipulation
- **wasmCloud:** Platform for running components at scale
- **jco:** JavaScript Component Model toolchain

---

## 13. WebAssembly Threads

### Threads Proposal (Phase 4 — standardized)
Adds **shared linear memory** and **atomic operations** for concurrent execution.

**Shared memory:**
```javascript
const memory = new WebAssembly.Memory({
  initial: 10,
  maximum: 100,
  shared: true  // Enables SharedArrayBuffer
});
```

**Atomic operations in WAT:**
```wat
(memory.atomic.load32 align=4 (i32.const 0))
(memory.atomic.store32 align=4 (i32.const 0) (local.get $value))
(memory.atomic.wait32 (i32.const 0) (local.get $expected) (i64.const -1))
(memory.atomic.notify (i32.const 0) (local.get $count))
```

**How threads work in practice:**
- Browsers create Web Workers, each sharing the same `SharedArrayBuffer`
- Emscripten's `-pthread` flag automates this: creates worker pool, maps pthreads
- Requires `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers

### Shared-Everything Threads (Draft proposal)
A more advanced proposal beyond the basic threads proposal:
- `shared` annotations on tables, functions, globals, tags
- Thread-local globals for TLS (Thread-Local Storage)
- Instructions for sequentially consistent and release-acquire access to WasmGC data
- Managed waiter queues (futex-like wait/notify)
- Component Model builtins for thread lifecycle
- Enables shared references for WasmGC programs (Java, Kotlin, etc.)

---

## 14. SIMD in WebAssembly

SIMD (Single Instruction, Multiple Data) provides **128-bit vector operations** for parallel data processing.

### Supported operations
- **Integer vectors:** 4×i32 or 2×i64 operations
- **Float vectors:** 4×f32 or 2×f64 operations
- Packed arithmetic, comparisons, conversions
- Load/store with alignment hints

### Example WAT with SIMD
```wat
(module
  (func $add_f32x4 (param $a v128) (param $b v128) (result v128)
    local.get $a
    local.get $b
    f32x4.add
  )
)
```

### Performance impact
- **Image processing:** 2-4x speedup
- **Cryptography:** AES, SHA operations
- **Physics simulations:** Parallel vector math
- **Audio processing:** Parallel sample processing

### Browser support
All major browsers support 128-bit SIMD:
- Chrome 91+
- Firefox 89+
- Safari 16.4+

### Rust SIMD example
```rust
use std::arch::wasm32::*;

pub fn add_vectors(a: &[f32], b: &[f32], result: &mut [f32]) {
    for i in (0..a.len()).step_by(4) {
        unsafe {
            let va = v128_load(a.as_ptr().add(i) as *const _);
            let vb = v128_load(b.as_ptr().add(i) as *const _);
            let vr = f32x4_add(va, vb);
            v128_store(result.as_mut_ptr().add(i) as *mut _, vr);
        }
    }
}
```

---

## 15. WebAssembly GC Proposal

The GC (Garbage Collection) proposal enables **languages with managed memory** (Java, Kotlin, Dart, C#) to compile to Wasm without shipping their own garbage collector.

### What it provides
- **Struct types:** Heap-allocated objects with typed fields
- **Array types:** Typed arrays on the GC heap
- **Reference types:** `ref`, `ref.null`, `ref.func`, `ref.i31`
- **Type hierarchy:** Subtyping for struct/array types
- **Exception handling:** try/catch in Wasm
- **Static arrays:** Constant data arrays

### Benefits
- **Smaller binaries:** No need to include GC implementation
- **Better performance:** Native GC integration
- **Enables new languages:** Kotlin/JS, Dart/Flutter Web, Java
- **DOM access:** Reference types allow passing DOM nodes to Wasm

### Browser support
- Chrome 119+ (shipped)
- Firefox (behind flag, shipping soon)
- Safari (in development)

### Post-MVP plans
- Shared references for threading
- Weak references
- Method overloading
- Finalizers/destructors

### Kotlin/Wasm example
```kotlin
// Kotlin code that compiles to WasmGC
fun fibonacci(n: Int): Int {
    if (n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// Can interact with DOM directly
fun updateUI() {
    document.getElementById("result")?.textContent = fibonacci(10).toString()
}
```

---

# PART 2 — Advanced Performance

---

## 16. Performance API

The Performance API provides **high-resolution timing** for measuring code execution, resource loading, and user experience metrics.

### performance.now()
Returns a `DOMHighResTimeStamp` (sub-millisecond precision) — time since page navigation start.

```javascript
const start = performance.now();
// ... work ...
const duration = performance.now() - start;
console.log(`Took ${duration.toFixed(2)}ms`);
```

**Precision:** Typically microsecond resolution (1/1000th ms), but browsers may reduce precision for security (Spectre mitigations). Some browsers limit to 100μs or 1ms resolution.

### performance.mark(name)
Creates a named timestamp in the browser's performance timeline:

```javascript
performance.mark("start-fetch");
const response = await fetch("/api/data");
performance.mark("end-fetch");
```

### performance.measure(name, start, end)
Calculates duration between two marks (or navigation start):

```javascript
performance.measure("fetch-duration", "start-fetch", "end-fetch");

const entries = performance.getEntriesByName("fetch-duration");
console.log(entries[0].duration);  // Time in ms
```

### performance.getEntries()
Returns all recorded performance entries:
```javascript
const allEntries = performance.getEntries();
const marks = performance.getEntriesByType("mark");
const measures = performance.getEntriesByType("measure");
```

### Using in React for component profiling
```javascript
function SlowComponent() {
  React.useEffect(() => {
    performance.mark("slow-component-mount");
    // ... expensive setup ...
    performance.measure(
      "slow-component-mount",
      "slow-component-mount"
    );
    
    return () => {
      performance.mark("slow-component-unmount");
    };
  }, []);
  
  return <div>...</div>;
}
```

### Clearing entries
```javascript
performance.clearMarks("start-fetch");
performance.clearMeasures("fetch-duration");
performance.clearMarks();    // Clear all marks
performance.clearMeasures(); // Clear all measures
```

---

## 17. PerformanceObserver

`PerformanceObserver` listens for **performance entry events** as they occur, enabling real-time monitoring of LCP, FID, CLS, long tasks, and more.

### Observing Largest Contentful Paint (LCP)
```javascript
const lcpObserver = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log("LCP:", lastEntry.startTime);
  console.log("LCP Element:", lastEntry.element);
});
lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
```

### Observing First Input Delay (FID) / Interaction to Next Paint (INP)
```javascript
const inpObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log("Interaction:", entry.name);
    console.log("Input delay:", entry.processingStart - entry.startTime);
    console.log("Processing time:", entry.processingEnd - entry.processingStart);
    console.log("Presentation delay:", entry.startTime + entry.duration - entry.processingEnd);
  }
});
inpObserver.observe({ type: "event", buffered: true });
```

### Observing Cumulative Layout Shift (CLS)
```javascript
let clsScore = 0;
const clsObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsScore += entry.value;
    }
  }
  console.log("CLS:", clsScore);
});
clsObserver.observe({ type: "layout-shift", buffered: true });
```

### Observing Long Tasks
```javascript
const longTaskObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.warn("Long task:", entry.duration, "ms");
    console.log("Attribution:", JSON.stringify(entry.attribution));
  }
});
longTaskObserver.observe({ entryTypes: ["longtask"] });
```

### Observing resource loads
```javascript
const resourceObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.initiatorType === "script") {
      console.log(`${entry.name}: ${entry.duration.toFixed(1)}ms`);
    }
  }
});
resourceObserver.observe({ type: "resource", buffered: true });
```

---

## 18. Core Web Vitals Deep Dive

Core Web Vitals are Google's **metrics for measuring real-world user experience**. They are ranking factors in Google Search.

### Largest Contentful Paint (LCP)
**Measures:** When the largest visible element finishes rendering.

**Thresholds:**
| Rating | Threshold |
|--------|-----------|
| Good | < 2.5s |
| Needs Improvement | 2.5s – 4.0s |
| Poor | > 4.0s |

**Four LCP phases:**
1. **Time to First Byte (TTFB):** Server response time
2. **Resource load delay:** Gap between TTFB and when browser starts fetching LCP resource
3. **Resource load duration:** Download time of LCP resource
4. **Element render delay:** Time between resource finish and actual paint

**Common LCP elements:** Hero images, heading text, video posters

**Optimization:**
- Use `fetchpriority="high"` on LCP image
- Preload LCP resource: `<link rel="preload" as="image" href="hero.webp">`
- Serve optimized formats (AVIF/WebP)
- Eliminate render-blocking resources
- Use CDN for fast TTFB
- Never apply `loading="lazy"` to LCP image

### Interaction to Next Paint (INP)
**Measures:** Latency of the **worst** user interaction during page lifecycle. Replaced FID on March 12, 2024.

**Thresholds:**
| Rating | Threshold |
|--------|-----------|
| Good | < 200ms |
| Needs Improvement | 200ms – 500ms |
| Poor | > 500ms |

**INP three phases:**
1. **Input Delay:** Time from user input to event handler start
2. **Processing Time:** Event handler execution time
3. **Presentation Delay:** Time from handler end to next paint

**Why INP > FID:** FID only measured the delay before processing started. INP measures the **full latency** for every interaction, reporting roughly the worst.

**Optimization:**
- Break long tasks (>50ms) into smaller chunks
- Use `scheduler.yield()` to yield to browser between chunks
- Avoid synchronous DOM reads/writes
- Reduce DOM size for faster style/layout calculations

### Cumulative Layout Shift (CLS)
**Measures:** Visual stability — unexpected layout movement.

**Thresholds:**
| Rating | Threshold |
|--------|-----------|
| Good | < 0.1 |
| Needs Improvement | 0.1 – 0.25 |
| Poor | > 0.25 |

**CLS calculation:** Impact fraction × Distance fraction for each shift within 5-second windows.

**Common causes:**
- Images without dimensions (`width`/`height`)
- Web fonts causing FOUT/FOIT
- Dynamically injected content (ads, banners)
- Late-loading CSS/JavaScript

**Optimization:**
- Set explicit `width`/`height` on images and videos
- Use `aspect-ratio` CSS property
- Reserve space for ads/embeds
- Use `font-display: swap` with matching fallback font
- Use `content-visibility: auto` with `contain-intrinsic-size`

---

## 19. Lighthouse

Lighthouse is Google's **automated tool for auditing web page quality** across Performance, Accessibility, Best Practices, and SEO.

### Lighthouse 12 (2024+)
- **Four categories:** Performance, Accessibility, Best Practices, SEO (PWA removed in Lighthouse 12)
- **Insights audits** replace traditional performance audits (sharing code with DevTools Insights sidebar)

### Performance score calculation
| Metric | Weight |
|--------|--------|
| Largest Contentful Paint (LCP) | 25% |
| Total Blocking Time (TBT) | 30% |
| Cumulative Layout Shift (CLS) | 25% |
| First Contentful Paint (FCP) | 10% |
| Speed Index | 10% |

**Note:** INP is measured via TBT in lab environments — Lighthouse cannot run interactive profiles.

### Key audits and their fixes

**Render-blocking requests:**
- Identify CSS/JS blocking first paint
- Use `async`/`defer` on scripts
- Inline critical CSS
- Use `media` attributes on non-critical stylesheets

**LCP by phase:**
- Breaks LCP into 4 subparts
- Points at specific fix for each phase

**Layout shift culprits:**
- Identifies elements causing CLS
- Shows element movement screenshots

**Optimize DOM size:**
- Reports total DOM nodes and nesting depth
- Flags expensive style/layout recalculation

**Forced reflow:**
- Interleaved DOM reads and writes
- Most common cause: scroll handlers doing DOM manipulation

**3rd parties:**
- Categorizes resources by entity
- Shows CPU time consumed by each

### Running Lighthouse
```bash
# CLI
lighthouse https://example.com --preset=experimental --output=html

# In Chrome DevTools
# Open DevTools → Lighthouse tab → Select categories → Analyze page load

# Programmatic
const lighthouse = require('lighthouse');
const { lhr } = await lighthouse(url, { port: new URL('chrome://debugger').port });
```

---

## 20. Chrome DevTools Performance Panel

The Performance panel provides **CPU profiling, flame charts, and bottleneck analysis** for web applications.

### Recording
1. Open DevTools → Performance tab
2. Click "Record and reload" (Cmd+Shift+E / Ctrl+Shift+E) for page load analysis
3. Click "Record" for interaction analysis
4. Interact with the page for 30-60 seconds
5. Click "Stop"

### Key tracks in the timeline
| Track | Shows |
|-------|-------|
| **Web Vitals** | LCP markers, CLS regions, INP events |
| **Screenshots** | Visual progress filmstrip |
| **Main** | JavaScript execution flame chart, long tasks |
| **Network** | Resource load timing waterfall |
| **Interactions** | Per-interaction latency with 3-phase breakdown |
| **Memory** | Heap allocation graph |

### Reading the flame chart
- **X-axis:** Time
- **Y-axis:** Call stack depth
- **Colors:** Different script origins (green = script, yellow = layout, purple = paint)
- **Gray bars with red triangle:** Long tasks (>50ms)
- Click any bar to see function details in bottom pane

### Insights sidebar (Chrome 134+)
Brings Lighthouse insights directly into the Performance panel:
- **LCP by phase** — breakdown of LCP subparts with timeline overlay
- **LCP request discovery** — when LCP image could have started loading
- **Render-blocking requests** — resources delaying first paint
- **Forced reflow** — interleaved DOM reads/writes
- **INP by phase** — interaction breakdown (input delay, processing, presentation)
- **3rd parties** — resource and CPU attribution by entity
- **Network dependency tree** — request chains affecting loading
- **Layout shift culprits** — elements causing CLS

### CPU throttling
- **4x slowdown:** Mid-range Android (default for Lighthouse mobile)
- **6x slowdown:** Low-end device simulation
- Access: Performance panel → gear icon → CPU throttling

### Analyzing a long task
1. Find the long task (gray bar with red triangle) in Main track
2. Click to expand the flame chart
3. Click the most expensive function call
4. Bottom pane shows source file and line
5. Switch to **Bottom-Up** tab (sorted by Self Time) to find root cause

---

## 21. Memory Profiling

### Heap Snapshots
Take point-in-time snapshots of the JavaScript heap:

1. Open DevTools → Memory tab
2. Select "Heap snapshot" → Take snapshot
3. Analyze objects by constructor, retainers, size

**Key columns:**
- **Constructor:** Object type
- **Distance:** Distance from GC root (shorter = more reachable)
- **Retained size:** Memory that would be freed if object was GC'd
- **Shallow size:** Direct memory of the object itself

**Detecting memory leaks:**
1. Take snapshot A (baseline)
2. Perform action that should release memory
3. Force GC (click trash icon)
4. Take snapshot B
5. Compare A → B: objects that grew = potential leak

### Allocation Timeline
Records memory allocation over time:

1. Select "Allocation instrumentation on timeline"
2. Record, perform actions
3. See allocation spikes correlated with user actions
4. Blue bars = live objects, gray = GC'd

### Detached DOM trees
A major memory leak source — DOM elements removed from the document but still referenced in JavaScript:

```
# In heap snapshot, search for "(detached)"
# Red "(detached) HTMLDivElement" = leaked DOM node
# Check Retainers tab to find what's holding the reference
```

**Common causes:**
- Event listeners not removed when components unmount
- Closures holding references to DOM elements
- Global arrays/maps storing DOM references
- Intersection Observers not disconnected

### React-specific profiling
- Use React DevTools Profiler to track component renders
- Check for components that re-render unnecessarily
- Use `React.memo`, `useMemo`, `useCallback` to prevent unnecessary work

---

## 22. CPU Profiling

### JavaScript CPU profiling
1. Performance tab → Record settings → Enable "JavaScript samples"
2. Record page load or interaction
3. View flame chart for JavaScript execution time

### Key metrics
- **Total time:** Full duration of recorded profile
- **Self time:** Time spent in a function itself (not children)
- **Total time (inclusive):** Time including child function calls
- **URL:** Source file location

### Finding bottlenecks
1. **Bottom-Up tab** — sorted by Self Time, shows most expensive functions
2. **Call Tree tab** — full execution path from top-level event handler
3. **Codec (heaviest first):** Shows functions consuming most CPU

### Performance Budget
Set thresholds to prevent regression:
```json
{
  "budgets": [{
    "path": "/",
    "timings": [
      { "metric": "largest-contentful-paint", "budget": 2500 },
      { "metric": "cumulative-layout-shift", "budget": 0.1 },
      { "metric": "total-blocking-time", "budget": 200 }
    ]
  }]
}
```

---

## 23. Network Throttling and Analysis

### DevTools Network Throttling
Access via Performance panel gear icon or Network panel:
- **No throttling:** Default
- **Fast 3G:** 1.6 Mbps down, 750 Kbps up, 150ms latency
- **Slow 4G:** 400 Kbps down, 400 Kbps up, 200ms latency
- **Offline:** Simulates no network

### Network panel analysis
- **Waterfall:** Visual timeline of request loading
- **Timing breakdown:** DNS lookup, initial connection, TLS negotiation, TTFB, content download
- **Initiator:** What triggered each request
- **Priority:** Browser-assigned fetch priority

### Key things to look for
1. **Serial request chains:** A loads B loads C — each adds latency
2. **Large payloads:** Especially for above-the-fold resources
3. **Third-party impact:** Scripts from other domains
4. **Cache headers:** Resources not being cached effectively

---

## 24. Critical Rendering Path Optimization

The Critical Rendering Path (CRP) is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on screen.

### CRP steps
1. **HTML parsing** → DOM tree
2. **CSS parsing** → CSSOM tree
3. **Render tree** = DOM + CSSOM (excluding hidden elements)
4. **Layout** → Calculate positions and sizes
5. **Paint** → Fill pixels
6. **Composite** → Layer management and GPU composition

### Optimization strategies

**Reduce HTML size:**
- Minimize DOM depth and node count
- Avoid unnecessary wrapper elements
- Target < 1500 DOM nodes

**Critical CSS:**
- Inline above-the-fold CSS in `<style>` tag in `<head>`
- Load full stylesheet asynchronously
- Use Critters or Penthouse for automatic extraction

**Eliminate render-blocking resources:**
- Use `async`/`defer` on scripts
- Use `media` queries on non-critical stylesheets
- Inline critical CSS, async-load the rest

**Preconnect for critical origins:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>
```

**Resource hints placement:**
```html
<head>
  <!-- Preconnect first -->
  <link rel="preconnect" href="https://api.example.com">
  <!-- Preload critical resources -->
  <link rel="preload" as="image" href="hero.webp" fetchpriority="high">
  <!-- Inline critical CSS -->
  <style>/* critical CSS here */</style>
  <!-- Async-load full stylesheet -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
```

---

## 25. Resource Loading: Hints and Priorities

### preload
Downloads a resource **early** in the page lifecycle, regardless of where it's discovered:
```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero.webp" as="image" fetchpriority="high">
```
**Use for:** Resources needed immediately (LCP images, critical fonts, key scripts)

### prefetch
Downloads a resource for **future navigation** (low priority):
```html
<link rel="prefetch" href="/next-page.js">
```
**Use for:** Next-page resources, speculative navigation

### preconnect
Establishes **early connection** to critical third-party origins:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://api.example.com" crossorigin>
```
**Use for:** API endpoints, CDN origins, font services

### dns-prefetch
Resolves **DNS** for third-party origins (lighter than preconnect):
```html
<link rel="dns-prefetch" href="https://analytics.example.com">
```
**Use for:** Third-party analytics, ad networks, lower-priority origins

### modulepreload
Preloads **ES module dependencies** and their dependency graphs:
```html
<link rel="modulepreload" href="/lib/router.js">
<link rel="modulepreload" href="/lib/store.js">
```
**Use for:** ES module dependency graphs discovered via `import()`

### Priority comparison
| Hint | What it does | When to use |
|------|-------------|-------------|
| `preload` | High-priority early fetch | Critical above-fold resources |
| `prefetch` | Low-priority future fetch | Next-page resources |
| `preconnect` | DNS + TCP + TLS | High-priority third-party origins |
| `dns-prefetch` | DNS only | Lower-priority third-party origins |
| `modulepreload` | Module graph fetch | ES module dependencies |

---

## 26. Script Loading: async, defer, type="module"

### Blocking (no attribute)
```html
<script src="app.js"></script>
```
- Parser **stops** → fetch → execute → parser resumes
- Catastrophic for performance in `<head>`

### async
```html
<script src="analytics.js" async></script>
```
- Parser **does not stop**; script downloads in parallel
- Runs **as soon as downloaded** (may execute before DOM is ready)
- No guaranteed execution order
- **Use for:** Independent third-party scripts (analytics, error reporters)

### defer
```html
<script src="app.js" defer></script>
```
- Parser **does not stop**; script downloads in parallel
- Runs **after parsing completes**, in document order
- Runs before `DOMContentLoaded`
- **Use for:** Application code that depends on DOM and other scripts

### type="module"
```html
<script type="module" src="app.mjs"></script>
```
- **Deferred by default** (no need for explicit `defer`)
- Supports `import`/`export` syntax
- Runs in strict mode
- Deduplicates by URL
- **Use for:** Modern ES module code (preferred in 2026)

### Comparison table
| Attribute | Parser blocks? | When it runs | Execution order | Dependencies |
|-----------|---------------|--------------|-----------------|-------------|
| (none) | Yes | During parse | N/A | None |
| `async` | No | When downloaded | Arrival order | None |
| `defer` | No | After parse, before DOMContentLoaded | Document order | DOM + other deferred |
| `type="module"` | No | After parse (deferred) | Document order | Supports `import` |

### Legacy fallback pattern
```html
<script type="module" src="app.mjs"></script>
<script nomodule defer src="legacy-app.js"></script>
```
**Note:** In 2026, every shipping browser supports `type="module"`, so `nomodule` is unnecessary.

---

## 27. Image Optimization

### Modern formats

**AVIF:**
- 50% smaller than JPEG, 20% smaller than WebP
- Supports lossy, lossless, HDR
- Browser support: Chrome 85+, Firefox 93+, Safari 16.4+

**WebP:**
- 25-35% smaller than JPEG
- Lossy and lossless, transparency, animation
- Universal browser support (all major since 2020)

**JPEG/PNG:**
- Still used by 57% (JPEG) and 26% (PNG) of LCP images
- Legacy fallback only

### Responsive images with srcset and sizes
```html
<img
  src="hero-800w.jpg"
  srcset="hero-400w.jpg 400w, hero-800w.jpg 800w, hero-1200w.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  width="1200"
  height="675"
  alt="Hero image"
  loading="lazy"
  fetchpriority="low"
>
```

### The picture element
```html
<picture>
  <source type="image/avif"
    srcset="hero-400.avif 400w, hero-800.avif 800w"
    sizes="(max-width: 768px) 100vw, 50vw">
  <source type="image/webp"
    srcset="hero-400.webp 400w, hero-800.webp 800w"
    sizes="(max-width: 768px) 100vw, 50vw">
  <img src="hero-800w.jpg" width="800" height="600" alt="Hero">
</picture>
```

### Lazy loading
```html
<!-- LCP image: NEVER lazy-load -->
<img src="hero.webp" width="1200" height="675" fetchpriority="high">

<!-- Below-fold images: lazy-load -->
<img src="below-fold.webp" width="400" height="300" loading="lazy">
```

**Chromium loading distance thresholds:**
- Fast connection (4G): 1250px from viewport
- Slow connection (3G): 2500px from viewport

### fetchpriority
```html
<!-- Boost LCP image -->
<img src="hero.webp" fetchpriority="high">

<!-- Deprioritize non-critical images -->
<img src="decoration.webp" fetchpriority="low" loading="lazy">
```

### Key rules
- Never `loading="lazy"` the LCP image
- Always set `width`/`height` (prevents CLS)
- Use `sizes` with `srcset` (without it, browser assumes 100vw)
- Use AVIF → WebP → JPEG fallback chain

---

## 28. Font Optimization

### font-display
Controls how fonts are displayed while loading:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;  /* Show fallback immediately, swap when loaded */
}
```

**Values:**
| Value | Behavior | Best for |
|-------|----------|----------|
| `swap` | Show fallback immediately, swap when ready | Body text |
| `optional` | Use font if available immediately, otherwise fallback forever | Strict performance budgets |
| `fallback` | Brief flash, swap if loaded quickly (100ms+1s) | Balance of UX and perf |
| `block` | Invisible text for up to 3s | Headings only (risky) |

### Font subsetting
Reduce font file size by including only needed characters:
- **Latin subset:** ~5-15 KB (vs 50-200 KB full)
- **Use Google Fonts** with `&text=` parameter for custom subsets
- Tools: `pyftsubset`, FontForge, Glyphhanger

```html
<!-- Only load Latin characters -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&subset=latin" rel="stylesheet">
```

### Variable fonts
A single font file contains all weights and widths:
```css
@font-face {
  font-family: 'InterVariable';
  src: url('Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}

body {
  font-family: 'InterVariable', sans-serif;
  font-weight: 400;  /* Any weight from 100-900 */
}

h1 {
  font-weight: 700;  /* Same file, no extra download */
}
```

**Benefits:** Single file replaces multiple weight files (400, 500, 600, 700 = 4 files → 1 file)

### Best practices
- Preload critical fonts: `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>`
- Use `font-display: swap` for body text
- Use `font-display: optional` for strict performance budgets
- Use system font stack as first choice when possible
- Subset fonts to only needed character ranges
- Use variable fonts to reduce HTTP requests

---

## 29. CSS Optimization

### Critical CSS
Extract the minimum CSS needed for above-the-fold rendering and inline it:

```html
<head>
  <style>
    /* Critical CSS: ~8-20KB uncompressed */
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui; }
    .header { height: 60px; display: flex; }
    .hero { min-height: 400px; }
  </style>
  <link rel="preload" href="styles.css" as="style"
    onload="this.onload=null;this.rel='stylesheet'">
</head>
```

**Tools:** Critters (webpack/Vite), Penthouse, Critical (Node.js)

### CSS Containment
```css
/* Isolate card reflow calculations */
.card {
  contain: layout style paint;
}

/* Size + layout containment for independent sections */
.section {
  contain: size layout;
}
```

**Containment types:**
- `size`: Element size independent of children
- `layout`: Internal layout doesn't affect outside
- `style`: Counters/quotes don't propagate
- `paint`: Content paints only within bounds

### content-visibility
```css
/* Skip rendering off-screen sections until near viewport */
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;  /* Placeholder height */
}
```

**Benefits:** Reduces initial rendering time by 50%+ on long pages

**Caveats:**
- Incompatible with scroll-linked animations
- `getBoundingClientRect()` returns approximate values for off-screen elements
- Always pair with `contain-intrinsic-size` to prevent CLS

### Other CSS optimizations
- **Minify CSS:** Remove whitespace and comments
- **Code-split CSS by route:** Load only styles needed for current page
- **Avoid `@import`:** Creates sequential loading (vs parallel with `<link>`)
- **Use `will-change` sparingly:** Promotes to compositor layer
- **Prefer `transform`/`opacity` for animations:** Compositor-only, no layout/paint

---

## 30. JavaScript Optimization

### Code Splitting
Divide bundles by route so each page only loads what it needs:

```javascript
// Route-level splitting
const Dashboard = React.lazy(() => import('./Dashboard'));
const Settings = React.lazy(() => import('./Settings'));

// Dynamic import on interaction
button.addEventListener('click', async () => {
  const { RichEditor } = await import('./RichEditor');
  // ...
});
```

**Targets:**
- Initial JS: < 100KB compressed
- Per-route JS: < 50KB compressed
- Vendor chunks cached separately from application code

### Tree Shaking
Statically removes unused ES module exports at build time.

**Requirements:**
1. Source must use `import`/`export` (not `require()`)
2. Package must declare `"sideEffects": false` in `package.json`
3. Bundler must be in production mode

**Common failure:**
```javascript
// BAD: Imports entire library
import _ from 'lodash';
_.debounce(fn, 300);

// GOOD: Named import from modular build
import debounce from 'lodash-es/debounce';
```

### Dead Code Elimination (DCE)
Minifiers remove unreachable code at the AST level:
- Dead branches (`if (false) { ... }`)
- Unused variables
- Side-effect-free calls marked with `/*#__PURE__*/`
- `console.log` calls in production (via Terser/esbuild config)

### Dynamic Import for Lazy Loading
```javascript
// Only load when needed
async function loadEditor() {
  const { Editor } = await import('./HeavyEditor');
  return new Editor();
}

// Prefetch on hover
link.addEventListener('mouseenter', () => {
  import('./NextPageModule');
});
```

### Performance budgets in CI
```bash
# Fail build if JavaScript exceeds budget
npx bundlesize --config .bundlesize.json

# Lighthouse CI
npx lhci autorun --assert.assertions.largest-contentful-paint=2500
```

---

## 31. Virtual Scrolling / Windowing

Virtual scrolling renders **only visible items** in a large list, keeping DOM node count constant regardless of list size.

### How it works
1. Container maintains total list height via an outer div
2. Only visible items (+ buffer/overscan) are rendered as DOM nodes
3. Inner div is positioned at current scroll offset
4. As user scrolls, items leaving viewport are unmounted, items entering are mounted
5. Scrollbar remains correct because outer container height = full content height

### react-window
```javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}
```

**Variants:**
- `FixedSizeList`: Fixed-height rows
- `VariableSizeList`: Variable-height rows (provide `itemSize` function)
- `FixedSizeGrid` / `VariableSizeGrid`: 2D virtualization

### @tanstack/virtual
Headless alternative with full control over DOM structure:

```javascript
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = React.useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
              width: '100%',
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### When to use
- **Use when:** >100 visible items in scrollable container, scroll jank, slow initial render
- **Don't use when:** <50 items, need find-in-page for all items, screen reader accessibility is critical

### Performance impact
A 5,000-item list going from 3s initial render to 60ms is not unusual.

---

## 32. OffscreenCanvas

`OffscreenCanvas` provides a canvas that can be rendered **off the main thread**, enabling GPU-accelerated rendering in Web Workers.

### Basic usage
```javascript
// Main thread
const canvas = document.getElementById('canvas');
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker('renderer.js');
worker.postMessage({ canvas: offscreen }, [offscreen]);

// Worker thread (renderer.js)
self.onmessage = (e) => {
  const canvas = e.data.canvas;
  const ctx = canvas.getContext('2d');
  
  function render(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ... drawing operations ...
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};
```

### Key features
- **Transferable:** Can be transferred from main thread to worker
- **Supports:** Canvas 2D, WebGL, WebGL2 contexts
- **requestAnimationFrame:** Works in worker context
- **convertToBlob()** / **transferToImageBitmap():** Extract rendered frames

### Benefits
- Main thread stays free for user interactions
- No DOM access required for rendering
- GPU acceleration available in workers
- Ideal for games, visualizations, video processing

### Browser support
Baseline: Widely available since March 2023.

### Practical use cases
- Game rendering in Worker (UI thread handles input)
- Real-time data visualization
- Video frame processing
- Crypto mining visualizations

---

## 33. Web Workers for Computation

Web Workers run JavaScript in **separate threads**, keeping the main thread responsive.

### Creating a worker
```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: largeArray });
worker.onmessage = (e) => {
  console.log('Result:', e.data.result);
};

// worker.js
self.onmessage = (e) => {
  const result = expensiveComputation(e.data.data);
  self.postMessage({ result });
};
```

### When to use workers
- **Use for:** Data parsing, image processing, cryptography, sorting large arrays, complex calculations
- **Don't use for:** DOM manipulation, UI updates, simple computations

### Communication overhead
- `postMessage` is **asynchronous** and involves **structured cloning** by default
- Large data should use **Transferable objects** (zero-copy)
- Batch messages to reduce overhead

### Worker pools
```javascript
// Use a library like workerpool or comlink
import { wrap } from 'comlink';

const worker = wrap(new Worker('worker.js'));
const result = await worker.processData(data);
```

### Limitations
- No DOM access
- No access to `window`, `document`
- Communication is message-based (not shared memory by default)
- Error handling requires `onerror` listeners

---

## 34. SharedArrayBuffer and Atomics

### SharedArrayBuffer
Enables **shared memory** between main thread and workers:

```javascript
// Main thread
const sharedBuffer = new SharedArrayBuffer(1024);
const view = new Int32Array(sharedBuffer);
view[0] = 42;

const worker = new Worker('worker.js');
worker.postMessage({ buffer: sharedBuffer });

// Worker thread
self.onmessage = (e) => {
  const view = new Int32Array(e.data.buffer);
  console.log(view[0]);  // 42 — shared!
  Atomics.add(view, 0, 1);  // Atomically increment
};
```

### Atomics API
Provides thread-safe operations on shared memory:

```javascript
// Atomic read-modify-write
Atomics.add(view, index, value);
Atomics.sub(view, index, value);
Atomics.and(view, index, value);
Atomics.or(view, index, value);
Atomics.xor(view, index, value);
Atomics.exchange(view, index, value);

// Compare and swap
Atomics.compareExchange(view, index, expected, replacement);

// Wait/notify (futex-like)
Atomics.wait(view, index, value, timeout);  // Blocks until notified
Atomics.notify(view, index, count);          // Wake waiting threads

// Load/Store with ordering guarantees
Atomics.load(view, index);
Atomics.store(view, index, value);
```

### Use cases
- Lock-free data structures
- Producer-consumer patterns
- Parallel algorithms with synchronization
- WebAssembly threads (SharedArrayBuffer for linear memory)

### Security requirement
Browsers require specific headers for `SharedArrayBuffer`:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

---

## 35. Transferable Objects

Transferable objects allow **zero-copy transfer** of memory between workers, avoiding expensive structured cloning.

### How it works
The underlying memory buffer is **transferred** (not copied) — the original reference becomes unusable:

```javascript
// Transfer ArrayBuffer
const buffer = new ArrayBuffer(1024 * 1024);  // 1MB
const worker = new Worker('worker.js');
worker.postMessage(buffer, [buffer]);
// buffer.byteLength === 0 after transfer (detached)
```

### Common transferable objects
- `ArrayBuffer`
- `MessagePort`
- `ReadableStream` / `WritableStream`
- `OffscreenCanvas`
- `ImageBitmap`
- `WebAssembly.Module` (via structured clone, not transfer)

### Practical example
```javascript
// Main thread: create large image data
const imageData = new ImageData(width, height);
const buffer = imageData.data.buffer;

// Transfer (zero-copy) to worker for processing
worker.postMessage(
  { type: 'process', imageData: imageData, width, height },
  [buffer]  // Transfer list
);

// Worker processes and transfers back
self.onmessage = (e) => {
  const processed = processImage(e.data.imageData);
  self.postMessage({ result: processed }, [processed.data.buffer]);
};
```

### Performance impact
For a 10MB ArrayBuffer:
- **Structured clone:** ~10ms (copy)
- **Transfer:** ~0ms (pointer transfer)

---

## 36. Object Pooling

Object pooling **pre-allocates and reuses objects** to avoid garbage collection pressure.

### Implementation
```javascript
class ObjectPool {
  constructor(createFn, resetFn, initialSize = 100) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    
    // Pre-populate
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(createFn());
    }
  }
  
  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.createFn();
  }
  
  release(obj) {
    this.resetFn(obj);
    this.pool.push(obj);
  }
}

// Usage: particle system
const particlePool = new ObjectPool(
  () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0 }),
  (p) => { p.x = 0; p.y = 0; p.vx = 0; p.vy = 0; p.life = 0; }
);

// Acquire particle
const particle = particlePool.acquire();
particle.x = 100;
particle.y = 200;

// Release when done
particlePool.release(particle);
```

### When to use
- **Use for:** Particle systems, bullet pools, frequent object creation/destruction
- **Don't use for:** Simple objects, rare allocations, when GC is not measurable

### Modern JavaScript considerations
- V8's generational GC is efficient for short-lived objects
- Object pooling is most beneficial for objects that survive multiple GC cycles
- Profile first — don't optimize prematurely

---

## 37. requestIdleCallback

Schedules a **low-priority callback** to run when the browser is idle, ensuring critical work (user interactions, animations) isn't delayed.

### Basic usage
```javascript
requestIdleCallback((deadline) => {
  // deadline.timeRemaining() — ms available before browser needs control
  // deadline.didTimeout — whether this was called after timeout
  
  while (deadline.timeRemaining() > 1 || deadline.didTimeout) {
    processQueuedItem();
  }
  
  if (hasMoreWork()) {
    requestIdleCallback(processMore);  // Continue next idle period
  }
}, { timeout: 1000 });  // Optional: force callback within 1s
```

### Practical use cases
- Prefetching resources for next navigation
- Analytics/tracking pixel sending
- Background data sync
- Non-urgent DOM updates
- Lazy initialization of components

### Scheduler API (modern alternative)
```javascript
// scheduler.yield() — available in Chrome 129+, Firefox 142+
async function processItems(items) {
  for (const item of items) {
    processItem(item);
    if (shouldYield()) {
      await scheduler.yield();  // Yield to browser
    }
  }
}

// scheduler.postTask() — explicit priority
scheduler.postTask(() => {
  doExpensiveWork();
}, { priority: 'user-visible' });
```

### When to use what
| API | Priority | Use for |
|-----|----------|---------|
| `requestIdleCallback` | Lowest | Prefetch, analytics, background sync |
| `scheduler.yield()` | High (continues current task) | Break up work across frames |
| `scheduler.postTask()` | Configurable | Scheduling tasks with priority |
| `setTimeout` | Medium | Legacy fallback (minimum 4ms delay) |

---

## 38. requestAnimationFrame Optimization

`requestAnimationFrame` (rAF) schedules a callback before the browser's next repaint, ideal for smooth animations.

### Basic usage
```javascript
function animate(timestamp) {
  // Update animation state
  element.style.transform = `translateX(${Math.sin(timestamp / 1000) * 100}px)`;
  
  requestAnimationFrame(animate);  // Continue loop
}

requestAnimationFrame(animate);
```

### Optimization techniques

**Use rAF for all animations:**
```javascript
// BAD: setTimeout-based animation
setTimeout(() => {
  element.style.left = `${x++}px`;
  animate();
}, 16);  // Unreliable timing

// GOOD: rAF-based animation
function animate() {
  element.style.left = `${x++}px`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

**Batch DOM reads and writes:**
```javascript
// BAD: Read-write-read interleaving (forces layout)
element.style.width = '100px';   // Write
console.log(element.offsetHeight); // Read (forces layout!)
element.style.height = '200px';  // Write

// GOOD: Batch reads, then batch writes
const width = element.offsetWidth; // Read
const height = element.offsetHeight; // Read
element.style.width = '100px';   // Write
element.style.height = '200px';  // Write
```

**Use CSS transforms over layout properties:**
```javascript
// BAD: Triggers layout
element.style.left = '100px';
element.style.top = '200px';

// GOOD: GPU-accelerated, no layout
element.style.transform = 'translate(100px, 200px)';
```

**Check visibility before animating:**
```javascript
function animate() {
  if (document.hidden) {
    requestAnimationFrame(animate);
    return;  // Don't waste frames when tab is hidden
  }
  // ... animation logic ...
  requestAnimationFrame(animate);
}
```

### Performance considerations
- rAF fires at display refresh rate (typically 60Hz = ~16.67ms)
- On 120Hz displays, rAF fires ~8.33ms — animations run faster if frame-dependent
- Use `timestamp` parameter for frame-rate-independent animations
- Cancel rAF when animation stops: `const id = requestAnimationFrame(animate); cancelAnimationFrame(id);`

---

## 39. Intersection Observer for Lazy Loading

The Intersection Observer API detects when elements enter/exit the viewport **without expensive scroll event listeners**.

### Lazy loading images
```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '200px 0px',  // Start loading 200px before visible
  threshold: 0.01
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

### Lazy loading sections
```javascript
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Load section content
      loadSectionContent(entry.target);
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
```

### Infinite scrolling
```javascript
const sentinel = document.querySelector('#load-more-sentinel');
const infiniteObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadNextPage().then(() => {
      // Re-observe after new content loads
      infiniteObserver.observe(sentinel);
    });
  }
}, { rootMargin: '300px' });

infiniteObserver.observe(sentinel);
```

### Visibility tracking for analytics
```javascript
const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      trackAdImpression(entry.target.dataset.adId);
    }
  });
}, { threshold: 0.5 });  // 50% visible = impression
```

### Key options
| Option | Description |
|--------|-------------|
| `root` | Scrollable ancestor (null = viewport) |
| `rootMargin` | Margin around root (e.g., "200px") |
| `scrollMargin` | Margin for nested scroll containers |
| `threshold` | Visibility percentage to trigger (0-1) |
| `trackVisibility` | Account for opacity/transforms (expensive) |
| `delay` | Minimum time between notifications |

---

## 40. Service Worker Caching Strategies

### Cache-first (offline-first)
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open('v1').then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
```
**Use for:** Static assets (images, fonts, CSS, JS) that rarely change

### Network-first
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open('v1').then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
```
**Use for:** API calls, dynamic content that should be fresh

### Stale-while-revalidate
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('v1').then(cache => {
      return cache.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
        return cached || fetchPromise;
      });
    })
  );
});
```
**Use for:** Semi-dynamic content (user avatars, API responses that can be briefly stale)

### Cache invalidation strategies
- **Versioned caches:** `v1`, `v2` — delete old version on activation
- **Hash-based:** Include content hash in filename (`app.a1b2c3.js`)
- **Time-based:** TTL with expiration checks
- **Network-first with fallback:** Always try network, use cache only when offline

---

## 41. HTTP/2 and HTTP/3

### HTTP/2
- **Multiplexing:** Multiple requests over single TCP connection (no head-of-line blocking at HTTP level)
- **Header compression:** HPACK algorithm reduces header overhead
- **Server push:** Server can proactively send resources (largely deprecated — preload preferred)
- **Stream priority:** Server can prioritize responses

**Impact:** Eliminates need for domain sharding, HTTP/1.1 workaround of concatenating files

### HTTP/3 (QUIC)
- **Based on QUIC/UDP:** Eliminates TCP head-of-line blocking entirely
- **0-RTT connection establishment:** Faster repeated connections
- **Built-in encryption:** TLS 1.3 integrated at transport level
- **Connection migration:** Survives network changes (WiFi → cellular)

**Impact:**
- Faster page loads on lossy connections
- Better performance on mobile networks
- Reduced connection establishment time

### When to use
- **HTTP/2:** Default for all modern servers (automatic with HTTPS)
- **HTTP/3:** Enable when your CDN/hosting supports it (Cloudflare, Fastly, Google Cloud)

---

## 42. Brotli Compression

Brotli provides **20-26% better compression** than gzip for text-based resources.

### Compression levels
| Level | Speed | Compression | Use case |
|-------|-------|-------------|----------|
| 1 | Fast | Good | Dynamic content |
| 4 | Medium | Better | General use |
| 6 | Slow | Very good | Pre-compressed static assets |
| 11 | Very slow | Best | Static assets (pre-built) |

### Configuration
```nginx
# Nginx
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/javascript application/json;

# Apache
AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/xml text/css application/javascript
```

### Pre-compression
```bash
# Build step: pre-compress assets at level 11
brotli -c -q 11 main.js > main.js.br
brotli -c -q 11 styles.css > styles.css.br
```

### Server configuration
```nginx
location ~* \.(js|css|html|json|svg)$ {
    brotli_static on;  # Serve pre-compressed .br files
    gzip_static on;    # Fallback to gzip
}
```

### Impact
- **Text resources:** 20-26% smaller than gzip
- **HTML:** Typically 15-20% smaller
- **JavaScript/CSS:** 20-25% smaller
- **Browser support:** All modern browsers (Chrome 50+, Firefox 44+, Safari 11+, Edge 79+)

---

## 43. Client Hints

Client hints provide **device and network information** to servers via HTTP headers, enabling server-side optimization decisions.

### Available hints
| Header | Description |
|--------|-------------|
| `Viewport-Width` | Viewport width in CSS pixels |
| `Width` | Resource width in CSS pixels |
| `DPR` | Device pixel ratio |
| `Save-Data` | User preference for reduced data usage |
| `ECT` | Effective connection type (slow-2g, 2g, 3g, 4g) |
| `RTT` | Round-trip time estimate |
| `Downlink` | Effective bandwidth estimate |
| `Device-Memory` | Approximate device RAM |
| `HardwareConcurrency` | Number of CPU cores |

### Usage example
```html
<!-- Request client hints -->
<meta http-equiv="Accept-CH" content="Viewport-Width, DPR, Width, Save-Data, ECT">
```

### Server-side optimization
```javascript
// Express.js example
app.get('/hero-image', (req, res) => {
  const dpr = parseFloat(req.headers['dpr']) || 1;
  const viewportWidth = parseInt(req.headers['viewport-width']) || 1200;
  const saveData = req.headers['save-data'] === 'on';
  const ect = req.headers['ect'] || '4g';
  
  // Serve appropriately sized image
  const width = Math.min(viewportWidth * dpr, 2400);
  
  if (saveData || ect === 'slow-2g' || ect === '2g') {
    // Serve low-quality, small image
    res.redirect(`/images/hero-low-${width}.webp`);
  } else if (ect === '3g') {
    // Serve medium quality
    res.redirect(`/images/hero-med-${width}.webp`);
  } else {
    // Serve high quality
    res.redirect(`/images/hero-${width}.avif`);
  }
});
```

### Use cases
- **Responsive images:** Serve different sizes based on viewport/DPR
- **Save-Data:** Reduce quality or skip non-essential resources
- **Network-aware loading:** Adapt strategy to connection quality
- **Memory-aware decisions:** Limit processing on low-memory devices

### Privacy considerations
- Client hints are sent on **first request** only after opt-in via `Accept-CH`
- Persist via `Critical-CH` header to avoid extra round-trips
- Only request hints you actually use
- Consider user privacy when collecting device information

---

# Summary

## WebAssembly Key Takeaways
1. **Wasm is a compilation target**, not a language — use with Rust, C/C++, or AssemblyScript
2. **Use for CPU-bound work:** image processing, crypto, physics, video encoding (3-5x faster than JS)
3. **Avoid for:** DOM manipulation, JSON parsing, simple string operations
4. **Rust + wasm-pack** = best toolchain for new projects (smallest binaries, best performance)
5. **Memory management:** Use `WebAssembly.Memory`, be aware of buffer detachment after grow
6. **Minimize JS-Wasm boundary crossings** — batch data transfer, use shared memory
7. **WASI + Component Model** = the future of portable, composable Wasm outside the browser

## Performance Key Takeaways
1. **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1 (measured at p75 of real users)
2. **Critical rendering path:** Inline critical CSS, async/defer scripts, preload LCP resources
3. **Images:** Never lazy-load LCP image, use AVIF/WebP, set width/height, use fetchpriority="high"
4. **JavaScript:** Code-split by route, tree-shake dead code, break long tasks with scheduler.yield()
5. **CSS:** Use content-visibility: auto for long pages, contain for isolated components
6. **Fonts:** font-display: swap, preload critical fonts, use variable fonts
7. **Network:** Enable Brotli compression, use HTTP/3, leverage resource hints
8. **Tools:** DevTools Performance panel + Lighthouse for diagnosis, PerformanceObserver for monitoring
