# Level 10: Numbers & Math — Comprehensive Applications

## Errors

### Error 1: Currency addition with float
**Description:** Add $10.50 and $20.25
```javascript
let a = 10.50;
let b = 20.25;
let total = a + b;
console.log(total);
```

### Error 2: Wrong operator for exponent
**Description:** Calculate 2 to power of 5
```javascript
let result = 2 ^ 5;
console.log(result);
```

### Error 3: NaN from undefined operation
**Description:** Multiply undefined by 5
```javascript
let x;
console.log(x * 5);
```

### Error 4: Infinity from overflow
**Description:** Calculate 1e200 * 1e200
```javascript
let result = 1e200 * 1e200;
console.log(result);
```

### Error 5: Modulo with negative dividend
**Description:** Calculate -10 % 3
```javascript
let result = -10 % 3;
console.log(result);
```

### Error 6: Wrong grouping for average
**Description:** Average of 10, 20, 30, 40
```javascript
let avg = 10 + 20 + 30 + 40 / 4;
console.log(avg);
```

### Error 7: parseInt on decimal string
**Description:** Parse "99.99" as integer
```javascript
let num = parseInt("99.99");
console.log(num);
```

### Error 8: parseFloat on invalid string
**Description:** Parse "$15.99" as number
```javascript
let price = parseFloat("$15.99");
console.log(price);
```

### Error 9: Number conversion of undefined
**Description:** Convert undefined to number
```javascript
let num = Number(undefined);
console.log(num);
```

### Error 10: Number conversion of null
**Description:** Convert null to number
```javascript
let num = Number(null);
console.log(num);
```

### Error 11: Number conversion of boolean
**Description:** Convert true to number
```javascript
let num = Number(true);
console.log(num);
```

### Error 12: isNaN on null
**Description:** Check if null is NaN
```javascript
console.log(isNaN(null));
```

### Error 13: isNaN on undefined
**Description:** Check if undefined is NaN
```javascript
console.log(isNaN(undefined));
```

### Error 14: isFinite on null
**Description:** Check if null is finite
```javascript
console.log(isFinite(null));
```

### Error 15: isFinite on undefined
**Description:** Check if undefined is finite
```javascript
console.log(isFinite(undefined));
```

### Error 16: Math.floor for negative rounding
**Description:** Round -3.7 down
```javascript
console.log(Math.floor(-3.7));
```

### Error 17: Math.ceil for negative ceiling
**Description:** Round -3.2 up
```javascript
console.log(Math.ceil(-3.2));
```

### Error 18: Math.round for -3.5
**Description:** Round -3.5 to nearest integer
```javascript
console.log(Math.round(-3.5));
```

### Error 19: Math.round for -3.5000001
**Description:** Round -3.5000001
```javascript
console.log(Math.round(-3.5000001));
```

### Error 20: toFixed on undefined
**Description:** Call toFixed on undefined
```javascript
let x;
console.log(x.toFixed(2));
```

### Error 21: toFixed on null
**Description:** Call toFixed on null
```javascript
let x = null;
console.log(x.toFixed(2));
```

### Error 22: toFixed on string number
**Description:** Call toFixed on string "42.5"
```javascript
let num = "42.5";
console.log(num.toFixed(2));
```

### Error 23: toPrecision on very large number
**Description:** Format 12345678901234567890
```javascript
let num = 12345678901234567890;
console.log(num.toPrecision(5));
```

### Error 24: toExponential on zero
**Description:** Format 0 in exponential
```javascript
console.log((0).toExponential(2));
```

### Error 25: Number.MAX_VALUE + 1
**Description:** Add 1 to max value
```javascript
console.log(Number.MAX_VALUE + 1);
```

### Error 26: Number.MIN_VALUE - 1
**Description:** Subtract 1 from min value
```javascript
console.log(Number.MIN_VALUE - 1);
```

### Error 27: Large number equality
**Description:** Check two large numbers for equality
```javascript
let a = 9999999999999999;
let b = 10000000000000000;
console.log(a === b);
```

### Error 28: Bitwise NOT on float
**Description:** Apply ~ to 5.5
```javascript
console.log(~5.5);
```

### Error 29: Bitwise AND on float
**Description:** Apply 5.5 & 3
```javascript
console.log(5.5 & 3);
```

### Error 30: Shift on negative number
**Description:** Right shift -16 by 2
```javascript
console.log(-16 >> 2);
```

### Error 31: Zero-fill shift negative
**Description:** Unsigned right shift -1
```javascript
console.log(-1 >>> 0);
```

### Error 32: String to number implicit in sort
**Description:** Sort array of numbers as strings
```javascript
let nums = [10, 5, 80, 2, 50];
nums.sort();
console.log(nums);
```

### Error 33: Adding array to number
**Description:** Add [1] + 5
```javascript
console.log([1] + 5);
```

### Error 34: Subtracting array from number
**Description:** Subtract 5 - [1]
```javascript
console.log(5 - [1]);
```

### Error 35: Math.pow with large exponent
**Description:** Calculate 2 ** 53
```javascript
console.log(2 ** 53);
```

### Error 36: Increment Infinity
**Description:** Increment Infinity
```javascript
let inf = Infinity;
inf++;
console.log(inf);
```

### Error 37: Decrement -Infinity
**Description:** Decrement -Infinity
```javascript
let inf = -Infinity;
inf--;
console.log(inf);
```

### Error 38: NaN comparison with if
**Description:** Check if NaN is falsy
```javascript
if (NaN) {
  console.log("Truthy");
} else {
  console.log("Falsy");
}
```

### Error 39: 0 comparison with if
**Description:** Check if 0 is falsy
```javascript
if (0) {
  console.log("Truthy");
} else {
  console.log("Falsy");
}
```

### Error 40: Empty array truthiness
**Description:** Check if [] is truthy
```javascript
if ([]) {
  console.log("Truthy");
} else {
  console.log("Falsy");
}
```

### Error 41: Empty object truthiness
**Description:** Check if {} is truthy
```javascript
if ({}) {
  console.log("Truthy");
} else {
  console.log("Falsy");
}
```

### Error 42: String "false" truthiness
**Description:** Check if "false" is truthy
```javascript
if ("false") {
  console.log("Truthy");
}
```

### Error 43: Adding decimal fractions
**Description:** Calculate 0.2 + 0.7
```javascript
let result = 0.2 + 0.7;
console.log(result);
```

### Error 44: 0.1 + 0.7 comparison
**Description:** Check if 0.1 + 0.7 equals 0.8
```javascript
console.log(0.1 + 0.7 === 0.8);
```

### Error 45: 0.25 + 0.5 error
**Description:** Check if 0.25 + 0.5 equals 0.75
```javascript
console.log(0.25 + 0.5 === 0.75);
```

### Error 46: 0.125 + 0.5 error
**Description:** Check if 0.125 + 0.5 equals 0.625
```javascript
console.log(0.125 + 0.5 === 0.625);
```

### Error 47: toFixed on negative with precision
**Description:** Format -2.5 to 0 decimals
```javascript
console.log((-2.5).toFixed(0));
```

### Error 48: parseInt with scientific notation
**Description:** Parse "1e2" as integer
```javascript
console.log(parseInt("1e2"));
```

### Error 49: parseFloat with hex
**Description:** Parse "0x10" as float
```javascript
console.log(parseFloat("0x10"));
```

### Error 50: Unary plus on array
**Description:** Convert [] to number
```javascript
console.log(+[]);
```

### Error 51: Unary plus on [1]
**Description:** Convert [1] to number
```javascript
console.log(+[1]);
```

### Error 52: Unary plus on [1, 2]
**Description:** Convert [1, 2] to number
```javascript
console.log(+[1, 2]);
```

### Error 53: Number with object
**Description:** Convert {} to number
```javascript
console.log(Number({}));
```

### Error 54: Number with array
**Description:** Convert [1] to number
```javascript
console.log(Number([1]));
```

### Error 55: NaN comparsion with indexOf
**Description:** Check for NaN in array
```javascript
let arr = [1, NaN, 3];
console.log(arr.indexOf(NaN));
```

### Error 56: NaN comparison with includes
**Description:** Check if includes NaN
```javascript
let arr = [1, NaN, 3];
console.log(arr.includes(NaN));
```

### Error 57: Math.max with NaN
**Description:** Max of values including NaN
```javascript
console.log(Math.max(1, 2, NaN, 3));
```

### Error 58: Math.min with NaN
**Description:** Min of values including NaN
```javascript
console.log(Math.min(1, 2, NaN, 3));
```

### Error 59: Math.sqrt with large number
**Description:** Square root of 1e100
```javascript
console.log(Math.sqrt(1e100));
```

### Error 60: Math.cbrt with large
**Description:** Cube root of 1e30
```javascript
console.log(Math.cbrt(1e30));
```

### Error 61: Math.pow with decimal exponent
**Description:** Calculate 16 ^ 0.25
```javascript
console.log(Math.pow(16, 0.25));
```

### Error 62: Math.log with 1
**Description:** Natural log of 1
```javascript
console.log(Math.log(1));
```

### Error 63: Math.log2 with 1
**Description:** Base-2 log of 1
```javascript
console.log(Math.log2(1));
```

### Error 64: Math.log10 with 1
**Description:** Base-10 log of 1
```javascript
console.log(Math.log10(1));
```

### Error 65: Type coercion in switch
**Description:** Switch with number and string
```javascript
let val = "5";
switch (val) {
  case 5:
    console.log("Five");
    break;
  case "5":
    console.log("String five");
    break;
}
```

### Error 66: Missing break with return
**Description:** Switch with return but no break
```javascript
function getDay(n) {
  switch (n) {
    case 1: return "Mon";
    case 2: return "Tue";
    case 3: return "Wed";
  }
}
console.log(getDay(1));
```

### Error 67: Infinity in calculation
**Description:** Add finite and infinite
```javascript
console.log(42 + Infinity);
```

### Error 68: Subtracting Infinity
**Description:** Subtract Infinity from itself
```javascript
console.log(Infinity - Infinity);
```

### Error 69: Division overflow
**Description:** Divide 1 by very small number
```javascript
let result = 1 / 1e-324;
console.log(result);
```

### Error 70: Underflow to zero
**Description:** Very small number becomes 0
```javascript
let result = 1e-325;
console.log(result);
```

## Issues

### Issue 1: Magic numbers in shipping cost
**Description:** Calculate shipping with hardcoded values
```javascript
let weight = 5;
let cost = 5.99;
if (weight > 10) cost = 9.99;
console.log(cost);
```

### Issue 2: Not using constants for rates
**Description:** Tax rate repeated everywhere
```javascript
function calcTotal(price) {
  return price + price * 0.08;
}
function calcTax(price) {
  return price * 0.08;
}
console.log(calcTotal(100));
```

### Issue 3: Hardcoded array lengths
**Description:** Loop with hardcoded limit
```javascript
let scores = [85, 92, 78, 90];
for (let i = 0; i < 4; i++) {
  console.log(scores[i]);
}
```

### Issue 4: Not using dot notation for decimals
**Description:** Confusing decimal with method call
```javascript
let num = 5.toFixed(2);
console.log(num);
```

### Issue 5: Double parenthesis needed for method on number
**Description:** Call toFixed directly on literal
```javascript
console.log(5..toFixed(2));
```

### Issue 6: Not using radix in parseInt
**Description:** Parse string without radix
```javascript
let input = "10";
let num = parseInt(input);
console.log(num);
```

### Issue 7: Confusing undefined and null in math
**Description:** Mix undefined and null in expression
```javascript
let a = undefined;
let b = null;
console.log(a + b);
```

### Issue 8: Using global isNaN for type check
**Description:** Check if value is NaN with coercion
```javascript
let val = "abc";
if (isNaN(val)) {
  console.log("Not a number");
}
```

### Issue 9: Not checking for division by zero
**Description:** Divide without zero check
```javascript
function divide(a, b) {
  return a / b;
}
console.log(divide(10, 0));
```

### Issue 10: Using const for calculated value
**Description:** Const used for value that changes
```javascript
const total = 0;
total += 10;
total += 20;
console.log(total);
```

### Issue 11: No input sanitization for math
**Description:** Accept without trim/parse
```javascript
let input = " 42 ";
let num = parseInt(input);
console.log(num + 8);
```

### Issue 12: Not handling non-numeric string
**Description:** Parse without fallback
```javascript
let userInput = "abc";
let age = parseInt(userInput);
console.log("Age: " + age);
```

### Issue 13: Confusing return types
**Description:** Function returns number or string
```javascript
function format(n) {
  if (n > 100) return n;
  return "Small: " + n;
}
console.log(format(50));
```

### Issue 14: Comparative chain without AND
**Description:** Check range with chained comparison
```javascript
let x = 5;
if (1 < x < 10) {
  console.log("Between");
}
```

### Issue 15: Using subtraction for comparison
**Description:** Compare by subtraction
```javascript
let a = 10, b = 5;
if (a - b > 0) {
  console.log("a > b");
}
```

### Issue 16: Not using short-circuit evaluation
**Description:** Complex if without short-circuit
```javascript
if (user && user.profile && user.profile.age > 18) {
  console.log("Adult");
}
```

### Issue 17: Redundant boolean conversion
**Description:** Convert to boolean unnecessarily
```javascript
let isActive = true;
if (Boolean(isActive)) {
  console.log("Active");
}
```

### Issue 18: Using = instead of +=
**Description:** Assignment instead of addition
```javascript
let count = 5;
count =+ 3;
console.log(count);
```

### Issue 19: Not using increment operator
**Description:** Increment with addition
```javascript
let i = 0;
i = i + 1;
console.log(i);
```

### Issue 20: Not using decrement operator
**Description:** Decrement with subtraction
```javascript
let i = 5;
i = i - 1;
console.log(i);
```

### Issue 21: Multiple console.log for debugging
**Description:** Too many debug logs
```javascript
let x = 5;
console.log("x is:", x);
let y = x * 2;
console.log("y is:", y);
let z = y + 3;
console.log("z is:", z);
console.log("final:", z);
```

### Issue 22: Division instead of modulus
**Description:** Use / instead of % for remainder
```javascript
let num = 7;
if (num / 2 === 0) {
  console.log("Even");
}
```

### Issue 23: Unnecessary else for boolean
**Description:** Return boolean without else
```javascript
function isPositive(n) {
  if (n > 0) {
    return true;
  } else {
    return false;
  }
}
console.log(isPositive(5));
```

### Issue 24: Comma in return statement
**Description:** Return with comma expression
```javascript
function getMax(a, b) {
  return a > b ? a, b : b, a;
}
console.log(getMax(5, 10));
```

### Issue 25: Semicolon after for loop
**Description:** For loop with semicolon
```javascript
for (let i = 0; i < 5; i++);
{
  console.log("Loop body");
}
```

### Issue 26: Not using += for string building
**Description:** String concatenation with +
```javascript
let msg = "Total: ";
msg = msg + 42;
console.log(msg);
```

### Issue 27: Hardcoded comparison values
**Description:** Compare with magic number
```javascript
let age = 25;
if (age > 18) {
  console.log("Adult");
}
```

### Issue 28: Using if for null check unnecessarily
**Description:** Use ternary for null check
```javascript
let name = null;
let display;
if (name) {
  display = name;
} else {
  display = "Guest";
}
console.log(display);
```

### Issue 29: Confusing Number() with parseInt
**Description:** Use Number for parsing
```javascript
let input = "10px";
let num = Number(input);
console.log(num);
```

### Issue 30: Using || for all defaults
**Description:** OR assignment that hides bugs
```javascript
let count = 0;
let result = count || 10;
console.log(result);
```

## Modifications

### Modify 1: Add validation to calculate function
**Description:** Check inputs are numbers before calculating
```javascript
function multiply(a, b) {
  return a * b;
}
console.log(multiply("5", 3));
```

### Modify 2: Add error handling for division
**Description:** Return "Cannot divide by zero" if b is 0
```javascript
function divide(a, b) {
  return a / b;
}
console.log(divide(10, 0));
```

### Modify 3: Add rounding to calculator result
**Description:** Round result to 2 decimal places
```javascript
function add(a, b) {
  return a + b;
}
console.log(add(0.1, 0.2));
```

### Modify 4: Add input sanitization
**Description:** Trim and parse user input
```javascript
function getNumber(input) {
  return parseInt(input);
}
console.log(getNumber("  42  "));
```

### Modify 5: Format output as currency
**Description:** Display result with $ and 2 decimals
```javascript
let total = 42.5;
console.log(total);
```

### Modify 6: Add unit conversion
**Description:** Convert inches to centimeters
```javascript
let inches = 12;
console.log(inches);
```

### Modify 7: Add reset functionality
**Description:** Reset counter to 0
```javascript
let counter = 10;
console.log("Counter:", counter);
```

### Modify 8: Add increment button behavior
**Description:** Increase value by 1 each time
```javascript
let value = 5;
console.log("Current:", value);
```

### Modify 9: Add decrement with minimum
**Description:** Decrease value but not below 0
```javascript
let stock = 3;
console.log("Stock:", stock);
```

### Modify 10: Calculate with discount code
**Description:** Apply 10% off if code is "SAVE10"
```javascript
let price = 100;
let code = "SAVE10";
console.log(price, code);
```

### Modify 11: Add shipping threshold
**Description:** Free shipping over $50
```javascript
let order = 45;
let shipping = 5.99;
console.log("Order:", order, "Shipping:", shipping);
```

### Modify 12: Calculate loyalty points
**Description:** 1 point per dollar spent
```javascript
let purchase = 75.50;
console.log(purchase);
```

### Modify 13: Add bulk pricing
**Description:** $10 each for 1-5, $8 each for 6+
```javascript
let qty = 7;
let price = 12;
console.log(qty, price);
```

### Modify 14: Add tax toggle
**Description:** Calculate with or without tax based on flag
```javascript
let subtotal = 100;
let includeTax = true;
console.log(subtotal, includeTax);
```

### Modify 15: Add minimum order message
**Description:** Warn if order under $20
```javascript
let cartTotal = 15;
console.log(cartTotal);
```

### Modify 16: Add quantity selector
**Description:** Increase or decrease quantity
```javascript
let qty = 1;
console.log("Qty:", qty);
```

### Modify 17: Add price per unit display
**Description:** Show total and per-unit price
```javascript
let total = 24;
let count = 6;
console.log(total, count);
```

### Modify 18: Add currency converter
**Description:** Convert between USD and EUR
```javascript
let amount = 100;
let currency = "EUR";
console.log(amount, currency);
```

### Modify 19: Add percentage button
**Description:** Calculate percentage of a number
```javascript
let num = 200;
let pct = 15;
console.log(num, pct);
```

### Modify 20: Add memory function
**Description:** Store and recall a value
```javascript
let memory = 0;
let current = 42;
console.log(memory, current);
```

### Modify 21: Add calculation history
**Description:** Store last 5 calculations
```javascript
let a = 10, b = 5;
let result = a + b;
console.log(result);
```

### Modify 22: Add keyboard support hint
**Description:** Handle number key presses
```javascript
console.log("Press keys 0-9");
```

### Modify 23: Add display formatting
**Description:** Show number with proper separators
```javascript
let display = "0";
console.log(display);
```

### Modify 24: Add sign toggle
**Description:** Toggle between positive and negative
```javascript
let value = 42;
console.log(value);
```

### Modify 25: Add backspace support
**Description:** Remove last digit from display
```javascript
let display = "123";
console.log(display);
```

### Modify 26: Add decimal point support
**Description:** Allow one decimal point in input
```javascript
let input = "12";
console.log(input);
```

### Modify 27: Add maximum digits limit
**Description:** Limit display to 10 digits
```javascript
let display = "123456789";
console.log(display);
```

### Modify 28: Add calculation chaining
**Description:** Allow 2 + 3 + 5 style chains
```javascript
let result = 2 + 3;
console.log(result);
```

### Modify 29: Add operator precedence
**Description:** Handle * and / before + and -
```javascript
let expression = "2 + 3 * 4";
console.log(expression);
```

### Modify 30: Add parentheses support
**Description:** Handle (2 + 3) * 4
```javascript
let expression = "(2 + 3) * 4";
console.log(expression);
```

### Modify 31: Add equals button function
**Description:** Calculate result when = is pressed
```javascript
let left = 10;
let operator = "+";
let right = 5;
console.log(left, operator, right);
```

### Modify 32: Add clear entry function
**Description:** Clear current entry only
```javascript
let display = "123";
let memory = "456";
console.log(display, memory);
```

### Modify 33: Add all clear function
**Description:** Reset everything to initial state
```javascript
let display = "123";
let memory = "456";
let operator = "+";
console.log(display, memory, operator);
```

### Modify 34: Add percentage of total
**Description:** Calculate what % one number is of another
```javascript
let part = 25;
let whole = 200;
console.log(part, whole);
```

### Modify 35: Add square root button
**Description:** Calculate sqrt of current value
```javascript
let value = 81;
console.log(value);
```

### Modify 36: Add square button
**Description:** Calculate value squared
```javascript
let value = 9;
console.log(value);
```

### Modify 37: Add reciprocal button
**Description:** Calculate 1/value
```javascript
let value = 4;
console.log(value);
```

### Modify 38: Add exponent button
**Description:** Raise to power of y
```javascript
let base = 2;
let exp = 3;
console.log(base, exp);
```

### Modify 39: Add modulo button
**Description:** Calculate remainder
```javascript
let a = 17;
let b = 5;
console.log(a, b);
```

### Modify 40: Add factorial button
**Description:** Calculate n!
```javascript
let n = 5;
console.log(n);
```

### Modify 41: Add random number generator
**Description:** Generate random number between 0 and 1
```javascript
console.log("Random:");
```

### Modify 42: Add pi constant button
**Description:** Insert Math.PI into display
```javascript
let display = "0";
console.log(display);
```

### Modify 43: Add e constant button
**Description:** Insert Math.E into display
```javascript
let display = "0";
console.log(display);
```

### Modify 44: Add change sign button
**Description:** Multiply current value by -1
```javascript
let display = 42;
console.log(display);
```

### Modify 45: Add digit grouping
**Description:** Display numbers with comma separators
```javascript
let num = 1234567;
console.log(num);
```

### Modify 46: Add error message for overflow
**Description:** Show "Error" if result is too large
```javascript
let result = 1e200 * 1e200;
console.log(result);
```

### Modify 47: Add error message for invalid input
**Description:** Show "Error" for division by zero
```javascript
let result = 10 / 0;
console.log(result);
```

### Modify 48: Add truncation for long decimals
**Description:** Limit display to 10 characters
```javascript
let result = 1 / 3;
console.log(result);
```

### Modify 49: Add memory recall button
**Description:** Display stored memory value
```javascript
let memory = 42;
let display = "0";
console.log(memory, display);
```

### Modify 50: Add memory clear button
**Description:** Reset memory to 0
```javascript
let memory = 42;
console.log("Memory:", memory);
```
