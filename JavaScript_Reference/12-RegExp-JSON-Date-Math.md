# JavaScript RegExp, JSON, Date/Time, Math, Numbers & BigInt — Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

---

## PART 1 — REGULAR EXPRESSIONS

### 1. RegExp Object: Creation

Regular expressions are patterns used to match character combinations in strings. In JavaScript, they are objects.

**Literal notation** (compiled at evaluation time — preferred):
```js
const re = /ab+c/i;
```

**Constructor** (compiled at runtime — use for dynamic patterns):
```js
new RegExp("ab+c", "i");
new RegExp(/ab+c/, "i");          // clone with flags
new RegExp(/abc/, "gi");          // clone and override flags
```

**Key difference**: Use a string as the first argument to `RegExp()` when building patterns from dynamic input:
```js
const breakfasts = ["bacon", "eggs", "oatmeal", "toast"];
const order = "Let me get some bacon and eggs, please";
order.match(new RegExp(`\\b(${breakfasts.join("|")})\\b`, "g"));
// Returns ['bacon', 'eggs']
```

**Calling `RegExp()` without `new`**: If `pattern` is already a RegExp and `flags` is undefined, the original RegExp is returned directly (no copy). Otherwise a new RegExp is created.

---

### 2. Flags

| Flag | Name | Description |
|------|------|-------------|
| `g` | global | Find all matches, not just the first. Required for `matchAll`, `replaceAll`, and iterative `exec`. |
| `i` | ignore case | Match letters regardless of case. `/a/i` matches "A" and "a". |
| `m` | multiline | Make `^` and `$` match line boundaries (`\n`, `\r`) instead of only the start/end of the entire string. |
| `s` | dotAll | Make `.` match newline characters. Without this, `.` skips `\n`. |
| `u` | unicode | Treat the pattern as a sequence of Unicode code points. Enables `\p{...}` property escapes. Fixes surrogate pair handling. |
| `v` | unicodeSets | (ES2024) Upgrade to `u` with set notation in character classes (`&&`, `--`, `\q{...}`), string properties. **Recommended for all new regex.** |
| `y` | sticky | Match only at the index indicated by `lastIndex`. Useful for tokenizers. |
| `d` | hasIndices | (ES2022) Each match includes `indices` with start/end positions of every capture group. |

**Flags are immutable.** The only way to change flags is to create a new RegExp:
```js
const re = /abc/i;
const re2 = new RegExp(re, "gi"); // clone with new flags
```

---

### 3. Pattern Syntax

**Literal characters**: Match themselves.
```js
/abc/  // matches "a", then "b", then "c"
```

**Escape sequences**:

| Escape | Meaning | Escape | Meaning |
|--------|---------|--------|---------|
| `\0` | Null (U+0000) | `\n` | Line feed (U+000A) |
| `\r` | Carriage return (U+000D) | `\t` | Tab (U+0009) |
| `\v` | Vertical tab (U+000B) | `\f` | Form feed (U+000C) |
| `\b` | Word boundary (or backspace inside `[]`) | `\B` | Non-word boundary |
| `\d` | Digit `[0-9]` | `\D` | Non-digit `[^0-9]` |
| `\w` | Word char `[A-Za-z0-9_]` | `\W` | Non-word char |
| `\s` | Whitespace | `\S` | Non-whitespace |
| `\cX` | Control character (X mod 32) | `\xHH` | Hex escape (2 digits) |
| `\uHHHH` | Unicode escape (4 hex digits) | `\u{H…H}` | Unicode code point escape |

**Special characters that need escaping**: `$`, `(`, `)`, `*`, `+`, `.`, `/`, `?`, `[`, `\`, `]`, `^`, `{`, `|`, `}`

**Metacharacters (inside `[]`)**:
- `]`, `\`, `^` (at start), `-` (between chars) have special meaning inside character classes.

---

### 4. Character Classes

| Pattern | Matches |
|---------|---------|
| `[abc]` | Any one of "a", "b", or "c" |
| `[^abc]` | Any character NOT "a", "b", or "c" |
| `[a-z]` | Any character from "a" to "z" |
| `[a-zA-Z0-9]` | Any letter or digit |
| `.` | Any character except newline (unless `s` flag) |
| `\d` | Digit `[0-9]` |
| `\D` | Non-digit `[^0-9]` |
| `\w` | Word character `[A-Za-z0-9_]` |
| `\W` | Non-word character |
| `\s` | Whitespace (space, tab, newline, etc.) |
| `\S` | Non-whitespace |
| `\p{L}` | Any letter (requires `u` or `v` flag) |
| `\p{N}` | Any number (requires `u` or `v` flag) |
| `\p{Emoji}` | Emoji characters (requires `u` or `v` flag) |
| `\P{L}` | Anything that is NOT a letter |

**Unicode property escapes** (with `u` or `v` flag):
```js
/\p{Letter}/u        // any letter from any script
/\p{Script=Greek}/u  // Greek letters specifically
/\p{Emoji}/gu        // all emoji
/\p{Hex_Digit}/u     // hex digits [0-9A-Fa-f]
```

**v-flag character class features** (ES2024):
```js
// Set operations with v flag:
/[\p{L}&&\p{Script=Greek}]/v   // Greek letters (intersection)
/[\p{L}--\p{Script=Greek}]/v   // Non-Greek letters (subtraction)
/[\p{Emoji}&&[^\p{ASCII}]]/v   // Non-ASCII emoji
/[aeiou\q{xy}]/v              // a, e, i, o, u, x, y (class strings)
```

---

### 5. Quantifiers

| Quantifier | Meaning |
|-----------|---------|
| `*` | 0 or more times |
| `+` | 1 or more times |
| `?` | 0 or 1 times (optional) |
| `{n}` | Exactly n times |
| `{n,}` | n or more times |
| `{n,m}` | At least n, at most m times |

**Greedy vs Lazy (Non-greedy)**: By default, quantifiers are **greedy** (match as much as possible). Add `?` after to make them **lazy** (match as little as possible):

```js
// Greedy — matches the ENTIRE string between first < and last >
/<.*>/    // matches "<div>content</div>"

// Lazy — matches the SHORTEST possible
/<.*?>/   // matches "<div>"
```

**Lazy quantifier forms**: `*?`, `+?`, `??`, `{n}?`, `{n,}?`, `{n,m}?`

---

### 6. Groups and Capturing

| Syntax | Name | Description |
|--------|------|-------------|
| `(x)` | Capturing group | Matches and remembers "x". Indexed starting from 1. |
| `(?:x)` | Non-capturing group | Matches "x" without remembering. Preferred when capture not needed (performance). |
| `(?<name>x)` | Named capturing group (ES2018) | Captures and stores in `groups.name`. |
| `\n` | Backreference | Matches same text as captured by nth group. |
| `\k<name>` | Named backreference | Matches same text as named group. |

**Capturing groups are accessed via**:
- Array indices: `match[1]`, `match[2]`, etc.
- `RegExp` properties: `RegExp.$1`, `RegExp.$2`, etc. (up to $9)
- Named groups: `match.groups.name`
- With `d` flag: `match.indices[n]` and `match.indices.groups.name`

```js
const personList = `First: John, Last: Doe`;
const re = /First: (\w+), Last: (\w+)/;
const match = personList.match(re);
// match[0] = 'First: John, Last: Doe'
// match[1] = 'John'
// match[2] = 'Doe'
```

**Named groups**:
```js
const re = /First: (?<first>\w+), Last: (?<last>\w+)/;
const match = personList.match(re);
console.log(match.groups.first);  // 'John'
console.log(match.groups.last);   // 'Doe'
```

**Performance note**: Capturing groups have a performance penalty. If you don't need the matched substring, prefer `(?:x)`.

---

### 7. Backreferences

Backreferences match the same text previously captured by a group:

```js
// Match a repeated word
/\b(\w+)\s+\1\b/g
// "the the" matches, "the that" does not

// Match matched quotes
/(['"]).*?\1/g
// Matches content between matching single or double quotes

// Named backreference
/(?<word>\w+), yes \k<word>/
// "Sir, yes Sir" matches
```

---

### 8. Lookahead and Lookbehind

These are **zero-width assertions** — they check a condition without consuming characters.

| Pattern | Name | ES | Description |
|---------|------|----|-------------|
| `(?=pattern)` | Positive lookahead | ES3 | Followed by "pattern" |
| `(?!pattern)` | Negative lookahead | ES3 | NOT followed by "pattern" |
| `(?<=pattern)` | Positive lookbehind | ES2018 | Preceded by "pattern" |
| `(?<!pattern)` | Negative lookbehind | ES2018 | NOT preceded by "pattern" |

```js
// Positive lookahead — "100" only if followed by " dollars"
'100 dollars'.match(/\d+(?= dollars)/);  // ['100']

// Negative lookahead — "100" only if NOT followed by " euros"
'100 dollars'.match(/\d+(?! euros)/);    // ['100']

// Positive lookbehind — "50" only if preceded by "$"
'$50'.match(/(?<=\$)\d+/);               // ['50']

// Negative lookbehind — "50" only if NOT preceded by "$"
'50 items'.match(/(?<!\$)\d+/);           // ['50']
```

JavaScript supports **variable-length lookbehind** (unlike Java's regex engine).

---

### 9. Methods

#### RegExp Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `re.test(str)` | `boolean` | Does the pattern match? With `/g` or `/y`, honors/updates `lastIndex`. |
| `re.exec(str)` | `Array` or `null` | Returns detailed match info. With `/g`, advances `lastIndex` for iterative matching. |

**Gotcha with `/g` flag**: `test()` and `exec()` with a global regex advance `lastIndex`, causing alternating true/false results. Reset `lastIndex = 0` before reusing.

#### String Methods

| Method | Description |
|--------|-------------|
| `str.match(re)` | Without `/g`: same as `exec()` (single match + groups). With `/g`: flat array of all matches, **no groups**. |
| `str.matchAll(re)` | Requires `/g`. Returns iterator of all matches, each with full detail (groups, index). **Preferred over `match()` for global matching.** |
| `str.search(re)` | Returns index of first match, or `-1`. Does not honor `lastIndex`. |
| `str.replace(re, replacement)` | Replaces first match (without `/g`) or all matches (with `/g`). Supports `$1`, `$2`, `$&`, `$'`, `` $` `` in replacement strings. |
| `str.replaceAll(re, replacement)` | Requires `/g` flag. Replaces all matches. (ES2021) |
| `str.split(re, limit?)` | Splits string by regex. Capturing groups are included in result. |

**Replace callback**: Gets `(fullMatch, group1, group2, ..., offset, input, groups)`:
```js
const result = str.replace(/\$(\d+)/g, (match, p1, offset, input, groups) => {
  return `USD ${p1}`;
});
```

**Replace backreferences**: `$1`–`$9`, `$&` (whole match), `$'` (after match), `` $` `` (before match), `$$` (literal `$`).

---

### 10. Common Regex Patterns

```js
// Email (simple)
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone (US)
/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

// URL
/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

// Date (YYYY-MM-DD)
/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

// IP Address (IPv4)
/^(\d{1,3}\.){3}\d{1,3}$/

// Password strength (min 8 chars, uppercase, lowercase, digit, special)
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Hex Color
/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

// HTML Tag
/<([a-z]+)([^<]*)*(?:>(.*)<\/\1>|\s+\/>)/
```

---

### 11. Unicode and Regex

Without `u` flag, JavaScript treats regex as UTF-16 code units. Characters above U+FFFF (emoji, rare scripts) are surrogate pairs seen as two characters:

```js
// Without u flag — . matches half a surrogate pair
/^.$/.test('😀');     // false (2 code units, not 1)

// With u flag — correct Unicode handling
/^.$/u.test('😀');    // true
```

**Unicode property escapes** (with `u` or `v` flag):
```js
/\p{Letter}/u      // any Unicode letter
/\p{Number}/u      // any Unicode number
/\p{Script=Greek}/u // Greek script
/\p{Script=Arabic}/u // Arabic script
```

---

### 12. Named Capturing Groups (ES2018)

```js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m = '2026-04-30'.match(re);
m.groups.year;   // '2026'
m.groups.month;  // '04'
m.groups.day;    // '30'
```

**Use in `replace()`**:
```js
'2026-04-30'.replace(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  '$<month>/$<day>/$<year>');  // '04/30/2026'
```

**Use in `matchAll()`** (preferred for global matching with groups):
```js
const re = /(?<first>\w+) (?<last>\w+)/g;
for (const match of text.matchAll(re)) {
  console.log(`${match.groups.first} ${match.groups.last}`);
}
```

**d flag with named groups** — get indices:
```js
const m = 'hello world'.match(/(?<greet>hello) (?<name>world)/d);
console.log(m.indices);          // [[0, 11], [0, 5], [6, 11]]
console.log(m.indices.groups);   // { greet: [0, 5], name: [6, 11] }
```

---

### 13. `RegExp.escape()` (Proposal/ES2025)

Escapes special regex characters in a string so it can be used as a literal pattern:
```js
const searchText = '(a) and (a)';
const escaped = RegExp.escape(searchText); // '\\(a\\) and \\(a\\)'
const re = new RegExp(escaped, 'g');
'@ and @'.replace(/@/g, '?');  // use escaped text for safe literal matching
```

---

## PART 2 — JSON

### 1. JSON Overview

JSON (JavaScript Object Notation) is a lightweight data interchange format. It is a strict subset of JavaScript syntax.

**Supported types**: strings, numbers, booleans, null, objects, arrays.
**Top-level values**: Since RFC 7159, JSON allows any top-level value (not just objects/arrays).

### 2. JSON.parse() with Reviver

```js
JSON.parse(text)
JSON.parse(text, reviver)
```

**Reviver function**: Called bottom-up (deepest values first). Receives `(key, value, context)`:
```js
const json = '{"name":"John","birth":"1990-01-01","count":1}';
const obj = JSON.parse(json, (key, value, context) => {
  if (key === 'birth' && typeof value === 'string') {
    return new Date(value);  // convert date string to Date
  }
  return value;
});
// obj.birth is now a Date object
```

**Reviver rules**:
- Called with `this` = containing object, `key` = property name (string), `value` = property value
- Returning `undefined` **deletes** the key
- Final call has `key = ""` and `value` = root object
- `context.source` gives the original JSON text of the value (useful for BigInt)

**Always use try/catch** with `JSON.parse()` — invalid JSON throws `SyntaxError`.

### 3. JSON.stringify() with Replacer and Space

```js
JSON.stringify(value, replacer, space)
```

**Replacer as array** (allowlist of keys to include):
```js
JSON.stringify({ a: 1, b: 2, c: 3 }, ['a', 'c']);
// '{"a":1,"c":3}'
```

**Replacer as function** (called for every key-value pair):
```js
JSON.stringify({ name: 'John', age: 30, password: 'secret' },
  (key, value) => {
    if (key === 'password') return undefined; // omit
    return value;
  }
);
// '{"name":"John","age":30}'
```

**Replacer function rules**:
- First call: `(key='', value=theWholeObject)` — root call
- `this` context = containing object
- Returning `undefined` omits the key
- Returning anything else replaces the value

**Space parameter** (indentation):
```js
JSON.stringify(obj, null, 2);    // 2-space indent
JSON.stringify(obj, null, '\t'); // tab indent
JSON.stringify(obj, null, 4);    // 4-space indent
```

### 4. JSON Type Support and Limitations

**JSON DOES support**:
- Strings, numbers, booleans, null
- Objects, arrays
- Unicode strings
- Arbitrary-precision number syntax (but JS parses as float64)

**JSON does NOT support (silently dropped/converted)**:
| Type | Stringify behavior |
|------|--------------------|
| `undefined` | Dropped from objects; becomes `null` in arrays |
| Functions | Dropped from objects; becomes `null` in arrays |
| `Symbol` | Dropped from objects; becomes `null` in arrays |
| `NaN`, `Infinity` | Becomes `null` |
| `Date` | Calls `toJSON()` → ISO string |
| `Map`, `Set` | Becomes empty `{}` |
| `RegExp` | Becomes `{}` |
| `BigInt` | **Throws TypeError** |
| `Error` | Becomes `{}` |
| Circular references | **Throws TypeError** |

```js
JSON.stringify(undefined);          // undefined (not a string!)
JSON.stringify(function(){});      // undefined
JSON.stringify(NaN);                // 'null'
JSON.stringify(Infinity);           // 'null'
JSON.stringify(new Date());         // '"2026-07-12T..."'
JSON.stringify({ a: undefined });   // '{}'  (key dropped)
JSON.stringify([undefined]);        // '[null]'
JSON.stringify(BigInt(1));          // TypeError
```

### 5. toJSON Method

Any object with a `toJSON()` method controls how it serializes:
```js
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
  toJSON() {
    return { amount: this.amount, currency: this.currency };
  }
}
const m = new Money(100, 'USD');
JSON.stringify(m); // '{"amount":100,"currency":"USD"}'
```

**Built-in `toJSON()`**: `Date.prototype.toJSON()` returns `this.toISOString()`.

### 6. Deep Cloning with JSON (Round-trip Clone)

```js
const clone = JSON.parse(JSON.stringify(original));
```

**Pros**: Fast for plain JSON-compatible objects, no dependencies.
**Cons**:
- Drops `undefined`, functions, symbols
- Converts `Date` to ISO string (not back to `Date`)
- Throws on circular references
- Loses class identity and prototype chains

### 7. structuredClone() for Richer Cloning

The modern built-in deep clone (Node.js 17+, Chrome 98+, Firefox 94+, Safari 15.4+):

```js
const clone = structuredClone(original);
```

**Handles correctly**: `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, typed arrays, circular references.
**Does NOT handle**: functions (throws `DataCloneError`), DOM nodes, Symbol-keyed properties, prototype chains, getters/setters, private class fields.

| Feature | JSON round-trip | structuredClone | Lodash cloneDeep |
|---------|----------------|-----------------|-------------------|
| Date/RegExp | Date → string | Preserved | Preserved |
| Map/Set | Empty `{}` | Preserved | Preserved |
| Circular refs | Throws | Preserved | Preserved |
| Functions | Dropped | Throws | Dropped |
| Performance | Fast (native) | Fastest (native) | Medium |
| Prototype chain | Lost | Lost | Lost |

### 8. JSON Schema

JSON Schema is a vocabulary that allows you to annotate and validate JSON documents:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["name", "email"],
  "additionalProperties": false
}
```

**Libraries**: `ajv` (most popular), `zod` (TypeScript-first), `joi`, `yup`.

### 9. JSON5

A strict **superset** of JSON designed for human-edited config files. Adds:
- `//` line comments and `/* */` block comments
- Trailing commas
- Unquoted keys (if valid JS identifier)
- Single-quoted strings
- Hex literals (`0xCAFE`)
- Leading/trailing decimal points (`.5`, `5.`)
- `Infinity`, `-Infinity`, `NaN`

```json5
{
  // This is a comment
  name: "John",
  scores: [1, 2, 3,],  // trailing comma OK
  hex: 0xFF,
  float: .5,
}
```

### 10. JSON Lines (NDJSON)

**One JSON value per line**, separated by `\n`. Not a single JSON document — you parse line by line.

```
{"name":"Alice","age":30}
{"name":"Bob","age":25}
{"name":"Charlie","age":35}
```

**Key properties**:
- Each line is independently valid JSON
- The file as a whole is NOT valid JSON (split on `\n` first)
- Used for log streams, data pipelines, streaming large datasets
- MIME type: `application/x-ndjson`
- NDJSON and JSON Lines (JSONL) are the same format, different names

**Parsing**:
```js
const lines = ndjsonString.split('\n').filter(Boolean);
const objects = lines.map(line => JSON.parse(line));
```

### 11. High-Precision Numbers in JSON

JavaScript numbers lose precision past `2^53 - 1`. Solutions:

```js
// Solution 1: Serialize as string, revive to BigInt
const data = JSON.parse(jsonStr, (key, value, context) => {
  if (key === 'id' && typeof value === 'string' && /^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
});

// Solution 2: JSON.rawJSON() (ES2025) — produce raw JSON numbers
const raw = JSON.rawJSON(12345678901234567890n);
```

---

## PART 3 — DATE AND TIME

### 1. Date Object: Creation Methods

```js
new Date()                            // Current date/time
new Date(dateString)                  // Parse string
new Date(year, monthIndex)            // Year, month (0-indexed!)
new Date(year, monthIndex, day)
new Date(year, monthIndex, day, hours, minutes, seconds, ms)
new Date(dateString)                  // "2026-07-12"
new Date(dateString)                  // "July 12, 2026 14:30:00"
new Date(timestamp)                   // Milliseconds since epoch
new Date(2026, 6, 12)                 // July 12, 2026 (month is 0-indexed!)
```

**Month is 0-indexed**: January=0, February=1, ..., December=11.

**Always-supported format**: `YYYY-MM-DDTHH:mm:ss.sssZ` (ISO 8601).

```js
const now = new Date();
const specific = new Date(2026, 6, 12, 14, 30, 0);  // July 12, 2026 2:30 PM
const fromString = new Date("2026-07-12T14:30:00Z");
const fromTimestamp = new Date(1720800000000);
```

**Calling `Date()` without `new`**: Returns a string representation (not a Date object).

**Date range**: -100,000,000 to +100,000,000 days relative to epoch.

### 2. Date Methods

#### Get Methods (local time)

| Method | Returns | Range |
|--------|---------|-------|
| `getFullYear()` | 4-digit year | e.g. 2026 |
| `getMonth()` | Month | 0–11 (0=January) |
| `getDate()` | Day of month | 1–31 |
| `getDay()` | Day of week | 0–6 (0=Sunday) |
| `getHours()` | Hours | 0–23 |
| `getMinutes()` | Minutes | 0–59 |
| `getSeconds()` | Seconds | 0–59 |
| `getMilliseconds()` | Milliseconds | 0–999 |
| `getTime()` | Milliseconds since epoch | Number |
| `getTimezoneOffset()` | Offset from UTC in minutes | e.g. -480 for UTC+8 |

#### Set Methods (local time)

| Method | Sets |
|--------|------|
| `setFullYear(year, month?, date?)` | Year (and optionally month/date) |
| `setMonth(month, date?)` | Month (0-indexed) |
| `setDate(date)` | Day of month |
| `setHours(hours, min?, sec?, ms?)` | Hours |
| `setMinutes(minutes, sec?, ms?)` | Minutes |
| `setSeconds(seconds, ms?)` | Seconds |
| `setMilliseconds(ms)` | Milliseconds |
| `setTime(ms)` | Milliseconds since epoch |

#### To/Format Methods

| Method | Returns |
|--------|---------|
| `toString()` | "Sat Jul 12 2026 14:30:00 GMT+0800" |
| `toDateString()` | "Sat Jul 12 2026" |
| `toTimeString()` | "14:30:00 GMT+0800" |
| `toISOString()` | "2026-07-12T06:30:00.000Z" (always UTC) |
| `toJSON()` | Same as `toISOString()` |
| `toLocaleString()` | Locale-dependent string |
| `toLocaleDateString()` | Locale-dependent date string |
| `toLocaleTimeString()` | Locale-dependent time string |
| `toUTCString()` | "Sat, 12 Jul 2026 06:30:00 GMT" |

### 3. Timestamp Methods

```js
Date.now()         // Current timestamp (ms since epoch)
date.getTime()     // Same, for a specific Date object
date.valueOf()     // Same as getTime()
+date              // Unary plus converts to timestamp
```

**Date is stored internally as** milliseconds since Unix epoch (Jan 1, 1970 UTC).

### 4. Date Parsing

```js
// ISO 8601 (always works)
new Date("2026-07-12")
new Date("2026-07-12T14:30:00Z")
new Date("2026-07-12T14:30:00+08:00")
new Date("2026-07-12T14:30:00.123Z")

// Other formats (implementation-dependent — avoid)
new Date("July 12, 2026")
new Date("2026/07/12")
new Date("07-12-2026")

// Date.parse() method
Date.parse("2026-07-12")  // returns timestamp
```

**Best practice**: Always parse ISO 8601 strings or use numeric timestamps.

### 5. Date Formatting

```js
const d = new Date(2026, 6, 12, 14, 30);

// Manual formatting
const formatted = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
// "2026-07-12"

// toISOString for ISO format
d.toISOString();  // "2026-07-12T06:30:00.000Z"

// toLocaleString for locale-aware
d.toLocaleString('en-US');
// "7/12/2026, 2:30:00 PM"

d.toLocaleString('de-DE');
// "12.7.2026, 14:30:00"

// Intl.DateTimeFormat for reusable formatter
new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(d);
// "July 12, 2026, 2:30 PM"
```

### 6. Time Zone Handling

```js
// Get timezone info
new Date().getTimezoneOffset();          // offset in minutes from UTC
new Date().toString();                   // includes timezone info

// UTC methods (avoid timezone confusion)
const utcDate = new Date(Date.UTC(2026, 6, 12, 14, 30));

// Intl.DateTimeFormat for timezone conversion
const tokyo = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  dateStyle: 'full',
  timeStyle: 'long'
}).format(new Date());

// String with timezone
new Date("2026-07-12T14:30:00+09:00");  // explicit offset
new Date("2026-07-12T14:30:00Z");       // UTC
```

**Common timezone names**: `America/New_York`, `Europe/London`, `Asia/Tokyo`, `UTC`, `America/Los_Angeles`.

### 7. UTC Methods

| Method | Equivalent to |
|--------|---------------|
| `getUTCFullYear()` | UTC version of getFullYear |
| `getUTCMonth()` | UTC version of getMonth |
| `getUTCDate()` | UTC version of getDate |
| `getUTCDay()` | UTC version of getDay |
| `getUTCHours()` | UTC version of getHours |
| `getUTCMinutes()` | UTC version of getMinutes |
| `getUTCSeconds()` | UTC version of getSeconds |
| `getUTCMilliseconds()` | UTC version of getMilliseconds |
| `setUTC*()` | UTC version of set methods |
| `Date.UTC(year, month, ...)` | Returns timestamp for UTC date |

### 8. Intl.DateTimeFormat

Language-sensitive date/time formatting:

```js
const date = new Date(2026, 6, 12);

// Locale-specific formatting
new Intl.DateTimeFormat('en-US').format(date);
// "7/12/2026"

new Intl.DateTimeFormat('de-DE').format(date);
// "12.7.2026"

new Intl.DateTimeFormat('ja-JP').format(date);
// "2026/7/12"

// Custom options
new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short'
}).format(date);
// "Sunday, July 12, 2026 at 2:30 PM EDT"

// Format to parts (for custom rendering)
const parts = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).formatToParts(date);
// [{type: 'month', value: 'July'}, {type: 'literal', value: ' '}, ...]

// dateStyle and timeStyle shortcuts
new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'long'
}).format(date);
// "Sunday, July 12, 2026 at 2:30:00 PM EDT"
```

### 9. Temporal API (New Standard)

The Temporal API addresses all the shortcomings of `Date`. It is **immutable**, **time zone aware**, and supports **multiple calendars**.

**Key types**:

| Type | Purpose |
|------|---------|
| `Temporal.Instant` | Exact point in time (like `Date` but without calendar/timezone) |
| `Temporal.PlainDate` | Calendar date without time or timezone (e.g. "2026-07-12") |
| `Temporal.PlainTime` | Wall-clock time without date or timezone (e.g. "14:30") |
| `Temporal.PlainDateTime` | Date + time without timezone |
| `Temporal.ZonedDateTime` | Date + time + timezone (most complete type) |
| `Temporal.Duration` | Length of time (e.g. "2 hours 30 minutes") |
| `Temporal.YearMonth` | Year and month without day |
| `Temporal.MonthDay` | Month and day without year |

**Creation**:
```js
const date = Temporal.PlainDate.from({ year: 2026, month: 7, day: 12 });
const time = Temporal.PlainTime.from({ hour: 14, minute: 30 });
const dateTime = Temporal.PlainDateTime.from('2026-07-12T14:30:00');
const zoned = Temporal.ZonedDateTime.from({
  timeZone: 'America/New_York',
  year: 2026, month: 7, day: 12,
  hour: 14, minute: 30
});
const duration = Temporal.Duration.from({ hours: 2, minutes: 30 });
const instant = Temporal.Instant.from('2026-07-12T14:30:00Z');
```

**Arithmetic**:
```js
const tomorrow = date.add({ days: 1 });
const nextWeek = date.add({ weeks: 1 });
const diff = date1.until(date2);  // returns Duration
```

**Now**:
```js
Temporal.Now.timeZoneId();           // "America/New_York"
Temporal.Now.plainDateISO();         // PlainDate in local timezone
Temporal.Now.plainTimeISO();         // PlainTime in local timezone
Temporal.Now.plainDateTimeISO();     // PlainDateTime in local timezone
Temporal.Now.zonedDateTimeISO();     // ZonedDateTime in local timezone
Temporal.Now.instant();              // Exact instant
```

**Key advantages over Date**:
- All objects are **immutable**
- **Time zone support** with DST-safe arithmetic
- **Multiple calendar systems** (Gregorian, Japanese, Buddhist, etc.)
- **Nanosecond precision** (Date only has millisecond)
- **Clear API** — separate types for date-only, time-only, zoned, etc.
- **Standard formats**: ISO 8601, RFC 3339, RFC 9557

### 10. Date Libraries Comparison

| Library | Bundle | Style | Timezone | Tree-shaking |
|---------|--------|-------|----------|--------------|
| **date-fns** | ~13KB | Functional (pure functions) | via `date-fns-tz` add-on | Excellent |
| **Day.js** | ~2KB core | Chainable (Moment.js-like) | via plugins | Limited |
| **Luxon** | ~17KB | Rich objects with Intl API | Built-in (native) | Good |
| **Moment.js** | ~72KB | Chainable (legacy) | via Moment Timezone | None (maintenance only) |

**Choose date-fns if**: Functional style, TypeScript-first, tree-shaking matters, basic timezone needs.

**Choose Day.js if**: Migrating from Moment.js, minimum bundle size, simple formatting/arithmetic.

**Choose Luxon if**: Timezone handling is core, locale-aware formatting, scheduling applications.

```js
// date-fns
import { format, addDays, differenceInDays } from 'date-fns';
format(new Date(), 'yyyy-MM-dd');
addDays(new Date(), 7);

// Day.js
import dayjs from 'dayjs';
dayjs().format('YYYY-MM-DD');
dayjs().add(7, 'day');

// Luxon
import { DateTime } from 'luxon';
DateTime.now().toFormat('yyyy-MM-dd');
DateTime.now().plus({ days: 7 });
```

---

## PART 4 — MATH

### 1. Math Constants

| Property | Value | Description |
|----------|-------|-------------|
| `Math.PI` | 3.141592653589793 | Ratio of circumference to diameter |
| `Math.E` | 2.718281828459045 | Euler's number (base of natural log) |
| `Math.LN2` | 0.6931471805599453 | Natural log of 2 |
| `Math.LN10` | 2.302585092994046 | Natural log of 10 |
| `Math.LOG2E` | 1.4426950408889634 | Log base 2 of E |
| `Math.LOG10E` | 0.4342944819032518 | Log base 10 of E |
| `Math.SQRT1_2` | 0.7071067811865476 | Square root of 1/2 |
| `Math.SQRT2` | 1.4142135623730951 | Square root of 2 |

### 2. Rounding Methods

| Method | Behavior | Example |
|--------|----------|---------|
| `Math.ceil(x)` | Round **up** | `Math.ceil(3.1)` → 4, `Math.ceil(-1.1)` → -1 |
| `Math.floor(x)` | Round **down** | `Math.floor(3.9)` → 3, `Math.floor(-1.1)` → -2 |
| `Math.round(x)` | Round to nearest | `Math.round(3.5)` → 4, `Math.round(-3.5)` → -3 |
| `Math.trunc(x)` | Remove decimal (truncate) | `Math.trunc(3.9)` → 3, `Math.trunc(-1.9)` → -1 |
| `Math.sign(x)` | Returns -1, 0, or 1 | `Math.sign(-5)` → -1, `Math.sign(0)` → 0 |

**Negative number behavior**:
- `Math.round(-3.5)` → -3 (rounds toward positive infinity for .5)
- `Math.floor(-1.1)` → -2 (always rounds toward -Infinity)
- `Math.ceil(-1.1)` → -1 (always rounds toward +Infinity)

### 3. Math.max() and Math.min()

```js
Math.max(1, 5, 3);     // 5
Math.min(1, 5, 3);     // 1

// With arrays — use spread
const nums = [3, 7, 2, 9];
Math.max(...nums);       // 9
Math.min(...nums);       // 2

// With reduce (no size limit)
nums.reduce((a, b) => Math.max(a, b));  // 9
nums.reduce((a, b) => Math.min(a, b));  // 2
```

**Edge cases**: `Math.max()` → `-Infinity`, `Math.min()` → `+Infinity` (no arguments).

### 4. Random Number Generation

#### Math.random() — Pseudo-random

```js
Math.random()  // returns a number >= 0 and < 1

// Random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInt(1, 10);  // e.g. 7

// Random float between min and max
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Random element from array
function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

**Not cryptographically secure.** Use for games, simulations, UI shuffling — not for tokens, passwords, or keys.

#### crypto.getRandomValues() — Cryptographically Secure

```js
// Browser and Node.js (global crypto)
const array = new Uint32Array(1);
crypto.getRandomValues(array);
const secureRandom = array[0];  // 0 to 4294967295

// Random bytes
const bytes = new Uint8Array(16);
crypto.getRandomValues(bytes);

// Generate random hex string
function secureRandomHex(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

// Random UUID (Node 19+, modern browsers)
crypto.randomUUID();  // e.g. "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

**Limits**: `getRandomValues()` accepts typed arrays; maximum 65,536 bytes per call.

### 5. Power, Root, and Hypotenuse

```js
Math.pow(2, 10);      // 1024  (2^10)
2 ** 10;               // 1024  (exponentiation operator — preferred)

Math.sqrt(16);         // 4     (√16)
Math.cbrt(27);         // 3     (∛27)

Math.hypot(3, 4);      // 5     (√(9+16))
Math.hypot(3, 4, 5);   // 7.071 (√(9+16+25))

// Absolute value
Math.abs(-5);          // 5
Math.abs(5);           // 5
```

### 6. Logarithmic and Exponential Functions

```js
Math.log(1);            // 0          (natural log, base e)
Math.log(Math.E);       // 1
Math.log(8) / Math.log(2); // 3      (manual log base 2)

Math.log2(8);           // 3          (log base 2)
Math.log2(1024);        // 10
Math.log10(100);        // 2          (log base 10)
Math.log10(1000);       // 3

Math.exp(1);            // 2.718...   (e^1)
Math.exp(0);            // 1          (e^0)
Math.exp(2);            // 7.389...   (e^2)

// log of 1+x (more precise for small x)
Math.log1p(0.00001);    // 0.00000999995...
// exp of x minus 1 (more precise for small x)
Math.expm1(0.00001);    // 0.00001000005...
```

### 7. Trigonometric Functions

**All angles are in radians.**

```js
// Conversions
Math.PI / 180;          // degrees to radians multiplier
180 / Math.PI;          // radians to degrees multiplier

const deg45 = Math.PI / 4;  // 45 degrees

// Basic trig
Math.sin(deg45);        // 0.7071...
Math.cos(deg45);        // 0.7071...
Math.tan(deg45);        // 0.9999... (≈1)

// Inverse trig (return radians)
Math.asin(0.5);         // 0.5236... (30°)
Math.acos(0.5);         // 1.0472... (60°)
Math.atan(1);           // 0.7854... (45°)

// atan2(y, x) — angle from positive x-axis (handles all quadrants)
Math.atan2(1, 1);       // 0.7854... (45°)
Math.atan2(-1, -1);     // -2.3562... (-135°)

// Hyperbolic functions
Math.sinh(1);           // 1.1752...
Math.cosh(1);           // 1.5431...
Math.tanh(1);           // 0.7616...

// Inverse hyperbolic
Math.asinh(1);          // 0.8814...
Math.acosh(2);          // 1.3170...
Math.atanh(0.5);        // 0.5493...
```

### 8. Other Math Methods

```js
// fround — nearest 32-bit single-precision float
Math.fround(1.5);       // 1.5
Math.fround(1.337);     // 1.3369998931884766

// f16round — nearest 16-bit half-precision float (ES2025)
Math.f16round(1.5);     // 1.5

// clz32 — count leading zeros in 32-bit binary
Math.clz32(1);          // 31 (0000...0001)
Math.clz32(8);          // 28 (0000...1000)

// imul — 32-bit integer multiplication
Math.imul(2, 4);        // 8

// signbit — sign of a number (ES2016)
Math.signbit(-0);       // true
Math.signbit(5);        // false
```

### 9. Number Formatting with Intl.NumberFormat

```js
const number = 123456.789;

// Locale-specific number formatting
new Intl.NumberFormat('en-US').format(number);
// "123,456.789"

new Intl.NumberFormat('de-DE').format(number);
// "123.456,789"

new Intl.NumberFormat('en-IN').format(number);
// "1,23,456.789"

// Currency formatting
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.56);
// "$1,234.56"

new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(1234.56);
// "1.234,56 €"

new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(1234.56);
// "￥1,235" (yen has no decimal)

// Percentage formatting
new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.85);
// "85%"

new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(0.8567);
// "85.67%"

// Unit formatting
new Intl.NumberFormat('en-US', { style: 'unit', unit: 'kilometer-per-hour' }).format(50);
// "50 km/h"

new Intl.NumberFormat('en-GB', { style: 'unit', unit: 'liter', unitDisplay: 'long' }).format(16);
// "16 litres"

// Decimal places control
new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(42);
// "42.00"

// Significant digits
new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(123456);
// "123,000"

// Compact notation (1K, 1M, etc.)
new Intl.NumberFormat('en-US', { notation: 'compact' }).format(1234567);
// "1.2M"

// BigInt formatting
new Intl.NumberFormat('en-US').format(9007199254740993n);
// "9,007,199,254,740,993"

// String input (avoids precision loss for large numbers)
new Intl.NumberFormat('en-US').format("1234567891234567891");
// "1,234,567,891,234,567,891"
```

**Key options**:
| Option | Values | Description |
|--------|--------|-------------|
| `style` | `'decimal'`, `'currency'`, `'percent'`, `'unit'` | Formatting style |
| `currency` | `'USD'`, `'EUR'`, etc. | Required when style is currency |
| `currencyDisplay` | `'symbol'`, `'code'`, `'narrowSymbol'`, `'name'` | How to display currency |
| `notation` | `'standard'`, `'scientific'`, `'engineering'`, `'compact'` | Number notation |
| `minimumFractionDigits` | 0–100 | Min decimal places |
| `maximumFractionDigits` | 0–100 | Max decimal places |
| `minimumIntegerDigits` | 1–21 | Min integer digits |
| `minimumSignificantDigits` | 1–21 | Min significant digits |
| `maximumSignificantDigits` | 1–21 | Max significant digits |
| `useGrouping` | `true`, `false` | Thousands separator |

---

## PART 5 — NUMBERS AND BIGINT

### 1. Number Types

JavaScript has one numeric type: **64-bit IEEE 754 double-precision floating-point**. There is no separate integer type.

```js
const int = 42;
const float = 3.14;
const negative = -100;
const scientific = 1.5e10;  // 15000000000
const hex = 0xFF;            // 255
const octal = 0o77;          // 63
const binary = 0b1010;       // 10
```

**Special values**:
| Value | Description |
|-------|-------------|
| `Infinity` | Positive infinity (overflow) |
| `-Infinity` | Negative infinity (underflow) |
| `NaN` | "Not a Number" — result of invalid operations |

```js
1 / 0;        // Infinity
-1 / 0;       // -Infinity
0 / 0;        // NaN
"abc" * 2;    // NaN
```

### 2. Number Properties

| Property | Value | Description |
|----------|-------|-------------|
| `Number.MAX_VALUE` | 1.7976931348623157e+308 | Largest positive representable number |
| `Number.MIN_VALUE` | 5e-324 | Smallest positive representable number |
| `Number.MAX_SAFE_INTEGER` | 9007199254740991 (2^53 - 1) | Largest integer without precision loss |
| `Number.MIN_SAFE_INTEGER` | -9007199254740991 (-(2^53 - 1)) | Smallest integer without precision loss |
| `Number.EPSILON` | 2.220446049250313e-16 | Difference between 1 and next representable float |
| `Number.NaN` | NaN | Not a Number |
| `Number.POSITIVE_INFINITY` | Infinity | Positive infinity |
| `Number.NEGATIVE_INFINITY` | -Infinity | Negative infinity |

### 3. Number Static Methods

| Method | Description | Example |
|--------|-------------|---------|
| `Number.isFinite(value)` | Strict check: is it a finite number? | `Number.isFinite(42)` → true |
| `Number.isNaN(value)` | Strict check: is it NaN? | `Number.isNaN(NaN)` → true |
| `Number.isInteger(value)` | Is it an integer? | `Number.isInteger(3.0)` → true |
| `Number.isSafeInteger(value)` | Is it a safe integer? | `Number.isSafeInteger(9007199254740992)` → false |
| `Number.parseFloat(string)` | Same as global `parseFloat()` | `Number.parseFloat("3.14")` → 3.14 |
| `Number.parseInt(string, radix?)` | Same as global `parseInt()` | `Number.parseInt("0xFF", 16)` → 255 |

**`isNaN()` vs `Number.isNaN()`**:
```js
isNaN("abc");        // true  (converts "abc" to NaN first)
Number.isNaN("abc"); // false (not actually NaN)

Number.isNaN(NaN);   // true
Number.isNaN(42);    // false
```

### 4. Number Instance Methods

```js
const num = 12345.6789;

// toFixed(digits?) — fixed-point notation, returns string
num.toFixed();       // '12346'
num.toFixed(2);      // '12345.68'
num.toFixed(5);      // '12345.67890'

// toPrecision(precision?) — fixed-point or exponential
num.toPrecision(4);  // '1.235e+4'
num.toPrecision(6);  // '12345.7'
num.toPrecision(10); // '12345.67890'

// toExponential(fractionDigits?) — exponential notation
num.toExponential();   // '1.23456789e+4'
num.toExponential(2);  // '1.23e+4'

// toString(radix?) — string in specified base
num.toString();     // '12345.6789'
(255).toString(16);  // 'ff'
(255).toString(2);   // '11111111'
(255).toString(8);   // '377'

// toLocaleString(locales?, options?) — locale-sensitive
num.toLocaleString('en-US');  // '12,345.679'
num.toLocaleString('de-DE');  // '12.345,679'
```

**`toFixed()` returns a string**. Convert back with `+num.toFixed(2)` or `Number(num.toFixed(2))`.

### 5. Imprecise Calculations

Floating-point precision issue:
```js
0.1 + 0.2;           // 0.30000000000000004
0.1 + 0.2 === 0.3;   // false!

// Workaround: compare with epsilon
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;  // true

// Or use toFixed for display
(0.1 + 0.2).toFixed(2);  // '0.30'
```

### 6. BigInt

BigInt represents **arbitrarily large integers** without precision loss.

**Creation**:
```js
const big1 = 123n;                    // literal with 'n' suffix
const big2 = BigInt(123);             // from number
const big3 = BigInt("123456789012345678901234567890");  // from string
const big4 = BigInt("0xFF");          // from hex string
```

**Arithmetic operations**:
```js
100n + 200n;           // 300n
200n - 100n;           // 100n
10n * 20n;             // 200n
100n / 3n;             // 33n (truncates toward zero)
100n % 3n;             // 1n
2n ** 100n;            // 1267650600228229401496703205376n

// Comparison
10n === 10;            // false (different types)
10n == 10;             // true (loose equality)
10n > 5n;              // true
```

**Limitations**:
| Operation | Behavior |
|-----------|----------|
| Mixed with Number | **Throws TypeError** |
| `+` with string | Returns string (like Number) |
| `/` (division) | Truncates toward zero (no decimals) |
| Unary `+` | Throws TypeError |
| `>>>` (unsigned right shift) | Not supported |
| `Math.*` functions | Cannot be used (throws TypeError) |
| `JSON.stringify` | **Throws TypeError** (must use replacer) |

```js
BigInt(1) + 1;       // TypeError
10n + "5";           // "105" (string concatenation)

// Workaround: explicit conversion
Number(10n) + 1;     // 11 (may lose precision for large values)
BigInt(10) + BigInt(1);  // 11n (safe)
```

**BigInt methods**:
```js
(123n).toString();       // "123"
(255n).toString(16);     // "ff"
(255n).toString(2);      // "11111111"
(123n).toLocaleString(); // "123"

BigInt.asIntN(8, 256n);  // 0n (clamp to 8-bit signed)
BigInt.asUintN(8, 256n); // 0n (clamp to 8-bit unsigned)
```

### 7. BigInt vs Number

| Feature | Number | BigInt |
|---------|--------|--------|
| Precision | Up to 2^53 - 1 | Arbitrary |
| Floating-point | Yes | No (integers only) |
| Size | 8 bytes | Variable |
| Math functions | Yes | No |
| JSON.stringify | Yes | Throws TypeError |
| Comparison with other type | N/A | Throws TypeError |
| `typeof` | `'number'` | `'bigint'` |

**When to use BigInt**:
- IDs larger than 2^53 (e.g. database IDs from other systems)
- Cryptographic calculations
- Financial/monetary calculations requiring exact integers
- Interoperability with languages that have 64-bit+ integers

**When to use Number**:
- Everyday arithmetic
- Decimal/floating-point values
- When you need Math functions
- When working with most APIs and libraries

### 8. Safe Integers

A safe integer can be exactly represented by a floating-point number and can be compared safely:

```js
Number.MAX_SAFE_INTEGER;  //  9007199254740991  (2^53 - 1)
Number.MIN_SAFE_INTEGER;  // -9007199254740991  (-(2^53 - 1))

Number.isSafeInteger(9007199254740991);  // true
Number.isSafeInteger(9007199254740992);  // false!

// Precision loss example
9007199254740992 === 9007199254740993;  // true! (both become 9007199254740992)
```

**Best practices**:
- Always validate with `Number.isSafeInteger()` before integer arithmetic on untrusted input
- Use BigInt for integers larger than `Number.MAX_SAFE_INTEGER`
- Store large IDs as strings and convert to BigInt when needed

### 9. parseInt and parseFloat

```js
// parseInt(string, radix?) — parse integer from string
parseInt("123");        // 123
parseInt("123abc");     // 123 (stops at non-numeric)
parseInt("abc");        // NaN
parseInt("0xFF", 16);   // 255
parseInt("1010", 2);    // 10
parseInt("77", 8);      // 63

// parseFloat(string) — parse float from string
parseFloat("3.14");     // 3.14
parseFloat("3.14abc");  // 3.14
parseFloat("abc");      // NaN
parseFloat("1e3");      // 1000

// Global parseFloat/parseInt are same as Number.parseFloat/parseInt
parseFloat === Number.parseFloat;  // true
parseInt === Number.parseInt;      // true
```

### 10. Type Conversion Summary

```js
// To Number
Number("42");      // 42
Number("abc");     // NaN
Number(true);      // 1
Number(false);     // 0
Number(null);      // 0
Number(undefined); // NaN
Number("");        // 0
Number("  ");      // 0
+true;              // 1
+"42";              // 42

// To String
String(42);        // "42"
(42).toString();   // "42"
(42).toString(16); // "2a" (hex)
(42).toString(2);  // "101010" (binary)

// To Boolean
Boolean(0);        // false
Boolean("");       // false
Boolean(null);     // false
Boolean(undefined);// false
Boolean(NaN);      // false
Boolean("hello");  // true
Boolean(42);       // true
```

### 11. Number.isFinite vs Global isFinite

```js
// Global isFinite — coerces to number first
isFinite("42");     // true (converts to 42)
isFinite("abc");    // false (converts to NaN)

// Number.isFinite — strict, no coercion
Number.isFinite("42");  // false (not a number)
Number.isFinite(42);    // true
Number.isFinite(NaN);   // false
Number.isFinite(Infinity); // false
```

### 12. Floating-Point Comparison Best Practices

```js
// BAD: direct comparison
0.1 + 0.2 === 0.3;  // false

// GOOD: compare with epsilon
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;  // true

// GOOD: use Object.is for edge cases
Object.is(NaN, NaN);          // true (=== returns false)
Object.is(+0, -0);            // false (=== returns true)

// GOOD: use toFixed for display
(0.1 + 0.2).toFixed(10);  // "0.3000000000"
```
