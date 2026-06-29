# Module 5: Variables

**Duration:** ~42 minutes  
**Video Timestamp:** 01:51:06 - 02:32:55

## Learning Objectives

- Understand what variables are
- Declare variables using let, const, and var
- Choose appropriate variable names
- Update and modify variable values
- Understand variable scope

## What are Variables?

Variables are containers for storing data values. Think of them as labeled boxes where you can put information and retrieve it later.

```javascript
let message = 'Hello!';
console.log(message);  // Hello!

message = 'Hi there!';
console.log(message);  // Hi there!
```

## Declaring Variables

### Using `let`

`let` declares a variable that can be reassigned:

```javascript
let age = 25;
console.log(age);  // 25

age = 26;
console.log(age);  // 26
```

### Using `const`

`const` declares a constant that cannot be reassigned:

```javascript
const PI = 3.14159;
console.log(PI);  // 3.14159

PI = 3.14;  // Error! Cannot reassign a constant
```

### Using `var` (Legacy)

`var` is the old way to declare variables. Avoid using it in modern JavaScript:

```javascript
var name = 'John';
console.log(name);  // John

var name = 'Jane';  // This actually works (but don't do this!)
console.log(name);  // Jane
```

## When to Use let vs const

**Use `const` by default** - It prevents accidental reassignment and makes code more predictable.

**Use `let` when you need to reassign** - For counters, accumulating values, or changing states.

```javascript
// Use const when the value shouldn't change
const GRAVITY = 9.8;
const SITE_NAME = 'My Website';
const MAX_ITEMS = 100;

// Use let when the value will change
let score = 0;
score = score + 10;  // Updating score
let userInput = getUserInput();
userInput = userInput.toUpperCase();  // Transforming
```

## Variable Naming Rules

### Valid Variable Names

```javascript
let name = 'John';           // Lowercase
let userName = 'John';       // CamelCase
let user_name = 'John';      // snake_case
let age2 = 30;               // Can include numbers (not at start)
let _private = 'hidden';     // Can start with underscore
let $element = 'DOM';        // Can start with dollar sign
```

### Invalid Variable Names

```javascript
// let 2name = 'John';      // Cannot start with number
// let my-var = 'test';     // Cannot use hyphens
// let my var = 'test';      // Cannot use spaces
// let class = 'test';       // Cannot use reserved words
```

### JavaScript Reserved Words

```
break, case, catch, continue, debugger, default, delete, do, else, 
export, extends, finally, for, function, if, import, in, instanceof, 
new, return, super, switch, this, throw, try, typeof, var, void, 
while, with, yield, let, const, class, enum, const, enum
```

## Naming Conventions

### CamelCase (Recommended for JavaScript)

```javascript
let firstName = 'John';
let lastName = 'Doe';
let dateOfBirth = '1990-01-01';
let isLoggedIn = true;
```

### Descriptive Names

```javascript
// Bad
let x = 10;
let d = new Date();

// Good
let score = 10;
let currentDate = new Date();
```

## Updating Variables

### Direct Assignment

```javascript
let count = 0;
count = 1;
count = 2;
console.log(count);  // 2
```

### Update Based on Current Value

```javascript
let score = 10;
score = score + 5;   // score is now 15
score += 5;          // score is now 20 (shorthand)

let bonus = 3;
score += bonus;       // score is now 23

let multiplier = 2;
score *= multiplier; // score is now 46
```

### Increment and Decrement

```javascript
let likes = 0;
likes++;              // likes is now 1 (increment by 1)
likes++;              // likes is now 2
likes--;              // likes is now 1 (decrement by 1)

console.log(likes++); // Prints 1, then likes becomes 2
console.log(likes);    // 2

console.log(++likes); // likes becomes 3, then prints 3
```

### Shorthand Operators

```javascript
let x = 10;

x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x %= 5;   // x = x % 5  → 1
x **= 2;  // x = x ** 2 → 1
```

## Variable Scope

### Global Scope

Variables declared outside functions are globally accessible:

```javascript
let globalVar = 'I am global';

function test() {
  console.log(globalVar);  // Accessible
}
```

### Local Scope (Function)

Variables declared inside a function with `var`:

```javascript
function test() {
  var localVar = 'I am local';
  console.log(localVar);  // Works
}
console.log(localVar);     // Error! Not accessible
```

### Block Scope

Variables declared with `let` and `const` are block-scoped:

```javascript
if (true) {
  let blockVar = 'Inside block';
  const alsoBlock = 'Me too';
  console.log(blockVar);   // Works
}
console.log(blockVar);     // Error! Not accessible
```

### Hoisting

`var` is hoisted (moved to top of scope), `let` and `const` are not:

```javascript
console.log(hoistedVar);   // undefined (not error)
var hoistedVar = 'I am hoisted';

console.log(notHoisted);    // ReferenceError!
let notHoisted = 'I am not hoisted';
```

## Constants

### Why Use Constants?

1. Prevent accidental changes
2. Make code more readable
3. Help JavaScript optimize code

### Math Constants

```javascript
const PI = 3.14159265359;
const E = 2.71828182845;
const SQRT2 = 1.41421356237;

let radius = 5;
let circumference = 2 * PI * radius;
console.log(circumference);  // 31.4159...
```

### Configuration Constants

```javascript
const API_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de'];
```

## Working with Strings and Variables

### String Concatenation

```javascript
let firstName = 'John';
let lastName = 'Doe';

let fullName = firstName + ' ' + lastName;
console.log(fullName);  // John Doe
```

### String Templates (Template Literals)

```javascript
let firstName = 'John';
let lastName = 'Doe';
let age = 30;

// Much cleaner than concatenation!
let message = `My name is ${firstName} ${lastName} and I am ${age} years old.`;
console.log(message);
// My name is John Doe and I am 30 years old.
```

### Dynamic Strings

```javascript
let item = 'Apple';
let price = 1.99;
let quantity = 5;
let total = price * quantity;

let receipt = `Item: ${item}
Price: $${price}
Quantity: ${quantity}
Total: $${total.toFixed(2)}`;

console.log(receipt);
```

## Type Coercion

JavaScript automatically converts between types in some cases:

### Implicit Coercion

```javascript
console.log('5' - 3);    // 2 (string to number)
console.log('5' + 3);    // '53' (number to string!)
console.log('10' * '2'); // 20 (both converted to numbers)
```

### Explicit Coercion

```javascript
// To String
String(123);        // '123'
(123).toString();   // '123'
123 + '';           // '123'

// To Number
Number('123');      // 123
parseInt('123');    // 123
parseFloat('3.14');// 3.14
+'123';             // 123

// To Boolean
Boolean(1);         // true
Boolean(0);         // false
Boolean('hello');   // true
Boolean('');        // false
!!'hello';          // true
```

## Practice Exercises

### Exercise 5.1: Variable Declaration
Create variables for a user profile:

```javascript
const USER_NAME = 'Alice Smith';
let userAge = 28;
let userEmail = 'alice@example.com';
let isPremiumUser = true;
let accountBalance = 150.75;

console.log(`User: ${USER_NAME}`);
console.log(`Age: ${userAge}`);
console.log(`Email: ${userEmail}`);
console.log(`Premium: ${isPremiumUser}`);
console.log(`Balance: $${accountBalance.toFixed(2)}`);
```

### Exercise 5.2: Counter Game
Create a simple click counter:

```javascript
let clicks = 0;

// Simulate clicks
clicks++;
clicks++;
clicks++;
clicks += 5;  // Bonus clicks
clicks--;    // Minus one

console.log('Total clicks:', clicks);  // 7
```

### Exercise 5.3: Temperature Converter
Create a temperature converter:

```javascript
const FAHRENHEIT = 98.6;
const celsius = (FAHRENHEIT - 32) * 5 / 9;

console.log(`${FAHRENHEIT}°F is ${celsius.toFixed(2)}°C`);
```

### Exercise 5.4: Shopping Cart
Create a shopping cart calculator:

```javascript
const TAX_RATE = 0.08;  // 8% tax

let item1Price = 19.99;
let item2Price = 5.49;
let item3Price = 3.00;

let subtotal = item1Price + item2Price + item3Price;
let tax = subtotal * TAX_RATE;
let total = subtotal + tax;

console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Tax: $${tax.toFixed(2)}`);
console.log(`Total: $${total.toFixed(2)}`);
```

## Summary

- Variables store data for later use
- Use `const` for values that don't change
- Use `let` for values that will change
- Avoid `var` in modern JavaScript
- Variable names should be descriptive (camelCase)
- Variables have scope (where they can be accessed)
- JavaScript performs type coercion in some cases

## Prevouse

[Proceed to Module 4](../04-html-css-review/README.md)
## Next Steps

[Proceed to Module 6](../06-booleans-if-statements/README.md): Booleans and If-Statements to learn how to make decisions in your code.
