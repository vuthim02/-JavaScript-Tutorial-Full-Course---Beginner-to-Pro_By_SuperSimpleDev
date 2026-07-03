# Common Pitfalls and Best Practices

## Pitfall 1: Not Using Strict Mode

```typescript
// Without strict mode — silently wrong
function getLength(value) { return value.length; } // no error, but value could be null

// With strict mode — caught
function getLength(value: string): number { return value.length; } // safe
```

## Pitfall 2: Overusing `any`

```typescript
// Bad — defeats the purpose of TypeScript
function process(data: any): any { return data.transform(); }

// Better — use unknown and narrow
function process(data: unknown): string {
    if (data instanceof SomeClass) { return data.transform(); }
    throw new Error("Invalid data");
}
```

## Pitfall 3: Type Assertion Abuse

```typescript
// Bad — lying to the compiler
const user = JSON.parse(response) as User; // runtime may not match type

// Better — validate the shape
function isUser(data: unknown): data is User {
    return (
        typeof data === "object" && data !== null &&
        typeof (data as User).name === "string" &&
        typeof (data as User).age === "number"
    );
}
const raw = JSON.parse(response);
if (isUser(raw)) { console.log(raw.name); } // safe — narrowed to User
```

## Pitfall 4: `!` Non-Null Assertion Abuse

```typescript
// Bad — hides potential null errors
const el = document.getElementById("root")!;
el.innerHTML = "Hello"; // might crash if element doesn't exist

// Better — check first
const el = document.getElementById("root");
if (el) { el.innerHTML = "Hello"; }
```

## Best Practices

| Practice | Why |
|----------|-----|
| Enable `strict: true` | Catches the most errors at compile time |
| Prefer `interface` over `type` | Better error messages, declaration merging, extends |
| Use `unknown` instead of `any` | Forces type checks before use |
| Avoid type assertions (`as`) | They bypass the type checker — validate at runtime |
| Use discriminated unions | Makes impossible states impossible |
| Mark function return types | Documents intent and prevents accidental changes |
| Use `readonly` for immutable data | Prevents accidental mutation |
| Prefer const assertions | `as const` for literal types and readonly objects |
| Use generics for reusable logic | Preserve type information across operations |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is `any` being used? | Search for `: any` — each use is a blind spot |
| Are there type assertions? | Search for `as Type` — each assertion bypasses the type checker |
| Is `strict` mode enabled? | Check `tsconfig.json` |
| Are function return types annotated? | Missing return types can lead to accidental changes |
## Next Steps

[Back to Chapter 15](15-practical-patterns.md): Practical Patterns
[Proceed to Chapter 17](17-project.md): Project: Full TypeScript API with Type-Safe Patterns to learn about project: full typescript api with type-safe patterns.
