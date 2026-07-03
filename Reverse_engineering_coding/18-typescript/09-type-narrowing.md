# Type Narrowing

## What Is Narrowing?

Narrowing is the process of refining a broader type to a more specific type within a code block:

```typescript
function process(value: string | number): string {
    // value is string | number here
    if (typeof value === "string") {
        return value.toUpperCase(); // value is string (narrowed)
    }
    return value.toFixed(2); // value is number (narrowed)
}
```

## `typeof` Narrowing

Works for primitive types:

```typescript
function format(value: string | number | boolean): string {
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "number") return value.toFixed(2);
    return value ? "true" : "false";
}
```

**Valid `typeof` values:** `"string"`, `"number"`, `"boolean"`, `"symbol"`, `"bigint"`, `"undefined"`, `"object"`, `"function"`.

## `instanceof` Narrowing

Works for class instances:

```typescript
class Dog { bark(): string { return "Woof!"; } }
class Cat { meow(): string { return "Meow!"; } }

function speak(animal: Dog | Cat): string {
    if (animal instanceof Dog) return animal.bark(); // narrowed to Dog
    return animal.meow(); // narrowed to Cat
}
```

## Discriminated Unions

A union where each member has a common property (the "discriminant") with a literal type:

```typescript
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return (shape.base * shape.height) / 2;
    }
}
// TypeScript knows exactly what properties are available in each case
```

## Type Predicates

User-defined type guards using `value is Type`:

```typescript
interface Fish { swim(): void; }
interface Bird { fly(): void; }

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird): void {
    if (isFish(pet)) {
        pet.swim(); // narrowed to Fish
    } else {
        pet.fly(); // narrowed to Bird
    }
}
```

## Truthiness Narrowing

```typescript
function getLength(value?: string | null): number {
    if (!value) return 0; // falsy: null, undefined, or ""
    return value.length;  // narrowed to string
}
```

## Equality Narrowing

```typescript
function compare(a: string | number, b: string | boolean): void {
    if (a === b) {
        // Both narrowed to string (the only common type)
        console.log(a.toUpperCase());
    }
}
```

## `in` Operator Narrowing

```typescript
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; email: string };

function getPermissions(person: Admin | User): string[] {
    if ("permissions" in person) {
        return person.permissions; // narrowed to Admin
    }
    return ["read"]; // narrowed to User
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How is the type narrowed? | Check for `typeof`, `instanceof`, discriminated union check, or type predicate |
| What is the discriminant property? | For discriminated unions, the common literal field |
| Is a type predicate being used? | Check for `value is Type` return type |
| Could narrowing fail? | If the guard logic does not fully cover the union |
## Next Steps

[Back to Chapter 8](08-utility-types.md): Utility Types
[Proceed to Chapter 10](10-declaration-files.md): Declaration Files and DefinitelyTyped to learn about declaration files and definitelytyped.
