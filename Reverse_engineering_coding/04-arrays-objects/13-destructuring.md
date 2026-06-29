# Destructuring

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Array Destructuring

Extract values from arrays into variables based on **position**.

```javascript
const nums = [10, 20, 30, 40, 50];

// Basic
const [a, b] = nums;
console.log(a, b); // 10 20

// Skip elements with commas
const [first, , third] = nums;
console.log(first, third); // 10 30

// Rest pattern
const [head, ...tail] = nums;
console.log(head); // 10
console.log(tail); // [20, 30, 40, 50]

// Default values
const [p, q, r = 99] = [1, 2];
console.log(p, q, r); // 1, 2, 99

// Swap variables
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x, y); // 10, 5

// Nested destructuring
const matrix = [[1, 2], [3, 4]];
const [[a1, a2], [b1, b2]] = matrix;
console.log(a1, a2, b1, b2); // 1, 2, 3, 4
```

## Object Destructuring

Extract values from objects into variables based on **key name**.

```javascript
const user = { name: "John", age: 25, city: "Boston" };

// Basic — variable names must match property names
const { name, age } = user;
console.log(name, age); // "John" 25

// Renaming
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // "John" 25

// Default values
const { name, role = "user" } = user;
console.log(role); // "user"

// Rest of object (ES2018)
const { name, ...rest } = user;
console.log(rest); // { age: 25, city: "Boston" }
```

### Nested Object Destructuring

```javascript
const person = {
    name: "Alice",
    address: {
        city: "NYC",
        zip: 10001,
        coordinates: { lat: 40.71, lng: -74.01 }
    }
};

// Destructure nested properties
const { address: { city, zip } } = person;
console.log(city, zip); // "NYC" 10001

// With renaming at multiple levels
const { address: { coordinates: { lat: latitude } } } = person;
console.log(latitude); // 40.71
```

## Destructuring in Function Parameters

### Array parameter

```javascript
function sum([a, b, c]) {
    return a + b + c;
}
console.log(sum([1, 2, 3])); // 6
```

### Object parameter

```javascript
function greet({ name, age }) {
    console.log(`Hello, ${name}! You are ${age}.`);
}
greet({ name: "Alice", age: 25 }); // "Hello, Alice! You are 25."

// With defaults
function configure({ host = "localhost", port = 8080, ssl = false } = {}) {
    console.log(`Connecting to ${host}:${port} (SSL: ${ssl})`);
}
configure({ port: 3000, ssl: true });
// "Connecting to localhost:3000 (SSL: true)"
configure();
// "Connecting to localhost:8080 (SSL: false)"
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which values are being extracted?     | Depending on pattern — position (array) or key (object). |
| Is this array or object destructuring?| Check `[]` vs `{}` on the left side of assignment.   |
| Are default values being used?        | Check for `=` inside the destructuring pattern.     |
| Is there a rest pattern?              | Check for `...` at the end of the pattern.          |
| Is destructuring in parameters?       | Function parameters can destructure directly.       |
| Are nested properties extracted?      | Check for nested patterns `{}` or `[]` within.      |
## Next Steps

[Back to Chapter 12](12-objects-internals.md): Objects: Internal Structure
[Proceed to Chapter 14](14-spread-rest.md): Spread Operator (`...`) to learn about spread operator (`...`).
