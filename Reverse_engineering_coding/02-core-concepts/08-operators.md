# Operators Deep Dive

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Arithmetic Operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division | `5 / 3` | `1.666...` |
| `%` | Remainder (modulo) | `5 % 3` | `2` |
| `**` | Exponentiation | `5 ** 3` | `125` |

```javascript
// Remainder is useful for even/odd and wrapping
10 % 2;                // 0 (even)
11 % 2;                // 1 (odd)

// Exponentiation (ES2016)
2 ** 3;                // 8
Math.pow(2, 3);        // 8 (old way)

// Division edge cases
5 / 0;                 // Infinity
0 / 0;                 // NaN
-5 / 0;                // -Infinity
```

## Assignment Operators

| Operator | Example | Equivalent To |
|----------|---------|---------------|
| `=` | `x = 5` | `x = 5` |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 3` | `x = x - 3` |
| `*=` | `x *= 3` | `x = x * 3` |
| `/=` | `x /= 3` | `x = x / 3` |
| `%=` | `x %= 3` | `x = x % 3` |
| `**=` | `x **= 3` | `x = x ** 3` |

```javascript
let score = 10;
score += 5;            // 15
score -= 3;            // 12
score *= 2;            // 24
score /= 4;            // 6
score %= 4;            // 2
```

## Increment / Decrement

| Operator | Name | Example | Returns |
|----------|------|---------|---------|
| `++x` | Pre-increment | `let y = ++x` | Increments then returns new value |
| `x++` | Post-increment | `let y = x++` | Returns old value then increments |
| `--x` | Pre-decrement | `let y = --x` | Decrements then returns new value |
| `x--` | Post-decrement | `let y = x--` | Returns old value then decrements |

```javascript
let a = 5;
let b = ++a;           // a=6, b=6  (pre: increment first, then assign)

let c = 5;
let d = c++;           // c=6, d=5  (post: assign first, then increment)
```

## Comparison Operators

| Operator | Name | Example |
|----------|------|---------|
| `===` | Strict equality | `5 === 5` → true |
| `!==` | Strict inequality | `5 !== "5"` → true |
| `>` | Greater than | `5 > 3` → true |
| `>=` | Greater than or equal | `5 >= 5` → true |
| `<` | Less than | `5 < 3` → false |
| `<=` | Less than or equal | `5 <= 5` → true |

## Unary Operators

| Operator | Name | Example |
|----------|------|---------|
| `+` | Unary plus (coerce to number) | `+"42"` → `42` |
| `-` | Unary minus (negate) | `-(5)` → `-5` |
| `!` | Logical NOT | `!true` → `false` |
| `~` | Bitwise NOT | `~5` → `-6` |
| `typeof` | Type check | `typeof 42` → `"number"` |
| `void` | Discard expression value | `void 0` → `undefined` |
| `delete` | Delete property | `delete obj.prop` |
| `++` | Increment | `++x` or `x++` |
| `--` | Decrement | `--x` or `x--` |

## The Comma Operator

Evaluates both operands and returns the second:

```javascript
let x = (1, 2, 3);     // x = 3 (evaluates all, returns last)

// Useful in for loops:
for (let i = 0, j = 10; i <= j; i++, j--) {
    console.log(i, j);
}

// Not the same as commas in function arguments!
function(a, b) { }     // comma separates parameters
```

## Operator Precedence (From Highest to Lowest)

| Precedence | Operators | Associates |
|------------|-----------|------------|
| 1 | Grouping `()` | N/A |
| 2 | Member access `.`, `[]`, `?.` | Left |
| 3 | Function call `()` | Left |
| 4 | `!`, `~`, `+x`, `-x`, `typeof`, `void`, `delete` | Right |
| 5 | `**` | Right |
| 6 | `*`, `/`, `%` | Left |
| 7 | `+`, `-` | Left |
| 8 | `<`, `>`, `<=`, `>=`, `in`, `instanceof` | Left |
| 9 | `===`, `!==`, `==`, `!=` | Left |
| 10 | `&&` | Left |
| 11 | `||` | Left |
| 12 | `??` | Left |
| 13 | Ternary `? :` | Right |
| 14 | Assignment `=`, `+=`, etc. | Right |
| 15 | Comma `,` | Left |

**When in doubt, use parentheses:**

```javascript
// Without parens — relies on precedence knowledge
let result = a + b * c ** d / e;

// With parens — clear intent
let result = a + ((b * (c ** d)) / e);
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What operator is being used? | Identify the operator symbol and its purpose |
| What is the operand type? | Check types before the operator applies |
| Is there type coercion? | `+` may concatenate; `-`, `*`, `/` coerce to numbers |
| What is the operator precedence? | Use parentheses when unsure |
| Is this pre-increment or post-increment? | `++x` returns new value; `x++` returns old value |
| What does the comma operator return? | The last operand |
| Is this compound assignment? | `x += 5` is shorthand for `x = x + 5` |
| Could division cause Infinity or NaN? | Division by zero gives `Infinity`; `0/0` gives `NaN` |
## Next Steps

[Back to Chapter 7](07-type-coercion-and-conversion.md): Type Coercion and Explicit Conversion
[Proceed to Chapter 9](09-optional-chaining-nullish-coalescing.md): Optional Chaining (?.) and Nullish Coalescing (??) to learn about optional chaining (?.) and nullish coalescing (??).
