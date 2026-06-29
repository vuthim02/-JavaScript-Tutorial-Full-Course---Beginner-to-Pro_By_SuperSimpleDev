# Debugging Challenges - Level 101
## Theme: Calculator with Mixed Math + Display Logic

---

### Error 1: Addition function missing return
**Description:** Function should add two numbers and return the result
```javascript
function add(a, b) {
  let result = a + b;
}
console.log(add(5, 3));
```

### Error 2: Subtraction wrong operator
**Description:** Function should subtract b from a
```javascript
function subtract(a, b) {
  return a + b;
}
console.log(subtract(10, 4));
```

### Error 3: Multiplication syntax
**Description:** Function should multiply two numbers
```javascript
function multiply(a, b) {
  return a x b;
}
console.log(multiply(6, 7));
```

### Error 4: Division by string
**Description:** Function should divide a by b
```javascript
function divide(a, b) {
  return a / "b";
}
console.log(divide(20, 5));
```

### Error 5: Display result typo
**Description:** Should display calculation result in console
```javascript
let num1 = 10;
let num2 = 5;
let result = num1 + num2;
console.lo9(result);
```

### Error 6: Variable not defined
**Description:** Should calculate and display the total
```javascript
let price = 25;
let quantity = 3;
let total = price * qty;
console.log(total);
```

### Error 7: String concatenation instead of addition
**Description:** Should add two numeric values
```javascript
let a = "5";
let b = "10";
let sum = a + b;
console.log(sum);
```

### Error 8: Missing semicolon breaks chain
**Description:** Should compute and display multiple operations
```javascript
let x = 10
let y = 20
let z = x + y
console.log(z)
```

### Error 9: Wrong variable case
**Description:** Should display the calculated value
```javascript
let myResult = 42;
console.log(myresult);
```

### Error 10: Assignment instead of comparison
**Description:** Should check if result equals 100
```javascript
let result = 50 + 50;
if (result = 100) {
  console.log("Correct!");
}
```

### Error 11: Reserved word as variable
**Description:** Should store a calculation result
```javascript
let return = 5 + 3;
console.log(return);
```

### Error 12: Invalid array access
**Description:** Should access the second element in results array
```javascript
let results = [10, 20, 30];
console.log(results(1));
```

### Error 13: Function call before definition (hoisting issue)
**Description:** Should call the square function
```javascript
console.log(square(5));
let square = function(x) {
  return x * x;
};
```

### Error 14: Missing parameter
**Description:** Function should add three numbers
```javascript
function addThree(a, b) {
  return a + b + c;
}
console.log(addThree(1, 2, 3));
```

### Error 15: Const reassignment
**Description:** Should update the total value
```javascript
const total = 100;
total = total + 50;
console.log(total);
```

### Error 16: Wrong math operator for exponent
**Description:** Should calculate 5 squared
```javascript
let squared = 5 ^ 2;
console.log(squared);
```

### Error 17: Unclosed parenthesis
**Description:** Should calculate and display result
```javascript
let result = (10 + 5 * 2;
console.log(result);
```

### Error 18: Object property typo
**Description:** Should access the value property of calculator object
```javascript
let calculator = {
  value: 100
};
console.log(calculator.val);
```

### Error 19: Function not returning
**Description:** Function should return the sum
```javascript
function calculateSum(a, b) {
  let sum = a + b;
}
console.log(calculateSum(4, 6));
```

### Error 20: Boolean logic mistake
**Description:** Should check if both conditions are true
```javascript
let a = 5, b = 10;
if (a > 3 && b < 5) {
  console.log("Both true");
}
```

### Error 21: Missing typeof operator
**Description:** Should check the type of result
```javascript
let result = 5 + 5;
console.log(typeof(result));
```

### Error 22: Double equals instead of triple
**Description:** Should strictly compare number and string
```javascript
if (5 == "5") {
  console.log("Strictly equal");
}
```

### Error 23: Variable shadowing issue
**Description:** Should use outer variable value
```javascript
let x = 10;
function test() {
  let x = 20;
}
test();
console.log(x);
```

### Error 24: Incorrect modulo usage
**Description:** Should check if number is even
```javascript
function isEven(num) {
  return num % 2 === 1;
}
console.log(isEven(4));
```

### Error 25: String method typo
**Description:** Should convert number to string
```javascript
let num = 42;
let str = num.toString();
console.log(str);
```

### Error 26: Wrong bracket type for object
**Description:** Should create a calculator settings object
```javascript
let settings = {
  precision: 2,
  mode: "basic"
};
console.log(settings["precision"]);
```

### Error 27: Missing plus sign in template literal
**Description:** Should display calculation as "5 + 3 = 8"
```javascript
let a = 5, b = 3;
console.log(`${a} ${b} = ${a + b}`);
```

### Error 28: Function name collision
**Description:** Should define and call a function named calc
```javascript
function calc() {
  return 10;
}
let calc = 5;
console.log(calc());
```

### Error 29: Wrong decimal separator
**Description:** Should use decimal value 3.14
```javascript
let pi = 3,14;
console.log(pi * 2);
```

### Error 30: Unary operator typo
**Description:** Should increment the counter
```javascript
let count = 0;
count++;
console.log(count);
```

### Error 31: Undefined variable in calculation
**Description:** Should calculate area of rectangle
```javascript
let width = 5;
let area = width * height;
console.log(area);
```

### Error 32: Incorrect operator precedence
**Description:** Should calculate (2 + 3) * 4
```javascript
let result = 2 + 3 * 4;
console.log(result);
```

### Error 33: Missing comma in array
**Description:** Should create array of numbers
```javascript
let nums = [1 2, 3, 4];
console.log(nums.length);
```

### Error 34: Wrong loop condition
**Description:** Should loop 5 times
```javascript
for (let i = 0; i <= 5; i++) {
  console.log(i);
}
```

### Error 35: For loop infinite
**Description:** Should count from 0 to 4
```javascript
for (let i = 0; i < 5; i--) {
  console.log(i);
}
```

### Error 36: Break outside loop
**Description:** Should stop loop at 3
```javascript
if (true) {
  break;
}
```

### Error 37: Continue outside loop
**Description:** Should skip number 2
```javascript
if (true) {
  continue;
}
```

### Error 38: Arrow function syntax
**Description:** Should create arrow function that adds
```javascript
let add = (a, b) => {
  return a + b
}();
console.log(add(3, 4));
```

### Error 39: Missing parentheses in function call
**Description:** Should call the function and log result
```javascript
function getValue() {
  return 42;
}
console.log(getValue);
```

### Error 40: Wrong property accessor
**Description:** Should access object property using dot notation
```javascript
let calc = {total: 100};
console.log(calc->total);
```

### Error 41: Octal literal
**Description:** Should use decimal 8
```javascript
let num = 08;
console.log(num + 1);
```

### Error 42: Invalid use of void
**Description:** Should return undefined explicitly
```javascript
let result = void(0) + 5;
console.log(result);
```

### Error 43: Deleting undeletable
**Description:** Should remove a property from object
```javascript
let obj = {a: 1, b: 2};
delete obj.a;
console.log(obj.a);
```

### Error 44: With statement
**Description:** Should access object properties
```javascript
let obj = {x: 10, y: 20};
with(obj) {
  console.log(x + y);
}
```

### Error 45: Multiple variable declaration
**Description:** Should declare three variables
```javascript
let a = 1, b = 2, c = 3;;
console.log(a + b + c);
```

### Error 46: Label misuse
**Description:** Should label a loop
```javascript
outer: for (let i = 0; i < 3; i++) {
  break outer;
}
label: console.log("test");
```

### Error 47: Comma operator confusion
**Description:** Should assign the sum of a and b
```javascript
let a = (1, 2 + 3);
console.log(a);
```

### Error 48: Wrong argument order
**Description:** Function subtracts second from first
```javascript
function subtract(a, b) {
  return b - a;
}
console.log(subtract(10, 3));
```

### Error 49: parseInt missing radix
**Description:** Should parse "10" as base 10
```javascript
let num = parseInt("10");
console.log(num + 5);
```

### Error 50: toString on undefined
**Description:** Should convert result to string safely
```javascript
let result;
console.log(result.toString());
```

### Error 51: Math object typo
**Description:** Should get PI value
```javascript
console.log(Math.PIE);
```

### Error 52: Floor instead of round
**Description:** Should round 3.7 to nearest integer
```javascript
let rounded = Math.floor(3.7);
console.log(rounded);
```

### Error 53: Random range wrong
**Description:** Should generate random 0-9
```javascript
let rand = Math.random() * 10;
console.log(rand);
```

### Error 54: Max instead of min
**Description:** Should find smallest number
```javascript
let smallest = Math.max(1, 2, 3);
console.log(smallest);
```

### Error 55: String index instead of charAt
**Description:** Should get first character
```javascript
let str = "hello";
console.log(str[0]);
```

### Error 56: String method typo
**Description:** Should convert to uppercase
```javascript
let msg = "hello";
console.log(msg.toUppercase());
```

### Error 57: Substring args reversed
**Description:** Should extract "ell" from "hello"
```javascript
let str = "hello";
console.log(str.substring(4, 1));
```

### Error 58: Replace not global
**Description:** Should replace all spaces with dashes
```javascript
let str = "a b c";
console.log(str.replace(" ", "-"));
```

### Error 59: Split on empty string
**Description:** Should split string into words
```javascript
let str = "hello world";
console.log(str.split(""));
```

### Error 60: Trim not removing
**Description:** Should remove whitespace from both sides
```javascript
let str = "  hello  ";
console.log(str.trim());
```

### Error 61: IndexOf wrong result
**Description:** Should find position of "world"
```javascript
let str = "hello world";
console.log(str.indexOf("world"));
```

### Error 62: Slice negative index
**Description:** Should get last 3 characters
```javascript
let str = "hello";
console.log(str.slice(3));
```

### Error 63: Concat not modifying
**Description:** Should combine two strings
```javascript
let a = "hello";
let b = "world";
a.concat(b);
console.log(a);
```

### Error 64: Template literal backtick
**Description:** Should use template literal with variable
```javascript
let name = "John";
console.log('Hello ${name}');
```

### Error 65: Escape sequence
**Description:** Should include newline in string
```javascript
let str = "line1\nline2";
console.log(str);
```

### Error 66: Unicode escape
**Description:** Should use unicode for heart symbol
```javascript
let heart = "\u2764";
console.log(heart);
```

### Error 67: Regex literal syntax
**Description:** Should test string for digits
```javascript
let pattern = /d+/;
console.log(pattern.test("abc123"));
```

### Error 68: Global variable pollution
**Description:** Should not create global variable
```javascript
function setValue() {
  value = 10;
}
setValue();
console.log(value);
```

### Error 69: Null comparison
**Description:** Should check if value is null
```javascript
let val = null;
if (val == undefined) {
  console.log("is null");
}
```

### Error 70: NaN comparison
**Description:** Should check if value is NaN
```javascript
let val = NaN;
if (val === NaN) {
  console.log("is NaN");
}
```

---

### Issue 1: Off-by-one in loop
**Description:** Should log numbers 1 through 5
```javascript
for (let i = 1; i < 5; i++) {
  console.log(i);
}
```

### Issue 2: Wrong accumulation
**Description:** Should calculate sum of 1 to 5
```javascript
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum = i;
}
console.log(sum);
```

### Issue 3: Division returns float
**Description:** Should return integer result of 10 / 3
```javascript
let result = 10 / 3;
console.log(result);
```

### Issue 4: Floating point precision
**Description:** Should display 0.3
```javascript
let result = 0.1 + 0.2;
console.log(result);
```

### Issue 5: Assignment in condition
**Description:** Should compare values, not assign
```javascript
let a = 5;
let b = 10;
if (a = b) {
  console.log("equal");
}
```

### Issue 6: Truthy string check
**Description:** Should check if string is empty
```javascript
let str = "";
if (str) {
  console.log("not empty");
}
```

### Issue 7: Falsy number check
**Description:** Should check if number is zero
```javascript
let num = 0;
if (num) {
  console.log("not zero");
}
```

### Issue 8: Loose equality with null
**Description:** Should strictly check for null
```javascript
let val = null;
if (val == undefined) {
  console.log("is null or undefined");
}
```

### Issue 9: String coercion
**Description:** Should add numbers as numbers
```javascript
let result = "5" + 3 + 2;
console.log(result);
```

### Issue 10: Wrong variable scope used
**Description:** Should use parameter, not global
```javascript
let x = 10;
function addX(y) {
  return x + y;
}
console.log(addX(5));
```

### Issue 11: Logical operator precedence
**Description:** Should check (a or b) and c
```javascript
let a = true, b = false, c = true;
if (a || b && c) {
  console.log("condition met");
}
```

### Issue 12: Short-circuit evaluation
**Description:** Should compute both expressions
```javascript
function first() { console.log("first"); return false; }
function second() { console.log("second"); return true; }
let result = first() || second();
```

### Issue 13: Default parameter not working
**Description:** Should use default value for b
```javascript
function add(a, b) {
  return a + b;
}
console.log(add(5));
```

### Issue 14: Array length off
**Description:** Should iterate over all array elements
```javascript
let arr = [1, 2, 3, 4];
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}
```

### Issue 15: Type coercion in sum
**Description:** Should sum array of mixed types
```javascript
let items = [1, "2", 3, "4"];
let sum = 0;
for (let item of items) {
  sum += item;
}
console.log(sum);
```

### Issue 16: Modulo negative
**Description:** Should get positive remainder
```javascript
let remainder = -7 % 3;
console.log(remainder);
```

### Issue 17: toFixed returns string
**Description:** Should format number to 2 decimals then add
```javascript
let price = 9.99;
let tax = price.toFixed(2) + 1.50;
console.log(tax);
```

### Issue 18: parseInt returns NaN
**Description:** Should parse "abc123" gracefully
```javascript
let num = parseInt("abc123");
console.log(num + 10);
```

### Issue 19: Undefined array element
**Description:** Should safely handle missing array element
```javascript
let arr = [1, , 3];
console.log(arr[1]);
```

### Issue 20: Delete leaves hole
**Description:** Should remove element without leaving hole
```javascript
let arr = [1, 2, 3];
delete arr[1];
console.log(arr.length);
```

### Issue 21: Wrong this context
**Description:** Should access object property in method
```javascript
let calc = {
  total: 0,
  add: function(x) {
    total += x;
  }
};
calc.add(5);
console.log(calc.total);
```

### Issue 22: Array sort as strings
**Description:** Should sort numbers numerically
```javascript
let nums = [1, 30, 4, 21, 100];
nums.sort();
console.log(nums);
```

### Issue 23: Reverse mutates original
**Description:** Should not modify original array
```javascript
let original = [1, 2, 3];
let reversed = original.reverse();
console.log(original);
```

### Issue 24: += on string
**Description:** Should add number to accumulator
```javascript
let acc = 0;
acc += "5";
console.log(acc);
```

### Issue 25: && instead of ||
**Description:** Should display if either condition is true
```javascript
let a = false, b = true;
if (a && b) {
  console.log("at least one true");
}
```

### Issue 26: Wrong decimal multiplication
**Description:** Should calculate 0.1 * 0.2 precisely
```javascript
let result = 0.1 * 0.2;
console.log(result);
```

### Issue 27: Return object literal wrong
**Description:** Should return an object from arrow function
```javascript
let createObj = () => {value: 42};
console.log(createObj());
```

### Issue 28: For-in on array
**Description:** Should iterate array values
```javascript
let arr = [10, 20, 30];
for (let i in arr) {
  console.log(i);
}
```

### Issue 29: Switch fall-through
**Description:** Should only execute matching case
```javascript
let x = 2;
switch(x) {
  case 1: console.log("one");
  case 2: console.log("two");
  case 3: console.log("three");
}
```

### Issue 30: Boolean coercion of empty array
**Description:** Should check if array is empty
```javascript
let arr = [];
if (arr) {
  console.log("array exists");
}
```

---

### Modify 1: Add percentage calculation
**Description:** Add function to calculate percentage of a number
```javascript
function calculateTotal(price, taxRate) {
  return price + (price * taxRate);
}
```

### Modify 2: Add display formatting
**Description:** Format result as currency ($XX.XX)
```javascript
let result = 42.5;
console.log(result);
```

### Modify 3: Add input validation
**Description:** Check if inputs are valid numbers before calculating
```javascript
function divide(a, b) {
  return a / b;
}
```

### Modify 4: Add memory function
**Description:** Store last result in a variable and display it
```javascript
function add(a, b) {
  return a + b;
}
console.log(add(5, 3));
```

### Modify 5: Add clear function
**Description:** Reset calculator display to 0
```javascript
let display = 10;
console.log(display);
```

### Modify 6: Add operation history
**Description:** Store each calculation in an array
```javascript
function calculate(op, a, b) {
  if (op === "add") return a + b;
  if (op === "sub") return a - b;
}
```

### Modify 7: Add keyboard input handling
**Description:** Parse string input "5+3" and calculate result
```javascript
let input = "5+3";
```

### Modify 8: Add error messages
**Description:** Return error string if division by zero
```javascript
function divide(a, b) {
  return a / b;
}
console.log(divide(10, 0));
```

### Modify 9: Add decimal rounding
**Description:** Round all results to 2 decimal places
```javascript
function multiply(a, b) {
  return a * b;
}
console.log(multiply(3.14159, 2));
```

### Modify 10: Add square root button
**Description:** Calculate square root of a number
```javascript
function calculate(num) {
  return num * num;
}
console.log(calculate(9));
```

### Modify 11: Add power function
**Description:** Calculate a raised to power b
```javascript
function compute(a, b) {
  return a * b;
}
console.log(compute(2, 3));
```

### Modify 12: Add modulo operator
**Description:** Return remainder of division
```javascript
function divide(a, b) {
  return a / b;
}
console.log(divide(10, 3));
```

### Modify 13: Add absolute value
**Description:** Return absolute value of result
```javascript
function subtract(a, b) {
  return a - b;
}
console.log(subtract(5, 10));
```

### Modify 14: Add negation toggle
**Description:** Toggle between positive and negative
```javascript
let num = 5;
```

### Modify 15: Add percentage of total
**Description:** Calculate what percent a is of b
```javascript
function calc(a, b) {
  return a / b;
}
console.log(calc(25, 100));
```

### Modify 16: Add digit grouping
**Description:** Format number with commas (1000000 → 1,000,000)
```javascript
let num = 1000000;
console.log(num);
```

### Modify 17: Add max limit warning
**Description:** Warn if result exceeds 999999
```javascript
function add(a, b) {
  return a + b;
}
console.log(add(500000, 600000));
```

### Modify 18: Add decimal input handling
**Description:** Prevent multiple decimal points in input
```javascript
let input = "5.5.5";
```

### Modify 19: Add backspace function
**Description:** Remove last character from display
```javascript
let display = "123";
```

### Modify 20: Add result chaining
**Description:** Use previous result in next calculation
```javascript
let result = 10;
function addToResult(x) {
  return result + x;
}
console.log(addToResult(5));
```

### Modify 21: Add operator precedence
**Description:** Evaluate expression respecting * before +
```javascript
function evaluate(expr) {
  return expr;
}
console.log(evaluate("2+3*4"));
```

### Modify 22: Add parentheses
**Description:** Support parentheses in calculations
```javascript
function evaluate(expr) {
  return expr;
}
console.log(evaluate("(2+3)*4"));
```

### Modify 23: Add constant PI
**Description:** Add button that inserts PI value
```javascript
let display = "";
```

### Modify 24: Add constant E
**Description:** Add button that inserts Euler's number
```javascript
let display = "";
```

### Modify 25: Add factorial function
**Description:** Calculate factorial of a number
```javascript
function calculate(n) {
  return n;
}
console.log(calculate(5));
```

### Modify 26: Add Fibonacci sequence
**Description:** Generate Fibonacci numbers up to n terms
```javascript
function generate(n) {
  return n;
}
console.log(generate(7));
```

### Modify 27: Add random number generator
**Description:** Generate random number between min and max
```javascript
function random(min, max) {
  return min;
}
console.log(random(1, 10));
```

### Modify 28: Add rounding modes
**Description:** Add floor, ceil, round toggle
```javascript
let num = 4.7;
```

### Modify 29: Add trigonometry
**Description:** Calculate sin, cos, tan of angle
```javascript
function calculate(angle) {
  return angle;
}
console.log(calculate(45));
```

### Modify 30: Add logarithm
**Description:** Calculate natural log of number
```javascript
function calculate(num) {
  return num;
}
console.log(calculate(2.718));
```

### Modify 31: Add base conversion
**Description:** Convert between decimal, binary, hex
```javascript
let num = 255;
```

### Modify 32: Add history recall
**Description:** Cycle through previous results with up/down
```javascript
let history = [10, 25, 42];
```

### Modify 33: Add keyboard shortcut display
**Description:** Show shortcut hints like "Press Enter to calculate"
```javascript
let display = "0";
```

### Modify 34: Add animation on result
**Description:** Flash display when new result computed
```javascript
function updateDisplay(value) {
  console.log(value);
}
```

### Modify 35: Add chain calculations
**Description:** Allow 5 + 3 = 8 + 2 = 10 chaining
```javascript
let current = 0;
```

### Modify 36: Add unit conversion
**Description:** Add inches to cm conversion mode
```javascript
function convert(value) {
  return value;
}
console.log(convert(10));
```

### Modify 37: Add tax calculation
**Description:** Calculate pre-tax and post-tax amounts
```javascript
let price = 100;
let taxRate = 0.08;
```

### Modify 38: Add discount calculation
**Description:** Apply percentage discount to price
```javascript
function applyDiscount(price, discount) {
  return price;
}
console.log(applyDiscount(100, 20));
```

### Modify 39: Add tip calculation
**Description:** Calculate tip amount and total
```javascript
function calculateTip(bill, percent) {
  return bill;
}
console.log(calculateTip(50, 15));
```

### Modify 40: Add split bill
**Description:** Divide total among number of people
```javascript
function splitBill(total, people) {
  return total;
}
console.log(splitBill(100, 4));
```

### Modify 41: Add running total
**Description:** Keep running total as items are added
```javascript
function addItem(price) {
  return price;
}
console.log(addItem(10));
console.log(addItem(20));
```

### Modify 42: Add undo feature
**Description:** Undo last operation
```javascript
let history = [10, 20, 30];
```

### Modify 43: Add redo feature
**Description:** Redo undone operation
```javascript
let history = [10, 20, 30];
let currentIndex = 1;
```

### Modify 44: Add memory recall
**Description:** Recall stored value from memory
```javascript
let memory = 42;
```

### Modify 45: Add memory clear
**Description:** Clear the stored memory value
```javascript
let memory = 42;
```

### Modify 46: Add memory add
**Description:** Add current display to memory
```javascript
let memory = 0;
let display = 10;
```

### Modify 47: Add memory subtract
**Description:** Subtract current display from memory
```javascript
let memory = 50;
let display = 10;
```

### Modify 48: Add percentage difference
**Description:** Calculate percentage difference between two numbers
```javascript
function calcDiff(a, b) {
  return a;
}
console.log(calcDiff(50, 75));
```

### Modify 49: Add markup calculation
**Description:** Calculate selling price with markup percentage
```javascript
function calcSellingPrice(cost, markup) {
  return cost;
}
console.log(calcSellingPrice(100, 25));
```

### Modify 50: Add margin calculation
**Description:** Calculate profit margin percentage
```javascript
function calcMargin(revenue, cost) {
  return revenue;
}
console.log(calcMargin(200, 150));
```
