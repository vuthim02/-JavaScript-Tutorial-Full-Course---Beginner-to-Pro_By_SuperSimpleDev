# Utility Types

<img src="https://media.giphy.com/media/SvFocn0wNMx0iv2rYz/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


TypeScript provides built-in utility types that solve common type transformations.

## Partial\<T\>

Makes all properties optional:

```typescript
interface User { name: string; age: number; email: string; }
function updateUser(id: number, updates: Partial<User>): void { }
updateUser(1, { name: "Alice" });   // ok
updateUser(1, { age: 31 });         // ok
updateUser(1, {});                  // ok
```

## Required\<T\>

Makes all properties required:

```typescript
interface Config { apiUrl?: string; timeout?: number; }
type StrictConfig = Required<Config>;
// { apiUrl: string; timeout: number }
const config: StrictConfig = {}; // Error: 'apiUrl' is missing
```

## Pick\<T, K\>

Creates a type with only the specified keys:

```typescript
interface User { name: string; age: number; email: string; password: string; }
type PublicUser = Pick<User, "name" | "age" | "email">;
// { name: string; age: number; email: string }
```

## Omit\<T, K\>

Creates a type without the specified keys:

```typescript
type UserWithoutPassword = Omit<User, "password">;
// { name: string; age: number; email: string }
type UserWithoutSensitive = Omit<User, "password" | "email">;
// { name: string; age: number }
```

## Record\<K, T\>

Creates an object type with keys K and values T:

```typescript
type Page = "home" | "about" | "contact";
type PageData = Record<Page, { title: string; content: string }>;

const pages: PageData = {
    home: { title: "Home", content: "Welcome" },
    about: { title: "About", content: "About us" },
    contact: { title: "Contact", content: "Contact form" }
};

type Dictionary<T> = Record<string, T>;
const cache: Dictionary<{ data: unknown; timestamp: number }> = {};
```

## Exclude\<T, U\>

Excludes types from a union:

```typescript
type Status = "active" | "inactive" | "pending" | "deleted";
type ActiveStatus = Exclude<Status, "deleted" | "pending">;
// "active" | "inactive"

type NonString = Exclude<string | number | boolean, string>;
// number | boolean
```

## Extract\<T, U\>

Extracts types from a union that match:

```typescript
type Numbers = Extract<string | number | boolean, number | boolean>;
// number | boolean

type HasLength = Extract<string | number | { length: number }, { length: number }>;
// string | { length: number }
```

## NonNullable\<T\>

Removes `null` and `undefined` from a type:

```typescript
type Maybe = string | null | undefined;
type Definitely = NonNullable<Maybe>; // string
```

## ReturnType\<T\>

Extracts the return type of a function:

```typescript
function fetchUser(id: number): Promise<{ name: string; age: number }> {
    return fetch(`/users/${id}`).then(r => r.json());
}
type FetchUserResult = ReturnType<typeof fetchUser>;
// Promise<{ name: string; age: number }>
type Unwrapped = Awaited<FetchUserResult>;
// { name: string; age: number }
```

## Parameters\<T\>

Extracts parameter types of a function as a tuple:

```typescript
type Fn = (a: string, b: number, c: boolean) => void;
type FnParams = Parameters<Fn>;
// [a: string, b: number, c: boolean]

function wrapLog<T extends (...args: unknown[]) => unknown>(
    fn: T, ...args: Parameters<T>
): ReturnType<T> {
    console.log(`Calling ${fn.name}`);
    return fn(...args);
}
```

## Awaited\<T\>

Unwraps promises (TS 4.5+):

```typescript
type PromiseResult = Awaited<Promise<string>>;         // string
type DeepPromise = Awaited<Promise<Promise<number>>>;  // number
type Mixed = Awaited<Promise<string> | number>;        // string | number
```

## Utility Types Cheatsheet

| Type | Input | Output |
|------|-------|--------|
| `Partial<T>` | `{ a: string; b: number }` | `{ a?: string; b?: number }` |
| `Required<T>` | `{ a?: string }` | `{ a: string }` |
| `Readonly<T>` | `{ a: string }` | `{ readonly a: string }` |
| `Pick<T, K>` | `Pick<{a,b,c}, "a"\|"c">` | `{ a: string; c: boolean }` |
| `Omit<T, K>` | `Omit<{a,b,c}, "a">` | `{ b: number; c: boolean }` |
| `Record<K, V>` | `Record<"a"\|"b", number>` | `{ a: number; b: number }` |
| `Exclude<T, U>` | `Exclude<"a"\|"b", "a">` | `"b"` |
| `Extract<T, U>` | `Extract<"a"\|"b", "a">` | `"a"` |
| `NonNullable<T>` | `NonNullable<string\|null>` | `string` |
| `ReturnType<T>` | `ReturnType<() => string>` | `string` |
| `Parameters<T>` | `Parameters<(a: string) => void>` | `[a: string]` |
| `Awaited<T>` | `Awaited<Promise<number>>` | `number` |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which utility type is being used? | Check the name and what it transforms |
| What does `Partial` do? | Makes all properties optional |
| What does `Pick` vs `Omit` do? | `Pick` selects keys. `Omit` removes keys |
| What does `ReturnType` need? | A function type (use with `typeof fn`) |
## Next Steps

[Back to Chapter 7](07-advanced-types.md): Advanced Types: keyof, typeof, Indexed Access, Mapped Types, Conditional Types
[Proceed to Chapter 9](09-type-narrowing.md): Type Narrowing to learn about type narrowing.
