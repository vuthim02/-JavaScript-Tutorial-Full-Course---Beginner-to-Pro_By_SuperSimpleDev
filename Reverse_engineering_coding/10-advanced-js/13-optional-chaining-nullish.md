# 13 — Optional Chaining & Nullish Coalescing

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Safe Nested Property Access

Without optional chaining:

```javascript
// Without: crashes if address is undefined
const city = user.address.city; // TypeError: Cannot read properties of undefined

// Without: manual checks
const city = user && user.address && user.address.city;
```

With optional chaining:

```javascript
user?.address?.city
```

Returns `undefined` if any part of the chain is `null` or `undefined`, instead of throwing.

---

## Usage Examples

```javascript
// Property access
const name = user?.profile?.name; // undefined if user or profile is null/undefined

// Method calls
const result = obj?.method?.(); // undefined if obj or obj.method is null/undefined

// Dynamic property
const value = obj?.[key]; // undefined if obj is null/undefined

// Array index
const first = arr?.[0]; // undefined if arr is null/undefined
```

---

## Short-Circuiting

```javascript
// If user is null/undefined, the chain stops immediately
const city = user?.address?.city;

// Method call with short-circuit
const length = str?.trim?.().length;
// If str is null/undefined → undefined (doesn't call trim)
```

---

## Optional Chaining with Delete

```javascript
delete user?.address?.city; // Only delete if user and address exist
```

Cannot use on the left side of assignment:

```javascript
// SyntaxError: Invalid left-hand side in assignment
user?.name = "John";
```

---

## Nullish Coalescing (??)

Returns the right side **only** when the left side is `null` or `undefined`.

```javascript
let name = userName ?? "Guest";
```

---

## ?? vs ||

```javascript
const value1 = 0 ?? "default";   // 0 (0 is not null/undefined)
const value2 = 0 || "default";   // "default" (0 is falsy)

const value3 = "" ?? "default";  // "" (empty string is not null/undefined)
const value4 = "" || "default";  // "default" (empty string is falsy)

const value5 = false ?? true;    // false
const value6 = false || true;    // true

const value7 = null ?? "default";     // "default"
const value8 = undefined ?? "default";// "default"
```

---

## When to Use Which

| Use `||` when | Use `??` when |
|---------------|---------------|
| You want to treat `0`, `""`, `false` as "no value" | You only want to treat `null`/`undefined` as "no value" |
| Default for missing strings | Default for potentially null variables |
| Fallback for any falsy value | Preserving valid falsy values (0, "", false) |

---

## Chaining with Optional Chaining

```javascript
const city = user?.address?.city ?? "Unknown City";
// If any part is null/undefined → "Unknown City"
```

Cannot use `??` with `&&` or `||` without parentheses:

```javascript
// Error: must use parentheses
const x = a ?? b || c;   // SyntaxError

// Correct:
const x = (a ?? b) || c;
const x = a ?? (b || c);
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why did this expression return undefined instead of throwing? | Optional chaining (`?.`) short-circuits on null/undefined. |
| Is `?.` the same as `.`? | No. `?.` returns undefined for null/undefined. `.` throws TypeError. |
| Why is `0 ?? "default"` returning 0? | Because `??` only checks for null/undefined, not falsy values. |
| What's the difference between `??` and `||`? | `||` checks falsy. `??` checks null/undefined only. |
| When should I use `??`? | When 0, "", or false are valid values but null/undefined are not. |
## Next Steps

[Back to Chapter 12](12-freeze-seal.md): 12 — Object.freeze, Object.seal, Object.preventExtensions
[Proceed to Chapter 14](14-bigint.md): 14 — BigInt to learn about 14 — bigint.
