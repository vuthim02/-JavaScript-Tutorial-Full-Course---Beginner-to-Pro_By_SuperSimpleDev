# Property Descriptors & Object.defineProperty

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Property Descriptors

Every property has a descriptor that controls its behavior.

```javascript
const user = { name: "John" };
const descriptor = Object.getOwnPropertyDescriptor(user, "name");
// { value: "John", writable: true, enumerable: true, configurable: true }
```

## Descriptor Fields

### Data Descriptor

| Field | Default | Meaning |
|-------|---------|---------|
| `value` | `undefined` | The property's value |
| `writable` | `false` | Can the value be changed? |
| `enumerable` | `false` | Appears in `for...in` and `Object.keys()`? |
| `configurable` | `false` | Can descriptor be changed or property deleted? |

### Accessor Descriptor

| Field | Default | Meaning |
|-------|---------|---------|
| `get` | `undefined` | Getter function |
| `set` | `undefined` | Setter function |
| `enumerable` | `false` | Appears in enumeration? |
| `configurable` | `false` | Can descriptor be changed? |

**Data and accessor descriptors are mutually exclusive** — you cannot have both `value`/`writable` and `get`/`set`.

## Object.defineProperty()

```javascript
const user = {};

Object.defineProperty(user, "id", {
    value: 12345,
    writable: false,
    enumerable: false,
    configurable: false
});

user.id = 99999;             // silently ignored (strict: TypeError)
console.log(user.id);        // 12345
console.log(Object.keys(user)); // [] — id is not enumerable
delete user.id;              // false — not configurable
```

## Object.defineProperties() — Multiple at Once

```javascript
const product = {};

Object.defineProperties(product, {
    name: {
        value: "Widget",
        writable: true,
        enumerable: true,
        configurable: false
    },
    price: {
        value: 9.99,
        writable: false,
        enumerable: true,
        configurable: false
    },
    internalId: {
        value: "x1y2z3",
        writable: false,
        enumerable: false, // Hidden from iteration
        configurable: false
    }
});

console.log(Object.keys(product)); // ["name", "price"]
```

## Writable: false — Read-Only Properties

```javascript
const config = {};
Object.defineProperty(config, "API_URL", {
    value: "https://api.example.com",
    writable: false
});

config.API_URL = "https://evil.com"; // Silently ignored (strict: TypeError)
console.log(config.API_URL); // "https://api.example.com"
```

## Enumerable: false — Hidden Properties

```javascript
const user = { name: "John", age: 25 };

Object.defineProperty(user, "passwordHash", {
    value: "a1b2c3",
    enumerable: false
});

console.log(Object.keys(user));       // ["name", "age"]
console.log(JSON.stringify(user));     // {"name":"John","age":25}
console.log(user.passwordHash);        // "a1b2c3" — accessible directly
```

## Configurable: false — Locked Descriptors

Once `configurable: false`, the descriptor cannot be changed and the property cannot be deleted.

```javascript
const obj = {};
Object.defineProperty(obj, "locked", {
    value: 42,
    configurable: false
});

delete obj.locked;           // false
// Object.defineProperty(obj, "locked", { value: 99 }); // TypeError
// Object.defineProperty(obj, "locked", { writable: true }); // TypeError
```

**Exception:** `writable` can be changed from `true` to `false` even if `configurable: false`.

## Getter/Setter Descriptors

```javascript
const user = { firstName: "John", lastName: "Doe" };

Object.defineProperty(user, "fullName", {
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
        [this.firstName, this.lastName] = value.split(" ");
    },
    enumerable: true
});

console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
```

## Preventing Object Modification

```javascript
const obj = { a: 1 };

Object.preventExtensions(obj);  // prevent adding new properties
obj.b = 2;                      // silently ignored (strict: TypeError)

Object.seal(obj);               // prevent add/delete, non-configurable
delete obj.a;                   // false
obj.a = 99;                     // Works! Seal allows value changes

Object.freeze(obj);             // prevent add/delete/change (read-only)
obj.a = 100;                    // silently ignored (strict: TypeError)
```

### All are Shallow

```javascript
const obj = Object.freeze({ nested: { value: 1 } });
obj.nested.value = 2;   // works — nested object is not frozen
obj.nested = {};        // silently ignored (strict: TypeError)
```

Deep freeze requires recursion:

```javascript
function deepFreeze(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    for (const name of propNames) {
        const value = obj[name];
        if (value && typeof value === "object") deepFreeze(value);
    }
    return Object.freeze(obj);
}
```

### Checking Object State

```javascript
Object.isExtensible(obj); // false
Object.isSealed(obj);     // true
Object.isFrozen(obj);     // true
```

## Practical Patterns

### Immutable Constants Pattern

```javascript
const APP_CONFIG = Object.freeze({
    API_BASE: "https://api.example.com",
    VERSION: "2.0.0",
    MAX_RETRIES: 3,
});
```

### Hidden Internal State

```javascript
function createCounter() {
    const counter = {};
    let count = 0;

    Object.defineProperty(counter, "value", {
        get() { return count; },
        enumerable: true
    });

    counter.increment = function() { count++; };
    counter.reset = function() { count = 0; };

    return counter;
}
```

### Reactivity Simulation (pre-Proxies)

```javascript
function reactive(obj, onChange) {
    const result = {};
    for (const key of Object.keys(obj)) {
        let value = obj[key];
        Object.defineProperty(result, key, {
            get() { return value; },
            set(newVal) {
                value = newVal;
                onChange(key, newVal);
            },
            enumerable: true
        });
    }
    return result;
}

const state = reactive({ count: 0 }, (key, val) => {
    console.log(`${key} changed to ${val}`);
});
state.count = 5; // "count changed to 5"
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the property writable/enumerable/configurable? | Check with `Object.getOwnPropertyDescriptor()` |
| Is the object frozen/sealed/extensible? | `Object.isFrozen()`, `Object.isSealed()`, `Object.isExtensible()` |
| What does `Object.freeze()` protect against? | Adding, deleting, changing properties (shallow only) |
| Does `Object.seal()` allow value changes? | Yes — only prevents add/delete and descriptor changes |
| Is this a data or accessor descriptor? | Check for `value` (data) vs `get`/`set` (accessor) |
| Can we change a non-configurable descriptor? | No, except `writable: true → false` |
| Why use non-enumerable? | Hide internal implementation, keep `JSON.stringify` clean |
| Are frozen/sealed checks deep? | No — shallow only. Nested objects are unaffected |
## Next Steps

[Back to Chapter 1](01-object-internals.md): Object Internals: Hidden Classes, Properties, Methods & References
[Proceed to Chapter 3](03-this-binding.md): The `this` Keyword: Binding Rules & call/apply/bind to learn about the `this` keyword: binding rules & call/apply/bind.
