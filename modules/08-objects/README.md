# Module 8: Objects

**Duration:** ~70 minutes  
**Video Timestamp:** 04:15:45 - 05:25:46

## Learning Objectives

- Create and use objects
- Access and modify object properties
- Use object methods
- Understand object references
- Work with nested objects
- Use destructuring and spread operators

## What are Objects?

Objects are collections of related data and functionality. They group together properties (variables) and methods (functions).

```javascript
// Creating an object
const person = {
  name: 'John Doe',
  age: 30,
  isEmployed: true
};
```

## Creating Objects

### Object Literal Syntax

```javascript
const emptyObject = {};
console.log(typeof emptyObject);  // 'object'

const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30
};
```

### Property Names (Keys)

```javascript
// Standard properties
const user = {
  name: 'Alice',
  age: 25
};

// Property names with spaces (use quotes)
const user2 = {
  'first name': 'Bob',
  'last-name': 'Smith'
};

// Numbers as property names
const numbers = {
  1: 'one',
  2: 'two'
};
```

## Accessing Properties

### Dot Notation

```javascript
const person = {
  name: 'John',
  age: 30
};

console.log(person.name);   // John
console.log(person.age);    // 30
```

### Bracket Notation

```javascript
const person = {
  name: 'John',
  age: 30
};

console.log(person['name']);  // John
console.log(person['age']);   // 30

// Required for spaces and special characters
const user = {
  'first name': 'Alice'
};
console.log(user['first name']);  // Alice
```

### Dynamic Property Access

```javascript
const person = {
  name: 'John',
  age: 30
};

const key = 'name';
console.log(person[key]);  // John

// Common pattern
function getProperty(obj, key) {
  return obj[key];
}
console.log(getProperty(person, 'age'));  // 30
```

## Modifying Objects

### Adding Properties

```javascript
const person = {
  name: 'John'
};

person.age = 30;                  // Add age
person['email'] = 'john@test.com'; // Add email

console.log(person);
// { name: 'John', age: 30, email: 'john@test.com' }
```

### Updating Properties

```javascript
const person = {
  name: 'John',
  age: 30
};

person.age = 31;           // Update age
person.name = 'Jane';      // Update name

console.log(person);
// { name: 'Jane', age: 31 }
```

### Deleting Properties

```javascript
const person = {
  name: 'John',
  age: 30,
  email: 'john@test.com'
};

delete person.email;       // Delete email property
// OR
delete person['email'];    // Same thing

console.log(person);
// { name: 'John', age: 30 }
```

## Object Methods

### Functions as Object Properties

```javascript
const person = {
  name: 'John',
  age: 30,
  // Method (function inside object)
  greet: function() {
    return 'Hello, my name is ' + this.name;
  }
};

console.log(person.greet());  // Hello, my name is John
```

### Method Shorthand Syntax

```javascript
const person = {
  name: 'John',
  age: 30,
  // Shorthand method syntax
  greet() {
    return 'Hello, my name is ' + this.name;
  },
  // Arrow function method (note: 'this' doesn't work as expected)
  sayAge: () => {
    return 'I am ' + this.age;  // 'this' is NOT person here
  }
};
```

### The `this` Keyword

`this` refers to the object the method belongs to:

```javascript
const person = {
  name: 'Alice',
  introduce() {
    return `Hi, I'm ${this.name}`;
  },
  birthday() {
    this.age++;
    return `Happy birthday! You are now ${this.age}`;
  }
};

console.log(person.introduce());  // Hi, I'm Alice
console.log(person.birthday());   // Happy birthday! You are now 31
```

## Object References

### Reference vs Value

Objects are stored by reference, not by value:

```javascript
// Primitives (by value)
let x = 10;
let y = x;
y = 20;
console.log(x);  // 10 (unchanged)

// Objects (by reference)
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;
console.log(obj1.value);  // 20 (changed!)
```

### Comparing Objects

```javascript
const obj1 = { name: 'John' };
const obj2 = { name: 'John' };
const obj3 = obj1;

console.log(obj1 === obj2);  // false (different references)
console.log(obj1 === obj3);  // true (same reference)

// To compare values, you need to compare each property
function isEqual(obj1, obj2) {
  return obj1.name === obj2.name && obj1.age === obj2.age;
}
```

## Nested Objects

Objects can contain other objects:

```javascript
const person = {
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'New York',
    zipCode: '10001'
  },
  phone: {
    home: '555-1234',
    work: '555-5678'
  }
};

console.log(person.address.city);        // New York
console.log(person.phone.home);           // 555-1234
console.log(person['address']['zipCode']);// 10001
```

## Object Methods

### Object.keys()

Get all property names:

```javascript
const person = { name: 'John', age: 30, city: 'NYC' };

console.log(Object.keys(person));
// ['name', 'age', 'city']
```

### Object.values()

Get all property values:

```javascript
const person = { name: 'John', age: 30, city: 'NYC' };

console.log(Object.values(person));
// ['John', 30, 'NYC']
```

### Object.entries()

Get all key-value pairs:

```javascript
const person = { name: 'John', age: 30 };

console.log(Object.entries(person));
// [['name', 'John'], ['age', 30]]

// Loop through entries
for (let [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
// name: John
// age: 30
```

### Object.assign()

Copy or merge objects:

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// Merge objects
const merged = Object.assign({}, obj1, obj2);
console.log(merged);  // { a: 1, b: 3, c: 4 }

// Copy object
const copy = Object.assign({}, obj1);
```

## Destructuring

Extract values from objects into variables:

### Basic Destructuring

```javascript
const person = { name: 'John', age: 30, city: 'NYC' };

// Old way
const name = person.name;
const age = person.age;

// Destructuring
const { name, age } = person;
console.log(name);  // John
console.log(age);   // 30
```

### Rename Variables

```javascript
const person = { name: 'John', age: 30 };

const { name: firstName, age: years } = person;
console.log(firstName);  // John
console.log(years);     // 30
```

### Default Values

```javascript
const person = { name: 'John' };

const { name, age = 25, city = 'Unknown' } = person;
console.log(name);  // John
console.log(age);   // 25 (default)
console.log(city);  // Unknown (default)
```

### In Function Parameters

```javascript
function greet({ name, age }) {
  return `Hello, ${name}! You are ${age} years old.`;
}

const person = { name: 'Alice', age: 30 };
console.log(greet(person));  // Hello, Alice! You are 30 years old.
```

## Spread Operator

Copy or merge objects:

### Spread in Objects

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Merge objects
const merged = { ...obj1, ...obj2 };
console.log(merged);  // { a: 1, b: 2, c: 3, d: 4 }

// Override properties
const updated = { ...obj1, b: 10 };
console.log(updated);  // { a: 1, b: 10 }

// Add new properties
const extended = { ...obj1, c: 3 };
console.log(extended);  // { a: 1, b: 2, c: 3 }
```

### Copy Objects (Not Reference)

```javascript
const original = { name: 'John', age: 30 };
const copy = { ...original };

copy.name = 'Jane';  // Only copy is changed
console.log(original.name);  // John (unchanged!)
```

### Spread vs Object.assign()

```javascript
const obj1 = { a: 1 };

// These are equivalent:
const copy1 = { ...obj1 };
const copy2 = Object.assign({}, obj1);
```

## Useful Patterns

### Factory Functions

Functions that create objects:

```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return `Hi, I'm ${this.name}`;
    }
  };
}

const john = createPerson('John', 30);
const jane = createPerson('Jane', 25);

console.log(john.greet());  // Hi, I'm John
console.log(jane.greet()); // Hi, I'm Jane
```

### Check if Property Exists

```javascript
const person = { name: 'John', age: 30 };

console.log('name' in person);        // true
console.log('email' in person);      // false
console.log(person.hasOwnProperty('name'));  // true

// Or just check if undefined
console.log(person.email === undefined);  // true
```

### Optional Chaining

Safely access nested properties:

```javascript
const person = {
  name: 'John',
  address: {
    city: 'NYC'
  }
};

// Old way
const city = person.address && person.address.city;

// Optional chaining (modern)
const city = person?.address?.city;  // NYC
const zip = person?.address?.zipCode;  // undefined (no error!)
const country = person?.address?.country?.name;  // undefined
```

### Nullish Coalescing

```javascript
const person = { name: 'John', age: 0 };

// Old way
const displayAge = person.age !== undefined ? person.age : 'Unknown';

// Nullish coalescing
const displayAge2 = person.age ?? 'Unknown';  // 0 (not replaced!)
const displayName = person.nickname ?? person.name;  // John (uses name)
```

## Practical Examples

### User Object with Methods

```javascript
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  getInitials() {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  },
  
  updateEmail(newEmail) {
    if (newEmail.includes('@')) {
      this.email = newEmail;
      return true;
    }
    return false;
  }
};

console.log(user.getFullName());  // John Doe
console.log(user.getInitials());  // JD
console.log(user.updateEmail('new@email.com'));  // true
console.log(user.email);  // new@email.com
```

### Cart System

```javascript
const cart = {
  items: [],
  
  addItem(product, quantity = 1) {
    const existing = this.items.find(item => item.product === product);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  },
  
  removeItem(product) {
    this.items = this.items.filter(item => item.product !== product);
  },
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  clear() {
    this.items = [];
  }
};

cart.addItem('Apple', 3);
cart.addItem('Banana', 2);
cart.addItem('Apple');  // Increases to 4
console.log(cart.items);  // [{product: 'Apple', quantity: 4}, {product: 'Banana', quantity: 2}]
console.log(cart.getTotal());  // 6
```

## Practice Exercises

### Exercise 8.1: Book Object
Create a book object with title, author, year, and methods.

```javascript
const book = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  year: 1925,
  
  getSummary() {
    return `"${this.title}" by ${this.author}, published in ${this.year}`;
  },
  
  isClassic() {
    return this.year < 1950;
  }
};

console.log(book.getSummary());  // "The Great Gatsby" by F. Scott Fitzgerald...
console.log(book.isClassic());   // true
```

### Exercise 8.2: Bank Account
Create a simple bank account object.

```javascript
const account = {
  accountNumber: '1234567890',
  holderName: 'John Doe',
  balance: 1000,
  
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return `Deposited $${amount}. New balance: $${this.balance}`;
    }
    return 'Invalid amount';
  },
  
  withdraw(amount) {
    if (amount > this.balance) {
      return 'Insufficient funds';
    }
    if (amount <= 0) {
      return 'Invalid amount';
    }
    this.balance -= amount;
    return `Withdrew $${amount}. New balance: $${this.balance}`;
  }
};

console.log(account.deposit(500));   // Deposited $500. New balance: $1500
console.log(account.withdraw(200)); // Withdrew $200. New balance: $1300
console.log(account.withdraw(5000)); // Insufficient funds
```

### Exercise 8.3: Object Destructuring
Given this object, extract values using destructuring.

```javascript
const config = {
  server: 'localhost',
  port: 3000,
  debug: true,
  database: {
    host: '127.0.0.1',
    name: 'myapp'
  }
};

// Extract server, port, and debug
const { server, port, debug } = config;
console.log(server);  // localhost

// Extract with renaming
const { server: host, port: portNumber } = config;
console.log(host);      // localhost
console.log(portNumber); // 3000

// Nested destructuring
const { database: { host: dbHost, name: dbName } } = config;
console.log(dbHost);  // 127.0.0.1
console.log(dbName);  // myapp
```

### Exercise 8.4: Merge Objects
Create a function to merge default settings with user settings.

```javascript
function mergeSettings(defaults, userSettings) {
  return {
    ...defaults,
    ...userSettings
  };
}

const defaults = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 14
};

const userSettings = {
  theme: 'dark',
  fontSize: 16
};

const finalSettings = mergeSettings(defaults, userSettings);
console.log(finalSettings);
// { theme: 'dark', language: 'en', notifications: true, fontSize: 16 }
```

## Summary

- Objects store related data and functionality together
- Access properties with dot notation or brackets
- Methods are functions inside objects
- Use `this` to refer to the object
- Objects are stored by reference, not by value
- Destructuring extracts values from objects
- Spread operator copies or merges objects
- Optional chaining (`?.`) safely accesses nested properties

## Next Steps

Proceed to Module 9: DOM Manipulation to learn how to interact with web pages.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)