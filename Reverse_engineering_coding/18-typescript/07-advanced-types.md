# Advanced Types: keyof, typeof, Indexed Access, Mapped Types, Conditional Types

## `keyof`

Returns a union of the property names (keys) of a type:

```typescript
interface User { name: string; age: number; email: string; }
type UserKeys = keyof User; // "name" | "age" | "email"

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

## `typeof`

Gets the type of a value at the type level:

```typescript
const user = { name: "Alice", age: 30 };
type UserType = typeof user;
// { name: string; age: number }

function createConfig() {
    return { apiUrl: "https://api.example.com", timeout: 5000, retries: 3 };
}
type ConfigType = ReturnType<typeof createConfig>;
// { apiUrl: string; timeout: number; retries: number }
```

## Indexed Access Types

Access a property type by key:

```typescript
interface User {
    name: string;
    age: number;
    address: { street: string; city: string };
}
type NameType = User["name"];        // string
type AddressType = User["address"];  // { street: string; city: string }
type CityType = User["address"]["city"]; // string
type StringKeys = User["name" | "age"]; // string | number
```

## Mapped Types

Transform each property of a type:

```typescript
// Make all properties optional
type Partial<T> = { [K in keyof T]?: T[K] };

// Make all properties readonly
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Rename keys with template literals
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User { name: string; age: number; }
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// Remove properties by value type
type OnlyStrings<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};
type UserStrings = OnlyStrings<User>; // { name: string }
```

## Conditional Types

Types that depend on a condition:

```typescript
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// Distributive conditional types
type ToArray<T> = T extends unknown ? T[] : never;
type D = ToArray<string | number>; // string[] | number[]

// Prevent distribution with wrapping
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;

// Nested conditionals
type ExtractType<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" : "unknown";
```

## Infer in Conditional Types

Extract types from within other types:

```typescript
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
type Fn = (x: number) => string;
type FnReturn = ReturnType<Fn>; // string

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type FnParams = Parameters<Fn>; // [x: number]

type ArrayItem<T> = T extends (infer U)[] ? U : never;
type Item = ArrayItem<string[]>; // string

type PromiseValue<T> = T extends Promise<infer U> ? U : never;
type P = PromiseValue<Promise<string>>; // string
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does `keyof` produce? | A union of the property names |
| What does `typeof` produce? | The type of a runtime value |
| How does this mapped type transform properties? | Check the `[K in keyof T]` pattern |
| What does the conditional type check? | The `extends` condition before `?` |
| What is `infer` extracting? | The type variable being inferred from a pattern |
## Next Steps

[Back to Chapter 6](06-generics.md): Generics
[Proceed to Chapter 8](08-utility-types.md): Utility Types to learn about utility types.
