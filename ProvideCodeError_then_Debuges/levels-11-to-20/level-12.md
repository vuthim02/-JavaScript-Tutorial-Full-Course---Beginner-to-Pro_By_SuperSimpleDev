# Level 12: JavaScript Strings - Methods and Manipulation

## Error Snippets (1-70)

### Error 1: Slice with string instead of number
**Description:** Extract characters from index 1 to 4 of 'hello'
```javascript
let result = 'hello'.slice('1', '4');
```

### Error 2: Split with regex without escaping dot
**Description:** Split 'file.txt' by the dot character
```javascript
let parts = 'file.txt'.split('.');
```

### Error 3: IndexOf with no second argument
**Description:** Find the second occurrence of 'a' in 'banana'
```javascript
let pos = 'banana'.indexOf('a');
```

### Error 4: ReplaceAll with string pattern
**Description:** Replace all 'a' with 'o' in 'banana'
```javascript
let result = 'banana'.replaceAll('a', 'o');
```

### Error 5: TrimStart called on undefined
**Description:** Trim leading spaces from a string
```javascript
let str;
let trimmed = str.trimStart();
```

### Error 6: PadEnd with no padding string
**Description:** Pad 'hello' to length 10 on the right
```javascript
let padded = 'hello'.padEnd(10);
```

### Error 7: Split with limit but no separator
**Description:** Split 'a,b,c' into 2 parts
```javascript
let items = 'a,b,c'.split(2);
```

### Error 8: Replace with callback returning undefined
**Description:** Replace each digit with its square
```javascript
let result = '2'.replace(/\d/, function(d) {
  let n = parseInt(d);
});
```

### Error 9: MatchAll without global flag
**Description:** Find all matches of digits in 'a1b2c3'
```javascript
let matches = 'a1b2c3'.matchAll(/\d/);
```

### Error 10: Slice with negative start greater than length
**Description:** Get last 10 characters of 'hello'
```javascript
let result = 'hello'.slice(-10);
```

### Error 11: CharCodeAt with index -1
**Description:** Get char code of last character in 'hello'
```javascript
let code = 'hello'.charCodeAt(-1);
```

### Error 12: FromCodePoint with negative number
**Description:** Create a string from code point -1
```javascript
let str = String.fromCodePoint(-1);
```

### Error 13: Normalize with invalid form
**Description:** Normalize a string using an invalid Unicode form
```javascript
let norm = 'café'.normalize('INVALID');
```

### Error 14: LocaleCompare with null locales
**Description:** Compare two strings
```javascript
let cmp = 'a'.localeCompare('b', null);
```

### Error 15: Includes with regex without toString
**Description:** Check if 'hello' contains a period
```javascript
let hasDot = 'hello'.includes('.');
```

### Error 16: Concat on non-string primitive
**Description:** Concatenate a boolean with a string
```javascript
let result = true.concat(' is true');
```

### Error 17: Slice on number
**Description:** Slice digits from a number 12345
```javascript
let result = 12345.slice(0, 2);
```

### Error 18: Split on regex with capturing groups
**Description:** Split 'a1b2c' on digits
```javascript
let parts = 'a1b2c'.split(/(\d)/);
```

### Error 19: Repeat with Infinity
**Description:** Repeat 'ha' infinitely
```javascript
let repeated = 'ha'.repeat(Infinity);
```

### Error 20: Replace with empty string pattern
**Description:** Replace nothing with 'x' in 'hello'
```javascript
let result = 'hello'.replace('', 'x');
```

### Error 21: Search with string instead of regex
**Description:** Search for digits in 'abc123' with a string
```javascript
let pos = 'abc123'.search('\d');
```

### Error 22: IndexOf with NaN
**Description:** Find index of NaN in a string
```javascript
let pos = 'hello'.indexOf(NaN);
```

### Error 23: LastIndexOf with undefined
**Description:** Find last occurrence of undefined in 'hello'
```javascript
let pos = 'hello'.lastIndexOf(undefined);
```

### Error 24: Match with global flag and capturing groups
**Description:** Match all hex colors in a string
```javascript
let colors = '#fff #000'.match(/(#[a-f0-9]+)/g);
```

### Error 25: CodePointAt with out of bounds
**Description:** Get code point at index 100 in 'hello'
```javascript
let code = 'hello'.codePointAt(100);
```

### Error 26: At with negative index on empty string
**Description:** Get last character of empty string
```javascript
let char = ''.at(-1);
```

### Error 27: PadStart with string length already exceeded
**Description:** Pad 'hello' to length 3 on the left
```javascript
let padded = 'hello'.padStart(3, '0');
```

### Error 28: Slice with non-integer start
**Description:** Slice 'hello' from index 1.7 to 4
```javascript
let result = 'hello'.slice(1.7, 4);
```

### Error 29: Substring with NaN arguments
**Description:** Get substring from NaN to NaN in 'hello'
```javascript
let result = 'hello'.substring(NaN, NaN);
```

### Error 30: Concat with spread operator on string
**Description:** Concatenate 'Hello' and 'World' using spread
```javascript
let result = 'Hello'.concat(...'World');
```

### Error 31: TrimEnd on null
**Description:** Trim trailing spaces from null
```javascript
let str = null;
let trimmed = str.trimEnd();
```

### Error 32: PadEnd with emoji as padding
**Description:** Pad 'hi' to length 6 with emoji
```javascript
let padded = 'hi'.padEnd(6, '😀');
```

### Error 33: Split on empty separator with array spread
**Description:** Split 'hello' into characters
```javascript
let chars = 'hello'.split('');
```

### Error 34: ReplaceAll with regex missing global flag
**Description:** Replace all 'a' in 'banana'
```javascript
let result = 'banana'.replaceAll(/a/, 'o');
```

### Error 35: String interpolated with html tags
**Description:** Display user input in HTML
```javascript
let html = `<div>${userInput}</div>`;
```

### Error 36: Raw access on template literal without tag
**Description:** Access raw property of a template literal
```javascript
let raw = `hello\nworld`.raw;
```

### Error 37: Template literal with expression that throws
**Description:** Create a template literal that throws an error
```javascript
let obj = null;
let msg = `Value is ${obj.property}`;
```

### Error 38: Template literal with if statement
**Description:** Use if-else inside a template literal
```javascript
let msg = `The result is ${if (x > 5) 'big' else 'small'}`;
```

### Error 39: Tagged template with arrow function returning wrong type
**Description:** Use a tagged template that returns a number as string
```javascript
let tag = (strings, ...values) => 42;
let result = tag`hello`;
```

### Error 40: MatchAll on non-global regex
**Description:** Find all vowels in 'hello' using matchAll
```javascript
let matches = 'hello'.matchAll(/[aeiou]/);
```

### Error 41: Split on regex with lookahead
**Description:** Split 'a1b2c' at positions before digits
```javascript
let parts = 'a1b2c'.split(/(?=\d)/);
```

### Error 42: String replace with async function
**Description:** Replace each digit with a promise result
```javascript
let result = 'a1b2'.replace(/\d/g, async (m) => await fetchData(m));
```

### Error 43: Using array length on string
**Description:** Get the length of a string using array syntax
```javascript
let len = 'hello'['length'];
```

### Error 44: Calling replace on undefined
**Description:** Replace 'a' with 'b' on an undefined variable
```javascript
let str;
let result = str.replace('a', 'b');
```

### Error 45: Concat with no arguments
**Description:** Concatenate nothing to 'hello'
```javascript
let result = 'hello'.concat();
```

### Error 46: ToString on null inside template
**Description:** Use null.toString() inside a template literal
```javascript
let val = null;
let msg = `Value is ${val.toString()}`;
```

### Error 47: Character access via method that doesn't exist
**Description:** Get first character of 'hello'
```javascript
let first = 'hello'.first();
```

### Error 48: Calling split on number
**Description:** Split the digits of 12345
```javascript
let digits = 12345.split('');
```

### Error 49: Calling toUpperCase on undefined
**Description:** Convert undefined to uppercase
```javascript
let str = undefined;
let upper = str.toUpperCase();
```

### Error 50: Using charAt with string index
**Description:** Get character at position 'first' in 'hello'
```javascript
let char = 'hello'.charAt('first');
```

### Error 51: Template literal with numeric separator
**Description:** Use a numeric separator inside a template expression
```javascript
let num = 1_000_000;
let msg = `Number: ${num}`;
```

### Error 52: Trim with regex argument
**Description:** Trim specific characters from a string
```javascript
let str = '...hello...';
let trimmed = str.trim(/\./g);
```

### Error 53: Using localeCompare with no arguments
**Description:** Compare 'a' with default locale
```javascript
let cmp = 'a'.localeCompare();
```

### Error 54: CharAt with negative index returns empty
**Description:** Get character at index -1 in 'hello'
```javascript
let char = 'hello'.charAt(-1);
```

### Error 55: Split with separator that is too long
**Description:** Split 'hello' by 'hellohello'
```javascript
let parts = 'hello'.split('hellohello');
```

### Error 56: IndexOf with regex as search value
**Description:** Find the first digit in 'abc123'
```javascript
let pos = 'abc123'.indexOf(/\d/);
```

### Error 57: LastIndexOf with search value not found
**Description:** Find last 'z' in 'hello'
```javascript
let pos = 'hello'.lastIndexOf('z');
```

### Error 58: Slice with both arguments negative and reversed
**Description:** Extract last 2 characters of 'hello'
```javascript
let result = 'hello'.slice(-2, -1);
```

### Error 59: Substring with swapped arguments
**Description:** Get substring from index 3 to 1 in 'hello'
```javascript
let result = 'hello'.substring(3, 1);
```

### Error 60: PadStart with empty padding string
**Description:** Pad '5' to length 3 with empty string
```javascript
let padded = '5'.padStart(3, '');
```

### Error 61: Using includes on non-string
**Description:** Check if a number includes a digit
```javascript
let hasFive = 12345.includes(5);
```

### Error 62: Slice on undefined string
**Description:** Slice an undefined variable
```javascript
let str;
let result = str.slice(0, 5);
```

### Error 63: Match with null regex
**Description:** Match with null regex pattern
```javascript
let result = 'hello'.match(null);
```

### Error 64: Replace with null replacement
**Description:** Replace 'o' with null
```javascript
let result = 'hello'.replace('o', null);
```

### Error 65: String interpolation in non-template string
**Description:** Use ${variable} syntax in a regular string
```javascript
let name = 'World';
let msg = "Hello ${name}";
```

### Error 66: Chaining trim on non-string
**Description:** Chain trim calls on a number
```javascript
let result = 42..toString().trim();
```

### Error 67: Calling string method on null
**Description:** Call string method on null value
```javascript
let val = null;
let upper = val.toUpperCase();
```

### Error 68: Regex exec on wrong string type
**Description:** Use regex exec on a String object
```javascript
let str = new String('hello');
let match = /l/.exec(str);
```

### Error 69: Using valueOf on string primitive
**Description:** Get primitive value of a string
```javascript
let str = 'hello';
let val = str.valueOf();
```

### Error 70: Template literal with newline in expression
**Description:** Create a template literal with a multi-line arrow function
```javascript
let fn = (x) => x;
let msg = `Result: ${fn
  (5)}`;
```

## Issue Snippets (1-30)

### Issue 1: Repeated concatenation for URL building
**Description:** Build a URL with query parameters
```javascript
let url = 'https://api.com/' + endpoint + '?key=' + apiKey + '&limit=' + limit;
```

### Issue 2: Using deprecated escape function
**Description:** Encode a URL string
```javascript
let encoded = escape(userInput);
```

### Issue 3: Converting string to number with parseInt without radix
**Description:** Parse a hex string like 'ff'
```javascript
let num = parseInt(hexStr);
```

### Issue 4: Checking string type with typeof twice
**Description:** Check if a value is a string
```javascript
if (typeof val === 'string' || val instanceof String) {
  process();
}
```

### Issue 5: Trimming and then checking length separately
**Description:** Check if a name field is empty after trimming
```javascript
let clean = name.trim();
if (clean.length === 0) {
  showError();
}
```

### Issue 6: Multiple indexOf calls instead of includes
**Description:** Check if string contains both 'a' and 'b'
```javascript
if (str.indexOf('a') !== -1 && str.indexOf('b') !== -1) {
  process();
}
```

### Issue 7: Building SQL query with string concatenation
**Description:** Build a SQL SELECT query
```javascript
let query = 'SELECT * FROM users WHERE name = "' + userName + '"';
```

### Issue 8: String as boolean check
**Description:** Check if a string is non-empty
```javascript
if (str) {
  process();
}
```

### Issue 9: Multiple split and join instead of replaceAll
**Description:** Replace all spaces with dashes
```javascript
let slug = title.split(' ').join('-');
```

### Issue 10: Using concat instead of + operator
**Description:** Combine first and last name
```javascript
let full = firstName.concat(' ').concat(lastName);
```

### Issue 11: Hardcoded string formatting
**Description:** Format a date as MM/DD/YYYY
```javascript
let date = month + '/' + day + '/' + year;
```

### Issue 12: Comparing with toUpperCase instead of localeCompare
**Description:** Sort two strings alphabetically
```javascript
if (a.toUpperCase() < b.toUpperCase()) {
  return -1;
}
```

### Issue 13: Using String constructor as conversion
**Description:** Convert a number to a string
```javascript
let str = new String(42);
```

### Issue 14: Checking empty string with length comparison
**Description:** Check if a string is empty
```javascript
if (str.length === 0) {
  handleEmpty();
}
```

### Issue 15: Building CSV with manual comma insertion
**Description:** Create a CSV line from fields
```javascript
let csv = field1 + ',' + field2 + ',' + field3 + ',' + field4;
```

### Issue 16: Using slice instead of substring for fixed positions
**Description:** Get first 3 characters of a string
```javascript
let prefix = str.slice(0, 3);
```

### Issue 17: Checking substring with indexOf > -1
**Description:** Check if URL contains 'https'
```javascript
if (url.indexOf('https') > -1) {
  secure();
}
```

### Issue 18: String multiplication pattern
**Description:** Create a line of 50 dashes
```javascript
let line = '';
for (let i = 0; i < 50; i++) {
  line += '-';
}
```

### Issue 19: Converting array to string with toString
**Description:** Convert an array to a comma-separated string
```javascript
let str = arr.toString();
```

### Issue 20: Using unescape (deprecated)
**Description:** Decode a URL-encoded string
```javascript
let decoded = unescape(encodedStr);
```

### Issue 21: Building regex from string dynamically
**Description:** Create a regex from user input
```javascript
let regex = new RegExp(userInput);
```

### Issue 22: Trimming inside map callback
**Description:** Trim all strings in an array
```javascript
let trimmed = arr.map(function(s) { return s.trim(); });
```

### Issue 23: Using substr (deprecated)
**Description:** Get last 5 characters of a filename
```javascript
let ext = filename.substr(-5);
```

### Issue 24: Checking prefix with indexOf === 0
**Description:** Check if a string starts with 'http'
```javascript
if (url.indexOf('http') === 0) {
  valid();
}
```

### Issue 25: Building HTML with document.write
**Description:** Add a paragraph to the document
```javascript
document.write('<p>' + text + '</p>');
```

### Issue 26: Magic number for string indexing
**Description:** Get the file extension from a filename
```javascript
let ext = filename.slice(filename.indexOf('.') + 1);
```

### Issue 27: Manually escaping quotes
**Description:** Create a string with double quotes inside
```javascript
let msg = 'He said, "Hello!"';
```

### Issue 28: Using void operator on string
**Description:** Create an undefined result from a string operation
```javascript
let result = void 'hello';
```

### Issue 29: Accessing prototype methods directly
**Description:** Call slice via prototype
```javascript
let result = String.prototype.slice.call('hello', 1, 3);
```

### Issue 30: Using eval to parse JSON
**Description:** Parse a JSON string
```javascript
let data = eval('(' + jsonStr + ')');
```

## Modify Snippets (1-50)

### Modify 1: String template for URL query
**Description:** Build a URL with query parameters using template literals
```javascript
let url = 'https://api.com/search?q=' + query + '&page=' + page + '&limit=' + limit;
```

### Modify 2: Extract filename from path
**Description:** Extract 'file.txt' from '/usr/local/file.txt'
```javascript
function getFilename(path) {
  return path;
}
```

### Modify 3: Check if string is all uppercase
**Description:** Check if 'HELLO' is all uppercase
```javascript
function isAllUpper(str) {
  return false;
}
```

### Modify 4: Check if string is all lowercase
**Description:** Check if 'hello' is all lowercase
```javascript
function isAllLower(str) {
  return false;
}
```

### Modify 5: Count consonants in a string
**Description:** Count consonants (non-vowels) in a string
```javascript
function countConsonants(str) {
  return 0;
}
```

### Modify 6: Swap case of each character
**Description:** Convert 'Hello' to 'hELLO'
```javascript
function swapCase(str) {
  return str;
}
```

### Modify 7: Remove vowels from a string
**Description:** Remove all vowels from 'hello world'
```javascript
function removeVowels(str) {
  return str;
}
```

### Modify 8: Double every character
**Description:** Double each char in 'hello' → 'hheelllloo'
```javascript
function doubleChars(str) {
  return str;
}
```

### Modify 9: Shuffle characters in a string
**Description:** Randomly shuffle the characters of 'hello'
```javascript
function shuffleString(str) {
  return str;
}
```

### Modify 10: Find first non-repeating character
**Description:** Find first non-repeating char in 'hello'
```javascript
function firstNonRepeating(str) {
  return '';
}
```

### Modify 11: Split string by capital letters
**Description:** Split 'HelloWorld' into ['Hello', 'World']
```javascript
function splitByCapitals(str) {
  return [];
}
```

### Modify 12: Wrap each word in a span
**Description:** Wrap each word in '<span>word</span>'
```javascript
function wrapWords(str) {
  return str;
}
```

### Modify 13: Add ordinal suffix to number
**Description:** Convert 1 to '1st', 2 to '2nd', 3 to '3rd'
```javascript
function ordinal(num) {
  return '';
}
```

### Modify 14: Convert number to words (simple)
**Description:** Convert 1-9 to 'one'-'nine'
```javascript
function numberToWord(num) {
  return '';
}
```

### Modify 15: Remove consecutive duplicates
**Description:** Reduce 'aaabbbcc' to 'abc'
```javascript
function removeConsecutiveDupes(str) {
  return str;
}
```

### Modify 16: Count frequency of each character
**Description:** Return a frequency map for 'hello'
```javascript
function charFrequency(str) {
  return {};
}
```

### Modify 17: Find longest common substring
**Description:** Find longest common substring of 'hello' and 'yellow'
```javascript
function longestCommonSubstring(a, b) {
  return '';
}
```

### Modify 18: Encode string with run-length encoding
**Description:** Encode 'aaabbc' to 'a3b2c1'
```javascript
function runLengthEncode(str) {
  return str;
}
```

### Modify 19: Decode run-length encoding
**Description:** Decode 'a3b2c1' to 'aaabbc'
```javascript
function runLengthDecode(str) {
  return str;
}
```

### Modify 20: Indent each line of a string
**Description:** Add 4 spaces before each line of a multi-line string
```javascript
function indent(str, spaces) {
  return str;
}
```

### Modify 21: Remove empty lines from a string
**Description:** Remove blank lines from a multi-line string
```javascript
function removeEmptyLines(str) {
  return str;
}
```

### Modify 22: Ensure string ends with a period
**Description:** Add a period to 'Hello' if it doesn't end with one
```javascript
function ensurePeriod(str) {
  return str;
}
```

### Modify 23: Format bytes as human-readable
**Description:** Convert 2048 to '2 KB'
```javascript
function formatBytes(bytes) {
  return '';
}
```

### Modify 24: Add line numbers to a string
**Description:** Add line numbers to each line of a multi-line string
```javascript
function addLineNumbers(str) {
  return str;
}
```

### Modify 25: Extract URLs from text
**Description:** Find all URLs in a string of text
```javascript
function extractUrls(text) {
  return [];
}
```

### Modify 26: Convert string to proper case
**Description:** Convert 'hello world, how are you?' to 'Hello World, How Are You?'
```javascript
function properCase(str) {
  return str;
}
```

### Modify 27: Mask email address
**Description:** Mask 'user@example.com' to 'u***@example.com'
```javascript
function maskEmail(email) {
  return email;
}
```

### Modify 28: Create acronym from phrase
**Description:** Create 'ASAP' from 'As Soon As Possible'
```javascript
function createAcronym(phrase) {
  return '';
}
```

### Modify 29: Check if string contains balanced parentheses
**Description:** Check if '(a + (b - c))' has balanced parens
```javascript
function balancedParens(str) {
  return false;
}
```

### Modify 30: Find all permutations of a string
**Description:** Find all permutations of 'abc'
```javascript
function permutations(str) {
  return [];
}
```

### Modify 31: Convert string to title case (excluding articles)
**Description:** Title case 'the lord of the rings' excluding 'the' and 'of'
```javascript
function titleCaseExclude(str) {
  return str;
}
```

### Modify 32: Validate password strength
**Description:** Check if password has uppercase, lowercase, digit, and special char
```javascript
function passwordStrength(password) {
  return false;
}
```

### Modify 33: Remove HTML comments from string
**Description:** Strip HTML comments from a string
```javascript
function removeHtmlComments(str) {
  return str;
}
```

### Modify 34: Convert Unix timestamp to readable date string
**Description:** Convert 1700000000 to a readable date string
```javascript
function timestampToDate(ts) {
  return '';
}
```

### Modify 35: Extract hashtags from text
**Description:** Extract '#hello #world' → ['hello', 'world']
```javascript
function extractHashtags(text) {
  return [];
}
```

### Modify 36: Normalize whitespace
**Description:** Replace multiple spaces with single space in a string
```javascript
function normalizeWhitespace(str) {
  return str;
}
```

### Modify 37: Check if string is a valid URL
**Description:** Check if a string is a valid HTTP/HTTPS URL
```javascript
function isValidUrl(str) {
  return false;
}
```

### Modify 38: Format number with decimal places
**Description:** Format 3.14159 to 2 decimal places → '3.14'
```javascript
function formatDecimal(num, places) {
  return '';
}
```

### Modify 39: Convert snake_case to camelCase
**Description:** Convert 'hello_world_foo' to 'helloWorldFoo'
```javascript
function snakeToCamel(str) {
  return str;
}
```

### Modify 40: Convert camelCase to snake_case
** Description:** Convert 'helloWorldFoo' to 'hello_world_foo'
```javascript
function camelToSnake(str) {
  return str;
}
```

### Modify 41: Check if string is a valid hex color
**Description:** Check if '#fff' or '#ffffff' is a valid hex color
```javascript
function isValidHexColor(str) {
  return false;
}
```

### Modify 42: Escape regex special characters
**Description:** Escape 'hello.world(test)' for use in regex
```javascript
function escapeRegex(str) {
  return str;
}
```

### Modify 43: Convert spaces to non-breaking spaces
**Description:** Replace spaces with &nbsp; in a string
```javascript
function nbsp(str) {
  return str;
}
```

### Modify 44: Ensure string starts with https://
**Description:** Add 'https://' to 'example.com' if missing
```javascript
function ensureHttps(url) {
  return url;
}
```

### Modify 45: Find the difference between two strings
**Description:** Find which chars differ between 'hello' and 'hallo'
```javascript
function stringDiff(a, b) {
  return '';
}
```

### Modify 46: Create a slug with custom separator
**Description:** Convert 'Hello World!' to 'hello-world' with '-' separator
```javascript
function slugify(str, separator) {
  return str;
}
```

### Modify 47: Interleave two strings
**Description:** Interleave 'abc' and '123' → 'a1b2c3'
```javascript
function interleave(a, b) {
  return '';
}
```

### Modify 48: Convert string to Morse code
**Description:** Convert 'SOS' to '... --- ...'
```javascript
function toMorseCode(str) {
  return '';
}
```

### Modify 49: Find shortest word in a sentence
**Description:** Find the shortest word in a sentence
```javascript
function shortestWord(sentence) {
  return '';
}
```

### Modify 50: Check if string is a valid ISBN-10
**Description:** Check if '0306406152' is a valid ISBN-10
```javascript
function isValidIsbn10(isbn) {
  return false;
}
```
