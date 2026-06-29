# 17 — npx

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Temporary Execution

Runs a package without permanently installing it.

```bash
npx create-vite my-app
```

## How npx Works

```
1. Check if package is installed locally (node_modules)
2. If not, check if installed globally
3. If not, download from npm registry
4. Execute the command
5. (Optional: cache for future use)

All without adding to dependencies
```

## When to Use npx

```bash
# Scaffold a new project
npx create-react-app my-app
npx create-vite my-app
npx create-next-app my-app

# Run a one-time tool
npx eslint src/
npx prettier --check src/
npx http-server

# Run a specific version
npx cowsay@1.0.0 "Hello"
```

## npx vs npm -g

```bash
# Global install (stays forever)
npm install -g create-react-app
create-react-app my-app

# npx (runs once, no global pollution)
npx create-react-app my-app
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this package installed permanently? | If using `npx`, no. If using `npm install -g`, yes. |
| Where does npx cache packages? | `~/.npm/_npx/` (home directory cache). |
| Can npx run local scripts? | Yes. `npx jest` runs `node_modules/.bin/jest`. |
## Next Steps

[Back to Chapter 16](16-npm-scripts.md): 16 — npm Scripts
[Proceed to Chapter 18](18-bundlers.md): 18 — Bundlers to learn about 18 — bundlers.
