# Version Numbers — Every Pattern in npm

---

## 1. SemVer Foundation

Every version is: **`MAJOR.MINOR.PATCH`**

```
express: 4.21.0
          │  │  │
          │  │  └── PATCH = bug fixes (backward compatible)
          │  └───── MINOR = new features (backward compatible)
          └──────── MAJOR = breaking changes (not backward compatible)
```

**When to increment:**

| Release type | MAJOR | MINOR | PATCH | Example change |
|-------------|-------|-------|-------|----------------|
| Breaking change | +1 | 0 | 0 | Renamed a function, changed API response format |
| New feature (safe) | 0 | +1 | 0 | Added a new method, new option parameter |
| Bug fix | 0 | 0 | +1 | Fixed crash when input is null |

**Special versions:**
- `1.0.0` — first stable release
- `0.x.x` — pre-release / initial development (anything can break)
- `1.0.0-beta.1`, `1.0.0-alpha.1` — prerelease tags

---

## 2. The Version Patterns (Complete Reference)

### 2.1 Exact Version

```json
"express": "4.21.0"
```

Only `4.21.0` exactly. No updates ever.

**When to use:** Critical dependencies where any change could break production. Rare.

---

### 2.2 Caret `^` — Default Pattern

npm automatically adds `^` when you `npm install <package>`.

```json
"express": "^4.21.0"
```

**Means:** Leftmost non-zero digit is locked. Everything to its right can update.

| Written version | Locks | Allows | Example matches |
|----------------|-------|--------|-----------------|
| `^4.21.0` | Major (4) | Minors + Patches | `4.21.0`, `4.22.0`, `4.99.99` |
| `^0.4.21` | Minor (0.4) | Patches only | `0.4.21`, `0.4.22`, `0.4.99` |
| `^0.0.5` | Patch (0.0.5) | Nothing | `0.0.5` only |

**Why `^0.4.21` doesn't allow `0.5.0`:** The leading zero means the "major" is actually the second number (`0.4.x` → `0.4` is the breaking line).

**When to use:** Default for all packages. Get bug fixes + features automatically, never breaking changes.

---

### 2.3 Tilde `~` — Patch-Only Updates

```json
"express": "~4.21.0"
```

**Means:** Only patch updates. Last non-zero digit can move.

| Written version | Locks | Allows | Example matches |
|----------------|-------|--------|-----------------|
| `~4.21.0` | Major + Minor | Patches only | `4.21.0`, `4.21.1`, `4.21.99` |
| `~4.21` | Major + Minor | Patches only | Same as `~4.21.0` |
| `~4` | Major | Minors + Patches | Same as `^4.0.0` |

**When to use:** You want only the safest possible updates (bug fixes only, no new features that might introduce subtle issues).

---

### 2.4 Star `*` — Any Version

```json
"express": "*"
```

Any version ever published. Could be `4.21.0` today, `5.0.0` (breaking!) tomorrow.

**When to use:** Never in production. Only for quick prototyping or documentation examples. Update to a real range immediately.

---

### 2.5 Comparison Operators

```json
"express": ">=4.21.0"
```

Full list:

| Operator | Means | Example | Allows |
|----------|-------|---------|--------|
| `>=` | Greater than or equal | `>=4.21.0` | `4.21.0`, `5.0.0`, any higher |
| `<=` | Less than or equal | `<=4.21.0` | `4.0.0` through `4.21.0` |
| `>` | Greater than | `>4.21.0` | `4.21.1`, `5.0.0` |
| `<` | Less than | `<5.0.0` | Everything below `5.0.0` |
| `=` | Equal (same as no prefix) | `=4.21.0` | Only `4.21.0` |

---

### 2.6 Ranges

Combine operators with spaces (AND):

```json
"express": ">=4.20.0 <5.0.0"
```

Allows: `4.20.0` through `4.99.99`. Stops at `5.0.0`.

---

### 2.7 OR `||`

```json
"express": "4.x || 5.x"
```

Allows any `4.x.x` or any `5.x.x`.

---

### 2.8 X-Ranges (`x`, `X`, `*`)

The `x` matches any value in that position:

| Pattern | Meaning | Same as |
|---------|---------|---------|
| `4.x` | Any 4.x.x | `^4.0.0` |
| `4.21.x` | Any 4.21.x | `~4.21.0` |
| `x` | Any version | `*` |

---

### 2.9 Tags (dist-tags)

```json
"express": "latest"
"my-pkg": "beta"
"my-pkg": "next"
```

Not versions — labels set by the package publisher.

| Tag | Meaning |
|-----|---------|
| `latest` | Current stable release (default) |
| `beta` | Upcoming version, might be unstable |
| `next` | Prerelease, often the next major version candidate |
| `canary` | Bleeding edge / daily build |

`npm install express` === `npm install express@latest`

---

### 2.10 Git URLs

Install directly from a Git repository:

```json
"my-pkg": "git+https://github.com/user/repo.git"
"my-pkg": "git+https://github.com/user/repo.git#v1.2.3"
"my-pkg": "github:user/repo"
"my-pkg": "user/repo"  (shorthand)
```

Append `#branch`, `#tag`, or `#commit` to pin a specific version.

---

### 2.11 Local Paths

```json
"my-pkg": "file:./packages/my-pkg"
"my-pkg": "file:../shared-lib"
```

Points to a directory on your local machine. The directory must have its own `package.json`.

**When to use:** Monorepos, developing multiple packages together before publishing.

---

### 2.12 Workspace Protocol

```json
// package.json at root of monorepo
"my-pkg": "workspace:*"
```

Used with npm/yarn/pnpm workspaces. `workspace:*` means "use the sibling package at whatever version it has locally."

---

## 3. Full Comparison Table

| Pattern | Example | Use Case | Risk Level |
|---------|---------|----------|------------|
| Exact | `4.21.0` | Lock everything, never change | Low (but stale) |
| `^` | `^4.21.0` | Default — get features + fixes safely | Low |
| `~` | `~4.21.0` | Only bug fixes, no new features | Very low |
| `*` | `*` | Prototyping only | Extreme |
| `>=` | `>=4.21.0` | Minimum floor, take anything above | High |
| Range | `>=4.20 <5` | Safe zone | Low |
| Tag | `latest` | Always latest stable | Medium |
| Git | `#v1.2.3` | Unpublished or private repo | Depends on commit |
| File | `file:./pkg` | Local development | None |

---

## 4. How npm Resolves Versions

When you run `npm install`:

```
1. Read package.json → "^4.21.0"

2. Query npm registry for all versions of express:
   4.21.0, 4.21.1, 4.21.2, 4.22.0, 5.0.0

3. Apply range "^4.21.0":
   ✅ 4.21.0  (exact)
   ✅ 4.21.1  (patch)
   ✅ 4.21.2  (patch)
   ✅ 4.22.0  (minor)
   ❌ 5.0.0   (major — excluded)

4. Pick the highest matching → 4.22.0

5. Save exact version in package-lock.json → "4.22.0"
```

**package-lock.json** pins the exact resolved version so everyone gets the same tree:

```json
// package.json
"express": "^4.21.0"

// package-lock.json
"express": {
  "version": "4.22.0",
  "resolved": "https://registry.npmjs.org/express/-/express-4.22.0.tgz"
}
```

---

## 5. How npm install Reads Each File

```
npm install
   │
   ├── package-lock.json exists?
   │   ├── YES → install EXACT versions from lock (respects ranges from package.json)
   │   └── NO  → resolve ranges from package.json → create package-lock.json

npm ci
   │
   └── install EXACTLY what's in package-lock.json (fails if mismatch)
```

**`npm ci`** (clean install):
- Deletes `node_modules` first
- Installs exactly from `package-lock.json`
- Fails if `package.json` and `package-lock.json` are out of sync
- Much faster than `npm install`
- Used in CI/CD (GitHub Actions, Render, Railway)

---

## 6. Common Scenarios

### You want the latest patch of 4.21.x

```json
"express": "~4.21.0"
```
npm will install `4.21.9` (if published). Never `4.22.0`.

### You want everything in 4.x but no 5.x

```json
"express": "^4.21.0"
```
or equivalently:
```json
"express": "4.x"
```

### You want exactly one specific version forever

```json
"express": "4.21.0"
```
No `^` or `~`. Locked. Never updates.

### You want to allow 5.x but not 6.x

```json
"express": ">=5.0.0 <6.0.0"
```
or:
```json
"express": "5.x"
```

### Working with packages below 1.0.0

```json
// Package is at 0.8.5
"^0.8.5"  → allows 0.8.6, 0.8.99  (NOT 0.9.0)
"~0.8.5"  → allows 0.8.6, 0.8.99  (same, because last non-zero is patch)
"0.8.x"   → same as ~0.8.5
```

**Rule for 0.x:** `^` treats the second number as if it were the major.

---

## 7. Quick Reference

### The 3 You Need Daily

| Symbol | Name | Means | Example | Allows |
|--------|------|-------|---------|--------|
| (none) | Exact | Only this version | `4.21.0` | `4.21.0` |
| `^` | Caret | Locks major | `^4.21.0` | `4.21.0` → `4.99.99` |
| `~` | Tilde | Locks minor | `~4.21.0` | `4.21.0` → `4.21.99` |

### Commands

```bash
npm install express           # ^4.21.0  (caret, default)
npm install express@~4.21.0  # ~4.21.0  (tilde)
npm install express@4.21.0   # 4.21.0   (exact)
npm install express@next     # latest next tag
npm list express              # Show installed version
npm outdated                  # Show available updates
npm update                    # Update within ranges
```

---

*Last updated: June 2026*
