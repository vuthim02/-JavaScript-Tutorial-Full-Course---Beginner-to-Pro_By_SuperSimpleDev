# Level 02: JavaScript Basics — Strings & Numbers

## Errors

### Error 1: Missing closing bracket for string method
**Description:** Convert string to lowercase
```javascript
let text = "HELLO";
console.log(text.toLowerCase());
```

### Error 2: Calling string method on null
**Description:** Get length of a null variable
```javascript
let name = null;
console.log(name.length);
```

### Error 3: Calling string method on undefined
**Description:** Get first character of undefined
```javascript
let word;
console.log(word[0]);
```

### Error 4: Using push on string
**Description:** Add character to end of string
```javascript
let str = "Hello";
str.push("!");
console.log(str);
```

### Error 5: Using pop on string
**Description:** Remove last character from string
```javascript
let str = "Hello";
str.pop();
console.log(str);
```

### Error 6: Assigning to string index
**Description:** Change first character of string
```javascript
let str = "Hello";
str[0] = "J";
console.log(str);
```

### Error 7: Using string method on number
**Description:** Split a number into digits
```javascript
let num = 12345;
console.log(num.split(""));
```

### Error 8: Missing method parentheses on string
**Description:** Call trim on a string
```javascript
let msg = "  spaced  ";
console.log(msg.trim);
```

### Error 9: Using includes on array as string
**Description:** Check if array contains substring
```javascript
let fruits = ["apple", "banana"];
console.log(fruits.includes("apple"));
```

### Error 10: Wrong argument order for substring
**Description:** Get chars from index 1 to 3
```javascript
let word = "abcdef";
console.log(word.substring(3, 1));
```

### Error 11: Using negative index on string
**Description:** Get last character using -1
```javascript
let word = "Hello";
console.log(word[-1]);
```

### Error 12: Comparing string with number loosely
**Description:** Check if "5" is greater than 10
```javascript
console.log("5" > 10);
```

### Error 13: Adding boolean to number wrong
**Description:** Add true to 5 expecting 6
```javascript
console.log(true + 5);
```

### Error 14: Using toFixed on string
**Description:** Format "3.14159" to 2 decimal places
```javascript
let pi = "3.14159";
console.log(pi.toFixed(2));
```

### Error 15: Using charAt with wrong index
**Description:** Get character at position 10 in short string
```javascript
let word = "Hi";
console.log(word.charAt(10));
```

### Error 16: Using indexOf from wrong position
**Description:** Find "o" starting from wrong index
```javascript
let word = "Hello World";
console.log(word.indexOf("o", 5));
```

### Error 17: Comparing with one equals in if
**Description:** Check if name equals "Admin"
```javascript
let name = "Admin";
if (name = "Admin") {
  console.log("Welcome");
}
```

### Error 18: Using length as function
**Description:** Get length of string "Hello"
```javascript
console.log("Hello".length());
```

### Error 19: Using toUpperCase as property
**Description:** Convert "hello" to uppercase
```javascript
console.log("hello".toUpperCase);
```

### Error 20: Using typeof as a function incorrectly
**Description:** Check type of variable x
```javascript
let x = 5;
console.log(typeof(x));
```

### Error 21: Missing quotes in console.log for string
**Description:** Log the word undefined as string
```javascript
console.log(undefined);
```

### Error 22: Using null as string literal
**Description:** Log the word null
```javascript
console.log(null);
```

### Error 23: Using NaN as identifier
**Description:** Create variable named NaN
```javascript
let NaN = 5;
console.log(NaN);
```

### Error 24: Using Infinity as identifier
**Description:** Create variable named Infinity
```javascript
let Infinity = 100;
console.log(Infinity);
```

### Error 25: Chaining comparison operators
**Description:** Check if 5 is between 1 and 10
```javascript
console.log(1 < 5 < 10);
```

### Error 26: Using continue in switch
**Description:** Break out of switch case
```javascript
let val = 2;
switch (val) {
  case 1:
    console.log("One");
    continue;
  case 2:
    console.log("Two");
}
```

### Error 27: Declaring same function twice
**Description:** Create two functions with same name
```javascript
function sayHi() {
  console.log("Hi");
}
function sayHi() {
  console.log("Hello");
}
sayHi();
```

### Error 28: Recursive call without base case
**Description:** Create infinite recursion
```javascript
function loop() {
  loop();
}
loop();
```

### Error 29: Using label without loop
**Description:** Use a label with a plain block
```javascript
label: {
  console.log("Labeled");
  break label;
}
```

### Error 30: Using with statement in strict mode
**Description:** Use with for convenience
```javascript
"use strict";
let obj = {a: 1, b: 2};
with (obj) {
  console.log(a);
}
```

### Error 31: Missing default in switch
**Description:** Switch without default case
```javascript
let color = "red";
switch (color) {
  case "blue":
    console.log("Blue");
}
```

### Error 32: Using comma operator wrongly
**Description:** Assign result of comma expression
```javascript
let x = (1, 2, 3);
console.log(x);
```

### Error 33: Wrong precedence with assignment
**Description:** Assign value and compare in one line
```javascript
let a, b;
a = b = 5;
console.log(a === b);
```

### Error 34: Using new Boolean as function
**Description:** Create boolean wrapper object
```javascript
let flag = new Boolean(false);
if (flag) {
  console.log("Truthy");
}
```

### Error 35: Using new Number as function
**Description:** Create number wrapper object
```javascript
let num = new Number(0);
if (num) {
  console.log("Truthy");
}
```

### Error 36: Using new String as function
**Description:** Create string wrapper object
```javascript
let str = new String("");
if (str) {
  console.log("Truthy");
}
```

### Error 37: Calling undefined function
**Description:** Call a function that doesn't exist
```javascript
calculateTotal();
```

### Error 38: Accessing property of null object
**Description:** Access name property of null
```javascript
let person = null;
console.log(person.name);
```

### Error 39: Adding array with plus
**Description:** Add two arrays together
```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
console.log(arr1 + arr2);
```

### Error 40: Subtracting arrays
**Description:** Subtract one array from another
```javascript
let a = [5, 6];
let b = [1, 2];
console.log(a - b);
```

### Error 41: Using Math on string
**Description:** Get square root of string "16"
```javascript
console.log(Math.sqrt("16"));
```

### Error 42: Passing undefined to parseInt
**Description:** Parse undefined as integer
```javascript
console.log(parseInt(undefined));
```

### Error 43: Passing null to parseFloat
**Description:** Parse null as float
```javascript
console.log(parseFloat(null));
```

### Error 44: Using string index out of bounds
**Description:** Access index 100 of short string
```javascript
let str = "Hello";
console.log(str[100]);
```

### Error 45: Using substr with negative start
**Description:** Get substring from index -3
```javascript
let str = "JavaScript";
console.log(str.substr(-3, 2));
```

### Error 46: Using slice with start greater than end
**Description:** Get slice from index 5 to 2
```javascript
let str = "abcdef";
console.log(str.slice(5, 2));
```

### Error 47: Using concat on number
**Description:** Concatenate number with string
```javascript
let num = 42;
console.log(num.concat(" apples"));
```

### Error 48: Using replace with wrong regex
**Description:** Replace all "a" globally
```javascript
let str = "banana";
console.log(str.replace("a", "o"));
```

### Error 49: Using split with empty string incorrectly
**Description:** Split "abc" into array of chars
```javascript
let str = "abc";
console.log(str.split());
```

### Error 50: Using trim on number
**Description:** Trim whitespace from number
```javascript
let num = 42;
console.log(num.trim());
```

### Error 51: Using padStart on number
**Description:** Pad number with leading zeros
```javascript
let num = 5;
console.log(num.padStart(3, "0"));
```

### Error 52: Using padEnd on boolean
**Description:** Pad boolean with spaces
```javascript
let flag = true;
console.log(flag.padEnd(10, " "));
```

### Error 53: Using repeat on number
**Description:** Repeat number 3 times
```javascript
let num = 5;
console.log(num.repeat(3));
```

### Error 54: Using match on number
**Description:** Match digits in number
```javascript
let num = 12345;
console.log(num.match(/\d/));
```

### Error 55: Using search on number
**Description:** Search for "2" in number
```javascript
let num = 12345;
console.log(num.search("2"));
```

### Error 56: Using startsWith on number
**Description:** Check if number starts with "1"
```javascript
let num = 123;
console.log(num.startsWith("1"));
```

### Error 57: Using endsWith on number
**Description:** Check if number ends with "3"
```javascript
let num = 123;
console.log(num.endsWith("3"));
```

### Error 58: Using trimStart on boolean
**Description:** Trim start of boolean
```javascript
let val = true;
console.log(val.trimStart());
```

### Error 59: Using trimEnd on null
**Description:** Trim end of null
```javascript
let val = null;
console.log(val.trimEnd());
```

### Error 60: Assigning to constant array
**Description:** Try to reassign a constant array
```javascript
const colors = ["red", "blue"];
colors = ["green"];
console.log(colors);
```

### Error 61: Missing return in arrow function
**Description:** Arrow function returning object
```javascript
let createObj = () => {name: "Test"};
console.log(createObj());
```

### Error 62: Wrong syntax for arrow function body
**Description:** Multi-line arrow function
```javascript
let sum = (a, b) => { a + b };
console.log(sum(3, 4));
```

### Error 63: Using constructor without new
**Description:** Create Date without new
```javascript
let d = Date();
console.log(d);
```

### Error 64: Using RegExp without new incorrectly
**Description:** Create RegExp object
```javascript
let pattern = RegExp("[a-z]");
console.log(pattern.test("hello"));
```

### Error 65: Using delete on array element
**Description:** Remove element from array with delete
```javascript
let arr = [1, 2, 3];
delete arr[1];
console.log(arr.length);
```

### Error 66: Using for-in on array
**Description:** Iterate over array with for-in
```javascript
let items = ["a", "b", "c"];
for (let key in items) {
  console.log(key);
}
```

### Error 67: Missing break in switch
**Description:** Switch with fall-through accidentally
```javascript
let day = 2;
switch (day) {
  case 1:
    console.log("Mon");
  case 2:
    console.log("Tue");
  case 3:
    console.log("Wed");
}
```

### Error 68: Calling function before declaration (let)
**Description:** Call function expression before declaration
```javascript
greet();
let greet = function() {
  console.log("Hello");
};
```

### Error 69: Calling function before declaration (const)
**Description:** Call arrow function before declaration
```javascript
sayHi();
const sayHi = () => console.log("Hi");
```

### Error 70: Block-scoped function redeclaration
**Description:** Redeclare function inside if block
```javascript
if (true) {
  function test() { return 1; }
}
if (true) {
  function test() { return 2; }
}
console.log(test());
```

## Issues

### Issue 1: Variable name too short
**Description:** Store student grade
```javascript
let g = 95;
console.log(g);
```

### Issue 2: Variable name too cryptic
**Description:** Store user identification number
```javascript
let uin = 12345;
console.log(uin);
```

### Issue 3: Using abbreviations everywhere
**Description:** Calculate total price with tax
```javascript
let p = 50;
let t = 0.08;
let tp = p + p * t;
console.log(tp);
```

### Issue 4: Missing spaces around operators
**Description:** Add three values
```javascript
let total=10+20+30;
console.log(total);
```

### Issue 5: Inconsistent naming convention
**Description:** Store user data with mixed casing
```javascript
let userName = "John";
let user_age = 25;
console.log(userName, user_age);
```

### Issue 6: Using var everywhere
**Description:** Store multiple values using var
```javascript
var a = 1;
var b = 2;
var c = 3;
console.log(a + b + c);
```

### Issue 7: No use of const where applicable
**Description:** Store birth year (never changes)
```javascript
let birthYear = 1990;
console.log(birthYear);
```

### Issue 8: Using string concatenation instead of template
**Description:** Build a full address string
```javascript
let city = "New York";
let state = "NY";
console.log(city + ", " + state);
```

### Issue 9: Hardcoded values instead of variables
**Description:** Calculate area of rectangle
```javascript
console.log(5 * 10);
```

### Issue 10: Deep nesting without early return
**Description:** Check multiple conditions
```javascript
function check(num) {
  if (num > 0) {
    if (num < 100) {
      console.log("In range");
    }
  }
}
check(50);
```

### Issue 11: Using else when not needed
**Description:** Return early instead of else
```javascript
function isPositive(num) {
  if (num > 0) {
    return true;
  } else {
    return false;
  }
}
console.log(isPositive(5));
```

### Issue 12: No whitespace after comma
**Description:** Declare multiple variables
```javascript
let x=1,y=2,z=3;
console.log(x,y,z);
```

### Issue 13: Boolean comparison in if redundant
**Description:** Check if flag is true
```javascript
let isReady = true;
if (isReady === true) {
  console.log("Ready");
}
```

### Issue 14: Double negation instead of Boolean
**Description:** Convert string to boolean
```javascript
let str = "hello";
let bool = !!str;
console.log(bool);
```

### Issue 15: Using new Object() instead of literal
**Description:** Create a simple object
```javascript
let obj = new Object();
obj.name = "Test";
console.log(obj);
```

### Issue 16: Using new Array() instead of literal
**Description:** Create an array of numbers
```javascript
let arr = new Array(1, 2, 3);
console.log(arr);
```

### Issue 17: For loop with var
**Description:** Loop using var
```javascript
for (var j = 0; j < 3; j++) {
  console.log(j);
}
```

### Issue 18: No null check before property access
**Description:** Access property of possibly null object
```javascript
let data = null;
console.log(data.value);
```

### Issue 19: Not using strict mode
**Description:** Enable strict mode at top
```javascript
x = 10;
console.log(x);
```

### Issue 20: Magic string instead of constant
**Description:** Check for "admin" role multiple times
```javascript
let role = "admin";
if (role === "admin") {
  console.log("Admin access");
}
```

### Issue 21: Unclear boolean variable name
**Description:** Store whether user is logged in
```javascript
let flag = true;
console.log(flag);
```

### Issue 22: Function does too many things
**Description:** Single function that logs and calculates
```javascript
function process(a, b) {
  let sum = a + b;
  console.log(sum);
  let product = a * b;
  console.log(product);
}
process(3, 4);
```

### Issue 23: Not using default parameters
**Description:** Function with potentially undefined param
```javascript
function greet(name) {
  console.log("Hello " + name);
}
greet();
```

### Issue 24: Using arguments object instead of rest
**Description:** Sum variable number of arguments
```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3));
```

### Issue 25: Using == instead of ===
**Description:** Strict comparison needed
```javascript
let a = 0;
let b = false;
if (a == b) {
  console.log("Equal");
}
```

### Issue 26: Inconsistent return types
**Description:** Function returns string or number
```javascript
function getValue(type) {
  if (type === "num") return 42;
  return "forty-two";
}
console.log(getValue("str"));
```

### Issue 27: Side effect in condition
**Description:** Assignment in if condition
```javascript
let items = 5;
if (items = 10) {
  console.log("Items is 10");
}
```

### Issue 28: Using nested ternary
**Description:** Choose category based on age
```javascript
let age = 25;
let category = age < 13 ? "Child" : age < 20 ? "Teen" : "Adult";
console.log(category);
```

### Issue 29: No early exit for invalid input
**Description:** Process data without validation
```javascript
function processData(input) {
  console.log(input.toUpperCase());
}
processData(null);
```

### Issue 30: Using function statement in non-standard way
**Description:** Conditionally define function
```javascript
if (true) {
  function doSomething() {
    console.log("Did something");
  }
}
doSomething();
```

## Modifications

### Modify 1: Add length check
**Description:** Log "Long string" if length > 10
```javascript
let text = "Hello World!";
console.log(text);
```

### Modify 2: Extract first and last character
**Description:** Log first and last character
```javascript
let word = "JavaScript";
console.log(word);
```

### Modify 3: Convert to title case
**Description:** Capitalize first letter of name
```javascript
let name = "john";
console.log(name);
```

### Modify 4: Add string repetition
**Description:** Repeat the word 5 times with spaces
```javascript
let word = "Hi";
console.log(word);
```

### Modify 5: Check if string contains substring
**Description:** Log "Found!" if "Script" is in string
```javascript
let text = "JavaScript";
console.log(text);
```

### Modify 6: Replace spaces with dashes
**Description:** Convert "hello world" to "hello-world"
```javascript
let phrase = "hello world";
console.log(phrase);
```

### Modify 7: Count vowels in string
**Description:** Count and log number of vowels
```javascript
let str = "Hello World";
console.log(str);
```

### Modify 8: Reverse a string
**Description:** Log the string in reverse order
```javascript
let str = "abcdef";
console.log(str);
```

### Modify 9: Remove all whitespace
**Description:** Remove spaces from the string
```javascript
let input = "  spaced out  ";
console.log(input);
```

### Modify 10: Add padding to match length
**Description:** Pad "5" to make it "005"
```javascript
let num = "5";
console.log(num);
```

### Modify 11: Truncate string to 10 chars
**Description:** Cut string at 10 chars and add "..."
```javascript
let longStr = "This is a very long string";
console.log(longStr);
```

### Modify 12: Check if string is palindrome
**Description:** Log true if string reads same backwards
```javascript
let word = "racecar";
console.log(word);
```

### Modify 13: Count occurrences of letter
**Description:** Count how many times "a" appears
```javascript
let text = "banana";
let letter = "a";
console.log(text);
```

### Modify 14: Remove first occurrence of char
**Description:** Remove first "l" from "hello"
```javascript
let word = "hello";
console.log(word);
```

### Modify 15: Add comma to number string
**Description:** Format "1234567" as "1,234,567"
```javascript
let numStr = "1234567";
console.log(numStr);
```

### Modify 16: Convert string to array of words
**Description:** Split sentence into words and log each
```javascript
let sentence = "The quick brown fox";
console.log(sentence);
```

### Modify 17: Find longest word
**Description:** Find and log the longest word
```javascript
let sentence = "The quick brown fox jumps";
console.log(sentence);
```

### Modify 18: Mask credit card number
**Description:** Show only last 4 digits
```javascript
let card = "1234567890123456";
console.log(card);
```

### Modify 19: Extract domain from email
**Description:** Get "example.com" from "user@example.com"
```javascript
let email = "user@example.com";
console.log(email);
```

### Modify 20: Check string casing
**Description:** Log "UPPER" if all uppercase
```javascript
let str = "HELLO";
console.log(str);
```

### Modify 21: Toggle case of string
**Description:** Convert upper to lower and vice versa
```javascript
let str = "Hello World";
console.log(str);
```

### Modify 22: Add ellipsis to long strings
**Description:** If string > 20 chars, truncate with "..."
```javascript
let str = "This is a very long string here";
console.log(str);
```

### Modify 23: Remove duplicate characters
**Description:** Remove consecutive duplicates
```javascript
let str = "aabbccddee";
console.log(str);
```

### Modify 24: Insert character at position
**Description:** Insert "-" at index 3
```javascript
let str = "ABCDE";
console.log(str);
```

### Modify 25: Rotate string left
**Description:** Move first char to end
```javascript
let str = "Hello";
console.log(str);
```

### Modify 26: Create acronym from phrase
**Description:** First letters: "As Soon As Possible"
```javascript
let phrase = "As Soon As Possible";
console.log(phrase);
```

### Modify 27: Check for balanced parentheses
**Description:** Log true if parentheses are balanced
```javascript
let str = "(()())";
console.log(str);
```

### Modify 28: Add line numbers to multiline
**Description:** Add line numbers "1: line1\n2: line2"
```javascript
let text = "line1\nline2\nline3";
console.log(text);
```

### Modify 29: Capitalize every word
**Description:** Capitalize first letter of each word
```javascript
let sentence = "hello world from js";
console.log(sentence);
```

### Modify 30: Find first non-repeating char
**Description:** Find first char that doesn't repeat
```javascript
let str = "aabbcdd";
console.log(str);
```

### Modify 31: Convert camelCase to snake_case
**Description:** Convert "helloWorld" to "hello_world"
```javascript
let input = "helloWorld";
console.log(input);
```

### Modify 32: Add random character replacement
**Description:** Replace each "a" with random letter
```javascript
let str = "banana";
console.log(str);
```

### Modify 33: Check string length parity
**Description:** Log "Even" or "Odd" based on length
```javascript
let str = "Hello";
console.log(str);
```

### Modify 34: Extract numbers from string
**Description:** Extract "123" from "ab12c3"
```javascript
let mixed = "ab12c3";
console.log(mixed);
```

### Modify 35: Create a simple template engine
**Description:** Replace {{name}} and {{age}} in string
```javascript
let template = "Name: {{name}}, Age: {{age}}";
let name = "Tom";
let age = 28;
console.log(template);
```

### Modify 36: Implement string compression
**Description:** Compress "aaabbc" to "a3b2c1"
```javascript
let str = "aaabbc";
console.log(str);
```

### Modify 37: Add word count
**Description:** Count words in sentence
```javascript
let sentence = "This is a test sentence";
console.log(sentence);
```

### Modify 38: Reverse words in sentence
**Description:** Reverse word order not characters
```javascript
let sentence = "Hello World from JS";
console.log(sentence);
```

### Modify 39: Shuffle characters in string
**Description:** Randomly reorder characters
```javascript
let str = "abcdef";
console.log(str);
```

### Modify 40: Create alternating case
**Description:** Convert "hello" to "HeLlO"
```javascript
let str = "hello";
console.log(str);
```

### Modify 41: Find shortest word
**Description:** Find shortest word in sentence
```javascript
let sentence = "The quick brown fox";
console.log(sentence);
```

### Modify 42: Remove all vowels
**Description:** Remove vowels from string
```javascript
let str = "JavaScript";
console.log(str);
```

### Modify 43: Keep only unique characters
**Description:** Remove duplicate characters entirely
```javascript
let str = "abracadabra";
console.log(str);
```

### Modify 44: Add character frequency count
**Description:** Show how many times each char appears
```javascript
let str = "hello";
console.log(str);
```

### Modify 45: Swap first and last word
**Description:** Swap "Hello World" to "World Hello"
```javascript
let sentence = "Hello World";
console.log(sentence);
```

### Modify 46: Add URL slug generation
**Description:** Convert "Hello World!" to "hello-world"
```javascript
let title = "Hello World!";
console.log(title);
```

### Modify 47: Check if string is alphanumeric
**Description:** Log true if only letters and numbers
```javascript
let str = "Hello123";
console.log(str);
```

### Modify 48: Split string at uppercase letters
**Description:** Split "HelloWorld" at capital letters
```javascript
let str = "HelloWorld";
console.log(str);
```

### Modify 49: Add simple string encryption
**Description:** Shift each char by 1 (Caesar cipher)
```javascript
let str = "abc";
console.log(str);
```

### Modify 50: Format phone number
**Description:** Format "1234567890" to "(123) 456-7890"
```javascript
let phone = "1234567890";
console.log(phone);
```
