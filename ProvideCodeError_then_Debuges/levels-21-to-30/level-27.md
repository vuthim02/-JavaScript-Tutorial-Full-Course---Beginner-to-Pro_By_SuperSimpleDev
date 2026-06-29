# Debugging Challenge - Level 27
## Module 6: Booleans and If-Statements - If/Else Logic

---

### Error 1: Missing braces in if
**Description:** Only first statement executes in if without braces.
```javascript
if (true)
  console.log("first");
  console.log("second");
```

### Error 2: Dangling else
**Description:** Else belongs to the nearest if.
```javascript
if (a > 0)
  if (b > 0)
    console.log("both positive");
else
  console.log("a not positive");
```

### Error 3: Semicolon after if condition
**Description:** Semicolon ends the if statement immediately.
```javascript
if (x > 5);
{
  console.log("x is greater");
}
```

### Error 4: Assignment in if condition
**Description:** Using = instead of ===.
```javascript
if (x = 10) {
  console.log("x is ten");
}
```

### Error 5: Else without if
**Description:** Orphaned else with no matching if.
```javascript
if (true) {
  console.log("if");
}
else {
  console.log("else");
}
```

### Error 6: Empty if body
**Description:** If body is empty, else always runs.
```javascript
if (condition) {
} else {
  console.log("always runs");
}
```

### Error 7: Missing else for default
**Description:** No else clause means default behavior is missing.
```javascript
function getDiscount(level) {
  if (level === "gold") {
    return 0.2;
  }
  if (level === "silver") {
    return 0.1;
  }
}
```

### Error 8: Unreachable if branch
**Description:** Earlier if catches all cases.
```javascript
function classify(n) {
  if (n > 0) {
    return "positive";
  } else if (n >= 0) {
    return "zero";
  }
}
```

### Error 9: Incorrect logic in else-if
**Description:** else-if condition that should be just else.
```javascript
if (age < 18) {
  console.log("minor");
} else if (age >= 18) {
  console.log("adult");
}
```

### Error 10: Missing return in else
**Description:** Function falls through to wrong return.
```javascript
function isValid(input) {
  if (input) {
    return true;
  }
  if (!input) {
    return false;
  }
}
```

### Error 11: Reversed condition
**Description:** The if and else branches are swapped.
```javascript
function isEven(n) {
  if (n % 2 === 0) {
    return false;
  } else {
    return true;
  }
}
```

### Error 12: If-else without curly braces
**Description:** Missing braces causes only first line to execute.
```javascript
if (x > 10)
  console.log("big");
else
  console.log("small");
  console.log("always runs");
```

### Error 13: Nested if without proper else
**Description:** Nested ifs with ambiguous else binding.
```javascript
if (a > 0) {
  if (b > 0) {
    console.log("both");
  }
} else {
  console.log("a not positive");
}
```

### Error 14: Comparison with undefined
**Description:** Checking undefined with == catches null too.
```javascript
if (value == undefined) {
  console.log("undefined or null");
}
```

### Error 15: Infinite loop from wrong condition
**Description:** Loop condition never becomes false.
```javascript
let i = 0;
while (i < 10) {
  console.log(i);
}
```

### Error 16: Off-by-one in condition
**Description:** Using > instead of >=.
```javascript
function isAdult(age) {
  if (age > 18) {
    return true;
  }
  return false;
}
```

### Error 17: Multiple ifs instead of if-else
**Description:** Multiple ifs run independently instead of exclusive branches.
```javascript
function classify(n) {
  if (n > 0) {
    console.log("positive");
  }
  if (n < 0) {
    console.log("negative");
  }
  if (n === 0) {
    console.log("zero");
  }
}
```

### Error 18: If condition always true
**Description:** Comparing same value is always true.
```javascript
const x = 10;
if (x === x) {
  console.log("always runs");
}
```

### Error 19: If condition always false
**Description:** Comparing variable with itself negated.
```javascript
const x = 10;
if (x !== x) {
  console.log("never runs");
}
```

### Error 20: Using if for boolean coercion confusion
**Description:** if (x) and if (x === true) are different.
```javascript
if (x === true) {
  console.log("exactly true");
}
```

### Error 21: Truthy check on object
**Description:** Empty objects are truthy.
```javascript
const obj = {};
if (obj) {
  console.log("object exists");
}
```

### Error 22: Checking array emptiness
**Description:** Empty array is truthy.
```javascript
const arr = [];
if (arr) {
  console.log("array has items");
}
```

### Error 23: if with comma operator
**Description:** Comma operator returns last value.
```javascript
if ((x = 1, x = 2, x > 0)) {
  console.log("true");
}
```

### Error 24: Negative condition readability
**Description:** Negated conditions are harder to understand.
```javascript
if (!(x >= 0)) {
  console.log("negative");
}
```

### Error 25: Double negation in if
**Description:** !! is unnecessary in if condition.
```javascript
if (!!value) {
  console.log("truthy");
}
```

### Error 26: Else after return
**Description:** Else is unreachable after return.
```javascript
function test() {
  if (condition) {
    return true;
  } else {
    return false;
  }
}
```

### Error 27: Confusing else if chain
**Description:** else if chain missing final else.
```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
  else if (score >= 60) return "D";
}
```

### Error 28: Comparing strings with >=
**Description:** String comparison with >= is lexicographic.
```javascript
if ("apple" >= "Apple") {
  console.log("apple >= Apple");
}
```

### Error 29: Missing parentheses in condition
**Description:** Operator precedence causes wrong logic.
```javascript
if (a > 0 && b > 0 || c > 0) {
  console.log("precedence bug");
}
```

### Error 30: Overly complex if condition
**Description:** Too many conditions in one if.
```javascript
if (a > 0 && b < 10 || c === "test" && d !== null || e) {
  console.log("complex");
}
```

### Error 31: if with function call side effect
**Description:** Function called in condition has side effects.
```javascript
if (updateCounter()) {
  console.log("updated");
}
```

### Error 32: Confusing else if formatting
**Description:** else if written on same line as closing brace.
```javascript
if (x > 0) {
  console.log("positive");
} else if (x < 0) {
  console.log("negative");
}
```

### Error 33: Unnecessary if-else for boolean
**Description:** if-else for boolean assignment can be simplified.
```javascript
if (n % 2 === 0) {
  result = true;
} else {
  result = false;
}
```

### Error 34: Deeply nested if statements
**Description:** Too many levels of nesting.
```javascript
if (a) {
  if (b) {
    if (c) {
      if (d) {
        console.log("deep");
      }
    }
  }
}
```

### Error 35: if with multiple statements no braces
**Description:** Multiple statements after if without braces.
```javascript
if (condition)
  console.log("first");
  console.log("second");
  console.log("third");
```

### Error 36: Incorrect null check
**Description:** Checking null with typeof.
```javascript
if (typeof value === "null") {
  console.log("null");
}
```

### Error 37: Checking undefined with typeof
**Description:** Extra typeof wrapper is unnecessary.
```javascript
if (typeof value === "undefined") {
  console.log("undefined");
}
```

### Error 38: if with always truthy condition
**Description:** Non-empty string is always truthy.
```javascript
if ("false") {
  console.log("always runs");
}
```

### Error 39: if with always falsy condition
**Description:** Empty string is always falsy.
```javascript
if ("") {
  console.log("never runs");
}
```

### Error 40: Misplaced else in nested if
**Description:** Else matches wrong if due to nesting.
```javascript
if (a > 0) {
  if (b > 0) {
    console.log("both positive");
  }
} else {
  console.log("a not positive");
}
```

### Error 41: Or condition with ===
**Description:** Checking multiple values incorrectly.
```javascript
if (x === 1 || 2 || 3) {
  console.log("1, 2, or 3");
}
```

### Error 42: And condition with ===
**Description:** Chained === for multiple checks incorrectly.
```javascript
if (x === 1 && 2 && 3) {
  console.log("all match");
}
```

### Error 43: if with no else for all cases
**Description:** Not all branches return a value.
```javascript
function getType(value) {
  if (typeof value === "number") {
    return "number";
  }
  if (typeof value === "string") {
    return "string";
  }
}
```

### Error 44: Condition that is always true with ||
**Description:** || with always truthy first operand.
```javascript
if (true || condition) {
  console.log("always runs");
}
```

### Error 45: Condition that is always false with &&
**Description:** && with always falsy first operand.
```javascript
if (false && condition) {
  console.log("never runs");
}
```

### Error 46: Comparing with void operator
**Description:** void 0 always returns undefined.
```javascript
if (value === void 0) {
  console.log("undefined");
}
```

### Error 47: if with global variable check
**Description:** Checking if global exists without typeof.
```javascript
if (someGlobal) {
  console.log("global exists");
}
```

### Error 48: Inverted condition in else if
**Description:** else if condition that matches the inverse of if.
```javascript
if (x > 0) {
  console.log("positive");
} else if (x <= 0) {
  console.log("not positive");
}
```

### Error 49: Overlapping conditions in else if
**Description:** Conditions in else if overlap with previous.
```javascript
if (x >= 0) {
  console.log("non-negative");
} else if (x > -10) {
  console.log("greater than -10");
}
```

### Error 50: Condition with assignment and comparison
**Description:** Mixed assignment and comparison is confusing.
```javascript
if (x = getValue() > 10) {
  console.log(x);
}
```

### Error 51: Missing break in switch as if-else
**Description:** Using switch without breaks acts as if-else incorrectly.
```javascript
switch (value) {
  case 1:
    console.log("one");
  case 2:
    console.log("two");
  default:
    console.log("other");
}
```

### Error 52: if with same condition twice
**Description:** Duplicate condition checks.
```javascript
if (x > 0) {
  console.log("positive");
}
if (x > 0) {
  console.log("still positive");
}
```

### Error 53: Unnecessary else after throw
**Description:** Else after throw is unreachable.
```javascript
function validate(input) {
  if (!input) {
    throw new Error("invalid");
  } else {
    return input;
  }
}
```

### Error 54: Unnecessary else after return
**Description:** Else after return is dead code.
```javascript
function find(items, target) {
  for (let item of items) {
    if (item === target) {
      return item;
    } else {
      continue;
    }
  }
  return null;
}
```

### Error 55: Check for NaN in if
**Description:** Using === NaN is always false.
```javascript
if (parseInt("abc") === NaN) {
  console.log("not a number");
}
```

### Error 56: Array includes with if
**Description:** Checking array contents with if.
```javascript
if ([1, 2, 3].includes) {
  console.log("has includes");
}
```

### Error 57: if with method reference
**Description:** Method reference is truthy regardless of result.
```javascript
if (console.log) {
  console.log("console.log exists");
}
```

### Error 58: Using undefined as condition
**Description:** undefined is falsy.
```javascript
if (undefined) {
  console.log("this never runs");
}
```

### Error 59: Using null as condition
**Description:** null is falsy.
```javascript
if (null) {
  console.log("this never runs");
}
```

### Error 60: Using 0 as condition
**Description:** 0 is falsy.
```javascript
if (0) {
  console.log("this never runs");
}
```

### Error 61: Using NaN as condition
**Description:** NaN is falsy.
```javascript
if (NaN) {
  console.log("this never runs");
}
```

### Error 62: Using empty string as condition
**Description:** "" is falsy.
```javascript
if ("") {
  console.log("this never runs");
}
```

### Error 63: Missing else for default return
**Description:** Function missing return for some branches.
```javascript
function getPrefix(code) {
  if (code === "US") {
    return "+1";
  }
  if (code === "UK") {
    return "+44";
  }
}
```

### Error 64: if condition with getter side effect
**Description:** Property getter called in condition has side effects.
```javascript
const obj = {
  get value() {
    count++;
    return 42;
  }
};
if (obj.value) {
  console.log("has value");
}
```

### Error 65: Chained if with same variable
**Description:** Multiple ifs on same variable without else-if.
```javascript
function getSeason(m) {
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "fall";
  if (m === 12 || m <= 2) return "winter";
}
```

### Error 66: Condition with increment
**Description:** Increment in condition causes side effects.
```javascript
let x = 0;
if (x++) {
  console.log("truthy");
}
console.log(x);
```

### Error 67: Condition with decrement
**Description:** Decrement in condition causes side effects.
```javascript
let x = 1;
if (x--) {
  console.log("truthy");
}
console.log(x);
```

### Error 68: Checking if function returns
**Description:** Function call in condition without parentheses.
```javascript
function test() { return true; }
if (test) {
  console.log("function exists");
}
```

### Error 69: Double condition in if
**Description:** Checking same condition twice.
```javascript
if (x > 0 && x > 0) {
  console.log("redundant");
}
```

### Error 70: Impossible condition
**Description:** Condition that can never be true.
```javascript
if (x > 10 && x < 5) {
  console.log("impossible");
}
```

---

### Issue 1: Deeply nested if statements
**Description:** Too many nested levels of if statements.
```javascript
function validateOrder(order) {
  if (order) {
    if (order.items) {
      if (order.items.length > 0) {
        if (order.total > 0) {
          return true;
        }
      }
    }
  }
  return false;
}
```

### Issue 2: Missing braces for single statement
**Description:** Omitting braces for single if statements.
```javascript
if (condition)
  doSomething();
```

### Issue 3: Else if instead of switch
**Description:** Long else-if chain for same variable.
```javascript
function getColorName(code) {
  if (code === 1) return "Red";
  else if (code === 2) return "Green";
  else if (code === 3) return "Blue";
  else if (code === 4) return "Yellow";
  else return "Unknown";
}
```

### Issue 4: Using if-else for boolean assignment
**Description:** if-else for simple boolean assignment.
```javascript
let eligible;
if (age >= 18) {
  eligible = true;
} else {
  eligible = false;
}
```

### Issue 5: Negated condition in if
**Description:** Using ! for negative conditions when positive is clearer.
```javascript
if (!(age < 18)) {
  console.log("adult");
}
```

### Issue 6: Magic boolean in condition
**Description:** Hardcoded boolean in if condition.
```javascript
if (user.role === "admin" && true) {
  console.log("admin");
}
```

### Issue 7: Comparing boolean to true
**Description:** Explicit comparison to true is redundant.
```javascript
if (isComplete === true) {
  console.log("done");
}
```

### Issue 8: Empty else block
**Description:** Empty else block indicates missing logic.
```javascript
if (condition) {
  doSomething();
} else {
}
```

### Issue 9: Empty if block
**Description:** Empty if with populated else should be inverted.
```javascript
if (condition) {
} else {
  doSomething();
}
```

### Issue 10: Complex condition without parentheses
**Description:** Mixing && and || without parentheses.
```javascript
if (a && b || c && d || e) {
  console.log("complex");
}
```

### Issue 11: Magic values in conditions
**Description:** Hardcoded values in conditions without explanation.
```javascript
if (age > 65) {
  console.log("senior");
}
```

### Issue 12: Using else when not needed
**Description:** Unnecessary else after if-return.
```javascript
function isPositive(n) {
  if (n > 0) {
    return true;
  } else {
    return false;
  }
}
```

### Issue 13: Assignment in if without double parentheses
**Description:** Assignment in if is confusing even with parens.
```javascript
if ((x = getValue())) {
  console.log(x);
}
```

### Issue 14: Not using else if for exclusive conditions
**Description:** Multiple ifs that are mutually exclusive.
```javascript
if (score >= 90) grade = "A";
if (score >= 80 && score < 90) grade = "B";
if (score >= 70 && score < 80) grade = "C";
```

### Issue 15: Deeply nested ternary in if
**Description:** Ternary inside if condition is hard to read.
```javascript
if (a > 0 ? b > 0 : c > 0) {
  console.log("confusing");
}
```

### Issue 16: If condition with side effects
**Description:** Function with side effects in if condition.
```javascript
if (saveToDatabase(data)) {
  console.log("saved");
}
```

### Issue 17: Not using early return
**Description:** Deep nesting instead of guard clauses.
```javascript
function process(data) {
  if (data) {
    if (data.isValid) {
      return data.value;
    }
  }
  return null;
}
```

### Issue 18: Overlapping conditions
**Description:** Conditions that overlap but are not exclusive.
```javascript
if (x > 0) {
  console.log("positive");
} else if (x >= 0) {
  console.log("non-negative");
}
```

### Issue 19: Nested if vs logical AND
**Description:** Nested ifs that could be combined with &&.
```javascript
if (user) {
  if (user.isActive) {
    if (user.age >= 18) {
      console.log("eligible");
    }
  }
}
```

### Issue 20: if with no else for non-void function
**Description:** Function doesn't return in all paths.
```javascript
function getDiscount(level) {
  if (level === "gold") return 0.2;
  if (level === "silver") return 0.1;
}
```

### Issue 21: Inconsistent brace style
**Description:** Mixing brace styles in if-else blocks.
```javascript
if (condition) {
  console.log("if");
} else
{
  console.log("else");
}
```

### Issue 22: Missing default case in if-else
**Description:** No else clause for unhandled cases.
```javascript
function getDayName(n) {
  if (n === 1) return "Mon";
  if (n === 2) return "Tue";
  if (n === 3) return "Wed";
}
```

### Issue 23: Using if for type coercion check
**Description:** if (x) catches many falsy values, not just undefined/null.
```javascript
function getName(user) {
  if (user.name) {
    return user.name;
  }
  return "Unknown";
}
```

### Issue 24: Not using else if for exclusive branches
**Description:** Multiple ifs that should be else if.
```javascript
function taxBracket(income) {
  if (income < 10000) return 0.1;
  if (income < 50000) return 0.2;
  if (income < 100000) return 0.3;
}
```

### Issue 25: Using if for null check instead of ??
**Description:** Manual null check instead of nullish coalescing.
```javascript
let displayName;
if (user.name !== null && user.name !== undefined) {
  displayName = user.name;
} else {
  displayName = "Guest";
}
```

### Issue 26: Condition with too many ORs
**Description:** Multiple || can be replaced with includes.
```javascript
if (x === "a" || x === "b" || x === "c" || x === "d") {
  console.log("valid");
}
```

### Issue 27: if with empty string check
**Description:** Checking string manually instead of using length.
```javascript
if (str === "") {
  console.log("empty");
}
```

### Issue 28: Not using optional chaining in conditions
**Description:** Long && conditions for nested property access.
```javascript
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}
```

### Issue 29: Comparing numbers with strings in if
**Description:** Mixed type comparison in if condition.
```javascript
if (value > "10") {
  console.log("greater than 10");
}
```

### Issue 30: Complex negation in if
**Description:** Hard to read negated complex condition.
```javascript
if (!(a > 0 && (b < 10 || c === "test"))) {
  console.log("complex negation");
}
```

---

### Modify 1: Add braces to if
**Description:** Add curly braces to the if block.
```javascript
if (condition)
  console.log("true");
```

### Modify 2: Fix dangling else
**Description:** Add braces to fix else binding.
```javascript
if (a > 0)
  if (b > 0)
    console.log("both");
else
  console.log("a not positive");
```

### Modify 3: Remove semicolon after if
**Description:** Remove the semicolon that terminates the if.
```javascript
if (x > 5);
{
  console.log("x is greater");
}
```

### Modify 4: Add early return
**Description:** Use guard clause instead of nested if.
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

### Modify 5: Combine nested ifs with &&
**Description:** Use && instead of nested ifs.
```javascript
if (user) {
  if (user.isActive) {
    if (user.age >= 18) {
      console.log("eligible");
    }
  }
}
```

### Modify 6: Convert else-if to switch
**Description:** Use switch instead of else-if chain.
```javascript
function getColorName(code) {
  if (code === 1) return "Red";
  else if (code === 2) return "Green";
  else if (code === 3) return "Blue";
  else return "Unknown";
}
```

### Modify 7: Add default else
**Description:** Add else clause for unhandled cases.
```javascript
function getDiscount(level) {
  if (level === "gold") {
    return 0.2;
  }
  if (level === "silver") {
    return 0.1;
  }
}
```

### Modify 8: Fix off-by-one comparison
**Description:** Change > to >= for correct boundary.
```javascript
function isAdult(age) {
  if (age > 18) {
    return true;
  }
  return false;
}
```

### Modify 9: Remove unreachable else after return
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

### Modify 10: Simplify boolean assignment
**Description:** Directly assign the condition result.
```javascript
let eligible;
if (age >= 18) {
  eligible = true;
} else {
  eligible = false;
}
```

### Modify 11: Fix reversed if-else
**Description:** Swap the if and else branches.
```javascript
function isEven(n) {
  if (n % 2 === 0) {
    return false;
  } else {
    return true;
  }
}
```

### Modify 12: Remove empty if block
**Description:** Invert condition and remove empty if.
```javascript
if (condition) {
} else {
  doSomething();
}
```

### Modify 13: Add missing fallback return
**Description:** Add default return at end of function.
```javascript
function getPrefix(code) {
  if (code === "US") return "+1";
  if (code === "UK") return "+44";
}
```

### Modify 14: Fix overlapping else if
**Description:** Remove the redundant else if condition.
```javascript
if (x > 0) {
  console.log("positive");
} else if (x >= 0) {
  console.log("non-negative");
}
```

### Modify 15: Use else if for exclusive branches
**Description:** Convert multiple ifs to else if chain.
```javascript
function classify(n) {
  if (n > 0) {
    console.log("positive");
  }
  if (n < 0) {
    console.log("negative");
  }
  if (n === 0) {
    console.log("zero");
  }
}
```

### Modify 16: Simplify negative condition
**Description:** Use positive condition instead of negated.
```javascript
if (!(age >= 18)) {
  console.log("minor");
}
```

### Modify 17: Fix missing parentheses in condition
**Description:** Add parentheses for operator precedence.
```javascript
if (a > 0 && b > 0 || c > 0) {
  console.log("precedence bug");
}
```

### Modify 18: Remove redundant === false
**Description:** Use ! instead of === false.
```javascript
if (condition === false) {
  console.log("false");
}
```

### Modify 19: Remove redundant === true
**Description:** Use the boolean directly.
```javascript
if (condition === true) {
  console.log("true");
}
```

### Modify 20: Add braces to if-else
**Description:** Add braces to both if and else blocks.
```javascript
if (x > 10)
  console.log("big");
else
  console.log("small");
  console.log("always runs");
```

### Modify 21: Fix wrong === check for multiple values
**Description:** Correct the chained === comparison.
```javascript
if (x === 1 || 2 || 3) {
  console.log("1, 2, or 3");
}
```

### Modify 22: Remove empty else block
**Description:** Remove the unnecessary empty else.
```javascript
if (condition) {
  doSomething();
} else {
}
```

### Modify 23: Fix dangling else with braces
**Description:** Add braces to inner if to fix else binding.
```javascript
if (a > 0)
  if (b > 0)
    console.log("both positive");
  else
    console.log("a not positive");
```

### Modify 24: Replace if-else chain with object lookup
**Description:** Use an object map instead of else-if chain.
```javascript
function getColorName(code) {
  if (code === 1) return "Red";
  else if (code === 2) return "Green";
  else if (code === 3) return "Blue";
  else return "Unknown";
}
```

### Modify 25: Remove unreachable condition
**Description:** Fix the condition that can never be true.
```javascript
if (x > 10 && x < 5) {
  console.log("impossible");
}
```

### Modify 26: Add check for NaN
**Description:** Add Number.isNaN check.
```javascript
if (parseInt("abc") === NaN) {
  console.log("NaN");
}
```

### Modify 27: Fix if with comma operator
**Description:** Remove the comma operator from condition.
```javascript
if ((x = 1, x = 2, x > 0)) {
  console.log("true");
}
```

### Modify 28: Simplify deeply nested if
**Description:** Flatten the nested ifs.
```javascript
if (a) {
  if (b) {
    if (c) {
      if (d) {
        console.log("deep");
      }
    }
  }
}
```

### Modify 29: Use Array.includes for multiple checks
**Description:** Use includes instead of multiple ||.
```javascript
if (x === "a" || x === "b" || x === "c") {
  console.log("valid");
}
```

### Modify 30: Fix unreachable if branch
**Description:** Reorder conditions to fix reachability.
```javascript
function classify(n) {
  if (n > 0) {
    return "positive";
  } else if (n >= 0) {
    return "zero";
  }
}
```

### Modify 31: Add default case to else-if
**Description:** Add else clause to handle all cases.
```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
}
```

### Modify 32: Use optional chaining in if
**Description:** Use ?. for safe nested property access.
```javascript
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}
```

### Modify 33: Remove duplicate condition check
**Description:** Remove the duplicate if condition.
```javascript
if (x > 0) {
  console.log("positive");
}
if (x > 0) {
  console.log("still positive");
}
```

### Modify 34: Fix misplaced else in nested if
**Description:** Use proper braces to fix else binding.
```javascript
if (a > 0) {
  if (b > 0) {
    console.log("both positive");
  }
} else {
  console.log("a not positive");
}
```

### Modify 35: Remove unnecessary else after throw
**Description:** Remove else after throw statement.
```javascript
function validate(input) {
  if (!input) {
    throw new Error("invalid");
  } else {
    return input;
  }
}
```

### Modify 36: Simplify if-else using ! operator
**Description:** Use ! to invert condition and simplify.
```javascript
if (condition) {
} else {
  doSomething();
}
```

### Modify 37: Use nullish coalescing in condition
**Description:** Use ?? instead of manual null check.
```javascript
let displayName;
if (user.name !== null && user.name !== undefined) {
  displayName = user.name;
} else {
  displayName = "Guest";
}
```

### Modify 38: Remove side effect from condition
**Description:** Move side effect out of if condition.
```javascript
if (saveToDatabase(data)) {
  console.log("saved");
}
```

### Modify 39: Add missing return for all paths
**Description:** Ensure all branches return a value.
```javascript
function getType(value) {
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
}
```

### Modify 40: Simplify if-else return boolean
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

### Modify 41: Extract condition to variable
**Description:** Store complex condition in descriptive variable.
```javascript
if (user.age >= 18 && user.age <= 65 && user.active) {
  console.log("eligible");
}
```

### Modify 42: Fix comparison with > vs >=
**Description:** Correct the comparison operator.
```javascript
if (index > arr.length) {
  console.log("out of bounds");
}
```

### Modify 43: Remove dead code after return
**Description:** Remove code after return statement.
```javascript
function test() {
  return true;
  console.log("never runs");
}
```

### Modify 44: Fix switch missing break
**Description:** Add break to switch cases.
```javascript
switch (value) {
  case 1: console.log("one");
  case 2: console.log("two");
}
```

### Modify 45: Use guard clause at function start
**Description:** Add early return for invalid input.
```javascript
function process(data) {
  console.log(data.value);
}
```

### Modify 46: Add typeof check for global
**Description:** Use typeof before accessing global.
```javascript
if (someGlobal) {
  console.log("exists");
}
```

### Modify 47: Fix string comparison
**Description:** Use localeCompare for string comparison.
```javascript
if ("apple" >= "Apple") {
  console.log("apple >= Apple");
}
```

### Modify 48: Use Number.isNaN for NaN check
**Description:** Use proper NaN detection.
```javascript
if (value === NaN) {
  console.log("NaN");
}
```

### Modify 49: Remove unreachable else after continue
**Description:** Remove else after continue in loop.
```javascript
for (let item of items) {
  if (item === target) {
    return item;
  } else {
    continue;
  }
}
```

### Modify 50: Simplify condition with early return
**Description:** Use guard condition at the beginning.
```javascript
function validateOrder(order) {
  if (order) {
    if (order.items) {
      if (order.items.length > 0) {
        if (order.total > 0) {
          return true;
        }
      }
    }
  }
  return false;
}
```
