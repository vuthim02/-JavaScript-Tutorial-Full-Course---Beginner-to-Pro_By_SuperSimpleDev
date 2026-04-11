# Module 6: Booleans and If-Statements

**Duration:** ~62 minutes  
**Video Timestamp:** 02:32:55 - 03:34:12

## Learning Objectives

- Understand boolean values (true/false)
- Use comparison operators
- Write if/else statements
- Combine conditions with logical operators
- Use ternary and switch statements

## What are Booleans?

Booleans represent one of two values: `true` or `false`.

```javascript
let isLoggedIn = true;
let hasPermission = false;

console.log(isLoggedIn);   // true
console.log(hasPermission); // false
```

## Boolean from Comparisons

Comparison operators return boolean values:

```javascript
console.log(10 > 5);    // true
console.log(10 < 5);    // false
console.log(10 === 10); // true
console.log(10 !== 5);  // true
```

## Comparison Operators

### Equality Operators

```javascript
// Triple equals (strict equality) - RECOMMENDED
console.log(10 === 10);    // true
console.log(10 === '10');   // false (different types)

// Double equals (loose equality) - AVOID
console.log(10 == 10);      // true
console.log(10 == '10');    // true (type coercion!)

// Not equal
console.log(10 !== 5);      // true
console.log(10 != '10');    // false (with ==)
```

### Relational Operators

```javascript
console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 >= 10); // true
console.log(10 <= 9);  // false
```

### String Comparison

```javascript
console.log('apple' === 'apple');   // true
console.log('apple' === 'Apple');   // false (case-sensitive)
console.log('apple' < 'banana');   // true (alphabetical order)
console.log('apple' > 'APPLE');     // true (lowercase > uppercase)
```

## Logical Operators

### AND (&&)

Returns true only if BOTH conditions are true:

```javascript
console.log(true && true);    // true
console.log(true && false);   // false
console.log(false && true);   // false
console.log(false && false);  // false

// Practical example
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log('Can drive');
}
```

### OR (||)

Returns true if AT LEAST ONE condition is true:

```javascript
console.log(true || true);    // true
console.log(true || false);   // true
console.log(false || true);   // true
console.log(false || false);  // false

// Practical example
let isWeekend = true;
let isHoliday = false;

if (isWeekend || isHoliday) {
  console.log('No work today!');
}
```

### NOT (!)

Reverses the boolean value:

```javascript
console.log(!true);   // false
console.log(!false);  // true

// Practical example
let isLoggedIn = false;
if (!isLoggedIn) {
  console.log('Please log in');
}
```

### Combining Logical Operators

```javascript
let age = 25;
let income = 50000;
let hasCreditScore = true;

// Can I get a loan?
let canGetLoan = age >= 18 && income >= 30000 && hasCreditScore;
console.log(canGetLoan);  // true
```

## If-Statements

### Basic If Statement

```javascript
let age = 18;

if (age >= 18) {
  console.log('You are an adult');
}
```

### If-Else Statement

```javascript
let age = 16;

if (age >= 18) {
  console.log('You are an adult');
} else {
  console.log('You are a minor');
}
```

### If-Else If-Else

```javascript
let score = 85;

if (score >= 90) {
  console.log('Grade: A');
} else if (score >= 80) {
  console.log('Grade: B');
} else if (score >= 70) {
  console.log('Grade: C');
} else if (score >= 60) {
  console.log('Grade: D');
} else {
  console.log('Grade: F');
}
```

### Nested If Statements

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
  if (hasLicense) {
    console.log('Can legally drive');
  } else {
    console.log('Need a license');
  }
} else {
  console.log('Too young to drive');
}
```

## Truthy and Falsy Values

### Falsy Values (Evaluate to false)

```javascript
// These are all falsy:
false
0
''
null
undefined
NaN

// Check if falsy
if (!value) {
  console.log('Value is falsy');
}
```

### Truthy Values (Evaluate to true)

```javascript
// Everything else is truthy:
true
1
'hello'
'0'        // String '0' is truthy!
'false'    // String 'false' is truthy!
[]
{}
function() {}
```

### Checking Truthiness

```javascript
let name = '';

if (name) {
  console.log('Name is truthy');
} else {
  console.log('Name is falsy');  // This runs!
}

name = 'John';
if (name) {
  console.log('Name is truthy');  // This runs!
}
```

## Ternary Operator

Shorthand for simple if-else:

```javascript
// condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? 'adult' : 'minor';
console.log(status);  // 'adult'

// Instead of:
let status2;
if (age >= 18) {
  status2 = 'adult';
} else {
  status2 = 'minor';
}
```

### Chaining Ternary Operators

```javascript
let score = 85;
let grade = score >= 90 ? 'A' : 
            score >= 80 ? 'B' : 
            score >= 70 ? 'C' : 
            score >= 60 ? 'D' : 'F';
console.log(grade);  // 'B'
```

## Switch Statement

Alternative to multiple if-else statements:

```javascript
let day = 'Monday';

switch (day) {
  case 'Monday':
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
  case 'Friday':
    console.log('Weekday');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend');
    break;
  default:
    console.log('Invalid day');
}
```

### Break Statements

Don't forget `break` or you'll get fall-through:

```javascript
let grade = 'B';

switch (grade) {
  case 'A':
    console.log('Excellent!');
    break;
  case 'B':
    console.log('Good!');    // This runs
    break;                   // Don't forget this!
  case 'C':
    console.log('Average');
    break;
  default:
    console.log('Unknown');
}
```

## Common Patterns

### Checking Multiple Conditions

```javascript
// AND pattern - all must be true
if (age >= 18 && hasLicense && hasInsurance) {
  console.log('Can drive legally');
}

// OR pattern - at least one must be true
if (isAdmin || isModerator || isOwner) {
  console.log('Has special access');
}

// NOT pattern - invert condition
if (!isBanned) {
  console.log('User is not banned');
}
```

### Early Return Pattern

```javascript
function processOrder(order) {
  if (!order) {
    return 'Invalid order';
  }
  
  if (!order.items || order.items.length === 0) {
    return 'No items in order';
  }
  
  // Main logic here
  return 'Order processed';
}
```

### Guard Clause Pattern

```javascript
function withdraw(balance, amount) {
  // Guard clause - handle invalid cases first
  if (amount <= 0) {
    return 'Amount must be positive';
  }
  
  if (amount > balance) {
    return 'Insufficient funds';
  }
  
  // Main logic
  return balance - amount;
}
```

## Practical Examples

### Login Validation

```javascript
function validateLogin(username, password) {
  // Check if fields are empty
  if (!username || !password) {
    return 'All fields required';
  }
  
  // Check username length
  if (username.length < 3) {
    return 'Username too short';
  }
  
  // Check password length
  if (password.length < 8) {
    return 'Password too short';
  }
  
  return 'Login valid';
}
```

### Age Group Classifier

```javascript
function getAgeGroup(age) {
  if (age < 0 || age > 150) {
    return 'Invalid age';
  }
  
  if (age < 13) {
    return 'Child';
  }
  
  if (age < 20) {
    return 'Teenager';
  }
  
  if (age < 65) {
    return 'Adult';
  }
  
  return 'Senior';
}
```

### Discount Calculator

```javascript
function calculatePrice(price, isMember, isSale) {
  let discount = 0;
  
  // Member discount
  if (isMember) {
    discount += 0.1;  // 10%
  }
  
  // Sale discount
  if (isSale) {
    discount += 0.2;  // 20%
  }
  
  // Don't exceed 30% total
  if (discount > 0.3) {
    discount = 0.3;
  }
  
  return price * (1 - discount);
}
```

## Practice Exercises

### Exercise 6.1: Simple Login Check
Write a function that checks if username is 'admin' and password is 'secret123'.

```javascript
function login(username, password) {
  if (username === 'admin' && password === 'secret123') {
    return 'Login successful!';
  } else {
    return 'Invalid credentials';
  }
}

console.log(login('admin', 'secret123'));   // Login successful!
console.log(login('admin', 'wrong'));        // Invalid credentials
```

### Exercise 6.2: Even or Odd
Write a function that determines if a number is even or odd.

```javascript
function evenOrOdd(num) {
  if (num % 2 === 0) {
    return 'Even';
  } else {
    return 'Odd';
  }
}

console.log(evenOrOdd(10));  // Even
console.log(evenOrOdd(7));   // Odd
console.log(evenOrOdd(0));   // Even
```

### Exercise 6.3: FizzBuzz
Classic programming challenge:
- Print 'Fizz' for multiples of 3
- Print 'Buzz' for multiples of 5
- Print 'FizzBuzz' for multiples of both
- Print the number otherwise

```javascript
function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) {
    return 'FizzBuzz';
  } else if (n % 3 === 0) {
    return 'Fizz';
  } else if (n % 5 === 0) {
    return 'Buzz';
  } else {
    return n;
  }
}

console.log(fizzBuzz(15));  // FizzBuzz
console.log(fizzBuzz(9));   // Fizz
console.log(fizzBuzz(10));   // Buzz
console.log(fizzBuzz(7));    // 7
```

### Exercise 6.4: Grade Calculator
Convert a numeric score to a letter grade.

```javascript
function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

console.log(getGrade(95));  // A
console.log(getGrade(82));  // B
console.log(getGrade(71));  // C
console.log(getGrade(65));  // D
console.log(getGrade(45));  // F
```

## Summary

- Booleans are `true` or `false`
- Use `===` for strict equality comparison
- Use `&&` for AND, `||` for OR, `!` for NOT
- `if/else` statements control program flow
- Use ternary operator for simple conditions
- Use `switch` for multiple cases
- Falsy values: `false`, `0`, `''`, `null`, `undefined`, `NaN`

## Prevouse

[Proceed to Module 5](../05-variables/README.md)
## Next Steps

[Proceed to Module 7](../07-functions/README.md): Functions to learn how to create reusable blocks of code.
