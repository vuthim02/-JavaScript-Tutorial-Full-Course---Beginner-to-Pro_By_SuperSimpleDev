# JavaScript Strings, Arrays, TypedArrays, Maps, Sets & Collections — Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

---

# PART 1 — STRINGS (Complete)

---

## 1. String Creation

### 1.1 String Literal (Most Common)
```js
let s1 = "double quotes";
let s2 = 'single quotes';
let s3 = `backticks`; // template literal
```

### 1.2 String Constructor
```js
let s4 = new String("hello");   // String object — avoids this
let s5 = String("hello");       // primitive string — preferred
typeof s1; // "string"
typeof s4; // "object" (wrapper)
```

### 1.3 String.raw (Tagged Template)
```js
String.raw`Hi\nWorld!`;          // "Hi\\nWorld!" — backslash preserved
String.raw`C:\Users\Name`;       // "C:\\Users\\Name"
// Escape sequences are NOT processed
```

### 1.4 String.fromCodePoint / String.fromCharCode
```js
String.fromCharCode(65, 66, 67);    // "ABC"
String.fromCodePoint(0x1F600);       // "😀" (emoji, code point > 0xFFFF)
```

---

## 2. String Properties

### 2.1 length
```js
"hello".length;  // 5
"".length;       // 0
```
- Returns number of **UTF-16 code units**, NOT the number of Unicode code points.
- Emoji like `"😀"` has `.length === 2` (surrogate pair).
- `length` is a property, not a method — no parentheses.

---

## 3. String Methods — Complete Reference

### 3.1 Character Access

#### charAt(index)
```js
"hello".charAt(1);  // "e"
"hello".charAt(99); // "" (empty string, no error)
```

#### charCodeAt(index)
```js
"A".charCodeAt(0);   // 65 (UTF-16 code unit)
"😀".charCodeAt(0);  // 55357 (high surrogate)
// Returns integer 0–65535
```

#### codePointAt(index)
```js
"😀".codePointAt(0); // 128512 (0x1F600) — full Unicode code point
"A".codePointAt(0);  // 65
// If index points to high surrogate, returns full surrogate pair code point
```

#### at(index) — ES2022
```js
"hello".at(0);    // "h"
"hello".at(-1);   // "o" — supports negative indexing!
"hello".at(99);   // undefined
```

#### Bracket notation
```js
"hello"[1];   // "e"
"hello"[-1];  // undefined (unlike .at())
```

### 3.2 Searching

#### indexOf(searchStr, fromIndex)
```js
"hello world".indexOf("world");     // 6
"hello world".indexOf("o");        // 4
"hello world".indexOf("o", 5);     // 7 (starts search from index 5)
"hello world".indexOf("xyz");      // -1
```

#### lastIndexOf(searchStr, fromIndex)
```js
"hello world".lastIndexOf("o");    // 7
"hello world".lastIndexOf("o", 6); // 4 (searches backward from index 6)
```

#### includes(searchStr, position) — ES6
```js
"hello world".includes("world");     // true
"hello world".includes("World");     // false (case-sensitive!)
"hello world".includes("o", 5);     // true (search from index 5)
```

#### startsWith(searchStr, position)
```js
"hello".startsWith("he");        // true
"hello".startsWith("he", 1);     // false (starts checking at index 1)
```

#### endsWith(searchStr, length)
```js
"hello".endsWith("lo");          // true
"hello".endsWith("lo", 4);       // false (treats string as length 4: "hell")
```

#### search(regexp)
```js
"hello world".search(/world/);    // 6
"hello world".search(/xyz/);      // -1
// Unlike indexOf, supports regex
// No fromIndex parameter
```

### 3.3 Extracting Substrings

#### slice(start, end)
```js
"hello".slice(1, 3);     // "el"
"hello".slice(1);        // "ello"
"hello".slice(-3);       // "llo" (from 3rd-to-last)
"hello".slice(-3, -1);   // "ll"
"hello".slice(3, 1);     // "" (empty, does NOT swap — unlike substring)
```

#### substring(start, end)
```js
"hello".substring(1, 3);   // "el"
"hello".substring(3, 1);   // "el" (SWAPS if start > end)
"hello".substring(-1);     // "hello" (negative → treated as 0)
"hello".substring(1, 99);  // "ello" (clamps to string length)
```

#### substr(start, length) — DEPRECATED
```js
"hello".substr(1, 3);   // "ell" — start at 1, take 3 characters
// Deprecated in ES6, NOT part of latest spec
// Use slice() or substring() instead
```

**Key differences: slice vs substring:**
| Feature | `slice` | `substring` |
|---------|---------|-------------|
| Negative indices | Works from end | Treated as 0 |
| start > end | Returns `""` | Swaps arguments |
| Recommended | Yes | Yes |

### 3.4 Padding

#### padStart(targetLength, padString)
```js
"5".padStart(3, "0");      // "005"
"hello".padStart(10, ".");  // ".....hello"
"hello".padStart(3, "0");   // "hello" (no padding if already >= target)
```

#### padEnd(targetLength, padString)
```js
"5".padEnd(3, "0");        // "500"
"hello".padEnd(10, ".");   // "hello....."
```

### 3.5 Repeat

#### repeat(count)
```js
"ha".repeat(3);     // "hahaha"
"ha".repeat(0);     // ""
"ha".repeat(-1);    // RangeError
"ha".repeat(2.9);   // "haha" (floors to 2)
```

### 3.6 Trimming

#### trim()
```js
"  hello  ".trim();      // "hello"
"\t\nhello\t\n".trim();  // "hello"
```

#### trimStart() / trimEnd()
```js
"  hello  ".trimStart();  // "hello  "
"  hello  ".trimEnd();    // "  hello"
```

### 3.7 Splitting

#### split(separator, limit)
```js
"a,b,c".split(",");          // ["a", "b", "c"]
"a,b,c".split(",", 2);       // ["a", "b"]
"hello".split("");           // ["h", "e", "l", "l", "o"]
"hello".split(/o/);          // ["hell", ""]
"a".split();                 // ["a"] — no separator returns entire string
```

### 3.8 Replacing

#### replace(searchValue, replacer)
```js
"hello world".replace("world", "JS");      // "hello JS"
"hello world".replace(/o/g, "O");          // "hellO wOrld"
"hello".replace("l", "L");                 // "heLlo" (first match only!)
```

#### replaceAll(searchValue, replacer) — ES2021
```js
"hello".replaceAll("l", "L");              // "heLLo"
"hello".replaceAll(/l/g, "L");             // "heLLo"
// replaceAll requires global flag for regex (throws otherwise)
```

### 3.9 Matching

#### match(regexp)
```js
"hello".match(/l/);          // ["l", index: 2, groups: undefined, ...]
"hello".match(/l/g);         // ["l", "l"]
"hello".match(/xyz/);        // null
```

#### matchAll(regexp) — ES2020
```js
[..."hello".matchAll(/l/g)];
// [
//   ["l", index: 2, input: "hello", groups: undefined],
//   ["l", index: 3, input: "hello", groups: undefined]
// ]
// Returns iterator — regex MUST have global flag
```

### 3.10 Case Conversion

```js
"hello".toUpperCase();     // "HELLO"
"HELLO".toLowerCase();     // "hello"
```

### 3.11 Normalization

#### normalize(form)
```js
// Unicode normalization forms
"café".normalize();             // "café" (NFC, default)
"café".normalize("NFC");        // "café"
"café".normalize("NFD");        // "cafe\u0301" (decomposed)
"café".normalize("NFKC");       // "café" (compatibility)
"café".normalize("NFKD");       // "cafe\u0301" (compatibility decomposed)
// Used for proper Unicode string comparison
```

### 3.12 Locale Comparison

#### localeCompare(compareString, locales, options)
```js
"a".localeCompare("z");              // -26 (negative: a < z)
"z".localeCompare("a");              // 26  (positive: z > a)
"a".localeCompare("a");              // 0   (equal)

// Case-insensitive
"ä".localeCompare("z", undefined, { sensitivity: "base" }); // -1

// With locale
"ä".localeCompare("z", "de");        // -1 (German sorting)
```

### 3.13 Concatenation

#### concat(str2, str3, ...)
```js
"hello".concat(" ", "world");  // "hello world"
// Prefer: `hello ${world}` or + operator
```

### 3.14 Value Retrieval

#### valueOf()
```js
"hello".valueOf();  // "hello" (same as the primitive)
// Rarely needed — primitives auto-box when methods are called
```

---

## 4. Template Literals

### 4.1 Expressions
```js
const name = "Alice";
const age = 30;
const msg = `Hello, ${name}! You are ${age * 2} months old.`;
// Any valid JS expression inside ${}
```

### 4.2 Multi-line
```js
const html = `
<div>
  <p>Hello</p>
</div>
`;
// No need for \n — newlines are literal
```

### 4.3 Tagged Templates
```js
function highlight(strings, ...values) {
  let result = "";
  strings.forEach((str, i) => {
    result += str;
    if (i < values.length) {
      result += `<strong>${values[i]}</strong>`;
    }
  });
  return result;
}
const tagged = highlight`My name is ${name} and I am ${age} years old.`;
// "My name is <strong>Alice</strong> and I am <strong>30</strong> years old."
```
- First argument: array of string literals
- Rest arguments: interpolated values
- Used by libraries like `styled-components`, `graphql-tag`

---

## 5. String Iteration

### 5.1 for...of
```js
for (const char of "hello") {
  console.log(char); // h, e, l, l, o
}
// Iterates by Unicode code points (handles surrogate pairs correctly)
```

### 5.2 Spread Operator
```js
const chars = [..."hello"];  // ["h", "e", "l", "l", "o"]
const emoji = [..."😀😀"];   // ["😀", "😀"] — length 2, not 4
```

### 5.3 Array.from()
```js
Array.from("hello");  // ["h", "e", "l", "l", "o"]
```

---

## 6. String Comparison

```js
"apple" < "banana";   // true (lexicographic by UTF-16 code unit values)
"abc" === "abc";      // true
"abc" == "abc";       // true
```
- Comparison is by **UTF-16 code unit values**, not locale-aware.
- For locale-aware: use `localeCompare()`.
- Case-sensitive: `"A" < "a"` is true (65 < 97).

---

## 7. Unicode and Strings — Surrogate Pairs & Code Points

### UTF-16 Representation
```js
// BMP characters (U+0000 to U+FFFF): 1 code unit
"A".length;           // 1
"A".codePointAt(0);   // 65

// Supplementary characters (U+10000 to U+10FFFF): 2 code units (surrogate pair)
"😀".length;           // 2 (surrogate pair!)
"😀".codePointAt(0);  // 128512 (full code point)
```

### Surrogate Pairs
- High surrogate: U+D800–U+DBFF (first 16-bit unit)
- Low surrogate: U+DC00–U+DFFF (second 16-bit unit)
```js
"😀".charCodeAt(0);  // 55357 (0xD83D) — high surrogate
"😀".charCodeAt(1);  // 56832 (0xDE00) — low surrogate
// Together they represent code point U+1F600 (128512)
```

### Code Points vs Code Units
```js
// Use for...of or spread to iterate by code points:
[..."😀👨‍👩‍👧‍👦"];
// Emoji with ZWJ: length may vary based on segmentation

// Use codePointAt for proper code point retrieval:
"😀".codePointAt(0); // 128512 — correct!
```

---

## 8. String Encoding

### UTF-16 (JavaScript's Internal Encoding)
- All JS strings are encoded as UTF-16 internally
- Each "character" occupies 2 bytes (16 bits) in memory
- Supplementary characters (emoji, CJK Extension B, etc.) use 4 bytes (2 surrogate code units)

### UTF-8
- Variable-length encoding: 1–4 bytes per character
- Used for HTML, JSON, file I/O, network transmission
- JavaScript does NOT use UTF-8 internally but can convert via `TextEncoder`/`TextDecoder`:
```js
const encoder = new TextEncoder();
const utf8Bytes = encoder.encode("hello"); // Uint8Array [104, 101, 108, 108, 111]

const decoder = new TextDecoder("utf-8");
const str = decoder.decode(utf8Bytes);     // "hello"
```

---

## 9. String Immutability

```js
let s = "hello";
s[0] = "H";
console.log(s);  // "hello" — NOT changed!
// Strings are immutable — you cannot modify them in place

// Workaround: create a new string
let s2 = "H" + s.slice(1);  // "Hello"
```
- Every string method returns a **new string** — the original is never modified.
- This is why string concatenation in loops is expensive (creates many intermediate strings).

---

## 10. String Interning

- JavaScript engines automatically **intern** (deduplicate) string values.
- Two identical string literals share the same memory:
```js
const a = "hello";
const b = "hello";
// a === b — true, and they may reference the same memory
```
- String objects are NOT interned:
```js
new String("hello") !== new String("hello");  // true (different objects)
```
- The `String()` function returns a primitive, which IS interned.
- Interning is an engine optimization — not controllable from JS code.

---

## 11. Intl.StringFormat / Intl.Collator

JavaScript has no `Intl.StringFormat` directly, but the `Intl` module provides locale-aware string handling:

```js
// Intl.Collator for locale-aware string comparison
const collator = new Intl.Collator("de-DE");
collator.compare("ä", "z"); // -1 (ä comes before z in German)

// Intl.NumberFormat for formatting numbers as strings
new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(1234.56);
// "$1,234.56"

// Intl.DateTimeFormat
new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(new Date());
// "Saturday, 12 July 2026"

// toLocaleString methods on strings (for lowercasing/uppercasing)
"hello".toLocaleUpperCase("tr"); // "HELLO" (Turkish-aware)
```

---

# PART 2 — ARRAYS (Complete)

---

## 1. Array Creation

### 1.1 Array Literal (Most Common)
```js
const arr = [1, 2, 3];
const empty = [];
const mixed = [1, "two", true, null, { key: "value" }];
```

### 1.2 Array Constructor
```js
new Array();        // []
new Array(3);       // [,,] — sparse array of length 3!
new Array(1, 2, 3); // [1, 2, 3] — DO NOT use new Array with multiple args
```

### 1.3 Array.from() — ES6
```js
Array.from("hello");        // ["h", "e", "l", "l", "o"]
Array.from([1, 2, 3], x => x * 2);  // [2, 4, 6]
Array.from({ length: 5 }, (_, i) => i);  // [0, 1, 2, 3, 4]
```

### 1.4 Array.of() — ES6
```js
Array.of(1);       // [1] — unlike new Array(1) which creates [,]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(3);       // [3]
```

### 1.5 Array.fromAsync() — ES2024
```js
async function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
const arr = await Array.fromAsync(gen()); // [1, 2, 3]
const arr2 = await Array.fromAsync([Promise.resolve(1), Promise.resolve(2)]);
// [1, 2]
```

---

## 2. Array Methods — Complete Reference

### 2.1 Access & Conversion

#### at(index) — ES2022
```js
[1, 2, 3].at(0);    // 1
[1, 2, 3].at(-1);   // 3 — supports negative indexing!
```

#### toString()
```js
[1, 2, 3].toString();           // "1,2,3"
["a", "b"].toString();          // "a,b"
```

#### toLocaleString()
```js
[1234.56].toLocaleString("en-US"); // "1,234.56"
```

#### valueOf()
```js
[1, 2, 3].valueOf(); // [1, 2, 3] — returns the array itself
```

#### join(separator)
```js
["a", "b", "c"].join("-");  // "a-b-c"
[1, 2, 3].join("");         // "123"
[1, 2, 3].join();           // "1,2,3" (default: comma)
```

### 2.2 Adding & Removing Elements

#### push(...items) — MUTATING
```js
const arr = [1, 2, 3];
arr.push(4, 5);  // arr is now [1, 2, 3, 4, 5]
arr.push([6, 7]); // arr is now [1, 2, 3, 4, 5, [6, 7]] (not flattened)
```

#### pop() — MUTATING
```js
const arr = [1, 2, 3];
arr.pop();  // returns 3, arr is now [1, 2]
```

#### unshift(...items) — MUTATING
```js
const arr = [1, 2, 3];
arr.unshift(0, -1);  // arr is now [-1, 0, 1, 2, 3]
```

#### shift() — MUTATING
```js
const arr = [1, 2, 3];
arr.shift();  // returns 1, arr is now [2, 3]
```

#### splice(start, deleteCount, ...items) — MUTATING
```js
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);       // removes index 2 → returns [3], arr is [1, 2, 4, 5]
arr.splice(1, 0, 10);   // inserts 10 at index 1 → arr is [1, 10, 2, 4, 5]
arr.splice(1, 2, "a", "b"); // replaces 2 items → arr is [1, "a", "b", 4, 5]
```

### 2.3 Search & Find

#### indexOf(searchElement, fromIndex)
```js
[1, 2, 3, 2].indexOf(2);     // 1 (first occurrence)
[1, 2, 3, 2].indexOf(2, 2);  // 3 (search from index 2)
[1, 2, 3].indexOf(99);       // -1
```

#### lastIndexOf(searchElement, fromIndex)
```js
[1, 2, 3, 2].lastIndexOf(2);      // 3
[1, 2, 3, 2].lastIndexOf(2, 2);   // 1 (search backward from index 2)
```

#### includes(searchElement, fromIndex) — ES7
```js
[1, 2, 3].includes(2);       // true
[1, 2, 3].includes(2, 2);    // false
[NaN, 1, 2].includes(NaN);   // true (unlike indexOf which can't find NaN)
```

#### find(callback, thisArg) — ES6
```js
[1, 2, 3, 4].find(x => x > 2);    // 3 (first match)
[1, 2, 3, 4].find(x => x > 10);   // undefined
```

#### findIndex(callback, thisArg) — ES6
```js
[1, 2, 3, 4].findIndex(x => x > 2);    // 2
[1, 2, 3, 4].findIndex(x => x > 10);   // -1
```

#### findLast(callback, thisArg) — ES2023
```js
[1, 2, 3, 4].findLast(x => x > 2);    // 4
[1, 2, 3, 4].findLast(x => x > 10);   // undefined
```

#### findLastIndex(callback, thisArg) — ES2023
```js
[1, 2, 3, 4].findLastIndex(x => x > 2);   // 3
[1, 2, 3, 4].findLastIndex(x => x > 10);  // -1
```

### 2.4 Iteration

#### forEach(callback, thisArg)
```js
["a", "b", "c"].forEach((val, i, arr) => {
  console.log(i, val);
});
// 0 "a", 1 "b", 2 "c"
// Returns undefined — cannot break out early (continue/break work)
```

#### map(callback, thisArg) — NON-MUTATING
```js
[1, 2, 3].map(x => x * 2);  // [2, 4, 6]
// Always returns new array of same length
```

#### filter(callback, thisArg) — NON-MUTATING
```js
[1, 2, 3, 4, 5].filter(x => x % 2 === 0);  // [2, 4]
// Returns new array (subset or empty)
```

#### reduce(callback, initialValue) — NON-MUTATING
```js
[1, 2, 3, 4].reduce((acc, cur) => acc + cur, 0);  // 10

// With object
const sum = [1, 2, 3].reduce((acc, cur) => {
  acc.total += cur;
  return acc;
}, { total: 0 });
// { total: 6 }
```

#### reduceRight(callback, initialValue)
```js
[[0, 1], [2, 3], [4, 5]].reduceRight((acc, cur) => acc.concat(cur));
// [4, 5, 2, 3, 0, 1]
```

#### every(callback, thisArg) — NON-MUTATING
```js
[1, 2, 3].every(x => x > 0);  // true
[1, -2, 3].every(x => x > 0); // false
```

#### some(callback, thisArg) — NON-MUTATING
```js
[1, 2, 3].some(x => x > 2);    // true
[1, 2, 3].some(x => x > 10);   // false
```

### 2.5 Transforming

#### slice(start, end) — NON-MUTATING
```js
[1, 2, 3, 4, 5].slice(1, 3);  // [2, 3]
[1, 2, 3, 4, 5].slice(-2);    // [4, 5]
[1, 2, 3, 4, 5].slice();      // [1, 2, 3, 4, 5] (shallow copy)
```

#### concat(...values) — NON-MUTATING
```js
[1, 2].concat([3, 4], [5]);  // [1, 2, 3, 4, 5]
[1, 2].concat(3, 4);         // [1, 2, 3, 4]
```

#### flat(depth) — ES2019, NON-MUTATING
```js
[1, [2, [3, [4]]]].flat();    // [1, 2, [3, [4]]] (depth 1)
[1, [2, [3, [4]]]].flat(2);   // [1, 2, 3, [4]]
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]
```

#### flatMap(callback) — ES2019
```js
[1, 2, 3].flatMap(x => [x, x * 2]);   // [1, 2, 2, 4, 3, 6]
// Equivalent to map().flat(1), but more efficient
```

#### fill(value, start, end) — MUTATING
```js
[1, 2, 3, 4, 5].fill(0, 1, 3);  // [1, 0, 0, 4, 5]
[1, 2, 3].fill(0);              // [0, 0, 0]
```

#### copyWithin(target, start, end) — MUTATING
```js
[1, 2, 3, 4, 5].copyWithin(0, 3);  // [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(1, 3, 4); // [1, 4, 3, 4, 5]
```

### 2.6 Sorting & Reversing — BOTH MUTATING

#### sort(compareFn) — MUTATING
```js
[3, 1, 2].sort();                    // [1, 2, 3] (lexicographic by default!)
[10, 9, 80].sort();                 // [10, 80, 9] (WRONG for numbers)
[10, 9, 80].sort((a, b) => a - b);  // [9, 10, 80] (correct numeric sort)
[10, 9, 80].sort((a, b) => b - a);  // [80, 10, 9] (descending)
```

#### reverse() — MUTATING
```js
[1, 2, 3].reverse();  // [3, 2, 1]
```

### 2.7 Iteration Methods (ES2025+)

#### entries(), keys(), values()
```js
for (const [i, v] of ["a", "b", "c"].entries()) {
  console.log(i, v); // 0 "a", 1 "b", 2 "c"
}
[..."a,b,c".values()];  // ["a", "b", "c"]
```

### 2.8 ES2023 Immutable Methods

```js
const arr = [3, 1, 2];
arr.toSorted();                     // [1, 2, 3] (new array!)
arr.toReversed();                   // [2, 1, 3] (new array!)
arr.toSpliced(1, 1, "a", "b");     // [3, "a", "b", 2]
arr.with(0, 99);                    // [99, 1, 2]
// All return NEW arrays — originals unchanged
```

### 2.9 ES2025 Iterator Helpers

```js
const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = source.values()
  .filter(x => x % 2 === 0)
  .map(x => x * 10)
  .take(3)
  .toArray();
// [20, 40, 60]
// Lazy evaluation, no intermediate arrays created
```

---

## 3. Array Destructuring

```js
const [a, b, c] = [1, 2, 3];       // a=1, b=2, c=3
const [a, , c] = [1, 2, 3];         // a=1, c=3 (skip middle)
const [a, ...rest] = [1, 2, 3, 4];  // a=1, rest=[2,3,4]
const [a = 10] = [];                // a=10 (default value)
const [a, b = a] = [1];             // a=1, b=1

// Nested
const [a, [b, c]] = [1, [2, 3]];    // a=1, b=2, c=3

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];                    // x=2, y=1
```

---

## 4. Array Spread/Rest

### Spread (unpacking)
```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];   // [1, 2, 3, 4]
Math.max(...[1, 5, 3]);          // 5
```

### Rest (packing)
```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10
```

---

## 5. Array Iteration Patterns

```js
const arr = ["a", "b", "c"];

// for...of
for (const item of arr) { console.log(item); }

// forEach
arr.forEach((item, i) => console.log(i, item));

// entries/keys/values
for (const [i, v] of arr.entries()) { console.log(i, v); }

// for loop
for (let i = 0; i < arr.length; i++) { console.log(arr[i]); }

// for...in (NOT recommended for arrays — iterates enumerable properties)
for (const i in arr) { console.log(arr[i]); }
```

---

## 6. Sparse Arrays

```js
const sparse = [1, , 3];          // [1, empty, 3]
sparse.length;                     // 3
sparse[1];                         // undefined
sparse.push(4);                    // [1, empty, 3, 4]

// Sparse vs dense
const dense = [1, undefined, 3];   // NOT sparse
1 in sparse;                       // false (hole)
1 in dense;                        // true (has property at index 1)

// createFrom — converts sparse to dense
Array.from([1, , 3]);             // [1, undefined, 3]
[...[1, , 3]];                    // [1, undefined, 3]
```

---

## 7. Array-like Objects

```js
// Arguments object
function test() {
  console.log(arguments);       // { '0': 'a', '1': 'b', '2': 'c' }
  console.log(Array.isArray(arguments)); // false
}

// Converting array-like to array
const arrayLike = { 0: "a", 1: "b", length: 2 };
Array.from(arrayLike);      // ["a", "b"]
Array.prototype.slice.call(arrayLike); // ["a", "b"]
[...arrayLike];             // ["a", "b"]
```

---

## 8. Multidimensional Arrays

```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
matrix[1][2];  // 6

// Flatten
matrix.flat();       // [1,2,3,4,5,6,7,8,9]
matrix.flat(Infinity);

// Create 2D array
const grid = Array.from({ length: 3 }, () => Array(3).fill(0));
// [[0,0,0],[0,0,0],[0,0,0]]
```

---

## 9. Array Grouping

### Object.groupBy() — ES2024
```js
const items = [
  { name: "apple", type: "fruit" },
  { name: "carrot", type: "vegetable" },
  { name: "banana", type: "fruit" }
];

const grouped = Object.groupBy(items, item => item.type);
// { fruit: [{...}, {...}], vegetable: [{...}] }
```

### Map.groupBy() — ES2024
```js
const mapGrouped = Map.groupBy(items, item => item.type);
// Map { "fruit" => [{...}, {...}], "vegetable" => [{...}] }
```

---

## 10. Array Comparison

```js
// Reference comparison
[1, 2] === [1, 2];      // false (different objects)
const a = [1, 2];
a === a;                  // true

// Deep equality
JSON.stringify([1, 2]) === JSON.stringify([1, 2]); // true
// Or use lodash's isEqual
```

---

# PART 3 — TYPED ARRAYS

---

## 1. ArrayBuffer

```js
const buffer = new ArrayBuffer(8);  // 8 bytes of zeroed memory
console.log(buffer.byteLength);     // 8

// Slicing
const slice = buffer.slice(2, 6);   // new ArrayBuffer(4)
console.log(slice.byteLength);      // 4
```
- Raw, fixed-length binary data buffer
- Cannot directly read/write — need a view (TypedArray or DataView)
- Supports: `slice()`, `byteLength`, `transfer()`, `resize()`

---

## 2. DataView

```js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);

view.setInt8(0, 127);
view.setUint8(1, 255);
view.setFloat32(4, 3.14, true); // little-endian

console.log(view.getInt8(0));      // 127
console.log(view.getUint8(1));     // 255
console.log(view.getFloat32(4, true)); // 3.14
```
- Flexible view into ArrayBuffer
- Control byte offset, length, and endianness
- Methods: `getInt8`, `setInt8`, `getUint8`, `setUint8`, `getInt16`, `setInt16`, `getUint16`, `setUint16`, `getInt32`, `setInt32`, `getUint32`, `setUint32`, `getFloat32`, `setFloat32`, `getFloat64`, `setFloat64`, `getBigInt64`, `setBigInt64`, `getBigUint64`, `setBigUint64`

---

## 3. Int8Array / Uint8Array / Uint8ClampedArray

```js
// Int8Array: -128 to 127, 1 byte per element
const int8 = new Int8Array([1, -128, 127]);
console.log(int8); // Int8Array [1, -128, 127]

// Uint8Array: 0 to 255, 1 byte per element
const uint8 = new Uint8Array(3); // [0, 0, 0]
uint8[0] = 255;
uint8[1] = 256;  // clamped to 0 (wraps around: 256 % 256 = 0)
console.log(uint8); // Uint8Array [255, 0, 0]

// Uint8ClampedArray: 0 to 255, clamps (doesn't wrap)
const clamped = new Uint8ClampedArray(3);
clamped[0] = 255;
clamped[1] = 256;  // clamped to 255 (not 0!)
clamped[2] = -1;   // clamped to 0
console.log(clamped); // Uint8ClampedArray [255, 255, 0]
```

---

## 4. Int16Array / Uint16Array

```js
const int16 = new Int16Array([1, -32768, 32767]);
const uint16 = new Uint16Array([0, 65535]);
```

---

## 5. Int32Array / Uint32Array

```js
const int32 = new Int32Array([1, -2147483648, 2147483647]);
const uint32 = new Uint32Array([0, 4294967295]);
```

---

## 6. Float32Array / Float64Array

```js
const float32 = new Float32Array([3.14, 1.1, 2.2]);
const float64 = new Float64Array([3.141592653589793]);
```

---

## 7. BigInt64Array / BigUint64Array

```js
const bigInt64 = new BigInt64Array([1n, -9007199254740993n]);
const bigUint64 = new BigUint64Array([0n, 18446744073709551615n]);
```

---

## 8. Typed Array Methods & Properties

### Common Properties
```js
const arr = new Int32Array([1, 2, 3, 4]);
arr.length;              // 4
arr.BYTES_PER_ELEMENT;   // 4
arr.byteLength;          // 16 (4 * 4)
arr.byteOffset;          // 0
arr.buffer;              // ArrayBuffer (reference)
```

### Creating Typed Arrays
```js
new Int32Array(3);                           // [0, 0, 0]
new Int32Array([1, 2, 3]);                   // [1, 2, 3]
new Int32Array(anotherTypedArray);            // copy
new Int32Array(arrayBuffer, 2, 4);            // view into buffer
new Int32Array([1.9, 2.8]);                   // [1, 2] (truncated)
```

### Methods (same as regular arrays)
```js
const arr = new Int32Array([1, 2, 3, 4]);
arr.map(x => x * 2);     // Int32Array [2, 4, 6, 8]
arr.filter(x => x > 2);   // Int32Array [3, 4]
arr.reduce((a, b) => a + b); // 10
arr.forEach(x => console.log(x));
arr.find(x => x > 2);     // 3
arr.includes(2);           // true
arr.slice(1, 3);           // Int32Array [2, 3]
arr.subarray(1, 3);        // Int32Array [2, 3] (shared memory!)

// set() — copy elements from another array
arr.set([10, 20], 1);     // arr is now [1, 10, 20, 4]

// slice vs subarray
arr.slice(1, 3);    // NEW ArrayBuffer
arr.subarray(1, 3); // SHARES ArrayBuffer
```

---

## 9. SharedArrayBuffer

```js
const sab = new SharedArrayBuffer(16);
const arr = new Int32Array(sab);
arr[0] = 42;

// Shared between Web Workers
// Can be accessed by multiple threads simultaneously
// Requires Atomics for thread-safe operations
```

---

## 10. Atomics

```js
const sab = new SharedArrayBuffer(4);
const arr = new Int32Array(sab);

Atomics.store(arr, 0, 100);      // write 100 to index 0
Atomics.load(arr, 0);             // 100
Atomics.add(arr, 0, 5);          // 105 (atomic add)
Atomics.sub(arr, 0, 10);         // 95  (atomic subtract)
Atomics.compareExchange(arr, 0, 95, 200); // if current is 95, set to 200
Atomics.exchange(arr, 0, 42);    // set to 42, return old value
Atomics.wait(arr, 0, 42);        // block until value changes
Atomics.notify(arr, 0);          // wake waiting threads
```
- Guarantees thread-safe operations (no race conditions)
- Used with `SharedArrayBuffer` across Web Workers

---

## 11. Use Cases

- **Binary data parsing**: network protocols, file formats
- **WebGL**: vertex buffers, texture data
- **WebSocket**: binary data transfer
- **Crypto**: `window.crypto.getRandomValues(new Uint8Array(16))`
- **Audio processing**: `AudioBuffer.getChannelData()` returns Float32Array
- **Image processing**: canvas `getImageData()` returns Uint8ClampedArray
- **WebAssembly**: memory is ArrayBuffer accessed via typed arrays

---

# PART 4 — MAP

---

## 1. Map Creation

```js
// Empty Map
const map = new Map();

// From array of entries
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"]
]);

// From object
const obj = { a: 1, b: 2 };
const map2 = new Map(Object.entries(obj));
```

---

## 2. Map Methods

#### set(key, value) — returns the Map (chainable)
```js
map.set("name", "Alice");
map.set(1, "number key");
map.set(true, "boolean key");
```

#### get(key)
```js
map.get("name");    // "Alice"
map.get("missing"); // undefined
```

#### has(key)
```js
map.has("name");   // true
map.has("missing"); // false
```

#### delete(key)
```js
map.delete("name"); // true
map.delete("missing"); // false
```

#### clear()
```js
map.clear(); // removes all entries
```

#### size
```js
map.size; // 0
```

#### keys() / values() / entries()
```js
for (const key of map.keys()) { console.log(key); }
for (const value of map.values()) { console.log(value); }
for (const [key, value] of map.entries()) { console.log(key, value); }
```

#### forEach(callback)
```js
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

---

## 3. Map vs Object

| Feature | Map | Object |
|---------|-----|--------|
| Key types | Any (objects, functions, primitives) | String or Symbol only |
| Key order | Insertion order (guaranteed) | String keys in insertion order |
| Size | `.size` property | `Object.keys(obj).length` |
| Performance | Fast for frequent add/delete | Slow for dynamic keys |
| Iteration | Iterable by default | Need Object.keys/entries |
| Prototype | No prototype pollution | Has prototype chain |

---

## 4. Map Iteration

```js
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);

// for...of
for (const [key, value] of map) {
  console.log(key, value);
}

// Spread to array
const arr = [...map]; // [["a", 1], ["b", 2], ["c", 3]]

// Convert to object
const obj = Object.fromEntries(map);
```

---

## 5. Map with Non-String Keys

```js
const map = new Map();
map.set(42, "number");
map.set(true, "boolean");
map.set(null, "null");
map.set(undefined, "undefined");
map.set([1, 2], "array key");       // array reference as key
map.set({ a: 1 }, "object key");    // object reference as key
map.set(() => {}, "function key");   // function as key
map.set(Symbol("id"), "symbol key");

// Different objects with same structure are different keys:
const key1 = { a: 1 };
const key2 = { a: 1 };
map.set(key1, "first");
map.set(key2, "second"); // different key from key1!
```

---

## 6. WeakMap

### Definition
```js
const weakMap = new WeakMap();
let obj = { name: "Alice" };
weakMap.set(obj, "value");
console.log(weakMap.get(obj)); // "value"
```

### Methods (only 4!)
```js
weakMap.set(key, value);  // key MUST be an object
weakMap.get(key);          // value or undefined
weakMap.has(key);          // boolean
weakMap.delete(key);       // boolean
// NO .size, NO .keys(), NO .values(), NO iteration!
```

### Use Cases
```js
// 1. Private data storage
let user = { name: "Alice" };
const privateData = new WeakMap();
privateData.set(user, { password: "secret123" });
// user object can be GC'd → privateData entry is auto-removed

// 2. Caching/memoization
const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveComputation(obj);
  cache.set(obj, result);
  return result;
}

// 3. DOM metadata
const metadata = new WeakMap();
const el = document.querySelector("#myEl");
metadata.set(el, { clicks: 0 });
// When element is removed from DOM and GC'd → metadata entry is removed
```

### Garbage Collection
```js
let obj = { name: "Alice" };
const wm = new WeakMap();
wm.set(obj, "data");
console.log(wm.get(obj)); // "data"

obj = null; // object is now unreachable (except via WeakMap)
// At some point, GC runs → entry is automatically removed
// wm.get(obj) would now throw (obj is null, not an object)
```

---

## 7. When to Use Map vs Object

**Use Map when:**
- Keys are not strings (numbers, objects, functions, etc.)
- You need frequent additions/deletions
- You need the size property
- You want guaranteed key-order iteration
- You're using the Map for a dictionary/hashmap pattern

**Use Object when:**
- Keys are known strings/symbols in advance
- You need to iterate with `for...in`
- You need JSON serialization
- You're working with simple key-value data structures
- Performance of small, static structures matters

---

# PART 5 — SET

---

## 1. Set Creation

```js
// Empty Set
const set = new Set();

// From array (deduplicates!)
const set1 = new Set([1, 2, 2, 3, 3, 3]);
// Set { 1, 2, 3 }

// From string
const set2 = new Set("hello");
// Set { "h", "e", "l", "o" }
```

---

## 2. Set Methods

#### add(value) — returns the Set (chainable)
```js
const set = new Set();
set.add(1);
set.add(2).add(3);  // chaining works
```

#### has(value)
```js
set.has(1);  // true
set.has(4);  // false
```

#### delete(value)
```js
set.delete(2);  // true (deleted)
set.delete(4);  // false (not found)
```

#### clear()
```js
set.clear(); // removes all values
```

#### size
```js
set.size; // number of unique values
```

#### keys() / values() / entries() / forEach()
```js
// keys() and values() return the SAME iterator for Set
for (const value of set.values()) { console.log(value); }
for (const [value, value2] of set.entries()) { console.log(value, value2); }
set.forEach((value) => console.log(value));

// Convert to array
const arr = [...set];
const arr2 = Array.from(set);
```

---

## 3. Set for Uniqueness

```js
// Remove duplicates from array
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];  // [1, 2, 3]

// Remove duplicate objects (reference equality)
const objs = [{ id: 1 }, { id: 1 }]; // different objects!
const uniqueObjs = [...new Set(objs)];  // both kept (different references)

// Deduplicate strings (case-insensitive)
const words = ["Hello", "hello", "HELLO"];
const uniqueWords = [...new Set(words.map(w => w.toLowerCase()))];
```

---

## 4. Set Operations (ES2025)

```js
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union
const union = setA.union(setB);           // Set {1, 2, 3, 4, 5, 6}

// Intersection
const intersection = setA.intersection(setB); // Set {3, 4}

// Difference
const diffA = setA.difference(setB);      // Set {1, 2}
const diffB = setB.difference(setA);      // Set {5, 6}

// Symmetric Difference
const symDiff = setA.symmetricDifference(setB); // Set {1, 2, 5, 6}

// isSubsetOf / isSupersetOf
setA.isSubsetOf(setB);  // false
setA.isSupersetOf(setB); // false
setA.isDisjointFrom(setB); // false
```

**Manual implementations (pre-ES2025):**
```js
// Union
const union = new Set([...setA, ...setB]);

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x)));

// Difference
const difference = new Set([...setA].filter(x => !setB.has(x)));

// Symmetric Difference
const symDiff = new Set(
  [...setA].filter(x => !setB.has(x)).concat([...setB].filter(x => !setA.has(x)))
);
```

---

## 5. WeakSet

```js
const weakSet = new WeakSet();
let obj = { name: "Alice" };
weakSet.add(obj);
console.log(weakSet.has(obj)); // true

obj = null; // entry is automatically removed when GC runs
```

### Methods
```js
weakSet.add(obj);       // MUST be an object
weakSet.has(obj);       // boolean
weakSet.delete(obj);    // boolean
// NO .size, NO iteration, NO .values()
```

### Use Cases
```js
// Track visited objects without preventing GC
const visited = new WeakSet();
function visit(obj) {
  if (visited.has(obj)) return;
  visited.add(obj);
  // process object...
  // when obj is GC'd, visited.has(obj) → false automatically
}

// Tagging objects (metadata)
const processed = new WeakSet();
function process(items) {
  for (const item of items) {
    if (!processed.has(item)) {
      // process item...
      processed.add(item);
    }
  }
}
```

---

## 6. When to Use Set vs Array

**Use Set when:**
- You need uniqueness
- You need fast `has()` checks (O(1) vs O(n))
- You don't need indexed access
- You're tracking membership
- You're doing set operations (union, intersection, etc.)

**Use Array when:**
- You need ordered access by index
- You need `map`, `filter`, `reduce`, etc.
- You need duplicate values
- You need to serialize to JSON
- You need array methods like `sort`, `slice`, `splice`

---

# PART 6 — OTHER COLLECTIONS

---

## 1. WeakMap (Complete)

```js
// Only object keys allowed
const wm = new WeakMap();

// Methods: set, get, has, delete — that's it!
// No .size, no .keys(), no .values(), no .entries()
// No iteration (for...of, forEach, etc.)

// Use case: storing metadata for objects
class User {
  constructor(name) {
    this.name = name;
  }
}

const userMetadata = new WeakMap();
const user1 = new User("Alice");
userMetadata.set(user1, {
  lastLogin: Date.now(),
  loginCount: 1
});
// When user1 is GC'd, its metadata is automatically removed

// Use case: caching expensive computations
const computationCache = new WeakMap();
function compute(obj) {
  if (computationCache.has(obj)) return computationCache.get(obj);
  const result = obj.x + obj.y;
  computationCache.set(obj, result);
  return result;
}
```

---

## 2. WeakSet (Complete)

```js
// Only object values allowed
const ws = new WeakSet();

// Methods: add, has, delete — that's it!
// No .size, no iteration

// Use case: tracking if objects have been processed
const processedNodes = new WeakSet();
function processNode(node) {
  if (processedNodes.has(node)) return;
  processedNodes.add(node);
  // process...
  // when node is GC'd (e.g., removed from DOM), tracking is auto-cleared
}

// Use case: implementing private flags
const privateFlags = new WeakMap();
class Foo {
  #isPrivate;  // or use WeakMap pattern:
  constructor() {
    privateFlags.set(this, { hidden: true });
  }
  get isHidden() {
    return privateFlags.get(this)?.hidden;
  }
}
```

---

## 3. WeakRef (ES2021)

```js
let obj = { data: "heavy" };
const ref = new WeakRef(obj);

// Access the referenced object
const deref = ref.deref();
if (deref) {
  console.log(deref.data); // "heavy"
} else {
  console.log("Object was garbage collected");
}

// Drop strong reference
obj = null;

// Later check if still alive
if (ref.deref()) {
  console.log("still alive");
} else {
  console.log("collected");
}
```

### Use Cases
- **Caching**: avoid memory leaks while caching large objects
- **DOM tracking**: track DOM elements that might be removed
- **Weak caches**: store computed results for objects that may be discarded

```js
// Weak cache pattern
const cache = new Map();
function getCached(key) {
  const ref = cache.get(key);
  if (ref) {
    const value = ref.deref();
    if (value) return value;
  }
  const newValue = expensiveComputation(key);
  cache.set(key, new WeakRef(newValue));
  return newValue;
}
```

---

## 4. FinalizationRegistry (ES2021)

```js
// Register a callback to run when an object is GC'd
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Object "${heldValue}" was garbage collected`);
});

let obj = { name: "temp" };
registry.register(obj, "temp"); // "temp" is the held value

obj = null;
// Eventually, when GC runs: "Object "temp" was garbage collected"
```

### Unregister
```js
const token = {};
registry.register({ id: 1 }, "value", token);
registry.unregister(token); // callback will NOT run for this object
```

### Real-world: Cache Cleanup with FinalizationRegistry
```js
function createCache() {
  const map = new Map();
  const registry = new FinalizationRegistry((key) => {
    map.delete(key); // auto-cleanup dead entries
  });

  return {
    set(key, value) {
      map.set(key, new WeakRef(value));
      registry.register(value, key);
    },
    get(key) {
      const ref = map.get(key);
      if (ref) return ref.deref();
      return undefined;
    }
  };
}
```

### Important Caveats
- **Not guaranteed to run**: GC timing is engine-dependent
- **Not deterministic**: when/how/if the callback runs varies
- **Not for critical cleanup**: use explicit `dispose()` instead
- **One callback per object**: each `register()` call for the same object creates a new entry

---

## 5. Iterator Protocol & Iterable Protocol

### Iterator Protocol
```js
// An iterator has a next() method returning { value, done }
const iterator = {
  current: 0,
  last: 3,
  next() {
    if (this.current <= this.last) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  }
};

iterator.next(); // { value: 0, done: false }
iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: undefined, done: true }
```

### Iterable Protocol
```js
// An iterable has a [Symbol.iterator]() method returning an iterator
const iterable = {
  [Symbol.iterator]() {
    let n = 0;
    return {
      next() {
        n++;
        if (n <= 3) return { value: n, done: false };
        return { value: undefined, done: true };
      }
    };
  }
};

for (const val of iterable) {
  console.log(val); // 1, 2, 3
}

const arr = [...iterable]; // [1, 2, 3]
```

### Built-in Iterables
- Array, String, Map, Set, TypedArray, arguments, NodeList
- All implement `[Symbol.iterator]()`

---

## 6. Generator Functions & Objects

### Generator Functions
```js
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = count(); // returns a generator object (NOT executed yet!)
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
```

### Generators as Iterators
```js
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next(); // { value: 0, done: false }
fib.next(); // { value: 1, done: false }
fib.next(); // { value: 1, done: false }
fib.next(); // { value: 2, done: false }
fib.next(); // { value: 3, done: false }

// Use in for...of
for (const num of fibonacci()) {
  if (num > 100) break;
  console.log(num);
}
```

### yield* Delegation
```js
function* inner() {
  yield 1;
  yield 2;
}

function* outer() {
  yield* inner(); // delegates to inner generator
  yield 3;
}

[...outer()]; // [1, 2, 3]
```

### Generator with Return Value
```js
function* gen() {
  yield 1;
  yield 2;
  return "done"; // becomes { value: "done", done: true }
}

const g = gen();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: "done", done: true }
// "done" is NOT iterable — it's only in the final next() result
```

### Generator Methods on Classes
```js
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

const range = new Range(1, 5);
for (const n of range) {
  console.log(n); // 1, 2, 3, 4, 5
}
```

### Practical Generator Use Cases

#### Lazy evaluation
```js
function* take(n, iterable) {
  let count = 0;
  for (const item of iterable) {
    if (count >= n) return;
    yield item;
    count++;
  }
}

function* filter(pred, iterable) {
  for (const item of iterable) {
    if (pred(item)) yield item;
  }
}

const naturals = (function*() {
  let n = 1;
  while (true) yield n++;
})();

const result = take(5, filter(x => x % 2 === 0, naturals));
[...result]; // [2, 4, 6, 8, 10]
```

#### State machines
```js
function* stateMachine() {
  let state = "idle";
  while (true) {
    const action = yield state;
    if (action === "start") state = "running";
    else if (action === "stop") state = "idle";
    else if (action === "pause") state = "paused";
  }
}

const sm = stateMachine();
sm.next();           // { value: "idle", done: false }
sm.next("start");    // { value: "running", done: false }
sm.next("pause");    // { value: "paused", done: false }
```

---

## Quick Reference Summary

### Mutation vs Immutability

| Type | Mutating Methods | Immutable Methods |
|------|-----------------|-------------------|
| **Array** | push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin | slice, concat, map, filter, flat, flatMap, toSorted, toReversed, toSpliced, with |
| **String** | *None (immutable)* | All methods return new strings |
| **Map** | set, delete, clear | — |
| **Set** | add, delete, clear | union, intersection, difference, symmetricDifference (ES2025) |

### Type Comparison

| Feature | Array | Map | Set | WeakMap | WeakSet |
|---------|-------|-----|-----|---------|---------|
| Key types | Index (number) | Any | N/A (values only) | Object only | Object only |
| Size | `.length` | `.size` | `.size` | N/A | N/A |
| Iterable | Yes | Yes | Yes | No | No |
| Has size prop | Yes | Yes | Yes | No | No |
| GC friendly | No | No | No | Yes | Yes |

### ES2023–ES2025 New Methods

| Method | Type | Description |
|--------|------|-------------|
| `findLast()` | Array | Find from end |
| `findLastIndex()` | Array | Index from end |
| `toSorted()` | Array | Non-mutating sort |
| `toReversed()` | Array | Non-mutating reverse |
| `toSpliced()` | Array | Non-mutating splice |
| `with()` | Array | Non-mutating index replacement |
| `union()` | Set | Combine sets |
| `intersection()` | Set | Common elements |
| `difference()` | Set | Elements in A not in B |
| `symmetricDifference()` | Set | Elements in A or B but not both |
| `isSubsetOf()` | Set | A ⊆ B |
| `isSupersetOf()` | Set | A ⊇ B |
| `isDisjointFrom()` | Set | No common elements |
| `Object.groupBy()` | Static | Group by callback (returns object) |
| `Map.groupBy()` | Static | Group by callback (returns Map) |
| Iterator helpers | Iterator | `.map()`, `.filter()`, `.take()`, `.drop()`, `.flatMap()`, `.reduce()`, `.toArray()`, `.forEach()` |

---

*This reference covers JavaScript Strings, Arrays, TypedArrays, Maps, Sets, WeakMap, WeakSet, WeakRef, FinalizationRegistry, Iterators, and Generators as of ES2025+.*
