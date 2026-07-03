# Migration Strategy: Adding TypeScript to an Existing JS Project

## Step 1: Initial Setup

```bash
npm install --save-dev typescript
npx tsc --init
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
- `checkJs: false` — do not type-check JS files yet.
- `strict: false` — avoid hundreds of errors on day one.
- `skipLibCheck: true` — skip checking `.d.ts` files.

## Step 3: Rename Files Incrementally

Rename from `.js` to `.ts` (or `.tsx` for React) one at a time:

```bash
mv src/utils/helper.js src/utils/helper.ts
# Fix type errors in that file only
```

## Step 4: Add Types Gradually

Start with **leaf files** (no imports) and work inward:

```typescript
// Before (helper.js)
export function add(a, b) { return a + b; }

// After (helper.ts) — minimal change
export function add(a: number, b: number): number { return a + b; }
```

## Step 5: Use `any` Temporarily

```typescript
// TODO: type this properly
function complexLogic(input: any): any { /* ... */ }
```

Add a lint rule to track `any` usage:

```json
// .eslintrc
{ "rules": { "@typescript-eslint/no-explicit-any": "warn" } }
```

## Step 6: Enable Strict Mode Incrementally

Turn on strict checks one by one:

```json
{
    "compilerOptions": {
        "strict": false,
        "noImplicitAny": true,
        "strictNullChecks": true
        // later: "strictFunctionTypes", "strictBindCallApply",
        // "noImplicitReturns", "noFallthroughCasesInSwitch"
    }
}
```

## Step 7: Type the Most Critical Code First

Priority: 1. Public API functions, 2. Database models, 3. Request/response handlers, 4. Utility functions, 5. Internal helpers.

## Step 8: Use JSDoc for Gradual Typing

```javascript
// @ts-check
/**
 * @param {string} name
 * @param {number} age
 * @returns {{ name: string; age: number }}
 */
function createUser(name, age) { return { name, age }; }
```

When renamed to `.ts`, TypeScript uses the JSDoc annotations.

## Migration Checklist

| Step | Action |
|------|--------|
| 1. Install TS | `npm install --save-dev typescript` |
| 2. Configure tsconfig | `allowJs: true`, `strict: false` to start |
| 3. Install @types | Install type declarations for dependencies |
| 4. Rename files | `.js` → `.ts` incrementally |
| 5. Fix type errors | Fix or add `any` temporarily |
| 6. Enable strict checks | One flag at a time |
| 7. Clean up `any` | Replace `any` with proper types |
| 8. Remove `allowJs` | Once all files are converted |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this project mid-migration? | Check for both `.js` and `.ts` files |
| Are `@types/` packages installed? | Check `package.json` for `@types/*` deps |
| Is strict mode enabled? | Check `tsconfig.json` |
| Is `allowJs` still true? | If yes, some files may still be JS |
| Are there `any` types that need fixing? | Search for `: any` in the codebase |
## Next Steps

[Back to Chapter 13](13-module-resolution.md): Module Resolution and Path Aliases
[Proceed to Chapter 15](15-practical-patterns.md): Practical Patterns to learn about practical patterns.
