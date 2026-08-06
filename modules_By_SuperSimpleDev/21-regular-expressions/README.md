# Module 21: Regular Expressions (Regex)

**Duration:** ~60 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand what Regular Expressions are
- Create regex patterns using literal and constructor syntax
- Use quantifiers, anchors, and character classes
- Master common regex methods (test, match, replace, split)
- Build practical validation patterns
- Understand regex flags

## What is a Regular Expression?

A Regular Expression (regex) is a pattern used to match character combinations in strings. It's like a search tool with superpowers.

```javascript
// Two ways to create regex
const regex1 = /pattern/;           // Literal syntax (preferred)
const regex2 = new RegExp('pattern'); // Constructor syntax
```

## Basic Patterns

### Literal Characters

```javascript
const regex = /hello/;

console.log(regex.test('hello world'));  // true
console.log(regex.test('Hello World'));  // false (case-sensitive)
console.log(regex.test('say hello'));    // true
```

### Special Characters (Metacharacters)

| Character | Description |
|-----------|-------------|
| `.` | Any character except newline |
| `\d` | Digit (0-9) |
| `\D` | Not a digit |
| `\w` | Word character (a-z, A-Z, 0-9, _) |
| `\W` | Not a word character |
| `\s` | Whitespace (space, tab, newline) |
| `\S` | Not whitespace |
| `\b` | Word boundary |
| `\B` | Not a word boundary |

```javascript
// . matches any character
/hello/.test('hxllo');  // true
/hello/.test('hello');  // true

// \d matches digits
/\d/.test('123');      // true
/\d/.test('abc');      // false

// \w matches word characters
/\w+/.test('hello');   // true
/\w+/.test('123');     // true
```

## Quantifiers

Quantifiers specify how many times a character or group can appear.

| Quantifier | Description |
|------------|-------------|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 (optional) |
| `{n}` | Exactly n times |
| `{n,}` | n or more times |
| `{n,m}` | Between n and m times |

```javascript
// * means 0 or more
/ab*c/.test('ac');     // true (b appears 0 times)
/ab*c/.test('abc');    // true (b appears 1 time)
/ab*c/.test('abbbbc'); // true (b appears 4 times)

// + means 1 or more
/ab+c/.test('ac');     // false (b must appear at least once)
/ab+c/.test('abc');    // true

// ? means 0 or 1 (optional)
/colou?r/.test('color');   // true
/colou?r/.test('colour');  // true
/colou?r/.test('colouur'); // false

// {n} means exactly n times
/\d{3}/.test('123');      // true
/\d{3}/.test('12');       // false
/\d{3}/.test('1234');     // true (first 3 match)

// {n,m} means between n and m times
/\d{2,4}/.test('1');       // false
/\d{2,4}/.test('12');      // true
/\d{2,4}/.test('12345');   // true (matches 1234)
```

## Character Classes

Character classes match a set of characters.

```javascript
// [] defines a character set
/[aeiou]/.test('hello');    // true (matches 'e')
/[aeiou]/.test('rhythm');   // false

// - defines a range
/[a-z]/.test('hello');      // true
/[A-Z]/.test('Hello');      // true
/[0-9]/.test('123');        // true

// ^ inside [] means negation
/[^aeiou]/.test('hello');   // true (matches 'h')

// Combining ranges
/[a-zA-Z0-9]/.test('H3llo');  // true
```

## Anchors

Anchors match positions, not characters.

| Anchor | Description |
|--------|-------------|
| `^` | Start of string |
| `$` | End of string |
| `\b` | Word boundary |
| `\B` | Not a word boundary |

```javascript
// ^ matches start of string
/^hello/.test('hello world');  // true
/^hello/.test('say hello');    // false

// $ matches end of string
/world$/.test('hello world');  // true
/world$/.test('world hello');  // false

// ^ and $ together - exact match
/^hello$/.test('hello');       // true
/^hello$/.test('hello world'); // false

// \b word boundary
/\bcat\b/.test('cat');         // true
/\bcat\b/.test('concatenate'); // false
/\bcat/.test('catnip');        // true (boundary at start)
```

## Groups and Alternation

### Parentheses (Groups)

```javascript
// Capturing groups
/(hello)/.exec('hello world');  // ['hello']

// Multiple groups
/(hello) (world)/.exec('hello world');  // ['hello world', 'hello', 'world']

// Reference captured groups
'hello world'.replace(/(hello) (world)/, '$2 $1');  // 'world hello'
```

### Alternation (|)

```javascript
// | means OR
/cat|dog/.test('I have a cat');  // true
/cat|dog/.test('I have a dog');  // true
/cat|dog/.test('I have a bird'); // false

// With groups
/(cat|dog)s/.test('cats');  // true
/(cat|dog)s/.test('dogs');  // true
```

## Regex Methods

### test()

Returns true/false if pattern matches:

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailRegex.test('user@example.com'));  // true
console.log(emailRegex.test('invalid-email'));     // false
```

### match()

Returns match information:

```javascript
const str = 'Hello World 123';

// Simple match
console.log(str.match(/\d+/));  // ['123']

// With groups
const result = str.match(/(\w+) (\w+)/);
console.log(result);  // ['Hello World', 'Hello', 'World']

// Global match (all matches)
console.log(str.match(/\w+/g));  // ['Hello', 'World', '123']
```

### matchAll()

Returns iterator of all matches with details:

```javascript
const str = 'test1 test2 test3';
const matches = str.matchAll(/test(\d+)/g);

for (const match of matches) {
  console.log(match[0]);  // 'test1', 'test2', 'test3'
  console.log(match[1]);  // '1', '2', '3'
  console.log(match.index); // 0, 6, 12
}
```

### replace()

Replace matches:

```javascript
const str = 'Hello World';

// Replace first match
console.log(str.replace(/hello/i, 'Hi'));  // 'Hi World'

// Replace all matches
console.log(str.replace(/l/g, 'L'));  // 'HeLLo WorLd'

// With callback function
const result = str.replace(/(\w+)/g, (match) => {
  return match.toUpperCase();
});
console.log(result);  // 'HELLO WORLD'
```

### split()

Split string by pattern:

```javascript
const str = 'apple, banana, orange';

console.log(str.split(/,\s*/));  // ['apple', 'banana', 'orange']

const html = '<div>Hello</div><p>World</p>';
console.log(html.split(/<\/?[^>]+>/));  // ['', 'Hello', '', 'World', '']
```

## Regex Flags

Flags modify how the pattern is applied.

| Flag | Description |
|------|-------------|
| `g` | Global (all matches) |
| `i` | Case-insensitive |
| `m` | Multiline (^ and $ match line boundaries) |
| `s` | Dotall (. matches newlines) |
| `u` | Unicode support |

```javascript
// g flag - global match
'hello hello'.match(/hello/);   // ['hello'] (first only)
'hello hello'.match(/hello/g);  // ['hello', 'hello']

// i flag - case insensitive
/hello/i.test('Hello');  // true
/hello/i.test('HELLO');  // true

// m flag - multiline
/^hello/m.test('world\nhello');  // true

// Combining flags
/hello/gi.test('Hello HELLO');  // true
```

## Common Validation Patterns

### Email Validation

```javascript
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

console.log(isValidEmail('user@example.com'));  // true
console.log(isValidEmail('invalid'));           // false
```

### Phone Number

```javascript
function isValidPhone(phone) {
  const regex = /^\+?[\d\s-]{10,}$/;
  return regex.test(phone);
}

console.log(isValidPhone('+1 234 567 8901'));  // true
console.log(isValidPhone('123-456-7890'));      // true
console.log(isValidPhone('123'));               // false
```

### Password Strength

```javascript
function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

console.log(isStrongPassword('Pass123!'));  // true
console.log(isStrongPassword('pass123'));   // false (no uppercase, no special)
```

### URL Validation

```javascript
function isValidURL(url) {
  const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return regex.test(url);
}

console.log(isValidURL('https://example.com'));     // true
console.log(isValidURL('http://sub.domain.org'));   // true
console.log(isValidURL('not a url'));               // false
```

### Date Format (MM/DD/YYYY)

```javascript
function isValidDate(date) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  return regex.test(date);
}

console.log(isValidDate('12/25/2024'));  // true
console.log(isValidDate('13/01/2024'));  // false (month 13)
console.log(isValidDate('12/32/2024'));  // false (day 32)
```

## Practical Examples

### Extract Numbers from String

```javascript
function extractNumbers(str) {
  return str.match(/\d+/g)?.map(Number) || [];
}

console.log(extractNumbers('I have 3 cats and 5 dogs'));  // [3, 5]
console.log(extractNumbers('No numbers here'));            // []
```

### Validate Credit Card Number

```javascript
function isValidCreditCard(number) {
  const regex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/;
  return regex.test(number);
}

console.log(isValidCreditCard('1234 5678 9012 3456'));  // true
console.log(isValidCreditCard('1234-5678-9012-3456'));  // true
console.log(isValidCreditCard('1234567890123456'));     // true
```

### Clean and Format Phone Number

```javascript
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

console.log(formatPhone('1234567890'));     // (123) 456-7890
console.log(formatPhone('123-456-7890'));   // (123) 456-7890
```

### Slug Generator

```javascript
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

console.log(createSlug('Hello World!'));           // 'hello-world'
console.log(createSlug('JavaScript is AWESOME'));  // 'javascript-is-awesome'
```

### Highlight Search Terms

```javascript
function highlightSearch(text, term) {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

console.log(highlightSearch('Hello World, hello JS', 'hello'));
// '<mark>Hello</mark> World, <mark>hello</mark> JS'
```

## Practice Exercises

### Exercise 21.1: Username Validator
Create a regex that validates usernames:
- 3-16 characters
- Only letters, numbers, and underscores
- Must start with a letter

### Exercise 21.2: Extract Hashtags
Write a function that extracts all hashtags from a text:
```javascript
extractHashtags('Love #JavaScript and #coding!');  // ['#JavaScript', '#coding']
```

### Exercise 21.3: Simple Calculator with Regex
Parse mathematical expressions like "2 + 3" or "10 * 5" and calculate the result.

### Exercise 21.4: Password Generator
Create a function that generates random passwords matching a regex pattern.

## Summary

- Regex patterns match character combinations in strings
- Use `/pattern/` literal syntax or `new RegExp('pattern')` constructor
- Quantifiers control repetition: `*`, `+`, `?`, `{n}`
- Character classes match sets: `\d`, `\w`, `\s`, `[abc]`
- Anchors match positions: `^`, `$`, `\b`
- Methods: `test()`, `match()`, `replace()`, `split()`
- Flags modify behavior: `g` (global), `i` (case-insensitive)
- Practice with real validation scenarios

## Previous

[Proceed to Module 20](../20-backend-async/README.md)

## Next Steps

[Proceed to Module 22](../22-date-time/README.md): Date and Time to learn about JavaScript's native Date API.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
