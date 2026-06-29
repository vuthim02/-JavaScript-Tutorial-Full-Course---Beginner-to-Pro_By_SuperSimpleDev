# Part 6 Review & Reverse Engineering Checklist

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


Whenever reading object-related code, ask these questions:

## Object Fundamentals

- Is this an object literal, constructor call, or class instance?
- Are properties defined statically or added dynamically?
- Is the property accessed with `.` or `[]`? (bracket = computed key)
- Does the property exist on the object or its prototype chain?
- Is `const` preventing reassignment or mutation?

## Property Descriptors

- Are any properties non-writable, non-enumerable, or non-configurable?
- Is the object frozen, sealed, or non-extensible?
- Are getters/setters used instead of data properties?
- What does `Object.getOwnPropertyDescriptor()` reveal?

## `this` Binding

- How is the function called? (plain, method, `new`, `call/apply/bind`)
- Is this an arrow function? (`this` is lexical)
- Is strict mode enabled? (affects default binding)
- Was `bind()` used? (`this` is permanently fixed)
- Is the method extracted and called separately? (`this` may be lost)

## Prototypes

- Was `new` used with a constructor function?
- Does the object own the property or inherit it?
- Are methods on `.prototype` (shared) or in constructor (per-instance)?
- Is the prototype being replaced or extended? (replacing breaks `instanceof`)
- Is the prototype chain live? (modifications visible to existing objects)

## Classes

- Is this `class` syntax or a constructor function?
- Is the class hoisted? (No — TDZ)
- Can it be called without `new`? (No — TypeError)
- Are there private `#` fields?
- Is the method on the prototype (shared) or an arrow field (per-instance)?
- Are static members used? (belong to class, not instances)
- Is `super()` called in the constructor? (required for `extends`)

## Encapsulation & Polymorphism

- Which data is truly private? (`#` fields or closure variables)
- Is it convention-based (`_`) or enforced (`#`)?
- Can subclasses access private fields? (No)
- Is a method being overridden? (same name in child)
- Is duck typing used? (any object with the right method works)
- Is composition used? (objects passed in rather than inherited)

## Object Static Methods

- Need keys? `Object.keys()`
- Need values? `Object.values()`
- Need entries? `Object.entries()`
- Need to convert entries back? `Object.fromEntries()`
- Need to merge? `Object.assign()` or spread `{...a, ...b}`
- Need precise equality? `Object.is()`

## Destructuring & Spread

- Are properties being extracted from an object?
- Is renaming used? `{ oldName: newName }`
- Are defaults applied? `{ name = "default" }`
- Is rest used? `{ ...rest }` captures remaining properties
- Is spread used for copying/merging? (shallow only!)
- Could destructuring make the code cleaner?

## Getters & Setters

- Is the property backed by a getter/setter?
- Does the getter compute or return a cached value?
- Does the setter validate or transform input?
- Is it defined inline or via `Object.defineProperty()`?

## Summary Table

| Concept | Key Check |
|---------|-----------|
| Object reference | `===` compares reference, not value |
| Property descriptor | `Object.getOwnPropertyDescriptor()` |
| `this` rule | How was the function invoked? |
| Prototype chain | `Object.getPrototypeOf()` |
| Method sharing | On `.prototype` = shared; in constructor = per-instance |
| Private field | `#` prefix — truly private |
| Static member | Owned by class, not instances |
| instanceof | Checks prototype chain |
| Composition | "has-a" over "is-a" |
| Shallow copy | `{...obj}` or `Object.assign({}, obj)` |
| Deep copy | `structuredClone(obj)` |
| Getter vs method | Getter: no `()`. Method: needs `()` |
## Next Steps

[Back to Chapter 11](11-object-equality.md): Object Equality & Comparison
[Proceed to Module 7](../07-async-js/README.md): Asynchronous JavaScript to learn about asynchronous programming in JavaScript.
