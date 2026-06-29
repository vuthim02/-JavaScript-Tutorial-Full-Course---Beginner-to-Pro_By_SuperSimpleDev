# `some()` — At Least One Match

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Syntax

```javascript
arr.some(callback(currentValue, index, array)) // returns boolean
```

## Behavior

Returns `true` if the callback returns truthy for **at least one** element. Returns `false` if no element matches. **Short-circuits** (stops on first match). **Non-destructive**.

```javascript
const nums = [1, 3, 8, 5, 7];

const hasEven = nums.some(n => n % 2 === 0);
console.log(hasEven); // true — 8 is even

const hasNegative = nums.some(n => n < 0);
console.log(hasNegative); // false — none negative
```

## Short-Circuit Behavior

```javascript
[1, 2, 3, 4, 5].some(n => {
    console.log(n);    // 1, 2, 3 (stops at 3 because it's the first > 2)
    return n > 2;
});
```

## Use Cases

```javascript
// Check permissions
const userRoles = ["user", "editor"];
const isAdmin = userRoles.some(role => role === "admin");

// Validate data
const hasInvalidField = fields.some(f => !f.isValid);
if (hasInvalidField) {
    showErrors();
}

// Empty array
[].some(() => true);  // false — no elements, no match
```

---

# `every()` — All Must Match

## Syntax

```javascript
arr.every(callback(currentValue, index, array)) // returns boolean
```

## Behavior

Returns `true` if the callback returns truthy for **every** element. Returns `false` as soon as one element fails. **Short-circuits** (stops on first failure). **Non-destructive**.

```javascript
const nums = [2, 4, 6, 8, 10];

const allEven = nums.every(n => n % 2 === 0);
console.log(allEven); // true — all are even

const allPositive = nums.every(n => n > 0);
console.log(allPositive); // true

const mixed = [2, 4, 5, 8];
const allEven2 = mixed.every(n => n % 2 === 0);
console.log(allEven2); // false — 5 is not even
```

## Short-Circuit Behavior

```javascript
[1, 2, 3, 4, 5].every(n => {
    console.log(n);    // 1, 2, 3 (stops at 3 because 3 < 2 is false)
    return n < 2;
});
```

## Use Cases

```javascript
// Validate all items
const allValid = items.every(item => item.validate());
if (allValid) {
    submitForm();
}

// Check array properties
const allNumbers = arr.every(item => typeof item === "number");
const allUnique = arr.every((item, i) => arr.indexOf(item) === i);

// Empty array
[].every(() => false); // true — vacuously true!
```

**Key insight:** `[].every(fn)` always returns `true` because there are no elements to fail.

## `some()` vs `every()` — Truth Table

| Condition              | `some()` | `every()` |
|------------------------|----------|-----------|
| All match              | true     | true      |
| Some match, some don't | true     | false     |
| None match             | false    | false     |
| Empty array            | false    | true      |

## Reverse Engineering Questions

### For `some()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Need one match?                       | Yes — `some()` returns true if at least one matches.|
| Does it always iterate all elements?  | No — short-circuits on first match.                 |
| What if the array is empty?           | Returns `false` (vacuously false).                   |
| Is the original modified?             | No — non-destructive.                                |
| Return type?                          | Boolean.                                             |

### For `every()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Need all to match?                    | Yes — `every()` returns true only if all pass.       |
| Does it always iterate all elements?  | No — short-circuits on first falsy result.          |
| What if the array is empty?           | Returns `true` (vacuously true).                     |
| Is the original modified?             | No — non-destructive.                                |
| Return type?                          | Boolean.                                             |
## Next Steps

[Back to Chapter 8](08-array-methods-find.md): `find()` — Get First Match
[Proceed to Chapter 10](10-array-methods-reduce.md): `reduce()` — Aggregate to Single Value to learn about `reduce()` — aggregate to single value.
