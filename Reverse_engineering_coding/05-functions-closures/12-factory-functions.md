# Factory Functions

## What Is a Factory Function?

A factory function **creates and returns** a new object without using `class` or `new`.

```javascript
function createUser(name, role) {
    return {
        name,
        role,
        greet()  { console.log(`Hi, I'm ${this.name}`); },
        isAdmin() { return this.role === "admin"; }
    };
}

const alice = createUser("Alice", "admin");
const bob   = createUser("Bob", "user");

alice.greet();    // "Hi, I'm Alice"
alice.isAdmin();  // true
bob.isAdmin();    // false
```

## Factory + Closure = True Private State

```javascript
function createCounter(name, start = 0) {
    let count = start; // private

    return {
        increment(by = 1) {
            count += by;
            return this;  // enables chaining
        },
        decrement(by = 1) {
            count -= by;
            return this;
        },
        reset() {
            count = start;
            return this;
        },
        value() { return count; },
        toString() { return `${name}: ${count}`; }
    };
}

const c = createCounter("Score", 0);
c.increment(5).increment(3).decrement(2);
console.log(c.value());     // 6
console.log(c.count);       // undefined — private
```

## Composition Over Inheritance (Mixin Pattern)

```javascript
const canFly  = { fly()  { console.log(`${this.name} flies!`);  } };
const canSwim = { swim() { console.log(`${this.name} swims!`);  } };
const canRun  = { run()  { console.log(`${this.name} runs!`);   } };

// Duck can do all three — no inheritance needed
function createDuck(name) {
    return { name, ...canFly, ...canSwim, ...canRun };
}

const donald = createDuck("Donald");
donald.fly();  // "Donald flies!"
donald.swim(); // "Donald swims!"
donald.run();  // "Donald runs!"
```

## Factory vs Constructor — When to Use Which

| Aspect | Factory | Constructor / Class |
|--------|---------|---------------------|
| `new` required | ❌ No | ✅ Yes (easy to forget) |
| Private state | ✅ Easy (closures) | Harder (need `#`) |
| Prototype sharing | ❌ Each object has own methods | ✅ Shared via prototype |
| Memory efficiency | ❌ Each object duplicates methods | ✅ Methods in prototype |
| `instanceof` | ❌ Won't work | ✅ Works |

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Does this function return an object? | Yes → it's a factory function. |
| Does it use `new` or `class`? | No — factories avoid both. |
| Is there private state? | Variables closed over by returned methods are truly private. |
| Are methods shared or duplicated? | Each call creates new method objects — memory cost per instance. |
| Can I use `instanceof`? | No — factories don't set up a prototype chain for instanceof. |
| Can I use composition? | Yes — mix in behaviors by spreading method objects. |
## Next Steps

[Back to Chapter 11](11-closures.md): Closures
[Proceed to Chapter 13](13-recursion-and-execution-context.md): Recursion Internals to learn about recursion internals.
