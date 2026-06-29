# Level 56: Functions as Values

## Challenges 1-70: Error Snippets

### Error 1: Function Declaration vs Expression
**Description:** Call function before declaration
```javascript
const result = multiply(2, 3);
const multiply = function(a, b) {
  return a * b;
};
console.log(result);
```

### Error 2: Hoisting with var Function
**Description:** Use function before assignment
```javascript
console.log(square(5));
var square = function(n) {
  return n * n;
};
```

### Error 3: Function as Argument Not Called
**Description:** Pass function and call it
```javascript
function greet(callback) {
  callback;
}
greet(function() { console.log('hello'); });
```

### Error 4: Callback Not a Function
**Description:** Check callback is function before calling
```javascript
function process(data, callback) {
  callback(data);
}
process(42, null);
```

### Error 5: Function Return Value Confusion
**Description:** Return function result vs function itself
```javascript
function getDouble() {
  return function(n) { return n * 2; };
}
const result = getDouble;
console.log(result(5));
```

### Error 6: Higher-Order Function Wrong Call
**Description:** Call function returned from function
```javascript
function createAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = createAdder(5);
console.log(add5);
```

### Error 7: Function Expression Named
**Description:** Create named function expression
```javascript
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
console.log(factorial(5));
```

### Error 8: Callback with Wrong Arity
**Description:** Use callback with multiple args
```javascript
function each(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
each([1, 2, 3], (item, index) => console.log(item, index));
```

### Error 9: Function as Property Wrong Context
**Description:** Call function from object property
```javascript
const obj = {
  name: 'myObj',
  func: function() {
    console.log(this.name);
  }
};
const f = obj.func;
f();
```

### Error 10: Passing Undefined as Function
**Description:** Call defined function variable
```javascript
let handler;
handler();
```

### Error 11: Function Composition Order
**Description:** Compose two functions
```javascript
function double(n) { return n * 2; }
function addOne(n) { return n + 1; }
const composed = addOne(double(5));
console.log(composed);
```

### Error 12: Callback Hell Basic
**Description:** Chain callbacks sequentially
```javascript
function step1(cb) { setTimeout(() => cb(1), 100); }
function step2(n, cb) { setTimeout(() => cb(n + 1), 100); }
step1(function(r1) {
  step2(r1, function(r2) {
    console.log(r2);
  });
});
```

### Error 13: Function Argument Mutation
**Description:** Modify array passed to function
```javascript
function addItem(arr, item) {
  arr.push(item);
  return arr;
}
const original = [1, 2, 3];
const result = addItem(original, 4);
console.log(original);
```

### Error 14: Early Return in Callback
**Description:** Return early from forEach callback
```javascript
const nums = [1, 2, 3, 4, 5];
nums.forEach(n => {
  if (n > 3) return;
  console.log(n);
});
```

### Error 15: Function vs Arrow Context
**Description:** Use correct context in callback
```javascript
const obj = {
  values: [1, 2, 3],
  double: function() {
    return this.values.map(function(n) {
      return n * this.multiplier;
    });
  },
  multiplier: 2
};
console.log(obj.double());
```

### Error 16: Function as Value Type Check
**Description:** Check if variable is function
```javascript
const fn = () => {};
console.log(typeof fn === 'function');
```

### Error 17: Callback Called Multiple Times
**Description:** Ensure callback called once
```javascript
function once(fn) {
  let called = false;
  return function(...args) {
    if (!called) {
      called = true;
      fn(...args);
    }
  };
}
const logOnce = once(console.log);
logOnce('first');
logOnce('second');
```

### Error 18: Function Binding Context
**Description:** Bind function to object context
```javascript
const obj = {name: 'test'};
function logName() {
  console.log(this.name);
}
const bound = logName.bind(obj);
bound();
```

### Error 19: Return Function with Closure
**Description:** Create counter with closure
```javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter());
console.log(counter());
```

### Error 20: Function Expression Hoisting Block
**Description:** Use function expression before line
```javascript
if (true) {
  console.log(typeof myFunc);
  var myFunc = function() {};
}
```

### Error 21: Callback with Error First
**Description:** Implement error-first callback
```javascript
function readFile(path, callback) {
  if (!path) {
    callback('Invalid path');
  }
  callback(null, 'file content');
}
readFile('', (err, data) => {
  if (err) console.log('Error:', err);
  else console.log(data);
});
```

### Error 22: Function Length Property
**Description:** Get number of function parameters
```javascript
function add(a, b, c) {
  return a + b + c;
}
console.log(add.length);
```

### Error 23: Function Name Property
**Description:** Get function name from expression
```javascript
const myFunc = function namedFunc() {};
console.log(myFunc.name);
```

### Error 24: Async Callback Order
**Description:** Execute callbacks in order
```javascript
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
```

### Error 25: Function Default Parameter
**Description:** Use default parameter in callback
```javascript
function greet(name = 'Guest') {
  console.log('Hello ' + name);
}
greet();
```

### Error 26: Callback this Lost
**Description:** Preserve this in callback
```javascript
const obj = {
  data: [1, 2, 3],
  process: function() {
    this.data.forEach(function(item) {
      console.log(this.data);
    });
  }
};
obj.process();
```

### Error 27: Function Factory Wrong Closure
**Description:** Create multiple counter functions
```javascript
function createFunctions() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push(function() { console.log(i); });
  }
  return funcs;
}
const funcs = createFunctions();
funcs[0]();
```

### Error 28: Recursive Function Expression
**Description:** Recursively call function expression
```javascript
const factorial = function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
};
console.log(factorial(5));
```

### Error 29: Function.toString
**Description:** Get function source code
```javascript
function hello() { return 'hi'; }
console.log(hello.toString());
```

### Error 30: Call and Apply
**Description:** Use call to set this
```javascript
function greet() {
  console.log('Hello ' + this.name);
}
const user = {name: 'Alice'};
greet.call(user);
```

### Error 31: Function as Constructor
**Description:** Use function as constructor
```javascript
function Person(name) {
  this.name = name;
}
const p = Person('Alice');
console.log(p);
```

### Error 32: Async Callback Error Catch
**Description:** Catch error in async callback
```javascript
function asyncTask(cb) {
  setTimeout(() => {
    try {
      throw new Error('fail');
    } catch (e) {
      cb(e);
    }
  }, 100);
}
asyncTask(err => console.log('Caught:', err.message));
```

### Error 33: Function Rest Arguments
**Description:** Use rest params in callback
```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5));
```

### Error 34: Callback Called Synchronously
**Description:** Ensure callback is async
```javascript
function fetchData(cb) {
  cb('data');
}
console.log('before');
fetchData(data => console.log(data));
console.log('after');
```

### Error 35: Function Property
**Description:** Add property to function
```javascript
function greet() {
  console.log('hello');
}
greet.counter = 0;
greet();
console.log(greet.counter);
```

### Error 36: Memoization Pattern
**Description:** Cache function results
```javascript
function memoize(fn) {
  const cache = {};
  return function(n) {
    if (cache[n] !== undefined) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}
const factorial = memoize(n => n <= 1 ? 1 : n * factorial(n - 1));
console.log(factorial(5));
```

### Error 37: Function with Getter/Setter
**Description:** Define function with properties
```javascript
function createCounter() {
  let count = 0;
  function counter() {
    return ++count;
  }
  counter.reset = function() { count = 0; };
  return counter;
}
const c = createCounter();
console.log(c());
c.reset();
console.log(c());
```

### Error 38: Throttle Function
**Description:** Throttle function calls
```javascript
function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}
const log = throttle(console.log, 1000);
log('a');
log('b');
```

### Error 39: Function Binding with Args
**Description:** Bind function with preset arguments
```javascript
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
console.log(double(5));
```

### Error 40: Callback Returning Promise
**Description:** Handle promise from callback
```javascript
function asyncFn(cb) {
  Promise.resolve(42).then(cb);
}
asyncFn(result => console.log(result));
```

### Error 41: Function Self-Invocation
**Description:** Immediately invoke function expression
```javascript
(function() {
  console.log('IIFE');
})();
```

### Error 42: Function as Method
**Description:** Call function as object method
```javascript
const calculator = {
  value: 0,
  add: function(n) {
    this.value += n;
    return this;
  }
};
calculator.add(5).add(3);
console.log(calculator.value);
```

### Error 43: Spread Arguments in Function Call
**Description:** Spread array into function call
```javascript
function logThree(a, b, c) {
  console.log(a, b, c);
}
const args = [1, 2, 3];
logThree(...args);
```

### Error 44: Function Default Undefined
**Description:** Check for undefined arguments
```javascript
function logArgs(a, b = 'default') {
  console.log(a, b);
}
logArgs('hello', undefined);
```

### Error 45: Function as Array Callback
**Description:** Pass function reference as callback
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(function(n) { return n * 2; });
console.log(doubled);
```

### Error 46: Nested Function Scope
**Description:** Access outer function variable
```javascript
function outer() {
  const x = 10;
  function inner() {
    console.log(x);
  }
  inner();
}
outer();
```

### Error 47: Function Call with New
**Description:** Call regular function with new
```javascript
function Car(model) {
  this.model = model;
}
const car = new Car('Tesla');
console.log(car.model);
```

### Error 48: Arguments Object
**Description:** Use arguments object in arrow function
```javascript
const sum = () => {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
};
console.log(sum(1, 2, 3));
```

### Error 49: Function Currying
**Description:** Curry a function
```javascript
function curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}
const add = (a, b) => a + b;
const add5 = curry(add)(5);
console.log(add5(3));
```

### Error 50: Callback with Timeout
**Description:** Call callback after timeout
```javascript
function delay(cb, ms) {
  setTimeout(cb, ms);
}
delay(() => console.log('delayed'), 1000);
```

### Error 51: Function Return Function Chain
**Description:** Chain function calls
```javascript
function add(x) {
  return function(y) {
    return x + y;
  };
}
console.log(add(5)(3));
```

### Error 52: Callback Async Error
**Description:** Handle error in async callback
```javascript
function riskyOperation(cb) {
  setTimeout(() => {
    try {
      throw new Error('failed');
    } catch (e) {
      cb(e);
    }
  }, 100);
}
riskyOperation(err => console.log(err.message));
```

### Error 53: Void Function Return
**Description:** Get return value from forEach
```javascript
const result = [1, 2, 3].forEach(n => n * 2);
console.log(result);
```

### Error 54: Function as Predicate
**Description:** Pass predicate function to filter
```javascript
const nums = [1, 2, 3, 4, 5];
const isEven = n => n % 2 === 0;
const evens = nums.filter(isEven);
console.log(evens);
```

### Error 55: Function Composition Pipe
**Description:** Pipe functions left to right
```javascript
function pipe(...fns) {
  return function(x) {
    return fns.reduce((v, fn) => fn(v), x);
  };
}
const add1 = n => n + 1;
const double = n => n * 2;
const f = pipe(add1, double);
console.log(f(5));
```

### Error 56: Callback Not Returning
**Description:** Return value from map callback
```javascript
const nums = [1, 2, 3];
const result = nums.map(n => {
  n * 2;
});
console.log(result);
```

### Error 57: Function Expression in Loop
**Description:** Create functions in loop with let
```javascript
const funcs = [];
for (let i = 0; i < 3; i++) {
  funcs.push(() => console.log(i));
}
funcs[1]();
```

### Error 58: Partial Application
**Description:** Partially apply function arguments
```javascript
function partial(fn, ...preset) {
  return function(...args) {
    return fn(...preset, ...args);
  };
}
const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
console.log(add5(3, 2));
```

### Error 59: Function with Symbol
**Description:** Use Symbol as function property
```javascript
const fn = () => {};
const key = Symbol('id');
fn[key] = 42;
console.log(fn[key]);
```

### Error 60: Generator Function
**Description:** Create generator function
```javascript
function* countTo(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}
const gen = countTo(3);
console.log(gen.next().value);
```

### Error 61: Function with Dynamic Name
**Description:** Set function name dynamically
```javascript
const name = 'dynamicFunc';
const fn = {[name]: function() {}}[name];
console.log(fn.name);
```

### Error 62: Callback with Condition
**Description:** Conditionally call callback
```javascript
function maybe(cb) {
  if (Math.random() > 0.5) cb();
}
maybe(() => console.log('called'));
```

### Error 63: Function Prototype
**Description:** Add method to function prototype
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log('Hello ' + this.name);
};
const p = new Person('Alice');
p.greet();
```

### Error 64: Callback Queue
**Description:** Queue callbacks for later
```javascript
const queue = [];
function addToQueue(fn) {
  queue.push(fn);
}
function processQueue() {
  queue.forEach(fn => fn());
}
addToQueue(() => console.log(1));
addToQueue(() => console.log(2));
processQueue();
```

### Error 65: Nested Callback Scope
**Description:** Access variable in nested callbacks
```javascript
function outer() {
  const x = 10;
  function middle() {
    const y = 20;
    function inner() {
      console.log(x + y);
    }
    inner();
  }
  middle();
}
outer();
```

### Error 66: Function with Apply Spread
**Description:** Use apply with array
```javascript
function sum(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
const result = sum.apply(null, nums);
console.log(result);
```

### Error 67: Callback Type Coercion
**Description:** Function truthy check
```javascript
function runIf(cb) {
  if (cb) cb();
}
runIf(() => console.log('runs'));
runIf(undefined);
```

### Error 68: Function Returning Multiple
**Description:** Return multiple values from function
```javascript
function getStats(nums) {
  return {
    sum: nums.reduce((a, b) => a + b, 0),
    avg: nums.reduce((a, b) => a + b, 0) / nums.length
  };
}
console.log(getStats([1, 2, 3, 4, 5]));
```

### Error 69: Callback Timing
**Description:** Order of callback execution
```javascript
function process(cb) {
  console.log('before');
  cb();
  console.log('after');
}
process(() => console.log('callback'));
```

### Error 70: Function with Getter
**Description:** Add getter to function
```javascript
function createGreeting(name) {
  function greet() {
    return 'Hello ' + name;
  }
  return greet;
}
const greet = createGreeting('Alice');
console.log(greet());
```

## Challenges 71-100: Issue Snippets

### Issue 1: Function Declaration in Condition
**Description:** Conditional function definition
```javascript
if (true) {
  function sayHi() { console.log('hi'); }
} else {
  function sayHi() { console.log('hello'); }
}
sayHi();
```

### Issue 2: Callback Without Error Handling
**Description:** Simple callback pattern
```javascript
function divide(a, b, cb) {
  if (b === 0) cb('Division by zero');
  else cb(null, a / b);
}
divide(10, 0, (err, result) => {
  if (err) console.log(err);
  else console.log(result);
});
```

### Issue 3: Function as String
**Description:** Convert function to string unnecessarily
```javascript
function add(a, b) { return a + b; }
const fnStr = add.toString();
console.log(fnStr);
```

### Issue 4: Nested Callbacks Instead of Chain
**Description:** Chain functions with callbacks
```javascript
function first(cb) { setTimeout(() => cb('A'), 100); }
function second(val, cb) { setTimeout(() => cb(val + 'B'), 100); }
function third(val, cb) { setTimeout(() => cb(val + 'C'), 100); }
first(r1 => {
  second(r1, r2 => {
    third(r2, r3 => {
      console.log(r3);
    });
  });
});
```

### Issue 5: Function Expression vs Declaration
**Description:** Use function declaration unnecessarily
```javascript
function double(n) {
  return n * 2;
}
const nums = [1, 2, 3];
const doubled = nums.map(double);
console.log(doubled);
```

### Issue 6: Reassigning Function Name
**Description:** Overwrite function variable
```javascript
function greet() { console.log('hi'); }
greet = function() { console.log('hello'); };
greet();
```

### Issue 7: Callback in Loop (var)
**Description:** Use var in loop callback
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
```

### Issue 8: Function as Method on Array
**Description:** Store functions in array
```javascript
const ops = [
  function(x) { return x + 1; },
  function(x) { return x * 2; },
  function(x) { return x - 3; }
];
const result = ops.reduce((v, fn) => fn(v), 5);
console.log(result);
```

### Issue 9: Returning Function from Object
**Description:** Return function from object method
```javascript
const factory = {
  create: function(type) {
    if (type === 'greet') {
      return function(name) {
        return 'Hello ' + name;
      };
    }
  }
};
const greet = factory.create('greet');
console.log(greet('Alice'));
```

### Issue 10: Callback with Context
**Description:** Maintain this in callback
```javascript
const obj = {
  data: [1, 2, 3],
  process: function() {
    this.data.forEach(function(item) {
      console.log(item + this.offset);
    });
  },
  offset: 10
};
obj.process();
```

### Issue 11: Function as Event Handler
**Description:** Using function as event handler
```javascript
function handleClick() {
  console.log('clicked');
}
document.addEventListener('click', handleClick);
```

### Issue 12: Function Length Mismatch
**Description:** Function called with wrong args
```javascript
function logName(name, age) {
  console.log(name + ' is ' + age + ' years old');
}
logName('Alice');
```

### Issue 13: Anonymous Function in Array
**Description:** Store anonymous functions
```javascript
const actions = [
  item => item + 1,
  item => item * 2,
  item => item.toString()
];
console.log(actions[0](5));
```

### Issue 14: Recursive Callback
**Description:** Recursive setTimeout instead of setInterval
```javascript
function repeat(count, cb) {
  if (count <= 0) return;
  cb();
  setTimeout(() => repeat(count - 1, cb), 1000);
}
repeat(3, () => console.log('tick'));
```

### Issue 15: Function Variable Shadowing
**Description:** Shadow outer function variable
```javascript
const x = 10;
function test() {
  const x = 20;
  console.log(x);
}
test();
```

### Issue 16: Callback Return Value Ignored
**Description:** Ignore return from callback
```javascript
function transform(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
  return result;
}
const nums = [1, 2, 3];
const doubled = transform(nums, n => n * 2);
console.log(doubled);
```

### Issue 17: Function Declaration in Block
**Description:** Declare function inside block
```javascript
{
  function greet() { console.log('hello'); }
}
greet();
```

### Issue 18: Passing Method Reference
**Description:** Pass method as callback
```javascript
const obj = {
  name: 'Test',
  log: function() {
    console.log(this.name);
  }
};
setTimeout(obj.log, 1000);
```

### Issue 19: Function Property for State
**Description:** Attach state to function
```javascript
function counter() {
  counter.count = (counter.count || 0) + 1;
  return counter.count;
}
console.log(counter());
console.log(counter());
console.log(counter());
```

### Issue 20: Async Function Callback
**Description:** Pass async function as callback
```javascript
function fetchData(cb) {
  setTimeout(() => cb('data'), 100);
}
fetchData(async data => {
  const result = await Promise.resolve(data);
  console.log(result);
});
```

### Issue 21: Function with Static Variable
**Description:** Use function property as static
```javascript
function increment() {
  increment.value = (increment.value || 0) + 1;
  return increment.value;
}
console.log(increment());
console.log(increment());
```

### Issue 22: Nested Function Return
**Description:** Return function from function
```javascript
function getMultiplier(factor) {
  return function(n) {
    return n * factor;
  };
}
const triple = getMultiplier(3);
console.log(triple(5));
```

### Issue 23: Callback with Array Method
**Description:** Pass callback to array method
```javascript
const nums = [5, 3, 8, 1, 9];
const sorted = nums.sort((a, b) => a - b);
console.log(sorted);
```

### Issue 24: Function with Too Many Args
**Description:** Call function with extra args
```javascript
function log(a) {
  console.log(a);
}
log(1, 2, 3, 4, 5);
```

### Issue 25: Dynamic Function Construction
**Description:** Create function from string
```javascript
const fn = new Function('a', 'b', 'return a + b');
console.log(fn(5, 3));
```

### Issue 26: Callback Pattern for Async
**Description:** Convert sync to async with callback
```javascript
function readConfig(cb) {
  const config = {theme: 'dark'};
  setTimeout(() => cb(config), 0);
}
readConfig(config => console.log(config));
console.log('sync');
```

### Issue 27: Function Composition Manual
**Description:** Manually compose functions
```javascript
const toUpper = s => s.toUpperCase();
const exclaim = s => s + '!';
const result = exclaim(toUpper('hello'));
console.log(result);
```

### Issue 28: Return Function with Args
**Description:** Return function that uses captured args
```javascript
function createLogger(prefix) {
  return function(msg) {
    console.log(`[${prefix}] ${msg}`);
  };
}
const error = createLogger('ERROR');
error('something broke');
```

### Issue 29: Function as Comparator
**Description:** Pass function as sort comparator
```javascript
const items = [{n: 3}, {n: 1}, {n: 2}];
items.sort((a, b) => a.n - b.n);
console.log(items);
```

### Issue 30: Callback Early Return
**Description:** Return early from callback
```javascript
function findFirst(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return arr[i];
  }
  return null;
}
console.log(findFirst([1, 2, 3, 4], n => n > 2));
```

## Challenges 101-150: Modification Snippets

### Modify 1: Convert to Arrow Function
**Description:** Refactor function expression to arrow
```javascript
const double = function(n) {
  return n * 2;
};
const nums = [1, 2, 3];
const doubled = nums.map(double);
console.log(doubled);
```

### Modify 2: Add Callback Parameter
**Description:** Make function accept callback
```javascript
function calculate(a, b, operation) {
  if (operation === 'add') return a + b;
  if (operation === 'subtract') return a - b;
  if (operation === 'multiply') return a * b;
}
console.log(calculate(10, 5, 'add'));
```

### Modify 3: Convert to Higher-Order Function
**Description:** Create function that returns function
```javascript
function greet(name) {
  return 'Hello ' + name;
}
function welcome(name) {
  return 'Welcome ' + name;
}
console.log(greet('Alice'));
console.log(welcome('Bob'));
```

### Modify 4: Add Function Composition
**Description:** Compose two functions
```javascript
function trim(str) {
  return str.trim();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const name = '  alice  ';
const trimmed = trim(name);
const capped = capitalize(trimmed);
console.log(capped);
```

### Modify 5: Refactor to Callback Pattern
**Description:** Use callback instead of direct return
```javascript
function getData() {
  return {user: 'Alice', role: 'admin'};
}
const data = getData();
console.log(data);
```

### Modify 6: Add Memoization
**Description:** Cache function results
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10));
```

### Modify 7: Convert to Function Expression
**Description:** Change declaration to expression
```javascript
function multiply(a, b) {
  return a * b;
}
console.log(multiply(4, 5));
```

### Modify 8: Add Once Wrapper
**Description:** Ensure function only called once
```javascript
function initialize() {
  console.log('Initialized');
}
initialize();
initialize();
initialize();
```

### Modify 9: Convert to Curry Function
**Description:** Currying a two-argument function
```javascript
function add(a, b) {
  return a + b;
}
console.log(add(5, 3));
```

### Modify 10: Add Async Callback
**Description:** Make function async with callback
```javascript
function processItems(items) {
  return items.map(item => item * 2);
}
console.log(processItems([1, 2, 3]));
```

### Modify 11: Refactor to Pipe
**Description:** Use pipe for function composition
```javascript
const add1 = n => n + 1;
const double = n => n * 2;
const result = double(add1(5));
console.log(result);
```

### Modify 12: Add Debounce Wrapper
**Description:** Debounce a function
```javascript
function search(query) {
  console.log('Searching:', query);
}
search('hello');
search('hello ');
search('hello w');
```

### Modify 13: Convert to Arrow with Implicit Return
**Description:** Shorten arrow function
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => {
  return n * 2;
});
console.log(doubled);
```

### Modify 14: Add Error-First Callback
**Description:** Implement error-first callback pattern
```javascript
function readUser(id) {
  if (id === 0) throw new Error('Invalid ID');
  return {id, name: 'User' + id};
}
try {
  const user = readUser(0);
  console.log(user);
} catch (e) {
  console.log('Error:', e.message);
}
```

### Modify 15: Refactor to Function Factory
**Description:** Create factory function
```javascript
const admin = {role: 'admin', name: 'Alice'};
const user = {role: 'user', name: 'Bob'};
function createUser(role, name) {
  return {role, name};
}
console.log(createUser('admin', 'Alice'));
```

### Modify 16: Add Throttle Wrapper
**Description:** Throttle function execution
```javascript
function logScroll() {
  console.log('Scrolled');
}
window.addEventListener('scroll', logScroll);
```

### Modify 17: Convert to Callback API
**Description:** Refactor to callback-based API
```javascript
function saveUser(user) {
  return {success: true, id: 123};
}
const result = saveUser({name: 'Alice'});
console.log(result);
```

### Modify 18: Add Function Binding
**Description:** Bind function to context
```javascript
const logger = {
  prefix: 'LOG',
  log: function(msg) {
    console.log(this.prefix + ': ' + msg);
  }
};
const logFn = logger.log;
logFn('test');
```

### Modify 19: Refactor to IIFE
**Description:** Use IIFE for private scope
```javascript
const counter = {
  count: 0,
  increment: function() { this.count++; },
  getCount: function() { return this.count; }
};
counter.increment();
counter.increment();
console.log(counter.getCount());
```

### Modify 20: Add Partial Application
**Description:** Partially apply function
```javascript
function formatMessage(prefix, separator, suffix, msg) {
  return prefix + separator + msg + separator + suffix;
}
console.log(formatMessage('[', ']', ':', 'hello'));
```

### Modify 21: Convert to Self-Invoking
**Description:** Create IIFE
```javascript
function init() {
  console.log('App initialized');
}
init();
```

### Modify 22: Add Function as Argument
**Description:** Pass function to array method
```javascript
const nums = [1, 2, 3, 4, 5];
const evens = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) evens.push(nums[i]);
}
console.log(evens);
```

### Modify 23: Refactor to Method Chain
**Description:** Enable method chaining
```javascript
const calculator = {
  value: 0,
  add: function(n) { this.value += n; },
  multiply: function(n) { this.value *= n; },
  getValue: function() { return this.value; }
};
calculator.add(5);
calculator.multiply(2);
console.log(calculator.getValue());
```

### Modify 24: Add Generator Function
**Description:** Create generator for range
```javascript
function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
for (const n of range(1, 5)) {
  console.log(n);
}
```

### Modify 25: Convert to Async Callback
**Description:** Make function async with setTimeout
```javascript
function process(data) {
  return data.toUpperCase();
}
const result = process('hello');
console.log(result);
```

### Modify 26: Add Function Wrapper for Logging
**Description:** Wrap function with logging
```javascript
function add(a, b) {
  return a + b;
}
const result = add(3, 4);
console.log(result);
```

### Modify 27: Refactor to Arrow for Conciseness
**Description:** Use arrow for short callbacks
```javascript
const names = ['Alice', 'Bob', 'Charlie'];
const upper = names.map(function(name) {
  return name.toUpperCase();
});
console.log(upper);
```

### Modify 28: Add Safe Callback Pattern
**Description:** Check callback is function before calling
```javascript
function fetchData(callback) {
  const data = {id: 1};
  callback(data);
}
fetchData(null);
```

### Modify 29: Convert to Function Returning Function
**Description:** Create multiplier factory
```javascript
const double = n => n * 2;
const triple = n => n * 3;
const quadruple = n => n * 4;
console.log(double(5));
console.log(triple(5));
console.log(quadruple(5));
```

### Modify 30: Add Reduce with Callback
**Description:** Implement reduce using callback
```javascript
const nums = [1, 2, 3, 4, 5];
let sum = 0;
for (const n of nums) {
  sum += n;
}
console.log(sum);
```

### Modify 31: Refactor to Composition
**Description:** Compose multiple functions
```javascript
const clean = s => s.trim().toLowerCase();
const highlight = s => `**${s}**`;
const name = '  ALICE  ';
const cleanName = clean(name);
const highlighted = highlight(cleanName);
console.log(highlighted);
```

### Modify 32: Add Timeout Wrapper
**Description:** Add timeout to async operation
```javascript
function fetchUser(id, cb) {
  setTimeout(() => cb({id, name: 'User'}), 100);
}
fetchUser(1, user => console.log(user));
```

### Modify 33: Convert to Arrow for this Binding
**Description:** Fix this binding with arrow
```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(function() {
      console.log('Hello ' + this.name);
    }, 100);
  }
};
obj.greet();
```

### Modify 34: Add Function for Array Method
**Description:** Create reusable array processor
```javascript
const nums = [1, 2, 3, 4, 5];
const evens = [];
for (const n of nums) {
  if (n % 2 === 0) evens.push(n);
}
const squares = [];
for (const n of evens) {
  squares.push(n * n);
}
console.log(squares);
```

### Modify 35: Refactor to Async/Await with Callback
**Description:** Convert callback to async
```javascript
function getData(cb) {
  setTimeout(() => cb('data'), 100);
}
getData(result => console.log(result));
```

### Modify 36: Add Retry Wrapper
**Description:** Retry function on failure
```javascript
function unstableOperation() {
  if (Math.random() > 0.5) return 'success';
  throw new Error('failed');
}
try {
  console.log(unstableOperation());
} catch (e) {
  console.log('Failed');
}
```

### Modify 37: Convert to Pure Function
**Description:** Make function pure (no side effects)
```javascript
let total = 0;
function addToTotal(n) {
  total += n;
  return total;
}
console.log(addToTotal(5));
console.log(addToTotal(3));
```

### Modify 38: Add Function Caching with Map
**Description:** Cache using Map instead of object
```javascript
const cache = {};
function expensive(n) {
  if (cache[n]) return cache[n];
  cache[n] = n * n;
  return cache[n];
}
console.log(expensive(5));
console.log(expensive(5));
```

### Modify 39: Refactor to Tap Function
**Description:** Create tap utility for side effects
```javascript
const nums = [1, 2, 3];
const doubled = nums
  .map(n => { console.log('processing', n); return n * 2; });
console.log(doubled);
```

### Modify 40: Add Function for Conditional Pipeline
**Description:** Create pipeline with condition
```javascript
const nums = [1, 2, 3, 4, 5, 6];
let result = nums;
result = result.filter(n => n % 2 === 0);
result = result.map(n => n * 3);
result = result.reduce((a, b) => a + b, 0);
console.log(result);
```

### Modify 41: Convert to Arrow in Method
**Description:** Use arrow for method shorthand
```javascript
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};
console.log(obj.getValue());
```

### Modify 42: Add Function for Validation
**Description:** Create validator with callback
```javascript
function validateEmail(email) {
  return email.includes('@');
}
console.log(validateEmail('test@test.com'));
```

### Modify 43: Refactor to Function for Composition
**Description:** Extract functions for composition
```javascript
const name = '  alice smith  ';
const cleaned = name.trim();
const parts = cleaned.split(' ');
const formatted = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
console.log(formatted);
```

### Modify 44: Add Curried Sort Comparator
**Description:** Create curried comparator
```javascript
function sortByKey(arr, key) {
  return arr.sort((a, b) => a[key] - b[key]);
}
const users = [{age: 30}, {age: 20}, {age: 25}];
console.log(sortByKey(users, 'age'));
```

### Modify 45: Convert to Function Expression for Hoisting
**Description:** Fix hoisting issue
```javascript
const result = double(5);
function double(n) { return n * 2; }
console.log(result);
```

### Modify 46: Add Function with Default Callback
**Description:** Provide default callback
```javascript
function loadData(url, cb) {
  fetch(url).then(r => r.json()).then(cb);
}
loadData('/api/data', data => console.log(data));
```

### Modify 47: Refactor to Named Function
**Description:** Name anonymous function for debugging
```javascript
const factorial = function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
};
console.log(factorial(5));
```

### Modify 48: Add Sequence Executor
**Description:** Execute functions in sequence
```javascript
function step1() { console.log(1); }
function step2() { console.log(2); }
function step3() { console.log(3); }
step1();
step2();
step3();
```

### Modify 49: Convert to Function for Reusability
**Description:** Extract repeated logic to function
```javascript
const nums1 = [1, 2, 3];
const sum1 = nums1.reduce((a, b) => a + b, 0);
const nums2 = [4, 5, 6];
const sum2 = nums2.reduce((a, b) => a + b, 0);
console.log(sum1, sum2);
```

### Modify 50: Add Callback to Array Method
**Description:** Use callback in array method
```javascript
const nums = [1, 2, 3, 4, 5];
const result = [];
for (const n of nums) {
  if (n % 2 === 0) result.push(n * 3);
}
console.log(result);
```
