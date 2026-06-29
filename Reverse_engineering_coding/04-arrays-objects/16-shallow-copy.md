# Shallow Copy

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is a Shallow Copy?

A **shallow copy** creates a new object/array at the top level, but nested objects/arrays still share references with the original.

## Methods for Shallow Copy

### Object spread (`...`)

```javascript
const original = {
    name: "John",
    address: { city: "Boston", zip: 10001 }
};

const copy = { ...original };
copy.name = "Jane";           // independent change
copy.address.city = "NYC";    // ALSO changes original.address.city!

console.log(original.name);        // "John" — unchanged
console.log(original.address.city); // "NYC" — changed!
```

### `Object.assign()`

```javascript
const copy = Object.assign({}, original);
// Same behavior as spread
```

### Array spread (`...`)

```javascript
const arr = [1, 2, { a: 1 }];
const arrCopy = [...arr];

arrCopy[0] = 99;        // independent
arrCopy[2].a = 999;     // ALSO changes original[2].a!
```

### `Array.prototype.slice()`

```javascript
const arrCopy = arr.slice();
```

### `Array.prototype.concat()`

```javascript
const arrCopy = [].concat(arr);
```

## Memory Diagram (Shallow Copy)

```text
original ───→ { name: "John", address: ──→ { city: "Boston" } }
copy ───────→ { name: "Jane", address: ──↗
                                         (same nested object)
```

## When Shallow Copy Is Sufficient

```javascript
// Flat object — shallow copy is fully independent
const flat = { a: 1, b: 2, c: 3 };
const flatCopy = { ...flat }; // fully independent (all primitives)

// Array of primitives
const numbers = [1, 2, 3, 4, 5];
const numbersCopy = [...numbers]; // fully independent
```

Shallow copy is sufficient when:
- The object/array has no nesting (all values are primitives).
- You intend to share nested objects.
- Performance matters and deep copy overhead is not justified.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a shallow copy?               | Check for spread, `Object.assign`, `slice`, `concat` — all shallow. |
| Are there nested objects?             | If yes, they are shared between original and copy.  |
| Does mutating the copy affect the original? | Only at nested levels (objects/arrays within). |
| What level of nesting is independent? | Top-level primitives are independent.               |
| Why use shallow instead of deep?      | Faster, less memory, intentional sharing.           |
## Next Steps

[Back to Chapter 15](15-references-in-depth.md): References in Depth
[Proceed to Chapter 17](17-deep-copy.md): Deep Copy to learn about deep copy.
