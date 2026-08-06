# Code Quality, Git, and Developer Workflow - Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

---

## PART 1 - Git

### 1. Git Basics: init, add, commit, status, log, diff

#### Getting Started

```bash
# Configure identity (required before first commit)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global pull.rebase true

# Initialize a new repository
git init
git init --initial-branch=main

# Clone an existing repository
git clone https://github.com/user/repo.git
git clone --depth 1 https://github.com/user/repo.git    # shallow clone (faster)
git clone --branch feature-x https://github.com/user/repo.git
```

#### The Three Areas of Git

```
Working Directory  --(git add)-->  Staging Area  --(git commit)-->  Repository
```

- **Working Directory**: Your actual files on disk
- **Staging Area (Index)**: A buffer where you prepare changes for the next commit
- **Repository (.git)**: The committed history of your project

#### Staging and Committing

```bash
# Check status
git status
git status -s                    # short format

# Stage files
git add file.js                  # stage specific file
git add src/                     # stage entire directory
git add .                        # stage all changes in current directory
git add -A                       # stage all changes across entire repo
git add -p                       # interactive: stage hunks selectively

# Commit
git commit -m "Add user login validation"
git commit -am "Fix null pointer"    # stage all tracked + commit
git commit --amend                   # modify last commit
git commit --amend --no-edit         # add staged changes to last commit silently
```

#### Viewing History and Diffs

```bash
# Log
git log                          # full log
git log --oneline                # compact one-line
git log --oneline --graph --all  # visual graph of all branches
git log -n 5                     # last 5 commits
git log --author="name"          # filter by author
git log --grep="keyword"         # search commit messages
git log -- src/file.js           # history of specific file
git log --follow -- src/file.js  # track across renames
git log -S "string"              # pickaxe: find commits that added/removed string

# Diff
git diff                         # unstaged changes
git diff --staged                # staged changes
git diff HEAD                    # all changes (staged + unstaged)
git diff main..feature           # between two branches
git diff abc123..def456          # between two commits
git diff --stat                  # summary of changes
git show abc123                  # show specific commit details
```

### 2. Branching: branch, checkout, switch, merge, rebase

#### Branch Management

```bash
# Create and switch
git branch feature/auth          # create branch
git checkout -b feature/auth     # create + switch (classic)
git switch -c feature/auth       # create + switch (modern, Git 2.23+)

# List branches
git branch                       # local branches
git branch -a                    # local + remote
git branch -r                    # remote only
git branch --merged              # branches merged into current
git branch -vv                   # branches with tracking info

# Delete branches
git branch -d feature/old        # safe delete (only if merged)
git branch -D feature/old        # force delete
git branch -m new-name           # rename current branch
```

#### Merge

```bash
git checkout main
git merge feature/login              # merge into current branch
git merge --no-ff feature/login      # always create merge commit
git merge --squash feature/login     # squash all commits into one staged change
git merge --abort                    # abort merge in progress
```

**Merge types:**
- **Fast-forward**: When main hasn't changed since the branch was created. Just moves the pointer.
- **3-way merge**: Creates a merge commit combining both histories.
- **Squash merge**: Combines all branch commits into one, then commits on top of main.

#### Rebase

```bash
# Rebase current branch onto another
git checkout feature/auth
git rebase main

# What rebase does:
# Before:  main ---A---B---C
#                     \
#              feature ---D---E
# After:   main ---A---B---C
#                             \---D'---E'  (new commit hashes)
```

**Merge vs Rebase comparison:**

| Aspect | Merge | Rebase |
|--------|-------|--------|
| History | Preserves complete branching history | Creates linear history |
| Safety | Non-destructive | Rewrites commit hashes |
| Use case | Integrating completed features | Updating local feature branch |
| Shared branches | Safe for shared branches | Never rebase shared branches |

**The Golden Rule of Rebasing:** Never rebase commits that have been pushed to a shared branch that others are working on.

### 3. Remote Operations: push, pull, fetch, clone

```bash
# Add remote
git remote add origin https://github.com/user/repo.git
git remote -v                    # list remotes

# Push
git push origin feature/login
git push -u origin feature/login # set upstream tracking
git push origin --delete branch  # delete remote branch

# Fetch (safe: downloads but doesn't integrate)
git fetch origin
git fetch --all

# Pull (fetch + merge or rebase)
git pull                         # fetch + merge
git pull --rebase                # fetch + rebase (cleaner history)

# Fetch vs Pull
# fetch = download changes, inspect before integrating
# pull = fetch + merge/rebase in one step
# Many experienced devs prefer: fetch -> inspect -> merge/rebase
```

### 4. Conflict Resolution

When Git cannot automatically merge changes, it marks conflicts:

```
<<<<<<< HEAD
current branch's version
=======
incoming branch's version
>>>>>>> feature/branch
```

**Resolution steps:**
1. Open conflicted files
2. Decide which version to keep (or write a combination)
3. Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Stage resolved files: `git add <file>`
5. Complete the merge: `git commit`

```bash
git merge --abort                # abort entire merge
git diff --name-only --diff-filter=U  # list conflicted files
```

**VS Code** and other editors provide visual merge conflict resolution tools with "Accept Current", "Accept Incoming", and "Accept Both" options.

**Tips to reduce conflicts:**
- Keep branches short-lived
- Merge main into feature branches regularly
- Communicate with team about which files are being modified

### 5. Git Stash

Stash saves uncommitted changes temporarily without committing:

```bash
# Save work-in-progress
git stash                              # stash tracked changes
git stash push -m "WIP: auth work"    # stash with descriptive message
git stash push -u -m "WIP: new files" # include untracked files (-u)
git stash push -a -m "WIP: everything" # include .gitignored files too

# List stashes
git stash list
# stash@{0}: WIP on feature/auth: abc1234 Add login form
# stash@{1}: WIP on main: def5678 Update README

# Restore
git stash pop                          # apply most recent stash + remove it
git stash apply stash@{2}             # apply specific stash without removing
git stash show -p stash@{0}           # preview stash contents

# Branch from stash (recommended workflow)
git stash branch feature/auth stash@{0}  # create branch from stash

# Cleanup
git stash drop stash@{2}              # delete specific stash
git stash clear                        # drop all stashes
```

### 6. Git Tags and Releases

```bash
# Lightweight tags (just a pointer)
git tag v1.0.0

# Annotated tags (recommended - includes metadata)
git tag -a v1.0.0 -m "Version 1.0.0 release"
git tag -a v1.0.0 abc1234          # tag a specific commit

# List tags
git tag
git tag -n                          # show tag messages

# Push tags (tags are NOT pushed by default)
git push origin v1.0.0
git push origin --tags              # push all tags

# Delete tag
git tag -d v1.0.0                   # delete locally
git push origin --delete v1.0.0     # delete remotely

# Checkout a tag
git checkout v1.0.0

# Verify tags (check GPG signatures)
git tag -v v1.0.0
```

### 7. Git Hooks: pre-commit, pre-push, commit-msg

Git hooks are scripts that run automatically at specific Git events.

**Common hooks:**
- **pre-commit**: Runs before commit is created (linting, formatting, tests)
- **commit-msg**: Validates commit message format (conventional commits)
- **pre-push**: Runs before push (tests, type checking)
- **post-merge**: Runs after merge (auto-install dependencies)

```bash
# Hooks live in .git/hooks/ by default
# Make them executable: chmod +x .git/hooks/pre-commit

# Example pre-commit hook
#!/bin/sh
npm run lint:staged
```

**Managed hook tools:**
- **Husky** (recommended): Stores hooks in `.husky/` directory, shared via version control
- **Git's core.hooksPath**: Alternative using `.githooks/` directory

```bash
# Husky setup
npm install --save-dev husky
npx husky init                     # creates .husky/ directory
echo "npx lint-staged" > .husky/pre-commit
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
echo "npm test" > .husky/pre-push
```

### 8. GitHub Flow vs Git Flow vs Trunk-Based Development

#### GitHub Flow (Simple, recommended for most teams)

```
main ----A-------B-------C---D---
          \         /       /
           feature 1       feature 2
```

1. Create a branch from `main`
2. Make changes and commit
3. Open a Pull Request
4. Code review and discussion
5. Merge into `main` (after approval + CI passes)
6. Deploy from `main`

**Best for:** Web apps, continuous deployment, small-to-medium teams.

#### Git Flow (Structured, for release-based projects)

```
main        ----v1.0--------v2.0--------
              \              \
develop       ----A----B----C----D----
                 \         /     \
feature-x         ---E-F-         feature-y
release/1.1              ---G-H-
hotfix/1.0.1                        ---I-
```

- **main**: Production-ready code
- **develop**: Integration branch for next release
- **feature/**: Feature branches from develop
- **release/**: Release preparation branches
- **hotfix/**: Emergency production fixes

**Best for:** Software with versioned releases, mobile apps, desktop apps.

#### Trunk-Based Development (Fastest, for mature CI/CD)

```
main (trunk) ---A---B---C---D---E---
                 \   /   \   /
                  short-lived feature flags
```

- Everyone commits to `main` (or very short-lived branches, < 1 day)
- Feature flags control unfinished features
- Requires strong CI/CD and test coverage

**Best for:** Mature teams with excellent test suites, continuous deployment.

### 9. Conventional Commits

A specification for commit messages that enables automated tooling.

**Format:**
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
| Type | Description | SemVer Impact |
|------|-------------|---------------|
| `feat` | New feature | MINOR |
| `fix` | Bug fix | PATCH |
| `docs` | Documentation only | None |
| `style` | Formatting, missing semicolons | None |
| `refactor` | Code change that neither fixes a bug nor adds a feature | None |
| `perf` | Performance improvement | PATCH |
| `test` | Adding or correcting tests | None |
| `build` | Build system or external dependencies | None |
| `ci` | CI configuration | None |
| `chore` | Other maintenance | None |
| `revert` | Reverts a previous commit | None |

**Examples:**
```bash
# Simple
git commit -m "feat: add user login validation"

# With scope
git commit -m "feat(auth): add OAuth2 Google login"

# With breaking change
git commit -m "feat!: change authentication API response format"

# With body and footer
git commit -m "fix(parser): handle empty array input

The parser previously threw an unhandled exception when
encountering empty arrays. This change adds proper handling
and returns an empty result set.

Closes #1234"
```

**Benefits:**
- Automatically generates CHANGELOGs
- Determines semantic version bumps
- Enables automated release pipelines
- Makes git history searchable and meaningful

### 10. Semantic Versioning (SemVer)

**Format:** `MAJOR.MINOR.PATCH` (e.g., `2.1.3`)

| Component | Increment When | Example |
|-----------|---------------|---------|
| **MAJOR** | Breaking API changes | `1.x.x` -> `2.0.0` |
| **MINOR** | New features (backward-compatible) | `1.1.x` -> `1.2.0` |
| **PATCH** | Bug fixes (backward-compatible) | `1.2.1` -> `1.2.2` |

**Rules:**
1. Version 1.0.0 marks your initial public API
2. Patch version X.Y.Z+1 for backwards-compatible bug fixes
3. Minor version X.Y+1.0 for new backward-compatible functionality
4. Major version X+1.0.0 for incompatible API changes
5. Pre-release: `1.0.0-alpha.1`, `1.0.0-beta.1`, `1.0.0-rc.1`
6. Build metadata: `1.0.0+build.2024.01.15`

**Version ranges in package.json:**
```json
{
  "dependencies": {
    "lodash": "^4.17.21",    // >=4.17.21 <5.0.0 (compatible with 4.x)
    "express": "~4.18.2",    // >=4.18.2 <4.19.0 (patch-level only)
    "react": "^18.2.0"       // >=18.2.0 <19.0.0
  }
}
```

- `^` (caret): Compatible with version (allows minor/patch updates)
- `~` (tilde): Approximately equivalent (allows patch updates only)

### 11. GitHub Features: PRs, Issues, Actions, Pages, Codespaces

#### Pull Requests (PRs)
- Code review before merging
- Required reviewers and approval counts
- Status checks (CI must pass)
- Branch protection rules
- Draft PRs for work-in-progress
- Auto-merge when checks pass

#### GitHub Actions (CI/CD)
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run lint
```

#### GitHub Pages
- Free static site hosting
- Deploy from any branch or GitHub Actions
- Custom domain support with SSL

#### GitHub Codespaces
- Cloud-hosted development environments
- Pre-configured dev containers
- VS Code integration (browser or desktop)
- Start coding in seconds with full environment

#### GitHub Issues & Projects
- Bug tracking and feature requests
- Labels, milestones, assignees
- GitHub Projects (Kanban boards)
- Issue templates for consistency

### 12. Git Aliases and Productivity Tips

```bash
# Useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.last "log -1 HEAD --stat"
git config --global alias.unstage "reset HEAD --"
git config --global alias.amend "commit --amend --no-edit"
git config --global alias.undo "reset HEAD~1 --mixed"
git config --global alias.cleanup "!git branch --merged | grep -v '\\*\\|main\\|develop' | xargs -n 1 git branch -d"

# Recommended .gitconfig settings
[core]
    editor = code --wait
    autocrlf = input

[pull]
    rebase = true

[push]
    default = current
    autoSetupRemote = true

[merge]
    conflictstyle = diff3

[rerere]
    enabled = true          # remember conflict resolutions
```

### 13. Interactive Rebase

Interactive rebase (`git rebase -i`) lets you rewrite commit history before sharing.

```bash
# Rebase the last 5 commits
git rebase -i HEAD~5

# Opens editor with:
# pick abc1234 Add user model
# pick def5678 Fix typo in user model
# pick ghi9012 Add auth middleware
# pick jkl3456 WIP: auth tests
# pick mno7890 Finish auth tests
```

**Available commands:**
| Command | Shortcut | Description |
|---------|----------|-------------|
| pick | p | Keep commit as-is |
| reword | r | Keep diff, edit commit message |
| edit | e | Pause at commit for amendment |
| squash | s | Merge into previous, combine messages |
| fixup | f | Merge into previous, discard message |
| drop | d | Delete the commit entirely |
| exec | x | Run shell command at this point |

**Common workflows:**

```bash
# Clean up messy commits before PR
pick abc1234 Add user model
fixup def5678 Fix typo in user model
pick ghi9012 Add auth middleware
squash jkl3456 WIP: auth tests
fixup mno7890 Finish auth tests
# Result: 2 clean commits instead of 5

# Reorder: just move lines up/down in the editor
# Split a commit:
# 1. Mark as 'edit'
# 2. git reset HEAD~1
# 3. git add -p (selectively stage)
# 4. git commit -m "Part 1"
# 5. git add -p && git commit -m "Part 2"
# 6. git rebase --continue
```

**Autosquash pattern:**
```bash
# Name commits with fixup! or squash! prefix
git commit --fixup=abc1234
git commit --squash=abc1234

# Rebase with autosquash
git rebase -i HEAD~5 --autosquash
# Automatically arranges fixup commits below their targets
```

### 14. Cherry-Pick

Cherry-pick copies a specific commit from one branch to another:

```bash
# Apply a single commit
git cherry-pick abc1234

# Apply multiple commits
git cherry-pick abc1234 def5678

# Apply range (exclusive..inclusive)
git cherry-pick abc1234..def5678

# Stage changes without committing
git cherry-pick --no-commit abc1234

# Add provenance note to message
git cherry-pick -x abc1234

# Cherry-pick a merge commit
git cherry-pick -m 1 abc1234    # -m 1: use first parent as mainline

# Abort in-progress cherry-pick
git cherry-pick --abort
```

**Common use case - Hotfix backporting:**
```bash
# Fix merged to main, need to backport to release branch
git checkout main
git cherry-pick hotfix-commit-sha
git checkout release/1.2
git cherry-pick hotfix-commit-sha
```

### 15. Bisect for Debugging

Bisect uses binary search to find the commit that introduced a bug:

```bash
# Manual bisect
git bisect start
git bisect bad                    # current commit is broken
git bisect good v1.2.0            # this tag was working
# Git checks out midpoint. Test it, then:
git bisect good    # or
git bisect bad
# Repeat until Git finds the culprit
git bisect reset                   # return to original HEAD

# Automated bisect (most powerful)
git bisect start HEAD v1.2.0
git bisect run npm test

# Custom test script
git bisect start HEAD v1.2.0
git bisect run bash -c "npm test -- --grep 'auth test'"

# Exit code meanings:
# 0 = good commit
# 1-124, 126-127 = bad commit
# 125 = skip (untestable commit)
```

For 1000 commits, bisect finds the bad commit in at most 10 steps.

---

## PART 2 - Code Quality

### 16. ESLint: Flat Config, Rules, Plugins, TypeScript

#### Flat Config (ESLint 9+, the modern way)

ESLint's flat config replaces `.eslintrc.*` files with `eslint.config.js`:

```js
// eslint.config.js
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'eqeqeq': 'error',
    },
  },
  {
    ignores: ['dist/', 'build/', 'node_modules/', 'coverage/'],
  },
]);
```

#### TypeScript Integration (typescript-eslint)

```js
// eslint.config.js
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,            // basic TypeScript rules
      tseslint.configs.stylistic,              // code style rules
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,                  // type-aware linting
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
```

**typescript-eslint configuration hierarchy:**
- `recommended` - Code correctness rules
- `recommended-type-checked` - Recommended + type-aware rules
- `strict` - More opinionated rules
- `strict-type-checked` - Strict + type-aware rules
- `stylistic` - Code style consistency
- `stylistic-type-checked` - Stylistic + type-aware rules

#### React Plugin

```js
// eslint.config.js
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default defineConfig(
  // ... other configs
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react/prop-types': 'error',
      'react/jsx-uses-react': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  }
);
```

### 17. Prettier: Configuration, ESLint Integration

#### Configuration

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

```bash
# Format files
npx prettier --write "src/**/*.{js,ts,tsx,json,css,md}"
npx prettier --check "src/**/*.{js,ts,tsx}"   # check without modifying
```

#### ESLint + Prettier Integration

Use `eslint-config-prettier` to disable ESLint rules that conflict with Prettier:

```bash
npm install --save-dev eslint-config-prettier
```

```js
// eslint.config.js
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // ... other configs
  prettierConfig,   // MUST be last to override conflicting rules
]);
```

**Best practice:** Let ESLint handle code quality (errors, best practices) and Prettier handle formatting. Don't use ESLint for formatting rules when Prettier is configured.

### 18. Stylelint for CSS

```bash
npm install --save-dev stylelint stylelint-config-standard
```

```json
// .stylelintrc.json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-hex-length": "long",
    "selector-class-pattern": null,
    "no-descending-specificity": null
  }
}
```

```bash
npx stylelint "**/*.css"
npx stylelint "**/*.css" --fix
```

### 19. Husky: Git Hooks Setup

```bash
# Install and initialize
npm install --save-dev husky
npx husky init

# This creates:
# .husky/ directory
# "prepare": "husky" script in package.json
# core.hooksPath set to .husky/
```

#### Creating hooks

```bash
# .husky/pre-commit
npx lint-staged

# .husky/commit-msg
npx --no -- commitlint --edit $1

# .husky/pre-push
npm test

# .husky/post-merge
npm install
```

**Key points:**
- Hooks run automatically after `npm install` (via the `prepare` script)
- All team members get hooks on clone + install
- No manual setup required
- Skip hooks when needed: `git commit --no-verify` or `HUSKY=0 git commit`

### 20. lint-staged: Pre-Commit Linting

lint-staged runs linters only on staged files, making pre-commit hooks fast:

```json
// package.json
{
  "lint-staged": {
    "*.js": [
      "eslint --fix --cache",
      "prettier --write"
    ],
    "*.{ts,tsx}": [
      "eslint --fix --cache",
      "prettier --write"
    ],
    "*.{json,md,yml}": [
      "prettier --write"
    ],
    "*.css": [
      "prettier --write",
      "stylelint --fix"
    ]
  }
}
```

**How it works:**
1. When you commit, lint-staged identifies staged files
2. Matches them against glob patterns in config
3. Runs specified commands on matching files
4. Re-stages files modified by auto-fixers
5. If any command exits non-zero, the commit is aborted

**Performance:** Runs only on changed files, not the entire codebase. Even with hundreds of files, the pre-commit hook stays under 10 seconds.

### 21. commitlint: Commit Message Validation

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ]],
    'subject-max-length': [2, 'always', 100],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'scope-enum': [2, 'always', [
      'api', 'auth', 'db', 'web', 'config', 'ci', 'deps', 'docs'
    ]],
    'header-max-length': [2, 'always', 100],
  },
};
```

**Enforced commit format:**
```
feat(auth): add OAuth2 login
^    ^    ^
|    |    +-- subject: imperative mood, lowercase, no period
|    +-- scope: optional, lowercase
+-- type: feat, fix, docs, etc.
```

### 22. EditorConfig

Ensures consistent coding styles across different editors and IDEs:

```ini
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

[*.{yml,yaml}]
indent_size = 2

[*.java]
indent_size = 4

[*.py]
indent_size = 4
```

**Supported by:** VS Code (built-in), JetBrains, Neovim, and most editors via plugins. Works with ESLint and Prettier to enforce consistency at both the editor and tooling levels.

### 23. Code Review Best Practices

**As a reviewer:**
- Review for correctness, readability, and maintainability
- Check for edge cases and error handling
- Verify tests cover the new logic
- Look for security vulnerabilities
- Keep feedback constructive and specific
- Suggest alternatives, don't just point out problems
- Approve when good enough (don't require perfection)

**As an author:**
- Keep PRs small (< 400 lines ideally)
- Write descriptive PR descriptions
- Self-review before requesting review
- Respond to all comments
- Don't take feedback personally
- Add tests for new functionality
- Keep PR focused on a single concern

**Review checklist:**
- [ ] Code works correctly
- [ ] Tests are present and pass
- [ ] Code is readable and well-named
- [ ] No security issues (no secrets, no injection risks)
- [ ] Error handling is appropriate
- [ ] Performance is acceptable
- [ ] Documentation is updated if needed
- [ ] Follows project conventions

### 24. Technical Debt Management

Technical debt is the implied cost of rework caused by choosing an easy solution instead of a better approach.

**Types of technical debt:**
1. **Deliberate/Prudent**: "We know this isn't ideal, but we'll fix it next sprint"
2. **Deliberate/Reckless**: "We don't have time to do it right"
3. **Inadvertent/Prudent**: "Now we know the right way, having done it wrong first"
4. **Inadvertent/Reckless**: "What's Layer of Indirection?"

**Management strategies:**
- Track tech debt in your issue tracker (use a "tech-debt" label)
- Allocate a percentage of each sprint to debt reduction
- The Boy Scout Rule: leave code cleaner than you found it
- Refactor opportunistically when touching code for feature work
- Regular architectural reviews

### 25. Refactoring Patterns

#### Extract Function (Most Common)

**Before:**
```javascript
function processOrder(order) {
  // validate
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customer) {
    throw new Error('Order must have a customer');
  }
  // calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  // apply discount
  if (order.discountCode) {
    const discount = getDiscount(order.discountCode);
    total -= total * discount;
  }
  // save
  saveToDatabase(order, total);
  sendConfirmation(order, total);
}
```

**After:**
```javascript
function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order);
  applyDiscount(order, total);
  finalizeOrder(order, total);
}
```

#### Rename

Rename variables, functions, or classes to be more descriptive:

```javascript
// Before
const d = new Date();
const x = calculate(d);
const arr = users.filter(u => u.a === 1);

// After
const currentDate = new Date();
const ageInDays = calculateDaysSince(currentDate);
const activeUsers = users.filter(user => user.isActive === true);
```

#### Move

Move a function to a more appropriate class or module:

```javascript
// Before: Calculator contains display logic
class Calculator {
  calculate(a, b) { return a + b; }
  renderResult(result) { document.getElementById('output').textContent = result; }
}

// After: Separation of concerns
class Calculator {
  calculate(a, b) { return a + b; }
}
class Display {
  renderResult(result) { document.getElementById('output').textContent = result; }
}
```

#### Inline

Replace a function call with the function's body when the function is trivial:

```javascript
// Before
function getTax(amount) {
  return amount * 0.1;
}
const tax = getTax(price);

// After (if getTax is only used once and is simple)
const tax = price * 0.1;
```

### 26. SOLID Principles Review

#### S - Single Responsibility Principle
A class should have only one reason to change.

```javascript
// Bad: UserService does too much
class UserService {
  createUser(data) { /* ... */ }
  sendEmail(user) { /* ... */ }
  generateReport(users) { /* ... */ }
}

// Good: Each class has one responsibility
class UserService { createUser(data) { /* ... */ } }
class EmailService { sendEmail(user) { /* ... */ } }
class ReportService { generateReport(users) { /* ... */ } }
```

#### O - Open/Closed Principle
Software entities should be open for extension, closed for modification.

```javascript
// Bad: Must modify class to add new discount types
class DiscountCalculator {
  calculate(type, amount) {
    if (type === 'percentage') return amount * 0.1;
    if (type === 'fixed') return 10;
  }
}

// Good: Extend without modifying
class PercentageDiscount {
  calculate(amount) { return amount * 0.1; }
}
class FixedDiscount {
  calculate(amount) { return 10; }
class DiscountCalculator {
  constructor(strategy) { this.strategy = strategy; }
  calculate(amount) { return this.strategy.calculate(amount); }
}
```

#### L - Liskov Substitution Principle
Objects of a superclass should be replaceable with objects of a subclass without breaking the application.

#### I - Interface Segregation Principle
Clients should not be forced to depend on interfaces they don't use. Prefer small, specific interfaces over large, general-purpose ones.

#### D - Dependency Inversion Principle
High-level modules should not depend on low-level modules. Both should depend on abstractions.

```javascript
// Bad: OrderService depends directly on MySQL
class OrderService {
  constructor() {
    this.db = new MySQLDatabase();
  }
}

// Good: Depends on abstraction
class OrderService {
  constructor(database) {
    this.db = database;  // any database implementation
  }
}
```

### 27. Clean Code Principles

- **Meaningful Names**: Use intention-revealing names. `getUserById()` not `fetch()`.
- **Small Functions**: Functions should do one thing, do it well, and do it only.
- **Function Arguments**: Ideally 0-3 arguments. Use objects for more.
- **DRY**: Don't Repeat Yourself.
- **Comments**: Good code is self-documenting. Comments explain "why", not "what".
- **Error Handling**: Handle errors gracefully. Don't return null.
- **Boy Scout Rule**: Leave the code cleaner than you found it.
- **No Magic Numbers**: Use named constants, not raw numbers.
- **Guard Clauses**: Use early returns to avoid deep nesting.
- **Consistent Formatting**: Automate with Prettier.

### 28. DRY, KISS, YAGNI

#### DRY (Don't Repeat Yourself)
Every piece of knowledge should have a single, authoritative representation in the system.

```javascript
// Bad: Duplicate validation logic
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateContactEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Good: Single source of truth
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

#### KISS (Keep It Simple, Stupid)
The simplest solution that correctly solves the problem is almost always the right one.

#### YAGNI (You Aren't Gonna Need It)
Only implement features and abstractions that are required NOW. Don't build for hypothetical futures.

```javascript
// YAGNI violation: building a plugin system for one implementation
class PluginManager {
  register(plugin) { this.plugins.push(plugin); }
  executeAll(context) { this.plugins.forEach(p => p.execute(context)); }
}

// YAGNI: just call the function directly
processPayment(order);
```

---

## PART 3 - Documentation

### 29. JSDoc: Tags, Types, Examples

JSDoc is the standard documentation syntax for JavaScript:

```javascript
/**
 * Calculates the total price of items in a cart.
 * Applies tax and optional discount code.
 *
 * @param {Array<Object>} items - Array of cart items
 * @param {number} items[].price - Price per item in cents
 * @param {number} items[].quantity - Number of items
 * @param {string} [taxRegion='US'] - Tax region code
 * @param {string|null} [discountCode=null] - Discount code to apply
 * @returns {number} Total price in cents after tax and discount
 * @throws {Error} If cart is empty
 * @example
 * const total = calculateCartTotal(
 *   [{ price: 1000, quantity: 2 }],
 *   'US',
 *   'SAVE10'
 * );
 * // Returns: 1800 (2000 - 10% discount + tax)
 *
 * @since 1.0.0
 * @author Jane Doe
 */
function calculateCartTotal(items, taxRegion = 'US', discountCode = null) {
  if (items.length === 0) throw new Error('Cart is empty');
  // ...
}
```

**Common JSDoc Tags:**
| Tag | Purpose |
|-----|---------|
| `@param {type} name` | Function parameter |
| `@returns {type}` | Return value |
| `@type {type}` | Type declaration |
| `@typedef` | Custom type definition |
| `@property` | Object property |
| `@example` | Usage example |
| `@throws` | Exception description |
| `@deprecated` | Mark as deprecated |
| `@see` | Reference to related item |
| `@link` | Inline link to related code |
| `@since` | When feature was added |
| `@override` | Override parent method |

**Type syntax:**
```javascript
/**
 * @param {string|string[]} names - Single name or array of names
 * @param {{x: number, y: number}} position - Coordinates
 * @param {Promise<User>} userPromise - User data promise
 * @returns {Map<string, number>} Category counts
 */
```

### 30. TypeDoc: API Documentation Generation

TypeDoc generates API documentation from TypeScript source code:

```bash
# Install
npm install --save-dev typedoc

# Generate docs
npx typedoc src/index.ts
npx typedoc --out docs src/
```

**typedoc.json configuration:**
```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "name": "My Library",
  "readme": "README.md",
  "excludePrivate": true,
  "excludeProtected": true,
  "includeVersion": true,
  "navigation": true,
  "sort": ["source-order"]
}
```

**JSDoc comments that TypeDoc uses:**
```typescript
/**
 * Represents a user in the system.
 * @example
 * const user = new User('Alice', 'alice@example.com');
 */
export class User {
  /** The user's display name */
  name: string;

  /**
   * Creates a new User instance.
   * @param name - Display name
   * @param email - Email address
   */
  constructor(name: string, email: string) {}
}
```

### 31. Storybook: Component Documentation, Stories, Controls

Storybook is a tool for developing and documenting UI components in isolation.

#### Setup

```bash
npx storybook@latest init
```

#### Writing Stories (CSF - Component Story Format)

```jsx
// Button.stories.jsx
import { fn } from '@storybook/test';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    onClick: fn(),
  },
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Secondary',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
};
```

#### Controls

Storybook Controls provides a graphical UI to interact with component arguments dynamically. Auto-generated from your component's props/args. Supports:

- **Boolean**: Toggle switches
- **String**: Text inputs
- **Number**: Range sliders or number inputs
- **Color**: Color picker
- **Date**: Date picker
- **Enum**: Radio buttons, dropdowns, or inline radio

#### Key Addons
- **@storybook/addon-docs**: Auto-generated documentation
- **@storybook/addon-essentials**: Controls, Actions, Viewport, Backgrounds
- **@storybook/addon-interactions**: Interactive testing
- **@storybook/addon-a11y**: Accessibility checks
- **@storybook/addon-themes**: Theme switching

### 32. README Best Practices

A good README should include:

```markdown
# Project Name

Brief description of what this project does and why it exists.

## Features
- Feature 1
- Feature 2
- Feature 3

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation
```bash
git clone https://github.com/user/repo.git
cd repo
npm install
```

### Usage
```bash
npm run dev
```

## API Reference
Brief overview or link to full documentation.

## Configuration
Environment variables and config files.

## Contributing
Link to CONTRIBUTING.md or brief guidelines.

## License
MIT or link to LICENSE file.

## Support
How to get help, report bugs, or request features.
```

**Rules:**
- Keep it under 500 lines
- Start with a clear description
- Include installation and usage instructions
- Add code examples
- Link to detailed documentation for complex projects
- Keep it updated with the project

### 33. Architecture Decision Records (ADR)

ADRs capture important architectural decisions along with their context and consequences.

**Format (Markdown):**
```markdown
# ADR-001: Use PostgreSQL as Primary Database

## Status
Accepted

## Date
2024-01-15

## Context
We need a database for our e-commerce platform that supports:
- Complex queries with joins
- JSON document storage
- Full-text search
- ACID transactions

## Decision
We will use PostgreSQL as our primary database.

## Consequences

### Positive
- Excellent JSON support (JSONB type)
- Strong community and ecosystem
- ACID compliance
- Full-text search built-in

### Negative
- Team needs to learn PostgreSQL-specific features
- Slightly more complex setup than SQLite

### Neutral
- Will need a migration strategy for schema changes
```

### 34. ADR Tools

**adr-tools (CLI):**
```bash
# Install
brew install adr-tools    # macOS
# or clone from GitHub

# Usage
adr init                    # Initialize ADR directory
adr new "Use React for frontend"   # Create new ADR
adr list                    # List all ADRs
adr link 1 "see also"       # Link between ADRs
adr status 1 "accepted"     # Update status
```

**Markdown Any Decision Records (MADR):**
```markdown
# {short title of solved problem and solution}

## Status
{Proposed | Accepted | Deprecated | Superseded by [ADR-005](005-example.md)}

## Context
{Describe the context and problem statement.}

## Decision Drivers
* {decision driver 1}
* {decision driver 2}

## Considered Options
* {title of option 1}
* {title of option 2}
* {title of option 3}

## Decision Outcome
Chosen option: "{title of option 1}", because {justification}.

### Consequences
* Good, because {positive consequence}
* Bad, because {negative consequence}

## Pros and Cons of the Options

### {option 1}
{description}

* Good, because {argument}
* Bad, because {argument}

### {option 2}
{description}
```

---

## PART 5 - Developer Experience

### 35. VS Code Extensions for JavaScript

#### Essential Extensions

| Extension | Purpose |
|-----------|---------|
| **ESLint** | Linting integration |
| **Prettier** | Code formatting |
| **GitLens** | Enhanced Git (blame, history, compare) |
| **Error Lens** | Inline error display |
| **GitHub Copilot** | AI code completion |
| **Thunder Client** | API testing (Postman alternative) |
| **TypeScript Importer** | Auto-import TypeScript |
| **Auto Rename Tag** | Rename paired HTML tags |
| **Path Intellisense** | File path autocomplete |
| **ES7+ Snippets** | React/Redux/JS snippets |
| **Quokka.js** | JavaScript playground/REPL |
| **Live Server** | Local dev server for HTML |
| **Color Highlight** | Preview colors in code |
| **Bracket Pair Color DLW** | Color-coded bracket pairs |

#### Productivity Extensions

| Extension | Purpose |
|-----------|---------|
| **Code Spell Checker** | Catch typos |
| **TODO Highlight** | Highlight TODO/FIXME comments |
| **indent-rainbow** | Colorized indentation |
| **File Nesting** | Nest related files in explorer |
| **Import Cost** | Show import file sizes |
| **DotENV** | .env file syntax highlighting |

### 36. VS Code Settings and Snippets

#### Recommended settings.json

```json
{
  // Editor
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code, Menlo, Monaco, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.minimap.enabled": false,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",

  // Files
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  // Terminal
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.defaultProfile.linux": "zsh",

  // Search
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true
  }
}
```

#### Custom Snippets

Create `.vscode/my-snippets.code-snippets`:

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "export function ${1:ComponentName}({ $3 }: ${1:ComponentName}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "React Functional Component with TypeScript"
  },
  "Console Log": {
    "prefix": "clg",
    "body": ["console.log('$1:', $1);"],
    "description": "Console log with variable name"
  }
}
```

### 37. Chrome DevTools Tips

#### Console Shortcuts
```javascript
$('selector')          // querySelector shorthand
$$('selector')         // querySelectorAll shorthand
$0                    // last selected element in Elements tab
$1                    // second-to-last selected element
copy(object)          // copy to clipboard
dir(object)           // console.dir equivalent
table(data)           // display as table
time('label') / timeEnd('label')  // measure performance
```

#### Performance Profiling
1. Open Performance tab
2. Click Record
3. Perform actions
4. Stop recording
5. Analyze: flame chart, long tasks, memory usage

#### Network Tab
- **Preserve Log**: Don't lose requests on page reload
- **Disable Cache**: Test with fresh resources
- **Throttle**: Simulate slow networks (3G, offline)
- **Initiator**: See what triggered each request

#### Sources Tab
- **Snippets**: Save and run reusable JavaScript
- **Breakpoints**: Conditional, DOM mutation, XHR
- **Local Overrides**: Override network responses locally

#### React DevTools
- Inspect component tree
- Edit props and state in real-time
- Profile component rendering performance
- Check why components re-render

### 38. Terminal Tools: Oh My Zsh, Starship

#### Oh My Zsh

```bash
# Install
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Essential plugins in .zshrc
plugins=(
  git              # git aliases: gst=status, gp=push, gc=commit
  z                # jump to frequent directories: z myproject
  zsh-autosuggestions  # suggest from history
  zsh-syntax-highlighting  # color commands as you type
  docker
  kubectl
  npm
  node
)

# Theme
ZSH_THEME="robbyrussell"  # or agnoster, powerlevel10k
```

**Popular Oh My Zsh themes:**
- **robbyrussell**: Default, clean, minimal
- **powerlevel10k**: Most customizable, fast, feature-rich
- **agnoster**: Segmented prompt with special characters

#### Starship Prompt

```bash
# Install
curl -sS https://starship.rs/install.sh | sh

# Add to .zshrc
echo 'eval "$(starship init zsh)"' >> ~/.zshrc
```

```toml
# ~/.config/starship.toml
format = """
$directory\
$git_branch\
$git_status\
$character"""

[directory]
truncation_length = 3
truncate_to_repo = true

[git_status]
style = "red"
format = '[$all_status$ahead_behind]($style) '

[character]
success_symbol = "[❯](green)"
error_symbol = "[❯](red)"
```

Starship works across all shells (Zsh, Bash, Fish, PowerShell) and is blazing fast (written in Rust).

### 39. API Testing Tools

#### Postman
- **Type**: Standalone Electron app
- **Strengths**: Comprehensive feature set, mock servers, monitoring, team workspaces, documentation generation
- **Weaknesses**: Heavy (1-2 GB RAM), requires account for most features, proprietary cloud storage
- **Pricing**: Free tier limited, Basic $14/user/mo, Professional $29/user/mo
- **Best for**: Enterprise teams, comprehensive API lifecycle

#### Insomnia
- **Type**: Standalone Electron app (by Kong)
- **Strengths**: Clean UI, best GraphQL support, plugin system, local storage option
- **Weaknesses**: Smaller community, sync requires account
- **Pricing**: Free tier, Plus $5/mo, Team $8/user/mo
- **Best for**: GraphQL-heavy APIs, Kong ecosystem users

#### Bruno
- **Type**: Standalone Electron app (open-source)
- **Strengths**: Git-native (.bru files), offline-first, no account required, MIT licensed
- **Weaknesses**: No cloud sync (by design), smaller ecosystem, no mock server
- **Pricing**: Free forever (open-source), Team $6/user/mo for extras
- **Best for**: Git-first teams, security-conscious environments

#### HTTPie
- **Type**: CLI tool + Desktop app
- **Strengths**: Human-readable syntax, minimal resource usage, Unix-friendly piping
- **Weaknesses**: Limited GUI scripting, no WebSocket/gRPC
- **Pricing**: CLI free, Desktop $9/mo
- **Best for**: Terminal workflows, CI/CD pipelines, quick ad-hoc requests

#### Decision Guide

| Scenario | Best Choice |
|----------|-------------|
| Enterprise team with budget | Postman |
| Git-native, open source | Bruno |
| GraphQL-heavy | Insomnia or Hoppscotch |
| Terminal-first developer | HTTPie |
| Quick test in VS Code | Thunder Client |
| Solo/small team, zero cost | Bruno |

### 40. Database GUI Tools

#### TablePlus
- **Type**: Native macOS/Windows/Linux app
- **Strengths**: Fastest startup, clean modern UI, inline editing with visual diff, multi-connection tabs
- **Databases**: PostgreSQL, MySQL, SQLite, MongoDB, Redis, SQL Server (~20 databases)
- **Pricing**: Free (2 connections, 2 tabs), $89 perpetual license
- **Best for**: Speed priority, daily database work

#### DBeaver
- **Type**: Java/Eclipse-based (cross-platform)
- **Strengths**: Supports 80+ databases, ER diagrams, data export to 20+ formats, free Community edition
- **Databases**: Everything with a JDBC driver (PostgreSQL, MySQL, Oracle, Cassandra, ClickHouse, etc.)
- **Pricing**: Free (Community), $10-25/mo (Enterprise)
- **Best for**: Multi-database environments, budget-conscious teams

#### Prisma Studio
- **Type**: Browser-based GUI (bundled with Prisma ORM)
- **Strengths**: Schema-aware, relation navigation, referential integrity warnings, zero configuration
- **Databases**: All Prisma-supported databases (PostgreSQL, MySQL, SQLite, MongoDB, CockroachDB)
- **Pricing**: Free (part of Prisma)
- **Best for**: Prisma ORM projects, quick data exploration during development

#### DataGrip (JetBrains)
- **Type**: Java-based (cross-platform)
- **Strengths**: Best SQL autocomplete, schema comparison, explain plan visualization, deep SQL intelligence
- **Databases**: 20+ databases with dialect-specific intelligence
- **Pricing**: $99/year (or included in JetBrains All Products Pack)
- **Best for**: JetBrains ecosystem users, heavy SQL writing

#### Comparison

| Feature | TablePlus | DBeaver CE | Prisma Studio | DataGrip |
|---------|-----------|-----------|---------------|----------|
| Price | $89 perpetual | Free | Free | $99/year |
| Startup speed | Instant | 5-10s | 3s | 10-15s |
| DB support | ~20 | 80+ | 6 | 20+ |
| Native UI | Yes | No (Java) | No (Web) | No (Java) |
| ER Diagrams | No | Yes | No | Yes |
| SQL editor | Good | Good | No | Excellent |
| Best for | Speed | Universality | Prisma projects | SQL intelligence |
