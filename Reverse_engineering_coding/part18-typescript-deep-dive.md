# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

## Part 18 — TypeScript Deep Dive: Types, Generics, and Production Patterns

---

# Mission

TypeScript is not a separate language — it is **JavaScript with types**.

Every line you write in TypeScript compiles down to plain JavaScript that runs anywhere JS runs. The types exist only at compile time to catch bugs before they reach production.

This part explains:

- What TypeScript adds and why it matters.
- The type system in depth: primitives, unions, intersections, generics, conditional types.
- How to type real-world code: React components, Express servers, utility functions.
- How to migrate an existing JavaScript project to TypeScript.
- How to read and write `.d.ts` declaration files.

---

# Big Picture

TypeScript sits as a **static analysis layer** on top of JavaScript:

```
TypeScript Source (.ts)
       │
       ▼
  TypeScript Compiler (tsc)
       │
       ├── Type Checking (errors if types mismatch)
       │
       ▼
  JavaScript Output (.js)
       │
       ▼
  Node.js / Browser (runs the JS, types are gone)
```

The types are **erased** during compilation. They have zero runtime cost.

---

# Overall TypeScript Architecture

```text
┌────────────────────────────────────────────────────────────┐
│                    TypeScript Source (.ts)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Variables │  │ Functions│  │ Classes  │  │ Modules  │  │
│  │ : string  │  │ (param)  │  │ implements│  │ import   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│                 TypeScript Compiler (tsc)                    │
│                                                              │
│  1. Parse source → AST (Abstract Syntax Tree)                │
│  2. Type-check using the type checker                        │
│  3. Type-erasure (remove all type annotations)               │
│  4. Downlevel emit (ES2021 → ES2015 if target is lower)      │
│  5. Generate source maps (optional)                          │
│                                                              │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│                  JavaScript Output (.js)                     │
│  No types, just pure JS                                    │
│  // function greet(name: string): string {                  │
│  function greet(name) {                                     │
│  //     return "Hello, " + name;                            │
│  // }                                                       │
└────────────────────────────────────────────────────────────┘
```

---

# Chapter 1 — What Is TypeScript?

## Definition

TypeScript is a **typed superset of JavaScript** developed by Microsoft, first released in 2012. It adds:

- Static type checking (catches type errors at compile time).
- Enhanced tooling (autocomplete, refactoring, navigation).
- Modern ECMAScript features compiled to older JS.
- Better documentation (types serve as living documentation).

## Compilation vs Transpilation

| Term          | Meaning                                                   |
|---------------|-----------------------------------------------------------|
| Compilation   | Source code → lower-level representation (C → machine code). |
| Transpilation | Source code → source code at a similar abstraction level (TS → JS). |

TypeScript does both:

- **Transpiles** TypeScript to JavaScript.
- **Down-level compiles** modern JS (ES2022) to older JS (ES2015) if configured.

```javascript
// TypeScript source (ES2022 features)
const greet = (name: string): string => {
    return `Hello, ${name}`;
};

// Compiled JavaScript output (target: ES2015)
var greet = function (name) {
    return "Hello, " + name;
};
```

## Why TypeScript?

| Benefit                | Explanation                                                |
|------------------------|------------------------------------------------------------|
| Catch bugs early       | Type errors at compile time, not runtime.                  |
| Better IDE support     | Autocomplete, refactoring, go-to-definition.               |
| Self-documenting code  | Function signatures tell you what types to pass and return.|
| Safer refactoring      | Rename a property → TypeScript catches all usages.         |
| Team-scale code        | Large codebases are significantly easier to maintain.      |
| Ecosystem             | Almost all npm packages have types (via DefinitelyTyped).  |

## JS vs TS — The Same Code

**JavaScript:**

```javascript
function add(a, b) {
    return a + b; // strings? numbers? who knows.
}

add(1, 2);       // 3 — works
add("1", "2");   // "12" — works but probably wrong
add(null, {});   // "null[object Object]" — unexpected
```

**TypeScript:**

```typescript
function add(a: number, b: number): number {
    return a + b; // only numbers allowed
}

add(1, 2);       // 3
add("1", "2");   // TS Error: Argument of type 'string' is not assignable to parameter of type 'number'
add(null, {});   // TS Error: Argument of type 'null' is not assignable to parameter of type 'number'
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this code TypeScript or JavaScript? | Check for type annotations (`: string`), file extension `.ts`. |
| What does TypeScript add?             | Static types that are erased at compile time.       |
| Why would a project use TS?           | For type safety, better tooling, and team scalability. |
| What happens to types at runtime?     | They are erased — no runtime overhead.              |

---

# Chapter 2 — Setting Up TypeScript

## Installation

```bash
# Install TypeScript globally
npm install -g typescript

# Or as a project dependency
npm install --save-dev typescript

# Verify
tsc --version
```

## The `tsconfig.json` File

Every TypeScript project has a `tsconfig.json` that configures the compiler:

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

## Strict Mode

`"strict": true` enables a family of stricter type-checking options:

| Option                     | Effect                                                 |
|----------------------------|--------------------------------------------------------|
| `strictNullChecks`         | `null` and `undefined` are not assignable to other types. |
| `noImplicitAny`            | Error if a type cannot be inferred and falls back to `any`. |
| `strictFunctionTypes`      | Enables stricter function type variance.               |
| `strictBindCallApply`      | `call`/`apply`/`bind` are type-checked.                |
| `noImplicitReturns`        | Error if a function does not return a value on all paths. |
| `noFallthroughCasesInSwitch`| Error on fallthrough in switch cases.                  |

**Without strict mode:**

```typescript
let name;        // implicit any — no error
name = "Alice";
name = 42;       // no error — anything goes
```

**With strict mode:**

```typescript
let name;        // Error: Variable 'name' implicitly has type 'any'
let age: number | null = null; // must explicitly include null
age.toFixed(2);  // Error: Object is possibly 'null'
```

## Compiler Options Cheatsheet

| Option               | Common Values                          | Purpose                     |
|----------------------|----------------------------------------|-----------------------------|
| `target`             | `ES2015`, `ES2020`, `ES2022`, `ESNext` | JS output version.          |
| `module`             | `ESNext`, `CommonJS`, `NodeNext`       | Module system for output.   |
| `moduleResolution`   | `node`, `bundler`, `NodeNext`          | How import paths resolve.   |
| `outDir`             | `./dist`                                | Output directory.           |
| `rootDir`            | `./src`                                 | Source directory.           |
| `strict`             | `true`                                  | Enable all strict checks.   |
| `declaration`        | `true`                                  | Generate `.d.ts` files.     |
| `sourceMap`          | `true`                                  | Debugging support.          |
| `esModuleInterop`    | `true`                                  | Compatible default imports. |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is TS configured for this project?    | Check for `tsconfig.json` in the root.              |
| Is strict mode on?                    | Look for `"strict": true` in `compilerOptions`.     |
| Where does the compiled JS go?        | `outDir` setting in `tsconfig.json`.                |
| What target is the code compiled to?  | `target` setting in `tsconfig.json`.                |

---

# Chapter 3 — Primitive Types

## The Building Blocks

TypeScript's primitive types match JavaScript's runtime types:

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
    console.log(message); // no return
}

// Never — never returns (throws or infinite loop)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}

// Any — opt-out of type checking (avoid when possible)
let loose: any = "string";
loose = 42;       // ok
loose = true;     // ok
loose.toUpperCase(); // ok at compile time, may crash at runtime

// Unknown — type-safe version of any
let input: unknown = "hello";
input = 42;
input.toUpperCase(); // Error: Object is of type 'unknown'

// To use unknown, you must narrow it first:
if (typeof input === "string") {
    console.log(input.toUpperCase()); // ok — narrowed to string
}
```

## Why `unknown` Over `any`

```typescript
// any — completely disables type checking
function parseAny(data: any): string {
    return data.toUpperCase(); // no compile error, but could crash at runtime
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

TypeScript can often infer types without explicit annotations:

```typescript
let count = 0;          // inferred as number
let message = "Hello";  // inferred as string
let isReady = true;     // inferred as boolean

// Best practice: let inference work for simple cases,
// annotate when the type is not obvious
```

## Type Annotations

Explicit annotations are needed when inference is not possible or desirable:

```typescript
// Function parameters (must be annotated)
function greet(name: string): string {
    return `Hello, ${name}`;
}

// Variables without initial values
let email: string;
// email — not assigned yet, must be set before use

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
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the type of this variable?    | Read the annotation (`: type`) or infer from value. |
| Is `any` being used?                  | If yes, type safety is disabled for that value.     |
| Is `unknown` used?                    | If yes, the code must narrow before using.          |
| Is the type inferred or explicit?     | Check if `: type` is present after the variable.    |

---

# Chapter 4 — Interfaces vs Type Aliases

## Interface

Interfaces define the **shape** of an object. They can be extended, merged, and implemented by classes.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;        // optional property
    readonly id: number;   // cannot be modified after creation
}

const user: User = {
    name: "Alice",
    age: 30,
    id: 1
};

user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
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

type Status = "active" | "inactive" | "pending"; // union type
type Point = [number, number];                    // tuple type
type Callback = (data: string) => void;           // function type
type ID = string | number;                        // union of primitives
```

## Key Differences

| Feature                | Interface                                        | Type Alias                              |
|------------------------|--------------------------------------------------|-----------------------------------------|
| Object shapes          | Yes                                              | Yes                                     |
| Unions/Intersections   | Via `extends`                                    | Via `|` and `&`                         |
| Declaration merging    | Yes (same name → merged)                         | No (duplicate name → error)             |
| Mapped types           | No                                               | Yes                                     |
| Computed properties    | No                                               | Yes                                     |
| Extends classes        | Yes (`extends Class`)                            | Via intersection (`& Class`)            |
| Performance            | Generally faster for object types                | Slower for large intersection types     |

## Declaration Merging

Interfaces with the same name are automatically merged:

```typescript
interface User {
    name: string;
}

interface User {
    age: number;
}

// Result: User has both name and age
const user: User = {
    name: "Alice",
    age: 30
};
```

Type aliases cannot be merged:

```typescript
type User = { name: string };  // Error: Duplicate identifier 'User'
type User = { age: number };   // Error
```

## When to Use Which

| Use Case                          | Prefer      | Reason                                          |
|-----------------------------------|-------------|-------------------------------------------------|
| Library/API types                 | Interface   | Declaration merging allows consumers to extend. |
| React Props/State                 | Interface   | Better error messages, extends nicely.          |
| Union/Intersection of primitives  | Type        | Interface cannot represent `string \| number`.   |
| Mapped or conditional types       | Type        | Interface syntax cannot express them.           |
| Function signatures               | Either      | Both work.                                      |
| Performance-sensitive code        | Interface   | Merged interfaces are faster to check.          |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this an interface or type alias?   | Check for `interface` vs `type` keyword.            |
| Can this be extended?                 | Interfaces with `extends`. Types with `&`.          |
| Can this be merged?                   | Only interfaces support declaration merging.        |
| Is it used for primitives or objects? | Types can do both. Interfaces are for objects.      |

---

# Chapter 5 — Optional, Readonly, and Index Signatures

## Optional Properties

Marked with `?` — the property may be present or `undefined`:

```typescript
interface Config {
    apiUrl: string;
    timeout?: number;        // optional
    retries?: number;        // optional
}

const config1: Config = { apiUrl: "https://api.example.com" }; // ok
const config2: Config = { apiUrl: "https://api.example.com", timeout: 5000 }; // ok
```

## Readonly Properties

Cannot be reassigned after creation:

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const p: Point = { x: 10, y: 20 };
p.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// Readonly arrays
let arr: readonly number[] = [1, 2, 3];
arr.push(4);   // Error: Property 'push' does not exist on type 'readonly number[]'
arr[0] = 10;   // Error: Index signature in type 'readonly number[]' only permits reading
```

## Index Signatures

Define properties by a dynamic key:

```typescript
interface StringDictionary {
    [key: string]: string; // any string key maps to a string value
}

const dict: StringDictionary = {
    name: "Alice",
    city: "Boston"
};

dict.country = "USA"; // ok
dict.age = 30;        // Error: Type 'number' is not assignable to type 'string'

// Mixed with known properties
interface ConfigWithIndex {
    port: number;
    [key: string]: unknown; // allow additional unknown properties
}

const config: ConfigWithIndex = {
    port: 3000,
    host: "localhost",
    debug: true
};
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this property optional?            | Check for `?` after the property name.              |
| Can this property be changed?         | Check for `readonly`.                               |
| Are dynamic keys allowed?             | Check for an index signature `[key: type]: type`.   |
| What types can index keys be?         | `string`, `number`, or `symbol` only.               |

---

# Chapter 6 — Union and Intersection Types

## Union Types

A value can be one of several types, separated by `|`:

```typescript
type ID = string | number;

function printID(id: ID): void {
    console.log(`ID: ${id}`);
}

printID("abc123"); // ok
printID(12345);    // ok
printID(true);     // Error: Argument of type 'boolean' is not assignable to parameter of type 'ID'
```

## Narrowing Unions

To use a union type, you must narrow it to a specific branch:

```typescript
function processID(id: string | number): string {
    // TypeScript narrows based on typeof checks
    if (typeof id === "string") {
        return id.toUpperCase(); // id is string here
    }
    return id.toFixed(0); // id is number here
}
```

## Intersection Types

Combine multiple types into one, separated by `&`:

```typescript
interface HasName {
    name: string;
}

interface HasAge {
    age: number;
}

type Person = HasName & HasAge;

const person: Person = {
    name: "Alice",
    age: 30
};
// person has BOTH name and age
```

## Union vs Intersection in Practice

```typescript
// Union — "either or"
type Success = { status: "success"; data: string };
type Error = { status: "error"; error: string };
type Result = Success | Error;

function handleResult(result: Result): void {
    if (result.status === "success") {
        console.log(result.data); // narrowed to Success
    } else {
        console.log(result.error); // narrowed to Error
    }
}

// Intersection — "all combined"
type HasEmail = { email: string };
type HasPhone = { phone: string };
type Contact = HasEmail & HasPhone;

const contact: Contact = {
    email: "alice@example.com",
    phone: "555-1234"
};
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a union or intersection?      | `|` = union, `&` = intersection.                    |
| How is the union narrowed?            | Check for `typeof`, `instanceof`, or property checks.|
| Can intersection conflicts happen?    | Yes — if both types define the same property with incompatible types. |

---

# Chapter 7 — Literal Types and Template Literal Types

## Literal Types

A type that is a specific value, not just a category:

```typescript
// String literal types
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): void {
    console.log(`Moving ${direction}`);
}

move("north"); // ok
move("up");    // Error: Argument of type '"up"' is not assignable to parameter of type 'Direction'

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
    return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

// Boolean literal types
type TrueFlag = true; // only true
type FalseFlag = false; // only false
```

## Template Literal Types (TS 4.1+)

Combine string literal types with template syntax:

```typescript
type EventName = `on${Capitalize<string>}`;
// This creates a type that starts with "on" followed by any capitalized string

// More practical:
type HTMLEvent = `on${"click" | "hover" | "focus"}`;
// Result: "onclick" | "onhover" | "onfocus"

type CSSProperty = `margin-${"top" | "right" | "bottom" | "left"}`;
// Result: "margin-top" | "margin-right" | "margin-bottom" | "margin-left"

// Intrinsic string manipulation types:
type Greeting = `Hello, ${string}`;
// Any string that starts with "Hello, "

type UppercaseGreeting = Uppercase<"hello">; // "HELLO"
type LowercaseGreeting = Lowercase<"HELLO">; // "hello"
type CapitalizeName = Capitalize<"alice">;   // "Alice"
type UncapitalizeName = Uncapitalize<"Alice">; // "alice"
```

## Practical Example — API Endpoints

```typescript
type Endpoint = `/api/${string}`;

function fetchAPI(endpoint: Endpoint): Promise<unknown> {
    return fetch(endpoint).then(res => res.json());
}

fetchAPI("/api/users");  // ok
fetchAPI("/home");       // Error: Argument of type '"/home"' is not assignable to parameter of type '`/api/${string}`'
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a literal type?               | Check if the type is a specific value like `"active"` or `5`. |
| Is a template literal type used?      | Check for backtick syntax with `${}` inside type position. |
| What values does this literal union accept? | The explicit values listed.                   |

---

# Chapter 8 — Enums

## Numeric Enums

Auto-incrementing numeric values starting from 0:

```typescript
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

console.log(Direction.Up);    // 0
console.log(Direction[0]);    // "Up" — reverse mapping

// Custom start value
enum StatusCode {
    Success = 200,
    NotFound = 404,
    ServerError = 500
}

console.log(StatusCode.Success); // 200
```

## String Enums

Each member has a string value:

```typescript
enum Color {
    Red = "#FF0000",
    Green = "#00FF00",
    Blue = "#0000FF"
}

console.log(Color.Red); // "#FF0000"
// No reverse mapping for string enums
```

## Const Enums

Compiled away — no runtime object:

```typescript
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

const dir = Direction.Up;
// Compiles to: const dir = 0 /* Up */;
// No Direction object exists at runtime
```

## Enum vs Union of Literals

| Feature            | Enum               | Union of Literals           |
|--------------------|--------------------|-----------------------------|
| Runtime object     | Yes (unless `const`)| No                          |
| Reverse mapping    | Numeric: yes       | No                          |
| Iteration          | Possible           | Not directly                |
| Tree-shakeable     | No (unless `const`)| Yes                         |
| Type safety        | Good               | Excellent (no runtime overhead)|

**Prefer union of literals** unless you need runtime iteration or reverse mapping:

```typescript
// Prefer this:
type Status = "active" | "inactive" | "pending";

// Over this:
enum Status {
    Active = "active",
    Inactive = "inactive",
    Pending = "pending"
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this an enum or a union?           | Enum has `enum` keyword. Union uses `type` with `\|`. |
| Does this enum exist at runtime?      | `const enum` is erased. Regular enums exist.        |
| Is reverse mapping available?         | Yes for numeric enums, no for string enums.         |

---

# Chapter 9 — Generics

## Why Generics?

Generics allow you to write functions, classes, and types that work with **any type** while preserving type information:

```typescript
// Without generics — loses type info
function identity(value: any): any {
    return value;
}

const result = identity("hello"); // result is 'any' — type lost

// With generics — preserves type
function identity<T>(value: T): T {
    return value;
}

const result = identity("hello"); // result is 'string'
const num = identity(42);         // result is 'number'
```

## Generic Functions

```typescript
// The type parameter T is inferred from the argument
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const first = firstElement([1, 2, 3]);       // type: number | undefined
const str = firstElement(["a", "b", "c"]);   // type: string | undefined

// Explicit type argument
const explicit = firstElement<string>(["x", "y"]); // type: string | undefined
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

const productResponse: ApiResponse<Product> = {
    status: 200,
    data: { id: 1, title: "Laptop", price: 999 },
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
interface HasLength {
    length: number;
}

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
getProperty(user, "name"); // string — "Alice"
getProperty(user, "age");  // number — 30
getProperty(user, "salary"); // Error: Argument of type '"salary"' is not assignable to parameter of type 'keyof typeof user'
```

## Generic Default Types

```typescript
interface ApiResponse<T = unknown> {
    status: number;
    data: T;
}

const response1: ApiResponse = { status: 200, data: "hello" }; // T defaults to unknown
const response2: ApiResponse<string> = { status: 200, data: "hello" }; // T is string
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What type parameter does this use?    | The `<T>` or `<T, U>` after the name.               |
| Is the type inferred or explicit?     | Usually inferred from usage. Can be explicit.        |
| What constraint does T have?          | Check for `extends` after the type parameter.        |
| What does `keyof` return?             | A union of the property names of a type.             |

---

# Chapter 10 — Keyof, Typeof, Indexed Access, Mapped, and Conditional Types

## `keyof`

Returns a union of the property names (keys) of a type:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

type UserKeys = keyof User; // "name" | "age" | "email"

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user: User = { name: "Alice", age: 30, email: "alice@example.com" };
getValue(user, "name"); // string
```

## `typeof`

Gets the type of a value at the type level:

```typescript
const user = {
    name: "Alice",
    age: 30
};

type UserType = typeof user;
// { name: string; age: number; }

function createConfig() {
    return {
        apiUrl: "https://api.example.com",
        timeout: 5000,
        retries: 3
    };
}

type ConfigType = ReturnType<typeof createConfig>;
// { apiUrl: string; timeout: number; retries: number; }
```

## Indexed Access Types

Access a property type by key:

```typescript
interface User {
    name: string;
    age: number;
    address: {
        street: string;
        city: string;
    };
}

type NameType = User["name"];       // string
type AgeType = User["age"];         // number
type AddressType = User["address"]; // { street: string; city: string; }
type CityType = User["address"]["city"]; // string

// With union keys
type StringKeys = User["name" | "age"]; // string | number
```

## Mapped Types

Transform each property of a type:

```typescript
// Make all properties optional
type Partial<T> = {
    [K in keyof T]?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// Make all properties nullable
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

// Rename keys with template literals
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
    name: string;
    age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }

// Remove properties by value type
type OnlyStrings<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type UserStrings = OnlyStrings<User>; // { name: string; }
```

## Conditional Types

Types that depend on a condition:

```typescript
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;    // "yes"
type B = IsString<number>;    // "no"
type C = IsString<"hello">;   // "yes" — "hello" extends string

// Distributive conditional types
type ToArray<T> = T extends unknown ? T[] : never;

type D = ToArray<string | number>;
// string[] | number[] — distributed over the union

// Prevent distribution with wrapping
type ToArrayNonDist<T> = T extends unknown ? T[] : never;
// No, that's the same. To prevent distribution, use:
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;

// Nested conditionals
type ExtractType<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    "unknown";

type E = ExtractType<string>;  // "string"
type F = ExtractType<number>;  // "number"
type G = ExtractType<Date>;    // "unknown"
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

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does `keyof` produce?            | A union of the property names.                      |
| What does `typeof` produce?           | The type of a runtime value.                        |
| How does this mapped type transform properties? | Check the `[K in keyof T]` pattern.      |
| What does the conditional type check? | The `extends` condition before `?`.                 |
| What is `infer` extracting?           | The type variable being inferred from a pattern.    |

---

# Chapter 11 — Utility Types

TypeScript provides built-in utility types that solve common type transformations:

## Partial\<T\>

Makes all properties optional:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

function updateUser(id: number, updates: Partial<User>): void {
    // updates can have any subset of User properties
}

updateUser(1, { name: "Alice" });              // ok
updateUser(1, { age: 31, email: "a@b.com" }); // ok
updateUser(1, {});                             // ok (empty update)
```

## Required\<T\>

Makes all properties required:

```typescript
interface Config {
    apiUrl?: string;
    timeout?: number;
}

type StrictConfig = Required<Config>;
// { apiUrl: string; timeout: number; }

const config: StrictConfig = {}; // Error: property 'apiUrl' is missing
```

## Pick\<T, K\>

Creates a type with only the specified keys:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
    password: string;
}

type PublicUser = Pick<User, "name" | "age" | "email">;
// { name: string; age: number; email: string; }

function getPublicProfile(user: User): PublicUser {
    return {
        name: user.name,
        age: user.age,
        email: user.email
    };
}
```

## Omit\<T, K\>

Creates a type without the specified keys:

```typescript
type UserWithoutPassword = Omit<User, "password">;
// { name: string; age: number; email: string; }

type UserWithoutSensitive = Omit<User, "password" | "email">;
// { name: string; age: number; }
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

// Dictionary pattern
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
type Definitely = NonNullable<Maybe>;
// string
```

## ReturnType\<T\>

Extracts the return type of a function:

```typescript
function fetchUser(id: number): Promise<{ name: string; age: number }> {
    return fetch(`/users/${id}`).then(r => r.json());
}

type FetchUserResult = ReturnType<typeof fetchUser>;
// Promise<{ name: string; age: number; }>

type Unwrapped = Awaited<FetchUserResult>;
// { name: string; age: number; }
```

## Parameters\<T\>

Extracts the parameter types of a function as a tuple:

```typescript
type Fn = (a: string, b: number, c: boolean) => void;
type FnParams = Parameters<Fn>;
// [a: string, b: number, c: boolean]

// Useful for wrapping functions
function wrapLog<T extends (...args: unknown[]) => unknown>(
    fn: T,
    ...args: Parameters<T>
): ReturnType<T> {
    console.log(`Calling ${fn.name}`);
    return fn(...args);
}
```

## Awaited\<T\>

Unwraps promises (TS 4.5+):

```typescript
type PromiseResult = Awaited<Promise<string>>;    // string
type DeepPromise = Awaited<Promise<Promise<number>>>; // number
type Mixed = Awaited<Promise<string> | number>;   // string | number
```

## Utility Types Cheatsheet

| Type              | Input                    | Output                                   |
|-------------------|--------------------------|------------------------------------------|
| `Partial<T>`      | `{ a: string; b: number }` | `{ a?: string; b?: number }`           |
| `Required<T>`     | `{ a?: string }`          | `{ a: string }`                         |
| `Readonly<T>`     | `{ a: string }`           | `{ readonly a: string }`                |
| `Pick<T, K>`      | `Pick<{a,b,c}, "a"\|"c">` | `{ a: string; c: boolean }`            |
| `Omit<T, K>`      | `Omit<{a,b,c}, "a">`      | `{ b: number; c: boolean }`            |
| `Record<K, V>`    | `Record<"a"\|"b", number>`| `{ a: number; b: number }`              |
| `Exclude<T, U>`   | `Exclude<"a"\|"b", "a">`  | `"b"`                                    |
| `Extract<T, U>`   | `Extract<"a"\|"b", "a">`  | `"a"`                                    |
| `NonNullable<T>`  | `NonNullable<string\|null>`| `string`                                |
| `ReturnType<T>`   | `ReturnType<() => string>`| `string`                                 |
| `Parameters<T>`   | `Parameters<(a: string) => void>` | `[a: string]`                    |
| `Awaited<T>`      | `Awaited<Promise<number>>`| `number`                                 |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which utility type is being used?     | Check the name and what it transforms.              |
| What does `Partial` do?               | Makes all properties optional.                      |
| What does `Pick` vs `Omit` do?        | `Pick` selects keys. `Omit` removes keys.           |
| What does `ReturnType` need?          | A function type (use with `typeof fn`).             |

---

# Chapter 12 — Type Narrowing

## What Is Narrowing?

Narrowing is the process of refining a broader type to a more specific type within a code block:

```typescript
function process(value: string | number): string {
    // value is string | number here

    if (typeof value === "string") {
        // value is string here (narrowed)
        return value.toUpperCase();
    }

    // value is number here (narrowed)
    return value.toFixed(2);
}
```

## `typeof` Narrowing

Works for primitive types:

```typescript
function format(value: string | number | boolean): string {
    if (typeof value === "string") {
        return `"${value}"`;
    }
    if (typeof value === "number") {
        return value.toFixed(2);
    }
    return value ? "true" : "false";
}
```

**Valid `typeof` values:** `"string"`, `"number"`, `"boolean"`, `"symbol"`, `"bigint"`, `"undefined"`, `"object"`, `"function"`.

## `instanceof` Narrowing

Works for class instances:

```typescript
class Dog {
    bark(): string { return "Woof!"; }
}

class Cat {
    meow(): string { return "Meow!"; }
}

function speak(animal: Dog | Cat): string {
    if (animal instanceof Dog) {
        return animal.bark(); // narrowed to Dog
    }
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
interface Fish {
    swim(): void;
}

interface Bird {
    fly(): void;
}

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
    // value is string | null | undefined
    if (!value) {
        return 0; // value is falsy: null, undefined, or ""
    }
    return value.length; // value is string (falsy values are narrowed out)
}
```

## Equality Narrowing

```typescript
function compare(a: string | number, b: string | boolean): void {
    if (a === b) {
        // Both a and b are narrowed to string (the only common type)
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

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How is the type narrowed?             | Check for `typeof`, `instanceof`, discriminated union check, or type predicate. |
| What is the discriminant property?    | For discriminated unions, the common literal field. |
| Is a type predicate being used?       | Check for `value is Type` return type.              |
| Could narrowing fail?                 | If the guard logic does not fully cover the union.  |

---

# Chapter 13 — Declaration Files and DefinitelyTyped

## What Are `.d.ts` Files?

Declaration files (`.d.ts`) describe the shape of JavaScript modules to TypeScript. They contain **only types** — no implementation.

```typescript
// my-library.d.ts
declare module "my-library" {
    export function greet(name: string): string;
    export interface Config {
        timeout: number;
        retries: number;
    }
}
```

## Writing Your Own Declarations

For plain JavaScript files that you want to use in TypeScript:

```typescript
// global.d.ts — augment global scope
interface Window {
    myApp: {
        version: string;
        init(): void;
    };
}

// Now window.myApp is typed
window.myApp.init();

// For untyped npm modules
declare module "untyped-library" {
    export function doSomething(input: string): void;
    export const VERSION: string;
}
```

## DefinitelyTyped

The `@types/` namespace on npm contains type declarations for thousands of libraries:

```bash
npm install --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev @types/react
npm install --save-dev @types/lodash
```

TypeScript automatically resolves `@types/` packages. No configuration needed — if `@types/express` is installed, `import express from "express"` is typed.

## Triple-Slash Directives

Used in declaration files to reference other declarations:

```typescript
/// <reference types="node" />
/// <reference path="./custom-types.d.ts" />

import { readFileSync } from "fs"; // now typed
```

## Ambient Declarations

Declare types for global variables without importing:

```typescript
// In a .d.ts file
declare const API_KEY: string;
declare function logVersion(): void;

// In .ts files, API_KEY and logVersion are available globally
console.log(API_KEY);
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does this library have types?         | Check for `@types/package` or bundled `.d.ts` files. |
| Is there a `.d.ts` file?              | Declaration-only files with no implementation.      |
| Is a global variable declared?        | Check for `declare` keyword in `.d.ts` files.       |
| Are triple-slash directives used?     | Check for `/// <reference>` at the top of files.    |

---

# Chapter 14 — TypeScript with React

## Typing Props

```typescript
import { ReactNode } from "react";

interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    onClick: () => void;
    children?: ReactNode;
}

function Button({ label, variant = "primary", disabled = false, onClick, children }: ButtonProps) {
    return (
        <button
            className={`btn btn-${variant}`}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
            {children}
        </button>
    );
}
```

## useState

TypeScript infers the state type from the initial value:

```typescript
const [count, setCount] = useState(0);          // type: number
const [name, setName] = useState("");            // type: string
const [items, setItems] = useState<string[]>([]); // type: string[]

// Union state
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

// Complex state
interface UserState {
    id: number;
    name: string;
    email: string;
}
const [user, setUser] = useState<UserState | null>(null);

// Functional update preserves type safety
setCount(prev => prev + 1); // prev is number
```

## useRef

```typescript
import { useRef, useEffect } from "react";

// DOM element ref
function Input() {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus(); // optional chaining — may be null
    }, []);

    return <input ref={inputRef} type="text" />;
}

// Mutable value ref (not DOM)
function Timer() {
    const countRef = useRef(0);

    useEffect(() => {
        countRef.current += 1; // mutable, does not trigger re-render
    });
}
```

## Event Handlers

```typescript
import { ChangeEvent, FormEvent, MouseEvent, KeyboardEvent } from "react";

function Form() {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // submit logic
    }

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        console.log(event.clientX, event.clientY);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            // submit
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleClick}>Submit</button>
        </form>
    );
}
```

## Typing Children

```typescript
import { ReactNode, ReactElement } from "react";

// Most permissive
interface ContainerProps {
    children: ReactNode; // anything renderable
}

// Single React element
interface SingleChildProps {
    children: ReactElement;
}

// Specific element type
interface CardProps {
    children: ReactElement<{ className?: string }>;
}

// Render function (render props)
interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
    return <ul>{items.map((item, i) => <li key={i}>{renderItem(item, i)}</li>)}</ul>;
}
```

## Generic Components

```typescript
interface SelectProps<T> {
    items: T[];
    selectedItem: T | null;
    onSelect: (item: T) => void;
    getLabel: (item: T) => string;
}

function Select<T>({ items, selectedItem, onSelect, getLabel }: SelectProps<T>) {
    return (
        <select
            value={selectedItem ? getLabel(selectedItem) : ""}
            onChange={(e) => {
                const item = items.find(i => getLabel(i) === e.target.value);
                if (item) onSelect(item);
            }}
        >
            {items.map((item, i) => (
                <option key={i} value={getLabel(item)}>
                    {getLabel(item)}
                </option>
            ))}
        </select>
    );
}

// Usage with inference
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

<Select
    items={users}
    selectedItem={null}
    onSelect={(user) => console.log(user.name)} // user is inferred as { id: number; name: string }
    getLabel={(user) => user.name}
/>
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How are props typed?                  | Using an interface or type for the props parameter. |
| How is state typed?                   | Inferred from `useState(initial)` or explicit generic `useState<Type>(initial)`. |
| How is a ref typed?                   | `useRef<HTMLInputElement>(null)` for DOM refs.      |
| How are event handlers typed?         | Using React event types like `ChangeEvent`, `MouseEvent`. |
| What type is `children`?              | `ReactNode` for most cases.                         |

---

# Chapter 15 — TypeScript with Node.js / Express

## Basic Express Server

```typescript
import express, { Request, Response, NextFunction } from "express";
import { User } from "./types";

const app = express();
app.use(express.json());

app.get("/api/users", (req: Request, res: Response) => {
    const users: User[] = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];
    res.json(users);
});

app.post("/api/users", (req: Request, res: Response) => {
    const body: { name: string } = req.body;
    // TypeScript knows body is parsed JSON

    if (!body.name || typeof body.name !== "string") {
        res.status(400).json({ error: "Name is required" });
        return;
    }

    const newUser: User = {
        id: Date.now(),
        name: body.name
    };

    res.status(201).json(newUser);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## Typed Request Handlers

```typescript
import { Request, Response, NextFunction } from "express";

// Typed request parameters
interface UserParams {
    id: string;
}

interface UserQuery {
    sort?: "asc" | "desc";
    limit?: string;
}

interface UserBody {
    name: string;
    email: string;
}

app.get(
    "/api/users/:id",
    (req: Request<UserParams, unknown, unknown, UserQuery>, res: Response) => {
        const userId = req.params.id; // string
        const sortOrder = req.query.sort; // "asc" | "desc" | undefined
        // ...
    }
);

app.post(
    "/api/users",
    (req: Request<unknown, unknown, UserBody>, res: Response) => {
        const { name, email } = req.body; // typed as UserBody
        // ...
    }
);
```

## Typed Middleware

```typescript
import { Request, Response, NextFunction } from "express";

// Extend the Request type
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: "admin" | "user";
            };
        }
    }
}

// Auth middleware
function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    // Verify token and attach user
    req.user = { id: 1, role: "admin" }; // now available on all Request objects
    next();
}

app.get("/api/protected", authMiddleware, (req: Request, res: Response) => {
    res.json({ user: req.user }); // req.user is typed
});
```

## Async Error Handling

```typescript
import { Request, Response, NextFunction } from "express";

// Wrapper for async handlers
function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

interface ApiError {
    status: number;
    message: string;
}

// Error handling middleware
function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction): void {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
}

// Usage
app.get(
    "/api/users",
    asyncHandler(async (req: Request, res: Response) => {
        const users = await fetchUsersFromDatabase();
        res.json(users);
    })
);

app.use(errorHandler);
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How are request params typed?         | Using the generic `Request<Params, ResBody, ReqBody, Query>`. |
| How is the Request type extended?     | Via `declare global { namespace Express { interface Request { ... } } }`. |
| How are async errors caught?          | Using a wrapper that forwards rejected promises to `next()`. |
| What types come from Express?         | `Request`, `Response`, `NextFunction`, `Router`, `Application`. |

---

# Chapter 16 — Module Resolution and Path Aliases

## Module Resolution Strategies

TypeScript needs to find the module you import. The `moduleResolution` option in `tsconfig.json` controls this:

### `node` (Classic Node.js resolution)

```typescript
import { something } from "lodash";
// 1. Look for lodash.ts, lodash.tsx, lodash.d.ts
// 2. Look for package.json with "types" or "typings" field
// 3. Look for index.ts, index.d.ts in lodash/

import { stuff } from "./utils";
// 1. Look for utils.ts, utils.tsx, utils.d.ts
// 2. Look for utils/index.ts, utils/index.d.ts
```

### `bundler` (Modern bundlers like Vite, Webpack)

Similar to `node` but more permissive — allows extensionless imports, works with ES modules.

### `NodeNext` (Node.js 16+ native ESM)

Follows Node.js ESM resolution exactly — requires `.js` extensions in imports:

```typescript
import { helper } from "./helper.js"; // must include .js even for .ts files
```

## Path Aliases

Configure short import paths in `tsconfig.json`:

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@components/*": ["src/components/*"],
            "@utils/*": ["src/utils/*"],
            "@types": ["src/types/index.ts"]
        }
    }
}
```

Now you can import with aliases:

```typescript
// Instead of:
import { Button } from "../../components/Button";
import { formatDate } from "../../../utils/date";

// Use:
import { Button } from "@components/Button";
import { formatDate } from "@utils/date";
```

**Note:** Path aliases are TypeScript-only. For bundlers (Webpack, Vite), you must configure the same aliases in the bundler's config.

## File Extensions

```typescript
// TypeScript resolves these automatically:
import "./helper";       // looks for helper.ts, helper.tsx, helper.d.ts

// With nodeNext moduleResolution, you must include extension:
import "./helper.js";    // resolves to helper.ts at compile time
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How does TypeScript resolve imports?  | Based on `moduleResolution` in tsconfig.            |
| Are path aliases configured?          | Check `paths` in tsconfig's `compilerOptions`.      |
| Do the aliases work at runtime?       | Only if the bundler/runtime is also configured.     |
| Does the import include file extensions? | Depends on module resolution mode.              |

---

# Chapter 17 — Migration Strategy: Adding TypeScript to an Existing JS Project

## Step 1: Initial Setup

```bash
# Install TypeScript
npm install --save-dev typescript

# Generate tsconfig.json
npx tsc --init

# Install type declarations for your dependencies
npm install --save-dev @types/node @types/express @types/react @types/react-dom
```

## Step 2: Relaxed Configuration

Start with a permissive config that allows JS files:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": false,
        "allowJs": true,
        "checkJs": false,
        "skipLibCheck": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "esModuleInterop": true,
        "resolveJsonModule": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

Key options for migration:

- `allowJs: true` — let JS and TS coexist.
- `checkJs: false` — do not type-check your JS files yet.
- `strict: false` — avoid hundreds of errors on day one.
- `skipLibCheck: true` — skip checking `.d.ts` files.

## Step 3: Rename Files Incrementally

Rename files from `.js` to `.ts` (or `.tsx` for React) one at a time:

```bash
# Rename one file
mv src/utils/helper.js src/utils/helper.ts

# Fix type errors in that file only
```

## Step 4: Add Types Gradually

Start with the **leaf files** (no imports) and work inward:

```typescript
// Before (helper.js)
export function add(a, b) {
    return a + b;
}

// After (helper.ts) — minimal change
export function add(a: number, b: number): number {
    return a + b;
}
```

## Step 5: Use `any` Temporarily

When types are too complex to fix immediately:

```typescript
// TODO: type this properly
function complexLogic(input: any): any {
    // ...
}
```

Add a lint rule to track `any` usage:

```json
// .eslintrc
{
    "rules": {
        "@typescript-eslint/no-explicit-any": "warn"
    }
}
```

## Step 6: Enable Strict Mode Incrementally

Turn on strict checks one by one:

```json
{
    "compilerOptions": {
        "strict": false,
        "noImplicitAny": true,
        "strictNullChecks": true,
        // later:
        // "strictFunctionTypes": true,
        // "strictBindCallApply": true,
        // "noImplicitReturns": true,
        // "noFallthroughCasesInSwitch": true
    }
}
```

## Step 7: Type the Most Critical Code First

Priority order for typing:

1. Public API functions (most impact).
2. Database models and data shapes.
3. Request/response handlers.
4. Utility functions.
5. Internal helpers.

## Step 8: Use JSDoc for Gradual Typing

Add type hints to JS files before converting to TS:

```javascript
// @ts-check — enables type checking on this JS file

/**
 * @param {string} name
 * @param {number} age
 * @returns {{ name: string; age: number }}
 */
function createUser(name, age) {
    return { name, age };
}
```

When you rename this file to `.ts`, the types are already written as JSDoc annotations — TypeScript will use them.

## Migration Checklist

| Step                        | Action                                              |
|-----------------------------|-----------------------------------------------------|
| 1. Install TS               | `npm install --save-dev typescript`                 |
| 2. Configure tsconfig       | `allowJs: true`, `strict: false` to start           |
| 3. Install @types           | Install type declarations for dependencies          |
| 4. Rename files             | `.js` → `.ts` incrementally                         |
| 5. Fix type errors          | Fix or add `any` temporarily                        |
| 6. Enable strict checks     | One flag at a time                                  |
| 7. Clean up `any`           | Replace `any` with proper types                     |
| 8. Remove `allowJs`         | Once all files are converted                        |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this project mid-migration?        | Check for both `.js` and `.ts` files.               |
| Are `@types/` packages installed?     | Check `package.json` for `@types/*` dependencies.   |
| Is strict mode enabled?               | Check `tsconfig.json`.                              |
| Is `allowJs` still true?              | If yes, some files may still be JS.                 |
| Are there `any` types that need fixing? | Search for `: any` in the codebase.              |

---

# Chapter 18 — Practical Patterns

## Pattern 1: Builder Pattern with Generics

```typescript
class QueryBuilder<T> {
    private filters: Partial<T> = {};
    private sortField?: keyof T;
    private sortOrder: "asc" | "desc" = "asc";
    private limitCount?: number;

    where<K extends keyof T>(field: K, value: T[K]): this {
        this.filters[field] = value;
        return this;
    }

    sortBy(field: keyof T, order: "asc" | "desc" = "asc"): this {
        this.sortField = field;
        this.sortOrder = order;
        return this;
    }

    limit(count: number): this {
        this.limitCount = count;
        return this;
    }

    build(): { filters: Partial<T>; sort: string; limit: number | undefined } {
        const sortField = this.sortField
            ? `${String(this.sortField)}:${this.sortOrder}`
            : "id:asc";

        return {
            filters: this.filters,
            sort: sortField,
            limit: this.limitCount
        };
    }
}

interface User {
    name: string;
    age: number;
    email: string;
    role: "admin" | "user";
}

const query = new QueryBuilder<User>()
    .where("role", "admin")
    .where("age", 25)
    .sortBy("name", "asc")
    .limit(10)
    .build();
```

## Pattern 2: Result Type for Error Handling

```typescript
type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

function safeParse<T>(json: string): Result<T> {
    try {
        const data = JSON.parse(json);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

const result = safeParse<{ name: string }>('{"name": "Alice"}');

if (result.success) {
    console.log(result.data.name); // narrowed — data is available
} else {
    console.error(result.error.message); // narrowed — error is available
}
```

## Pattern 3: Branded Types

Prevent mixing up similar primitive types:

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function getUser(id: UserId): void {
    console.log(`Getting user ${id}`);
}

function getProduct(id: ProductId): void {
    console.log(`Getting product ${id}`);
}

const userId = "user_123" as UserId;
const productId = "prod_456" as ProductId;

getUser(userId);       // ok
getProduct(productId); // ok
getUser(productId);    // Error: Type 'ProductId' is not assignable to type 'UserId'
```

## Pattern 4: Deep Partial

```typescript
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface Config {
    server: {
        host: string;
        port: number;
    };
    database: {
        url: string;
        pool: {
            min: number;
            max: number;
        };
    };
}

function mergeConfig(base: Config, override: DeepPartial<Config>): Config {
    return {
        server: { ...base.server, ...override.server },
        database: {
            ...base.database,
            ...override.database,
            pool: {
                ...base.database.pool,
                ...override.database?.pool
            }
        }
    };
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is a branded type used?               | Check for `& { __brand: ... }`.                     |
| Is the Result pattern used?           | Check for `{ success: true; data: T } | { success: false; error: E }`. |
| Is a builder pattern used?            | Check for method chaining returning `this`.         |

---

# Chapter 19 — Common Pitfalls and Best Practices

## Pitfall 1: Not Using Strict Mode

```typescript
// Without strict mode — silently wrong
function getLength(value) {
    return value.length; // no error, but value could be null or undefined
}

// With strict mode — caught
function getLength(value: string): number {
    return value.length; // safe — only accepts string
}
```

## Pitfall 2: Overusing `any`

```typescript
// Bad — defeats the purpose of TypeScript
function process(data: any): any {
    return data.transform();
}

// Better — use unknown and narrow
function process(data: unknown): string {
    if (data instanceof SomeClass) {
        return data.transform();
    }
    throw new Error("Invalid data");
}
```

## Pitfall 3: Type Assertion Abuse

```typescript
// Bad — lying to the compiler
const user = JSON.parse(response) as User;
// Runtime may not match the type — risk of undefined properties

// Better — validate the shape
function isUser(data: unknown): data is User {
    return (
        typeof data === "object" &&
        data !== null &&
        typeof (data as User).name === "string" &&
        typeof (data as User).age === "number"
    );
}

const raw = JSON.parse(response);
if (isUser(raw)) {
    console.log(raw.name); // safe — narrowed to User
}
```

## Pitfall 4: `as` Casting for Non-Null Assertions

```typescript
// Bad — hides potential null errors
const el = document.getElementById("root")!;
el.innerHTML = "Hello"; // might crash if element doesn't exist

// Better — check first
const el = document.getElementById("root");
if (el) {
    el.innerHTML = "Hello";
}
```

## Best Practices

| Practice                          | Why                                                      |
|-----------------------------------|----------------------------------------------------------|
| Enable `strict: true`             | Catches the most errors at compile time.                 |
| Prefer `interface` over `type`    | Better error messages, declaration merging, extends.     |
| Use `unknown` instead of `any`    | Forces type checks before use.                           |
| Avoid type assertions (`as`)      | They bypass the type checker — validate at runtime.      |
| Use discriminated unions          | Makes impossible states impossible.                      |
| Mark function return types        | Documents intent and prevents accidental changes.        |
| Use `readonly` for immutable data | Prevents accidental mutation.                            |
| Prefer const assertions           | `as const` for literal types and readonly objects.       |
| Use generics for reusable logic   | Preserve type information across operations.             |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is `any` being used?                  | Search for `: any` — each use is a blind spot.      |
| Are there type assertions?            | Search for `as Type` — each assertion bypasses the type checker. |
| Is `strict` mode enabled?             | Check `tsconfig.json`.                              |
| Are function return types annotated?  | Missing return types can lead to accidental changes. |

---

# Chapter 20 — Project: Full TypeScript API with Type-Safe Patterns

```typescript
import express, { Request, Response, NextFunction } from "express";
import { readFile, writeFile } from "fs/promises";

// ─── Domain Types ───
interface Todo {
    readonly id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

type CreateTodoInput = Pick<Todo, "text">;
type UpdateTodoInput = Partial<Pick<Todo, "text" | "completed">>;

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

// ─── Repository ───
class TodoRepository {
    #todos: Todo[] = [];
    #nextId = 1;
    #filePath: string;

    constructor(filePath: string) {
        this.#filePath = filePath;
    }

    async load(): Promise<void> {
        try {
            const data = await readFile(this.#filePath, "utf-8");
            this.#todos = JSON.parse(data);
            this.#nextId = Math.max(...this.#todos.map(t => t.id), 0) + 1;
        } catch {
            this.#todos = [];
        }
    }

    async save(): Promise<void> {
        await writeFile(this.#filePath, JSON.stringify(this.#todos, null, 2));
    }

    getAll(): Todo[] {
        return [...this.#todos];
    }

    getById(id: number): Todo | undefined {
        return this.#todos.find(t => t.id === id);
    }

    create(input: CreateTodoInput): Todo {
        const todo: Todo = {
            id: this.#nextId++,
            text: input.text,
            completed: false,
            createdAt: new Date()
        };
        this.#todos.push(todo);
        return todo;
    }

    update(id: number, input: UpdateTodoInput): Todo | undefined {
        const index = this.#todos.findIndex(t => t.id === id);
        if (index === -1) return undefined;

        this.#todos[index] = { ...this.#todos[index], ...input };
        return this.#todos[index];
    }

    delete(id: number): boolean {
        const index = this.#todos.findIndex(t => t.id === id);
        if (index === -1) return false;
        this.#todos.splice(index, 1);
        return true;
    }
}

// ─── Middleware ───
function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

function validateBody<T>(schema: (data: unknown) => data is T) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!schema(req.body)) {
            res.status(400).json({ success: false, error: "Invalid request body" });
            return;
        }
        next();
    };
}

// ─── Validators ───
function isCreateTodoInput(data: unknown): data is CreateTodoInput {
    return (
        typeof data === "object" &&
        data !== null &&
        typeof (data as CreateTodoInput).text === "string" &&
        (data as CreateTodoInput).text.trim().length > 0
    );
}

function isUpdateTodoInput(data: unknown): data is UpdateTodoInput {
    if (typeof data !== "object" || data === null) return false;
    const input = data as UpdateTodoInput;

    if (input.text !== undefined && (typeof input.text !== "string" || input.text.trim().length === 0)) {
        return false;
    }
    if (input.completed !== undefined && typeof input.completed !== "boolean") {
        return false;
    }
    return true;
}

// ─── Server ───
async function main(): Promise<void> {
    const repo = new TodoRepository("./todos.json");
    await repo.load();

    const app = express();
    app.use(express.json());

    // GET /todos
    app.get("/todos", (_req: Request, res: Response) => {
        const response: ApiResponse<Todo[]> = { success: true, data: repo.getAll() };
        res.json(response);
    });

    // GET /todos/:id
    app.get("/todos/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ success: false, error: "Invalid ID" });
            return;
        }

        const todo = repo.getById(id);

        if (!todo) {
            res.status(404).json({ success: false, error: "Todo not found" });
            return;
        }

        const response: ApiResponse<Todo> = { success: true, data: todo };
        res.json(response);
    });

    // POST /todos
    app.post(
        "/todos",
        validateBody(isCreateTodoInput),
        asyncHandler(async (req: Request, res: Response) => {
            const todo = repo.create(req.body as CreateTodoInput);
            await repo.save();

            const response: ApiResponse<Todo> = { success: true, data: todo };
            res.status(201).json(response);
        })
    );

    // PATCH /todos/:id
    app.patch(
        "/todos/:id",
        validateBody(isUpdateTodoInput),
        asyncHandler(async (req: Request, res: Response) => {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.status(400).json({ success: false, error: "Invalid ID" });
                return;
            }

            const todo = repo.update(id, req.body as UpdateTodoInput);

            if (!todo) {
                res.status(404).json({ success: false, error: "Todo not found" });
                return;
            }

            await repo.save();

            const response: ApiResponse<Todo> = { success: true, data: todo };
            res.json(response);
        })
    );

    // DELETE /todos/:id
    app.delete(
        "/todos/:id",
        asyncHandler(async (req: Request, res: Response) => {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.status(400).json({ success: false, error: "Invalid ID" });
                return;
            }

            const deleted = repo.delete(id);

            if (!deleted) {
                res.status(404).json({ success: false, error: "Todo not found" });
                return;
            }

            await repo.save();

            const response: ApiResponse<null> = { success: true, data: null };
            res.json(response);
        })
    );

    // Error handler
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
        console.error(err);
        const response: ApiResponse<never> = { success: false, error: "Internal Server Error" };
        res.status(500).json(response);
    });

    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}

main().catch(console.error);
```

---

# TypeScript Ecosystem Summary

```text
┌─────────────────────────────────────────────────────────────────────┐
│                    TYPESCRIPT ECOSYSTEM MAP                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Language Features         Tooling             Ecosystem            │
│  ┌──────────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │ Types            │  │ tsc (CLI)    │  │ DefinitelyTyped    │   │
│  │ Interfaces       │  │ ts-node      │  │  (npm @types/*)   │   │
│  │ Generics         │  │ tsx          │  │                    │   │
│  │ Enums            │  │ ts-jest      │  │  Frameworks:       │   │
│  │ Utility Types    │  │ ESLint + TS  │  │  React, Next.js    │   │
│  │ Declaration files│  │ Prettier     │  │  Express, Nest.js  │   │
│  │ Path Aliases     │  │ tsconfig     │  │  Prisma, Drizzle   │   │
│  └──────────────────┘  └──────────────┘  │  Zod, Valibot      │   │
│                                           └────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

# Final Summary Table

| Concept                  | Key Takeaway                                             |
|--------------------------|----------------------------------------------------------|
| Static types             | Types exist at compile time only — zero runtime cost.    |
| Strict mode              | Always enable `"strict": true` for maximum safety.       |
| Interfaces vs Types      | Interfaces for objects (extensible). Types for unions/intersections. |
| Generics                 | Preserve type information across reusable code.          |
| Utility types            | `Partial`, `Pick`, `Omit`, `Record`, `ReturnType` solve common patterns. |
| Discriminated unions     | Model states explicitly — makes impossible states impossible. |
| Type narrowing           | `typeof`, `instanceof`, discriminated unions, type predicates. |
| `unknown` over `any`     | Forces type checking before use — safer.                 |
| Declaration files        | `.d.ts` files describe JS to TypeScript.                 |
| Migration                | Start permissive, enable strict gradually, rename files incrementally. |

---

## Next: Part 19

**Part 19 — Frontend Frameworks: React, Next.js, and the Component Ecosystem**

Including:

- The Virtual DOM and reconciliation.
- React components: functional, class, hooks.
- State management: useState, useReducer, Context, Zustand, Redux Toolkit.
- Next.js: App Router, Server Components, SSR, ISR, SSG.
- Routing (React Router, Next.js Router).
- Performance: memoization, code splitting, lazy loading.
- Testing React components (React Testing Library, Vitest).
- Reverse engineering React applications.
- TypeScript patterns specific to frontend frameworks.
