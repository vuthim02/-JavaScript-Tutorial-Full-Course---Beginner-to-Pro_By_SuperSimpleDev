# 14 — BigInt

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Handling Large Integers

Normal number limits:

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// Beyond this range, precision is lost:
console.log(9007199254740993); // 9007199254740992 (wrong!)
```

---

## Creating BigInt

```javascript
// Using n suffix
const big = 123456789123456789n;

// Using BigInt function
const big2 = BigInt("123456789123456789");
const big3 = BigInt(42); // From number (but must be within safe range)
```

---

## BigInt Operations

```javascript
const a = 1000000000000000000n;
const b = 2000000000000000000n;

console.log(a + b);       // 3000000000000000000n
console.log(a * b);       // 2000000000000000000000000000000000000n
console.log(b - a);       // 1000000000000000000n
console.log(b / a);       // 2n (truncates, no decimal)
console.log(a % b);       // 1000000000000000000n
console.log(a ** 2n);     // 1000000000000000000000000000000000000n
```

---

## Cannot Mix with Regular Numbers

```javascript
const big = 10n;
const num = 5;

console.log(big + num); // TypeError: Cannot mix BigInt and other types
console.log(big + BigInt(num)); // 15n
console.log(Number(big) + num); // 15 (but may lose precision)
```

---

## Comparisons

```javascript
console.log(10n === 10);  // false (different types)
console.log(10n == 10);   // true (loose equality)
console.log(10n > 5);     // true
console.log(10n < 15);    // true
```

---

## Boolean Context

```javascript
if (0n) {}    // false (0n is falsy)
if (1n) {}    // true
if (100n) {}  // true

console.log(!0n);  // true
```

---

## Bitwise Operations

BigInt supports bitwise operations (except `>>>`):

```javascript
console.log(5n & 3n);  // 1n  (AND)
console.log(5n | 3n);  // 7n  (OR)
console.log(5n ^ 3n);  // 6n  (XOR)
console.log(~5n);      // -6n (NOT)
console.log(5n << 1n); // 10n (left shift)
```

---

## Math Operations Limitations

BigInt is not supported by most `Math` functions:

```javascript
const big = 100n;

Math.round(big);  // TypeError: Cannot convert a BigInt value to a number
Math.floor(big);  // TypeError: Cannot convert a BigInt value to a number

// Convert first if needed:
Math.round(Number(big)); // 100
```

---

## JSON and BigInt

`JSON.stringify` does not support BigInt:

```javascript
const data = { value: 100n };

JSON.stringify(data); // TypeError: Do not know how to serialize a BigInt
```

Workaround: convert to string or number first:

```javascript
const serialized = JSON.stringify({ value: String(100n) });
// '{"value":"100"}'

const parsed = JSON.parse(serialized);
const restored = BigInt(parsed.value); // 100n
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why is the large number losing precision? | Regular Number can only safely represent integers up to 2^53. Use BigInt. |
| Can I mix BigInt and Number? | No. Convert explicitly with `BigInt()` or `Number()`. |
| When to use BigInt? | When dealing with integers larger than 2^53 - 1 (e.g., timestamps, IDs, cryptographic values). |
## Next Steps

[Back to Chapter 13](13-optional-chaining-nullish.md): 13 — Optional Chaining & Nullish Coalescing
[Proceed to Chapter 15](15-regexp.md): 15 — Regular Expressions to learn about 15 — regular expressions.
