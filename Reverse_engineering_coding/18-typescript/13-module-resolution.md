# Module Resolution and Path Aliases

## Module Resolution Strategies

TypeScript needs to find the module you import. The `moduleResolution` option in `tsconfig.json` controls this.

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

| Question | Answer |
|----------|--------|
| How does TypeScript resolve imports? | Based on `moduleResolution` in tsconfig |
| Are path aliases configured? | Check `paths` in tsconfig's `compilerOptions` |
| Do the aliases work at runtime? | Only if the bundler/runtime is also configured |
| Does the import include file extensions? | Depends on module resolution mode |
## Next Steps

[Back to Chapter 12](12-node-express.md): TypeScript with Node.js / Express
[Proceed to Chapter 14](14-migration.md): Migration Strategy: Adding TypeScript to an Existing JS Project to learn about migration strategy: adding typescript to an existing js project.
