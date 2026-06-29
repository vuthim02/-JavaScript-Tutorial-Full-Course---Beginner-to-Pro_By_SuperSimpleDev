# Level 60: Advanced Functions

## Challenges 1-70: Error Snippets

### Error 1: forEach with Break
**Description:** Stop forEach early
```javascript
const nums = [1, 2, 3, 4, 5];
nums.forEach(n => {
  if (n > 3) break;
  console.log(n);
});
```

### Error 2: map with Side Effects
**Description:** Map should not have side effects
```javascript
const nums = [1, 2, 3];
const result = nums.map(n => {
  console.log(n);
  return n * 2;
});
console.log(result);
```

### Error 3: Closure Capture with var in Loop
**Description:** Create functions in loop
```javascript
const funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(() => console.log(i));
}
funcs[0]();
```

### Error 4: setTimeout with String
**Description:** Avoid string in setTimeout
```javascript
setTimeout('console.log("hello")', 1000);
```

### Error 5: setInterval Not Cleaned
**Description:** Clear interval on condition
```javascript
setInterval(() => console.log('tick'), 1000);
```

### Error 6: Arrow this in Method
**Description:** Arrow function as object method
```javascript
const obj = {
  name: 'Test',
  greet: () => console.log('Hello ' + this.name)
};
obj.greet();
```

### Error 7: addEventListener Reference
**Description:** Pass reference not call
```javascript
const btn = { addEventListener(evt, fn) {} };
const handler = () => console.log('click');
btn.addEventListener('click', handler());
```

### Error 8: Reduce Without Initial
**Description:** Sum empty array
```javascript
const nums = [];
const sum = nums.reduce((a, b) => a + b);
console.log(sum);
```

### Error 9: Filter Inverted Logic
**Description:** Remove elements that are too short
```javascript
const words = ['hi', 'hello', 'hey', 'greetings'];
const long = words.filter(w => w.length < 4);
console.log(long);
```

### Error 10: Map Without Return
**Description:** Transform each element
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => {
  n * 2;
});
console.log(doubled);
```

### Error 11: Sort Without Compare
**Description:** Sort numbers correctly
```javascript
const nums = [10, 5, 80, 2, 30];
nums.sort();
console.log(nums);
```

### Error 12: Splice Wrong Args
**Description:** Remove 2 elements from index 1
```javascript
const arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(1, 3);
console.log(arr);
```

### Error 13: Push Return Value
**Description:** Add item and get array length
```javascript
const arr = [1, 2, 3];
const result = arr.push(4);
console.log(result);
```

### Error 14: IndexOf NaN
**Description:** Find NaN in array
```javascript
const arr = [1, 2, NaN, 4];
const index = arr.indexOf(NaN);
console.log(index);
```

### Error 15: Array Constructor
**Description:** Create array with single element
```javascript
const arr = new Array(5);
console.log(arr.length);
```

### Error 16: Fill with Object
**Description:** Fill with unique objects
```javascript
const arr = new Array(3).fill({});
arr[0].name = 'test';
console.log(arr[1].name);
```

### Error 17: for...in on Array
**Description:** Iterate array correctly
```javascript
const arr = [10, 20, 30];
for (const key in arr) {
  console.log(arr[key]);
}
```

### Error 18: for...of on Object
**Description:** Iterate object properties
```javascript
const obj = {a: 1, b: 2};
for (const val of obj) {
  console.log(val);
}
```

### Error 19: Function Hoisting Expression
**Description:** Call function expression before definition
```javascript
console.log(double(5));
const double = function(n) { return n * 2; };
```

### Error 20: Return Object Arrow
**Description:** Arrow returning object literal
```javascript
const getObj = () => {name: 'Alice'};
console.log(getObj());
```

### Error 21: Anonymous Recursion
**Description:** Recursive anonymous function
```javascript
const factorial = function(n) {
  return n <= 1 ? 1 : n * arguments.callee(n - 1);
};
console.log(factorial(5));
```

### Error 22: Callback Not Function
**Description:** Pass non-function as callback
```javascript
function process(cb) {
  cb();
}
process(null);
```

### Error 23: this in Callback
**Description:** Access this in callback
```javascript
const obj = {
  data: [1, 2, 3],
  process: function() {
    this.data.forEach(function(n) {
      console.log(n * this.multiplier);
    });
  },
  multiplier: 2
};
obj.process();
```

### Error 24: Closure with Object Mutation
**Description:** Closure capturing object by reference
```javascript
function createLogger() {
  const obj = {msg: 'hello'};
  return function() {
    console.log(obj.msg);
  };
}
const log = createLogger();
log();
```

### Error 25: Event Listener Not Removed
**Description:** Remove event listener properly
```javascript
const btn = { listeners: [], addEventListener(evt, fn) { this.listeners.push(fn); }, removeEventListener(evt, fn) { this.listeners = this.listeners.filter(l => l !== fn); } };
const handler = () => console.log('hi');
btn.addEventListener('click', handler);
btn.removeEventListener('click', handler);
console.log(btn.listeners.length);
```

### Error 26: Multiple setInterval
**Description:** Avoid multiple intervals
```javascript
setInterval(() => console.log(1), 1000);
setInterval(() => console.log(2), 1000);
```

### Error 27: Recursive setTimeout Overlap
**Description:** Prevent overlapping calls
```javascript
function process() {
  console.log('processing');
  setTimeout(process, 1000);
}
process();
```

### Error 28: Promise in forEach
**Description:** Await in forEach
```javascript
const urls = ['/a', '/b', '/c'];
urls.forEach(async url => {
  await fetch(url);
});
console.log('done');
```

### Error 29: Array.from with Single Number
**Description:** Create array from number
```javascript
const arr = Array.from(5);
console.log(arr);
```

### Error 30: Destructuring Null
**Description:** Destructure possibly null value
```javascript
const data = null;
const [first] = data;
console.log(first);
```

### Error 31: Spread in Object
**Description:** Use spread correctly in object
```javascript
const arr = ['a', 'b'];
const obj = {...arr};
console.log(obj);
```

### Error 32: Rest in Middle
**Description:** Rest must be last
```javascript
const arr = [1, 2, 3, 4, 5];
const [a, ...rest, b] = arr;
console.log(a, b);
```

### Error 33: Reverse Mutates
**Description:** Reverse without mutation
```javascript
const original = [1, 2, 3];
const reversed = original.reverse();
console.log(original);
```

### Error 34: For Loop with Splice
**Description:** Remove items in for loop
```javascript
const nums = [1, 2, 3, 4, 5, 6];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) nums.splice(i, 1);
}
console.log(nums);
```

### Error 35: Delete on Array
**Description:** Remove element leaving hole
```javascript
const arr = [1, 2, 3, 4];
delete arr[2];
console.log(arr.length);
```

### Error 36: forEach Continue
**Description:** Skip in forEach
```javascript
const nums = [1, 2, 3, 4, 5];
nums.forEach(n => {
  if (n === 3) continue;
  console.log(n);
});
```

### Error 37: Map with Index
**Description:** Use correct map parameters
```javascript
const arr = ['a', 'b', 'c'];
const result = arr.map((item, index) => `${index}: ${item}`);
console.log(result);
```

### Error 38: FlatMap Return
**Description:** Return array from flatMap
```javascript
const nums = [1, 2, 3];
const result = nums.flatMap(n => [n, n * 2]);
console.log(result);
```

### Error 39: Some vs Every
**Description:** Use correct array method
```javascript
const nums = [1, 2, 3, 4, 5];
const allPositive = nums.some(n => n > 0);
console.log(allPositive);
```

### Error 40: Find vs Filter
**Description:** Get first vs all matches
```javascript
const nums = [1, 2, 3, 4, 5];
const firstEven = nums.filter(n => n % 2 === 0)[0];
console.log(firstEven);
```

### Error 41: Clone Nested Array
**Description:** Shallow copy vs deep copy
```javascript
const nested = [[1, 2], [3, 4]];
const copy = [...nested];
copy[0][0] = 99;
console.log(nested[0][0]);
```

### Error 42: Function Constructor
**Description:** Avoid Function constructor
```javascript
const add = new Function('a', 'b', 'return a + b');
console.log(add(5, 3));
```

### Error 43: eval Usage
**Description:** Avoid using eval
```javascript
const x = 10;
console.log(eval('x + 5'));
```

### Error 44: with Statement
**Description:** Avoid with statement
```javascript
const obj = {a: 1, b: 2};
with (obj) {
  console.log(a + b);
}
```

### Error 45: == vs ===
**Description:** Use strict equality
```javascript
if (0 == false) {
  console.log('loose');
}
```

### Error 46: Global Variable
**Description:** Accidental global
```javascript
function setVal() {
  val = 42;
}
setVal();
console.log(val);
```

### Error 47: Semicolon Insertion
**Description:** Avoid ASI issues
```javascript
function getValue() {
  return
    {value: 42};
}
console.log(getValue());
```

### Error 48: Comma Operator
**Description:** Understand comma operator
```javascript
const x = (1, 2, 3);
console.log(x);
```

### Error 49: typeof null
**Description:** typeof null returns object
```javascript
console.log(typeof null);
```

### Error 50: NaN !== NaN
**Description:** NaN equality check
```javascript
console.log(NaN === NaN);
```

### Error 51: parseInt Without Radix
**Description:** Always specify radix
```javascript
console.log(parseInt('08'));
```

### Error 52: Floating Point Precision
**Description:** Avoid float comparison
```javascript
console.log(0.1 + 0.2 === 0.3);
```

### Error 53: Truthy/Falsy
**Description:** Understand falsy values
```javascript
if ([]) console.log('truthy');
if ('') console.log('falsy');
```

### Error 54: Hoisting var
**Description:** var hoisting behavior
```javascript
console.log(x);
var x = 5;
```

### Error 55: TDZ let
**Description:** Temporal dead zone
```javascript
console.log(x);
let x = 5;
```

### Error 56: Const Reassignment
**Description:** Const cannot be reassigned
```javascript
const x = 5;
x = 10;
```

### Error 57: Block Scope var
**Description:** var leaks block
```javascript
if (true) {
  var x = 5;
}
console.log(x);
```

### Error 58: Octal Literal
**Description:** Strict mode octal
```javascript
'use strict';
const x = 012;
console.log(x);
```

### Error 59: Duplicate Parameter
**Description:** Strict mode duplicates
```javascript
'use strict';
function sum(a, a) {
  return a + a;
}
console.log(sum(1, 2));
```

### Error 60: Deleting Variable
**Description:** Cannot delete variables
```javascript
'use strict';
const x = 5;
delete x;
```

### Error 61: arguments in Arrow
**Description:** Arrow has no arguments
```javascript
const sum = () => Array.from(arguments).reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3));
```

### Error 62: new with Arrow
**Description:** Arrow cannot be constructor
```javascript
const Foo = () => {};
const f = new Foo();
```

### Error 63: Prototype with Arrow
**Description:** Arrow as prototype method
```javascript
function Person(name) { this.name = name; }
Person.prototype.greet = () => 'Hello ' + this.name;
const p = new Person('Alice');
console.log(p.greet());
```

### Error 64: Async Return
**Description:** Async returns promise
```javascript
async function getValue() {
  return 42;
}
console.log(getValue());
```

### Error 65: await Non-Promise
**Description:** await without async
```javascript
function getValue() {
  return Promise.resolve(42);
}
const val = await getValue();
console.log(val);
```

### Error 66: Promise Constructor
**Description:** Avoid Promise constructor antipattern
```javascript
const promise = new Promise((resolve) => {
  setTimeout(() => resolve(42), 100);
});
promise.then(console.log);
```

### Error 67: Then/Catch Order
**Description:** Order of then/catch
```javascript
Promise.resolve(42)
  .then(v => { throw new Error('fail'); })
  .then(v => console.log(v))
  .catch(e => console.log(e.message));
```

### Error 68: Finally Return
**Description:** Finally return is ignored
```javascript
Promise.resolve(42)
  .finally(() => { return 'ignored'; })
  .then(v => console.log(v));
```

### Error 69: Throw Non-Error
**Description:** Throw non-Error
```javascript
try {
  throw 'string error';
} catch (e) {
  console.log(typeof e);
}
```

### Error 70: Try-Catch in Promise
**Description:** Try-catch won't catch promise
```javascript
try {
  Promise.reject('fail');
} catch (e) {
  console.log('caught');
}
```

## Challenges 71-100: Issue Snippets

### Issue 1: for Loop Where forEach Works
**Description:** Iterate with simple callback
```javascript
const items = ['a', 'b', 'c'];
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

### Issue 2: Manual Map with Loop
**Description:** Transform array manually
```javascript
const nums = [1, 2, 3, 4, 5];
const doubled = [];
for (let i = 0; i < nums.length; i++) {
  doubled.push(nums[i] * 2);
}
console.log(doubled);
```

### Issue 3: Manual Filter
**Description:** Filter with for loop
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) evens.push(nums[i]);
}
console.log(evens);
```

### Issue 4: Nested Loops for Simple Task
**Description:** Flatten nested array
```javascript
const matrix = [[1, 2], [3, 4], [5, 6]];
const flat = [];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    flat.push(matrix[i][j]);
  }
}
console.log(flat);
```

### Issue 5: Delete on Array
**Description:** Remove element incorrectly
```javascript
const arr = [1, 2, 3, 4, 5];
delete arr[2];
console.log(arr);
```

### Issue 6: Function in Loop
**Description:** Define function inside loop
```javascript
for (let i = 0; i < 3; i++) {
  function log() { console.log(i); }
  log();
}
```

### Issue 7: Global setInterval
**Description:** Unmanaged interval
```javascript
setInterval(() => console.log('updating'), 1000);
```

### Issue 8: Callback Hell
**Description:** Nested callbacks
```javascript
setTimeout(() => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    setTimeout(() => {
      console.log(3);
    }, 1000);
  }, 1000);
}, 1000);
```

### Issue 9: var in Loop
**Description:** Using var instead of let
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Issue 10: Manual Reduce
**Description:** Sum with for loop
```javascript
const nums = [1, 2, 3, 4, 5];
let sum = 0;
for (const n of nums) {
  sum += n;
}
console.log(sum);
```

### Issue 11: Manual Some
**Description:** Check with loop
```javascript
const nums = [1, 2, 3, 4, 5];
let hasEven = false;
for (const n of nums) {
  if (n % 2 === 0) { hasEven = true; break; }
}
console.log(hasEven);
```

### Issue 12: Manual Every
**Description:** Check all with loop
```javascript
const nums = [1, 2, 3, 4, 5];
let allPositive = true;
for (const n of nums) {
  if (n <= 0) { allPositive = false; break; }
}
console.log(allPositive);
```

### Issue 13: Manual Find
**Description:** Find with loop
```javascript
const nums = [1, 2, 3, 4, 5];
let found = null;
for (const n of nums) {
  if (n > 3) { found = n; break; }
}
console.log(found);
```

### Issue 14: Manual Includes
**Description:** Check includes with loop
```javascript
const arr = ['a', 'b', 'c'];
const target = 'b';
let found = false;
for (const x of arr) {
  if (x === target) { found = true; break; }
}
console.log(found);
```

### Issue 15: Object.keys Loop
**Description:** Iterate object keys with loop
```javascript
const obj = {a: 1, b: 2, c: 3};
const keys = Object.keys(obj);
for (let i = 0; i < keys.length; i++) {
  console.log(keys[i], obj[keys[i]]);
}
```

### Issue 16: Multiple Ifs Instead of Switch
**Description:** Multiple conditions
```javascript
const val = 2;
if (val === 1) console.log('one');
if (val === 2) console.log('two');
if (val === 3) console.log('three');
```

### Issue 17: Long Ternary Chain
**Description:** Ternary instead of if-else
```javascript
const score = 85;
const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';
console.log(grade);
```

### Issue 18: Magic Numbers
**Description:** Hardcoded numbers
```javascript
if (age >= 18 && age <= 65) {
  console.log('working age');
}
```

### Issue 19: Nested Ternaries
**Description:** Complex nested ternary
```javascript
const x = 5;
const result = x > 0 ? (x > 10 ? 'large' : 'medium') : 'negative';
console.log(result);
```

### Issue 20: Double Negation
**Description:** Boolean coercion
```javascript
const val = 0;
if (!!val) {
  console.log('truthy');
}
```

### Issue 21: Assignment in Condition
**Description:** Accidental assignment
```javascript
let x;
if (x = 5) {
  console.log('always true');
}
```

### Issue 22: Swallow Copy Object
**Description:** Object reference issue
```javascript
const a = {name: 'Alice'};
const b = a;
b.name = 'Bob';
console.log(a.name);
```

### Issue 23: Type Coercion
**Description:** Implicit coercion
```javascript
console.log('5' - 3);
console.log('5' + 3);
```

### Issue 24: Missing Break in Switch
**Description:** Fall-through in switch
```javascript
switch (2) {
  case 1: console.log('one');
  case 2: console.log('two');
  case 3: console.log('three');
}
```

### Issue 25: For-in for Array
**Description:** Using for-in with array
```javascript
const arr = [10, 20, 30];
for (const i in arr) {
  console.log(arr[i]);
}
```

### Issue 26: String to Number
**Description:** Loose string to number
```javascript
console.log('42' * 1);
```

### Issue 27: Array to String
**Description:** Implicit array toString
```javascript
console.log([1, 2, 3] + '');
```

### Issue 28: setTimeout(0) Misunderstanding
**Description:** Zero delay meaning
```javascript
console.log('start');
setTimeout(() => console.log('mid'), 0);
console.log('end');
```

### Issue 29: Promise.resolve vs new Promise
**Description:** Unnecessary Promise wrapper
```javascript
const p = new Promise((resolve) => resolve(42));
p.then(console.log);
```

### Issue 30: Async IIFE
**Description:** Top-level await alternative
```javascript
(async () => {
  const data = await Promise.resolve('data');
  console.log(data);
})();
```

## Challenges 101-150: Modification Snippets

### Modify 1: Convert for Loop to forEach
**Description:** Use forEach instead of for
```javascript
const items = ['a', 'b', 'c'];
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

### Modify 2: Convert forEach to Map
**Description:** Transform with map
```javascript
const nums = [1, 2, 3];
const doubled = [];
nums.forEach(n => doubled.push(n * 2));
console.log(doubled);
```

### Modify 3: Add Accumulator Pattern
**Description:** Sum with reduce
```javascript
const prices = [10, 20, 30];
let total = 0;
for (const p of prices) {
  total += p;
}
console.log(total);
```

### Modify 4: Implement Array Chunking
**Description:** Split array into chunks of 3
```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// TODO: Chunk into groups of 3
```

### Modify 5: Add Auto-Play with setInterval
**Description:** Auto-advance through array
```javascript
const items = ['A', 'B', 'C', 'D'];
let index = 0;
function showNext() {
  console.log(items[index]);
  index = (index + 1) % items.length;
}
```

### Modify 6: Refactor to Arrow Functions
**Description:** Convert to arrow functions
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(n) {
  return n * 2;
});
const evens = numbers.filter(function(n) {
  return n % 2 === 0;
});
console.log(doubled, evens);
```

### Modify 7: Add Cleanup with clearInterval
**Description:** Stop interval after condition
```javascript
setInterval(() => {
  console.log('tick');
}, 1000);
```

### Modify 8: Convert to Method Chaining
**Description:** Chain array methods
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = [];
for (const n of nums) {
  if (n % 2 === 0) evens.push(n);
}
const doubled = [];
for (const n of evens) {
  doubled.push(n * 2);
}
let sum = 0;
for (const n of doubled) {
  sum += n;
}
console.log(sum);
```

### Modify 9: Convert to forEach with this
**Description:** Use forEach with thisArg
```javascript
const obj = {mult: 2};
const nums = [1, 2, 3];
const result = [];
for (const n of nums) {
  result.push(n * obj.mult);
}
console.log(result);
```

### Modify 10: Add Debounce to Function
**Description:** Debounce a search function
```javascript
function search(query) {
  console.log('Searching:', query);
}
search('hel');
search('hello');
```

### Modify 11: Convert to Filter Map
**Description:** Filter then map
```javascript
const users = [
  {name: 'Alice', active: true},
  {name: 'Bob', active: false},
  {name: 'Charlie', active: true}
];
const names = [];
for (const u of users) {
  if (u.active) names.push(u.name);
}
console.log(names);
```

### Modify 12: Add Sort with Compare
**Description:** Sort with custom comparator
```javascript
const nums = [10, 5, 80, 2, 30];
nums.sort();
console.log(nums);
```

### Modify 13: Refactor to Reduce for Grouping
**Description:** Group by property
```javascript
const items = [
  {cat: 'food', name: 'apple'},
  {cat: 'drink', name: 'soda'},
  {cat: 'food', name: 'banana'}
];
const grouped = {};
for (const item of items) {
  if (!grouped[item.cat]) grouped[item.cat] = [];
  grouped[item.cat].push(item);
}
console.log(grouped);
```

### Modify 14: Add FlatMap for Expansion
**Description:** Expand array items
```javascript
const nums = [2, 3, 1];
const expanded = [];
for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < nums[i]; j++) {
    expanded.push(nums[i]);
  }
}
console.log(expanded);
```

### Modify 15: Convert to Some/Every
**Description:** Use array methods
```javascript
const nums = [1, 2, 3, 4, 5];
let hasEven = false;
for (const n of nums) {
  if (n % 2 === 0) { hasEven = true; break; }
}
let allPositive = true;
for (const n of nums) {
  if (n <= 0) { allPositive = false; break; }
}
console.log(hasEven, allPositive);
```

### Modify 16: Add Closure for Counter
**Description:** Private counter with closure
```javascript
let count = 0;
function increment() { return ++count; }
function reset() { count = 0; }
console.log(increment());
console.log(increment());
reset();
console.log(increment());
```

### Modify 17: Refactor to Compose
**Description:** Compose functions
```javascript
const trim = s => s.trim();
const lower = s => s.toLowerCase();
const name = '  ALICE  ';
const result = lower(trim(name));
console.log(result);
```

### Modify 18: Add Function Binding
**Description:** Bind function context
```javascript
const obj = {name: 'Alice'};
function greet() { console.log('Hello ' + this.name); }
greet();
```

### Modify 19: Convert to Arrow for this
**Description:** Fix this with arrow
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

### Modify 20: Add Promisify
**Description:** Convert callback to promise
```javascript
function readFile(path, cb) {
  setTimeout(() => cb(null, 'content'), 100);
}
readFile('/file', (err, data) => {
  if (!err) console.log(data);
});
```

### Modify 21: Refactor to Async/Await
**Description:** Use async/await
```javascript
function fetchData() {
  return fetch('/api').then(r => r.json()).then(d => console.log(d));
}
fetchData();
```

### Modify 22: Add Error Boundary
**Description:** Wrap in try-catch
```javascript
function riskyOperation() {
  throw new Error('fail');
}
riskyOperation();
```

### Modify 23: Convert to Rest Params
**Description:** Use rest parameters
```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3, 4, 5));
```

### Modify 24: Add Default Parameters
**Description:** Use default parameters
```javascript
function greet(name) {
  console.log('Hello ' + (name || 'Guest'));
}
greet();
```

### Modify 25: Refactor to Spread
**Description:** Use spread operator
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined);
```

### Modify 26: Add Destructuring
**Description:** Use destructuring
```javascript
const point = [10, 20];
const x = point[0];
const y = point[1];
console.log(x, y);
```

### Modify 27: Convert to Template Literals
**Description:** Use template literals
```javascript
const name = 'Alice';
const age = 30;
console.log('My name is ' + name + ' and I am ' + age + ' years old.');
```

### Modify 28: Add Ternary Operator
**Description:** Use ternary
```javascript
const age = 20;
let status;
if (age >= 18) {
  status = 'adult';
} else {
  status = 'minor';
}
console.log(status);
```

### Modify 29: Refactor to Short-Circuit
**Description:** Use short-circuit evaluation
```javascript
let name;
if (name) {
  console.log(name);
} else {
  console.log('Guest');
}
```

### Modify 30: Add Optional Chaining
**Description:** Use optional chaining
```javascript
const user = {address: {city: 'NYC'}};
const city = user && user.address && user.address.city;
console.log(city);
```

### Modify 31: Convert to Nullish Coalescing
**Description:** Use nullish coalescing
```javascript
const value = 0;
const result = value !== null && value !== undefined ? value : 'default';
console.log(result);
```

### Modify 32: Add Object Spread
**Description:** Use object spread
```javascript
const base = {a: 1, b: 2};
const copy = Object.assign({}, base);
console.log(copy);
```

### Modify 33: Refactor to Array.from
**Description:** Use Array.from
```javascript
const divs = document.querySelectorAll('div');
const arr = [];
for (let i = 0; i < divs.length; i++) {
  arr.push(divs[i]);
}
console.log(arr);
```

### Modify 34: Add Set for Uniqueness
**Description:** Use Set for unique
```javascript
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [];
for (const n of nums) {
  if (!unique.includes(n)) unique.push(n);
}
console.log(unique);
```

### Modify 35: Convert to Map
**Description:** Use Map data structure
```javascript
const obj = {a: 1, b: 2, c: 3};
for (const key in obj) {
  console.log(key, obj[key]);
}
```

### Modify 36: Add for...of with entries
**Description:** Use entries with for...of
```javascript
const arr = ['a', 'b', 'c'];
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
}
```

### Modify 37: Refactor to IIFE
**Description:** Use IIFE for isolation
```javascript
const x = 5;
console.log(x);
```

### Modify 38: Add Event Delegation
**Description:** Use event delegation
```javascript
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => console.log('clicked'));
});
```

### Modify 39: Convert to Passive Listener
**Description:** Improve scroll performance
```javascript
document.addEventListener('touchstart', (e) => {
  e.preventDefault();
});
```

### Modify 40: Add Once Listener
**Description:** Fire once
```javascript
const btn = { addEventListener(evt, fn) { this.handler = fn; } };
btn.addEventListener('click', () => console.log('clicked'));
btn.handler();
btn.handler();
```

### Modify 41: Refactor to Module Pattern
**Description:** Module with closure
```javascript
const app = {
  config: {theme: 'dark'},
  init() { console.log('init'); }
};
app.init();
```

### Modify 42: Add Throttle Function
**Description:** Throttle calls
```javascript
function handleScroll() {
  console.log('scroll');
}
window.addEventListener('scroll', handleScroll);
```

### Modify 43: Convert to Pipe
**Description:** Function composition with pipe
```javascript
const add1 = n => n + 1;
const double = n => n * 2;
const result = double(add1(5));
console.log(result);
```

### Modify 44: Add Curry
**Description:** Curried function
```javascript
function add(a, b) {
  return a + b;
}
console.log(add(5, 3));
```

### Modify 45: Refactor to Partial Application
**Description:** Partial application
```javascript
function multiply(a, b, c) {
  return a * b * c;
}
console.log(multiply(2, 3, 4));
```

### Modify 46: Add Memoization
**Description:** Cache results
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10));
```

### Modify 47: Convert to Generator
**Description:** Generator function
```javascript
function countTo(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
}
for (const n of countTo(5)) console.log(n);
```

### Modify 48: Add Symbol.iterator
**Description:** Custom iterator
```javascript
const range = {from: 1, to: 5};
// TODO: Make iterable
```

### Modify 49: Refactor to Proxy
**Description:** Use Proxy for validation
```javascript
const user = {name: 'Alice', age: 25};
// TODO: Add validation proxy
```

### Modify 50: Add Reflect
**Description:** Use Reflect API
```javascript
const obj = {name: 'Alice'};
console.log(obj.name);
```
