# Level 04: JavaScript Basics — Variables & Scope

## Errors

### Error 1: Const without initializer
**Description:** Declare constant without value
```javascript
const PI;
PI = 3.14;
console.log(PI);
```

### Error 2: Let without initializer allowed
**Description:** Declare let without value then use
```javascript
let count;
console.log(count + 1);
```

### Error 3: Redeclaring let with var
**Description:** Redeclare let variable with var
```javascript
let x = 1;
var x = 2;
console.log(x);
```

### Error 4: Redeclaring const in same scope
**Description:** Redeclare const variable
```javascript
const MAX = 100;
const MAX = 200;
console.log(MAX);
```

### Error 5: Using const with object mutation
**Description:** Modify const object property
```javascript
const user = {name: "John"};
user.name = "Jane";
console.log(user);
```

### Error 6: Using const with array push
**Description:** Modify const array
```javascript
const items = [1, 2];
items.push(3);
console.log(items);
```

### Error 7: Block-scoped let accessed outside
**Description:** Access let variable outside block
```javascript
if (true) {
  let secret = "hidden";
}
console.log(secret);
```

### Error 8: Block-scoped const accessed outside
**Description:** Access const variable outside block
```javascript
{
  const secret = "hidden";
}
console.log(secret);
```

### Error 9: Temporal dead zone with let
**Description:** Use let before declaration
```javascript
console.log(value);
let value = 10;
```

### Error 10: Temporal dead zone with const
**Description:** Use const before declaration
```javascript
console.log(VALUE);
const VALUE = 10;
```

### Error 11: Hoisting var with function scope
**Description:** Use var before declaration in function
```javascript
function test() {
  console.log(x);
  var x = 5;
}
test();
```

### Error 12: Function scoped var and block
**Description:** Var inside block leaks
```javascript
if (true) {
  var leak = "exposed";
}
console.log(leak);
```

### Error 13: Var in for loop leaks
**Description:** Access loop variable after loop
```javascript
for (var i = 0; i < 3; i++) {}
console.log(i);
```

### Error 14: Redeclaring function parameter with var
**Description:** Redeclare parameter inside function
```javascript
function sum(a, a) {
  return a + a;
}
console.log(sum(2, 3));
```

### Error 15: Using arguments in arrow function
**Description:** Access arguments object in arrow
```javascript
let test = () => {
  console.log(arguments);
};
test(1, 2, 3);
```

### Error 16: Using this in arrow function
**Description:** Access this in arrow function at top level
```javascript
let obj = {
  name: "Test",
  greet: () => {
    console.log(this.name);
  }
};
obj.greet();
```

### Error 17: Missing parentheses for IIFE
**Description:** Create IIFE without wrapping
```javascript
function() {
  console.log("IIFE");
}();
```

### Error 18: IIFE with wrong syntax
**Description:** Create IIFE with missing closing parens
```javascript
(function() {
  console.log("IIFE");
})();
```

### Error 19: Named function expression scope
**Description:** Call function expression name outside
```javascript
let fn = function myName() {
  console.log("Inside");
};
myName();
```

### Error 20: Assigning to function name
**Description:** Try to reassign function name
```javascript
function hello() {}
hello = 5;
console.log(hello);
```

### Error 21: Using function declaration in block
**Description:** Declare function inside if block
```javascript
if (true) {
  function sayHi() {
    console.log("Hi");
  }
}
sayHi();
```

### Error 22: Dual declaration with let and const
**Description:** Use let and const with same name
```javascript
let name = "John";
const name = "Jane";
console.log(name);
```

### Error 23: Using reserved word as parameter
**Description:** Function with parameter named delete
```javascript
function remove(delete) {
  console.log(delete);
}
remove("item");
```

### Error 24: Using reserved word as label
**Description:** Use reserved word as loop label
```javascript
let: for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

### Error 25: Octal number in strict mode
**Description:** Use 0o prefix for octal
```javascript
"use strict";
let num = 0o10;
console.log(num);
```

### Error 26: Binary number wrong prefix
**Description:** Use binary literal
```javascript
let num = b1010;
console.log(num);
```

### Error 27: Hexadecimal wrong format
**Description:** Use hex literal
```javascript
let num = 0xG;
console.log(num);
```

### Error 28: Exponential notation error
**Description:** Use exponential notation
```javascript
let num = 1e2;
console.log(num);
```

### Error 29: Underscore in number (ES2021)
**Description:** Use numeric separator
```javascript
let num = 1_000_000;
console.log(num);
```

### Error 30: Trailing underscore in number
**Description:** Use trailing underscore in number
```javascript
let num = 100_;
console.log(num);
```

### Error 31: Leading zero decimal error
**Description:** Use leading zero for decimal
```javascript
let num = 010;
console.log(num);
```

### Error 32: Multiple decimal points
**Description:** Use number with two decimals
```javascript
let num = 10.5.5;
console.log(num);
```

### Error 33: Using comma in number
**Description:** Use comma as thousand separator
```javascript
let num = 1,000;
console.log(num);
```

### Error 34: Using dot for number method wrong
**Description:** Call toFixed on number literal
```javascript
console.log(42.toFixed(2));
```

### Error 35: Dot for number with two dots
**Description:** Call toString on number literal
```javascript
console.log(42..toString());
```

### Error 36: Using void as function
**Description:** Use void to make expression undefined
```javascript
let result = void();
console.log(result);
```

### Error 37: Using typeof as if variable exists
**Description:** Check if variable is defined
```javascript
if (typeof someVar) {
  console.log("Exists");
}
```

### Error 38: Deleting function parameter
**Description:** Try to delete function parameter
```javascript
function test(x) {
  delete x;
  console.log(x);
}
test(5);
```

### Error 39: Using eval to create variable
**Description:** Create variable with eval
```javascript
eval("let x = 10");
console.log(x);
```

### Error 40: Using Function constructor with string
**Description:** Create function from string
```javascript
let fn = new Function("return a + b");
console.log(fn(2, 3));
```

### Error 41: Using with statement
**Description:** Shorten object access
```javascript
let obj = {a: 1, b: 2};
with (obj) {
  console.log(a + b);
}
```

### Error 42: Wrong debugger statement
**Description:** Use debugger in console.log
```javascript
console.log(debugger);
```

### Error 43: Using __proto__ in object literal
**Description:** Set prototype in object
```javascript
let obj = {
  __proto__: Array.prototype
};
console.log(obj);
```

### Error 44: Using setter without getter
**Description:** Define setter only
```javascript
let obj = {
  set value(v) {
    this._value = v;
  }
};
obj.value = 5;
console.log(obj.value);
```

### Error 45: Using getter as property not method
**Description:** Getter defined but called as function
```javascript
let obj = {
  get fullName() {
    return "John Doe";
  }
};
console.log(obj.fullName());
```

### Error 46: Using setter as method
**Description:** Setter called with argument
```javascript
let obj = {
  set age(a) {
    this._age = a;
  }
};
obj.age(25);
console.log(obj._age);
```

### Error 47: Symbol as constructor
**Description:** Use new with Symbol
```javascript
let sym = new Symbol("test");
console.log(sym);
```

### Error 48: Adding symbol to string
**Description:** Concatenate symbol with string
```javascript
let sym = Symbol("test");
console.log("Symbol: " + sym);
```

### Error 49: Using same symbol description
**Description:** Two symbols with same description
```javascript
let s1 = Symbol("id");
let s2 = Symbol("id");
console.log(s1 === s2);
```

### Error 50: Using Symbol.for differently
**Description:** Use Symbol.for for global symbol
```javascript
let s1 = Symbol.for("id");
let s2 = Symbol.for("id");
console.log(s1 === s2);
```

### Error 51: Using new with primitive wrappers
**Description:** Create primitive wrapper with new
```javascript
let n = new Number(5);
let s = new String("hello");
console.log(typeof n, typeof s);
```

### Error 52: Implicit global in function
**Description:** Forget to declare variable in function
```javascript
function setCount() {
  count = 10;
}
setCount();
console.log(count);
```

### Error 53: Global variable collision
**Description:** Variable overwrites window property
```javascript
let name = "MyName";
console.log(window.name);
```

### Error 54: Not declaring loop variable
**Description:** For loop without variable declaration
```javascript
for (i = 0; i < 5; i++) {
  console.log(i);
}
```

### Error 55: Using undeclared variable in strict mode
**Description:** Use variable without declaration
```javascript
"use strict";
x = 10;
console.log(x);
```

### Error 56: Export without module
**Description:** Use export in non-module script
```javascript
export const name = "Test";
```

### Error 57: Import without module
**Description:** Use import in non-module script
```javascript
import { name } from "./module.js";
console.log(name);
```

### Error 58: Default export wrong syntax
**Description:** Export default after declaration
```javascript
const value = 42;
export default value;
```

### Error 59: Named import wrong syntax
**Description:** Import without destructuring
```javascript
import "./module.js";
console.log(name);
```

### Error 60: Namespace import wrong access
**Description:** Use namespace import
```javascript
import * as utils from "./utils.js";
console.log(utils.name);
```

### Error 61: Dynamic import without await
**Description:** Use import() without await
```javascript
let mod = import("./module.js");
console.log(mod);
```

### Error 62: Using import.meta outside module
**Description:** Access import.meta in script
```javascript
console.log(import.meta);
```

### Error 63: Class declaration without name
**Description:** Create unnamed class declaration
```javascript
class {
  constructor() {}
}
```

### Error 64: Class expression without variable
**Description:** Create class expression not assigned
```javascript
let C = class {};
new C();
```

### Error 65: Extending from non-constructor
**Description:** Class extends undefined
```javascript
class MyClass extends undefined {
  constructor() {}
}
new MyClass();
```

### Error 66: Extending from null
**Description:** Class extends null
```javascript
class MyClass extends null {
  constructor() {}
}
new MyClass();
```

### Error 67: Using super in arrow function
**Description:** Use super in arrow function
```javascript
class Child extends Parent {
  constructor() {
    const fn = () => super();
  }
}
```

### Error 68: Using new.target outside function
**Description:** Access new.target at top level
```javascript
console.log(new.target);
```

### Error 69: Wrong scope for class field
**Description:** Class field with this reference
```javascript
class MyClass {
  name = this.getName();
  getName() {
    return "Test";
  }
}
console.log(new MyClass().name);
```

### Error 70: Static class field before static
**Description:** Static field referencing static method
```javascript
class MyClass {
  static value = MyClass.getDefault();
  static getDefault() {
    return 42;
  }
}
console.log(MyClass.value);
```

## Issues

### Issue 1: Using var instead of const/let everywhere
**Description:** Store configuration values
```javascript
var apiUrl = "https://api.example.com";
var timeout = 5000;
var retries = 3;
console.log(apiUrl, timeout, retries);
```

### Issue 2: Not using block scope for temporary variables
**Description:** Temporary variable leaks to function scope
```javascript
function process(items) {
  for (var i = 0; i < items.length; i++) {
    var temp = items[i];
    console.log(temp);
  }
}
process([1, 2, 3]);
```

### Issue 3: Overwriting function parameter
**Description:** Modify parameter value
```javascript
function calculateTotal(price, tax) {
  price = price * 1.1;
  return price + tax;
}
console.log(calculateTotal(100, 10));
```

### Issue 4: Using single-letter variable names
**Description:** Store user information
```javascript
let n = "John";
let a = 30;
let e = "john@mail.com";
console.log(n, a, e);
```

### Issue 5: Not using descriptive loop variables
**Description:** Loop through users array
```javascript
let users = ["Alice", "Bob", "Charlie"];
for (let i = 0; i < users.length; i++) {
  console.log(users[i]);
}
```

### Issue 6: Declaring variables at top level without module
**Description:** Module-like code in script
```javascript
let config = {debug: true};
```

### Issue 7: Using comma declarations on one line
**Description:** Declare multiple variables on same line
```javascript
let a = 1, b = 2, c = 3, d = 4, e = 5;
console.log(a, b, c, d, e);
```

### Issue 8: Unused function parameters
**Description:** Function with unused parameter
```javascript
function formatMessage(msg, level, timestamp) {
  return `[${level}] ${msg}`;
}
console.log(formatMessage("Error", "ERROR", Date.now()));
```

### Issue 9: Variable shadowing in nested scope
**Description:** Shadow outer variable in inner block
```javascript
let count = 10;
function test() {
  let count = 5;
  console.log(count);
}
test();
console.log(count);
```

### Issue 10: Confusing variable name l vs 1
**Description:** Variable named l (lowercase L) looks like 1
```javascript
let l = 10;
let result = l * 2;
console.log(result);
```

### Issue 11: Using undefined as variable value intentionally
**Description:** Set variable to undefined explicitly
```javascript
let data = undefined;
console.log(data);
```

### Issue 12: Setting variable to null unnecessarily
**Description:** Initialize with null
```javascript
let result = null;
result = compute();
console.log(result);
function compute() {
  return 42;
}
```

### Issue 13: Not initializing accumulator properly
**Description:** Sum array without proper initial value
```javascript
let nums = [1, 2, 3];
let sum;
for (let n of nums) {
  sum += n;
}
console.log(sum);
```

### Issue 14: Let in loop creating new binding each iteration
**Description:** Using let in for loop incorrectly
```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), i * 100);
}
```

### Issue 15: Using global window object properties
**Description:** Access window properties directly
```javascript
let width = innerWidth;
let height = innerHeight;
console.log(width, height);
```

### Issue 16: Variable name includes type
**Description:** Include type in variable name
```javascript
let strName = "John";
let numAge = 30;
let arrItems = [1, 2, 3];
console.log(strName, numAge, arrItems);
```

### Issue 17: Using numbers in variable names
**Description:** Numbered variable names
```javascript
let item1 = "Apple";
let item2 = "Banana";
let item3 = "Cherry";
console.log(item1, item2, item3);
```

### Issue 18: Using negative boolean variable names
**Description:** Name with not prefix
```javascript
let isNotActive = false;
if (!isNotActive) {
  console.log("Active");
}
```

### Issue 19: Boolean variable as flag without context
**Description:** Unclear boolean meaning
```javascript
let flag = true;
if (flag) {
  console.log("Enabled");
}
```

### Issue 20: Declaring all variables at top
**Description:** Hoist all declarations to function top
```javascript
function calculate() {
  var price = 100;
  var tax = 10;
  var total = price + tax;
  var discount = 5;
  var final = total - discount;
  console.log(final);
}
calculate();
```

### Issue 21: Redeclaring variable in catch block
**Description:** Variable name in catch matches outer
```javascript
let error = "Initial";
try {
  throw "Error!";
} catch (error) {
  console.log(error);
}
console.log(error);
```

### Issue 22: Using loop variable after loop
**Description:** Access for loop counter after loop
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log("After loop:", i);
```

### Issue 23: Not using destructuring for swaps
**Description:** Swap two variables with temp
```javascript
let a = 1, b = 2;
let temp = a;
a = b;
b = temp;
console.log(a, b);
```

### Issue 24: Long chains of variable assignments
**Description:** Chain multiple assignments
```javascript
let a = b = c = d = 0;
console.log(a, b, c, d);
```

### Issue 25: Modifying const object properties
**Description:** Const object with changing properties
```javascript
const settings = { theme: "dark", lang: "en" };
settings.theme = "light";
settings.lang = "fr";
console.log(settings);
```

### Issue 26: Using var in modern codebase
**Description:** Mix var with let/const
```javascript
var old = "legacy";
let modern = "new";
const fixed = "fixed";
console.log(old, modern, fixed);
```

### Issue 27: Not using shorthand for variable assignment
**Description:** Object property from variable
```javascript
let name = "John";
let age = 30;
let person = {name: name, age: age};
console.log(person);
```

### Issue 28: Variable reassignment instead of new variable
**Description:** Reuse variable for different purposes
```javascript
let result = 10 + 20;
result = result * 2;
result = "The final answer is " + result;
console.log(result);
```

### Issue 29: Hoisting confusion with function expressions
**Description:** Hoisting var function expression
```javascript
console.log(fn);
var fn = function() {
  console.log("Later");
};
```

### Issue 30: Implicit global in non-strict mode
**Description:** Assignment to undeclared variable
```javascript
function setup() {
  apiKey = "abc123";
  endpoint = "https://api.com";
}
setup();
console.log(apiKey, endpoint);
```

## Modifications

### Modify 1: Convert var to let/const
**Description:** Update variable declarations to modern
```javascript
var name = "John";
var age = 25;
console.log(name, age);
```

### Modify 2: Replace let with const where appropriate
**Description:** Use const for values that never change
```javascript
let taxRate = 0.08;
let maxRetries = 3;
console.log(taxRate, maxRetries);
```

### Modify 3: Fix temporal dead zone issue
**Description:** Move declaration before usage
```javascript
console.log(value);
let value = 5;
```

### Modify 4: Add block scope protection
**Description:** Wrap temporary logic in block
```javascript
let temp = calculate();
console.log(temp);
function calculate() { return 42; }
```

### Modify 5: Extract magic numbers to constants
**Description:** Name the constant values
```javascript
function calculateArea(radius) {
  return 3.14159 * radius * radius;
}
console.log(calculateArea(5));
```

### Modify 6: Add variable for repeated expression
**Description:** Store repeated calculation in variable
```javascript
console.log(5 * 3 + 2 * 3);
console.log(5 * 3 - 2 * 3);
```

### Modify 7: Use destructuring for object
**Description:** Extract properties into variables
```javascript
let user = {id: 1, name: "Alice", role: "admin"};
let id = user.id;
let name = user.name;
console.log(id, name);
```

### Modify 8: Use destructuring for array
**Description:** Extract first two array elements
```javascript
let rgb = [255, 128, 64];
let red = rgb[0];
let green = rgb[1];
console.log(red, green);
```

### Modify 9: Swap variables with destructuring
**Description:** Swap a and b without temp variable
```javascript
let a = 10;
let b = 20;
let temp = a;
a = b;
b = temp;
console.log(a, b);
```

### Modify 10: Add default value with OR
**Description:** Use default if variable is falsy
```javascript
let username = "";
let display = username;
console.log(display);
```

### Modify 11: Add nullish coalescing
**Description:** Use default only for null/undefined
```javascript
let count = 0;
let display = count || "No items";
console.log(display);
```

### Modify 12: Use optional chaining
**Description:** Safely access nested property
```javascript
let user = null;
console.log(user.name);
```

### Modify 13: Convert to shorthand property
**Description:** Use object property shorthand
```javascript
let name = "John";
let age = 30;
let person = {name: name, age: age};
console.log(person);
```

### Modify 14: Convert to shorthand method
**Description:** Use method shorthand in object
```javascript
let math = {
  add: function(a, b) {
    return a + b;
  }
};
console.log(math.add(2, 3));
```

### Modify 15: Add computed property name
**Description:** Use dynamic property key
```javascript
let key = "dynamicKey";
let obj = {};
obj[key] = "value";
console.log(obj);
```

### Modify 16: Rename unclear variable
**Description:** Give descriptive name to x
```javascript
let x = "John";
console.log("Hello, " + x);
```

### Modify 17: Add type conversion for user input
**Description:** Convert string input to number
```javascript
let userInput = "42";
let result = userInput + 8;
console.log(result);
```

### Modify 18: Use template literals
**Description:** Build string with variables
```javascript
let product = "Book";
let price = 15;
console.log("The " + product + " costs $" + price);
```

### Modify 19: Add early return guard clause
**Description:** Return early if input is invalid
```javascript
function process(data) {
  if (data) {
    console.log(data.toUpperCase());
  }
}
process("");
```

### Modify 20: Use rest parameters
**Description:** Accept unlimited arguments
```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3, 4));
```

### Modify 21: Use spread operator for array copy
**Description:** Copy array instead of reference
```javascript
let original = [1, 2, 3];
let copy = original;
copy.push(4);
console.log(original);
```

### Modify 22: Use spread to merge arrays
**Description:** Merge two arrays into one
```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let merged = arr1.concat(arr2);
console.log(merged);
```

### Modify 23: Use spread for object copy
**Description:** Clone object without reference
```javascript
let original = {a: 1, b: 2};
let copy = original;
copy.a = 99;
console.log(original.a);
```

### Modify 24: Merge objects with spread
**Description:** Combine two objects
```javascript
let defaults = {theme: "light", lang: "en"};
let overrides = {theme: "dark"};
let config = Object.assign({}, defaults, overrides);
console.log(config);
```

### Modify 25: Add variable caching for DOM
**Description:** Cache DOM reference in variable
```javascript
document.getElementById("btn").addEventListener("click", () => {
  document.getElementById("btn").classList.add("active");
});
```

### Modify 26: Convert function declaration to const
**Description:** Use const for function expression
```javascript
function double(n) {
  return n * 2;
}
console.log(double(5));
```

### Modify 27: Add block scope for temp vars
**Description:** Limit scope of temporary variables
```javascript
let temp = 0;
for (let i = 0; i < 10; i++) {
  temp += i;
}
let average = temp / 10;
console.log(average);
```

### Modify 28: Rename shadowed variable
**Description:** Fix variable shadowing
```javascript
let name = "Global";
function test() {
  let name = "Local";
  console.log(name);
}
test();
```

### Modify 29: Remove unused variables
**Description:** Clean up dead code
```javascript
function calculate(a, b) {
  let unused = "dead code";
  return a + b;
}
console.log(calculate(3, 4));
```

### Modify 30: Use const for callback functions
**Description:** Store callback in const
```javascript
function handleClick() {
  console.log("Clicked");
}
document.addEventListener("click", handleClick);
```

### Modify 31: Extract constant from magic string
**Description:** Name the repeated string
```javascript
if (role === "admin") {
  console.log("Admin access");
}
if (role === "admin") {
  console.log("Full rights");
}
```

### Modify 32: Add variable initialization
**Description:** Initialize variable before use
```javascript
let total;
total += 10;
console.log(total);
```

### Modify 33: Use const for configuration
**Description:** Store all config in const object
```javascript
let apiUrl = "https://api.com";
let timeout = 5000;
let retries = 3;
console.log(apiUrl, timeout, retries);
```

### Modify 34: Convert if-else to ternary
**Description:** Use ternary for simple assignment
```javascript
let isMember = true;
let discount;
if (isMember) {
  discount = 10;
} else {
  discount = 0;
}
console.log(discount);
```

### Modify 35: Add variable for complex condition
**Description:** Store complex boolean in variable
```javascript
if (age >= 18 && age <= 65 && hasLicense && !isSuspended) {
  console.log("Can drive");
}
```

### Modify 36: Use let instead of var in loop
**Description:** Fix var loop to use let
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Modify 37: Add proper scope for iterator
**Description:** Move iterator into block scope
```javascript
var i;
for (i = 0; i < 3; i++) {
  console.log(i);
}
```

### Modify 38: Extract repeated logic to variable
**Description:** Store repeated expression
```javascript
console.log(Math.PI * 5 * 5);
console.log(Math.PI * 10 * 10);
```

### Modify 39: Use const for calculation constant
**Description:** Extract magic number to named constant
```javascript
let radius = 5;
let area = 3.14159 * radius * radius;
console.log(area);
```

### Modify 40: Add type annotation via JSDoc
**Description:** Add JSDoc type comment
```javascript
let userName = "John";
console.log(userName);
```

### Modify 41: Destructure function parameters
**Description:** Use destructuring in parameter list
```javascript
function printUser(user) {
  console.log(user.name, user.age);
}
printUser({name: "John", age: 30});
```

### Modify 42: Add default parameter values
**Description:** Set default for missing parameter
```javascript
function greet(name) {
  console.log("Hello " + name);
}
greet();
```

### Modify 43: Freeze constant object
**Description:** Prevent mutation of config object
```javascript
const config = { theme: "dark" };
config.theme = "light";
console.log(config);
```

### Modify 44: Use Object.entries for iteration
**Description:** Iterate over object key-value pairs
```javascript
let obj = {a: 1, b: 2, c: 3};
for (let key in obj) {
  console.log(key + ": " + obj[key]);
}
```

### Modify 45: Use Object.keys for array of keys
**Description:** Get array of object keys
```javascript
let obj = {name: "John", age: 30};
console.log(Object.keys(obj));
```

### Modify 46: Use Object.values for array of values
**Description:** Get array of object values
```javascript
let obj = {name: "John", age: 30};
console.log(Object.keys(obj));
```

### Modify 47: Add variable for element reference
**Description:** Store DOM element in variable
```javascript
document.querySelector(".box").style.color = "red";
document.querySelector(".box").style.fontSize = "16px";
```

### Modify 48: Use null check before access
**Description:** Safely access variable that might be null
```javascript
let data = null;
console.log(data.value);
```

### Modify 49: Add meaningful variable names for coordinates
**Description:** Name x, y coordinates descriptively
```javascript
let x = 100;
let y = 200;
console.log("Position: " + x + ", " + y);
```

### Modify 50: Extract callback to named function
**Description:** Use named function instead of anonymous callback
```javascript
setTimeout(function() {
  console.log("Done");
}, 1000);
```
