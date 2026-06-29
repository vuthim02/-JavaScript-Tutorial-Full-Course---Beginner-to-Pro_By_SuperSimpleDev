# Debugging Challenge - Level 24
## Module 5: Variables - Reassignment and Type Coercion

---

### Error 1: Const increment
**Description:** Trying to increment a const variable.
```javascript
const counter = 0;
counter++;
console.log(counter);
```

### Error 2: String concatenation instead of addition
**Description:** Using + with strings and numbers causes concatenation.
```javascript
let result = 10 + "5";
console.log(result);
```

### Error 3: Subtraction with string
**Description:** Subtraction coerces string to number but can cause NaN.
```javascript
let result = "hello" - 5;
console.log(result);
```

### Error 4: Loose equality with 0 and false
**Description:** 0 == false is true, which is often unexpected.
```javascript
if (0 == false) {
  console.log("equal");
}
```

### Error 5: Loose equality with empty string
**Description:** "" == false is true, causing unexpected behavior.
```javascript
let input = "";
if (input == false) {
  console.log("empty");
}
```

### Error 6: Null with arithmetic
**Description:** null coerces to 0 in arithmetic operations.
```javascript
let result = null + 5;
console.log(result);
```

### Error 7: Undefined with arithmetic
**Description:** undefined coerces to NaN in arithmetic.
```javascript
let result = undefined + 5;
console.log(result);
```

### Error 8: Array to string coercion
**Description:** Arrays coerced to strings unexpectedly.
```javascript
let arr = [1, 2, 3];
console.log(arr + 5);
```

### Error 9: Object to string coercion
**Description:** Objects coerced to [object Object].
```javascript
let obj = { value: 10 };
console.log("Result: " + obj);
```

### Error 10: NaN comparison
**Description:** NaN is never equal to itself.
```javascript
let result = NaN;
if (result === NaN) {
  console.log("is NaN");
}
```

### Error 11: String with multiplication
**Description:** String with non-numeric content produces NaN.
```javascript
let result = "abc" * 3;
console.log(result);
```

### Error 12: Boolean with arithmetic
**Description:** true coerces to 1 in arithmetic.
```javascript
let result = true + true + true;
console.log(result);
```

### Error 13: Empty array comparison
**Description:** Empty array == false is true.
```javascript
if ([] == false) {
  console.log("empty array is false");
}
```

### Error 14: Reassigning const property
**Description:** Trying to reassign the value property of a const.
```javascript
const obj = {};
obj = { value: 10 };
console.log(obj);
```

### Error 15: Const with +=
**Description:** Using += on a const variable.
```javascript
const x = 10;
x += 5;
console.log(x);
```

### Error 16: String with division
**Description:** String with numeric content auto-coerces but can cause bugs.
```javascript
let result = "100" / 2;
console.log(result);
```

### Error 17: String with subtraction
**Description:** String with numeric content auto-coerces in subtraction.
```javascript
let result = "10" - 5;
console.log(result);
```

### Error 18: Exponention with string
**Description:** String with numeric content in exponentiation.
```javascript
let result = "2" ** 3;
console.log(result);
```

### Error 19: Loose equality null vs undefined
**Description:** null == undefined is true but null === undefined is false.
```javascript
if (null == undefined) {
  console.log("equal");
}
```

### Error 20: String with increment
**Description:** Using ++ on a string variable converts to number.
```javascript
let str = "5";
str++;
console.log(str);
```

### Error 21: Unary plus with string
**Description:** Unary plus coerces string to number.
```javascript
let str = "5";
let result = +str + 5;
console.log(result);
```

### Error 22: Double negation confusion
**Description:** Double negation !! converts value to boolean.
```javascript
let value = "hello";
let bool = !!value;
console.log(bool);
```

### Error 23: Const array modification thinking reassignment
**Description:** Thinking const array cannot be modified.
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

### Error 24: Object property addition with const
**Description:** Adding new property to const object is allowed.
```javascript
const obj = {};
obj.name = "Alice";
console.log(obj);
```

### Error 25: String with remainder
**Description:** String in remainder operation coerces to number.
```javascript
let result = "10" % 3;
console.log(result);
```

### Error 26: Bitwise NOT with string
**Description:** Bitwise NOT coerces string to number.
```javascript
let result = ~"5";
console.log(result);
```

### Error 27: Loose equality with null
**Description:** null is loosely equal only to undefined and null.
```javascript
if (null == 0) {
  console.log("null is 0");
}
```

### Error 28: Loose equality with empty array
**Description:** Empty array == 0 is true.
```javascript
if ([] == 0) {
  console.log("empty is zero");
}
```

### Error 29: Array of one number coercion
**Description:** [1] == 1 is true due to coercion.
```javascript
if ([1] == 1) {
  console.log("array equals number");
}
```

### Error 30: String with Boolean coercion
**Description:** Non-empty strings coerce to true.
```javascript
if ("false") {
  console.log("false is truthy");
}
```

### Error 31: Const with destructuring reassignment
**Description:** Trying to reassign a destructured const.
```javascript
const [a, b] = [1, 2];
a = 10;
console.log(a);
```

### Error 32: Type coercion with switch
**Description:** Switch uses strict equality but fall-through can cause issues.
```javascript
let value = "1";
switch (value) {
  case 1:
    console.log("number");
    break;
  case "1":
    console.log("string");
    break;
}
```

### Error 33: String concatenation with objects
**Description:** Objects in string concatenation become [object Object].
```javascript
let user = { name: "Alice" };
console.log("User: " + user);
```

### Error 34: Date coercion to string
**Description:** Date objects coerce to their string representation.
```javascript
let date = new Date();
console.log("Date: " + date);
```

### Error 35: Regex to string coercion
**Description:** RegExp objects coerce to their string representation.
```javascript
let regex = /hello/g;
console.log("Pattern: " + regex);
```

### Error 36: Function to string coercion
**Description:** Functions coerce to their source code string.
```javascript
function foo() { return 42; }
console.log("Function: " + foo);
```

### Error 37: Symbol coercion to string
**Description:** Symbol cannot be implicitly coerced to string.
```javascript
let sym = Symbol("test");
console.log("Symbol: " + sym);
```

### Error 38: BigInt with regular number
**Description:** BigInt cannot mix with regular numbers in arithmetic.
```javascript
let big = 10n;
let result = big + 5;
console.log(result);
```

### Error 39: BigInt division truncation
**Description:** BigInt division truncates toward zero.
```javascript
let result = 5n / 2n;
console.log(result);
```

### Error 40: Reassigning function parameter
**Description:** Reassigning a function parameter does not affect the caller.
```javascript
function addOne(x) {
  x = x + 1;
  return x;
}
let value = 5;
addOne(value);
console.log(value);
```

### Error 41: Const with for-in
**Description:** Using const in for-in loop is fine but confusing.
```javascript
const obj = { a: 1 };
for (const key in obj) {
  key = "b";
  console.log(key);
}
```

### Error 42: Nested object const misunderstanding
**Description:** Nested object properties can still be modified.
```javascript
const config = {
  database: {
    host: "localhost"
  }
};
config.database.host = "newhost";
console.log(config.database.host);
```

### Error 43: Freeze shallow only
**Description:** Object.freeze only freezes the top level.
```javascript
const obj = Object.freeze({ nested: { value: 10 } });
obj.nested.value = 20;
console.log(obj.nested.value);
```

### Error 44: Const with let reassignment confusion
**Description:** Switching between const and let incorrectly.
```javascript
const items = [1, 2, 3];
items = items.map(x => x * 2);
console.log(items);
```

### Error 45: Reassignment of function expression
**Description:** Function expression assigned to const cannot be changed.
```javascript
const foo = function() { return 1; };
foo = function() { return 2; };
console.log(foo());
```

### Error 46: Changing array length with const
**Description:** Modifying array length is allowed with const.
```javascript
const arr = [1, 2, 3];
arr.length = 1;
console.log(arr);
```

### Error 47: Delete property from const object
**Description:** Deleting a property from a const object is allowed.
```javascript
const obj = { name: "Alice", age: 30 };
delete obj.age;
console.log(obj);
```

### Error 48: Const with Object.assign
**Description:** Object.assign mutates the target const object.
```javascript
const target = { a: 1 };
Object.assign(target, { b: 2 });
console.log(target);
```

### Error 49: Const with spread operator
**Description:** Spread operator creates new object, not mutation.
```javascript
const obj = { a: 1 };
const newObj = { ...obj, b: 2 };
console.log(obj);
console.log(newObj);
```

### Error 50: NaN from undefined property access
**Description:** Accessing undefined property produces undefined, not NaN.
```javascript
const obj = {};
let result = obj.value + 5;
console.log(result);
```

### Error 51: String with unary minus
**Description:** Unary minus coerces string to number.
```javascript
let str = "10";
let result = -str;
console.log(result);
```

### Error 52: Comparing string and number with >=
**Description:** >= coerces string to number.
```javascript
if ("10" >= 5) {
  console.log("coerced");
}
```

### Error 53: Comparing boolean with number
**Description:** true >= 1 is true because true coerces to 1.
```javascript
if (true >= 1) {
  console.log("true is at least 1");
}
```

### Error 54: Array comparison with ==
**Description:** Two different array objects are not == even with same content.
```javascript
if ([1, 2] == [1, 2]) {
  console.log("same arrays");
}
```

### Error 55: Object comparison with ==
**Description:** Two different objects are not == even with same properties.
```javascript
if ({a: 1} == {a: 1}) {
  console.log("same objects");
}
```

### Error 56: Date comparison with ==
**Description:** Two dates with same time are not ==.
```javascript
const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 0, 1);
if (d1 == d2) {
  console.log("same dates");
}
```

### Error 57: Const in do-while condition
**Description:** Variable in do-while condition should not be const.
```javascript
do {
  console.log("loop");
} while (const i = 0);
```

### Error 58: Reassigning arguments object
**Description:** Strict mode forbids reassigning arguments.
```javascript
"use strict";
function foo() {
  arguments = [1, 2, 3];
  console.log(arguments);
}
foo();
```

### Error 59: Const with computed property
**Description:** Computed property with const variable.
```javascript
const key = "name";
const obj = {
  [key]: "Alice"
};
obj[key] = "Bob";
console.log(obj);
```

### Error 60: Undefined with template literal
**Description:** undefined in template literal becomes "undefined".
```javascript
let value;
console.log(`Value is ${value}`);
```

### Error 61: Null with template literal
**Description:** null in template literal becomes "null".
```javascript
let value = null;
console.log(`Value is ${value}`);
```

### Error 62: NaN with template literal
**Description:** NaN in template literal becomes "NaN".
```javascript
let result = 0 / 0;
console.log(`Result is ${result}`);
```

### Error 63: Infinity with arithmetic
**Description:** Division by zero produces Infinity.
```javascript
let result = 1 / 0;
console.log(result);
```

### Error 64: -0 comparison
**Description:** -0 === 0 is true but Object.is(-0, 0) is false.
```javascript
if (-0 === 0) {
  console.log("-0 is 0");
}
```

### Error 65: Number.MAX_VALUE overflow
**Description:** Adding to max value produces Infinity.
```javascript
let result = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(result);
```

### Error 66: parseInt with leading zeros
**Description:** parseInt with leading zeros can have unexpected results.
```javascript
let result = parseInt("010");
console.log(result);
```

### Error 67: parseFloat with multiple decimals
**Description:** parseFloat parses only up to the first invalid character.
```javascript
let result = parseFloat("10.5.5");
console.log(result);
```

### Error 68: Number constructor without new
**Description:** Number() without new coerces the value.
```javascript
let result = Number("10") + Number("5");
console.log(result);
```

### Error 69: String constructor for type conversion
**Description:** String() converts values to string explicitly.
```javascript
let result = String(123) + String(456);
console.log(result);
```

### Error 70: Boolean constructor truthiness
**Description:** Boolean("false") returns true because it's a non-empty string.
```javascript
let result = Boolean("false");
console.log(result);
```

---

### Issue 1: Using == instead of ===
**Description:** Loose equality can cause unexpected type coercion.
```javascript
if (value == 10) {
  console.log("ten");
}
```

### Issue 2: Reassigning let when const should be used
**Description:** Variable is declared with let but never reassigned.
```javascript
let taxRate = 0.08;
let total = 100 * taxRate;
```

### Issue 3: Relying on implicit coercion
**Description:** Code depends on JavaScript's implicit type coercion.
```javascript
let total = "10" - 0 + 5;
console.log(total);
```

### Issue 4: String concatenation in loops
**Description:** Using + for string concatenation in performance-sensitive code.
```javascript
let result = "";
for (let i = 0; i < 100; i++) {
  result += i;
}
```

### Issue 5: Using || for default with numbers
**Description:** Using || for default values treats 0 as falsy.
```javascript
function getCount(c) {
  return c || 1;
}
console.log(getCount(0));
```

### Issue 6: Adding strings instead of numbers
**Description:** Variables expected to be numbers are strings.
```javascript
const a = "10";
const b = "20";
console.log(a + b);
```

### Issue 7: Not using Number.isNaN
**Description:** Using isNaN which coerces the value.
```javascript
console.log(isNaN("hello"));
```

### Issue 8: Undefined variable access
**Description:** Accessing a variable that might be undefined.
```javascript
let config;
console.log(config.port);
```

### Issue 9: Null check without strict equality
**Description:** Using == null instead of === null.
```javascript
function getValue(val) {
  if (val == null) {
    return "default";
  }
  return val;
}
```

### Issue 10: Const with object mutation
**Description:** Using const but still mutating the object.
```javascript
const user = { name: "Alice" };
user.name = "Bob";
```

### Issue 11: Using var for loop counter
**Description:** Var in loop causes closure bugs.
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Issue 12: Not using template literals
**Description:** String concatenation with + instead of template literals.
```javascript
let name = "Alice";
let greeting = "Hello, " + name + "!";
```

### Issue 13: Comparing with NaN
**Description:** Direct comparison with NaN always returns false.
```javascript
if (value === NaN) {
  console.log("not a number");
}
```

### Issue 14: Using new Object() instead of {}
**Description:** Using the Object constructor instead of literal syntax.
```javascript
let obj = new Object();
obj.name = "Alice";
```

### Issue 15: Using new Array() instead of []
**Description:** Using the Array constructor instead of literal syntax.
```javascript
let arr = new Array(1, 2, 3);
```

### Issue 16: For-in with arrays
**Description:** Using for-in instead of for-of for arrays.
```javascript
const arr = [1, 2, 3];
for (const key in arr) {
  console.log(arr[key]);
}
```

### Issue 17: Global variable leaks
**Description:** Forgetting to declare a variable creates a global.
```javascript
function save(item) {
  cache = cache || [];
  cache.push(item);
}
```

### Issue 18: Reassigning array reference
**Description:** Reassigning an array parameter does not affect the caller.
```javascript
function clear(arr) {
  arr = [];
}
const items = [1, 2, 3];
clear(items);
console.log(items);
```

### Issue 19: Using with statement
**Description:** The with statement is deprecated and causes scope issues.
```javascript
with (obj) {
  console.log(value);
}
```

### Issue 20: Float precision issues
**Description:** Floating point arithmetic can produce unexpected results.
```javascript
console.log(0.1 + 0.2);
```

### Issue 21: parseInt without radix
**Description:** parseInt without radix can produce unexpected results.
```javascript
console.log(parseInt("010"));
```

### Issue 22: Bitwise operator for truncation
**Description:** Using bitwise OR for Math.floor is not clear.
```javascript
let truncated = 10.7 | 0;
```

### Issue 23: Double bitwise NOT for floor
**Description:** Using ~~ for Math.floor is not readable.
```javascript
let floor = ~~10.7;
```

### Issue 24: Using eval for type conversion
**Description:** Using eval instead of explicit conversion is dangerous.
```javascript
let num = eval("10") + 5;
```

### Issue 25: Const reference confusion
**Description:** Thinking const prevents all mutation of objects.
```javascript
const items = [1, 2, 3];
items[0] = 10;
```

### Issue 26: Assignment in conditional expression
**Description:** Using = instead of === in if conditions.
```javascript
if (x = 10) {
  console.log("x is 10");
}
```

### Issue 27: String index as character
**Description:** Using string index instead of charAt or slice.
```javascript
let str = "hello";
console.log(str[0]);
```

### Issue 28: Null vs undefined confusion
**Description:** Using null and undefined interchangeably without distinction.
```javascript
let value = null;
if (value == undefined) {
  console.log("no value");
}
```

### Issue 29: Array-like object confusion
**Description:** Treating array-like objects as real arrays.
```javascript
function foo() {
  arguments.forEach(arg => console.log(arg));
}
```

### Issue 30: Typed array coercion
**Description:** Typed arrays coerce values to the array type.
```javascript
const arr = new Uint8Array(1);
arr[0] = 300;
console.log(arr[0]);
```

---

### Modify 1: Change = to === in if condition
**Description:** Fix the assignment to a comparison.
```javascript
if (x = 10) {
  console.log("ten");
}
```

### Modify 2: Replace == with ===
**Description:** Use strict equality to avoid type coercion.
```javascript
if (value == 10) {
  console.log("ten");
}
```

### Modify 3: Add explicit type conversion
**Description:** Convert the string to a number explicitly.
```javascript
let a = "10";
let b = "20";
console.log(a + b);
```

### Modify 4: Use Number.isNaN instead of isNaN
**Description:** Use the stricter Number.isNaN method.
```javascript
console.log(isNaN("hello"));
```

### Modify 5: Remove implicit coercion
**Description:** Use explicit Number() conversion.
```javascript
let result = "10" - 0 + 5;
```

### Modify 6: Fix const to let for reassignment
**Description:** Change const to let since the variable is reassigned.
```javascript
const counter = 0;
counter++;
```

### Modify 7: Fix let to const for immutable values
**Description:** Change let to const since the value never changes.
```javascript
let taxRate = 0.08;
let total = 100 * taxRate;
```

### Modify 8: Fix NaN comparison
**Description:** Use Number.isNaN() instead of === NaN.
```javascript
if (value === NaN) {
  console.log("not a number");
}
```

### Modify 9: Add null check before property access
**Description:** Check for null before accessing properties.
```javascript
let config;
console.log(config.port);
```

### Modify 10: Add undefined check
**Description:** Check for undefined before using the variable.
```javascript
let user;
console.log(user.name);
```

### Modify 11: Use template literal
**Description:** Replace string concatenation with template literal.
```javascript
let name = "Alice";
let greeting = "Hello, " + name + "!";
```

### Modify 12: Fix parseInt radix
**Description:** Add the radix parameter to parseInt.
```javascript
console.log(parseInt("010"));
```

### Modify 13: Use array literal instead of new Array
**Description:** Replace the constructor with literal syntax.
```javascript
let arr = new Array(1, 2, 3);
```

### Modify 14: Use object literal instead of new Object
**Description:** Replace the constructor with literal syntax.
```javascript
let obj = new Object();
obj.name = "Alice";
```

### Modify 15: Fix float precision
**Description:** Use toFixed or rounding for float operations.
```javascript
let result = 0.1 + 0.2;
console.log(result);
```

### Modify 16: Use for-of instead of for-in for arrays
**Description:** Replace for-in with for-of for array iteration.
```javascript
const arr = [1, 2, 3];
for (const key in arr) {
  console.log(arr[key]);
}
```

### Modify 17: Fix || default for 0
**Description:** Use ?? or proper check instead of || for default.
```javascript
function getCount(c) {
  return c || 1;
}
```

### Modify 18: Add radix to parseInt
**Description:** Use parseInt with radix 10.
```javascript
let result = parseInt("010");
```

### Modify 19: Replace bitwise truncation
**Description:** Use Math.floor instead of bitwise operator.
```javascript
let truncated = 10.7 | 0;
```

### Modify 20: Change null == to null ===
**Description:** Use strict equality for null check.
```javascript
if (val == null) {
  return "default";
}
```

### Modify 21: Remove global variable leak
**Description:** Add let declaration to prevent global.
```javascript
function save(item) {
  cache = cache || [];
  cache.push(item);
}
```

### Modify 22: Fix array reference reassignment
**Description:** Modify the array in-place instead of reassigning.
```javascript
function clear(arr) {
  arr = [];
}
```

### Modify 23: Use nullish coalescing
**Description:** Use ?? instead of || for null/undefined defaults.
```javascript
function getName(n) {
  return n || "default";
}
```

### Modify 24: Add explicit boolean conversion
**Description:** Use Boolean() or !! for explicit conversion.
```javascript
if ("false") {
  console.log("truthy");
}
```

### Modify 25: Fix with statement
**Description:** Replace with statement with explicit property access.
```javascript
with (obj) {
  console.log(value);
}
```

### Modify 26: Use strict comparison for null/undefined
**Description:** Distinguish between null and undefined.
```javascript
if (value == undefined) {
  console.log("no value");
}
```

### Modify 27: Add type check before arithmetic
**Description:** Check that the value is a number before arithmetic.
```javascript
function double(x) {
  return x * 2;
}
```

### Modify 28: Fix const with map return
**Description:** Create new variable instead of reassigning const.
```javascript
const items = [1, 2, 3];
items = items.map(x => x * 2);
```

### Modify 29: Add default parameter value
**Description:** Use default parameters instead of ||.
```javascript
function greet(name) {
  name = name || "Guest";
  console.log("Hello, " + name);
}
```

### Modify 30: Use Array.from for array-like
**Description:** Convert array-like to real array.
```javascript
function foo() {
  arguments.forEach(arg => console.log(arg));
}
```

### Modify 31: Add Number() conversion
**Description:** Explicitly convert string to number.
```javascript
let result = "10" + 5;
```

### Modify 32: Fix string concatenation side effect
**Description:** Ensure both operands are numbers.
```javascript
let a = "5";
let total = a + 10;
```

### Modify 33: Remove double negation
**Description:** Use explicit Boolean() instead of !!.
```javascript
let value = "hello";
let bool = !!value;
```

### Modify 34: Add Number() to unary plus
**Description:** Use explicit Number() instead of unary plus.
```javascript
let str = "5";
let result = +str + 5;
```

### Modify 35: Fix BigInt arithmetic
**Description:** Convert BigInt to number or vice versa.
```javascript
let big = 10n;
let result = big + 5;
```

### Modify 36: Add safe division check
**Description:** Check for zero before division.
```javascript
function divide(a, b) {
  return a / b;
}
```

### Modify 37: Fix date comparison
**Description:** Use getTime() for date comparison.
```javascript
const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 0, 1);
if (d1 == d2) {
  console.log("same");
}
```

### Modify 38: Fix symbol string coercion
**Description:** Use description property or toString().
```javascript
let sym = Symbol("test");
console.log("Symbol: " + sym);
```

### Modify 39: Add + before string to number
**Description:** Use unary plus for explicit conversion.
```javascript
let input = "10";
let total = input * 2;
```

### Modify 40: Fix Object.is for -0
**Description:** Use Object.is instead of === for -0 comparison.
```javascript
if (-0 === 0) {
  console.log("equal");
}
```

### Modify 41: Replace eval with Number
**Description:** Use Number() instead of eval for parsing.
```javascript
let num = eval("10") + 5;
```

### Modify 42: Fix string index access
**Description:** Use charAt for string character access.
```javascript
let str = "hello";
console.log(str[0]);
```

### Modify 43: Use default parameter instead of ||
**Description:** Use ES6 default parameter syntax.
```javascript
function multiply(a, b) {
  b = b || 1;
  return a * b;
}
```

### Modify 44: Fix const function expression
**Description:** Use let if the function needs reassignment.
```javascript
const foo = function() { return 1; };
foo = function() { return 2; };
```

### Modify 45: Add type check for input
**Description:** Validate input type before processing.
```javascript
function square(x) {
  return x * x;
}
```

### Modify 46: Use optional chaining
**Description:** Use ?. for safe property access.
```javascript
const user = {};
console.log(user.address.street);
```

### Modify 47: Fix 0.1 + 0.2 with toFixed
**Description:** Use toFixed for currency calculations.
```javascript
let total = 0.1 + 0.2;
console.log(total);
```

### Modify 48: Replace || with ?? for 0
**Description:** Use nullish coalescing to allow 0.
```javascript
function getValue(val) {
  return val || "default";
}
```

### Modify 49: Fix loose equality with empty string
**Description:** Use === instead of == for empty string check.
```javascript
let input = "";
if (input == false) {
  console.log("empty");
}
```

### Modify 50: Remove deprecated with statement
**Description:** Refactor with statement to explicit property access.
```javascript
const obj = { value: 10 };
with (obj) {
  console.log(value);
}
```
