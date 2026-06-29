# Debugging Challenge - Level 69

## Module 14: Amazon Project & Git - Git Init, Add, Commit

---

### Error 1: Git commit without staging
**Description:** committing without staging changes first leaves files uncommitted
```bash
git commit -m "Initial commit"
```

### Error 2: Git init in wrong directory
**Description:** initializing git in the wrong folder
```bash
cd /wrong/path
git init
```

### Error 3: Git add with wrong path
**Description:** adding files with incorrect path
```bash
git add ./srcs/main.js
```

### Error 4: Git commit with no message
**Description:** committing without a message opens editor
```bash
git commit
```

### Error 5: Git detached HEAD
**Description:** checking out a commit hash instead of branch causes detached HEAD
```bash
git checkout abc123
```

### Error 6: Git add all including binaries
**Description:** adding all files including large binary files
```bash
git add .
```

### Error 7: Git commit amend wrong
**Description:** amending a commit that was already pushed
```bash
git commit --amend -m "New message"
```

### Error 8: Git status confused
**Description:** running git status after file delete shows wrong state
```bash
rm file.js
git status
```

### Error 9: Git log with wrong format
**Description:** git log format string has typo
```bash
git log --format="%h %s %an"
```

### Error 10: Git add with deleted file
**Description:** staging a file that was deleted
```bash
git add deleted-file.js
```

### Error 11: Git reset wrong mode
**Description:** using --hard instead of --soft
```bash
git reset --hard HEAD~1
```

### Error 12: Git branch not created
**Description:** committing directly to main instead of feature branch
```bash
git add . && git commit -m "feature work"
```

### Error 13: Git ignore not working
**Description:** .gitignore file not committed or formatted wrong
```bash
echo "node_modules" > .gitignore
git add .
```

### Error 14: Git remote add wrong URL
**Description:** adding remote with incorrect URL format
```bash
git remote add origin github.com/user/repo.git
```

### Error 15: Git diff showing nothing
**Description:** git diff shows nothing after changes
```bash
git diff
```

### Error 16: Git commit too large
**Description:** committing too many files in one commit
```bash
git add -A && git commit -m "Everything"
```

### Error 17: Git push without remote
**Description:** trying to push without adding a remote
```bash
git push
```

### Error 18: Git pull with conflicts
**Description:** pulling without handling conflicts first
```bash
git pull origin main
```

### Error 19: Git stash not applying
**Description:** stashing changes but forgetting to apply
```bash
git stash
git checkout other-branch
git checkout main
```

### Error 20: Git rm vs rm confusion
**Description:** using rm instead of git rm to delete tracked files
```bash
rm tracked-file.js
git commit -m "deleted file"
```

### Error 21: Git mv not staging
**Description:** moving files without git mv
```bash
mv old.js new.js
git commit -m "renamed"
```

### Error 22: Git commit empty
**Description:** trying to commit with no staged changes
```bash
git commit -m "nothing changed"
```

### Error 23: Git checkout wrong branch
**Description:** checking out a local branch name that doesn't exist
```bash
git checkout non-existent-branch
```

### Error 24: Git merge without commit
**Description:** merge conflicts not committed
```bash
git merge feature-branch
```

### Error 25: Git rebase interactive wrong
**Description:** rebasing without specifying the right base
```bash
git rebase -i
```

### Error 26: Git tag not pushed
**Description:** creating a tag but not pushing it
```bash
git tag v1.0
git push
```

### Error 27: Git clone wrong URL
**Description:** cloning with incorrect URL
```bash
git clone https://github.com/user/nonexistent.git
```

### Error 28: Git fetch not merging
**Description:** fetching without merging leaves branch behind
```bash
git fetch origin
git status
```

### Error 29: Git config user wrong
**Description:** git config with wrong user for this project
```bash
git config --global user.name "Wrong Name"
git commit -m "message"
```

### Error 30: Git add --intent-to-add
**Description:** using intent-to-add incorrectly
```bash
git add --intent-to-add newfile.js
git commit -m "add newfile"
```

### Error 31: Git submodule not init
**Description:** cloning with submodules but not initializing
```bash
git clone --recurse-submodules repo.git
```

### Error 32: Git clean dry run removal
**Description:** git clean without -n removes files unexpectedly
```bash
git clean -fd
```

### Error 33: Git blame wrong file
**Description:** blaming a binary file
```bash
git blame image.png
```

### Error 34: Git revert vs reset
**Description:** using reset instead of revert on public branch
```bash
git reset --hard HEAD~1
git push --force
```

### Error 35: Git cherry-pick without commit
**Description:** cherry-picking without resolving conflicts
```bash
git cherry-pick abc123
```

### Error 36: Git bisect start wrong
**Description:** starting bisect with wrong range
```bash
git bisect start
git bisect bad
git bisect good
```

### Error 37: Git archive wrong format
**Description:** creating archive with unsupported format
```bash
git archive --format=zip HEAD > archive.zip
```

### Error 38: Git fsck missing
**Description:** not running git fsck regularly
```bash
git fsck
```

### Error 39: Git gc not run
**Description:** not running garbage collection
```bash
git gc --aggressive
```

### Error 40: Git reflog expired
**Description:** reflog entries expire before recovery
```bash
git reflog expire --expire=now --all
```

### Error 41: Git describe not working
**Description:** git describe fails without tags
```bash
git describe
```

### Error 42: Git shortlog format
**Description:** shortlog with wrong formatting
```bash
git shortlog -s -n --all
```

### Error 43: Git notes not pushed
**Description:** adding notes but not pushing them
```bash
git notes add -m "Note"
git push
```

### Error 44: Git worktree add wrong
**Description:** adding worktree to dirty directory
```bash
git worktree add ../new-branch feature
```

### Error 45: Git replace object
**Description:** replacing objects incorrectly
```bash
git replace abc123 def456
```

### Error 46: Git filter-branch dangerous
**Description:** rewriting history with filter-branch
```bash
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch secret.txt' --prune-empty --tag-name-filter cat -- --all
```

### Error 47: Git bundle create
**Description:** creating bundle with wrong refspec
```bash
git bundle create repo.bundle HEAD
```

### Error 48: Git interpret-trailers
**Description:** adding trailers with wrong format
```bash
git interpret-trailers --trailer "Signed-off-by: User" file
```

### Error 49: Git range-diff
**Description:** comparing ranges incorrectly
```bash
git range-diff main..feature main..other
```

### Error 50: Git sparse-checkout
**Description:** sparse checkout not configured
```bash
git sparse-checkout set /src
```

### Error 51: Git partial clone
**Description:** partial clone without proper filters
```bash
git clone --filter=blob:none repo.git
```

### Error 52: Git maintenance not enabled
**Description:** not running background maintenance
```bash
git maintenance start
```

### Error 53: Git multi-branch merge
**Description:** merging multiple branches at once
```bash
git merge branch1 branch2 branch3
```

### Error 54: Git commit template missing
**Description:** commit template file path wrong
```bash
git config commit.template ~/.git-commit-template.txt
```

### Error 55: Git hooks not executable
**Description:** commit hooks not set as executable
```bash
echo "echo 'linting'" > .git/hooks/pre-commit
```

### Error 56: Gitattributes wrong
**Description:** .gitattributes with incorrect patterns
```bash
echo "*.js diff=javascript" > .gitattributes
```

### Error 57: Git signing commits
**Description:** commit signing not configured
```bash
git commit -S -m "signed commit"
```

### Error 58: Git blame ignore revs
**Description:** blaming without ignoring noise commits
```bash
git blame --ignore-revs-file .git-blame-ignore-revs file.js
```

### Error 59: Git bisect run script
**Description:** bisect run script returns wrong exit codes
```bash
git bisect run test.sh
```

### Error 60: Git submodule update
**Description:** submodule update not pulling latest
```bash
git submodule update --init
```

### Error 61: Git push tags only
**Description:** pushing only tags without commits
```bash
git push --tags
```

### Error 62: Git remote prune
**Description:** not pruning stale remote tracking branches
```bash
git remote prune origin
```

### Error 63: Git reset file
**Description:** resetting a single file from staging
```bash
git reset HEAD file.js
```

### Error 64: Git checkout file
**Description:** checking out a file from another branch
```bash
git checkout main -- file.js
```

### Error 65: Git add patch
**Description:** using add -p incorrectly
```bash
git add -p file.js
```

### Error 66: Git stash push with message
**Description:** stashing with message but wrong syntax
```bash
git stash push "message"
```

### Error 67: Git log graph
**Description:** git log graph not showing branches
```bash
git log --graph --oneline --all
```

### Error 68: Git diff cached
**Description:** comparing staged changes incorrectly
```bash
git diff --cached
```

### Error 69: Git show commit
**Description:** showing a commit with wrong format
```bash
git show abc123 --format=full
```

### Error 70: Git verify-pack
**Description:** verifying pack files
```bash
git verify-pack .git/objects/pack/*.idx
```

### Issue 1: Pushing directly to main
**Description:** no branch protection, pushing directly to main
```bash
git checkout main
git push origin main
```

### Issue 2: No code review before merge
**Description:** merging PRs without any code review
```bash
git merge feature-branch
git push origin main
```

### Issue 3: Git hooks not used
**Description:** no pre-commit hooks for linting/testing
```bash
# no pre-commit hook configured
git commit -m "code"
```

### Issue 4: Ignoring .gitignore
**Description:** forcing add of ignored files
```bash
git add -f ignored-file.log
```

### Issue 5: Git with large history
**Description:** repository history has thousands of commits never squashed
```bash
git log --oneline | wc -l
# 15000 commits
```

### Issue 6: No git aliases
**Description:** not using git aliases for common commands
```bash
git status
git add .
git commit -m "msg"
git push
```

### Issue 7: Git stash without naming
**Description:** stashes without descriptions make them unidentifiable
```bash
git stash
git stash
git stash list
# stash@{0}: WIP on main
# stash@{1}: WIP on main
```

### Issue 8: Merge instead of rebase
**Description:** merging feature branch instead of rebasing
```bash
git checkout feature
git merge main
```

### Issue 9: Commit messages with issues
**Description:** commit messages referencing wrong issue number
```bash
git commit -m "Fixes #123"
```

### Issue 10: Git blame for blame
**Description:** using git blame to find who to blame
```bash
git blame file.js
```

### Issue 11: No signed commits
**Description:** commits not signed with GPG keys
```bash
git commit -m "unsigned commit"
```

### Issue 12: Git LFS not used for binaries
**Description:** tracking binaries in regular git
```bash
git add *.psd
git commit -m "design files"
```

### Issue 13: Git submodules with detached HEAD
**Description:** submodules left in detached HEAD state
```bash
git submodule update
# submodule in detached HEAD
```

### Issue 14: No git flow or branching strategy
**Description:** no consistent branching model
```bash
git branch feature
git branch hotfix
git branch experiment
git branch WIP
git branch test
```

### Issue 15: Git in Docker without config
**Description:** git inside Docker container with no user config
```bash
git commit -m "docker commit"
# error: please tell me who you are
```

### Issue 16: Git with CRLF issues
**Description:** mixed line endings causing whitespace commits
```bash
git add .
git commit -m "fix line endings"
```

### Issue 17: Git with wrong file permissions
**Description:** committed files with 777 permissions
```bash
chmod 777 script.sh
git add script.sh
```

### Issue 18: Git ignore patterns too broad
**Description:** .gitignore pattern ignores too much
```bash
echo "build" > .gitignore
# ignores build/, build.js, rebuild/
```

### Issue 19: Git commit with emoji
**Description:** commit messages with emojis that break tooling
```bash
git commit -m ":sparkles: new feature"
```

### Issue 20: Git with IDE files
**Description:** committing IDE configuration files
```bash
git add .idea/ *.swp .vscode/
git commit -m "IDE config"
```

### Issue 21: Git log with color always
**Description:** forcing color in log output for scripts
```bash
git log --color=always
```

### Issue 22: Git environment variables
**Description:** relying on GIT_DIR being set
```bash
export GIT_DIR=/path/to/.git
git status
```

### Issue 23: Git with symlinks
**Description:** committing symlinks that break on Windows
```bash
ln -s /absolute/path link
git add link
```

### Issue 24: Git case sensitivity issues
**Description:** renaming files with only case change on case-insensitive FS
```bash
git mv file.js File.js
```

### Issue 25: Git with time-based tags
**Description:** using dates in tag names
```bash
git tag release-2024-01-15
git tag release-2024-02-20
```

### Issue 26: Git grep with regex
**Description:** git grep with overly complex regex
```bash
git grep -E '^(function|const|let|var)\s+\w+\s*[=(]'
```

### Issue 27: Git shortlog by author
**Description:** shortlog with merged author identities
```bash
git shortlog -s -n
```

### Issue 28: Git with multiple remotes
**Description:** too many remotes causing confusion
```bash
git remote add upstream
git remote add origin
git remote add backup
git remote add personal
```

### Issue 29: Git with shallow clone
**Description:** shallow clone missing history for operations
```bash
git clone --depth 1 repo.git
git log
```

### Issue 30: Git without gitignore for secrets
**Description:** no .gitignore for .env files
```bash
git add .env
git commit -m "add env"
```

### Modify 1: Create a .gitignore file
**Description:** create .gitignore with common Node.js patterns
```bash
# TODO: create .gitignore
```

### Modify 2: Initialize git repository
**Description:** init a new repo and configure user
```bash
# TODO: git init and config
```

### Modify 3: Create first commit with proper message
**Description:** stage files and commit with descriptive message
```bash
# TODO: add and commit
```

### Modify 4: Implement Git branching workflow
**Description:** create feature branch and switch to it
```bash
# TODO: create branch workflow
```

### Modify 5: Create a .gitattributes file
**Description:** configure line endings and diff
```bash
# TODO: create .gitattributes
```

### Modify 6: Set up git aliases
**Description:** configure useful git aliases
```bash
git config --global alias.?? # TODO: implement aliases
```

### Modify 7: Implement pre-commit hook for linting
**Description:** create a pre-commit hook that runs linter
```bash
# TODO: create pre-commit hook
```

### Modify 8: Create commit message template
**Description:** set up a commit message template
```bash
# TODO: set commit template
```

### Modify 9: Implement git bisect script
**Description:** create a script for git bisect
```bash
#!/bin/bash
# TODO: implement bisect script
```

### Modify 10: Set up git signing
**Description:** configure GPG signing for commits
```bash
# TODO: configure signing
```

### Modify 11: Create a git merge strategy
**Description:** configure merge strategy for the project
```bash
# TODO: configure merge
```

### Modify 12: Implement git workflow with hooks
**Description:** set up post-commit and post-merge hooks
```bash
# TODO: implement hooks
```

### Modify 13: Create a squash commit helper
**Description:** script to squash last N commits
```bash
#!/bin/bash
# TODO: implement squash
```

### Modify 14: Implement git blame ignore file
**Description:** create .git-blame-ignore-revs
```bash
# TODO: create blame ignore
```

### Modify 15: Set up git LFS
**Description:** configure Large File Storage
```bash
# TODO: configure LFS
```

### Modify 16: Create git archive script
**Description:** script to create release archives
```bash
# TODO: implement archive script
```

### Modify 17: Implement git submodule workflow
**Description:** add and update submodules
```bash
# TODO: implement submodules
```

### Modify 18: Create git revert helper
**Description:** helper script for reverting commits
```bash
#!/bin/bash
# TODO: implement revert helper
```

### Modify 19: Implement git stash management
**Description:** script to manage and list stashes
```bash
# TODO: implement stash management
```

### Modify 20: Set up git maintenance
**Description:** configure background maintenance
```bash
# TODO: configure maintenance
```

### Modify 21: Create git tag release script
**Description:** script to create and push release tags
```bash
#!/bin/bash
# TODO: implement tag script
```

### Modify 22: Implement git log format
**Description:** create custom git log format
```bash
git config --global format.pretty # TODO: implement
```

### Modify 23: Create git diff wrapper
**Description:** script for better git diff output
```bash
#!/bin/bash
# TODO: implement diff wrapper
```

### Modify 24: Implement git pull strategy
**Description:** configure pull with rebase
```bash
# TODO: configure pull
```

### Modify 25: Set up git worktrees
**Description:** create worktrees for multiple branches
```bash
# TODO: setup worktrees
```

### Modify 26: Create git bisect run script
**Description:** automated bisect with test script
```bash
#!/bin/bash
# TODO: implement bisect run
```

### Modify 27: Implement git blame helper
**Description:** script to blame with ignore file
```bash
#!/bin/bash
# TODO: implement blame helper
```

### Modify 28: Create git changelog generator
**Description:** generate changelog from git log
```bash
#!/bin/bash
# TODO: implement changelog
```

### Modify 29: Implement git commit lint
**Description:** commit message linting hook
```bash
# TODO: implement commit lint
```

### Modify 30: Set up git sparse checkout
**Description:** configure sparse checkout for monorepo
```bash
# TODO: implement sparse checkout
```

### Modify 31: Create git partial clone script
**Description:** script for partial cloning
```bash
#!/bin/bash
# TODO: implement partial clone
```

### Modify 32: Implement git fsck automation
**Description:** scheduled git fsck checks
```bash
#!/bin/bash
# TODO: implement fsck
```

### Modify 33: Create git gc optimization
**Description:** optimize repository with git gc
```bash
# TODO: implement gc
```

### Modify 34: Implement git rerere
**Description:** enable rerere for conflict resolution
```bash
# TODO: configure rerere
```

### Modify 35: Set up git delta islands
**Description:** configure delta islands for large repos
```bash
# TODO: configure delta islands
```

### Modify 36: Create git credential helper
**Description:** set up credential caching
```bash
# TODO: configure credentials
```

### Modify 37: Implement git hooks directory
**Description:** share hooks across team
```bash
# TODO: implement shared hooks
```

### Modify 38: Create git template directory
**Description:** create init template with defaults
```bash
# TODO: create template
```

### Modify 39: Implement git multi-remote workflow
**Description:** script to sync multiple remotes
```bash
#!/bin/bash
# TODO: implement multi-remote
```

### Modify 40: Create git backup script
**Description:** script to backup git repository
```bash
#!/bin/bash
# TODO: implement backup
```

### Modify 41: Implement git hook for testing
**Description:** pre-push hook to run tests
```bash
#!/bin/bash
# TODO: implement pre-push
```

### Modify 42: Create git commitizen adapter
**Description:** set up conventional commits
```bash
# TODO: implement commitizen
```

### Modify 43: Implement git flow automation
**Description:** automate git flow branching
```bash
#!/bin/bash
# TODO: implement git flow
```

### Modify 44: Create git release checklist
**Description:** automated release checklist script
```bash
#!/bin/bash
# TODO: implement release checklist
```

### Modify 45: Implement git hook for security
**Description:** pre-commit hook to check for secrets
```bash
#!/bin/bash
# TODO: implement security hook
```

### Modify 46: Create git blame visualization
**Description:** generate blame visualization
```bash
#!/bin/bash
# TODO: implement blame viz
```

### Modify 47: Implement git stats generator
**Description:** generate repo statistics
```bash
#!/bin/bash
# TODO: implement stats
```

### Modify 48: Create git hook for branch naming
**Description:** validate branch names with hook
```bash
#!/bin/bash
# TODO: implement branch naming
```

### Modify 49: Implement git migration script
**Description:** migrate repo from one host to another
```bash
#!/bin/bash
# TODO: implement migration
```

### Modify 50: Create git disaster recovery
**Description:** script to recover from git disasters
```bash
#!/bin/bash
# TODO: implement recovery
```
