# Module 17: Testing

**Duration:** ~60 minutes  
**Video Timestamp:** (between External Libraries and OOP)

## Learning Objectives

- Understand why testing is important
- Learn manual vs automated testing
- Write unit tests with Jasmine
- Create test suites and test cases
- Test edge cases and error handling
- Use mocks for testing
- Write integration tests

## Why Testing?

### Manual Testing

Testing by hand every time you make changes:
- Time-consuming
- Error-prone
- Not scalable

### Automated Testing

Let the computer test your code:
- Fast
- Reliable
- Can run on every change

## Types of Testing

### Unit Tests
Test individual functions/blocks in isolation:
```javascript
describe('addToCart', () => {
  it('adds a new product to cart', () => {
    // Test one specific function
  });
});
```

### Integration Tests
Test how multiple parts work together:
```javascript
describe('Checkout', () => {
  it('processes an order end-to-end', () => {
    // Test the whole flow
  });
});
```

### Test Coverage
How much of your code is tested:
- 100% coverage = every line tested
- Higher coverage = more confidence

## Jasmine Testing Framework

Jasmine is a behavior-driven testing framework for JavaScript.

### Setup

```html
<!-- Download Jasmine from https://jasmine.github.io/ -->
<link rel="stylesheet" href="lib/jasmine.min.css">
<script src="lib/jasmine.min.js"></script>
<script src="lib/jasmine-html.min.js"></script>
<script src="lib/boot.min.js"></script>

<!-- Your source code -->
<script src="src/cart.js"></script>

<!-- Your tests -->
<script src="spec/cart.spec.js"></script>
```

### Basic Test Structure

```javascript
// spec/cart.spec.js

// Test Suite - group related tests
describe('Shopping Cart', () => {
  
  // Test - a single test case
  it('should start empty', () => {
    const cart = new Cart();
    expect(cart.items.length).toBe(0);
  });
  
  it('should add items', () => {
    const cart = new Cart();
    cart.addItem({ name: 'Apple', price: 1.5 });
    expect(cart.items.length).toBe(1);
  });
  
});
```

## Matchers

Jasmine provides various matchers for assertions:

### Common Matchers

```javascript
// Equality
expect(value).toBe(expected);        // === (strict)
expect(value).toEqual(expected);     // deep equality

// Boolean
expect(value).toBeTruthy();          // truthy check
expect(value).toBeFalsy();           // falsy check
expect(value).toBe(true);            // exact boolean

// Null/Undefined
expect(value).toBeNull();            // === null
expect(value).toBeUndefined();       // === undefined
expect(value).toBeDefined();         // !== undefined

// Numbers
expect(value).toBeGreaterThan(n);
expect(value).toBeLessThan(n);
expect(value).toBeCloseTo(n, decimals);

// Strings
expect(value).toContain(substring);
expect(value).toMatch(/regex/);

// Arrays
expect(array).toContain(item);
expect(array).toHaveSize(n);

// Objects
expect(object).toHaveProperty('name');
expect(object).toEqual({
  name: 'John',
  age: 30
});

// Negation
expect(value).not.toBe(0);
```

### Custom Matchers

```javascript
beforeEach(() => {
  jasmine.addMatchers({
    toBeDivisibleBy: () => ({
      compare: (actual, expected) => {
        const pass = actual % expected === 0;
        return {
          pass,
          message: `Expected ${actual} ${pass ? 'not ' : ''}to be divisible by ${expected}`
        };
      }
    })
  });
});

// Usage
expect(10).toBeDivisibleBy(5);  // passes
```

## Test Cases

### Basic Test Cases

```javascript
describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  it('should handle zero', () => {
    expect(add(5, 0)).toBe(5);
  });
  
  it('should handle negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });
});
```

### Edge Cases

```javascript
describe('divide', () => {
  it('should divide positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
  
  it('should return NaN for invalid input', () => {
    expect(isNaN(divide(10, 0))).toBe(true);
  });
  
  it('should handle decimals', () => {
    expect(divide(10, 4)).toBeCloseTo(2.5, 2);
  });
});
```

## Test Suites

Group related tests:

```javascript
describe('Shopping Cart', () => {
  
  let cart;
  
  // Run before each test
  beforeEach(() => {
    cart = new Cart();
  });
  
  // Run after each test
  afterEach(() => {
    cart.clear();
  });
  
  describe('addItem', () => {
    it('should add a new item', () => {
      cart.addItem({ name: 'Apple', price: 1.5 });
      expect(cart.items.length).toBe(1);
    });
    
    it('should increase quantity for existing item', () => {
      cart.addItem({ id: 1, name: 'Apple', price: 1.5 });
      cart.addItem({ id: 1, name: 'Apple', price: 1.5 });
      expect(cart.items[0].quantity).toBe(2);
    });
  });
  
  describe('removeItem', () => {
    it('should remove an item', () => {
      cart.addItem({ id: 1, name: 'Apple', price: 1.5 });
      cart.removeItem(1);
      expect(cart.items.length).toBe(0);
    });
  });
  
  describe('getTotal', () => {
    it('should calculate total correctly', () => {
      cart.addItem({ name: 'Apple', price: 1.5, quantity: 2 });
      cart.addItem({ name: 'Banana', price: 0.5, quantity: 3 });
      expect(cart.getTotal()).toBe(4.5);
    });
  });
  
});
```

## Spies (Mocks)

Spies let you track function calls and replace behavior:

### Creating Spies

```javascript
describe('Cart', () => {
  it('should call save when adding item', () => {
    spyOn(cart, 'save');
    
    cart.addItem({ name: 'Apple', price: 1.5 });
    
    expect(cart.save).toHaveBeenCalled();
    expect(cart.save).toHaveBeenCalledTimes(1);
  });
  
  it('should pass correct arguments to save', () => {
    spyOn(cart, 'save');
    
    cart.addItem({ name: 'Apple', price: 1.5 });
    
    expect(cart.save).toHaveBeenCalledWith(
      jasmine.objectContaining({ items: jasmine.any(Array) })
    );
  });
});
```

### Mocking Return Values

```javascript
it('should load saved cart', () => {
  spyOn(localStorage, 'getItem').and.returnValue(
    JSON.stringify({ items: [{ name: 'Apple' }] })
  );
  
  const cart = new Cart();
  cart.load();
  
  expect(cart.items.length).toBe(1);
});
```

### Mocking Functions

```javascript
it('should call onComplete callback', () => {
  const callback = jasmine.createSpy('callback');
  
  processOrder(123, callback);
  
  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenCalledWith({ orderId: 123, status: 'success' });
});
```

### Fake Async Operations

```javascript
beforeEach(() => {
  jasmine.clock().install();
});

afterEach(() => {
  jasmine.clock().uninstall();
});

it('should call callback after delay', () => {
  const callback = jasmine.createSpy('callback');
  
  setTimeout(callback, 1000);
  
  expect(callback).not.toHaveBeenCalled();
  
  jasmine.clock().tick(1001);
  
  expect(callback).toHaveBeenCalled();
});
```

## Integration Tests

Test complete workflows:

```javascript
describe('Checkout Flow', () => {
  let page;
  
  beforeEach(() => {
    // Load the page
    document.body.innerHTML = `
      <div class="cart-page">
        <div class="cart-items"></div>
        <div class="cart-total">$0.00</div>
        <button class="checkout-btn">Checkout</button>
      </div>
    `;
    initCart();
  });
  
  it('should update total when adding item', () => {
    addToCart({ name: 'Apple', price: 1.5 });
    addToCart({ name: 'Banana', price: 0.5 });
    
    expect(getCartTotal()).toBe(2.0);
    expect(document.querySelector('.cart-total').textContent).toBe('$2.00');
  });
  
  it('should remove item from page', () => {
    addToCart({ id: 1, name: 'Apple', price: 1.5 });
    deleteItem(1);
    
    expect(document.querySelectorAll('.cart-item').length).toBe(0);
  });
  
  it('should process checkout', () => {
    addToCart({ name: 'Apple', price: 1.5 });
    clickCheckout();
    
    expect(document.querySelector('.order-confirmation')).not.toBeNull();
  });
});
```

## Testing Async Code

```javascript
describe('Async Operations', () => {
  
  it('should handle successful fetch', async () => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'John' })
      })
    );
    
    const user = await fetchUser(1);
    expect(user.name).toBe('John');
  });
  
  it('should handle fetch error', async () => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: false,
        status: 404
      })
    );
    
    await expectAsync(fetchUser(999)).toBeRejectedWithError('User not found');
  });
  
});
```

## Setup and Teardown

```javascript
describe('Suite', () => {
  
  // Run once before all tests in this suite
  beforeAll(() => {
    // Setup expensive operations
  });
  
  // Run once after all tests
  afterAll(() => {
    // Cleanup
  });
  
  // Run before each test
  beforeEach(() => {
    // Reset state
    cart.clear();
    localStorage.clear();
  });
  
  // Run after each test
  afterEach(() => {
    // Cleanup after each test
  });
  
  // Tests...
});
```

## Running Tests

### In Browser

```bash
# Open SpecRunner.html in browser
open SpecRunner.html
```

### With Node.js

```bash
# Install jasmine
npm install jasmine --save-dev

# Initialize
npx jasmine init

# Run tests
npx jasmine
```

### With npm scripts

```json
{
  "scripts": {
    "test": "jasmine",
    "test:watch": "jasmine --watch"
  }
}
```

## Practice Exercises

### Exercise 17.1: Test Basic Functions

```javascript
// Write tests for these functions:
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// Solution:
describe('Math Functions', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    
    it('should handle negatives', () => {
      expect(add(-1, -1)).toBe(-2);
    });
  });
  
  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });
  });
  
  describe('divide', () => {
    it('should divide numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });
    
    it('should throw on division by zero', () => {
      expect(() => divide(10, 0)).toThrowError('Division by zero');
    });
  });
});
```

### Exercise 17.2: Test Cart Functions

```javascript
describe('Cart', () => {
  let cart;
  
  beforeEach(() => {
    cart = new Cart();
  });
  
  describe('addToCart', () => {
    it('should add new product', () => {
      cart.addToCart({ id: 1, name: 'Apple', priceCents: 150 });
      expect(cart.items.length).toBe(1);
    });
    
    it('should increase quantity for existing product', () => {
      cart.addToCart({ id: 1, name: 'Apple', priceCents: 150 });
      cart.addToCart({ id: 1, name: 'Apple', priceCents: 150 });
      expect(cart.items[0].quantity).toBe(2);
    });
  });
  
  describe('removeFromCart', () => {
    it('should remove product', () => {
      cart.addToCart({ id: 1, name: 'Apple', priceCents: 150 });
      cart.removeFromCart(1);
      expect(cart.items.length).toBe(0);
    });
  });
});
```

### Exercise 17.3: Mock localStorage

```javascript
describe('Cart with localStorage', () => {
  let mockLocalStorage;
  
  beforeEach(() => {
    mockLocalStorage = {
      data: {},
      getItem(key) { return this.data[key]; },
      setItem(key, value) { this.data[key] = value; },
      removeItem(key) { delete this.data[key]; },
      clear() { this.data = {}; }
    };
    
    spyOn(window, 'localStorage').and.returnValue(mockLocalStorage);
  });
  
  it('should save to localStorage', () => {
    cart.addToCart({ id: 1, name: 'Apple', priceCents: 150 });
    cart.save();
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'cart',
      jasmine.any(String)
    );
  });
});
```

## Summary

- Testing ensures your code works correctly
- Jasmine is a popular testing framework
- Unit tests test individual functions
- Integration tests test complete workflows
- Use `describe` for suites, `it` for tests
- Use matchers like `toBe`, `toEqual`, `toContain`
- Spies track function calls and mock behavior
- `beforeEach`/`afterEach` manage test setup/cleanup

## Next Steps

Proceed to Module 18: Object-Oriented Programming to learn advanced JavaScript patterns.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)