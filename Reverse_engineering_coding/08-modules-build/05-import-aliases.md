# 05 — Import Aliases

## Renaming on Import

```javascript
import {
    add as plus
}
from "./math.js";
```

Now:

```javascript
plus(2, 3) // 5
add(2, 3)  // ReferenceError: add is not defined
```

## Why Use Aliases

### 1. Name Conflicts

```javascript
import { format } from "./date-utils.js";
import { format } from "./string-utils.js"; // Error: duplicate

// Fix:
import { format as formatDate } from "./date-utils.js";
import { format as formatString } from "./string-utils.js";
```

### 2. Shortening Names

```javascript
import { createStore as create } from "./store.js";
```

### 3. Clarifying Context

```javascript
import { get as getUser } from "./services/user.js";
import { get as getPost } from "./services/post.js";
```

## Export Aliases (Rename on Export)

```javascript
function internalName() {}

export { internalName as publicName };
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why was an alias used? | Likely to avoid name conflicts or to provide clearer naming. |
| What is the original function name? | The name after `as` is the alias; the original is before `as`. |
| Can I alias a default export? | Yes: `import { default as myDefault } from "./module.js"`. |
## Next Steps

[Back to Chapter 4](04-default-exports.md): 04 — Default Exports
[Proceed to Chapter 6](06-barrel-files.md): 06 — Barrel Files (Export All) to learn about 06 — barrel files (export all).
