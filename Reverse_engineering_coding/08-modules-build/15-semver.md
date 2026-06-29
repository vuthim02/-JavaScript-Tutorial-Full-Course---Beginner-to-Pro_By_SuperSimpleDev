# 15 — Semantic Versioning

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Version Format

```
Major.Minor.Patch
```

Example: `2.5.1`

| Component | Meaning | Example |
|-----------|---------|---------|
| Major | Breaking changes | `2.5.1` → `3.0.0` (API changed) |
| Minor | New features (backward compatible) | `2.5.1` → `2.6.0` (new method added) |
| Patch | Bug fixes (backward compatible) | `2.5.1` → `2.5.2` (bug fix) |

## Breaking Changes (Major)

```
- Function removed
- Function signature changed
- Default behavior changed
- Class renamed
- Deprecated features removed
```

Example: React 17 → React 18 (new concurrent features, some breaking changes)

## New Features (Minor)

```
- New function added
- New option added
- New class added

Old code continues to work.
```

## Bug Fixes (Patch)

```
- Crash fixed
- Wrong output fixed
- Edge case handled

No new functionality.
No API changes.
```

## Version Symbols in package.json

### ^ (Caret)

```json
"vue": "^3.5.0"
```

Allows: `3.x.x` (not `4.x.x`). Keeps you on the latest minor/patch within the same major version.

### ~ (Tilde)

```json
"vue": "~3.5.0"
```

Allows: `3.5.x`. Only patch updates.

### Exact

```json
"vue": "3.5.0"
```

Only one specific version. No updates.

### * (Wildcard)

```json
"vue": "*"
```

Any version (not recommended – unpredictable).

### >=

```json
"vue": ">=3.0.0 <4.0.0"
```

Version range.

## Version Resolution Example

```json
// package.json
"lodash": "^4.17.20"

// Current installed: 4.17.20
// npm update → 4.17.21 (patch), 4.17.22...
// But NOT 4.18.0 (minor) or 5.0.0 (major)

// "lodash": "~4.17.20"
// npm update → 4.17.21, 4.17.22...
// But NOT 4.18.0
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can package automatically update? | Depends on the version range (`^`, `~`, exact). |
| Which versions are allowed? | Check the semver range in `package.json`. |
| What does `^2.0.0` mean? | Any version `>=2.0.0 <3.0.0`. |
| What does `~2.0.0` mean? | Any version `>=2.0.0 <2.1.0`. |
| What does `2.0.0` (no symbol) mean? | Only version 2.0.0 exactly. |
| What is the risk of `^`? | New minor versions may introduce unexpected changes. |
## Next Steps

[Back to Chapter 14](14-devdependencies.md): 14 — devDependencies
[Proceed to Chapter 16](16-npm-scripts.md): 16 — npm Scripts to learn about 16 — npm scripts.
