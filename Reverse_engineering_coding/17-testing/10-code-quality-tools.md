# Chapter 10 — Code Quality Tools

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## ESLint

Static analysis for finding and fixing problems:

```bash
npm install --save-dev eslint
npx eslint --init
```

```javascript
// eslint.config.js (flat config — ESLint 9+)
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "no-var": "error",
    },
  },
];
```

Running:

```bash
npx eslint src/
npx eslint src/ --fix
```

## Prettier

Opinionated code formatter:

```bash
npm install --save-dev prettier
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

Running:

```bash
npx prettier --write src/
npx prettier --check src/
```

## ESLint + Prettier Together

```bash
npm install --save-dev eslint-config-prettier
```

```javascript
// eslint.config.js
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier, // must be last — disables rules that conflict with Prettier
  {
    rules: {
      // your custom rules
    },
  },
];
```

## Husky

Git hooks made easy:

```bash
npm install --save-dev husky
npx husky init
```

```bash
# .husky/pre-commit
npx lint-staged
```

```bash
# .husky/pre-push
npm run test:ci
```

## lint-staged

Run linters only on staged files:

```bash
npm install --save-dev lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.jsx": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

Workflow:

```
Edit file → git add → git commit
                        ↓
                Husky triggers lint-staged
                        ↓
                ESLint + Prettier only on staged files
                        ↓
                If any fail → commit blocked
```

## Full Setup Script

```bash
npm install --save-dev eslint prettier eslint-config-prettier husky lint-staged
npx eslint --init
npx prettier --write src/
npx husky init
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the difference between ESLint and Prettier? | ESLint finds logical errors; Prettier formats code consistently |
| Why use lint-staged instead of running ESLint on everything? | Speed — only check changed files |
| What does `eslint-config-prettier` do? | Disables ESLint rules that conflict with Prettier |
| When does the pre-push hook run? | After `git push` is called, before the push completes |
## Next Steps

[Back to Chapter 9](09-tdd.md): Chapter 9 — Test-Driven Development (TDD)
[Proceed to Chapter 11](11-cicd-github-actions.md): Chapter 11 — CI/CD with GitHub Actions to learn about chapter 11 — ci/cd with github actions.
