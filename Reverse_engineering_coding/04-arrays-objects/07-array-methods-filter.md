# `filter()` — Select Matching Elements

## Syntax

```javascript
const newArray = arr.filter(callback(currentValue, index, array))
```

## Behavior

Creates a **new array** containing only elements for which the callback returns a truthy value. **Non-destructive**.

```javascript
const nums = [1, 2, 3, 4, 5];

const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
console.log(nums);  // [1, 2, 3, 4, 5] — unchanged
```

## How It Works Internally

```javascript
function filter(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}
```

## Common Use Cases

### Remove falsy values

```javascript
const mixed = [0, "hello", false, null, 42, undefined, ""];
const truthy = mixed.filter(Boolean);
// ["hello", 42]
// Boolean as callback: Boolean(0)=false, Boolean("hello")=true, etc.
```

### Search/filter data

```javascript
const products = [
    { name: "Laptop", price: 1200, inStock: true },
    { name: "Phone", price: 800, inStock: false },
    { name: "Tablet", price: 500, inStock: true }
];

const inStock = products.filter(p => p.inStock);
const affordable = products.filter(p => p.price < 1000);
```

### Filter with index

```javascript
const everyOther = ["a", "b", "c", "d", "e"].filter((_, i) => i % 2 === 0);
// ["a", "c", "e"]
```

### Remove specific element (immutable)

```javascript
const arr = [1, 2, 3, 4, 5];
const without3 = arr.filter(n => n !== 3);
// [1, 2, 4, 5]
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which condition keeps elements?       | Elements where callback returns truthy are kept.    |
| Which elements are removed?           | Those where callback returns falsy.                 |
| Is the original modified?             | No — non-destructive.                               |
| What is the length of the result?     | Zero or more — never more than the original.        |
| What if all elements pass?            | Returns a shallow copy of the entire array.         |
| What if no elements pass?             | Returns an empty array `[]`.                        |
| Is a new array created?               | Yes.                                                |
## Next Steps

[Back to Chapter 6](06-array-methods-map.md): `map()` — Transform Each Element
[Proceed to Chapter 8](08-array-methods-find.md): `find()` — Get First Match to learn about `find()` — get first match.
