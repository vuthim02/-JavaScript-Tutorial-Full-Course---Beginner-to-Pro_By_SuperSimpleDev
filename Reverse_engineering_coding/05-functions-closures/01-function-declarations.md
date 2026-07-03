# Big Picture — What Is a Function?

A function is **everything at once**:

```
┌─────────────────────────────────────────────────────────┐
│                   FUNCTION                              │
│                                                         │
│  📦 A VALUE        — store in variables, arrays, objects│
│  🧱 AN OBJECT      — has .name, .length, .prototype     │
│  ♻️  REUSABLE CODE  — defined once, called many times   │
│  👑 FIRST-CLASS    — passed, returned, assigned         │
│  🔒 A SCOPE        — creates its own variable space     │
│  📬 A CLOSURE      — remembers where it was born        │
└─────────────────────────────────────────────────────────┘
```

```javascript
const fn = function greet() { console.log("Hello"); };

fn.customProp = "I am an object too";

fn();                    // called as reusable code
const arr = [fn];        // stored in an array
function run(f) { f(); } // passed as argument
run(fn);
function create() { return fn; } // returned from function
create()();              // "Hello"
```

---

# Function Declaration

## Syntax

```javascript
function greet(name) {
    return "Hello, " + name;
}
```

## Key Rules

- **Must have a name** — no anonymous declarations
- **Fully hoisted** — the engine moves both the name AND body to the top of the scope before any code runs
- Creates a named binding in the **current scope**

## Hoisting in Action

```javascript
// ✅ Works — declaration is hoisted
sayHello();

function sayHello() {
    console.log("Hello!");
}
```

## Memory Representation

```
Global Execution Context — Creation Phase:
┌──────────────────────────────────────────┐
│  Variable Environment:                   │
│    sayHello → <function ref> ────────┐   │
└──────────────────────────────────────┼───┘
                                       │
Heap:                                  ▼
┌──────────────────────────────────────────┐
│  Function Object                         │
│  ┌────────────────────────────────────┐  │
│  │ name:        "sayHello"            │  │
│  │ length:      0                     │  │
│  │ prototype:   { constructor: fn }   │  │
│  │ [[Environment]]: global scope ref  │  │
│  │ [[Call]]:    internal code body    │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

## Built-in Properties

```javascript
function add(a, b) { return a + b; }

add.name       // "add"
add.length     // 2  ← number of formal parameters
add.toString() // "function add(a, b) { return a + b; }"
add.prototype  // { constructor: add }
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Who calls this? | Trace all call sites |
| Is it hoisted? | Yes — fully |
| What does `name` return? | The identifier after `function` |
| What does `length` return? | Number of parameters (before any `=default` or `...rest`) |
| What if nobody calls it? | Dead code — stays in heap, never executes |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-function-expressions-and-anonymous.md): Function Expression to learn about function expression.
