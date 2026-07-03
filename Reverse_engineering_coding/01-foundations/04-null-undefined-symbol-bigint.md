# Null, Undefined, Symbol, BigInt, and typeof



## Primitive Type 4: Undefined

`undefined` is JavaScript's way of saying: **"This variable exists, but no value has been assigned yet."**

```javascript
let a;
console.log(a); // undefined
```

> `undefined` is NOT "nothing." It is a real, specific value. It's like an empty seat at a table — the seat exists, it's just not occupied.

---

## Primitive Type 5: Null

`null` represents the **intentional absence of a value**. A programmer deliberately sets something to `null` to say "this is empty on purpose."

```javascript
let user = null;  // "There is no user right now" — intentional
```

**The difference between `null` and `undefined`:**

| | `undefined` | `null` |
|---|---|---|
| **Who sets it?** | JavaScript sets it automatically | You set it deliberately |
| **What it means** | "Not assigned yet" | "Intentionally empty" |
| **Analogy** | A box that was never filled | A box you purposely left empty |

---

## Primitive Type 6: Symbol (ES6)

A Symbol is a **guaranteed-unique identifier**. No two Symbols are ever equal.

```javascript
const sym1 = Symbol("myKey");
const sym2 = Symbol("myKey");

console.log(sym1 === sym2); // false — always different!
```

Symbols are mainly used as unique property keys for objects to avoid naming conflicts.

---

## Primitive Type 7: BigInt (ES2020)

JavaScript's `Number` type has limits on how large integers can be stored accurately. For bigger numbers, use `BigInt`.

```javascript
const bigNumber = 9007199254740992n;         // Note the 'n'
const anotherBig = BigInt("9999999999999999999");
```

The `n` suffix tells JavaScript this is a BigInt, not a regular Number.

---

## Checking the Type of a Value

Use the `typeof` operator:

```javascript
typeof 42              // "number"
typeof "hello"         // "string"
typeof true            // "boolean"
typeof undefined       // "undefined"
typeof Symbol()        // "symbol"
typeof 100n            // "bigint"
typeof {}              // "object"
typeof []              // "object"
typeof function(){}    // "function"

// ⚠️ FAMOUS BUG:
typeof null            // "object" — this is WRONG, null is NOT an object
```

> `typeof null === "object"` is a bug from JavaScript's first version in 1995. It's never been fixed because fixing it would break millions of existing websites.

**How to correctly check for null:**

```javascript
value === null   // true if and only if value is null
```

---

## Reverse Engineering: null vs undefined

| Question | Answer |
|---|---|
| When should I use `null`? | When you want to explicitly signal "no value" |
| When should I use `undefined`? | Let JavaScript use it naturally |
| What does `null == undefined` return? | `true` (loose equality) |
| What does `null === undefined` return? | `false` (different types) |
## Next Steps

[Back to Chapter 3](03-values-primitives.md): Values and Primitives
[Proceed to Chapter 5](05-variables.md): Variables to learn about variables.
