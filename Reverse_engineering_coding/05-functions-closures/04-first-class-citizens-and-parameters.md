# First-Class Citizens

## The 4 Powers

```javascript
// 1. Store in a variable
const fn = function(x) { return x * 2; };

// 2. Store in data structures
const ops = {
    double: x => x * 2,
    square: x => x * x,
    negate: x => -x
};
const pipeline = [ops.double, ops.square, ops.negate];

// 3. Pass as argument
function applyAll(value, fns) {
    return fns.reduce((v, fn) => fn(v), value);
}
console.log(applyAll(3, pipeline)); // negate(square(double(3))) = -36

// 4. Return from a function
function createMultiplier(factor) {
    return x => x * factor; // returned function
}
const triple = createMultiplier(3);
triple(5); // 15
```

## The Crucial Difference: Reference vs Call

```javascript
function greet() { console.log("Hello"); }

greet    // 📌 reference — the function object itself
greet()  // 📞 call — executes the function right now

// Passing reference (correct for callbacks)
setTimeout(greet, 1000);   // ✅ passes the function
setTimeout(greet(), 1000); // ❌ passes the RETURN VALUE (undefined)
```

---

# Parameters & Arguments

## Parameters Are Scoped Local Variables

```javascript
function add(a, b) {
    //  a and b are created fresh every call
    return a + b;
}
add(5, 3); // new scope: a=5, b=3
add(2, 8); // new scope: a=2, b=8
```

## Missing Arguments → `undefined`

```javascript
function greet(name, title) {
    console.log(`${title} ${name}`);
}
greet("Alice");        // "undefined Alice"
greet("Alice", "Dr."); // "Dr. Alice"
```

## Extra Arguments → Ignored (unless you capture them)

```javascript
function log(a) { console.log(a); }
log(1, 2, 3); // 1 — 2 and 3 are silently ignored

function logAll(a, ...rest) { console.log(a, rest); }
logAll(1, 2, 3); // 1 [2, 3]
```

## Pass by Value — Always

```javascript
// Primitives — caller is completely safe
function tryChange(x) { x = 999; }
let n = 5;
tryChange(n);
console.log(n); // 5 — unchanged

// Objects — reference VALUE is copied, but mutation is visible
function modify(obj) {
    obj.value = 100; // ✅ mutation — caller sees this
    obj = {};        // ❌ reassignment — local only, caller unaffected
}
const data = { value: 5 };
modify(data);
console.log(data.value); // 100
```

## Destructuring Parameters

```javascript
// Object destructuring
function display({ name, age = 0, role = "user" }) {
    console.log(`${name} (${age}) — ${role}`);
}
display({ name: "Alice", age: 25 }); // "Alice (25) — user"

// Array destructuring
function firstTwo([a, b]) {
    return a + b;
}
firstTwo([10, 20, 30]); // 30

// Nested + defaults with fallback
function configure({
    server: { host = "localhost", port = 3000 } = {},
    debug = false
} = {}) {
    console.log(`${host}:${port} debug=${debug}`);
}
configure();                           // localhost:3000 debug=false
configure({ server: { port: 8080 } }); // localhost:8080 debug=false
```

## Reverse Engineering Checklist

### For First-Class Citizens

| Question | Answer |
|----------|--------|
| Is this a reference or a call? | `fn` = reference. `fn()` = call. |
| What happens if I pass `fn()` instead of `fn`? | The return value is passed (often undefined). |
| Can I store functions in arrays? | Yes — functions are values like any other. |
| Can I return a function from a function? | Yes — this is how factories and closures work. |
| What can I do with a function? | Store, pass, return, add properties, call. |

### For Parameters and Arguments

| Question | Answer |
|----------|--------|
| What value do missing args get? | `undefined` |
| Are extra args ignored? | Yes — unless captured via `...rest` or `arguments`. |
| Is the caller's primitive affected? | No — primitives are passed by value. |
| Is the caller's object affected by mutation? | Yes — object reference is copied, but mutation is visible. |
| Is reassignment of a parameter visible to the caller? | No — reassignment only affects the local variable. |
| Is there a way to capture all arguments? | Use rest parameters (`...args`) or `arguments` (legacy). |
## Next Steps

[Back to Chapter 3](03-arrow-functions.md): Arrow Functions
[Proceed to Chapter 5](05-default-and-rest-parameters.md): Default Parameters to learn about default parameters.
