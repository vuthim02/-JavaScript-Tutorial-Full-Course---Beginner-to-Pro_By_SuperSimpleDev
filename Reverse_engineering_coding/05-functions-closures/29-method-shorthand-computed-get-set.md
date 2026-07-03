# Method Shorthand, Computed Properties, Getters & Setters

## Method Shorthand Syntax (ES2015)

### Syntax

```javascript
const obj = {
    methodName(params) {
        // body — no colon, no `function` keyword
    }
};
```

### Old vs New

```javascript
// ❌ Old way
const old = {
    greet: function(name) {
        return `Hello, ${name}`;
    },
    add: function(a, b) {
        return a + b;
    }
};

// ✅ Modern shorthand
const modern = {
    greet(name) {
        return `Hello, ${name}`;
    },
    add(a, b) {
        return a + b;
    }
};
```

### Method Shorthand and `this`

```javascript
const user = {
    name: "Alice",
    // Method shorthand — `this` works normally
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    },
    // Arrow function — `this` is NOT the object
    greetArrow: () => {
        console.log(`Hi, I'm ${this.name}`); // undefined
    }
};

user.greet();       // "Hi, I'm Alice"
user.greetArrow();  // "Hi, I'm undefined"
```

---

## Computed Property Names (ES2015)

### Syntax

```javascript
const obj = {
    [expression]: value
};
```

### Behavior

Evaluates the expression in brackets and uses the result as the property name.

```javascript
const key = "dynamicKey";
const prefix = "user_";
const id = 42;

const obj = {
    [key]: "dynamic value",
    [`${prefix}${id}`]: "computed name",
    ["method" + id]() {
        return `Method ${id}`;
    }
};

console.log(obj.dynamicKey);     // "dynamic value"
console.log(obj.user_42);        // "computed name"
console.log(obj.method42());     // "Method 42"
```

### Real-World Use Cases

```javascript
// Dynamic property names from variables
function createUser(name, role) {
    return {
        name,
        role,
        [`can_${role}`]: true,
        [`permissions_${role}`]: ["read", "write"]
    };
}

const admin = createUser("Alice", "admin");
// { name: "Alice", role: "admin", can_admin: true, permissions_admin: [...] }

// Toggle state keys
function createActions(state) {
    return {
        ["action_" + (state ? "active" : "inactive")]() { /* ... */ }
    };
}
```

---

## Getters and Setters

### Syntax

```javascript
const obj = {
    get propName() {
        // called when obj.propName is read
    },
    set propName(value) {
        // called when obj.propName = value is written
    }
};
```

### Behavior

Getters and setters allow you to define **computed properties** that behave like regular properties but have custom logic on access and assignment.

```javascript
const user = {
    firstName: "John",
    lastName: "Doe",

    // Getter — computed property
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    // Setter — custom assignment logic
    set fullName(value) {
        const parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts.slice(1).join(" ");
    }
};

console.log(user.fullName);  // "John Doe" — getter called
user.fullName = "Jane Smith"; // setter called
console.log(user.firstName); // "Jane"
console.log(user.lastName);  // "Smith"
```

### Getters Are Computed on Read

```javascript
const counter = {
    _count: 0,
    get value() {
        console.log("Getter called");
        return this._count;
    },
    increment() {
        this._count++;
    }
};

counter.value; // "Getter called" → 0
counter.increment();
counter.value; // "Getter called" → 1
// getter runs EVERY time the property is read
```

### Validation with Setters

```javascript
const product = {
    _price: 0,

    get price() {
        return `$${this._price.toFixed(2)}`;
    },

    set price(value) {
        if (value < 0) throw new Error("Price cannot be negative");
        if (typeof value !== "number") throw new Error("Price must be a number");
        this._price = value;
    }
};

product.price = 29.99;
console.log(product.price); // "$29.99"
product.price = -5; // ❌ Error: Price cannot be negative
```

### Getters/Setters in Classes

```javascript
class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value <= 0) throw new Error("Radius must be positive");
        this._radius = value;
    }

    get area() {
        return Math.PI * this._radius ** 2;
    }

    get circumference() {
        return 2 * Math.PI * this._radius;
    }
}

const c = new Circle(5);
console.log(c.radius);        // 5 — getter
console.log(c.area);         // 78.54... — computed getter
c.radius = 10;               // setter
console.log(c.circumference); // 62.83...
```

### `Object.defineProperty()` — Define Getters/Setters on Existing Objects

```javascript
const obj = { _data: [] };

Object.defineProperty(obj, "count", {
    get() {
        return this._data.length;
    },
    set(value) {
        if (value < 0) throw new Error("Invalid count");
        this._data.length = value;
    },
    enumerable: true,
    configurable: true
});

obj._data = [1, 2, 3, 4, 5];
console.log(obj.count); // 5
obj.count = 3;
console.log(obj._data); // [1, 2, 3]
```

---

## Reverse Engineering Questions

### For Method Shorthand

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a method or a property?       | If it has `()` after the name and a body, it's a method |
| Does the shorthand use `function`?    | No — the `function` keyword is omitted              |
| Is the method enumerable?             | Yes — shorthand methods are enumerable              |
| Can shorthand be used in classes?     | Yes — it's the standard class method syntax         |

### For Computed Properties

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the actual property name?     | Evaluate the expression inside `[]`                 |
| Can computed properties be methods?   | Yes — `[expr]() { }`                                |
| Can the expression reference other properties? | Yes — `this` may be available in some contexts |
| When to use computed properties?      | Dynamic keys from variables, template strings       |

### For Getters/Setters

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How to distinguish getter from method?| Getter has no `()`, accessed like a property        |
| Is the getter result cached?          | No — runs every time the property is read           |
| Can getters cause side effects?       | Yes — they execute code on read                     |
| Can setters have validation?          | Yes — validate before assigning to backing field    |
| Can getters be used without setters?  | Yes — read-only computed properties                 |
## Next Steps

[Back to Chapter 28](28-mastery-map-and-next.md): Complete Function Mastery Map
[Proceed to Module 3 Chapter 6](../03-control-flow/06-error-handling.md): Error Handling — try/catch, finally & Custom Errors to learn about error handling.
