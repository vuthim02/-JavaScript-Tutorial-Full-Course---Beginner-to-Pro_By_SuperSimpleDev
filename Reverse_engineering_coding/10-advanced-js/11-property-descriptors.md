# 11 — Property Descriptors

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Hidden Attributes of Properties

Every property has a descriptor that controls its behavior.

```javascript
Object.getOwnPropertyDescriptor()
```

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why property cannot change? | Check `writable` descriptor. If false, the value is read-only. |
| Why does property not appear in loops? | Check `enumerable` descriptor. If false, it's hidden. |
| Why can't I delete this property? | Check `configurable` descriptor. If false, it's locked. |
| Is this a data property or accessor? | Data: has `value`/`writable`. Accessor: has `get`/`set`. |
## Next Steps

[Back to Chapter 10](10-weakmap-weakset.md): 10 — WeakMap & WeakSet
[Proceed to Chapter 12](12-freeze-seal.md): 12 — Object.freeze, Object.seal, Object.preventExtensions to learn about 12 — object.freeze, object.seal, object.preventextensions.
