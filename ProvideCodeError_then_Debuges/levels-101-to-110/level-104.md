# Debugging Challenges - Level 104
## Theme: Shopping Cart with Prices, Strings, HTML Display

---

### Error 1: Price calculation missing
**Description:** Should calculate total price of items in cart
```javascript
let cart = [
  {name: "Apple", price: 0.99, qty: 5},
  {name: "Banana", price: 0.59, qty: 3}
];
let total = 0;
for (let item of cart) {
  total += item.price * item.qty;
}
console.log(total);
```

### Error 2: Display cart item typo
**Description:** Should display item name and price
```javascript
let item = {name: "Apple", price: 0.99};
console.log(item.Name + ": $" + item.price);
```

### Error 3: Add to cart missing quantity
**Description:** Should add item to cart with quantity
```javascript
function addToCart(cart, name, price) {
  cart.push({name: name, price: price});
  return cart;
}
console.log(addToCart([], "Apple", 0.99));
```

### Error 4: Remove from cart typo
**Description:** Should remove item by name from cart
```javascript
function removeFromCart(cart, name) {
  return cart.filter(item => item.name !== name);
}
let cart = [{name: "Apple", price: 0.99}];
console.log(removeFromCart(cart, "Apple"));
```

### Error 5: Update quantity not working
**Description:** Should update quantity of item in cart
```javascript
function updateQty(cart, name, qty) {
  for (let item of cart) {
    if (item.name === name) {
      item.qty = qty;
    }
  }
  return cart;
}
let cart = [{name: "Apple", price: 0.99, qty: 2}];
updateQty(cart, "Apple", 5);
console.log(cart[0].qty);
```

### Error 6: Cart total with tax missing
**Description:** Should calculate total including 8% tax
```javascript
function calcTotal(subtotal) {
  return subtotal + subtotal * 0.08;
}
console.log(calcTotal(100));
```

### Error 7: Discount calculation wrong
**Description:** Should apply 10% discount to total
```javascript
function applyDiscount(total, percent) {
  return total - percent;
}
console.log(applyDiscount(100, 10));
```

### Error 8: Currency formatting not applied
**Description:** Should format price as $XX.XX
```javascript
let price = 9.9;
console.log("$" + price);
```

### Error 9: Cart item count wrong
**Description:** Should count total items (sum of quantities)
```javascript
let cart = [
  {name: "Apple", qty: 3},
  {name: "Banana", qty: 2}
];
console.log(cart.length);
```

### Error 10: Empty cart check wrong
**Description:** Should check if cart has no items
```javascript
let cart = [];
if (cart) {
  console.log("Cart is empty");
}
```

### Error 11: Find item by index typo
**Description:** Should find index of item in cart
```javascript
let cart = ["Apple", "Banana"];
console.log(cart.findIndex("Apple"));
```

### Error 12: Includes on array of objects
**Description:** Should check if "Apple" is in cart
```javascript
let cart = [{name: "Apple"}, {name: "Banana"}];
console.log(cart.includes("Apple"));
```

### Error 13: Map to get names
**Description:** Should get array of all item names
```javascript
let cart = [{name: "Apple"}, {name: "Banana"}];
let names = cart.map(item => item.name);
console.log(names);
```

### Error 14: Reduce for total wrong
**Description:** Should sum all prices using reduce
```javascript
let cart = [{price: 1.99}, {price: 2.99}];
let total = cart.reduce((sum, item) => sum + item.price);
console.log(total);
```

### Error 15: Filter by price range typo
**Description:** Should filter items under $5
```javascript
let items = [{name: "A", price: 3}, {name: "B", price: 7}];
let cheap = items.filter(item => item.price < 5);
console.log(cheap);
```

### Error 16: Sort by price wrong
**Description:** Should sort items by price ascending
```javascript
let items = [{name: "A", price: 5}, {name: "B", price: 1}];
items.sort((a, b) => a.price - b.price);
console.log(items);
```

### Error 17: Adding item with same name duplicates
**Description:** Should increase quantity instead of duplicating
```javascript
function addToCart(cart, item) {
  cart.push(item);
  return cart;
}
let cart = [{name: "Apple", qty: 2}];
addToCart(cart, {name: "Apple", qty: 3});
console.log(cart.length);
```

### Error 18: Shipping cost calculation
**Description:** Should add $5 shipping if order under $50
```javascript
function calcShipping(total) {
  if (total < 50) return 5;
  return 0;
}
console.log(calcShipping(30));
```

### Error 19: Free shipping threshold wrong
**Description:** Should return true if order qualifies for free shipping
```javascript
function freeShipping(total) {
  return total > 100;
}
console.log(freeShipping(100));
```

### Error 20: Sales tax variable undefined
**Description:** Should calculate total with sales tax
```javascript
function calcTotal(subtotal) {
  let tax = subtotal * TAX_RATE;
  return subtotal + tax;
}
console.log(calcTotal(100));
```

### Error 21: Coupon code validation typo
**Description:** Should validate coupon code "SAVE10"
```javascript
function validateCoupon(code) {
  return code === "SAVE10";
}
console.log(validateCoupon("save10"));
```

### Error 22: Price per unit calculation
**Description:** Should calculate price per unit for comparison
```javascript
function pricePerUnit(totalPrice, quantity) {
  return totalPrice / quantity;
}
console.log(pricePerUnit(5, 0));
```

### Error 23: Display cart as HTML typo
**Description:** Should generate HTML string from cart items
```javascript
function cartToHTML(cart) {
  let html = "<ul>";
  for (let item of cart) {
    html += "<li>" + item.name + ": $" + item.price + "</li>";
  }
  html += "</ul>";
  return html;
}
console.log(cartToHTML([{name: "A", price: 1}]));
```

### Error 24: Checkout total with all fees
**Description:** Should calculate total with tax and shipping
```javascript
function checkout(subtotal) {
  let tax = subtotal * 0.08;
  let shipping = subtotal > 50 ? 0 : 5;
  return subtotal + tax + shipping;
}
document.getElementById("total").textContent = checkout(100);
```

### Error 25: Quantity selector min value
**Description:** Should not allow quantity less than 1
```javascript
function changeQty(current, delta) {
  return current + delta;
}
console.log(changeQty(1, -5));
```

### Error 26: Stock check missing
**Description:** Should check if item is in stock
```javascript
let stock = {Apple: 10, Banana: 0};
function checkStock(item) {
  return stock[item];
}
console.log(checkStock("Banana"));
```

### Error 27: Wishlist add typo
**Description:** Should add item to wishlist
```javascript
let wishlist = [];
function addToWishlist(item) {
  wishlist.push(item);
}
addToWishlist({name: "Apple"});
console.log(wishlist);
```

### Error 28: Compare prices function
**Description:** Should return the cheaper item
```javascript
function cheaperItem(a, b) {
  if (a.price < b.price) return a;
  return b;
}
let a = {name: "A", price: 5};
let b = {name: "B", price: 3};
console.log(cheaperItem(a, b).name);
```

### Error 29: Bulk discount calculation
**Description:** Should apply bulk discount: buy 10+ get 10% off
```javascript
function bulkDiscount(qty, price) {
  let total = qty * price;
  if (qty >= 10) total *= 0.9;
  return total;
}
console.log(bulkDiscount(10, 5));
```

### Error 30: Cart total from string prices
**Description:** Should handle prices stored as strings
```javascript
let cart = [{name: "A", price: "1.99"}, {name: "B", price: "2.99"}];
let total = 0;
for (let item of cart) {
  total += item.price;
}
console.log(total);
```

### Error 31: Array push return value
**Description:** Should add item and return new length
```javascript
let cart = [];
let newLength = cart.push("Apple");
console.log(newLength);
```

### Error 32: Pop from empty cart
**Description:** Should safely remove last item
```javascript
let cart = [];
console.log(cart.pop());
```

### Error 33: Shift from empty cart
**Description:** Should safely remove first item
```javascript
let cart = [];
console.log(cart.shift());
```

### Error 34: Unshift to add first
**Description:** Should add item to beginning of cart
```javascript
let cart = ["Banana"];
cart.unshift("Apple");
console.log(cart);
```

### Error 35: Splice to remove item
**Description:** Should remove item at index 1
```javascript
let cart = ["Apple", "Banana", "Cherry"];
cart.splice(1);
console.log(cart);
```

### Error 36: Slice to copy cart
**Description:** Should copy cart without modifying original
```javascript
let cart = ["Apple", "Banana"];
let copy = cart.slice();
copy.push("Cherry");
console.log(cart.length);
```

### Error 37: Concat to merge carts
**Description:** Should merge two carts into one
```javascript
let cart1 = ["Apple"];
let cart2 = ["Banana"];
let merged = cart1.concat(cart2);
console.log(merged);
```

### Error 38: Every to check all prices > 0
**Description:** Should check if all items have positive price
```javascript
let cart = [{price: 1}, {price: 0}];
let allPositive = cart.every(item => item.price > 0);
console.log(allPositive);
```

### Error 39: Some to check if any item on sale
**Description:** Should check if any item has sale: true
```javascript
let cart = [{sale: false}, {sale: true}];
let hasSale = cart.some(item => item.sale);
console.log(hasSale);
```

### Error 40: Find to get first match
**Description:** Should find first item with price > 5
```javascript
let cart = [{name: "A", price: 3}, {name: "B", price: 7}];
let found = cart.find(item => item.price > 5);
console.log(found.name);
```

### Error 41: Flat to flatten nested cart
**Description:** Should flatten array of arrays
```javascript
let orders = [["Apple"], ["Banana", "Cherry"]];
console.log(orders.flat());
```

### Error 42: FlatMap for cart items
**Description:** Should map and flatten in one step
```javascript
let categories = [["Apple", "Banana"], ["Cherry"]];
console.log(categories.flatMap(c => c));
```

### Error 43: Fill for initializing cart
**Description:** Should create array of 5 empty slots
```javascript
let cart = new Array(5).fill(null);
console.log(cart.length);
```

### Error 44: From to convert to array
**Description:** Should convert arguments to array
```javascript
function addItems() {
  let items = Array.from(arguments);
  console.log(items);
}
addItems("Apple", "Banana");
```

### Error 45: Of to create array
**Description:** Should create array from values
```javascript
let items = Array.of("Apple", "Banana", "Cherry");
console.log(items);
```

### Error 46: IsArray check
**Description:** Should check if value is an array
```javascript
let cart = ["Apple"];
console.log(Array.isArray(cart));
```

### Error 47: Includes in array of primitives
**Description:** Should check if "Apple" is in array
```javascript
let items = ["Apple", "Banana"];
console.log(items.includes("Apple"));
```

### Error 48: IndexOf in array
**Description:** Should find index of "Banana"
```javascript
let items = ["Apple", "Banana", "Cherry"];
console.log(items.indexOf("Banana"));
```

### Error 49: LastIndexOf in array
**Description:** Should find last index of "Apple"
```javascript
let items = ["Apple", "Banana", "Apple"];
console.log(items.lastIndexOf("Apple"));
```

### Error 50: Join cart items
**Description:** Should join cart item names with comma
```javascript
let cart = ["Apple", "Banana", "Cherry"];
console.log(cart.join(", "));
```

### Error 51: Reverse cart order
**Description:** Should reverse the order of cart items
```javascript
let cart = ["Apple", "Banana", "Cherry"];
console.log(cart.reverse());
```

### Error 52: ForEach to display items
**Description:** Should log each item name
```javascript
let cart = ["Apple", "Banana"];
cart.forEach(item => {
  console.log(item);
});
```

### Error 53: Entries iterator
**Description:** Should get index-item pairs from cart
```javascript
let cart = ["Apple", "Banana"];
for (let [index, item] of cart.entries()) {
  console.log(index, item);
}
```

### Error 54: Keys iterator
**Description:** Should get indices of cart array
```javascript
let cart = ["Apple", "Banana"];
for (let key of cart.keys()) {
  console.log(key);
}
```

### Error 55: Values iterator
**Description:** Should iterate cart values
```javascript
let cart = ["Apple", "Banana"];
for (let value of cart.values()) {
  console.log(value);
}
```

### Error 56: Sort strings alphabetically
**Description:** Should sort cart items alphabetically
```javascript
let cart = ["Banana", "Apple", "Cherry"];
cart.sort();
console.log(cart);
```

### Error 57: Sort with compare function
**Description:** Should sort by price descending
```javascript
let cart = [{name: "A", price: 5}, {name: "B", price: 1}];
cart.sort((a, b) => a.price - b.price);
console.log(cart);
```

### Error 58: LocalCompare for sorting
**Description:** Should sort strings with localeCompare
```javascript
let items = ["éclair", "apple", "banana"];
items.sort((a, b) => a.localeCompare(b));
console.log(items);
```

### Error 59: Spread to copy array
**Description:** Should copy cart using spread operator
```javascript
let cart = ["Apple", "Banana"];
let copy = [...cart];
console.log(copy);
```

### Error 60: Destructure array items
**Description:** Should destructure first two items from cart
```javascript
let cart = ["Apple", "Banana", "Cherry"];
let [first, second] = cart;
console.log(first, second);
```

### Error 61: Rest parameter in function
**Description:** Should accept unlimited items using rest
```javascript
function addToCart(...items) {
  return items;
}
console.log(addToCart("Apple", "Banana"));
```

### Error 62: Default parameter for qty
**Description:** Should default qty to 1 if not provided
```javascript
function addItem(name, qty) {
  return {name, qty};
}
console.log(addItem("Apple"));
```

### Error 63: Shorthand property names
**Description:** Should use shorthand property in returned object
```javascript
function createItem(name, price) {
  return {name: name, price: price};
}
console.log(createItem("Apple", 0.99));
```

### Error 64: Method shorthand in object
**Description:** Should define method using shorthand
```javascript
let cart = {
  items: [],
  addItem(item) {
    this.items.push(item);
  }
};
cart.addItem("Apple");
console.log(cart.items);
```

### Error 65: Computed property names
**Description:** Should use computed property for dynamic key
```javascript
let key = "price";
let item = {[key]: 0.99};
console.log(item.price);
```

### Error 66: Optional chaining for nested
**Description:** Should safely access nested properties
```javascript
let user = {cart: {items: ["Apple"]}};
console.log(user.cart?.items?.length);
```

### Error 67: Nullish coalescing for default
**Description:** Should use default value if null/undefined
```javascript
function getQty(item) {
  return item.qty ?? 1;
}
console.log(getQty({name: "Apple"}));
```

### Error 68: Logical OR assignment
**Description:** Should assign default if falsy
```javascript
let qty = 0;
qty ||= 1;
console.log(qty);
```

### Error 69: AND assignment
**Description:** Should assign only if truthy
```javascript
let item = {name: "Apple"};
item.discount &&= 0.1;
console.log(item.discount);
```

### Error 70: Nullish assignment
**Description:** Should assign only if null/undefined
```javascript
let item = {name: "Apple", discount: null};
item.discount ??= 0.1;
console.log(item.discount);
```

---

### Issue 1: Floating point in total
**Description:** Should display total without floating point errors
```javascript
let total = 0.1 + 0.2;
console.log(total);
```

### Issue 2: Quantity as string in calculation
**Description:** Should treat quantity as number for total
```javascript
let item = {name: "Apple", price: 1.99, qty: "3"};
let total = item.price * item.qty;
console.log(total);
```

### Issue 3: Price display without rounding
**Description:** Should display price rounded to 2 decimals
```javascript
let price = 3.999;
console.log("$" + price);
```

### Issue 4: Tax calculation rounding
**Description:** Should round tax to nearest cent
```javascript
let subtotal = 10.49;
let tax = subtotal * 0.08;
console.log(tax);
```

### Issue 5: Discount applied after tax
**Description:** Should apply discount before tax
```javascript
let subtotal = 100;
let discount = 10;
let taxRate = 0.08;
let afterDiscount = subtotal - discount;
let total = afterDiscount + afterDiscount * taxRate;
console.log(total);
```

### Issue 6: Comparing prices with decimals
**Description:** Should correctly compare 0.99 and 1.00
```javascript
console.log(0.99 < 1.00);
```

### Issue 7: Cart display with HTML injection
**Description:** Should safely render item names in HTML
```javascript
let itemName = "<script>alert('xss')</script>";
document.getElementById("cart").innerHTML = "<li>" + itemName + "</li>";
```

### Issue 8: Multiple items with same name
**Description:** Should handle duplicate items by summing quantities
```javascript
function mergeCart(cart) {
  return cart;
}
let cart = [{name: "Apple", qty: 2}, {name: "Apple", qty: 3}];
console.log(mergeCart(cart));
```

### Issue 9: Price filter inclusive boundary
**Description:** Should include items exactly $5
```javascript
let items = [{name: "A", price: 5}, {name: "B", price: 6}];
let cheap = items.filter(i => i.price < 5);
console.log(cheap);
```

### Issue 10: Tax variable reassigned
**Description:** Should calculate tax without modifying subtotal
```javascript
let subtotal = 100;
let tax = subtotal * 0.08;
subtotal += tax;
console.log(subtotal);
```

### Issue 11: Modifying cart while iterating
**Description:** Should safely remove items while iterating
```javascript
let cart = ["Apple", "Banana", "Cherry"];
for (let i = 0; i < cart.length; i++) {
  if (cart[i] === "Banana") {
    cart.splice(i, 1);
  }
}
console.log(cart);
```

### Issue 12: Referencing cart by reference
**Description:** Should copy cart, not reference it
```javascript
let cart = ["Apple", "Banana"];
let newCart = cart;
newCart.push("Cherry");
console.log(cart.length);
```

### Issue 13: Sum of empty cart
**Description:** Should return 0 for empty cart total
```javascript
function getTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}
console.log(getTotal([]));
```

### Issue 14: Max items limit
**Description:** Should limit cart to 10 items
```javascript
function addItem(cart, item) {
  if (cart.length <= 10) {
    cart.push(item);
  }
  return cart;
}
```

### Issue 15: Remove non-existent item
**Description:** Should gracefully handle removing unknown item
```javascript
function removeItem(cart, name) {
  let idx = cart.findIndex(i => i.name === name);
  cart.splice(idx, 1);
  return cart;
}
console.log(removeItem([{name: "Apple"}], "Banana"));
```

### Issue 16: Rounding total at each step
**Description:** Should round only final total, not intermediate steps
```javascript
function calcTotal(price, tax, tip) {
  return price + price * tax + price * tip;
}
console.log(calcTotal(10.49, 0.08, 0.15));
```

### Issue 17: Applying percentage discount twice
**Description:** Should apply discount only once
```javascript
function applyDiscount(price, percent) {
  return price * (1 - percent / 100);
}
let price = 100;
price = applyDiscount(price, 20);
price = applyDiscount(price, 20);
console.log(price);
```

### Issue 18: Mixing currency symbols in calculation
**Description:** Should handle amounts with or without $ sign
```javascript
function addPrices(a, b) {
  return parseFloat(a) + parseFloat(b);
}
console.log(addPrices("$10.99", "$5.99"));
```

### Issue 19: Tax rounding inconsistency
**Description:** Should round tax consistently across items
```javascript
function calcTax(amount, rate) {
  return (amount * rate).toFixed(2);
}
let items = [10.99, 5.49, 3.99];
let tax = items.reduce((sum, i) => sum + parseFloat(calcTax(i, 0.08)), 0);
console.log(tax);
```

### Issue 20: Quantity as 0 causing free items
**Description:** Should not allow quantity of 0
```javascript
let cart = [{name: "Apple", price: 1.99, qty: 0}];
let total = cart.reduce((s, i) => s + i.price * i.qty, 0);
console.log(total);
```

### Issue 21: Negative discount percentage
**Description:** Should reject negative discount values
```javascript
function applyDiscount(price, percent) {
  return price * (1 - percent / 100);
}
console.log(applyDiscount(100, -20));
```

### Issue 22: String price from different locales
**Description:** Should parse "1.99" and "1,99" correctly
```javascript
function parsePrice(str) {
  return parseFloat(str);
}
console.log(parsePrice("1,99"));
```

### Issue 23: Cart total with fractional quantity
**Description:** Should support fractional quantities (e.g., 0.5 lb)
```javascript
let item = {price: 5.99, qty: 0.5};
console.log(item.price * item.qty);
```

### Issue 24: Generated HTML with unescaped characters
**Description:** Should escape special HTML chars in item names
```javascript
let name = "Chicken & Waffles";
document.getElementById("cart").innerHTML += "<li>" + name + "</li>";
```

### Issue 25: Displaying 0 items as empty
**Description:** Should show "Cart is empty" when 0 items
```javascript
let cart = [];
if (cart.length) {
  console.log("Cart has items");
} else {
  console.log("Cart is empty");
}
```

### Issue 26: Scroll position after adding item
**Description:** Should scroll to bottom after adding item
```javascript
function addItemAndScroll(item) {
  cart.push(item);
}
```

### Issue 27: Disabled button when cart empty
**Description:** Should disable checkout button for empty cart
```javascript
let cart = [];
let checkoutBtn = {disabled: false};
checkoutBtn.disabled = !cart.length;
console.log(checkoutBtn.disabled);
```

### Issue 28: Compare by reference not value
**Description:** Should compare item properties, not object reference
```javascript
let item1 = {name: "Apple", price: 1};
let item2 = {name: "Apple", price: 1};
console.log(item1 === item2);
```

### Issue 29: Adding duplicate items to wishlist
**Description:** Should prevent duplicate items in wishlist
```javascript
let wishlist = [];
function addToWishlist(item) {
  wishlist.push(item);
}
addToWishlist("Apple");
addToWishlist("Apple");
console.log(wishlist.length);
```

### Issue 30: Updating price of item already in cart
**Description:** Should update existing item price when changed
```javascript
let cart = [{name: "Apple", price: 1.99}];
let newPrice = 2.49;
cart[0] = {name: "Apple", price: newPrice};
console.log(cart[0]);
```

---

### Modify 1: Add item count badge
**Description:** Show total item count next to cart icon
```javascript
let cart = ["Apple", "Banana", "Cherry"];
console.log(cart.length);
```

### Modify 2: Add subtotal display
**Description:** Calculate and display subtotal before tax
```javascript
let cart = [{price: 10, qty: 2}, {price: 5, qty: 3}];
```

### Modify 3: Add tax line item
**Description:** Display calculated tax amount
```javascript
let subtotal = 100;
let taxRate = 0.08;
```

### Modify 4: Add total with all charges
**Description:** Display grand total including all fees
```javascript
let subtotal = 100;
let tax = 8;
let shipping = 5;
```

### Modify 5: Add quantity increment button
**Description:** Increase item quantity by 1
```javascript
let item = {name: "Apple", qty: 2};
```

### Modify 6: Add quantity decrement button
**Description:** Decrease item quantity by 1 (min 1)
```javascript
let item = {name: "Apple", qty: 2};
```

### Modify 7: Add remove item button
**Description:** Remove item from cart and recalculate
```javascript
let cart = [{name: "Apple", price: 1}, {name: "Banana", price: 2}];
```

### Modify 8: Add clear cart function
**Description:** Remove all items from cart
```javascript
let cart = [{name: "Apple"}, {name: "Banana"}];
```

### Modify 9: Add coupon code input
**Description:** Apply discount when valid coupon entered
```javascript
let total = 100;
let coupon = "SAVE10";
```

### Modify 10: Add shipping calculator
**Description:** Calculate shipping based on total weight
```javascript
let cart = [{weight: 1}, {weight: 2}];
```

### Modify 11: Add gift wrap option
**Description:** Add $2 gift wrap fee per item
```javascript
let cart = [{name: "Apple", price: 10}];
```

### Modify 12: Add estimated delivery date
**Description:** Show estimated delivery date (today + 5 days)
```javascript
let today = new Date();
```

### Modify 13: Add stock indicator
**Description:** Show "In Stock" or "Low Stock" based on quantity
```javascript
let stock = 3;
```

### Modify 14: Add color/size variant selector
**Description:** Allow selecting product variant before adding
```javascript
let product = {name: "T-Shirt", colors: ["Red", "Blue"], sizes: ["S", "M", "L"]};
```

### Modify 15: Add save for later
**Description:** Move item from cart to saved items list
```javascript
let cart = [{name: "Apple"}];
let saved = [];
```

### Modify 16: Add move to wishlist
**Description:** Move item from cart to wishlist
```javascript
let cart = [{name: "Apple"}];
let wishlist = [];
```

### Modify 17: Add recently viewed
**Description:** Track last 5 viewed products
```javascript
let viewed = [];
function viewProduct(product) {
  return product;
}
```

### Modify 18: Add product recommendations
**Description:** Show related products based on cart items
```javascript
let cart = [{category: "fruit"}];
let allProducts = [{name: "Apple", category: "fruit"}, {name: "Carrot", category: "veg"}];
```

### Modify 19: Add minimum order warning
**Description:** Warn if cart total is below $10 minimum
```javascript
let total = 8;
```

### Modify 20: Add maximum order limit
**Description:** Warn if cart total exceeds $1000
```javascript
let total = 1500;
```

### Modify 21: Add quantity validation
**Description:** Ensure quantity is positive integer
```javascript
function setQty(item, qty) {
  item.qty = qty;
}
```

### Modify 22: Add price validation
**Description:** Ensure price is positive number
```javascript
function setPrice(item, price) {
  item.price = price;
}
```

### Modify 23: Add cart persistence
**Description:** Save cart to localStorage
```javascript
let cart = [{name: "Apple", price: 1}];
```

### Modify 24: Add cart restore
**Description:** Load cart from localStorage on page load
```javascript
let cart = [];
```

### Modify 25: Add cart sharing
**Description:** Generate shareable link with cart contents
```javascript
let cart = [{name: "Apple", qty: 2}];
```

### Modify 26: Add price history
**Description:** Track price changes for items in cart
```javascript
let cart = [{name: "Apple", price: 1.99}];
```

### Modify 27: Add stock alerts
**Description:** Notify when item goes out of stock
```javascript
let item = {name: "Apple", inStock: true};
```

### Modify 28: Add back-in-stock notification
**Description:** Notify when previously out-of-stock item returns
```javascript
let item = {name: "Apple", inStock: false};
```

### Modify 29: Add price drop alert
**Description:** Notify when item price decreases
```javascript
let item = {name: "Apple", price: 1.99, previousPrice: 2.49};
```

### Modify 30: Add loyalty points
**Description:** Award 1 point per dollar spent
```javascript
let total = 150;
let points = 0;
```

### Modify 31: Add points redemption
**Description:** Redeem 100 points for $5 off
```javascript
let points = 200;
let total = 50;
```

### Modify 32: Add referral discount
**Description:** Apply 10% off when referred by friend
```javascript
let total = 100;
let referred = true;
```

### Modify 33: Add first-time buyer discount
**Description:** Apply 15% off for first purchase
```javascript
let isFirstPurchase = true;
let total = 100;
```

### Modify 34: Add seasonal discount
**Description:** Apply holiday season discount automatically
```javascript
let total = 100;
let month = new Date().getMonth();
```

### Modify 35: Add bundle discount
**Description:** Apply discount when buying specific items together
```javascript
let cart = [{name: "Shirt"}, {name: "Pants"}];
```

### Modify 36: Add tiered pricing
**Description:** Lower price per unit for larger quantities
```javascript
function getPrice(qty) {
  return 10;
}
console.log(getPrice(1));
console.log(getPrice(10));
```

### Modify 37: Add BOGO offer
**Description:** Buy one get one free for specific items
```javascript
let cart = [{name: "Shoes", price: 50, qty: 2}];
```

### Modify 38: Add flash sale timer
**Description:** Show countdown for limited-time deals
```javascript
let saleEnd = new Date(Date.now() + 3600000);
```

### Modify 39: Add cart timer
**Description:** Reserve items in cart for 15 minutes
```javascript
let cartTime = Date.now();
```

### Modify 40: Add abandoned cart email
**Description:** Send reminder if cart not checked out after 1 hour
```javascript
let lastActivity = Date.now() - 3600000;
```

### Modify 41: Add multi-currency support
**Description:** Convert prices to different currencies
```javascript
let price = 100;
let currency = "EUR";
```

### Modify 42: Add tax based on location
**Description:** Apply different tax rates by state
```javascript
let state = "CA";
let subtotal = 100;
```

### Modify 43: Add estimated tax tooltip
**Description:** Hover to see tax breakdown
```javascript
let taxDetails = {state: 5, county: 2, city: 1};
```

### Modify 44: Add item notes
**Description:** Allow adding notes to each cart item
```javascript
let item = {name: "Apple", notes: ""};
```

### Modify 45: Add gift message
**Description:** Allow adding gift message for recipients
```javascript
let item = {name: "Apple", giftMessage: ""};
```

### Modify 46: Add gift receipt
**Description:** Option to include gift receipt without prices
```javascript
let item = {name: "Apple", giftReceipt: false};
```

### Modify 47: Add printable receipt
**Description:** Generate printable order summary
```javascript
let order = {items: [], total: 0};
```

### Modify 48: Add email receipt
**Description:** Send order receipt via email
```javascript
let email = "customer@example.com";
let order = {items: [], total: 0};
```

### Modify 49: Add order tracking
**Description:** Show order status with tracking number
```javascript
let order = {status: "shipped", tracking: "1Z999AA10123456784"};
```

### Modify 50: Add return policy notice
**Description:** Show return policy link for each item
```javascript
let item = {name: "Apple", returnable: true};
```
