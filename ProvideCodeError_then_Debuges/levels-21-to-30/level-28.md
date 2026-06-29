# Debugging Challenge - Level 28
## Module 6: Booleans and If-Statements - Logical Operators

---

### Error 1: || returns first truthy, not boolean
**Description:** Using || may return a non-boolean value.
```javascript
let result = "hello" || "world";
console.log(result);
```

### Error 2: && returns first falsy
**Description:** Using && may return a non-boolean value.
```javascript
let result = 0 && 10;
console.log(result);
```

### Error 3: Short-circuit evaluation misunderstanding
**Description:** Second operand not evaluated if first is truthy.
```javascript
let x = 0;
let result = true || x++;
console.log(x);
```

### Error 4: && short-circuit confusion
**Description:** Second operand not evaluated if first is falsy.
```javascript
let x = 0;
let result = false && x++;
console.log(x);
```

### Error 5: Precedence of && over ||
**Description:** && has higher precedence than ||.
```javascript
let result = true || false && false;
console.log(result);
```

### Error 6: ! operator precedence
**Description:** ! has higher precedence than comparison.
```javascript
let result = !5 > 10;
console.log(result);
```

### Error 7: Using || instead of ?? for 0
**Description:** || treats 0 as falsy, ?? doesn't.
```javascript
function getValue(val) {
  return val || 10;
}
console.log(getValue(0));
```

### Error 8: Using || instead of ?? for empty string
**Description:** || treats "" as falsy.
```javascript
function getName(name) {
  return name || "Guest";
}
console.log(getName(""));
```

### Error 9: Using || instead of ?? for false
**Description:** || treats false as falsy.
```javascript
function getFlag(flag) {
  return flag || true;
}
console.log(getFlag(false));
```

### Error 10: Chained || for default values
**Description:** Chain of || can be confusing.
```javascript
let result = a || b || c || "default";
```

### Error 11: Chained && for guard
**Description:** Chain of && for nested property access.
```javascript
let name = user && user.profile && user.profile.name;
```

### Error 12: ! with double values
**Description:** !! converts value to boolean.
```javascript
let bool = !!"hello";
console.log(bool);
```

### Error 13: Logical AND for conditional execution
**Description:** Using && for conditional execution (hacky).
```javascript
condition && doSomething();
```

### Error 14: Logical OR for default assignment
**Description:** Using || for default parameter (pre-ES6).
```javascript
function greet(name) {
  name = name || "Guest";
  console.log(name);
}
```

### Error 15: Mixing && and || without parens
**Description:** Complex expression without parentheses.
```javascript
if (a && b || c && d) {
  console.log("confusing");
}
```

### Error 16: Short-circuit in return
**Description:** return uses short-circuit evaluation.
```javascript
function getValue() {
  return true || expensiveFunction();
}
```

### Error 17: Side effects with short-circuit
**Description:** Function call with side effects in OR chain.
```javascript
function logAndReturn(value) {
  console.log(value);
  return value;
}
let result = logAndReturn("a") || logAndReturn("b");
```

### Error 18: Nested && confusion
**Description:** Deeply nested && expressions.
```javascript
let result = a && b && c && d && e;
```

### Error 19: Logical NOT with comparison
**Description:** ! negates before comparison.
```javascript
let result = !x > 0;
console.log(result);
```

### Error 20: !! for boolean coercion
**Description:** Using !! when Boolean() is clearer.
```javascript
let isTruthy = !!value;
```

### Error 21: || with function calls
**Description:** Both function calls always execute without short-circuit.
```javascript
function getDefault() {
  return "default";
}
let result = getValue() || getDefault();
```

### Error 22: && with assignment
**Description:** Assignment inside && expression.
```javascript
let x;
x = false && (x = 10);
console.log(x);
```

### Error 23: || with assignment
**Description:** Assignment inside || expression.
```javascript
let x;
x = true || (x = 10);
console.log(x);
```

### Error 24: Precedence with ternary and &&
**Description:** Ternary has lower precedence than &&.
```javascript
let result = true && false ? "yes" : "no";
console.log(result);
```

### Error 25: Precedence with ternary and ||
**Description:** Ternary has lower precedence than ||.
```javascript
let result = true || false ? "yes" : "no";
console.log(result);
```

### Error 26: ! on object
**Description:** ! on object returns false (objects are truthy).
```javascript
let obj = {};
if (!obj) {
  console.log("empty object");
}
```

### Error 27: ! on array
**Description:** ! on array returns false (arrays are truthy).
```javascript
let arr = [];
if (!arr) {
  console.log("empty array");
}
```

### Error 28: ! on function
**Description:** ! on function returns false (functions are truthy).
```javascript
let fn = function() {};
if (!fn) {
  console.log("empty function");
}
```

### Error 29: Double !! on number
**Description:** !!0 is false, !!1 is true.
```javascript
console.log(!!0);
console.log(!!1);
```

### Error 30: !! on NaN
**Description:** !!NaN is false.
```javascript
if (!!NaN) {
  console.log("NaN is truthy");
}
```

### Error 31: !! on undefined
**Description:** !!undefined is false.
```javascript
if (!!undefined) {
  console.log("undefined is truthy");
}
```

### Error 32: !! on null
**Description:** !!null is false.
```javascript
if (!!null) {
  console.log("null is truthy");
}
```

### Error 33: !! on empty string
**Description:** !!"" is false.
```javascript
if (!!"") {
  console.log("empty is truthy");
}
```

### Error 34: !! on "false" string
**Description:** !!"false" is true (non-empty string).
```javascript
console.log(!!"false");
```

### Error 35: !! on whitespace string
**Description:** !!" " is true (non-empty string).
```javascript
if (!!" ") {
  console.log("whitespace is truthy");
}
```

### Error 36: !! on Infinity
**Description:** !!Infinity is true.
```javascript
if (!!Infinity) {
  console.log("infinity is truthy");
}
```

### Error 37: !! on -Infinity
**Description:** !!-Infinity is true.
```javascript
if (!!-Infinity) {
  console.log("negative infinity is truthy");
}
```

### Error 38: !! on arrays with items
**Description:** !![1] is true.
```javascript
if (!![1]) {
  console.log("array is truthy");
}
```

### Error 39: !! on empty array
**Description:** !![] is true.
```javascript
if (!![]) {
  console.log("empty array is truthy");
}
```

### Error 40: !! on empty object
**Description:** !!{} is true.
```javascript
if (!!{}) {
  console.log("empty object is truthy");
}
```

### Error 41: || with multiple falsy values
**Description:** Returns last falsy value if all are falsy.
```javascript
let result = 0 || "" || null;
console.log(result);
```

### Error 42: && with multiple truthy values
**Description:** Returns last truthy value if all are truthy.
```javascript
let result = 1 && "hello" && true;
console.log(result);
```

### Error 43: Short-circuit with void functions
**Description:** Functions returning undefined in || chain.
```javascript
function doNothing() {}
let result = doNothing() || "default";
console.log(result);
```

### Error 44: && with comparison operators
**Description:** && has lower precedence than comparison.
```javascript
let result = 5 > 3 && 2 < 4;
console.log(result);
```

### Error 45: || with comparison operators
**Description:** || has lower precedence than comparison.
```javascript
let result = 5 > 3 || 2 > 4;
console.log(result);
```

### Error 46: Grouping with && and ||
**Description:** Without parentheses, && binds tighter.
```javascript
let result = true || true && false;
console.log(result);
```

### Error 47: NOT with multiple comparisons
**Description:** ! applies to the first comparison only.
```javascript
let result = !5 > 3 && 2 < 4;
console.log(result);
```

### Error 48: Chained NOT
**Description:** Multiple NOTs can cancel out.
```javascript
let result = !!5;
console.log(result);
```

### Error 49: NOT with !==
**Description:** !== is already negated.
```javascript
let result = !(x !== 5);
console.log(result);
```

### Error 50: NOT with == (should be !=)
**Description:** Use != instead of !(x == y).
```javascript
let result = !(x == 5);
console.log(result);
```

### Error 51: Logical AND with assignment operator
**Description:** && with = is confusing.
```javascript
let x;
x = true && (x = 10);
console.log(x);
```

### Error 52: Logical OR with assignment operator
**Description:** || with = is confusing.
```javascript
let x;
x = false || (x = 10);
console.log(x);
```

### Error 53: Short-circuit in while condition
**Description:** Short-circuit in while loop condition.
```javascript
let i = 0;
while (i < 5 && doSomething()) {
  i++;
}
```

### Error 54: Short-circuit in for condition
**Description:** Short-circuit in for loop condition.
```javascript
for (let i = 0; i < 5 && condition; i++) {
  console.log(i);
}
```

### Error 55: || return value confusion
**Description:** || returns the operand value, not a boolean.
```javascript
let result = 5 || 10;
if (result === true) {
  console.log("boolean true");
}
```

### Error 56: && return value confusion
**Description:** && returns the operand value, not a boolean.
```javascript
let result = 5 && 10;
if (result === true) {
  console.log("boolean true");
}
```

### Error 57: !! on Symbol
**Description:** !!Symbol() is true.
```javascript
if (!!Symbol()) {
  console.log("symbol is truthy");
}
```

### Error 58: !! on BigInt
**Description:** !!0n is false, !!1n is true.
```javascript
if (!!0n) {
  console.log("bigint zero is truthy");
}
```

### Error 59: !! on Date
**Description:** !!new Date() is true.
```javascript
if (!!new Date()) {
  console.log("date is truthy");
}
```

### Error 60: !! on RegExp
**Description:** !!/hello/ is true.
```javascript
if (!!/hello/) {
  console.log("regex is truthy");
}
```

### Error 61: !! on Error
**Description:** !!new Error() is true.
```javascript
if (!!new Error("test")) {
  console.log("error is truthy");
}
```

### Error 62: Logical OR with Promise
**Description:** Promise objects are truthy, so || short-circuits.
```javascript
let result = Promise.resolve(5) || fetchData();
console.log(result);
```

### Error 63: && with async function
**Description:** Async functions return promises which are truthy.
```javascript
let result = true && fetchData();
console.log(result);
```

### Error 64: Short-circuit with decrement
**Description:** Decrement in short-circuit expression.
```javascript
let count = 0;
let result = count && count--;
console.log(count);
```

### Error 65: Short-circuit with increment
**Description:** Increment in short-circuit expression.
```javascript
let count = 1;
let result = count || count++;
console.log(count);
```

### Error 66: NOT with instanceof
**Description:** ! negates instanceof result.
```javascript
let result = !(x instanceof Array);
console.log(result);
```

### Error 67: NOT with in operator
**Description:** ! negates in operator result.
```javascript
let result = !("key" in obj);
console.log(result);
```

### Error 68: NOT with typeof
**Description:** ! negates typeof result comparison.
```javascript
let result = !(typeof x === "number");
console.log(result);
```

### Error 69: !! with loose comparison
**Description:** !!x == true is same as x == true.
```javascript
let result = !!value == true;
console.log(result);
```

### Error 70: Chained logical operators without parens
**Description:** Complex expression with &&, ||, and !.
```javascript
let result = !a && b || c && !d || e;
console.log(result);
```

---

### Issue 1: Using && as a control flow
**Description:** Using && instead of if statement for side effects.
```javascript
user.isActive && sendNotification(user);
```

### Issue 2: Using || for default parameters
**Description:** Using || instead of default parameter syntax.
```javascript
function setName(name) {
  this.name = name || "Unknown";
}
```

### Issue 3: Complex condition without parentheses
**Description:** Mixing && and || without grouping.
```javascript
if (user.role === "admin" || user.role === "moderator" && user.active) {
  console.log("access granted");
}
```

### Issue 4: Not using ?? for null/undefined
**Description:** Using || when ?? is more appropriate.
```javascript
let count = value || 0;
```

### Issue 5: Double negation without need
**Description:** Using !! when the value is already boolean.
```javascript
let hasItems = !!arr.length;
```

### Issue 6: Overusing short-circuit for control flow
**Description:** Multiple short-circuit expressions instead of proper if.
```javascript
user && user.profile && console.log(user.profile.name);
```

### Issue 7: Chaining too many ||
**Description:** Long chain of || for default values.
```javascript
let name = first || second || third || fourth || "default";
```

### Issue 8: Using logical operators for branching
**Description:** Using && and || instead of if-else.
```javascript
condition && doSomething();
!condition && doSomethingElse();
```

### Issue 9: Confusing precedence with !
**Description:** ! without parentheses around comparison.
```javascript
if (!x > 10) {
  console.log("not greater than 10");
}
```

### Issue 10: !! for function return
**Description:** Using !! on function return value.
```javascript
function isAvailable() {
  return !!checkAvailability();
}
```

### Issue 11: Not using optional chaining
**Description:** Using && for nested property access instead of ?.
```javascript
let city = user && user.address && user.address.city;
```

### Issue 12: Not using nullish coalescing
**Description:** Using || instead of ?? for default.
```javascript
function getConfig(key) {
  return config[key] || "default";
}
```

### Issue 13: Short-circuit with function calls
**Description:** Function calls in short-circuit with side effects.
```javascript
save(data) && log("saved") && notify();
```

### Issue 14: Using || on boolean values
**Description:** || on booleans returns the truthy one.
```javascript
let result = isActive || isAdmin;
```

### Issue 15: Using && on boolean values
**Description:** && on booleans returns the falsy one.
```javascript
let result = isActive && isAdmin;
```

### Issue 16: Not using parentheses around assignment in &&
**Description:** Assignment in && without parentheses.
```javascript
let x;
x = true && (x = 10);
```

### Issue 17: Using ! for negative comparison
**Description:** Using ! with comparison is less clear.
```javascript
if (!(age >= 18)) {
  console.log("minor");
}
```

### Issue 18: Confusing !! with Boolean()
**Description:** Boolean() is clearer than !!.
```javascript
let bool = !!"text";
```

### Issue 19: Nested logical expressions
**Description:** Three or more levels of logical nesting.
```javascript
if (a && (b || c) && !(d && e)) {
  console.log("too complex");
}
```

### Issue 20: Not using Array.every/some
**Description:** Manual loops instead of every/some.
```javascript
let allPositive = true;
for (let n of arr) {
  if (!(n > 0)) {
    allPositive = false;
    break;
  }
}
```

### Issue 21: Short-circuit return confusion
**Description:** Complex short-circuit return expression.
```javascript
function canAccess(user) {
  return user && user.role && (user.role === "admin" || user.role === "moderator");
}
```

### Issue 22: Using && for guard in assignment
**Description:** && guard in assignment is confusing.
```javascript
let name = user && user.name;
```

### Issue 23: Using || in assignment with 0
**Description:** || with 0 gives default incorrectly.
```javascript
let quantity = order.quantity || 1;
```

### Issue 24: Not using double NOT pattern
**Description:** Not using !! for explicit boolean coercion.
```javascript
if (arr.length) {
  console.log("has items");
}
```

### Issue 25: Confusing || with |
**Description:** Using bitwise OR instead of logical OR.
```javascript
if (x | y) {
  console.log("bitwise");
}
```

### Issue 26: Confusing && with &
**Description:** Using bitwise AND instead of logical AND.
```javascript
if (x & y) {
  console.log("bitwise");
}
```

### Issue 27: Using ^ (XOR) instead of !==
**Description:** Using bitwise XOR for inequality.
```javascript
if (x ^ y) {
  console.log("different");
}
```

### Issue 28: NOT with numbers
**Description:** ! on number converts to boolean.
```javascript
if (!1) {
  console.log("not 1");
}
```

### Issue 29: Using || in if condition
**Description:** Using || in if when any truthy works.
```javascript
if (a || b) {
  console.log("truthy");
}
```

### Issue 30: Not simplifying boolean logic
**Description:** Complex boolean logic that can be simplified.
```javascript
if (!(a && b) && !(c && d)) {
  console.log("neither");
}
```

---

### Modify 1: Replace || with ??
**Description:** Use nullish coalescing for null/undefined defaults.
```javascript
function getValue(val) {
  return val || 10;
}
```

### Modify 2: Replace && for if statement
**Description:** Use proper if statement instead of &&.
```javascript
condition && doSomething();
```

### Modify 3: Add parentheses for precedence
**Description:** Add parentheses to clarify operator precedence.
```javascript
let result = true || false && false;
```

### Modify 4: Fix ! operator precedence
**Description:** Add parentheses around comparison after !.
```javascript
let result = !5 > 10;
```

### Modify 5: Use default parameter instead of ||
**Description:** Use ES6 default parameter syntax.
```javascript
function greet(name) {
  name = name || "Guest";
  console.log(name);
}
```

### Modify 6: Use optional chaining instead of &&
**Description:** Use ?. for nested property access.
```javascript
let city = user && user.address && user.address.city;
```

### Modify 7: Use Boolean() instead of !!
**Description:** Use Boolean() for explicit conversion.
```javascript
let bool = !!value;
```

### Modify 8: Simplify complex && / || expression
**Description:** Break down the complex logical expression.
```javascript
if (a && b || c && d) {
  console.log("confusing");
}
```

### Modify 9: Remove side effects from condition
**Description:** Move side effects out of short-circuit expression.
```javascript
let result = true || x++;
```

### Modify 10: Fix return of || to boolean
**Description:** Ensure the function returns a boolean.
```javascript
function getFlag(flag) {
  return flag || true;
}
```

### Modify 11: Use includes instead of ||
**Description:** Use includes for multiple comparison.
```javascript
if (x === "a" || x === "b" || x === "c") {
  console.log("valid");
}
```

### Modify 12: Remove unnecessary !!
**Description:** Value is already boolean, remove !!.
```javascript
let hasItems = !!arr.length;
```

### Modify 13: Use Array.every instead of loop
**Description:** Use every() instead of manual logical check.
```javascript
let allPositive = true;
for (let n of arr) {
  if (!(n > 0)) {
    allPositive = false;
    break;
  }
}
```

### Modify 14: Use Array.some instead of loop
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

### Modify 15: Use ?? for 0-safe default
**Description:** Use ?? to allow 0 as a valid value.
```javascript
let quantity = order.quantity || 1;
```

### Modify 16: Use ?? for empty string-safe default
**Description:** Use ?? to allow empty string as valid value.
```javascript
let name = input || "default";
```

### Modify 17: Use ?? for false-safe default
**Description:** Use ?? to allow false as valid value.
```javascript
let flag = setting || true;
```

### Modify 18: Remove chained ||
**Description:** Break down the long || chain.
```javascript
let name = first || second || third || fourth || "default";
```

### Modify 19: Fix short-circuit with async
**Description:** Handle the async function properly.
```javascript
let result = true && fetchData();
```

### Modify 20: Remove bitwise OR mistake
**Description:** Use logical OR instead of bitwise OR.
```javascript
if (x | y) {
  console.log("bitwise");
}
```

### Modify 21: Remove bitwise AND mistake
**Description:** Use logical AND instead of bitwise AND.
```javascript
if (x & y) {
  console.log("bitwise");
}
```

### Modify 22: Use positive condition instead of negated
**Description:** Simplify the negated condition.
```javascript
if (!(age >= 18)) {
  console.log("minor");
}
```

### Modify 23: Move function call out of ||
**Description:** Evaluate function before || for clarity.
```javascript
let result = getValue() || getDefault();
```

### Modify 24: Move assignment out of &&
**Description:** Separate the assignment from the logical expression.
```javascript
x = true && (x = 10);
```

### Modify 25: Move assignment out of ||
**Description:** Separate the assignment from the logical expression.
```javascript
x = false || (x = 10);
```

### Modify 26: Use if-else instead of short-circuit branching
**Description:** Use proper if-else instead of && and || expressions.
```javascript
condition && doSomething();
!condition && doSomethingElse();
```

### Modify 27: Add type check before logical operation
**Description:** Ensure operands are the expected type.
```javascript
let result = user && user.role && (user.role === "admin");
```

### Modify 28: Fix !! return to proper boolean
**Description:** Return the comparison result directly.
```javascript
function isAvailable() {
  return !!checkAvailability();
}
```

### Modify 29: Replace ternary with ||
**Description:** Use || instead of ternary for default.
```javascript
let name = value ? value : "default";
```

### Modify 30: Replace ternary with && for guard
**Description:** Use && for guard pattern.
```javascript
let name = condition ? value : null;
```

### Modify 31: Simplify negated condition
**Description:** Remove double negation in condition.
```javascript
if (!(x === false)) {
  console.log("true");
}
```

### Modify 32: Use != instead of !(x == y)
**Description:** Use strict inequality operator.
```javascript
let result = !(x == 5);
```

### Modify 33: Use !== instead of !(x === y)
**Description:** Use strict inequality operator.
```javascript
let result = !(x === 5);
```

### Modify 34: Simplify !! comparison
**Description:** Remove unnecessary !! in comparison.
```javascript
if (!!value === true) {
  console.log("truthy");
}
```

### Modify 35: Use ?? for default parameter
**Description:** Replace || with ?? in parameter default.
```javascript
function getConfig(key) {
  return config[key] || "default";
}
```

### Modify 36: Use null check instead of truthy check
**Description:** Be explicit about checking for null.
```javascript
if (user) {
  console.log(user.name);
}
```

### Modify 37: Fix short-circuit while loop
**Description:** Avoid short-circuit with side effects in while.
```javascript
while (i < 5 && doSomething()) {
  i++;
}
```

### Modify 38: Use proper boolean for condition
**Description:** Ensure condition returns boolean.
```javascript
let result = 5 || 10;
if (result === true) {
  console.log("true");
}
```

### Modify 39: Replace || with simple if
**Description:** Use if statement instead of || for clarity.
```javascript
let name = input || "default";
```

### Modify 40: Simplify De Morgan's laws
**Description:** Apply De Morgan's laws to simplify.
```javascript
if (!(a && b)) {
  console.log("not both");
}
```

### Modify 41: Remove unnecessary short-circuit
**Description:** Remove the short-circuit that has no effect.
```javascript
function getValue() {
  return true || expensiveFunction();
}
```

### Modify 42: Use optional chaining with default
**Description:** Combine ?. with ?? for safe access.
```javascript
let name = user && user.name || "Guest";
```

### Modify 43: Fix || with void functions
**Description:** Handle undefined return from void function.
```javascript
function doNothing() {}
let result = doNothing() || "default";
```

### Modify 44: Use logical assignment
**Description:** Use ||= for default assignment.
```javascript
if (!x) {
  x = "default";
}
```

### Modify 45: Use logical AND assignment
**Description:** Use &&= for conditional assignment.
```javascript
if (x) {
  x = x.toUpperCase();
}
```

### Modify 46: Fix ! with instanceof
**Description:** Move ! inside the instanceof check.
```javascript
let result = !(x instanceof Array);
```

### Modify 47: Fix ! with in
**Description:** Move ! outside properly.
```javascript
let result = !("key" in obj);
```

### Modify 48: Simplify De Morgan's with &&
**Description:** Apply De Morgan's law to negated OR.
```javascript
if (!(a || b)) {
  console.log("neither");
}
```

### Modify 49: Use ternary instead of && ||
**Description:** Use ternary for clearer conditional assignment.
```javascript
let result = condition && value || "default";
```

### Modify 50: Use optional chaining for method call
**Description:** Use ?.() for optional method call.
```javascript
if (obj.method) {
  obj.method();
}
```
