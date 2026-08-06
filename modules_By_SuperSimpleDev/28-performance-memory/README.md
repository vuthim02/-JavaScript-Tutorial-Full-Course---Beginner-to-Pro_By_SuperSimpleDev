# Module 28: Performance and Memory Management

**Duration:** ~40 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand JavaScript memory management
- Identify and fix memory leaks
- Optimize code performance
- Use performance measurement tools
- Implement lazy loading and code splitting

## Memory Management

### How JavaScript Manages Memory

JavaScript automatically manages memory through:
1. **Allocation**: Memory assigned when creating objects
2. **Usage**: Code uses the allocated memory
3. **Garbage Collection**: Unused memory is automatically freed

```javascript
// Memory is allocated
const user = { name: 'John', age: 30 };
const numbers = [1, 2, 3, 4, 5];

// Memory is freed when no references exist
user = null;  // Object can be garbage collected
```

### Memory Leak Causes

```javascript
// 1. Global variables
function createGlobal() {
  leakedVariable = 'This is global';  // Accidentally global
}

// 2. Forgotten timers
function startTimer() {
  setInterval(() => {
    // Runs forever, holding references
    console.log('tick');
  }, 1000);
}

// 3. Event listeners not removed
function addListener() {
  document.getElementById('btn').addEventListener('click', handler);
  // Never removed!
}

// 4. Closures holding references
function createClosure() {
  const largeData = new Array(1000000).fill('x');
  
  return function() {
    // largeData is held in memory
    return largeData.length;
  };
}
```

## Detecting Memory Leaks

### Chrome DevTools Memory Tab

```javascript
// Take heap snapshot
// 1. Open DevTools > Memory tab
// 2. Click "Take heap snapshot"
// 3. Look for detached DOM elements
// 4. Compare snapshots before/after actions
```

### Performance Monitor

```javascript
// Monitor memory usage
if (performance.memory) {
  console.log('Used JS Heap:', performance.memory.usedJSHeapSize);
  console.log('JS Heap Size Limit:', performance.memory.jsHeapSizeLimit);
}
```

### Manual Detection

```javascript
function checkMemory() {
  if (window.gc) {
    window.gc();  // Force garbage collection (Chrome with flag)
  }
  
  console.log('Memory:', performance.memory.usedJSHeapSize);
}

setInterval(checkMemory, 5000);
```

## Fixing Memory Leaks

### Remove Event Listeners

```javascript
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    document.getElementById('btn').addEventListener('click', this.handleClick);
  }
  
  handleClick() {
    console.log('Clicked!');
  }
  
  destroy() {
    document.getElementById('btn').removeEventListener('click', this.handleClick);
  }
}
```

### Clear Timers

```javascript
class Poller {
  constructor() {
    this.intervalId = null;
  }
  
  start() {
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 5000);
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
```

### Weak References

```javascript
// Use WeakMap for object metadata
const cache = new WeakMap();

function processObject(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  
  const result = expensiveOperation(obj);
  cache.set(obj, result);  // Can be garbage collected
  return result;
}

// Use WeakSet for tracking
const processed = new WeakSet();

function process(item) {
  if (processed.has(item)) return;
  
  // Process item
  processed.add(item);
}
```

## Performance Optimization

### Debouncing and Throttling

```javascript
// Debounce: wait until user stops
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle: limit execution rate
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
window.addEventListener('scroll', throttle(handleScroll, 100));
input.addEventListener('input', debounce(handleSearch, 300));
```

### Lazy Loading

```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
```

### Virtual Scrolling

```javascript
// Only render visible items
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
    
    this.container.addEventListener('scroll', () => this.render());
    this.render();
  }
  
  render() {
    const scrollTop = this.container.scrollTop;
    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleCount, this.items.length);
    
    const visibleItems = this.items.slice(startIndex, endIndex);
    
    this.container.innerHTML = visibleItems
      .map((item, i) => `<div style="height:${this.itemHeight}px">${item}</div>`)
      .join('');
  }
}
```

### Object Pooling

```javascript
class ObjectPool {
  constructor(factory, reset, initialSize = 10) {
    this.factory = factory;
    this.reset = reset;
    this.pool = [];
    
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }
  
  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.factory();
  }
  
  release(obj) {
    this.reset(obj);
    this.pool.push(obj);
  }
}

// Usage
const particlePool = new ObjectPool(
  () => ({ x: 0, y: 0, vx: 0, vy: 0 }),
  (p) => { p.x = 0; p.y = 0; p.vx = 0; p.vy = 0; }
);

const particle = particlePool.acquire();
// Use particle...
particlePool.release(particle);
```

## Performance Measurement

### Performance API

```javascript
// Measure execution time
function measure(fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`Execution time: ${end - start}ms`);
  return result;
}

measure(() => {
  // Code to measure
  for (let i = 0; i < 1000000; i++) {}
});
```

### User Timing API

```javascript
function processData() {
  performance.mark('start-processing');
  
  // Process data
  for (let i = 0; i < 1000000; i++) {}
  
  performance.mark('end-processing');
  performance.measure('processing', 'start-processing', 'end-processing');
  
  const measures = performance.getEntriesByName('processing');
  console.log(`Processing took ${measures[0].duration}ms`);
  
  performance.clearMarks();
  performance.clearMeasures();
}
```

## Optimization Techniques

### Minimize DOM Manipulation

```javascript
// Bad: Multiple DOM updates
for (let i = 0; i < 1000; i++) {
  list.innerHTML += `<li>Item ${i}</li>`;
}

// Good: Single DOM update
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
list.appendChild(fragment);
```

### Use requestAnimationFrame

```javascript
// Bad: Direct DOM manipulation in loop
function animate() {
  element.style.left = `${x++}px`;
  animate();
}

// Good: Use requestAnimationFrame
function animate() {
  element.style.left = `${x++}px`;
  requestAnimationFrame(animate);
}
```

### Optimize Loops

```javascript
// Cache array length
const arr = [1, 2, 3, 4, 5];
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(arr[i]);
}

// Use appropriate loop type
// for...of for arrays
// for...in for objects
// while for complex conditions
```

## Practice Exercises

### Exercise 28.1: Memory Leak Detection
Create a tool that monitors memory usage over time.

### Exercise 28.2: Performance Benchmark
Build a benchmarking utility for comparing function performance.

### Exercise 28.3: Virtual Scrolling List
Implement a virtual scrolling list for large datasets.

## Summary

- JavaScript uses automatic garbage collection
- Memory leaks come from unintended references
- Use WeakMap/WeakSet for object metadata
- Clear timers and event listeners when done
- Debounce/throttle frequent operations
- Lazy load images and heavy content
- Measure performance with Performance API
- Minimize DOM manipulation

## Previous

[Proceed to Module 27](../27-functional-programming/README.md)

## Next Steps

[Proceed to Module 29](../29-security-basics/README.md): Security Basics to learn about XSS, CSRF, and secure coding practices.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
