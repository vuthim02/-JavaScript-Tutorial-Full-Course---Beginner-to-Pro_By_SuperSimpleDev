# Chapter 9 — Test-Driven Development (TDD)

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


Testing is not an afterthought. TDD makes it the starting point.

The core idea: write the test before the implementation. This guarantees your code is testable from the start and that every line of code has a reason to exist.

## The Red-Green-Refactor Cycle

```
1. RED   → Write a failing test
2. GREEN → Write the minimum code to pass
3. REFACTOR → Clean up without changing behavior
```

## Example: FizzBuzz

Step 1 — Write the failing test (RED):

```javascript
describe("fizzbuzz", () => {
  it("returns 'Fizz' for multiples of 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(6)).toBe("Fizz");
  });

  it("returns 'Buzz' for multiples of 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(10)).toBe("Buzz");
  });

  it("returns 'FizzBuzz' for multiples of 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  });

  it("returns the number as string otherwise", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(7)).toBe("7");
  });
});
```

Run: test fails (fizzbuzz is not defined). RED.

Step 2 — Write minimum code to pass (GREEN):

```javascript
function fizzbuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}
```

Run: all tests pass. GREEN.

Step 3 — Refactor:

```javascript
const isDivisibleBy = (n, divisor) => n % divisor === 0;

function fizzbuzz(n) {
  const output =
    (isDivisibleBy(n, 3) ? "Fizz" : "") +
    (isDivisibleBy(n, 5) ? "Buzz" : "");

  return output || String(n);
}
```

Tests still pass. REFACTOR complete.

## TDD in Practice

Real teams use TDD selectively. The key insight is that TDD is a design practice, not just a testing practice. Writing the test first forces you to answer:

- What are the inputs and outputs?
- What are the edge cases?
- What is the public API?

## Benefits of TDD

- Confidence that code meets requirements
- Tests are written by someone who understands the code (you)
- Forces you to think about API design before implementation
- Shorter feedback loops (fail fast)
- Naturally high test coverage

## When TDD Works Best

- Pure business logic (algorithms, calculations, validators)
- APIs with clear inputs and outputs
- Bug fixes (write a test that exposes the bug, then fix)

## When TDD Is Less Useful

- Exploratory programming (you do not know what you are building yet)
- UI-heavy code (tests become brittle)
- Legacy code with no tests (add tests when refactoring)

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What are the three phases of TDD? | Red (failing test), Green (passing test), Refactor (clean code) |
| How much code should you write in the GREEN phase? | The absolute minimum to pass the test |
| Does TDD guarantee bug-free code? | No. It only guarantees the code passes your tests |
| Should you always use TDD? | No. Use it where it adds value (logic, APIs, bug fixes) |
| What is the first step in fixing a bug with TDD? | Write a test that reproduces the bug |
## Next Steps

[Back to Chapter 8](08-playwright-e2e.md): Chapter 8 — E2E Testing with Playwright
[Proceed to Chapter 10](10-code-quality-tools.md): Chapter 10 — Code Quality Tools to learn about chapter 10 — code quality tools.
