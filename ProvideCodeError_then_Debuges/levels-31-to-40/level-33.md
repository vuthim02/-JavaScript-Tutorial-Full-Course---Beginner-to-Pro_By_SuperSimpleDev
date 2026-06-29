# Level 33: Scope & Hoisting

## Error Snippets (1-70)

### Error 1: Variable accessed before declaration
**Description:** Move the console.log after the variable declaration
```javascript
console.log(x);
let x = 10;
```

### Error 2: Block scope leakage with var
**Description:** Use let instead of var for block scoping
```javascript
if (true) {
  var secret = 'hidden';
}
console.log(secret);
```

### Error 3: Inner scope shadows outer variable
**Description:** Use a different variable name inside the function
```javascript
let name = 'Alice';

function greet() {
  let name = 'Bob';
  console.log('Hello ' + name);
}
```

### Error 4: Function scope variable accessed outside
**Description:** Access the variable only within the function
```javascript
function doSomething() {
  let localVar = 42;
}

console.log(localVar);
```

### Error 5: Redeclaration of let variable in same scope
**Description:** Use a different variable name or reassign
```javascript
let x = 10;
let x = 20;
```

### Error 6: Const variable reassigned
**Description:** Use let for reassignable variables
```javascript
const PI = 3.14;
PI = 3.14159;
```

### Error 7: Const variable not initialized
**Description:** Initialize the const when declared
```javascript
const MAX_SIZE;
MAX_SIZE = 100;
```

### Error 8: Var hoisting causes undefined access
**Description:** Declare the variable before using it
```javascript
console.log(value);
var value = 5;
```

### Error 9: Block-scoped function redeclared
**Description:** Use different function names
```javascript
{
  function test() { return 1; }
  function test() { return 2; }
}
```

### Error 10: Variable name collision with function name
**Description:** Rename the variable or function
```javascript
function run() {}
let run = 'go';
```

### Error 11: Loop variable leaks with var
**Description:** Use let for loop variable
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Error 12: Temporal dead zone access
**Description:** Access the let variable after its declaration
```javascript
console.log(x);
let x = 5;
```

### Error 13: Nested function hoisting confusion
**Description:** Move the inner function call after its definition
```javascript
function outer() {
  inner();

  function inner() {
    console.log('inside');
  }
}
```

### Error 14: Variable declared with const in block accessed outside
**Description:** Use the variable only inside the block
```javascript
{
  const blockVar = 'secret';
}
console.log(blockVar);
```

### Error 15: Function expression hoisting with var
**Description:** Call the function after its assignment
```javascript
console.log(double(5));

var double = function(x) {
  return x * 2;
};
```

### Error 16: Shadowing variable with let in nested scope
**Description:** Avoid redeclaring the same variable name
```javascript
let count = 10;

if (true) {
  let count = 20;
  console.log(count);
}
```

### Error 17: Var in function creates global
**Description:** Use let to keep the variable local
```javascript
function setValue() {
  var globalLeak = 'I am global';
}

setValue();
console.log(globalLeak);
```

### Error 18: Assigning to undeclared variable
**Description:** Declare the variable before assigning
```javascript
function test() {
  undeclared = 42;
}

test();
console.log(undeclared);
```

### Error 19: Const object property mutation misunderstanding
**Description:** The const reference cannot be reassigned, but properties can change
```javascript
const person = { name: 'Alice' };
person = { name: 'Bob' };
```

### Error 20: Global variable shadowed in function
**Description:** Access the global variable explicitly
```javascript
let message = 'Hello';

function show() {
  let message = 'Hi';
  console.log(message);
}
```

### Error 21: Function inside block hoisted outside
**Description:** Move function outside the block
```javascript
'use strict';
if (true) {
  function doSomething() { return 42; }
}
console.log(doSomething());
```

### Error 22: Trying to access let in outer scope from inner
**Description:** Pass the variable as a parameter instead
```javascript
function outer() {
  let secret = 'hidden';
  function inner() {
    console.log(secret);
  }
  inner();
}
```

### Error 23: Redeclaring function parameter with var
**Description:** Use the parameter directly without redeclaring
```javascript
function show(name) {
  var name = name || 'default';
  console.log(name);
}
```

### Error 24: Self-assignment with no effect
**Description:** Assign the correct value
```javascript
let x = 10;
x = x;
```

### Error 25: Using undefined as a variable
**Description:** Use null instead of undefined
```javascript
let data = undefined;
data = 'value';
```

### Error 26: Function inside condition body with var
**Description:** Use a function expression assigned to a variable
```javascript
if (true) {
  var greet = function() {
    console.log('Hello');
  };
}
```

### Error 27: Variable used in closure captures wrong value
**Description:** Use let in loop or IIFE to capture correctly
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 100);
}
```

### Error 28: Nested scope trying to modify parent const
**Description:** Use let for the parent variable
```javascript
function parent() {
  const x = 10;
  function child() {
    x = 20;
  }
  child();
  console.log(x);
}
```

### Error 29: Accessing variable before let declaration in different block
**Description:** Move the declaration before the block that uses it
```javascript
function test() {
  if (true) {
    console.log(x);
  }
  let x = 5;
}
```

### Error 30: Shadowing global with let in function parameter
**Description:** Use a different parameter name
```javascript
let console = 'mock';

function log(console) {
  console.log('test');
}
```

### Error 31: Class declaration hoisting confusion
**Description:** Access the class after its declaration
```javascript
let obj = new Person();

class Person {
  constructor(name) {
    this.name = name;
  }
}
```

### Error 32: Self-reference in const declaration
**Description:** Fix the self-referencing assignment
```javascript
const x = x + 1;
```

### Error 33: Block scope with switch case
**Description:** Use block scoping for case variables
```javascript
switch (1) {
  case 1:
    let x = 10;
    console.log(x);
    break;
  case 2:
    let x = 20;
    console.log(x);
    break;
}
```

### Error 34: Using this in nested function
**Description:** Capture this in a variable or use arrow function
```javascript
let obj = {
  name: 'Alice',
  greet: function() {
    function inner() {
      console.log('Hello ' + this.name);
    }
    inner();
  }
};
```

### Error 35: For-in loop variable leaks
**Description:** Declare the loop variable with let
```javascript
let obj = { a: 1, b: 2 };

for (key in obj) {
  console.log(key);
}

console.log(key);
```

### Error 36: Argument named same as outer variable
**Description:** Use a different parameter name
```javascript
let value = 10;

function double(value) {
  return value * 2;
}
```

### Error 37: Trying to delete a variable
**Description:** Remove the delete keyword
```javascript
let x = 10;
delete x;
```

### Error 38: Accessing let variable before assignment in temporal dead zone
**Description:** Move the declaration before the typeof check
```javascript
function test() {
  typeof x;
  let x = 10;
}
```

### Error 39: For loop body creates closure with shared var
**Description:** Use let for the loop variable
```javascript
var functions = [];

for (var i = 0; i < 3; i++) {
  functions.push(function() { return i; });
}

console.log(functions[0]());
```

### Error 40: Named function expression scope confusion
**Description:** Use the outer variable to reference the function
```javascript
let greet = function sayHi() {
  console.log(sayHi);
};

sayHi();
```

### Error 41: Variable hoisting with function hoisting confusion
**Description:** Move the call after the function declaration
```javascript
console.log(typeof foo);

function foo() {}
var foo = 5;
```

### Error 42: Duplicate parameter name
**Description:** Use unique parameter names
```javascript
function sum(a, a) {
  return a + a;
}
```

### Error 43: Const declaration without initializer in for loop
**Description:** Use let for loop variables
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Error 44: Block scope with template literal confusion
**Description:** Fix the template literal syntax in the block
```javascript
let name = 'Alice';
{
  let greeting = `Hello, ${name}`;
}
console.log(greeting);
```

### Error 45: Redeclaring const in catch block
**Description:** Use a different variable name
```javascript
try {
  throw new Error('fail');
} catch (e) {
  const e = { message: 'custom' };
  console.log(e);
}
```

### Error 46: Function hoisting with let variable same name
**Description:** Rename the function or variable
```javascript
let run = 'start';

function run() {
  console.log('running');
}
```

### Error 47: Accessing arguments object inside arrow function
**Description:** Use rest parameter instead
```javascript
let sum = () => {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
};
```

### Error 48: Variable declared in if block accessed outside
**Description:** Declare the variable in the outer scope
```javascript
if (true) {
  let result = 'success';
}

console.log(result);
```

### Error 49: Block-scoped arrow function accessed outside
**Description:** Move the arrow function to outer scope
```javascript
{
  let greet = () => console.log('Hi');
}

greet();
```

### Error 50: This in regular function refers to global
**Description:** Use an arrow function or bind this
```javascript
function Person(name) {
  this.name = name;
  setTimeout(function() {
    console.log(this.name);
  }, 100);
}

new Person('Alice');
```

### Error 51: Variable with same name in nested blocks only
**Description:** Use unique variable names
```javascript
{
  let x = 10;
  {
    let x = 20;
    console.log(x);
  }
  console.log(x);
}
```

### Error 52: Parameter shadows outer function
**Description:** Use a different parameter name
```javascript
function foo(foo) {
  return foo + 1;
}
```

### Error 53: Using new with a non-constructor variable
**Description:** Remove new or use a constructor function
```javascript
let five = 5;
let obj = new five();
```

### Error 54: Export statement hoisting confusion
**Description:** Export the variable after declaration
```javascript
export default x;
let x = 42;
```

### Error 55: Inner function accessing outer let before declaration
**Description:** Move the inner function after the variable
```javascript
function outer() {
  function inner() {
    console.log(x);
  }
  let x = 10;
  inner();
}
```

### Error 56: For loop with var creates global scope leak
**Description:** Use let for the loop variable
```javascript
for (var i = 0; i < 10; i++) {
  // loop body
}

console.log(i);
```

### Error 57: Variable name with reserved word
**Description:** Use a different variable name
```javascript
let delete = 'remove';
```

### Error 58: Missing let/const/var declaration
**Description:** Add let declaration
```javascript
function test() {
  result = 42;
  return result;
}
```

### Error 59: Variable scope too broad
**Description:** Declare the variable inside the block where used
```javascript
let result;

if (true) {
  result = 'done';
}

console.log(result);
```

### Error 60: Catches shadow outer variable
**Description:** Use a different name in catch
```javascript
let error = null;

try {
  throw new Error('fail');
} catch (error) {
  error = 'handled';
}

console.log(error);
```

### Error 61: Object property access with scope confusion
**Description:** Reference the obj variable correctly
```javascript
let obj = { value: 5 };

function read() {
  console.log(obj.value);
}
```

### Error 62: Var in switch case without block
**Description:** Use block scope for case clauses
```javascript
switch (1) {
  case 0:
    var x = 1;
    break;
  case 1:
    var x = 2;
    break;
}
```

### Error 63: Closure over variable that changes
**Description:** Capture the current value in a new scope
```javascript
let functions = [];

for (let i = 0; i < 3; i++) {
  functions.push(() => i);
}

console.log(functions[0]());
```

### Error 64: Function expects this binding but loses it
**Description:** Use call, apply, or bind to set this
```javascript
function greet() {
  console.log('Hello, ' + this.name);
}

let person = { name: 'Alice' };
let greetFn = greet;
greetFn();
```

### Error 65: Setting global property via assignment in function
**Description:** Declare the variable locally
```javascript
function config() {
  apiKey = 'secret123';
}

config();
console.log(apiKey);
```

### Error 66: Block scope limited by let, but outer function still accessible
**Description:** Move function declaration to correct scope
```javascript
{
  function sayHi() {
    console.log('hi');
  }
}

sayHi();
```

### Error 67: Variable shadowing with parameters
**Description:** Remove the inner declaration that shadows
```javascript
function calculate(x) {
  let x = x * 2;
  return x;
}
```

### Error 68: Destructuring with let in wrong scope
**Description:** Move the destructuring inside the function
```javascript
let { a, b } = { a: 1, b: 2 };

function sum() {
  return a + b;
}
```

### Error 69: Static block accessing before initialization
**Description:** Move the static initialization after the variable
```javascript
class MyClass {
  static x = MyClass.y;
  static y = 10;
}
```

### Error 70: For-await-of variable leaks
**Description:** Properly scope the variable with let
```javascript
async function test() {
  for await (var item of getItems()) {
    console.log(item);
  }
  console.log(item);
}
```

## Issue Snippets (1-30)

### Issue 1: Using var in modern code
**Description:** Replace var with let or const
```javascript
function process() {
  var items = [1, 2, 3];
  var result = [];
  for (var i = 0; i < items.length; i++) {
    result.push(items[i] * 2);
  }
  return result;
}
```

### Issue 2: Overusing global variables
**Description:** Move variables into function scope
```javascript
let user = null;
let config = {};
let cache = [];

function loadUser(id) {
  user = { id, name: 'Alice' };
}
```

### Issue 3: Variable declared far from usage
**Description:** Move the declaration closer to where it is used
```javascript
function processItems(items) {
  let total = 0;
  let count = 0;
  let average = 0;
  let max = 0;
  let min = Infinity;

  for (let item of items) {
    total += item;
    count++;
  }
  return total;
}
```

### Issue 4: Unused variables in scope
**Description:** Remove unused variables
```javascript
function calculate(a, b) {
  let result = a + b;
  let temp = a * b;
  return result;
}
```

### Issue 5: Variable name too short
**Description:** Use descriptive variable names
```javascript
function processUsers(users) {
  for (let u of users) {
    let n = u.name;
    let e = u.email;
    let a = u.age;
    console.log(n, e, a);
  }
}
```

### Issue 6: Variable name too generic
**Description:** Use more specific names
```javascript
function getData() {
  let data = fetch('/api/data');
  let result = data.then(r => r.json());
  let value = result.then(d => d.users);
  return value;
}
```

### Issue 7: Function hoisting used unnecessarily
**Description:** Define the function before calling it for clarity
```javascript
let result = calculate(5, 3);

function calculate(a, b) {
  return a + b;
}
```

### Issue 8: Multiple variables in single let statement
**Description:** Use separate let statements
```javascript
let a = 1, b = 2, c = 3, d = 4;
```

### Issue 9: Variable mutation when const could be used
**Description:** Use const for variables that are never reassigned
```javascript
let taxRate = 0.08;
let price = 100;
let totalPrice = price * (1 + taxRate);
```

### Issue 10: Global scope pollution from accidental assignment
**Description:** Declare variables with let or const
```javascript
function setup() {
  apiEndpoint = 'https://api.example.com';
  timeout = 5000;
}
```

### Issue 11: Variable shadowing with no warning
**Description:** Rename the inner variable to avoid confusion
```javascript
let name = 'Alice';

function formatName(name) {
  let name = name.trim();
  return name.toUpperCase();
}
```

### Issue 12: Overwriting parameters with same name in function body
**Description:** Use a different name for the inner variable
```javascript
function findUser(id) {
  let id = id.toString();
  return users.find(u => u.id === id);
}
```

### Issue 13: Mixing let and const inconsistently
**Description:** Use const by default, let only when needed
```javascript
function process(arr) {
  let result = [];
  let i = 0;
  for (let item of arr) {
    result.push(item * 2);
  }
  return result;
}
```

### Issue 14: Variable declared inside loop unnecessarily
**Description:** Declare the variable outside the loop if reused
```javascript
function sumAll(arrays) {
  let totals = [];
  for (let arr of arrays) {
    let sum = 0;
    for (let n of arr) {
      sum += n;
    }
    totals.push(sum);
  }
  return totals;
}
```

### Issue 15: Global variable modified in function
**Description:** Pass the variable as a parameter
```javascript
let counter = 0;

function increment() {
  counter++;
}
```

### Issue 16: Using eval to access dynamic scope
**Description:** Use a lookup object instead
```javascript
function getVariable(name) {
  return eval(name);
}
```

### Issue 17: Variable naming convention inconsistency
**Description:** Use consistent camelCase naming
```javascript
function process() {
  let user_name = 'Alice';
  let userAge = 30;
  let UserEmail = 'alice@test.com';
}
```

### Issue 18: Reusing variable for different purposes
**Description:** Use separate variables for different purposes
```javascript
function processOrder(order) {
  let data = order.items;
  let total = 0;
  for (let item of data) {
    total += item.price;
  }
  data = applyDiscount(total);
  return data;
}
```

### Issue 19: Deeply nested scope with many levels
**Description:** Flatten the nesting with early returns or extracted functions
```javascript
function complex(arr) {
  let result = [];
  for (let outer of arr) {
    for (let inner of outer.items) {
      if (inner.active) {
        for (let tag of inner.tags) {
          if (tag.startsWith('x')) {
            result.push(tag);
          }
        }
      }
    }
  }
  return result;
}
```

### Issue 20: Using with statement
**Description:** Access properties directly instead
```javascript
function process(obj) {
  with (obj) {
    console.log(name, age);
  }
}
```

### Issue 21: Variable used only once
**Description:** Inline the value directly
```javascript
function greet(name) {
  let greeting = 'Hello, ' + name;
  return greeting;
}
```

### Issue 22: Function length variable masks window property
**Description:** Use a different variable name
```javascript
function getSize(arr) {
  let length = arr.length;
  return length;
}
```

### Issue 23: Using new Array() instead of array literal
**Description:** Use array literal
```javascript
let items = new Array(1, 2, 3);
```

### Issue 24: Ambiguous variable names
**Description:** Use descriptive names
```javascript
function calc(a, b, c) {
  return (a + b) * c;
}
```

### Issue 25: Variable not used in inner scope
**Description:** Remove the unused variable
```javascript
function outer() {
  let x = 10;
  function inner() {
    let y = 20;
    console.log(y);
  }
  return inner;
}
```

### Issue 26: Inconsistent capitalization
**Description:** Use consistent casing for all variables
```javascript
let UserName = 'Alice';
let userAGE = 30;
let user_Email = 'alice@test.com';
```

### Issue 27: Function modifies its parameter object
**Description:** Clone the object before mutating
```javascript
function addProperty(obj, key, value) {
  obj[key] = value;
  return obj;
}
```

### Issue 28: Variable declared but never read
**Description:** Remove the unused variable
```javascript
function getFullName(user) {
  let title = user.title;
  return user.firstName + ' ' + user.lastName;
}
```

### Issue 29: Let in loop causing closure issues intentionally
**Description:** Use let but understand the per-iteration binding
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Issue 30: Named function expression polluting scope
**Description:** Use an anonymous function expression
```javascript
let greet = function sayHello() {
  console.log('Hello');
};
```

## Modification Snippets (1-50)

### Modify 1: Change var to let
**Description:** Replace var with let for proper block scoping
```javascript
function process() {
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
}
```

### Modify 2: Change var to const
**Description:** Use const since the variable is never reassigned
```javascript
function getPi() {
  var pi = 3.14159;
  return pi;
}
```

### Modify 3: Move variable inside block scope
**Description:** Move the variable declaration inside the if block
```javascript
let result;

if (true) {
  result = 'success';
  console.log(result);
}
```

### Modify 4: Declare variable before use
**Description:** Add the missing let declaration
```javascript
function test() {
  value = 42;
  return value;
}
```

### Modify 5: Fix temporal dead zone issue
**Description:** Move the declaration before the console.log
```javascript
function show() {
  console.log(x);
  let x = 5;
}
```

### Modify 6: Rename shadowed variable
**Description:** Rename the inner variable to avoid shadowing
```javascript
let name = 'Alice';

function process(name) {
  let name = name.trim();
  return name;
}
```

### Modify 7: Remove global leakage
**Description:** Declare the variable locally with let
```javascript
function setup() {
  apiKey = 'abc123';
}
```

### Modify 8: Fix loop closure with let
**Description:** Use let in the for loop
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), i * 100);
}
```

### Modify 9: Add const for unchanged variable
**Description:** Use const for the tax rate that never changes
```javascript
function calculateTotal(price) {
  let taxRate = 0.08;
  return price * (1 + taxRate);
}
```

### Modify 10: Fix redeclaration error
**Description:** Remove the duplicate let declaration
```javascript
let x = 10;
let x = 20;
```

### Modify 11: Initialize const at declaration
**Description:** Add the initialization value
```javascript
const MAX_USERS;
```

### Modify 12: Fix switch case scope
**Description:** Wrap each case in block scope
```javascript
switch (2) {
  case 1:
    let x = 10;
    break;
  case 2:
    let x = 20;
    break;
}
```

### Modify 13: Move inner function call after declaration
**Description:** Call inner after the function definition
```javascript
function outer() {
  inner();

  function inner() {
    console.log('inner');
  }
}
```

### Modify 14: Convert function declaration to const
**Description:** Use const with arrow function to prevent reassignment
```javascript
function add(a, b) {
  return a + b;
}
```

### Modify 15: Fix parameter conflicting with outer variable
**Description:** Rename the parameter to avoid confusion
```javascript
let value = 100;

function process(value) {
  return value * 2;
}
```

### Modify 16: Extract inner function to module scope
**Description:** Move the helper function outside to avoid nesting
```javascript
function main() {
  function helper(x) {
    return x * 2;
  }
  return helper(5);
}
```

### Modify 17: Remove unused variable
**Description:** Delete the variable that is never used
```javascript
function add(a, b) {
  let temp = a + b;
  let result = a + b;
  return result;
}
```

### Modify 18: Declare variable in correct scope
**Description:** Move the variable declaration to avoid TDZ
```javascript
function test(flag) {
  if (flag) {
    console.log(x);
  }
  let x = 10;
}
```

### Modify 19: Use block scope for temporary variable
**Description:** Wrap the temporary assignment in a block
```javascript
let temp = a;
a = b;
b = temp;
```

### Modify 20: Fix this reference in nested function
**Description:** Use arrow function to preserve this
```javascript
let obj = {
  name: 'Alice',
  greet: function() {
    function inner() {
      console.log('Hi, ' + this.name);
    }
    inner();
  }
};
```

### Modify 21: Add missing semicolons
**Description:** Add semicolons at the end of each statement
```javascript
let x = 10
let y = 20
```

### Modify 22: Fix destructuring scope
**Description:** Move destructuring inside the function
```javascript
function sum() {
  return a + b;
}

let { a, b } = { a: 1, b: 2 };
```

### Modify 23: Remove accidental global assignment
**Description:** Declare a local variable inside the function
```javascript
function save() {
  data = { key: 'value' };
  return data;
}
```

### Modify 24: Fix const in for loop
**Description:** Use let in the for loop header
```javascript
for (const i = 0; i < 10; i++) {
  console.log(i);
}
```

### Modify 25: Add proper initialization
**Description:** Initialize the variable when declared
```javascript
let greeting;
greeting = 'Hello';
```

### Modify 26: Remove duplicate parameter name
**Description:** Rename the second parameter
```javascript
function multiply(a, a) {
  return a * a;
}
```

### Modify 27: Fix catch block variable conflict
**Description:** Use a different name in the catch clause
```javascript
try {
  throw 'error';
} catch (e) {
  let e = 'handled';
}
```

### Modify 28: Correctly scope loop variable with let
**Description:** Use let for the for-in loop variable
```javascript
let obj = { a: 1, b: 2 };

for (key in obj) {
  console.log(key);
}
```

### Modify 29: Create reveal pattern
**Description:** Use an IIFE to create private scope
```javascript
let counter = 0;

function increment() {
  return ++counter;
}

function decrement() {
  return --counter;
}
```

### Modify 30: Move shared variable to outer scope
**Description:** Declare the shared array outside both functions
```javascript
function addItem(item) {
  let items = [];
  items.push(item);
  return items;
}

function getItems() {
  return items;
}
```

### Modify 31: Convert to block-scoped function
**Description:** Use const with arrow function inside the block
```javascript
if (true) {
  function greet() {
    console.log('Hi');
  }
}
```

### Modify 32: Rename variable to avoid reserved word
**Description:** Use a different variable name
```javascript
let delete = 'remove';
```

### Modify 33: Fix typeof check for undeclared variable
**Description:** Check if the variable exists using typeof safely
```javascript
if (typeof x !== 'undefined') {
  console.log(x);
}

let x = 10;
```

### Modify 34: Add closure for private variable
**Description:** Create a closure that encapsulates the private variable
```javascript
function createCounter() {
  let count = 0;
}
```

### Modify 35: Convert to module pattern
**Description:** Use an IIFE to create a module with private state
```javascript
let app = {};

app.counter = 0;
app.increment = function() {
  this.counter++;
};
```

### Modify 36: Fix for loop variable leaking
**Description:** Declare i with let in the for loop
```javascript
for (i = 0; i < 5; i++) {
  console.log(i);
}
```

### Modify 37: Use const for function expression
**Description:** Change let to const for the function
```javascript
let greet = function() {
  console.log('Hello');
};
```

### Modify 38: Extract variable from deep nesting
**Description:** Move the variable to a higher scope
```javascript
function outer() {
  function inner() {
    let data = 'nested';
    console.log(data);
  }
  inner();
}
```

### Modify 39: Add function to encapsulate globals
**Description:** Wrap the code in a function to avoid globals
```javascript
let name = 'Alice';
let age = 30;

function showUser() {
  console.log(name, age);
}
```

### Modify 40: Replace arguments object with rest
**Description:** Use rest parameter instead of arguments
```javascript
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}
```

### Modify 41: Fix duplicate variable declaration
**Description:** Remove the second declaration and just reassign
```javascript
function update() {
  let value = 1;
  let value = 2;
  return value;
}
```

### Modify 42: Add missing let in for-of loop
**Description:** Declare the loop variable with let
```javascript
let items = [1, 2, 3];

for (item of items) {
  console.log(item);
}
```

### Modify 43: Convert to block-scoped const
**Description:** Use const inside the block scope
```javascript
if (true) {
  var temp = 42;
}
```

### Modify 44: Isolate side effect to local scope
**Description:** Keep the side effect contained within the function
```javascript
let cache = [];

function compute(n) {
  cache.push(n);
  return n * n;
}
```

### Modify 45: Rename conflicting variable names
**Description:** Use unique names for each variable
```javascript
function process() {
  let data = 1;
  let data = 2;
}
```

### Modify 46: Move helper functions to top level
**Description:** Extract and move helper functions to module level
```javascript
function main() {
  function validate(x) {
    return x > 0;
  }

  function format(y) {
    return '$' + y;
  }

  return format(validate(5));
}
```

### Modify 47: Remove strict mode error
**Description:** Fix the variable declaration for strict mode
```javascript
'use strict';

function test() {
  x = 10;
  return x;
}
```

### Modify 48: Add block for temporary variable isolation
**Description:** Wrap temporary variables in a block
```javascript
let oldValue = 10;
let newValue = 20;
let temp = oldValue;
oldValue = newValue;
newValue = temp;
```

### Modify 49: Fix async variable scoping
**Description:** Ensure variable persists across await
```javascript
async function process() {
  for (var i = 0; i < 5; i++) {
    await delay(100);
    console.log(i);
  }
}
```

### Modify 50: Consolidate scattered declarations
**Description:** Group all variable declarations at the top
```javascript
function calculate(arr) {
  let sum = 0;
  for (let n of arr) {
    sum += n;
  }
  let average = sum / arr.length;
  return average;
}
```
