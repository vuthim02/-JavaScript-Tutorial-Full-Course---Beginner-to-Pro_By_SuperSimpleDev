# Factory Method Pattern

## What Problem It Solves

Creating objects with `new` hard-codes the class. When the exact type is only known at runtime, or when creation logic is complex or scattered, you centralize it in a factory.

## Implementation

```javascript
class Car {
    constructor(model) {
        this.model = model;
        this.type = "car";
    }
    drive() {
        return `Driving car ${this.model}`;
    }
}

class Truck {
    constructor(model) {
        this.model = model;
        this.type = "truck";
    }
    drive() {
        return `Driving truck ${this.model}`;
    }
}

class VehicleFactory {
    createVehicle(type, model) {
        switch (type) {
            case "car":  return new Car(model);
            case "truck": return new Truck(model);
            default: throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

const factory = new VehicleFactory();
const myCar = factory.createVehicle("car", "Sedan");
const myTruck = factory.createVehicle("truck", "Pickup");
```

### Factory with Configuration Object

```javascript
class UserFactory {
    createUser({ role, name, email }) {
        const base = { name, email, createdAt: new Date() };
        switch (role) {
            case "admin":  return { ...base, permissions: ["read", "write", "delete"], role };
            case "editor": return { ...base, permissions: ["read", "write"], role };
            case "viewer": return { ...base, permissions: ["read"], role };
            default: throw new Error(`Unknown role: ${role}`);
        }
    }
}
```

## Real-World Use Case

React's `createElement` and `createRoot` are factories. Express's route factory creates route handlers. `fetch` returns a Response factory.

```javascript
function $(selector) {
    if (typeof selector === "string") return document.querySelector(selector);
    if (typeof selector === "function") {
        document.addEventListener("DOMContentLoaded", selector);
        return;
    }
    throw new Error("Invalid argument to $");
}
```

---

# Abstract Factory Pattern

## What Problem It Solves

When you need to create *families* of related objects that must work together, an abstract factory provides a single entry point without specifying concrete classes.

## Implementation

```javascript
class Button { render() { throw new Error("Must implement render()"); } }
class Checkbox { render() { throw new Error("Must implement render()"); } }

class WindowsButton extends Button {
    render() { return "Windows-style button"; }
}
class WindowsCheckbox extends Checkbox {
    render() { return "Windows-style checkbox"; }
}
class MacButton extends Button {
    render() { return "Mac-style button"; }
}
class MacCheckbox extends Checkbox {
    render() { return "Mac-style checkbox"; }
}

class GUIFactory {
    createButton() { throw new Error("Must implement createButton()"); }
    createCheckbox() { throw new Error("Must implement createCheckbox()"); }
}

class WindowsFactory extends GUIFactory {
    createButton() { return new WindowsButton(); }
    createCheckbox() { return new WindowsCheckbox(); }
}

class MacFactory extends GUIFactory {
    createButton() { return new MacButton(); }
    createCheckbox() { return new MacCheckbox(); }
}

function createUI(factory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    return { button, checkbox };
}

const os = navigator.platform.startsWith("Win") ? "windows" : "mac";
const factory = os === "windows" ? new WindowsFactory() : new MacFactory();
const ui = createUI(factory);
console.log(ui.button.render());
```

## Real-World Use Case

UI component libraries (Material UI, Ant Design) use abstract factories. A notification system supporting email, SMS, and push uses this pattern.

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does Abstract Factory differ from Factory Method? |
| 2 | When would you need multiple families of objects in the same application? |
| 3 | How would you test code that uses an abstract factory? |
| 4 | Why would you choose a factory over a constructor? |
| 5 | When does a factory become an anti-pattern (too many types)? |
| 6 | How would you implement a factory that caches created objects? |
## Next Steps

[Back to Chapter 2](02-singleton.md): Singleton Pattern
[Proceed to Chapter 4](04-builder.md): Builder Pattern to learn about builder pattern.
