# Proxy Pattern

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Problem It Solves

You need to control access to an object — for lazy initialization, access control, logging, caching, or validation. The Proxy pattern provides a surrogate that controls access to the real object.

## JavaScript Has a Built-In Proxy

The `Proxy` constructor lets you intercept fundamental operations on any object.

```javascript
const target = {
    name: "Secret Vault",
    secret: "The password is 1234"
};

const handler = {
    get(obj, prop) {
        if (prop === "secret") return "ACCESS DENIED";
        return Reflect.get(obj, prop);
    },

    set(obj, prop, value) {
        if (prop === "secret") throw new Error("Cannot modify secret directly");
        return Reflect.set(obj, prop, value);
    }
};

const proxy = new Proxy(target, handler);
console.log(proxy.name);   // "Secret Vault"
console.log(proxy.secret); // "ACCESS DENIED"
```

## Virtual Proxy (Lazy Initialization)

```javascript
class ExpensiveImage {
    constructor(filename) {
        this.filename = filename;
        this._loadFromDisk();
    }
    _loadFromDisk() { console.log(`Loading ${this.filename} from disk... (expensive)`); }
    display() { console.log(`Displaying ${this.filename}`); }
}

class ImageProxy {
    constructor(filename) {
        this.filename = filename;
        this._realImage = null;
    }

    display() {
        if (!this._realImage) this._realImage = new ExpensiveImage(this.filename);
        this._realImage.display();
    }
}

const image = new ImageProxy("photo.jpg");
image.display(); // loads and displays
image.display(); // displays only (no load)
```

## Caching Proxy

```javascript
function createCachingProxy(fn) {
    const cache = new Map();
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                console.log(`Cache hit for ${key}`);
                return cache.get(key);
            }
            console.log(`Cache miss for ${key}`);
            const result = Reflect.apply(target, thisArg, args);
            cache.set(key, result);
            return result;
        }
    });
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const cachedFib = createCachingProxy(fibonacci);
console.log(cachedFib(40)); // Computed
console.log(cachedFib(40)); // Cache hit
```

## Real-World Use Case

Vue.js 3's reactivity system uses Proxies. MobX uses Proxies. Validation libraries use Proxies to intercept object mutations.

```javascript
function createValidatedUser(userSchema) {
    return new Proxy(userSchema, {
        set(obj, prop, value) {
            if (prop === "age" && (typeof value !== "number" || value < 0 || value > 150))
                throw new Error(`Invalid age: ${value}`);
            if (prop === "email" && !value.includes("@"))
                throw new Error(`Invalid email: ${value}`);
            return Reflect.set(obj, prop, value);
        }
    });
}

const user = createValidatedUser({ name: "Alice", age: 30, email: "alice@example.com" });
user.age = 31;   // OK
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | What is the difference between Proxy and Decorator? |
| 2 | How does JavaScript's `Proxy` differ from the classic GoF Proxy pattern? |
| 3 | What performance impact does Proxy have? |
| 4 | Can a Proxy be detected from the client code? |
## Next Steps

[Back to Chapter 8](08-facade.md): Facade Pattern
[Proceed to Chapter 10](10-module.md): Module Pattern to learn about module pattern.
