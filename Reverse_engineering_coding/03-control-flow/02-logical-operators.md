# 02 — Logical Operators: `&&`, `||`, `!`, `??`

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## AND (`&&`)

Returns the first **falsy** operand, or the last operand if all are truthy.

```javascript
true && true         // → true
true && false        // → false
false && true        // → false
false && false       // → false

// Short-circuit behavior
0 && console.log("never runs")    // → 0  (short-circuits: console.log never called)
1 && console.log("runs")          // → logs "runs" (evaluates both)

// Practical examples
let user = { name: "John" };
user && console.log(user.name);   // "John" (guard: only access if user exists)

let isAdmin = false;
let result = isAdmin && "Admin panel";
console.log(result);              // false (isAdmin is falsy, returns it)
```

## OR (`||`)

Returns the first **truthy** operand, or the last operand if all are falsy.

```javascript
true || true         // → true
true || false        // → true
false || true        // → true
false || false       // → false

// Short-circuit behavior
1 || console.log("never runs")     // → 1  (short-circuits)
0 || console.log("runs")           // → logs "runs" (0 is falsy, evaluates second)

// Practical examples
let name = "";
let displayName = name || "Guest";
console.log(displayName);          // "Guest" (empty string is falsy)

let count = 0;
let displayCount = count || 10;
console.log(displayCount);         // 10  (0 is falsy — 0 might be a valid value!)
```

**Important caveat with `||`:** `0`, `""`, and `false` are all falsy, so `||` will replace them. Use `??` (nullish coalescing) if you only want to replace `null`/`undefined`.

## NOT (`!`)

Returns the **opposite boolean** of its operand.

```javascript
!true   // false
!false  // true
!0      // true  (0 is falsy, !0 → true)
!1      // false (1 is truthy, !1 → false)
!"hello" // false ("hello" is truthy)
!""     // true
!null   // true
!undefined // true
!NaN    // true
```

## Double NOT (`!!`)

Coerces any value to its boolean equivalent:

```javascript
!!0       // false
!!1       // true
!!""      // false
!!"hello" // true
!!null    // false
!!{}      // true
!![]      // true
```

## Nullish Coalescing Operator `??` (ES2020)

Returns the right operand only if the left operand is `null` or `undefined`:

```javascript
let value;

value = 0 ?? "default";       // 0  (0 is not null/undefined)
value = "" ?? "default";      // "" (empty string is not null/undefined)
value = false ?? "default";   // false (false is not null/undefined)
value = null ?? "default";    // "default"
value = undefined ?? "default"; // "default"

// Contrast with ||:
0 || "default";              // "default" (0 is falsy)
0 ?? "default";              // 0 (nullish check only)
```

## Operator Precedence

1. `!` (NOT) — highest
2. `&&` (AND) — middle
3. `||` (OR) — lowest
4. `??` (nullish coalescing) — same level as `||`, cannot be combined with `||` or `&&` without parentheses

```javascript
// ?? cannot be chained with || or && without parentheses
null || undefined ?? "default"; // SyntaxError
(null || undefined) ?? "default"; // "default"
```

## Short-Circuiting Comparison

| Operator | Returns                           | Evaluates second operand?              |
|----------|-----------------------------------|----------------------------------------|
| `&&`     | First falsy, or last if all truthy | Only if first is truthy               |
| `||`     | First truthy, or last if all falsy | Only if first is falsy                |
| `??`     | Right if left is null/undefined    | Only if left is null/undefined        |

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| Which operand was evaluated second? | Only if short-circuit did not apply. |
| Is `&&` used as a guard? | `obj && obj.prop` — accesses only if `obj` is truthy. |
| Is `||` used as a default? | `val || "default"` — but also replaces valid falsy values like `0`. |
| Could `??` be more appropriate? | If `0`, `""`, or `false` are valid, use `??` instead of `||`. |
| Could this condition be simplified? | Complex chains of `&&`/`||` can often be extracted to named variables. |
## Next Steps

[Back to Chapter 1](01-boolean-logic.md): 01 — Boolean Logic, Comparison & Coercion
[Proceed to Chapter 3](03-if-else-switch-ternary.md): 03 — Control Flow: `if`/`else`, `switch`, Ternary to learn about 03 — control flow: `if`/`else`, `switch`, ternary.
