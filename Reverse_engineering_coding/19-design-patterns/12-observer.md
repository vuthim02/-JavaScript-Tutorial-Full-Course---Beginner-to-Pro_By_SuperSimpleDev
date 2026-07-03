# Observer Pattern

## What Problem It Solves

When one object (the *subject*) changes state, many other objects (the *observers*) need to be notified automatically. Polling is inefficient — the observer pattern pushes updates.

## Implementation

```javascript
class Subject {
    constructor() { this._observers = new Set(); }

    subscribe(observer) {
        this._observers.add(observer);
        return () => this._observers.delete(observer);
    }

    unsubscribe(observer) { this._observers.delete(observer); }

    notify(data) {
        for (const observer of this._observers) observer.update(data);
    }
}

class Observer {
    constructor(name) { this.name = name; }

    update(data) { console.log(`${this.name} received: ${JSON.stringify(data)}`); }
}

// Usage
const newsAgency = new Subject();

const alice = new Observer("Alice");
const bob = new Observer("Bob");

newsAgency.subscribe({ update(data) {
    console.log(`Charlie (anonymous) received: ${JSON.stringify(data)}`);
}});

newsAgency.subscribe(alice);
newsAgency.subscribe(bob);

newsAgency.notify({ headline: "Breaking News!" });
// Alice received: {"headline":"Breaking News!"}
// Bob received: {"headline":"Breaking News!"}
// Charlie (anonymous) received: {"headline":"Breaking News!"}
```

## Observer with Event Emitter (Node.js Style)

Node.js's `EventEmitter` is a full implementation of the Observer pattern:

```javascript
const EventEmitter = require("events");

class OrderSystem extends EventEmitter {
    createOrder(orderData) {
        console.log("Order created");
        this.emit("order:created", orderData);
    }

    payOrder(orderId) {
        console.log("Order paid");
        this.emit("order:paid", orderId);
    }

    shipOrder(orderId) {
        console.log("Order shipped");
        this.emit("order:shipped", orderId);
    }
}

const orders = new OrderSystem();

orders.on("order:created", (data) => {
    console.log(`Notification: New order #${data.id}`);
});

orders.on("order:created", (data) => {
    console.log(`Analytics: Order value $${data.total}`);
});

orders.createOrder({ id: 123, total: 49.99 });
// Order created
// Notification: New order #123
// Analytics: Order value $49.99
```

## Real-World Use Case

React's `useEffect` is an observer pattern. Redux's `store.subscribe()` is an observer. DOM events (`addEventListener`) are the Observer pattern. RxJS is an entire library built on this pattern.

```javascript
const button = document.querySelector("#myButton");
button.addEventListener("click", () => console.log("Clicked!"));
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | What is the difference between push-based and pull-based observers? |
| 2 | How would you handle errors in one observer without breaking others? |
| 3 | What happens when an observer subscribes inside a notification? |
| 4 | How does memory leak happen with observers that are never unsubscribed? |
| 5 | Compare Observer pattern vs Publish-Subscribe pattern. |
## Next Steps

[Back to Chapter 11](11-mixin.md): Mixin Pattern
[Proceed to Chapter 13](13-mediator.md): Mediator Pattern to learn about mediator pattern.
