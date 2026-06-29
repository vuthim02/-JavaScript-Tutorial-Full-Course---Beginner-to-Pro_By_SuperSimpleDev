# Getters & Setters in Plain Objects

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Are Accessor Properties?

Properties backed by functions that execute on get/set, rather than storing a value directly.

## Getter (get)

A function that runs when the property is **read**.

```javascript
const user = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

console.log(user.fullName); // "John Doe" — no () needed
user.fullName = "Jane Doe"; // silently ignored (no setter)
```

## Setter (set)

A function that runs when the property is **assigned**.

```javascript
const user = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};

user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
console.log(user.lastName);  // "Smith"
```

## Data Validation with Setters

```javascript
const product = {
    _price: 0,
    get price() {
        return `$${this._price.toFixed(2)}`;
    },
    set price(value) {
        if (typeof value !== "number" || value < 0) {
            throw new Error("Price must be a positive number");
        }
        this._price = value;
    }
};

product.price = 29.99;
console.log(product.price); // "$29.99"
product.price = -5;         // Error: Price must be a positive number
```

## Lazy / Computed Values with Getters

```javascript
const data = {
    _cache: null,
    get expensive() {
        if (this._cache === null) {
            console.log("Computing...");
            this._cache = Array.from({ length: 1000 }, (_, i) => i)
                .reduce((s, n) => s + n, 0);
        }
        return this._cache;
    }
};

console.log(data.expensive); // "Computing..." then 499500
console.log(data.expensive); // 499500 — cached, no recomputation
```

## Defining Getters/Setters After Creation

### Using Object.defineProperty

```javascript
const user = { firstName: "John", lastName: "Doe" };

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
```

### Using Object.defineProperties

```javascript
const circle = { _radius: 0 };

Object.defineProperties(circle, {
    radius: {
        get() { return this._radius; },
        set(v) {
            if (v <= 0) throw new Error("Radius must be positive");
            this._radius = v;
        },
        enumerable: true
    },
    area: {
        get() { return Math.PI * this._radius ** 2; },
        enumerable: true
    }
});

circle.radius = 5;
console.log(circle.area); // 78.53981633974483
```

## Getter/Setter vs Regular Method

```javascript
const obj = {
    data: [],
    // Getter — reads like a property
    get count() { return this.data.length; },
    // Method — requires ()
    getCount() { return this.data.length; }
};

obj.data.push(1, 2, 3);
console.log(obj.count);    // 3 — property access
console.log(obj.getCount()); // 3 — method call
```

Use getters for computed properties that feel like data. Use methods for actions.

## Getters/Setters in Classes vs Plain Objects

```javascript
// Class syntax
class Circle {
    constructor(r) { this._radius = r; }
    get radius() { return this._radius; }
    set radius(v) { if (v > 0) this._radius = v; }
}

// Plain object syntax
const circle = {
    _radius: 5,
    get radius() { return this._radius; },
    set radius(v) { if (v > 0) this._radius = v; }
};
```

Both behave identically at runtime.

## Descriptor Inspection

```javascript
const obj = { get x() { return 1; } };
const desc = Object.getOwnPropertyDescriptor(obj, "x");
console.log(desc);
// { get: [Function: get x], set: undefined, enumerable: true, configurable: true }
```

Accessor descriptors have `get`/`set` instead of `value`/`writable`.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a method or a getter? | If called with `()` it's a method. Accessed without `()` is a getter |
| Does the getter compute or return stored value? | Check body — may cache or compute each time |
| Does the setter validate? | Check for type checks, range checks, or transformations |
| Can the property be deleted? | Check `configurable` in descriptor |
| Can you have both value and get/set? | No — mutually exclusive in descriptor |
| Are getters/setters inherited? | Yes — through prototype chain like any property |
## Next Steps

[Back to Chapter 9](09-destructuring-spread.md): Object Destructuring & Spread Operator
[Proceed to Chapter 11](11-object-equality.md): Object Equality & Comparison to learn about object equality & comparison.
