# Level 05: JavaScript Basics — Conditionals & Logic

## Errors

### Error 1: Missing parentheses around condition
**Description:** Check if x is greater than 10
```javascript
let x = 15;
if x > 10 {
  console.log("Big");
}
```

### Error 2: Semicolon after if condition
**Description:** If with semicolon terminates early
```javascript
let score = 90;
if (score > 80);
{
  console.log("Great");
}
```

### Error 3: Using = instead of === in condition
**Description:** Compare two values for equality
```javascript
let a = 5;
let b = "5";
if (a === b) {
  console.log("Same");
}
```

### Error 4: Missing closing brace for else
**Description:** If-else with missing brace
```javascript
let age = 20;
if (age >= 18) {
  console.log("Adult");
else {
  console.log("Minor");
}
```

### Error 5: Using else if with space as else if
**Description:** Multiple conditions
```javascript
let val = 5;
if (val > 10) {
  console.log("Big");
} else if (val > 5) {
  console.log("Medium");
} else if (val > 0) {
  console.log("Small");
}
```

### Error 6: Missing comparison in if
**Description:** If with bare variable
```javascript
let isActive = true;
if (isActive) {
  console.log("Active");
}
```

### Error 7: Using switch without break
**Description:** Switch with fall-through
```javascript
let color = "red";
switch (color) {
  case "red":
    console.log("Red");
  case "blue":
    console.log("Blue");
  default:
    console.log("Other");
}
```

### Error 8: Using switch with complex condition
**Description:** Switch with boolean expression
```javascript
let score = 85;
switch (true) {
  case score >= 90:
    console.log("A");
    break;
  case score >= 80:
    console.log("B");
    break;
}
```

### Error 9: Using ternary without else
**Description:** Ternary expression without else clause
```javascript
let age = 20;
let status = age >= 18 ? "Adult";
console.log(status);
```

### Error 10: Nested ternary without parentheses
**Description:** Nested ternary without grouping
```javascript
let x = 5;
let result = x > 0 ? x > 10 ? "Big" : "Small" : "Negative";
console.log(result);
```

### Error 11: Using OR instead of AND
**Description:** Check if number is between 1 and 10
```javascript
let num = 15;
if (num > 1 || num < 10) {
  console.log("Between");
}
```

### Error 12: Using AND instead of OR
**Description:** Check if number is less than 0 or greater than 100
```javascript
let num = -5;
if (num < 0 && num > 100) {
  console.log("Out of range");
}
```

### Error 13: Short-circuit evaluation misuse
**Description:** Use && for conditional execution
```javascript
let isReady = true;
isReady || console.log("Not ready");
```

### Error 14: Wrong precedence with logical operators
**Description:** Mix AND and OR without parentheses
```javascript
let a = true, b = false, c = true;
if (a || b && c) {
  console.log("True");
}
```

### Error 15: Using bitwise operator instead of logical
**Description:** Use & instead of &&
```javascript
let x = 5;
if (x > 3 & x < 10) {
  console.log("Between");
}
```

### Error 16: Using bitwise OR instead of logical
**Description:** Use | instead of ||
```javascript
let isMember = true;
let isAdmin = false;
if (isMember | isAdmin) {
  console.log("Access");
}
```

### Error 17: Double pipe as string concatenation
**Description:** Use || instead of + for string
```javascript
let hello = "Hello";
let world = "World";
console.log(hello || " " || world);
```

### Error 18: Falsy check with ||
**Description:** Use OR for default with falsy value
```javascript
let count = 0;
let display = count || "No items";
console.log(display);
```

### Error 19: Truthy check with &&
**Description:** Use AND for conditional with falsy
```javascript
let name = "";
name && console.log("Hello " + name);
```

### Error 20: Comparison with NaN
**Description:** Check if value is NaN
```javascript
let val = NaN;
if (val === NaN) {
  console.log("Is NaN");
}
```

### Error 21: Comparison of objects with ===
**Description:** Check if two objects are equal
```javascript
let obj1 = {a: 1};
let obj2 = {a: 1};
if (obj1 === obj2) {
  console.log("Equal");
}
```

### Error 22: Comparing arrays by value
**Description:** Check if arrays have same elements
```javascript
let a = [1, 2, 3];
let b = [1, 2, 3];
if (a == b) {
  console.log("Same");
}
```

### Error 23: Using new Boolean for comparison
**Description:** Create boolean wrapper and compare
```javascript
let flag = new Boolean(false);
if (flag) {
  console.log("Truthy");
}
```

### Error 24: Using new Number for comparison
**Description:** Create number wrapper and compare
```javascript
let num = new Number(0);
if (num) {
  console.log("Truthy");
}
```

### Error 25: Using new String for comparison
**Description:** Create string wrapper and compare
```javascript
let str = new String("");
if (str) {
  console.log("Truthy");
}
```

### Error 26: Wrong null check
**Description:** Check if value is null
```javascript
let val = null;
if (val === undefined) {
  console.log("Null");
}
```

### Error 27: Using typeof on variable that might not exist
**Description:** Check if variable exists
```javascript
if (typeof someVar !== "undefined") {
  console.log(someVar);
}
```

### Error 28: Wrong condition for empty check
**Description:** Check if array is empty
```javascript
let arr = [];
if (arr) {
  console.log("Not empty");
}
```

### Error 29: Wrong condition for string empty check
**Description:** Check if string is empty
```javascript
let str = "";
if (str === "") {
  console.log("Empty");
}
```

### Error 30: Using == instead of === for type safety
**Description:** Compare number and string
```javascript
let id = 5;
let input = "5";
if (id == input) {
  console.log("Match");
}
```

### Error 31: Not using curly braces for single line
**Description:** If with single line without braces
```javascript
if (true)
  console.log("True");
  console.log("Also runs");
```

### Error 32: Dangling else ambiguity
**Description:** Nested if without braces
```javascript
let a = true, b = false;
if (a)
  if (b)
    console.log("Both");
  else
    console.log("Which if?");
```

### Error 33: Using else if instead of switch
**Description:** Multiple else if for fixed values
```javascript
let day = 3;
if (day === 1) console.log("Mon");
else if (day === 2) console.log("Tue");
else if (day === 3) console.log("Wed");
else if (day === 4) console.log("Thu");
else if (day === 5) console.log("Fri");
```

### Error 34: Using if instead of ternary
**Description:** Simple conditional assignment
```javascript
let age = 20;
let type;
if (age >= 18) {
  type = "Adult";
} else {
  type = "Minor";
}
console.log(type);
```

### Error 35: Assignment in condition
**Description:** Assign in if condition accidentally
```javascript
let x = 5;
if (x = 10) {
  console.log("x is 10");
}
```

### Error 36: Double negation without purpose
**Description:** Use !! to convert to boolean
```javascript
let val = "hello";
let bool = !!val;
console.log(bool);
```

### Error 37: Wrong use of void in condition
**Description:** Use void in if statement
```javascript
if (void 0) {
  console.log("Never runs");
}
```

### Error 38: Using break in if statement
**Description:** Use break outside of loop
```javascript
if (true) {
  break;
}
```

### Error 39: Using continue in if statement
**Description:** Use continue outside of loop
```javascript
function test() {
  if (true) {
    continue;
  }
}
test();
```

### Error 40: Missing case expression
**Description:** Switch case without expression
```javascript
let val = 5;
switch (val) {
  case:
    console.log("No value");
    break;
}
```

### Error 41: Duplicate case labels
**Description:** Switch with duplicate case
```javascript
let val = 1;
switch (val) {
  case 1:
    console.log("One");
    break;
  case 1:
    console.log("Also one");
    break;
}
```

### Error 42: Switch with boolean case
**Description:** Switch on boolean
```javascript
let flag = true;
switch (flag) {
  case true:
    console.log("True");
    break;
  case false:
    console.log("False");
    break;
}
```

### Error 43: Wrong condition for checking indexOf
**Description:** Check if substring exists
```javascript
let str = "Hello World";
if (str.indexOf("World")) {
  console.log("Found");
}
```

### Error 44: Wrong condition for checking includes
**Description:** Check if array includes item
```javascript
let arr = [1, 2, 3];
if (arr.includes(1)) {
  console.log("Found");
}
```

### Error 45: Using new Boolean in if
**Description:** Pass Boolean object to if
```javascript
let flag = new Boolean(false);
if (flag) {
  console.log("This runs unexpectedly");
}
```

### Error 46: Comparing string with number loosely
**Description:** Use == with different types
```javascript
let input = "10";
if (input == 10) {
  console.log("Equal");
}
```

### Error 47: Not using isNaN for NaN check
**Description:** Compare with NaN directly
```javascript
let result = NaN;
if (result === NaN) {
  console.log("Not a number");
}
```

### Error 48: Using OR for null check instead of ??
**Description:** Return default for null
```javascript
let value = null;
let display = value || "Default";
console.log(display);
```

### Error 49: Wrong check for negative numbers
**Description:** Check if number is negative
```javascript
let num = -5;
if (num < 0) {
  console.log("Negative");
}
```

### Error 50: Using else for fallback when not needed
**Description:** Return early instead of else
```javascript
function isEven(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}
console.log(isEven(4));
```

### Error 51: Wrong truthy check for empty array
**Description:** Empty array is truthy
```javascript
let items = [];
if (items) {
  console.log("Has items");
}
```

### Error 52: Wrong truthy check for empty object
**Description:** Empty object is truthy
```javascript
let obj = {};
if (obj) {
  console.log("Has properties");
}
```

### Error 53: Using || for default with 0
**Description:** 0 is falsy but valid
```javascript
let quantity = 0;
let display = quantity || "No items";
console.log(display);
```

### Error 54: Using && for conditional with zero
**Description:** 0 is falsy in && chain
```javascript
let count = 0;
count && console.log("Count is:", count);
```

### Error 55: Wrong condition for not equal
**Description:** Check if a is not equal to b
```javascript
let a = 5, b = 10;
if (a !== b) {
  console.log("Different");
}
```

### Error 56: Using ! for not loosely
**Description:** Negate the condition incorrectly
```javascript
let flag = true;
if (!flag === false) {
  console.log("Unexpected");
}
```

### Error 57: Comparing boolean with === true
**Description:** Redundant comparison
```javascript
let isActive = true;
if (isActive === true) {
  console.log("Active");
}
```

### Error 58: Comparing boolean with === false
**Description:** Redundant false comparison
```javascript
let isActive = false;
if (isActive === false) {
  console.log("Inactive");
}
```

### Error 59: Using switch for boolean
**Description:** Switch on boolean value
```javascript
let isMember = true;
switch (isMember) {
  case true:
    console.log("Member");
    break;
  default:
    console.log("Non-member");
}
```

### Error 60: Wrong operator precedence with ternary
**Description:** Ternary inside string concatenation
```javascript
let age = 20;
console.log("Status: " + age >= 18 ? "Adult" : "Minor");
```

### Error 61: Using if-else chain for simple mapping
**Description:** Map values without object
```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
  else if (score >= 60) return "D";
  else return "F";
}
console.log(getGrade(85));
```

### Error 62: Wrong condition for range check
**Description:** Check if value is in range
```javascript
let temp = 30;
if (temp >= 20 && temp <= 30) {
  console.log("Comfortable");
}
```

### Error 63: Double negative condition
**Description:** Avoid double negative
```javascript
let enabled = true;
if (enabled !== false) {
  console.log("Enabled");
}
```

### Error 64: Using == for null check
**Description:** Check null with ==
```javascript
let val = null;
if (val == null) {
  console.log("Null or undefined");
}
```

### Error 65: Missing parentheses in while condition
**Description:** While loop without parentheses
```javascript
let i = 0;
while i < 5 {
  console.log(i);
  i++;
}
```

### Error 66: For loop without parentheses
**Description:** For loop missing parentheses
```javascript
for let i = 0; i < 5; i++ {
  console.log(i);
}
```

### Error 67: For loop with extra semicolon
**Description:** Extra semicolon in for loop
```javascript
for (let i = 0; i < 5; i++;) {
  console.log(i);
}
```

### Error 68: Infinite loop with for condition
**Description:** For loop with always true condition
```javascript
for (let i = 0; i >= 0; i++) {
  console.log(i);
}
```

### Error 69: Do-while missing condition
**Description:** Do-while with no condition
```javascript
do {
  console.log("Running");
} while ();
```

### Error 70: Wrong operator in for loop increment
**Description:** For loop decrement instead of increment
```javascript
for (let i = 0; i < 5; i--) {
  console.log(i);
}
```

## Issues

### Issue 1: Using == instead of ===
**Description:** Loose equality comparison
```javascript
let a = "5";
let b = 5;
if (a == b) {
  console.log("Equal");
}
```

### Issue 2: Deeply nested if statements
**Description:** Too many levels of nesting
```javascript
if (true) {
  if (true) {
    if (true) {
      if (true) {
        console.log("Deep");
      }
    }
  }
}
```

### Issue 3: No default case in switch
**Description:** Switch without default
```javascript
let status = "active";
switch (status) {
  case "active":
    console.log("Active");
    break;
  case "inactive":
    console.log("Inactive");
    break;
}
```

### Issue 4: Empty if block
**Description:** If block with no statements
```javascript
if (true) {
}
console.log("Nothing happened");
```

### Issue 5: Too much logic in single condition
**Description:** Complex condition hard to read
```javascript
if (user && user.role === "admin" && user.active && !user.suspended && user.verified) {
  console.log("Full access");
}
```

### Issue 6: Redundant else after return
**Description:** Else after return is unnecessary
```javascript
function isPositive(num) {
  if (num > 0) {
    return true;
  } else {
    return false;
  }
}
console.log(isPositive(5));
```

### Issue 7: Using else if for mutually exclusive conditions
**Description:** All branches exclusive
```javascript
if (x > 0) {
  console.log("Positive");
} else if (x < 0) {
  console.log("Negative");
} else if (x === 0) {
  console.log("Zero");
}
```

### Issue 8: Yoda conditions (unnecessary)
**Description:** Place constant on left of comparison
```javascript
if (10 === x) {
  console.log("Ten");
}
```

### Issue 9: Using if instead of switch
**Description:** Multiple ifs for discrete values
```javascript
let code = 200;
if (code === 200) console.log("OK");
else if (code === 404) console.log("Not Found");
else if (code === 500) console.log("Server Error");
```

### Issue 10: Unnecessary boolean comparison
**Description:** Compare boolean to true
```javascript
let isReady = true;
if (isReady === true) {
  console.log("Ready");
}
```

### Issue 11: Using if-else for simple boolean return
**Description:** Return boolean directly
```javascript
function canVote(age) {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}
console.log(canVote(20));
```

### Issue 12: Not short-circuiting when possible
**Description:** Full condition when short-circuit works
```javascript
let name = "John";
if (name) {
  console.log("Hello " + name);
}
```

### Issue 13: Complex ternary when if-else is clearer
**Description:** Nested ternary hard to read
```javascript
let score = 75;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D";
console.log(grade);
```

### Issue 14: Empty else block
**Description:** Else does nothing
```javascript
if (condition) {
  console.log("Do this");
} else {
}
```

### Issue 15: Unreachable if condition
**Description:** Condition always false
```javascript
if (false) {
  console.log("Never runs");
}
```

### Issue 16: Using switch for ranges
**Description:** Switch with range expressions
```javascript
let score = 85;
switch (true) {
  case score >= 90: console.log("A"); break;
  case score >= 80: console.log("B"); break;
  case score >= 70: console.log("C"); break;
}
```

### Issue 17: Not using includes for multiple comparisons
**Description:** OR chain for same variable
```javascript
let fruit = "apple";
if (fruit === "apple" || fruit === "banana" || fruit === "orange") {
  console.log("Fruit");
}
```

### Issue 18: Magic boolean in condition
**Description:** Hardcoded boolean in condition
```javascript
if (user.age > 18) {
  console.log("Adult");
}
```

### Issue 19: Not using guard clauses
**Description:** Nested if instead of early return
```javascript
function process(data) {
  if (data) {
    if (data.length > 0) {
      console.log(data[0]);
    }
  }
}
process([1, 2, 3]);
```

### Issue 20: Overly specific condition
**Description:** Redundant parts in condition
```javascript
let x = 5;
if (x === 5 || x === 6 || x === 7 || x === 8) {
  console.log("Between 5 and 8");
}
```

### Issue 21: Not using else-if for exclusive conditions
**Description:** Multiple ifs instead of else if
```javascript
let score = 75;
if (score >= 90) console.log("A");
if (score >= 80 && score < 90) console.log("B");
if (score >= 70 && score < 80) console.log("C");
```

### Issue 22: Using bitwise operator by mistake
**Description:** & instead of &&
```javascript
let a = 1, b = 2;
if (a & b) {
  console.log("Both truthy");
}
```

### Issue 23: Misplaced null check
**Description:** Null check after property access
```javascript
let user = {name: null};
console.log(user.name.length);
```

### Issue 24: Not using optional chaining
**Description:** Deep property access without guard
```javascript
let user = null;
console.log(user.profile.name);
```

### Issue 25: Using == for null checks
**Description:** Double equals for null
```javascript
let value = null;
if (value == null) {
  console.log("Null");
}
```

### Issue 26: Missing validation before processing
**Description:** Process without input validation
```javascript
function double(value) {
  return value * 2;
}
console.log(double("abc"));
```

### Issue 27: Impossible condition due to types
**Description:** Condition always false
```javascript
let x = "hello";
if (x === 5) {
  console.log("Never");
}
```

### Issue 28: Overusing default case fallback
**Description:** Default handling too broad
```javascript
switch (role) {
  case "admin":
    console.log("Admin");
    break;
  default:
    console.log("Unknown");
}
```

### Issue 29: Confusing else if formatting
**Description:** Bad formatting of else if
```javascript
if (a) {
  console.log("A");
}
else if (b) {
  console.log("B");
}
```

### Issue 30: Using if for type coercion check
**Description:** Check type before comparison
```javascript
let value = "5";
if (typeof value === "string") {
  let num = Number(value);
  if (num === 5) {
    console.log("Is 5");
  }
}
```

## Modifications

### Modify 1: Add validation before processing
**Description:** Check if input is valid number
```javascript
function double(value) {
  return value * 2;
}
console.log(double("abc"));
```

### Modify 2: Add input type check
**Description:** Verify input is a string before calling method
```javascript
function upperCase(input) {
  return input.toUpperCase();
}
console.log(upperCase(42));
```

### Modify 3: Add fallback for null values
**Description:** Provide default if user is null
```javascript
let user = null;
console.log("Hello " + user.name);
```

### Modify 4: Add range validation
**Description:** Check if age is between 0 and 150
```javascript
let age = 200;
console.log("Age:", age);
```

### Modify 5: Use ternary for simple assignment
**Description:** Convert if-else to ternary
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

### Modify 6: Add empty string check
**Description:** Check if name is empty before greeting
```javascript
let name = "";
console.log("Hello " + name);
```

### Modify 7: Add array empty check
**Description:** Check if items array is empty
```javascript
let items = [];
console.log("Items count:", items.length);
```

### Modify 8: Use guard clause
**Description:** Return early if input is invalid
```javascript
function process(input) {
  if (input) {
    return input.toUpperCase();
  }
  return null;
}
console.log(process(null));
```

### Modify 9: Use switch for multiple values
**Description:** Convert if-else chain to switch
```javascript
let day = 3;
if (day === 1) console.log("Mon");
else if (day === 2) console.log("Tue");
else if (day === 3) console.log("Wed");
```

### Modify 10: Use includes for OR chain
**Description:** Simplify multiple OR conditions
```javascript
let color = "red";
if (color === "red" || color === "blue" || color === "green") {
  console.log("Primary");
}
```

### Modify 11: Add not-a-number check
**Description:** Check if result is NaN
```javascript
let result = 0 / 0;
console.log("Result:", result);
```

### Modify 12: Add division by zero check
**Description:** Check denominator before division
```javascript
let a = 10, b = 0;
console.log(a / b);
```

### Modify 13: Use default parameter
**Description:** Set default for function parameter
```javascript
function greet(name) {
  console.log("Hello " + name);
}
greet();
```

### Modify 14: Use nullish coalescing
**Description:** Use ?? instead of ||
```javascript
let count = 0;
let display = count || "No items";
console.log(display);
```

### Modify 15: Use optional chaining
**Description:** Safe nested property access
```javascript
let user = null;
console.log(user.profile.name);
```

### Modify 16: Add positive number check
**Description:** Ensure number is positive
```javascript
let num = -5;
console.log("Square root:", Math.sqrt(num));
```

### Modify 17: Add integer check
**Description:** Verify value is integer
```javascript
let val = 5.5;
if (val % 1 === 0) {
  console.log("Integer");
}
```

### Modify 18: Add length validation
**Description:** Check string length before accessing
```javascript
let str = "Hi";
console.log(str[10]);
```

### Modify 19: Convert to early return
**Description:** Use guard clauses instead of nesting
```javascript
function check(num) {
  if (num > 0) {
    if (num < 100) {
      return "In range";
    }
  }
  return "Out of range";
}
console.log(check(50));
```

### Modify 20: Add truthiness check
**Description:** Check if value is truthy
```javascript
let value = "";
console.log(value.toUpperCase());
```

### Modify 21: Use else-if properly
**Description:** Fix exclusive conditions
```javascript
let score = 85;
if (score >= 90) console.log("A");
if (score >= 80) console.log("B");
if (score >= 70) console.log("C");
```

### Modify 22: Simplify boolean return
**Description:** Return condition directly
```javascript
function isEven(num) {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
console.log(isEven(4));
```

### Modify 23: Add boundary check for array
**Description:** Validate index before accessing
```javascript
let arr = [10, 20, 30];
let index = 5;
console.log(arr[index]);
```

### Modify 24: Use switch with default
**Description:** Add default case to switch
```javascript
let status = "unknown";
switch (status) {
  case "active":
    console.log("Active");
    break;
  case "inactive":
    console.log("Inactive");
    break;
}
```

### Modify 25: Add null check before property access
**Description:** Guard against null object
```javascript
let config = null;
console.log(config.theme);
```

### Modify 26: Use AND short-circuit
**Description:** Conditionally call function
```javascript
let isReady = true;
if (isReady) {
  startGame();
}
```

### Modify 27: Use OR short-circuit for default
**Description:** Provide default with OR
```javascript
let username = "Admin";
let display = username;
console.log("Hello " + display);
```

### Modify 28: Check for undefined
**Description:** Guard against undefined
```javascript
let data;
console.log(data.value);
```

### Modify 29: Add minimum value check
**Description:** Ensure value is at least 0
```javascript
let price = -10;
console.log("Price:", price);
```

### Modify 30: Use === instead of ==
**Description:** Strict equality for safety
```javascript
let input = "5";
if (input == 5) {
  console.log("Equal");
}
```

### Modify 31: Add fallback for empty object
**Description:** Check if object has properties
```javascript
let obj = {};
console.log("Keys:", Object.keys(obj));
```

### Modify 32: Use Array.isArray check
**Description:** Verify value is array before iteration
```javascript
let data = "not-array";
data.forEach(item => console.log(item));
```

### Modify 33: Add fallback for array methods
**Description:** Check array exists before calling forEach
```javascript
let items = null;
items.forEach(item => console.log(item));
```

### Modify 34: Check function exists before calling
**Description:** Guard against undefined callback
```javascript
function execute(callback) {
  callback();
}
execute(null);
```

### Modify 35: Use includes for substring check
**Description:** Check if string contains substring
```javascript
let str = "JavaScript";
if (str.indexOf("Script") !== -1) {
  console.log("Contains Script");
}
```

### Modify 36: Add type guard for number operations
**Description:** Check typeof before math
```javascript
let value = "abc";
console.log(value * 2);
```

### Modify 37: Handle negative array index
**Description:** Convert negative index to positive
```javascript
let arr = [1, 2, 3, 4, 5];
let index = -1;
console.log(arr[index]);
```

### Modify 38: Add fallback for missing array element
**Description:** Provide default if element missing
```javascript
let arr = [1, 2];
console.log(arr[5]);
```

### Modify 39: Validate string is not all spaces
**Description:** Check if string has content
```javascript
let input = "   ";
console.log("Input:", input);
```

### Modify 40: Check for finite number
**Description:** Ensure number is finite
```javascript
let result = 1 / 0;
console.log("Result:", result);
```

### Modify 41: Use switch with multiple cases same output
**Description:** Group switch cases for same result
```javascript
let day = 6;
if (day === 6 || day === 7) {
  console.log("Weekend");
}
```

### Modify 42: Add maximum value cap
**Description:** Limit value to maximum
```javascript
let speed = 200;
console.log("Speed:", speed);
```

### Modify 43: Add minimum value floor
**Description:** Ensure value not below minimum
```javascript
let temperature = -50;
console.log("Temp:", temperature);
```

### Modify 44: Check object property exists
**Description:** Verify property before access
```javascript
let user = {name: "John"};
console.log(user.age.toFixed(2));
```

### Modify 45: Use hasOwnProperty check
**Description:** Check own property vs inherited
```javascript
let obj = {a: 1};
console.log("toString" in obj);
```

### Modify 46: Add multiple condition check function
**Description:** Extract complex condition to function
```javascript
if (age >= 18 && age <= 65 && hasLicense) {
  console.log("Can drive");
}
```

### Modify 47: Add check for valid date
**Description:** Verify date is valid before formatting
```javascript
let date = new Date("invalid");
console.log(date.toISOString());
```

### Modify 48: Add minimum array length check
**Description:** Ensure array has enough elements
```javascript
let arr = [1];
console.log(arr[3]);
```

### Modify 49: Use Number.isNaN over isNaN
**Description:** Check for NaN without type coercion
```javascript
let val = NaN;
if (isNaN(val)) {
  console.log("NaN");
}
```

### Modify 50: Check for empty object keys
**Description:** Object with no own properties
```javascript
let obj = {};
if (obj) {
  console.log("Has content");
}
```
