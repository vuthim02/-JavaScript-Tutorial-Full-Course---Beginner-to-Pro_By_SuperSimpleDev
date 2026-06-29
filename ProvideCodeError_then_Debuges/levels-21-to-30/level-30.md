# Debugging Challenge - Level 30
## Module 6: Booleans and If-Statements - Mixed Concepts Review

---

### Error 1: Assignment in if condition
**Description:** Using = instead of === in if condition.
```javascript
if (user = getCurrentUser()) {
  console.log(user.name);
}
```

### Error 2: Loose equality with 0
**Description:** 0 == false is true due to coercion.
```javascript
if (0 == false) {
  console.log("equal");
}
```

### Error 3: NaN comparison with ===
**Description:** NaN === NaN always returns false.
```javascript
if (parseInt("abc") === NaN) {
  console.log("not a number");
}
```

### Error 4: Object comparison with ===
**Description:** Two objects with same content are not ===.
```javascript
if ({ value: 1 } === { value: 1 }) {
  console.log("same object");
}
```

### Error 5: Array comparison with ===
**Description:** Two arrays with same content are not ===.
```javascript
if ([1, 2, 3] === [1, 2, 3]) {
  console.log("same array");
}
```

### Error 6: Dangling else in nested if
**Description:** Else binds to the nearest if.
```javascript
if (a > 0)
  if (b > 0)
    console.log("both");
else
  console.log("a not positive");
```

### Error 7: Missing braces in if
**Description:** Only the first statement is in the if block.
```javascript
if (condition)
  console.log("one");
  console.log("two");
```

### Error 8: Semicolon after if condition
**Description:** Semicolon terminates the if statement.
```javascript
if (x > 5);
{
  console.log("greater");
}
```

### Error 9: Empty array is truthy
**Description:** [] is truthy in boolean context.
```javascript
const items = [];
if (items) {
  console.log("has items");
}
```

### Error 10: Empty object is truthy
**Description:** {} is truthy in boolean context.
```javascript
const data = {};
if (data) {
  console.log("has data");
}
```

### Error 11: 0 is falsy
**Description:** 0 is falsy in boolean context.
```javascript
let count = 0;
if (count) {
  console.log("has count");
}
```

### Error 12: Empty string is falsy
**Description:** "" is falsy in boolean context.
```javascript
let name = "";
if (name) {
  console.log("has name");
}
```

### Error 13: NaN is falsy
**Description:** NaN is falsy in boolean context.
```javascript
let value = NaN;
if (value) {
  console.log("has value");
}
```

### Error 14: null is falsy
**Description:** null is falsy in boolean context.
```javascript
let data = null;
if (data) {
  console.log("has data");
}
```

### Error 15: undefined is falsy
**Description:** undefined is falsy in boolean context.
```javascript
let user;
if (user) {
  console.log("has user");
}
```

### Error 16: "false" string is truthy
**Description:** "false" is a non-empty string, so truthy.
```javascript
if ("false") {
  console.log("false is truthy");
}
```

### Error 17: new Boolean(false) is truthy
**Description:** Object wrapper for false is truthy.
```javascript
if (new Boolean(false)) {
  console.log("false object is truthy");
}
```

### Error 18: String comparison with >
**Description:** "2" > "10" is true (lexicographic).
```javascript
if ("2" > "10") {
  console.log("2 > 10");
}
```

### Error 19: null >= 0 is true
**Description:** null coerces to 0 in numeric comparison.
```javascript
if (null >= 0) {
  console.log("null >= 0");
}
```

### Error 20: undefined >= 0 is false
**Description:** undefined coerces to NaN in numeric comparison.
```javascript
if (undefined >= 0) {
  console.log("undefined >= 0");
}
```

### Error 21: || precedence with &&
**Description:** && has higher precedence than ||.
```javascript
if (true || false && false) {
  console.log("result is true");
}
```

### Error 22: ! precedence with comparison
**Description:** ! has higher precedence than comparison.
```javascript
if (!5 > 10) {
  console.log("not greater");
}
```

### Error 23: || returns first truthy value
**Description:** || returns the value, not a boolean.
```javascript
let result = 0 || "hello" || null;
console.log(result);
```

### Error 24: && returns first falsy value
**Description:** && returns the value, not a boolean.
```javascript
let result = 5 && 0 && 10;
console.log(result);
```

### Error 25: Short-circuit with function side effects
**Description:** Second function never called in ||.
```javascript
function log(msg) {
  console.log(msg);
  return true;
}
let result = true || log("never called");
```

### Error 26: Ternary too complex
**Description:** Complex ternary expression is unreadable.
```javascript
let status = user.role === "admin" && user.active ? "full" : user.role === "user" ? "limited" : "none";
```

### Error 27: Nested ternary without parens
**Description:** Nested ternary direction is confusing.
```javascript
let result = a ? b : c ? d : e;
```

### Error 28: Ternary for side effects
**Description:** Using ternary for function calls.
```javascript
condition ? save() : load();
```

### Error 29: Else after return
**Description:** else block is unreachable after return.
```javascript
function test() {
  if (condition) {
    return true;
  } else {
    return false;
  }
}
```

### Error 30: Missing else for default
**Description:** No default return when condition is false.
```javascript
function getDiscount(level) {
  if (level === "gold") return 0.2;
  if (level === "silver") return 0.1;
}
```

### Error 31: Unreachable if branch
**Description:** Earlier if catches all cases.
```javascript
function classify(n) {
  if (n > 0) return "positive";
  else if (n >= 0) return "zero";
  else return "negative";
}
```

### Error 32: Off-by-one in age check
**Description:** Using > instead of >= for age.
```javascript
function canVote(age) {
  if (age > 18) return true;
  return false;
}
```

### Error 33: Comparing strings with locale
**Description:** String comparison is locale-sensitive.
```javascript
if ("ä" > "z") {
  console.log("ä > z");
}
```

### Error 34: || with 0 as valid value
**Description:** 0 is falsy, so || gives wrong default.
```javascript
function getCount(c) {
  return c || 1;
}
console.log(getCount(0));
```

### Error 35: ?? vs || confusion
**Description:** Using || instead of ?? for null/undefined.
```javascript
let name = input || "default";
```

### Error 36: Double negation !! confusion
**Description:** Using !! when Boolean() is clearer.
```javascript
let hasValue = !!data;
```

### Error 37: typeof null is "object"
**Description:** typeof null returns "object".
```javascript
if (typeof null === "null") {
  console.log("null type");
}
```

### Error 38: typeof array is "object"
**Description:** typeof [] returns "object".
```javascript
if (typeof [] === "array") {
  console.log("array type");
}
```

### Error 39: Delete on var variable
**Description:** Cannot delete var variables.
```javascript
var x = 10;
delete x;
console.log(x);
```

### Error 40: Delete on let variable
**Description:** Cannot delete let variables.
```javascript
let x = 10;
delete x;
console.log(x);
```

### Error 41: Reassigning const in catch
**Description:** Const parameter in catch cannot be redeclared.
```javascript
try {
  throw new Error("fail");
} catch (e) {
  const e = "error";
  console.log(e);
}
```

### Error 42: Const in for loop
**Description:** Using const in for loop causes increment error.
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Error 43: Var in for-of leaks
**Description:** Var in for-of leaks to outer scope.
```javascript
const items = [1, 2, 3];
for (var item of items) {
  console.log(item);
}
console.log(item);
```

### Error 44: Block-scoped let outside block
**Description:** Let declared in block is not accessible outside.
```javascript
if (true) {
  let x = 10;
}
console.log(x);
```

### Error 45: TDZ with let
**Description:** Accessing let before declaration throws.
```javascript
console.log(x);
let x = 10;
```

### Error 46: TDZ with const
**Description:** Accessing const before declaration throws.
```javascript
console.log(PI);
const PI = 3.14;
```

### Error 47: typeof with TDZ
**Description:** typeof on let in TDZ throws ReferenceError.
```javascript
console.log(typeof x);
let x = 10;
```

### Error 48: Function expression not hoisted
**Description:** Calling function expression before declaration.
```javascript
console.log(foo());
var foo = function() { return 10; };
```

### Error 49: Class not hoisted
**Description:** Using class before declaration.
```javascript
const obj = new MyClass();
class MyClass {}
```

### Error 50: Redeclaring function with var
**Description:** Var redeclaration overrides function hoisting.
```javascript
function foo() { return 1; }
var foo = "bar";
console.log(foo);
```

### Error 51: let redeclaration in same scope
**Description:** Redeclaring let in the same block.
```javascript
let x = 1;
let x = 2;
console.log(x);
```

### Error 52: const + increment
**Description:** Using ++ on a const.
```javascript
const count = 0;
count++;
```

### Error 53: Undeclared variable in strict mode
**Description:** Using variable without declaration in strict mode.
```javascript
"use strict";
username = "Alice";
console.log(username);
```

### Error 54: Reserved word as variable
**Description:** Using a keyword as variable name.
```javascript
let if = 42;
console.log(if);
```

### Error 55: Variable name starting with number
**Description:** Invalid identifier starting with number.
```javascript
let 1st = "first";
console.log(1st);
```

### Error 56: Hyphen in variable name
**Description:** Hyphen is not a valid identifier character.
```javascript
let user-name = "Alice";
```

### Error 57: Implicit global in function
**Description:** Assigning to undeclared variable creates global.
```javascript
function save() {
  cache = { data: "test" };
}
save();
console.log(cache);
```

### Error 58: Switch case let without braces
**Description:** Using let in switch without block scope.
```javascript
switch (x) {
  case 1: let result = "one"; break;
  case 2: let result = "two"; break;
}
```

### Error 59: For-in without declaration
**Description:** For-in loop without variable declaration.
```javascript
const obj = { a: 1 };
for (key in obj) {
  console.log(key);
}
```

### Error 60: Assignment in while condition
**Description:** Assignment in while loop condition.
```javascript
let x;
while (x = getValue()) {
  console.log(x);
}
```

### Error 61: Comparing undefined with ==
**Description:** == undefined catches both null and undefined.
```javascript
if (value == undefined) {
  console.log("undefined");
}
```

### Error 62: Empty if block
**Description:** Empty if with non-empty else.
```javascript
if (condition) {
} else {
  console.log("always runs");
}
```

### Error 63: Missing parentheses in complex condition
**Description:** Mixing && and || without grouping.
```javascript
if (a > 0 && b > 0 || c > 0) {
  console.log("grouping error");
}
```

### Error 64: String concatenation in if condition
**Description:** Using + in condition for string concatenation.
```javascript
let hello = "hello";
let world = "world";
if (hello + world) {
  console.log("combined");
}
```

### Error 65: Condition with comma operator
**Description:** Comma operator returns the last value.
```javascript
if (x = 1, x = 2, x > 0) {
  console.log("true");
}
```

### Error 66: Comparing Infinity
**Description:** Infinity === Infinity is true but behavior differs.
```javascript
if (Infinity > Infinity) {
  console.log("greater");
}
```

### Error 67: -0 comparison
**Description:** -0 === 0 is true.
```javascript
if (-0 === 0) {
  console.log("same");
}
```

### Error 68: parseInt without radix
**Description:** parseInt without radix can use octal.
```javascript
let num = parseInt("010");
console.log(num);
```

### Error 69: Float precision in comparison
**Description:** 0.1 + 0.2 !== 0.3.
```javascript
if (0.1 + 0.2 === 0.3) {
  console.log("equal");
}
```

### Error 70: Array index with undefined check
**Description:** arr[-1] is undefined.
```javascript
const arr = [1, 2, 3];
if (arr[-1] === 3) {
  console.log("last element");
}
```

---

### Issue 1: Deeply nested if statements
**Description:** Too many levels of nesting in if statements.
```javascript
function process(data) {
  if (data) {
    if (data.valid) {
      if (data.ready) {
        if (data.processed) {
          return data.result;
        }
      }
    }
  }
  return null;
}
```

### Issue 2: Using == instead of ===
**Description:** Loose equality throughout the code.
```javascript
if (x == 10) console.log("ten");
if (y == "5") console.log("five");
if (z == null) console.log("null");
```

### Issue 3: Not using ternary for simple cases
**Description:** Long if-else for simple assignments.
```javascript
let message;
if (success) {
  message = "OK";
} else {
  message = "FAIL";
}
```

### Issue 4: Using ternary for complex logic
**Description:** Using ternary where if-else is clearer.
```javascript
let result = user.role === "admin" ? user.active ? "full" : "inactive" : "guest";
```

### Issue 5: Missing default value with ||
**Description:** Using || but 0 is a valid value.
```javascript
function getItems(count) {
  return count || 10;
}
```

### Issue 6: Redundant === true
**Description:** Comparing boolean to true explicitly.
```javascript
if (isActive === true) {
  console.log("active");
}
```

### Issue 7: Redundant === false
**Description:** Comparing boolean to false explicitly.
```javascript
if (isDone === false) {
  console.log("not done");
}
```

### Issue 8: Using var instead of let/const
**Description:** Function-scoped var instead of block-scoped let/const.
```javascript
if (true) {
  var x = 10;
}
console.log(x);
```

### Issue 9: Not using strict equality in switch
**Description:** Switch uses === but comparisons might mismatch.
```javascript
let value = "1";
switch (value) {
  case 1:
    console.log("number");
    break;
}
```

### Issue 10: Global variable pollution
**Description:** No declaration creates global variable.
```javascript
function setup() {
  config = { port: 3000 };
}
setup();
console.log(config);
```

### Issue 11: Hoisting dependency
**Description:** Code relies on var hoisting.
```javascript
function test() {
  console.log(x);
  var x = 10;
}
```

### Issue 12: Variable name shadowing
**Description:** Inner variable shadows outer.
```javascript
let name = "Alice";
function greet() {
  let name = "Bob";
  console.log(name);
}
```

### Issue 13: Magic numbers in conditions
**Description:** Hardcoded numbers without explanation.
```javascript
if (age > 65) {
  console.log("senior");
}
```

### Issue 14: Not using includes for multiple ORs
**Description:** Chained || for same variable.
```javascript
if (x === 1 || x === 2 || x === 3 || x === 4) {
  console.log("valid");
}
```

### Issue 15: Empty else block
**Description:** Empty else indicates missing logic.
```javascript
if (condition) {
  doSomething();
} else {
}
```

### Issue 16: Using if-else chain instead of switch
**Description:** Multiple else-ifs for same variable.
```javascript
function getDay(n) {
  if (n === 1) return "Mon";
  else if (n === 2) return "Tue";
  else if (n === 3) return "Wed";
  else if (n === 4) return "Thu";
  else return "Unknown";
}
```

### Issue 17: Not using optional chaining
**Description:** Long && chains for property access.
```javascript
if (user && user.profile && user.profile.address) {
  console.log(user.profile.address.city);
}
```

### Issue 18: Comparing with null using ==
**Description:** Using == instead of === for null.
```javascript
if (value == null) {
  console.log("null or undefined");
}
```

### Issue 19: Using if-else for boolean return
**Description:** if-else that could be simplified.
```javascript
function isPositive(n) {
  if (n > 0) {
    return true;
  } else {
    return false;
  }
}
```

### Issue 20: Assignment in if with extra parens
**Description:** Assignment in if condition is error-prone.
```javascript
if ((x = getValue())) {
  console.log(x);
}
```

### Issue 21: Not using ?? for defaults
**Description:** Using || when ?? is more appropriate.
```javascript
let name = input || "default";
```

### Issue 22: Double negative in condition
**Description:** Using !! unnecessarily.
```javascript
if (!!value) {
  console.log("truthy");
}
```

### Issue 23: Not using Array.every/some
**Description:** Manual loops for boolean checks.
```javascript
let allValid = true;
for (let item of items) {
  if (!item.valid) {
    allValid = false;
    break;
  }
}
```

### Issue 24: Deeply nested ternary
**Description:** Multiple levels of nested ternary.
```javascript
let result = a ? b ? c ? d : e : f : g;
```

### Issue 25: Not using early return
**Description:** Deeply nested if instead of guard clauses.
```javascript
function getDisplayName(user) {
  if (user) {
    if (user.name) {
      if (user.name.length > 0) {
        return user.name;
      }
    }
  }
  return "Anonymous";
}
```

### Issue 26: Confusing || with bitwise |
**Description:** Using | instead of ||.
```javascript
if (a | b) {
  console.log("bitwise or");
}
```

### Issue 27: Confusing && with bitwise &
**Description:** Using & instead of &&.
```javascript
if (a & b) {
  console.log("bitwise and");
}
```

### Issue 28: Not using default parameters
**Description:** Manual default value checks.
```javascript
function multiply(a, b) {
  if (b === undefined) {
    b = 1;
  }
  return a * b;
}
```

### Issue 29: Unnecessary comparison to 0
**Description:** Using === 0 instead of !.
```javascript
if (count === 0) {
  console.log("zero");
}
```

### Issue 30: Using void 0 instead of undefined
**Description:** void 0 is obscure way to get undefined.
```javascript
if (value === void 0) {
  console.log("undefined");
}
```

---

### Modify 1: Fix assignment in if condition
**Description:** Change = to === in the if condition.
```javascript
if (x = 10) {
  console.log("ten");
}
```

### Modify 2: Replace == with ===
**Description:** Use strict equality to avoid coercion.
```javascript
if (x == 10) {
  console.log("ten");
}
```

### Modify 3: Fix NaN check
**Description:** Use Number.isNaN() instead of === NaN.
```javascript
if (value === NaN) {
  console.log("NaN");
}
```

### Modify 4: Simplify boolean return
**Description:** Return the condition directly.
```javascript
function isPositive(n) {
  if (n > 0) {
    return true;
  } else {
    return false;
  }
}
```

### Modify 5: Add braces to if
**Description:** Add curly braces to if block.
```javascript
if (condition)
  console.log("true");
  console.log("also true");
```

### Modify 6: Fix dangling else
**Description:** Add braces to fix else binding.
```javascript
if (a > 0)
  if (b > 0)
    console.log("both");
else
  console.log("a not positive");
```

### Modify 7: Remove semicolon after if
**Description:** Remove the semicolon terminating the if.
```javascript
if (x > 5);
{
  console.log("greater");
}
```

### Modify 8: Add proper string comparison
**Description:** Use numeric conversion for string comparison.
```javascript
if ("2" > "10") {
  console.log("2 > 10");
}
```

### Modify 9: Fix float comparison
**Description:** Use epsilon for float comparison.
```javascript
if (0.1 + 0.2 === 0.3) {
  console.log("equal");
}
```

### Modify 10: Add parentheses for precedence
**Description:** Add parentheses for && and || precedence.
```javascript
if (true || false && false) {
  console.log("true");
}
```

### Modify 11: Use optional chaining
**Description:** Use ?. instead of long && chains.
```javascript
if (user && user.profile && user.profile.name) {
  console.log(user.profile.name);
}
```

### Modify 12: Use nullish coalescing
**Description:** Use ?? instead of || for null/undefined.
```javascript
let name = input || "default";
```

### Modify 13: Use Array.includes
**Description:** Use includes for multiple comparisons.
```javascript
if (x === 1 || x === 2 || x === 3) {
  console.log("valid");
}
```

### Modify 14: Convert else-if to switch
**Description:** Use switch instead of else-if chain.
```javascript
function getDay(n) {
  if (n === 1) return "Mon";
  else if (n === 2) return "Tue";
  else if (n === 3) return "Wed";
  else return "Unknown";
}
```

### Modify 15: Remove redundant === true
**Description:** Use the boolean directly.
```javascript
if (isActive === true) {
  console.log("active");
}
```

### Modify 16: Remove redundant === false
**Description:** Use ! instead of === false.
```javascript
if (isDone === false) {
  console.log("not done");
}
```

### Modify 17: Fix ternary with side effects
**Description:** Use if-else instead of ternary for side effects.
```javascript
condition ? save() : load();
```

### Modify 18: Simplify nested ternary
**Description:** Convert nested ternary to if-else.
```javascript
let result = a ? b ? c : d : e;
```

### Modify 19: Add early return
**Description:** Use guard clause at start of function.
```javascript
function process(data) {
  if (data) {
    if (data.valid) {
      return data.value;
    }
  }
  return null;
}
```

### Modify 20: Fix off-by-one comparison
**Description:** Change > to >= for correct boundary.
```javascript
function canVote(age) {
  if (age > 18) return true;
  return false;
}
```

### Modify 21: Use ?? for 0-safe default
**Description:** Use ?? instead of || to preserve 0.
```javascript
function getCount(c) {
  return c || 1;
}
```

### Modify 22: Use Boolean() instead of !!
**Description:** Use Boolean() for explicit coercion.
```javascript
let hasValue = !!data;
```

### Modify 23: Fix const to let
**Description:** Change const to let for reassignment.
```javascript
const count = 0;
count++;
```

### Modify 24: Fix let redeclaration
**Description:** Remove the duplicate let declaration.
```javascript
let x = 1;
let x = 2;
```

### Modify 25: Add declaration in strict mode
**Description:** Add let/const/var declaration.
```javascript
"use strict";
name = "Alice";
```

### Modify 26: Fix variable name with reserved word
**Description:** Rename the variable using a reserved word.
```javascript
let class = "math";
```

### Modify 27: Fix variable name with number
**Description:** Rename variable starting with number.
```javascript
let 1st = "first";
```

### Modify 28: Fix variable name with hyphen
**Description:** Replace hyphen with underscore.
```javascript
let user-name = "Alice";
```

### Modify 29: Remove implicit global
**Description:** Add let declaration to prevent global.
```javascript
function save() {
  cache = { data: "test" };
}
```

### Modify 30: Fix switch case scoping
**Description:** Add braces to switch cases for let scope.
```javascript
switch (x) {
  case 1: let result = "one"; break;
  case 2: let result = "two"; break;
}
```

### Modify 31: Fix for-in declaration
**Description:** Add let declaration to for-in.
```javascript
const obj = { a: 1 };
for (key in obj) {
  console.log(key);
}
```

### Modify 32: Fix var in for-of
**Description:** Use let instead of var in for-of.
```javascript
const items = [1, 2, 3];
for (var item of items) {}
console.log(item);
```

### Modify 33: Remove unreachable else
**Description:** Remove else after return.
```javascript
function test() {
  if (condition) {
    return true;
  } else {
    return false;
  }
}
```

### Modify 34: Convert to ternary
**Description:** Use ternary for simple if-else.
```javascript
let message;
if (success) {
  message = "OK";
} else {
  message = "FAIL";
}
```

### Modify 35: Move assignment out of while
**Description:** Separate assignment from while condition.
```javascript
while (x = getValue()) {
  console.log(x);
}
```

### Modify 36: Add default else case
**Description:** Add else for unhandled cases.
```javascript
function getDiscount(level) {
  if (level === "gold") return 0.2;
  if (level === "silver") return 0.1;
}
```

### Modify 37: Fix unreachable if branch
**Description:** Reorder conditions to fix unreachable code.
```javascript
function classify(n) {
  if (n > 0) return "positive";
  else if (n >= 0) return "zero";
  else return "negative";
}
```

### Modify 38: Use Array.every for all check
**Description:** Use every() instead of manual loop.
```javascript
let allValid = true;
for (let item of items) {
  if (!item.valid) {
    allValid = false;
    break;
  }
}
```

### Modify 39: Use Array.some for any check
**Description:** Use some() instead of manual loop.
```javascript
let hasValid = false;
for (let item of items) {
  if (item.valid) {
    hasValid = true;
    break;
  }
}
```

### Modify 40: Add typeof check for global
**Description:** Use typeof for safe global access.
```javascript
if (someGlobal) {
  console.log("exists");
}
```

### Modify 41: Fix parseInt with radix
**Description:** Add radix 10 to parseInt.
```javascript
let num = parseInt("010");
```

### Modify 42: Use Object.is for -0
**Description:** Use Object.is for -0 comparison.
```javascript
if (-0 === 0) {
  console.log("same");
}
```

### Modify 43: Use includes instead of indexOf
**Description:** Use includes for string search.
```javascript
if (str.indexOf("test") !== -1) {
  console.log("found");
}
```

### Modify 44: Use Number.isNaN instead of isNaN
**Description:** Use Number.isNaN for strict NaN check.
```javascript
console.log(isNaN("hello"));
```

### Modify 45: Use default parameter syntax
**Description:** Use ES6 default parameters.
```javascript
function multiply(a, b) {
  if (b === undefined) b = 1;
  return a * b;
}
```

### Modify 46: Use || for simple default
**Description:** Use || for simple default value pattern.
```javascript
function greet(name) {
  if (!name) name = "Guest";
  console.log(name);
}
```

### Modify 47: Use optional chaining for method calls
**Description:** Use ?.() for optional method execution.
```javascript
if (obj.callback) {
  obj.callback();
}
```

### Modify 48: Fix empty if block
**Description:** Invert condition and remove empty if.
```javascript
if (condition) {
} else {
  doSomething();
}
```

### Modify 49: Use positive condition
**Description:** Use positive instead of negated condition.
```javascript
if (!(age >= 18)) {
  console.log("minor");
}
```

### Modify 50: Add missing return for all branches
**Description:** Ensure all code paths return a value.
```javascript
function getType(value) {
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
}
```
