# Type Conversion

<img src="https://media.giphy.com/media/Lny6Rw04nsOOc/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is Type Conversion?

Type conversion is when a value changes from one type to another. For example, the string `"5"` becoming the number `5`.

In JavaScript, this happens in two ways:
- **Implicit (coercion):** JavaScript converts types automatically
- **Explicit:** You manually convert types with built-in functions

---

## Implicit Conversion — The Surprising Part

**The `+` operator with strings → string concatenation:**

```javascript
"5" + 1       // "51"     — number 1 becomes string "1"
"Hello" + 42  // "Hello42"
"5" + true    // "5true"
```

The `+` operator is "overloaded" — when either side is a string, it prefers concatenation.

**Other arithmetic operators (`-`, `*`, `/`) convert strings to numbers:**

```javascript
"5" - 1       // 4   — "5" becomes number 5
"10" * "2"    // 20
"10" - true   // 9   — true becomes 1
"10" - null   // 10  — null becomes 0
"abc" - 1     // NaN — "abc" can't become a number
```

These operators only work with numbers, so JavaScript tries to convert strings to numbers.

---

## The 6 Falsy Values — Memorize These

| Value | Type | Why |
|---|---|---|
| `false` | boolean | Literal false |
| `0` | number | Zero |
| `""` | string | Empty string |
| `null` | null | No value |
| `undefined` | undefined | No value |
| `NaN` | number | Not a Number |

> Everything else is truthy — including `"0"` (string containing zero), `[]` (empty array), `{}` (empty object), `Infinity`, and `-1`.

---

## The Loose Equality (`==`) Coercion Rules

1. **Same type?** → Compare directly (same as `===`)
2. **`null == undefined`?** → Always `true` (special rule)
3. **Number vs String?** → Convert string to number, then compare
4. **Boolean vs anything?** → Convert boolean to number (`true` → `1`, `false` → `0`)
5. **Object vs Primitive?** → Convert object to primitive

```javascript
0 == false       // true  (false → 0, then 0 === 0)
"" == false      // true  (false → 0, "" → 0)
[] == false      // true  ([] → "" → 0, false → 0)
[1] == 1         // true  ([1] → "1" → 1)
null == undefined // true  (special rule)
```

This is why `===` is so strongly recommended.

---

## Explicit Conversion — Converting on Purpose

**Converting to Number:**

```javascript
Number("5")         // 5
Number("abc")       // NaN
Number(true)        // 1
Number(null)        // 0
Number(undefined)   // NaN

// Shorthand: unary + operator
+"5"                // 5

// parseInt and parseFloat
parseInt("42px")    // 42  — reads numbers until it hits "p"
parseFloat("3.14em") // 3.14
```

**Converting to String:**

```javascript
String(42)           // "42"
String(true)         // "true"
String(null)         // "null"
String(undefined)    // "undefined"
String([1,2,3])      // "1,2,3"
```

**Converting to Boolean:**

```javascript
Boolean(1)           // true
Boolean(0)           // false
Boolean("hello")     // true
Boolean("")          // false
Boolean([])          // true  (empty array is truthy!)
Boolean({})          // true  (empty object is truthy!)

// Shorthand: double NOT !!
!!1                  // true
!!0                  // false
!!"hello"            // true
!!null               // false
```

---

## Reverse Engineering: Type Conversion

**For `"5" + 1` → `"51"`:**

| Question | Answer |
|---|---|
| Why isn't the result 6? | `+` prefers string concatenation when either operand is a string |
| Which operand "wins"? | The string — result is always a string |
| How do I force numeric addition? | `Number("5") + 1` or `+"5" + 1` |

**For `Number("abc")` → `NaN`:**

| Question | Answer |
|---|---|
| Why NaN? | "abc" can't be parsed as a number |
| How do I check for NaN? | `Number.isNaN(value)` — NOT `value === NaN` |

**For `!!value`:**

| Question | Answer |
|---|---|
| What does `!!` do? | First `!` converts to boolean and negates; second `!` negates again |
| Cleaner alternative? | `Boolean(value)` — more readable |
## Next Steps

[Back to Chapter 10](10-assignment-operators.md): Assignment Operators
[Proceed to Chapter 12](12-input-and-output.md): Input and Output, Statements, and Comments to learn about input and output, statements, and comments.
