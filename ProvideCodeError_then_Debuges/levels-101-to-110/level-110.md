# Debugging Challenges - Level 110
## Theme: Comprehensive Fundamentals Mega-Review

---

### Error 1: Variable declaration missing
**Description:** Should declare variable before using it
```javascript
total = 100;
console.log(total);
```

### Error 2: String vs number concatenation
**Description:** Should add numbers, not concatenate
```javascript
let result = "10" + 20 + 30;
console.log(result);
```

### Error 3: Function return undefined
**Description:** Function should return calculated value
```javascript
function double(x) {
  let result = x * 2;
}
console.log(double(5));
```

### Error 4: Const reassignment
**Description:** Should allow variable to be updated
```javascript
const MAX = 100;
MAX = 200;
console.log(MAX);
```

### Error 5: Object property access
**Description:** Should access object property correctly
```javascript
let person = {name: "John", age: 30};
console.log(person.name);
```

### Error 6: Array index access
**Description:** Should access array element at index
```javascript
let arr = [10, 20, 30];
console.log(arr(1));
```

### Error 7: If condition assignment
**Description:** Should compare, not assign in condition
```javascript
let x = 10;
if (x = 5) {
  console.log("equal");
}
```

### Error 8: Loop condition off by one
**Description:** Should loop 5 times
```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### Error 9: String method case
**Description:** Should convert to uppercase
```javascript
let str = "hello";
console.log(str.toUppercase());
```

### Error 10: Math method missing
**Description:** Should round number to nearest integer
```javascript
let num = 4.7;
console.log(Math.round(num));
```

### Error 11: Template literal quotes
**Description:** Should use backticks for template literal
```javascript
let name = "John";
console.log('Hello ${name}');
```

### Error 12: Typeof comparison
**Description:** Should check type of variable
```javascript
let x = 42;
if (typeof x === "number") {
  console.log("is number");
}
```

### Error 13: Undefined variable in math
**Description:** Should use defined variables
```javascript
let a = 5, b = 10;
let sum = a + c;
console.log(sum);
```

### Error 14: Function call before declaration
**Description:** Should call function after hoisting
```javascript
console.log(double(5));
function double(x) { return x * 2; }
```

### Error 15: Wrong operator for exponent
**Description:** Should calculate 3 to the power of 4
```javascript
let result = 3 ^ 4;
console.log(result);
```

### Error 16: Missing parameter in function
**Description:** Function should use all parameters
```javascript
function add(a, b, c) {
  return a + b;
}
console.log(add(1, 2, 3));
```

### Error 17: Return outside function
**Description:** Should not use return outside function
```javascript
if (true) {
  return 42;
}
```

### Error 18: Break outside loop
**Description:** Should only break inside loop
```javascript
if (true) {
  break;
}
```

### Error 19: Semicolon after function
**Description:** Should not put semicolon after function declaration
```javascript
function greet() {
  console.log("Hello");
};
greet();
```

### Error 20: Wrong quotes in string
**Description:** Should use matching quotes
```javascript
let str = "hello';
console.log(str);
```

### Error 21: Missing closing bracket
**Description:** Should close all brackets properly
```javascript
let obj = {name: "John", age: 30;
console.log(obj);
```

### Error 22: Comma in number
**Description:** Should use dot for decimals
```javascript
let pi = 3,14;
console.log(pi * 2);
```

### Error 23: Wrong comment syntax
**Description:** Should use correct comment syntax
```javascript
// This is a comment
console.log("test");
```

### Error 24: Variable name reserved
**Description:** Should not use reserved keywords
```javascript
let let = 5;
console.log(let);
```

### Error 25: Arrow function return
**Description:** Should return value from arrow function
```javascript
let add = (a, b) => a + b;
console.log(add(3, 4));
```

### Error 26: Object method call
**Description:** Should call object method correctly
```javascript
let calculator = {
  add: function(a, b) { return a + b; }
};
console.log(calculator.add(5, 3));
```

### Error 27: Array push return
**Description:** Should use push correctly
```javascript
let arr = [];
arr.push(1, 2, 3);
console.log(arr);
```

### Error 28: String length property
**Description:** Should get length of string
```javascript
let str = "hello";
console.log(str.length);
```

### Error 29: Number parseFloat
**Description:** Should parse float from string
```javascript
let num = parseFloat("3.14");
console.log(num + 1);
```

### Error 30: Boolean condition
**Description:** Should check boolean condition
```javascript
let isReady = true;
if (isReady) {
  console.log("Ready!");
}
```

### Error 31: Logical AND
**Description:** Should use && correctly
```javascript
let a = true, b = false;
if (a && b) {
  console.log("both true");
}
```

### Error 32: Logical OR
**Description:** Should use || correctly
```javascript
let a = false, b = true;
if (a || b) {
  console.log("at least one true");
}
```

### Error 33: Ternary operator
**Description:** Should use ternary operator correctly
```javascript
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status);
```

### Error 34: Null vs undefined
**Description:** Should distinguish null and undefined
```javascript
let a = null, b;
console.log(a === b);
```

### Error 35: Global scope pollution
**Description:** Should not create global variable accidentally
```javascript
function test() {
  x = 10;
}
test();
console.log(x);
```

### Error 36: Block scope with var
**Description:** Should understand var vs let scope
```javascript
if (true) {
  var x = 10;
}
console.log(x);
```

### Error 37: Hoisting with let
**Description:** Cannot access let before declaration
```javascript
console.log(x);
let x = 10;
```

### Error 38: Function expression hoisting
**Description:** Function expressions are not hoisted
```javascript
console.log(double(5));
let double = function(x) { return x * 2; };
```

### Error 39: This context in method
**Description:** Should access object property with this
```javascript
let obj = {
  name: "John",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
obj.greet();
```

### Error 40: Arrow function this
**Description:** Arrow functions don't have own this
```javascript
let obj = {
  name: "John",
  greet: () => {
    console.log("Hello, " + this.name);
  }
};
obj.greet();
```

### Error 41: For-in enumerates properties
**Description:** Should iterate array with for-of
```javascript
let arr = [10, 20, 30];
for (let i in arr) {
  console.log(i);
}
```

### Error 42: For-of on object
**Description:** Should iterate object with for-in
```javascript
let obj = {a: 1, b: 2};
for (let key of obj) {
  console.log(key);
}
```

### Error 43: While loop infinite
**Description:** Should terminate while loop
```javascript
let i = 0;
while (i < 5) {
  console.log(i);
}
```

### Error 44: Do-while condition
**Description:** Should use do-while correctly
```javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
```

### Error 45: Switch default position
**Description:** Default should be at end of switch
```javascript
let x = 2;
switch(x) {
  default: console.log("default");
  case 1: console.log("one");
  case 2: console.log("two");
}
```

### Error 46: Strict equality
**Description:** Should use === for strict comparison
```javascript
if (5 === "5") {
  console.log("strictly equal");
}
```

### Error 47: Loose equality
**Description:** Should understand == type coercion
```javascript
console.log(false == "0");
```

### Error 48: Falsy values
**Description:** Should understand falsy values
```javascript
if (0) {
  console.log("truthy");
}
```

### Error 49: Truthy values
**Description:** Should understand truthy values
```javascript
if ("hello") {
  console.log("truthy");
}
```

### Error 50: Short-circuit evaluation
**Description:** Should understand short-circuit
```javascript
let x = 0;
let y = x || 10;
console.log(y);
```

### Error 51: Nullish coalescing
**Description:** Should use ?? for null/undefined only
```javascript
let x = 0;
let y = x ?? 10;
console.log(y);
```

### Error 52: Optional chaining
**Description:** Should safely access nested property
```javascript
let obj = {a: {b: {c: 42}}};
console.log(obj?.a?.b?.c);
```

### Error 53: Spread operator array
**Description:** Should spread array into function
```javascript
let nums = [1, 2, 3];
console.log(Math.max(...nums));
```

### Error 54: Spread operator object
**Description:** Should spread object into new object
```javascript
let obj1 = {a: 1, b: 2};
let obj2 = {...obj1, c: 3};
console.log(obj2);
```

### Error 55: Rest parameters
**Description:** Should use rest to collect arguments
```javascript
function sum(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}
console.log(sum(1, 2, 3));
```

### Error 56: Default parameters
**Description:** Should use default parameter value
```javascript
function greet(name = "Guest") {
  console.log("Hello, " + name);
}
greet();
```

### Error 57: Destructuring array
**Description:** Should destructure array elements
```javascript
let [a, b] = [1, 2, 3];
console.log(a, b);
```

### Error 58: Destructuring object
**Description:** Should destructure object properties
```javascript
let {name, age} = {name: "John", age: 30};
console.log(name, age);
```

### Error 59: Nested destructuring
**Description:** Should destructure nested object
```javascript
let data = {user: {name: "John", age: 30}};
let {user: {name}} = data;
console.log(name);
```

### Error 60: Swap variables
**Description:** Should swap two variables
```javascript
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);
```

### Error 61: String repeat
**Description:** Should repeat string n times
```javascript
let str = "abc".repeat(3);
console.log(str);
```

### Error 62: String includes
**Description:** Should check if string contains substring
```javascript
let str = "hello world";
console.log(str.includes("world"));
```

### Error 63: String startsWith
**Description:** Should check if string starts with prefix
```javascript
let str = "hello world";
console.log(str.startsWith("hello"));
```

### Error 64: String endsWith
**Description:** Should check if string ends with suffix
```javascript
let str = "hello world";
console.log(str.endsWith("world"));
```

### Error 65: String padStart
**Description:** Should pad string to minimum length
```javascript
let str = "5";
console.log(str.padStart(3, "0"));
```

### Error 66: String padEnd
**Description:** Should pad string at the end
```javascript
let str = "hello";
console.log(str.padEnd(10, "."));
```

### Error 67: String trim
**Description:** Should remove whitespace from both ends
```javascript
let str = "  hello  ";
console.log(str.trim());
```

### Error 68: String trimStart
**Description:** Should remove leading whitespace
```javascript
let str = "  hello";
console.log(str.trimStart());
```

### Error 69: String trimEnd
**Description:** Should remove trailing whitespace
```javascript
let str = "hello  ";
console.log(str.trimEnd());
```

### Error 70: Array flat
**Description:** Should flatten nested array
```javascript
let arr = [1, [2, [3]]];
console.log(arr.flat(2));
```

---

### Issue 1: Operator precedence
**Description:** Should evaluate (2 + 3) * 4
```javascript
let result = 2 + 3 * 4;
console.log(result);
```

### Issue 2: Floating point comparison
**Description:** Should compare 0.1 + 0.2 with 0.3
```javascript
console.log(0.1 + 0.2 === 0.3);
```

### Issue 3: Type coercion in if
**Description:** Should check for empty string correctly
```javascript
let str = "";
if (str) {
  console.log("not empty");
}
```

### Issue 4: Array sort default
**Description:** Should sort numbers correctly
```javascript
let nums = [1, 30, 4, 21, 100];
nums.sort();
console.log(nums);
```

### Issue 5: Delete array element
**Description:** Should remove element without leaving hole
```javascript
let arr = [1, 2, 3];
delete arr[1];
console.log(arr.length);
```

### Issue 6: For-in vs for-of
**Description:** Should iterate values, not indices
```javascript
let arr = [10, 20, 30];
for (let i in arr) {
  console.log(i);
}
```

### Issue 7: Const with objects
**Description:** Should understand const with objects
```javascript
const obj = {name: "John"};
obj.name = "Jane";
console.log(obj.name);
```

### Issue 8: Undefined array element
**Description:** Should handle sparse array
```javascript
let arr = [1, , 3];
console.log(arr[1]);
```

### Issue 9: Not vs inequality
**Description:** Should use !== for strict inequality
```javascript
console.log(5 != "5");
```

### Issue 10: Single line if without braces
**Description:** Should understand single line if
```javascript
let x = 10;
if (x > 5) console.log("greater");
```

### Issue 11: Comma operator
**Description:** Should understand comma operator
```javascript
let x = (1, 2, 3);
console.log(x);
```

### Issue 12: Unary plus vs concatenation
**Description:** Should convert string to number with +
```javascript
let result = +"5" + 3;
console.log(result);
```

### Issue 13: Increment operator placement
**Description:** Should understand prefix vs postfix
```javascript
let x = 5;
let y = x++;
console.log(y);
```

### Issue 14: parseInt radix
**Description:** Should specify radix for parseInt
```javascript
console.log(parseInt("010"));
```

### Issue 15: toFixed returns string
**Description:** Should handle toFixed returning string
```javascript
let result = (9.99).toFixed(2) + 1;
console.log(result);
```

### Issue 16: NaN check with isNaN
**Description:** Should check for NaN correctly
```javascript
let val = NaN;
console.log(val === NaN);
```

### Issue 17: Array length with delete
**Description:** Should understand delete doesn't change length
```javascript
let arr = [1, 2, 3];
delete arr[2];
console.log(arr.length);
```

### Issue 18: Function name vs variable
**Description:** Should not shadow function with variable
```javascript
function double(x) { return x * 2; }
let double = 5;
console.log(double(3));
```

### Issue 19: Return object literal
**Description:** Should return object from arrow function
```javascript
let create = () => {value: 42};
console.log(create());
```

### Issue 20: Switch without break
**Description:** Should prevent fall-through in switch
```javascript
let x = 2;
switch(x) {
  case 1: console.log("one");
  case 2: console.log("two");
  case 3: console.log("three");
}
```

### Issue 21: Modulo with negative
**Description:** Should handle negative modulo
```javascript
console.log(-7 % 3);
```

### Issue 22: Math.random range
**Description:** Should generate random 1-10
```javascript
let rand = Math.random() * 10;
console.log(rand);
```

### Issue 23: String immutability
**Description:** Should understand strings are immutable
```javascript
let str = "hello";
str[0] = "H";
console.log(str);
```

### Issue 24: Array copy by reference
**Description:** Should copy array, not reference
```javascript
let a = [1, 2, 3];
let b = a;
b.push(4);
console.log(a.length);
```

### Issue 25: Object copy by reference
**Description:** Should clone object, not reference
```javascript
let obj1 = {a: 1};
let obj2 = obj1;
obj2.a = 2;
console.log(obj1.a);
```

### Issue 26: Truthy check on empty array
**Description:** Empty array is truthy
```javascript
let arr = [];
if (arr) {
  console.log("array exists");
}
```

### Issue 27: typeof null
**Description:** typeof null returns "object"
```javascript
console.log(typeof null);
```

### Issue 28: Global parseInt vs Number.parseInt
**Description:** Should use Number.parseInt
```javascript
console.log(parseInt === Number.parseInt);
```

### Issue 29: Array constructor with one arg
**Description:** Array(3) creates [empty × 3]
```javascript
let arr = new Array(3);
console.log(arr.length);
```

### Issue 30: Chaining array methods
**Description:** Should chain array methods correctly
```javascript
let nums = [1, 2, 3, 4, 5];
let result = nums.filter(n => n > 2).map(n => n * 2).reduce((s, n) => s + n, 0);
console.log(result);
```

---

### Modify 1: Add input validation
**Description:** Validate that input is a number before processing
```javascript
function process(value) {
  return value * 2;
}
```

### Modify 2: Add error handling
**Description:** Try-catch for JSON parsing
```javascript
let data = '{"name": "John"}';
let obj = JSON.parse(data);
```

### Modify 3: Add localStorage persistence
**Description:** Save and load data from localStorage
```javascript
let settings = {theme: "dark", fontSize: 14};
```

### Modify 4: Add debounce to input
**Description:** Delay function execution until after pause
```javascript
function handleInput(value) {
  console.log(value);
}
```

### Modify 5: Add throttle to scroll
**Description:** Limit function execution rate
```javascript
function handleScroll() {
  console.log("scrolled");
}
```

### Modify 6: Add memoization
**Description:** Cache function results for performance
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

### Modify 7: Add recursion
**Description:** Implement recursive solution for tree traversal
```javascript
function traverse(node) {
  return node;
}
```

### Modify 8: Add closure for counter
**Description:** Create counter with private state
```javascript
function createCounter() {
  return 0;
}
let counter = createCounter();
```

### Modify 9: Add IIFE for module pattern
**Description:** Create module using IIFE
```javascript
let module = {};
```

### Modify 10: Add factory function
**Description:** Create objects using factory pattern
```javascript
function createPerson(name, age) {
  return {};
}
```

### Modify 11: Add prototype method
**Description:** Add method to constructor prototype
```javascript
function Person(name) {
  this.name = name;
}
let p = new Person("John");
```

### Modify 12: Add class syntax
**Description:** Convert constructor to ES6 class
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log("Hello, " + this.name);
};
```

### Modify 13: Add getter/setter
**Description:** Add getter and setter for property
```javascript
let person = {name: "John"};
```

### Modify 14: Add Symbol property
**Description:** Use Symbol for private-like property
```javascript
let obj = {name: "John"};
```

### Modify 15: Add iterator
**Description:** Make object iterable with Symbol.iterator
```javascript
let range = {start: 1, end: 5};
```

### Modify 16: Add generator function
**Description:** Create generator that yields values
```javascript
function count() {
  return 0;
}
```

### Modify 17: Add async/await
**Description:** Convert promise chain to async/await
```javascript
function fetchData() {
  return new Promise(resolve => resolve("data"));
}
fetchData().then(console.log);
```

### Modify 18: Add Promise.all
**Description:** Wait for multiple promises
```javascript
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
```

### Modify 19: Add error handling with async
**Description:** Handle errors in async function
```javascript
async function getData() {
  let data = await fetch("https://api.example.com/data");
  return data;
}
```

### Modify 20: Add try-catch-finally
**Description:** Add finally block for cleanup
```javascript
function riskyOperation() {
  throw new Error("Oops");
}
try {
  riskyOperation();
} catch(e) {
  console.log(e);
}
```

### Modify 21: Add custom error type
**Description:** Create custom error class
```javascript
function AppError(message) {
  this.message = message;
}
```

### Modify 22: Add validation with throw
**Description:** Throw error for invalid input
```javascript
function divide(a, b) {
  return a / b;
}
```

### Modify 23: Add type checking
**Description:** Add runtime type checking
```javascript
function add(a, b) {
  return a + b;
}
```

### Modify 24: Add instanceof check
**Description:** Check if object is instance of class
```javascript
class Animal {}
class Dog extends Animal {}
let pet = new Dog();
```

### Modify 25: Add mixin pattern
**Description:** Combine multiple objects into one
```javascript
let canEat = {eat: function() { return "eating"; }};
let canWalk = {walk: function() { return "walking"; }};
```

### Modify 26: Add event emitter
**Description:** Create simple event emitter pattern
```javascript
function EventEmitter() {
  this.events = {};
}
```

### Modify 27: Add observable pattern
**Description:** Create observable for data changes
```javascript
function Observable(value) {
  this._value = value;
}
```

### Modify 28: Add singleton pattern
**Description:** Ensure only one instance exists
```javascript
function Database() {
  this.connection = null;
}
```

### Modify 29: Add strategy pattern
**Description:** Implement interchangeable algorithms
```javascript
function calculate(price, strategy) {
  return price;
}
```

### Modify 30: Add decorator pattern
**Description:** Add functionality to existing function
```javascript
function add(a, b) {
  return a + b;
}
```

### Modify 31: Add proxy pattern
**Description:** Use Proxy for object interception
```javascript
let target = {name: "John"};
```

### Modify 32: Add Reflect API
**Description:** Use Reflect for metaprogramming
```javascript
let obj = {name: "John"};
```

### Modify 33: Add WeakMap for private data
**Description:** Store private data with WeakMap
```javascript
let privateData = new WeakMap();
```

### Modify 34: Add Set for unique values
**Description:** Use Set to remove duplicates
```javascript
let arr = [1, 2, 2, 3, 3, 4];
```

### Modify 35: Add Map for key-value
**Description:** Use Map for key-value storage
```javascript
let cache = {};
```

### Modify 36: Add WeakSet for object tracking
**Description:** Track objects without preventing GC
```javascript
let tracked = new WeakSet();
```

### Modify 37: Add BigInt for large numbers
**Description:** Handle integers beyond Number.MAX_SAFE_INTEGER
```javascript
let large = 9007199254740992;
```

### Modify 38: Add Intl for formatting
**Description:** Use Intl for locale-aware formatting
```javascript
let date = new Date();
let number = 1234567.89;
```

### Modify 39: Add structured clone
**Description:** Deep clone using structuredClone
```javascript
let obj = {a: 1, b: {c: 2}};
```

### Modify 40: Add at() method
**Description:** Use at() for array/string access
```javascript
let arr = [10, 20, 30, 40, 50];
```

### Modify 41: Add findLastIndex
**Description:** Find last element matching condition
```javascript
let arr = [1, 2, 3, 4, 5];
```

### Modify 42: Add toSorted/toReversed
**Description:** Use non-mutating array methods
```javascript
let arr = [3, 1, 4, 1, 5];
```

### Modify 43: Add with() method
**Description:** Create new array with one element changed
```javascript
let arr = [1, 2, 3, 4, 5];
```

### Modify 44: Add groupBy
**Description:** Group array elements by key
```javascript
let items = [
  {type: "fruit", name: "apple"},
  {type: "fruit", name: "banana"},
  {type: "veg", name: "carrot"}
];
```

### Modify 45: Add Array.from with map
**Description:** Use Array.from with mapping function
```javascript
let arr = [1, 2, 3];
```

### Modify 46: Add Array.flatMap
**Description:** Map and flatten in one step
```javascript
let sentences = ["hello world", "foo bar"];
```

### Modify 47: Add numeric separators
**Description:** Use _ for readable large numbers
```javascript
let million = 1000000;
```

### Modify 48: Add logical assignment
**Description:** Use &&=, ||=, ??= operators
```javascript
let a = null;
let b = 0;
let c = 5;
```

### Modify 49: Add private class fields
**Description:** Use # for private class fields
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

### Modify 50: Add top-level await
**Description:** Use await without async wrapper
```javascript
function fetchData() {
  return Promise.resolve("data");
}
let data = await fetchData();
```
