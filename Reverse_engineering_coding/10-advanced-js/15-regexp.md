# 15 — Regular Expressions

## Creating Regex

```javascript
// Literal syntax (recommended)
let regex = /abc/;

// Constructor (dynamic patterns)
let regex = new RegExp("abc");
```

---

## Methods

```javascript
const text = "Hello world 123";

// test(): returns boolean
console.log(/world/.test(text));  // true
console.log(/xyz/.test(text));    // false

// exec(): returns match info
const match = /world/.exec(text);
console.log(match[0]);   // "world"
console.log(match.index); // 6

// String methods using regex
console.log(text.match(/\d+/));          // ["123"]
console.log(text.replace(/\d+/, "###")); // "Hello world ###"
console.log(text.search(/world/));       // 6
console.log(text.split(/\s+/));          // ["Hello", "world", "123"]
```

---

## Common Patterns

```
\d  → digit (0-9)
\w  → word character (alphanumeric + underscore)
\s  → whitespace (space, tab, newline)
\D  → not a digit
\W  → not a word character
\S  → not whitespace

^   → start of string
$   → end of string
.   → any character (except newline)

*   → zero or more
+   → one or more
?   → zero or one (also lazy quantifier)
{n} → exactly n times
{n,} → at least n times
{n,m} → between n and m times

[]  → character class [a-z], [0-9], [aeiou]
[^] → negated class [^0-9] (not digit)
|   → OR (cat|dog)
()  → capture group
(?:) → non-capturing group
```

---

## Flags

```javascript
/abc/g  → global (find all matches)
/abc/i  → case insensitive
/abc/m  → multiline (^ and $ match line boundaries)
/abc/s  → dotAll (. matches newlines)
/abc/u  → unicode (enable unicode features)
/abc/y  → sticky (match from lastIndex)
```

---

## Example: Email Validation

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailRegex.test("user@example.com"));   // true
console.log(emailRegex.test("invalid-email"));       // false
console.log(emailRegex.test("@domain.com"));          // false
```

---

## Example: Password Strength

```javascript
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/;

// At least 8 chars, one uppercase, one lowercase, one digit, one special char
console.log(passwordRegex.test("Hello1!a"));   // true
console.log(passwordRegex.test("weak"));       // false
```

---

## Example: URL Extraction

```javascript
const urlRegex = /https?:\/\/[^\s]+/g;

const text = "Visit https://example.com and http://test.org";
console.log(text.match(urlRegex));
// ["https://example.com", "http://test.org"]
```

---

## Capturing Groups

```javascript
const phoneRegex = /\((\d{3})\) (\d{3})-(\d{4})/;
const match = "(555) 123-4567".match(phoneRegex);

console.log(match[0]); // "(555) 123-4567" (full match)
console.log(match[1]); // "555" (area code)
console.log(match[2]); // "123" (exchange)
console.log(match[3]); // "4567" (line number)
```

---

## Replacement with Groups

```javascript
const date = "2025-01-15";
const formatted = date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
console.log(formatted); // "15/01/2025"

// Using a function
const expanded = date.replace(/(\d{4})-(\d{2})-(\d{2})/, (match, year, month, day) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
});
console.log(expanded); // "Jan 15, 2025"
```

---

## Lookahead and Lookbehind

```javascript
// Positive lookahead: match followed by pattern
const price = "100 USD";
console.log(price.match(/\d+(?=\s*USD)/)); // ["100"]

// Negative lookahead: match NOT followed by pattern
console.log(price.match(/\d+(?!\s*USD)/)); // null

// Positive lookbehind: match preceded by pattern
const currency = "$100";
console.log(currency.match(/(?<=\$)\d+/)); // ["100"]

// Negative lookbehind: match NOT preceded by pattern
console.log(currency.match(/(?<!\$)\d+/)); // null
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What pattern does this regex match? | Read the regex character by character. Test with `regex.test()`. |
| Which text matches? | Use `text.match(regex)` or `regex.exec(text)` to see matched substrings. |
| What do the parentheses capture? | Each `()` creates a capture group accessible via match[1], match[2], etc. |
| Is the regex global or case-insensitive? | Check for `g`, `i`, `m` flags after the closing `/`. |
## Next Steps

[Back to Chapter 14](14-bigint.md): 14 — BigInt
[Proceed to Chapter 16](16-tagged-templates.md): 16 — Tagged Template Literals to learn about 16 — tagged template literals.
