# Module 27: Functional Programming Patterns

**Duration:** ~50 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand functional programming principles
- Write pure functions
- Use higher-order functions effectively
- Implement function composition
- Work with immutable data patterns

## Core Principles

### 1. Pure Functions

Same input always produces same output, no side effects.

```javascript
// Pure function
function add(a, b) {
  return a + b;
}

// Impure function (depends on external state)
let tax = 0.1;
function calculatePrice(price) {
  return price + price * tax;  // Depends on external 'tax'
}

// Make it pure
function calculatePrice(price, taxRate) {
  return price + price * taxRate;
}
```

### 2. Immutability

Don't change data, create new copies.

```javascript
// Mutable (avoid)
const user = { name: 'John', age: 30 };
user.age = 31;  // Changed original

// Immutable approach
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 };

// Array immutability
const arr = [1, 2, 3];

// Mutable (avoid)
arr.push(4);

// Immutable
const newArr = [...arr, 4];
const filtered = arr.filter(x => x !== 2);
const mapped = arr.map(x => x * 2);
```

## Higher-Order Functions

Functions that take or return functions.

### Map, Filter, Reduce

```javascript
const numbers = [1, 2, 3, 4, 5];

// Map: transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// Filter: keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4]

// Reduce: combine into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);  // 15
```

### Method Chaining

```javascript
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .reduce((acc, n) => acc + n, 0);

console.log(result);  // 220 (4 + 16 + 36 + 64 + 100)
```

### Function Composition

```javascript
// Compose functions right to left
const compose = (...fns) => (x) => 
  fns.reduceRight((acc, fn) => fn(acc), x);

// Pipe functions left to right
const pipe = (...fns) => (x) =>
  fns.reduce((acc, fn) => fn(acc), x);

const double = x => x * 2;
const addTen = x => x + 10;
const square = x => x * x;

const transform = compose(square, addTen, double);
console.log(transform(5));  // square(addTen(double(5))) = square(20) = 400

const transformPipe = pipe(double, addTen, square);
console.log(transformPipe(5));  // double(addTen(square(5))) = double(35) = 70
```

## Currying

Transform multi-argument function into sequence of functions.

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(add(1, 2, 3));         // 6
console.log(curriedAdd(1)(2)(3));  // 6

// Practical use
const log = (level) => (message) => console.log(`[${level}] ${message}`);

const logError = log('ERROR');
const logInfo = log('INFO');

logError('Something failed');  // [ERROR] Something failed
logInfo('User logged in');     // [INFO] User logged in
```

### Partial Application

```javascript
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const double = partial(multiply, 2);
console.log(double(3, 4));  // 24 (2 * 3 * 4)

const tripleAndDouble = partial(multiply, 2, 3);
console.log(tripleAndDouble(4));  // 24 (2 * 3 * 4)
```

## Functional Utilities

### Once

Execute function only once.

```javascript
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log('Initialized!');
  return 'Done';
});

initialize();  // Logs 'Initialized!', returns 'Done'
initialize();  // Returns 'Done' without logging
```

### Memoize

Cache function results.

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

console.log(expensiveCalc(4));  // Computing... 16
console.log(expensiveCalc(4));  // 16 (cached, no 'Computing...')
```

### Debounce

Delay execution until after pause.

```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const search = debounce((query) => {
  console.log('Searching:', query);
}, 300);

input.addEventListener('input', (e) => {
  search(e.target.value);  // Only executes after 300ms pause
});
```

### Throttle

Limit execution frequency.

```javascript
function throttle(fn, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

const handleScroll = throttle(() => {
  console.log('Scrolled!');
}, 100);

window.addEventListener('scroll', handleScroll);
```

## Immutable Data Patterns

### Spread Operator

```javascript
// Objects
const original = { a: 1, b: 2, c: 3 };
const updated = { ...original, b: 99, d: 4 };

// Arrays
const arr = [1, 2, 3];
const newArr = [...arr, 4];
const filtered = arr.filter(x => x !== 2);
```

### Map and Filter

```javascript
const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true }
];

// Get active users
const activeUsers = users.filter(u => u.active);

// Deactivate user 2
const updatedUsers = users.map(u => 
  u.id === 2 ? { ...u, active: false } : u
);
```

### Reducer Pattern

```javascript
const actions = [
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 },
  { type: 'SUBTRACT', payload: 1 },
  { type: 'ADD', payload: 3 }
];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    case 'SUBTRACT':
      return state - action.payload;
    default:
      return state;
  }
}

const result = actions.reduce(reducer, 0);
console.log(result);  // 5 (0 + 1 + 2 - 1 + 3)
```

## Practice Exercises

### Exercise 27.1: Data Transformer
Create a pipeline that transforms user data using composition.

### Exercise 27.2: Event System
Build an event system using functional patterns.

### Exercise 27.3: State Management
Implement a simple Redux-like state management system.

## Summary

- Pure functions: same input, same output
- Immutability: don't change data, create copies
- Higher-order functions: take/return functions
- Currying: transform multi-arg to single-arg functions
- Composition: combine small functions into larger ones
- Memoization: cache results for performance
- Debounce/throttle: control execution timing

## Previous

[Proceed to Module 26](../26-modern-data-structures/README.md)

## Next Steps

[Proceed to Module 28](../28-performance-memory/README.md): Performance and Memory Management to learn about optimization techniques.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
