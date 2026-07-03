# 04 — Default Exports

## One Primary Export

Each module can have **one** default export.

```javascript
export default function greet()
{
}
```

## Default Export Forms

```javascript
// Function declaration
export default function() {} // anonymous
export default function greet() {} // named internally

// Class
export default class {}

// Expression
export default 42;
export default { key: "value" };
export default [1, 2, 3];

// Variable (must be declared separately)
const name = "App";
export default name;
```

## Importing Default

```javascript
import greet
from "./greet.js";
```

Notice: no curly braces `{}`. The imported name can be anything:

```javascript
import hello from "./greet.js";
import myFunction from "./greet.js";
// Both import the same default export
```

## Named vs Default Import Syntax

```javascript
// Named: needs curly braces
import { add, subtract } from "./math.js";

// Default: no curly braces
import MathLib from "./math.js";

// Combined: default + named
import React, { useState, useEffect } from "react";
```

## When to Use Default vs Named

| Use Case | Recommended |
|----------|-------------|
| Single main export (class, component) | Default |
| Utility library with many functions | Named |
| Module that exports one thing | Default |
| Module that exports multiple things | Named |
| You want to enforce the import name | Named |
| You want the importer to choose the name | Default |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this default export? | Check for `export default` keyword. |
| Or named export? | Check for `export function`, `export const`, or `export {}`. |
| Can a module have only a default export? | Yes. |
| Can I mix default and named in one import? | Yes: `import def, { named } from "./module.js"`. |
| What is the difference in import syntax? | Default: `import x from "./m.js"`. Named: `import { x } from "./m.js"`. |
## Next Steps

[Back to Chapter 3](03-named-exports.md): 03 — Named Exports
[Proceed to Chapter 5](05-import-aliases.md): 05 — Import Aliases to learn about 05 — import aliases.
