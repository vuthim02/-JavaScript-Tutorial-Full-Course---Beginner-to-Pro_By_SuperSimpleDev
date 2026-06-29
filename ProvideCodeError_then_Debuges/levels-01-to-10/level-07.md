# Level 07: Numbers & Math — Operators & PEMDAS

## Errors

### Error 1: Wrong remainder operator for negative
**Description:** Calculate -7 % 3
```javascript
console.log(-7 % 3);
```

### Error 2: Modulo with decimal operands
**Description:** Calculate 7.5 % 2
```javascript
console.log(7.5 % 2);
```

### Error 3: Misunderstanding modulo behavior
**Description:** Check if 4 % 2 === 0
```javascript
console.log(4 % 2 === 0);
```

### Error 4: Using % for percentage instead of division
**Description:** Calculate 50% of 200
```javascript
let result = 200 % 50;
console.log(result);
```

### Error 5: Exponentiation with caret (XOR)
**Description:** Calculate 3 to the power 3
```javascript
console.log(3 ^ 3);
```

### Error 6: Multiplication before addition confusion
**Description:** Calculate 2 + 3 * 4
```javascript
let result = 2 + 3 * 4;
console.log(result);
```

### Error 7: Wrong parentheses for division and addition
**Description:** Calculate 10 / 2 + 3
```javascript
let result = 10 / (2 + 3);
console.log(result);
```

### Error 8: Wrong order for formula
**Description:** Calculate (8 + 2) * 5
```javascript
let result = 8 + 2 * 5;
console.log(result);
```

### Error 9: Missing parentheses for compound interest
**Description:** Calculate 1000 * (1 + 0.05)^5
```javascript
let result = 1000 * 1 + 0.05 ** 5;
console.log(result);
```

### Error 10: Left to right instead of precedence
**Description:** Calculate 24 / 3 * 2
```javascript
let result = 24 / 3 * 2;
console.log(result);
```

### Error 11: Associativity confusion
**Description:** Calculate 16 - 4 - 2
```javascript
let result = 16 - 4 - 2;
console.log(result);
```

### Error 12: Exponent before unary minus
**Description:** Calculate -2 ** 2
```javascript
let result = -2 ** 2;
console.log(result);
```

### Error 13: Unary minus and exponent grouping
**Description:** Calculate -(2 ** 2)
```javascript
let result = -2 ** 2;
console.log(result);
```

### Error 14: Missing parentheses in denominator
**Description:** Calculate 100 / 2 + 3
```javascript
let result = 100 / 2 + 3;
console.log(result);
```

### Error 15: Wrong average calculation
**Description:** Average of 5, 10, 15
```javascript
let avg = 5 + 10 + 15 / 3;
console.log(avg);
```

### Error 16: Wrong weighted average formula
**Description:** Weighted average with weights 2 and 3
```javascript
let a = 80, b = 90;
let weighted = a * 2 + b * 3 / 5;
console.log(weighted);
```

### Error 17: Missing parentheses for difference of squares
**Description:** Calculate 10^2 - 5^2
```javascript
let result = 10 ** 2 - 5 ** 2;
console.log(result);
```

### Error 18: Using ** on negative base wrong
**Description:** Calculate (-3) ** 2
```javascript
let result = -3 ** 2;
console.log(result);
```

### Error 19: Fraction without parentheses
**Description:** Calculate 1/2 + 1/3
```javascript
let result = 1 / 2 + 1 / 3;
console.log(result);
```

### Error 20: Nested parentheses mismatch
**Description:** Calculate ((2 + 3) * (4 + 5))
```javascript
let result = (2 + 3 * 4 + 5);
console.log(result);
```

### Error 21: Wrong order for range middle
**Description:** Find middle of 0 and 100
```javascript
let mid = 0 + 100 / 2;
console.log(mid);
```

### Error 22: Precedence with assignment
**Description:** Assign and add in one expression
```javascript
let x = 5;
let y = x = 10 + 5;
console.log(x, y);
```

### Error 23: Chained assignment with arithmetic
**Description:** Chain assignment with multiplication
```javascript
let a, b, c;
a = b = c = 5 * 2;
console.log(a, b, c);
```

### Error 24: Adding before multiplying in tax
**Description:** Calculate price with tax then add tip
```javascript
let price = 50;
let tax = 0.08;
let tip = 10;
let total = price + price * tax + tip;
console.log(total);
```

### Error 25: Wrong formula for Celsius to Fahrenheit
**Description:** Convert 25°C to °F: (C * 9/5) + 32
```javascript
let c = 25;
let f = c * 9 / 5 + 32;
console.log(f);
```

### Error 26: Integer division truncation
**Description:** Divide 7 by 2 getting 3.5
```javascript
let result = 7 / 2;
console.log(result);
```

### Error 27: Using Math.floor for rounding negative
**Description:** Round -2.5 with Math.floor
```javascript
console.log(Math.floor(-2.5));
```

### Error 28: Using Math.trunc instead of floor
**Description:** Truncate -2.5
```javascript
console.log(Math.trunc(-2.5));
```

### Error 29: Math.sign confusion
**Description:** Get sign of -5
```javascript
console.log(Math.sign(-5));
```

### Error 30: Math.sign of 0
**Description:** Get sign of 0
```javascript
console.log(Math.sign(0));
```

### Error 31: Math.cbrt called wrong
**Description:** Cube root of 27
```javascript
console.log(Math.cbrt(27));
```

### Error 32: Math.hypot with wrong args
**Description:** Calculate hypotenuse of 3, 4
```javascript
console.log(Math.hypot(3, 4));
```

### Error 33: Math.imul overflow unaware
**Description:** 32-bit integer multiply
```javascript
console.log(Math.imul(0xFFFFFFFF, 2));
```

### Error 34: Math.clz32 understanding
**Description:** Count leading zeros of 1
```javascript
console.log(Math.clz32(1));
```

### Error 35: Math.fround precision
**Description:** Float 32-bit rounding of 1.5
```javascript
console.log(Math.fround(1.5));
```

### Error 36: Math.expm1 vs exp
**Description:** Calculate e^x - 1 for small x
```javascript
console.log(Math.expm1(0.01));
```

### Error 37: Math.log1p vs log
**Description:** Calculate ln(1 + x) for small x
```javascript
console.log(Math.log1p(0.01));
```

### Error 38: Math.log2 not available check
**Description:** Base-2 log of 8
```javascript
console.log(Math.log2(8));
```

### Error 39: Math.log10 alternative
**Description:** Base-10 log of 100
```javascript
console.log(Math.log10(100));
```

### Error 40: Math.hypot overflow
**Description:** Hypot of very large numbers
```javascript
console.log(Math.hypot(1e200, 1e200));
```

### Error 41: Using ** with large exponent
**Description:** Calculate 2 ** 1000
```javascript
console.log(2 ** 1000);
```

### Error 42: Number underflow
**Description:** Very small number below MIN_VALUE
```javascript
let small = 1e-324;
console.log(small);
```

### Error 43: Division by string conversion
**Description:** Divide 100 by "20"
```javascript
console.log(100 / "20");
```

### Error 44: Subtraction with string number
**Description:** Subtract "10" from 50
```javascript
console.log(50 - "10");
```

### Error 45: Multiple conversions in expression
**Description:** Calculate "10" * "2" + "5"
```javascript
console.log("10" * "2" + "5");
```

### Error 46: Mixing number and string with +
**Description:** Add 10 + "20" expecting 30
```javascript
console.log(10 + "20");
```

### Error 47: Using + with boolean in math
**Description:** Add true + true
```javascript
console.log(true + true);
```

### Error 48: Using + with null in math
**Description:** Add 5 + null
```javascript
console.log(5 + null);
```

### Error 49: Using + with undefined in math
**Description:** Add 5 + undefined
```javascript
console.log(5 + undefined);
```

### Error 50: NaN propagation in math
**Description:** Add NaN to 5
```javascript
console.log(NaN + 5);
```

### Error 51: Infinity in subtraction
**Description:** Subtract Infinity from Infinity
```javascript
console.log(Infinity - Infinity);
```

### Error 52: Infinity division
**Description:** Divide Infinity by Infinity
```javascript
console.log(Infinity / Infinity);
```

### Error 53: Infinity multiplication by zero
**Description:** Multiply Infinity by 0
```javascript
console.log(Infinity * 0);
```

### Error 54: Zero to power zero
**Description:** Calculate 0 ** 0
```javascript
console.log(0 ** 0);
```

### Error 55: Negative base with fractional exponent
**Description:** Calculate (-2) ** 0.5
```javascript
console.log((-2) ** 0.5);
```

### Error 56: Number parsing with leading zeros
**Description:** Parse "00123" as number
```javascript
console.log(Number("00123"));
```

### Error 57: Number with spaces
**Description:** Parse " 42 " as number
```javascript
console.log(Number(" 42 "));
```

### Error 58: Number with plus sign
**Description:** Parse "+42" as number
```javascript
console.log(Number("+42"));
```

### Error 59: Number with minus sign
**Description:** Parse "-42" as number
```javascript
console.log(Number("-42"));
```

### Error 60: Hexadecimal string to number
**Description:** Parse "0xFF" as number
```javascript
console.log(Number("0xFF"));
```

### Error 61: Binary string to number
**Description:** Parse "0b1010" as number
```javascript
console.log(Number("0b1010"));
```

### Error 62: Octal string to number
**Description:** Parse "0o10" as number
```javascript
console.log(Number("0o10"));
```

### Error 63: Large exponent toString
**Description:** Convert 1e21 to string
```javascript
console.log(1e21.toString());
```

### Error 64: toExponential without argument
**Description:** Format 12345 in exponential
```javascript
console.log(12345.toExponential());
```

### Error 65: toPrecision with small precision
**Description:** Format 123.456 to 2 digits
```javascript
console.log(123.456.toPrecision(2));
```

### Error 66: toPrecision with large precision
**Description:** Format 123.456 to 10 digits
```javascript
console.log(123.456.toPrecision(10));
```

### Error 67: Using parseInt on hex string
**Description:** Parse "FF" as decimal 255
```javascript
console.log(parseInt("FF"));
```

### Error 68: parseInt with leading zero
**Description:** Parse "012" in older engines
```javascript
console.log(parseInt("012"));
```

### Error 69: parseFloat with multiple dots
**Description:** Parse "12.34.56" as float
```javascript
console.log(parseFloat("12.34.56"));
```

### Error 70: Number with scientific notation error
**Description:** Parse "10e3" correctly
```javascript
console.log(Number("10e3"));
```

## Issues

### Issue 1: Not using parentheses for denominator
**Description:** Complex formula without grouping
```javascript
let a = 5, b = 3, c = 2;
let result = a + b / c;
console.log(result);
```

### Issue 2: Unclear math expression
**Description:** Hard to read formula for area
```javascript
let r = 5;
let area = 3.14159 * r * r;
console.log(area);
```

### Issue 3: Not using Math constants
**Description:** Manual pi value
```javascript
let circumference = 2 * 3.1415926535 * 10;
console.log(circumference);
```

### Issue 4: Deeply nested parentheses
**Description:** Too many nested parentheses
```javascript
let result = ((((5 + 3) * 2) - 4) / 2) + 1;
console.log(result);
```

### Issue 5: Not breaking down complex formulas
**Description:** Calculate compound interest in one line
```javascript
let final = 1000 * Math.pow(1 + 0.05 / 12, 12 * 5);
console.log(final);
```

### Issue 6: Magic math constants
**Description:** Hardcoded gravity value
```javascript
let force = 9.8 * 70;
console.log(force);
```

### Issue 7: Using == for number comparison
**Description:** Compare number with string
```javascript
let score = 100;
if (score == "100") {
  console.log("Perfect");
}
```

### Issue 8: Not handling NaN in calculations
**Description:** Calculate without NaN check
```javascript
function calculate(n) {
  return n * 2;
}
console.log(calculate("abc"));
```

### Issue 9: Not using isFinite before display
**Description:** Display potentially infinite value
```javascript
let result = 1 / 0;
console.log("Result: " + result);
```

### Issue 10: Not rounding monetary values
**Description:** Currency with more than 2 decimals
```javascript
let subtotal = 10.99;
let tax = subtotal * 0.08;
let total = subtotal + tax;
console.log(total);
```

### Issue 11: Using parseFloat for integer
**Description:** Parsing integer with parseFloat
```javascript
let input = "42";
let num = parseFloat(input);
console.log(num + 8);
```

### Issue 12: Using parseInt for decimal
**Description:** Parsing decimal with parseInt
```javascript
let input = "42.9";
let num = parseInt(input);
console.log(num);
```

### Issue 13: Not using radix in parseInt
**Description:** Parse user input without radix
```javascript
let userInput = "10";
let num = parseInt(userInput);
console.log(num);
```

### Issue 14: Confusing ++x and x++
**Description:** Postfix vs prefix in assignment
```javascript
let x = 5;
let y = x++;
let z = ++x;
console.log(x, y, z);
```

### Issue 15: Reassigning parameter
**Description:** Modify function parameter
```javascript
function addTax(price) {
  price = price * 1.08;
  return price;
}
console.log(addTax(100));
```

### Issue 16: Using decrement in loop
**Description:** Loop that counts down
```javascript
for (let i = 10; i > 0; i--) {
  console.log(i);
}
```

### Issue 17: Not using Math.floor for array index
**Description:** Use random as array index
```javascript
let arr = [10, 20, 30, 40];
let idx = Math.random() * arr.length;
console.log(arr[idx]);
```

### Issue 18: Not using Math.round for nearest int
**Description:** Round to nearest without Math.round
```javascript
let num = 4.6;
let rounded = parseInt(num + 0.5);
console.log(rounded);
```

### Issue 19: Not using toFixed for display
**Description:** Display price without formatting
```javascript
let price = 19.5;
console.log("$" + price);
```

### Issue 20: Extra decimals in calculation
**Description:** Division with long decimal
```javascript
let result = 10 / 3;
console.log(result);
```

### Issue 21: Using number methods without parentheses
**Description:** Call toFixed without ()
```javascript
let num = 42.5678;
console.log(num.toFixed);
```

### Issue 22: Not using Number.isInteger
**Description:** Check if number is integer
```javascript
let num = 5.5;
if (num === Math.floor(num)) {
  console.log("Integer");
}
```

### Issue 23: Not using Number.isNaN vs global
**Description:** Check NaN with isNaN
```javascript
let val = NaN;
if (isNaN(val)) {
  console.log("NaN");
}
```

### Issue 24: Using global isNaN on string
**Description:** Check if "abc" is NaN
```javascript
console.log(isNaN("abc"));
```

### Issue 25: Comparing with isFinite
**Description:** Check if string is finite
```javascript
console.log(isFinite("100"));
```

### Issue 26: Number.EPSILON misunderstanding
**Description:** Use EPSILON for comparison
```javascript
let a = 0.3;
let b = 0.1 + 0.2;
if (Math.abs(a - b) < Number.EPSILON) {
  console.log("Equal");
}
```

### Issue 27: Not using Math.trunc for integer part
**Description:** Get integer part of -5.7
```javascript
let num = -5.7;
let int = num | 0;
console.log(int);
```

### Issue 28: Using bitwise for rounding
**Description:** Round with bitwise OR
```javascript
let num = 5.7;
console.log(num | 0);
```

### Issue 29: Using double bitwise NOT
**Description:** Floor with ~~
```javascript
let num = 5.7;
console.log(~~num);
```

### Issue 30: Inconsistent spacing in expressions
**Description:** Mixed spacing in formula
```javascript
let result=10+20*3-4/2;
console.log(result);
```

## Modifications

### Modify 1: Add parentheses for clarity
**Description:** Make PEMDAS explicit with parentheses
```javascript
let result = 5 + 3 * 2;
console.log(result);
```

### Modify 2: Break down complex calculation
**Description:** Split formula into intermediate steps
```javascript
let final = 100 * (1 + 0.05 / 12) ** (12 * 5);
console.log(final);
```

### Modify 3: Add comments to math formula
**Description:** Explain each step of calculation
```javascript
let price = 100;
let tax = price * 0.08;
let total = price + tax;
console.log(total);
```

### Modify 4: Use Math.pow for exponentiation
**Description:** Replace ** with Math.pow
```javascript
let square = 5 ** 2;
console.log(square);
```

### Modify 5: Fix integer division for floor
**Description:** Use Math.floor for exact integer division
```javascript
let totalItems = 17;
let perPage = 5;
let pages = totalItems / perPage;
console.log(pages);
```

### Modify 6: Format large numbers with toLocaleString
**Description:** Display 1234567.89 formatted
```javascript
let num = 1234567.89;
console.log(num);
```

### Modify 7: Use Math.round for currency
**Description:** Round to nearest cent
```javascript
let amount = 10.567;
console.log(amount);
```

### Modify 8: Use Math.ceil for tax calculation
**Description:** Always round tax up
```javascript
let tax = 4.321;
console.log(tax);
```

### Modify 9: Use Math.floor for page calculation
**Description:** Floor when calculating pages
```javascript
let items = 23;
let perPage = 10;
let pages = items / perPage;
console.log(pages);
```

### Modify 10: Add number formatting function
**Description:** Format number with commas and decimals
```javascript
let num = 1234567.8912;
console.log(num);
```

### Modify 11: Use modulus for wrapping
**Description:** Wrap array index using %
```javascript
let index = 7;
let length = 5;
console.log(index);
```

### Modify 12: Check for even/odd with modulus
**Description:** Log "Even" or "Odd" for each number
```javascript
let num = 7;
console.log(num);
```

### Modify 13: Calculate remainder for change
**Description:** Find remaining dollars and cents
```javascript
let totalCents = 347;
console.log(totalCents);
```

### Modify 14: Use ** for square
**Description:** Calculate 15 squared
```javascript
let side = 15;
let area = side * side;
console.log(area);
```

### Modify 15: Use ** for cube root
**Description:** Calculate cube root of 27
```javascript
let num = 27;
let root = Math.pow(num, 1/3);
console.log(root);
```

### Modify 16: Add step-by-step discount calculation
**Description:** Show original, discount, final
```javascript
let price = 80;
let discount = 20;
let final = price - price * discount / 100;
console.log(final);
```

### Modify 17: Use Math.min for limit
**Description:** Cap value to maximum of 100
```javascript
let value = 150;
let max = 100;
console.log(value);
```

### Modify 18: Use Math.max for minimum
**Description:** Ensure value is at least 0
```javascript
let value = -10;
let min = 0;
console.log(value);
```

### Modify 19: Clamp value between min and max
**Description:** Keep value between 0 and 100
```javascript
let value = 150;
console.log(value);
```

### Modify 20: Use Math.abs for distance
**Description:** Calculate absolute difference
```javascript
let a = 10, b = 25;
let diff = a - b;
console.log(diff);
```

### Modify 21: Calculate factorial with loop
**Description:** Compute 6! using iteration
```javascript
let n = 6;
let result = 1;
console.log(n, result);
```

### Modify 22: Calculate nth Fibonacci number
**Description:** Get the 10th Fibonacci number
```javascript
let n = 10;
console.log(n);
```

### Modify 23: Check for prime number
**Description:** Determine if 17 is prime
```javascript
let num = 17;
console.log(num);
```

### Modify 24: Find greatest common divisor
**Description:** GCD of 12 and 18
```javascript
let a = 12, b = 18;
console.log(a, b);
```

### Modify 25: Find least common multiple
**Description:** LCM of 4 and 6
```javascript
let a = 4, b = 6;
console.log(a, b);
```

### Modify 26: Check if number is perfect square
**Description:** Determine if 25 is perfect square
```javascript
let num = 25;
console.log(num);
```

### Modify 27: Sum of digits in number
**Description:** Sum digits of 1234
```javascript
let num = 1234;
console.log(num);
```

### Modify 28: Reverse digits of number
**Description:** Reverse 1234 to 4321
```javascript
let num = 1234;
console.log(num);
```

### Modify 29: Count trailing zeros in factorial
**Description:** Trailing zeros in 10!
```javascript
let n = 10;
console.log(n);
```

### Modify 30: Add negative number handling
**Description:** Return 0 for negative inputs
```javascript
function square(n) {
  return n * n;
}
console.log(square(-5));
```

### Modify 31: Add zero handling in division
**Description:** Return 0 if denominator is 0
```javascript
function divide(a, b) {
  return a / b;
}
console.log(divide(10, 0));
```

### Modify 32: Convert string inputs to numbers
**Description:** Ensure both inputs are numbers
```javascript
function add(a, b) {
  return a + b;
}
console.log(add("5", "10"));
```

### Modify 33: Use exponentiation assignment
**Description:** Use **= operator
```javascript
let x = 5;
x = x ** 2;
console.log(x);
```

### Modify 34: Use nullish coalescing with numbers
**Description:** Default to 0 if null/undefined
```javascript
let count = null;
let display = count || 0;
console.log(display);
```

### Modify 35: Fix compound assignment with subtraction
**Description:** Use -= instead of =- 
```javascript
let budget = 100;
budget =- 30;
console.log(budget);
```

### Modify 36: Use numeric separator for readability
**Description:** Add underscores to 1000000
```javascript
let million = 1000000;
console.log(million);
```

### Modify 37: Convert string to number with +
**Description:** Use unary plus for conversion
```javascript
let str = "42";
let num = parseInt(str);
console.log(num + 8);
```

### Modify 38: Use Number() for conversion
**Description:** Convert with Number constructor
```javascript
let str = "3.14";
let num = parseFloat(str);
console.log(num * 2);
```

### Modify 39: Round to nearest integer
**Description:** Round 4.5 to nearest integer
```javascript
let num = 4.5;
console.log(num);
```

### Modify 40: Always round up for people count
**Description:** Ceil division for number of buses
```javascript
let people = 53;
let seatsPerBus = 20;
let buses = people / seatsPerBus;
console.log(buses);
```

### Modify 41: Always round down for page count
**Description:** Floor for display pages
```javascript
let totalResults = 95;
let perPage = 10;
let lastPage = totalResults / perPage;
console.log(lastPage);
```

### Modify 42: Add percentage calculation helper
**Description:** Calculate what percent of whole
```javascript
let part = 30;
let whole = 200;
console.log(part, whole);
```

### Modify 43: Calculate with discount tiers
**Description:** Apply tiered discount rates
```javascript
let amount = 250;
let discount = 0;
if (amount > 100) discount = 5;
if (amount > 200) discount = 10;
let final = amount - amount * discount / 100;
console.log(final);
```

### Modify 44: Add progressive tax calculation
**Description:** 10% on first $100, 20% on rest
```javascript
let income = 250;
console.log(income);
```

### Modify 45: Use Math.round for grade rounding
**Description:** Round grades to nearest integer
```javascript
let grades = [85.3, 92.7, 78.5, 88.9];
console.log(grades);
```

### Modify 46: Add calculation for time duration
**Description:** Convert seconds to minutes:seconds
```javascript
let totalSeconds = 125;
console.log(totalSeconds);
```

### Modify 47: Calculate percentage change
**Description:** Percent change from 50 to 75
```javascript
let old = 50;
let newVal = 75;
console.log(old, newVal);
```

### Modify 48: Use Math.hypot for distance
**Description:** Distance from origin to (3, 4)
```javascript
let x = 3, y = 4;
let distance = Math.sqrt(x * x + y * y);
console.log(distance);
```

### Modify 49: Calculate circle area with Math.PI
**Description:** Area of circle with radius 7
```javascript
let radius = 7;
let area = 3.14 * radius * radius;
console.log(area);
```

### Modify 50: Add number-to-words for units place
**Description:** Show word for ones digit of 42
```javascript
let num = 42;
console.log(num);
```
