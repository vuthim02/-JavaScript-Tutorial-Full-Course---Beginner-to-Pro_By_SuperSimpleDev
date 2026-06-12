/**
 * PART 18 — TypeScript: types, interfaces, generics
 * Compile with: npx tsc part18-typescript.ts (or ts-node part18-typescript.ts)
 * Run JS output with: node part18-typescript.js
 */

// ---------------------------------------------------------------
// 1. Basic types — annotations on variables
// ---------------------------------------------------------------

// TypeScript adds type annotations after a colon
const userName: string = 'Alice';
const userAge: number = 30;
const isActive: boolean = true;
const tags: string[] = ['admin', 'user', 'moderator'];
const mixed: (string | number)[] = [1, 'two', 3];

// Union types — value can be one of several types
let id: string | number;
id = 'abc123';
id = 456;

console.log('Basic types:', { userName, userAge, isActive, tags });

// ---------------------------------------------------------------
// 2. Interfaces — define the shape of an object
// ---------------------------------------------------------------

interface User {
  readonly id: number;       // Cannot be changed after creation
  name: string;
  email: string;
  age?: number;              // Optional property (may be undefined)
  role: 'admin' | 'user' | 'moderator'; // String literal union
}

// Implement the interface
const user1: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  role: 'admin',
};

// user1.id = 2; // Error: Cannot assign to 'id' because it is a read-only property

console.log('Interface:', user1);

// Interface with methods
interface Printable {
  print(): string;
}

// Class implementing an interface
class Document implements Printable {
  constructor(private title: string, private content: string) {}

  print(): string {
    return `Title: ${this.title}\nContent: ${this.content}`;
  }
}

const doc = new Document('Hello', 'TypeScript is great!');
console.log('Class with interface:', doc.print());

// ---------------------------------------------------------------
// 3. Type aliases — alternative to interfaces
// ---------------------------------------------------------------

type Point = {
  x: number;
  y: number;
};

type Color = 'red' | 'green' | 'blue';

type ColoredPoint = Point & { color: Color }; // Intersection type

const cp: ColoredPoint = { x: 10, y: 20, color: 'red' };
console.log('Type alias:', cp);

// ---------------------------------------------------------------
// 4. Generics — type-safe reusable code
// ---------------------------------------------------------------

// Generic function — works with any type T
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = firstElement([1, 2, 3]); // type: number
const firstStr = firstElement(['a', 'b', 'c']); // type: string
console.log('Generic function:', firstNum, firstStr);

// Generic interface
interface Repository<T> {
  getById(id: number): T | undefined;
  getAll(): T[];
  create(item: T): void;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];

  getById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getAll(): User[] {
    return [...this.users];
  }

  create(user: User): void {
    this.users.push(user);
  }
}

const userRepo = new UserRepository();
userRepo.create(user1);
console.log('Generic repository:', userRepo.getById(1));

// Generic with constraint (T must have a `name` property)
interface HasName {
  name: string;
}

function greet<T extends HasName>(entity: T): string {
  return `Hello, ${entity.name}!`;
}

console.log('Generic constraint:', greet({ name: 'Alice', age: 30 }));

// ---------------------------------------------------------------
// 5. Utility types — built-in type transformations
// ---------------------------------------------------------------

// Partial<T> — makes all properties optional
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const updated = updateUser(user1, { age: 31 });
console.log('Partial utility:', updated);

// Pick<T, K> — select specific properties
type UserPublicInfo = Pick<User, 'id' | 'name'>;

const publicInfo: UserPublicInfo = { id: 1, name: 'Alice' };
console.log('Pick utility:', publicInfo);

// Omit<T, K> — exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// ---------------------------------------------------------------
// 6. Function type annotations
// ---------------------------------------------------------------

// Regular function with types
function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  const subtotal = price * quantity;
  return subtotal - subtotal * discount;
}

console.log('Typed function:', calculateTotal(100, 2, 0.1)); // 180

// Arrow function with types
const formatPrice = (amount: number, currency: string = 'USD'): string => {
  return `${currency} ${amount.toFixed(2)}`;
};

console.log('Typed arrow:', formatPrice(99.99));

// ---------------------------------------------------------------
// 7. Type assertions — tell TS what you know that it doesn't
// ---------------------------------------------------------------

// The DOM in TypeScript
// In a browser: const input = document.getElementById('email') as HTMLInputElement;
// In a browser: input.value = 'test@example.com'; // TS knows it's an input

// ---------------------------------------------------------------
// 8. Enums — named constants
// ---------------------------------------------------------------

enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

function respond(status: HttpStatus): string {
  return `Responding with status ${status}`;
}

console.log('Enum:', respond(HttpStatus.OK));
console.log('Enum value:', HttpStatus.NotFound); // 404

// ---------------------------------------------------------------
// 9. Type narrowing — refining types within conditionals
// ---------------------------------------------------------------

function processValue(value: string | number | null): string {
  // TypeScript narrows the type within each branch
  if (value === null) {
    return 'No value';
  }
  if (typeof value === 'string') {
    return `String: ${value.toUpperCase()}`;
  }
  // At this point TypeScript knows value is a number
  return `Number: ${value.toFixed(2)}`;
}

console.log('Type narrowing:', processValue('hello'));
console.log('Type narrowing:', processValue(42));
console.log('Type narrowing:', processValue(null));

// ---------------------------------------------------------------
// 10. async functions with types
// ---------------------------------------------------------------

async function fetchUser(id: number): Promise<User> {
  // Simulate async operation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: 'Alice', email: 'alice@example.com', role: 'user' });
    }, 100);
  });
}

async function main() {
  const user = await fetchUser(1);
  console.log('Async with types:', user);
}

main();

// Export for module use (if this were a real module)
export { User, Point, Repository, calculateTotal, processValue };
