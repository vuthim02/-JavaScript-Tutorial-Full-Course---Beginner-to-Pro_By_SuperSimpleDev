# Part 17 — Testing, Quality Assurance, and CI/CD

Split chapter files from the main document. Each file covers a focused subtopic (100-200 lines).

| # | File | Topic |
|---|------|-------|
| 01 | [01-why-testing.md](01-why-testing.md) | Why testing matters — cost of bugs, regression, documentation, design pressure |
| 02 | [02-testing-pyramid.md](02-testing-pyramid.md) | Unit, integration, E2E, snapshot, and visual regression testing |
| 03 | [03-jest-foundation.md](03-jest-foundation.md) | Jest setup, describe/it/expect, matchers, custom matchers, setup/teardown |
| 04 | [04-jest-mocking.md](04-jest-mocking.md) | jest.fn, jest.spyOn, jest.mock, timers |
| 05 | [05-vitest.md](05-vitest.md) | Vitest — Vite-native alternative, configuration, performance comparison |
| 06 | [06-testing-async-code.md](06-testing-async-code.md) | Testing callbacks, promises, async/await, API client mocking |
| 07 | [07-dom-testing.md](07-dom-testing.md) | jsdom, Testing Library, React testing, user events, async DOM |
| 08 | [08-playwright-e2e.md](08-playwright-e2e.md) | Playwright setup, locators, assertions, fixtures, Page Object Model |
| 09 | [09-tdd.md](09-tdd.md) | Red-Green-Refactor cycle, FizzBuzz example, when to use TDD |
| 10 | [10-code-quality-tools.md](10-code-quality-tools.md) | ESLint, Prettier, Husky, lint-staged setup and integration |
| 11 | [11-cicd-github-actions.md](11-cicd-github-actions.md) | GitHub Actions CI/CD pipelines, caching, secrets, matrix builds |
| 12 | [12-coverage-thresholds.md](12-coverage-thresholds.md) | Line/branch/function coverage, Jest & Vitest thresholds |
| 13 | [13-mocking-strategies.md](13-mocking-strategies.md) | Mocking network, axios, database, Date.now, Math.random, partial mocks |
| 14 | [14-complete-project-setup.md](14-complete-project-setup.md) | Full project structure, package.json scripts, CI workflow, common gotchas |
| 15 | [15-test-quality-mutation.md](15-test-quality-mutation.md) | Test trophy model, F.I.R.S.T. principles, mutation testing with Stryker, test ratios |
| 16 | [16-modern-testing-tools.md](16-modern-testing-tools.md) | MSW (Mock Service Worker), property-based testing (fast-check), test data factories (Faker, Fishery) |

Source: `part17-testing-quality-assurance-ci-cd.md` (2232 lines)

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/17-testing.js
```

## Next Steps

[Back to Module 16](../16-express/README.md): Express.js, Middleware, MVC, Error Handling, Validation, Auth, Production Backend

[Proceed to Module 18](../18-typescript/README.md): TypeScript Deep Dive to learn about TypeScript and type-safe JavaScript.
