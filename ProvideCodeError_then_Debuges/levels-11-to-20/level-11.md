# Level 11: JavaScript Strings - Fundamentals

## Error Snippets (1-70)

### Error 1: Unterminated string with single quotes
**Description:** Store a greeting message in a variable
```javascript
let greeting = 'Hello, world;
```

### Error 2: Unterminated string with double quotes
**Description:** Store a farewell message in a variable
```javascript
let farewell = "Goodbye, friend;
```

### Error 3: Mismatched quotes inside string
**Description:** Create a string containing a contraction
```javascript
let message = 'It's a beautiful day';
```

### Error 4: Invalid escape sequence
**Description:** Create a string with a newline using escape character
```javascript
let text = 'Hello\nWorld';
```

### Error 5: Octal literal in string
**ErrorMessage:** Create a string with a backslash
```javascript
let path = 'C:\Users\Name';
```

### Error 6: Missing closing parenthesis in concatenation
**Description:** Combine firstName and lastName with a space
```javascript
let fullName = firstName + ' ' + lastName;
```

### Error 7: Using = instead of === for string comparison
**Description:** Check if user input equals 'admin'
```javascript
if (input = 'admin') {
  console.log('Access granted');
}
```

### Error 8: String indexed with dot notation
**Description:** Get the first character of a string
```javascript
let firstChar = 'hello'.0;
```

### Error 9: Adding string and number incorrectly
**Description:** Add 5 to a numeric string '10'
```javascript
let result = '10' + 5;
```

### Error 10: Missing plus operator in concatenation
**Description:** Concatenate two string variables
```javascript
let combined = str1 str2;
```

### Error 11: Template literal without backtick
**Description:** Create a string using a template literal with a variable
```javascript
let name = 'Alice';
let greeting = "Hello, ${name}!";
```

### Error 12: Unterminated template literal
**Description:** Store a multi-line string using template literal
```javascript
let poem = `Roses are red,
Violets are blue;
```

### Error 13: String concatenation with wrong operator
**Description:** Concatenate firstName and lastName
```javascript
let fullName = firstName & ' ' & lastName;
```

### Error 14: Comparing strings with single = in if condition
**Description:** Check if status equals 'active'
```javascript
if (status = 'active') {
  runTask();
}
```

### Error 15: Invalid variable name in string interpolation
**Description:** Use template literal to display a variable
```javascript
let age = 25;
let msg = `You are ${age} years old`;
```

### Error 16: Wrong quote type for apostrophe
**Description:** Create a string containing "can't"
```javascript
let text = 'can't do that';
```

### Error 17: Escape backslash in regular string
**Description:** Create a string representing a file path
```javascript
let filePath = "C:\folder\file.txt";
```

### Error 18: Reassigning to a const string
**Description:** Declare a constant for the app name and then update it
```javascript
const appName = 'MyApp';
appName = 'YourApp';
```

### Error 19: Calling a non-existent string method
**Description:** Convert a string to uppercase
```javascript
let str = 'hello';
let upper = str.toCapital();
```

### Error 20: String method called on number
**Description:** Call toUpperCase on a number
```javascript
let num = 42;
let upper = num.toUpperCase();
```

### Error 21: Missing semicolon before string method chain
**Description:** Chain string methods to trim and uppercase
```javascript
let input = '  hello  '
let result = input.trim().toUpperCase()
```

### Error 22: Wrong operator for string repetition
**Description:** Repeat a string 3 times
```javascript
let repeated = 'ha' * 3;
```

### Error 23: Subtracting strings
**Description:** Remove 'world' from 'hello world'
```javascript
let result = 'hello world' - 'world';
```

### Error 24: IndexOf with wrong argument order
**Description:** Find the position of 'l' in 'hello'
```javascript
let pos = 'hello'.indexOf('hello', 'l');
```

### Error 25: Slice with start > end
**Description:** Extract 'ell' from 'hello' using slice
```javascript
let result = 'hello'.slice(4, 1);
```

### Error 26: Split on empty string with wrong limit
**Description:** Split 'a,b,c' by comma with limit 2
```javascript
let items = 'a,b,c'.split('', 2);
```

### Error 27: Replace without global flag
**Description:** Replace all 'a' with 'o' in 'banana'
```javascript
let result = 'banana'.replace('a', 'o');
```

### Error 28: CharAt with out-of-bounds index
**Description:** Get character at index 100 in 'hello'
```javascript
let char = 'hello'.charAt(100);
```

### Error 29: Trim method called on non-string
**Description:** Trim whitespace from a number
```javascript
let num = 42;
let trimmed = num.trim();
```

### Error 30: Length accessed without parentheses
**Description:** Get the length of a string
```javascript
let len = 'hello'.length();
```

### Error 31: ToLowerCase called incorrectly
**Description:** Convert 'HELLO' to lowercase
```javascript
let lower = 'HELLO'.toLowerCase;
```

### Error 32: Concat method with array argument
**Description:** Concatenate 'Hello ' and 'World'
```javascript
let result = 'Hello '.concat(['World']);
```

### Error 33: Includes method with regex
**Description:** Check if 'hello world' contains digits
```javascript
let hasDigits = 'hello world'.includes(/\d/);
```

### Error 34: StartsWith with wrong this context
**Description:** Check if 'hello' starts with 'he'
```javascript
let result = 'hello'.startsWith.call(null, 'he');
```

### Error 35: EndsWith with negative length
**Description:** Check if 'hello' ends with 'lo'
```javascript
let result = 'hello'.endsWith('lo', -1);
```

### Error 36: Padding with negative length
**Description:** Pad '5' to length 3 with zeros
```javascript
let padded = '5'.padStart(-3, '0');
```

### Error 37: Repeat with negative count
**Description:** Repeat 'ha' -1 times
```javascript
let repeated = 'ha'.repeat(-1);
```

### Error 38: Match without global flag
**Description:** Find all vowels in 'hello'
```javascript
let vowels = 'hello'.match(/[aeiou]/);
```

### Error 39: Search with invalid regex flags
**Description:** Search for digits in 'abc123'
```javascript
let pos = 'abc123'.search(\d+);
```

### Error 40: LocalCompare with undefined locales
**Description:** Compare 'ä' with 'z' using localeCompare
```javascript
let cmp = 'ä'.localeCompare('z', undefined);
```

### Error 41: FromCharCode with string argument
**Description:** Convert character code 65 to string
```javascript
let char = String.fromCharCode('65');
```

### Error 42: CharCodeAt on empty string
**Description:** Get char code of first character in ''
```javascript
let code = ''.charCodeAt(0);
```

### Error 43: Substring with negative index
**Description:** Get substring from index -1 in 'hello'
```javascript
let result = 'hello'.substring(-1, 3);
```

### Error 44: Substr with negative length
**Description:** Get 3 characters from index 1
```javascript
let result = 'hello'.substr(1, -3);
```

### Error 45: Slice with NaN argument
**Description:** Slice 'hello' from index NaN
```javascript
let result = 'hello'.slice(NaN, 3);
```

### Error 46: Split with no separator
**Description:** Split 'hello' into characters
```javascript
let chars = 'hello'.split();
```

### Error 47: Join called on string instead of array
**Description:** Join array elements with a dash
```javascript
let result = 'hello'.join('-');
```

### Error 48: Concat without string argument
**Description:** Concatenate 'Hello ' with 42
```javascript
let result = 'Hello '.concat(42);
```

### Error 49: IndexOf with no search value
**Description:** Find index of empty string in 'hello'
```javascript
let pos = 'hello'.indexOf('');
```

### Error 50: LastIndexOf with wrong starting index
**Description:** Find last 'l' in 'hello' starting from end
```javascript
let pos = 'hello'.lastIndexOf('l', 0);
```

### Error 51: Template literal with expression error
**Description:** Create a template literal that calls a function
```javascript
let result = `The sum is ${add(5, 10}`
```

### Error 52: Nested template literals with wrong quotes
**Description:** Create a template literal inside another
```javascript
let name = 'Bob';
let msg = `Hello, `${name}`!`;
```

### Error 53: Tagged template with no function
**Description:** Use a non-existent tag function
```javascript
let result = myTag`Hello ${name}`;
```

### Error 54: Raw string access on non-template
**Description:** Access raw property on a regular string
```javascript
let str = 'hello\nworld';
console.log(str.raw);
```

### Error 55: String constructor with new and no value
**Description:** Create a new String object
```javascript
let str = new String();
let result = str.length;
```

### Error 56: Comparing String object to string primitive
**Description:** Compare a String object to a string primitive
```javascript
let strObj = new String('hello');
if (strObj === 'hello') {
  console.log('equal');
}
```

### Error 57: Typeof on String object
**Description:** Check if a String object is a string
```javascript
let str = new String('hello');
if (typeof str === 'string') {
  console.log('is string');
}
```

### Error 58: For-in loop on string
**Description:** Iterate over characters in a string
```javascript
let str = 'hello';
for (let char in str) {
  console.log(char);
}
```

### Error 59: String replace with function that returns wrong type
**Description:** Replace digits with their double
```javascript
let result = 'a1b2c3'.replace(/\d/g, function(match) {
  return match * 2;
});
```

### Error 60: Using constructor without new
**Description:** Call String as a constructor without new
```javascript
let str = String('hello');
let len = str.length;
```

### Error 61: Variable name shadowing String
**Description:** Declare a variable named String
```javascript
let String = 'hello';
console.log(String.length);
```

### Error 62: Accessing string property with space
**Description:** Access a property with a space in the name
```javascript
let str = 'hello';
console.log(str.'length');
```

### Error 63: String interpolation with backslash
**Description:** Include a backslash in a template literal
```javascript
let path = `C:\Users\${name}`;
```

### Error 64: Template literal with multi-line expression
**Description:** Use a multi-line expression in a template literal
```javascript
let result = `The value is ${someFunction()
  .toString()}`;
```

### Error 65: Concatenation with undefined variable
**Description:** Concatenate a defined string with an undefined variable
```javascript
let first = 'Hello';
let message = first + ' ' + second;
```

### Error 66: String addition with null
**Description:** Add null to a string
```javascript
let result = 'Hello' + null;
```

### Error 67: Template literal with too many dollar signs
**Description:** Use a template literal with $${variable}
```javascript
let price = 10;
let msg = `The price is $${price}`;
```

### Error 68: String comparison with locale
**Description:** Compare two strings ignoring case without locale
```javascript
let a = 'Straße';
let b = 'STRASSE';
if (a.toLowerCase() === b.toLowerCase()) {
  console.log('equal');
}
```

### Error 69: Using split with regex that has global flag
**Description:** Split a string by commas with whitespace
```javascript
let result = 'a, b, c'.split(/, /g);
```

### Error 70: String constructor with array argument
**Description:** Convert an array to a string
```javascript
let arr = [1, 2, 3];
let str = String(arr);
```

## Issue Snippets (1-30)

### Issue 1: Concatenation instead of template literal
**Description:** Build a welcome message with user's name
```javascript
let name = 'Alice';
let welcome = 'Welcome, ' + name + '! You have ' + count + ' messages.';
```

### Issue 2: Inconsistent quote usage
**Description:** Create several string variables
```javascript
let name = "Alice";
let greeting = 'Hello';
let message = "How are you?";
```

### Issue 3: Magic string for comparison
**Description:** Check if user role is admin
```javascript
if (user.role === 'admin') {
  showPanel();
}
```

### Issue 4: Hardcoded string instead of constant
**Description:** Use the API endpoint URL
```javascript
fetch('https://api.example.com/v1/users').then(res => res.json());
```

### Issue 5: String index access with charAt instead of bracket
**Description:** Get the first character of a name
```javascript
let first = name.charAt(0);
```

### Issue 6: Building HTML with string concatenation
**Description:** Create an HTML list item
```javascript
let html = '<li class="item">' + text + '</li>';
```

### Issue 7: Using new String instead of primitive
**Description:** Create a greeting string
```javascript
let greeting = new String('Hello, World!');
```

### Issue 8: Comparing strings with == instead of ===
**Description:** Check if input equals expected value
```javascript
if (input == expected) {
  process();
}
```

### Issue 9: Checking string length with comparison to literal
**Description:** Validate that a name has at least 2 characters
```javascript
if (name.length > 2) {
  save();
}
```

### Issue 10: Using substring instead of slice
**Description:** Get the last 4 characters of a string
```javascript
let ext = filename.substring(filename.length - 4);
```

### Issue 11: String concatenation in loop
**Description:** Build a string by appending in a loop
```javascript
let result = '';
for (let i = 0; i < items.length; i++) {
  result += items[i] + ', ';
}
```

### Issue 12: Magic number for string length check
**Description:** Validate a phone number length
```javascript
if (phone.length === 10) {
  submit();
}
```

### Issue 13: Multiple replace calls instead of replaceAll
**Description:** Replace all spaces with dashes
```javascript
let slug = title.replace(/ /g, '-');
```

### Issue 14: String concatenation with empty check
**Description:** Build a greeting with a fallback
```javascript
let greeting = 'Hello, ' + (name || 'Guest');
```

### Issue 15: Using substr (deprecated) instead of slice
**Description:** Extract a substring from position 5 with length 3
```javascript
let part = str.substr(5, 3);
```

### Issue 16: Checking includes with indexOf
**Description:** Check if a string contains a substring
```javascript
if (str.indexOf('test') !== -1) {
  process();
}
```

### Issue 17: Building file path with concatenation
**Description:** Create a file path from directory and filename
```javascript
let fullPath = baseDir + '/' + filename + '.' + ext;
```

### Issue 18: Using escape sequences instead of template literal
**Description:** Create a multi-line string
```javascript
let text = 'Line 1\n' +
           'Line 2\n' +
           'Line 3';
```

### Issue 19: String validation with indexOf
**Description:** Check if email contains @ symbol
```javascript
if (email.indexOf('@') > 0) {
  send();
}
```

### Issue 20: Converting string to array with split('')
**Description:** Convert a word into an array of characters
```javascript
let chars = word.split('');
```

### Issue 21: Using charCodeAt and fromCharCode separately
**Description:** Get the next letter in the alphabet
```javascript
let code = char.charCodeAt(0) + 1;
let next = String.fromCharCode(code);
```

### Issue 22: String builder pattern with array join
**Description:** Build a comma-separated list
```javascript
let csv = items.join(',');
```

### Issue 23: Trimming and checking in separate statements
**Description:** Check if a trimmed input is empty
```javascript
let trimmed = input.trim();
if (trimmed === '') {
  error();
}
```

### Issue 24: Hardcoding error messages
**Description:** Display an error when validation fails
```javascript
if (!valid) {
  showMessage('Error: The input is invalid. Please try again.');
}
```

### Issue 25: Using eval with string concatenation
**Description:** Create a dynamic function call
```javascript
let method = 'get' + name;
let result = eval(method + '()');
```

### Issue 26: String padding with loop instead of padStart
**Description:** Pad a number with leading zeros to width 5
```javascript
let str = num.toString();
while (str.length < 5) {
  str = '0' + str;
}
```

### Issue 27: Checking string equality with toUpperCase
**Description:** Compare two strings case-insensitively
```javascript
if (a.toUpperCase() === b.toUpperCase()) {
  match();
}
```

### Issue 28: Using String.fromCharCode for multiple codes
**Description:** Create a string from character codes 72, 73, 33
```javascript
let str = String.fromCharCode(72) + String.fromCharCode(73) + String.fromCharCode(33);
```

### Issue 29: Trimming inside loop
**Description:** Trim whitespace from each string in an array
```javascript
for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i].trim();
}
```

### Issue 30: String slice with calculated indices
**Description:** Get the filename without extension
```javascript
let name = fullName.slice(0, fullName.lastIndexOf('.'));
```

## Modify Snippets (1-50)

### Modify 1: Convert concatenation to template literal
**Description:** Build a greeting using firstName and lastName
```javascript
let greeting = 'Hello, ' + firstName + ' ' + lastName + '!';
```

### Modify 2: Extract first name from full name
**Description:** Given a full name string, extract just the first name
```javascript
function getFirstName(fullName) {
  return fullName;
}
```

### Modify 3: Add string length validation
**Description:** Validate that a username is between 3 and 20 characters
```javascript
function validateUsername(name) {
  return true;
}
```

### Modify 4: Create a slug from a title
**Description:** Convert "Hello World" to "hello-world"
```javascript
function createSlug(title) {
  return title;
}
```

### Modify 5: Mask a credit card number
**Description:** Show only last 4 digits of "1234-5678-9012-3456"
```javascript
function maskCard(cardNumber) {
  return cardNumber;
}
```

### Modify 6: Count vowels in a string
**Description:** Count the number of vowels in a given string
```javascript
function countVowels(str) {
  return 0;
}
```

### Modify 7: Capitalize the first letter
**Description:** Capitalize the first letter of a word
```javascript
function capitalize(word) {
  return word;
}
```

### Modify 8: Convert string to title case
**Description:** Convert "hello world" to "Hello World"
```javascript
function titleCase(str) {
  return str;
}
```

### Modify 9: Reverse a string
**Description:** Reverse "hello" to "olleh"
```javascript
function reverseString(str) {
  return str;
}
```

### Modify 10: Check if string is palindrome
**Description:** Check if "racecar" reads the same forwards and backwards
```javascript
function isPalindrome(str) {
  return true;
}
```

### Modify 11: Truncate string with ellipsis
**Description:** Truncate a string to 10 characters with "..."
```javascript
function truncate(str, maxLength) {
  return str;
}
```

### Modify 12: Count occurrences of a substring
**Description:** Count how many times "is" appears in "This is a test"
```javascript
function countOccurrences(str, sub) {
  return 0;
}
```

### Modify 13: Remove all whitespace
**Description:** Remove all spaces from "Hello World"
```javascript
function removeWhitespace(str) {
  return str;
}
```

### Modify 14: Extract domain from email
**Description:** Extract "example.com" from "user@example.com"
```javascript
function extractDomain(email) {
  return email;
}
```

### Modify 15: Format phone number
**Description:** Format "1234567890" to "(123) 456-7890"
```javascript
function formatPhone(phone) {
  return phone;
}
```

### Modify 16: Convert string to camelCase
**Description:** Convert "hello world" to "helloWorld"
```javascript
function toCamelCase(str) {
  return str;
}
```

### Modify 17: Convert camelCase to snake_case
**Description:** Convert "helloWorld" to "hello_world"
```javascript
function toSnakeCase(str) {
  return str;
}
```

### Modify 18: Generate a random string
**Description:** Generate a random string of length 8
```javascript
function randomString(length) {
  return '';
}
```

### Modify 19: Count words in a sentence
**Description:** Count the words in "Hello world, how are you?"
```javascript
function countWords(sentence) {
  return 0;
}
```

### Modify 20: Find the longest word
**Description:** Find the longest word in a sentence
```javascript
function longestWord(sentence) {
  return '';
}
```

### Modify 21: Remove duplicate characters
**Description:** Remove duplicate characters from "hello"
```javascript
function removeDuplicates(str) {
  return str;
}
```

### Modify 22: Check if string contains only digits
**Description:** Check if "12345" is all digits
```javascript
function isNumeric(str) {
  return false;
}
```

### Modify 23: Format currency
**Description:** Format 1234.5 to "$1,234.50"
```javascript
function formatCurrency(amount) {
  return '';
}
```

### Modify 24: Escape HTML special characters
**Description:** Escape "<script>" to "&lt;script&gt;"
```javascript
function escapeHtml(str) {
  return str;
}
```

### Modify 25: Truncate to word boundary
**Description:** Truncate a string at the nearest word boundary within limit
```javascript
function truncateWord(str, maxChars) {
  return str;
}
```

### Modify 26: Add commas to a number string
**Description:** Add commas to "1234567" to get "1,234,567"
```javascript
function addCommas(numStr) {
  return numStr;
}
```

### Modify 27: Convert tabs to spaces
**Description:** Replace tabs with 4 spaces in a string
```javascript
function tabsToSpaces(str) {
  return str;
}
```

### Modify 28: Strip HTML tags
**Description:** Remove all HTML tags from "<p>Hello</p>"
```javascript
function stripHtml(str) {
  return str;
}
```

### Modify 29: Repeat string with separator
**Description:** Repeat "ha" 3 times with " - " separator → "ha - ha - ha"
```javascript
function repeatWithSep(str, times, sep) {
  return str;
}
```

### Modify 30: Find common prefix
**Description:** Find the common prefix of ["flower","flow","flight"]
```javascript
function commonPrefix(strings) {
  return '';
}
```

### Modify 31: Validate email format
**Description:** Check if a string is a valid email (contains @ and .)
```javascript
function isValidEmail(email) {
  return false;
}
```

### Modify 32: Convert string to kebab-case
**Description:** Convert "Hello World" to "hello-world"
```javascript
function toKebabCase(str) {
  return str;
}
```

### Modify 33: Highlight search term
**Description:** Wrap search term in string with <mark> tags
```javascript
function highlight(str, term) {
  return str;
}
```

### Modify 34: Count substrings in overlapping mode
**Description:** Count overlapping "aaa" in "aaaaaa"
```javascript
function countOverlapping(str, sub) {
  return 0;
}
```

### Modify 35: Alternating case
**Description:** Convert "hello" to "HeLlO"
```javascript
function alternatingCase(str) {
  return str;
}
```

### Modify 36: Extract initials
**Description:** Extract "J.D." from "John Doe"
```javascript
function getInitials(name) {
  return '';
}
```

### Modify 37: Add padding around string
**Description:** Center a string in a field of width 20 padded with =
```javascript
function centerPad(str, width, padChar) {
  return str;
}
```

### Modify 38: Check anagram
**Description:** Check if "listen" and "silent" are anagrams
```javascript
function isAnagram(str1, str2) {
  return false;
}
```

### Modify 39: Remove specified character
**Description:** Remove all '!' from "Hello! World!!!"
```javascript
function removeChar(str, char) {
  return str;
}
```

### Modify 40: Insert substring at position
**Description:** Insert "beautiful " before "world" in "Hello world"
```javascript
function insertAt(str, sub, pos) {
  return str;
}
```

### Modify 41: Wrap string in HTML tags
**Description:** Wrap "Hello" in a <p> tag
```javascript
function wrapTag(str, tag) {
  return str;
}
```

### Modify 42: Pluralize a word
**Description:** Pluralize "cat" with count 3 → "cats"
```javascript
function pluralize(word, count) {
  return word;
}
```

### Modify 43: Convert string to binary
**Description:** Convert "A" to binary "01000001"
```javascript
function stringToBinary(str) {
  return '';
}
```

### Modify 44: Remove non-alphanumeric characters
**Description:** Remove all non-alphanumeric chars from "hello! world#"
```javascript
function alphanumericOnly(str) {
  return str;
}
```

### Modify 45: Check string ends with suffix (without endsWith)
**Description:** Check if "hello.js" ends with ".js" without using endsWith
```javascript
function endsWith(str, suffix) {
  return false;
}
```

### Modify 46: Check string starts with prefix (without startsWith)
**Description:** Check if "hello.js" starts with "hello" without using startsWith
```javascript
function startsWith(str, prefix) {
  return false;
}
```

### Modify 47: Rot13 cipher
**Description:** Apply ROT13 to "hello" → "uryyb"
```javascript
function rot13(str) {
  return str;
}
```

### Modify 48: Bold search keywords
**Description:** Bold all occurrences of "test" in "this is a test string for testing"
```javascript
function boldKeywords(str, keyword) {
  return str;
}
```

### Modify 49: Format name for display
**Description:** Convert "john_doe" to "John Doe"
```javascript
function formatName(username) {
  return username;
}
```

### Modify 50: Generate abbreviation
**Description:** Generate "NASA" from "National Aeronautics and Space Administration"
```javascript
function abbreviate(phrase) {
  return '';
}
```
