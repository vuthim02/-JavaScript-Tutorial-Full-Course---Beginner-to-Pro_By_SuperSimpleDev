/**
 * PART 5 — Functions: declarations, expressions, arrows, closures, IIFE, HOF, debounce
 * Run with: node part05-functions.js
 */

// ---------------------------------------------------------------
// 1. Function declaration — hoisted entirely
// ---------------------------------------------------------------

function add(a, b) {
  return a + b;
}

console.log('function declaration:', add(3, 4));

// ---------------------------------------------------------------
// 2. Function expression — not hoisted
// ---------------------------------------------------------------

const subtract = function (a, b) {
  return a - b;
};

console.log('function expression:', subtract(10, 3));

// Named function expression (name is internal only)
const multiply = function mult(a, b) {
  return a * b;
};

console.log('named function expression:', multiply(4, 5));

// ---------------------------------------------------------------
// 3. Arrow functions — concise, no own `this`, no `arguments`
// ---------------------------------------------------------------

const divide = (a, b) => a / b;
console.log('arrow (implicit return):', divide(10, 2));

const greet = name => `Hello, ${name}!`;
console.log('arrow (single param, no parens):', greet('Alice'));

const logAndSum = (a, b) => {
  console.log('  summing:', a, b);
  return a + b;
};
console.log('arrow (block body):', logAndSum(1, 2));

// ---------------------------------------------------------------
// 4. Default parameters
// ---------------------------------------------------------------

function power(base, exponent = 2) {
  return base ** exponent;
}

console.log('default param (exponent=2):', power(5)); // 25
console.log('default param overridden:', power(5, 3)); // 125

// ---------------------------------------------------------------
// 5. Rest parameters (...args) — collects remaining args into an array
// ---------------------------------------------------------------

function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log('rest params:', sumAll(1, 2, 3, 4, 5)); // 15

// ---------------------------------------------------------------
// 6. Closure — function remembers its lexical scope
// ---------------------------------------------------------------

function createGreeter(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');
sayHello('Alice'); // Hello, Alice!
sayHi('Bob'); // Hi, Bob!

// ---------------------------------------------------------------
// 7. IIFE — Immediately Invoked Function Expression
// ---------------------------------------------------------------

// Classic IIFE to create private scope
const counterModule = (function () {
  let count = 0;

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
})();

console.log('IIFE module count:', counterModule.increment()); // 1
console.log('IIFE module count:', counterModule.increment()); // 2
console.log('IIFE module count:', counterModule.getCount()); // 2

// Modern arrow IIFE
const result = (() => 'IIFE with arrow')();
console.log('arrow IIFE:', result);

// ---------------------------------------------------------------
// 8. Higher-Order Functions — functions that operate on functions
// ---------------------------------------------------------------

// HOF that takes a function as argument
function withLogging(fn) {
  return function (...args) {
    console.log(`Calling ${fn.name || 'anonymous'} with:`, args);
    const result = fn(...args);
    console.log(`  Result:`, result);
    return result;
  };
}

const wrappedAdd = withLogging(add);
console.log('HOF wrapped:', wrappedAdd(5, 7));

// HOF that returns a function (currying)
function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);
console.log('curried double:', double(10)); // 20
console.log('curried triple:', triple(10)); // 30

// ---------------------------------------------------------------
// 9. Debounce — limits how often a function executes
// ---------------------------------------------------------------

function debounce(fn, delayMs) {
  let timeoutId = null;

  return function (...args) {
    // Clear the previous timer
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set a new timer
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delayMs);
  };
}

// Simulate rapid calls
const saveInput = debounce(function (value) {
  console.log('Debounced save:', value);
}, 300);

console.log('Debounce simulation (only last call executes):');
saveInput('a');
saveInput('ab');
saveInput('abc'); // Only this will trigger after 300ms

// ---------------------------------------------------------------
// 10. Throttle — ensures max one call per interval
// ---------------------------------------------------------------

function throttle(fn, intervalMs) {
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCallTime >= intervalMs) {
      lastCallTime = now;
      fn.apply(this, args);
    }
  };
}

const onScroll = throttle(function () {
  console.log('Throttled scroll at', Date.now());
}, 1000);

console.log('Throttle simulation (max 1 per second):');
onScroll();
onScroll();
setTimeout(() => onScroll(), 1100);
