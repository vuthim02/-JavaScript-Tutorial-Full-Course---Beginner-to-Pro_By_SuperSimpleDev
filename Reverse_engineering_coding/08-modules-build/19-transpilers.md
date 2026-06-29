# 19 — Transpilers

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Convert Modern Code to Older JavaScript

Modern:

```javascript
const add = (a, b) => a + b;
```

Transpiled (older):

```javascript
var add = function(a, b) {
    return a + b;
};
```

## Why Transpile?

```
Browser compatibility:
- You write modern JS (ES2024)
- Transpiler outputs ES2015 (widely supported)
- Old browsers (IE11, older Chrome/Firefox) can run it

New features become available immediately:
- Optional chaining ?.
- Nullish coalescing ??
- Private class fields #
- async/await
```

## Babel

The most popular JavaScript transpiler.

```bash
npm install -D @babel/core @babel/preset-env
```

Configuration:

```json
// babel.config.json
{
    "presets": [
        ["@babel/preset-env", {
            "targets": "> 0.25%, not dead"
        }]
    ]
}
```

## Babel Presets

| Preset | Converts |
|--------|----------|
| `@babel/preset-env` | Modern JS → older JS (targets based) |
| `@babel/preset-react` | JSX → `React.createElement()` |
| `@babel/preset-typescript` | TypeScript → JS |
| `@babel/preset-flow` | Flow types → JS |

## Babel Plugins (Individual Transformations)

```json
{
    "plugins": [
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-optional-chaining"
    ]
}
```

## SWC and esbuild (Faster Alternatives)

```
Babel:  written in JavaScript (slower but extensible)
SWC:    written in Rust (10-20x faster than Babel)
esbuild: written in Go (10-100x faster than Babel)

Many modern tools:
  - Vite uses esbuild for transforms
  - Next.js uses SWC
  - Parcel uses SWC
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this project using a transpiler? | Check for `babel.config.*`, `.babelrc`, or transpiler in bundler config. |
| What is being transpiled? | JSX, TypeScript, modern JS features. |
| What target browsers? | Check `browserslist` in `package.json` or `@babel/preset-env` targets. |
| Can I see the original source? | With source maps enabled, DevTools shows original code. |
## Next Steps

[Back to Chapter 18](18-bundlers.md): 18 — Bundlers
[Proceed to Chapter 20](20-tree-shaking.md): 20 — Tree Shaking to learn about 20 — tree shaking.
