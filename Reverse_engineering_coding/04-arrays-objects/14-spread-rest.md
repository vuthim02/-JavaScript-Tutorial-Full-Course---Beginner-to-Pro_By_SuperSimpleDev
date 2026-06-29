# Spread Operator (`...`)

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Array Spread

Expands an array into individual elements.

```javascript
// Copy array (shallow)
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]
console.log(copy === original); // false — different references

// Concatenate arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

// Insert between elements
const middle = [3, 4];
const result = [1, 2, ...middle, 5, 6];
// [1, 2, 3, 4, 5, 6]

// Convert string to array
const chars = [..."hello"];
console.log(chars); // ["h", "e", "l", "l", "o"]

// Max of numbers
const numbers = [10, 5, 20, 8];
console.log(Math.max(...numbers)); // 20

// Push multiple elements
arr.push(...[4, 5, 6]);
```

## Object Spread (ES2018)

```javascript
// Copy object (shallow)
const original = { a: 1, b: 2 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2 }

// Merge objects (later keys override earlier)
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 3, c: 4 }

// Add/override property immutably
const user = { name: "Alice", age: 25 };
const updated = { ...user, age: 26, city: "Boston" };
console.log(updated); // { name: "Alice", age: 26, city: "Boston" }
console.log(user); // { name: "Alice", age: 25 } — unchanged

// Remove property (with destructuring + rest)
const { age, ...withoutAge } = user;
console.log(withoutAge); // { name: "Alice" }

// Provide defaults
const defaults = { host: "localhost", port: 8080 };
const config = { ...defaults, ...userConfig };
// userConfig values override defaults
```

---

# Rest Operator (`...`)

## Rest in Array Destructuring

Collects remaining elements into a new array.

```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Can be empty
const [a, ...rest] = [1];
console.log(rest); // []
```

## Rest in Object Destructuring

Collects remaining own enumerable properties into a new object.

```javascript
const user = { name: "John", age: 25, city: "Boston", role: "admin" };
const { name, role, ...details } = user;
console.log(name);    // "John"
console.log(role);    // "admin"
console.log(details); // { age: 25, city: "Boston" }
```

## Rest in Function Parameters

Collects all remaining arguments into a real array.

```javascript
function sum(...numbers) {
    console.log(Array.isArray(numbers)); // true
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

function log(level, ...messages) {
    console.log(`[${level}]`, ...messages);
}
log("INFO", "Server started", "on port", 3000);
// [INFO] Server started on port 3000
```

## Rest vs `arguments`

```javascript
function oldWay() {
    console.log(arguments);       // array-like, NOT a real array
    console.log(Array.isArray(arguments)); // false
}

function newWay(...args) {
    console.log(args);            // real Array
    console.log(Array.isArray(args)); // true
}
```

## Spread vs Rest

| Aspect          | Spread                              | Rest                                |
|-----------------|-------------------------------------|-------------------------------------|
| Context         | Used in arrays/objects **literals** and function **calls** | Used in destructuring patterns and function **parameters** |
| Purpose         | Expands elements/properties         | Collects remaining elements/properties |
| Example (array) | `[...arr]`                          | `const [a, ...rest] = arr`          |
| Example (obj)   | `{...obj}`                          | `const {a, ...rest} = obj`          |
| Example (fn)    | `fn(...args)`                       | `function fn(...args) {}`           |

## Reverse Engineering Questions

### For spread

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this spread or rest?               | Spread is used in value contexts, rest in assignment/parameter. |
| Is the copy shallow or deep?          | Shallow — only top-level properties/values are copied. |
| Are nested objects shared?            | Yes — spread is shallow. Use `structuredClone()` for deep. |
| Does the original change?             | No — spread creates new objects/arrays (non-destructive). |
| What is the order of merged properties? | Later spreads override earlier ones (key order: insertion order). |

### For rest

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does rest collect?               | Remaining elements/properties/arguments.             |
| Where must rest be positioned?        | Always the last in the pattern.                      |
| What type does rest produce?          | Array (for array destructuring and params) or object (for object destructuring). |
| Is rest different from spread?        | Yes — rest collects, spread expands.                |
| Does rest work in arrow functions?    | Yes — rest parameters work in all function types.   |
## Next Steps

[Back to Chapter 13](13-destructuring.md): Destructuring
[Proceed to Chapter 15](15-references-in-depth.md): References in Depth to learn about references in depth.
