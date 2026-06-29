# 10 — npm (Node Package Manager)

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


The default package manager for Node.js. Downloads and manages dependencies.

## Commands

Initialize a project:

```bash
npm init
```

(Prompts for name, version, etc.)

```bash
npm init -y
```

(Accepts all defaults, creates package.json immediately.)

## Install a Package

```bash
npm install lodash
```

This:
1. Downloads lodash and its dependencies
2. Places them in `node_modules/`
3. Adds `lodash` to `dependencies` in `package.json`
4. Updates `package-lock.json`

## Install Variations

```bash
npm install axios              # Production dependency
npm install -D jest            # devDependency (development only)
npm install -g nodemon         # Global install (system-wide)
npm install --save-exact vue   # Exact version (no ^ or ~)
```

## What npm Creates

```
node_modules/
   │
   ├── lodash/
   ├── axios/
   ├── ... (all transitive dependencies)

package-lock.json (exact version tree)
package.json (updated with new dependencies)
```

## npm ci (Clean Install)

```bash
npm ci
```

- Installs exact versions from `package-lock.json`
- Deletes `node_modules` first
- Fails if `package-lock.json` is out of sync with `package.json`
- Faster than `npm install` in CI environments

## npm Audit

```bash
npm audit
```

Scans dependencies for known vulnerabilities.

```bash
npm audit fix
```

Attempts to fix vulnerabilities by updating packages.

## npm outdated

```bash
npm outdated
```

Shows which packages have newer versions available.

```
Package  Current  Wanted  Latest  Location
lodash    4.17.20 4.17.21 4.17.21  my-app
react     17.0.0  17.0.2  18.2.0   my-app
```

## Other Useful Commands

```bash
# List installed packages (depth 0 = direct deps only)
npm ls --depth=0

# View package info (without installing)
npm view lodash
npm view lodash version
npm view lodash dependencies

# Update packages within version range
npm update

# Check for outdated packages
npm outdated

# Uninstall a package
npm uninstall lodash
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which package was installed? | Check `dependencies` or `devDependencies` in package.json. |
| Where is package stored? | `node_modules/<package-name>/` |
| What version was installed? | Check `package-lock.json` or `node_modules/<package>/package.json`. |
| Is the package global or local? | Global: `/usr/local/lib/node_modules/`. Local: `./node_modules/`. |
| How to check if `postinstall` scripts ran? | Check the package's docs. Some packages run build steps on install. |
## Next Steps

[Back to Chapter 9](09-package-json.md): 09 — package.json
[Proceed to Chapter 11](11-node-modules.md): 11 — node_modules to learn about 11 — node_modules.
