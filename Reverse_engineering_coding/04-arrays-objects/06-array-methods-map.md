# `map()` — Transform Each Element

## Syntax

```javascript
const newArray = arr.map(callback(currentValue, index, array))
```

## Behavior

Creates a **new array** where each element is the result of calling the callback on each element. **Non-destructive** — original is unchanged.

```javascript
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
console.log(nums);    // [1, 2, 3] — unchanged
```

## How It Works Internally

```javascript
// Conceptual implementation of map
function map(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
    }
    return result;
}
```

## Callback Parameters

```javascript
["a", "b", "c"].map((value, index, array) => {
    console.log(value, index, array);
    return value.toUpperCase();
});
// "a" 0 ["a", "b", "c"]
// "b" 1 ["a", "b", "c"]
// "c" 2 ["a", "b", "c"]
// Result: ["A", "B", "C"]
```

## Common Use Cases

### Extract properties

```javascript
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

const names = users.map(user => user.name);
// ["Alice", "Bob", "Charlie"]
```

### Transform data format

```javascript
const products = [
    { id: 1, price: 10 },
    { id: 2, price: 20 }
];

const formatted = products.map(p => ({
    ...p,
    price: `$${p.price.toFixed(2)}`
}));
// [{ id: 1, price: "$10.00" }, { id: 2, price: "$20.00" }]
```

### Render JSX (React)

```javascript
items.map(item => <li key={item.id}>{item.name}</li>);
```

### Callback with index

```javascript
["a", "b", "c"].map((char, i) => `${i + 1}. ${char}`);
// ["1. a", "2. b", "3. c"]
```

## Chaining `map()`

```javascript
[1, 2, 3]
    .map(n => n * 2)     // [2, 4, 6]
    .map(n => n + 1);    // [3, 5, 7]
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the original array modified?       | No — `map()` is non-destructive.                     |
| Is a new array created?               | Yes — every call returns a new array.               |
| What is the length of the result?     | Same as the original array.                          |
| What happens during transformation?   | Each element is passed through the callback.        |
| What if the callback returns nothing? | The new array will contain `undefined` at that position. |
| Is `map()` always the right choice?   | Only if you need a transformed array of same length. |
| What is the time complexity?          | O(n) — linear.                                       |
## Next Steps

[Back to Chapter 5](05-array-methods-search.md): `indexOf()` — Find First Occurrence
[Proceed to Chapter 7](07-array-methods-filter.md): `filter()` — Select Matching Elements to learn about `filter()` — select matching elements.
