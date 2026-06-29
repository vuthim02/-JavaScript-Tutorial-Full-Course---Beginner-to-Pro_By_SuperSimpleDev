# Primitive Types

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


TypeScript's primitive types match JavaScript's runtime types.

## The Building Blocks

```typescript
// String
let name: string = "Alice";
let template: string = `Hello, ${name}`;

// Number
let age: number = 30;
let pi: number = 3.14;
let hex: number = 0xff;
let big: bigint = 9007199254740991n;

// Boolean
let isActive: boolean = true;
let isDone: boolean = false;

// Null and Undefined
let empty: null = null;
let notAssigned: undefined = undefined;

// Void — absence of a return value
function log(message: string): void {
    console.log(message);
}

// Never — never returns (throws or infinite loop)
function throwError(message: string): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {}
}
```

## Any vs Unknown

| Type | Safety | Can be used without checking |
|------|--------|------------------------------|
| `any` | None — opt-out of type checking | Yes — disables all checks |
| `unknown` | Type-safe — must narrow before use | No — forces type check |

```typescript
// any — completely disables type checking
function parseAny(data: any): string {
    return data.toUpperCase(); // no compile error, may crash at runtime
}

// unknown — forces you to check before using
function parseUnknown(data: unknown): string {
    if (typeof data === "string") {
        return data.toUpperCase(); // safe
    }
    return String(data);
}
```

## Type Inference

TypeScript infers types from values without explicit annotations:

```typescript
let count = 0;          // inferred as number
let message = "Hello";  // inferred as string
let isReady = true;     // inferred as boolean
```

Best practice: let inference work for simple cases, annotate when the type is not obvious.

## Type Annotations

Explicit annotations are needed when inference is not possible or desirable:

```typescript
// Function parameters (must be annotated)
function greet(name: string): string {
    return `Hello, ${name}`;
}

// Variables without initial values
let email: string;

// Arrays
let fruits: string[] = ["apple", "banana"];
let numbers: Array<number> = [1, 2, 3]; // generic syntax

// Tuples
let pair: [string, number] = ["Alice", 30];
let httpStatus: [number, string] = [200, "OK"];

// Objects
let user: { name: string; age: number } = {
    name: "Alice",
    age: 30
};

// any — avoid when possible
let loose: any = "string";
loose = 42;       // ok
loose = true;     // ok
loose.toUpperCase(); // ok at compile time, may crash at runtime

// unknown — type-safe alternative
let input: unknown = "hello";
input.toUpperCase(); // Error: Object is of type 'unknown'
if (typeof input === "string") {
    console.log(input.toUpperCase()); // ok — narrowed
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the type of this variable? | Read the annotation (`: type`) or infer from value |
| Is `any` being used? | If yes, type safety is disabled for that value |
| Is `unknown` used? | If yes, the code must narrow before using |
| Is the type inferred or explicit? | Check if `: type` is present after the variable |
## Next Steps

[Back to Chapter 1](01-ts-setup.md): What Is TypeScript?
[Proceed to Chapter 3](03-interfaces-type-aliases.md): Interfaces vs Type Aliases to learn about interfaces vs type aliases.
