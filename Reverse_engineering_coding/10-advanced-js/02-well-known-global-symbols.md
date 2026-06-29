# 02 — Well-Known Symbols & Global Symbols

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Well-Known Symbols

JavaScript has built-in symbols that customize behavior:

| Symbol | Used For |
|--------|----------|
| `Symbol.iterator` | Makes an object iterable (`for...of`) |
| `Symbol.toStringTag` | Customizes `Object.prototype.toString` |
| `Symbol.species` | Controls constructor for derived objects |
| `Symbol.hasInstance` | Customizes `instanceof` |
| `Symbol.toPrimitive` | Controls conversion to primitive |
| `Symbol.match` | Customizes `String.prototype.match` |
| `Symbol.replace` | Customizes `String.prototype.replace` |
| `Symbol.search` | Customizes `String.prototype.search` |
| `Symbol.split` | Customizes `String.prototype.split` |

```javascript
// Example: Symbol.toStringTag
class MyClass {
    get [Symbol.toStringTag]() {
        return "MyCustomClass";
    }
}

const obj = new MyClass();
console.log(Object.prototype.toString.call(obj)); // "[object MyCustomClass]"
```

---

## Symbol.for() — Global Registry

Creates/reuses symbols in a global registry.

```javascript
const s1 = Symbol.for("user");
const s2 = Symbol.for("user");
```

Result:

```javascript
s1 === s2
```

Output:

```
true
```

---

## Regular Symbols vs Global Symbols

```javascript
// Regular symbols – always unique
const a = Symbol("key");
const b = Symbol("key");
console.log(a === b); // false

// Global symbols – shared by key
const c = Symbol.for("key");
const d = Symbol.for("key");
console.log(c === d); // true
```

---

## Symbol.keyFor()

Retrieves the key from a global symbol:

```javascript
const sym = Symbol.for("app.role");
console.log(Symbol.keyFor(sym)); // "app.role"

const localSym = Symbol("local");
console.log(Symbol.keyFor(localSym)); // undefined (not in registry)
```

---

## Use Case: Cross-realm Communication

Symbols from different realms (e.g., iframe, different windows) can share global symbols:

```javascript
// In iframe 1
const shared = Symbol.for("shared");

// In iframe 2
const shared = Symbol.for("shared");

console.log(shared1 === shared2); // true (same global registry)
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this Symbol shared globally? | Check if it was created with `Symbol.for()` instead of `Symbol()`. |
| Can two parts of an app share a Symbol? | Yes, use `Symbol.for("key")` to get the same Symbol by string key. |
| What is the key for this global Symbol? | Use `Symbol.keyFor(sym)`. |
## Next Steps

[Back to Chapter 1](01-symbols.md): 01 — Symbol
[Proceed to Chapter 3](03-iterator-protocol.md): 03 — Iterator Protocol to learn about 03 — iterator protocol.
