# 13 — Dependencies

## Production Packages

```bash
npm install axios
```

Inside `package.json`:

```json
"dependencies": {
    "axios": "^1.6.0"
}
```

## What Goes in dependencies

```
Runtime libraries:
  - React, Vue, Angular (frameworks)
  - Express (server framework)
  - Axios (HTTP client)
  - Lodash (utilities)
  - Moment/date-fns (date handling)
```

These packages are needed for the application to run in production.

## Transitive Dependencies

```
Your app
  └── axios
       ├── follow-redirects
       └── form-data
            └── asynckit
```

You install `axios` → npm also installs `follow-redirects`, `form-data`, and `asynckit`.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does the application need this package in production? | If it's used in runtime code (not build/test), yes. |
| Is this a transitive dependency? | Check if you directly installed it or if it's a dependency of another package. |
| How to remove a dependency? | `npm uninstall <package>`. |
## Next Steps

[Back to Chapter 12](12-package-lock-json.md): 12 — package-lock.json
[Proceed to Chapter 14](14-devdependencies.md): 14 — devDependencies to learn about 14 — devdependencies.
