# 12 — Hidden Class Transitions

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Adding Properties Destroys Sharing

```javascript
let user1 = { name: "John", age: 25 };  // HC1
let user2 = { name: "Jane", age: 30 };  // HC1 (shared)

user1.salary = 50000;                    // HC1 → HC2 (transition)
                                         // user2 stays on HC1
```

Now `user1` and `user2` have different hidden classes.

```
Before:
HC1 ←── user1
       └── user2

After user1.salary = 50000:
HC1 ←── user2
HC2 ←── user1
```

## Transition Trees

V8 maintains a **transition tree** to efficiently handle shape changes:

```
HC1 (name, age)
  │
  └── HC2 (name, age, salary)  ← transitioning by adding "salary"
        │
        └── HC3 (name, age, salary, department)  ← further transition
```

When an object adds a property, V8 checks if a compatible transition already exists in the tree. If so, it reuses the existing hidden class instead of creating a new one.

## Deleting Properties

```javascript
delete user1.age;  // Creates new hidden class (often causes deopt)
```

Deleting properties is particularly bad because it forces the engine to create a new shape that doesn't fit the transition tree well. It often forces the object into **dictionary mode** (slow property lookup).

## Gradual Property Addition (Anti-Pattern)

```javascript
// Bad: gradual addition
function createUser(name, age, salary) {
    let user = {};           // HC0 (empty)
    user.name = name;        // HC0 → HC1 (name)
    user.age = age;          // HC1 → HC2 (name, age)
    user.salary = salary;    // HC2 → HC3 (name, age, salary)
    return user;             // Different hidden class per call path!
}
```

Each call to this function with different argument processing creates different transition sequences, making every resulting object have a different hidden class.

## Optimization: Allocate All Properties Upfront

```javascript
// Good: all properties at once
function createUser(name, age, salary) {
    return { name, age, salary };
}
```

The second version creates objects with a single hidden class sharing all instances. All calls to this function produce objects with the same shape.

## Constructor Pattern

```javascript
// Good: constructor sets all properties
class User {
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}

const u1 = new User("A", 25, 50000); // HC1
const u2 = new User("B", 30, 60000); // HC1 (shared)
```

## Transition Tree Depth

Each property addition creates a new hidden class node. Deep transition trees are fine as long as objects share the same transition path:

```
HC0 (empty)
  │
  ├── HC1 (name)           ← created by adding "name"
  │    │
  │    └── HC2 (name, age) ← created by adding "age"
  │
  ├── HC3 (title)          ← different property = different branch
  │
  └── HC4 (id)             ← different property = different branch
```

Objects following `HC0 → HC1 → HC2` share the same final shape. Objects that add properties in different orders end up on different branches.

## Dictionary Mode (Slow Path)

When the engine detects that an object's shape is too unpredictable, it falls back to **dictionary mode**:

```javascript
// Triggers dictionary mode:
function createObject(key, value) {
    const obj = {};
    obj[key] = value;   // Key is dynamic — can't predict shape
    return obj;
}

// Also triggers dictionary mode:
const obj = { a: 1, b: 2 };
delete obj.a;           // Deletion forces dictionary mode
obj.__proto__ = {};     // Changing prototype

// In dictionary mode:
// - Properties stored in hash table (not at fixed offsets)
// - Access is ~10-100x slower
// - Cannot be optimized by JIT for monomorphic access
```

### Detection

You can't detect dictionary mode from user code, but you can infer it:
- Performance degradation after `delete` or dynamic keys.
- Megamorphic IC state in DevTools.

### How to Stay in Fast Mode

```javascript
// Set properties to undefined instead of deleting
const obj = { a: 1, b: 2 };
obj.a = undefined;  // preserves hidden class

// Use all properties upfront
function User(name, age) {
    this.name = name;  // HC1
    this.age = age;    // HC2 (same for all instances)
}

// Avoid dynamic keys for the same object structure
const good = { name: "A", age: 25 };   // Fixed shape
const bad = {};
bad[dynamicKey] = "value";             // Dictionary mode
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does shape change after creation? | Yes, if properties are added/deleted |
| Does `delete obj.prop` hurt performance? | Yes, destroys hidden class |
| How to maintain shared shapes? | Initialize all properties in constructor |
| What is a transition tree? | V8's structure for reusing hidden classes |
| What is dictionary mode? | Fallback — slow hash table for unpredictable shapes |
| How to avoid dictionary mode? | No `delete`, no dynamic keys, set undefined instead |
## Next Steps

[Back to Chapter 11](11-hidden-classes.md): 11 — Hidden Classes (Shapes)
[Proceed to Chapter 13](13-inline-caching.md): 13 — Inline Caching (IC) to learn about 13 — inline caching (ic).
