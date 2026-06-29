# Level 01: JavaScript Basics — Console & Syntax

## Errors

### Error 1: Missing closing parenthesis
**Description:** Log a greeting to the console
```javascript
console.log("Hello, world";
```

### Error 2: Missing opening parenthesis
**Description:** Log a number to the console
```javascript
console.log 42);
```

### Error 3: Missing closing quote
**Description:** Log a string message
```javascript
console.log("Welcome to JavaScript);
```

### Error 4: Missing opening quote
**Description:** Log the word JavaScript
```javascript
console.log(Javascript");
```

### Error 5: Using single quote as apostrophe unescaped
**Description:** Log the string "I'm learning JS"
```javascript
console.log('I'm learning JS');
```

### Error 6: Using single quote as possessive unescaped
**Description:** Log "John's laptop" to the console
```javascript
console.log('John's laptop');
```

### Error 7: Mismatched quotes
**Description:** Log a phrase about coding
```javascript
console.log("Coding is fun');
```

### Error 8: Missing equals in assignment
**Description:** Assign the value 10 to a variable named score
```javascript
let score = 10;
console.log(score);
```

### Error 9: Using undefined variable
**Description:** Log the value of a variable named playerName
```javascript
console.log(playerName);
```

### Error 10: Typo in variable name
**Description:** Declare a variable named message and log it
```javascript
let message = "Hello";
console.log(mesage);
```

### Error 11: Using reserved word as variable
**Description:** Create a variable named let and assign 5
```javascript
let let = 5;
console.log(let);
```

### Error 12: Using reserved word as variable name
**Description:** Create a variable named var and assign "test"
```javascript
let var = "test";
console.log(var);
```

### Error 13: Missing semicolon causing issue
**Description:** Log two numbers on separate statements
```javascript
let a = 5
let b = 10
console.log(a + b);
```

### Error 14: String concatenation with wrong type
**Description:** Log "5" + 5 as a number sum
```javascript
console.log("5" + 5);
```

### Error 15: Missing comma in console.log
**Description:** Log two separate strings with a space
```javascript
console.log("Hello" "World");
```

### Error 16: Using plus instead of comma
**Description:** Log first and last name separated
```javascript
console.log("First:" + "Last:");
```

### Error 17: Mixed quotes in string
**Description:** Log a string with double quotes inside
```javascript
console.log("He said "Hello"");
```

### Error 18: Unclosed string with newline
**Description:** Log a two-line string
```javascript
console.log("Line one
Line two");
```

### Error 19: Using = instead of ===
**Description:** Check if x equals 5
```javascript
let x = 5;
if (x = 5) {
  console.log("Equal");
}
```

### Error 20: Wrong case for console
**Description:** Log a message using Console
```javascript
Console.log("Hello");
```

### Error 21: Wrong case for log
**Description:** Log using capital L
```javascript
console.Log("Hello");
```

### Error 22: Wrong case for string method
**Description:** Convert string to uppercase
```javascript
let text = "hello";
console.log(text.toUpperCase());
```

### Error 23: Undefined variable in expression
**Description:** Add two numbers stored in variables
```javascript
let num1 = 10;
console.log(num1 + num2);
```

### Error 24: Declaring with const then reassigning
**Description:** Create a constant and update its value
```javascript
const pi = 3.14;
pi = 3.14159;
console.log(pi);
```

### Error 25: Using variable before declaration
**Description:** Use a let variable before declaring it
```javascript
console.log(name);
let name = "Tim";
```

### Error 26: Missing parentheses in function call
**Description:** Call console.log without parentheses
```javascript
console.log "Hello";
```

### Error 27: Extra parenthesis
**Description:** Log a simple number
```javascript
console.log(42));
```

### Error 28: Extra closing brace
**Description:** Create an if block and log inside
```javascript
if (true) {
  console.log("True");
}}
```

### Error 29: Missing opening brace
**Description:** Create an if block for a condition
```javascript
if (true)
  console.log("True");
}
```

### Error 30: Unclosed string with special character
**Description:** Log a file path
```javascript
console.log("C:\Users\Name");
```

### Error 31: Using double var declaration in same scope
**Description:** Declare a variable twice with var
```javascript
var x = 1;
var x = 2;
console.log(x);
```

### Error 32: Assigning to constant after declaration
**Description:** Create a constant greeting and change it
```javascript
const greeting = "Hi";
greeting = "Hello";
console.log(greeting);
```

### Error 33: No expression after return
**Description:** Return nothing from a simple function
```javascript
function add(a, b) {
  return;
}
console.log(add(2, 3));
```

### Error 34: Adding string and number wrongly
**Description:** Add 5 and "10" to get 15
```javascript
console.log(5 + "10");
```

### Error 35: Subtracting with incompatible types
**Description:** Subtract 3 from "10"
```javascript
console.log("10" - 3);
```

### Error 36: Multiplying string and number
**Description:** Multiply "hello" by 3
```javascript
console.log("hello" * 3);
```

### Error 37: Dividing by zero
**Description:** Divide 10 by 0 and log result
```javascript
console.log(10 / 0);
```

### Error 38: Using undefined in arithmetic
**Description:** Add a number to undefined
```javascript
let val;
console.log(val + 5);
```

### Error 39: Using null in arithmetic incorrectly
**Description:** Add 5 to null expecting 5
```javascript
console.log(null + 5);
```

### Error 40: Using NaN in comparison
**Description:** Check if NaN equals NaN
```javascript
console.log(NaN === NaN);
```

### Error 41: Wrong variable assignment operator
**Description:** Use assignment in comparison
```javascript
let a = 10;
if (a = 5) {
  console.log("a is 5");
}
```

### Error 42: Missing radix in parseInt
**Description:** Parse "10" as integer
```javascript
let num = parseInt("10");
console.log(num);
```

### Error 43: Using parseInt on float string
**Description:** Parse "10.99" and keep decimal
```javascript
let num = parseInt("10.99");
console.log(num);
```

### Error 44: Chaining assignment incorrectly
**Description:** Assign same value to a and b
```javascript
let a, b;
a = b = 5;
console.log(a, b);
```

### Error 45: Confusing innerHTML with console
**Description:** Log text to console using innerHTML
```javascript
console.innerHTML = "Hello";
```

### Error 46: Missing dot in console.log
**Description:** Log using consolelog
```javascript
consolelog("Hello");
```

### Error 47: Using document.write for console output
**Description:** Write to console instead of document
```javascript
document.write("Hello console");
```

### Error 48: Using alert for console output
**Description:** Log to console, not alert box
```javascript
alert("Log this to console");
```

### Error 49: Wrong quotes for number
**Description:** Log the number 50, not string "50"
```javascript
console.log("50");
```

### Error 50: Using comma instead of plus for sum
**Description:** Log the sum of 3 and 4
```javascript
console.log(3, "+", 4);
```

### Error 51: Variable name starting with number
**Description:** Create a variable named 1stPlace
```javascript
let 1stPlace = "Gold";
console.log(1stPlace);
```

### Error 52: Hyphen in variable name
**Description:** Create variable first-name
```javascript
let first-name = "John";
console.log(first-name);
```

### Error 53: Using keyword as function name
**Description:** Create a function named if
```javascript
function if() {
  return true;
}
console.log(if());
```

### Error 54: Missing argument in function call
**Description:** Call console.log with no arguments
```javascript
console.log();
```

### Error 55: Passing too many arguments
**Description:** Log with too many arguments
```javascript
console.log(1, 2, 3, 4, 5, 6, 7, 8);
```

### Error 56: Using string method on number
**Description:** Call toUpperCase on a number
```javascript
let num = 42;
console.log(num.toUpperCase());
```

### Error 57: Calling number as function
**Description:** Try to call 5 as a function
```javascript
let result = 5();
console.log(result);
```

### Error 58: Using delete on variable
**Description:** Delete a regular variable
```javascript
let x = 10;
delete x;
console.log(x);
```

### Error 59: Octal literal in strict mode
**Description:** Use old octal notation
```javascript
let num = 012;
console.log(num);
```

### Error 60: Trailing comma in function call
**Description:** Call a function with trailing comma
```javascript
console.log("Hello",);
```

### Error 61: Empty statement after if
**Description:** If condition is true, log something
```javascript
if (true);
  console.log("This runs always");
```

### Error 62: Using assignment in console.log
**Description:** Log the value of x after assignment
```javascript
let x = 0;
console.log(x = 5);
```

### Error 63: Unary plus on string variable
**Description:** Convert "123abc" to number
```javascript
let str = "123abc";
console.log(+str);
```

### Error 64: Double negation on non-boolean
**Description:** Convert 0 to boolean properly
```javascript
console.log(!!0);
```

### Error 65: Using void operator incorrectly
**Description:** Use void to return undefined
```javascript
let result = void 0;
console.log(result);
```

### Error 66: Using typeof on undefined variable
**Description:** Check type of undeclared variable
```javascript
console.log(typeof abc);
```

### Error 67: Hoisting var misunderstanding
**Description:** Use var after declaration in block
```javascript
if (true) {
  var x = 5;
}
console.log(x);
```

### Error 68: Block scope with var
**Description:** Create block-scoped variable with var
```javascript
{
  var test = "block";
}
console.log(test);
```

### Error 69: Redeclaring let in same block
**Description:** Redeclare a let variable
```javascript
let value = 1;
let value = 2;
console.log(value);
```

### Error 70: Missing condition in if statement
**Description:** If statement without condition
```javascript
if () {
  console.log("No condition");
}
```

## Issues

### Issue 1: Poor variable naming
**Description:** Store a user's age in a variable
```javascript
let a = 25;
console.log(a);
```

### Issue 2: Unclear variable name
**Description:** Store the total price
```javascript
let tp = 99.99;
console.log(tp);
```

### Issue 3: Magic number in code
**Description:** Calculate price after 20% discount
```javascript
let price = 100;
let discounted = price * 0.8;
console.log(discounted);
```

### Issue 4: No semicolons
**Description:** Log two messages
```javascript
let msg1 = "Hello"
let msg2 = "World"
console.log(msg1 + " " + msg2)
```

### Issue 5: Using var instead of let
**Description:** Store and log a username
```javascript
var username = "Alice";
console.log(username);
```

### Issue 6: Inconsistent indentation
**Description:** Log inside an if block
```javascript
if (true) {
console.log("True");
    console.log("Still true");
  }
```

### Issue 7: No template literal usage
**Description:** Combine name and age into a sentence
```javascript
let name = "Bob";
let age = 30;
console.log("My name is " + name + " and I am " + age + " years old.");
```

### Issue 8: Duplicate console.log calls
**Description:** Log the same message three times
```javascript
console.log("Welcome");
console.log("Welcome");
console.log("Welcome");
```

### Issue 9: Unreachable code after return
**Description:** Return early and log after
```javascript
function test() {
  return;
  console.log("This never runs");
}
test();
```

### Issue 10: Inconsistent quote style
**Description:** Mix single and double quotes
```javascript
let str1 = "Hello";
let str2 = 'World';
console.log(str1, str2);
```

### Issue 11: Overly long line
**Description:** Log a very long concatenated string
```javascript
console.log("This is a very long string that should probably be broken up into multiple lines for better readability");
```

### Issue 12: No space after keywords
**Description:** Log inside if
```javascript
if(true){
console.log("No spaces");
}
```

### Issue 13: Using var in for loop
**Description:** Loop with var creating global leak
```javascript
for (var i = 0; i < 5; i++) {
  console.log(i);
}
```

### Issue 14: Not using strict equality
**Description:** Compare number and string loosely
```javascript
let x = 5;
let y = "5";
if (x == y) {
  console.log("Equal");
}
```

### Issue 15: No input validation comment
**Description:** Log what user types
```javascript
let userInput = "test";
console.log(userInput);
```

### Issue 16: Function not using parameters
**Description:** Create function that ignores arguments
```javascript
function greet() {
  console.log("Hello");
}
greet("World");
```

### Issue 17: Too many blank lines
**Description:** Log a simple message with extra blank lines
```javascript


console.log("Hello");



```

### Issue 18: No newline at end of file
**Description:** Log a final message
```javascript
console.log("Last line");```

### Issue 19: Inconsistent spacing around operators
**Description:** Add three numbers
```javascript
let sum = 5+10 +15;
console.log(sum);
```

### Issue 20: Shadowing outer variable
**Description:** Inner scope reusing outer variable name
```javascript
let value = 10;
if (true) {
  let value = 20;
  console.log(value);
}
console.log(value);
```

### Issue 21: Using global variable implicitly
**Description:** Assign to variable without declaration
```javascript
function setVal() {
  x = 10;
}
setVal();
console.log(x);
```

### Issue 22: No use of const for constants
**Description:** Store a fixed tax rate
```javascript
let taxRate = 0.08;
console.log(taxRate);
```

### Issue 23: String concatenation vs array join
**Description:** Create comma-separated list
```javascript
let items = "apple" + "," + "banana" + "," + "cherry";
console.log(items);
```

### Issue 24: Using eval unnecessarily
**Description:** Convert string expression to number
```javascript
let expr = "2+2";
console.log(eval(expr));
```

### Issue 25: Not handling default parameter
**Description:** Function with missing argument
```javascript
function multiply(a, b) {
  console.log(a * b);
}
multiply(5);
```

### Issue 26: Assigning result of comparison
**Description:** Check if score is above 50
```javascript
let score = 75;
let result = score > 50;
console.log(result);
```

### Issue 27: Using !! instead of Boolean()
**Description:** Convert value to boolean
```javascript
let val = "hello";
console.log(!!val);
```

### Issue 28: No error handling for missing variable
**Description:** Check if variable exists before using
```javascript
if (typeof someVar !== "undefined") {
  console.log(someVar);
}
```

### Issue 29: Unused variable
**Description:** Declare but never use a variable
```javascript
let unused = "Never used";
console.log("Hello");
```

### Issue 30: Trailing whitespace
**Description:** Log with extra trailing spaces in string
```javascript
let msg = "Hello   ";
console.log(msg);
```

## Modifications

### Modify 1: Add a welcome message
**Description:** Log a welcome message before the greeting
```javascript
let greeting = "Hello!";
console.log(greeting);
```

### Modify 2: Log the type of a variable
**Description:** Log the value and its type
```javascript
let value = 42;
console.log(value);
```

### Modify 3: Add a second variable
**Description:** Combine first and last name
```javascript
let firstName = "Jane";
console.log(firstName);
```

### Modify 4: Add a counter increment
**Description:** Increment the counter and log it
```javascript
let counter = 0;
console.log(counter);
```

### Modify 5: Log a separator line
**Description:** Log a separator before the result
```javascript
let result = 10 + 20;
console.log(result);
```

### Modify 6: Add a descriptive label
**Description:** Log "The answer is:" before the number
```javascript
let answer = 42;
console.log(answer);
```

### Modify 7: Add a footer message
**Description:** Log "Done!" after the calculation
```javascript
let total = 5 + 3;
console.log(total);
```

### Modify 8: Add username to greeting
**Description:** Greet the user by name
```javascript
let greeting = "Welcome";
console.log(greeting);
```

### Modify 9: Use template literal
**Description:** Log name and score using template literal
```javascript
let name = "Alex";
let score = 95;
console.log(name + " scored " + score);
```

### Modify 10: Add a comment explaining the code
**Description:** Add a comment before the log statement
```javascript
console.log("Hello World");
```

### Modify 11: Log the sum in a sentence
**Description:** Log "Total: 15" where 15 is the sum
```javascript
let a = 7;
let b = 8;
let sum = a + b;
console.log(sum);
```

### Modify 12: Add error message for negative
**Description:** Check if age is negative and log error
```javascript
let age = -5;
console.log("Age:", age);
```

### Modify 13: Convert to uppercase before logging
**Description:** Log the name in uppercase
```javascript
let name = "john";
console.log(name);
```

### Modify 14: Add a countdown message
**Description:** Log "Starting in 3... 2... 1..."
```javascript
console.log("Go!");
```

### Modify 15: Log each item on separate line
**Description:** Log three items each on own line
```javascript
let item1 = "Apple";
let item2 = "Banana";
let item3 = "Cherry";
console.log(item1, item2, item3);
```

### Modify 16: Add a border line of dashes
**Description:** Print a line of dashes before output
```javascript
console.log("Hello World");
```

### Modify 17: Log the data type before value
**Description:** Log "number: 42" using typeof
```javascript
let data = 42;
console.log(data);
```

### Modify 18: Add a timestamp to log
**Description:** Log "2024: message" style prefix
```javascript
let msg = "System started";
console.log(msg);
```

### Modify 19: Use const instead of let
**Description:** Store a fixed configuration value
```javascript
let config = "dark-mode";
console.log(config);
```

### Modify 20: Add parentheses for clarity
**Description:** Log the result of 5 + 3 * 2
```javascript
let result = 5 + 3 * 2;
console.log(result);
```

### Modify 21: Log in reverse order
**Description:** Log three variables in reverse
```javascript
let first = "A";
let second = "B";
let third = "C";
console.log(first, second, third);
```

### Modify 22: Add a check for empty string
**Description:** Log "Empty!" if name is empty
```javascript
let name = "";
console.log(name);
```

### Modify 23: Convert to number before logging
**Description:** Convert string "42" to number and log
```javascript
let strNum = "42";
console.log(strNum);
```

### Modify 24: Add a formatted header
**Description:** Log "=== Results ===" before data
```javascript
let data = "Some data";
console.log(data);
```

### Modify 25: Log with emoji prefix
**Description:** Add a rocket emoji before message
```javascript
let message = "Launching";
console.log(message);
```

### Modify 26: Add padding with spaces
**Description:** Log the value padded to 5 characters
```javascript
let num = 7;
console.log(num);
```

### Modify 27: Repeat the message 3 times
**Description:** Log "Echo" three times with spaces
```javascript
let msg = "Echo";
console.log(msg);
```

### Modify 28: Add a total line after items
**Description:** Log items then log "Total: 3 items"
```javascript
let count = 3;
console.log("Items loaded");
```

### Modify 29: Log with different quote style
**Description:** Change single quotes to double quotes
```javascript
let text = 'Hello World';
console.log(text);
```

### Modify 30: Add a default value using OR
**Description:** Use "Guest" if name is empty
```javascript
let name = "";
console.log("Hello " + name);
```

### Modify 31: Add a line break in output
**Description:** Insert newline between two messages
```javascript
let msg1 = "First part";
let msg2 = "Second part";
console.log(msg1 + " " + msg2);
```

### Modify 32: Add a loading animation simulation
**Description:** Log "Loading..." then "Complete!"
```javascript
console.log("Ready");
```

### Modify 33: Use console.dir instead of log
**Description:** Log an object using dir instead of log
```javascript
console.log({name: "Test", value: 42});
```

### Modify 34: Add a condition to only log if true
**Description:** Only log if showMessage is true
```javascript
let showMessage = true;
let message = "Visible";
console.log(message);
```

### Modify 35: Add a group label
**Description:** Use console.group to group logs
```javascript
let a = 1;
let b = 2;
console.log(a);
console.log(b);
```

### Modify 36: Add a warning message
**Description:** Log a warning before the main output
```javascript
let temp = 95;
console.log("Temperature:", temp);
```

### Modify 37: Count how many times logged
**Description:** Use console.count for logging
```javascript
console.log("Item processed");
console.log("Item processed");
```

### Modify 38: Add a time measurement
**Description:** Log how long an operation takes
```javascript
let sum = 0;
for (let i = 0; i < 1000; i++) {
  sum += i;
}
console.log("Sum:", sum);
```

### Modify 39: Format number with 2 decimals
**Description:** Log price with 2 decimal places
```javascript
let price = 49.5;
console.log(price);
```

### Modify 40: Add a clear screen option
**Description:** Clear console before new output
```javascript
console.log("New content here");
```

### Modify 41: Add ASCII art separator
**Description:** Log a line of stars before output
```javascript
console.log("Results");
```

### Modify 42: Log with indentation
**Description:** Add 4 spaces before the message
```javascript
let msg = "Indented text";
console.log(msg);
```

### Modify 43: Add a version number to log
**Description:** Log "v1.0" before the message
```javascript
let appName = "MyApp";
console.log(appName);
```

### Modify 44: Log the number of characters
**Description:** Log the length of a string
```javascript
let word = "JavaScript";
console.log(word);
```

### Modify 45: Add progress percentage
**Description:** Log "50% complete" style message
```javascript
let progress = 50;
console.log("Working");
```

### Modify 46: Combine multiple console methods
**Description:** Use info and error together
```javascript
let status = "OK";
console.log("Status: " + status);
```

### Modify 47: Add a box around output
**Description:** Log message inside a box of hashes
```javascript
let msg = "Hello";
console.log(msg);
```

### Modify 48: Log with different text color hint
**Description:** Add a color indicator word to log
```javascript
let errorMsg = "File not found";
console.log(errorMsg);
```

### Modify 49: Add a logged counter
**Description:** Add number prefix "1. " before message
```javascript
let item = "Milk";
console.log(item);
```

### Modify 50: Format output as a table
**Description:** Log array as a table using console.table
```javascript
let data = [1, 2, 3];
console.log(data);
```
