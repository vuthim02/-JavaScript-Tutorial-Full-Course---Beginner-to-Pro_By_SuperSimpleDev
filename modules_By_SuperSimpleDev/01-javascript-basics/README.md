# Module 1: JavaScript Basics

**Duration:** ~12 minutes  
**Video Timestamp:** 00:00 - 02:01

## Learning Objectives

- Understand what JavaScript is
- Learn how JavaScript runs in the browser
- Write your first JavaScript code
- Understand basic syntax rules

## What is JavaScript?

JavaScript is a programming language that makes websites interactive. While HTML provides the structure and CSS provides the styling, JavaScript adds behavior and interactivity.

### Where JavaScript Runs

JavaScript can run in:
- **Browsers** - Chrome, Firefox, Safari, Edge
- **Servers** - Using Node.js
- **Mobile apps** - Using React Native
- **Desktop apps** - Using Electron

## Your First JavaScript Code

### Using the Console

The easiest way to run JavaScript is through the browser's developer console.

1. Open Chrome (or any browser)
2. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Click on the "Console" tab
4. Type the following:

```javascript
console.log('Hello, World!');
```

Press Enter and you'll see "Hello, World!" printed in the console.

### What is console.log()?

`console.log()` is a function that prints output to the console. It's used for debugging and displaying information.

```javascript
console.log(42);
console.log(3.14);
console.log(true);
```

## JavaScript Syntax Basics

### Statements

A **statement** is a line of code that performs an action. In JavaScript, statements end with a semicolon (`;`).

```javascript
console.log('Statement 1');
console.log('Statement 2');
```

### Comments

Comments are notes for developers that JavaScript ignores.

**Single-line comments:**
```javascript
// This is a single-line comment
console.log('Hello');
```

**Multi-line comments:**
```javascript
/*
  This is a multi-line comment
  It can span several lines
*/
console.log('Hello');
```

### Strings

Strings are text values. They must be wrapped in quotes.

```javascript
console.log('Hello');        // Single quotes
console.log("Hello");        // Double quotes
console.log(`Hello`);        // Template literals (backticks)
```

### Numbers

JavaScript treats all numbers (integers and decimals) as the same type.

```javascript
console.log(42);             // Integer
console.log(3.14);           // Decimal/Float
console.log(-10);            // Negative number
console.log(10 + 5);         // Addition: 15
```

### Special Values

```javascript
console.log(undefined);      // Represents an uninitialized value
console.log(null);           // Represents intentional absence of value
console.log(NaN);            // Not a Number (error result)
```

## Key Concepts

### 1. JavaScript is Case-Sensitive

```javascript
console.log('Hello');         // Works
// console.log('hello');      // Would be different
// CONSOLE.LOG('Hello');      // Would cause an error
```

### 2. Whitespace is Generally Ignored

```javascript
console.log('Hello');        
console.log('World');        // Same as:
console.log('Hello'); console.log('World');
```

### 3. Errors

**Syntax Error** - Code is written incorrectly:
```javascript
console.log('Hello)  // Missing closing quote
// Uncaught SyntaxError: missing ) after argument list
```

**Reference Error** - Using something that doesn't exist:
```javascript
console.log(hello);  // hello is not defined
// Uncaught ReferenceError: hello is not defined
```

## Exercise 1.1: Hello World

Create a JavaScript program that:
1. Prints "Hello, World!" to the console
2. Prints your name
3. Prints your age as a number

```javascript
// Your code here
console.log('Hello, World!');
console.log('Your Name');
console.log(25);
```

## Exercise 1.2: Basic Math

Print the results of these calculations:
1. 10 + 5
2. 100 - 25
3. 8 * 4
4. 100 / 10

```javascript
console.log(10 + 5);    // 15
console.log(100 - 25);  // 75
console.log(8 * 4);     // 32
console.log(100 / 10);  // 10
```

## Exercise 1.3: Mixing Numbers and Strings

Predict what each line will print:
```javascript
console.log('2 + 2');        // ?
console.log(2 + 2);          // ?
console.log('2' + '2');      // ?
console.log(10 - '5');       // ?
```

**Answers:**
- `'2 + 2'` prints: `2 + 2` (string)
- `2 + 2` prints: `4` (number)
- `'2' + '2'` prints: `22` (string concatenation)
- `10 - '5'` prints: `5` (type coercion)

## Summary

- JavaScript is a programming language for making websites interactive
- Use `console.log()` to print values to the console
- Statements end with semicolons
- Comments help document code
- Strings must be wrapped in quotes
- JavaScript is case-sensitive

## Next Steps

[Proceed to Module 2](../02-numbers-and-math/README.md): Numbers and Math to learn about mathematical operations in JavaScript.

