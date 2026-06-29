# Generics

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Why Generics?

Generics allow you to write functions, classes, and types that work with **any type** while preserving type information:

```typescript
// Without generics — loses type info
function identity(value: any): any { return value; }
const result = identity("hello"); // result is 'any'

// With generics — preserves type
function identity<T>(value: T): T { return value; }
const result = identity("hello"); // result is 'string'
const num = identity(42);         // result is 'number'
```

## Generic Functions

```typescript
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}
const first = firstElement([1, 2, 3]);     // type: number | undefined
const str = firstElement(["a", "b", "c"]); // type: string | undefined

// Explicit type argument
const explicit = firstElement<string>(["x", "y"]);
```

## Generic Interfaces

```typescript
interface ApiResponse<T> {
    status: number;
    data: T;
    message: string;
}

type User = { id: number; name: string };
type Product = { id: number; title: string; price: number };

const userResponse: ApiResponse<User> = {
    status: 200,
    data: { id: 1, name: "Alice" },
    message: "Success"
};
```

## Generic Classes

```typescript
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
console.log(stringStack.peek()); // "hello"
```

## Generic Constraints

Use `extends` to constrain what types are allowed:

```typescript
interface HasLength { length: number; }

function logLength<T extends HasLength>(item: T): T {
    console.log(item.length);
    return item;
}

logLength("hello");        // 5 — string has length
logLength([1, 2, 3]);      // 3 — array has length
logLength({ length: 10 }); // 10 — object with length
logLength(42);             // Error: number does not have length

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };
getProperty(user, "name");   // string
getProperty(user, "age");    // number
getProperty(user, "salary"); // Error: '"salary"' not assignable to 'keyof typeof user'
```

## Generic Default Types

```typescript
interface ApiResponse<T = unknown> {
    status: number;
    data: T;
}
const response1: ApiResponse = { status: 200, data: "hello" };         // T = unknown
const response2: ApiResponse<string> = { status: 200, data: "hello" }; // T = string
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What type parameter does this use? | The `<T>` or `<T, U>` after the name |
| Is the type inferred or explicit? | Usually inferred from usage. Can be explicit |
| What constraint does T have? | Check for `extends` after the type parameter |
| What does `keyof` return? | A union of the property names of a type |
## Next Steps

[Back to Chapter 5](05-literal-enums.md): Literal Types and Template Literal Types
[Proceed to Chapter 7](07-advanced-types.md): Advanced Types: keyof, typeof, Indexed Access, Mapped Types, Conditional Types to learn about advanced types: keyof, typeof, indexed access, mapped types, conditional types.
