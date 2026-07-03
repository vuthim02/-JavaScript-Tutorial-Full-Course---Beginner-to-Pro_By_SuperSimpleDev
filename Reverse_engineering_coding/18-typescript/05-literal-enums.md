# Literal Types and Template Literal Types

## Literal Types

A type that is a specific value, not just a category:

```typescript
// String literal types
type Direction = "north" | "south" | "east" | "west";
function move(direction: Direction): void {
    console.log(`Moving ${direction}`);
}
move("north"); // ok
move("up");    // Error: '"up"' not assignable to Direction

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
function rollDice(): DiceRoll {
    return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

// Boolean literal types
type TrueFlag = true;
type FalseFlag = false;
```

## Template Literal Types (TS 4.1+)

Combine string literal types with template syntax:

```typescript
type EventName = `on${Capitalize<string>}`;

type HTMLEvent = `on${"click" | "hover" | "focus"}`;
// "onclick" | "onhover" | "onfocus"

type CSSProperty = `margin-${"top" | "right" | "bottom" | "left"}`;
// "margin-top" | "margin-right" | "margin-bottom" | "margin-left"

type Greeting = `Hello, ${string}`;

// Intrinsic string manipulation types:
type UppercaseGreeting = Uppercase<"hello">;     // "HELLO"
type LowercaseGreeting = Lowercase<"HELLO">;     // "hello"
type CapitalizeName = Capitalize<"alice">;        // "Alice"
type UncapitalizeName = Uncapitalize<"Alice">;    // "alice"
```

## Practical Example — API Endpoints

```typescript
type Endpoint = `/api/${string}`;

function fetchAPI(endpoint: Endpoint): Promise<unknown> {
    return fetch(endpoint).then(res => res.json());
}
fetchAPI("/api/users");  // ok
fetchAPI("/home");       // Error: not assignable to `/api/${string}`
```

---

# Enums

## Numeric Enums

Auto-incrementing numeric values starting from 0:

```typescript
enum Direction { Up, Down, Left, Right }
console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up" — reverse mapping

enum StatusCode { Success = 200, NotFound = 404, ServerError = 500 }
console.log(StatusCode.Success); // 200
```

## String Enums

```typescript
enum Color {
    Red = "#FF0000",
    Green = "#00FF00",
    Blue = "#0000FF"
}
console.log(Color.Red); // "#FF0000"
// No reverse mapping for string enums
```

## Const Enums

Compiled away — no runtime object:

```typescript
const enum Direction { Up, Down, Left, Right }
const dir = Direction.Up;
// Compiles to: const dir = 0;
// No Direction object exists at runtime
```

## Enum vs Union of Literals

| Feature | Enum | Union of Literals |
|---------|------|-------------------|
| Runtime object | Yes (unless `const`) | No |
| Reverse mapping | Numeric: yes | No |
| Iteration | Possible | Not directly |
| Tree-shakeable | No (unless `const`) | Yes |
| Type safety | Good | Excellent (no runtime overhead) |

Prefer union of literals unless you need runtime iteration or reverse mapping:

```typescript
// Prefer this:
type Status = "active" | "inactive" | "pending";

// Over this:
enum Status {
    Active = "active",
    Inactive = "inactive",
    Pending = "pending"
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a literal type? | Check if the type is a specific value like `"active"` or `5` |
| Is a template literal type used? | Check for backtick syntax with `${}` inside type position |
| What values does this literal union accept? | The explicit values listed |
| Is this an enum or a union? | Enum has `enum` keyword. Union uses `type` with `\|` |
| Does this enum exist at runtime? | `const enum` is erased. Regular enums exist |
| Is reverse mapping available? | Yes for numeric enums, no for string enums |
## Next Steps

[Back to Chapter 4](04-union-intersection.md): Union and Intersection Types
[Proceed to Chapter 6](06-generics.md): Generics to learn about generics.
