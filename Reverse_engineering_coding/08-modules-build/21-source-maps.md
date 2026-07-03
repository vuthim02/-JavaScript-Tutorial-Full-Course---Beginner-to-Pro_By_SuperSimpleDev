# 21 — Source Maps

## Debugging the Original Code

Generated during build.

Without source maps:

```
minified.js
function a(b,c){return b+c}
```

Hard to understand. Error points to line 1 regardless of original location.

With source maps, the developer sees original source in DevTools:

```
DevTools:
  src/
    main.js    ← Original source shown
    utils.js   ← Even though bundled
```

## How Source Maps Work

```
Bundle + Source Map:
  dist/bundle.js              ← minified code
  dist/bundle.js.map           ← mapping file

The .map file contains:
  - Original file names
  - Original line numbers
  - Original column numbers
  - Mappings: "minified position → original position"

Chrome/Firefox DevTools reads the .map file automatically
when they detect the comment at the end of the bundle:
//# sourceMappingURL=bundle.js.map
```

## Source Map Types

| Type | Quality | Build Speed | Size |
|------|---------|-------------|------|
| `source-map` | Original source | Slow | Large |
| `eval` | Transformed only | Fast | None (inline) |
| `inline-source-map` | Original source | Moderate | Large (inline) |
| `hidden-source-map` | Original source | Moderate | Separate (no comment) |
| `nosources-source-map` | Stack traces only | Moderate | Small (no source content) |

## Source Maps in Production

```javascript
// vite.config.js
export default {
    build: {
        sourcemap: true, // Generate source maps
    },
};
```

**Security note:** Source maps expose your original source code. In production, consider:
- Not shipping source maps
- Using `hidden-source-map` (for internal debugging)
- Restricting access to `.map` files

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does this bundle have source maps? | Check for `.map` files in `dist/` or `//# sourceMappingURL=` comment. |
| How to enable source maps? | In bundler config, set `sourcemap: true` or equivalent. |
| Are source maps safe in production? | They expose original source. Restrict access or use `hidden-source-map`. |
| How to debug without source maps? | Deobfuscate variable names manually, use `console.log` with original source. |
## Next Steps

[Back to Chapter 20](20-tree-shaking.md): 20 — Tree Shaking
[Proceed to Chapter 22](22-minification.md): 22 — Minification to learn about 22 — minification.
