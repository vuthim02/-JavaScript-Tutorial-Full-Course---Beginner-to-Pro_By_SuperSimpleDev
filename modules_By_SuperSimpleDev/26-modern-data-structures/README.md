# Module 26: Modern Data Structures

**Duration:** ~45 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand Map and Set data structures
- Use Map for key-value pairs with any key type
- Use Set for unique values
- Work with WeakMap and WeakSet for memory management
- Choose the right data structure for your needs

## Map

A Map holds key-value pairs where keys can be any type (not just strings).

### Creating Maps

```javascript
// Empty Map
const map1 = new Map();

// From array of entries
const map2 = new Map([
  ['name', 'John'],
  ['age', 30],
  ['active', true]
]);

// From object
const obj = { a: 1, b: 2 };
const map3 = new Map(Object.entries(obj));
```

### Basic Operations

```javascript
const userMap = new Map();

// Set values
userMap.set('user1', { name: 'Alice', age: 25 });
userMap.set('user2', { name: 'Bob', age: 30 });
userMap.set(42, 'number key');
userMap.set(true, 'boolean key');

// Get values
console.log(userMap.get('user1'));  // { name: 'Alice', age: 25 }
console.log(userMap.get(42));       // 'number key'

// Check existence
console.log(userMap.has('user1'));  // true
console.log(userMap.has('user3'));  // false

// Size
console.log(userMap.size);  // 4

// Delete
userMap.delete('user2');

// Clear all
userMap.clear();
```

### Iterating Maps

```javascript
const map = new Map([
  ['name', 'John'],
  ['age', 30],
  ['city', 'NYC']
]);

// forEach
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// for...of
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// Get all keys
for (const key of map.keys()) {
  console.log(key);  // 'name', 'age', 'city'
}

// Get all values
for (const value of map.values()) {
  console.log(value);  // 'John', 30, 'NYC'
}

// Convert to array
const entries = [...map];
console.log(entries);  // [['name', 'John'], ['age', 30], ['city', 'NYC']]
```

### Map vs Object

| Feature | Map | Object |
|---------|-----|--------|
| Key types | Any | String/Symbol |
| Key order | Insertion order | Not guaranteed |
| Size | `.size` property | Manual calculation |
| Iteration | Easy | Need Object.keys/values |
| Performance | Better for frequent add/remove | Better for static data |

```javascript
// When to use Map:
// - Keys are not strings
// - Need frequent additions/deletions
// - Need guaranteed key order
// - Need size property

// When to use Object:
// - Simple key-value pairs
// - JSON serialization needed
// - Static structure
```

## Set

A Set stores unique values of any type.

### Creating Sets

```javascript
// Empty Set
const set1 = new Set();

// From array (removes duplicates)
const set2 = new Set([1, 2, 3, 2, 1]);
console.log(set2);  // Set {1, 2, 3}

// From string
const set3 = new Set('hello');
console.log(set3);  // Set {'h', 'e', 'l', 'o'}
```

### Basic Operations

```javascript
const colors = new Set();

// Add values
colors.add('red');
colors.add('blue');
colors.add('green');
colors.add('red');  // Ignored (already exists)

// Check existence
console.log(colors.has('red'));   // true
console.log(colors.has('yellow')); // false

// Size
console.log(colors.size);  // 3

// Delete
colors.delete('blue');

// Clear all
colors.clear();
```

### Iterating Sets

```javascript
const numbers = new Set([1, 2, 3, 4, 5]);

// forEach
numbers.forEach(value => {
  console.log(value);
});

// for...of
for (const number of numbers) {
  console.log(number);
}

// Convert to array
const array = [...numbers];
console.log(array);  // [1, 2, 3, 4, 5]

// Spread into Set
const unique = new Set([1, 1, 2, 2, 3]);
console.log([...unique]);  // [1, 2, 3]
```

### Set Operations

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union (all elements from both)
const union = new Set([...setA, ...setB]);
console.log(union);  // Set {1, 2, 3, 4, 5, 6}

// Intersection (common elements)
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection);  // Set {3, 4}

// Difference (in A but not in B)
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference);  // Set {1, 2}
```

### Practical Uses

```javascript
// Remove duplicates from array
const array = [1, 2, 2, 3, 3, 4, 5, 5];
const unique = [...new Set(array)];
console.log(unique);  // [1, 2, 3, 4, 5]

// Track unique visitors
const visitors = new Set();
visitors.add('user1');
visitors.add('user2');
visitors.add('user1');  // Ignored
console.log(visitors.size);  // 2

// Check if all elements satisfy condition
const numbers = new Set([2, 4, 6, 8]);
const allEven = [...numbers].every(n => n % 2 === 0);
console.log(allEven);  // true
```

## WeakMap

A Map where keys must be objects and are weakly referenced (can be garbage collected).

```javascript
let user = { name: 'John' };

const metadata = new WeakMap();
metadata.set(user, { lastLogin: Date.now() });

console.log(metadata.get(user));  // { lastLogin: ... }

// When user is garbage collected, the entry is automatically removed
user = null;  // Entry in metadata is now eligible for garbage collection
```

### Use Cases

```javascript
// Private data
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }
  
  checkPassword(password) {
    return privateData.get(this).password === password;
  }
}

const user = new User('John', 'secret');
console.log(user.name);        // 'John'
console.log(user.password);    // undefined (private!)
console.log(user.checkPassword('secret'));  // true

// Caching
const cache = new WeakMap();

function expensiveCalculation(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  
  const result = obj.value * 2;  // Expensive operation
  cache.set(obj, result);
  return result;
}

let data = { value: 5 };
console.log(expensiveCalculation(data));  // Computed and cached
console.log(expensiveCalculation(data));  // Cached!

data = null;  // Cache entry automatically removed
```

## WeakSet

A Set where values must be objects and are weakly referenced.

```javascript
const visited = new WeakSet();

function processObject(obj) {
  if (visited.has(obj)) {
    console.log('Already processed');
    return;
  }
  
  // Process object
  console.log('Processing:', obj);
  visited.add(obj);
}

const obj1 = { id: 1 };
processObject(obj1);  // Processing: { id: 1 }
processObject(obj1);  // Already processed

obj1 = null;  // Entry in visited is automatically removed
```

### Use Cases

```javascript
// Track DOM elements
const processedElements = new WeakSet();

function processElement(element) {
  if (processedElements.has(element)) return;
  
  // Process element
  element.classList.add('processed');
  processedElements.add(element);
}

// Mark objects as "in use"
const inUse = new WeakSet();

class ResourceManager {
  acquire(resource) {
    inUse.add(resource);
    return resource;
  }
  
  release(resource) {
    inUse.delete(resource);
  }
  
  isAvailable(resource) {
    return !inUse.has(resource);
  }
}
```

## Choosing the Right Structure

| Structure | Use Case | Key Feature |
|-----------|----------|-------------|
| Array | Ordered list | Index access |
| Object | Simple key-value | JSON support |
| Map | Complex keys | Any key type |
| Set | Unique values | Deduplication |
| WeakMap | Object metadata | Auto-cleanup |
| WeakSet | Object tracking | Auto-cleanup |

## Practice Exercises

### Exercise 26.1: LRU Cache
Implement a Least Recently Used cache using Map.

### Exercise 26.2: Event Emitter
Build a simple event system using Map.

### Exercise 26.3: Unique Items Tracker
Create a system to track unique items with Set.

### Exercise 26.4: Object Registry
Build a registry that auto-cleans using WeakMap.

## Summary

- Map: key-value pairs with any key type
- Set: unique values with any type
- WeakMap: object keys only, auto-cleanup
- WeakSet: object values only, auto-cleanup
- Maps/Sets maintain insertion order
- Use size property for length
- Easy iteration with forEach and for...of

## Previous

[Proceed to Module 25](../25-error-handling/README.md)

## Next Steps

[Proceed to Module 27](../27-functional-programming/README.md): Functional Programming Patterns to learn about pure functions, immutability, and composition.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
