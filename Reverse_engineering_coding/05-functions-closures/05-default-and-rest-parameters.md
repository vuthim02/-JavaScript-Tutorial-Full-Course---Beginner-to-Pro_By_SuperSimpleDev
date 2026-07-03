# Default Parameters

## Syntax & Behavior

```javascript
function greet(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

greet()                   // "Hello, Guest!"
greet("Alice")            // "Hello, Alice!"
greet("Bob", "Hi")        // "Hi, Bob!"
greet(undefined, "Hey")   // "Hey, Guest!" ← undefined triggers default
greet(null, "Hey")        // "Hey, null"   ← null does NOT trigger default
```

## Evaluated at Call Time, Not Definition Time

```javascript
let count = 0;

function makeDefault() {
    return ++count; // runs every time it's needed
}

function test(val = makeDefault()) {
    console.log(val);
}

test();       // 1 (makeDefault called)
test();       // 2 (called again)
test("X");    // "X" (makeDefault NOT called)
```

## Defaults Can Reference Earlier Parameters

```javascript
function range(start, end, step = (end - start) / 10) {
    return { start, end, step };
}

range(0, 100);    // { start: 0, end: 100, step: 10 }
range(0, 100, 5); // { start: 0, end: 100, step: 5 }
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| What triggers a default? | `undefined` or missing argument |
| Does `null` trigger a default? | No |
| When is the default expression evaluated? | At call time |
| Can defaults reference other params? | Yes — earlier ones only |

---

# Rest Parameters

## Syntax

```javascript
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4, 5); // 15
```

## Rest Collects All Remaining Arguments

```javascript
function log(level, timestamp, ...messages) {
    console.log(`[${level}] ${timestamp}:`, ...messages);
}

log("INFO", "12:00", "Server started", "on port", 3000);
// [INFO] 12:00: Server started on port 3000
```

## Rules

```javascript
function valid(first, second, ...rest) {}  // ✅
function invalid(...rest, last) {}         // ❌ SyntaxError — rest must be last
function alsoInvalid(...a, ...b) {}        // ❌ SyntaxError — only one rest allowed
```

## Rest vs `arguments` — Side-by-Side

```javascript
function withArguments() {
    console.log(arguments);              // Arguments object (not array)
    console.log(Array.isArray(arguments)); // false
    // arguments.map(...)               // ❌ TypeError
    const arr = Array.from(arguments);   // must convert first
    console.log(arr.map(x => x * 2));   // ✅ now works
}

function withRest(...args) {
    console.log(args);                   // real Array
    console.log(Array.isArray(args));    // true
    console.log(args.map(x => x * 2));  // ✅ works directly
}
```

## `arguments` Is Not Available in Arrow Functions

```javascript
const arrow = () => {
    console.log(arguments); // ❌ ReferenceError
};

const fixed = (...args) => {
    console.log(args); // ✅ [1, 2, 3]
};
```
## Next Steps

[Back to Chapter 4](04-first-class-citizens-and-parameters.md): First-Class Citizens
[Proceed to Chapter 6](06-callback-functions.md): Callback Functions to learn about callback functions.
