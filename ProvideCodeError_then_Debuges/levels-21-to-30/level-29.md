# Debugging Challenge - Level 29
## Module 6: Booleans and If-Statements - Ternary and Truthy/Falsy

---

### Error 1: Ternary with complex condition
**Description:** Complex condition in ternary is hard to read.
```javascript
let result = a > 0 && b < 10 || c === "test" ? "yes" : "no";
```

### Error 2: Nested ternary without parentheses
**Description:** Nested ternary without parens is confusing.
```javascript
let result = a ? b ? c : d : e;
```

### Error 3: Ternary returning void
**Description:** Using ternary for side effects is wrong.
```javascript
condition ? doSomething() : doSomethingElse();
```

### Error 4: Ternary instead of if-else for statements
**Description:** Ternary is for expressions, not statements.
```javascript
condition ? console.log("true") : console.log("false");
```

### Error 5: Assignment in ternary condition
**Description:** Assignment inside ternary condition.
```javascript
let result = (x = 5) ? "yes" : "no";
```

### Error 6: Ternary with empty else
**Description:** Ternary with empty else branch.
```javascript
let result = condition ? "yes" : "";
```

### Error 7: Overly long ternary
**Description:** Ternary spanning multiple lines is hard to read.
```javascript
let status = user.role === "admin" && user.active && user.verified ? "full access" : "limited access";
```

### Error 8: Ternary with comparison as result
**Description:** Ternary returning a boolean comparison.
```javascript
let result = x > 0 ? true : false;
```

### Error 9: Ternary with === comparison as result
**Description:** Ternary returning result of ===.
```javascript
let result = x > 10 ? x === 20 : x === 5;
```

### Error 10: Chained ternary direction
**Description:** Chained ternary evaluates left-to-right confusingly.
```javascript
let result = a ? b : c ? d : e;
```

### Error 11: Truthy check on number 0
**Description:** 0 is falsy but might be a valid value.
```javascript
let count = arr.length ? arr.length : 0;
```

### Error 12: Truthy check on empty string
**Description:** "" is falsy but might be a valid value.
```javascript
let name = input ? input : "default";
```

### Error 13: Truthy check on false boolean
**Description:** false is falsy but might be an intended value.
```javascript
let flag = setting ? setting : true;
```

### Error 14: Ternary with undeclared variable
**Description:** Variable in ternary condition is undeclared.
```javascript
let result = someVar ? "yes" : "no";
```

### Error 15: Ternary with null check
**Description:** null check in ternary with truthy/falsy confusion.
```javascript
let value = data ? data.name : "unknown";
```

### Error 16: Ternary with undefined check
**Description:** undefined check using truthiness loses info.
```javascript
let display = user ? user.name : "Guest";
```

### Error 17: Nested ternary with 3 levels
**Description:** Three levels of nested ternary is unreadable.
```javascript
let result = a ? b ? c ? d : e : f : g;
```

### Error 18: Ternary return in arrow function without body
**Description:** Arrow function with ternary implicit return.
```javascript
const isEven = n => n % 2 === 0 ? true : false;
```

### Error 19: Ternary in template literal
**Description:** Ternary inside template literal is awkward.
```javascript
console.log(`Status: ${active ? "Active" : "Inactive"}`);
```

### Error 20: Ternary with comma operator
**Description:** Comma operator in ternary branch.
```javascript
let result = condition ? (x = 1, "yes") : (x = 2, "no");
```

### Error 21: Ternary assigning to different variables
**Description:** Ternary assigning to different variables is wrong.
```javascript
condition ? (x = 10) : (y = 20);
```

### Error 22: Ternary with multiple operations
**Description:** Ternary branch with multiple statements.
```javascript
condition ? (x++, console.log(x)) : (y++, console.log(y));
```

### Error 23: Truthy check on NaN
**Description:** NaN is falsy but might indicate an error.
```javascript
let result = value ? value : 0;
```

### Error 24: Truthy check on empty array
**Description:** Empty array is truthy (common mistake).
```javascript
let hasItems = items ? true : false;
```

### Error 25: Truthy check on empty object
**Description:** Empty object is truthy (common mistake).
```javascript
let hasData = data ? true : false;
```

### Error 26: Falsy check on function
**Description:** Function is always truthy.
```javascript
let hasCallback = callback ? callback : defaultCallback;
```

### Error 27: Falsy check on whitespace string
**Description:** " " is truthy.
```javascript
let hasContent = str ? str : "default";
```

### Error 28: Truthy check on Infinity
**Description:** Infinity is truthy.
```javascript
if (Infinity) {
  console.log("infinite is truthy");
}
```

### Error 29: Truthy check on new Boolean(false)
**Description:** new Boolean(false) is an object, which is truthy.
```javascript
let flag = new Boolean(false);
if (flag) {
  console.log("flag is truthy");
}
```

### Error 30: Truthy check on new Number(0)
**Description:** new Number(0) is an object, which is truthy.
```javascript
let num = new Number(0);
if (num) {
  console.log("zero is truthy");
}
```

### Error 31: Truthy check on new String("")
**Description:** new String("") is an object, which is truthy.
```javascript
let str = new String("");
if (str) {
  console.log("empty string is truthy");
}
```

### Error 32: Ternary with type coercion
**Description:** Type coercion in ternary condition.
```javascript
let result = "5" == 5 ? "equal" : "not equal";
```

### Error 33: Ternary with loose equality
**Description:** Using == in ternary condition.
```javascript
let result = x == null ? "no value" : x;
```

### Error 34: Ternary with !!
**Description:** Unnecessary !! in ternary condition.
```javascript
let result = !!value ? "truthy" : "falsy";
```

### Error 35: Ternary comparing to true
**Description:** Redundant === true in ternary.
```javascript
let result = x === true ? "yes" : "no";
```

### Error 36: Ternary comparing to false
**Description:** Redundant === false in ternary.
```javascript
let result = x === false ? "yes" : "no";
```

### Error 37: Nested ternary for grade calculation
**Description:** Using nested ternary instead of if-else for grades.
```javascript
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
```

### Error 38: Ternary with void operator
**Description:** void operator in ternary branch.
```javascript
let result = condition ? "value" : void 0;
```

### Error 39: Ternary returning undefined
**Description:** Ternary returning undefined explicitly.
```javascript
let result = condition ? "value" : undefined;
```

### Error 40: Ternary returning null
**Description:** Ternary returning null explicitly.
```javascript
let result = condition ? "value" : null;
```

### Error 41: Falsy check on document.all
**Description:** document.all is falsy (historical quirk).
```javascript
if (document.all) {
  console.log("old browser");
}
```

### Error 42: Ternary with typeof condition
**Description:** typeof in ternary condition is verbose.
```javascript
let type = typeof x === "number" ? "num" : "other";
```

### Error 43: Ternary with instanceof
**Description:** instanceof in ternary condition.
```javascript
let type = x instanceof Array ? "array" : "object";
```

### Error 44: Truthy check on -0
**Description:** -0 is falsy (same as 0).
```javascript
if (-0) {
  console.log("negative zero is truthy");
}
```

### Error 45: Truthy check on 0n (BigInt)
**Description:** 0n is falsy.
```javascript
if (0n) {
  console.log("bigint zero is truthy");
}
```

### Error 46: Ternary with logical operator confusion
**Description:** Mixing ternary with && and ||.
```javascript
let result = condition && value1 || value2;
```

### Error 47: Ternary without parentheses in arithmetic
**Description:** Ternary has lower precedence than most operators.
```javascript
let result = 10 + condition ? 5 : 3;
```

### Error 48: Ternary with function call only when truthy
**Description:** Ternary calling function in one branch only.
```javascript
condition ? fetchData() : null;
```

### Error 49: Truthy check on array index
**Description:** Array element at index might be 0 or "".
```javascript
if (arr[0]) {
  console.log("has first element");
}
```

### Error 50: Ternary with optional chaining
**Description:** Ternary with ?. for optional chaining.
```javascript
let name = user?.name ? user.name : "Guest";
```

### Error 51: Ternary with nullish coalescing
**Description:** Using both ternary and ?? together.
```javascript
let result = condition ? value ?? "default" : "fallback";
```

### Error 52: Ternary with spread operator
**Description:** Spread operator in ternary branch.
```javascript
let arr = condition ? [...a] : [...b];
```

### Error 53: Truthy check on function call result
**Description:** Function might return valid falsy value.
```javascript
let hasError = validate() || true;
```

### Error 54: Falsy check with === false
**Description:** Using === false when ! would suffice.
```javascript
if (error === false) {
  console.log("no error");
}
```

### Error 55: Ternary replacing if-else with return
**Description:** Using ternary for return instead of if-else.
```javascript
function isPositive(n) {
  return n > 0 ? true : false;
}
```

### Error 56: Ternary with getter that has side effects
**Description:** Getter called in ternary condition has side effects.
```javascript
let result = obj.value ? "yes" : "no";
```

### Error 57: Truthy check on new Map
**Description:** new Map() is truthy.
```javascript
let map = new Map();
if (map) {
  console.log("map exists");
}
```

### Error 58: Truthy check on new Set
**Description:** new Set() is truthy.
```javascript
let set = new Set();
if (set) {
  console.log("set exists");
}
```

### Error 59: Ternary with async/await
**Description:** Using await in ternary condition.
```javascript
let data = await fetchData() ? "cached" : "fresh";
```

### Error 60: Ternary with Promise
**Description:** Promise in ternary condition (always truthy).
```javascript
let result = fetchData() ? "cached" : "fresh";
```

### Error 61: Ternary with Date
**Description:** Date in ternary condition (always truthy).
```javascript
let result = new Date() ? "valid" : "invalid";
```

### Error 62: Truthy check on RegExp
**Description:** RegExp is always truthy.
```javascript
let pattern = /test/;
if (pattern) {
  console.log("pattern exists");
}
```

### Error 63: Empty array truthy in if
**Description:** Empty array is truthy in if condition.
```javascript
const arr = [];
if (arr) {
  console.log("array has items");
}
```

### Error 64: Empty object truthy in if
**Description:** Empty object is truthy in if condition.
```javascript
const obj = {};
if (obj) {
  console.log("object has properties");
}
```

### Error 65: Falsy value with ||
**Description:** Using || for default with falsy values.
```javascript
let count = 0 || 10;
console.log(count);
```

### Error 66: Truthy value with &&
**Description:** Using && returns truthy value.
```javascript
let result = 5 && 10;
console.log(result);
```

### Error 67: Ternary with === true
**Description:** Redundant === true in ternary condition.
```javascript
let result = isActive === true ? "active" : "inactive";
```

### Error 68: Ternary with === false
**Description:** Redundant === false in ternary condition.
```javascript
let result = isComplete === false ? "pending" : "done";
```

### Error 69: Truthy check on Symbol
**Description:** Symbol is always truthy.
```javascript
let sym = Symbol();
if (sym) {
  console.log("symbol exists");
}
```

### Error 70: Ternary without colon
**Description:** Ternary missing the else branch.
```javascript
let result = condition ? "yes";
```

---

### Issue 1: Nested ternary is hard to read
**Description:** Three levels of nested ternary.
```javascript
let type = a > 0 ? "positive" : a < 0 ? "negative" : "zero";
```

### Issue 2: Ternary with side effects
**Description:** Using ternary for function calls with side effects.
```javascript
condition ? save() : load();
```

### Issue 3: Ternary instead of if-else for logic
**Description:** Using ternary where if-else would be clearer.
```javascript
condition ? (x = 1, y = 2) : (x = 2, y = 1);
```

### Issue 4: Ternary returning boolean for comparison
**Description:** Ternary returning true/false based on comparison.
```javascript
function isEven(n) {
  return n % 2 === 0 ? true : false;
}
```

### Issue 5: Ternary too long for one line
**Description:** Ternary that spans too much code.
```javascript
let displayName = user.firstName ? user.firstName + " " + user.lastName : "Anonymous User";
```

### Issue 6: Using ternary for assignment when if-else fits
**Description:** Simple assignment with if-else is clearer.
```javascript
let message = score >= 50 ? "Pass" : "Fail";
```

### Issue 7: Not using ternary for simple assignment
**Description:** Using if-else when ternary would be simpler.
```javascript
let status;
if (active) {
  status = "online";
} else {
  status = "offline";
}
```

### Issue 8: Truthy check instead of proper validation
**Description:** Using truthy check for value that could be 0.
```javascript
function getCount(n) {
  return n ? n : 0;
}
```

### Issue 9: Falsy check for empty string
**Description:** Using truthy check for string that could be "".
```javascript
function getName(name) {
  return name ? name : "Unknown";
}
```

### Issue 10: Using if-else when ternary fits
**Description:** Simple if-else that could be ternary.
```javascript
let result;
if (x > 0) {
  result = "positive";
} else {
  result = "non-positive";
}
```

### Issue 11: Complex ternary with multiple conditions
**Description:** Ternary with && and || inside condition.
```javascript
let result = user && user.active || session ? "welcome" : "login";
```

### Issue 12: Ternary in ternary condition
**Description:** Using a ternary as the condition of another ternary.
```javascript
let result = (a > 0 ? b > 0 : c > 0) ? "yes" : "no";
```

### Issue 13: Using if for truthy check instead of ??
**Description:** Manual truthy check instead of nullish coalescing.
```javascript
let display = user.name ? user.name : "Guest";
```

### Issue 14: Using if for falsy check instead of ||
**Description:** Manual falsy check instead of OR assignment.
```javascript
let name;
if (input) {
  name = input;
} else {
  name = "default";
}
```

### Issue 15: Ternary with console.log
**Description:** Using ternary inside console.log.
```javascript
console.log(condition ? "true" : "false");
```

### Issue 16: Assigning ternary to global
**Description:** Ternary result assigned to implicit global.
```javascript
result = condition ? "a" : "b";
```

### Issue 17: Ternary with undeclared variable
**Description:** Variable in ternary is undeclared.
```javascript
let result = condition ? value : "default";
```

### Issue 18: Missing parentheses around ternary in template
**Description:** Template literal with ternary without parens.
```javascript
console.log(`Result: ${condition ? "yes" : "no"}`);
```

### Issue 19: Ternary with assignment chains
**Description:** Multiple assignments based on ternary.
```javascript
condition ? (a = 1, b = 2) : (a = 2, b = 1);
```

### Issue 20: Using ! for falsy check on number
**Description:** Using ! to check for zero.
```javascript
if (!count) {
  console.log("no items");
}
```

### Issue 21: Using truthy check for array length
**Description:** Using arr.length truthy check.
```javascript
if (arr.length) {
  console.log("has items");
}
```

### Issue 22: Not using ternary with arrow function
**Description:** Arrow function with if-else instead of ternary.
```javascript
const getType = (n) => {
  if (n > 0) return "positive";
  else return "negative";
};
```

### Issue 23: Ternary with object literal
**Description:** Returning object literal from ternary.
```javascript
let result = condition ? { status: "ok" } : { status: "fail" };
```

### Issue 24: Truthy check on NaN assigned value
**Description:** Value could be NaN which is falsy.
```javascript
let display = value || "default";
```

### Issue 25: Falsy check on 0 in array
**Description:** Array element of 0 is falsy.
```javascript
const arr = [0, 1, 2];
if (arr[0]) {
  console.log("first element");
}
```

### Issue 26: Using == in ternary condition
**Description:** Loose equality in ternary condition.
```javascript
let result = x == null ? "none" : x;
```

### Issue 27: Not using optional chaining in ternary
**Description:** Long truthy check in ternary condition.
```javascript
let name = user ? (user.profile ? user.profile.name : "Guest") : "Guest";
```

### Issue 28: Chained ternary with complex logic
**Description:** Chained ternary that is hard to read.
```javascript
let result = condition1 ? value1 : condition2 ? value2 : condition3 ? value3 : default;
```

### Issue 29: Nested ternary for color codes
**Description:** Using nested ternary for color mapping.
```javascript
let color = code === 1 ? "red" : code === 2 ? "green" : code === 3 ? "blue" : "unknown";
```

### Issue 30: Ternary with multiple lines without parentheses
**Description:** Multi-line ternary is hard to follow.
```javascript
let result = condition
  ? "value when true that is very long text"
  : "value when false that is also very long";
```

---

### Modify 1: Convert nested ternary to if-else
**Description:** Replace nested ternary with if-else for readability.
```javascript
let grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
```

### Modify 2: Convert if-else to ternary
**Description:** Use ternary for simple assignment.
```javascript
let status;
if (active) {
  status = "online";
} else {
  status = "offline";
}
```

### Modify 3: Simplify ternary returning boolean
**Description:** Return the condition directly.
```javascript
function isEven(n) {
  return n % 2 === 0 ? true : false;
}
```

### Modify 4: Replace ternary with if-else for side effects
**Description:** Use if-else instead of ternary for function calls.
```javascript
condition ? doSomething() : doSomethingElse();
```

### Modify 5: Add parentheses to nested ternary
**Description:** Add parentheses for clarity in nested ternary.
```javascript
let result = a ? b ? c : d : e;
```

### Modify 6: Replace truthy check with null check
**Description:** Use === null instead of truthy check.
```javascript
let value = data ? data.name : "unknown";
```

### Modify 7: Use ?? instead of ternary for null/undefined
**Description:** Use nullish coalescing for simpler default.
```javascript
let name = user ? user.name : "Guest";
```

### Modify 8: Use || instead of ternary for default
**Description:** Use logical OR for default value.
```javascript
let result = value ? value : "default";
```

### Modify 9: Fix ternary returning comparison
**Description:** Return the comparison directly.
```javascript
let result = x > 0 ? true : false;
```

### Modify 10: Simplify ternary with === true
**Description:** Remove redundant === true.
```javascript
let result = x === true ? "yes" : "no";
```

### Modify 11: Simplify ternary with === false
**Description:** Remove redundant === false.
```javascript
let result = x === false ? "yes" : "no";
```

### Modify 12: Convert ternary to if-else for complex logic
**Description:** Use if-else for complex assignment.
```javascript
let type = a > 0 ? "positive" : a < 0 ? "negative" : "zero";
```

### Modify 13: Add ?? to ternary for safety
**Description:** Add nullish coalescing inside ternary branch.
```javascript
let result = condition ? value : "default";
```

### Modify 14: Replace if-else with ternary for simple case
**Description:** Use ternary for simple boolean assignment.
```javascript
let eligible;
if (age >= 18) {
  eligible = true;
} else {
  eligible = false;
}
```

### Modify 15: Add typeof check in ternary condition
**Description:** Use typeof for safe variable access.
```javascript
let result = someVar ? "yes" : "no";
```

### Modify 16: Use nullish coalescing in ternary
**Description:** Combine ?? with ternary.
```javascript
let result = condition ? value ?? "default" : "fallback";
```

### Modify 17: Fix ternary precedence with arithmetic
**Description:** Add parentheses around ternary in arithmetic.
```javascript
let result = 10 + condition ? 5 : 3;
```

### Modify 18: Replace ternary with || for default
**Description:** Use || instead of ternary.
```javascript
let count = arr.length ? arr.length : 0;
```

### Modify 19: Use ?? instead of || for 0
**Description:** Use nullish coalescing to preserve 0.
```javascript
let count = arr.length || 0;
```

### Modify 20: Use optional chaining in ternary
**Description:** Use ?. for shorter ternary condition.
```javascript
let name = user ? user.name : "Guest";
```

### Modify 21: Remove ternary with empty else
**Description:** Use && instead of ternary with empty else.
```javascript
let result = condition ? "yes" : "";
```

### Modify 22: Use Array.length instead of truthy check
**Description:** Check length explicitly instead of truthy check.
```javascript
if (arr) {
  console.log("has items");
}
```

### Modify 23: Use Object.keys for empty object check
**Description:** Check object size instead of truthy check.
```javascript
if (obj) {
  console.log("has properties");
}
```

### Modify 24: Replace truthy check with explicit comparison
**Description:** Use === 0 instead of truthy check for zero.
```javascript
let count = arr.length ? arr.length : 0;
```

### Modify 25: Replace ternary with if-return
**Description:** Use if statement for early return.
```javascript
function isPositive(n) {
  return n > 0 ? true : false;
}
```

### Modify 26: Use switch instead of chained ternary
**Description:** Use switch for multiple conditions.
```javascript
let color = code === 1 ? "red" : code === 2 ? "green" : "blue";
```

### Modify 27: Add parentheses to ternary in template
**Description:** Wrap ternary in parentheses in template literal.
```javascript
console.log(`Status: ${active ? "Active" : "Inactive"}`);
```

### Modify 28: Remove void 0 from ternary
**Description:** Return undefined explicitly or use undefined.
```javascript
let result = condition ? "value" : void 0;
```

### Modify 29: Simplify ternary with !! removal
**Description:** Remove unnecessary !! in condition.
```javascript
let result = !!value ? "truthy" : "falsy";
```

### Modify 30: Use optional chaining with ternary
**Description:** Combine ?. and ternary for concise code.
```javascript
let name = user ? user.name : "Guest";
```

### Modify 31: Fix ternary with console.log
**Description:** Use if-else instead of ternary for logging.
```javascript
condition ? console.log("true") : console.log("false");
```

### Modify 32: Convert chained ternary to object map
**Description:** Use an object for value mapping.
```javascript
let color = code === 1 ? "red" : code === 2 ? "green" : code === 3 ? "blue" : "unknown";
```

### Modify 33: Use ?? instead of || for boolean
**Description:** Use ?? to preserve false values.
```javascript
let flag = setting || true;
```

### Modify 34: Fix incorrect array empty check
**Description:** Check arr.length instead of truthy check.
```javascript
const arr = [];
if (arr) {
  console.log("array has items");
}
```

### Modify 35: Fix incorrect object empty check
**Description:** Check Object.keys instead of truthy check.
```javascript
const obj = {};
if (obj) {
  console.log("object has properties");
}
```

### Modify 36: Use ternary with arrow function
**Description:** Use ternary for simple arrow function return.
```javascript
const getType = (n) => {
  if (n > 0) return "positive";
  return "non-positive";
};
```

### Modify 37: Remove ternary in function return
**Description:** Return the condition result directly.
```javascript
function isEven(n) {
  return n % 2 === 0 ? true : false;
}
```

### Modify 38: Use De Morgan's to simplify ternary
**Description:** Simplify negated ternary condition.
```javascript
let result = !condition ? "no" : "yes";
```

### Modify 39: Add fallback for NaN in ternary
**Description:** Handle NaN in ternary condition.
```javascript
let result = value ? "valid" : "invalid";
```

### Modify 40: Use early return instead of ternary
**Description:** Use if statement for early return pattern.
```javascript
function validate(input) {
  return input ? input : "default";
}
```

### Modify 41: Fix ternary with assignment side effects
**Description:** Move assignment out of ternary branches.
```javascript
condition ? (x = 10) : (y = 20);
```

### Modify 42: Use Object.is for -0 check in ternary
**Description:** Use Object.is for accurate -0 check.
```javascript
let result = x === 0 ? "zero" : "non-zero";
```

### Modify 43: Replace || ternary with ??
**Description:** Use nullish coalescing for safer defaults.
```javascript
let name = input ? input : "default";
```

### Modify 44: Fix ternary with Date check
**Description:** Date is always truthy, compare timestamp instead.
```javascript
let result = new Date() ? "valid" : "invalid";
```

### Modify 45: Use optional chaining with array element
**Description:** Use ?. for array element access.
```javascript
let first = arr[0] ? arr[0] : "none";
```

### Modify 46: Replace truthy check on function
**Description:** Functions are always truthy, check typeof.
```javascript
let cb = callback ? callback : defaultCallback;
```

### Modify 47: Use if-else for ternary with multiple statements
**Description:** Convert to if-else when multiple operations.
```javascript
condition ? (x++, y++) : (x--, y--);
```

### Modify 48: Simplify redundant ternary
**Description:** Remove ternary where both branches are same.
```javascript
let result = condition ? "same" : "same";
```

### Modify 49: Use logical assignment ||=
**Description:** Use ||= for short-circuit assignment.
```javascript
if (!x) {
  x = "default";
}
```

### Modify 50: Fix ternary with async function
**Description:** Handle Promise properly in ternary.
```javascript
let result = fetchData() ? "cached" : "fresh";
```
