# JavaScript Classes — Full Tactical Guide

A class is a **blueprint for creating objects**.

Without classes:

```js
const user1 = {
  name: "Alice",
  age: 25,

  greet() {
    console.log(`Hello ${this.name}`);
  }
};

const user2 = {
  name: "Bob",
  age: 30,

  greet() {
    console.log(`Hello ${this.name}`);
  }
};
```

Problem: duplicated code.

Classes solve that.

---

# 1. Basic Class

```js
class User {

}
```

Create object:

```js
const user = new User();
```

`new` creates an object from the class.

---

# 2. Constructor

Constructor runs automatically when using `new`.

```js
class User {

  constructor() {
    console.log("User created");
  }

}

const user = new User();
```

Output:

```text
User created
```

---

# 3. Constructor Parameters

```js
class User {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}

const user = new User("Alice", 25);

console.log(user);
```

Output:

```js
User {
  name: 'Alice',
  age: 25
}
```

---

# 4. Understanding `this`

```js
class User {

  constructor(name) {
    this.name = name;
  }

}

const user = new User("Alice");
```

Internally:

```js
user.name = "Alice";
```

`this` means:

```text
Current object
```

---

# 5. Methods

Methods are functions inside a class.

```js
class User {

  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }

}

const user = new User("Alice");

user.greet();
```

Output:

```text
Hello Alice
```

---

# 6. Multiple Methods

```js
class User {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }

  showAge() {
    console.log(this.age);
  }

}

const user = new User("Alice", 25);

user.greet();
user.showAge();
```

Output:

```text
Hello Alice
25
```

---

# 7. Updating Properties

```js
class User {

  constructor(name) {
    this.name = name;
  }

  changeName(newName) {
    this.name = newName;
  }

}

const user = new User("Alice");

user.changeName("Bob");

console.log(user.name);
```

Output:

```text
Bob
```

---

# 8. Returning Values

```js
class User {

  constructor(age) {
    this.age = age;
  }

  getAge() {
    return this.age;
  }

}

const user = new User(25);

console.log(user.getAge());
```

Output:

```text
25
```

---

# 9. Real Project Example

Bank account:

```js
class BankAccount {

  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }

  checkBalance() {
    return this.balance;
  }

}

const account =
new BankAccount("Alice", 1000);

account.deposit(500);

account.withdraw(200);

console.log(account.checkBalance());
```

Output:

```text
1300
```

---

# 10. Class Expression

Classes can be stored in variables.

```js
const User = class {

  constructor(name) {
    this.name = name;
  }

};

const user = new User("Alice");
```

---

# 11. Getters

Getter behaves like a property.

```js
class User {

  constructor(name) {
    this.name = name;
  }

  get displayName() {
    return this.name.toUpperCase();
  }

}

const user = new User("Alice");

console.log(user.displayName);
```

Output:

```text
ALICE
```

Notice:

```js
user.displayName
```

Not:

```js
user.displayName()
```

---

# 12. Setters

```js
class User {

  constructor(name) {
    this.name = name;
  }

  set displayName(value) {
    this.name = value;
  }

}

const user = new User("Alice");

user.displayName = "Bob";

console.log(user.name);
```

Output:

```text
Bob
```

---

# 13. Static Methods

Static belongs to class itself.

```js
class MathHelper {

  static add(a, b) {
    return a + b;
  }

}

console.log(
  MathHelper.add(5, 3)
);
```

Output:

```text
8
```

Wrong:

```js
const m = new MathHelper();

m.add();
```

Error.

Static methods belong to class.

---

# 14. Static Properties

```js
class User {

  static count = 0;

  constructor() {
    User.count++;
  }

}

new User();
new User();
new User();

console.log(User.count);
```

Output:

```text
3
```

---

# 15. Inheritance

One class extends another.

```js
class Animal {

  eat() {
    console.log("Eating");
  }

}

class Dog extends Animal {

}

const dog = new Dog();

dog.eat();
```

Output:

```text
Eating
```

---

# 16. Overriding

```js
class Animal {

  speak() {
    console.log("Animal sound");
  }

}

class Dog extends Animal {

  speak() {
    console.log("Woof");
  }

}

const dog = new Dog();

dog.speak();
```

Output:

```text
Woof
```

---

# 17. Super

Access parent constructor.

```js
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Dog extends Animal {

  constructor(name, breed) {
    super(name);

    this.breed = breed;
  }

}

const dog =
new Dog("Rocky", "Husky");

console.log(dog);
```

Output:

```js
Dog {
  name: 'Rocky',
  breed: 'Husky'
}
```

---

# 18. Private Fields

Modern JavaScript:

```js
class BankAccount {

  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }

}

const account =
new BankAccount();

account.deposit(100);

console.log(
  account.getBalance()
);
```

Output:

```text
100
```

Not allowed:

```js
account.#balance
```

Error.

---

# 19. Encapsulation

Protect internal state.

```js
class User {

  #password;

  constructor(password) {
    this.#password = password;
  }

  verify(password) {
    return this.#password === password;
  }

}
```

User cannot access password directly.

---

# 20. Full Real-World Example

```js
class Employee {

  static totalEmployees = 0;

  #salary;

  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this.#salary = salary;

    Employee.totalEmployees++;
  }

  getSalary() {
    return this.#salary;
  }

  setSalary(amount) {
    if (amount > 0) {
      this.#salary = amount;
    }
  }

  introduce() {
    console.log(
      `I am ${this.name}, ${this.position}`
    );
  }

  static companyInfo() {
    console.log(
      "Welcome to company"
    );
  }

}

const emp1 =
new Employee(
  "Alice",
  "Developer",
  5000
);

emp1.introduce();

console.log(
  emp1.getSalary()
);

Employee.companyInfo();

console.log(
  Employee.totalEmployees
);
```

---

## Tactical Learning Order

Master these in order:

```text
1. Objects
2. this
3. constructor
4. methods
5. new
6. getters
7. setters
8. static
9. inheritance
10. super
11. private fields
12. encapsulation
13. real-world design
```

If you can build these 5 projects using classes, you'll understand classes deeply:

```text
1. Bank Account
2. User Authentication System
3. Shopping Cart
4. Student Management System
5. RPG Game Characters
```

These projects force you to use constructors, methods, inheritance, encapsulation, static members, and object interactions—the core of JavaScript class design.
