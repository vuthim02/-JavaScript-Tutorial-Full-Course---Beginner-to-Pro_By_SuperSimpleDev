# Level 14: JavaScript Strings - Escape Characters and Comparison

## Error Snippets (1-70)

### Error 1: Double-escaped backslash
**Description:** Create a string with a single backslash
```javascript
let path = 'C:\\Users\\Name';
```

### Error 2: Unescaped carriage return
**Description:** Create a string with a carriage return character
```javascript
let text = 'Hello\rWorld';
```

### Error 3: Unescaped form feed
**Description:** Create a string with a form feed character
```javascript
let text = 'Hello\fWorld';
```

### Error 4: Tab character misinterpreted
**Description:** Create a string with a tab between words
```javascript
let text = 'Hello\tWorld';
```

### Error 5: Null character in string
**Description:** Create a string with a null character
```javascript
let text = 'Hello\0World';
```

### Error 6: Vertical tab in string
**Description:** Create a string with a vertical tab
```javascript
let text = 'Hello\vWorld';
```

### Error 7: Backspace character in string
**Description:** Create a string with a backspace character
```javascript
let text = 'Hello\bWorld';
```

### Error 8: Hex escape with wrong digits
**Description:** Create a string with a hex escape for character code 0x41
```javascript
let text = '\x4G';
```

### Error 9: Unicode escape with wrong format
**Description:** Create a string with Unicode escape for 'A'
```javascript
let text = '\uO41';
```

### Error 10: Unicode code point escape wrong syntax
**Description:** Create a string with extended Unicode escape
```javascript
let text = '\u{1F600';
```

### Error 11: Octal escape in strict mode
**Description:** Use octal escape for character code
```javascript
'use strict';
let text = '\033';
```

### Error 12: Comparing strings with locale-sensitive characters
**Description:** Compare 'ä' and 'z' alphabetically
```javascript
if ('ä' > 'z') {
  console.log('ä comes after z');
}
```

### Error 13: Case-insensitive comparison with wrong method
**Description:** Compare 'Hello' and 'hello' ignoring case
```javascript
let a = 'Hello';
let b = 'hello';
if (a === b) {
  console.log('equal');
}
```

### Error 14: Inconsistent escape for apostrophe
**Description:** Create a string with an apostrophe using double quotes
```javascript
let msg = "It's fine";
```

### Error 15: Escape sequence in template literal
**Description:** Use a newline escape in a template literal
```javascript
let msg = `Hello\nWorld`;
```

### Error 16: Using \\n instead of newline
**Description:** Create a multi-line string with actual newline
```javascript
let text = 'Hello\\nWorld';
```

### Error 17: Escape for double quote inside single quotes
**Description:** Create a string with a double quote inside single quotes
```javascript
let msg = 'He said "Hello"';
```

### Error 18: Unicode surrogate pair split
**Description:** Create a string with emoji by splitting surrogate pair
```javascript
let emoji = '\uD83D';
```

### Error 19: Bad hex escape in regex
**Description:** Use hex escape inside a regex
```javascript
let regex = /\x4G/;
```

### Error 20: Unknown escape character
**Description:** Use an invalid escape sequence
```javascript
let text = '\q';
```

### Error 21: Comparing string with number loosely
**Description:** Compare string '5' with number 5
```javascript
if ('5' == 5) {
  console.log('equal');
}
```

### Error 22: Null byte in middle of string
**Description:** Create a string with embedded null byte
```javascript
let text = 'Hello\0World';
console.log(text.length);
```

### Error 23: Unicode escape for supplementary plane
**Description:** Create an emoji using old-style Unicode escape
```javascript
let emoji = '\u1F600';
```

### Error 24: Escape sequence in variable name
**Description:** Use an escape sequence in a variable name
```javascript
let hell\o = 'world';
```

### Error 25: String comparison with locale in sort
**Description:** Sort an array of strings with non-ASCII characters
```javascript
let arr = ['ä', 'a', 'z'];
arr.sort();
```

### Error 26: Using tilde for string negation
**Description:** Check if a string is empty using ~
```javascript
let str = '';
if (~str) {
  console.log('not empty');
}
```

### Error 27: Comparing strings with boolean
**Description:** Compare a string to true
```javascript
if ('true' === true) {
  console.log('same');
}
```

### Error 28: Comparing NaN to NaN
**Description:** Compare two NaN strings parsed from invalid input
```javascript
let a = parseInt('abc');
let b = parseInt('xyz');
if (a === b) {
  console.log('both NaN');
}
```

### Error 29: Undefined comparison with string
**Description:** Compare undefined with a string
```javascript
if (undefined === 'undefined') {
  console.log('equal');
}
```

### Error 30: Case-sensitive switch statement
**Description:** Check a command string against expected values
```javascript
let cmd = 'HELP';
switch (cmd) {
  case 'help':
    showHelp();
    break;
}
```

### Error 31: Unicode normalization mismatch
**Description:** Compare composed and decomposed Unicode strings
```javascript
let a = 'café';
let b = 'cafe\u0301';
if (a === b) {
  console.log('equal');
}
```

### Error 32: String comparison with array
**Description:** Compare a string to an array
```javascript
if ('hello' === ['hello']) {
  console.log('equal');
}
```

### Error 33: Using > for string comparison
**Description:** Compare two version strings
```javascript
if ('9.0' > '10.0') {
  console.log('version 9 is greater');
}
```

### Error 34: Trailing whitespace comparison
**Description:** Compare two strings where one has trailing space
```javascript
let input = 'hello ';
let expected = 'hello';
if (input === expected) {
  process();
}
```

### Error 35: Comparing with escaped characters
**Description:** Compare a literal string with an escaped version
```javascript
let a = '\n';
let b = '\\n';
if (a === b) {
  console.log('same');
}
```

### Error 36: Using localeCompare without understanding return value
**Description:** Use localeCompare in an if condition
```javascript
if ('a'.localeCompare('b')) {
  console.log('a comes first');
}
```

### Error 37: String comparison after concatenation
**Description:** Compare concatenated strings
```javascript
let a = 'Hello' + ' ' + 'World';
let b = 'Hello World';
if (a == b) {
  console.log('equal');
}
```

### Error 38: Empty string vs false comparison
**Description:** Check if an empty string equals false
```javascript
if ('' == false) {
  console.log('empty is false');
}
```

### Error 39: Zero string vs number comparison
**Description:** Compare string '0' with boolean false
```javascript
if ('0' == false) {
  console.log('zero is false');
}
```

### Error 40: Whitespace-only string truthiness
**Description:** Check if a whitespace-only string is truthy
```javascript
let str = '   ';
if (str) {
  console.log('has content');
}
```

### Error 41: Comparing literals with new keyword
**Description:** Compare string literal with String object
```javascript
if ('hello' === new String('hello')) {
  console.log('equal');
}
```

### Error 42: Escape for backslash in path incorrect
**Description:** Create a Windows file path
```javascript
let path = 'C:\my\files\test.txt';
```

### Error 43: Vertical tab escape not recognized
**Description:** Use vertical tab in a string
```javascript
let text = 'one\vtwo\vthree';
```

### Error 44: Escape for NUL character in JSON
**Description:** Create a JSON string with null character
```javascript
let json = '{"data": "value\0"}';
```

### Error 45: Unicode escape with wrong case
**Description:** Use lowercase x in hex escape
```javascript
let text = '\x41';
```

### Error 46: Surrogate pair reversal
**Description:** Create a surrogate pair in wrong order
```javascript
let emoji = '\uDC00\uD800';
```

### Error 47: Comparing numbers as strings in sort
**Description:** Sort an array of number strings
```javascript
let arr = ['10', '2', '1'];
arr.sort();
```

### Error 48: Decimal point in wrong position for version compare
**Description:** Compare version numbers with different digits
```javascript
let v1 = '1.10';
let v2 = '1.9';
if (v1 > v2) {
  console.log('newer');
}
```

### Error 49: String comparison with null coalescing
**Description:** Use nullish coalescing for default string
```javascript
let name = input ?? 'Guest';
```

### Error 50: Escape in regex for dot
**Description:** Escape a dot in a regex properly
```javascript
let regex = /\\./;
```

### Error 51: Carriage return line feed confusion
**Description:** Create a string with CRLF line ending
```javascript
let text = 'Line 1\r\nLine 2';
```

### Error 52: Comparing with case-folding characters
**Description:** Compare 'ß' with 'SS' (German sharp s)
```javascript
if ('ß'.toUpperCase() === 'SS') {
  console.log('match');
}
```

### Error 53: Unicode escape for astral symbol
**Description:** Use two Unicode escapes for one symbol
```javascript
let emoji = '\uD83D\uDE00';
```

### Error 54: Inline regex escape for string
**Description:** Use a regex inside a string literal
```javascript
let pattern = '/hello/';
```

### Error 55: Escape in identifier
**Description:** Use an escaped character in variable name
```javascript
let \u0061ge = 25;
```

### Error 56: Line continuation in regular string
**Description:** Continue a string on the next line with backslash
```javascript
let text = 'Hello \
World';
```

### Error 57: Octal literal in string (non-strict)
**Description:** Use octal escape sequence in non-strict mode
```javascript
let text = '\251';
```

### Error 58: Compare full-width and half-width characters
**Description:** Compare 'A' (ASCII) with 'Ａ' (full-width)
```javascript
if ('A' === 'Ａ') {
  console.log('same letter');
}
```

### Error 59: Using == for substring check
**Description:** Check if a string is a substring using ==
```javascript
if ('hello'.substring(0, 2) == 'he') {
  console.log('starts with he');
}
```

### Error 60: Negating string comparison incorrectly
**Description:** Check if two strings are not equal
```javascript
if (!'hello' === 'world') {
  console.log('not equal');
}
```

### Error 61: Comparing with undefined after string operation
**Description:** Compare the result of a failed string operation
```javascript
let result = 'hello'.match(/z/);
if (result === null) {
  console.log('not found');
}
```

### Error 62: Escape in template literal backtick
**Description:** Include a backtick in a template literal using escape
```javascript
let msg = `Code: \`hello\``;
```

### Error 63: Dollar sign escape in template
**Description:** Escape a dollar sign in a template literal
```javascript
let msg = `Price: \$${amount}`;
```

### Error 64: Comparing surrogate pairs incorrectly
**Description:** Check if a string contains an emoji
```javascript
let str = '😀';
if (str.length === 1) {
  console.log('single char');
}
```

### Error 65: Escape for forward slash
**Description:** Include a forward slash in a string
```javascript
let url = 'https:\/\/example.com';
```

### Error 66: Tab vs space comparison
**Description:** Compare a tab character with spaces
```javascript
if ('\t' === '    ') {
  console.log('same whitespace');
}
```

### Error 67: Using control characters in string
**Description:** Use Ctrl+C character in a string
```javascript
let text = 'Press \x03 to copy';
```

### Error 68: Escape for non-printable character
**Description:** Use escape sequence for bell character
```javascript
let text = 'Alert\a';
```

### Error 69: Comparing string lengths with byte lengths
**Description:** Check length of a Unicode string
```javascript
let str = '日本語';
if (str.length === 3) {
  console.log('three bytes');
}
```

### Error 70: Escape for zero-width joiner
**Description:** Use a zero-width joiner in a string
```javascript
let text = 'emoji\u200Dsequence';
```

## Issue Snippets (1-30)

### Issue 1: Hardcoded escape sequences for formatting
**Description:** Create a formatted report with manual escape sequences
```javascript
let report = 'Name: ' + name + '\n\tAge: ' + age + '\n\tCity: ' + city;
```

### Issue 2: Using escape sequences instead of template literals
**Description:** Create a multi-line string with \n
```javascript
let msg = 'Line 1\nLine 2\nLine 3';
```

### Issue 3: String comparison without trimming
**Description:** Compare user input to expected value
```javascript
if (input === 'yes') {
  confirm();
}
```

### Issue 4: Using loose comparison for string
**Description:** Check if a string equals a number
```javascript
if (input == 42) {
  process();
}
```

### Issue 5: Magic comparison string
**Description:** Check if user action is 'delete'
```javascript
if (action === 'delete') {
  confirmDelete();
}
```

### Issue 6: Escape sequence in console.log
**Description:** Log a message with a newline
```javascript
console.log('Hello\nWorld');
```

### Issue 7: Comparing with toUpperCase in sort callback
**Description:** Sort strings case-insensitively
```javascript
arr.sort((a, b) => {
  if (a.toUpperCase() < b.toUpperCase()) return -1;
  if (a.toUpperCase() > b.toUpperCase()) return 1;
  return 0;
});
```

### Issue 8: Unicode escape for ASCII characters
**Description:** Create simple strings with Unicode escapes
```javascript
let hello = '\u0048\u0065\u006C\u006C\u006F';
```

### Issue 9: Trailing whitespace from concatenation
**Description:** Build a string that ends with unwanted space
```javascript
let msg = 'Hello ' + name + ' ';
```

### Issue 10: Checking string equality with switch fallthrough
**Description:** Handle multiple string cases
```javascript
switch (value) {
  case 'yes':
  case 'Y':
  case 'Yes':
    proceed();
    break;
}
```

### Issue 11: Hardcoded newline characters
**Description:** Create a poem with explicit \n
```javascript
let poem = 'Roses are red,\nViolets are blue,\nSugar is sweet,\nAnd so are you.';
```

### Issue 12: String comparison for sorting ignoring case
**Description:** Sort names case-insensitively
```javascript
names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
```

### Issue 13: Manual escape for special regex chars
**Description:** Escape special regex characters in a string
```javascript
let escaped = str.replace('.', '\\.').replace('*', '\\*').replace('+', '\\+');
```

### Issue 14: Using String.raw incorrectly
**Description:** Use String.raw on a regular string
```javascript
let path = String.raw`C:\Users\Name`;
```

### Issue 15: Comparing version strings with parseInt
**Description:** Parse and compare version numbers
```javascript
let major = parseInt(version.split('.')[0]);
let minor = parseInt(version.split('.')[1]);
```

### Issue 16: Boolean coercion of string for comparison
**Description:** Check if a string value represents true
```javascript
if (flag === 'true') {
  enable();
}
```

### Issue 17: Repeated toLowerCase calls
**Description:** Check multiple strings case-insensitively
```javascript
if (a.toLowerCase() === 'admin' || b.toLowerCase() === 'admin') {
  grantAccess();
}
```

### Issue 18: Using escape for quotes when not needed
**Description:** Create a string with quotes using unnecessary escapes
```javascript
let msg = 'He said \"Hello\" to me';
```

### Issue 19: Chained string comparison
**Description:** Check if a string equals one of multiple values
```javascript
if (role === 'admin' || role === 'moderator' || role === 'editor') {
  allowEdit();
}
```

### Issue 20: String length check for empty string
**Description:** Check if a string is empty
```javascript
if (str === '') {
  showError();
}
```

### Issue 21: Case sensitivity in object keys
**Description:** Access an object property case-sensitively
```javascript
let config = { 'API_KEY': 'abc123' };
let key = config['api_key'];
```

### Issue 22: Repeated charCodeAt calls
**Description:** Get character codes of all characters
```javascript
let codes = [];
for (let i = 0; i < str.length; i++) {
  codes.push(str.charCodeAt(i));
}
```

### Issue 23: Manually truncating with if-else
**Description:** Truncate a string if it's too long
```javascript
let display = str;
if (str.length > 100) {
  display = str.substring(0, 97) + '...';
}
```

### Issue 24: Finding character position with charCodeAt comparison
**Description:** Check if first character is uppercase
```javascript
if (str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) {
  console.log('starts with uppercase');
}
```

### Issue 25: Comparing with null after string method
**Description:** Check the result of match()
```javascript
if (str.match(/pattern/) !== null) {
  found();
}
```

### Issue 26: Using string comparison for date strings
**Description:** Compare two date strings
```javascript
if ('2024-01-01' < '2024-12-31') {
  earlier();
}
```

### Issue 27: Inconsistent string comparison for boolean flag
**Description:** Toggle a flag based on string comparison
```javascript
if (toggle === 'on') {
  toggle = 'off';
} else {
  toggle = 'on';
}
```

### Issue 28: Escaping quotes in HTML attributes
**Description:** Create an HTML attribute with quotes
```javascript
let html = '<input value="' + value + '">';
```

### Issue 29: Case-insensitive email comparison
**Description:** Compare two email addresses
```javascript
if (email1.toLowerCase() === email2.toLowerCase()) {
  match();
}
```

### Issue 30: Using String.fromCharCode for emoji
**Description:** Create emoji using fromCharCode (not fromCodePoint)
```javascript
let emoji = String.fromCharCode(128512);
```

## Modify Snippets (1-50)

### Modify 1: Normalize line endings
**Description:** Convert all line endings to \n
```javascript
function normalizeLineEndings(text) {
  return text;
}
```

### Modify 2: Escape special characters for HTML
**Description:** Escape &, <, >, ", ' in a string
```javascript
function escapeHtmlSpecial(str) {
  return str;
}
```

### Modify 3: Add case-insensitive comparison helper
**Description:** Compare two strings ignoring case
```javascript
function equalsIgnoreCase(a, b) {
  return false;
}
```

### Modify 4: Create a string comparison for version numbers
**Description:** Compare two version strings like '1.2.3' and '1.10.0'
```javascript
function compareVersions(v1, v2) {
  return 0;
}
```

### Modify 5: Remove all escape sequences from string
**Description:** Strip escape sequences like \n, \t, \\ from a string
```javascript
function removeEscapes(str) {
  return str;
}
```

### Modify 6: Count actual Unicode characters (not bytes)
**Description:** Count characters in a string with emoji
```javascript
function unicodeLength(str) {
  return 0;
}
```

### Modify 7: Trim specific characters
**Description:** Trim all dots from both ends of '...hello...'
```javascript
function trimChars(str, char) {
  return str;
}
```

### Modify 8: Compare strings with natural sorting
**Description:** Natural sort comparison for strings with numbers
```javascript
function naturalCompare(a, b) {
  return 0;
}
```

### Modify 9: Escape a string for use in regex
**Description:** Escape all regex special characters in a string
```javascript
function escapeRegexString(str) {
  return str;
}
```

### Modify 10: Normalize Unicode string
**Description:** Normalize a string to NFC form
```javascript
function normalizeUnicode(str) {
  return str;
}
```

### Modify 11: Check if a string is a valid JSON
**Description:** Validate if a string is parseable JSON
```javascript
function isValidJson(str) {
  return false;
}
```

### Modify 12: Wrap string at specified width
**Description:** Wrap text at 80 characters without breaking words
```javascript
function wordWrap(text, width) {
  return text;
}
```

### Modify 13: Create a string diff highlighter
**Description:** Highlight differences between two strings
```javascript
function highlightDiff(a, b) {
  return '';
}
```

### Modify 14: Collapse whitespace
**Description:** Replace all whitespace sequences with a single space
```javascript
function collapseWhitespace(str) {
  return str;
}
```

### Modify 15: Convert tabs to custom spaces
**Description:** Replace tabs with a configurable number of spaces
```javascript
function tabsToSpaces(str, tabWidth) {
  return str;
}
```

### Modify 16: Reverse words in a sentence
**Description:** Reverse 'hello world' to 'world hello'
```javascript
function reverseWords(sentence) {
  return sentence;
}
```

### Modify 17: Check if string contains only whitespace
**Description:** Check if a string is only whitespace
```javascript
function isBlank(str) {
  return false;
}
```

### Modify 18: Extract all numbers from a string
**Description:** Extract [123, 45] from 'abc123def45'
```javascript
function extractNumbers(str) {
  return [];
}
```

### Modify 19: Create a string compressor (simple)
**Description:** Compress 'aaabbbcc' to 'a3b3c2'
```javascript
function compressString(str) {
  return str;
}
```

### Modify 20: Create a string decompressor
**Description:** Decompress 'a3b3c2' to 'aaabbbcc'
```javascript
function decompressString(str) {
  return str;
}
```

### Modify 21: Find all email addresses in text
**Description:** Find all email addresses in a block of text
```javascript
function findEmails(text) {
  return [];
}
```

### Modify 22: Slugify with transliteration
**Description:** Convert 'café' to 'cafe'
```javascript
function slugifyTranslit(str) {
  return str;
}
```

### Modify 23: Detect character encoding from string
**Description:** Detect if a string contains non-ASCII characters
```javascript
function hasNonAscii(str) {
  return false;
}
```

### Modify 24: Split text into sentences
**Description:** Split a paragraph into an array of sentences
```javascript
function splitSentences(paragraph) {
  return [];
}
```

### Modify 25: Add indentation to each line
**Description:** Add custom indentation to each line of text
```javascript
function indentText(text, indent) {
  return text;
}
```

### Modify 26: Remove duplicate words
**Description:** Remove consecutive duplicate words from 'hello hello world'
```javascript
function removeDuplicateWords(str) {
  return str;
}
```

### Modify 27: Check if string contains balanced brackets
**Description:** Check if '([{}])' has balanced brackets
```javascript
function balancedBrackets(str) {
  return false;
}
```

### Modify 28: Convert plain text to HTML paragraphs
**Description:** Convert double newlines to <p> tags
```javascript
function textToParagraphs(text) {
  return text;
}
```

### Modify 29: Create a simple markdown to HTML converter
**Description:** Convert **bold** and *italic* to HTML tags
```javascript
function markdownToHtml(md) {
  return md;
}
```

### Modify 30: Validate and format credit card number
**Description:** Remove spaces and dashes from '1234-5678-9012-3456'
```javascript
function normalizeCardNumber(card) {
  return card;
}
```

### Modify 31: Create a string rotation checker
**Description:** Check if 'abc' is a rotation of 'bca'
```javascript
function isRotation(str1, str2) {
  return false;
}
```

### Modify 32: Find most frequent character
**Description:** Find the most frequent character in 'hello world'
```javascript
function mostFrequentChar(str) {
  return '';
}
```

### Modify 33: Generate all substrings
**Description:** Generate all possible substrings of 'abc'
```javascript
function allSubstrings(str) {
  return [];
}
```

### Modify 34: Check if string is a valid base64
**Description:** Validate a base64-encoded string
```javascript
function isValidBase64(str) {
  return false;
}
```

### Modify 35: Convert CSV string to array
**Description:** Convert 'a,b,c' to ['a', 'b', 'c'] handling quotes
```javascript
function parseCsvLine(line) {
  return [];
}
```

### Modify 36: Create a repeating string pattern
**Description:** Create pattern '-=' repeated 5 times → '-=-=-=-=-='
```javascript
function repeatPattern(pattern, times) {
  return '';
}
```

### Modify 37: Remove BOM from string
**Description:** Remove UTF-8 BOM from start of string
```javascript
function removeBom(str) {
  return str;
}
```

### Modify 38: Convert string to leetspeak
**Description:** Convert 'hello' to 'h3ll0'
```javascript
function toLeetSpeak(str) {
  return str;
}
```

### Modify 39: Check if one string contains another (circular)
**Description:** Check if 'abc' can be found in 'bcab' circularly
```javascript
function circularContains(str, sub) {
  return false;
}
```

### Modify 40: Generate a unique string ID
**Description:** Generate a unique string ID with timestamp prefix
```javascript
function uniqueId(prefix) {
  return '';
}
```

### Modify 41: Remove ANSI escape codes
**Description:** Strip ANSI color codes from a terminal string
```javascript
function stripAnsi(str) {
  return str;
}
```

### Modify 42: Pad numbers with consistent width
**Description:** Pad numbers in an array to match the longest
```javascript
function padNumbers(numbers) {
  return [];
}
```

### Modify 43: Create a simple cipher (Caesar cipher)
**Description:** Shift each letter by 3: 'abc' → 'def'
```javascript
function caesarCipher(str, shift) {
  return str;
}
```

### Modify 44: Create a Vigenère cipher
**Description:** Encrypt text using a keyword-based cipher
```javascript
function vigenereEncrypt(text, key) {
  return '';
}
```

### Modify 45: Check if string is a pangram
**Description:** Check if the sentence contains every letter of the alphabet
```javascript
function isPangram(str) {
  return false;
}
```

### Modify 46: Replace multiple spaces with single space
**Description:** Collapse multiple spaces in 'hello   world' to 'hello world'
```javascript
function collapseSpaces(str) {
  return str;
}
```

### Modify 47: Convert string to ASCII-only version
**Description:** Convert 'héllo wörld' to 'hello world'
```javascript
function toAscii(str) {
  return str;
}
```

### Modify 48: Find all positions of a substring
**Description:** Find all positions of 'a' in 'banana'
```javascript
function allPositions(str, sub) {
  return [];
}
```

### Modify 49: Check if string is a valid filename
**Description:** Check if a string is a valid filename (no / \ : * ? " < > |)
```javascript
function isValidFilename(str) {
  return false;
}
```

### Modify 50: Create a simple string tokenizer
**Description:** Tokenize 'hello,world,foo,bar' by comma
```javascript
function tokenize(str, delimiter) {
  return [];
}
```
