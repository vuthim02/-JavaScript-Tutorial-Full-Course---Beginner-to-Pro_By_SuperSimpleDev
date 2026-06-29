# Level 09: Numbers & Math — Math Methods

## Errors

### Error 1: Math.max without spreading array
**Description:** Find max of [3, 7, 2, 9, 1]
```javascript
let nums = [3, 7, 2, 9, 1];
console.log(Math.max(nums));
```

### Error 2: Math.min without spreading array
**Description:** Find min of [5, 2, 8, 1, 9]
```javascript
let nums = [5, 2, 8, 1, 9];
console.log(Math.min(nums));
```

### Error 3: Math.max with single argument
**Description:** Find max of single value
```javascript
console.log(Math.max(42));
```

### Error 4: Math.min with no arguments
**Description:** Find min of no values
```javascript
console.log(Math.min());
```

### Error 5: Math.max with all negative
**Description:** Find max of negative numbers
```javascript
console.log(Math.max(-3, -7, -1));
```

### Error 6: Math.min with mixed signs
**Description:** Find min of -5, 0, 10
```javascript
console.log(Math.min(-5, 0, 10));
```

### Error 7: Math.abs with string
**Description:** Get absolute value of "-42"
```javascript
console.log(Math.abs("-42"));
```

### Error 8: Math.abs with Infinity
**Description:** Get absolute of Infinity
```javascript
console.log(Math.abs(Infinity));
```

### Error 9: Math.pow with negative exponent
**Description:** Calculate 2 to power -1
```javascript
console.log(Math.pow(2, -1));
```

### Error 10: Math.pow returns float
**Description:** Calculate 4 to power 0.5
```javascript
console.log(Math.pow(4, 0.5));
```

### Error 11: Math.sqrt of negative number
**Description:** Calculate sqrt of -9
```javascript
console.log(Math.sqrt(-9));
```

### Error 12: Math.cbrt of negative
**Description:** Calculate cube root of -27
```javascript
console.log(Math.cbrt(-27));
```

### Error 13: Math.hypot with single argument
**Description:** Calculate hypotenuse of single side
```javascript
console.log(Math.hypot(3));
```

### Error 14: Math.hypot with negative
**Description:** Calculate hypotenuse with -3, -4
```javascript
console.log(Math.hypot(-3, -4));
```

### Error 15: Math.imul with regular numbers
**Description:** 32-bit multiply of 5 and 5
```javascript
console.log(Math.imul(5, 5));
```

### Error 16: Math.clz32 understanding
**Description:** Count leading zeros of 0
```javascript
console.log(Math.clz32(0));
```

### Error 17: Math.fround vs regular number
**Description:** Float32 precision of 0.1
```javascript
console.log(Math.fround(0.1));
```

### Error 18: Math.trunc on negative
**Description:** Truncate -5.7
```javascript
console.log(Math.trunc(-5.7));
```

### Error 19: Math.trunc on positive
**Description:** Truncate 5.7
```javascript
console.log(Math.trunc(5.7));
```

### Error 20: Math.sign returns -1, 0, 1
**Description:** Get sign of -42
```javascript
console.log(Math.sign(-42));
```

### Error 21: Math.sign of NaN
**Description:** Get sign of NaN
```javascript
console.log(Math.sign(NaN));
```

### Error 22: Math.exp argument large
**Description:** Calculate e^100
```javascript
console.log(Math.exp(100));
```

### Error 23: Math.exp of 0
**Description:** Calculate e^0
```javascript
console.log(Math.exp(0));
```

### Error 24: Math.expm1 of small value
**Description:** Calculate e^0.01 - 1
```javascript
console.log(Math.expm1(0.01));
```

### Error 25: Math.log with 0
**Description:** Natural log of 0
```javascript
console.log(Math.log(0));
```

### Error 26: Math.log with negative
**Description:** Natural log of -1
```javascript
console.log(Math.log(-1));
```

### Error 27: Math.log2 with 0
**Description:** Base-2 log of 0
```javascript
console.log(Math.log2(0));
```

### Error 28: Math.log10 with 0
**Description:** Base-10 log of 0
```javascript
console.log(Math.log10(0));
```

### Error 29: Math.log10 of 100
**Description:** Base-10 log of 100
```javascript
console.log(Math.log10(100));
```

### Error 30: Math.log2 of 32
**Description:** Base-2 log of 32
```javascript
console.log(Math.log2(32));
```

### Error 31: Math.log1p of negative near -1
**Description:** ln(1 + (-0.999))
```javascript
console.log(Math.log1p(-0.999));
```

### Error 32: Math.sin of degrees
**Description:** Sine of 90 degrees
```javascript
console.log(Math.sin(90));
```

### Error 33: Math.cos of degrees
**Description:** Cosine of 180 degrees
```javascript
console.log(Math.cos(180));
```

### Error 34: Math.tan of degrees
**Description:** Tangent of 45 degrees
```javascript
console.log(Math.tan(45));
```

### Error 35: Math.asin out of range
**Description:** Arcsin of 1.5
```javascript
console.log(Math.asin(1.5));
```

### Error 36: Math.acos out of range
**Description:** Arccos of -1.5
```javascript
console.log(Math.acos(-1.5));
```

### Error 37: Math.atan2 arguments order
**Description:** Get angle of point (1, 1)
```javascript
console.log(Math.atan2(1, 1));
```

### Error 38: Math.atan2 y, x confusion
**Description:** Get angle of point (0, 1)
```javascript
console.log(Math.atan2(0, 1));
```

### Error 39: Math.sinh of large number
**Description:** Hyperbolic sine of 10
```javascript
console.log(Math.sinh(10));
```

### Error 40: Math.cosh of 0
**Description:** Hyperbolic cosine of 0
```javascript
console.log(Math.cosh(0));
```

### Error 41: Math.tanh of 0
**Description:** Hyperbolic tangent of 0
```javascript
console.log(Math.tanh(0));
```

### Error 42: Math.asinh usage
**Description:** Inverse hyperbolic sine
```javascript
console.log(Math.asinh(1));
```

### Error 43: Math.acosh with invalid
**Description:** Inverse hyperbolic cosine of 0.5
```javascript
console.log(Math.acosh(0.5));
```

### Error 44: Math.atanh with invalid
**Description:** Inverse hyperbolic tangent of 2
```javascript
console.log(Math.atanh(2));
```

### Error 45: Math.random not random enough
**Description:** Generate random number between 0 and 1
```javascript
let r = Math.random();
console.log(r);
```

### Error 46: Math.random floor pattern wrong
**Description:** Random integer 0 to 5
```javascript
let r = Math.random() * 5;
console.log(Math.floor(r));
```

### Error 47: Math.random with Math.ceil
**Description:** Random integer 1 to 5
```javascript
let r = Math.ceil(Math.random() * 5);
console.log(r);
```

### Error 48: Math.random inclusive max wrong
**Description:** Random integer 1 to 10 inclusive
```javascript
let r = Math.floor(Math.random() * 10) + 1;
console.log(r);
```

### Error 49: Math.random exclusive 1 misunderstanding
**Description:** Random number can be 1
```javascript
let r = Math.random();
console.log(r === 1);
```

### Error 50: Seedable random misunderstanding
**Description:** No seed in Math.random
```javascript
let r1 = Math.random(42);
let r2 = Math.random(42);
console.log(r1 === r2);
```

### Error 51: Using Math.round for random
**Description:** Random integer with Math.round
```javascript
let r = Math.round(Math.random() * 5);
console.log(r);
```

### Error 52: Math.floor negative random
**Description:** Floor negative decimal
```javascript
let r = Math.floor(-4.2);
console.log(r);
```

### Error 53: Math.ceil negative random
**Description:** Ceil negative decimal
```javascript
let r = Math.ceil(-4.2);
console.log(r);
```

### Error 54: Math.floor for rounding to nearest
**Description:** Round 4.8 using floor
```javascript
let r = Math.floor(4.8 + 0.5);
console.log(r);
```

### Error 55: Math.ceil for rounding down
**Description:** Round 4.2 using ceil minus 1
```javascript
let r = Math.ceil(4.2 - 0.5);
console.log(r);
```

### Error 56: Math.PI precision misunderstanding
**Description:** Use Math.PI for exact value
```javascript
console.log(Math.PI);
```

### Error 57: Math.E for compound interest
**Description:** Use Euler's number for continuous compounding
```javascript
let p = 1000, r = 0.05, t = 3;
let a = p * Math.exp(r * t);
console.log(a);
```

### Error 58: Math.LN2 usage
**Description:** Natural log of 2
```javascript
console.log(Math.LN2);
```

### Error 59: Math.LN10 usage
**Description:** Natural log of 10
```javascript
console.log(Math.LN10);
```

### Error 60: Math.LOG2E usage
**Description:** Base-2 log of e
```javascript
console.log(Math.LOG2E);
```

### Error 61: Math.LOG10E usage
**Description:** Base-10 log of e
```javascript
console.log(Math.LOG10E);
```

### Error 62: Math.SQRT1_2 usage
**Description:** Square root of 1/2
```javascript
console.log(Math.SQRT1_2);
```

### Error 63: Math.SQRT2 usage
**Description:** Square root of 2
```javascript
console.log(Math.SQRT2);
```

### Error 64: Using Math constructor
**Description:** Try to instantiate Math
```javascript
let m = new Math();
console.log(m.PI);
```

### Error 65: Math without dot
**Description:** Call Math.floor without dot
```javascript
console.log(Mathfloor(5.7));
```

### Error 66: Typo in Math method name
**Description:** Call Math.flr
```javascript
console.log(Math.flr(5.7));
```

### Error 67: Math.PI assignment attempt
**Description:** Try to change Math.PI
```javascript
Math.PI = 3;
console.log(Math.PI);
```

### Error 68: Math.E assignment attempt
**Description:** Try to change Math.E
```javascript
Math.E = 2;
console.log(Math.E);
```

### Error 69: Math constants as functions
**Description:** Call Math.PI as function
```javascript
console.log(Math.PI());
```

### Error 70: Math random with toString
**Description:** Convert Math.random toString
```javascript
console.log(Math.random.toString);
```

## Issues

### Issue 1: Manual square root without Math.sqrt
**Description:** Calculate sqrt with exponentiation
```javascript
let num = 25;
let root = num ** 0.5;
console.log(root);
```

### Issue 2: Manual power without Math.pow
**Description:** Calculate 2^10 manually
```javascript
let result = 1;
for (let i = 0; i < 10; i++) {
  result *= 2;
}
console.log(result);
```

### Issue 3: Manual abs without Math.abs
**Description:** Absolute value with ternary
```javascript
let num = -10;
let abs = num < 0 ? -num : num;
console.log(abs);
```

### Issue 4: Manual min without Math.min
**Description:** Find minimum of three numbers
```javascript
let a = 5, b = 2, c = 8;
let min = a < b ? (a < c ? a : c) : (b < c ? b : c);
console.log(min);
```

### Issue 5: Manual max without Math.max
**Description:** Find maximum of three numbers
```javascript
let a = 5, b = 12, c = 8;
let max = a > b ? (a > c ? a : c) : (b > c ? b : c);
console.log(max);
```

### Issue 6: Not using Math.floor for truncation
**Description:** Truncate with parseInt
```javascript
let num = 5.99;
console.log(parseInt(num));
```

### Issue 7: Using Math.floor for rounding
**Description:** Use Math.floor when Math.round is needed
```javascript
let num = 4.8;
console.log(Math.floor(num + 0.5));
```

### Issue 8: Using Math.ceil for rounding
**Description:** Use Math.ceil when Math.round is needed
```javascript
let num = 4.2;
console.log(Math.ceil(num - 0.5));
```

### Issue 9: Not using Math.abs for distance
**Description:** Calculate distance without abs
```javascript
let x1 = 5, x2 = 10;
let dist = x2 - x1;
console.log(dist);
```

### Issue 10: Not using Math.hypot for distance
**Description:** Distance formula without hypot
```javascript
let dx = 3, dy = 4;
let dist = Math.sqrt(dx * dx + dy * dy);
console.log(dist);
```

### Issue 11: Manual ceil division
**Description:** Calculate pages needed
```javascript
let items = 23;
let perPage = 10;
let pages = Math.floor((items + perPage - 1) / perPage);
console.log(pages);
```

### Issue 12: Not using Math.trunc
**Description:** Remove decimal from positive number
```javascript
let num = 5.7;
console.log(num | 0);
```

### Issue 13: Manual round implementation
**Description:** Round without Math.round
```javascript
let num = 4.7;
let rounded = num + 0.5;
console.log(parseInt(rounded));
```

### Issue 14: Manual random integer
**Description:** Random int without Math.floor
```javascript
let r = Math.random() * 10;
console.log(parseInt(r));
```

### Issue 15: Reimplementing random range
**Description:** Random between min and max
```javascript
let min = 5, max = 15;
let r = Math.random() * (max - min) + min;
console.log(r);
```

### Issue 16: Not using spread with Math.max
**Description:** Find max in array
```javascript
let nums = [3, 7, 2, 9];
let max = Math.max.apply(null, nums);
console.log(max);
```

### Issue 17: Not using spread with Math.min
**Description:** Find min in array
```javascript
let nums = [3, 7, 2, 9];
let min = Math.min.apply(null, nums);
console.log(min);
```

### Issue 18: Using Math.pow for square
**Description:** Square with Math.pow
```javascript
let side = 5;
let area = Math.pow(side, 2);
console.log(area);
```

### Issue 19: Using Math.pow for cube
**Description:** Cube with Math.pow
```javascript
let side = 3;
let volume = Math.pow(side, 3);
console.log(volume);
```

### Issue 20: Using Math.floor for ceiling
**Description:** Ceil with Math.floor
```javascript
let a = 10, b = 3;
let result = Math.floor((a + b - 1) / b);
console.log(result);
```

### Issue 21: Not using Math.sign for comparison
**Description:** Check if numbers have same sign
```javascript
let a = -5, b = -10;
if ((a > 0 && b > 0) || (a < 0 && b < 0)) {
  console.log("Same sign");
}
```

### Issue 22: Manual clamp without Math.min/max
**Description:** Clamp value between 0 and 100
```javascript
let val = 150;
let clamped = val < 0 ? 0 : val > 100 ? 100 : val;
console.log(clamped);
```

### Issue 23: Not using Math.PI
**Description:** Hardcoded pi
```javascript
let circumference = 2 * 3.14159 * 5;
console.log(circumference);
```

### Issue 24: Not using Math.E
**Description:** Hardcoded e
```javascript
let result = 2.71828 * 5;
console.log(result);
```

### Issue 25: Math methods without parentheses
**Description:** Call Math.random without ()
```javascript
console.log(Math.random);
```

### Issue 26: Confusing Math.floor and Math.trunc
**Description:** Different for negative numbers
```javascript
console.log(Math.floor(-5.7));
console.log(Math.trunc(-5.7));
```

### Issue 27: Using bitwise for Math.floor
**Description:** Floor positive number with ~~
```javascript
let num = 5.7;
console.log(~~num);
```

### Issue 28: Using bitwise for abs
**Description:** Absolute with bitwise
```javascript
let num = -5;
console.log(num < 0 ? -num : num);
```

### Issue 29: Not using Math.imul for 32-bit
**Description:** Regular multiply for large numbers
```javascript
console.log(0xFFFFFFFF * 2);
```

### Issue 30: Manual deg to rad conversion
**Description:** Convert degrees to radians
```javascript
let deg = 180;
let rad = deg * (Math.PI / 180);
console.log(rad);
```

## Modifications

### Modify 1: Use Math.max to find highest score
**Description:** Find highest score in array
```javascript
let scores = [75, 92, 88, 60, 99];
let highest = 0;
for (let s of scores) {
  if (s > highest) highest = s;
}
console.log(highest);
```

### Modify 2: Use Math.min to find lowest score
**Description:** Find lowest score in array
```javascript
let scores = [75, 92, 88, 60, 99];
let lowest = Infinity;
for (let s of scores) {
  if (s < lowest) lowest = s;
}
console.log(lowest);
```

### Modify 3: Use Math.abs for difference
**Description:** Absolute difference between two numbers
```javascript
let a = 10, b = 25;
let diff = a - b;
console.log(diff);
```

### Modify 4: Use Math.pow for compound interest
**Description:** Calculate investment growth
```javascript
let principal = 1000;
let rate = 0.05;
let years = 5;
let result = principal * (1 + rate) ** years;
console.log(result);
```

### Modify 5: Use Math.sqrt for pythagorean
**Description:** Calculate hypotenuse
```javascript
let a = 3, b = 4;
let c = Math.sqrt(a * a + b * b);
console.log(c);
```

### Modify 6: Use Math.floor for dice roll
**Description:** Random integer 1-6
```javascript
let roll = Math.random() * 6 + 1;
console.log(roll);
```

### Modify 7: Use Math.ceil for bus count
**Description:** Calculate buses needed
```javascript
let people = 53;
let seats = 20;
let buses = people / seats;
console.log(buses);
```

### Modify 8: Use Math.round for grade rounding
**Description:** Round 89.7 to nearest integer
```javascript
let grade = 89.7;
console.log(grade);
```

### Modify 9: Use Math.trunc for integer part
**Description:** Get integer part of 5.99
```javascript
let num = 5.99;
console.log(num);
```

### Modify 10: Use Math.sign for direction
**Description:** Return -1, 0, or 1
```javascript
let num = -42;
let sign = num > 0 ? 1 : num < 0 ? -1 : 0;
console.log(sign);
```

### Modify 11: Use Math.hypot for distance
**Description:** Distance between two points
```javascript
let dx = 6, dy = 8;
let dist = Math.sqrt(dx * dx + dy * dy);
console.log(dist);
```

### Modify 12: Use Math.imul for fast multiply
**Description:** 32-bit integer multiplication
```javascript
let a = 100000, b = 100000;
let result = a * b;
console.log(result);
```

### Modify 13: Use Math.fround for 32-bit float
**Description:** Convert to 32-bit float precision
```javascript
let num = 0.1 + 0.2;
console.log(num);
```

### Modify 14: Use Math.exp for continuous growth
**Description:** Calculate e^2
```javascript
let x = 2;
let result = Math.E ** x;
console.log(result);
```

### Modify 15: Use Math.log for natural log
**Description:** Calculate ln(10)
```javascript
let x = 10;
console.log(x);
```

### Modify 16: Use Math.log2 for binary log
**Description:** Calculate log2(1024)
```javascript
let x = 1024;
console.log(x);
```

### Modify 17: Use Math.log10 for common log
**Description:** Calculate log10(1000)
```javascript
let x = 1000;
console.log(x);
```

### Modify 18: Use random for coin flip
**Description:** Log "Heads" or "Tails"
```javascript
console.log("Heads");
```

### Modify 19: Use random for password char
**Description:** Pick random character from string
```javascript
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
console.log(chars);
```

### Modify 20: Use Math.sin for wave
**Description:** Calculate sin of 45 degrees (convert to rad)
```javascript
let degrees = 45;
console.log(degrees);
```

### Modify 21: Use Math.cos for projection
**Description:** Calculate horizontal component
```javascript
let angle = 30;
let magnitude = 100;
console.log(angle, magnitude);
```

### Modify 22: Use Math.tan for slope
**Description:** Calculate tangent of 30 degrees
```javascript
let degrees = 30;
console.log(degrees);
```

### Modify 23: Use Math.atan2 for angle
**Description:** Calculate angle from (3, 4) to origin
```javascript
let x = 3, y = 4;
console.log(x, y);
```

### Modify 24: Use Math.PI for circle
**Description:** Calculate circumference of radius 5
```javascript
let radius = 5;
let circ = 2 * 3.14 * radius;
console.log(circ);
```

### Modify 25: Use Math.E for exponential
**Description:** Calculate e^3 using Math.exp
```javascript
let x = 3;
let result = 2.71828 ** x;
console.log(result);
```

### Modify 26: Use spread with Math.max
**Description:** Apply spread for array max
```javascript
let nums = [3, 7, 2, 9, 1];
let max = Math.max(3, 7, 2, 9, 1);
console.log(max);
```

### Modify 27: Use spread with Math.min
**Description:** Apply spread for array min
```javascript
let nums = [5, 2, 8, 1, 9];
let min = Math.min(5, 2, 8, 1, 9);
console.log(min);
```

### Modify 28: Math.random for shuffle hint
**Description:** Random sort order of array
```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr);
```

### Modify 29: Generate random hex color
**Description:** Create random #RRGGBB color
```javascript
console.log("#000000");
```

### Modify 30: Use Math.clz32 for bit length
**Description:** Count leading zeros of 0b1010
```javascript
let num = 0b1010;
console.log(num);
```

### Modify 31: Use Math.imul for hash
**Description:** Simple hash using 32-bit multiply
```javascript
let a = 42, b = 1337;
let hash = (a * b) | 0;
console.log(hash);
```

### Modify 32: Use Math.fround for comparison
**Description:** Check if float32 is same
```javascript
let a = 0.3;
let b = 0.1 + 0.2;
console.log(a === b);
```

### Modify 33: Use Math.log for magnitude
**Description:** Calculate order of magnitude of 1000
```javascript
let num = 1000;
console.log(num);
```

### Modify 34: Generate random boolean
**Description:** Random true/false
```javascript
console.log(true);
```

### Modify 35: Random pick from array
**Description:** Pick random element
```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits);
```

### Modify 36: Use Math.round for nearest 5
**Description:** Round 27 to nearest 5 (25)
```javascript
let num = 27;
console.log(num);
```

### Modify 37: Use Math.floor for nearest 10
**Description:** Floor 37 to nearest 10 (30)
```javascript
let num = 37;
console.log(num);
```

### Modify 38: Use Math.ceil for nearest 10
**Description:** Ceil 32 to nearest 10 (40)
```javascript
let num = 32;
console.log(num);
```

### Modify 39: Random unique ID generator
**Description:** Generate random 8-char hex id
```javascript
console.log("id");
```

### Modify 40: Use Math.pow for gravity formula
**Description:** Calculate distance fallen: 0.5 * g * t^2
```javascript
let t = 3;
let d = 0.5 * 9.8 * t * t;
console.log(d);
```

### Modify 41: Use Math.sqrt for standard deviation
**Description:** Calculate std dev of [2, 4, 4, 4, 5, 5, 7, 9]
```javascript
let nums = [2, 4, 4, 4, 5, 5, 7, 9];
console.log(nums);
```

### Modify 42: Use Math.abs for loss calculation
**Description:** Show loss as positive number
```javascript
let revenue = 500;
let cost = 700;
let profit = revenue - cost;
console.log(profit);
```

### Modify 43: Random grid position
**Description:** Random x, y within 0-100
```javascript
console.log("position");
```

### Modify 44: Use Math.sin for animation
**Description:** Calculate smooth oscillation value
```javascript
let step = 0;
console.log(step);
```

### Modify 45: Use Math.cos for circular motion
**Description:** Calculate x position on circle
```javascript
let angle = 0;
let radius = 10;
console.log(angle, radius);
```

### Modify 46: Use Math.atan2 for direction
**Description:** Angle from (0,0) to (5,5)
```javascript
let x = 5, y = 5;
console.log(x, y);
```

### Modify 47: PI to calculate sphere volume
**Description:** Volume = 4/3 * PI * r^3
```javascript
let radius = 3;
let volume = 4 / 3 * 3.14 * radius ** 3;
console.log(volume);
```

### Modify 48: Use Math.hypot for 3D distance
**Description:** Distance from origin to (1, 2, 3)
```javascript
let x = 1, y = 2, z = 3;
let dist = Math.sqrt(x * x + y * y + z * z);
console.log(dist);
```

### Modify 49: Random percentage generator
**Description:** Random integer percent 0-100
```javascript
console.log(50);
```

### Modify 50: Use Math.E for half-life
**Description:** Calculate remaining amount after half-life
```javascript
let initial = 100;
let halfLife = 10;
let timeElapsed = 30;
let remaining = initial * 0.5 ** (timeElapsed / halfLife);
console.log(remaining);
```
