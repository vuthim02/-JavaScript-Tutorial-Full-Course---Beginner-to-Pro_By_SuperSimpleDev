# Module 2: Numbers and Math

**Duration:** ~29 minutes  
**Video Timestamp:** 02:01 - 14:48

## Learning Objectives

- Perform mathematical operations in JavaScript
- Understand order of operations (PEMDAS/BODMAS)
- Work with decimal numbers (floats)
- Round numbers properly
- Calculate with money

## Basic Math Operations

### Addition and Subtraction

```javascript
console.log(10 + 5);    // 15
console.log(10 - 5);    // 5
console.log(10 - 20);   // -10 (negative result)
```

### Multiplication and Division

```javascript
console.log(10 * 5);    // 50
console.log(10 / 5);    // 2
console.log(10 / 3);    // 3.3333333333333335
```

### Modulo (Remainder)

The modulo operator (`%`) returns the remainder after division.

```javascript
console.log(10 % 3);    // 1 (10 divided by 3 = 3 remainder 1)
console.log(14 % 5);    // 4
console.log(20 % 10);   // 0
console.log(7 % 2);     // 1 (odd number check)
console.log(8 % 2);     // 0 (even number check)
```

### Exponentiation

```javascript
console.log(2 ** 3);    // 8 (2 to the power of 3)
console.log(5 ** 2);     // 25 (5 squared)
console.log(10 ** 6);   // 1000000 (10 to the power of 6)
```

## Order of Operations (PEMDAS/BODMAS)

JavaScript follows mathematical order of operations:

1. **P**arentheses / **B**rackets first
2. **E**xponents / **O**rders (powers, roots)
3. **M**ultiplication and **D**ivision (left to right)
4. **A**ddition and **S**ubtraction (left to right)

### Examples

```javascript
console.log(2 + 3 * 4);           // 14 (not 20)
console.log((2 + 3) * 4);         // 20
console.log(10 - 5 + 2);          // 7
console.log(10 - (5 + 2));        // 3
console.log(2 * 3 + 4 * 5);       // 26
console.log((2 * 3) + (4 * 5));   // 26
console.log(2 ** 3 + 4 ** 2);     // 8 + 16 = 24
```

### Why Multiplication Goes Before Addition

```javascript
// If you want to add first, use parentheses
console.log(2 + 3 * 4);      // 14 (multiplication first)
console.log((2 + 3) * 4);    // 20 (addition first)
```

## Working with Decimal Numbers (Floats)

JavaScript can handle decimal numbers (also called floats or floating-point numbers).

```javascript
console.log(0.1 + 0.2);       // 0.30000000000000004
console.log(3.14 * 2);        // 6.28
console.log(10 / 4);          // 2.5
```

### Floating-Point Precision Problem

JavaScript has a known issue with floating-point math:

```javascript
console.log(0.1 + 0.2);       // 0.30000000000000004 (not exactly 0.3)
```

This is a limitation of how computers represent decimal numbers in binary.

## Calculating Money

When working with money, never use floating-point numbers directly!

### The Problem

```javascript
console.log(0.1 + 0.2);        // 0.30000000000000004
console.log(0.1 * 0.2);        // 0.020000000000000004
```

### The Solution: Work in Cents

Always convert money to the smallest unit (cents) for calculations:

```javascript
// Instead of: $0.10 + $0.20
// Work with: 10 + 20

let price1 = 10;  // $0.10 in cents
let price2 = 20;  // $0.20 in cents
console.log(price1 + price2);  // 30 cents = $0.30

// For $19.99 + $5.99
let item1 = 1999;  // $19.99 in cents
let item2 = 599;   // $5.99 in cents
let total = item1 + item2;
console.log(total / 100);  // $25.98
```

## Rounding Numbers

### Math.round()

Rounds to the nearest integer:

```javascript
console.log(Math.round(2.5));   // 3
console.log(Math.round(2.4));   // 2
console.log(Math.round(3.7));   // 4
console.log(Math.round(-2.5));  // -2
```

### Math.floor()

Rounds down to the nearest integer:

```javascript
console.log(Math.floor(2.9));   // 2
console.log(Math.floor(2.1));   // 2
console.log(Math.floor(-2.1));  // -3 (rounds down)
```

### Math.ceil()

Rounds up to the nearest integer:

```javascript
console.log(Math.ceil(2.1));    // 3
console.log(Math.ceil(2.9));    // 3
console.log(Math.ceil(-2.1));   // -2 (rounds up)
```

### Math.trunc()

Removes the decimal part (truncates):

```javascript
console.log(Math.trunc(2.9));   // 2
console.log(Math.trunc(-2.9));  // -2
```

## Fixing Money Calculations

### Rounding to 2 Decimal Places

```javascript
// Calculate total: $19.99 + $5.99
let item1 = 1999;  // cents
let item2 = 599;   // cents
let total = item1 + item2;

// Convert back to dollars and round
let totalDollars = total / 100;
console.log(totalDollars.toFixed(2));  // "25.98" (string)
console.log(Number(totalDollars.toFixed(2)));  // 25.98 (number)
```

### Alternative: Use Integer Cents Throughout

```javascript
// Keep everything in cents until display
let price1 = 1999;   // $19.99
let price2 = 599;    // $5.99
let tax = 825;       // 8.25% tax in cents-per-hundred

let subtotal = price1 + price2;
let taxAmount = Math.round(subtotal * tax / 10000);
let total = subtotal + taxAmount;

console.log(`Total: $${total / 100}`);  // Total: $26.82
```

## Useful Math Methods

```javascript
Math.abs(-5);         // 5 (absolute value)
Math.sqrt(16);        // 4 (square root)
Math.max(1, 5, 3);    // 5 (maximum)
Math.min(1, 5, 3);    // 1 (minimum)
Math.pow(2, 3);       // 8 (power, same as 2 ** 3)
Math.random();        // Random number between 0 and 1
```

### Random Number Generator

```javascript
// Random integer from 1 to 10
let randomNum = Math.floor(Math.random() * 10) + 1;
console.log(randomNum);
```

## Practice Exercises

### Exercise 2.1: Basic Operations
Calculate and print:
1. 100 + 200
2. 1000 - 500
3. 15 * 4
4. 100 / 7 (rounded to 2 decimal places)
5. 17 % 5

```javascript
console.log(100 + 200);                   // 300
console.log(1000 - 500);                   // 500
console.log(15 * 4);                       // 60
console.log((100 / 7).toFixed(2));         // "14.29"
console.log(17 % 5);                       // 2
```

### Exercise 2.2: Order of Operations
What will each print?
1. `console.log(2 + 3 * 4);`
2. `console.log((2 + 3) * 4);`
3. `console.log(10 - 5 * 2);`
4. `console.log((10 - 5) * 2);`

**Answers:** 14, 20, 0, 10

### Exercise 2.3: Money Calculation
You buy items costing $14.99, $5.99, and $2.49. Tax is 8.25%. Calculate the total.

```javascript
let item1 = 1499;  // cents
let item2 = 599;
let item3 = 249;
let taxRate = 825; // 8.25% as basis points

let subtotal = item1 + item2 + item3;
let tax = Math.round(subtotal * taxRate / 10000);
let total = subtotal + tax;

console.log(`Total: $${(total / 100).toFixed(2)}`);  // $25.36
```

## Summary

- Use `+`, `-`, `*`, `/` for basic math operations
- Use `%` for modulo (remainder)
- Use `**` for exponentiation
- Remember order of operations (PEMDAS)
- When calculating money, work in cents to avoid floating-point errors
- Use `Math.round()`, `Math.floor()`, `Math.ceil()` for rounding

## Prevouse

[Proceed to Module 1](../01-javascript-basics/README.md)
## Next Steps

[Proceed to Module 3](../03-strings/README.md): Strings to learn about working with text in JavaScript.
