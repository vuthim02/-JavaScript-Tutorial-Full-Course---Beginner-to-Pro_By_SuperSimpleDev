# 14 — Deoptimization

## Deoptimization = Bailout

When the JIT compiler makes an assumption and that assumption is violated, the optimized code must **bail out** (deoptimize) back to the interpreter.

## Type Instability

```javascript
// JIT sees: add(1, 2), add(3, 4) → assumes numbers
function add(a, b) {
    return a + b;
}

add(1, 2);       // Interpreter → profiler sees numbers
add(3, 4);       // Gets hot → JIT compiles for numbers
add("A", "B");   // HEY! Strings, not numbers → DEOPTIMIZE
```

After deoptimization, the function may not be recompiled (or may be recompiled with different assumptions = less efficient).

## Shape Instability

```javascript
function processUser(user) {
    return user.name;
}

processUser({ name: "A" });            // HC1
processUser({ name: "B", age: 5 });    // HC2 (polymorphic)
processUser({ name: "C", role: "admin", id: 7 }); // HC3 (megamorphic)
```

Each new shape triggers deoptimization of the optimized code.

## The Full Deopt Cycle

```
1. Function runs interpreted (slow)
2. Function gets hot
3. JIT compiles with current type information
4. Function runs fast (machine code)
5. New type/shape arrives
6. Compiled code assumptions violated
7. Deoptimization: fall back to interpreter
8. Function runs slow again
9. Possibly recompiled with more generic assumptions
```

### Deoptimization Thrashing

If a function repeatedly optimizes and deoptimizes (because types keep changing), the result is **worse than no optimization at all** — the overhead of repeated compilation exceeds the benefit.

## Common Deoptimization Triggers

| Code Pattern | Why It Deopts |
|-------------|---------------|
| `delete obj.prop` | Changes shape, destroys hidden class |
| `obj[x]` with variable key | Prevents IC (key not known statically) |
| `typeof x === 'string'` then `x.toUpperCase()` | Type changes cause deopt |
| `try/catch` inside hot function | V8 deopts functions with try/catch |
| `arguments` object | Disables many optimizations |
| `eval()` | Disables almost all optimization |
| Spread operator on large arrays | Can deopt in some engines |
| `__proto__` assignment | Deoptimizes prototype chain |
| Object destructuring with new properties | May cause shape changes |

```javascript
// Bad — deoptimization sources
function bad(arguments) {  // Don't name parameter 'arguments'
    console.log(arguments[0]); // Disables optimizations
}

function bad2(obj) {
    delete obj.x; // Shape change
}

function bad3(obj, key) {
    return obj[key]; // Dynamic key — cannot IC
}
```

## Optimizing for the Compiler

```javascript
// Good — compiler-friendly
function good(obj) {
    return obj.name;  // Static property — can IC
}

function good2(a, b) {
    return Number(a) + Number(b); // Ensure type stability
}

function good3(obj) {
    const { x, y } = obj; // Destructure once, then use locals
    return x + y;
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are parameter types stable? | Yes → optimized, No → deoptimized |
| Do objects have consistent shapes? | Yes → IC fast, No → IC slow |
| What causes deopt? | Type changes, shape changes, `delete`, `Object.defineProperty` |
| Can deopt happen repeatedly? | Yes, thrashing between opt/deopt → worst performance |
| Is `try/catch` in hot path? | If yes, consider refactoring |
| Is `delete` used? | If yes, consider setting to `undefined` instead |
| Is `arguments` used? | Use rest params instead |
## Next Steps

[Back to Chapter 13](13-inline-caching.md): 13 — Inline Caching (IC)
[Proceed to Chapter 15](15-performance-patterns-i.md): 15 — Performance Patterns I: Loops, Memoization & Lazy Evaluation to learn about 15 — performance patterns i: loops, memoization & lazy evaluation.
