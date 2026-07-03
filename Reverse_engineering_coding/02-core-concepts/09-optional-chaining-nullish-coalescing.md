# Optional Chaining (?.) and Nullish Coalescing (??)

## The Problem — Safely Accessing Deeply Nested Properties

Without optional chaining, accessing nested properties requires verbose checks:

```javascript
const user = {
    profile: {
        address: {
            city: "Phnom Penh"
        }
    }
};

// Old way — verbose and repetitive
let city;
if (user && user.profile && user.profile.address) {
    city = user.profile.address.city;
}

// With optional chaining — clean and safe
let city = user?.profile?.address?.city;  // "Phnom Penh"

// If any part is null/undefined, returns undefined instead of crashing
const emptyUser = {};
emptyUser?.profile?.address?.city;  // undefined (no error!)
```

## Optional Chaining (?.)

Stops evaluation and returns `undefined` if the left side is `null` or `undefined`:

```javascript
// Property access
obj?.prop;
obj?.[expr];

// Method call
obj?.method();

// Array index
arr?.[0];
```

### Common Use Cases

```javascript
// API response handling
const userName = response?.data?.user?.name ?? "Anonymous";

// Optional method call
const result = callback?.();         // only calls if callback exists

// Dynamic property access
const key = "name";
const value = obj?.[key];           // safely access dynamic property

// Array that might be null
const first = arr?.[0];             // undefined if arr is null/undefined
```

## Nullish Coalescing (??)

Returns the right side ONLY if the left side is `null` or `undefined`:

```javascript
0 ?? "default";              // 0 (0 is not null/undefined)
"" ?? "default";             // "" (empty string is not null/undefined)
false ?? "default";          // false (false is not null/undefined)
null ?? "default";           // "default"
undefined ?? "default";      // "default"
```

### Contrast with ||

`||` replaces ANY falsy value (0, "", false). `??` only replaces null/undefined:

```javascript
// Using || — replaces valid falsy values!
let count = 0;
count || 10;                 // 10  ← wrong! 0 might be valid

// Using ?? — preserves valid falsy values
count ?? 10;                 // 0   ← correct! only null/undefined replaced
```

## Chaining ?. and ?? Together

```javascript
// Safe access with default
const city = user?.profile?.address?.city ?? "Unknown";

// Multiple defaults
const name = user?.name ?? "Guest";
const age = user?.age ?? 0;
const email = user?.email ?? "no-email@example.com";
```

## Limitations

```javascript
// Cannot use ?. on the left side of assignment
obj?.prop = "value";         // ❌ SyntaxError

// Cannot use ?. for dynamic property creation
// Use optional chaining for READING only

// ?. with delete is allowed
delete obj?.prop;            // ✅ OK
```

## Optional Chaining in Expressions

```javascript
// Template literals
console.log(`Hello, ${user?.name ?? "Guest"}!`);

// Ternary
const display = user?.isAdmin ? "Admin Panel" : "User Dashboard";

// Function parameters
function greet(user) {
    console.log(`Hello, ${user?.name?.toUpperCase() ?? "Guest"}!`);
}
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| Could this property be null/undefined? | Use `?.` to safely access nested properties |
| Is `??` needed instead of `||`? | Use `??` when `0`, `""`, or `false` are valid values |
| Is this a read or write operation? | `?.` only works for reading, not assignment |
| What is the fallback value? | After `??`, provide a sensible default |
| Could optional chaining hide bugs? | Overusing `?.` might silently swallow unexpected nulls — use intentionally |
## Next Steps

[Back to Module 1 Chapter 7](../01-foundations/07-arithmetic-operators.md): Arithmetic Operators
[Proceed to Chapter 10](10-comments-and-naming.md): Comments and Naming Conventions to learn about comments and naming conventions.
