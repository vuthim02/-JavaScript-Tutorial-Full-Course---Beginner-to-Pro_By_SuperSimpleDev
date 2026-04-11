# Module 7: Functions

**Duration:** ~42 minutes  
**Video Timestamp:** 03:34:12 - 04:15:45

## Learning Objectives

- Create and call functions
- Understand parameters and arguments
- Return values from functions
- Work with function scope
- Create arrow functions
- Understand callbacks

## What are Functions?

Functions are reusable blocks of code that perform a specific task. They help organize code and avoid repetition.

```javascript
// Function declaration
function greet() {
  console.log('Hello!');
}

// Call the function
greet();  // Outputs: Hello!
greet();  // Outputs: Hello!
```

## Function Declaration

### Basic Syntax

```javascript
function functionName() {
  // code to execute
}
```

### Example: Simple Greeting

```javascript
function sayHello() {
  console.log('Hello there!');
}

sayHello();  // Hello there!
```

## Parameters and Arguments

### Parameters: Variables in Function Definition

```javascript
function greet(name) {  // 'name' is a parameter
  console.log('Hello, ' + name + '!');
}

greet('Alice');  // Hello, Alice!
greet('Bob');    // Hello, Bob!
```

### Multiple Parameters

```javascript
function add(a, b) {  // 'a' and 'b' are parameters
  console.log(a + b);
}

add(5, 3);    // 8
add(10, 20);  // 30
```

### Default Parameters

```javascript
function greet(name = 'Guest') {
  console.log('Hello, ' + name + '!');
}

greet('Alice');  // Hello, Alice!
greet();         // Hello, Guest!
```

## Return Statements

Functions can return values using the `return` keyword:

```javascript
function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result);  // 8

// Or use directly
console.log(add(10, 20));  // 30
```

### Returning Early

```javascript
function processAge(age) {
  if (age < 0) {
    return 'Invalid age';
  }
  
  if (age < 18) {
    return 'Minor';
  }
  
  if (age < 65) {
    return 'Adult';
  }
  
  return 'Senior';
}

console.log(processAge(25));  // Adult
console.log(processAge(-5));   // Invalid age
```

### Functions Without Return

Functions without a return statement return `undefined`:

```javascript
function printMessage(message) {
  console.log(message);
}

let result = printMessage('Hello');
console.log(result);  // undefined
```

## Function Scope

### Local Variables

Variables declared inside a function are local to that function:

```javascript
function test() {
  let localVar = 'I am local';
  console.log(localVar);  // Works
}

test();
console.log(localVar);  // Error! localVar is not defined
```

### Global Variables

Variables declared outside functions are global:

```javascript
let globalVar = 'I am global';

function test() {
  console.log(globalVar);  // Works
}

test();
console.log(globalVar);  // Works
```

### Scope Example

```javascript
let name = 'Global';

function greet() {
  let name = 'Local';
  console.log(name);  // Local (local variable)
}

greet();
console.log(name);    // Global (global variable)
```

## Arrow Functions

Modern syntax for writing functions:

### Basic Arrow Function

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};
```

### Concise Arrow Functions

For single expressions, you can omit the braces and `return`:

```javascript
// Traditional
function square(n) {
  return n * n;
}

// Concise arrow
const square = n => n * n;

console.log(square(5));  // 25
```

### Arrow Functions with Multiple Parameters

```javascript
// Traditional
function multiply(a, b) {
  return a * b;
}

// Arrow
const multiply = (a, b) => a * b;

console.log(multiply(4, 5));  // 20
```

### Arrow Functions with Single Parameter

Parentheses optional when there's only one parameter:

```javascript
const double = n => n * 2;
const greet = name => `Hello, ${name}!`;

console.log(double(5));       // 10
console.log(greet('Alice')); // Hello, Alice!
```

## Callback Functions

Functions can be passed as arguments to other functions:

### Passing Functions as Arguments

```javascript
function greet(name) {
  console.log('Hello, ' + name);
}

function processUser(callback) {
  let name = 'Alice';
  callback(name);
}

processUser(greet);  // Hello, Alice
```

### Anonymous Functions

You can define functions inline:

```javascript
processUser(function(name) {
  console.log('Hi, ' + name);
});

// Or with arrow syntax
processUser(name => console.log('Hi, ' + name));
```

### Practical Example: forEach

```javascript
const numbers = [1, 2, 3];

numbers.forEach(function(num) {
  console.log(num);
});

// Arrow version
numbers.forEach(num => console.log(num));
```

## Higher-Order Functions

Functions that take other functions as arguments or return functions:

### Function That Returns a Function

```javascript
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(createMultiplier(4)(5));  // 20
```

### Function That Takes a Function

```javascript
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const result = applyOperation(5, 3, (a, b) => a + b);
console.log(result);  // 8
```

## Function Expressions

You can assign functions to variables:

```javascript
// Function expression
const sayHello = function() {
  return 'Hello!';
};

console.log(sayHello());  // Hello!

// Arrow function expression
const sayHi = () => 'Hi!';

console.log(sayHi());  // Hi!
```

## Practical Examples

### Calculator Function

```javascript
function calculate(a, b, operator) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Cannot divide by zero';
    default: return 'Invalid operator';
  }
}

console.log(calculate(10, 5, '+'));  // 15
console.log(calculate(10, 5, '*'));  // 50
console.log(calculate(10, 0, '/'));   // Cannot divide by zero
```

### Validation Functions

```javascript
function isEmail(email) {
  return email.includes('@') && email.includes('.');
}

function isValidAge(age) {
  return typeof age === 'number' && age >= 0 && age <= 150;
}

function validateUser(name, email, age) {
  if (!name || name.length < 2) {
    return 'Invalid name';
  }
  if (!isEmail(email)) {
    return 'Invalid email';
  }
  if (!isValidAge(age)) {
    return 'Invalid age';
  }
  return 'Valid user!';
}

console.log(validateUser('Jo', 'invalid', 25));    // Invalid name
console.log(validateUser('John', 'bad', 25));       // Invalid email
console.log(validateUser('John', 'john@test.com', 25)); // Valid user!
```

### String Manipulation Functions

```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(reverseString('hello'));      // olleh
console.log(countWords('Hello World'));   // 2
console.log(capitalizeFirst('hello'));    // Hello
```

## Function Best Practices

### Single Responsibility

Each function should do one thing:

```javascript
// Bad - too many responsibilities
function processUser(user) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
  logActivity(user);
}

// Good - separate functions
function validateUser(user) { /* ... */ }
function saveUser(user) { /* ... */ }
function notifyUser(user) { /* ... */ }
```

### Naming Functions

Use descriptive verb-based names:

```javascript
// Good
function calculateTotal(items) { }
function validateEmail(email) { }
function fetchUserData(id) { }

// Bad
function total(items) { }
function check(email) { }
function get(id) { }
```

## Practice Exercises

### Exercise 7.1: Temperature Converter
Create functions to convert between Celsius and Fahrenheit.

```javascript
function celsiusToFahrenheit(celsius) {
  return celsius * 9/5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

console.log(celsiusToFahrenheit(0));    // 32
console.log(celsiusToFahrenheit(100));   // 212
console.log(fahrenheitToCelsius(32));   // 0
console.log(fahrenheitToCelsius(212));  // 100
```

### Exercise 7.2: Factorial
Calculate the factorial of a number.

```javascript
function factorial(n) {
  if (n < 0) return undefined;
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120 (5 * 4 * 3 * 2 * 1)
console.log(factorial(0));  // 1
console.log(factorial(1)); // 1
```

### Exercise 7.3: Callback Practice
Create a function that applies a callback to each element.

```javascript
function processArray(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];

// Double each number
console.log(processArray(numbers, n => n * 2));  // [2, 4, 6, 8, 10]

// Square each number
console.log(processArray(numbers, n => n ** 2)); // [1, 4, 9, 16, 25]

// Convert to strings
console.log(processArray(numbers, n => 'Num: ' + n)); // ['Num: 1', ...]
```

### Exercise 7.4: Grade Calculator
Create a function that returns a grade based on score.

```javascript
function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function getAverage(scores) {
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

function getSummary(scores) {
  const avg = getAverage(scores);
  return `Average: ${avg.toFixed(2)}, Grade: ${getGrade(avg)}`;
}

console.log(getSummary([85, 90, 78, 92, 88]));  // Average: 86.60, Grade: B
```

## Summary

- Functions are reusable blocks of code
- Use `function` keyword or arrow syntax to create functions
- Parameters are function inputs, arguments are actual values
- Use `return` to send back values
- Arrow functions provide concise syntax: `() => {}`
- Functions can be passed as arguments (callbacks)
- Each function has its own scope

## Prevouse

[Proceed to Module 6](../06-booleans-if-statements/README.md)
## Next Steps

[Proceed to Module 8](../08-objects/README.md): Objects to learn about JavaScript's object system.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)