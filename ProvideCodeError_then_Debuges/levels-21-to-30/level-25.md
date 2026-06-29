# Debugging Challenge - Level 25
## Module 5: Variables - Mixed Concepts Review

---

### Error 1: Const reassignment after declaration
**Description:** Trying to reassign a const variable.
```javascript
const maxUsers = 100;
maxUsers = 200;
console.log(maxUsers);
```

### Error 2: Var hoisting with conditional
**Description:** Var is hoisted and accessible before assignment.
```javascript
function test() {
  console.log(x);
  if (false) {
    var x = 10;
  }
}
test();
```

### Error 3: TDZ with let in function
**Description:** Accessing let before its declaration in a function.
```javascript
function demo() {
  console.log(value);
  let value = 42;
}
demo();
```

### Error 4: Block scope let outside
**Description:** Trying to access a block-scoped let outside the block.
```javascript
for (let i = 0; i < 5; i++) {}
console.log(i);
```

### Error 5: Var leaks from block
**Description:** Var declared inside a block is accessible outside.
```javascript
{
  var secret = "leaked";
}
console.log(secret);
```

### Error 6: Redeclaring let in same scope
**Description:** Redeclaring a let variable in the same block scope.
```javascript
let count = 0;
let count = 1;
console.log(count);
```

### Error 7: Const without initial value
**Description:** Declaring const without an initializer.
```javascript
const PI;
PI = 3.14159;
console.log(PI);
```

### Error 8: Loose equality type coercion
**Description:** Using == causes unexpected type coercion.
```javascript
let num = 5;
if (num == "5") {
  console.log("loosely equal");
}
```

### Error 9: NaN comparison bug
**Description:** Comparing NaN with === always returns false.
```javascript
let result = NaN;
if (result === NaN) {
  console.log("it's NaN");
}
```

### Error 10: Undefined property access
**Description:** Accessing property of undefined.
```javascript
let user;
console.log(user.name);
```

### Error 11: Null property access
**Description:** Accessing property of null.
```javascript
let config = null;
console.log(config.port);
```

### Error 12: Reassignment of const object reference
**Description:** Trying to reassign the entire const object.
```javascript
const settings = { theme: "dark" };
settings = { theme: "light" };
console.log(settings);
```

### Error 13: Type coercion with addition
**Description:** Adding number and string concatenates instead of adding.
```javascript
let total = 10 + "5" + 5;
console.log(total);
```

### Error 14: Variable name with reserved word
**Description:** Using a reserved keyword as a variable name.
```javascript
let return = 42;
console.log(return);
```

### Error 15: Variable name with space
**Description:** Using a space in variable name causes syntax error.
```javascript
let first name = "Alice";
console.log(first name);
```

### Error 16: Missing declaration in strict mode
**Description:** Using a variable without declaration in strict mode.
```javascript
"use strict";
name = "Alice";
console.log(name);
```

### Error 17: Duplicate parameter with let
**Description:** Duplicate parameter names with let declaration.
```javascript
function foo(a, a) {
  let a = 10;
  console.log(a);
}
foo(1, 2);
```

### Error 18: Var in for-in leaks
**Description:** Var in for-in loop leaks to outer scope.
```javascript
const obj = { a: 1, b: 2 };
for (var key in obj) {
  console.log(key);
}
console.log(key);
```

### Error 19: Shadowing with var in function
**Description:** Var shadowing outer variable in function.
```javascript
let name = "Alice";
function greet() {
  var name = "Bob";
  console.log(name);
}
greet();
console.log(name);
```

### Error 20: Const with increment operator
**Description:** Using ++ on a const variable.
```javascript
const index = 0;
index++;
console.log(index);
```

### Error 21: Implicit global in function
**Description:** Assigning to undeclared variable creates global.
```javascript
function add(a, b) {
  result = a + b;
  return result;
}
add(1, 2);
console.log(result);
```

### Error 22: Switch case let conflict
**Description:** Using let in switch without block scope.
```javascript
let val = 1;
switch (val) {
  case 0: let x = "zero"; break;
  case 1: let x = "one"; break;
}
```

### Error 23: Delete let variable
**Description:** Cannot delete a let-declared variable.
```javascript
let x = 10;
delete x;
console.log(x);
```

### Error 24: Delete var variable
**Description:** Cannot delete a var-declared variable.
```javascript
var x = 10;
delete x;
console.log(x);
```

### Error 25: Const with destructuring reassignment
**Description:** Reassigning a destructured const variable.
```javascript
const [a, b] = [1, 2];
a = 10;
console.log(a);
```

### Error 26: Function and var collision
**Description:** Var declaration overrides function hoisting.
```javascript
function foo() { return 1; }
var foo = "bar";
console.log(foo);
```

### Error 27: Hoisting in nested function
**Description:** Var hoisting in nested function returns undefined.
```javascript
function outer() {
  function inner() {
    console.log(x);
    var x = 10;
  }
  inner();
}
outer();
```

### Error 28: Undeclared for-in loop
**Description:** For-in without variable declaration.
```javascript
const obj = { a: 1 };
for (key in obj) {
  console.log(key);
}
```

### Error 29: Const parameter assignment
**Description:** Reassigning a const parameter inside function.
```javascript
function process(value) {
  const value = 10;
  return value;
}
console.log(process(5));
```

### Error 30: String with arithmetic minus
**Description:** String with non-numeric content produces NaN.
```javascript
let result = "hello" - "world";
console.log(result);
```

### Error 31: Undefined with string addition
**Description:** undefined coerces to "undefined" in string concatenation.
```javascript
let value;
console.log("Value: " + value);
```

### Error 32: Null with numeric addition
**Description:** null coerces to 0 in numeric operations.
```javascript
let total = null + 10;
console.log(total);
```

### Error 33: Array with string addition
**Description:** Array coerces to empty string in concatenation.
```javascript
let arr = [];
console.log("Array: " + arr);
```

### Error 34: Object to string coercion
**Description:** Object coerces to [object Object] in string context.
```javascript
let obj = {};
console.log("Object: " + obj);
```

### Error 35: Function to string coercion
**Description:** Function coerces to source code in string context.
```javascript
function foo() {}
console.log("Function: " + foo);
```

### Error 36: Var in for-of loop leaks
**Description:** Var in for-of loop leaks to outer scope.
```javascript
const items = [1, 2, 3];
for (var item of items) {
  console.log(item);
}
console.log(item);
```

### Error 37: Const with object mutation misunderstanding
**Description:** Thinking const prevents object property changes.
```javascript
const obj = { name: "Alice" };
obj.name = "Bob";
console.log(obj);
```

### Error 38: Redeclaring const in catch block
**Description:** Redeclaring const in catch with same parameter name.
```javascript
try {
  throw new Error("fail");
} catch (e) {
  const e = "error";
  console.log(e);
}
```

### Error 39: Variable name starting with number
**Description:** Variable name cannot start with a number.
```javascript
let 1stPlace = "gold";
console.log(1stPlace);
```

### Error 40: Hyphen in variable name
**Description:** Hyphen is not allowed in variable names.
```javascript
let user-name = "Alice";
console.log(user-name);
```

### Error 41: Variable with special character
**Description:** Using @ in variable name.
```javascript
let user@email = "alice@test.com";
console.log(user@email);
```

### Error 42: Const in for loop header
**Description:** Using const in for loop causes error on increment.
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Error 43: Named function expression scope
**Description:** Named function expression name is not accessible outside.
```javascript
const foo = function bar() {
  console.log(bar);
};
console.log(bar);
```

### Error 44: Arguments object reassignment
**Description:** Reassigning arguments in strict mode.
```javascript
"use strict";
function foo() {
  arguments = [1, 2, 3];
  console.log(arguments);
}
foo();
```

### Error 45: Import hoisting misunderstanding
**Description:** Imports are hoisted but the binding is live.
```javascript
console.log(foo);
import { foo } from "./module.js";
```

### Error 46: Class hoisting misunderstanding
**Description:** Class declarations are not hoisted.
```javascript
const c = new MyClass();
class MyClass {}
```

### Error 47: typeof with const TDZ
**Description:** typeof throws on const before declaration in TDZ.
```javascript
console.log(typeof x);
const x = 10;
```

### Error 48: Let redeclaration in function with var
**Description:** Mixing let and var for same name in same scope.
```javascript
let x = 10;
var x = 20;
console.log(x);
```

### Error 49: For loop var closure issue
**Description:** Classic closure bug with var in for loop.
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Error 50: Block scope with labels
**Description:** Labeled block let variable is block-scoped.
```javascript
block: {
  let x = 10;
}
console.log(x);
```

### Error 51: Comma operator with const
**Description:** Comma operator returns last value, not assignment.
```javascript
const x = (1, 2, 3);
console.log(x);
```

### Error 52: Chained assignment with let
**Description:** Chained assignment creates implicit global.
```javascript
let a = b = 10;
console.log(a, b);
```

### Error 53: Destructuring undefined
**Description:** Destructuring undefined throws error.
```javascript
let obj;
let { x } = obj;
console.log(x);
```

### Error 54: Destructuring null
**Description:** Destructuring null throws error.
```javascript
let obj = null;
let { x } = obj;
console.log(x);
```

### Error 55: Nested destructuring undefined
**Description:** Nested destructuring of undefined throws error.
```javascript
let obj = {};
let { x: { y } } = obj;
console.log(y);
```

### Error 56: Default value not used for null
**Description:** Default values only apply to undefined, not null.
```javascript
let obj = { x: null };
let { x = 10 } = obj;
console.log(x);
```

### Error 57: Rest element with trailing comma
**Description:** Trailing comma after rest element is not allowed.
```javascript
let [a, ...rest,] = [1, 2, 3];
console.log(rest);
```

### Error 58: Var with global object property
**Description:** Var creates property on global object.
```javascript
var x = 10;
console.log(globalThis.x);
```

### Error 59: Let with global object property
**Description:** Let does not create property on global object.
```javascript
let x = 10;
console.log(globalThis.x);
```

### Error 60: Missing variable in template literal
**Description:** Using undefined variable in template literal.
```javascript
console.log(`Hello, ${name}`);
```

### Error 61: Octal literal in strict mode
**Description:** Octal literals are not allowed in strict mode.
```javascript
"use strict";
let x = 010;
console.log(x);
```

### Error 62: Binary literal confusion
**Description:** Binary literal prefixed with 0b.
```javascript
let x = 0b10;
console.log(x);
```

### Error 63: Hex literal confusion
**Description:** Hex literal prefixed with 0x.
```javascript
let x = 0xFF;
console.log(x);
```

### Error 64: Exponential notation
**Description:** Scientific notation with e.
```javascript
let x = 1e2;
console.log(x);
```

### Error 65: Undefined as variable name
**Description:** Using undefined as a variable name (allowed but bad).
```javascript
let undefined = "something";
console.log(undefined);
```

### Error 66: NaN as a variable name
**Description:** Using NaN as a variable name (allowed but bad).
```javascript
let NaN = "not a number";
console.log(NaN);
```

### Error 67: Infinity as a variable name
**Description:** Using Infinity as a variable name (allowed but bad).
```javascript
let Infinity = 100;
console.log(Infinity);
```

### Error 68: Accessing undeclared variable
**Description:** Accessing a variable that was never declared.
```javascript
console.log(undeclaredVariable);
```

### Error 69: Window property collision
**Description:** Declaring var that conflicts with window property.
```javascript
var name = "Alice";
console.log(window.name);
```

### Error 70: Eval with let scope
**Description:** Eval in strict mode creates its own scope.
```javascript
"use strict";
eval("let x = 10");
console.log(x);
```

---

### Issue 1: Reassigning parameters
**Description:** Modifying function parameters directly.
```javascript
function calculateTotal(price, tax) {
  price = price + (price * tax);
  return price;
}
```

### Issue 2: Using var instead of let/const
**Description:** Using var for all variable declarations.
```javascript
var name = "Alice";
var age = 30;
var isActive = true;
```

### Issue 3: No const for unchanged values
**Description:** Using let for variables that never change.
```javascript
let company = "ACME";
let year = 2024;
console.log(company, year);
```

### Issue 4: Short cryptic variable names
**Description:** Using single-letter variable names.
```javascript
let a = "Alice";
let b = 30;
let c = true;
console.log(a, b, c);
```

### Issue 5: Global namespace pollution
**Description:** Creating multiple global variables.
```javascript
var app = {};
var config = {};
var cache = {};
```

### Issue 6: Variable shadowing
**Description:** Inner variable shadows outer with the same name.
```javascript
let user = "Alice";
function process() {
  let user = "Bob";
  console.log(user);
}
```

### Issue 7: Hoisting dependency
**Description:** Code relies on var hoisting for correctness.
```javascript
function getValue() {
  console.log(temp);
  var temp = 42;
  return temp;
}
```

### Issue 8: Missing default parameter values
**Description:** No default values for function parameters.
```javascript
function greet(name) {
  console.log("Hello, " + name);
}
```

### Issue 9: Inconsistent naming style
**Description:** Mixing different naming conventions.
```javascript
let user_name = "Alice";
let userAge = 30;
let UserEmail = "alice@test.com";
```

### Issue 10: Unused variable declarations
**Description:** Variables declared but never used.
```javascript
function compute(a, b) {
  let result = a + b;
  let unused = 0;
  return a + b;
}
```

### Issue 11: Magic numbers without constants
**Description:** Using raw numbers without named constants.
```javascript
let discount = price * 0.2;
let tax = price * 0.08;
let total = price + tax - discount;
```

### Issue 12: Not using destructuring
**Description:** Manually extracting object properties.
```javascript
function getUser() {
  return { name: "Alice", age: 30 };
}
const user = getUser();
const name = user.name;
const age = user.age;
```

### Issue 13: Using loose equality
**Description:** Using == instead of === for comparisons.
```javascript
if (value == null) {
  console.log("no value");
}
if (value == undefined) {
  console.log("undefined");
}
```

### Issue 14: Assignment in conditional
**Description:** Using = instead of === in if condition.
```javascript
let x;
if (x = getValue()) {
  console.log(x);
}
```

### Issue 15: Not using template literals
**Description:** String concatenation with + operator.
```javascript
let user = "Alice";
let msg = "Hello, " + user + "! Welcome.";
```

### Issue 16: Using new Array() and new Object()
**Description:** Constructor forms instead of literals.
```javascript
let arr = new Array(1, 2, 3);
let obj = new Object();
obj.name = "Alice";
```

### Issue 17: For-in on arrays
**Description:** Using for-in instead of for-of for arrays.
```javascript
const items = [10, 20, 30];
for (const i in items) {
  console.log(items[i]);
}
```

### Issue 18: Missing radix in parseInt
**Description:** parseInt without radix parameter.
```javascript
let num = parseInt("010");
console.log(num);
```

### Issue 19: Relying on NaN comparison
**Description:** Using === NaN to check for NaN.
```javascript
if (value === NaN) {
  console.log("not a number");
}
```

### Issue 20: Not using Array.isArray
**Description:** Using typeof instead of Array.isArray.
```javascript
let arr = [1, 2, 3];
if (typeof arr === "array") {
  console.log("is array");
}
```

### Issue 21: Variable name collision with built-in
**Description:** Using variable names that shadow built-ins.
```javascript
let name = "Alice";
let alert = "message";
```

### Issue 22: Using delete on variables
**Description:** Trying to delete regular variables.
```javascript
let x = 10;
delete x;
```

### Issue 23: Block without braces
**Description:** If block without braces causes confusion.
```javascript
if (true) console.log("true");
console.log("always runs");
```

### Issue 24: Not using strict mode
**Description:** Missing use strict to catch common errors.
```javascript
function test() {
  undeclared = 10;
  console.log(undeclared);
}
```

### Issue 25: Boolean variable without prefix
**Description:** Boolean variable names should use is/has/can.
```javascript
let active = true;
let completed = false;
let loggedIn = true;
```

### Issue 26: Const with object mutation
**Description:** Using const but still mutating the object.
```javascript
const settings = {};
settings.theme = "dark";
settings.lang = "en";
```

### Issue 27: Reassigning array elements with const
**Description:** Const array elements can be reassigned.
```javascript
const items = [1, 2, 3];
items[0] = 10;
items[1] = 20;
```

### Issue 28: Not using optional chaining
**Description:** Manually checking nested object properties.
```javascript
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}
```

### Issue 29: Not using nullish coalescing
**Description:** Using || for defaults where 0 is valid.
```javascript
function getCount(c) {
  return c || 0;
}
```

### Issue 30: Deeply nested ternary for variable assignment
**Description:** Using nested ternary instead of if-else.
```javascript
let status = score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : "D";
```

---

### Modify 1: Change var to const
**Description:** Change var to const since the value never changes.
```javascript
var pi = 3.14159;
console.log(pi);
```

### Modify 2: Change var to let
**Description:** Change var to let for proper block scoping.
```javascript
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x);
}
```

### Modify 3: Fix const to let for reassignment
**Description:** Change const to let since the variable is reassigned.
```javascript
const count = 0;
count++;
console.log(count);
```

### Modify 4: Rename invalid variable name
**Description:** Fix the variable name that starts with a number.
```javascript
let 1stPlace = "gold";
```

### Modify 5: Rename hyphenated variable
**Description:** Replace hyphen with underscore in variable name.
```javascript
let user-name = "Alice";
```

### Modify 6: Add missing declaration in strict mode
**Description:** Properly declare the variable in strict mode.
```javascript
"use strict";
name = "Alice";
console.log(name);
```

### Modify 7: Replace == with ===
**Description:** Use strict equality to avoid type coercion.
```javascript
if (value == 10) {
  console.log("ten");
}
```

### Modify 8: Add NaN check
**Description:** Use Number.isNaN() instead of === NaN.
```javascript
if (value === NaN) {
  console.log("not a number");
}
```

### Modify 9: Add null check
**Description:** Check for null before accessing property.
```javascript
let config = null;
console.log(config.port);
```

### Modify 10: Add undefined check
**Description:** Check for undefined before using variable.
```javascript
let user;
console.log(user.name);
```

### Modify 11: Add let declaration for loop var
**Description:** Properly declare the loop variable.
```javascript
for (i = 0; i < 5; i++) {
  console.log(i);
}
```

### Modify 12: Add block scope to switch case
**Description:** Add braces to switch case for let scope.
```javascript
switch (val) {
  case 1:
    let x = "one";
    break;
}
```

### Modify 13: Remove implicit global in function
**Description:** Add let declaration inside the function.
```javascript
function add(a, b) {
  result = a + b;
  return result;
}
```

### Modify 14: Replace rename reserved word variable
**Description:** Rename the variable that uses a reserved word.
```javascript
let class = "math";
```

### Modify 15: Fix const in for loop
**Description:** Use let instead of const in for loop.
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Modify 16: Add template literal
**Description:** Use template literal instead of concatenation.
```javascript
let name = "Alice";
let msg = "Hello, " + name;
```

### Modify 17: Add parseInt radix
**Description:** Add radix 10 to parseInt.
```javascript
let num = parseInt("010");
```

### Modify 18: Use array literal
**Description:** Use [] instead of new Array().
```javascript
let arr = new Array(1, 2, 3);
```

### Modify 19: Use object literal
**Description:** Use {} instead of new Object().
```javascript
let obj = new Object();
obj.name = "Alice";
```

### Modify 20: Fix destructuring null check
**Description:** Add fallback for destructuring null.
```javascript
let obj = null;
let { x } = obj;
```

### Modify 21: Fix default value for null
**Description:** Use nullish coalescing for default value.
```javascript
let obj = { x: null };
let { x = 10 } = obj;
```

### Modify 22: Remove chained assignment
**Description:** Separate chained assignment into distinct declarations.
```javascript
let a = b = 10;
```

### Modify 23: Add rest element fix
**Description:** Remove trailing comma after rest element.
```javascript
let [a, ...rest,] = [1, 2, 3];
```

### Modify 24: Convert for-in to for-of for arrays
**Description:** Use for-of instead of for-in for array iteration.
```javascript
const items = [10, 20, 30];
for (const i in items) {
  console.log(items[i]);
}
```

### Modify 25: Add use strict
**Description:** Add strict mode to catch errors.
```javascript
function test() {
  undeclared = 10;
  console.log(undeclared);
}
```

### Modify 26: Add boolean prefix
**Description:** Rename boolean with is/has prefix.
```javascript
let active = true;
let completed = false;
```

### Modify 27: Remove unused variable
**Description:** Delete the variable that is never used.
```javascript
function compute(a, b) {
  let result = a + b;
  let unused = 0;
  return result;
}
```

### Modify 28: Extract magic number to const
**Description:** Name the magic number as a const.
```javascript
let discount = price * 0.2;
let tax = price * 0.08;
```

### Modify 29: Add default parameter
**Description:** Use default parameter instead of manual check.
```javascript
function greet(name) {
  name = name || "Guest";
  console.log("Hello, " + name);
}
```

### Modify 30: Use destructuring
**Description:** Destructure the object directly.
```javascript
const user = { name: "Alice", age: 30 };
const name = user.name;
const age = user.age;
```

### Modify 31: Fix variable shadowing
**Description:** Rename the inner variable to avoid shadowing.
```javascript
let user = "Alice";
function process() {
  let user = "Bob";
  console.log(user);
}
```

### Modify 32: Remove var hoisting dependency
**Description:** Move declarations to top of function.
```javascript
function getValue() {
  console.log(temp);
  var temp = 42;
  return temp;
}
```

### Modify 33: Convert ternary to if-else
**Description:** Replace nested ternary with if-else.
```javascript
let status = score > 90 ? "A" : score > 80 ? "B" : "C";
```

### Modify 34: Add optional chaining
**Description:** Use ?. for safe nested property access.
```javascript
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}
```

### Modify 35: Add nullish coalescing
**Description:** Use ?? instead of || for zero-safe defaults.
```javascript
function getCount(c) {
  return c || 0;
}
```

### Modify 36: Remove delete on variable
**Description:** Simply set variable to undefined instead.
```javascript
let x = 10;
delete x;
```

### Modify 37: Fix comma operator with const
**Description:** Assign the intended value directly.
```javascript
const x = (1, 2, 3);
```

### Modify 38: Rename variable shadowing built-in
**Description:** Rename to avoid shadowing built-ins.
```javascript
let alert = "message";
console.log(alert);
```

### Modify 39: Add missing semicolons
**Description:** Add semicolons to variable declarations.
```javascript
let x = 10
let y = 20
console.log(x + y)
```

### Modify 40: Use const for configuration
**Description:** Change let to const for configuration object.
```javascript
let config = { port: 3000, host: "localhost" };
config.port = 4000;
```

### Modify 41: Extract condition to variable
**Description:** Store the complex condition in a descriptive variable.
```javascript
if (user.age >= 18 && user.age <= 65 && user.active) {
  console.log("eligible");
}
```

### Modify 42: Use Array.isArray
**Description:** Use Array.isArray instead of typeof.
```javascript
let arr = [1, 2, 3];
if (typeof arr === "object") {
  console.log("array");
}
```

### Modify 43: Add type conversion for input
**Description:** Convert string input to number.
```javascript
function process(input) {
  return input * 2;
}
```

### Modify 44: Fix parameter reassignment
**Description:** Use a new variable instead of reassigning parameter.
```javascript
function calculateTotal(price, tax) {
  price = price + (price * tax);
  return price;
}
```

### Modify 45: Replace comma-separated declarations
**Description:** Use separate lines for each declaration.
```javascript
let a = 1, b = 2, c = 3;
```

### Modify 46: Add block to if statement
**Description:** Add braces to the if block.
```javascript
if (true) console.log("true");
console.log("always");
```

### Modify 47: Use shorter variable with meaningful name
**Description:** Replace generic names with descriptive ones.
```javascript
let data = "Alice";
let info = 30;
```

### Modify 48: Declare variable before switch
**Description:** Declare the switch variable before usage.
```javascript
switch (val) {
  case 1: let label = "one"; break;
}
```

### Modify 49: Fix typeof with let TDZ
**Description:** Move let declaration before typeof.
```javascript
console.log(typeof x);
let x = 10;
```

### Modify 50: Use const for function expression
**Description:** Change var to const for function expression.
```javascript
var foo = function() {
  return 42;
};
```
