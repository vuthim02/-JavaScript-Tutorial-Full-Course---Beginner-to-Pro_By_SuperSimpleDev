# Mediator Pattern

## What Problem It Solves

When many components communicate directly, they become tightly coupled — a "spaghetti" of references. A *mediator* centralizes communication so components interact only with the mediator, not with each other.

## Implementation

```javascript
class ChatMediator {
    constructor() { this.users = new Map(); }

    addUser(user) {
        this.users.set(user.name, user);
        user.setMediator(this);
    }

    send(message, from, to) {
        if (to) {
            const recipient = this.users.get(to);
            if (recipient) recipient.receive(message, from);
        } else {
            for (const [name, user] of this.users) {
                if (name !== from) user.receive(message, from);
            }
        }
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.mediator = null;
    }

    setMediator(mediator) { this.mediator = mediator; }

    send(message, to = null) {
        console.log(`${this.name} sends: "${message}"`);
        this.mediator.send(message, this.name, to);
    }

    receive(message, from) {
        console.log(`${this.name} receives from ${from}: "${message}"`);
    }
}

const chat = new ChatMediator();
const alice = new User("Alice");
const bob = new User("Bob");
const charlie = new User("Charlie");

chat.addUser(alice);
chat.addUser(bob);
chat.addUser(charlie);

alice.send("Hello everyone!");
bob.send("Hey Alice!", "Alice");
```

## Real-World Use Case

Air traffic control is the classic metaphor. In frontend, form components communicate through a form mediator.

```javascript
class FormMediator {
    constructor() { this.fields = {}; }

    registerField(name, field) {
        this.fields[name] = field;
        field.setMediator(this);
    }

    notify(sender, event) {
        if (event === "change") this.validate();
        if (event === "submit") this.handleSubmit(sender);
    }

    validate() {
        const values = {};
        for (const [name, field] of Object.entries(this.fields)) {
            values[name] = field.getValue();
            field.setError(null);
        }
        if (values.email && !values.email.includes("@"))
            this.fields.email.setError("Invalid email");
        if (values.password && values.password.length < 6)
            this.fields.password.setError("Password too short");
    }

    handleSubmit(sender) { this.validate(); console.log("Form submitted!"); }
}

class FormField {
    constructor(name) {
        this.name = name;
        this.value = "";
        this.error = null;
        this.mediator = null;
    }

    setMediator(mediator) { this.mediator = mediator; }
    setValue(value) { this.value = value; this.mediator.notify(this, "change"); }
    getValue() { return this.value; }

    setError(error) {
        this.error = error;
        if (error) console.log(`Error on ${this.name}: ${error}`);
    }
}
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does Mediator differ from Observer? |
| 2 | When does a mediator become a "god object" anti-pattern? |
| 3 | How would you test components that communicate through a mediator? |
| 4 | Compare Mediator vs Event Bus. What are the trade-offs? |
## Next Steps

[Back to Chapter 12](12-observer.md): Observer Pattern
[Proceed to Chapter 14](14-command.md): Command Pattern to learn about command pattern.
