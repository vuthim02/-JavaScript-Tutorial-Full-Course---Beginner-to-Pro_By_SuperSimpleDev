# What Is TypeScript?

TypeScript is a **typed superset of JavaScript** developed by Microsoft (2012). It adds static type checking, enhanced tooling, modern ECMAScript features compiled to older JS, and types as living documentation.

## Compilation vs Transpilation

| Term | Meaning |
|------|---------|
| Compilation | Source → lower-level representation (C → machine code) |
| Transpilation | Source → source at similar abstraction (TS → JS) |

TypeScript does both: transpiles TS to JS and down-level compiles modern JS to older JS.

```typescript
// TypeScript source (ES2022)
const greet = (name: string): string => `Hello, ${name}`;

// Compiled output (target: ES2015)
var greet = function (name) { return "Hello, " + name; };
```

## Why TypeScript?

| Benefit | Explanation |
|---------|-------------|
| Catch bugs early | Type errors at compile time, not runtime |
| Better IDE support | Autocomplete, refactoring, go-to-definition |
| Self-documenting code | Function signatures tell you what to pass and return |
| Safer refactoring | Rename a property → TS catches all usages |
| Team-scale code | Large codebases are significantly easier to maintain |
| Ecosystem | Almost all npm packages have types (via DefinitelyTyped) |

## JS vs TS — The Same Code

```javascript
function add(a, b) { return a + b; }
add(1, 2);       // 3
add("1", "2");   // "12" — probably wrong
add(null, {});   // "null[object Object]"
```

```typescript
function add(a: number, b: number): number { return a + b; }
add(1, 2);       // 3
add("1", "2");   // Error: string not assignable to number
add(null, {});   // Error: null not assignable to number
```

---

# Setting Up TypeScript

## Installation

```bash
npm install -g typescript        # global
npm install --save-dev typescript # project dependency
tsc --version                    # verify
```

## The `tsconfig.json` File

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

`"strict": true` enables a family of stricter checks:

| Option | Effect |
|--------|--------|
| `strictNullChecks` | `null`/`undefined` not assignable to other types |
| `noImplicitAny` | Error if type cannot be inferred and falls back to `any` |
| `strictFunctionTypes` | Enables stricter function type variance |
| `strictBindCallApply` | `call`/`apply`/`bind` are type-checked |
| `noImplicitReturns` | Error if function doesn't return on all paths |
| `noFallthroughCasesInSwitch` | Error on fallthrough in switch cases |

**Without strict:**
```typescript
let name;   // implicit any — no error
name = 42;  // no error
```

**With strict:**
```typescript
let name;                              // Error: implicit any
let age: number | null = null;
age.toFixed(2);                        // Error: possibly null
```

## Compiler Options Cheatsheet

| Option | Common Values | Purpose |
|--------|---------------|---------|
| `target` | `ES2015`, `ES2020`, `ES2022`, `ESNext` | JS output version |
| `module` | `ESNext`, `CommonJS`, `NodeNext` | Module system for output |
| `moduleResolution` | `node`, `bundler`, `NodeNext` | How import paths resolve |
| `outDir` | `./dist` | Output directory |
| `rootDir` | `./src` | Source directory |
| `strict` | `true` | Enable all strict checks |
| `declaration` | `true` | Generate `.d.ts` files |
| `sourceMap` | `true` | Debugging support |
| `esModuleInterop` | `true` | Compatible default imports |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is TS configured for this project? | Check for `tsconfig.json` in the root |
| Is strict mode on? | Look for `"strict": true` in `compilerOptions` |
| Where does the compiled JS go? | `outDir` setting in `tsconfig.json` |
| What target is the code compiled to? | `target` setting in `tsconfig.json` |
| Is this code TS or JS? | Check for type annotations (`: string`), file extension `.ts` |
| What does TypeScript add? | Static types erased at compile time |
| What happens to types at runtime? | They are erased — no runtime overhead |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-primitive-types.md): Primitive Types to learn about primitive types.
