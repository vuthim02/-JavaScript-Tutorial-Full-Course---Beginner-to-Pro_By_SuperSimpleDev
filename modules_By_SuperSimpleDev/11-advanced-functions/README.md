# Module 11: Advanced Functions (Part 1)

**Duration:** ~42 minutes  
**Video Timestamp:** 09:28:26 - 10:10:22

## Learning Objectives

- Understand closures
- Master arrow functions
- Learn default parameters
- Work with rest parameters
- Use destructuring in functions

## Closures

A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned.

### Understanding Closures

```javascript
function outer() {
  let count = 0;
  
  function inner() {
    count++;
    return count;
  }
  
  return inner;
}

const counter = outer();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
```

### Why Closures Matter

```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    getCount() { return count; }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());  // 1
```

### Closure Example: Private Variables

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited $${amount}. Balance: $${balance}`;
      }
      return 'Invalid amount';
    },
    withdraw(amount) {
      if (amount > balance) {
        return 'Insufficient funds';
      }
      balance -= amount;
      return `Withdrew $${amount}. Balance: $${balance}`;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.getBalance());          // 100
console.log(account.deposit(50));          // Deposited $50. Balance: $150
console.log(account.withdraw(30));         // Withdrew $30. Balance: $120
console.log(account.balance);              // undefined (balance is private)
```

### Multiple Closures

```javascript
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));    // 10
console.log(triple(5));    // 15
console.log(quadruple(5)); // 20
```

## Arrow Functions

### Syntax Variations

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function with block body
const add = (a, b) => {
  return a + b;
};

// Arrow function with implicit return
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = n => n * n;
const greet = name => `Hello, ${name}!`;
```

### Arrow Functions in Callbacks

```javascript
const numbers = [1, 2, 3, 4, 5];

// Traditional
numbers.map(function(n) {
  return n * 2;
});

// Arrow function
numbers.map(n => n * 2);

// Arrow function with block
numbers.map(n => {
  const result = n * 2;
  return result;
});
```

### Arrow Function Limitations

Arrow functions don't have their own `this` binding:

```javascript
const obj = {
  name: 'John',
  
  // Traditional function - 'this' works
  greet() {
    console.log('Hello, ' + this.name);
  },
  
  // Arrow function - 'this' doesn't work as expected
  greetArrow = () => {
    console.log('Hello, ' + this.name);  // 'this' is NOT obj
  }
};
```

## Default Parameters

```javascript
// Simple default
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

console.log(greet());         // Hello, Guest!
console.log(greet('Alice'));  // Hello, Alice!

// Multiple defaults
function createUser(name, role = 'user', active = true) {
  return { name, role, active };
}

console.log(createUser('John'));
// { name: 'John', role: 'user', active: true }

// Using previous parameters
function calculatePrice(price, tax = price * 0.1, discount = 0) {
  return price + tax - discount;
}

console.log(calculatePrice(100));      // 110 (10% tax)
console.log(calculatePrice(100, 15));  // 115 (custom tax)
```

## Rest Parameters

Collect multiple arguments into an array:

```javascript
// Using arguments object (older)
function sum() {
  console.log(arguments);  // { 0: 1, 1: 2, 2: 3 }
}

// Using rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum());              // 0

// Rest with other parameters
function multiply(factor, ...numbers) {
  return numbers.map(n => n * factor);
}

console.log(multiply(2, 1, 2, 3));  // [2, 4, 6]
```

## Spread Operator in Functions

### Spreading Arrays as Arguments

```javascript
function add(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(add(...numbers));  // 6 (same as add(1, 2, 3))

// Works with Math
const nums = [3, 1, 4, 1, 5];
console.log(Math.max(...nums));  // 5
console.log(Math.min(...nums));  // 1
```

### Combining with Rest

```javascript
function logItems(first, ...rest) {
  console.log('First:', first);
  console.log('Rest:', rest);
}

logItems('a', 'b', 'c', 'd');
// First: a
// Rest: ['b', 'c', 'd']
```

## Destructuring in Functions

### Destructuring Parameters

```javascript
function greet({ name, age }) {
  return `Hello, ${name}! You are ${age} years old.`;
}

const person = { name: 'Alice', age: 30 };
console.log(greet(person));  // Hello, Alice! You are 30 years old.

// With defaults
function greetWithDefaults({ name = 'Guest', age = 0 } = {}) {
  return `Hello, ${name}! You are ${age} years old.`;
}

console.log(greetWithDefaults({ name: 'Bob' }));
// Hello, Bob! You are 0 years old.
```

### Destructuring Arrays in Parameters

```javascript
function displayScore([first, second, ...rest]) {
  console.log(`1st: ${first}`);
  console.log(`2nd: ${second}`);
  console.log(`Others: ${rest.join(', ')}`);
}

displayScore(['Alice', 'Bob', 'Charlie', 'David']);
// 1st: Alice
// 2nd: Bob
// Others: Charlie, David
```

## Higher-Order Functions

Functions that take or return functions:

### Functions as Parameters

```javascript
function applyOperation(a, b, operation) {
  return operation(a, b);
}

console.log(applyOperation(5, 3, (x, y) => x + y));   // 8
console.log(applyOperation(5, 3, (x, y) => x - y));  // 2
console.log(applyOperation(5, 3, (x, y) => x * y));  // 15
```

### Functions Returning Functions

```javascript
function createFormatter(precision) {
  return function(number) {
    return number.toFixed(precision);
  };
}

const formatCurrency = createFormatter(2);
const formatPercent = createFormatter(1);

console.log(formatCurrency(19.999));  // "20.00"
console.log(formatPercent(0.456));    // "0.5"
```

## Memoization

Caching function results for performance:

```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Example: Expensive calculation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.log(memoizedFib(10));  // 55
console.log(memoizedFib(10));  // 55 (cached!)
```

## IIFE (Immediately Invoked Function Expression)

```javascript
// Execute immediately
(function() {
  console.log('Runs immediately!');
})();

// With parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})('World');

// Using arrow function
(() => {
  console.log('Arrow IIFE');
})();
```

## Practical Examples

### Event Handler Factory

```javascript
function createClickHandler(action) {
  return function(event) {
    console.log('Element clicked:', event.target);
    console.log('Action:', action);
  };
}

document.querySelector('.btn').addEventListener(
  'click',
  createClickHandler('save')
);
```

### debounce Function

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

// Usage
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

document.querySelector('input').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### once Function

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

const init = once(() => {
  console.log('Initialized!');
  return 'Done';
});

init();  // Logs "Initialized!" and returns "Done"
init();  // Returns "Done" without logging
init();  // Returns "Done"
```

## Practice Exercises

### Exercise 11.1: Counter with Reset
Create a counter that can be reset.

```javascript
function createCounter(start = 0) {
  let count = start;
  
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    reset() { count = start; return count; },
    getCount() { return count; }
  };
}

const counter = createCounter(10);
console.log(counter.increment());  // 11
console.log(counter.increment());  // 12
console.log(counter.reset());      // 10
console.log(counter.getCount());   // 10
```

### Exercise 11.2: Temperature Converter Factory
Create a temperature converter.

```javascript
function createConverter(unit) {
  const toCelsius = (f) => (f - 32) * 5/9;
  const toFahrenheit = (c) => c * 9/5 + 32;
  
  return function(temp) {
    if (unit === 'F') {
      return toCelsius(temp);
    }
    return toFahrenheit(temp);
  };
}

const toCelsius = createConverter('C');
const toFahrenheit = createConverter('F');

console.log(toCelsius(32));  // 0
console.log(toFahrenheit(0));  // 32
```

### Exercise 11.3: Partial Application
Create a partially applied function.

```javascript
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiply, 2, 3);

console.log(multiplyBy2(5));       // 30 (2 * 5 * 3)
console.log(multiplyBy2And3(4));   // 24 (2 * 3 * 4)
```

## Summary

- Closures allow functions to access outer variables
- Arrow functions provide concise syntax
- Default parameters provide fallback values
- Rest parameters collect multiple arguments
- Destructuring works in function parameters
- Higher-order functions take/return functions
- IIFE executes immediately

## Next Steps

Proceed to Module 12: Advanced Functions (Part 2) for more advanced topics.
