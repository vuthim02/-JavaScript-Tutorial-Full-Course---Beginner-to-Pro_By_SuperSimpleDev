# Module 3: Strings

**Duration:** ~24 minutes  
**Video Timestamp:** 43:26 - 01:07:32

## Learning Objectives

- Create and use strings in JavaScript
- Understand different string syntax options
- Use common string methods
- Concatenate strings together
- Work with template literals

## What is a String?

A string is a sequence of characters (text) in JavaScript. Strings are used to represent words, sentences, and any text data.

## Creating Strings

### Single Quotes

```javascript
console.log('Hello, World!');
console.log('This is a string');
console.log('123');  // This is still a string, not a number
```

### Double Quotes

```javascript
console.log("Hello, World!");
console.log("This also works");
console.log("123");  // Still a string
```

### Template Literals (Backticks)

```javascript
console.log(`Hello, World!`);
console.log(`This uses backticks`);
```

### When to Use Each

Use template literals when you need to:
- Embed variables or expressions
- Create multi-line strings
- Handle special characters easily

Use quotes for simple, static strings.

## Special Characters

### Escape Sequences

```javascript
console.log('It\'s a beautiful day');    // Single quote in string
console.log("He said \"Hello\"");          // Double quotes in string
console.log('Line 1\nLine 2');             // New line
console.log('Tab:\tHere');                 // Tab character
console.log('Backslash: \\');              // Backslash character
```

### Common Escape Sequences

| Sequence | Meaning |
|----------|---------|
| `\'` | Single quote |
| `\"` | Double quote |
| `\\` | Backslash |
| `\n` | New line |
| `\t` | Tab |
| `\r` | Carriage return |

## String Concatenation

### Using + Operator

```javascript
let firstName = 'John';
let lastName = 'Doe';

console.log('Hello, ' + firstName + ' ' + lastName + '!');
// Output: Hello, John Doe!
```

### Combining Numbers and Strings

```javascript
console.log('My age is ' + 25);           // "My age is 25"
console.log('5' + 3);                      // "53" (string)
console.log(5 + 3);                        // 8 (number)
console.log('5' + 3 + 2);                  // "532"
console.log(5 + 3 + '2');                 // "82"
```

## Template Literals

Template literals use backticks (`` ` ``) and allow embedded expressions.

### Basic Syntax

```javascript
let name = 'Alice';
console.log(`Hello, ${name}!`);  // Hello, Alice!
```

### Embedding Expressions

```javascript
let x = 5;
let y = 3;

console.log(`${x} + ${y} = ${x + y}`);    // 5 + 3 = 8
console.log(`${x} * ${y} = ${x * y}`);    // 5 * 3 = 15
console.log(`The result is ${x > y}`);    // The result is true
```

### Multi-line Strings

```javascript
let message = `
  This is a multi-line string.
  You can write multiple lines
  without using \\n.
  
  Great for HTML templates!
`;
console.log(message);
```

## String Properties and Methods

### Length Property

```javascript
let text = 'Hello';
console.log(text.length);  // 5

let empty = '';
console.log(empty.length);  // 0
```

### Accessing Characters

```javascript
let str = 'Hello';

console.log(str[0]);   // H
console.log(str[1]);   // e
console.log(str[4]);   // o
console.log(str[str.length - 1]);  // o (last character)
```

### String Methods

All strings have built-in methods:

```javascript
let str = 'Hello, World!';

// toUpperCase() and toLowerCase()
console.log(str.toUpperCase());    // HELLO, WORLD!
console.log(str.toLowerCase());    // hello, world!

// trim() - removes whitespace from both ends
console.log('  hello  '.trim());   // hello

// indexOf() - finds position of substring
console.log(str.indexOf('World'));  // 7
console.log(str.indexOf('Bob'));     // -1 (not found)

// includes() - checks if substring exists
console.log(str.includes('World'));  // true
console.log(str.includes('Bob'));    // false

// startsWith() and endsWith()
console.log(str.startsWith('Hello'));  // true
console.log(str.endsWith('!'));         // true

// replace()
console.log(str.replace('World', 'JavaScript'));  // Hello, JavaScript!

// slice() - extracts portion of string
console.log(str.slice(0, 5));   // Hello
console.log(str.slice(7));      // World!
console.log(str.slice(-6));     // World!

// Output: "olleH"
console.log(str.slice(0, 5).split("").reverse().join("")); 

// Alternative using spread operator
console.log([...str.slice(0, 5)].reverse().join(""));

// Output: "!dlroW"
console.log(str.slice(-6).split("").reverse().join(""));

console.log(str.slice(7).split("").reverse().join(""));

// split() - splits string into array
console.log('a,b,c'.split(','));  // ['a', 'b', 'c']
console.log('hello'.split(''));   // ['h', 'e', 'l', 'l', 'o']
```

### The immutability of Strings

Strings in JavaScript are immutable - they cannot be changed:

```javascript
let str = 'Hello';
str[0] = 'J';           // This doesn't work
console.log(str);       // Still "Hello"

str = 'Jello';          // This creates a new string
console.log(str);       // Now "Jello"
```
### .split("") breaks the sliced string into an array of individual characters.
### .reverse() flips the order of the elements in that array.
### .join("") glues the array elements back together into a new string.

## String Comparison

### Basic Comparison

```javascript
console.log('apple' === 'apple');   // true
console.log('apple' === 'Apple');  // false (case matters)
console.log('hello' === 'world');  // false
```

### localeCompare()

For case-insensitive or language-aware comparison:

```javascript
console.log('apple'.localeCompare('apple'));   // 0 (equal)
console.log('apple'.localeCompare('banana'));  // -1 (apple < banana)
console.log('banana'.localeCompare('apple'));  // 1 (banana > apple)
```

## Useful String Patterns

### Checking if a String is Empty

```javascript
function isEmpty(str) {
  return str.length === 0;
}
console.log(isEmpty(''));     // true
console.log(isEmpty('hello')); // false
```

### Removing Whitespace from Ends

```javascript
let input = '  hello  ';
console.log(input.trim());     // "hello"
```

### Capitalizing First Letter

```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(capitalize('hello'));  // Hello
console.log(capitalize('world'));  // World
```

### To convert the first letter of every word in the string to uppercase, you can use the split(), map(), and join() methods.

```javascript
const str = 'hello welcome to javascript course this my fisrt time with it to undersatand with js programming!';

const result = str
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')

console.log(result)
```
### Checking if String Contains Only Numbers

```javascript
function isNumeric(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}
console.log(isNumeric('123'));    // true
console.log(isNumeric('12.34'));  // true
console.log(isNumeric('hello'));  // false
```
Note:
```
isNaN(123)      // false
isNaN(12.5)     // false
isNaN(NaN)      // true

parseFloat("12abc") // 12

isFinite("123")     // true
isFinite("12.3")    // true
isFinite("Infinity")// false
isFinite("abc")     // false
```
## Practice Exercises

### Exercise 3.1: String Creation
Create strings using all three methods and log them.

```javascript
let single = 'Single quotes';
let double = "Double quotes";
let template = `Template literals`;

console.log(single);
console.log(double);
console.log(template);
```

### Exercise 3.2: Greeting Generator
Create a function that takes a first name and last name and returns a greeting.

```javascript
function greet(firstName, lastName) {
  return `Hello, ${firstName} ${lastName}!`;
}

console.log(greet('John', 'Doe'));    // Hello, John Doe!
console.log(greet('Jane', 'Smith'));  // Hello, Jane Smith!
```

### Exercise 3.3: Text Analysis
Write code to analyze this string:
```
"The quick brown fox jumps over the lazy dog"
```

Find:
1. The length of the string
2. The position of "fox"
3. Whether it contains "cat"
4. Convert to uppercase

```javascript
let text = "The quick brown fox jumps over the lazy dog";

console.log(text.length);              // 43
console.log(text.indexOf('fox'));      // 16
console.log(text.includes('cat'));    // false
console.log(text.toUpperCase());       // THE QUICK BROWN FOX...
```

### Exercise 3.4: Password Validator
Create a simple password validator that checks:
1. Password is at least 8 characters
2. Contains an uppercase letter
3. Contains a lowercase letter
4. Contains a number

```javascript
function validatePassword(password) {
  let errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!password.includes('ABCDEFGHIJKLMNOPQRSTUVWXYZ')) {
    errors.push('Password must contain an uppercase letter');
  }
  if (!password.includes('abcdefghijklmnopqrstuvwxyz')) {
    errors.push('Password must contain a lowercase letter');
  }
  if (!password.includes('0123456789')) {
    errors.push('Password must contain a number');
  }
  
  return errors.length === 0 ? 'Valid password!' : errors;
}

console.log(validatePassword('Pass1234'));  // Valid password!
console.log(validatePassword('pass'));       // [multiple errors]
```

## Summary

- Strings are sequences of characters in JavaScript
- Use single quotes, double quotes, or backticks for strings
- Template literals (`` ` ``) allow embedded expressions with `${}`
- Use `\n`, `\t`, etc. for special characters
- Strings are immutable - methods return new strings
- Common methods: `length`, `toUpperCase()`, `toLowerCase()`, `indexOf()`, `slice()`, `split()`, `trim()`

## Prevouse

[Proceed to Module 2](../02-numbers-and-math/README.md)
## Next Steps

[Proceed to Module 4](../04-html-css-review/README.md): HTML/CSS Review to learn how to set up your development environment and combine JavaScript with HTML.
