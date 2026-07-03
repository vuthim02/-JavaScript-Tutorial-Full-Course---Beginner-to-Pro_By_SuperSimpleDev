# Interfaces vs Type Aliases

## Interface

Interfaces define the **shape** of an object. They can be extended, merged, and implemented by classes.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;        // optional property
    readonly id: number;   // cannot be modified after creation
}

const user: User = { name: "Alice", age: 30, id: 1 };
user.id = 2; // Error: Cannot assign to 'id' because it is read-only
```

## Type Alias

Type aliases can represent objects, unions, intersections, primitives, tuples, and more.

```typescript
type User = {
    name: string;
    age: number;
    email?: string;
    readonly id: number;
};

type Status = "active" | "inactive" | "pending"; // union
type Point = [number, number];                    // tuple
type Callback = (data: string) => void;           // function type
type ID = string | number;                        // union of primitives
```

## Key Differences

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Object shapes | Yes | Yes |
| Unions/Intersections | Via `extends` | Via `\|` and `&` |
| Declaration merging | Yes (same name → merged) | No (duplicate → error) |
| Mapped types | No | Yes |
| Computed properties | No | Yes |
| Extends classes | `extends Class` | Via intersection `& Class` |
| Performance | Generally faster for object types | Slower for large intersections |

## Declaration Merging

```typescript
interface User { name: string; }
interface User { age: number; }
// Result: User has both name and age
const user: User = { name: "Alice", age: 30 };

type TUser = { name: string };  // Error: Duplicate identifier
type TUser = { age: number };   // Error
```

## When to Use Which

| Use Case | Prefer | Reason |
|----------|--------|--------|
| Library/API types | Interface | Declaration merging allows consumers to extend |
| React Props/State | Interface | Better error messages, extends nicely |
| Union/Intersection of primitives | Type | Interface cannot represent `string \| number` |
| Mapped or conditional types | Type | Interface syntax cannot express them |
| Function signatures | Either | Both work |
| Performance-sensitive code | Interface | Merged interfaces are faster to check |

---

# Optional, Readonly, and Index Signatures

## Optional Properties

Marked with `?` — the property may be present or `undefined`:

```typescript
interface Config {
    apiUrl: string;
    timeout?: number;
    retries?: number;
}
const config1: Config = { apiUrl: "https://api.example.com" };
```

## Readonly Properties

Cannot be reassigned after creation:

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
const p: Point = { x: 10, y: 20 };
p.x = 5; // Error: read-only

let arr: readonly number[] = [1, 2, 3];
arr.push(4); // Error
arr[0] = 10; // Error
```

## Index Signatures

Define properties by a dynamic key:

```typescript
interface StringDictionary {
    [key: string]: string;
}
const dict: StringDictionary = { name: "Alice", city: "Boston" };
dict.age = 30; // Error: number not assignable to string

interface ConfigWithIndex {
    port: number;
    [key: string]: unknown; // allow additional unknown properties
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this an interface or type alias? | Check for `interface` vs `type` keyword |
| Can this be extended? | Interfaces with `extends`. Types with `&` |
| Can this be merged? | Only interfaces support declaration merging |
| Is it used for primitives or objects? | Types can do both. Interfaces are for objects |
| Is this property optional? | Check for `?` after the property name |
| Can this property be changed? | Check for `readonly` |
| Are dynamic keys allowed? | Check for an index signature `[key: type]: type` |
| What types can index keys be? | `string`, `number`, or `symbol` only |
## Next Steps

[Back to Chapter 2](02-primitive-types.md): Primitive Types
[Proceed to Chapter 4](04-union-intersection.md): Union and Intersection Types to learn about union and intersection types.
