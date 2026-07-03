# Encapsulation, Polymorphism & Composition

## Encapsulation

Hides internal implementation details, exposing only a controlled public interface.

### Convention-Based (`_` prefix)

```javascript
class User {
    constructor(name) { this._name = name; }
    getName() { return this._name; }
    setName(value) {
        if (typeof value !== "string") throw new Error("Invalid name");
        this._name = value.trim();
    }
}
```

**Problem:** `_` is just a convention — does NOT prevent access.

```javascript
const u = new User("John");
console.log(u._name); // "John"
```

### Private Fields with `#` (ES2022+)

```javascript
class BankAccount {
    #balance = 0;
    constructor(initialBalance) {
        if (initialBalance < 0) throw new Error("Negative initial balance");
        this.#balance = initialBalance;
    }
    deposit(amount) {
        if (amount <= 0) throw new Error("Invalid amount");
        this.#balance += amount;
        return this.#balance;
    }
    withdraw(amount) {
        if (amount > this.#balance) throw new Error("Insufficient funds");
        this.#balance -= amount;
        return this.#balance;
    }
    getBalance() { return this.#balance; }
}
const account = new BankAccount(1000);
console.log(account.#balance); // SyntaxError — truly private
```

**Private fields:** Cannot be accessed from outside, not returned by `Object.keys()`, not inherited by subclasses.

### Private Methods

```javascript
class AuthService {
    #validatePassword(p) { return p.length >= 8; }
    register(email, password) {
        if (!this.#validatePassword(password)) throw new Error("Password too weak");
        return { email, passwordHash: "hashed:" + password };
    }
}
auth.#validatePassword("test"); // SyntaxError
```

### Encapsulation via Closures (Pre-ES2022)

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    return {
        deposit(amount) {
            if (amount <= 0) throw new Error("Invalid amount");
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > balance) throw new Error("Insufficient funds");
            balance -= amount;
            return balance;
        },
        getBalance() { return balance; }
    };
}
const acc = createBankAccount(1000);
console.log(acc.balance); // undefined — truly private via closure
```

## Polymorphism

"Many forms" — different classes implement the same method name with different behaviors.

### Via Inheritance

```javascript
class Animal { speak() { console.log("Some generic sound"); } }
class Dog extends Animal { speak() { console.log("Woof!"); } }
class Cat extends Animal { speak() { console.log("Meow!"); } }

function makeAnimalSpeak(animal) { animal.speak(); }

makeAnimalSpeak(new Dog()); // "Woof!"
makeAnimalSpeak(new Cat()); // "Meow!"
```

### Via Duck Typing

JavaScript doesn't require formal interfaces — any object with the right method works.

```javascript
function makeSound(speaker) { console.log(speaker.speak()); }
class Dog { speak() { return "Woof!"; } }
class Cat { speak() { return "Meow!"; } }
const robot = { speak() { return "Beep boop"; } };
makeSound(robot); // "Beep boop"
```

### Strategy Pattern (Composition)

```javascript
class PlainFormatter {
    format(items) { return items.join(", "); }
}
class HtmlFormatter {
    format(items) {
        return `<ul>\n${items.map(i => `  <li>${i}</li>`).join("\n")}\n</ul>`;
    }
}
class JsonFormatter {
    format(items) { return JSON.stringify(items, null, 2); }
}
class DataExporter {
    constructor(formatter) { this.formatter = formatter; }
    export(data) { console.log(this.formatter.format(data)); }
}
const data = ["Apple", "Banana", "Cherry"];
new DataExporter(new PlainFormatter()).export(data);
new DataExporter(new HtmlFormatter()).export(data);
new DataExporter(new JsonFormatter()).export(data);
```

**Composition** — `DataExporter` composes with a formatter rather than inheriting from one.

### Composition vs Inheritance

| Aspect | Inheritance | Composition |
|--------|------------|-------------|
| Relationship | "is-a" | "has-a" |
| Coupling | Tight (child depends on parent) | Loose (depends on interface) |
| Flexibility | Rigid hierarchy | Swap implementations at runtime |

**Prefer composition over inheritance** — more flexible, loosely-coupled code.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which data is private? | `#` fields or closure variables |
| Is this convention-based or enforced? | `#` is enforced. `_` is convention only |
| Can subclasses access private fields? | No |
| Is the method being overridden? | Check if child has same method name as parent |
| Is duck typing used? | Check if any object with the right method is accepted |
| Is composition used? | Check if objects are passed in rather than inherited |
## Next Steps

[Back to Chapter 5](05-classes.md): ES6+ Class Syntax, Inheritance & instanceof
[Proceed to Chapter 7](07-project.md): Projects to learn about projects.
