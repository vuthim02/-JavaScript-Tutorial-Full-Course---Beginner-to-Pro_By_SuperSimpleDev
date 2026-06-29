# Union and Intersection Types

<img src="https://media.giphy.com/media/SvFocn0wNMx0iv2rYz/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Union Types

A value can be one of several types, separated by `|`:

```typescript
type ID = string | number;

function printID(id: ID): void {
    console.log(`ID: ${id}`);
}

printID("abc123"); // ok
printID(12345);    // ok
printID(true);     // Error: boolean not assignable to ID
```

## Narrowing Unions

To use a union, narrow it to a specific branch:

```typescript
function processID(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase(); // id is string here
    }
    return id.toFixed(0); // id is number here
}
```

## Intersection Types

Combine multiple types into one, separated by `&`:

```typescript
interface HasName { name: string; }
interface HasAge { age: number; }

type Person = HasName & HasAge;

const person: Person = { name: "Alice", age: 30 };
// person has BOTH name and age
```

## Union vs Intersection in Practice

```typescript
// Union — "either or"
type Success = { status: "success"; data: string };
type Error = { status: "error"; error: string };
type Result = Success | Error;

function handleResult(result: Result): void {
    if (result.status === "success") {
        console.log(result.data); // narrowed to Success
    } else {
        console.log(result.error); // narrowed to Error
    }
}

// Intersection — "all combined"
type HasEmail = { email: string };
type HasPhone = { phone: string };
type Contact = HasEmail & HasPhone;

const contact: Contact = {
    email: "alice@example.com",
    phone: "555-1234"
};
```

## Key Differences

| Aspect | Union (`\|`) | Intersection (`&`) |
|--------|--------------|-------------------|
| Meaning | Either/or — value satisfies one | All combined — value satisfies all |
| Usage | `string \| number` | `HasName & HasAge` |
| Narrowing | Required before using specific members | Not needed — all members available |
| Conflicts | Not possible (only one branch used) | Possible if same property has incompatible types |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a union or intersection? | `\|` = union, `&` = intersection |
| How is the union narrowed? | Check for `typeof`, `instanceof`, or property checks |
| Can intersection conflicts happen? | Yes — if both types define the same property with incompatible types |
## Next Steps

[Back to Chapter 3](03-interfaces-type-aliases.md): Interfaces vs Type Aliases
[Proceed to Chapter 5](05-literal-enums.md): Literal Types and Template Literal Types to learn about literal types and template literal types.
