# Level 03: JavaScript Basics — String Methods & Properties

## Errors

### Error 1: Using join on string
**Description:** Join array elements into string
```javascript
let str = "Hello";
console.log(str.join("-"));
```

### Error 2: Calling reverse on string
**Description:** Reverse a string
```javascript
let str = "Hello";
console.log(str.reverse());
```

### Error 3: Using sort on string
**Description:** Sort characters in string
```javascript
let str = "cba";
console.log(str.sort());
```

### Error 4: Using fill on string
**Description:** Fill string with character
```javascript
let str = "Hello";
console.log(str.fill("x"));
```

### Error 5: Using map on string
**Description:** Transform each character
```javascript
let str = "abc";
console.log(str.map(c => c.toUpperCase()));
```

### Error 6: Using filter on string
**Description:** Filter vowels from string
```javascript
let str = "hello";
console.log(str.filter(c => "aeiou".includes(c)));
```

### Error 7: Using reduce on string
**Description:** Reduce string to character count
```javascript
let str = "hello";
console.log(str.reduce((acc) => acc + 1, 0));
```

### Error 8: Using splice on string
**Description:** Remove characters from string
```javascript
let str = "Hello";
str.splice(1, 2);
console.log(str);
```

### Error 9: Missing quotes in string literal
**Description:** Log a string without closing quote
```javascript
console.log("Hello);
```

### Error 10: Wrong escape sequence
**Description:** Log string with backslash
```javascript
console.log("This is \q test");
```

### Error 11: Invalid unicode escape
**Description:** Log unicode character
```javascript
console.log("\uZZZZ");
```

### Error 12: Using break in ternary
**Description:** Use break inside ternary expression
```javascript
let x = 5;
x > 3 ? break : console.log("No");
```

### Error 13: Using return outside function
**Description:** Return value at top level
```javascript
return 42;
```

### Error 14: Wrong syntax for do-while
**Description:** Loop at least once
```javascript
do {
  console.log("Running");
} while (false);
```

### Error 15: Infinite while loop condition
**Description:** Loop with condition that never fails
```javascript
let i = 0;
while (i < 10) {
  console.log(i);
}
```

### Error 16: Wrong operator in loop condition
**Description:** Loop until counter reaches 5
```javascript
for (let i = 0; i = 5; i++) {
  console.log(i);
}
```

### Error 17: Missing increment in for loop
**Description:** Loop 5 times with increment
```javascript
for (let i = 0; i < 5;) {
  console.log(i);
}
```

### Error 18: Wrong comparison operator
**Description:** Check if 5 is greater than 10
```javascript
console.log(5 > 10);
```

### Error 19: Using assignment instead of comparison
**Description:** Check score > 50 in if
```javascript
let score = 75;
if (score = 50) {
  console.log("Pass");
}
```

### Error 20: Using null in string concatenation
**Description:** Concatenate "Value: " with null
```javascript
console.log("Value: " + null);
```

### Error 21: Using undefined in string template
**Description:** Use template with undefined variable
```javascript
let name;
console.log(`Hello ${name}`);
```

### Error 22: Reading property of null literal
**Description:** Access length of null
```javascript
console.log(null.length);
```

### Error 23: Reading property of undefined literal
**Description:** Access length of undefined
```javascript
console.log(undefined.length);
```

### Error 24: Calling null as function
**Description:** Try to call null
```javascript
let fn = null;
fn();
```

### Error 25: Calling undefined as function
**Description:** Try to call undefined
```javascript
let fn;
fn();
```

### Error 26: Using getMonth without adjusting
**Description:** Get current month number
```javascript
let d = new Date();
console.log(d.getMonth());
```

### Error 27: Using getDay as day of month
**Description:** Get day of month from date
```javascript
let d = new Date();
console.log(d.getDay());
```

### Error 28: Creating Date with wrong string format
**Description:** Parse date string
```javascript
let d = new Date("2024/13/01");
console.log(d);
```

### Error 29: Using toDateString incorrectly
**Description:** Format date to readable string
```javascript
let d = new Date();
console.log(d.toDateString);
```

### Error 30: Using getTime as function
**Description:** Get timestamp as number
```javascript
let d = new Date();
console.log(d.getTime);
```

### Error 31: Using push on object
**Description:** Add item to object
```javascript
let obj = {a: 1};
obj.push({b: 2});
console.log(obj);
```

### Error 32: Using pop on object
**Description:** Remove last property from object
```javascript
let obj = {a: 1, b: 2};
obj.pop();
console.log(obj);
```

### Error 33: Using forEach on object
**Description:** Iterate over object properties
```javascript
let obj = {a: 1, b: 2};
obj.forEach(val => console.log(val));
```

### Error 34: Using length on object
**Description:** Get number of properties in object
```javascript
let obj = {a: 1, b: 2};
console.log(obj.length);
```

### Error 35: Using indexOf on object
**Description:** Check if property exists in object
```javascript
let obj = {a: 1};
console.log(obj.indexOf("a"));
```

### Error 36: Using includes on object
**Description:** Check if value in object
```javascript
let obj = {a: 1};
console.log(obj.includes(1));
```

### Error 37: Concatenating arrays as strings
**Description:** Merge two arrays
```javascript
let a = [1, 2];
let b = [3, 4];
console.log(a.concat(b));
```

### Error 38: Using typeof on null
**Description:** Check type of null
```javascript
console.log(typeof null);
```

### Error 39: Using typeof on array
**Description:** Check type of array
```javascript
console.log(typeof [1, 2, 3]);
```

### Error 40: Using instanceof for primitive
**Description:** Check if string is instance of String
```javascript
console.log("hello" instanceof String);
```

### Error 41: Using constructor for type check
**Description:** Check if value is array
```javascript
let val = [1, 2];
console.log(val.constructor === Array);
```

### Error 42: Missing new for constructor
**Description:** Create object with constructor
```javascript
let obj = Object();
obj.name = "test";
console.log(obj);
```

### Error 43: Wrong syntax for getter/setter
**Description:** Define getter in object literal
```javascript
let obj = {
  name: "Test",
  get name() { return this.name; }
};
console.log(obj.name);
```

### Error 44: Infinite recursion in getter
**Description:** Getter that calls itself
```javascript
let obj = {
  get value() {
    return this.value;
  }
};
console.log(obj.value);
```

### Error 45: Using this in static context
**Description:** Use this in static method
```javascript
class MathUtil {
  static double(n) {
    return this.value * 2;
  }
}
console.log(MathUtil.double(5));
```

### Error 46: Missing super call in constructor
**Description:** Child class constructor without super
```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}
class Child extends Parent {
  constructor(name, age) {
    this.age = age;
  }
}
let c = new Child("Test", 5);
```

### Error 47: Using private field outside class
**Description:** Access #private field from outside
```javascript
class Person {
  #secret = "hidden";
}
let p = new Person();
console.log(p.#secret);
```

### Error 48: Wrong arrow function this binding
**Description:** Use arrow function for method
```javascript
let obj = {
  name: "Test",
  greet: () => {
    console.log(this.name);
  }
};
obj.greet();
```

### Error 49: Using yield outside generator
**Description:** Use yield in regular function
```javascript
function test() {
  yield 42;
}
console.log(test());
```

### Error 50: Missing star on generator
**Description:** Declare generator without asterisk
```javascript
function generator() {
  yield 1;
  yield 2;
}
let gen = generator();
console.log(gen.next());
```

### Error 51: Using await outside async
**Description:** Use await in regular function
```javascript
function getData() {
  return await fetch("url");
}
```

### Error 52: Forgetting to return promise
**Description:** Async function without return
```javascript
async function getValue() {
  let result = 42;
}
getValue().then(console.log);
```

### Error 53: Using async without await
**Description:** Async function with synchronous code
```javascript
async function compute() {
  return 5 + 5;
}
console.log(compute());
```

### Error 54: Using promise incorrectly
**Description:** Create promise without resolve/reject
```javascript
let p = new Promise(() => {
  console.log("Hello");
});
p.then(console.log);
```

### Error 55: Catching error with wrong syntax
**Description:** Try-catch without error variable
```javascript
try {
  throw "Error";
} catch {
  console.log("Caught");
}
```

### Error 56: Using finally without try
**Description:** Finally block without try
```javascript
finally {
  console.log("Cleanup");
}
```

### Error 57: Throwing non-error object
**Description:** Throw a string instead of Error
```javascript
throw "Something went wrong";
```

### Error 58: Catching and not rethrowing
**Description:** Catch error but lose stack trace
```javascript
try {
  throw new Error("Fail");
} catch (e) {
  console.log(e.message);
}
```

### Error 59: Using var in callback loop
**Description:** Classic closure bug with var
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Error 60: Modifying array while iterating
**Description:** Remove elements during forEach
```javascript
let arr = [1, 2, 3, 4];
arr.forEach((item, index) => {
  if (item % 2 === 0) {
    arr.splice(index, 1);
  }
});
console.log(arr);
```

### Error 61: Using delete on array
**Description:** Remove element keeping hole
```javascript
let arr = [1, 2, 3];
delete arr[1];
console.log(arr);
```

### Error 62: Wrong this in event callback
**Description:** Use this in event listener
```javascript
button.addEventListener("click", function() {
  console.log(this);
});
```

### Error 63: Using innerHTML without sanitizing
**Description:** Set HTML from user input
```javascript
let userInput = "<script>alert('xss')</script>";
document.getElementById("output").innerHTML = userInput;
```

### Error 64: Using == with null check
**Description:** Check if value is null or undefined
```javascript
let val = null;
if (val == null) {
  console.log("Null or undefined");
}
```

### Error 65: Undefined array index access
**Description:** Access index that doesn't exist
```javascript
let arr = [10, 20];
console.log(arr[5]);
```

### Error 66: Comparing arrays with ===
**Description:** Check if two arrays are equal
```javascript
let a = [1, 2];
let b = [1, 2];
console.log(a === b);
```

### Error 67: Using slice instead of splice
**Description:** Remove elements from array
```javascript
let arr = [1, 2, 3, 4];
let removed = arr.slice(1, 2);
console.log(arr, removed);
```

### Error 68: Using splice instead of slice
**Description:** Get subarray without modifying
```javascript
let arr = [1, 2, 3, 4];
let sub = arr.splice(1, 2);
console.log(arr, sub);
```

### Error 69: Passing string to setTimeout
**Description:** Use string instead of function
```javascript
setTimeout("console.log('Hello')", 1000);
```

### Error 70: Using parseInt on octal string
**Description:** Parse "010" as decimal 10
```javascript
console.log(parseInt("010"));
```

## Issues

### Issue 1: Boolean parameter makes code unclear
**Description:** Function with unclear boolean flag
```javascript
function process(isActive) {
  if (isActive) {
    console.log("Active");
  }
}
process(true);
```

### Issue 2: Too many parameters
**Description:** Function with more than 3 parameters
```javascript
function createUser(name, age, email, phone, address, city) {
  console.log(name, age, email);
}
createUser("John", 25, "j@mail.com", "123", "123 St", "NYC");
```

### Issue 3: Function with side effects
**Description:** Function modifies external variable
```javascript
let total = 0;
function addToTotal(value) {
  total += value;
}
addToTotal(10);
console.log(total);
```

### Issue 4: Modifying function parameters
**Description:** Change parameter value inside function
```javascript
function discount(price, percent) {
  percent = percent || 10;
  return price - (price * percent / 100);
}
console.log(discount(100));
```

### Issue 5: Using global for configuration
**Description:** Store config in global variables
```javascript
let CONFIG_API = "https://api.example.com";
let CONFIG_TIMEOUT = 5000;
console.log(CONFIG_API);
```

### Issue 6: Not destructuring objects
**Description:** Extract multiple properties manually
```javascript
let user = {name: "Alice", age: 30, city: "NYC"};
let name = user.name;
let age = user.age;
let city = user.city;
console.log(name, age, city);
```

### Issue 7: Not destructuring arrays
**Description:** Get first and second items from array
```javascript
let colors = ["red", "green", "blue"];
let first = colors[0];
let second = colors[1];
console.log(first, second);
```

### Issue 8: Using switch instead of object lookup
**Description:** Map day number to name
```javascript
function getDayName(num) {
  switch (num) {
    case 1: return "Mon";
    case 2: return "Tue";
    case 3: return "Wed";
    default: return "Unknown";
  }
}
console.log(getDayName(2));
```

### Issue 9: Long if-else chain
**Description:** Multiple conditions with else if
```javascript
let score = 85;
if (score >= 90) console.log("A");
else if (score >= 80) console.log("B");
else if (score >= 70) console.log("C");
else if (score >= 60) console.log("D");
else console.log("F");
```

### Issue 10: Not using array methods
**Description:** Manual loop to transform array
```javascript
let nums = [1, 2, 3, 4, 5];
let doubled = [];
for (let i = 0; i < nums.length; i++) {
  doubled.push(nums[i] * 2);
}
console.log(doubled);
```

### Issue 11: Using for loop instead of forEach
**Description:** Log each item in array
```javascript
let items = ["a", "b", "c"];
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

### Issue 12: Not using find/findIndex
**Description:** Manual search in array
```javascript
let users = [{id: 1, name: "A"}, {id: 2, name: "B"}];
let found = null;
for (let i = 0; i < users.length; i++) {
  if (users[i].id === 2) {
    found = users[i];
  }
}
console.log(found);
```

### Issue 13: Not using some/every
**Description:** Check if any number is even
```javascript
let nums = [1, 3, 5, 6, 7];
let hasEven = false;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    hasEven = true;
  }
}
console.log(hasEven);
```

### Issue 14: Not using filter
**Description:** Get numbers greater than 3
```javascript
let nums = [1, 2, 3, 4, 5];
let result = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] > 3) {
    result.push(nums[i]);
  }
}
console.log(result);
```

### Issue 15: Not using map
**Description:** Convert temperatures C to F
```javascript
let celsius = [0, 10, 20, 30];
let fahrenheit = [];
for (let i = 0; i < celsius.length; i++) {
  fahrenheit.push(celsius[i] * 9/5 + 32);
}
console.log(fahrenheit);
```

### Issue 16: Using for-in for array
**Description:** Iterate over array
```javascript
let arr = [10, 20, 30];
for (let index in arr) {
  console.log(arr[index]);
}
```

### Issue 17: Not using optional chaining
**Description:** Access deeply nested property
```javascript
let user = {profile: {name: "John"}};
let name = user && user.profile && user.profile.name;
console.log(name);
```

### Issue 18: Not using nullish coalescing
**Description:** Provide default for null/undefined
```javascript
let input = null;
let value = input || "default";
console.log(value);
```

### Issue 19: Using || for all defaults
**Description:** Use || when 0 or "" is valid
```javascript
let count = 0;
let display = count || "No items";
console.log(display);
```

### Issue 20: Not using shorthand properties
**Description:** Create object with variable values
```javascript
let name = "John";
let age = 30;
let user = {name: name, age: age};
console.log(user);
```

### Issue 21: Not using shorthand methods
**Description:** Define method in object
```javascript
let calculator = {
  add: function(a, b) {
    return a + b;
  }
};
console.log(calculator.add(2, 3));
```

### Issue 22: Using if-else for assignment
**Description:** Assign value based on condition
```javascript
let isMember = true;
let discount;
if (isMember) {
  discount = 10;
} else {
  discount = 0;
}
console.log(discount);
```

### Issue 23: Redundant if-else for boolean
**Description:** Return boolean from condition
```javascript
function isEven(num) {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
console.log(isEven(4));
```

### Issue 24: Not using shorthand for null check
**Description:** Check and provide default
```javascript
let username;
let displayName;
if (username !== null && username !== undefined) {
  displayName = username;
} else {
  displayName = "Guest";
}
console.log(displayName);
```

### Issue 25: Multiline string with concatenation
**Description:** Create multiline string
```javascript
let html = "<div>" +
           "<p>Hello</p>" +
           "</div>";
console.log(html);
```

### Issue 26: Not using Number.isNaN
**Description:** Check if value is NaN
```javascript
let val = NaN;
if (isNaN(val)) {
  console.log("Is NaN");
}
```

### Issue 27: Not using Number.isFinite
**Description:** Check if value is finite number
```javascript
let val = 42;
if (isFinite(val)) {
  console.log("Finite");
}
```

### Issue 28: Using document.write
**Description:** Add content to page
```javascript
document.write("<p>Hello World</p>");
```

### Issue 29: Not using textContent vs innerHTML
**Description:** Set text content
```javascript
element.innerHTML = "Hello <world>";
```

### Issue 30: Inline event handlers
**Description:** Add click handler inline
```javascript
<button onclick="handleClick()">Click</button>
```

## Modifications

### Modify 1: Add character repetition check
**Description:** Log true if string has repeated characters
```javascript
let str = "hello";
console.log(str);
```

### Modify 2: Create string abbreviation
**Description:** Abbreviate "JavaScript" to "JS"
```javascript
let lang = "JavaScript";
console.log(lang);
```

### Modify 3: Add email validation
**Description:** Log "Valid" if email contains @ and .
```javascript
let email = "user@example.com";
console.log(email);
```

### Modify 4: Extract initials from name
**Description:** Extract "JD" from "John Doe"
```javascript
let fullName = "John Doe";
console.log(fullName);
```

### Modify 5: Add string interleaving
**Description:** Interleave "abc" and "123" as "a1b2c3"
```javascript
let str1 = "abc";
let str2 = "123";
console.log(str1, str2);
```

### Modify 6: Implement string rotation
**Description:** Rotate "Hello" right by 2 positions
```javascript
let str = "Hello";
console.log(str);
```

### Modify 7: Check anagram strings
**Description:** Log true if two strings are anagrams
```javascript
let s1 = "listen";
let s2 = "silent";
console.log(s1, s2);
```

### Modify 8: Add string hashing
**Description:** Simple hash: sum char codes mod 256
```javascript
let str = "hello";
console.log(str);
```

### Modify 9: Create word frequency map
**Description:** Count how many times each word appears
```javascript
let sentence = "the cat and the dog";
console.log(sentence);
```

### Modify 10: Remove duplicate words
**Description:** Remove consecutive duplicate words
```javascript
let text = "hello hello world world world";
console.log(text);
```

### Modify 11: Add proper noun detection
**Description:** Log true if word starts with capital letter
```javascript
let word = "John";
console.log(word);
```

### Modify 12: Format string as currency
**Description:** Add $ sign and 2 decimals to "42.5"
```javascript
let amount = "42.5";
console.log(amount);
```

### Modify 13: Create simple glob matcher
**Description:** Check if "hello.txt" matches "*.txt"
```javascript
let pattern = "*.txt";
let filename = "hello.txt";
console.log(filename);
```

### Modify 14: Extract URL parts
**Description:** Get protocol, domain, path from URL
```javascript
let url = "https://example.com/path/page.html";
console.log(url);
```

### Modify 15: Create a word wrapper
**Description:** Wrap text at 20 characters with newline
```javascript
let text = "This is a long text that needs wrapping";
console.log(text);
```

### Modify 16: Add string diff highlighting
**Description:** Show differing characters between strings
```javascript
let old = "abcde";
let newStr = "abfde";
console.log(old, newStr);
```

### Modify 17: Convert to camelCase
**Description:** Convert "hello-world" to "helloWorld"
```javascript
let kebab = "hello-world";
console.log(kebab);
```

### Modify 18: Convert to kebab-case
**Description:** Convert "helloWorld" to "hello-world"
```javascript
let camel = "helloWorld";
console.log(camel);
```

### Modify 19: Check string ends with suffix
**Description:** Check if "script.js" ends with ".js"
```javascript
let file = "script.js";
console.log(file);
```

### Modify 20: Add password strength indicator
**Description:** Log "Weak", "Medium", or "Strong"
```javascript
let password = "Pass123!";
console.log(password);
```

### Modify 21: Generate random string of length n
**Description:** Generate random 6-char string
```javascript
let length = 6;
console.log(length);
```

### Modify 22: Find common prefix
**Description:** Find common start of "abcdef" and "abcxyz"
```javascript
let s1 = "abcdef";
let s2 = "abcxyz";
console.log(s1, s2);
```

### Modify 23: Add string border
**Description:** Put string in a box of stars
```javascript
let word = "Hello";
console.log(word);
```

### Modify 24: Remove HTML tags
**Description:** Strip tags from "<p>Hello</p>"
```javascript
let html = "<p>Hello <b>World</b></p>";
console.log(html);
```

### Modify 25: Encode string to base64
**Description:** Encode "Hello" to base64
```javascript
let str = "Hello";
console.log(str);
```

### Modify 26: Decode base64 string
**Description:** Decode "SGVsbG8=" to "Hello"
```javascript
let encoded = "SGVsbG8=";
console.log(encoded);
```

### Modify 27: Create sentence case
**Description:** Capitalize first letter of sentence
```javascript
let sentence = "hello world. how are you?";
console.log(sentence);
```

### Modify 28: Count syllables in word
**Description:** Count vowels as syllables
```javascript
let word = "hello";
console.log(word);
```

### Modify 29: Add string centering
**Description:** Center text in width of 20 with spaces
```javascript
let text = "Hello";
console.log(text);
```

### Modify 30: Create sliding window substrings
**Description:** Get all 3-char substrings of "hello"
```javascript
let str = "hello";
console.log(str);
```

### Modify 31: Check if string is subsequence
**Description:** Check if "abc" is in "ahbgdc" in order
```javascript
let sub = "abc";
let main = "ahbgdc";
console.log(sub, main);
```

### Modify 32: Add string zigzag pattern
**Description:** Write "PAYPALISHIRING" in zigzag of 3 rows
```javascript
let str = "PAYPALISHIRING";
console.log(str);
```

### Modify 33: Create string Run-length decode
**Description:** Decode "a3b2c4" to "aaabbcccc"
```javascript
let encoded = "a3b2c4";
console.log(encoded);
```

### Modify 34: Implement Levenshtein distance hint
**Description:** Show number of diff chars between "kitten" and "sitting"
```javascript
let s1 = "kitten";
let s2 = "sitting";
console.log(s1, s2);
```

### Modify 35: Format string as table row
**Description:** Output "| A | B | C |" from array
```javascript
let items = ["A", "B", "C"];
console.log(items);
```

### Modify 36: Add string masking
**Description:** Replace all but first and last char with *
```javascript
let word = "JavaScript";
console.log(word);
```

### Modify 37: Create name shortener
**Description:** Shorten "Alexander" to "Alex..."
```javascript
let name = "Alexander";
console.log(name);
```

### Modify 38: Check for ISBN format
**Description:** Validate "0-306-40615-2" format
```javascript
let isbn = "0-306-40615-2";
console.log(isbn);
```

### Modify 39: Add emoji removal
**Description:** Remove all emojis from string
```javascript
let text = "Hello 😊 World 🎉";
console.log(text);
```

### Modify 40: Normalize whitespace
**Description:** Replace multiple spaces with single
```javascript
let text = "Hello    World   from   JS";
console.log(text);
```

### Modify 41: Create string progress bar
**Description:** Generate "████░░░░░" from 50%
```javascript
let percent = 50;
console.log(percent);
```

### Modify 42: Add URL encoding
**Description:** Encode spaces in "hello world"
```javascript
let str = "hello world";
console.log(str);
```

### Modify 43: Add URL decoding
**Description:** Decode "hello+world" back
```javascript
let encoded = "hello+world";
console.log(encoded);
```

### Modify 44: Find most frequent character
**Description:** Find char that appears most in "aabbbcc"
```javascript
let str = "aabbbcc";
console.log(str);
```

### Modify 45: Create string to morse code converter
**Description:** Convert "SOS" to "... --- ..."
```javascript
let word = "SOS";
console.log(word);
```

### Modify 46: Add string mathematical expression check
**Description:** Check if "(2+3)*5" has balanced parentheses
```javascript
let expr = "(2+3)*5";
console.log(expr);
```

### Modify 47: Implement simple string diff
**Description:** Show added/removed chars between versions
```javascript
let v1 = "hello";
let v2 = "hella";
console.log(v1, v2);
```

### Modify 48: Create string to binary converter
**Description:** Convert "A" to "01000001"
```javascript
let char = "A";
console.log(char);
```

### Modify 49: Add word reversal in place
**Description:** Reverse each word: "hello world" -> "olleh dlrow"
```javascript
let sentence = "hello world";
console.log(sentence);
```

### Modify 50: Format string as JSON display
**Description:** Pretty print JSON string with indentation
```javascript
let json = '{"name":"John","age":30}';
console.log(json);
```
