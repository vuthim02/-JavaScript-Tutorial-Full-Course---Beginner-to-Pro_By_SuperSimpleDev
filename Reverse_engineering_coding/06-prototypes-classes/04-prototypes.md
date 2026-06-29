# Prototypes & the Prototype Chain

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Constructor Functions (Pre-ES6)

```javascript
function User(name, age) { this.name = name; this.age = age; }
const user = new User("John", 25);
```

### What `new` Does

1. Creates a new empty object `{}`.
2. Links the new object's prototype to the function's `prototype` property.
3. Binds `this` to the new object.
4. Returns the new object (unless the function returns an object explicitly).

```javascript
function myNew(Constructor, ...args) {
    const obj = {};
    Object.setPrototypeOf(obj, Constructor.prototype);
    const result = Constructor.apply(obj, args);
    return typeof result === "object" && result !== null ? result : obj;
}
```

### Forgetting `new`

```javascript
function User(name) { this.name = name; }
const user = User("John"); // forgot new! — pollutes global

// Defensive pattern:
function User(name) {
    if (!(this instanceof User)) return new User(name);
    this.name = name;
}
```

### Constructor Return Value

Primitives are ignored; objects replace the new instance.

```javascript
function Ctor() { this.value = "kept"; return "ignored"; }
new Ctor(); // { value: "kept" }
function Ctor2() { this.value = "lost"; return { custom: "object" }; }
new Ctor2(); // { custom: "object" }
```

## What Is a Prototype?

Every object has an internal `[[Prototype]]` (accessible via `__proto__` or `Object.getPrototypeOf()`). This references another object — the **prototype**. Property access traverses the chain: own object → `[[Prototype]]` → ... → `null`.

```javascript
const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
// obj → Object.prototype → null
// arr → Array.prototype → Object.prototype → null
```

### Finding Methods

```javascript
const arr = [1, 2, 3];
console.log(arr.hasOwnProperty("push"));          // false
console.log(Array.prototype.hasOwnProperty("push")); // true
```

## `__proto__` vs `prototype`

- **`__proto__`** — the actual prototype of an object instance.
- **`prototype`** — a property on constructor functions, set as `__proto__` of `new` instances.

```javascript
function User(name) { this.name = name; }
User.prototype.greet = function() { console.log("Hi, " + this.name); };

const user = new User("John");
console.log(user.__proto__ === User.prototype); // true
// user → User.prototype → Object.prototype → null
```

## Property Shadowing

```javascript
const parent = { value: 10 };
const child = Object.create(parent);
console.log(child.value); // 10 — from parent
child.value = 20;         // creates OWN property — shadows parent
console.log(parent.value); // 10 — unchanged
```

## The Prototype Chain in Depth

```javascript
const animal = { eat() { console.log("Eating"); } };
const dog = Object.create(animal);
dog.bark = function() { console.log("Woof"); };
const myDog = Object.create(dog);
myDog.name = "Rex";

myDog.name    // "Rex" — own
myDog.bark()  // "Woof" — on dog
myDog.eat()   // "Eating" — on animal
```

```text
myDog → dog → animal → Object.prototype → null
```

Setting a property never modifies the prototype chain.

### The Prototype Chain is Live

```javascript
function User(name) { this.name = name; }
User.prototype.greet = function() { console.log("Hi, " + this.name); };
const u1 = new User("Alice");
User.prototype.sayBye = function() { console.log("Bye, " + this.name); };
u1.sayBye(); // "Bye, Alice" — live!
```

## Adding Methods to Prototypes — Memory Efficiency

```javascript
// WITHOUT prototype — each instance has its own function copy
function User(name) {
    this.name = name;
    this.greet = function() { console.log("Hi, " + this.name); };
}
console.log(new User("A").greet === new User("B").greet); // false

// WITH prototype — one function shared by all instances
User.prototype.greet = function() { console.log("Hi, " + this.name); };
console.log(new User("A").greet === new User("B").greet); // true
```

### Monkey Patching

```javascript
Array.prototype.first = function() { return this[0]; };
[1, 2, 3].first(); // 1
```

**Warning:** Modifying built-in prototypes is bad practice (conflicts with future JS and other libraries).

### Replacing vs Extending

```javascript
User.prototype = { greet() { console.log("Hi"); } };  // BAD — breaks instanceof
User.prototype.greet = function() { console.log("Hi"); }; // BETTER
```

## Object.create()

```javascript
const animal = { speak() { console.log("Some sound"); } };
const dog = Object.create(animal);
dog.bark = function() { console.log("Woof"); };
dog.speak(); // "Some sound" — from animal
```

### Chain via Object.create

```javascript
const animal = { alive: true };
const mammal = Object.create(animal);
mammal.hasFur = true;
const dog = Object.create(mammal);
dog.bark = () => "Woof";
console.log(dog.alive); // true
```

### Objects with No Prototype

```javascript
const pure = Object.create(null);
console.log(pure.toString); // undefined
console.log("toString" in pure); // false
```

**Use case:** Safe dictionaries — no inherited keys like `toString`.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Was the function called with `new`? | Check for `new` keyword |
| Does the object own this property? | `hasOwnProperty()` — if false, check the chain |
| Are methods shared? | If on `.prototype`, all instances share |
| Is the prototype being replaced or extended? | Replace breaks `instanceof` |
| Is the prototype chain live? | Yes — modifications visible to existing objects |
## Next Steps

[Back to Chapter 3](03-this-binding.md): The `this` Keyword: Binding Rules & call/apply/bind
[Proceed to Chapter 5](05-classes.md): ES6+ Class Syntax, Inheritance & instanceof to learn about es6+ class syntax, inheritance & instanceof.
