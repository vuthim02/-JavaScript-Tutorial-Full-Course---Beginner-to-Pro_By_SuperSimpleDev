/**
 * PART 12 — Performance: memory leaks, performance.now(), WeakMap for private data
 * Run with: node part12-performance.js
 */

// ---------------------------------------------------------------
// 1. performance.now() — high-resolution timing
// ---------------------------------------------------------------

const { performance } = require('perf_hooks');

function measureExecutionTime(fn, label = 'Operation') {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label} took ${(end - start).toFixed(3)}ms`);
}

// Example: measure array creation
measureExecutionTime(() => {
  const arr = [];
  for (let i = 0; i < 100000; i++) {
    arr.push(i);
  }
}, 'Array push 100k items');

// ---------------------------------------------------------------
// 2. Memory leak example — accidental global variable
// ---------------------------------------------------------------

function createLeak() {
  // Accidentally creating a global variable (no let/const/var)
  leakedData = new Array(10000).fill('leak');
  console.log('  Leak created — global has', global.leakedData?.length, 'items');
}

try {
  createLeak();
  // leakedData is now on the global object and will never be GC'd
  console.log('  Global leakedData persists after function exits');
} catch (e) {
  // In strict mode this throws, in sloppy it creates a global
}

// ---------------------------------------------------------------
// 3. Memory leak example — forgotten timer / interval
// ---------------------------------------------------------------

function startMemoryLeakTimer() {
  const heavyData = new Array(100000).fill('data');

  // This interval holds a reference to `heavyData` forever
  setInterval(() => {
    // This function forms a closure over `heavyData`
    // Even though we don't use heavyData here, it can't be GC'd
    console.log('  Timer tick — memory leak: heavyData still referenced');
  }, 10000);
}

// startMemoryLeakTimer(); // Uncomment to see the leak

// ---------------------------------------------------------------
// 4. Memory leak example — detached DOM nodes (browser)
// ---------------------------------------------------------------

/*
 * In a browser, this pattern leaks DOM nodes:
 *
 * const button = document.getElementById('btn');
 * button.parentNode.removeChild(button);
 * // button variable still holds a reference to the DOM node
 * // Even though it's removed from the DOM, it stays in memory
 */

// ---------------------------------------------------------------
// 5. Memory leak example — forgotten event listeners
// ---------------------------------------------------------------

class LeakyComponent {
  constructor() {
    this.data = new Array(10000).fill('leak');
    this.handler = this.handleClick.bind(this);
    // In a browser: element.addEventListener('click', this.handler);
    // If never removed, the component can't be GC'd
  }

  handleClick() {
    console.log('clicked');
  }

  destroy() {
    // In a browser, you need:
    // element.removeEventListener('click', this.handler);
    this.handler = null;
    this.data = null;
  }
}

console.log('LeakyComponent created — needs destroy() to free memory');

// ---------------------------------------------------------------
// 6. WeakMap for private data — avoids memory leaks
// ---------------------------------------------------------------

// WeakMap keys are objects. When the key object is GC'd, the entry is removed.
// This prevents memory leaks when using private data.

const privateStorage = new WeakMap();

class SecureUser {
  constructor(name, ssn) {
    // Store sensitive data in WeakMap (not on the object)
    privateStorage.set(this, { ssn, createdAt: Date.now() });
    this.name = name;
  }

  getSSN() {
    const data = privateStorage.get(this);
    return data ? data.ssn : null;
  }

  // When the SecureUser instance is no longer referenced,
  // the WeakMap entry is automatically garbage collected.
  // This does NOT happen with a regular Map or object property.
}

const secureUser = new SecureUser('Alice', '123-45-6789');
console.log('SecureUser SSN:', secureUser.getSSN());
console.log('SSN not on object:', Object.keys(secureUser)); // ['name']

// ---------------------------------------------------------------
// 7. Performance tip — avoid forced reflows (browser concept)
// ---------------------------------------------------------------

/*
 * In a browser, reading layout properties after writing forces a reflow:
 *
 * // BAD — forces reflow on every iteration
 * for (let i = 0; i < 1000; i++) {
 *   element.style.width = i + 'px';
 *   const width = element.offsetWidth; // forced reflow!
 * }
 *
 * // GOOD — batch reads and writes
 * const currentWidth = element.offsetWidth; // read once
 * element.style.width = (currentWidth + 100) + 'px'; // write once
 */

// ---------------------------------------------------------------
// 8. Performance tip — object pooling (avoid GC pressure)
// ---------------------------------------------------------------

// Instead of creating many temporary objects:
// BAD — creates 1000 objects
function badWay() {
  const results = [];
  for (let i = 0; i < 1000; i++) {
    results.push({ x: i, y: i * 2 });
  }
  return results;
}

// BETTER — reuse objects or use TypedArrays for numeric data
function betterWay() {
  const xs = new Float64Array(1000);
  const ys = new Float64Array(1000);
  for (let i = 0; i < 1000; i++) {
    xs[i] = i;
    ys[i] = i * 2;
  }
  return { xs, ys };
}

console.log('Performance examples loaded — run with node to see timing');
