# Level 08: Numbers & Math — Floating Point & Precision

## Errors

### Error 1: Classic float addition error
**Description:** Add 0.1 and 0.2
```javascript
let sum = 0.1 + 0.2;
console.log(sum === 0.3);
```

### Error 2: Float multiplication error
**Description:** Multiply 0.3 by 3
```javascript
let result = 0.3 * 3;
console.log(result);
```

### Error 3: Float subtraction error
**Description:** Subtract 0.2 from 0.3
```javascript
let result = 0.3 - 0.2;
console.log(result);
```

### Error 4: Float division error
**Description:** Divide 1 by 10
```javascript
let result = 1 / 10;
console.log(result);
```

### Error 5: Accumulated float error
**Description:** Add 0.1 ten times
```javascript
let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += 0.1;
}
console.log(sum);
```

### Error 6: Float comparison in loop
**Description:** Loop until value reaches 1
```javascript
let x = 0;
while (x !== 1) {
  x += 0.1;
}
console.log(x);
```

### Error 7: toFixed returns string
**Description:** Add two prices after toFixed
```javascript
let a = 10.99;
let b = 5.99;
let total = a.toFixed(2) + b.toFixed(2);
console.log(total);
```

### Error 8: toFixed rounding error
**Description:** Round 1.005 to 2 decimals
```javascript
console.log(1.005.toFixed(2));
```

### Error 9: toFixed on negative
**Description:** Format -5.678 to 2 decimals
```javascript
console.log(-5.678.toFixed(2));
```

### Error 10: toPrecision rounding
**Description:** Format 123.456 to 2 significant digits
```javascript
console.log(123.456.toPrecision(2));
```

### Error 11: toPrecision on large number
**Description:** Format 123456 to 2 significant digits
```javascript
console.log(123456..toPrecision(2));
```

### Error 12: toExponential precision
**Description:** Format 12345 in exponential with 2 decimals
```javascript
console.log(12345..toExponential(2));
```

### Error 13: parseFloat with invalid chars
**Description:** Parse "12.34abc" as float
```javascript
console.log(parseFloat("12.34abc"));
```

### Error 14: Number.EPSILON for equality
**Description:** Use EPSILON for comparing 0.3
```javascript
let a = 0.1 + 0.2;
let b = 0.3;
console.log(Math.abs(a - b) < Number.EPSILON);
```

### Error 15: Number.EPSILON too small
**Description:** EPSILON too small for some comparisons
```javascript
let a = 1000.1 + 1000.2;
let b = 2000.3;
console.log(Math.abs(a - b) < Number.EPSILON);
```

### Error 16: Money calculation without cent rounding
**Description:** Calculate total with tax
```javascript
let price = 10.99;
let qty = 3;
let total = price * qty * 1.08;
console.log(total);
```

### Error 17: Money calculation with division
**Description:** Split $100.00 three ways
```javascript
let total = 100.00;
let each = total / 3;
console.log(each);
```

### Error 18: Percentage calculation float error
**Description:** Calculate 33.33% of 100
```javascript
let percent = 33.33;
let result = 100 * percent / 100;
console.log(result);
```

### Error 19: Tax calculation without rounding
**Description:** 8% tax on $19.99
```javascript
let price = 19.99;
let tax = price * 0.08;
let total = price + tax;
console.log(total);
```

### Error 20: Discount calculation error
**Description:** 15% off $49.99
```javascript
let price = 49.99;
let discount = price * 0.15;
let final = price - discount;
console.log(final);
```

### Error 21: Currency rounding inconsistency
**Description:** Round half up correctly
```javascript
function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}
console.log(roundMoney(1.005));
```

### Error 22: Using Math.round for currency
**Description:** Round 10.675 to 2 decimals
```javascript
let amount = 10.675;
console.log(Math.round(amount * 100) / 100);
```

### Error 23: Truncating instead of rounding
**Description:** Truncate 10.679 to cent
```javascript
let amount = 10.679;
console.log(Math.trunc(amount * 100) / 100);
```

### Error 24: Floor for money rounding
**Description:** Use Math.floor for money
```javascript
let amount = 10.679;
console.log(Math.floor(amount * 100) / 100);
```

### Error 25: Ceil for money rounding
**Description:** Use Math.ceil for money
```javascript
let amount = 10.671;
console.log(Math.ceil(amount * 100) / 100);
```

### Error 26: Adding many small floats
**Description:** Sum of 0.01 repeated 100 times
```javascript
let total = 0;
for (let i = 0; i < 100; i++) {
  total += 0.01;
}
console.log(total);
```

### Error 27: Float comparison with > <
**Description:** Check if 0.1 + 0.2 > 0.3
```javascript
console.log(0.1 + 0.2 > 0.3);
```

### Error 28: Float comparison with >=
**Description:** Check if 1.0 - 0.9 >= 0.1
```javascript
console.log(1.0 - 0.9 >= 0.1);
```

### Error 29: Float multiplication inflation
**Description:** Multiply 0.0001 by 10000
```javascript
let result = 0.0001 * 10000;
console.log(result);
```

### Error 30: Scientific notation precision loss
**Description:** Large number with scientific notation
```javascript
let num = 1e20 + 1;
console.log(num);
```

### Error 31: Large number addition precision
**Description:** Add 1 to 10000000000000000
```javascript
let num = 10000000000000000;
console.log(num + 1);
```

### Error 32: MAX_SAFE_INTEGER exceeded
**Description:** Add to max safe integer
```javascript
let max = Number.MAX_SAFE_INTEGER;
console.log(max + 2);
```

### Error 33: MIN_SAFE_INTEGER exceeded
**Description:** Subtract from min safe integer
```javascript
let min = Number.MIN_SAFE_INTEGER;
console.log(min - 2);
```

### Error 34: Losing cents in conversion
**Description:** Convert $10.99 to cents
```javascript
let dollars = 10.99;
let cents = dollars * 100;
console.log(cents);
```

### Error 35: Converting cents back wrong
**Description:** Convert 1099 cents to dollars
```javascript
let cents = 1099;
let dollars = cents / 100;
console.log(dollars);
```

### Error 36: Interest calculation precision
**Description:** Monthly interest on $1000 at 5% APR
```javascript
let principal = 1000;
let rate = 0.05 / 12;
let interest = principal * rate;
console.log(interest);
```

### Error 37: Compound interest yearly
**Description:** Compound $1000 at 5% for 3 years
```javascript
let p = 1000, r = 0.05, t = 3;
let a = p * Math.pow(1 + r, t);
console.log(a);
```

### Error 38: Float comparison in sort
**Description:** Sort array of floats
```javascript
let arr = [0.1, 0.2, 0.15];
arr.sort();
console.log(arr);
```

### Error 39: toFixed with large decimals
**Description:** Use toFixed with 20 decimals
```javascript
let num = 1 / 3;
console.log(num.toFixed(20));
```

### Error 40: parseInt on float
**Description:** Parse "10.99" as integer
```javascript
let price = parseInt("10.99");
console.log(price);
```

### Error 41: Number() with empty string
**Description:** Convert "" to number
```javascript
console.log(Number(""));
```

### Error 42: Number() with whitespace
**Description:** Convert " " to number
```javascript
console.log(Number(" "));
```

### Error 43: isNaN with empty string
**Description:** Check if "" is NaN
```javascript
console.log(isNaN(""));
```

### Error 44: Number.isNaN vs isNaN
**Description:** Check if "NaN" string is NaN
```javascript
console.log(Number.isNaN("NaN"));
```

### Error 45: isNaN checking array
**Description:** Check if [1] is NaN
```javascript
console.log(isNaN([1]));
```

### Error 46: Number.isFinite vs isFinite
**Description:** Check if "100" is finite
```javascript
console.log(Number.isFinite("100"));
```

### Error 47: isFinite checking null
**Description:** Check if null is finite
```javascript
console.log(isFinite(null));
```

### Error 48: Number.isInteger on string
**Description:** Check if "5" is integer
```javascript
console.log(Number.isInteger("5"));
```

### Error 49: Number.isSafeInteger on decimal
**Description:** Check if 5.5 is safe integer
```javascript
console.log(Number.isSafeInteger(5.5));
```

### Error 50: Number.parseFloat global difference
**Description:** Use Number.parseFloat
```javascript
console.log(Number.parseFloat("12.5"));
```

### Error 51: Number.parseInt with radix
**Description:** Use Number.parseInt with radix 16
```javascript
console.log(Number.parseInt("FF", 16));
```

### Error 52: Float rounding for 0.05 increments
**Description:** Round to nearest 0.05
```javascript
let amount = 10.73;
let rounded = Math.round(amount * 20) / 20;
console.log(rounded);
```

### Error 53: Banker's rounding confusion
**Description:** Round 2.5 to nearest integer
```javascript
console.log(Math.round(2.5));
```

### Error 54: Rounding 3.5
**Description:** Round 3.5 to nearest integer
```javascript
console.log(Math.round(3.5));
```

### Error 55: toFixed rounding 2.5
**Description:** Round 2.5 to 0 decimals
```javascript
console.log(2.5.toFixed(0));
```

### Error 56: toFixed rounding 3.5
**Description:** Round 3.5 to 0 decimals
```javascript
console.log(3.5.toFixed(0));
```

### Error 57: toFixed with negative precision
**Description:** Use toFixed with -1
```javascript
let num = 42.5;
console.log(num.toFixed(-1));
```

### Error 58: toPrecision with negative
**Description:** Use toPrecision with -1
```javascript
let num = 123.456;
console.log(num.toPrecision(-1));
```

### Error 59: Multiple toFixed calls chained
**Description:** Chain toFixed calls
```javascript
let num = 42.5678;
console.log(num.toFixed(2).toFixed(3));
```

### Error 60: Float arithmetic with array reduce
**Description:** Sum floats in array
```javascript
let prices = [0.1, 0.2, 0.3];
let total = prices.reduce((a, b) => a + b);
console.log(total);
```

### Error 61: Float multiplication for rounding
**Description:** Round to 2 decimals by multiply/divide
```javascript
let amount = 10.675;
let rounded = Math.round(amount * 100) / 100;
console.log(rounded);
```

### Error 62: Adding cents and dollars mixed
**Description:** Mix dollar and cent values
```javascript
let dollars = 10;
let cents = 99;
let total = dollars + cents / 100;
console.log(total);
```

### Error 63: Currency formatting with concatenation
**Description:** Format as currency with $ and decimals
```javascript
let amount = 10.5;
console.log("$" + amount);
```

### Error 64: Number to fixed rounding half to even
**Description:** Round 1.5 with toFixed
```javascript
console.log(1.5.toFixed(0));
```

### Error 65: Number to fixed rounding 2.5
**Description:** Round 2.5 with toFixed
```javascript
console.log(2.5.toFixed(0));
```

### Error 66: Comparing 0.7 to 0.07 * 10
**Description:** Check if 0.07 * 10 equals 0.7
```javascript
console.log(0.07 * 10 === 0.7);
```

### Error 67: Comparing 0.8 to 0.08 * 10
**Description:** Check if 0.08 * 10 equals 0.8
```javascript
console.log(0.08 * 10 === 0.8);
```

### Error 68: Float error with currency conversion
**Description:** Convert $100 USD to EUR at rate 0.85
```javascript
let usd = 100;
let rate = 0.85;
let eur = usd * rate;
console.log(eur);
```

### Error 69: Precision loss in large decimal
**Description:** Add 1e-10 to 1e10
```javascript
let result = 1e10 + 1e-10;
console.log(result);
```

### Error 70: Float subtraction near zero
**Description:** Subtract nearly equal numbers
```javascript
let a = 0.3;
let b = 0.2;
let c = a - b;
console.log(c);
```

## Issues

### Issue 1: No rounding for monetary calculations
**Description:** Calculate total without rounding
```javascript
let items = [5.99, 12.49, 3.75];
let total = 0;
for (let item of items) {
  total += item;
}
console.log(total);
```

### Issue 2: Using float for currency
**Description:** Using float for dollar amounts
```javascript
let balance = 10.99;
let deposit = 5.05;
balance += deposit;
console.log(balance);
```

### Issue 3: Not using integer cents
**Description:** Store money as dollars not cents
```javascript
let price = 10.99;
let tax = price * 0.08;
let total = price + tax;
console.log(total);
```

### Issue 4: Direct float comparison
**Description:** Compare float result directly
```javascript
let total = 0.1 + 0.2;
if (total === 0.3) {
  console.log("OK");
}
```

### Issue 5: Comparing floats without epsilon
**Description:** Equality check without tolerance
```javascript
function areEqual(a, b) {
  return a === b;
}
console.log(areEqual(0.1 + 0.2, 0.3));
```

### Issue 6: For loop with float step
**Description:** Loop incrementing by 0.1
```javascript
for (let i = 0; i <= 1; i += 0.1) {
  console.log(i);
}
```

### Issue 7: toFixed then parseFloat back
**Description:** Format then convert back to number
```javascript
let price = 10.999;
let display = parseFloat(price.toFixed(2));
console.log(display);
```

### Issue 8: Using Math.round for decimal places
**Description:** Attempt to round to 2 decimals
```javascript
let amount = 10.675;
console.log(Math.round(amount * 100) / 100);
```

### Issue 9: Not handling floating point in totals
**Description:** Running total with floats
```javascript
let cart = [9.99, 14.50, 2.75];
let sum = 0;
for (let i = 0; i < cart.length; i++) {
  sum += cart[i];
}
console.log(sum);
```

### Issue 10: Displaying unrounded tax
**Description:** Show tax with too many decimals
```javascript
let subtotal = 47.25;
let tax = subtotal * 0.08;
console.log("Tax: $" + tax);
```

### Issue 11: Using == for float comparison
**Description:** Loose equality with floats
```javascript
let val = 1.0 - 0.9;
if (val == 0.1) {
  console.log("Equal");
}
```

### Issue 12: Confusing integer and float division
**Description:** Expect integer result
```javascript
console.log(5 / 2);
```

### Issue 13: Not using Math.floor for truncation
**Description:** Truncate decimal part of positive number
```javascript
let num = 5.7;
console.log(num | 0);
```

### Issue 14: Using parseInt for Math.floor
**Description:** Floor with parseInt
```javascript
let num = 5.99;
console.log(parseInt(num));
```

### Issue 15: Not using Number.EPSILON correctly
**Description:** Wrong epsilon comparison
```javascript
let a = 0.3;
let b = 0.1 + 0.2;
console.log(a - b < Number.EPSILON);
```

### Issue 16: Float increment in while loop
**Description:** While loop with float counter
```javascript
let x = 0.0;
while (x !== 1.0) {
  x += 0.2;
}
console.log(x);
```

### Issue 17: Multiple conversions in price calc
**Description:** String to number conversions
```javascript
let price = "19.99";
let qty = "3";
let total = parseFloat(price) * parseInt(qty);
console.log(total);
```

### Issue 18: Cumulative rounding errors
**Description:** Monthly interest adds up wrong
```javascript
let balance = 1000;
let rate = 0.05 / 12;
for (let m = 0; m < 12; m++) {
  balance += balance * rate;
}
console.log(balance);
```

### Issue 19: Not rounding after multiplication
**Description:** Price * quantity without rounding
```javascript
let price = 3.99;
let qty = 3;
let total = price * qty;
console.log(total);
```

### Issue 20: Using toFixed on NaN
**Description:** Call toFixed on NaN
```javascript
let result = NaN;
console.log(result.toFixed(2));
```

### Issue 21: Chaining arithmetic with unrounded values
**Description:** Multiple operations without intermediate rounding
```javascript
let cost = 100;
let discount = 0.15;
let tax = 0.08;
let final = cost - cost * discount + (cost - cost * discount) * tax;
console.log(final);
```

### Issue 22: Not using integer math for cents
**Description:** Calculate in dollars instead of cents
```javascript
let price = 10.99;
let qty = 3;
let total = price * qty;
console.log(total);
```

### Issue 23: Currency rounding direction wrong
**Description:** Round down instead of nearest
```javascript
let amount = 10.679;
console.log(Math.floor(amount * 100) / 100);
```

### Issue 24: Displaying too many decimals
**Description:** Log raw number without formatting
```javascript
let avg = 10 / 3;
console.log("Average: " + avg);
```

### Issue 25: Using var for calculations
**Description:** Variable hoisting in calculation
```javascript
var total = 0;
for (var i = 0; i < 5; i++) {
  total += i;
}
console.log(total);
```

### Issue 26: Magic precision values
**Description:** Hardcoded multiplier for rounding
```javascript
let price = 10.675;
let rounded = Math.round(price * 100) / 100;
console.log(rounded);
```

### Issue 27: Not checking before toFixed
**Description:** toFixed on invalid number
```javascript
let val = "abc";
console.log(Number(val).toFixed(2));
```

### Issue 28: Adding string numbers
**Description:** String concatenation instead of addition
```javascript
let a = "10";
let b = "20";
console.log(a + b);
```

### Issue 29: Not using Number for conversion
**Description:** Implicit conversion via *
```javascript
let str = "42";
console.log(str * 1);
```

### Issue 30: Multiplying floats for percentages
**Description:** Inline percentage without variable
```javascript
let price = 50;
let total = price + price * 0.08 + price * 0.15;
console.log(total);
```

## Modifications

### Modify 1: Fix float addition for display
**Description:** Display 0.1 + 0.2 as 0.3
```javascript
let sum = 0.1 + 0.2;
console.log(sum);
```

### Modify 2: Round monetary value to cents
**Description:** Round 10.675 to 10.68
```javascript
let amount = 10.675;
console.log(amount);
```

### Modify 3: Use integer cents for money
**Description:** Convert dollars to cents for calculation
```javascript
let price = 10.99;
let qty = 3;
let total = price * qty;
console.log(total);
```

### Modify 4: Add epsilon comparison function
**Description:** Compare floats with tolerance
```javascript
let a = 0.1 + 0.2;
let b = 0.3;
if (a === b) {
  console.log("Equal");
}
```

### Modify 5: Format total as currency
**Description:** Display total with $ sign and 2 decimals
```javascript
let total = 42.5;
console.log(total);
```

### Modify 6: Add rounding to tax calculation
**Description:** Round tax to nearest cent
```javascript
let price = 47.25;
let tax = price * 0.08;
console.log(tax);
```

### Modify 7: Fix split bill calculation
**Description:** Split $100 evenly among 3 people
```javascript
let total = 100;
let people = 3;
let each = total / people;
console.log(each);
```

### Modify 8: Use toFixed for display
**Description:** Show with exactly 2 decimal places
```javascript
let amount = 10;
console.log(amount);
```

### Modify 9: Add round to nearest cent function
**Description:** Create roundMoney helper
```javascript
let price = 20.999;
console.log(price);
```

### Modify 10: Calculate correct change
**Description:** Return proper coins breakdown
```javascript
let paid = 5.00;
let cost = 3.47;
let change = paid - cost;
console.log(change);
```

### Modify 11: Use Number.EPSILON for comparison
**Description:** Add epsilon tolerance to comparison
```javascript
function eq(a, b) {
  return a === b;
}
console.log(eq(0.1 + 0.2, 0.3));
```

### Modify 12: Convert to cents before calculation
**Description:** Work in cents to avoid float errors
```javascript
let price1 = 10.99;
let price2 = 5.99;
let sum = price1 + price2;
console.log(sum);
```

### Modify 13: Fix increment by 0.1 display
**Description:** Print values from 0 to 1 stepping by 0.1
```javascript
for (let i = 0; i <= 1; i += 0.1) {
  console.log(i);
}
```

### Modify 14: Round average to 1 decimal
**Description:** Round grade average to 1 decimal
```javascript
let scores = [88, 92, 85];
let avg = (scores[0] + scores[1] + scores[2]) / 3;
console.log(avg);
```

### Modify 15: Add toFixed after each operation
**Description:** Round intermediate results
```javascript
let base = 29.99;
let tax = base * 0.08;
let tip = base * 0.15;
let total = base + tax + tip;
console.log(total);
```

### Modify 16: Fix percentage calculation
**Description:** Calculate exactly 33.33% of 100
```javascript
let pct = 33.33;
let num = 100;
let result = num * pct / 100;
console.log(result);
```

### Modify 17: Format currency with comma
**Description:** Display 1234.5 as "$1,234.50"
```javascript
let amount = 1234.5;
console.log(amount);
```

### Modify 18: Use Math.round for grader
**Description:** Round student grade to nearest integer
```javascript
let grade = 89.7;
console.log(grade);
```

### Modify 19: Calculate with precision for recipe
**Description:** Scale recipe ingredients correctly
```javascript
let flour = 2.5;
let scale = 1.5;
let needed = flour * scale;
console.log(needed);
```

### Modify 20: Add running total with rounding
**Description:** Add items and round each step
```javascript
let items = [4.99, 12.49, 6.99];
let total = 0;
for (let item of items) {
  total += item;
}
console.log(total);
```

### Modify 21: Fix conversion rate display
**Description:** Show exchange rate with 4 decimals
```javascript
let rate = 1 / 3;
console.log(rate);
```

### Modify 22: Calculate weighted grade
**Description:** Weighted average with precision
```javascript
let hw = 85, exam = 92;
let final = hw * 0.4 + exam * 0.6;
console.log(final);
```

### Modify 23: Add round half up function
**Description:** Implement proper half-up rounding
```javascript
let num = 1.005;
console.log(num);
```

### Modify 24: Format large price
**Description:** Display 1234567.89 with commas
```javascript
let price = 1234567.89;
console.log(price);
```

### Modify 25: Calculate correct tip amount
**Description:** 15% tip rounded to nearest cent
```javascript
let bill = 67.83;
let tipPercent = 15;
let tip = bill * tipPercent / 100;
console.log(tip);
```

### Modify 26: Use toLocaleString for currency
**Description:** Format number as locale currency
```javascript
let amount = 1234567.89;
console.log(amount);
```

### Modify 27: Fix cumulative float error in loop
**Description:** Sum 0.1 ten times correctly
```javascript
let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += 0.1;
}
console.log(sum);
```

### Modify 28: Handle very small numbers
**Description:** Compare very small decimals
```javascript
let a = 1e-10;
let b = 1e-10;
if (a === b) {
  console.log("Equal");
}
```

### Modify 29: Add discount with proper rounding
**Description:** 20% off $49.99 rounded correctly
```javascript
let price = 49.99;
let discount = 0.2;
let final = price * (1 - discount);
console.log(final);
```

### Modify 30: Create money formatter
**Description:** Function to format any number as $X.XX
```javascript
let amounts = [10, 10.5, 10.999];
console.log(amounts);
```

### Modify 31: Fix monthly payment display
**Description:** Show mortgage payment with 2 decimals
```javascript
let monthly = 1234.5678;
console.log(monthly);
```

### Modify 32: Calculate correct cents from dollars
**Description:** Convert $10.99 to integer cents
```javascript
let dollars = 10.99;
let cents = dollars * 100;
console.log(cents);
```

### Modify 33: Convert cents back to display
**Description:** Format 1099 cents as $10.99
```javascript
let cents = 1099;
console.log(cents);
```

### Modify 34: Fix gas price display
**Description:** Show $3.499 per gallon
```javascript
let price = 3.499;
console.log(price);
```

### Modify 35: Add rounding for payroll
**Description:** Round hourly pay to nearest cent
```javascript
let hours = 40;
let rate = 15.75;
let pay = hours * rate;
console.log(pay);
```

### Modify 36: Calculate tax with ceil
**Description:** Always round tax up to nearest cent
```javascript
let amount = 10.25;
let taxRate = 0.08;
let tax = amount * taxRate;
console.log(tax);
```

### Modify 37: Fix divided display
**Description:** Show 1/3 as 33.33%
```javascript
let fraction = 1 / 3;
console.log(fraction);
```

### Modify 38: Add precision for scientific calculation
**Description:** Show result with 4 decimal places
```javascript
let result = 9.81 * 10;
console.log(result);
```

### Modify 39: Use Math.round for stock price
**Description:** Round stock price to 2 decimals
```javascript
let stockPrice = 145.6789;
console.log(stockPrice);
```

### Modify 40: Calculate annual vs monthly
**Description:** Convert 5% APR to monthly correctly
```javascript
let annualRate = 0.05;
let monthlyRate = annualRate / 12;
console.log(monthlyRate);
```

### Modify 41: Add rounding for invoice items
**Description:** Round each line item to 2 decimals
```javascript
let items = [
  {price: 12.345, qty: 2},
  {price: 8.999, qty: 1}
];
console.log(items);
```

### Modify 42: Format percentage display
**Description:** Show 0.0825 as 8.25%
```javascript
let taxRate = 0.0825;
console.log(taxRate);
```

### Modify 43: Add proper rounding for GPA
**Description:** Round GPA to 2 decimal places
```javascript
let gpa = 3.5678;
console.log(gpa);
```

### Modify 44: Use Number.parseFloat for safety
**Description:** Parse price input with parseFloat
```javascript
let input = "$19.99";
let price = parseFloat(input);
console.log(price);
```

### Modify 45: Add validation for number inputs
**Description:** Check if parsed value is valid number
```javascript
let input = "abc";
let num = parseFloat(input);
console.log(num);
```

### Modify 46: Round distance to 1 decimal
**Description:** Show distance with 1 decimal place
```javascript
let distance = 12.3456;
console.log(distance);
```

### Modify 47: Fix gradient calculation
**Description:** Calculate slope with proper precision
```javascript
let rise = 3, run = 7;
let slope = rise / run;
console.log(slope);
```

### Modify 48: Add rounding to dosage calculation
**Description:** Round medicine dosage to 1 decimal
```javascript
let weight = 70;
let dosePerKg = 2.5;
let dose = weight * dosePerKg;
console.log(dose);
```

### Modify 49: Format percentage change
**Description:** Show change from 50 to 75 as +50%
```javascript
let old = 50, newVal = 75;
let change = (newVal - old) / old * 100;
console.log(change);
```

### Modify 50: Round game score display
**Description:** Show score with comma formatting
```javascript
let score = 123456;
console.log(score);
```
