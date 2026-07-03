# Prototype Pattern

## What Problem It Solves

Creating objects from scratch is expensive. Cloning an existing object (a *prototype*) is faster and preserves the original's state.

## Implementation

The `Object.create()` method implements the Prototype pattern natively:

```javascript
const carPrototype = {
    init(model) { this.model = model; return this; },
    drive() { return `Driving ${this.model}`; },
    clone() { return Object.create(Object.getPrototypeOf(this)); }
};

const car1 = Object.create(carPrototype).init("Sedan");
const car2 = car1.clone().init("SUV");

console.log(car1.drive()); // "Driving Sedan"
console.log(car2.drive()); // "Driving SUV"
```

### Prototype with Class-Based Clone

```javascript
class GameCharacter {
    constructor(name, health, level, abilities) {
        this.name = name;
        this.health = health;
        this.level = level;
        this.abilities = abilities;
    }

    clone() {
        return new GameCharacter(this.name, this.health, this.level, [...this.abilities]);
    }

    introduce() {
        return `${this.name} (Lv.${this.level}) - HP: ${this.health}`;
    }
}

const orcPrototype = new GameCharacter("Grunt", 100, 1, ["punch", "roar"]);

const orc1 = orcPrototype.clone();
orc1.name = "Orc #1";

const orc2 = orcPrototype.clone();
orc2.name = "Orc #2";
```

## Real-World Use Case

Redux Toolkit's `createSlice` uses prototypes under the hood. Game engines clone enemy patterns from prototypes. V8 itself uses prototype-based object shapes.

```javascript
const defaultConfig = {
    host: "localhost", port: 3000, timeout: 5000, retries: 3,
    headers: { "Content-Type": "application/json" }
};

function createConfig(overrides) {
    const config = Object.create(defaultConfig);
    return Object.assign(config, overrides);
}

const devConfig = createConfig({ port: 8080 });
console.log(devConfig.host);    // "localhost" (inherited)
console.log(devConfig.port);    // 8080 (own property)
console.log(devConfig.timeout); // 5000 (inherited)
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does the Prototype pattern relate to JavaScript's built-in prototype chain? |
| 2 | What is the difference between shallow clone and deep clone in this pattern? |
| 3 | Why is `Object.create(null)` useful for prototype-less objects? |
| 4 | When would cloning be more expensive than creating a new object? |
## Next Steps

[Back to Chapter 4](04-builder.md): Builder Pattern
[Proceed to Chapter 6](06-adapter.md): Adapter Pattern to learn about adapter pattern.
