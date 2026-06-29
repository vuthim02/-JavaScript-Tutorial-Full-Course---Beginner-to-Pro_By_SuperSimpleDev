# 16 — npm Scripts

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Shortcuts for Common Commands

```json
"scripts":
{
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint src/"
}
```

Run:

```bash
npm run dev
```

## Special Script Hooks

npm automatically runs these scripts at certain lifecycle events:

| Script Name | When It Runs |
|-------------|--------------|
| `preinstall` | Before `npm install` |
| `postinstall` | After `npm install` |
| `prepublishOnly` | Before `npm publish` |
| `prebuild` | Before `build` script |
| `postbuild` | After `build` script |

## Script Chaining

```json
{
    "scripts": {
        "clean": "rm -rf dist",
        "build": "npm run clean && vite build",
        "deploy": "npm run build && gh-pages -d dist"
    }
}
```

`&&` runs scripts sequentially. `&` runs in parallel.

## Passing Arguments

```bash
npm run test -- --coverage
# Passes --coverage to the test command
```

## Pre/Post Hooks

```json
{
    "scripts": {
        "prebuild": "npm run clean && npm run lint",
        "build": "vite build",
        "postbuild": "echo Build complete!"
    }
}
```

```bash
npm run build
# Runs: prebuild → build → postbuild
```

## npm run vs Direct Command

```bash
# Without npm run (requires global install or full path)
vite          # Error: command not found (unless installed globally)

# With npm run (uses local node_modules/.bin)
npm run dev   # Finds vite in node_modules/.bin/vite
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What scripts are available? | Check `"scripts"` in `package.json`. |
| How to run a script? | `npm run <script-name>`. |
| What does `npm start` do? | Runs the `"start"` script. `npm test` runs `"test"`. `npm run` is for custom scripts. |
| How are scripts resolved? | From `node_modules/.bin/`. npm adds this to PATH when running scripts. |
## Next Steps

[Back to Chapter 15](15-semver.md): 15 — Semantic Versioning
[Proceed to Chapter 17](17-npx.md): 17 — npx to learn about 17 — npx.
