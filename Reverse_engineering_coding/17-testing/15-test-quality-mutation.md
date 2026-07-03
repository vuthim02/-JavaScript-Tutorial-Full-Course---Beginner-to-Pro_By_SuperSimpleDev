# Test Quality & Mutation Testing

## The Test Pyramid vs The Test Trophy

The classic pyramid (many unit, some integration, few E2E) works for backend services with rich domain logic. For frontends and orchestration services, the **Test Trophy** model fits better:

```text
        ┌──────┐
        │ E2E  │      ← Few, critical journeys
       ┌┴──────┴┐
       │ Integ. │     ← Most investment — real components, real DB
      ┌┴────────┴┐
      │  Unit    │    ← Pure logic, utils, complex branching
     ┌┴──────────┴┐
     │ Static     │   ← TypeScript, ESLint (catches 30%+ bugs before runtime)
```

| Layer | Speed | Confidence | Quantity |
|-------|-------|------------|----------|
| Static analysis | Instant | Medium | Automatic |
| Unit tests | <10ms | Medium–Low | Many (200–500) |
| Integration tests | 50–500ms | High | Most (50–150) |
| E2E tests | 2–30s | Very high | Few (10–30) |

**Real insight:** Integration tests give the best ROI. They catch SQL bugs, ORM misconfigurations, and service boundary issues that unit tests miss. Unit tests alone miss 60%+ of production bugs.

## What Makes a Good Test?

Apply the **F.I.R.S.T.** principles:

| Letter | Principle | Meaning |
|--------|-----------|---------|
| **F** | Fast | Tests run in milliseconds — if they're slow, devs stop running them |
| **I** | Isolated | Each test runs independently — no shared state, no order dependencies |
| **R** | Repeatable | Same result every time — no flaky network calls or timing |
| **S** | Self-validating | Boolean pass/fail — no manual inspection of output |
| **T** | Timely | Written alongside the code (or before, in TDD) |

### The "Useful Test" Litmus Test

```javascript
// ✅ GOOD test: fails ONLY when behavior actually breaks
it('should deny access when token has expired', async () => {
    const expiredToken = jwt.sign({ sub: 'user1' }, secret, { expiresIn: '-1h' });
    const res = await request(app).get('/api/profile').set('Authorization', `Bearer ${expiredToken}`);
    expect(res.status).toBe(401);
});

// ❌ BAD test: breaks on refactoring (tests implementation, not behavior)
it('should call auth middleware first', () => {
    expect(authMiddleware).toHaveBeenCalled(); // tests order, not outcome
});
```

**Two-question check:**
1. If this test fails, will it tell me exactly what's wrong?
2. If I refactor without changing behavior, will this test still pass?

Both YES → good test. Either NO → reconsider.

## What to Test vs What Not to Test

### ✅ Test This

- Business logic and calculations
- Authentication and authorization rules  
- Input validation and sanitization
- Error handling paths (what happens when things go wrong?)
- Critical user flows (login, checkout, data export)
- Edge cases: empty arrays, null values, boundary numbers, unicode

### ❌ Don't Test This

- Framework internals (Express routing, React reconciliation)
- Third-party library behavior (test your usage, not their code)
- Constants and configuration values
- CSS styles and layout
- Implementation details that change during refactoring

## Mutation Testing with Stryker

Coverage percentage lies. 80% coverage can still miss critical branches if tests don't assert correctly.

**Mutation testing** inserts bugs ("mutants") into your code and checks if your tests catch them:

```bash
npx stryker run
```

```
Mutation score: 72%
Survived mutants:
  - ConditionalsBoundary (line 14) — changed > to >=, tests passed
  - NegateConditional (line 22) — changed !== to ===, tests passed
```

A mutation score below 60% means your tests aren't catching most bugs — even with 85% coverage.

### Common Survivors (Untested Mutations)

| Mutant type | What it changes | Why it survives |
|-------------|-----------------|-----------------|
| Negate condition | `>` → `<=` | Test only checks the happy path |
| Remove call | `save()` → no-op | Test doesn't assert on side effects |
| Return null | `find()` returns null | Test doesn't check for missing data |
| Boundary shift | `>= 18` → `> 18` | Test uses values far from the boundary |

### Fixing Low Mutation Scores

```javascript
// BEFORE — passes but mutant survives
function isAdult(age) {
    return age >= 18;
}
test('isAdult', () => {
    expect(isAdult(20)).toBe(true);  // Only happy path
});

// AFTER — catches boundary mutants
test('isAdult with boundary testing', () => {
    expect(isAdult(18)).toBe(true);  // Exactly on boundary
    expect(isAdult(17)).toBe(false); // One below boundary
    expect(isAdult(0)).toBe(false);  // Edge case
});
```

## Recommended Test Ratios (2026)

| Codebase Type | Unit | Integration | E2E | Visual |
|---------------|------|-------------|-----|--------|
| Backend (business logic heavy) | 60% | 30% | 10% | — |
| Frontend (UI heavy) | 25% | 60% | 10% | 5% |
| API Gateway (orchestration) | 30% | 50% | 20% | — |

Teams with mature test suites deploy 2–3× more frequently with 50–70% fewer production incidents (DORA 2024).

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why does the Test Trophy fit frontends better? | Frontend code is mostly integration — components + state + API |
| What is the #1 sign of a bad test? | Fails for reasons unrelated to the change (brittle, flaky) |
| How is mutation testing different from coverage? | Coverage checks if code *ran*; mutation checks if code was *tested* |
| What mutation score should I target? | 70%+ for production code; 90%+ for critical business logic |
| Why do unit tests miss 60%+ of bugs? | They test isolation — real bugs happen at module/service boundaries |
| Should I use Vitest or Jest in 2026? | Vitest — 3.8× faster, native TS, lower memory |
## Next Steps

[Back to Chapter 14](14-complete-project-setup.md): Complete Project Setup
[Proceed to Chapter 16](16-modern-testing-tools.md): 16 — Modern Testing Tools to learn about MSW, property-based testing, and test data factories.
