# var vs let vs const

<img src="" alt="Animated GIF" style="width:400px; height:300px;">


## `let` and `const` Are Block-Scoped

```javascript
{
    let x = 10;
    const y = 20;
    console.log(x, y);   // ✅ 10  20
}

console.log(x);  // ❌ ReferenceError — x is gone
console.log(y);  // ❌ ReferenceError — y is gone
```

Every time you open `{` and close `}`, you create a new scope for `let` and `const`. When `}` is reached, those variables are destroyed.

---

## `var` Is NOT Block-Scoped — Only Function-Scoped

```javascript
{
    var escaper = "I escape!";   // var ignores block boundaries
}
console.log(escaper);  // ✅ "I escape!" — var leaked out

function container() {
    var trapped = "I'm trapped here";  // var IS trapped by functions
}
container();
console.log(trapped);  // ❌ ReferenceError — functions DO contain var
```

**Memory trick:** `var` has a **broken fence** that can't keep it in blocks, but **solid walls** (functions) can.

---

## The Classic Bug: `var` in Loops

```javascript
// ❌ The Bug — Using var in a loop
let functions = [];

for (var i = 0; i < 3; i++) {
    functions.push(function() {
        console.log("My number is: " + i);
    });
}

functions[0]();  // Expected: 0   Actual: 3 😱
functions[1]();  // Expected: 1   Actual: 3 😱
functions[2]();  // Expected: 2   Actual: 3 😱
```

**Why?** `var i` creates ONLY ONE variable in memory. All three functions share the same `i`. By the time they run, the loop finished with `i = 3`.

```
Memory picture:
var i → 3   (one variable, shared by all three functions)
            ↑ shared by function[0]
            ↑ shared by function[1]
            ↑ shared by function[2]
```

```javascript
// ✅ The Fix — Using let in a loop
let functions = [];

for (let i = 0; i < 3; i++) {
    functions.push(function() {
        console.log("My number is: " + i);
    });
}

functions[0]();  // ✅ 0
functions[1]();  // ✅ 1
functions[2]();  // ✅ 2
```

**Why does `let` fix it?** `let i` creates a **new, separate variable** for each loop iteration. Each function gets its own `i`.

```
Memory picture:
Iteration 0: i₀ → 0   ← function[0] remembers this copy
Iteration 1: i₁ → 1   ← function[1] remembers this copy
Iteration 2: i₂ → 2   ← function[2] remembers this copy
```

---

## `var` and the Global Object

In browsers, `var` at the top level creates a property on `window`:

```javascript
var x = 10;
console.log(window.x);  // 10 (in browser) — var leaks to global object!

let y = 20;
console.log(window.y);  // undefined — let does NOT leak to global object
```

---

## Reassignment: `const` vs `let`

```javascript
let a = 10;
a = 20;           // ✅ OK — let allows reassignment
console.log(a);   // 20

const b = 10;
b = 20;           // ❌ TypeError — const does NOT allow reassignment

// const requires a value at declaration:
const c;          // ❌ SyntaxError — missing initializer
```

**Important:** `const` prevents reassignment of the variable, but does NOT prevent mutation of objects. The variable cannot point to a different object, but the object itself can change:

```javascript
const user = { name: "Tim" };
user.name = "Alice";  // ✅ OK — object mutation is allowed
// user = { name: "Bob" }; // ❌ TypeError — reassignment is NOT allowed
```

---

## Complete Comparison Table

| Feature | `let` | `const` | `var` |
|---------|-------|---------|-------|
| Scope | **Block** `{}` | **Block** `{}` | **Function** only |
| Hoisted? | Yes, but in TDZ | Yes, but in TDZ | Yes, initialized to `undefined` |
| Reassignable? | ✅ Yes | ❌ No | ✅ Yes |
| Redeclarable in same scope? | ❌ No | ❌ No | ✅ Yes |
| Creates `window` property? | ❌ No | ❌ No | ✅ Yes (browser) |
| New binding per loop iteration? | ✅ Yes | N/A | ❌ No |
| **Use it?** | ✅ Yes, preferred | ✅ Yes, for constants | ⚠️ Avoid in modern JS |

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Should I use `var`, `let`, or `const`? | Default to `const`. Use `let` when you need to reassign. Never use `var`. |
| Why does `var i` in a loop cause bugs? | `var` creates one shared variable; all closures reference the same one |
| Does `const` make objects immutable? | No — it only prevents reassignment of the variable, not mutation of the value |
| Where does `var` live in memory? | Function scope only — it ignores blocks |
| Why does `let` fix the loop bug? | Each iteration gets its own binding of the variable |
## Next Steps

[Back to Module 5 Chapter 9](../05-functions-closures/09-scope-chain-and-tdz.md): Scope Chain and TDZ
[Proceed to Chapter 4](04-hoisting-and-tdz.md): Hoisting and the Temporal Dead Zone to learn about hoisting and the temporal dead zone.
