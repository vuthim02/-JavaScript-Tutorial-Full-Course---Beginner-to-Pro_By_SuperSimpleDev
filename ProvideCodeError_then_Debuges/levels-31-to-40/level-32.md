# Level 32: Return Values & Function Expressions

## Error Snippets (1-70)

### Error 1: Missing return value in sum function
**Description:** Return the sum of all numbers in the array
```javascript
function sumArray(numbers) {
  let total = 0;
  for (let n of numbers) {
    total += n;
  }
}
```

### Error 2: Return statement with wrong variable
**Description:** Return the correct calculated value
```javascript
function double(x) {
  let result = x * 2;
  return x;
}
```

### Error 3: Function expression missing assignment
**Description:** Assign the function expression to a variable
```javascript
function(x, y) {
  return x - y;
}
```

### Error 4: Return inside if without else
**Description:** Return a default value when condition is false
```javascript
function isPositive(x) {
  if (x > 0) {
    return 'positive';
  }
}
```

### Error 5: Missing return in one code path
**Description:** Return 'odd' for odd numbers
```javascript
function evenOrOdd(n) {
  if (n % 2 === 0) {
    return 'even';
  }
}
```

### Error 6: Return statement with assignment
**Description:** Return the comparison result
```javascript
function isEqual(a, b) {
  return a = b;
}
```

### Error 7: Using return in forEach callback
**Description:** Use find instead of forEach to return early
```javascript
function findNumber(arr, target) {
  arr.forEach(n => {
    if (n === target) return n;
  });
  return null;
}
```

### Error 8: Unreachable code before return
**Description:** Move the return to the correct position
```javascript
function getMessage(name) {
  console.log('Processing ' + name);
  return 'Hello ' + name;
  let formatted = name.toUpperCase();
}
```

### Error 9: Function expression with wrong syntax
**Description:** Fix the function expression syntax
```javascript
let greet = function {
  console.log('Hi');
};
```

### Error 10: Named function expression called wrongly
**Description:** Call the function using its variable name
```javascript
let sayHi = function greet() {
  console.log('Hi!');
};

greet();
```

### Error 11: Returning object literal incorrectly
**Description:** Fix the return statement for an object literal
```javascript
function getPerson() {
  return
  { name: 'John', age: 30 };
}
```

### Error 12: Early return missing proper condition
**Description:** Add the correct condition for early return
```javascript
function divide(a, b) {
  if (b === 0) {
    return a / b;
  }
  return 'Cannot divide by zero';
}
```

### Error 13: For loop returns on first iteration
**Description:** Return after the loop completes
```javascript
function sumAll(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    return sum;
  }
}
```

### Error 14: Function expression with no parentheses invoked
**Description:** Call the function with parentheses
```javascript
let getValue = function() { return 42; };

let result = getValue;
```

### Error 15: Missing return in ternary inside arrow function
**Description:** Return the result of the ternary expression
```javascript
let max = (a, b) => {
  a > b ? a : b;
};
```

### Error 16: Double return statements
**Description:** Remove the duplicate return
```javascript
function check(n) {
  if (n > 0) {
    return 'positive';
    return 'very positive';
  }
  return 'non-positive';
}
```

### Error 17: Return with void expression
**Description:** Return the actual value instead
```javascript
function getConfig() {
  return void loadConfig();
}
```

### Error 18: Missing return in catch block
**Description:** Return a default value in the catch block
```javascript
function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.log('Error parsing');
  }
}
```

### Error 19: Return outside function body
**Description:** Move the return inside the function
```javascript
function buildMessage(name) {
  let msg = 'Hello ' + name;
}

return msg;
```

### Error 20: Function returning itself not its result
**Description:** Call the function recursively
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial;
}
```

### Error 21: Wrong parameter order in function expression
**Description:** Swap the parameter order
```javascript
let divide = function(b, a) {
  return a / b;
};

divide(10, 2);
```

### Error 22: Function expression in wrong scope
**Description:** Define the function before calling it
```javascript
run();

var run = function() {
  console.log('running');
};
```

### Error 23: Return statement with or instead of ||
**Description:** Use the logical OR operator
```javascript
function getDefault(val) {
  return val or 'default';
}
```

### Error 24: Function expression with let hoisting issue
**Description:** Move the call after the definition
```javascript
console.log(double(5));

let double = function(x) {
  return x * 2;
};
```

### Error 25: Missing return value for recursive case
**Description:** Return the result of the recursive call
```javascript
function countdown(n) {
  if (n <= 0) {
    console.log('Done');
    return;
  }
  console.log(n);
  countdown(n - 1);
}
```

### Error 26: Arrow function returning object without parens
**Description:** Wrap the object in parentheses
```javascript
let getPerson = () => { name: 'John', age: 30 };
```

### Error 27: Function returning undefined explicitly
**Description:** Remove the explicit undefined return
```javascript
function getFive() {
  return undefined;
  return 5;
}
```

### Error 28: Using return as a function
**Description:** Use return as a statement, not a function
```javascript
function double(x) {
  return(x * 2);
}
```

### Error 29: Returning too early before computation
**Description:** Move the return after the computation
```javascript
function processData(data) {
  return data;
  let cleaned = data.trim();
  let upper = cleaned.toUpperCase();
  return upper;
}
```

### Error 30: Missing return in arrow function with block body
**Description:** Add return statement to the arrow function with block body
```javascript
let isEven = (n) => {
  n % 2 === 0;
};
```

### Error 31: Function expression with method called incorrectly
**Description:** Call the method on the right object
```javascript
let obj = {
  greet: function() { return 'Hi'; }
};

let fn = obj.greet;
fn();
```

### Error 32: Missing arguments in function call
**Description:** Pass all required arguments
```javascript
function power(base, exponent) {
  return Math.pow(base, exponent);
}

let result = power(2);
```

### Error 33: Return inside switch without break confusion
**Description:** Return only the matched case value
```javascript
function getDayName(n) {
  switch (n) {
    case 1:
      return 'Monday';
      break;
    case 2:
      return 'Tuesday';
      break;
    default:
      return 'Unknown';
  }
}
```

### Error 34: Semicolon after function expression
**Description:** Remove the semicolon before the parentheses
```javascript
let getData = function() {
  return [1, 2, 3];
}();
```

### Error 35: Rest parameter not last
**Description:** Move the rest parameter to the end
```javascript
function logItems(...items, prefix) {
  items.forEach(item => console.log(prefix + item));
}
```

### Error 36: Default parameter using itself
**Description:** Fix the default parameter expression
```javascript
function factorial(n = factorial(n - 1)) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

### Error 37: Returning string instead of number
**Description:** Return a number from the function
```javascript
function getAge() {
  return '25';
}
```

### Error 38: Confusing return with console.log
**Description:** Return the value instead of logging it
```javascript
function getPi() {
  console.log(3.14159);
}
```

### Error 39: Function expression with no body
**Description:** Add the function body with a return statement
```javascript
let add = function(a, b);
```

### Error 40: Passing function result to wrong place
**Description:** Call the function before using its result
```javascript
function getData() {
  return [1, 2, 3];
}

let first = getData[0];
```

### Error 41: Missing parentheses in function call inside another call
**Description:** Call both functions with parentheses
```javascript
function getFn() {
  return function() { return 42; };
}

let result = getFn()();
```

### Error 42: Return with newline before expression
**Description:** Put the expression on the same line as return
```javascript
function getValue() {
  return
    42;
}
```

### Error 43: Function not returning aggregated result
**Description:** Return the accumulated result after the loop
```javascript
function joinStrings(arr) {
  let result = '';
  for (let s of arr) {
    result += s;
  }
}
```

### Error 44: Recursive function missing return in all paths
**Description:** Add return for the base case too
```javascript
function sumTo(n) {
  if (n <= 1) {
    1;
  } else {
    return n + sumTo(n - 1);
  }
}
```

### Error 45: Callback function not returning value
**Description:** Return the mapped value in the callback
```javascript
function doubleAll(arr) {
  return arr.map(n => {
    n * 2;
  });
}
```

### Error 46: Passing undefined instead of function
**Description:** Pass the actual function reference
```javascript
function execute(fn) {
  if (typeof fn === 'function') {
    fn();
  }
}

execute(undefined);
```

### Error 47: Return in ternary with wrong syntax
**Description:** Fix the ternary syntax in the return statement
```javascript
function min(a, b) {
  return a < b ? return a : return b;
}
```

### Error 48: Function expression as object method missing return
**Description:** Return the computed value
```javascript
let calculator = {
  sum: function(a, b) {
    a + b;
  }
};
```

### Error 49: Chain function calls with missing return
**Description:** Return the object for chaining
```javascript
let counter = {
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  }
};

counter.increment().decrement();
```

### Error 50: Return inside map callback not used
**Description:** Store the mapped result
```javascript
function squareAll(arr) {
  arr.map(n => n * n);
}
```

### Error 51: Missing return in function called for its result
**Description:** Return the processed string
```javascript
function cleanString(str) {
  let cleaned = str.trim().toLowerCase();
}

let result = cleanString('  HELLO  ');
```

### Error 52: Function returning parameter that was mutated
**Description:** Return a copy instead of the original
```javascript
function addItem(arr, item) {
  arr.push(item);
  return arr;
}

let original = [1, 2, 3];
let result = addItem(original, 4);
```

### Error 53: Wrong comparison in condition for return
**Description:** Use strict equality operator
```javascript
function isStrictEqual(a, b) {
  return a == b;
}
```

### Error 54: Nested function returning to wrong scope
**Description:** Return the nested function result from outer function
```javascript
function outer() {
  function inner() {
    return 'secret';
  }
  inner();
}

let value = outer();
```

### Error 55: Missing return in filter predicate
**Description:** Return the comparison result in the predicate
```javascript
function getAdults(users) {
  return users.filter(user => {
    user.age >= 18;
  });
}
```

### Error 56: Returning too many values without structure
**Description:** Use an object to return multiple values
```javascript
function getMinMax(arr) {
  return Math.min(...arr), Math.max(...arr);
}
```

### Error 57: Wrong variable returned
**Description:** Return the computed result variable
```javascript
function buildGreeting(name) {
  let greeting = 'Hello, ';
  let message = greeting + name;
  return greeting;
}
```

### Error 58: Return statement with comma expression
**Description:** Return only the last expression in a valid way
```javascript
function getValues() {
  return (1, 2, 3);
}
```

### Error 59: Function expression called before declaration with const
**Description:** Move the call after the function expression
```javascript
let result = multiply(3, 4);

const multiply = function(a, b) {
  return a * b;
};
```

### Error 60: Condition always returns the same value
**Description:** Return the actual comparison result
```javascript
function isLongerThan(str, len) {
  if (str.length > len) {
    return true;
  }
  if (str.length <= len) {
    return false;
  }
}
```

### Error 61: Return with prefix increment confusion
**Description:** Return the value before incrementing
```javascript
function getAndIncrement(counter) {
  return ++counter;
}
```

### Error 62: Calling function without parentheses in if condition
**Description:** Call the function with parentheses
```javascript
function isEmpty(arr) {
  return arr.length === 0;
}

let list = [];
if (isEmpty) {
  console.log('empty');
}
```

### Error 63: Function return value not assigned
**Description:** Assign the return value to a variable
```javascript
function getConfig() {
  return { theme: 'dark' };
}

getConfig();
```

### Error 64: Wrong return type for expected string
**Description:** Return a string instead of an object
```javascript
function getGreeting(name) {
  return { text: 'Hello ' + name };
}
```

### Error 65: Return after throw
**Description:** Remove the unreachable return after throw
```javascript
function validate(n) {
  if (n < 0) {
    throw new Error('Negative');
    return false;
  }
  return true;
}
```

### Error 66: Using return instead of throw for errors
**Description:** Use throw for actual errors
```javascript
function divide(a, b) {
  if (b === 0) {
    return new Error('Cannot divide');
  }
  return a / b;
}
```

### Error 67: Function returns a function but not called
**Description:** Call the returned function
```javascript
function getAdder() {
  return function(x) { return x + 1; };
}

let addOne = getAdder;
let result = addOne(5);
```

### Error 68: Return with spread incorrectly used
**Description:** Return the array properly
```javascript
function mergeArrays(a, b) {
  return ...a, ...b;
}
```

### Error 69: Missing return in reduce callback
**Description:** Return the accumulator in the reduce callback
```javascript
function sum(numbers) {
  return numbers.reduce((acc, n) => {
    acc + n;
  }, 0);
}
```

### Error 70: Wrong argument passed to recursive call
**Description:** Pass the correct decremented value
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n + 1);
}
```

## Issue Snippets (1-30)

### Issue 1: Function with side effects masking as pure
**Description:** Remove the side effect from this calculation function
```javascript
let cache = {};

function compute(n) {
  if (cache[n]) return cache[n];
  let result = n * n;
  cache[n] = result;
  return result;
}
```

### Issue 2: Return type inconsistency for missing values
**Description:** Return 0 instead of null for missing length
```javascript
function getLength(arr) {
  if (!arr) {
    return null;
  }
  return arr.length;
}
```

### Issue 3: Too many conditional returns
**Description:** Use a lookup object instead of multiple if statements
```javascript
function getColorCode(color) {
  if (color === 'red') return '#ff0000';
  if (color === 'green') return '#00ff00';
  if (color === 'blue') return '#0000ff';
  if (color === 'yellow') return '#ffff00';
  return '#000000';
}
```

### Issue 4: Function only used once
**Description:** Inline the function where it is used
```javascript
function isPositive(n) {
  return n > 0;
}

let numbers = [1, -2, 3];
let positives = numbers.filter(isPositive);
```

### Issue 5: Function with unnecessary intermediate variable
**Description:** Return the expression directly
```javascript
function add(a, b) {
  let sum = a + b;
  return sum;
}
```

### Issue 6: Function that logs and returns the same value
**Description:** Either log or return, not both
```javascript
function getMessage(name) {
  let msg = 'Hello ' + name;
  console.log(msg);
  return msg;
}
```

### Issue 7: Function with complex ternary nesting
**Description:** Use if-else for better readability
```javascript
function status(age) {
  return age < 0 ? 'invalid' : age < 13 ? 'child' : age < 20 ? 'teen' : age < 65 ? 'adult' : 'senior';
}
```

### Issue 8: Redundant condition in return
**Description:** Return the boolean expression directly
```javascript
function isEven(n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
```

### Issue 9: Function uses eval
**Description:** Use a lookup or direct property access instead
```javascript
function getValue(obj, key) {
  return eval('obj.' + key);
}
```

### Issue 10: Function mutates array parameter and returns it
**Description:** Return a new array without mutation
```javascript
function removeLast(arr) {
  arr.pop();
  return arr;
}
```

### Issue 11: Function with unused parameter
**Description:** Use the parameter or remove it
```javascript
function formatDate(date, format) {
  return date.toISOString();
}
```

### Issue 12: Function reassigning its parameter
**Description:** Use a new variable instead of reassigning the parameter
```javascript
function discount(price, percent) {
  price = price * (1 - percent / 100);
  return price;
}
```

### Issue 13: Function with unreachable branch
**Description:** Remove the impossible condition
```javascript
function check(x) {
  if (x > 0) {
    return 'positive';
  } else if (x > 100) {
    return 'large positive';
  }
  return 'non-positive';
}
```

### Issue 14: Using return with new Object()
**Description:** Return an object literal instead
```javascript
function createPoint(x, y) {
  return new Object({ x, y });
}
```

### Issue 15: Function with hardcoded values
**Description:** Make the divisor a parameter with default
```javascript
function percentage(value) {
  return value / 100;
}
```

### Issue 16: Function missing early exit for invalid input
**Description:** Add an early return for invalid input
```javascript
function getFirst(arr) {
  return arr[0];
}
```

### Issue 17: Function using == instead of ===
**Description:** Use strict equality
```javascript
function findItem(items, target) {
  return items.filter(item => item == target);
}
```

### Issue 18: Return statement on separate line from condition
**Description:** Combine the condition and return
```javascript
function isAdult(age) {
  if (age >= 18) {
    return true;
  }
  return false;
}
```

### Issue 19: Function with deeply nested conditions
**Description:** Flatten the conditions with early returns
```javascript
function validateUser(user) {
  if (user) {
    if (user.name) {
      if (user.name.length > 2) {
        if (user.age) {
          return true;
        }
      }
    }
  }
  return false;
}
```

### Issue 20: Function returning magic string
**Description:** Define error messages as constants
```javascript
function validateAge(age) {
  if (age < 0) return 'Age cannot be negative';
  if (age > 150) return 'Age cannot exceed 150';
  return 'Valid';
}
```

### Issue 21: Function modifies global from inside
**Description:** Return the value instead of modifying global
```javascript
let result = 0;

function calculate(a, b) {
  result = a + b;
}
```

### Issue 22: Variable name hides function name
**Description:** Use a different variable name
```javascript
function getData() {
  return [1, 2, 3];
}

let getData = getData();
```

### Issue 23: Function returning void expression
**Description:** Return the actual result
```javascript
function executeAndReturn(fn) {
  return void fn();
}
```

### Issue 24: Too many parameters with no defaults
**Description:** Use an options object with defaults
```javascript
function createLink(url, text, target, rel, className, id, style) {
  return { url, text, target, rel, className, id, style };
}
```

### Issue 25: Function uses arguments object instead of rest
**Description:** Use rest parameter for better readability
```javascript
function concatenate() {
  return Array.from(arguments).join('');
}
```

### Issue 26: Return value not used by caller
**Description:** Use the return value or make function void
```javascript
function calculateTotal(items) {
  let total = 0;
  items.forEach(item => total += item.price);
  return total;
}

calculateTotal(cart);
```

### Issue 27: Function name does not indicate return type
**Description:** Rename to indicate it returns a boolean
```javascript
function ageCheck(age) {
  return age >= 18;
}
```

### Issue 28: Function returning promise without handling
**Description:** Add .then or await to handle the promise
```javascript
function fetchUser(id) {
  return fetch('/users/' + id).then(r => r.json());
}

let user = fetchUser(1);
```

### Issue 29: Side effect inside a computed property function
**Description:** Remove the side effect
```javascript
function getDisplayName(user) {
  console.log('Getting display name');
  return user.firstName + ' ' + user.lastName;
}
```

### Issue 30: Function with 100% branch coverage missing
**Description:** Add a branch for the boundary case
```javascript
function classify(n) {
  if (n > 0) return 'positive';
  if (n < 0) return 'negative';
}
```

## Modification Snippets (1-50)

### Modify 1: Add return value to function
**Description:** Return the concatenated string
```javascript
function greet(name) {
  'Hello, ' + name;
}
```

### Modify 2: Add default parameters
**Description:** Add default values for both parameters
```javascript
function createMessage(text, author) {
  return { text, author };
}
```

### Modify 3: Refactor to arrow function
**Description:** Convert to arrow function with implicit return
```javascript
let sum = function(a, b) {
  return a + b;
};
```

### Modify 4: Add early return for validation
**Description:** Return 'Invalid' if input is not a number
```javascript
function square(x) {
  return x * x;
}
```

### Modify 5: Return object instead of multiple variables
**Description:** Return an object with name and age properties
```javascript
function getPerson() {
  let name = 'Alice';
  let age = 30;
}
```

### Modify 6: Add caching to function
**Description:** Cache results in a Map to avoid recomputation
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### Modify 7: Convert function declaration to expression
**Description:** Use const with function expression
```javascript
function multiply(a, b) {
  return a * b;
}
```

### Modify 8: Add array parameter validation
**Description:** Return empty array if argument is not an array
```javascript
function reverseArray(arr) {
  return arr.slice().reverse();
}
```

### Modify 9: Add string parameter validation
**Description:** Return empty string if argument is not a string
```javascript
function toUpper(str) {
  return str.toUpperCase();
}
```

### Modify 10: Refactor to use arrow with block body
**Description:** Convert to arrow function with explicit return (keep block body)
```javascript
let max = function(a, b) {
  if (a > b) return a;
  return b;
};
```

### Modify 11: Add merged default options
**Description:** Merge user options with default options
```javascript
function configure(options) {
  let defaults = { theme: 'light', lang: 'en' };
}
```

### Modify 12: Add accumulator to recursive function
**Description:** Use an accumulator parameter for tail recursion
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

### Modify 13: Add callback to handle result
**Description:** Accept a callback and call it with the result
```javascript
function processData(data) {
  let result = data.toUpperCase();
}
```

### Modify 14: Convert method to arrow function
**Description:** Replace the function expression with arrow function
```javascript
let obj = {
  double: function(x) {
    return x * 2;
  }
};
```

### Modify 15: Add error handling for edge case
**Description:** Return null if the array is empty
```javascript
function getLast(arr) {
  return arr[arr.length - 1];
}
```

### Modify 16: Add null check before processing
**Description:** Return null if input is null
```javascript
function trimString(str) {
  return str.trim();
}
```

### Modify 17: Refactor nested function
**Description:** Extract inner function to separate const arrow function
```javascript
function outer() {
  function inner(x) {
    return x * 2;
  }
  return inner(5);
}
```

### Modify 18: Add rest parameter
**Description:** Accept any number of arguments and return their product
```javascript
function multiply(a, b) {
  return a * b;
}
```

### Modify 19: Add function composition
**Description:** Create a compose function that applies f then g
```javascript
function compose(f, g) {
  return function(x) {
  };
}
```

### Modify 20: Add method chaining support
**Description:** Return this from each method for chaining
```javascript
let calculator = {
  value: 0,
  add(n) {
    this.value += n;
  },
  subtract(n) {
    this.value -= n;
  }
};
```

### Modify 21: Convert to pure function
**Description:** Remove side effect and return the result
```javascript
let total = 0;

function addToTotal(value) {
  total += value;
  return total;
}
```

### Modify 22: Add default value for nullish input
**Description:** Use nullish coalescing to default to 0
```javascript
function getValue(val) {
  return val;
}
```

### Modify 23: Fix the return type to be consistent
**Description:** Always return a number (convert string to number)
```javascript
function add(a, b) {
  return a + b;
}
```

### Modify 24: Add debounce to function
**Description:** Return a debounced version of the function
```javascript
function search(query) {
  console.log('Searching', query);
}
```

### Modify 25: Convert loop to reduce
**Description:** Use reduce instead of for loop
```javascript
function sum(numbers) {
  let total = 0;
  for (let n of numbers) {
    total += n;
  }
  return total;
}
```

### Modify 26: Add try-catch for JSON parse
**Description:** Wrap JSON.parse in try-catch and return null on error
```javascript
function parseJSON(str) {
  return JSON.parse(str);
}
```

### Modify 27: Add parameter whitelist
**Description:** Only allow specific keys in the config object
```javascript
function applyConfig(config) {
  return config;
}
```

### Modify 28: Convert to immediately invoked function expression
**Description:** Make it an IIFE that returns the config
```javascript
function getConfig() {
  return { api: 'https://example.com', timeout: 5000 };
}
```

### Modify 29: Add threshold clamping
**Description:** Clamp the value between 0 and 100
```javascript
function normalize(value) {
  return value;
}
```

### Modify 30: Add logging wrapper
**Description:** Log the arguments and return value
```javascript
function add(a, b) {
  return a + b;
}
```

### Modify 31: Convert to ternary return
**Description:** Use a ternary instead of if-else
```javascript
function max(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}
```

### Modify 32: Add memoization key generator
**Description:** Create a key from arguments for caching
```javascript
function expensive(a, b) {
  return a * b * 1000;
}
```

### Modify 33: Add async/await wrapper
**Description:** Wrap in async function with await
```javascript
function getData(url) {
  return fetch(url).then(r => r.json());
}
```

### Modify 34: Add retry logic
**Description:** Retry the function up to 3 times on failure
```javascript
function unstableOperation() {
  return Math.random() > 0.7 ? 'success' : 'fail';
}
```

### Modify 35: Add timeout to function
**Description:** Reject if the function takes longer than 1 second
```javascript
function slowOperation() {
  return new Promise(resolve => setTimeout(() => resolve('done'), 2000));
}
```

### Modify 36: Convert to generator function
**Description:** Use function* to yield values one by one
```javascript
function range(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
```

### Modify 37: Add validation guard clause
**Description:** Return early if input is falsy
```javascript
function processInput(input) {
  return input.trim().toUpperCase();
}
```

### Modify 38: Add parameter transform
**Description:** Convert the input to lowercase before using it
```javascript
function findByEmail(users, email) {
  return users.find(u => u.email === email);
}
```

### Modify 39: Add partial application support
**Description:** Return a function that takes the remaining arguments
```javascript
function add(a, b) {
  return a + b;
}
```

### Modify 40: Add __filename or metadata to function
**Description:** Add a source property to the function
```javascript
function helper() {
  return 'help';
}
```

### Modify 41: Fix the off-by-one error in loop
**Description:** Use the correct loop condition
```javascript
function createArray(n) {
  let result = [];
  for (let i = 1; i < n; i++) {
    result.push(i);
  }
  return result;
}
```

### Modify 42: Add custom error messages
**Description:** Throw a custom error with a descriptive message
```javascript
function requirePositive(n) {
  if (n < 0) {
    throw 'negative';
  }
  return n;
}
```

### Modify 43: Add coalescing chain
**Description:** Use optional chaining and nullish coalescing
```javascript
function getCity(user) {
  return user.address.city;
}
```

### Modify 44: Add performance measurement
**Description:** Measure and log the execution time
```javascript
function heavyComputation(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += i;
  }
  return result;
}
```

### Modify 45: Convert to function that returns a closure
**Description:** Return a function that multiplies by the given factor
```javascript
function multiply(factor) {
  return factor * 2;
}
```

### Modify 46: Add batch processing
**Description:** Process items in batches of given size
```javascript
function processItems(items) {
  items.forEach(item => console.log(item));
}
```

### Modify 47: Add value normalization
**Description:** Map the value from one range to another
```javascript
function scale(value) {
  return value;
}
```

### Modify 48: Add fallback chain
**Description:** Try multiple data sources in order
```javascript
function getData() {
  return localStorage.getItem('data');
}
```

### Modify 49: Add version check
**Description:** Compare the version string properly
```javascript
function isNewer(v1, v2) {
  return v1 > v2;
}
```

### Modify 50: Add plumbing for spread operator
**Description:** Accept an array and spread it as arguments
```javascript
function callWithSpread(fn) {
}
```
