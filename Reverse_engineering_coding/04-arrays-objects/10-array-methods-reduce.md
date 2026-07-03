# `reduce()` — Aggregate to Single Value

## Syntax

```javascript
arr.reduce(callback(accumulator, currentValue, index, array), initialValue)
```

## Behavior

Executes a callback for each element, carrying forward an **accumulator** value. Returns the final accumulator.

```javascript
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 10
```

## How It Works Internally

```javascript
function reduce(arr, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
}
```

## Step-by-Step Execution

```text
nums: [1, 2, 3, 4]
acc starts: 0

Iteration 1: acc = 0 + 1 = 1
Iteration 2: acc = 1 + 2 = 3
Iteration 3: acc = 3 + 3 = 6
Iteration 4: acc = 6 + 4 = 10

Final: 10
```

## Common Use Cases

```javascript
// Sum
[1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0); // 15

// Product
[1, 2, 3, 4].reduce((acc, n) => acc * n, 1); // 24

// Maximum
[3, 7, 2, 9, 5].reduce((acc, n) => n > acc ? n : acc, -Infinity); // 9

// Group by property
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 25 }
];
const groupedByAge = people.reduce((acc, person) => {
    const key = person.age;
    if (!acc[key]) acc[key] = [];
    acc[key].push(person);
    return acc;
}, {});
// { "25": [{ name: "Alice" }, { name: "Charlie" }], "30": [{ name: "Bob" }] }

// Building an object from pairs
const pairs = [["name", "Alice"], ["age", 25], ["city", "Boston"]];
const obj = pairs.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
}, {});
// { name: "Alice", age: 25, city: "Boston" }

// Flatten array of arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
// [1, 2, 3, 4, 5, 6]

// Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const counts = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
// { apple: 3, banana: 2, orange: 1 }
```

## Without `initialValue`

If no `initialValue` is provided, the first element is used as the accumulator and iteration starts from the second element:

```javascript
[1, 2, 3].reduce((acc, n) => acc + n);
// Step 1: acc = 1 (first element), n = 2 → 3
// Step 2: acc = 3, n = 3 → 6
// Result: 6

// Risk: empty array without initialValue throws TypeError:
[].reduce((acc, n) => acc + n); // TypeError: Reduce of empty array with no initial value
```

**Always provide an initial value** unless you are 100% sure the array is non-empty.

## `reduceRight()`

Same as `reduce()` but processes from **right to left**:

```javascript
const arr = ["a", "b", "c"];
arr.reduce((acc, s) => acc + s, "");      // "abc"
arr.reduceRight((acc, s) => acc + s, ""); // "cba"
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the accumulator?              | The value carried forward — its type depends on the problem. |
| What value is carried forward?        | Whatever the callback returns becomes the next accumulator. |
| What is the initial value?            | The starting point before any elements are processed. |
| What does the callback return?        | The updated accumulator for the next iteration.     |
| What is the final return value?       | The accumulator after processing all elements.      |
| Is the original array modified?       | No — non-destructive.                               |
| What is `reduce()` used for?          | Aggregating, transforming arrays to single values or objects. |
| Is `reduce()` always the best choice? | For sum/max, `reduce` is clear. For complex operations, it can be hard to read — consider a loop. |
## Next Steps

[Back to Chapter 9](09-array-methods-some-every.md): `some()` — At Least One Match
[Proceed to Chapter 11](11-array-methods-sort.md): `sort()` — Ordering Elements to learn about `sort()` — ordering elements.
