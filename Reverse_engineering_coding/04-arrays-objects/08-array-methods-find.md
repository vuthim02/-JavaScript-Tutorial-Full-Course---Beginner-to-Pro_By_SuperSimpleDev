# `find()` — Get First Match

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Syntax

```javascript
arr.find(callback(currentValue, index, array)) // returns element or undefined
```

## Behavior

Returns the **value** of the **first** element for which the callback returns truthy. Returns `undefined` if no element matches. **Non-destructive**.

```javascript
const nums = [5, 10, 20, 15, 30];

const firstOver12 = nums.find(n => n > 12);
console.log(firstOver12); // 20 — first element > 12

const firstOver100 = nums.find(n => n > 100);
console.log(firstOver100); // undefined — none match
```

## `findIndex()` — Returns Index, Not Value

```javascript
const index = nums.findIndex(n => n > 12);
console.log(index); // 2 (value 20 at index 2)
// Returns -1 if not found
```

## Common Use Cases

### Find object by property

```javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }
```

### Find and use immediately

```javascript
const product = products.find(p => p.sku === requestedSku);
if (product) {
    // use product
}
```

## `find` vs `filter`

| Aspect        | `find()`                          | `filter()`                         |
|---------------|-----------------------------------|------------------------------------|
| Return value  | Single element (or `undefined`)   | Array of all matches (may be empty)|
| Stops at      | First match (short-circuits)      | Always checks all elements         |
| Performance   | Faster if only one match needed   | Always O(n)                        |
| Use case      | "Get the one"                     | "Get all that match"               |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Do we need one element or multiple?   | `find()` returns exactly one — the first match.     |
| What is returned if nothing matches?  | `undefined`.                                         |
| Does it check all elements?           | No — stops at the first matching element.           |
| Is the original modified?             | No — non-destructive.                                |
## Next Steps

[Back to Chapter 7](07-array-methods-filter.md): `filter()` — Select Matching Elements
[Proceed to Chapter 9](09-array-methods-some-every.md): `some()` — At Least One Match to learn about `some()` — at least one match.
