# Projects — Part 1

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Project 1 — Advanced Counter (Closures + Factory)

```javascript
function createAdvancedCounter({ name = "counter", start = 0, step = 1, min = -Infinity, max = Infinity } = {}) {
    let count = start;
    const history = [];

    const record = (op, val) => {
        history.push({ op, val, timestamp: Date.now() });
    };

    return {
        increment(by = step) {
            const next = Math.min(count + by, max);
            record("+", by);
            return (count = next);
        },
        decrement(by = step) {
            const next = Math.max(count - by, min);
            record("-", by);
            return (count = next);
        },
        reset() {
            record("reset", count);
            count = start;
            return count;
        },
        value() { return count; },
        history() { return [...history]; },
        undo() {
            const last = history.pop();
            if (!last) return count;
            if (last.op === "+") count -= last.val;
            else if (last.op === "-") count += last.val;
            else count = start;
            return count;
        },
        toString() { return `${name}: ${count}`; }
    };
}

const score = createAdvancedCounter({ name: "Score", start: 0, step: 10, min: 0, max: 100 });
score.increment();    // 10
score.increment(25);  // 35
score.undo();         // 10
console.log(`${score}`); // "Score: 10"
```

## Project 2 — Event Emitter (HOF + Closures)

```javascript
function createEventEmitter() {
    const events = new Map();

    function on(event, handler) {
        if (!events.has(event)) events.set(event, new Set());
        events.get(event).add(handler);
        return () => off(event, handler); // returns unsubscribe fn
    }

    function once(event, handler) {
        const wrapped = (...args) => {
            handler(...args);
            off(event, wrapped);
        };
        return on(event, wrapped);
    }

    function off(event, handler) {
        events.get(event)?.delete(handler);
    }

    function emit(event, ...args) {
        const handlers = events.get(event);
        if (!handlers?.size) return false;
        handlers.forEach(h => h(...args));
        return true;
    }

    function clear(event) {
        event ? events.delete(event) : events.clear();
    }

    return { on, once, off, emit, clear,
        listeners: (event) => [...(events.get(event) ?? [])].length
    };
}

const bus = createEventEmitter();

const unsubscribe = bus.on("data", payload => console.log("Got:", payload));
bus.once("connect", () => console.log("Connected! (fires once)"));

bus.emit("connect");        // "Connected!"
bus.emit("connect");        // (nothing — once already fired)
bus.emit("data", { id: 1 }); // "Got: {id:1}"

unsubscribe();
bus.emit("data", { id: 2 }); // (nothing — unsubscribed)
```

## Project 3 — Async Data Pipeline (async/await + composition)

```javascript
const pipe = (...fns) => async (x) => {
    let value = x;
    for (const fn of fns) {
        value = await fn(value);
    }
    return value;
};

// Pure transformation steps
const parseUser    = data => ({ ...data, name: data.name.trim() });
const validateUser = user => {
    if (!user.name) throw new Error("Name required");
    if (!user.email?.includes("@")) throw new Error("Invalid email");
    return user;
};
const enrichUser   = async user => {
    // Simulate async enrichment
    const profile = await fetch(`/api/profile/${user.id}`).then(r => r.json());
    return { ...user, ...profile };
};
const formatUser   = user => ({
    displayName: user.name.toUpperCase(),
    contact: user.email,
    verified: user.verified ?? false
});

const processUser = pipe(parseUser, validateUser, enrichUser, formatUser);

// Usage
async function handleUserSubmit(rawData) {
    try {
        const result = await processUser(rawData);
        console.log("Processed user:", result);
    } catch (err) {
        console.error("Pipeline failed:", err.message);
    }
}
```
## Next Steps

[Back to Chapter 25](25-side-effects-and-checklist.md): Side Effects
[Proceed to Chapter 27](27-projects-part2.md): Projects — Part 2 to learn about projects — part 2.
