# Level 121: E-commerce Product Filter (map/filter/reduce + DOM)

## Error Snippets

### Error 1: Missing return in map callback
**Description:** Map through products and return product names
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 }
];
const names = products.map(product => {
  product.name;
});
```

### Error 2: Filter with wrong comparison
**Description:** Filter products under $50
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 },
  { id: 3, name: 'Jacket', price: 80 }
];
const cheapProducts = products.filter(product => product.price > 50);
```

### Error 3: Reduce without initial value
**Description:** Calculate total price of all products
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 }
];
const total = products.reduce((sum, product) => sum + product.price);
```

### Error 4: ForEach modifying wrong array
**Description:** Double each price in the prices array
```javascript
const prices = [10, 20, 30];
const doubled = prices.forEach(price => price * 2);
```

### Error 5: DOM element access without existence check
**Description:** Update product count display
```javascript
const container = document.getElementById('product-container');
container.innerHTML = '<p>5 products found</p>';
```

### Error 6: Invoking filter on null
**Description:** Filter products by category
```javascript
let products = null;
const filtered = products.filter(p => p.category === 'electronics');
```

### Error 7: Map returning undefined for some elements
**Description:** Create array of product prices in dollars
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants' }
];
const prices = products.map(product => {
  if (product.price) {
    return `$${product.price}`;
  }
});
```

### Error 8: Array splice inside forEach
**Description:** Remove all products that are out of stock
```javascript
const cart = [
  { id: 1, name: 'Shirt', inStock: false },
  { id: 2, name: 'Pants', inStock: true },
  { id: 3, name: 'Hat', inStock: false }
];
cart.forEach((item, index) => {
  if (!item.inStock) {
    cart.splice(index, 1);
  }
});
```

### Error 9: Calling map on object instead of array
**Description:** Transform product object keys to uppercase
```javascript
const product = { name: 'Shirt', price: 25, category: 'Clothing' };
const uppercased = product.map((value, key) => [key.toUpperCase(), value]);
```

### Error 10: Sort without comparison function
**Description:** Sort products by price ascending
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 },
  { id: 3, name: 'Jacket', price: 80 }
];
products.sort();
```

### Error 11: Reduce returning wrong type
**Description:** Find the most expensive product
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 }
];
const mostExpensive = products.reduce((max, product) => {
  if (product.price > max.price) {
    return product.price;
  }
  return max;
});
```

### Error 12: innerHTML assignment with unsanitized input
**Description:** Display user search term in results heading
```javascript
function showSearchResults(searchTerm) {
  const heading = document.getElementById('results-heading');
  heading.innerHTML = `Results for: ${searchTerm}`;
}
```

### Error 13: Filter predicate always false
**Description:** Get products with ratings above 4
```javascript
const products = [
  { id: 1, name: 'Shirt', rating: 3.5 },
  { id: 2, name: 'Pants', rating: 4.5 }
];
const topRated = products.filter(product => product.rating > 4.5);
```

### Error 14: Chaining methods on empty array
**Description:** Get names of expensive products sorted alphabetically
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 }
];
const result = products
  .filter(product => product.price > 50)
  .map(product => product.name)
  .sort();
```

### Error 15: DOM querySelectorAll treated as array
**Description:** Add click handler to all product buttons
```javascript
const buttons = document.querySelectorAll('.product-button');
buttons.map(button => {
  button.addEventListener('click', handleClick);
});
```

### Error 16: Const reassignment inside loop
**Description:** Generate product cards and add to container
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 }
];
const container = document.getElementById('product-container');
for (let i = 0; i < products.length; i++) {
  const card = document.createElement('div');
  const card = document.createElement('p');
  card.textContent = products[i].name;
  container.appendChild(card);
}
```

### Error 17: Array push return value misuse
**Description:** Add a product and log the new array length
```javascript
const cart = ['Shirt', 'Pants'];
const newLength = cart.push('Hat');
console.log(cart.length === newLength);
```

### Error 18: Calling filter on undefined variable
**Description:** Filter featured products from all products
```javascript
function getFeaturedProducts() {
  let featured;
  return featured.filter(p => p.featured === true);
}
```

### Error 19: Missing break in switch case for category filter
**Description:** Filter products based on selected category
```javascript
function filterByCategory(products, category) {
  switch(category) {
    case 'clothing':
      return products.filter(p => p.category === 'clothing');
    case 'electronics':
      return products.filter(p => p.category === 'electronics');
    case 'all':
      return products;
  }
}
```

### Error 20: Wrong variable name in forEach callback parameter
**Description:** Log each product name and price
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 }
];
products.forEach(product => {
  console.log(`${item.name}: $${item.price}`);
});
```

### Error 21: Reduce with string concatenation instead of sum
**Description:** Calculate total quantity of items in cart
```javascript
const cart = [
  { name: 'Shirt', quantity: 2 },
  { name: 'Pants', quantity: 1 }
];
const totalQty = cart.reduce((total, item) => total + item.quantity, '');
```

### Error 22: Slice start index greater than array length
**Description:** Get first 3 products for a page
```javascript
const products = [
  { name: 'Shirt' },
  { name: 'Pants' }
];
const firstPage = products.slice(0, 3);
```

### Error 23: Nested filter on property that doesn't exist
**Description:** Filter products where every review is positive
```javascript
const products = [
  { id: 1, name: 'Shirt', reviews: [{ rating: 5 }, { rating: 3 }] },
  { id: 2, name: 'Pants', reviews: [{ rating: 4 }] }
];
const allPositive = products.filter(product => {
  return product.reviews.every(review => review.rating > 3);
});
```

### Error 24: While loop infinite due to missing increment
**Description:** Render product cards until all are displayed
```javascript
const products = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' },
  { id: 3, name: 'Hat' }
];
let i = 0;
while (i < products.length) {
  const div = document.createElement('div');
  div.textContent = products[i].name;
  document.body.appendChild(div);
}
```

### Error 25: Spread operator on object inside array literal
**Description:** Create a new array with one product updated
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 25 },
  { id: 2, name: 'Pants', price: 40 }
];
const updated = [...products, { ...products[0], price: 30 }];
```

### Error 26: Find returning wrong value on no match
**Description:** Find product by ID and display its name
```javascript
const products = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
const result = products.find(p => p.id === 3);
console.log(result.name);
```

### Error 27: Missing parentheses on method call
**Description:** Convert product name to uppercase
```javascript
const productName = 'shirt';
const displayName = productName.toUpperCase;
```

### Error 28: For loop using length that changes
**Description:** Remove every other product from the array
```javascript
const products = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' },
  { id: 3, name: 'Hat' },
  { id: 4, name: 'Socks' }
];
for (let i = 0; i < products.length; i++) {
  products.splice(i, 1);
}
```

### Error 29: Number to string coercion in sort
**Description:** Sort products by price ascending
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 100 },
  { id: 2, name: 'Pants', price: 25 },
  { id: 3, name: 'Jacket', price: 40 }
];
products.sort((a, b) => a.price > b.price);
```

### Error 30: Filter with side effects
**Description:** Get in-stock products and mark them as viewed
```javascript
const products = [
  { id: 1, name: 'Shirt', inStock: true, viewed: false },
  { id: 2, name: 'Pants', inStock: false, viewed: false }
];
const inStock = products.filter(product => {
  if (product.inStock) {
    product.viewed = true;
    return true;
  }
  return false;
});
```

### Error 31: Shallow copy mutation in map
**Description:** Apply 10% discount to all product prices
```javascript
const products = [
  { id: 1, name: 'Shirt', price: 100 },
  { id: 2, name: 'Pants', price: 50 }
];
const discounted = products.map(product => {
  product.price = product.price * 0.9;
  return product;
});
```

### Error 32: Using forEach where reduce is needed
**Description:** Calculate total price of all items in cart
```javascript
const cart = [
  { name: 'Shirt', price: 25 },
  { name: 'Pants', price: 40 }
];
let total = 0;
cart.forEach(item => {
  total + item.price;
});
```

### Error 33: parseInt without radix for price conversion
**Description:** Convert string prices to numbers and sort
```javascript
const priceStrings = ['25', '100', '40'];
const prices = priceStrings.map(p => parseInt(p));
prices.sort();
```

### Error 34: Wrong comparison operator for includes
**Description:** Check if cart contains a specific product
```javascript
const cart = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
const hasShirt = cart.includes({ id: 1, name: 'Shirt' });
```

### Error 35: Event listener added inside loop without closure
**Description:** Create buttons that log each product's ID
```javascript
const products = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
for (var i = 0; i < products.length; i++) {
  const btn = document.createElement('button');
  btn.textContent = products[i].name;
  btn.addEventListener('click', function() {
    console.log(i);
  });
  document.body.appendChild(btn);
}
```

### Error 36: Map on string instead of array
**Description:** Transform each character code of a product code
```javascript
const productCode = 'ABC123';
const codes = productCode.map(ch => ch.charCodeAt(0));
```

### Error 37: Array destructuring with mismatched indices
**Description:** Extract first and third product names
```javascript
const [first, second] = ['Shirt', 'Pants', 'Hat'];
console.log(first, second);
```

### Error 38: Array flat on non-nested array
**Description:** Flatten an array of product categories
```javascript
const categories = ['Clothing', 'Electronics', 'Food'];
const flat = categories.flat();
```

### Error 39: includes used on object array
**Description:** Check if a specific product object is in the cart
```javascript
const cart = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
const target = { id: 1, name: 'Shirt' };
console.log(cart.includes(target));
```

### Error 40: Delete array element using delete operator
**Description:** Remove the last product from the array
```javascript
const cart = ['Shirt', 'Pants', 'Hat'];
delete cart[cart.length - 1];
```

### Error 41: QuerySelector with wrong selector syntax
**Description:** Select element with class product-list
```javascript
const list = document.querySelector('.product-list');
const items = list.querySelectorAll('div class="product-item"');
```

### Error 42: Sort mutating original array unintentionally
**Description:** Get sorted copy of prices without changing original
```javascript
const prices = [30, 10, 20];
const sorted = prices.sort();
sorted.push(40);
```

### Error 43: Trying to iterate Set with map
**Description:** Transform a Set of product IDs
```javascript
const productIds = new Set([101, 102, 103]);
const idStrings = productIds.map(id => `ID-${id}`);
```

### Error 44: Missing return in arrow function with braces
**Description:** Filter products that match search term
```javascript
const products = [
  { id: 1, name: 'Blue Shirt' },
  { id: 2, name: 'Red Pants' }
];
const searchTerm = 'Shirt';
const matches = products.filter(product => {
  product.name.includes(searchTerm);
});
```

### Error 45: parseInt on array of objects
**Description:** Convert product price strings to numbers
```javascript
const products = [
  { name: 'Shirt', price: '25' },
  { name: 'Pants', price: '40' }
];
const prices = products.map(p => parseInt(p));
```

### Error 46: Array find returns index instead of element
**Description:** Find product by index position
```javascript
const cart = ['Shirt', 'Pants', 'Hat'];
const item = cart.find(1);
```

### Error 47: Using forEach to build a new array
**Description:** Create an array of discounted prices
```javascript
const prices = [100, 50, 25];
const discounted = [];
prices.forEach(price => {
  price * 0.9;
});
```

### Error 48: Wrong property name for classList
**ErrorMessage:** Toggle active class on product card
```javascript
function toggleProduct(card) {
  card.className.toggle('active');
}
```

### Error 49: Using reduce on single element array without initial value
**Description:** Calculate product of all quantities
```javascript
const quantities = [5];
const product = quantities.reduce((acc, q) => acc * q);
```

### Error 50: Chained methods with type mismatch
**Description:** Get total price of all products in stock
```javascript
const products = [
  { name: 'Shirt', price: 25, inStock: true },
  { name: 'Pants', price: 40, inStock: false }
];
const total = products
  .filter(p => p.inStock)
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);
console.log(total);
```

### Error 51: Text content assigned as HTML
**Description:** Set product description that contains HTML tags
```javascript
const description = 'Brand new <strong>Shirt</strong>';
const element = document.getElementById('product-desc');
element.textContent = description;
```

### Error 52: Variable name collision in nested scope
**Description:** Filter products and then process each
```javascript
const products = [
  { name: 'Shirt', category: 'Clothing' },
  { name: 'Pants', category: 'Clothing' }
];
const categories = products.map(product => {
  const category = product.category;
  return category;
});
categories.forEach(category => {
  const category = category.toUpperCase();
  console.log(category);
});
```

### Error 53: Array fill with objects sharing reference
**Description:** Create an array of empty product slots
```javascript
const slots = new Array(3).fill({ name: '', price: 0 });
slots[0].name = 'Shirt';
```

### Error 54: forEach not executed on empty array
**Description:** Process product list that might be empty
```javascript
function processProducts(list) {
  let count = 0;
  list.forEach(p => count++);
  return count;
}
```

### Error 55: Calling reduce on array-like object
**Description:** Sum prices from NodeList of product elements
```javascript
const priceElements = document.querySelectorAll('.price');
const prices = Array.from(priceElements, el => el.textContent);
const total = priceElements.reduce((sum, price) => sum + price, 0);
```

### Error 56: IndexOf on array of objects
**Description:** Find the index of a product in cart
```javascript
const cart = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
const index = cart.indexOf({ id: 1, name: 'Shirt' });
```

### Error 57: Sort comparator returning boolean instead of number
**Description:** Sort products by name alphabetically
```javascript
const products = [
  { name: 'Pants' },
  { name: 'Shirt' },
  { name: 'Hat' }
];
products.sort((a, b) => a.name < b.name);
```

### Error 58: Creating elements without appendChild
**Description:** Add product cards to the DOM in a loop
```javascript
const products = ['Shirt', 'Pants', 'Hat'];
const container = document.getElementById('product-container');
products.forEach(name => {
  const card = document.createElement('div');
  card.textContent = name;
});
```

### Error 59: Every stops early but continues processing
**Description:** Check if all products have prices
```javascript
const products = [
  { name: 'Shirt', price: 25 },
  { name: 'Pants', price: null }
];
const allHavePrices = products.every(product => {
  console.log(`Checking ${product.name}`);
  return product.price !== null;
});
```

### Error 60: Array destructuring with rest on wrong side
**Description:** Get first product and rest in separate variables
```javascript
const [first, ...rest, last] = ['Shirt', 'Pants', 'Hat', 'Socks'];
```

### Error 61: Reduce spread causing performance issue
**Description:** Convert array of products to map by ID
```javascript
const products = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
const productMap = products.reduce((map, p) => {
  return { ...map, [p.id]: p };
}, {});
```

### Error 62: Wrong argument order in reduce callback
**Description:** Flatten nested categories array
```javascript
const categories = [
  ['Shirt', 'Pants'],
  ['Hat', 'Socks']
];
const flat = categories.reduce((item, flat) => flat.concat(item), []);
```

### Error 63: Calling sort on undefined
**Description:** Sort product list returned from API
```javascript
function getSortedProducts() {
  const products = fetchProducts();
  return products.sort((a, b) => a.name.localeCompare(b.name));
}
```

### Error 64: Using classList.add on non-element
**Description:** Add highlight class to the first product element
```javascript
const firstProduct = document.querySelector('.product-item');
firstProduct.classList.add('highlight');
```

### Error 65: Null comparison instead of undefined check
**Description:** Check if product name exists before displaying
```javascript
function displayProduct(product) {
  if (product.name == null) {
    console.log('No name');
  }
}
```

### Error 66: Typo in array method name
**Description:** Get all product names from products array
```javascript
const products = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
const names = products.mpa(p => p.name);
```

### Error 67: Spread operator on non-iterable
**Description:** Merge product objects into a single config
```javascript
const defaults = { currency: 'USD', locale: 'en-US' };
const overrides = { locale: 'fr-FR' };
const config = { ...defaults, ...overrides, ...null };
```

### Error 68: Reverse mutates original array in place
**Description:** Get reverse sorted products without mutating
```javascript
const products = ['Shirt', 'Pants', 'Hat'];
const reversed = products.reverse();
```

### Error 69: Calling flatMap without flattening needed
**Description:** Create a list of all tags from all products
```javascript
const products = [
  { id: 1, tags: ['cotton', 'blue'] },
  { id: 2, tags: ['polyester', 'red'] }
];
const allTags = products.flatMap(p => p.tags.length);
```

### Error 70: Nested destructuring with default values
**Description:** Extract nested product category safely
```javascript
const product = { id: 1, details: { name: 'Shirt' } };
const { details: { name, category } } = product;
console.log(name, category);
```

## Issue Snippets

### Issue 1: Inefficient filter inside loop
**Description:** Get count of products in each category
```javascript
const products = [
  { name: 'Shirt', category: 'Clothing' },
  { name: 'Pants', category: 'Clothing' },
  { name: 'Phone', category: 'Electronics' }
];
const categories = ['Clothing', 'Electronics', 'Food'];
const counts = {};
categories.forEach(cat => {
  counts[cat] = products.filter(p => p.category === cat).length;
});
```

### Issue 2: Repeated DOM queries
**Description:** Update multiple product elements
```javascript
function updateProducts() {
  document.getElementById('count').textContent = '5';
  document.getElementById('count').style.color = 'blue';
  document.getElementById('count').className = 'updated';
}
```

### Issue 3: Mutating objects in filter
**Description:** Get active products and format them
```javascript
const products = [
  { name: 'Shirt', active: true },
  { name: 'Pants', active: false }
];
const active = products.filter(p => {
  if (p.active) p.formatted = true;
  return p.active;
});
```

### Issue 4: Using indexOf instead of includes for readability
**Description:** Check if category is allowed
```javascript
const allowed = ['Clothing', 'Electronics'];
const category = 'Clothing';
if (allowed.indexOf(category) !== -1) {
  console.log('Allowed');
}
```

### Issue 5: Deeply nested ternaries in filter
**Description:** Filter products based on multiple criteria
```javascript
const filtered = products.filter(p => 
  p.price > 10 ? p.inStock ? p.rating > 3 ? true : false : false : false
);
```

### Issue 6: Magic numbers scattered in filter logic
**Description:** Filter products by price threshold
```javascript
const filtered = products.filter(p => p.price > 50);
const discounted = products.map(p => ({ ...p, price: p.price * 0.9 }));
```

### Issue 7: For loop instead of array method
**Description:** Create array of product names
```javascript
const products = [
  { name: 'Shirt', price: 25 },
  { name: 'Pants', price: 40 }
];
const names = [];
for (let i = 0; i < products.length; i++) {
  names.push(products[i].name);
}
```

### Issue 8: Unnecessary array copy
**Description:** Sort products and display
```javascript
const sorted = [...products];
sorted.sort((a, b) => a.price - b.price);
```

### Issue 9: Variable hoisting confusion with var
**Description:** Create click handlers for product buttons
```javascript
for (var i = 0; i < 5; i++) {
  document.querySelectorAll('button')[i].onclick = function() {
    console.log(i);
  };
}
```

### Issue 10: No fallback for empty array reduce
**Description:** Calculate total price of cart items
```javascript
function getTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}
```

### Issue 11: Double negation for boolean coercion
**Description:** Check if product is available
```javascript
const isAvailable = !!product.inStock && !!product.active;
```

### Issue 12: Side effects inside map callback
**Description:** Log each product name and return uppercase
```javascript
const uppercased = products.map(p => {
  console.log(p.name);
  return p.name.toUpperCase();
});
```

### Issue 13: Using == instead of === for comparisons
**Description:** Filter products by ID
```javascript
const product = products.find(p => p.id == 5);
```

### Issue 14: Array-like iteration without Array.from
**Description:** Convert arguments to array and process
```javascript
function processItems() {
  const items = Array.prototype.slice.call(arguments);
  return items.filter(i => i.active);
}
```

### Issue 15: Unnecessary wrapper function
**Description:** Get product names
```javascript
const getNames = () => {
  return products.map(p => p.name);
};
```

### Issue 16: Not handling case sensitivity in filter
**Description:** Filter products by category name
```javascript
const filtered = products.filter(p => p.category === 'clothing');
```

### Issue 17: Using var in for loop for DOM rendering
**Description:** Render a list of products
```javascript
for (var i = 0; i < products.length; i++) {
  const li = document.createElement('li');
  li.textContent = products[i].name;
  list.appendChild(li);
}
```

### Issue 18: Not using strict comparison for price
**Description:** Check if product is free
```javascript
const isFree = product.price == 0;
```

### Issue 19: Chaining many methods on one line
**Description:** Process and format product data
```javascript
const result = products.filter(p => p.active).map(p => p.name).sort().join(', ');
```

### Issue 20: Redundant boolean check
**Description:** Get active products
```javascript
const activeProducts = products.filter(p => p.active === true);
```

### Issue 21: Modifying array while iterating with forEach
**Description:** Remove inactive products and log active ones
```javascript
products.forEach((p, i) => {
  if (!p.active) {
    products.splice(i, 1);
  } else {
    console.log(p.name);
  }
});
```

### Issue 22: Using document.write for product info
**Description:** Display product details
```javascript
products.forEach(p => {
  document.write(`<div>${p.name}</div>`);
});
```

### Issue 23: Not using parameter defaults
**Description:** Get products with minimum rating
```javascript
function getTopRated(products, minRating) {
  if (!minRating) minRating = 4;
  return products.filter(p => p.rating >= minRating);
}
```

### Issue 24: No error handling in find
**Description:** Get product name by ID
```javascript
function getProductName(id) {
  return products.find(p => p.id === id).name;
}
```

### Issue 25: Empty array check with length
**Description:** Check if products array has items
```javascript
if (products.length > 0) {
  renderProducts(products);
}
```

### Issue 26: Using delete for removing array elements
**Description:** Remove a product from cart
```javascript
function removeProduct(cart, index) {
  delete cart[index];
}
```

### Issue 27: Global variable exposed in filter callback
**Description:** Filter products within price range
```javascript
function filterByPrice(products) {
  return products.filter(p => p.price >= min && p.price <= max);
}
```

### Issue 28: Not removing event listeners before removing DOM elements
**Description:** Remove a product card
```javascript
function removeProductCard(id) {
  const card = document.getElementById(`product-${id}`);
  card.remove();
}
```

### Issue 29: Repeated array length calculation
**Description:** Loop through products twice
```javascript
for (let i = 0; i < products.length; i++) {
  console.log(products[i].name);
}
for (let i = 0; i < products.length; i++) {
  console.log(products[i].price);
}
```

### Issue 30: Using concat instead of spread in modern code
**Description:** Merge two product arrays
```javascript
const allProducts = featuredProducts.concat(regularProducts);
```

## Modify Snippets

### Modify 1: Add category filter to product list
**Description:** Filter products by category before rendering
```javascript
function renderProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `<h3>${product.name}</h3><p>$${product.price}</p>`;
    container.appendChild(div);
  });
}
```

### Modify 2: Add sort by price functionality
**Description:** Sort products by price ascending and render
```javascript
function renderProductList(products) {
  const list = document.querySelector('.product-list');
  list.innerHTML = '';
  products.forEach(p => {
    const item = document.createElement('li');
    item.textContent = `${p.name} - $${p.price}`;
    list.appendChild(item);
  });
}
```

### Modify 3: Add search input filtering
**Description:** Filter products as user types in search box
```javascript
const searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});
```

### Modify 4: Add total price calculation
**Description:** Calculate and display total cart price
```javascript
function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalElement = document.getElementById('cart-total');
}
```

### Modify 5: Add product rating display
**Description:** Show star rating for each product
```javascript
function renderProduct(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  const name = document.createElement('h3');
  name.textContent = product.name;
  card.appendChild(name);
  return card;
}
```

### Modify 6: Add out-of-stock indicator
**Description:** Mark products as unavailable when stock is 0
```javascript
function renderProducts(products) {
  return products.map(product => {
    const card = document.createElement('div');
    card.textContent = product.name;
    return card;
  });
}
```

### Modify 7: Add price range filter
**Description:** Filter products between min and max price
```javascript
function filterByPrice(min, max) {
  return products.filter(p => p.price >= min && p.price <= max);
}
```

### Modify 8: Add pagination logic
**Description:** Show only first 10 products per page
```javascript
function displayPage(pageNumber, products) {
  const start = (pageNumber - 1) * 10;
  const container = document.getElementById('product-container');
}
```

### Modify 9: Add product compare feature
**Description:** Allow selecting two products to compare
```javascript
let compareList = [];
function toggleCompare(productId) {
  const index = compareList.indexOf(productId);
  if (index === -1) {
    compareList.push(productId);
  } else {
    compareList.splice(index, 1);
  }
}
```

### Modify 10: Add sorting by multiple criteria
**Description:** Sort products by price, then by name
```javascript
products.sort((a, b) => {
});
```

### Modify 11: Add discount percentage display
**Description:** Show original price crossed out with discount %
```javascript
function renderProductPrice(product) {
  const priceElement = document.createElement('span');
  if (product.discountPercent) {
  }
}
```

### Modify 12: Add category breadcrumb navigation
**Description:** Show breadcrumb path for current category
```javascript
function updateBreadcrumbs(categoryPath) {
  const breadcrumbs = document.getElementById('breadcrumbs');
  breadcrumbs.innerHTML = '';
}
```

### Modify 13: Add wishlist toggle button
**Description:** Toggle product wishlist status on click
```javascript
function toggleWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
}
```

### Modify 14: Add product quick view modal
**Description:** Show product details in a modal popup
```javascript
function showQuickView(productId) {
  const product = products.find(p => p.id === productId);
  const modal = document.getElementById('quick-view-modal');
}
```

### Modify 15: Add recently viewed products tracker
**Description:** Track and display recently viewed products
```javascript
function trackRecentlyViewed(productId) {
  let recent = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
}
```

### Modify 16: Add filter by multiple categories
**Description:** Allow selecting multiple category filters
```javascript
function filterByCategories(selectedCategories) {
  return products.filter(p => selectedCategories.includes(p.category));
}
```

### Modify 17: Add product count badge
**Description:** Update badge showing number of products found
```javascript
function updateProductCount(count) {
  const badge = document.querySelector('.product-count-badge');
}
```

### Modify 18: Add lazy loading for product images
**Description:** Load product images only when visible
```javascript
function setupLazyLoading() {
  const images = document.querySelectorAll('.product-image');
  const observer = new IntersectionObserver((entries) => {
  });
}
```

### Modify 19: Add sort direction toggle
**Description:** Toggle between ascending and descending sort
```javascript
let sortAscending = true;
function toggleSortDirection() {
  sortAscending = !sortAscending;
}
```

### Modify 20: Add stock level indicator
**Description:** Show color-coded stock levels (low, medium, high)
```javascript
function getStockLevel(quantity) {
  if (quantity === 0) return 'out-of-stock';
}
```

### Modify 21: Add product filter reset button
**Description:** Clear all active filters and show all products
```javascript
function resetFilters() {
  document.getElementById('search').value = '';
  document.getElementById('category-filter').value = 'all';
}
```

### Modify 22: Add filter results counter
**Description:** Show how many products match current filters
```javascript
function updateFilterResults() {
  const filteredCount = getFilteredProducts().length;
  const span = document.getElementById('filter-count');
}
```

### Modify 23: Add price format with currency symbol
**Description:** Format all prices with $ and 2 decimal places
```javascript
function formatPrice(price) {
  return price;
}
```

### Modify 24: Add product availability filter
**Description:** Add checkbox to show only in-stock items
```javascript
function filterByAvailability(showInStockOnly) {
  if (showInStockOnly) {
    return products.filter(p => p.inStock);
  }
  return products;
}
```

### Modify 25: Add sort by popularity
**Description:** Sort products by number of reviews
```javascript
function sortByPopularity(products) {
  return products.sort((a, b) => {
  });
}
```

### Modify 26: Add filter by brand
**Description:** Filter products by selected brand
```javascript
function filterByBrand(brand) {
  return products.filter(p => p.brand === brand);
}
```

### Modify 27: Add color swatch filter
**Description:** Filter products by available colors
```javascript
function filterByColor(colors) {
  return products.filter(p => {
    return p.colors.some(c => colors.includes(c));
  });
}
```

### Modify 28: Add product view mode toggle
**Description:** Toggle between grid and list view
```javascript
let viewMode = 'grid';
function toggleViewMode() {
  viewMode = viewMode === 'grid' ? 'list' : 'grid';
  const container = document.getElementById('product-container');
  container.className = `${viewMode}-view`;
}
```

### Modify 29: Add infinite scroll pagination
**Description:** Load more products when scrolling to bottom
```javascript
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadMoreProducts();
  }
});
```

### Modify 30: Add filter by size
**Description:** Filter clothing products by size
```javascript
function filterBySize(size) {
  return products.filter(p => {
    return p.sizes && p.sizes.includes(size);
  });
}
```

### Modify 31: Add average rating calculation
**Description:** Calculate and display average product rating
```javascript
function getAverageRating(product) {
  const reviews = product.reviews;
  if (!reviews || reviews.length === 0) return 0;
}
```

### Modify 32: Add filter by price range slider
**Description:** Dual range slider for min/max price filter
```javascript
const priceRangeSlider = document.getElementById('price-range');
priceRangeSlider.addEventListener('input', (e) => {
  const maxPrice = parseInt(e.target.value);
});
```

### Modify 33: Add product sorting with URL parameters
**Description:** Read sort parameter from URL and apply
```javascript
function getSortFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('sort') || 'name-asc';
}
```

### Modify 34: Add filter chips display
**Description:** Show active filters as removable chips
```javascript
function updateFilterChips() {
  const chipsContainer = document.getElementById('filter-chips');
  chipsContainer.innerHTML = '';
}
```

### Modify 35: Add product JSON export
**Description:** Export filtered products as JSON file
```javascript
function exportProductsJSON() {
  const filtered = getFilteredProducts();
  const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' });
}
```

### Modify 36: Add clear all filters button
**Description:** Button to reset all filters at once
```javascript
document.getElementById('clear-filters').addEventListener('click', () => {
  document.querySelectorAll('.filter-input').forEach(input => {
    input.value = '';
    input.checked = false;
  });
});
```

### Modify 37: Add product filter history
**Description:** Track recent filter combinations
```javascript
const filterHistory = [];
function saveFilterState(filters) {
  filterHistory.push({ filters, timestamp: Date.now() });
}
```

### Modify 38: Add filter by rating stars
**Description:** Filter by minimum star rating
```javascript
function filterByMinRating(minRating) {
  return products.filter(p => (p.rating || 0) >= minRating);
}
```

### Modify 39: Add product compare diff view
**Description:** Show differences between two compared products
```javascript
function showCompareDiff(productA, productB) {
  const diff = {};
  Object.keys(productA).forEach(key => {
  });
}
```

### Modify 40: Add product quick filter presets
**Description:** Predefined filter combinations (e.g. Best Sellers, New Arrivals)
```javascript
const filterPresets = {
  'best-sellers': { sortBy: 'sales', limit: 20 },
  'new-arrivals': { sortBy: 'date', filter: { daysSinceAdded: 30 } }
};
```

### Modify 41: Add filter by product tags
**Description:** Filter products by multiple tags
```javascript
function filterByTags(selectedTags) {
  return products.filter(p => {
    return selectedTags.every(tag => p.tags.includes(tag));
  });
}
```

### Modify 42: Add product sorting animation
**Description:** Animate products when re-sorting
```javascript
function animateSort(products) {
  const container = document.getElementById('product-container');
  container.style.opacity = '0';
}
```

### Modify 43: Add filter by weight for shipping
**Description:** Filter products by shipping weight
```javascript
function filterByMaxWeight(maxWeight) {
  return products.filter(p => (p.weight || 0) <= maxWeight);
}
```

### Modify 44: Add product variant filter
**Description:** Filter products by variants (color, size, material)
```javascript
function filterByVariant(variantType, variantValue) {
  return products.filter(p => {
    return p.variants && p.variants[variantType] === variantValue;
  });
}
```

### Modify 45: Add filter results caching
**Description:** Cache filter results to avoid re-processing
```javascript
const filterCache = new Map();
function getCachedFilter(key) {
  if (filterCache.has(key)) {
    return filterCache.get(key);
  }
}
```

### Modify 46: Add product filter analytics
**Description:** Track which filters users apply most
```javascript
const filterAnalytics = {};
function trackFilterUsage(filterName, value) {
  if (!filterAnalytics[filterName]) {
    filterAnalytics[filterName] = {};
  }
}
```

### Modify 47: Add filter URL sharing
**Description:** Generate URL with current filter state for sharing
```javascript
function generateFilterURL() {
  const filters = getActiveFilters();
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    params.set(key, value);
  });
  return `${window.location.origin}${window.location.pathname}?${params}`;
}
```

### Modify 48: Add product filter by release date
**Description:** Filter products by date range
```javascript
function filterByDateRange(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return products.filter(p => {
  });
}
```

### Modify 49: Add filter by material type
**Description:** Filter clothing by material composition
```javascript
function filterByMaterial(materials) {
  return products.filter(p => {
    return p.materials && p.materials.some(m => materials.includes(m));
  });
}
```

### Modify 50: Add product filter with voice commands
**Description:** Use speech recognition to filter products
```javascript
function setupVoiceFilter() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  const recognition = new SpeechRecognition();
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
  };
}
```
