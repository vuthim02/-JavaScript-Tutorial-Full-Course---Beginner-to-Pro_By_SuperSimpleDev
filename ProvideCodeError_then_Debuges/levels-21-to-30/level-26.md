# Debugging Challenge - Level 26
## Module 6: Booleans and If-Statements - True/False and Comparisons

---

### Error 1: Using = instead of ===
**Description:** Assignment operator used instead of equality check.
```javascript
if (x = 5) {
  console.log("x is 5");
}
```

### Error 2: == instead of === for number
**Description:** Loose equality allows type coercion.
```javascript
if ("5" == 5) {
  console.log("equal");
}
```

### Error 3: NaN never equals NaN
**Description:** NaN === NaN returns false.
```javascript
if (NaN === NaN) {
  console.log("this never runs");
}
```

### Error 4: Comparing objects with ===
**Description:** Two separate objects are never === even with same content.
```javascript
const a = { value: 1 };
const b = { value: 1 };
if (a === b) {
  console.log("same object");
}
```

### Error 5: Comparing arrays with ===
**Description:** Two separate arrays are never === even with same content.
```javascript
if ([1, 2, 3] === [1, 2, 3]) {
  console.log("same array");
}
```

### Error 6: 0 === false comparison
**Description:** 0 is loosely equal to false but not strictly.
```javascript
if (0 == false) {
  console.log("0 is false");
}
```

### Error 7: Empty string comparison
**Description:** "" == false is true due to coercion.
```javascript
if ("" == false) {
  console.log("empty string is false");
}
```

### Error 8: Null vs 0 comparison
**Description:** null >= 0 is true due to coercion.
```javascript
if (null >= 0) {
  console.log("null is >= 0");
}
```

### Error 9: Undefined comparison
**Description:** undefined == null is true but undefined === null is false.
```javascript
if (undefined == null) {
  console.log("undefined is null");
}
```

### Error 10: Array of one number comparison
**Description:** [1] == 1 is true due to coercion.
```javascript
if ([1] == 1) {
  console.log("array equals number");
}
```

### Error 11: Comparing different types
**Description:** "2" > "10" is true (string comparison).
```javascript
if ("2" > "10") {
  console.log("2 is greater than 10");
}
```

### Error 12: Boolean with numeric comparison
**Description:** true >= 2 is false because true coerces to 1.
```javascript
if (true >= 2) {
  console.log("true is >= 2");
}
```

### Error 13: -0 === 0 confusion
**Description:** -0 === 0 is true but behavior differs.
```javascript
if (-0 === 0) {
  console.log("-0 is 0");
}
```

### Error 14: Object.is for NaN
**Description:** Object.is(NaN, NaN) returns true unlike ===.
```javascript
if (Object.is(NaN, NaN)) {
  console.log("NaN is NaN");
}
```

### Error 15: Infinity comparison
**Description:** Infinity is greater than any finite number.
```javascript
if (Infinity > Infinity) {
  console.log("infinity greater");
}
```

### Error 16: Negative Infinity
**Description:** -Infinity is less than any finite number.
```javascript
if (-Infinity < -Infinity) {
  console.log("works");
}
```

### Error 17: String case comparison
**Description:** String comparison is case-sensitive.
```javascript
if ("apple" > "Banana") {
  console.log("apple > Banana");
}
```

### Error 18: Numeric string vs number
**Description:** "10" < "5" is true (string comparison).
```javascript
if ("10" < "5") {
  console.log("10 < 5");
}
```

### Error 19: Boolean with addition
**Description:** true + true === 2.
```javascript
if (true + true === 2) {
  console.log("true is 1");
}
```

### Error 20: Empty array coercion
**Description:** ![] is false because objects are truthy.
```javascript
if (![]) {
  console.log("empty array is falsy");
}
```

### Error 21: Empty object coercion
**Description:** !{} is false because objects are truthy.
```javascript
if (!{}) {
  console.log("empty object is falsy");
}
```

### Error 22: Loose equality with undefined
**Description:** undefined == null is true.
```javascript
if (undefined == null) {
  console.log("they are equal");
}
```

### Error 23: Boolean coercion of string
**Description:** "false" is truthy because it's a non-empty string.
```javascript
if ("false") {
  console.log("false string is truthy");
}
```

### Error 24: Boolean coercion of zero
**Description:** 0 is falsy in boolean context.
```javascript
if (0) {
  console.log("zero is truthy");
}
```

### Error 25: Boolean coercion of NaN
**Description:** NaN is falsy in boolean context.
```javascript
if (NaN) {
  console.log("NaN is truthy");
}
```

### Error 26: Boolean coercion of empty string
**Description:** "" is falsy in boolean context.
```javascript
if ("") {
  console.log("empty is truthy");
}
```

### Error 27: Boolean coercion of null
**Description:** null is falsy in boolean context.
```javascript
if (null) {
  console.log("null is truthy");
}
```

### Error 28: Boolean coercion of undefined
**Description:** undefined is falsy in boolean context.
```javascript
if (undefined) {
  console.log("undefined is truthy");
}
```

### Error 29: Comparing with undefined variable
**Description:** Accessing an undeclared variable throws ReferenceError.
```javascript
if (someVar === undefined) {
  console.log("undefined");
}
```

### Error 30: typeof null
**Description:** typeof null returns "object".
```javascript
if (typeof null === "null") {
  console.log("null is null");
}
```

### Error 31: typeof array
**Description:** typeof [] returns "object".
```javascript
if (typeof [] === "array") {
  console.log("it's an array");
}
```

### Error 32: Undefined property vs undefined value
**Description:** Accessing missing property returns undefined.
```javascript
const obj = {};
if (obj.name === undefined) {
  console.log("name is undefined");
}
```

### Error 33: Has own property confusion
**Description:** in operator checks prototype chain.
```javascript
const obj = { name: "Alice" };
if ("toString" in obj) {
  console.log("has toString");
}
```

### Error 34: Comparing dates with ===
**Description:** Two Date objects with same time are not ===.
```javascript
const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 0, 1);
if (d1 === d2) {
  console.log("same date");
}
```

### Error 35: Comparing regex with ===
**Description:** Two RegExp with same pattern are not ===.
```javascript
const r1 = /hello/;
const r2 = /hello/;
if (r1 === r2) {
  console.log("same regex");
}
```

### Error 36: Symbols are unique
**Description:** Two same-described Symbols are not ===.
```javascript
const s1 = Symbol("test");
const s2 = Symbol("test");
if (s1 === s2) {
  console.log("same symbol");
}
```

### Error 37: Primitive wrapper confusion
**Description:** new Number(5) !== 5.
```javascript
if (new Number(5) === 5) {
  console.log("same number");
}
```

### Error 38: Boolean wrapper confusion
**Description:** new Boolean(false) is truthy.
```javascript
if (new Boolean(false)) {
  console.log("false is truthy");
}
```

### Error 39: String wrapper confusion
**Description:** new String("") is truthy.
```javascript
if (new String("")) {
  console.log("empty string is truthy");
}
```

### Error 40: Comparing with void 0
**Description:** void 0 === undefined.
```javascript
if (void 0 === undefined) {
  console.log("void is undefined");
}
```

### Error 41: Global undefined overwritten
**Description:** undefined can be overwritten in non-strict mode.
```javascript
let undefined = "defined";
if (void 0 === undefined) {
  console.log("still undefined");
}
```

### Error 42: Global NaN overwritten
**Description:** NaN can be overwritten in non-strict mode.
```javascript
let NaN = 42;
if (Number.isNaN(NaN)) {
  console.log("is NaN");
}
```

### Error 43: Loose equality with document.all
**Description:** document.all == undefined is true.
```javascript
if (document.all == undefined) {
  console.log("document.all is undefined");
}
```

### Error 44: Comparing function references
**Description:** Same-function-text are different references.
```javascript
const fn1 = function() { return 1; };
const fn2 = function() { return 1; };
if (fn1 === fn2) {
  console.log("same function");
}
```

### Error 45: Method comparison
**Description:** Same method on different objects are different.
```javascript
const obj1 = { foo() {} };
const obj2 = { foo() {} };
if (obj1.foo === obj2.foo) {
  console.log("same method");
}
```

### Error 46: Comparing prototype methods
**Description:** Same built-in method on different instances.
```javascript
const arr1 = [1];
const arr2 = [2];
if (arr1.push === arr2.push) {
  console.log("same push method");
}
```

### Error 47: Loose equality with objects
**Description:** {} == "[object Object]" is true.
```javascript
if ({} == "[object Object]") {
  console.log("object is string");
}
```

### Error 48: Empty array with index
**Description:** arr[0] === undefined for empty array.
```javascript
const arr = [];
if (arr[0] === undefined) {
  console.log("index 0 is undefined");
}
```

### Error 49: Sparse array comparison
**Description:** Sparse array missing elements return undefined.
```javascript
const arr = [1, , 3];
if (arr[1] === undefined) {
  console.log("middle is undefined");
}
```

### Error 50: Array length comparison
**Description:** Comparing array lengths.
```javascript
const a = [1, 2];
const b = [1, 2, 3];
if (a.length === b.length) {
  console.log("same length");
}
```

### Error 51: Null vs empty string
**Description:** null == "" is false.
```javascript
if (null == "") {
  console.log("null equals empty string");
}
```

### Error 52: Undefined vs empty string
**Description:** undefined == "" is false.
```javascript
if (undefined == "") {
  console.log("undefined equals empty string");
}
```

### Error 53: NaN vs undefined
**Description:** NaN == undefined is false.
```javascript
if (NaN == undefined) {
  console.log("NaN equals undefined");
}
```

### Error 54: NaN vs null
**Description:** NaN == null is false.
```javascript
if (NaN == null) {
  console.log("NaN equals null");
}
```

### Error 55: Infinity vs NaN
**Description:** Infinity == NaN is false.
```javascript
if (Infinity == NaN) {
  console.log("infinity equals NaN");
}
```

### Error 56: -Infinity vs Infinity
**Description:** -Infinity === Infinity is false.
```javascript
if (-Infinity === Infinity) {
  console.log("same infinity");
}
```

### Error 57: Large number precision
**Description:** Very large numbers lose precision.
```javascript
if (9999999999999999 === 10000000000000000) {
  console.log("precision lost");
}
```

### Error 58: Float imprecision
**Description:** 0.1 + 0.2 !== 0.3.
```javascript
if (0.1 + 0.2 === 0.3) {
  console.log("0.3 is exact");
}
```

### Error 59: parseInt result
**Description:** parseInt("0x10") returns 16.
```javascript
if (parseInt("0x10") === 0) {
  console.log("hex is zero");
}
```

### Error 60: parseFloat edge case
**Description:** parseFloat("10.5.5") returns 10.5.
```javascript
if (parseFloat("10.5.5") === 10.55) {
  console.log("correct parse");
}
```

### Error 61: Number constructor vs parseInt
**Description:** Number("") returns 0, not NaN.
```javascript
if (Number("") === NaN) {
  console.log("empty is NaN");
}
```

### Error 62: Unary plus edge cases
**Description:** +" " is 0 (whitespace string).
```javascript
if (+" " === NaN) {
  console.log("space is NaN");
}
```

### Error 63: Boolean constructor with string
**Description:** new Boolean("false") is truthy object.
```javascript
if (new Boolean("false")) {
  console.log("false string is falsy");
}
```

### Error 64: Boolean primitive vs object
**Description:** Boolean(false) is primitive, new Boolean(false) is object.
```javascript
if (Boolean(false) === false) {
  console.log("boolean false");
}
```

### Error 65: Double equals with objects
**Description:** Objects with same toString return.
```javascript
const a = { toString: () => "1" };
const b = { toString: () => "1" };
if (a == b) {
  console.log("same toString");
}
```

### Error 66: ValueOf coercion
**Description:** Objects with valueOf coerce in ==.
```javascript
const a = { valueOf: () => 5 };
const b = { valueOf: () => 5 };
if (a == b) {
  console.log("same valueOf");
}
```

### Error 67: ToPrimitive coercion
**Description:** Symbol.toPrimitive affects == coercion.
```javascript
const a = { [Symbol.toPrimitive]: () => 1 };
const b = { [Symbol.toPrimitive]: () => 1 };
if (a == b) {
  console.log("same primitive");
}
```

### Error 68: Comparing with undefined in array
**Description:** arr[arr.length] === undefined.
```javascript
const arr = [1, 2, 3];
if (arr[arr.length] === undefined) {
  console.log("out of bounds");
}
```

### Error 69: Negative array index
**Description:** arr[-1] is undefined, not last element.
```javascript
const arr = [1, 2, 3];
if (arr[-1] === 3) {
  console.log("last element");
}
```

### Error 70: Array index as string
**Description:** arr["0"] === arr[0] due to coercion.
```javascript
const arr = [1, 2, 3];
if (arr["0"] === arr[0]) {
  console.log("same access");
}
```

---

### Issue 1: Double negative in condition
**Description:** Using !! in a condition when Boolean suffices.
```javascript
if (!!value) {
  console.log("truthy");
}
```

### Issue 2: Redundant comparison to true
**Description:** Comparing a boolean to true is unnecessary.
```javascript
if (isActive === true) {
  console.log("active");
}
```

### Issue 3: Redundant comparison to false
**Description:** Comparing a boolean to false is unnecessary.
```javascript
if (isComplete === false) {
  console.log("not complete");
}
```

### Issue 4: Comparing length to 0
**Description:** Using arr.length > 0 instead of arr.length.
```javascript
const arr = [1, 2, 3];
if (arr.length > 0) {
  console.log("has items");
}
```

### Issue 5: If-else for simple boolean return
**Description:** if-else can be simplified to just return the condition.
```javascript
function isEven(n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
```

### Issue 6: == null instead of ===
**Description:** Using == for null check catches both null and undefined.
```javascript
if (value == null) {
  console.log("null or undefined");
}
```

### Issue 7: Comparing with 0 in if
**Description:** 0 is falsy, so if (x) works for non-zero numbers.
```javascript
if (count !== 0) {
  console.log("not zero");
}
```

### Issue 8: Magic number as boolean
**Description:** Using 1 and 0 instead of true and false.
```javascript
let success = 1;
let failure = 0;
```

### Issue 9: Not using strict equality in switch
**Description:** Switch uses strict equality but cases might not match.
```javascript
let value = "1";
switch (value) {
  case 1: console.log("number"); break;
  case "1": console.log("string"); break;
}
```

### Issue 10: Confusing operator precedence
**Description:** Missing parentheses in complex condition.
```javascript
if (a && b || c && d) {
  console.log("confusing precedence");
}
```

### Issue 11: Reversed condition order
**Description:** Yoda conditions are harder to read.
```javascript
if (10 === x) {
  console.log("yoda");
}
```

### Issue 12: Complex ternary in condition
**Description:** Ternary inside ternary is hard to read.
```javascript
let result = a ? b ? c : d : e;
```

### Issue 13: Not using includes for multiple comparison
**Description:** Chained || for same variable comparison.
```javascript
if (x === 1 || x === 2 || x === 3) {
  console.log("1, 2, or 3");
}
```

### Issue 14: Unnecessary negation
**Description:** Double negative in condition.
```javascript
if (!isNotActive) {
  console.log("active");
}
```

### Issue 15: Using || for default with boolean
**Description:** || returns the first truthy value, not boolean.
```javascript
let result = value || defaultValue;
```

### Issue 16: Not using ternary for simple if-else
**Description:** Simple if-else can be replaced with ternary.
```javascript
let message;
if (score > 50) {
  message = "pass";
} else {
  message = "fail";
}
```

### Issue 17: Using if for type check
**Description:** Using if instead of typeof guard.
```javascript
if (value !== undefined && value !== null) {
  console.log(value);
}
```

### Issue 18: Nested ternary instead of if-else
**Description:** Nested ternary is hard to read.
```javascript
let type = a > 0 ? "positive" : a < 0 ? "negative" : "zero";
```

### Issue 19: Not using optional chaining
**Description:** Long && chain for nested property access.
```javascript
if (user && user.profile && user.profile.name) {
  console.log(user.profile.name);
}
```

### Issue 20: Using if-else chain instead of switch
**Description:** Multiple if-else for same variable is better as switch.
```javascript
if (code === 1) {
  console.log("one");
} else if (code === 2) {
  console.log("two");
} else if (code === 3) {
  console.log("three");
}
```

### Issue 21: Not using early return
**Description:** Deeply nested if instead of guard clauses.
```javascript
function process(data) {
  if (data) {
    if (data.valid) {
      if (data.ready) {
        return data.value;
      }
    }
  }
  return null;
}
```

### Issue 22: Assignment in condition with extra parens
**Description:** Assignment wrapped in parens to suppress warning.
```javascript
if ((x = getValue())) {
  console.log(x);
}
```

### Issue 23: Using == with known types
**Description:** Using == when both operands are the same type.
```javascript
if (x == 10) {
  console.log("ten");
}
```

### Issue 24: Not using numeric separators
**Description:** Long numbers are hard to compare visually.
```javascript
if (amount === 1000000) {
  console.log("million");
}
```

### Issue 25: Comparing strings with < or >
**Description:** String comparison with < is lexicographic.
```javascript
if ("apple" < "banana") {
  console.log("apple before banana");
}
```

### Issue 26: Using == with objects
**Description:** == for objects compares references, not content.
```javascript
const a = [1, 2];
const b = [1, 2];
if (a == b) {
  console.log("same content");
}
```

### Issue 27: Not using Object.is
**Description:** Object.is handles edge cases like -0 and NaN.
```javascript
if (value === -0) {
  console.log("negative zero");
}
```

### Issue 28: Confusing precedence with !
**Description:** ! has higher precedence than && and ||.
```javascript
if (!a && b || c) {
  console.log("precedence unclear");
}
```

### Issue 29: Comparing to undefined explicitly
**Description:** typeof check is safer for undeclared variables.
```javascript
if (x === undefined) {
  console.log("undefined");
}
```

### Issue 30: Empty block in if
**Description:** Empty if block suggests missing logic.
```javascript
if (condition) {
} else {
  console.log("else only");
}
```

---

### Modify 1: Replace == with ===
**Description:** Use strict equality to prevent type coercion.
```javascript
if (x == 5) {
  console.log("five");
}
```

### Modify 2: Simplify boolean return
**Description:** Return the boolean expression directly.
```javascript
function isEven(n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
```

### Modify 3: Remove redundant === true
**Description:** Remove the explicit comparison to true.
```javascript
if (isActive === true) {
  console.log("active");
}
```

### Modify 4: Remove redundant === false
**Description:** Use ! instead of === false.
```javascript
if (isComplete === false) {
  console.log("not complete");
}
```

### Modify 5: Add parentheses for precedence
**Description:** Add parentheses to clarify operator precedence.
```javascript
if (a && b || c && d) {
  console.log("confusing");
}
```

### Modify 6: Convert if-else chain to switch
**Description:** Use switch instead of multiple if-else.
```javascript
if (code === 1) {
  console.log("one");
} else if (code === 2) {
  console.log("two");
}
```

### Modify 7: Convert to ternary
**Description:** Use ternary operator for simple if-else.
```javascript
let message;
if (score > 50) {
  message = "pass";
} else {
  message = "fail";
}
```

### Modify 8: Add early return
**Description:** Use guard clauses instead of nested ifs.
```javascript
function process(data) {
  if (data) {
    if (data.valid) {
      if (data.ready) {
        return data.value;
      }
    }
  }
  return null;
}
```

### Modify 9: Use Array.includes
**Description:** Use includes for multiple value comparison.
```javascript
if (x === 1 || x === 2 || x === 3) {
  console.log("one of them");
}
```

### Modify 10: Remove double negative
**Description:** Simplify the double negation.
```javascript
if (!isNotActive) {
  console.log("active");
}
```

### Modify 11: Use optional chaining
**Description:** Use ?. instead of long && chains.
```javascript
if (user && user.profile && user.profile.name) {
  console.log(user.profile.name);
}
```

### Modify 12: Remove double negation !!
**Description:** Use Boolean() or just the value.
```javascript
if (!!value) {
  console.log("truthy");
}
```

### Modify 13: Simplify length check
**Description:** Use arr.length directly in condition.
```javascript
if (arr.length > 0) {
  console.log("has items");
}
```

### Modify 14: Use nullish coalescing
**Description:** Use ?? instead of || for defaults.
```javascript
let result = value || defaultValue;
```

### Modify 15: Move assignment out of condition
**Description:** Separate assignment and comparison.
```javascript
if ((x = getValue())) {
  console.log(x);
}
```

### Modify 16: Use Object.is for NaN
**Description:** Use Object.is for NaN comparison.
```javascript
if (value === NaN) {
  console.log("NaN");
}
```

### Modify 17: Use typeof for undeclared
**Description:** Use typeof for safe undefined check.
```javascript
if (x === undefined) {
  console.log("undefined");
}
```

### Modify 18: Add numeric separator
**Description:** Add underscores for readability.
```javascript
if (amount === 1000000) {
  console.log("million");
}
```

### Modify 19: Use Boolean() for explicit conversion
**Description:** Use Boolean() instead of double negation.
```javascript
let bool = !!value;
```

### Modify 20: Fix Yoda condition
**Description:** Put the variable first in comparisons.
```javascript
if (10 === x) {
  console.log("ten");
}
```

### Modify 21: Simplify nested ternary
**Description:** Convert nested ternary to if-else.
```javascript
let result = a ? b ? c : d : e;
```

### Modify 22: Use includes for string check
**Description:** Use includes instead of indexOf.
```javascript
if (str.indexOf("test") !== -1) {
  console.log("found");
}
```

### Modify 23: Remove empty if block
**Description:** Remove the empty if and invert condition.
```javascript
if (condition) {
} else {
  console.log("else");
}
```

### Modify 24: Use Array.isArray
**Description:** Use Array.isArray instead of typeof.
```javascript
if (typeof arr === "array") {
  console.log("array");
}
```

### Modify 25: Add default parameter
**Description:** Use default parameter instead of ||.
```javascript
function greet(name) {
  name = name || "Guest";
  console.log(name);
}
```

### Modify 26: Use null check with ?.
**Description:** Use optional chaining for safe access.
```javascript
let name = user && user.name;
```

### Modify 27: Simplify if-return true/false
**Description:** Return the condition directly.
```javascript
function isPositive(n) {
  if (n > 0) {
    return true;
  }
  return false;
}
```

### Modify 28: Fix spacing in condition
**Description:** Add spaces around operators for readability.
```javascript
if (x>5&&y<10) {
  console.log("range");
}
```

### Modify 29: Use strict inequality
**Description:** Use !== instead of !=.
```javascript
if (x != 5) {
  console.log("not five");
}
```

### Modify 30: Remove unnecessary typeof comparison
**Description:** Simplify the typeof check.
```javascript
if (typeof x === "undefined") {
  console.log("undefined");
}
```

### Modify 31: Fix == for null check with ===
**Description:** Use === for null check.
```javascript
if (value == null) {
  console.log("null");
}
```

### Modify 32: Use logical AND for guard
**Description:** Use && for simple guard clauses.
```javascript
if (condition) {
  doSomething();
}
```

### Modify 33: Convert if-else to ternary for assignment
**Description:** Use ternary for variable assignment.
```javascript
let type;
if (n > 0) {
  type = "positive";
} else {
  type = "non-positive";
}
```

### Modify 34: Remove unnecessary === 0
**Description:** Use !x for zero check.
```javascript
if (count === 0) {
  console.log("zero");
}
```

### Modify 35: Use truthy check
**Description:** Simplify to truthy/falsy check.
```javascript
if (value !== null && value !== undefined) {
  console.log(value);
}
```

### Modify 36: Fix off-by-one in comparison
**Description:** Correct the comparison operator.
```javascript
if (index > arr.length) {
  console.log("out of bounds");
}
```

### Modify 37: Add boundary check
**Description:** Add proper boundary conditions.
```javascript
if (index < arr.length) {
  console.log(arr[index]);
}
```

### Modify 38: Use !== for string comparison
**Description:** Use strict inequality for string comparison.
```javascript
if (name != "") {
  console.log(name);
}
```

### Modify 39: Simplify ternary with ||
**Description:** Use || instead of ternary for default.
```javascript
let name = value ? value : "default";
```

### Modify 40: Use Object.keys length
**Description:** Check object emptiness properly.
```javascript
if (obj) {
  console.log("object has keys");
}
```

### Modify 41: Add fallback for NaN
**Description:** Handle NaN case explicitly.
```javascript
let result = value / 0;
```

### Modify 42: Use logical OR for default
**Description:** Use || for simple default assignment.
```javascript
let name;
if (input) {
  name = input;
} else {
  name = "default";
}
```

### Modify 43: Convert == for numbers to ===
**Description:** Use === for all number comparisons.
```javascript
if ("5" == 5) {
  console.log("equal");
}
```

### Modify 44: Fix undefined check with typeof
**Description:** Use typeof for safe global check.
```javascript
if (window.x === undefined) {
  console.log("no x");
}
```

### Modify 45: Simplify boolean variable name
**Description:** Rename boolean to remove negation.
```javascript
let isNotActive = true;
if (!isNotActive) {
  console.log("active");
}
```

### Modify 46: Use Array.every for all check
**Description:** Use every() instead of manual loop.
```javascript
let allPositive = true;
for (let n of arr) {
  if (n <= 0) {
    allPositive = false;
    break;
  }
}
```

### Modify 47: Use Array.some for any check
**Description:** Use some() instead of manual loop.
```javascript
let hasEven = false;
for (let n of arr) {
  if (n % 2 === 0) {
    hasEven = true;
    break;
  }
}
```

### Modify 48: Remove unreachable code after return
**Description:** Remove code after return statement.
```javascript
function test() {
  return true;
  console.log("unreachable");
}
```

### Modify 49: Fix float comparison with epsilon
**Description:** Use epsilon for float comparison.
```javascript
if (0.1 + 0.2 === 0.3) {
  console.log("equal");
}
```

### Modify 50: Add condition for empty object
**Description:** Check object has properties.
```javascript
if (typeof obj === "object") {
  console.log("has properties");
}
```
