# 06 — Barrel Files (Export All)

<img src="https://media.giphy.com/media/f4ztZcdm9Fi90vL4Zd/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Re-exporting

```javascript
export *
from "./math.js";
```

## Barrel Files

Collect and re-export modules from a single index file.

```
utils/
    math.js
    string.js
    array.js
    index.js   ← barrel file
```

## index.js (Barrel)

```javascript
export * from "./math.js";
export * from "./string.js";
export * from "./array.js";
```

## Import from Barrel

```javascript
import {
    add,
    capitalize,
    flatten
}
from "./index.js"; // or just "./utils"
```

## Named Re-export

```javascript
// Re-export specific names
export { add, subtract } from "./math.js";

// Re-export with rename
export { add as plus } from "./math.js";

// Re-export default as named
export { default as MathLib } from "./math.js";
```

## Benefits of Barrel Files

```
- Single import path instead of many
- Encapsulates internal module structure
- Cleaner imports in consumer code
- Easy to add/remove exports without changing consumers
```

## Caution: Circular Dependencies

```javascript
// a.js
export * from "./b.js";
export const A = 1;

// b.js
export * from "./a.js"; // Circular!
export const B = 2;
```

Some exports may be `undefined` in circular barrels.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is function directly exported? | Check if it's defined in the same file you're importing from. |
| Or re-exported? | Check if the import path is a barrel file (index.js) that re-exports from other files. |
| How to find the original definition of a re-exported function? | Follow the chain: import → barrel → source file. |
| What problems can barrel files cause? | Circular dependencies, slower module resolution, importing more than needed. |
## Next Steps

[Back to Chapter 5](05-import-aliases.md): 05 — Import Aliases
[Proceed to Chapter 7](07-module-scope.md): 07 — Module Scope to learn about 07 — module scope.
