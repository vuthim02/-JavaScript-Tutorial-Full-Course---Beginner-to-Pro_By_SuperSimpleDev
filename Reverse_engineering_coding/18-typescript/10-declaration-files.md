# Declaration Files and DefinitelyTyped

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

| Question | Answer |
|----------|--------|
| Does this library have types? | Check for `@types/package` or bundled `.d.ts` files |
| Is there a `.d.ts` file? | Declaration-only files with no implementation |
| Is a global variable declared? | Check for `declare` keyword in `.d.ts` files |
| Are triple-slash directives used? | Check for `/// <reference>` at file tops |
## Next Steps

[Back to Chapter 9](09-type-narrowing.md): Type Narrowing
[Proceed to Chapter 11](11-react.md): TypeScript with React to learn about typescript with react.
