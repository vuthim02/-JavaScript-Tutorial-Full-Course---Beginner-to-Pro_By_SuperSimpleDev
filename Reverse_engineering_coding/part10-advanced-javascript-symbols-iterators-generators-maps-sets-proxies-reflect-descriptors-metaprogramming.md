# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 10 — Advanced JavaScript (Symbols, Iterators, Generators, Maps, Sets, Proxies, Reflect, Property Descriptors, Meta-programming, and Memory Internals)

---

# Mission

This section covers some of the deepest capabilities of JavaScript.

Most developers know:

```javascript
Objects
Arrays
Functions
Promises
```

Senior engineers additionally understand:

```text
Symbols
Iterators
Generators
Maps
Sets
WeakMaps
WeakSets
Property Descriptors
Proxies
Reflect
BigInt
RegExp
Internationalization APIs
Meta-programming
```

These features are heavily used inside:

* React
* Vue.js
* Node.js

---

# OVERALL MAP

```text
Primitive Types (string, number, boolean, null, undefined, symbol, bigint)
     ↓
Objects (prototype chains, property access)
     ↓
Property Descriptors (writable, enumerable, configurable)
     ↓
Symbols (unique property keys, well-known symbols)
     ↓
Iterators (Symbol.iterator, next(), for...of)
     ↓
Generators (function*, yield, pause/resume)
     ↓
Maps/Sets (ordered, unique, object keys)
     ↓
Weak Collections (WeakMap, WeakSet – memory-aware)
     ↓
Proxies (trap operations: get, set, has, deleteProperty)
     ↓
Reflect (default behavior for proxies)
     ↓
Meta-programming (code that programs code)
     ↓
Memory Internals (heap, stack, GC, leaks)
```

---

# Chapter 1 — Symbol

## What is a Symbol?

A **unique** and **immutable** primitive value, used as object property keys.

```javascript
const id = Symbol();
console.log(typeof id); // "symbol"
```

Every Symbol is unique:

```javascript
const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2); // false – always different
```

---

## Why Symbols Exist

Normal object keys are strings:

```javascript
let user = {
    name: "John"
};
```

Keys:

```text
"name"
```

Problem: String keys can collide.

```javascript
// Your code
user.id = 1;

// Library code (same user object)
user.id = 999; // Conflict! Your id is overwritten
```

---

## Solution: Symbols as Property Keys

```javascript
const id = Symbol("id"); // Description is optional

let user = {
    name: "John",
    [id]: 1   // Symbol key – not a string
};
```

Access:

```javascript
user[id]      // 1 – works
user.id       // undefined – "id" string key, different from Symbol("id")
```

---

## Memory Layout

```text
user (object in heap)
 │
 ├── "name" (string key) → "John"
 │
 └── Symbol(id) (symbol key) → 1
       │
       └── Only accessible if you have the Symbol reference
```

---

## Symbols are Not Enumerable

```javascript
const sym = Symbol("secret");
const obj = {
    name: "John",
    [sym]: "hidden"
};

for (let key in obj) {
    console.log(key); // "name" (symbol key skipped)
}

console.log(Object.keys(obj));   // ["name"] – symbol keys excluded
console.log(Object.getOwnPropertyNames(obj)); // ["name"] – symbol keys excluded
```

To find symbol keys:

```javascript
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(secret)]
```

---

## Well-Known Symbols

JavaScript has built-in symbols that customize behavior:

| Symbol | Used For |
|--------|----------|
| `Symbol.iterator` | Makes an object iterable (`for...of`) |
| `Symbol.toStringTag` | Customizes `Object.prototype.toString` |
| `Symbol.species` | Controls constructor for derived objects |
| `Symbol.hasInstance` | Customizes `instanceof` |
| `Symbol.toPrimitive` | Controls conversion to primitive |
| `Symbol.match` | Customizes `String.prototype.match` |
| `Symbol.replace` | Customizes `String.prototype.replace` |
| `Symbol.search` | Customizes `String.prototype.search` |
| `Symbol.split` | Customizes `String.prototype.split` |

```javascript
// Example: Symbol.toStringTag
class MyClass {
    get [Symbol.toStringTag]() {
        return "MyCustomClass";
    }
}

const obj = new MyClass();
console.log(Object.prototype.toString.call(obj)); // "[object MyCustomClass]"
```

---

## Symbol Descriptions

```javascript
const s1 = Symbol("user id");
const s2 = Symbol("user id");

console.log(s1.description); // "user id" – just a description, not the value
console.log(s1 === s2);      // false – descriptions don't affect uniqueness
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is property string? | Check if the key is in quotes or accessed with `.` (string). |
| Or Symbol? | Check if the key is created with `Symbol()` and accessed with bracket notation. |
| Why can't I see this property in Object.keys? | It's a Symbol key. Use `Object.getOwnPropertySymbols()`. |
| Why can't I access user.id? | The key is a Symbol, not the string "id". You need the Symbol reference. |

---

# Chapter 2 — Global Symbols

## Symbol.for()

Creates/reuses symbols in a global registry.

```javascript
const s1 = Symbol.for("user");
const s2 = Symbol.for("user");
```

Result:

```javascript
s1 === s2
```

Output:

```text
true
```

---

## Regular Symbols vs Global Symbols

```javascript
// Regular symbols – always unique
const a = Symbol("key");
const b = Symbol("key");
console.log(a === b); // false

// Global symbols – shared by key
const c = Symbol.for("key");
const d = Symbol.for("key");
console.log(c === d); // true
```

---

## Symbol.keyFor()

Retrieves the key from a global symbol:

```javascript
const sym = Symbol.for("app.role");
console.log(Symbol.keyFor(sym)); // "app.role"

const localSym = Symbol("local");
console.log(Symbol.keyFor(localSym)); // undefined (not in registry)
```

---

## Use Case: Cross-realm Communication

Symbols from different realms (e.g., iframe, different windows) can share global symbols:

```javascript
// In iframe 1
const shared = Symbol.for("shared");

// In iframe 2
const shared = Symbol.for("shared");

console.log(shared1 === shared2); // true (same global registry)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this Symbol shared globally? | Check if it was created with `Symbol.for()` instead of `Symbol()`. |
| Can two parts of an app share a Symbol? | Yes, use `Symbol.for("key")` to get the same Symbol by string key. |
| What is the key for this global Symbol? | Use `Symbol.keyFor(sym)`. |

---

# Chapter 3 — Iterator Protocol

## What is an Iterator?

An object that provides sequential access to values. It contains a `next()` method that returns:

```javascript
{
    value: <any>,
    done: <boolean>
}
```

---

## The Protocol

```javascript
// An object is iterable if it has Symbol.iterator
// Symbol.iterator is a function that returns an iterator
// The iterator has next() → { value, done }
```

---

## Example: Array Iterator

```javascript
let arr = [10, 20, 30];

let iterator = arr[Symbol.iterator]();
```

First call:

```javascript
iterator.next()
```

Output:

```javascript
{ value: 10, done: false }
```

Second:

```javascript
iterator.next()
```

Output:

```javascript
{ value: 20, done: false }
```

Third:

```javascript
iterator.next()
```

Output:

```javascript
{ value: 30, done: false }
```

Fourth (exhausted):

```javascript
iterator.next()
```

Output:

```javascript
{ value: undefined, done: true }
```

---

## Memory Diagram

```text
Array [10, 20, 30]
 │
 └── [Symbol.iterator] → function (creates iterator)
                           │
                           ▼
                        Iterator Object
                         │
                         └── next() → { value: 10, done: false }
                                      { value: 20, done: false }
                                      { value: 30, done: false }
                                      { value: undefined, done: true }
```

---

## Built-in Iterables

```javascript
// Arrays
[1, 2, 3][Symbol.iterator]();

// Strings
"Hello"[Symbol.iterator]();

// Maps
new Map()[Symbol.iterator]();

// Sets
new Set()[Symbol.iterator]();

// NodeList
document.querySelectorAll("div")[Symbol.iterator]();

// arguments (legacy)
function() { arguments[Symbol.iterator](); }
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How does for...of work internally? | It calls `Symbol.iterator`, gets an iterator, and repeatedly calls `next()` until `done: true`. |
| Is this object iterable? | Check if it has `[Symbol.iterator]` property. |
| What happens if I call next() after iteration ends? | Returns `{ done: true }` indefinitely. |

---

# Chapter 4 — Manual Iterator Usage

## Walking Through an Iterator

```javascript
let arr = [10, 20, 30];

let iterator = arr[Symbol.iterator]();

let result;

while (!(result = iterator.next()).done) {
    console.log(result.value); // 10, 20, 30
}
```

---

## Spread Operator Uses Iteration

```javascript
// Spread calls Symbol.iterator internally
const arr = [1, 2, 3];
const copy = [...arr]; // Creates new array via iteration

const str = "Hi";
const chars = [...str]; // ['H', 'i']
```

---

## Array.from Uses Iteration

```javascript
const set = new Set([1, 2, 3]);
const arr = Array.from(set); // [1, 2, 3] – uses iteration

// Also accepts a map function
const doubled = Array.from(set, x => x * 2); // [2, 4, 6]
```

---

## Destructuring Uses Iteration

```javascript
const [a, b] = [10, 20]; // Works because arrays are iterable

const [x, y] = "Hi";     // Strings are iterable too
console.log(x, y);        // "H" "i"
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What triggers iteration? | `for...of`, spread (`...`), `Array.from()`, destructuring, `Promise.all()` (for iterables). |
| Can I manually iterate? | Yes. Get the iterator, call `next()` in a loop until `done`. |
| What if an object is not iterable? | `for...of` throws `TypeError`. Add `Symbol.iterator` to make it iterable. |

---

# Chapter 5 — for...of Internals

## What Happens Under the Hood

Code:

```javascript
for (let x of arr)
{
    console.log(x);
}
```

Internally:

```javascript
let iterator = arr[Symbol.iterator]();

while (true)
{
    let result = iterator.next();

    if (result.done)
        break;

    console.log(result.value);
}
```

---

## for...of with Break

```javascript
for (let x of arr) {
    if (x > 15) break;
    console.log(x);
}
```

Internally calls `return()` on the iterator if it exists (for cleanup in generators).

---

## for...of over Non-Iterables

```javascript
const obj = { name: "John" };

for (let x of obj) {
    // TypeError: obj is not iterable
}
```

Fix: make it iterable (add `Symbol.iterator`).

---

## for...of vs for...in

| Feature | `for...of` | `for...in` |
|---------|------------|------------|
| Iterates over | Values | Keys (property names) |
| Works on | Iterables (Array, Map, Set, String) | Objects (any enumerable properties) |
| Includes prototype properties | No | Yes |
| Use with | Arrays, iterables | Plain objects, debugging |

```javascript
const arr = ["a", "b", "c"];

for (let x of arr) console.log(x); // "a", "b", "c" (values)
for (let x in arr) console.log(x); // "0", "1", "2" (indices)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which iterator supplies values? | The object's `[Symbol.iterator]()` function. |
| Does `for...of` work on plain objects? | No. Plain objects are not iterable by default. |
| Can I break out of `for...of`? | Yes. `break`, `return`, or `throw` all work. |
| Does `for...of` handle the iterator cleanup? | Yes. It calls `iterator.return()` if the loop exits early. |

---

# Chapter 6 — Custom Iterator

## Making Any Object Iterable

To make an object iterable, add a `[Symbol.iterator]` function that returns an iterator (an object with `next()`).

```javascript
let counter = {
    start: 1,
    end: 3,

    [Symbol.iterator]() {
        let current = this.start;
        let last = this.end;

        return {
            next() {
                if (current <= last) {
                    return {
                        value: current++,
                        done: false
                    };
                }

                return {
                    done: true
                };
            }
        };
    }
};
```

---

## Using the Custom Iterator

```javascript
for (let x of counter) {
    console.log(x); // 1, 2, 3
}

console.log([...counter]); // [1, 2, 3]

const [first, second] = counter;
console.log(first, second); // 1 2
```

---

## Iterator with return() (Cleanup)

```javascript
let iterable = {
    [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                i++;
                if (i <= 5) return { value: i, done: false };
                return { done: true };
            },
            return() {
                console.log("Iterator cleaned up!");
                return { done: true };
            }
        };
    }
};

for (let x of iterable) {
    if (x > 2) break; // Triggers return()
}
// "Iterator cleaned up!"
```

---

## Practical Example: Range Iterator

```javascript
function range(start, end, step = 1) {
    return {
        [Symbol.iterator]() {
            let current = start;
            return {
                next() {
                    if (current <= end) {
                        const value = current;
                        current += step;
                        return { value, done: false };
                    }
                    return { done: true };
                }
            };
        }
    };
}

for (const n of range(1, 10, 2)) {
    console.log(n); // 1, 3, 5, 7, 9
}

console.log([...range(5, 15, 5)]); // [5, 10, 15]
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How to make an object iterable? | Add a `[Symbol.iterator]()` method that returns an iterator object with `next()`. |
| What must `next()` return? | `{ value: any, done: boolean }`. |
| What is `return()` for? | Cleanup when iteration ends early (break, error). |
| Does `[Symbol.iterator]` need to return a new iterator each time? | Yes. Multiple `for...of` loops should each get a fresh iterator. |

---

# Chapter 7 — Generators

## What is a Generator?

A special function that can pause and resume execution. It returns a **Generator object** that is both iterable and an iterator.

```javascript
function* generate()
{
}
```

The `*` marks it as a generator.

---

## Yielding Values

```javascript
function* numbers()
{
    yield 1;
    yield 2;
    yield 3;
}
```

---

## Creating and Using a Generator

```javascript
let g = numbers();

console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true }
```

---

## Generators are Iterable

```javascript
function* colors() {
    yield "red";
    yield "green";
    yield "blue";
}

for (const c of colors()) {
    console.log(c); // "red", "green", "blue"
}

console.log([...colors()]); // ["red", "green", "blue"]
```

---

## Memory Diagram

```text
function* numbers() { yield 1; yield 2; yield 3; }
                           │
                           ▼
Generator Object (returned by numbers())
 │
 ├── next() → resumes execution until next yield
 ├── return() → finishes the generator
 ├── throw() → throws error into the generator
 │
 └── [Symbol.iterator]() → returns itself (generator is its own iterator)

State: "suspended" (paused at yield)
       "closed" (after return/done)
```

---

## Generator Execution State

```javascript
function* demo() {
    console.log("A");
    yield 1;
    console.log("B");
    yield 2;
    console.log("C");
}

const g = demo();
console.log("Created – generator is suspended");

console.log(g.next()); // logs "A", returns { value: 1, done: false }
console.log(g.next()); // logs "B", returns { value: 2, done: false }
console.log(g.next()); // logs "C", returns { value: undefined, done: true }
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why isn't function finished? | Because `yield` pauses execution. The generator is "suspended" until the next `.next()` call. |
| Does the generator run on creation? | No. `function*()` returns a generator object, but the body does NOT execute until the first `.next()`. |
| Is a generator an iterator? | Yes. It has `next()`, `return()`, `throw()`, and `[Symbol.iterator]`. |
| Can a generator be `for...of`-ed? | Yes, because it's iterable. |

---

# Chapter 8 — yield

## Pause and Resume

`yield` acts like:

```text
pause – return a value – wait for next call – resume
```

---

Example:

```javascript
function* test()
{
    console.log("A");
    yield 1;
    console.log("B");
    yield 2;
}
```

Sequence:

```text
g.next()  → A (log), yields 1, pauses
g.next()  → B (log), yields 2, pauses
g.next()  → (no more yields), done
```

---

## yield Sends a Value Out

```javascript
function* producer() {
    yield "first";
    yield "second";
}
```

The value after `yield` is what `next()` returns as `value`.

---

## yield Receives a Value In (Two-Way)

```javascript
function* twoWay() {
    const x = yield "give me something";
    console.log("Received:", x);
    const y = yield "give me more";
    console.log("Received:", y);
    return x + y;
}

const g = twoWay();
console.log(g.next());        // { value: "give me something", done: false }
console.log(g.next(10));      // logs "Received: 10", { value: "give me more", done: false }
console.log(g.next(20));      // logs "Received: 20", { value: 30, done: true }
```

The argument to `next()` becomes the **result of `yield`** inside the generator.

---

## yield* Delegation

A generator can delegate to another generator:

```javascript
function* inner() {
    yield "a";
    yield "b";
}

function* outer() {
    yield "x";
    yield* inner(); // Delegates to inner generator
    yield "y";
}

console.log([...outer()]); // ["x", "a", "b", "y"]
```

---

## yield* with Iterables

```javascript
function* flatten(...iterables) {
    for (const iterable of iterables) {
        yield* iterable; // Delegates to any iterable
    }
}

const flat = flatten([1, 2], "Hi", new Set([3, 4]));
console.log([...flat]); // [1, 2, "H", "i", 3, 4]
```

---

## Generator Return

```javascript
function* withReturn() {
    yield 1;
    yield 2;
    return 3; // Done with a value
}

const g = withReturn();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: true }  ← return value

// for...of ignores the return value:
for (const v of withReturn()) {
    console.log(v); // 1, 2 (3 is not included)
}
```

---

## Generator Throw

```javascript
function* safe() {
    try {
        yield "try this";
        yield "this will be skipped";
    } catch (err) {
        console.log("Caught inside:", err.message);
        yield "recovered";
    }
}

const g = safe();
console.log(g.next());              // { value: "try this", done: false }
console.log(g.throw(new Error("Oops"))); // Caught inside: Oops
                                         // { value: "recovered", done: false }
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does `yield` do? | Pauses execution, returns a value to the caller. |
| Can you send values back into a generator? | Yes. `next(value)` – the value becomes the result of the `yield` expression. |
| What is `yield*`? | Delegates to another generator or iterable. |
| Can a generator catch errors from outside? | Yes. `generator.throw(error)` injects an error at the yield point. |

---

# Chapter 9 — Map

## Limitations of Objects

```javascript
const obj = {};
obj["name"] = "John";
```

Problems:

1. Keys are always strings (or symbols)
2. No order guarantee (though modern engines preserve insertion order for string keys)
3. No `.size` property
4. Not iterable by default (can't `for...of`)
5. No built-in methods for common operations

---

## Map: A Better Key-Value Store

```javascript
let map = new Map();
```

Add:

```javascript
map.set("name", "John");
```

Read:

```javascript
map.get("name"); // "John"
```

Delete:

```javascript
map.delete("name"); // true (false if key didn't exist)
```

---

## Map Methods

```javascript
const map = new Map();

map.set("key", "value");     // Add/update entry
map.get("key");              // Read entry ("value")
map.has("key");              // Check existence (true/false)
map.delete("key");           // Remove entry (true/false)
map.clear();                 // Remove all entries
map.size;                    // Number of entries

// Iteration
map.keys();                  // Iterator over keys
map.values();                // Iterator over values
map.entries();               // Iterator over [key, value] pairs (default)
map.forEach((value, key) => {}); // Callback for each entry

// Convert to array
const entries = [...map];          // [[key1, val1], [key2, val2]]
const keys = [...map.keys()];
const values = [...map.values()];
```

---

## Map vs Object

| Feature | Object | Map |
|---------|--------|-----|
| Key types | String or Symbol | Any type (object, function, primitive) |
| Key order | Integer keys first, then insertion order | Insertion order |
| Size | Manual (`Object.keys(obj).length`) | `.size` property |
| Iteration | `for...in`, `Object.keys/values/entries` | `for...of`, `.keys()`, `.values()`, `.entries()` |
| Performance | Good for small, static sets | Good for frequent additions/removals |
| JSON support | `JSON.stringify` native | No direct serialization |
| Prototype | Has prototype (may cause key collisions) | No prototype chain interference |

---

## Object Keys in Map

```javascript
const user = { name: "John" };
const settings = { theme: "dark" };

const map = new Map();
map.set(user, "admin");
map.set(settings, { fontSize: 14 });

console.log(map.get(user));     // "admin"
console.log(map.get(settings)); // { fontSize: 14 }
```

---

## Map Initialization

```javascript
// From array of [key, value] pairs
const map = new Map([
    ["name", "John"],
    ["age", 30],
    ["role", "admin"]
]);

console.log(map.size); // 3

// From another Map
const clone = new Map(map);

// Chaining
map.set("a", 1).set("b", 2).set("c", 3);
```

---

## Map Serialization

```javascript
const map = new Map([
    ["name", "John"],
    ["age", 30]
]);

// Convert to object (if keys are strings)
const obj = Object.fromEntries(map);
console.log(obj); // { name: "John", age: 30 }

// Convert to JSON
const json = JSON.stringify(Object.fromEntries(map));
// {"name":"John","age":30}

// Restore from JSON
const restored = new Map(Object.entries(JSON.parse(json)));
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need ordered keys? | Use Map (guaranteed insertion order). |
| Need object keys? | Use Map (objects as keys). Object converts keys to strings. |
| Need size property? | Map has `.size`. Object needs `Object.keys().length`. |
| Use Map? | When you need non-string keys, frequent additions/removals, or iteration. |

---

# Chapter 10 — Object Key Problem

## Objects Convert Keys to Strings

```javascript
const obj = {};

obj[1] = "A";
obj["1"] = "B"; // Overwrites the same key

console.log(obj); // { "1": "B" }
```

Actually:

```text
Key "1" (number 1 is coerced to string "1")
```

---

## Map Preserves Key Type

```javascript
const map = new Map();

map.set(1, "A");   // Number key
map.set("1", "B"); // String key – different!

console.log(map.get(1));  // "A"
console.log(map.get("1")); // "B"
console.log(map.size);     // 2 (two distinct keys)
```

---

## Objects Can Even Be Keys in Map

```javascript
const user1 = { id: 1 };
const user2 = { id: 2 };

const roles = new Map();
roles.set(user1, "admin");
roles.set(user2, "editor");

console.log(roles.get(user1));  // "admin"
console.log(roles.get(user2));  // "editor"

// Two different objects with same content are different keys
const user3 = { id: 1 };
console.log(roles.get(user3));  // undefined (different reference)
```

---

## NaN as a Key

```javascript
const map = new Map();
map.set(NaN, "not a number");
console.log(map.get(NaN)); // "not a number"

const obj = {};
obj[NaN] = "works";
console.log(obj[NaN]); // "works" but NaN becomes string "NaN"
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why is 1 and "1" the same in an object? | Objects coerce keys to strings. |
| Why are they different in a Map? | Map uses strict equality for keys (same-value-zero). |
| Can I use objects as keys in an object? | No. Objects become "[object Object]" as string keys. Use Map. |

---

# Chapter 11 — Set

## Unique Values Only

Stores unique values of any type.

```javascript
let set = new Set();
```

Add:

```javascript
set.add(10);
set.add(10); // Ignored (duplicate)
set.add(20);
```

Result:

```text
Set(2) { 10, 20 }
```

---

## Set Methods

```javascript
const set = new Set();

set.add("apple");        // Add value
set.has("apple");        // Check existence (true/false)
set.delete("apple");     // Remove value (true/false)
set.clear();             // Remove all values
set.size;                // Number of values

// Iteration
set.values();            // Iterator over values (same as keys())
set.keys();              // Same as values() (for Map compatibility)
set.entries();           // Iterator over [value, value] pairs
set.forEach(value => {});

// Convert to array
const arr = [...set];
const arr2 = Array.from(set);
```

---

## Removing Duplicates from Arrays

```javascript
const arr = [1, 1, 2, 2, 3, 3, 1, 2];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3]
```

---

## Set Operations

```javascript
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...a, ...b]);
console.log([...union]); // [1, 2, 3, 4, 5, 6]

// Intersection
const intersection = new Set([...a].filter(x => b.has(x)));
console.log([...intersection]); // [3, 4]

// Difference
const difference = new Set([...a].filter(x => !b.has(x)));
console.log([...difference]); // [1, 2]
```

---

## Set with Objects

```javascript
const set = new Set();
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 1 }; // Same content, different reference

set.add(obj1);
set.add(obj2);
set.add(obj3); // Different reference → different entry

console.log(set.size); // 3 (all are distinct references)

set.add(obj1); // Duplicate reference → ignored
console.log(set.size); // 3
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why use Set? | When you need unique values and don't need key-value pairs. |
| How to remove duplicates from array? | `[...new Set(arr)]`. |
| Can Set hold mixed types? | Yes: `set.add(1).add("1").add({})` – all distinct. |
| How is equality determined? | SameValueZero (like `===` but `NaN` equals `NaN`). |

---

# Chapter 12 — WeakMap

## Memory-Aware Key-Value Store

Keys must be objects. Values can be anything.

```javascript
let wm = new WeakMap();
```

---

## Example

```javascript
let user = { name: "John" };
let metadata = { lastLogin: Date.now() };

wm.set(user, metadata);

// Later:
console.log(wm.get(user)); // { lastLogin: ... }
```

---

## Automatic Garbage Collection

When the key object is no longer referenced:

```javascript
let user = { name: "John" };
wm.set(user, "some data");

user = null; // The WeakMap entry is automatically removed
             // GC can collect the { name: "John" } object
```

---

## WeakMap Limitations

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any | Object only |
| Iterable | Yes | No |
| `.size` | Yes | No |
| `.clear()` | Yes | No |
| `.keys()`, `.values()`, `.entries()` | Yes | No |
| Prevents GC of keys | Yes (holds strong reference) | No (weak reference) |

```javascript
const wm = new WeakMap();

// These will throw:
wm.size;         // undefined (not available)
wm.keys();       // TypeError: wm.keys is not a function
for (let k of wm) {} // TypeError: wm is not iterable
wm.clear();      // TypeError: wm.clear is not a function
```

---

## Use Cases for WeakMap

### 1. Private Data

```javascript
const privateData = new WeakMap();

class Person {
    constructor(name) {
        privateData.set(this, { name });
    }

    getName() {
        return privateData.get(this).name;
    }
}

const p = new Person("John");
console.log(p.getName()); // "John"
console.log(p.name);      // undefined (private)
```

### 2. Caching without Memory Leaks

```javascript
const cache = new WeakMap();

function process(obj) {
    if (cache.has(obj)) {
        return cache.get(obj);
    }
    
    const result = expensiveComputation(obj);
    cache.set(obj, result);
    return result;
}
// When obj is no longer used, the cache entry is automatically cleaned up
```

### 3. DOM Node Metadata

```javascript
const nodeData = new WeakMap();

function trackClicks(element) {
    if (!nodeData.has(element)) {
        nodeData.set(element, { clickCount: 0 });
    }
    
    element.addEventListener("click", () => {
        const data = nodeData.get(element);
        data.clickCount++;
        console.log(`Clicked ${data.clickCount} times`);
    });
}
// When element is removed from DOM, the WeakMap entry is GC'd automatically
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Should memory disappear automatically? | Use WeakMap/WeakSet if you want entries to be GC'd when keys are no longer referenced. |
| Why can't I iterate a WeakMap? | Because the contents could change at any time (when GC runs). Iteration would be unpredictable. |
| When to use WeakMap over Map? | When the key has a limited lifetime and you don't want to prevent GC. |

---

# Chapter 13 — WeakSet

## Object-Only, Auto-Cleaned Set

Similar to WeakMap but stores only object values (no key-value pairs).

```javascript
let ws = new WeakSet();
```

---

## Example

```javascript
let user1 = { name: "Alice" };
let user2 = { name: "Bob" };

ws.add(user1);
ws.add(user2);

console.log(ws.has(user1)); // true

user1 = null; // user1 is removed from WeakSet automatically
```

---

## Use Case: Marking Objects

```javascript
const processed = new WeakSet();

function processItem(item) {
    if (processed.has(item)) {
        return; // Already processed
    }
    
    // ... do processing ...
    processed.add(item);
}

// When item is no longer referenced, it's auto-removed from WeakSet
```

---

## Limitations (Same as WeakMap)

```javascript
const ws = new WeakSet();

ws.add({}); // Works
ws.add(42); // TypeError: Invalid value used in weak set (must be object)

ws.size;        // undefined
ws.forEach();   // TypeError
for (let v of ws) {} // TypeError
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| When to use WeakSet? | When you need to "tag" objects without preventing their garbage collection. |
| Can WeakSet hold primitives? | No. Only objects. |
| How is WeakSet different from Set? | WeakSet holds weak references (GC-friendly), is not iterable, has no `.size`. |

---

# Chapter 14 — Property Descriptors

## Hidden Attributes of Properties

Every property has a descriptor that controls its behavior.

```javascript
Object.getOwnPropertyDescriptor()
```

---

Descriptor for a regular property:

```javascript
const obj = { name: "John" };

const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
console.log(descriptor);
// {
//   value: "John",
//   writable: true,      ← Can the value be changed?
//   enumerable: true,    ← Does it appear in loops?
//   configurable: true   ← Can the property be deleted or reconfigured?
// }
```

---

## Descriptor Meanings

### writable

```javascript
const obj = {};
Object.defineProperty(obj, "fixed", {
    value: 42,
    writable: false // Can't be changed
});

obj.fixed = 100; // Silently ignored (or TypeError in strict mode)
console.log(obj.fixed); // 42
```

### enumerable

```javascript
const obj = {};
Object.defineProperty(obj, "hidden", {
    value: "secret",
    enumerable: false // Won't appear in for...in, Object.keys
});

console.log(Object.keys(obj));   // [] (hidden excluded)
console.log(obj.hidden);         // "secret" (still accessible directly)
```

### configurable

```javascript
const obj = {};
Object.defineProperty(obj, "locked", {
    value: 42,
    configurable: false // Can't be deleted, can't change descriptor
});

delete obj.locked; // Silently ignored
console.log(obj.locked); // 42

// Also can't change descriptor:
Object.defineProperty(obj, "locked", { writable: true });
// TypeError: Cannot redefine property: locked
```

---

## Creating Properties with Descriptors

```javascript
Object.defineProperty(
    obj,
    "name",
    {
        writable: false,
        enumerable: true,
        configurable: true,
        value: "John"
    }
);
```

---

## Multiple Properties at Once

```javascript
Object.defineProperties(obj, {
    name: {
        value: "John",
        writable: true,
        enumerable: true,
        configurable: true
    },
    id: {
        value: 123,
        writable: false,
        enumerable: false,
        configurable: false
    }
});
```

---

## Accessor Properties (Getters/Setters)

Instead of `value` and `writable`, use `get` and `set`:

```javascript
const user = {
    firstName: "John",
    lastName: "Doe"
};

Object.defineProperty(user, "fullName", {
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
        [this.firstName, this.lastName] = value.split(" ");
    },
    enumerable: true,
    configurable: true
});

console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
console.log(user.lastName);  // "Smith"
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why property cannot change? | Check `writable` descriptor. If false, the value is read-only. |
| Why does property not appear in loops? | Check `enumerable` descriptor. If false, it's hidden. |
| Why can't I delete this property? | Check `configurable` descriptor. If false, it's locked. |
| Is this a data property or accessor? | Data: has `value`/`writable`. Accessor: has `get`/`set`. |

---

# Chapter 15 — Object.freeze(), Object.seal(), Object.preventExtensions()

## Object.freeze()

Completely locks an object. Cannot add, delete, or modify properties.

```javascript
const user = { name: "John", age: 30 };
Object.freeze(user);

user.name = "Jane";  // Ignored (strict mode: TypeError)
user.city = "NYC";   // Ignored
delete user.age;     // Ignored

console.log(user); // { name: "John", age: 30 }
```

Deep freeze (shallow by default):

```javascript
function deepFreeze(obj) {
    Object.freeze(obj);
    for (const key of Object.getOwnPropertyNames(obj)) {
        const val = obj[key];
        if (val && typeof val === "object" && !Object.isFrozen(val)) {
            deepFreeze(val);
        }
    }
    return obj;
}
```

---

## Object.seal()

Can modify existing properties. Cannot add or delete.

```javascript
const user = { name: "John" };
Object.seal(user);

user.name = "Jane";  // Works (modify allowed)
user.age = 30;       // Ignored (add blocked)
delete user.name;    // Ignored (delete blocked)
```

---

## Object.preventExtensions()

Only blocks new properties.

```javascript
const user = { name: "John" };
Object.preventExtensions(user);

user.age = 30;   // Ignored (add blocked)
user.name = "Jane"; // Works (modify allowed)
delete user.name;   // Works (delete allowed)
```

---

## Checking the State

```javascript
Object.isFrozen(obj);           // true if frozen
Object.isSealed(obj);           // true if sealed
Object.isExtensible(obj);       // false if preventExtensions was called
```

---

## Comparison

| Method | Add properties | Delete properties | Modify properties | Reconfigure descriptors |
|--------|---------------|------------------|------------------|------------------------|
| `freeze()` | No | No | No | No |
| `seal()` | No | No | Yes | No |
| `preventExtensions()` | No | Yes | Yes | Yes (if configurable) |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is object frozen? | `Object.isFrozen(obj)` returns true. |
| Is object sealed? | `Object.isSealed(obj)` returns true (but not frozen). |
| Can this object be extended? | `Object.isExtensible(obj)` returns false if preventExtensions/seal/freeze was called. |
| Why can't I add a property? | The object is sealed, frozen, or had `preventExtensions` called. |

---

# Chapter 16 — Optional Chaining (?.)

## Safe Nested Property Access

Without optional chaining:

```javascript
// Without: crashes if address is undefined
const city = user.address.city; // TypeError: Cannot read properties of undefined

// Without: manual checks
const city = user && user.address && user.address.city;
```

---

With optional chaining:

```javascript
user?.address?.city
```

Returns `undefined` if any part of the chain is `null` or `undefined`, instead of throwing.

---

## Usage Examples

```javascript
// Property access
const name = user?.profile?.name; // undefined if user or profile is null/undefined

// Method calls
const result = obj?.method?.(); // undefined if obj or obj.method is null/undefined

// Dynamic property
const value = obj?.[key]; // undefined if obj is null/undefined

// Array index
const first = arr?.[0]; // undefined if arr is null/undefined
```

---

## Short-Circuiting

```javascript
// If user is null/undefined, the chain stops immediately
// city and getAddress are never evaluated
const city = user?.address?.city;

// Method call with short-circuit
const length = str?.trim?.().length;
// If str is null/undefined → undefined (doesn't call trim)
// If str doesn't have trim → undefined
```

---

## Optional Chaining with Delete

```javascript
delete user?.address?.city; // Only delete if user and address exist
```

---

## Cannot Use on the Left Side of Assignment

```javascript
// SyntaxError: Invalid left-hand side in assignment
user?.name = "John";
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why did this expression return undefined instead of throwing? | Optional chaining (`?.`) short-circuits on null/undefined. |
| Is `?.` the same as `.`? | No. `?.` returns undefined for null/undefined. `.` throws TypeError. |
| Can I use `?.` for method calls? | Yes: `obj.method?.()`. |

---

# Chapter 17 — Nullish Coalescing (??)

## Default Value for null/undefined

```javascript
let name = userName ?? "Guest";
```

Returns the right side **only** when the left side is `null` or `undefined`.

---

## ?? vs ||

```javascript
const value1 = 0 ?? "default";   // 0 (0 is not null/undefined)
const value2 = 0 || "default";   // "default" (0 is falsy)

const value3 = "" ?? "default";  // "" (empty string is not null/undefined)
const value4 = "" || "default";  // "default" (empty string is falsy)

const value5 = false ?? true;    // false
const value6 = false || true;    // true

const value7 = null ?? "default";  // "default"
const value8 = undefined ?? "default"; // "default"
```

---

## When to Use Which

| Use `||` when | Use `??` when |
|---------------|---------------|
| You want to treat `0`, `""`, `false` as "no value" | You only want to treat `null`/`undefined` as "no value" |
| Default for missing strings | Default for potentially null variables |
| Fallback for any falsy value | Preserving valid falsy values (0, "", false) |

---

## Chaining with Optional Chaining

```javascript
const city = user?.address?.city ?? "Unknown City";
// If any part is null/undefined → "Unknown City"
```

---

## Cannot Use ?? with && or || Without Parentheses

```javascript
// Error: must use parentheses
const x = a ?? b || c;   // SyntaxError

// Correct:
const x = (a ?? b) || c;
const x = a ?? (b || c);
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why is `0 ?? "default"` returning 0? | Because `??` only checks for null/undefined, not falsy values. |
| What's the difference between `??` and `||`? | `||` checks falsy (0, "", false, null, undefined). `??` checks null/undefined only. |
| When should I use `??`? | When 0, "", or false are valid values but null/undefined are not. |

---

# Chapter 18 — BigInt

## Handling Large Integers

Normal number limits:

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// Beyond this range, precision is lost:
console.log(9007199254740993); // 9007199254740992 (wrong!)
```

---

## Creating BigInt

```javascript
// Using n suffix
const big = 123456789123456789n;

// Using BigInt function
const big2 = BigInt("123456789123456789");
const big3 = BigInt(42); // From number (but must be within safe range)
```

---

## BigInt Operations

```javascript
const a = 1000000000000000000n;
const b = 2000000000000000000n;

console.log(a + b);          // 3000000000000000000n
console.log(a * b);          // 2000000000000000000000000000000000000n
console.log(b - a);          // 1000000000000000000n
console.log(b / a);          // 2n (truncates, no decimal)
console.log(a % b);          // 1000000000000000000n
console.log(a ** 2n);        // 1000000000000000000000000000000000000n
```

---

## Cannot Mix with Regular Numbers

```javascript
const big = 10n;
const num = 5;

console.log(big + num); // TypeError: Cannot mix BigInt and other types
console.log(big + BigInt(num)); // 15n
console.log(Number(big) + num); // 15 (but may lose precision)
```

---

## Comparisons

```javascript
console.log(10n === 10);  // false (different types)
console.log(10n == 10);   // true (loose equality)
console.log(10n > 5);     // true
console.log(10n < 15);    // true
```

---

## Boolean Context

```javascript
if (0n) {}    // false (0n is falsy)
if (1n) {}    // true
if (100n) {}  // true

console.log(!0n);  // true
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why is the large number losing precision? | Regular Number can only safely represent integers up to 2^53. Use BigInt. |
| Can I mix BigInt and Number? | No. Convert explicitly with `BigInt()` or `Number()`. |
| When to use BigInt? | When dealing with integers larger than 2^53 - 1 (e.g., timestamps, IDs, cryptographic values). |

---

# Chapter 19 — Regular Expressions

## Creating Regex

```javascript
// Literal syntax (recommended)
let regex = /abc/;

// Constructor (dynamic patterns)
let regex = new RegExp("abc");
```

---

## Methods

```javascript
const text = "Hello world 123";

// test(): returns boolean
console.log(/world/.test(text));  // true
console.log(/xyz/.test(text));    // false

// exec(): returns match info
const match = /world/.exec(text);
console.log(match[0]);   // "world"
console.log(match.index); // 6

// String methods using regex
console.log(text.match(/\d+/));      // ["123"]
console.log(text.replace(/\d+/, "###")); // "Hello world ###"
console.log(text.search(/world/));   // 6
console.log(text.split(/\s+/));      // ["Hello", "world", "123"]
```

---

## Common Patterns

```text
\d  → digit (0-9)
\w  → word character (alphanumeric + underscore)
\s  → whitespace (space, tab, newline)
\D  → not a digit
\W  → not a word character
\S  → not whitespace

^   → start of string
$   → end of string
.   → any character (except newline)

*   → zero or more
+   → one or more
?   → zero or one (also lazy quantifier)
{n} → exactly n times
{n,} → at least n times
{n,m} → between n and m times

[]  → character class [a-z], [0-9], [aeiou]
[^] → negated class [^0-9] (not digit)
|   → OR (cat|dog)
()  → capture group
(?:) → non-capturing group
```

---

## Flags

```javascript
/abc/g  → global (find all matches)
/abc/i  → case insensitive
/abc/m  → multiline (^ and $ match line boundaries)
/abc/s  → dotAll (. matches newlines)
/abc/u  → unicode (enable unicode features)
/abc/y  → sticky (match from lastIndex)
```

---

## Example: Email Validation

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailRegex.test("user@example.com"));   // true
console.log(emailRegex.test("invalid-email"));       // false
console.log(emailRegex.test("@domain.com"));          // false
```

---

## Example: Password Strength

```javascript
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/;

// At least 8 chars, one uppercase, one lowercase, one digit, one special char
console.log(passwordRegex.test("Hello1!a"));   // true
console.log(passwordRegex.test("weak"));       // false
```

---

## Example: URL Extraction

```javascript
const urlRegex = /https?:\/\/[^\s]+/g;

const text = "Visit https://example.com and http://test.org";
console.log(text.match(urlRegex));
// ["https://example.com", "http://test.org"]
```

---

## Capturing Groups

```javascript
const phoneRegex = /\((\d{3})\) (\d{3})-(\d{4})/;
const match = "(555) 123-4567".match(phoneRegex);

console.log(match[0]); // "(555) 123-4567" (full match)
console.log(match[1]); // "555" (area code)
console.log(match[2]); // "123" (exchange)
console.log(match[3]); // "4567" (line number)
```

---

## Replacement with Groups

```javascript
const date = "2025-01-15";
const formatted = date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
console.log(formatted); // "15/01/2025"

// Using a function
const expanded = date.replace(/(\d{4})-(\d{2})-(\d{2})/, (match, year, month, day) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
});
console.log(expanded); // "Jan 15, 2025"
```

---

## Lookahead and Lookbehind

```javascript
// Positive lookahead: match followed by pattern
const price = "100 USD";
console.log(price.match(/\d+(?=\s*USD)/)); // ["100"]

// Negative lookahead: match NOT followed by pattern
console.log(price.match(/\d+(?!\s*USD)/)); // null (100 is followed by USD)

// Positive lookbehind: match preceded by pattern
const currency = "$100";
console.log(currency.match(/(?<=\$)\d+/)); // ["100"]

// Negative lookbehind: match NOT preceded by pattern
console.log(currency.match(/(?<!\$)\d+/)); // null (100 is preceded by $)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What pattern does this regex match? | Read the regex character by character. Test with `regex.test()`. |
| Which text matches? | Use `text.match(regex)` or `regex.exec(text)` to see matched substrings. |
| What do the parentheses capture? | Each `()` creates a capture group accessible via match[1], match[2], etc. |
| Is the regex global or case-insensitive? | Check for `g`, `i`, `m` flags after the closing `/`. |

---

# Chapter 20 — Tagged Template Literals

## Template Literals

```javascript
const name = "John";
const message = `Hello ${name}`;
```

---

## Tagged Templates

A function that receives the template parts and interpolated values:

```javascript
function tag(strings, ...values) {
    console.log(strings); // Array of string parts
    console.log(values);  // Array of interpolated values
    return "processed";
}

const name = "John";
const age = 30;
const result = tag`Hello ${name}, age ${age}`;
// strings: ["Hello ", ", age ", ""]
// values: ["John", 30]
```

---

## How Tagged Templates Work

```javascript
const name = "John";
const result = tag`Hello ${name}!`;
// Equivalent to:
// tag(["Hello ", "!"], "John")
```

The `strings` array always has one more element than `values`.

---

## Practical: Safe HTML Builder

```javascript
function html(strings, ...values) {
    let result = "";
    strings.forEach((str, i) => {
        result += str;
        if (i < values.length) {
            // Escape HTML special characters
            result += String(values[i])
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }
    });
    return result;
}

const userInput = "<script>alert('xss')</script>";
const safe = html`<div>${userInput}</div>`;
console.log(safe); // <div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>
// Safe – no script injection
```

---

## Practical: CSS-in-JS (Styled Components Pattern)

```javascript
const styled = {};

function createStyled(tag) {
    return function(strings, ...values) {
        return function(props = {}) {
            let css = "";
            strings.forEach((str, i) => {
                css += str;
                if (i < values.length) {
                    const value = values[i];
                    css += typeof value === "function" ? value(props) : value;
                }
            });
            const element = document.createElement(tag);
            // In a real library, this would generate unique class names
            element.style.cssText = css;
            return element;
        };
    };
}

// Usage
const Button = createStyled("button")`
    background: ${props => props.primary ? "blue" : "gray"};
    color: white;
    padding: 10px 20px;
`;

const btn = Button({ primary: true });
document.body.appendChild(btn);
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a tagged template? | Look for a function name (or expression) immediately before a template literal. |
| What does the tag function receive? | First argument: array of string parts. Remaining arguments: interpolated values. |
| Why use tagged templates? | Custom processing of template strings (escaping, localization, CSS-in-JS). |

---

# Chapter 21 — Internationalization API (Intl)

## Number Formatting

```javascript
// Currency
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});
console.log(formatter.format(1234567.89)); // "$1,234,567.89"

// Different locales
const deFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
});
console.log(deFormatter.format(1234567.89)); // "1.234.567,89 €"
```

---

## Number Options

```javascript
// Percentage
const pct = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1
});
console.log(pct.format(0.875)); // "87.5%"

// Units
const distance = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "long"
});
console.log(distance.format(42)); // "42 kilometers"

// Compact notation
const compact = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short"
});
console.log(compact.format(1500000)); // "1.5M"
```

---

## Date Formatting

```javascript
const date = new Date("2025-01-15T10:30:00");

// Full date
const full = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});
console.log(full.format(date)); // "Wednesday, January 15, 2025"

// Short date
const short = new Intl.DateTimeFormat("en-US");
console.log(short.format(date)); // "1/15/2025"

// Time
const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
});
console.log(time.format(date)); // "10:30:00 AM"
```

---

## Relative Time

```javascript
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

console.log(rtf.format(-1, "day"));   // "yesterday"
console.log(rtf.format(-3, "day"));   // "3 days ago"
console.log(rtf.format(1, "hour"));   // "in 1 hour"
console.log(rtf.format(0, "minute")); // "now"
```

---

## Plural Rules

```javascript
const plural = new Intl.PluralRules("en-US");
console.log(plural.select(0));  // "other"
console.log(plural.select(1));  // "one"
console.log(plural.select(2));  // "other"

// With categories
const items = ["apple", "banana", "cherry"];
const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction"
});
console.log(formatter.format(items)); // "apple, banana, and cherry"
```

---

## Collation (String Comparison)

```javascript
const names = ["ñuñez", "nunez", "núñez"];

// Default (US) sort
names.sort();
console.log(names); // May not be correct for Spanish

// Language-aware sort
names.sort(new Intl.Collator("es").compare);
console.log(names); // Correct Spanish sort order
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How to format currency for different locales? | `new Intl.NumberFormat(locale, { style: "currency", currency: "..." })`. |
| How to format dates for different locales? | `new Intl.DateTimeFormat(locale, options)`. |
| How to show "2 days ago"? | `new Intl.RelativeTimeFormat("en", { numeric: "auto" })`. |

---

# Chapter 22 — Proxy

## Intercepting Operations

A Proxy wraps an object and intercepts operations on it.

```javascript
new Proxy(target, handler);
```

- `target`: the original object
- `handler`: object with "traps" (methods that intercept operations)

---

## Common Traps

| Trap | Intercepts |
|------|------------|
| `get(target, key, receiver)` | Reading a property |
| `set(target, key, value, receiver)` | Writing a property |
| `has(target, key)` | `in` operator |
| `deleteProperty(target, key)` | `delete` operator |
| `ownKeys(target)` | `Object.keys()`, `for...in` |
| `apply(target, thisArg, args)` | Function call |
| `construct(target, args)` | `new` operator |

---

## Example: get Trap

```javascript
let proxy = new Proxy(user, {
    get(obj, key) {
        console.log(`Accessing property: ${key}`);
        return obj[key];
    }
});

proxy.name; // Logs "Accessing property: name", returns "John"
```

---

## Example: set Trap (Validation)

```javascript
const user = { name: "John", age: 25 };

const proxy = new Proxy(user, {
    set(target, key, value) {
        if (key === "age") {
            if (typeof value !== "number" || value < 0 || value > 150) {
                throw new Error("Invalid age");
            }
        }
        target[key] = value;
        return true; // Signal success
    }
});

proxy.age = 30;  // Works
proxy.age = -5;  // Error: Invalid age
proxy.age = "young"; // Error: Invalid age
```

---

## Example: has Trap (Hiding Properties)

```javascript
const sensitive = { password: "secret", name: "John" };

const proxy = new Proxy(sensitive, {
    has(target, key) {
        if (key === "password") return false;
        return key in target;
    }
});

console.log("password" in proxy); // false (hidden)
console.log("name" in proxy);     // true
```

---

## Example: deleteProperty Trap

```javascript
const protected = new Proxy({ name: "John", id: 42 }, {
    deleteProperty(target, key) {
        if (key === "id") {
            throw new Error("Cannot delete id");
        }
        delete target[key];
        return true;
    }
});

delete protected.name; // Works
delete protected.id;   // Error: Cannot delete id
```

---

## Example: Function Proxy (apply Trap)

```javascript
function add(a, b) {
    return a + b;
}

const loggedAdd = new Proxy(add, {
    apply(target, thisArg, args) {
        console.log(`Called with: ${args}`);
        const result = Reflect.apply(target, thisArg, args);
        console.log(`Result: ${result}`);
        return result;
    }
});

loggedAdd(3, 4);
// Called with: 3,4
// Result: 7
```

---

## Example: Constructor Proxy

```javascript
class User {
    constructor(name) {
        this.name = name;
    }
}

const ProxyUser = new Proxy(User, {
    construct(target, args) {
        console.log(`Creating User with: ${args}`);
        const instance = Reflect.construct(target, args);
        instance.createdAt = Date.now(); // Auto-add timestamp
        return instance;
    }
});

const u = new ProxyUser("John");
// Creating User with: John
console.log(u.name);       // "John"
console.log(u.createdAt);  // 1700000000000
```

---

## Example: Default Values with Proxy

```javascript
function withDefaults(target, defaults) {
    return new Proxy(target, {
        get(target, key) {
            if (!(key in target)) {
                return defaults[key]; // Return default for missing keys
            }
            return target[key];
        }
    });
}

const user = withDefaults({ name: "John" }, { age: 0, role: "viewer" });

console.log(user.name); // "John" (from object)
console.log(user.age);  // 0 (default)
console.log(user.role); // "viewer" (default)
```

---

## Example: Revocable Proxy

```javascript
const { proxy, revoke } = Proxy.revocable({ name: "John" }, {
    get(target, key) {
        console.log(`Accessing ${key}`);
        return target[key];
    }
});

console.log(proxy.name); // "Accessing name" + "John"
revoke(); // Proxy is now disabled
console.log(proxy.name); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who intercepted access? | A Proxy with a `get` trap on the object. |
| Is there validation on write? | Check for a `set` trap that checks values before assigning. |
| Why did this property return a default value? | The `get` trap checks `key in target` and returns a default. |
| Is the Proxy revoked? | `Proxy.revocable()` returns a `revoke` function. After calling it, the proxy throws. |

---

# Chapter 23 — Reflect

## Companion to Proxy

Reflect provides methods that correspond to Proxy traps. Inside Proxy handlers, use Reflect to perform the **default behavior**.

```javascript
Reflect.get()
Reflect.set()
Reflect.has()
Reflect.deleteProperty()
Reflect.defineProperty()
Reflect.ownKeys()
Reflect.apply()
Reflect.construct()
```

---

## Inside Proxy Handlers

```javascript
const proxy = new Proxy(target, {
    get(target, key, receiver) {
        console.log(`Get ${String(key)}`);
        return Reflect.get(target, key, receiver); // Default get behavior
    },
    
    set(target, key, value, receiver) {
        console.log(`Set ${String(key)} = ${value}`);
        return Reflect.set(target, key, value, receiver); // Default set behavior
    }
});
```

---

## Why Use Reflect Instead of Direct Access?

```javascript
// Without Reflect – might miss special behaviors
const proxy = new Proxy(target, {
    get(target, key) {
        return target[key]; // Direct access
        // PROBLEM: doesn't handle getters properly
        // PROBLEM: doesn't pass receiver
        // PROBLEM: doesn't work with Proxies
    }
});

// With Reflect – correct default behavior
const proxy = new Proxy(target, {
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver); // Correct
        // Handles: getters, receiver, nested proxies, symbol keys
    }
});
```

---

## Reflect Methods

```javascript
const obj = { name: "John" };

// Get
console.log(Reflect.get(obj, "name")); // "John"

// Set
Reflect.set(obj, "name", "Jane");
console.log(obj.name); // "Jane"

// Has
console.log(Reflect.has(obj, "name")); // true

// Delete
Reflect.deleteProperty(obj, "name");
console.log(Reflect.has(obj, "name")); // false

// OwnKeys
console.log(Reflect.ownKeys(obj)); // ["name"]

// Define property
Reflect.defineProperty(obj, "id", { value: 1, writable: false });

// Apply
Reflect.apply(Math.max, null, [1, 2, 3]); // 3

// Construct
const date = Reflect.construct(Date, [2025, 0, 15]);
```

---

## Reflect.ownKeys vs Object.keys

```javascript
const obj = {
    name: "John",
    [Symbol("id")]: 123
};

console.log(Object.keys(obj));    // ["name"] – excludes symbols, non-enumerable
console.log(Reflect.ownKeys(obj)); // ["name", Symbol(id)] – includes symbols
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which Reflect method performs this operation? | `get` for reading, `set` for writing, `has` for `in`, etc. |
| Why use Reflect in Proxy handlers? | To correctly implement the default behavior (handles getters, receiver, proxies). |
| What is the difference between Reflect.get and direct access? | `Reflect.get` properly handles getters and the `receiver` parameter. |

---

# Chapter 24 — Meta-programming

## Programs That Manipulate Programs

Meta-programming is code that writes, modifies, or inspects other code (or itself).

Examples in JavaScript:

```text
Proxy          – intercept operations on objects
Reflect        – perform default operations
Property descriptors – control property behavior
Object.freeze / seal / preventExtensions – lock objects
Symbol.wellKnown – customize built-in behavior
eval / Function – execute code from strings (avoid)
```

---

## Proxy: The Most Powerful Meta-programming Tool

```javascript
// Validation
const validated = new Proxy(target, {
    set: (t, k, v) => { /* validate */ return true; }
});

// Logging
const logged = new Proxy(target, {
    get: (t, k) => { console.log(k); return t[k]; }
});

// Virtual properties
const virtual = new Proxy({}, {
    get: (t, k) => k in t ? t[k] : `Virtual: ${String(k)}`
});

// Performance monitoring
const monitored = new Proxy(fn, {
    apply: (t, thisArg, args) => {
        const start = performance.now();
        const result = Reflect.apply(t, thisArg, args);
        console.log(`Took ${performance.now() - start}ms`);
        return result;
    }
});
```

---

## Property Descriptors Control Behavior

```javascript
// Make an API immutable
const config = { apiKey: "abc", endpoint: "https://api.example.com" };
Object.freeze(config); // No changes allowed

// Hide internal properties
Object.defineProperty(obj, "internal", {
    value: secret,
    enumerable: false, // Hidden from loops
    writable: false    // Read-only
});
```

---

## Well-Known Symbols Customize Built-ins

```javascript
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    // Customize toString
    get [Symbol.toStringTag]() {
        return "Range";
    }
    
    // Make iterable
    [Symbol.iterator]() {
        let current = this.start;
        let last = this.end;
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
}

const r = new Range(1, 5);
console.log(Object.prototype.toString.call(r)); // "[object Range]"
console.log([...r]); // [1, 2, 3, 4, 5]
```

---

## Frameworks Use Meta-programming Extensively

| Framework | Meta-programming Feature |
|-----------|-------------------------|
| Vue.js 3 | Proxy for reactive system |
| Vue.js 2 | Object.defineProperty for reactivity |
| Angular | Property descriptors for change detection |
| MobX | Proxy for observable state |
| Immer | Proxy for immutable state drafts |
| React (ESLint) | Static analysis (not runtime meta) |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is meta-programming involved? | Check for `Proxy`, `Reflect`, `Object.defineProperty`, `Symbol.*`. |
| Which mechanism is used? | Proxy (interception), Descriptors (control), Symbols (customization). |
| Why would a framework use Proxy? | To detect changes to objects (reactive state). |

---

# Chapter 25 — Memory Behavior

## Heap vs Stack

```text
Stack (function calls, primitives):
  - Function frames
  - Primitives (numbers, strings, booleans) stored inline
  - Fast, limited size (~1MB)

Heap (objects, closures, references):
  - Objects, arrays, functions
  - Garbage collected
  - Larger, slower allocation
```

---

## References and Garbage Collection

```javascript
let user = { name: "John" }; // Object in heap, user reference on stack
let ref = user;              // Two references to the same object

user = null;  // Object still reachable via ref
ref = null;   // Object now unreachable → GC can collect it
```

---

## WeakMaps Prevent Leaks

```javascript
// Without WeakMap – strong reference prevents GC
const cache = new Map();

function process(obj) {
    cache.set(obj, "processed");
    // obj can NEVER be GC'd because cache holds a reference
    // MEMORY LEAK
}

// With WeakMap – weak reference allows GC
const wmCache = new WeakMap();

function process(obj) {
    wmCache.set(obj, "processed");
    // When obj is no longer referenced, GC can collect both obj and its cache entry
}
```

---

## Closures Keep Objects Alive

```javascript
function createLeak() {
    const hugeData = new Array(1000000).fill("data");
    
    // This closure keeps hugeData alive as long as the timer runs
    setInterval(() => {
        console.log(hugeData.length); // Closure reference prevents GC
    }, 1000);
}

createLeak(); // hugeData lives forever
```

---

## Detached DOM Nodes

```javascript
const detached = [];

function createElement() {
    const div = document.createElement("div");
    div.textContent = "Hello";
    document.body.appendChild(div);
    detached.push(div); // Reference kept in array
    
    document.body.removeChild(div); // Removed from DOM
    // BUT: detached array still references it → memory leak
}
```

---

## Memory Leak Detection

```javascript
// Chrome DevTools → Memory tab → Heap snapshot
// Look for:
// - Detached DOM nodes
// - Growing array sizes
// - Closures retaining large objects

// Node.js
const used = process.memoryUsage();
console.log(`Heap used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can garbage collector free this memory? | Only if no references remain. Check closures, WeakMaps, event listeners. |
| Why is this object not being GC'd? | Something still holds a reference: closure, array, Map, event listener. |
| Does this closure keep objects alive? | Yes. The closure's scope chain retains references to outer variables. |
| Is a WeakMap used for cache? | If not, the cache entries may prevent GC (memory leak risk). |

---

# Senior Reverse Engineering Checklist

Whenever reading advanced JavaScript ask:

### Is this iterable?

Check for `[Symbol.iterator]` method. If not, you cannot use `for...of`.

---

### Which iterator provides values?

Look for `[Symbol.iterator]` or a generator function.

---

### Is execution paused by yield?

If you see `function*` and `yield`, execution can pause and resume.

---

### Why use Map instead of object?

Need object keys? Need insertion order? Need `.size`? Frequent additions/removals?

---

### Why use Set?

Need unique values? Removing duplicates? Set operations (union, intersection)?

---

### Can memory disappear automatically?

Using WeakMap/WeakSet? If yes, GC can collect entries when keys are no longer referenced.

---

### Why property cannot change?

Check the descriptor: `Object.getOwnPropertyDescriptor(obj, key)`. If `writable: false`, read-only.

---

### Is object frozen?

Check `Object.isFrozen(obj)`. If frozen, nothing can change.

---

### Is Proxy intercepting operations?

Check for `new Proxy(target, handler)`. The handler traps reveal what's intercepted.

---

### Which Reflect method performs operation?

Inside Proxy handlers, `Reflect.get`, `Reflect.set`, etc. implement default behavior.

---

### Is meta-programming involved?

Proxy, Reflect, Descriptors, Symbols, defineProperty – these are meta-programming tools.

---

### Can garbage collector free memory?

Check for strong references: closures, Map, event listeners, arrays.

---

# Projects

## Custom Iterator: range()

Build an iterator that generates a range of numbers:

```javascript
function range(start, end, step = 1) {
    return {
        [Symbol.iterator]() {
            let current = start;
            return {
                next() {
                    if ((step > 0 && current <= end) || (step < 0 && current >= end)) {
                        const value = current;
                        current += step;
                        return { value, done: false };
                    }
                    return { done: true };
                }
            };
        }
    };
}

console.log([...range(1, 10, 2)]); // [1, 3, 5, 7, 9]
console.log([...range(10, 0, -3)]); // [10, 7, 4, 1]
```

---

## Infinite Generator

Produces an infinite sequence (use with caution!):

```javascript
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
    console.log(fib.next().value); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}
```

---

## Duplicate Remover

Using Set:

```javascript
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 1, 4, 3])); // [1, 2, 3, 4]
```

---

## Cache System

Using Map with TTL (time-to-live):

```javascript
class Cache {
    constructor(ttlMs = 60000) {
        this._cache = new Map();
        this._ttl = ttlMs;
    }

    set(key, value) {
        this._cache.set(key, {
            value,
            expiry: Date.now() + this._ttl
        });
    }

    get(key) {
        const entry = this._cache.get(key);
        if (!entry) return undefined;
        if (Date.now() > entry.expiry) {
            this._cache.delete(key);
            return undefined;
        }
        return entry.value;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    delete(key) {
        this._cache.delete(key);
    }

    clear() {
        this._cache.clear();
    }

    get size() {
        // Clean expired entries first
        for (const [key, entry] of this._cache) {
            if (Date.now() > entry.expiry) this._cache.delete(key);
        }
        return this._cache.size;
    }
}
```

---

## Automatic Memory Cache

Using WeakMap for DOM element metadata:

```javascript
const elementData = new WeakMap();

function trackElement(el) {
    if (!elementData.has(el)) {
        elementData.set(el, { clicks: 0, timestamp: Date.now() });
    }
    
    el.addEventListener("click", () => {
        const data = elementData.get(el);
        data.clicks++;
        console.log(`Clicked ${data.clicks} times`);
    });
}

// When el is removed from DOM and all references are gone:
// el → GC collects it → WeakMap entry automatically removed
```

---

## Validation System

Using Proxy for object validation:

```javascript
function createValidator(schema) {
    return {
        validate(target) {
            return new Proxy(target, {
                set(obj, key, value) {
                    if (key in schema) {
                        const rules = schema[key];
                        
                        if (rules.type && typeof value !== rules.type) {
                            throw new Error(`${String(key)} must be ${rules.type}`);
                        }
                        
                        if (rules.min !== undefined && value < rules.min) {
                            throw new Error(`${String(key)} must be >= ${rules.min}`);
                        }
                        
                        if (rules.max !== undefined && value > rules.max) {
                            throw new Error(`${String(key)} must be <= ${rules.max}`);
                        }
                        
                        if (rules.pattern && !rules.pattern.test(value)) {
                            throw new Error(`${String(key)} has invalid format`);
                        }
                        
                        if (rules.required && (value === null || value === undefined)) {
                            throw new Error(`${String(key)} is required`);
                        }
                    }
                    
                    obj[key] = value;
                    return true;
                }
            });
        }
    };
}

const userSchema = {
    name: { type: "string", required: true },
    age: { type: "number", min: 0, max: 150 },
    email: { type: "string", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
};

const validator = createValidator(userSchema);
const user = validator.validate({});

user.name = "John";  // Works
user.age = 25;       // Works
user.age = -5;       // Error: age must be >= 0
user.email = "bad";  // Error: email has invalid format
```

---

## Immutable Configuration

Using Object.freeze and Proxy:

```javascript
function createConfig(defaults) {
    const config = { ...defaults };
    
    // Freeze nested objects too
    function deepFreeze(obj) {
        Object.freeze(obj);
        for (const val of Object.values(obj)) {
            if (val && typeof val === "object") deepFreeze(val);
        }
        return obj;
    }
    
    const frozen = deepFreeze(config);
    
    // Allow reads, block writes
    return new Proxy(frozen, {
        get(target, key) {
            if (key in target) return target[key];
            return undefined;
        },
        set() {
            throw new Error("Configuration is immutable");
        },
        deleteProperty() {
            throw new Error("Configuration is immutable");
        }
    });
}

const config = createConfig({
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
});

console.log(config.apiUrl); // "https://api.example.com"
config.timeout = 10000;     // Error: Configuration is immutable
delete config.retries;      // Error: Configuration is immutable
```

---

## Currency Formatter

Using Intl.NumberFormat:

```javascript
const currencyFormatter = {
    _cache: new Map(),
    
    format(amount, currency = "USD", locale = "en-US") {
        const key = `${locale}-${currency}`;
        
        if (!this._cache.has(key)) {
            this._cache.set(key, new Intl.NumberFormat(locale, {
                style: "currency",
                currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }));
        }
        
        return this._cache.get(key).format(amount);
    },
    
    formatCompact(amount, currency = "USD", locale = "en-US") {
        const key = `${locale}-${currency}-compact`;
        
        if (!this._cache.has(key)) {
            this._cache.set(key, new Intl.NumberFormat(locale, {
                style: "currency",
                currency,
                notation: "compact",
                compactDisplay: "short"
            }));
        }
        
        return this._cache.get(key).format(amount);
    }
};

console.log(currencyFormatter.format(1234567.89));          // "$1,234,567.89"
console.log(currencyFormatter.format(99.99, "EUR", "de-DE")); // "99,99 €"
console.log(currencyFormatter.formatCompact(1500000));       // "$1.5M"
```

---

# Chapter N — ES2022 to ES2024: Modern JavaScript Features

## Mission

JavaScript evolves yearly. These recent additions improve ergonomics, safety, and expressiveness. Understanding them keeps your codebase current and your interviews sharp.

---

## ES2022 (13th Edition)

### 1. Array.at()

Safe indexed access with support for negative indices.

```javascript
const arr = [10, 20, 30, 40, 50];

// Old way
console.log(arr[arr.length - 1]); // 50

// New way
console.log(arr.at(-1)); // 50
console.log(arr.at(-2)); // 40
console.log(arr.at(0));  // 10
console.log(arr.at(99)); // undefined (no out-of-bounds error)
```

Works on all indexable types: strings, TypedArrays.

```javascript
const str = "hello";
console.log(str.at(-1)); // "o"
```

### 2. Object.hasOwn()

Safer alternative to `hasOwnProperty()` — works even on objects created with `Object.create(null)`.

```javascript
const obj = Object.create(null);
obj.name = "Alice";

// Old way — throws if obj is null-prototype
try {
    console.log(obj.hasOwnProperty("name"));
} catch {
    console.log("hasOwnProperty is not a function");
}

// New way — always safe
console.log(Object.hasOwn(obj, "name")); // true
console.log(Object.hasOwn(obj, "age"));  // false

// Also works on regular objects
const regular = { a: 1 };
console.log(Object.hasOwn(regular, "a"));     // true
console.log(Object.hasOwn(regular, "toString")); // false (prototype)
```

### 3. Error.cause

Chain errors with context — essential for debugging production issues.

```javascript
async function fetchUser(id) {
    try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`, {
                cause: { status: res.status, id }
            });
        }
        return await res.json();
    } catch (err) {
        throw new Error("Failed to fetch user", { cause: err });
    }
}

// Usage
try {
    await fetchUser(42);
} catch (err) {
    console.log(err.message);      // "Failed to fetch user"
    console.log(err.cause.message); // "HTTP 404"
    console.log(err.cause.cause);   // { status: 404, id: 42 }
}
```

### 4. Class Fields and Private Methods (stabilized)

```javascript
class Counter {
    #count = 0; // private field

    #log() { // private method
        console.log(`Count is ${this.#count}`);
    }

    increment() {
        this.#count++;
        this.#log();
    }

    get value() {
        return this.#count;
    }
}

const c = new Counter();
c.increment(); // "Count is 1"
c.increment(); // "Count is 2"
// console.log(c.#count); // SyntaxError: private field
```

### 5. Top-level await (modules)

```javascript
// Only works in ES modules (type: "module" in package.json)
const response = await fetch("https://api.example.com/data");
const data = await response.json();
console.log(data);

// Previously required wrapping in async function:
// (async () => { ... })()
```

### 6. RegExp Match Indices (`d` flag)

```javascript
const re = /(?<year>\d{4})-(?<month>\d{2})/d;
const match = re.exec("2024-06");

console.log(match.indices.groups);
// { year: [0, 4], month: [5, 7] }
// Useful for highlighting matched ranges in text editors
```

---

## ES2023 (14th Edition)

### 7. Array.findLast() / Array.findLastIndex()

Search from the end without reversing the array.

```javascript
const numbers = [5, 12, 8, 130, 44, 12];

// Find last element > 10
console.log(numbers.findLast((n) => n > 10)); // 12
console.log(numbers.findLastIndex((n) => n > 10)); // 5

// Old equivalent:
console.log([...numbers].reverse().find((n) => n > 10)); // 12
// But reverse() mutates and creates a copy
```

### 8. Hashbang Grammar

Native support for `#!/usr/bin/env node` at the top of CLI scripts.

```javascript
#!/usr/bin/env node
console.log("Hello from CLI");
```

No more workarounds needed — the JS engine treats it as a comment.

### 9. Symbols as WeakMap Keys

```javascript
const weak = new WeakMap();
const sym = Symbol("private");

class Secret {
    constructor(value) {
        weak.set(sym, value);
    }

    get value() {
        return weak.get(sym);
    }
}

const s = new Secret("hidden");
console.log(s.value); // "hidden"
```

---

## ES2024 (15th Edition)

### 10. Promise.withResolvers()

Create a Promise with external resolve/reject — cleaner than the deferred pattern.

```javascript
// Old deferred pattern
function oldDeferred() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

// ES2024 — clean
function newDeferred() {
    const { promise, resolve, reject } = Promise.withResolvers();
    return { promise, resolve, reject };
}

// Usage
const { promise, resolve } = Promise.withResolvers();
setTimeout(() => resolve("done"), 1000);
console.log(await promise); // "done" (after 1s)
```

### 11. Object.groupBy() / Map.groupBy()

Group array elements without external libraries.

```javascript
const inventory = [
    { name: "apple",  category: "fruit" },
    { name: "banana", category: "fruit" },
    { name: "carrot", category: "vegetable" },
    { name: "broccoli", category: "vegetable" },
    { name: "chicken", category: "meat" }
];

// Object.groupBy — groups into a plain object
const byCategory = Object.groupBy(inventory, (item) => item.category);
console.log(byCategory);
// {
//   fruit: [{ name: "apple" }, { name: "banana" }],
//   vegetable: [{ name: "carrot" }, { name: "broccoli" }],
//   meat: [{ name: "chicken" }]
// }

// Map.groupBy — groups into a Map (preserves key types)
const items = [
    { value: 1, type: "number" },
    { value: "hello", type: "string" }
];
const byType = Map.groupBy(items, (item) => item.type);
console.log(byType.get("number")); // [{ value: 1, type: "number" }]
```

### 12. Atomics.waitAsync()

Non-blocking async version of `Atomics.wait()` for shared memory.

```javascript
const sab = new SharedArrayBuffer(4);
const i32 = new Int32Array(sab);

// In worker 1
Atomics.store(i32, 0, 0);

// In worker 2 — non-blocking wait
const result = Atomics.waitAsync(i32, 0, 0);
// { async: true, value: Promise }
result.value.then(() => {
    console.log("Woken up!");
});

// In worker 1 — wakes worker 2
Atomics.notify(i32, 0, 1);
```

### 13. RegExp `v` Flag (Unicode Sets)

Enhanced Unicode property escapes with set operations.

```javascript
// Union — matches Greek or Latin letters
const greekOrLatin = /^\p{RGI_Emoji}$/v;

// Subtraction — matches ASCII characters that are NOT letters
const nonLetterAscii = /^[\p{ASCII}--\p{Alpha}]$/v;

// Intersection — matches only Greek letters that are also in ASCII
// (practical example: matches Unicode letters that are also ASCII letters)
const letter = /^[\p{Letter}&&\p{ASCII}]$/v;
console.log(letter.test("A"));  // true
console.log(letter.test("Ω")); // false
```

### 14. Well-Formed Unicode Strings

```javascript
const bad = "Hello\uD800World"; // Lone surrogate

// Old: returns replacement character
console.log(bad.replace(/[^\w\s]/g, "?")); // manual workaround

// New: isWellFormed() / toWellFormed()
console.log(bad.isWellFormed()); // false

const fixed = bad.toWellFormed();
console.log(fixed); // "Hello�World" (replacement character inserted)
console.log(fixed.isWellFormed()); // true
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why does `arr.at(-1)` work but `arr[-1]` doesn't? | `arr[-1]` is treated as a string property `"-1"` on the object. `at()` converts negative indices to `length + index` internally. |
| When would you use `Error.cause`? | Wrapping low-level errors (HTTP, DB, FS) with higher-level context without losing the original error details. |
| What advantage does `Object.hasOwn()` have over `obj.hasOwnProperty()`? | `Object.hasOwn()` works on null-prototype objects and is not shadowable by prototype pollution. |
| Why is `findLast()` more performant than `reverse().find()`? | `reverse()` creates a copy (O(n) memory) and mutates. `findLast()` iterates from the end in-place (O(1) extra memory). |
| What is the difference between `Object.groupBy` and `Map.groupBy`? | `Object.groupBy` returns a plain object (string keys). `Map.groupBy` returns a Map (preserves key types). |
| How does `Promise.withResolvers()` improve code? | Eliminates the boilerplate of manually capturing `resolve`/`reject` inside the Promise constructor callback. |
| Can `Atomics.waitAsync` block the main thread? | No — it returns a Promise. Only `Atomics.wait` (synchronous) blocks. |
| Why was top-level await restricted to modules? | Top-level await would block module execution in scripts, breaking the synchronous module graph resolution. |

---

## Chapter N Summary

| Feature | ES Version | Key Benefit |
|---------|-----------|-------------|
| `Array.at()` | ES2022 | Negative indexing |
| `Object.hasOwn()` | ES2022 | Safe property check |
| `Error.cause` | ES2022 | Error chaining |
| Private class fields/methods | ES2022 | True encapsulation |
| Top-level await | ES2022 | Cleaner module code |
| RegExp `d` flag | ES2022 | Match indices |
| `findLast()`/`findLastIndex()` | ES2023 | Reverse search without copy |
| Hashbang grammar | ES2023 | Native CLI scripts |
| Symbol WeakMap keys | ES2023 | Private symbol metadata |
| `Promise.withResolvers()` | ES2024 | External promise control |
| `Object.groupBy()`/`Map.groupBy()` | ES2024 | Native grouping |
| `Atomics.waitAsync()` | ES2024 | Non-blocking shared memory |
| RegExp `v` flag | ES2024 | Unicode set operations |
| `isWellFormed()`/`toWellFormed()` | ES2024 | Unicode string safety |

---

# Part 10 Summary

| Concept | Key Takeaway |
|---------|-------------|
| Symbol | Unique, immutable property key (prevents collisions) |
| Global Symbol | `Symbol.for("key")` – shared across realms |
| Iterator Protocol | `{ next() { return { value, done } } }` |
| for...of Internals | Calls `Symbol.iterator`, loops until `done: true` |
| Custom Iterator | Add `[Symbol.iterator]()` to any object |
| Generators | `function*` with `yield` – pausable functions |
| yield | Pause + return value + receive value via next(arg) |
| yield* | Delegate to another generator/iterable |
| Map | Key-value store (any key type, ordered, iterable) |
| Set | Unique values (any type, deduplication) |
| WeakMap | Object keys only, GC-friendly (no iteration) |
| WeakSet | Object values only, GC-friendly (no iteration) |
| Property Descriptors | `writable`, `enumerable`, `configurable` |
| Object.freeze() | Completely immutable (shallow) |
| Object.seal() | Can modify, cannot add/delete |
| Optional chaining | `?.` – safe access (returns undefined) |
| Nullish coalescing | `??` – default for null/undefined only |
| BigInt | Large integers (`123n`), cannot mix with Number |
| Regular Expressions | Patterns for searching/replacing text |
| Tagged Template Literals | Function`template` – custom string processing |
| Intl API | Locale-aware formatting (numbers, dates, currencies) |
| Proxy | Intercept object operations (get, set, has, etc.) |
| Reflect | Default behavior for Proxy traps |
| Meta-programming | Code that inspects/modifies other code |
| Memory Behavior | Heap for objects, stack for calls, GC for unreachable |
| WeakMap/WeakSet | Prevent memory leaks (weak references) |
| **ES2022-ES2024** | See Chapter N above for 14 new features |

---

# Next Part (Part 11)

We will enter one of the largest and most practical sections:

# Data Structures and Algorithms in JavaScript

Including absolutely everything:

* Arrays
* Linked Lists
* Stacks
* Queues
* Hash Tables
* Trees
* Binary Search Trees
* Heaps
* Graphs
* Tries
* Sorting Algorithms
* Searching Algorithms
* Recursion
* Dynamic Programming
* Greedy Algorithms
* Backtracking
* Big O Analysis
* Memory complexity
* Reverse engineering tactics used by senior engineers

This section forms the foundation of problem-solving and software engineering.
