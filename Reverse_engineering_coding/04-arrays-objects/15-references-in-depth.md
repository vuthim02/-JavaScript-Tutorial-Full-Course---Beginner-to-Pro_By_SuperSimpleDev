# References in Depth

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Core Concept

Primitives: stored directly in the variable (on the stack). Objects: the variable holds a **reference** (memory address) pointing to the object in the heap.

```javascript
// Primitive — value stored directly
let a = 10;
let b = a;      // b gets a copy of 10
a = 20;
console.log(b); // 10 — unchanged

// Object — reference stored
let x = { value: 10 };
let y = x;      // y gets a copy of the reference (same object)
x.value = 20;
console.log(y.value); // 20 — same object, both references see the change
```

## Memory Diagrams

### Primitives

```text
Stack:
a: 10
b: 10    (independent copy)
```

### Objects

```text
Stack:                  Heap:
x: @1234 ─────────────→ { value: 10 }
y: @1234 ─────────────↗
```

## Comparing References

```javascript
// Objects are compared by reference, not by value
{} === {}           // false — two different objects
[] === []           // false

const obj1 = { a: 1 };
const obj2 = obj1;  // same reference
obj1 === obj2       // true

// To compare objects by value (shallow):
function shallowEquals(a, b) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => a[key] === b[key]);
}
shallowEquals({ a: 1 }, { a: 1 }); // true
```

## Const and References

```javascript
const obj = { name: "John" };
obj.name = "Jane";    // OK — mutating the object
obj = { name: "Bob" }; // TypeError — cannot reassign const reference
```

## Performance Considerations

```javascript
// For small to medium arrays/objects, spread is fine.
// For very large arrays, concat or push may be faster:
const large = new Array(1000000).fill(0);
// Spread: const copy = [...large];   // OK but allocation heavy
// Slice: const copy = large.slice(); // slightly faster
```

## Primitive vs Reference — Full Comparison

| Aspect              | Primitives                            | Objects (including arrays, functions) |
|---------------------|---------------------------------------|---------------------------------------|
| Stored in           | Stack (value directly in variable)    | Heap (variable holds a reference/pointer) |
| Copy behavior       | Independent copy of value             | Copy of reference — same object       |
| Comparison          | By value: `5 === 5` → true            | By reference: `{} === {}` → false     |
| Mutation            | Immutable — cannot change value       | Mutable — properties can be changed   |
| Reassignment        | Changes the variable's value          | Changes which object the variable points to |
| Pass to function    | Passed by value (caller safe)         | Reference copied (mutations visible to caller) |
| `typeof`            | Returns the type name                 | Returns `"object"` (except functions → `"function"`) |
| Examples            | `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` | `object`, `array`, `function`, `Date`, `Map`, `Set` |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this value primitive or reference? | Primitives: number, string, boolean, null, undefined, symbol, bigint. Reference: object, array, function. |
| Is the data copied or shared?         | Primitives: independent copy. Objects: shared reference. |
| Are two variables pointing to the same object? | Check if they were assigned the same reference. |
| What happens if I reassign a reference? | The original object is unchanged; the variable points to a new object. |
| What happens if I mutate an object?   | All references to that object see the mutation.     |
| How do I create an independent copy?  | Shallow: spread/assign. Deep: `structuredClone()`.  |
## Next Steps

[Back to Chapter 14](14-spread-rest.md): Spread Operator (`...`)
[Proceed to Chapter 16](16-shallow-copy.md): Shallow Copy to learn about shallow copy.
