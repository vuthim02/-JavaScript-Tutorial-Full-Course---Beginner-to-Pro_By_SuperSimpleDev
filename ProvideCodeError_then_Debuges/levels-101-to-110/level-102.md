# Debugging Challenges - Level 102
## Theme: String Formatter with Math Calculations

---

### Error 1: Missing return in string formatter
**Description:** Should format a name with proper capitalization
```javascript
function formatName(name) {
  let formatted = name.charAt(0).toUpperCase() + name.slice(1);
}
console.log(formatName("john"));
```

### Error 2: Wrong string method for lowercase
**Description:** Should convert string to lowercase
```javascript
let str = "HELLO";
console.log(str.toLowercase());
```

### Error 3: Missing concatenation operator
**Description:** Should combine first and last name with space
```javascript
let first = "John";
let last = "Doe";
let full = first last;
console.log(full);
```

### Error 4: Template literal without backtick
**Description:** Should use template literal with expression
```javascript
let a = 5, b = 3;
console.log("${a} + ${b} = ${a + b}");
```

### Error 5: Math in string template wrong
**Description:** Should compute sum inside template literal
```javascript
let x = 10, y = 20;
console.log(`The sum is ${x + y}');
```

### Error 6: Variable not defined in string
**Description:** Should display username in greeting
```javascript
let username = "Alice";
console.log(`Welcome, ${userName}!`);
```

### Error 7: String length property typo
**Description:** Should get length of string
```javascript
let msg = "hello";
console.log(msg.len());
```

### Error 8: Wrong index for last character
**Description:** Should get last character of string
```javascript
let str = "hello";
console.log(str[str.length]);
```

### Error 9: toUpperCase not a function
**Description:** Should convert to uppercase
```javascript
let str = "hello";
console.log(str.toUpperCase);
```

### Error 10: Substring with negative
**Description:** Should extract last 4 characters
```javascript
let str = "hello world";
console.log(str.substring(-4));
```

### Error 11: Split delimiter wrong
**Description:** Should split string by commas
```javascript
let csv = "a,b,c";
console.log(csv.split("."));
```

### Error 12: Join on string instead of array
**Description:** Should join array elements with dash
```javascript
let arr = ["a", "b", "c"];
console.log(arr.join("-"));
```

### Error 13: ReplaceAll not supported
**Description:** Should replace all occurrences of "a" with "o"
```javascript
let str = "banana";
console.log(str.replaceAll("a", "o"));
```

### Error 14: CharAt out of bounds
**Description:** Should safely get character at index
```javascript
let str = "hi";
console.log(str.charAt(5));
```

### Error 15: IndexOf with no match
**Description:** Should find position of "z"
```javascript
let str = "hello";
console.log(str.indexOf("z"));
```

### Error 16: Slice with start > end
**Description:** Should extract middle portion of string
```javascript
let str = "hello world";
console.log(str.slice(6, 2));
```

### Error 17: Wrong trim method
**Description:** Should remove trailing whitespace
```javascript
let str = "hello   ";
console.log(str.trimRight());
```

### Error 18: PadStart wrong argument order
**Description:** Should pad string to length 5 with zeros
```javascript
let str = "42";
console.log(str.padStart(0, 5));
```

### Error 19: PadEnd not a function
**Description:** Should pad string with spaces to length 10
```javascript
let str = "hello";
console.log(str.padEnd);
```

### Error 20: Split and join confusion
**Description:** Should replace all spaces with dashes
```javascript
let str = "hello world";
console.log(str.split("-").join(" "));
```

### Error 21: String repeat syntax
**Description:** Should repeat string 3 times
```javascript
let str = "abc";
console.log(str.repeat(3));
```

### Error 22: Wrong includes method
**Description:** Should check if string contains substring
```javascript
let str = "hello world";
console.log(str.includes());
```

### Error 23: StartsWith missing argument
**Description:** Should check if string starts with "he"
```javascript
let str = "hello";
console.log(str.startsWith());
```

### Error 24: EndsWith typo
**Description:** Should check if string ends with "lo"
```javascript
let str = "hello";
console.log(str.endWith("lo"));
```

### Error 25: Match without regex
**Description:** Should find all digits in string
```javascript
let str = "abc123def456";
console.log(str.match("\\d+"));
```

### Error 26: Search with string instead of regex
**Description:** Should find position of first digit
```javascript
let str = "abc123";
console.log(str.search("\\d"));
```

### Error 27: LocaleCompare usage
**Description:** Should compare two strings alphabetically
```javascript
let a = "apple", b = "banana";
console.log(a.localeCompare(b));
```

### Error 28: FromCharCode not a function
**Description:** Should convert char code to string
```javascript
console.log(String.fromCharCode(65));
```

### Error 29: CharCodeAt typo
**Description:** Should get character code of first char
```javascript
let str = "A";
console.log(str.charCodeAt());
```

### Error 30: Concat not chainable
**Description:** Should concatenate multiple strings
```javascript
let a = "a", b = "b", c = "c";
console.log(a.concat(b).concat(c));
```

### Error 31: Slice with no arguments
**Description:** Should make a copy of string
```javascript
let str = "hello";
console.log(str.slice());
```

### Error 32: String constructor without new
**Description:** Should create a string object
```javascript
let str = String("hello");
console.log(typeof str);
```

### Error 33: Wrong escape for quote
**Description:** Should include double quote in string
```javascript
let str = "She said "hello"";
console.log(str);
```

### Error 34: Multiline string without newline
**Description:** Should create multiline string
```javascript
let str = "line1
line2";
console.log(str);
```

### Error 35: Template literal with object
**Description:** Should display object property in template
```javascript
let person = {name: "John"};
console.log(`Name: ${person.name}`);
```

### Error 36: NaN in string concatenation
**Description:** Should handle NaN gracefully in string
```javascript
let result = "Total: " + NaN;
console.log(result);
```

### Error 37: Undefined in string
**Description:** Should handle undefined in template
```javascript
let value;
console.log(`Value is ${value}`);
```

### Error 38: Null in string concatenation
**Description:** Should convert null to string "null"
```javascript
let val = null;
console.log("Value: " + val);
```

### Error 39: Number formatting with string
**Description:** Should format number to 2 decimal places
```javascript
let price = 9.9;
console.log(`$${price.toFixed(2)}`);
```

### Error 40: Variable in string without template
**Description:** Should embed variable in string
```javascript
let name = "John";
console.log("Hello, name");
```

### Error 41: Index instead of character
**Description:** Should get character at index 1
```javascript
let str = "hello";
console.log(str[1]);
```

### Error 42: Wrong bracket notation
**Description:** Should access string character at index 3
```javascript
let str = "hello";
console.log(str{3});
```

### Error 43: Length on number
**Description:** Should get digit count of number
```javascript
let num = 12345;
console.log(num.length);
```

### Error 44: Split on number
**Description:** Should split number into digits
```javascript
let num = 123;
console.log(num.split(""));
```

### Error 45: String subtraction
**Description:** Should subtract two numeric strings
```javascript
let a = "10", b = "5";
console.log(a - b);
```

### Error 46: Addition of string and number
**Description:** Should add number to numeric string
```javascript
let a = "10", b = 5;
console.log(a + b);
```

### Error 47: ParseInt with leading zeros
**Description:** Should parse "010" as number 10
```javascript
let num = parseInt("010");
console.log(num);
```

### Error 48: ParseFloat with non-numeric
**Description:** Should parse "3.14abc" as 3.14
```javascript
let num = parseFloat("3.14abc");
console.log(num + 1);
```

### Error 49: Number constructor with whitespace
**Description:** Should convert " 42 " to number
```javascript
let num = Number(" 42 ");
console.log(num + 8);
```

### Error 50: Unary plus on string
**Description:** Should convert string to number
```javascript
let str = "42";
console.log(+str + 8);
```

### Error 51: ToString with radix
**Description:** Should convert number to binary string
```javascript
let num = 10;
console.log(num.toString(2));
```

### Error 52: ToFixed rounding
**Description:** Should round 2.345 to 2 decimals
```javascript
let num = 2.345;
console.log(num.toFixed(2));
```

### Error 53: ToPrecision on large number
**Description:** Should format with 3 significant digits
```javascript
let num = 12345;
console.log(num.toPrecision(3));
```

### Error 54: ToExponential usage
**Description:** Should convert to exponential notation
```javascript
let num = 1234;
console.log(num.toExponential(2));
```

### Error 55: Wrong valueOf usage
**Description:** Should get primitive value of number
```javascript
let num = new Number(42);
console.log(num.valueOf());
```

### Error 56: isFinite instead of isNaN
**Description:** Should check if value is finite number
```javascript
let val = "hello";
console.log(isNaN(val));
```

### Error 57: isInteger on string
**Description:** Should check if value is integer
```javascript
console.log(Number.isInteger("5"));
```

### Error 58: isSafeInteger on float
**Description:** Should check if number is safe integer
```javascript
console.log(Number.isSafeInteger(3.5));
```

### Error 59: MAX_VALUE misunderstanding
**Description:** Should find maximum of two numbers
```javascript
console.log(Number.MAX_VALUE(10, 20));
```

### Error 60: MIN_VALUE as smallest
**Description:** Should get smallest positive number
```javascript
console.log(Number.MIN_VALUE);
```

### Error 61: EPSILON comparison
**Description:** Should compare floats using epsilon
```javascript
let a = 0.1 + 0.2;
console.log(a === 0.3);
```

### Error 62: String slice on undefined
**Description:** Should safely slice string
```javascript
let str;
console.log(str.slice(0, 5));
```

### Error 63: Regular expression literal typo
**Description:** Should match word characters
```javascript
let pattern = /w+/;
console.log(pattern.test("hello123"));
```

### Error 64: Regex global flag missing
**Description:** Should find all matches in string
```javascript
let str = "a1b2c3";
console.log(str.match(/\d/));
```

### Error 65: Regex exec loop
**Description:** Should iterate all regex matches
```javascript
let regex = /\d/g;
let str = "a1b2c3";
let match;
while (match = regex.exec(str)) {
  console.log(match[0]);
}
```

### Error 66: Regex test vs match confusion
**Description:** Should extract matched groups
```javascript
let str = "hello42";
console.log(/hello(\d+)/.test(str));
```

### Error 67: Wrong character class
**Description:** Should match only digits
```javascript
console.log(/\w/.test("123"));
```

### Error 68: Quantifier overflow
**Description:** Should use {3,5} quantifier correctly
```javascript
console.log(/a{3,5}/.test("aaaa"));
```

### Error 69: Anchor usage wrong
**Description:** Should match string that ends with "end"
```javascript
console.log(/^end/.test("the end"));
```

### Error 70: Group vs character class
**Description:** Should match "cat" or "car"
```javascript
console.log(/ca[t r]/.test("cat"));
```

---

### Issue 1: Decimal places in price display
**Description:** Should display price with 2 decimal places
```javascript
let price = 19.9;
console.log(`$${price}`);
```

### Issue 2: String concatenation order
**Description:** Should build "Result: 15" from parts
```javascript
let a = 10, b = 5;
console.log("Result: " + a + b);
```

### Issue 3: Whitespace in trim
**Description:** Should remove all whitespace, not just ends
```javascript
let str = " h e l l o ";
console.log(str.trim());
```

### Issue 4: Case-sensitive comparison
**Description:** Should compare strings case-insensitively
```javascript
let a = "Hello", b = "hello";
console.log(a === b);
```

### Issue 5: Precision in tax calculation
**Description:** Should calculate tax with 2 decimal precision
```javascript
let price = 10;
let taxRate = 0.0875;
let tax = price * taxRate;
console.log(tax);
```

### Issue 6: Empty string check
**Description:** Should check if string has content after trimming
```javascript
let str = "   ";
if (str) {
  console.log("has content");
}
```

### Issue 7: String with comma as number
**Description:** Should parse "1,234" as number 1234
```javascript
let str = "1,234";
console.log(parseInt(str));
```

### Issue 8: Currency formatting with toFixed
**Description:** Should format 1234.5 as "$1,234.50"
```javascript
let num = 1234.5;
console.log(`$${num.toFixed(2)}`);
```

### Issue 9: String padding with spaces
**Description:** Should right-align text in 10-character field
```javascript
let text = "hello";
console.log(text.padStart(text.length + 10));
```

### Issue 10: Template literal newlines
**Description:** Should create string with actual newlines
```javascript
let str = `line1\nline2`;
console.log(str);
```

### Issue 11: URL building with strings
**Description:** Should build URL from base and path
```javascript
let base = "https://example.com";
let path = "/api/users";
console.log(base + path);
```

### Issue 12: String validation length
**Description:** Should check if string length is between 3 and 10
```javascript
let str = "hello";
if (str.length >= 3 || str.length <= 10) {
  console.log("valid");
}
```

### Issue 13: Capitalizing each word
**Description:** Should capitalize first letter of each word
```javascript
let str = "hello world";
let words = str.split(" ");
for (let w of words) {
  w[0] = w[0].toUpperCase();
}
console.log(words.join(" "));
```

### Issue 14: Word count
**Description:** Should count words in sentence
```javascript
let sentence = "hello world test";
console.log(sentence.split(" ").length);
```

### Issue 15: Truncating long text
**Description:** Should truncate to 10 chars with ...
```javascript
let str = "hello world this is long";
console.log(str.slice(0, 10) + "...");
```

### Issue 16: Reversing a string
**Description:** Should reverse the string "hello"
```javascript
let str = "hello";
console.log(str.reverse());
```

### Issue 17: Extracting file extension
**Description:** Should get "jpg" from "photo.jpg"
```javascript
let file = "photo.jpg";
console.log(file.split(".")[0]);
```

### Issue 18: Removing duplicates
**Description:** Should remove duplicate characters from string
```javascript
let str = "aabbcc";
console.log([...new Set(str)].join(""));
```

### Issue 19: Counting character frequency
**Description:** Should count how many times "a" appears
```javascript
let str = "banana";
let count = 0;
for (let c of str) {
  if (c === "a") count++;
}
console.log(count);
```

### Issue 20: CamelCase conversion
**Description:** Should convert "hello-world" to "helloWorld"
```javascript
let str = "hello-world";
let parts = str.split("-");
let result = parts[0] + parts[1][0].toUpperCase() + parts[1].slice(1);
console.log(result);
```

### Issue 21: String to title case
**Description:** Should convert "hello world" to "Hello World"
```javascript
let str = "hello world";
console.log(str.replace(/\b\w/g, c => c.toUpperCase()));
```

### Issue 22: Masking credit card
**Description:** Should show "****-****-****-1234"
```javascript
let card = "1234567812345678";
let masked = card.slice(-4).padStart(12, "*");
console.log(masked);
```

### Issue 23: Extract domain from email
**Description:** Should get "example.com" from "user@example.com"
```javascript
let email = "user@example.com";
console.log(email.split("@")[0]);
```

### Issue 24: Remove HTML tags
**Description:** Should strip HTML tags from string
```javascript
let html = "<p>Hello</p>";
console.log(html.replace(/<[^>]+>/g, ""));
```

### Issue 25: Escape HTML entities
**Description:** Should convert <>& to HTML entities
```javascript
let str = "<hello>&";
console.log(str.replace(/[<>&]/g, ""));
```

### Issue 26: CSV parsing
**Description:** Should parse "a,b,c" into array
```javascript
let csv = "a,b,c";
let arr = csv.split(",");
console.log(arr);
```

### Issue 27: Number formatting with comma
**Description:** Should format 1234.56 as "1,234.56"
```javascript
let num = 1234.56;
console.log(num.toLocaleString());
```

### Issue 28: Slug generation
**Description:** Should convert "Hello World!" to "hello-world"
```javascript
let str = "Hello World!";
console.log(str.toLowerCase().replace(/[^a-z0-9]/g, "-"));
```

### Issue 29: Acronym generator
**Description:** Should get "NASA" from "National Aeronautics Space Administration"
```javascript
let str = "National Aeronautics Space Administration";
let words = str.split(" ");
let acronym = words.map(w => w[0]).join("");
console.log(acronym);
```

### Issue 30: Palindrome check
**Description:** Should check if "racecar" reads same backwards
```javascript
let str = "racecar";
let reversed = str.split("").reverse().join("");
console.log(str === reversed);
```

---

### Modify 1: Add character count
**Description:** Display character count of user input
```javascript
let input = "hello world";
console.log(input);
```

### Modify 2: Add word count feature
**Description:** Count the number of words in input
```javascript
let input = "hello world test";
console.log(input);
```

### Modify 3: Add uppercase conversion
**Description:** Convert input to uppercase
```javascript
let input = "hello";
console.log(input);
```

### Modify 4: Add lowercase conversion
**Description:** Convert input to lowercase
```javascript
let input = "HELLO";
console.log(input);
```

### Modify 5: Add title case option
**Description:** Convert each word's first letter to uppercase
```javascript
let input = "hello world";
console.log(input);
```

### Modify 6: Add reverse string function
**Description:** Reverse the entire input string
```javascript
function process(str) {
  return str;
}
console.log(process("hello"));
```

### Modify 7: Add character frequency analysis
**Description:** Count how many times each character appears
```javascript
let input = "banana";
```

### Modify 8: Add vowel count
**Description:** Count vowels (a, e, i, o, u) in input
```javascript
let input = "hello world";
console.log(input);
```

### Modify 9: Add consonant count
**Description:** Count consonants in input string
```javascript
let input = "hello world";
console.log(input);
```

### Modify 10: Add word reversal
**Description:** Reverse each word individually, not the whole string
```javascript
let input = "hello world";
```

### Modify 11: Add padding with custom character
**Description:** Pad string with * to make it length 20
```javascript
let input = "hello";
console.log(input);
```

### Modify 12: Add substring extraction
**Description:** Extract characters from index 2 to 7
```javascript
let input = "hello world";
console.log(input);
```

### Modify 13: Add string repetition
**Description:** Repeat the input string 5 times
```javascript
let input = "ab";
console.log(input);
```

### Modify 14: Add string truncation
**Description:** Truncate to 10 characters and add ...
```javascript
let input = "hello world this is long";
console.log(input);
```

### Modify 15: Add whitespace normalization
**Description:** Replace multiple spaces with single space
```javascript
let input = "hello   world  test";
console.log(input);
```

### Modify 16: Add line count
**Description:** Count number of lines in multiline string
```javascript
let input = "line1\nline2\nline3";
```

### Modify 17: Add tab-to-space conversion
**Description:** Replace tabs with 4 spaces
```javascript
let input = "hello\tworld";
console.log(input);
```

### Modify 18: Add CSV formatting
**Description:** Convert array to CSV string
```javascript
let data = ["John", "Doe", 30];
```

### Modify 19: Add JSON stringify
**Description:** Convert object to JSON string with formatting
```javascript
let obj = {name: "John", age: 30};
```

### Modify 20: Add base64 encoding
**Description:** Encode string to base64
```javascript
let str = "hello world";
console.log(str);
```

### Modify 21: Add URL encoding
**Description:** Encode string for use in URL
```javascript
let str = "hello world & more";
console.log(str);
```

### Modify 22: Add string comparison
**Description:** Compare two strings ignoring case
```javascript
let a = "Hello", b = "hello";
console.log(a === b);
```

### Modify 23: Add longest word finder
**Description:** Find the longest word in a sentence
```javascript
let sentence = "The quick brown fox";
```

### Modify 24: Add shortest word finder
**Description:** Find the shortest word in a sentence
```javascript
let sentence = "The quick brown fox";
```

### Modify 25: Add alphabetical sorting of letters
**Description:** Sort the characters in a string alphabetically
```javascript
let str = "dcba";
console.log(str);
```

### Modify 26: Add anagram checker
**Description:** Check if two strings are anagrams
```javascript
let a = "listen", b = "silent";
console.log(a === b);
```

### Modify 27: Add string rotation check
**Description:** Check if one string is rotation of another
```javascript
let a = "abcde", b = "cdeab";
console.log(a === b);
```

### Modify 28: Add indent level counter
**Description:** Count leading spaces to determine indent level
```javascript
let line = "    hello";
```

### Modify 29: Add bracket matcher
**Description:** Check if brackets ()[]{} are balanced
```javascript
let str = "({[]})";
console.log("balanced");
```

### Modify 30: Add substring count
**Description:** Count occurrences of substring in string
```javascript
let str = "banana", sub = "ana";
console.log(str);
```

### Modify 31: Add string to number conversion
**Description:** Extract all digits from string and form number
```javascript
let str = "abc123def456";
```

### Modify 32: Add phone number formatting
**Description:** Format "1234567890" as "(123) 456-7890"
```javascript
let phone = "1234567890";
console.log(phone);
```

### Modify 33: Add SSN formatting
**Description:** Format "123456789" as "123-45-6789"
```javascript
let ssn = "123456789";
console.log(ssn);
```

### Modify 34: Add zip code formatting
**Description:** Format "123456789" as "12345-6789"
```javascript
let zip = "123456789";
console.log(zip);
```

### Modify 35: Add initials extraction
**Description:** Extract initials from full name
```javascript
let name = "John Michael Doe";
console.log(name);
```

### Modify 36: Add hashtag extraction
**Description:** Extract all hashtags from tweet
```javascript
let tweet = "Hello #world #javascript";
```

### Modify 37: Add mention extraction
**Description:** Extract all @mentions from text
```javascript
let text = "Hello @user1 and @user2";
```

### Modify 38: Add URL extraction
**Description:** Extract all URLs from text
```javascript
let text = "Visit https://example.com and http://test.com";
```

### Modify 39: Add email extraction
**Description:** Extract email addresses from text
```javascript
let text = "Contact john@test.com or jane@test.com";
```

### Modify 40: Add string interpolation
**Description:** Replace {{name}} with actual value
```javascript
let template = "Hello {{name}}, you are {{age}}";
let name = "John", age = 30;
```

### Modify 41: Add date formatting
**Description:** Format date object as "MM/DD/YYYY"
```javascript
let date = new Date();
```

### Modify 42: Add time formatting
**Description:** Format date as "HH:MM:SS"
```javascript
let date = new Date();
```

### Modify 43: Add relative time
**Description:** Show "2 hours ago" style formatting
```javascript
let past = new Date(Date.now() - 7200000);
```

### Modify 44: Add pluralization
**Description:** Return "1 item" or "2 items" based on count
```javascript
function pluralize(count, word) {
  return word;
}
console.log(pluralize(1, "item"));
console.log(pluralize(3, "item"));
```

### Modify 45: Add ordinal suffix
**Description:** Add st, nd, rd, th to numbers (1st, 2nd, 3rd)
```javascript
function ordinal(num) {
  return num;
}
console.log(ordinal(1));
console.log(ordinal(22));
```

### Modify 46: Add string hashing
**Description:** Simple string hash function
```javascript
function hash(str) {
  return str;
}
console.log(hash("hello"));
```

### Modify 47: Add Levenshtein distance
**Description:** Calculate edit distance between two strings
```javascript
function distance(a, b) {
  return 0;
}
console.log(distance("kitten", "sitting"));
```

### Modify 48: Add camelCase to snake_case
**Description:** Convert "helloWorld" to "hello_world"
```javascript
let str = "helloWorld";
console.log(str);
```

### Modify 49: Add snake_case to camelCase
**Description:** Convert "hello_world" to "helloWorld"
```javascript
let str = "hello_world";
console.log(str);
```

### Modify 50: Add kebab-case to camelCase
**Description:** Convert "hello-world" to "helloWorld"
```javascript
let str = "hello-world";
console.log(str);
```
