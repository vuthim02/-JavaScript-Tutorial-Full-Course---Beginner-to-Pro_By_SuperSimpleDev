# Type Coercion and Explicit Conversion

<img src="https://media.giphy.com/media/Lny6Rw04nsOOc/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Implicit Coercion — JavaScript Doing It For You

JavaScript automatically converts types when you use operators or functions with mismatched types.

### String Coercion

The `+` operator triggers string concatenation if either operand is a string:

```javascript
"Hello" + 42;          // "Hello42"
"5" + 3;               // "53"
"5" + true;            // "5true"
"5" + null;            // "5null"
"5" + undefined;       // "5undefined"
```

### Numeric Coercion

Operators like `-`, `*`, `/`, `%`, `>`, `<` coerce both operands to numbers:

```javascript
"10" - 5;              // 5   (string "10" → number 10)
"10" * "5";            // 50  (both coerced to numbers)
"10" / 3;              // 3.333...
"10" - "hello";        // NaN ("hello" can't become a number)
"5" > 3;               // true ("5" → 5)
"abc" < 5;             // false ("abc" → NaN, NaN comparisons always false)
```

### Boolean Coercion

Values are coerced to boolean in contexts like `if`, `while`, `&&`, `||`, `!`:

```javascript
if ("hello") { }       // "hello" is truthy → executes
if (0) { }             // 0 is falsy → skips
if ([]) { }            // [] is truthy → executes (surprise!)
if ({}) { }            // {} is truthy → executes (surprise!)
```

**Only 6 falsy values:** `false`, `0`, `""`, `null`, `undefined`, `NaN`

## The Abstract Equality Operator (==)

`==` allows coercion before comparison. The rules are complex:

```javascript
// String vs Number: string coerced to number
5 == "5";              // true  ("5" → 5)

// Boolean vs Non-boolean: boolean coerced to number
true == 1;             // true  (true → 1)
false == 0;            // true  (false → 0)

// null and undefined
null == undefined;     // true  (special rule)
null == 0;             // false (special rule — null only == undefined)
undefined == 0;        // false

// Object vs Primitive: object coerced via .toString() or .valueOf()
[1, 2] == "1,2";       // true  (array → "1,2")
```

## Always Use Strict Equality (===)

```javascript
0 == false;            // true  😱
"" == false;           // true  😱
"" == 0;               // true  😱
" " == 0;              // true  😱
[] == false;           // true  😱 (but [] is truthy!)
[] == ![];             // true  😱😱

0 === false;           // false ✅
"" === false;          // false ✅
"" === 0;              // false ✅
" " === 0;             // false ✅
[] === false;          // false ✅
```

**Rule:** Never use `==` or `!=`. Always use `===` or `!==`.

## Explicit Type Conversion (Type Casting)

### To String

```javascript
String(42);            // "42"
String(true);          // "true"
String(null);          // "null"
String(undefined);     // "undefined"
String([1, 2, 3]);     // "1,2,3"

// Alternate: .toString() method (but not on null/undefined)
(42).toString();       // "42"
true.toString();       // "true"
// null.toString();    // ❌ TypeError

// String concatenation trick:
42 + "";               // "42" (but less explicit)
```

### To Number

```javascript
Number("42");          // 42
Number("42.5");        // 42.5
Number("hello");       // NaN
Number(true);          // 1
Number(false);         // 0
Number(null);          // 0
Number(undefined);     // NaN
Number("");            // 0

// parseInt and parseFloat (parse, don't convert)
parseInt("42px");      // 42 — stops at non-numeric
parseInt("42.5");      // 42
parseFloat("42.5px");  // 42.5
parseInt("hello");     // NaN

// Unary + trick:
+"42";                 // 42
+"42.5";               // 42.5
+true;                 // 1
```

### To Boolean

```javascript
Boolean(42);           // true
Boolean(0);            // false
Boolean("hello");      // true
Boolean("");           // false
Boolean(null);         // false
Boolean(undefined);    // false
Boolean([]);           // true  (empty array IS truthy)
Boolean({});           // true  (empty object IS truthy)

// Double NOT trick:
!!42;                  // true
!!0;                   // false
!!"hello";             // true
```

## Coercion Pitfalls Table

| Expression | Result | Why |
|------------|--------|-----|
| `[] + []` | `""` | Both become empty strings |
| `[] + {}` | `"[object Object]"` | Array → `""`, Object → `"[object Object]"` |
| `{} + []` | `0` or `"[object Object]"` | Depends on context — `{}` may be a block |
| `1 + 2 + "3"` | `"33"` | Left to right: `1+2=3`, then `3+"3"="33"` |
| `"1" + 2 + 3` | `"123"` | Left to right: `"1"+2="12"`, then `"12"+3="123"` |
| `true + false` | `1` | `true=1`, `false=0` |
| `"5" - - "3"` | `8` | Both coerced to numbers, `5 - (-3)` |

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What type is expected here? | Check the operator and context (string, number, or boolean) |
| Is implicit coercion happening? | `+` with a string triggers concatenation; `-`, `*`, `/`, `%` coerce to number |
| Is this `==` or `===`? | `===` prevents coercion — always prefer it |
| Could this comparison surprise me? | `==` has many special rules — always use `===` |
| What is the truthiness of this value? | Only 6 falsy values — everything else is truthy |
| Is parseInt or parseFloat needed? | When parsing strings with trailing non-numeric characters like `"42px"` |
| What does `Number(value)` produce? | Check `Number()` rules — `null`→`0`, `undefined`→`NaN`, `""`→`0` |
## Next Steps

[Back to Chapter 6](06-data-types-and-typeof.md): Data Types and the typeof Operator
[Proceed to Chapter 8](08-operators.md): Operators Deep Dive to learn about operators deep dive.
