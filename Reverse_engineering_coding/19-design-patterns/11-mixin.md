# Mixin Pattern

## What Problem It Solves

JavaScript classes support single inheritance. When you need to share behavior across unrelated classes, *mixins* allow composing behaviors horizontally.

## Implementation

```javascript
const LoggerMixin = {
    log(message) { console.log(`[${this.constructor.name}] ${message}`); },
    error(message) { console.error(`[${this.constructor.name}] ERROR: ${message}`); }
};

const TimestampMixin = {
    getTimestamp() { return new Date().toISOString(); }
};

const SerializableMixin = {
    toJSON() { return JSON.stringify({ ...this }); },
    fromJSON(json) { Object.assign(this, JSON.parse(json)); return this; }
};

class User {
    constructor(name) { this.name = name; }
}

Object.assign(User.prototype, LoggerMixin, TimestampMixin, SerializableMixin);

const user = new User("Alice");
user.log("User created");
console.log(user.getTimestamp());
console.log(user.toJSON());
```

### Mixin with Class Composition

```javascript
function applyMixins(targetClass, ...mixins) {
    for (const mixin of mixins) {
        Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
            if (name !== "constructor") targetClass.prototype[name] = mixin.prototype[name];
        });
    }
}

class Flyable {
    fly() { return `${this.name} is flying`; }
}

class Swimmable {
    swim() { return `${this.name} is swimming`; }
}

class Duck {
    constructor(name) { this.name = name; }
}

applyMixins(Duck, Flyable, Swimmable);
const donald = new Duck("Donald");
console.log(donald.fly());   // "Donald is flying"
console.log(donald.swim());  // "Donald is swimming"
```

## Real-World Use Case

React's higher-order components are mixins. Redux's `connect()` function is a mixin.

```javascript
const EventEmitterMixin = {
    _events: {},

    on(event, handler) {
        if (!this._events[event]) this._events[event] = [];
        this._events[event].push(handler);
        return this;
    },

    emit(event, ...args) {
        const handlers = this._events[event];
        if (handlers) handlers.forEach(handler => handler(...args));
        return this;
    },

    off(event, handler) {
        const handlers = this._events[event];
        if (handlers) this._events[event] = handlers.filter(h => h !== handler);
        return this;
    }
};

class Store {
    constructor(state = {}) { this.state = state; }
}

Object.assign(Store.prototype, EventEmitterMixin);
const store = new Store({ count: 0 });
store.on("change", () => console.log("State changed"));
store.emit("change"); // "State changed"
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How do mixins differ from multiple inheritance (as in C++)? |
| 2 | What happens if two mixins define the same method? |
| 3 | How does composition via mixins relate to the "composition over inheritance" principle? |
| 4 | What are the pitfalls of mixins in large codebases? |
## Next Steps

[Back to Chapter 10](10-module.md): Module Pattern
[Proceed to Chapter 12](12-observer.md): Observer Pattern to learn about observer pattern.
