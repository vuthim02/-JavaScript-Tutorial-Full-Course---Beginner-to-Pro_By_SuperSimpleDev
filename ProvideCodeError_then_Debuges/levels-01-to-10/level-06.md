# Level 06: Numbers & Math — Basic Arithmetic

## Errors

### Error 1: Missing operator between numbers
**Description:** Multiply 5 by 3
```javascript
let result = 5 3;
console.log(result);
```

### Error 2: Using letters in number
**Description:** Assign the number 42
```javascript
let num = 4o2;
console.log(num);
```

### Error 3: Division by string zero
**Description:** Divide 10 by "0"
```javascript
console.log(10 / "0");
```

### Error 4: Multiplication of string and number
**Description:** Multiply "five" by 2
```javascript
console.log("five" * 2);
```

### Error 5: Addition with undefined
**Description:** Add 5 to undefined
```javascript
let x;
console.log(x + 5);
```

### Error 6: Subtraction with null
**Description:** Subtract 5 from null
```javascript
console.log(null - 5);
```

### Error 7: Modulo by zero
**Description:** Calculate 10 % 0
```javascript
console.log(10 % 0);
```

### Error 8: Exponentiation with wrong operator
**Description:** Calculate 2 to the power of 3
```javascript
let result = 2 ^ 3;
console.log(result);
```

### Error 9: Using XOR for exponentiation
**Description:** Calculate 5 squared
```javascript
let square = 5 ^ 2;
console.log(square);
```

### Error 10: Missing second operand
**Description:** Add 5 plus something
```javascript
let result = 5 + ;
console.log(result);
```

### Error 11: Operator at end of line
**Description:** Add three numbers
```javascript
let total = 10 +
20
+ 30;
console.log(total);
```

### Error 12: PEMDAS order misunderstanding
**Description:** Calculate 5 + 3 * 2 expecting 16
```javascript
let result = (5 + 3) * 2;
console.log(result);
```

### Error 13: PEMDAS wrong grouping
**Description:** Calculate (5 + 3) * 2 but written wrong
```javascript
let result = 5 + 3 * 2;
console.log(result);
```

### Error 14: Wrong order for average
**Description:** Calculate average of 10, 20, 30
```javascript
let avg = 10 + 20 + 30 / 3;
console.log(avg);
```

### Error 15: Wrong parentheses for percentage
**Description:** Calculate 20% of 50
```javascript
let result = 50 * 20 / 100;
console.log(result);
```

### Error 16: Missing parentheses for compound expression
**Description:** Calculate (a + b) * c
```javascript
let a = 5, b = 3, c = 2;
let result = a + b * c;
console.log(result);
```

### Error 17: Wrong result from mixed operations
**Description:** Calculate 10 - 5 + 2 expecting 3
```javascript
let result = 10 - (5 + 2);
console.log(result);
```

### Error 18: Increment before vs after confusion
**Description:** Use postfix increment in assignment
```javascript
let x = 5;
let y = x++;
console.log(y);
```

### Error 19: Prefix increment confusion
**Description:** Use prefix increment in expression
```javascript
let x = 5;
let y = ++x;
console.log(x, y);
```

### Error 20: Decrement confusion
**Description:** Use decrement in expression
```javascript
let x = 10;
let y = x--;
console.log(x, y);
```

### Error 21: Compound assignment with wrong operator
**Description:** Add 5 to x using +=
```javascript
let x = 10;
x =+ 5;
console.log(x);
```

### Error 22: Compound assignment reversed
**Description:** Use =+ instead of +=
```javascript
let x = 10;
x =+ 5;
console.log(x);
```

### Error 23: Using *= with wrong syntax
**Description:** Multiply x by 2 using *=
```javascript
let x = 10;
x =* 2;
console.log(x);
```

### Error 24: Compound assignment with -= wrong
**Description:** Subtract 3 using -=
```javascript
let x = 10;
x =- 3;
console.log(x);
```

### Error 25: Chaining assignment with addition
**Description:** Add to multiple variables
```javascript
let a = b = 5;
a += b += 5;
console.log(a, b);
```

### Error 26: Using = for comparison in math
**Description:** Check if result is 10
```javascript
let a = 5, b = 5;
let result = a + b = 10;
console.log(result);
```

### Error 27: Wrong use of Math without dot
**Description:** Use Math floor
```javascript
console.log(Mathfloor(5.7));
```

### Error 28: Math function called without parentheses
**Description:** Call Math.floor
```javascript
console.log(Math.floor);
```

### Error 29: Using Math as constructor
**Description:** Create new Math object
```javascript
let m = new Math();
console.log(m.PI);
```

### Error 30: Accessing Math.PI with wrong case
**Description:** Use Math.pi
```javascript
console.log(Math.pi);
```

### Error 31: Using Math.E with wrong case
**Description:** Access Euler's number
```javascript
console.log(Math.e);
```

### Error 32: Math.round called on string
**Description:** Round "4.7" to nearest int
```javascript
console.log(Math.round("4.7"));
```

### Error 33: Math.ceil on string
**Description:** Ceil "4.2"
```javascript
console.log(Math.ceil("4.2"));
```

### Error 34: Math.floor on string
**Description:** Floor "4.9"
```javascript
console.log(Math.floor("4.9"));
```

### Error 35: Math.random used without parentheses
**Description:** Get random number
```javascript
console.log(Math.random);
```

### Error 36: Math.random range wrong
**Description:** Get random int between 1 and 10
```javascript
let rand = Math.random() * 10 + 1;
console.log(rand);
```

### Error 37: Math.floor on negative number wrong
**Description:** Floor a negative number
```javascript
console.log(Math.floor(-3.5));
```

### Error 38: Math.ceil on negative wrong
**Description:** Ceil a negative number
```javascript
console.log(Math.ceil(-3.5));
```

### Error 39: Math.round negative wrong
**Description:** Round -3.5
```javascript
console.log(Math.round(-3.5));
```

### Error 40: Math.abs result expected
**Description:** Get absolute value of -10
```javascript
console.log(Math.abs(-10));
```

### Error 41: Math.max on array directly
**Description:** Find max of [3, 7, 2]
```javascript
console.log(Math.max([3, 7, 2]));
```

### Error 42: Math.min on array directly
**Description:** Find min of [3, 7, 2]
```javascript
console.log(Math.min([3, 7, 2]));
```

### Error 43: Math.pow with wrong arguments
**Description:** Calculate 2 to the power 10
```javascript
console.log(Math.pow(2, 10));
```

### Error 44: Math.sqrt of negative
**Description:** Square root of -4
```javascript
console.log(Math.sqrt(-4));
```

### Error 45: Math.log of negative
**Description:** Natural log of -1
```javascript
console.log(Math.log(-1));
```

### Error 46: ParseInt without radix
**Description:** Parse "10" as decimal
```javascript
console.log(parseInt("10"));
```

### Error 47: ParseInt with wrong radix
**Description:** Parse "10" as binary
```javascript
console.log(parseInt("10", 2));
```

### Error 48: parseFloat on non-numeric
**Description:** Parse "12.5abc" as float
```javascript
console.log(parseFloat("12.5abc"));
```

### Error 49: Number constructor without new
**Description:** Convert "42" to number
```javascript
console.log(Number("42"));
```

### Error 50: Using + unary with space
**Description:** Convert string to number with +
```javascript
let str = "42";
console.log(+ str);
```

### Error 51: Using - unary on string
**Description:** Convert to negative number
```javascript
let str = "42";
console.log(-str);
```

### Error 52: Increment on non-number
**Description:** Increment a string variable
```javascript
let count = "5";
count++;
console.log(count);
```

### Error 53: Decrement on non-number
**Description:** Decrement a string
```javascript
let val = "10";
val--;
console.log(val);
```

### Error 54: Float addition error
**Description:** Add 0.1 and 0.2
```javascript
console.log(0.1 + 0.2);
```

### Error 55: Float comparison error
**Description:** Check if 0.1 + 0.2 equals 0.3
```javascript
if (0.1 + 0.2 === 0.3) {
  console.log("Equal");
} else {
  console.log("Not equal");
}
```

### Error 56: Float multiplication error
**Description:** Multiply 0.3 by 3
```javascript
let result = 0.3 * 3;
console.log(result);
```

### Error 57: Float division precision
**Description:** Divide 1 by 3
```javascript
let result = 1 / 3;
console.log(result);
```

### Error 58: toFixed returns string
**Description:** Fix 2 decimals and add
```javascript
let price = 9.99;
let tax = price * 0.1;
let total = price.toFixed(2) + tax.toFixed(2);
console.log(total);
```

### Error 59: toFixed rounding issue
**Description:** Round 1.005 to 2 decimals
```javascript
console.log(1.005.toFixed(2));
```

### Error 60: Number.EPSILON comparison
**Description:** Compare floats with epsilon
```javascript
let a = 0.1 + 0.2;
let b = 0.3;
console.log(a - b < Number.EPSILON);
```

### Error 61: MAX_SAFE_INTEGER addition
**Description:** Add 1 to MAX_SAFE_INTEGER
```javascript
let max = Number.MAX_SAFE_INTEGER;
console.log(max + 1);
```

### Error 62: MIN_SAFE_INTEGER subtraction
**Description:** Subtract 1 from MIN_SAFE_INTEGER
```javascript
let min = Number.MIN_SAFE_INTEGER;
console.log(min - 1);
```

### Error 63: Using isNaN on non-number
**Description:** Check if "abc" is NaN
```javascript
console.log(isNaN("abc"));
```

### Error 64: Using isFinite on non-number
**Description:** Check if Infinity is finite
```javascript
console.log(isFinite(Infinity));
```

### Error 65: Wrong number overflow check
**Description:** Check if number is too large
```javascript
let big = 1e500;
console.log(big === Infinity);
```

### Error 66: Using Number.MAX_VALUE wrong
**Description:** Store maximum number value
```javascript
console.log(Number.MAX_VALUE);
```

### Error 67: Using Number.MIN_VALUE for smallest negative
**Description:** Get smallest number
```javascript
console.log(Number.MIN_VALUE);
```

### Error 68: Positive and negative zero confusion
**Description:** Check if -0 equals 0
```javascript
console.log(-0 === 0);
```

### Error 69: Object.is for zero comparison
**Description:** Compare -0 and 0 with Object.is
```javascript
console.log(Object.is(-0, 0));
```

### Error 70: NaN compared with itself using Object.is
**Description:** Check NaN === NaN
```javascript
console.log(Object.is(NaN, NaN));
```

## Issues

### Issue 1: Magic numbers in calculations
**Description:** Calculate area of circle with hardcoded PI
```javascript
let radius = 5;
let area = 3.14159 * radius * radius;
console.log(area);
```

### Issue 2: Hardcoded discount percentage
**Description:** Apply 15% discount
```javascript
let price = 100;
let discounted = price * 0.85;
console.log(discounted);
```

### Issue 3: Not using Math.PI
**Description:** Use 3.14 instead of Math.PI
```javascript
let circumference = 2 * 3.14 * 5;
console.log(circumference);
```

### Issue 4: Not using Math for rounding
**Description:** Manual rounding via parseInt
```javascript
let num = 4.7;
let rounded = parseInt(num + 0.5);
console.log(rounded);
```

### Issue 5: Manual absolute value
**Description:** Get absolute value without Math.abs
```javascript
let num = -10;
let abs = num < 0 ? -num : num;
console.log(abs);
```

### Issue 6: Manual min/max
**Description:** Find min without Math.min
```javascript
let a = 5, b = 10;
let min = a < b ? a : b;
console.log(min);
```

### Issue 7: Manual power calculation
**Description:** Calculate cube without Math.pow
```javascript
let num = 3;
let cube = num * num * num;
console.log(cube);
```

### Issue 8: Floating point unchecked
**Description:** Compare floats directly
```javascript
let total = 0.1 + 0.2;
if (total === 0.3) {
  console.log("Equal");
}
```

### Issue 9: Using parseInt for floor
**Description:** Floor with parseInt
```javascript
let num = 4.99;
console.log(parseInt(num));
```

### Issue 10: Not rounding currency
**Description:** Calculate total without rounding
```javascript
let price = 10.99;
let qty = 3;
let total = price * qty;
console.log(total);
```

### Issue 11: Losing precision with large numbers
**Description:** Add large integers
```javascript
let a = 9999999999999999;
console.log(a + 1);
```

### Issue 12: Using Number() instead of +
**Description:** Convert string to number
```javascript
let str = "42";
let num = Number(str);
console.log(num + 8);
```

### Issue 13: Unnecessary parseFloat
**Description:** No decimal parsing needed
```javascript
let str = "42";
let num = parseFloat(str);
console.log(num + 8);
```

### Issue 14: parseInt for exact integer
**Description:** Safely parse integer
```javascript
let input = "42.9";
let num = parseInt(input);
console.log(num);
```

### Issue 15: Not checking for NaN after parseInt
**Description:** Parse without validation
```javascript
let input = "abc";
let num = parseInt(input);
console.log(num + 10);
```

### Issue 16: Using Math.floor for truncation
**Description:** Truncate decimal with floor
```javascript
let num = 4.7;
console.log(Math.floor(num));
```

### Issue 17: Using Math.ceil for rounding up
**Description:** Always round up
```javascript
let num = 4.2;
console.log(Math.ceil(num));
```

### Issue 18: Not using Number.EPSILON for comparison
**Description:** Float comparison without tolerance
```javascript
let a = 0.3;
let b = 0.1 + 0.2;
if (a === b) {
  console.log("Equal");
}
```

### Issue 19: Math.random without floor
**Description:** Get integer from random
```javascript
let rand = Math.random() * 10;
console.log(rand);
```

### Issue 20: Using % for negative numbers wrong
**Description:** Calculate -5 % 2
```javascript
console.log(-5 % 2);
```

### Issue 21: Not handling division remainder correctly
**Description:** Check if number is even
```javascript
let num = 7;
if (num % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}
```

### Issue 22: Modulo with floats
**Description:** Calculate 10.5 % 3
```javascript
console.log(10.5 % 3);
```

### Issue 23: Increment in return statement confusion
**Description:** Return incremented value
```javascript
function getNext(num) {
  return num++;
}
console.log(getNext(5));
```

### Issue 24: Using assignment in return
**Description:** Return after compound assignment
```javascript
function addTen(num) {
  return num += 10;
}
console.log(addTen(5));
```

### Issue 25: Missing space for readability
**Description:** Complex calculation without spaces
```javascript
let result=5+3*2-8/4;
console.log(result);
```

### Issue 26: Chaining increment operators
**Description:** Multiple increments in one line
```javascript
let x = 5;
let y = x++ + ++x;
console.log(x, y);
```

### Issue 27: Using bitwise operators instead of math
**Description:** Use >> for division by 2
```javascript
let num = 10;
let half = num >> 1;
console.log(half);
```

### Issue 28: Using bitwise left shift for multiply
**Description:** Use << for multiplication
```javascript
let num = 5;
let doubled = num << 1;
console.log(doubled);
```

### Issue 29: Not using exponentiation operator
**Description:** Use Math.pow instead of **
```javascript
let square = Math.pow(5, 2);
console.log(square);
```

### Issue 30: Using decimal for percentage
**Description:** 20% as 20/100 vs 0.2
```javascript
let price = 50;
let tip = price * 20 / 100;
console.log(tip);
```

## Modifications

### Modify 1: Add rounding to total
**Description:** Round the total to 2 decimal places
```javascript
let price = 19.99;
let qty = 3;
let total = price * qty;
console.log(total);
```

### Modify 2: Add tax calculation
**Description:** Calculate 8% tax on subtotal
```javascript
let subtotal = 100;
console.log("Subtotal:", subtotal);
```

### Modify 3: Apply discount
**Description:** Apply 10% discount to price
```javascript
let price = 200;
console.log("Original:", price);
```

### Modify 4: Calculate average of three numbers
**Description:** Find average of 10, 20, 30
```javascript
let a = 10, b = 20, c = 30;
console.log(a, b, c);
```

### Modify 5: Format number as currency
**Description:** Display $9.99 format with 2 decimals
```javascript
let amount = 9.9;
console.log(amount);
```

### Modify 6: Add percentage calculation
**Description:** Calculate what percent 25 is of 200
```javascript
let part = 25;
let whole = 200;
console.log(part, whole);
```

### Modify 7: Calculate tip amount
**Description:** Calculate 15% tip on bill
```javascript
let bill = 85.50;
console.log("Bill:", bill);
```

### Modify 8: Split bill equally
**Description:** Split total among 4 people
```javascript
let total = 120;
let people = 4;
console.log(total, people);
```

### Modify 9: Convert Celsius to Fahrenheit
**Description:** Convert 25°C to Fahrenheit
```javascript
let celsius = 25;
console.log(celsius);
```

### Modify 10: Convert Fahrenheit to Celsius
**Description:** Convert 77°F to Celsius
```javascript
let fahrenheit = 77;
console.log(fahrenheit);
```

### Modify 11: Calculate BMI
**Description:** BMI = weight(kg) / height(m)^2
```javascript
let weight = 70;
let height = 1.75;
console.log(weight, height);
```

### Modify 12: Calculate simple interest
**Description:** Interest = principal * rate * time
```javascript
let principal = 1000;
let rate = 0.05;
let time = 2;
console.log(principal, rate, time);
```

### Modify 13: Add shipping cost
**Description:** Add $5.99 shipping if order under $50
```javascript
let orderTotal = 35;
console.log("Order:", orderTotal);
```

### Modify 14: Calculate miles per gallon
**Description:** MPG = miles / gallons
```javascript
let miles = 300;
let gallons = 10;
console.log(miles, gallons);
```

### Modify 15: Convert hours to minutes
**Description:** Convert 2.5 hours to minutes
```javascript
let hours = 2.5;
console.log(hours);
```

### Modify 16: Convert minutes to seconds
**Description:** Convert 5 minutes to seconds
```javascript
let minutes = 5;
console.log(minutes);
```

### Modify 17: Calculate speed
**Description:** Speed = distance / time
```javascript
let distance = 100;
let time = 2;
console.log(distance, time);
```

### Modify 18: Calculate perimeter of rectangle
**Description:** Perimeter = 2 * (length + width)
```javascript
let length = 10;
let width = 5;
console.log(length, width);
```

### Modify 19: Calculate area of triangle
**Description:** Area = 0.5 * base * height
```javascript
let base = 8;
let height = 6;
console.log(base, height);
```

### Modify 20: Calculate volume of cube
**Description:** Volume = side^3
```javascript
let side = 4;
console.log(side);
```

### Modify 21: Format large number with commas
**Description:** Display 1234567 as 1,234,567
```javascript
let largeNum = 1234567;
console.log(largeNum);
```

### Modify 22: Add minimum purchase check
**Description:** Require minimum $10 purchase
```javascript
let cartTotal = 8.50;
console.log("Cart:", cartTotal);
```

### Modify 23: Calculate change due
**Description:** Return change from $20 for $12.50 item
```javascript
let paid = 20;
let cost = 12.50;
console.log(paid, cost);
```

### Modify 24: Calculate discount amount
**Description:** Show how much money saved with 25% off
```javascript
let originalPrice = 80;
let discountPercent = 25;
console.log(originalPrice, discountPercent);
```

### Modify 25: Add sales tax to each item
**Description:** Calculate tax and add to each item
```javascript
let items = [10, 20, 30];
let taxRate = 0.08;
console.log(items, taxRate);
```

### Modify 26: Calculate compound interest
**Description:** A = P(1 + r/n)^(nt)
```javascript
let principal = 1000;
let rate = 0.05;
let n = 12;
let years = 5;
console.log(principal, rate, n, years);
```

### Modify 27: Convert currency
**Description:** Convert USD to EUR at rate 0.92
```javascript
let usd = 100;
let rate = 0.92;
console.log(usd, rate);
```

### Modify 28: Calculate payroll
**Description:** Pay = hours * rate with overtime 1.5x after 40
```javascript
let hours = 45;
let hourlyRate = 20;
console.log(hours, hourlyRate);
```

### Modify 29: Add late fee calculation
**Description:** Add $5 per day late up to $50
```javascript
let daysLate = 7;
let dailyFee = 5;
console.log(daysLate, dailyFee);
```

### Modify 30: Calculate grade average
**Description:** Average of test scores
```javascript
let scores = [88, 92, 76, 95, 89];
console.log(scores);
```

### Modify 31: Add number validation
**Description:** Ensure input is a valid number before math
```javascript
let input = "abc";
let result = input * 2;
console.log(result);
```

### Modify 32: Fix floating point precision
**Description:** Display 0.1 + 0.2 correctly as 0.30
```javascript
let sum = 0.1 + 0.2;
console.log(sum);
```

### Modify 33: Add minimum value for price
**Description:** Ensure price is at least $0.01
```javascript
let price = -5;
console.log("Price:", price);
```

### Modify 34: Add maximum value for quantity
**Description:** Limit quantity to 99 max
```javascript
let qty = 150;
console.log("Qty:", qty);
```

### Modify 35: Calculate monthly payment
**Description:** Loan payment = principal * rate / (1 - (1 + rate)^(-n))
```javascript
let loanAmount = 10000;
let annualRate = 0.05;
let months = 12;
console.log(loanAmount, annualRate, months);
```

### Modify 36: Add bulk discount
**Description:** 5% off for orders over $100
```javascript
let order = 150;
console.log("Order total:", order);
```

### Modify 37: Calculate remaining budget
**Description:** Budget minus expenses
```javascript
let budget = 500;
let expenses = 375;
console.log(budget, expenses);
```

### Modify 38: Calculate profit margin
**Description:** Margin = (revenue - cost) / revenue * 100
```javascript
let revenue = 1000;
let cost = 700;
console.log(revenue, cost);
```

### Modify 39: Convert kilometers to miles
**Description:** 1 km = 0.621371 miles
```javascript
let km = 10;
console.log(km);
```

### Modify 40: Convert miles to kilometers
**Description:** 1 mile = 1.60934 km
```javascript
let miles = 10;
console.log(miles);
```

### Modify 41: Calculate calorie burn
**Description:** Calories = MET * weight(kg) * hours
```javascript
let met = 8;
let weight = 70;
let hours = 1;
console.log(met, weight, hours);
```

### Modify 42: Calculate area of circle with Math.PI
**Description:** Use Math.PI instead of hardcoded 3.14
```javascript
let radius = 5;
let area = 3.14 * radius * radius;
console.log(area);
```

### Modify 43: Add quantity discount tiers
**Description:** 10% off for 10+, 20% off for 50+
```javascript
let qty = 25;
let unitPrice = 10;
console.log(qty, unitPrice);
```

### Modify 44: Calculate due date with days offset
**Description:** Add 30 days to current date
```javascript
let currentDate = new Date();
console.log(currentDate);
```

### Modify 45: Add rounding up for tax
**Description:** Always round tax up to nearest cent
```javascript
let amount = 10.25;
let tax = amount * 0.08;
console.log(tax);
```

### Modify 46: Calculate number of digits
**Description:** Count digits in a number
```javascript
let num = 12345;
console.log(num);
```

### Modify 47: Check if number is power of two
**Description:** Check if 16 is power of 2
```javascript
let num = 16;
console.log(num);
```

### Modify 48: Calculate factorial
**Description:** Calculate 5! = 120
```javascript
let n = 5;
console.log(n);
```

### Modify 49: Generate random integer in range
**Description:** Random int between 1 and 6 (dice roll)
```javascript
let min = 1;
let max = 6;
console.log(min, max);
```

### Modify 50: Calculate distance between two points
**Description:** Distance formula sqrt((x2-x1)^2 + (y2-y1)^2)
```javascript
let x1 = 0, y1 = 0;
let x2 = 3, y2 = 4;
console.log(x1, y1, x2, y2);
```
