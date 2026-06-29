# Object Destructuring & Spread Operator

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Basic Object Destructuring

Extract properties into variables with the same name.

```javascript
const user = { name: "John", age: 25, city: "Boston" };

const { name, age } = user;
console.log(name); // "John"
console.log(age);  // 25
```

## Renaming Variables

```javascript
const user = { name: "John", age: 25 };
const { name: userName, age: userAge } = user;
console.log(userName); // "John"
console.log(userAge);  // 25
```

## Default Values

```javascript
const user = { name: "John" };
const { name, age = 18, city = "Unknown" } = user;
console.log(name); // "John"
console.log(age);  // 18 — default applied
console.log(city); // "Unknown"

// Default only applies when value is undefined
const user2 = { name: "Jane", age: null };
const { age: a = 18 } = user2;
console.log(a); // null — default does NOT apply for null
```

## Nested Destructuring

```javascript
const user = {
    name: "John",
    address: { city: "Boston", zip: "02101" }
};

const { address: { city, zip } } = user;
console.log(city); // "Boston"
console.log(zip);  // "02101"

// With rename
const { address: { city: userCity } } = user;
console.log(userCity); // "Boston"
```

## Rest Pattern in Destructuring

```javascript
const user = { name: "John", age: 25, city: "Boston", role: "admin" };
const { name, ...rest } = user;
console.log(name); // "John"
console.log(rest); // { age: 25, city: "Boston", role: "admin" }
```

## Destructuring in Function Parameters

```javascript
function printUser({ name, age, city = "Unknown" }) {
    console.log(`${name}, ${age}, from ${city}`);
}

printUser({ name: "John", age: 25, city: "Boston" });
// "John, 25, from Boston"

printUser({ name: "Jane", age: 30 });
// "Jane, 30, from Unknown"
```

### Multiple Parameters with Destructuring

```javascript
function createProfile(
    { name, age },
    { defaults = {}, ...options } = {}
) {
    return { name, age, ...defaults, ...options };
}
```

## Object Spread Operator (...)

### Copying Objects (Shallow)

```javascript
const original = { a: 1, b: 2 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2 }
console.log(copy === original); // false — different reference
```

### Merging Objects

```javascript
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const config = { ...defaults, ...userPrefs };
console.log(config); // { theme: "dark", lang: "en" }
```

Later properties overwrite earlier ones.

### Adding Properties During Copy

```javascript
const user = { name: "John", age: 25 };
const withId = { id: 1, ...user };
console.log(withId); // { id: 1, name: "John", age: 25 }
```

### Spread is Shallow

```javascript
const original = { nested: { value: 1 } };
const copy = { ...original };
copy.nested.value = 99;
console.log(original.nested.value); // 99 — shared reference!
```

For deep cloning: `structuredClone(original)` or `JSON.parse(JSON.stringify(original))`.

### Spread Override Pattern

```javascript
function createUser(base, overrides = {}) {
    return {
        role: "user",
        active: true,
        ...base,
        ...overrides,
    };
}
```

## Dynamic Destructuring

```javascript
const user = { name: "John", age: 25 };

function getProperty(obj, key) {
    const { [key]: value } = obj;
    return value;
}

console.log(getProperty(user, "name")); // "John"
```

## Destructuring with Rename and Default Together

```javascript
const user = { name: "John" };
const { name: userName = "Anonymous", age: userAge = 18 } = user;
console.log(userName); // "John"
console.log(userAge);  // 18
```

## Practical Patterns

### Swapping Variables

```javascript
let a = 1, b = 2;
({ a, b } = { a: b, b: a }); // Now a=2, b=1
```

### Return Multiple Values from Function

```javascript
function getUser() {
    return { id: 1, name: "John", role: "admin" };
}

const { id, name, role } = getUser();
```

### Ignoring Properties

```javascript
const user = { name: "John", age: 25, temp: "discard" };
const { temp, ...clean } = user;
console.log(clean); // { name: "John", age: 25 }
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What properties are extracted? | The variable names on the left side of `{}` |
| Is `{...obj}` a deep copy? | No — shallow only. Nested objects are shared |
| What does rest `...rest` capture? | All remaining own enumerable properties not destructured |
| Can you rename during destructuring? | Yes: `{ originalName: newName }` |
| When does default value apply? | Only when destructured value is `undefined` (not `null`) |
| Is order important in merge? | Yes — later spreads overwrite earlier properties |
| Can you destructure null/undefined? | No — throws TypeError. Always guard: `obj ?? {}` |
## Next Steps

[Back to Chapter 8](08-object-static-methods.md): Object Static Methods: keys, values, entries, assign, is & More
[Proceed to Chapter 10](10-getters-setters.md): Getters & Setters in Plain Objects to learn about getters & setters in plain objects.
