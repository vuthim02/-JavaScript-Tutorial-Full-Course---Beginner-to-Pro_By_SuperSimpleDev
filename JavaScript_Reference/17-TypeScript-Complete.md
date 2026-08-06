# TypeScript Complete Guide

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents
1. [TypeScript Basics](#1-typescript-basics)
2. [All Basic Types](#2-all-basic-types)
3. [Array Types, Tuple Types, Enum Types](#3-array-types-tuple-types-enum-types)
4. [Type Inference and Type Assertion](#4-type-inference-and-type-assertion)
5. [Interfaces](#5-interfaces)
6. [Type Aliases vs Interfaces](#6-type-aliases-vs-interfaces)
7. [Union Types and Intersection Types](#7-union-types-and-intersection-types)
8. [Literal Types](#8-literal-types)
9. [Type Guards](#9-type-guards)
10. [Generics](#10-generics)
11. [Utility Types](#11-utility-types)
12. [Mapped Types and Conditional Types](#12-mapped-types-and-conditional-types)
13. [Template Literal Types](#13-template-literal-types)
14. [Function Types](#14-function-types)
15. [Class Types](#15-class-types)
16. [Module Declarations and Namespace](#16-module-declarations-and-namespace)
17. [Declaration Files (.d.ts)](#17-declaration-files-dts)
18. [tsconfig.json Complete Options](#18-tsconfigjson-complete-options)
19. [TypeScript with React](#19-typescript-with-react)
20. [TypeScript with Node.js](#20-typescript-with-nodejs)
21. [TypeScript with DOM](#21-typescript-with-dom)
22. [Advanced Patterns](#22-advanced-patterns)
23. [TypeScript 5.x New Features](#23-typescript-5x-new-features)
24. [Common TypeScript Patterns and Best Practices](#24-common-typescript-patterns-and-best-practices)

---

## 1. TypeScript Basics

### Installation

```bash
# Install TypeScript globally
npm install -g typescript

# Install as dev dependency in project
npm install typescript --save-dev

# Initialize a new TypeScript project
tsc --init

# Compile TypeScript files
tsc filename.ts

# Watch mode
tsc --watch
```

### tsconfig.json

The `tsconfig.json` file specifies the root files and compiler options required to compile the project.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Key Compiler Options

| Option | Description | Default |
|--------|-------------|---------|
| `target` | JavaScript version for output | `ES3` |
| `module` | Module system for output | `CommonJS` (if target ES5) |
| `strict` | Enable all strict checks | `false` |
| `outDir` | Output directory | - |
| `rootDir` | Input directory | - |
| `esModuleInterop` | CommonJS/ES module interop | `false` |
| `skipLibCheck` | Skip type checking of declaration files | `false` |
| `forceConsistentCasingInFileNames` | Ensure correct casing in imports | `false` |
| `noImplicitAny` | Error on implicit `any` | `false` (unless strict) |
| `strictNullChecks` | Enable strict null checks | `false` (unless strict) |
| `declaration` | Generate .d.ts files | `false` |
| `sourceMap` | Generate source maps | `false` |
| `removeComments` | Remove comments from output | `false` |
| `noEmitOnError` | Don't emit on errors | `false` |

---

## 2. All Basic Types

### Primitive Types

```typescript
// String
let name: string = "Alice";
let greeting: string = `Hello, ${name}`;

// Number (integers and floats)
let age: number = 30;
let price: number = 9.99;
let hex: number = 0xff;
let binary: number = 0b1010;

// Boolean
let isActive: boolean = true;

// BigInt
let big: bigint = 100n;

// Symbol
let id: symbol = Symbol('id');

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Special Types

```typescript
// Any - opts out of type checking
let anything: any = 42;
anything = "hello";  // OK
anything.foo();      // OK (no error, but unsafe)

// Unknown - type-safe alternative to any
let data: unknown = 42;
// data.toFixed();  // Error: must narrow first
if (typeof data === "number") {
  data.toFixed();  // OK after narrowing
}

// Void - absence of any type (used for functions returning nothing)
function logMessage(msg: string): void {
  console.log(msg);
}

// Never - values that never occur
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(): never {
  while (true) {}
}

// Object - non-primitive type
let obj: object = { name: "Alice" };
```

### Type Comparison Table

| Type | Can Hold | Use Without Narrowing | Best For |
|------|----------|----------------------|----------|
| `string` | Text values | Yes | Names, messages |
| `number` | All numbers | Yes | Counts, prices |
| `boolean` | `true`/`false` | Yes | Flags, conditions |
| `null` | `null` only | Yes | Explicit "no value" |
| `undefined` | `undefined` only | Yes | Missing/uninitialized |
| `any` | Anything | Yes (unsafe) | Migration, avoid |
| `unknown` | Anything | No - must narrow | External data |
| `never` | Nothing | N/A | Exhaustive checks |
| `void` | No return value | N/A | Function returns |

---

## 3. Array Types, Tuple Types, Enum Types

### Array Types

```typescript
// Syntax 1: type[] (preferred for simple types)
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];

// Syntax 2: Array<type> (generic syntax)
let scores: Array<number> = [95, 87, 92];
let items: Array<string | number> = [1, "two", 3];

// Readonly arrays
let readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4);  // Error

// Alternative readonly syntax
let frozen: ReadonlyArray<string> = ["a", "b"];
```

### Tuple Types

Fixed-length arrays with specific types at each position:

```typescript
// Basic tuple
let person: [string, number] = ["Alice", 30];

// Accessing tuple elements
const name = person[0];  // string
const age = person[1];   // number

// Tuple with optional element
let optionalTuple: [string, number?] = ["Bob"];

// Tuple with rest elements
let flexibleTuple: [string, ...number[]] = ["scores", 90, 85, 92];

// Named tuples (TypeScript 4.0+)
type Point = [x: number, y: number];
let coordinates: Point = [10, 20];

// Readonly tuple
const readonlyTuple: readonly [string, number] = ["Alice", 30];
```

### Enum Types

```typescript
// Numeric enum (default, starts at 0)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}
let move: Direction = Direction.Up;

// String enum
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Completed = "COMPLETED"
}

// Const enum (inlined at compile time, no runtime object)
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

// Heterogeneous enum (avoid when possible)
enum Mixed {
  No = 0,
  Yes = "YES"
}
```

---

## 4. Type Inference and Type Assertion

### Type Inference

TypeScript automatically determines types without explicit annotations:

```typescript
// Variable inference
let x = 5;  // inferred as number
let name = "Alice";  // inferred as string

// Function return type inference
function add(a: number, b: number) {
  return a + b;  // return type inferred as number
}

// Best common type
let zoo = [new Rhino(), new Elephant(), new Snake()];
// Inferred as (Rhino | Elephant | Snake)[]

// Contextual typing
window.onmousedown = function(mouseEvent) {
  // mouseEvent is inferred from context
  console.log(mouseEvent.button);
};
```

### Type Assertion

Tell TypeScript you know more about the type than it does:

```typescript
// as syntax (preferred)
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// Angle-bracket syntax (not in .tsx files)
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

// Non-null assertion operator (!)
const value = maybeNull!;  // asserts not null/undefined

// Double assertion (escape hatch)
const a = expr as any as T;
```

**Note:** Type assertions are removed at compile-time and provide no runtime checking.

---

## 5. Interfaces

### Basic Interface

```typescript
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "Alice",
  age: 30
};
```

### Optional Properties

```typescript
interface Options {
  color: string;
  width?: number;
  height?: number;
}

const opts: Options = {
  color: "red"
  // width and height are optional
};
```

### Readonly Properties

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

const p: Point = { x: 10, y: 20 };
// p.x = 5;  // Error: cannot assign to readonly property
```

### Extending Interfaces

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

// Extending multiple interfaces
interface PenStroke {
  penWidth: number;
}

interface ColoredSquare extends Shape, PenStroke {
  sideLength: number;
}
```

### Interface Merging

```typescript
interface Window {
  title: string;
}

interface Window {
  close(): void;
}

// Merged: Window now has both title and close()
```

---

## 6. Type Aliases vs Interfaces

### Type Aliases

```typescript
type StringOrNumber = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;

// Can represent any type
type Primitive = string | number | boolean;
type Nullable<T> = T | null;
```

### Interfaces

```typescript
interface Person {
  name: string;
  age: number;
}

// Can only represent object shapes
interface StringMap {
  [key: string]: string;
}
```

### Key Differences

| Feature | Interface | Type |
|---------|-----------|------|
| Object shape | ✓ | ✓ |
| Extending | `extends` | `&` intersection |
| Declaration merging | ✓ | ✗ |
| Union types | ✗ | ✓ |
| Intersection types | ✗ | ✓ |
| Primitive aliases | ✗ | ✓ |
| Tuple types | ✗ | ✓ |
| Mapped types | ✗ | ✓ |
| Conditional types | ✗ | ✓ |
| Performance | Slightly faster | Slightly slower |
| Error messages | Often clearer | Can be verbose |

### When to Use

- **Use interfaces** for: Object shapes, class contracts, public APIs, declaration merging
- **Use types** for: Unions, intersections, primitives, tuples, advanced type logic

---

## 7. Union Types and Intersection Types

### Union Types

A value can be one of several types:

```typescript
// Basic union
let id: string | number;
id = "abc";
id = 123;

// Function with union parameter
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(2);
}

// Discriminated unions
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Circle | Rectangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```

### Intersection Types

Combine multiple types into one with all properties:

```typescript
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = {
  name: "Alice",
  age: 30
};

// Mixin pattern
type Timestamped = { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = User & Timestamped;
```

### Key Insight

- **Union (A | B)**: Value is A or B → access only shared properties
- **Intersection (A & B)**: Value is both A and B → access all properties

---

## 8. Literal Types

Types that represent exact values:

```typescript
// String literal types
type Direction = "up" | "down" | "left" | "right";
let dir: Direction = "up";

// Number literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3;

// Boolean literal types
type True = true;

// Combining literals
type StatusCode = 200 | 301 | 404 | 500;

// Const assertions (preserve literal types)
const config = {
  port: 3000,
  host: "localhost"
} as const;
// typeof config.port is 3000, not number

// const enum vs union types
// Many teams prefer union types over enums:
type Direction2 = "up" | "down" | "left" | "right";
```

---

## 9. Type Guards

### typeof Guards

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  return padding + value;
}
```

### instanceof Guards

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}
```

### in Guards

```typescript
interface Fish { swim(): void; }
interface Bird { fly(): void; }

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}
```

### Custom Type Guards

```typescript
function isFish(animal: Fish | Bird): animal is Fish {
  return "swim" in animal;
}

function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim();  // TypeScript knows it's Fish
  } else {
    animal.fly();   // TypeScript knows it's Bird
  }
}
```

### assertNever

```typescript
function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
}

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      return assertNever(shape);  // Compile-time check for exhaustive handling
  }
}
```

---

## 10. Generics

### Basic Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>("hello");
const inferred = identity(42);  // T inferred as number

// Generic interface
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// Generic class
class Box<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}
```

### Generic Constraints

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // OK, T has .length
  return arg;
}

loggingIdentity("hello");     // OK
loggingIdentity([1, 2, 3]);   // OK
// loggingIdentity(42);       // Error: number doesn't have .length
```

### Default Types

```typescript
function create<T extends HTMLElement = HTMLDivElement>(
  element?: T
): Container<T> {
  // ...
}

const div = create();  // Uses default HTMLDivElement
const p = create(new ParagraphElement());
```

### Generic Functions

```typescript
// Type parameter used twice
function firstElement<T>(arr: T[]): T {
  return arr[0];
}

// Multiple type parameters
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

## 11. Utility Types

### Property Modifier Utilities

```typescript
// Partial<T> - all properties optional
type UserUpdate = Partial<User>;

// Required<T> - all properties required
type RequiredUser = Required<PartialUser>;

// Readonly<T> - all properties readonly
type ReadonlyUser = Readonly<User>;
```

### Property Selection Utilities

```typescript
// Pick<T, K> - select specific properties
type UserName = Pick<User, "name" | "email">;

// Omit<T, K> - remove specific properties
type UserWithoutId = Omit<User, "id">;
```

### Type Construction Utilities

```typescript
// Record<K, V> - create object type
type Scores = Record<string, number>;
type StatusMap = Record<"active" | "inactive", User[]>;

// Exclude<T, U> - remove types from union
type NonString = Exclude<string | number | boolean, string>;

// Extract<T, U> - keep types from union
type OnlyStrings = Extract<string | number | boolean, string>;

// NonNullable<T> - remove null and undefined
type SafeString = NonNullable<string | null | undefined>;
```

### Function Utilities

```typescript
// ReturnType<T> - extract return type
type FnReturn = ReturnType<typeof myFunction>;

// Parameters<T> - extract parameter types
type FnParams = Parameters<typeof myFunction>;

// InstanceType<T> - extract instance type of class
type MyInstance = InstanceType<typeof MyClass>;

// ConstructorParameters<T> - extract constructor params
type MyConstructorParams = ConstructorParameters<typeof MyClass>;

// Awaited<T> - unwrap Promise type
type Result = Awaited<Promise<string>>;  // string
```

### Composition Examples

```typescript
// PATCH endpoint pattern
type UserUpdatePayload = Partial<Omit<User, "id" | "createdAt">>;

// Readonly subset
type ReadonlyNameEmail = Readonly<Pick<User, "name" | "email">>;
```

---

## 12. Mapped Types and Conditional Types

### Mapped Types

Transform every property of an existing type:

```typescript
// Basic mapped type
type MappedType<T> = {
  [K in keyof T]: T[K];
};

// Building custom Partial
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Building custom Required
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

// Building custom Readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Key remapping with as (TypeScript 4.1+)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

### Conditional Types

Choose types based on conditions:

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// infer keyword - extract types
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type Str = Flatten<string[]>;  // string
type Num = Flatten<number>;    // number

// Extract return type
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArr = ToArray<string | number>;  // string[] | number[]

// Non-distributive (wrap in tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type ArrOfStrOrNum = ToArrayNonDist<string | number>;  // (string | number)[]
```

---

## 13. Template Literal Types

Build string types using template literal syntax:

```typescript
// Basic template literal type
type Greeting = `Hello, ${string}`;  // matches any string starting with "Hello, "

// Combining literal types
type Color = "red" | "blue";
type Size = "small" | "large";
type ColorSize = `${Color}-${Size}`;  // "red-small" | "red-large" | "blue-small" | "blue-large"

// Event handler pattern
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

// String manipulation
type UppercaseString<S extends string> = Uppercase<S>;
type LowercaseString<S extends string> = Lowercase<S>;
type CapitalizeString<S extends string> = Capitalize<S>;
type UncapitalizeString<S extends string> = Uncapitalize<S>;

// Practical example
type CSSProperty = "margin" | "padding";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSShorthand = `${CSSProperty}-${CSSDirection}`;
// "margin-top" | "margin-right" | ... | "padding-left"
```

---

## 14. Function Types

### Function Overloads

```typescript
// Overload signatures
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: string): HTMLElement;

// Implementation signature
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}
```

### Optional Parameters

```typescript
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

// Optional parameters must come after required parameters
```

### Rest Parameters

```typescript
function multiply(n: number, ...m: number[]): number[] {
  return m.map((x) => n * x);
}

const result = multiply(10, 1, 2, 3);  // [10, 20, 30]
```

### Callback Types

```typescript
// Basic callback type
type Callback = (data: string) => void;

function fetchData(callback: Callback) {
  callback("done");
}

// Generic callback
type Mapper<T, U> = (item: T) => U;

function map<T, U>(arr: T[], fn: Mapper<T, U>): U[] {
  return arr.map(fn);
}
```

### Function Type Aliases

```typescript
type Comparator<T> = (a: T, b: T) => number;
type Predicate<T> = (item: T) => boolean;
type AsyncFn<T> = () => Promise<T>;
```

---

## 15. Class Types

### Access Modifiers

```typescript
class Employee {
  public name: string;        // accessible everywhere
  private salary: number;     // accessible only in class
  protected department: string;  // accessible in class and subclasses

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  // Parameter properties (shorthand)
  // constructor(public name: string, private salary: number) {}
}
```

### Abstract Classes

```typescript
abstract class Shape {
  abstract getArea(): number;  // must be implemented

  toString(): string {
    return `Shape with area ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// const shape = new Shape();  // Error: cannot instantiate abstract class
const circle = new Circle(5);
```

### Implements Interface

```typescript
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

class Document implements Printable, Loggable {
  print(): void {
    console.log("Printing...");
  }

  log(): void {
    console.log("Logging...");
  }
}
```

### Static Members

```typescript
class Counter {
  static count = 0;

  constructor() {
    Counter.count++;
  }

  static getCount(): number {
    return Counter.count;
  }
}
```

---

## 16. Module Declarations and Namespace

### ES Modules

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export const PI = 3.14159;

// app.ts
import { add, PI } from "./math";
```

### Namespace

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return /^[A-Za-z]+$/.test(s);
    }
  }
}

const validator = new Validation.LettersOnlyValidator();
```

### Module Augmentation

```typescript
// Extend existing module
declare module "express" {
  interface Request {
    user?: User;
  }
}

// Ambient module declaration
declare module "untyped-lib" {
  export function doSomething(input: string): any;
}
```

---

## 17. Declaration Files (.d.ts)

### Structure

```typescript
// types/my-lib/index.d.ts
declare module "my-lib" {
  export function doSomething(input: string): number;
  export interface Config {
    debug: boolean;
    port: number;
  }
  export class Client {
    constructor(config: Config);
    connect(): Promise<void>;
  }
}
```

### Global Declarations

```typescript
// globals.d.ts
declare global {
  interface Window {
    myCustomProperty: string;
  }

  var myGlobalVar: number;
}

export {};  // Make this a module file
```

### Declaration File Templates

```typescript
// Type definitions for my-lib
// Project: https://github.com/my-org/my-lib

export as namespace myLib;

export function myFunction(a: string): string;
export function myOtherFunction(a: number): number;

export interface SomeType {
  name: string;
  length: number;
  extras?: string[];
}

export const myField: number;
```

---

## 18. tsconfig.json Complete Options

### Type Checking Options

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": false,
    "noUncheckedIndexedAccess": false,
    "noPropertyAccessFromIndexSignature": false,
    "alwaysStrict": true
  }
}
```

### Module Options

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./src/*"]
    },
    "rootDir": "./src",
    "rootDirs": ["./src", "./generated"],
    "typeRoots": ["./node_modules/@types"],
    "types": ["node", "jest"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "noResolve": false
  }
}
```

### Emit Options

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "./types",
    "emitDeclarationOnly": false,
    "sourceMap": true,
    "inlineSourceMap": false,
    "removeComments": false,
    "noEmitOnError": true,
    "importHelpers": false,
    "downlevelIteration": false,
    "isolatedModules": false
  }
}
```

### Project References

```json
{
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/utils" }
  ],
  "files": [],
  "compilerOptions": {
    "composite": true
  }
}
```

---

## 19. TypeScript with React

### Basic Component

```typescript
import React from 'react';

// Function component with props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### Hooks Typing

```typescript
// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useEffect
useEffect(() => {
  fetchData();
}, []);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<NodeJS.Timeout | null>(null);

// useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// useReducer
interface State {
  count: number;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

### Event Handlers

```typescript
// HTML events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelected(e.target.value);
};
```

### Generic Components

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

---

## 20. TypeScript with Node.js

### Setup

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Express with TypeScript

```typescript
import express, { Request, Response, NextFunction } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

const app = express();

app.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // TypeScript knows id is string
  res.json({ id, name: 'Alice' });
});

app.post('/users', (req: Request, res: Response) => {
  const user: User = req.body;
  res.status(201).json(user);
});

// Custom error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

### Type Definitions

```typescript
// @types/express
declare module 'express' {
  interface Request {
    user?: User;
  }
}

// Extend Request
app.get('/profile', (req: Request, res: Response) => {
  const user = req.user;  // Now typed as User | undefined
});
```

---

## 21. TypeScript with DOM

### DOM Element Types

```typescript
// Element references
const input = document.getElementById('myInput') as HTMLInputElement;
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const form = document.querySelector('form') as HTMLFormElement;

// Type-safe access
input.value = 'Hello';
input.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  console.log(target.value);
});
```

### Window and Document

```typescript
// Window properties
interface CustomWindow extends Window {
  myCustomProperty: string;
}

const customWindow = window as CustomWindow;
customWindow.myCustomProperty = 'value';

// Document methods
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);
```

### Event Handling

```typescript
// Keyboard events
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    console.log('Enter pressed');
  }
});

// Mouse events
button.addEventListener('click', (e: MouseEvent) => {
  console.log(e.clientX, e.clientY);
});

// Form events
form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  const formData = new FormData(form);
});
```

### Fetch API

```typescript
interface ApiResponse {
  data: User[];
  status: number;
}

async function fetchUsers(): Promise<ApiResponse> {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data as ApiResponse;
}
```

---

## 22. Advanced Patterns

### Branded Types

Create unique types that can't be accidentally mixed:

```typescript
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId) { /* ... */ }

const userId = createUserId('123');
const postId = '456' as PostId;

getUser(userId);   // OK
// getUser(postId); // Error: PostId not assignable to UserId
```

### Phantom Types

Types that exist only at compile time:

```typescript
type Validated = { readonly __validated: true };
type Unvalidated = { readonly __validated: false };

interface Form<T extends Validated | Unvalidated> {
  data: FormData;
  status: T;
}

function validate(form: Form<Unvalidated>): Form<Validated> {
  // validation logic
  return { ...form, status: { __validated: true } as Validated };
}

function submit(form: Form<Validated>) {
  // Only validated forms can be submitted
}
```

### Type-Level Programming

```typescript
// Tuple manipulation
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

// String manipulation
type Split<S extends string, D extends string> =
  S extends `${infer H}${D}${infer T}` ? [H, ...Split<T, D>] : [S];

// Number manipulation (limited)
type BuildTuple<N extends number, T extends any[] = []> =
  T['length'] extends N ? T : BuildTuple<N, [...T, any]>;

type Add<A extends number, B extends number> =
  [...BuildTuple<A>, ...BuildTuple<B>]['length'];
```

---

## 23. TypeScript 5.x New Features

### TypeScript 5.0

- **Decorators**: Standardized decorators (Stage 3)
- **const Type Parameters**: `function f<const T>(arg: T)`
- **All enums as union enums**: All enums are now union enums
- **Multiple config extends**: `"extends": ["./base1.json", "./base2.json"]`

### TypeScript 5.1

- **Linked cursors**: Multi-cursor editing in editors
- **`#private` class members**: True private fields
- **`catch` clause variable**: `catch(e: unknown)` without annotation
- **JSX configuration**: `jsx: "react-jsx"` and `jsx: "react-jsxdev"`

### TypeScript 5.2

- **Using declarations**: `using resource = await acquireResource()`
- **Named and anonymous tuple elements**: `[name: string, age: number]`
- **`@satisfies` decorator**: Validate object literals against types
- **Improved `.js` extension support**: Better JavaScript interop

### TypeScript 5.3

- **Import attributes**: `import data from "./data.json" with { type: "json" }`
- **`isolatedDeclarations`**: Explicit return types for public API
- **Enum improvements**: Better enum member types

### TypeScript 5.4

- **`NoInfer` utility type**: Prevent unwanted type inference
- **Improved narrowing**: Better control flow analysis
- **`satisfies` operator improvements**: Better type inference

### TypeScript 5.5

- **`--verbatimModuleSyntax`**: Enforce explicit type imports
- **Improved inference**: Better generic type inference
- **`--rewriteRelativeImportExtensions`**: Automatic import rewriting

---

## 24. Common TypeScript Patterns and Best Practices

### General Guidelines

1. **Enable strict mode**: Always use `"strict": true` in tsconfig
2. **Avoid `any`**: Use `unknown` and narrow types
3. **Prefer interfaces for objects**: Use interfaces for object shapes, types for unions
4. **Use type guards**: Narrow types before accessing specific properties
5. **Leverage inference**: Let TypeScript infer types when obvious

### Common Patterns

```typescript
// 1. Discriminated Unions
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// 2. Builder Pattern
class QueryBuilder {
  private conditions: string[] = [];

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  build(): string {
    return this.conditions.join(' AND ');
  }
}

// 3. Factory Pattern
interface Car {
  type: 'sedan' | 'suv';
  seats: number;
}

function createCar(type: Car['type']): Car {
  switch (type) {
    case 'sedan':
      return { type: 'sedan', seats: 5 };
    case 'suv':
      return { type: 'suv', seats: 7 };
  }
}

// 4. Strategy Pattern
interface SortStrategy<T> {
  sort(arr: T[]): T[];
}

class QuickSort<T> implements SortStrategy<T> {
  sort(arr: T[]): T[] {
    // implementation
    return arr;
  }
}

// 5. Observer Pattern
class EventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners[event]?.forEach(listener => listener(data));
  }
}
```

### Performance Tips

1. **Use `readonly`**: Prevent accidental mutations
2. **Avoid deep nesting**: Keep types shallow when possible
3. **Use `interface` for public API**: Better performance and error messages
4. **Leverage declaration files**: Type third-party libraries properly
5. **Use project references**: Split large codebases

### Error Handling

```typescript
// Typed errors
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
  }
}

// Result type pattern
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function fetchData(): Promise<Result<User>> {
  try {
    const user = await api.getUser();
    return { ok: true, value: user };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}
```

---

## Summary

TypeScript provides:

- **Static typing** for JavaScript with gradual adoption
- **Powerful type system** with generics, utility types, and conditional types
- **Excellent tooling** with IDE support and compile-time checks
- **JavaScript compatibility**: Any valid JS is valid TS
- **Industry standard**: Used by React, Angular, Vue, Node.js, and more

Key takeaways:
1. Start with `"strict": true`
2. Use `unknown` over `any`
3. Leverage type inference
4. Use discriminated unions for variant types
5. Compose utility types for complex transformations
6. Use interfaces for object shapes, types for everything else
