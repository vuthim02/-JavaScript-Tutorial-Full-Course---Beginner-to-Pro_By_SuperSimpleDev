# Debugging Challenge - Level 21
## Module 5: Variables - Declaration and Naming

---

### Error 1: Const reassignment
**Description:** The code tries to reassign a const variable.
```javascript
const userName = "Alice";
userName = "Bob";
console.log(userName);
```

### Error 2: Const reassignment in loop
**Description:** Using const in a for loop causes an error.
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Error 3: Var redeclaration confusion
**Description:** Redeclaring a var variable can cause confusion.
```javascript
var count = 10;
var count = 20;
console.log(count);
```

### Error 4: Let redeclaration in same block
**Description:** Redeclaring a let variable in the same block throws an error.
```javascript
let score = 100;
let score = 200;
console.log(score);
```

### Error 5: Reserved word as variable
**Description:** Using a reserved keyword as a variable name.
```javascript
let class = "math";
console.log(class);
```

### Error 6: Invalid identifier start
**Description:** Variable name starting with a number.
```javascript
let 1stPlace = "gold";
console.log(1stPlace);
```

### Error 7: Hyphen in variable name
**Description:** Using a hyphen in a variable name instead of underscore.
```javascript
let user-name = "Alice";
console.log(user-name);
```

### Error 8: Const without initializer
**Description:** Declaring const without an initial value.
```javascript
const PI;
PI = 3.14;
console.log(PI);
```

### Error 9: Undeclared variable in strict mode
**Description:** Using a variable without declaring it in strict mode.
```javascript
"use strict";
name = "Alice";
console.log(name);
```

### Error 10: Multiple const declarations without values
**Description:** Multiple const declarations without initialization values.
```javascript
const a, b, c;
a = 1; b = 2; c = 3;
console.log(a + b + c);
```

### Error 11: Assigning to function parameter
**Description:** Reassigning a function parameter causes bugs.
```javascript
function double(x) {
  x = x * 2;
  return x;
}
let value = 5;
double(value);
console.log(value);
```

### Error 12: Confusing var with let scope
**Description:** Var leaks out of block scope.
```javascript
if (true) {
  var message = "hello";
}
console.log(message);
```

### Error 13: Temporal dead zone access
**Description:** Accessing a let variable before its declaration.
```javascript
console.log(value);
let value = 42;
```

### Error 14: Window global collision
**Description:** Declaring a variable that conflicts with window property.
```javascript
let name = "Alice";
console.log(window.name);
```

### Error 15: Dot in variable name
**Description:** Using dot notation in variable declaration.
```javascript
let user.name = "Alice";
console.log(user.name);
```

### Error 16: Const in for-of with reassignment
**Description:** Trying to reassign the loop variable in a for-of loop.
```javascript
const items = [1, 2, 3];
for (const item of items) {
  item = item * 2;
  console.log(item);
}
```

### Error 17: Missing comma in declaration list
**Description:** Missing comma between variable declarations.
```javascript
let a = 1
let b = 2
console.log(a + b);
```

### Error 18: Var within function scope confusion
**Description:** Var hoisting causes unexpected undefined.
```javascript
function test() {
  console.log(value);
  var value = 42;
}
test();
```

### Error 19: Const object property reassignment misunderstanding
**Description:** Thinking const makes object properties immutable.
```javascript
const person = { name: "Alice" };
person = { name: "Bob" };
console.log(person);
```

### Error 20: Assignment to constant global
**Description:** Trying to reassign Math.PI.
```javascript
Math.PI = 3;
console.log(Math.PI);
```

### Error 21: Variable name with space
**Description:** Using a space in a variable name.
```javascript
let first name = "Alice";
console.log(first name);
```

### Error 22: Reassigning const array
**Description:** Trying to reassign a const array reference.
```javascript
const arr = [1, 2, 3];
arr = [4, 5, 6];
console.log(arr);
```

### Error 23: Undeclared variable assignment
**Description:** Assigning to an undeclared variable creates a global.
```javascript
function setValue() {
  value = 42;
}
setValue();
console.log(value);
```

### Error 24: Let shadowing let in same scope
**Description:** Trying to shadow a let variable in the same scope.
```javascript
let x = 10;
let x = 20;
console.log(x);
```

### Error 25: Using delete on var
**Description:** Cannot delete var-declared variables.
```javascript
var x = 10;
delete x;
console.log(x);
```

### Error 26: Using delete on let
**Description:** Cannot delete let-declared variables.
```javascript
let x = 10;
delete x;
console.log(x);
```

### Error 27: Function redeclaration with var
**Description:** Var hoisting over function declaration.
```javascript
function test() { return 1; }
var test = 2;
console.log(test);
```

### Error 28: Const with increment operator
**Description:** Using increment operator on a const.
```javascript
const counter = 0;
counter++;
console.log(counter);
```

### Error 29: Variable name with special characters
**Description:** Using special characters in variable name.
```javascript
let user@name = "Alice";
console.log(user@name);
```

### Error 30: Let in switch without block
**Description:** Using let in a switch case without block scope.
```javascript
let value = 1;
switch (value) {
  case 1:
    let result = "one";
    console.log(result);
    break;
  case 2:
    let result = "two";
    console.log(result);
    break;
}
```

### Error 31: Var inside for loop leaks
**Description:** Var inside a for loop leaks to the global scope.
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Error 32: Const destructuring reassignment
**Description:** Reassigning a destructured const variable.
```javascript
const [a, b] = [1, 2];
a = 10;
console.log(a);
```

### Error 33: Double declaration with let and var
**Description:** Mixing let and var for the same variable name.
```javascript
let x = 10;
var x = 20;
console.log(x);
```

### Error 34: Accessing block-scoped variable outside block
**Description:** Accessing a let variable outside its block.
```javascript
{
  let secret = "hidden";
}
console.log(secret);
```

### Error 35: Variable name starting with underscore followed by number
**Description:** Starting variable name with underscore and number (valid but confusing).
```javascript
let _1 = 10;
console.log(_1);
```

### Error 36: Const destructuring with rest reassignment
**Description:** Trying to reassign rest element from destructuring.
```javascript
const [a, ...rest] = [1, 2, 3];
rest = [4, 5];
console.log(rest);
```

### Error 37: Nested block const redeclaration
**Description:** Redeclaring const in nested block with same name.
```javascript
const x = 1;
{
  const x = 2;
  console.log(x);
}
console.log(x);
```

### Error 38: Var and function hoisting order
**Description:** Function hoisting with var name collision.
```javascript
function greet() { return "hi"; }
var greet = "hello";
console.log(greet());
```

### Error 39: Missing declaration in for-in
**Description:** Using undeclared variable in for-in loop.
```javascript
const obj = { a: 1, b: 2 };
for (key in obj) {
  console.log(key);
}
```

### Error 40: Const with compound assignment
**Description:** Using compound assignment on a const.
```javascript
const x = 10;
x += 5;
console.log(x);
```

### Error 41: Let outside parentheses in for
**Description:** Mistakenly placing let outside for parentheses.
```javascript
let i;
for (i = 0; i < 5; i++);
console.log(i);
```

### Error 42: Function parameter named same as const
**Description:** Parameter shadows a const from outer scope.
```javascript
const x = 10;
function foo(x) {
  x = 20;
  console.log(x);
}
foo(5);
console.log(x);
```

### Error 43: Var in catch block leaks
**Description:** Var declared in catch block leaks.
```javascript
try {
  throw new Error("fail");
} catch (e) {
  var msg = "caught";
}
console.log(msg);
```

### Error 44: Unicode escape in variable name
**Description:** Using unicode escape sequences incorrectly.
```javascript
let \u0041 = 10;
console.log(\u0041);
```

### Error 45: Let redeclaration in catch
**Description:** Redeclaring let in catch block.
```javascript
try {
  throw new Error("fail");
} catch (e) {
  let e = "error";
  console.log(e);
}
```

### Error 46: Unterminated string after variable
**Description:** Syntax error due to unterminated string when assigning.
```javascript
let message = "hello;
console.log(message);
```

### Error 47: Implicit global in function
**Description:** Creating an implicit global inside a function.
```javascript
function test() {
  foo = "bar";
}
test();
console.log(foo);
```

### Error 48: Const with post-decrement
**Description:** Using decrement operator on a const.
```javascript
const count = 10;
count--;
console.log(count);
```

### Error 49: Semicolon insertion breaking return
**Description:** Automatic semicolon insertion breaks variable assignment.
```javascript
function getValue() {
  return
    { value: 42 };
}
console.log(getValue());
```

### Error 50: Confusing variable scope with if-block
**Description:** Accessing block-scoped variable outside if block.
```javascript
if (true) {
  let x = 10;
}
console.log(x);
```

### Error 51: Var redeclaration in function
**Description:** Var redeclaration in function causes confusion.
```javascript
function foo() {
  var x = 1;
  var x = 2;
  return x;
}
console.log(foo());
```

### Error 52: Space before function call interpreted as variable
**Description:** Accidentally creating a variable instead of calling function.
```javascript
let console.log = "test";
console.log("hello");
```

### Error 53: Assigning to a function call result
**Description:** Trying to assign to the result of a function call.
```javascript
function getX() { return 5; }
getX() = 10;
console.log(getX());
```

### Error 54: Const variable in try-catch reassignment
**Description:** Trying to reassign a const inside try-catch.
```javascript
const result = 0;
try {
  result = 42;
} catch (e) {
  console.log(e);
}
```

### Error 55: Using undefined as variable name
**Description:** Using undefined as a variable name (allowed but dangerous).
```javascript
let undefined = "defined";
console.log(undefined);
```

### Error 56: Block-scoped function redeclaration
**Description:** Redeclaring a block-scoped function with var.
```javascript
{
  function foo() { return 1; }
  var foo = 2;
}
console.log(foo);
```

### Error 57: Label with variable name collision
**Description:** Using a label that matches a variable name.
```javascript
let x = 10;
x: for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### Error 58: Const in switch case without braces
**Description:** Using const in switch cases without block scoping.
```javascript
let value = 1;
switch (value) {
  case 0:
    const x = "zero";
    break;
  case 1:
    const x = "one";
    break;
}
```

### Error 59: Var declaration in for-in loop
**Description:** Var in for-in creates function-scoped variable.
```javascript
const obj = { a: 1, b: 2 };
for (var key in obj) {
  console.log(key);
}
console.log(key);
```

### Error 60: Multiple const declarations with same name
**Description:** Multiple const declarations with the same name in same function.
```javascript
function test() {
  const x = 1;
  const x = 2;
  return x;
}
```

### Error 61: Variable named NaN reassignment
**Description:** Reassigning the global NaN constant (silently fails in non-strict).
```javascript
NaN = "not a number";
console.log(NaN);
```

### Error 62: Variable hoisting with typeof
**Description:** Using typeof before let declaration (TDZ).
```javascript
console.log(typeof x);
let x = 10;
```

### Error 63: Mixing let and const for same variable
**Description:** Declaring with let then const for the same name.
```javascript
let y = 10;
const y = 20;
console.log(y);
```

### Error 64: Destructuring assignment without declaration
**Description:** Destructuring without let/const/var in strict mode.
```javascript
"use strict";
[a, b] = [1, 2];
console.log(a, b);
```

### Error 65: Var within eval leaks to containing function
**Description:** Var in eval leaks to the containing function scope.
```javascript
function test() {
  eval("var x = 10;");
  console.log(x);
}
test();
```

### Error 66: Const with default parameter
**Description:** Using const in default parameter incorrectly.
```javascript
function foo(x = const y = 5) {
  return x + y;
}
console.log(foo());
```

### Error 67: Using let with class name
**Description:** Using let to declare a variable named class.
```javascript
let class = "senior";
console.log(class);
```

### Error 68: Accessing inner function var outside
**Description:** Accessing a var declared inside a nested function.
```javascript
function outer() {
  function inner() {
    var x = 10;
  }
  console.log(x);
}
outer();
```

### Error 69: Const with comma operator
**Description:** Misunderstanding const with comma operator.
```javascript
const x = (1, 2, 3);
console.log(x);
```

### Error 70: Variable name conflict with imports
**Description:** Variable name that conflicts with an import.
```javascript
import { readFile } from "fs";
let readFile = "test";
console.log(readFile);
```

---

### Issue 1: Using var instead of let
**Description:** Using var creates function-scoped variables that can cause bugs.
```javascript
function count() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
}
```

### Issue 2: Global variable pollution
**Description:** Accidentally creating global variables inside functions.
```javascript
function saveUser(name) {
  user = name;
}
saveUser("Alice");
```

### Issue 3: Uninformative variable names
**Description:** Using single-letter variable names that lack meaning.
```javascript
let x = 10;
let y = 20;
let z = x + y;
console.log(z);
```

### Issue 4: Magic numbers instead of named constants
**Description:** Using raw numbers instead of descriptive const variables.
```javascript
let total = price + price * 0.08;
console.log(total);
```

### Issue 5: Shadowing outer variable
**Description:** Inner scope variable shadows outer variable unintentionally.
```javascript
let name = "Alice";
function greet() {
  let name = "Bob";
  console.log(name);
}
```

### Issue 6: Variable hoisting dependency
**Description:** Relying on var hoisting for correct behavior.
```javascript
function test() {
  console.log(value);
  var value = 42;
}
test();
```

### Issue 7: Missing const for unchanged values
**Description:** Using let for variables that are never reassigned.
```javascript
let taxRate = 0.08;
let total = 100 * taxRate;
console.log(total);
```

### Issue 8: Redeclaring variables with var
**Description:** Using var allows redeclaration which can hide bugs.
```javascript
var counter = 0;
var counter = 5;
console.log(counter);
```

### Issue 9: Deep scope nesting with shared names
**Description:** Multiple nested scopes reusing the same variable name.
```javascript
let value = 1;
{
  let value = 2;
  {
    let value = 3;
    console.log(value);
  }
}
```

### Issue 10: Implicit global in non-strict code
**Description:** Missing declaration creates an implicit global.
```javascript
function setTitle(t) {
  title = t;
}
setTitle("Hello");
console.log(title);
```

### Issue 11: Short abbreviation names
**Description:** Using cryptic abbreviations instead of descriptive names.
```javascript
let usrNm = "Alice";
let usrAg = 30;
console.log(usrNm, usrAg);
```

### Issue 12: Using var at global scope
**Description:** Var at global scope creates a property on window.
```javascript
var globalVar = "test";
console.log(window.globalVar);
```

### Issue 13: Inconsistent naming style
**Description:** Mixing camelCase, snake_case, and PascalCase inconsistently.
```javascript
let user_name = "Alice";
let userAge = 30;
let UserEmail = "alice@test.com";
```

### Issue 14: Boolean variable without is/has prefix
**Description:** Boolean variables that don't indicate they are boolean.
```javascript
let active = true;
let complete = false;
console.log(active, complete);
```

### Issue 15: Variable name too generic
**Description:** Using generic names like data, info, temp.
```javascript
let data = fetchData();
let info = processData(data);
console.log(info);
```

### Issue 16: Using var in for-loop
**Description:** Var in for-loop causes callback closure bugs.
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Issue 17: Unused variables
**Description:** Declaring variables that are never used.
```javascript
function calculate(a, b) {
  let result = a + b;
  let unused = 42;
  return a + b;
}
```

### Issue 18: Variable assignment in condition
**Description:** Assigning a variable inside a condition expression.
```javascript
let x;
if (x = getValue()) {
  console.log(x);
}
```

### Issue 19: Not using destructuring
**Description:** Manually extracting values instead of destructuring.
```javascript
const user = { name: "Alice", age: 30 };
let name = user.name;
let age = user.age;
console.log(name, age);
```

### Issue 20: Using var inside block
**Description:** Using var inside a block where let should be used.
```javascript
if (true) {
  var x = 10;
}
console.log(x);
```

### Issue 21: Variable names that shadow built-ins
**Description:** Using names that shadow JavaScript built-in functions.
```javascript
let alert = "message";
console.log(alert);
```

### Issue 22: Comma-separated declarations without explicit types
**Description:** Multiple variables declared with a single let/const/var.
```javascript
let a = 1, b = 2, c = 3;
console.log(a + b + c);
```

### Issue 23: Using let for constants
**Description:** Using let for values that never change throughout the program.
```javascript
let companyName = "ACME Corp";
let maxRetries = 3;
console.log(companyName, maxRetries);
```

### Issue 24: No space around assignment operators
**Description:** Inconsistent spacing around assignment operators.
```javascript
let x=10;
let y =20;
let z= 30;
console.log(x+y+z);
```

### Issue 25: Reassigning parameters
**Description:** Modifying function parameter values directly.
```javascript
function discount(price, rate) {
  price = price * rate;
  return price;
}
```

### Issue 26: Using eval with variable declarations
**Description:** Using eval to declare variables creates scope issues.
```javascript
function test() {
  eval("let x = 10");
  console.log(x);
}
test();
```

### Issue 27: Variable name with trailing underscore
**Description:** Trailing underscores are unusual and confusing.
```javascript
let name_ = "Alice";
let age_ = 30;
console.log(name_, age_);
```

### Issue 28: Multiple var declarations in same function
**Description:** Multiple var declarations scattered throughout a function.
```javascript
function test() {
  var x = 1;
  console.log(x);
  var y = 2;
  console.log(y);
  var z = 3;
  console.log(z);
}
```

### Issue 29: Using NaN as a variable name
**Description:** Using NaN as a variable name (technically possible but dangerous).
```javascript
let NaN = 42;
console.log(NaN);
```

### Issue 30: Overwriting undefined
**Description:** Assigning a value to the undefined identifier.
```javascript
let undefined = "defined";
console.log(undefined === "defined");
```

---

### Modify 1: Replace var with const
**Description:** Change the var declaration to const since the value never changes.
```javascript
var taxRate = 0.08;
```

### Modify 2: Replace var with let
**Description:** Change the var declaration to let for proper block scoping.
```javascript
var count = 0;
count = 1;
```

### Modify 3: Fix const reassignment
**Description:** Change const to let to allow reassignment.
```javascript
const score = 0;
score = score + 10;
```

### Modify 4: Add proper variable name
**Description:** Rename the poorly named variable.
```javascript
let x = "Alice";
console.log(x);
```

### Modify 5: Extract magic number to const
**Description:** Extract the hardcoded number into a named constant.
```javascript
let total = price * 0.08;
```

### Modify 6: Add missing declaration
**Description:** Add a proper declaration for the variable.
```javascript
function save() {
  username = "Alice";
  console.log(username);
}
```

### Modify 7: Fix undeclared variable in strict mode
**Description:** Add a declaration for the variable used in strict mode.
```javascript
"use strict";
name = "Alice";
console.log(name);
```

### Modify 8: Replace var with let in for loop
**Description:** Fix the for loop to use let for proper closure behavior.
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Modify 9: Fix scope by moving variable
**Description:** Move the variable declaration to the correct scope.
```javascript
if (true) {
  var message = "hello";
}
console.log(message);
```

### Modify 10: Add const for unchanged value
**Description:** Change let to const since the value never changes.
```javascript
let userName = "Alice";
console.log(userName);
```

### Modify 11: Fix destructuring declaration
**Description:** Add proper declaration for destructuring assignment.
```javascript
"use strict";
[a, b] = [1, 2];
```

### Modify 12: Remove redeclaration
**Description:** Remove the duplicate variable declaration.
```javascript
let count = 10;
let count = 20;
console.log(count);
```

### Modify 13: Rename reserved word variable
**Description:** Rename the variable that uses a reserved word.
```javascript
let class = "math";
console.log(class);
```

### Modify 14: Add initializer to const
**Description:** Add an initial value to the const declaration.
```javascript
const PI;
PI = 3.14;
```

### Modify 15: Fix variable name with hyphen
**Description:** Replace hyphen with underscore or camelCase.
```javascript
let user-name = "Alice";
```

### Modify 16: Move declaration to correct scope
**Description:** Move the block-scoped variable to the outer scope.
```javascript
{
  let secret = "hidden";
}
console.log(secret);
```

### Modify 17: Remove parameter reassignment
**Description:** Use a new variable instead of reassigning the parameter.
```javascript
function double(x) {
  x = x * 2;
  return x;
}
```

### Modify 18: Extract repeated value to variable
**Description:** Store the repeated string in a variable.
```javascript
console.log("Hello, Alice!");
console.log("Hello, Bob!");
console.log("Hello, Charlie!");
```

### Modify 19: Add proper spacing around operator
**Description:** Fix the spacing around the assignment operator.
```javascript
let x=10;
console.log(x);
```

### Modify 20: Fix variable shadowing
**Description:** Rename the inner variable to avoid shadowing.
```javascript
let name = "Alice";
function greet() {
  let name = "Bob";
  console.log(name);
}
```

### Modify 21: Add boolean prefix
**Description:** Rename the boolean variable with is/has prefix.
```javascript
let active = true;
```

### Modify 22: Remove unused variable
**Description:** Remove the variable that is declared but never used.
```javascript
function calculate(a, b) {
  let result = a + b;
  let unused = 42;
  return result;
}
```

### Modify 23: Convert to destructuring
**Description:** Use destructuring to extract values from the object.
```javascript
const user = { name: "Alice", age: 30 };
let name = user.name;
let age = user.age;
```

### Modify 24: Add block scope to switch case
**Description:** Add braces to switch case for proper block scoping.
```javascript
switch (value) {
  case 1:
    let result = "one";
    console.log(result);
    break;
}
```

### Modify 25: Fix undeclared for-in variable
**Description:** Add proper declaration for the for-in loop variable.
```javascript
const obj = { a: 1 };
for (key in obj) {
  console.log(key);
}
```

### Modify 26: Use descriptive variable name
**Description:** Replace the vague variable name with a descriptive one.
```javascript
let d = new Date();
console.log(d);
```

### Modify 27: Remove dependency on hoisting
**Description:** Move the declaration before the usage.
```javascript
function test() {
  console.log(value);
  var value = 42;
}
```

### Modify 28: Fix const in for loop
**Description:** Change const to let in the for loop.
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Modify 29: Separate declarations with semicolons
**Description:** Use separate statements for each variable declaration.
```javascript
let a = 1, b = 2, c = 3;
```

### Modify 30: Add const for object property
**Description:** Declare the object property value as a const.
```javascript
const config = {};
config.port = 3000;
console.log(config.port);
```

### Modify 31: Add variable type prefix
**Description:** Add a prefix to indicate the variable type or purpose.
```javascript
let name = "Alice";
let age = 30;
```

### Modify 32: Fix comma in declaration
**Description:** Add the missing comma between variable declarations.
```javascript
let a = 1
let b = 2
```

### Modify 33: Remove assignment in condition
**Description:** Move the assignment outside the if condition.
```javascript
let x;
if (x = getValue()) {
  console.log(x);
}
```

### Modify 34: Add block-scoped declaration
**Description:** Add a proper let declaration inside the block.
```javascript
if (true) {
  message = "hello";
  console.log(message);
}
```

### Modify 35: Add default value to parameter
**Description:** Add a default value to the function parameter.
```javascript
function greet(name) {
  console.log("Hello, " + name);
}
```

### Modify 36: Remove global leak from function
**Description:** Add let declaration to prevent implicit global.
```javascript
function test() {
  foo = "bar";
}
```

### Modify 37: Use array literal instead of new Array
**Description:** Replace new Array with array literal.
```javascript
let arr = new Array(1, 2, 3);
```

### Modify 38: Add const for fixed configuration
**Description:** Extract configuration values into a const object.
```javascript
let port = 3000;
let host = "localhost";
let protocol = "http";
```

### Modify 39: Rename shadowed variable
**Description:** Rename the inner variable to avoid shadowing built-in.
```javascript
let alert = "message";
console.log(alert);
```

### Modify 40: Fix temporal dead zone issue
**Description:** Move the declaration before the usage.
```javascript
console.log(value);
let value = 42;
```

### Modify 41: Add declaration for loop counter
**Description:** Add proper declaration for the loop counter variable.
```javascript
for (i = 0; i < 5; i++) {
  console.log(i);
}
```

### Modify 42: Rename variable with special character
**Description:** Replace the special characters in the variable name.
```javascript
let user@name = "Alice";
```

### Modify 43: Extract condition to variable
**Description:** Store the repeated condition in a descriptive variable.
```javascript
if (user.age >= 18 && user.age <= 65) {
  console.log("Working age");
}
if (user.age >= 18 && user.age <= 65) {
  console.log("Eligible");
}
```

### Modify 44: Use const for imported value
**Description:** Change let to const for the imported module reference.
```javascript
let fs = require("fs");
fs.readFile("test.txt", () => {});
```

### Modify 45: Remove var from eval
**Description:** Avoid using var inside eval statements.
```javascript
function test() {
  eval("var x = 10");
}
```

### Modify 46: Add missing semicolons
**Description:** Add semicolons at the end of variable declarations.
```javascript
let x = 10
let y = 20
console.log(x + y)
```

### Modify 47: Remove unused parameter
**Description:** Remove the function parameter that is never used.
```javascript
function logMessage(message, level) {
  console.log(message);
}
```

### Modify 48: Add const for fixed tax rate
**Description:** Extract the tax rate as a named constant.
```javascript
let total = amount + amount * 0.08;
```

### Modify 49: Fix variable name starting with number
**Description:** Rename the variable that starts with a number.
```javascript
let 1stPlace = "gold";
```

### Modify 50: Add explicit type conversion
**Description:** Use explicit conversion instead of relying on coercion.
```javascript
let result = "5" + 3;
console.log(result);
```
