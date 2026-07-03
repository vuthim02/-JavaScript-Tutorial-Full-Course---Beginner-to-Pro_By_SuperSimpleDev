# 12 — package-lock.json

## Stores Exact Versions

Ensures same dependencies across machines.

Developer A (Windows) and Developer B (Linux) both install identical versions.

## Why It's Needed

```json
// package.json
{
    "dependencies": {
        "lodash": "^4.17.20"
    }
}
```

The `^` means "any 4.x.x version". Without lock:

```
Developer A installs: lodash@4.17.20
Developer B installs (next week): lodash@4.17.25 (new release)
```

Different versions → different behavior.

## Lock File Contents

```json
{
    "name": "my-app",
    "lockfileVersion": 3,
    "packages": {
        "node_modules/lodash": {
            "version": "4.17.21",
            "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
            "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z...",
            "engines": {
                "node": ">=4"
            }
        }
    }
}
```

The `integrity` hash verifies the package hasn't been tampered with.

## Lock File Versions

| Version | npm Version | Notes |
|---------|-------------|-------|
| 1 | npm 5-6 | Original format |
| 2 | npm 7-8 | Improved metadata |
| 3 | npm 9+ | Most efficient (current) |

## Should You Commit package-lock.json?

**Yes** for application projects (apps).
**No** for library projects (if you want consumers to get the latest compatible versions).

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What exact version is pinned? | Check `package-lock.json` → `packages` → specific version. |
| Is the lock file up to date? | Run `npm install`. If it changes, it was outdated. |
| What happens if you delete the lock file? | A new one is generated with the latest compatible versions. |
| Should you commit the lock file? | Yes for apps (reproducible builds). Optional for libraries. |
## Next Steps

[Back to Chapter 11](11-node-modules.md): 11 — node_modules
[Proceed to Chapter 13](13-dependencies.md): 13 — Dependencies to learn about 13 — dependencies.
