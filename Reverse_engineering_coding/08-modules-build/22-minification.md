# 22 — Minification

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Code Compression

Transforms:

```javascript
function calculateTotal(price, tax) {
    return price + (price * tax);
}
```

Into:

```javascript
function a(b,c){return b+b*c}
```

## Minification Techniques

| Technique | Before | After |
|-----------|--------|-------|
| Whitespace removal | `function add(a, b) { return a + b; }` | `function add(a,b){return a+b}` |
| Variable renaming | `calculateTotal(price, tax)` | `a(b,c)` |
| Inlining | `const TWO = 2; return x * TWO;` | `return x * 2;` |
| Dead code removal | `if (false) { ... }` | (removed) |
| Boolean simplification | `if (true) { doStuff(); }` | `doStuff();` |
| String shortening | `errorMessage` (used once) | inlined |

## Minification Tools

| Tool | Language | Used By |
|------|----------|---------|
| Terser | JS | Webpack, Rollup (default) |
| esbuild | Go | Vite (dev), standalone |
| SWC | Rust | Next.js, Parcel |
| UglifyJS | JS | Older tools (deprecated) |

## Minification Stats

```
Original: 250 KB (readable, commented, full names)
Minified: 80 KB  (compressed)
Gzipped:  22 KB  (server compression)

Total reduction: ~91% from original
```

## Minification vs Compression (Gzip)

```
Minification: Code-level optimization (renames vars, removes whitespace)
Gzip: Network-level compression (same as zip files)

Both are used:
- Server sends .js.gz (gzip compressed)
- Browser decompresses to .js (minified)
- Browser parses .js (minified → executed)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the code minified? | Variable names are single letters, no whitespace, no comments. |
| Which minifier was used? | Check the bundle header comment (e.g., `/*! Terser */`). |
| Can I read minified code? | Use "Pretty print" in DevTools ({} button) or source maps. |
| How much space was saved? | Compare original file size vs minified size vs gzipped size. |
## Next Steps

[Back to Chapter 21](21-source-maps.md): 21 — Source Maps
[Proceed to Chapter 23](23-code-splitting.md): 23 — Code Splitting to learn about 23 — code splitting.
