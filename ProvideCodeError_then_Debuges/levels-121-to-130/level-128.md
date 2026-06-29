# Level 128: Price Calculator with Coupons/Promotions (closures + math)

## Error Snippets

### Error 1: Floating point precision in price calculation
**Description:** Calculate 10% discount on a price
```javascript
function applyDiscount(price, percent) {
  return price - (price * percent / 100);
}
```

### Error 2: Closure not capturing discount rate correctly
**Description:** Create discount function with fixed rate
```javascript
function createDiscount(rate) {
  return function(price) {
    return price * (1 - rate);
  };
}
const tenPercentOff = createDiscount(0.1);
const twentyPercentOff = createDiscount(0.2);
```

### Error 3: Math.round for currency rounding
**Description:** Round price to 2 decimal places
```javascript
function roundPrice(price) {
  return Math.round(price * 100) / 100;
}
```

### Error 4: Reduce with wrong accumulator
**Description:** Calculate total after multiple discounts
```javascript
function applyMultipleDiscounts(price, discounts) {
  return discounts.reduce((currentPrice, discount) => {
    return currentPrice * (1 - discount);
  });
}
```

### Error 5: Not using toFixed for display
**Description:** Display final price
```javascript
function displayPrice(price) {
  return `$${price}`;
}
```

### Error 6: Coupon code comparison case sensitivity
**Description:** Validate coupon code
```javascript
function isValidCoupon(code) {
  const validCodes = ['SAVE10', 'SAVE20', 'FREESHIP'];
  return validCodes.includes(code);
}
```

### Error 7: NaN from undefined price
**Description:** Calculate tax for order
```javascript
function calculateTax(order) {
  const taxRate = 0.08;
  return order.total * taxRate;
}
```

### Error 8: Closure with stale data
**Description:** Create price calculator with tiered discounts
```javascript
function createTieredDiscount(tiers) {
  return function(price) {
    const applicable = tiers.find(t => price >= t.min && price < t.max);
    return price * (1 - applicable.discount);
  };
}
```

### Error 9: Reduce for percentage calculation
**Description:** Calculate total saved with multiple coupons
```javascript
const prices = [25, 40, 15];
const discount = 0.1;
const totalSaved = prices.reduce((saved, price) => saved + price * discount, 0);
```

### Error 10: Wrong operator precedence in discount
**Description:** Apply buy-one-get-one-half-off
```javascript
function calculateBOGO(price, quantity) {
  const fullPrice = Math.ceil(quantity / 2) * price;
  const halfPrice = Math.floor(quantity / 2) * price / 2;
  return fullPrice + halfPrice;
}
```

### Error 11: Not converting percentage string to number
**Description:** Parse discount percentage from input
```javascript
function parseDiscount(input) {
  return input.replace('%', '');
}
```

### Error 12: Math.floor instead of Math.round for currency
**Description:** Round up to nearest cent
```javascript
const price = 10.059;
const rounded = Math.floor(price * 100) / 100;
```

### Error 13: Modulo for divisibility check
**Description:** Check if total qualifies for free shipping
```javascript
function qualifiesForFreeShipping(total) {
  return total % 50 === 0;
}
```

### Error 14: Closure variable reassignment
**Description:** Create price tracker with min/max
```javascript
function createPriceTracker() {
  let min = Infinity;
  let max = -Infinity;
  return {
    record: function(price) {
      if (price < min) min = min;
      if (price > max) max = price;
    },
    getMin: () => min
  };
}
```

### Error 15: Not handling division by zero
**Description:** Calculate discount percentage
```javascript
function calculateDiscountPercent(original, sale) {
  return ((original - sale) / original) * 100;
}
```

### Error 16: parseInt without radix
**Description:** Parse price integer from string
```javascript
const price = parseInt('25.99');
```

### Error 17: Generator function for price sequence
**Description:** Generate price increments
```javascript
function* priceGenerator(start, step, count) {
  for (let i = 0; i < count; i++) {
    yield start + i * step;
  }
}
const gen = priceGenerator(10, 5, 3);
```

### Error 18: Wrong variable in discount calculation
**Description:** Apply student discount
```javascript
function studentDiscount(price) {
  const discount = 0.15;
  return price - discount;
}
```

### Error 19: Recursive function without base case
**Description:** Calculate compound discount
```javascript
function compoundDiscount(price, discounts, index = 0) {
  if (index >= discounts.length) return price;
  return compoundDiscount(price * (1 - discounts[index]), discounts, index + 1);
}
```

### Error 20: Not clearing interval for price timer
**Description:** Update price countdown
```javascript
function startPriceCountdown(startPrice, endPrice, durationMs) {
  const step = (startPrice - endPrice) / (durationMs / 100);
  let current = startPrice;
  const interval = setInterval(() => {
    current -= step;
    updateDisplay(current);
    if (current <= endPrice) clearInterval(interval);
  }, 100);
}
```

### Error 21: isNaN check on non-number
**Description:** Validate price input
```javascript
function isValidPrice(value) {
  return !isNaN(value);
}
```

### Error 22: Stack overflow in deep discount recursion
**Description:** Calculate discount chain with recursion
```javascript
function chainDiscounts(price, discounts) {
  if (discounts.length === 0) return price;
  return chainDiscounts(price * (1 - discounts[0]), discounts.slice(1));
}
```

### Error 23: Math.pow for compound interest
**Description:** Calculate price after yearly inflation
```javascript
function priceAfterInflation(price, rate, years) {
  return price * Math.pow(1 + rate, years);
}
```

### Error 24: Coupon expiry check with wrong date
**Description:** Check if coupon is still valid
```javascript
function isCouponValid(coupon) {
  const now = new Date();
  const expiry = new Date(coupon.expiryDate);
  return now <= expiry;
}
```

### Error 25: Closure not returning function
**Description:** Create multiplier for tax calculation
```javascript
function createTaxMultiplier(rate) {
  const multiplier = 1 + rate;
  return multiplier;
}
```

### Error 26: Wrong method for rounding
**Description:** Round to nearest 0.99
```javascript
function roundTo99(price) {
  return Math.floor(price) + 0.99;
}
```

### Error 27: Bracket mismatch in calculation
**Description:** Calculate price with tax and discount
```javascript
function calculateFinal(price, taxRate, discount) {
  return price * (1 - discount) * 1 + taxRate;
}
```

### Error 28: Coupon minimum not enforced
**Description:** Apply coupon only if minimum met
```javascript
function applyCoupon(cartTotal, coupon) {
  if (coupon.minimum && cartTotal < coupon.minimum) return cartTotal;
  return cartTotal - coupon.value;
}
```

### Error 29: Not using Number.EPSILON for comparison
**Description:** Compare calculated prices
```javascript
function pricesEqual(a, b) {
  return a === b;
}
```

### Error 30: Improper use of exponentiation
**Description:** Calculate price squared
```javascript
const price = 5;
const squared = price ^ 2;
```

### Error 31: Wrong calculation for buy-X-get-Y-free
**Description:** Calculate buy 2 get 1 free
```javascript
function buy2Get1Free(price, quantity) {
  const payFor = quantity - Math.floor(quantity / 3);
  return payFor * price;
}
```

### Error 32: Not handling stacked coupons
**Description:** Apply multiple coupons to price
```javascript
function applyStackedCoupons(price, coupons) {
  coupons.forEach(coupon => {
    price -= coupon.value;
  });
  return price;
}
```

### Error 33: Integer overflow not handled
**Description:** Calculate total for bulk order
```javascript
function bulkPrice(unitPrice, quantity) {
  return unitPrice * quantity;
}
```

### Error 34: Wrong accumulator initial value
**Description:** Sum cart items with reduce
```javascript
const items = [
  { price: 10, qty: 2 },
  { price: 15, qty: 1 }
];
const total = items.reduce((sum, item) => sum + item.price * item.qty);
```

### Error 35: toFixed returns string
**Description:** Double a price
```javascript
const price = 10.50;
const doubled = price.toFixed(2) * 2;
```

### Error 36: Math.random for deterministic discount
**Description:** Random discount generator
```javascript
function randomDiscount() {
  return Math.random() * 50;
}
```

### Error 37: Not checking coupon usage limit
**Description:** Apply coupon code
```javascript
function applyCouponCode(cart, code) {
  const coupon = getCoupon(code);
  if (coupon) {
    cart.discount = coupon.value;
  }
}
```

### Error 38: Inflating price calculation order
**Description:** Apply tax then discount (should be discount then tax)
```javascript
function calculateOrder(subtotal, taxRate, discountRate) {
  const withTax = subtotal * (1 + taxRate);
  return withTax * (1 - discountRate);
}
```

### Error 39: Closure chain with lost context
**Description:** Chain of price modifications
```javascript
function createPricePipeline() {
  const steps = [];
  return {
    addStep: (fn) => steps.push(fn),
    execute: (price) => steps.reduce((p, fn) => fn(p), price)
  };
}
```

### Error 40: Not using isFinite for price
**Description:** Check if price is valid number
```javascript
function isValidPrice(price) {
  return typeof price === 'number' && !isNaN(price);
}
```

### Error 41: String comparison for price filter
**Description:** Filter items under $50
```javascript
const items = [
  { name: 'Shirt', price: '25' },
  { name: 'Pants', price: '40' }
];
const cheap = items.filter(i => i.price < 50);
```

### Error 42: Wrong exponential operator for compounding
**Description:** Calculate compounded monthly price increase
```javascript
function monthlyIncrease(price, rate, months) {
  return price * (1 + rate) ** months;
}
```

### Error 43: Not handling tiered pricing
**Description:** Get price for quantity with tiered breaks
```javascript
function getTieredPrice(quantity) {
  const tiers = [
    { min: 1, price: 10 },
    { min: 10, price: 8 },
    { min: 50, price: 6 }
  ];
  return tiers.find(t => quantity >= t.min).price;
}
```

### Error 44: BigInt for currency
**Description:** Calculate using BigInt for precision
```javascript
const price = BigInt(10.99);
```

### Error 45: Not using clamp for discount
**Description:** Apply discount but not below zero
```javascript
function applyDiscount(price, discount) {
  return Math.max(0, price - discount);
}
```

### Error 46: Wrong method for percentage of total
**Description:** Calculate what percentage each item contributes
```javascript
function itemPercentage(itemPrice, total) {
  return (itemPrice / total) * 100;
}
```

### Error 47: Unary plus for string conversion
**Description:** Convert price string to number
```javascript
const price = +'25.99';
```

### Error 48: Coupon type switch missing default
**Description:** Apply different coupon types
```javascript
function applyCoupon(cart, coupon) {
  switch(coupon.type) {
    case 'flat':
      return cart - coupon.value;
    case 'percent':
      return cart * (1 - coupon.value / 100);
  }
}
```

### Error 49: Currency conversion without rounding
**Description:** Convert USD to EUR
```javascript
function usdToEur(usd, rate) {
  return usd * rate;
}
```

### Error 50: Deep freeze on price config
**Description:** Create immutable pricing config
```javascript
function createPricingConfig(config) {
  return Object.freeze(config);
}
const config = createPricingConfig({ taxRate: 0.08 });
config.taxRate = 0.1;
```

### Error 51: Wrong slice for price array
**Description:** Get first 5 prices
```javascript
const prices = [10, 20, 30, 40, 50, 60];
const first5 = prices.slice(0, 4);
```

### Error 52: Not handling bulk discount limits
**Description:** Apply bulk discount with max cap
```javascript
function bulkDiscount(price, quantity) {
  const discount = Math.min(quantity * 0.05, 0.3);
  return price * (1 - discount);
}
```

### Error 53: Using var in for loop for discount amounts
**Description:** Calculate discount for each item
```javascript
const discounts = [0.1, 0.15, 0.2];
for (var i = 0; i < discounts.length; i++) {
  setTimeout(() => console.log(`Discount ${i}: ${discounts[i] * 100}%`), 100);
}
```

### Error 54: Not rounding after multiplication
**Description:** Calculate total with quantity
```javascript
function lineTotal(price, qty) {
  return price * qty;
}
```

### Error 55: Wrong variable name in coupon mapping
**Description:** Get coupon values from coupon objects
```javascript
const coupons = [
  { code: 'SAVE10', value: 10 },
  { code: 'SAVE20', value: 20 }
];
const values = coupons.map(c => c.code);
```

### Error 56: Priority in chained ternary for pricing
**Description:** Determine price based on membership
```javascript
const price = isMember ? isPremium ? 15 : 20 : 25;
```

### Error 57: Coupon stack limit not enforced
**Description:** Apply coupons up to maximum
```javascript
function applyCoupons(basePrice, coupons, maxDiscount) {
  let totalDiscount = coupons.reduce((sum, c) => sum + c.value, 0);
  totalDiscount = Math.min(totalDiscount, maxDiscount);
  return basePrice - totalDiscount;
}
```

### Error 58: Not converting cents to dollars
**Description:** Display price from cents
```javascript
const priceInCents = 2599;
console.log(`$${priceInCents}`);
```

### Error 59: Wrong method for finding best coupon
**Description:** Find best coupon for cart
```javascript
function findBestCoupon(cartTotal, coupons) {
  return coupons.reduce((best, c) =>
    c.calculate(cartTotal) < best.calculate(cartTotal) ? c : best
  );
}
```

### Error 60: ToString coercion in price
**Description:** Concatenate price strings
```javascript
const item1 = 25;
const item2 = 40;
const total = item1 + item2;
```

### Error 61: Wrong index in price array
**Description:** Get median price
```javascript
const prices = [10, 20, 30, 40, 50];
const median = prices[2];
```

### Error 62: Not accounting for leap year in yearly pricing
**Description:** Calculate daily price from yearly
```javascript
function dailyFromYearly(yearly) {
  return yearly / 365;
}
```

### Error 63: Truncation instead of rounding
**Description:** Format price for display
```javascript
function formatPrice(price) {
  return `$${price.toFixed(0)}`;
}
```

### Error 64: Wrong accumulator type in groupBy price range
**Description:** Group products by price range
```javascript
const products = [
  { name: 'Shirt', price: 25 },
  { name: 'Pants', price: 40 }
];
const grouped = products.reduce((acc, p) => {
  const range = p.price < 30 ? 'budget' : 'premium';
  acc[range].push(p);
  return acc;
}, { budget: [], premium: [] });
```

### Error 65: Coupon percentage vs flat confusion
**Description:** Apply coupon without checking type
```javascript
function applyAnyCoupon(price, coupon) {
  return price - coupon.value;
}
```

### Error 66: Not resetting price after failed coupon
**Description:** Try coupon and revert on failure
```javascript
function tryCoupon(price, code) {
  const original = price;
  const coupon = getCoupon(code);
  if (coupon) price = applyCoupon(price, coupon);
  if (price < 0) price = original;
  return price;
}
```

### Error 67: Wrong formula for tip calculation
**Description:** Calculate 15% tip
```javascript
function calculateTip(bill, percent) {
  return bill * (percent / 100);
}
```

### Error 68: Price comparison with floating point
**Description:** Check if price equals exactly 10
```javascript
const price = 0.1 + 0.2;
console.log(price === 0.3);
```

### Error 69: Not using pricing cache
**Description:** Calculate price with cache
```javascript
const priceCache = {};
function getCachedPrice(itemId, price) {
  if (priceCache[itemId]) return priceCache[itemId];
  priceCache[itemId] = price;
  return price;
}
```

### Error 70: Array length for pricing count
**Description:** Count items that have price
```javascript
const items = [
  { name: 'Shirt', price: 25 },
  { name: 'Pants' }
];
const priced = items.filter(i => i.price).length;
```

## Issue Snippets

### Issue 1: Magic numbers for tax and discount rates
**Description:** Calculate order total
```javascript
const total = subtotal + subtotal * 0.08 - subtotal * 0.1;
```

### Issue 2: Not caching calculated prices
**Description:** Get price with tax multiple times
```javascript
function getPriceWithTax(price) {
  return price * 1.08;
}
```

### Issue 3: Using forEach for sum
**Description:** Sum all prices
```javascript
let total = 0;
prices.forEach(p => { total += p; });
```

### Issue 4: Not using Map for coupon lookup
**Description:** Find coupon by code
```javascript
function findCoupon(code) {
  return coupons.find(c => c.code === code);
}
```

### Issue 5: Deeply nested ternary for pricing
**Description:** Determine final price
```javascript
const final = isMember ? isPremium ? quantity > 10 ? price * 0.7 : price * 0.8 : price * 0.9 : price;
```

### Issue 6: Repeating price calculation
**Description:** Display price breakdown
```javascript
const subtotal = items.reduce((s, i) => s + i.price, 0);
document.getElementById('subtotal').textContent = subtotal;
const tax = subtotal * 0.08;
document.getElementById('tax').textContent = tax;
const total = subtotal + tax;
document.getElementById('total').textContent = total;
```

### Issue 7: Using var in pricing loop
**Description:** Apply discount to each price
```javascript
for (var i = 0; i < prices.length; i++) {
  console.log(applyDiscount(prices[i]));
}
```

### Issue 8: Not using Intl.NumberFormat
**Description:** Format currency
```javascript
function formatUSD(price) {
  return '$' + price.toFixed(2);
}
```

### Issue 9: Hardcoded tax rate
**Description:** Calculate sales tax
```javascript
const total = subtotal * 1.08;
```

### Issue 10: Not handling edge case zero price
**Description:** Calculate discount on free item
```javascript
function discountedPrice(price, discount) {
  return price - price * discount;
}
```

### Issue 11: Inefficient min/max price search
**Description:** Find cheapest and most expensive
```javascript
const min = Math.min(...prices);
const max = Math.max(...prices);
```

### Issue 12: Not using rounding consistently
**Description:** Round some but not all prices
```javascript
function calculateTotal(items) {
  return items.reduce((sum, i) => sum + Math.round(i.price * 100) / 100 * i.qty, 0);
}
```

### Issue 13: Price filtering with string methods
**Description:** Get items above $20
```javascript
const expensive = items.filter(i => i.price.toString() > '20');
```

### Issue 14: Not using closure for private discount rate
**Description:** Create discount calculator
```javascript
let discountRate = 0.1;
function applyDiscount(price) {
  return price * (1 - discountRate);
}
```

### Issue 15: Re-computing tax rate function
**Description:** Create tax calculator each time
```javascript
function getTax(amount) {
  const taxRate = 0.08;
  return amount * taxRate;
}
```

### Issue 16: Not validating coupon expiry date
**Description:** Apply coupon code
```javascript
function applyCoupon(code) {
  const coupon = coupons.find(c => c.code === code);
  if (coupon) return coupon.discount;
  return 0;
}
```

### Issue 17: Not handling minimum order amount for coupons
**Description:** Check if coupon can be applied
```javascript
function canApplyCoupon(coupon, total) {
  return coupon.active === true;
}
```

### Issue 18: Not rounding to 2 decimal places
**Description:** Calculate total with tax
```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0) * 1.08;
}
```

### Issue 19: Not checking coupon usage limits
**Description:** Use coupon code
```javascript
function redeemCoupon(code) {
  if (usedCoupons.includes(code)) return false;
  usedCoupons.push(code);
  return true;
}
```

### Issue 20: Not handling tax exemption
**Description:** Calculate order tax
```javascript
function getTax(subtotal) {
  return subtotal * 0.08;
}
```

### Issue 21: Not validating discount percentage bounds
**Description:** Apply percentage discount
```javascript
function applyPercentDiscount(price, percent) {
  return price * (1 - percent / 100);
}
```

### Issue 22: Not handling multi-currency rounding
**Description:** Convert and round price
```javascript
function convertCurrency(amount, rate) {
  return amount * rate;
}
```

### Issue 23: Not caching price calculation results
**Description:** Calculate bulk pricing
```javascript
function calculateBulkPrice(basePrice, qty) {
  if (qty >= 100) return basePrice * 0.8;
  if (qty >= 50) return basePrice * 0.85;
  if (qty >= 10) return basePrice * 0.9;
  return basePrice;
}
```

### Issue 24: Not handling free shipping threshold
**Description:** Calculate shipping cost
```javascript
function getShippingCost(total) {
  return 5.99;
}
```

### Issue 25: Not memoizing tax rate lookup
**Description:** Get tax rate for region
```javascript
function getTaxRate(region) {
  const rates = { US: 0.08, CA: 0.13, UK: 0.2, DE: 0.19 };
  return rates[region] || 0;
}
```

### Issue 26: Not validating bundle discount overlap
**Description:** Apply bundle discount
```javascript
function applyBundleDiscount(items) {
  const bundlePrice = items.reduce((s, i) => s + i.price, 0) * 0.85;
  return bundlePrice;
}
```

### Issue 27: Not handling split payments
**Description:** Split payment across methods
```javascript
function splitPayment(total, methods) {
  return methods.map(m => ({ method: m, amount: total / methods.length }));
}
```

### Issue 28: Not checking gift card balance eligibility
**Description:** Apply gift card to purchase
```javascript
function applyGiftCard(code, total) {
  const card = giftCards.find(g => g.code === code);
  if (card) return Math.min(card.balance, total);
  return 0;
}
```

### Issue 29: Not handling promo code stacking rules
**Description:** Apply multiple promo codes
```javascript
function applyPromoCodes(codes, total) {
  return codes.reduce((current, code) => {
    const promo = promos.find(p => p.code === code);
    return promo ? current * (1 - promo.discount) : current;
  }, total);
}
```

### Issue 30: Not calculating tiered subscription pricing
**Description:** Calculate subscription price by tier
```javascript
function getSubscriptionPrice(tier) {
  const prices = { basic: 9.99, pro: 19.99, enterprise: 49.99 };
  return prices[tier] || 0;
}
```

## Modify Snippets

### Modify 1: Add progressive discount calculator
**Description:** Higher discounts for higher spending
```javascript
function calculateProgressiveDiscount(total) {
  const tiers = [
    { min: 0, discount: 0 },
    { min: 50, discount: 0.05 },
    { min: 100, discount: 0.1 },
    { min: 200, discount: 0.15 },
    { min: 500, discount: 0.2 }
  ];
  let applicable = tiers[0];
  for (const tier of tiers) {
    if (total >= tier.min) applicable = tier;
  }
  return { discount: applicable.discount, saved: total * applicable.discount };
}
```

### Modify 2: Add coupon code validation with regex
**Description:** Validate coupon format before checking
```javascript
function validateCouponFormat(code) {
  const patterns = {
    PERCENT: /^SAVE\d{2}$/i,
    FLAT: /^FLAT\d{1,2}$/i,
    FREESHIP: /^FREESHIP$/i,
    BOGO: /^BOGO$/i
  };
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(code)) return type;
  }
  return null;
}
```

### Modify 3: Add price rounding to nearest 0.95/0.99
**Description:** Psychological pricing
```javascript
function psychologicalPrice(price) {
  const intPart = Math.floor(price);
  const decimal = price - intPart;
  if (decimal < 0.25) return intPart - 1 + 0.99;
  if (decimal < 0.75) return intPart + 0.49;
  return intPart + 0.95;
}
```

### Modify 4: Add tax calculator by location
**Description:** Calculate tax based on state
```javascript
function calculateTax(subtotal, stateCode) {
  const stateTax = {
    AL: 0.04, AK: 0, AZ: 0.056, AR: 0.065, CA: 0.0725,
    CO: 0.029, CT: 0.0635, DE: 0, FL: 0.06, GA: 0.04,
    HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07, IA: 0.06,
    KS: 0.065, KY: 0.06, LA: 0.0445, ME: 0.055, MD: 0.06,
    MA: 0.0625, MI: 0.06, MN: 0.06875, MS: 0.07, MO: 0.04225,
    MT: 0, NE: 0.055, NV: 0.0685, NH: 0, NJ: 0.06625,
    NM: 0.05125, NY: 0.04, NC: 0.0475, ND: 0.05, OH: 0.0575,
    OK: 0.045, OR: 0, PA: 0.06, RI: 0.07, SC: 0.06,
    SD: 0.045, TN: 0.07, TX: 0.0625, UT: 0.0485, VT: 0.06,
    VA: 0.053, WA: 0.065, WV: 0.06, WI: 0.05, WY: 0.04
  };
  const rate = stateTax[stateCode.toUpperCase()] || 0.08;
  return subtotal * rate;
}
```

### Modify 5: Add price comparison with percentage difference
**Description:** Compare two prices and show difference
```javascript
function comparePrices(price1, price2) {
  const diff = price2 - price1;
  const percentChange = price1 > 0 ? (diff / price1) * 100 : 0;
  return {
    price1,
    price2,
    difference: diff,
    isCheaper: diff > 0 ? 'second' : diff < 0 ? 'first' : 'same',
    percentChange: Math.abs(percentChange).toFixed(2),
    savings: Math.abs(diff).toFixed(2)
  };
}
```

### Modify 6: Add bulk pricing with JavaScript closure
**Description:** Create bulk price calculator
```javascript
function createBulkPricing(basePrice) {
  const tiers = [
    { min: 1, price: basePrice },
    { min: 10, price: basePrice * 0.9 },
    { min: 50, price: basePrice * 0.8 },
    { min: 100, price: basePrice * 0.7 }
  ];
  return function(quantity) {
    const applicable = [...tiers].reverse().find(t => quantity >= t.min);
    return { unitPrice: applicable.price, total: applicable.price * quantity };
  };
}
```

### Modify 7: Add price history tracking
**Description:** Track price changes over time
```javascript
function createPriceTracker() {
  const history = [];
  return {
    record: function(price, label) {
      history.push({ price, label, timestamp: new Date().toISOString() });
    },
    getHistory: () => [...history],
    getLowest: () => history.length > 0 ? history.reduce((min, h) => h.price < min.price ? h : min) : null,
    getHighest: () => history.length > 0 ? history.reduce((max, h) => h.price > max.price ? h : max) : null,
    getAverage: () => history.length > 0 ? history.reduce((s, h) => s + h.price, 0) / history.length : 0
  };
}
```

### Modify 8: Add coupon stacking logic with limits
**Description:** Stack multiple coupons with rules
```javascript
function stackCoupons(basePrice, coupons, rules = {}) {
  let finalPrice = basePrice;
  let totalDiscount = 0;
  const maxDiscount = rules.maxDiscount || basePrice;
  const maxCoupons = rules.maxCoupons || 3;
  const applicable = coupons.slice(0, maxCoupons);
  applicable.forEach(coupon => {
    let discount = 0;
    if (coupon.type === 'percent') discount = finalPrice * (coupon.value / 100);
    else if (coupon.type === 'flat') discount = coupon.value;
    totalDiscount += discount;
    if (totalDiscount > maxDiscount) {
      discount -= totalDiscount - maxDiscount;
      totalDiscount = maxDiscount;
    }
    finalPrice -= discount;
  });
  return { original: basePrice, final: finalPrice, saved: basePrice - finalPrice, couponsUsed: applicable.length };
}
```

### Modify 9: Add dynamic pricing based on time
**Description:** Time-based pricing (happy hour, etc.)
```javascript
function createTimeBasedPricing() {
  const schedules = [];
  return {
    addSchedule: (dayOfWeek, startHour, endHour, multiplier) => {
      schedules.push({ dayOfWeek, startHour, endHour, multiplier });
    },
    getPrice: (basePrice, date = new Date()) => {
      const day = date.getDay();
      const hour = date.getHours();
      const active = schedules.find(s =>
        s.dayOfWeek === day && hour >= s.startHour && hour < s.endHour
      );
      return active ? basePrice * active.multiplier : basePrice;
    }
  };
}
```

### Modify 10: Add price alert system
**Description:** Notify when price drops below target
```javascript
function createPriceAlert(targetPrice, callback) {
  let triggered = false;
  return function(currentPrice) {
    if (!triggered && currentPrice <= targetPrice) {
      triggered = true;
      callback(currentPrice, targetPrice);
    }
    return triggered;
  };
}
```

### Modify 11: Add installment calculator
**Description:** Calculate monthly payments
```javascript
function calculateInstallments(total, months, interestRate = 0) {
  const monthlyRate = interestRate / 12 / 100;
  if (monthlyRate === 0) return { monthlyPayment: total / months, totalPaid: total, interest: 0 };
  const payment = total * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPaid = payment * months;
  return {
    monthlyPayment: Math.round(payment * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    interest: Math.round((totalPaid - total) * 100) / 100
  };
}
```

### Modify 12: Add price rounding strategies
**Description:** Different rounding strategies
```javascript
function createPricingRounder(strategy) {
  const strategies = {
    standard: (p) => Math.round(p * 100) / 100,
    floor: (p) => Math.floor(p * 100) / 100,
    ceiling: (p) => Math.ceil(p * 100) / 100,
    psychological: (p) => {
      const int = Math.floor(p);
      const dec = p - int;
      if (dec < 0.25) return int - 1 + 0.99;
      if (dec < 0.75) return int + 0.49;
      return int + 0.95;
    },
    nearestNine: (p) => Math.floor(p) + 0.99
  };
  return (price) => (strategies[strategy] || strategies.standard)(price);
}
```

### Modify 13: Add currency converter with rates
**Description:** Convert between currencies
```javascript
class CurrencyConverter {
  constructor(rates) {
    this.rates = { USD: 1, ...rates };
  }
  convert(amount, from, to) {
    const usdAmount = amount / this.rates[from];
    return usdAmount * this.rates[to];
  }
  format(amount, currency) {
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$' };
    const symbol = symbols[currency] || currency + ' ';
    return symbol + amount.toFixed(2);
  }
}
```

### Modify 14: Add margin/pricing optimization
**Description:** Calculate optimal price for target margin
```javascript
function calculateOptimalPrice(costPrice, targetMarginPercent) {
  const price = costPrice / (1 - targetMarginPercent / 100);
  return { costPrice, targetMarginPercent, sellingPrice: Math.round(price * 100) / 100, margin: Math.round((price - costPrice) * 100) / 100 };
}
function calculateMargin(sellingPrice, costPrice) {
  return { margin: sellingPrice - costPrice, marginPercent: ((sellingPrice - costPrice) / sellingPrice * 100).toFixed(2) };
}
```

### Modify 15: Add coupon expiration checker
**Description:** Check and filter expired coupons
```javascript
function getValidCoupons(coupons) {
  const now = new Date();
  return coupons.filter(c => {
    if (!c.expiryDate) return true;
    return new Date(c.expiryDate) > now;
  }).map(c => ({
    ...c,
    daysLeft: c.expiryDate ? Math.ceil((new Date(c.expiryDate) - now) / (1000 * 60 * 60 * 24)) : null
  }));
}
```

### Modify 16: Add price memoization
**Description:** Cache price calculations for performance
```javascript
function memoizePrice(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

### Modify 17: Add split payment calculator
**Description:** Split total among multiple people
```javascript
function splitPayment(total, people, options = {}) {
  const { tax = 0, tip = 0, unequal = false } = options;
  const grandTotal = total + tax + tip;
  if (!unequal) {
    return {
      perPerson: Math.round(grandTotal / people * 100) / 100,
      total: grandTotal,
      people
    };
  }
  return { total: grandTotal, message: 'Use customSplit() for unequal splits' };
}
function customSplit(total, shares) {
  const totalShares = shares.reduce((s, sh) => s + sh, 0);
  return shares.map(sh => Math.round(total * sh / totalShares * 100) / 100);
}
```

### Modify 18: Add price trend analysis
**Description:** Analyze price trends over time
```javascript
function analyzePriceTrend(priceHistory) {
  if (priceHistory.length < 2) return { trend: 'insufficient_data' };
  const values = priceHistory.map(h => h.price);
  const first = values[0];
  const last = values[values.length - 1];
  const overallChange = last - first;
  const overallPercent = first > 0 ? (overallChange / first) * 100 : 0;
  const high = Math.max(...values);
  const low = Math.min(...values);
  const avg = values.reduce((s, p) => s + p, 0) / values.length;
  const direction = overallChange > 0 ? 'up' : overallChange < 0 ? 'down' : 'stable';
  return { first, last, high, low, avg, overallChange, overallPercent: overallPercent.toFixed(2), direction };
}
```

### Modify 19: Add MAP (Minimum Advertised Price) enforcement
**Description:** Enforce minimum price policy
```javascript
function enforceMAP(sellingPrice, mapPrice) {
  if (sellingPrice < mapPrice) {
    return { allowed: false, suggestedPrice: mapPrice, message: `Price cannot be below MAP of $${mapPrice.toFixed(2)}` };
  }
  return { allowed: true, price: sellingPrice };
}
```

### Modify 20: Add dynamic surcharge calculator
**Description:** Apply surcharges based on conditions
```javascript
function calculateSurcharges(basePrice, conditions) {
  let surcharges = [];
  if (conditions.peakTime) {
    const amount = basePrice * 0.15;
    surcharges.push({ name: 'Peak Time Surcharge', amount: Math.round(amount * 100) / 100 });
  }
  if (conditions.holiday) {
    const amount = basePrice * 0.1;
    surcharges.push({ name: 'Holiday Surcharge', amount: Math.round(amount * 100) / 100 });
  }
  if (conditions.location === 'remote') {
    const amount = basePrice * 0.05;
    surcharges.push({ name: 'Remote Location Surcharge', amount: Math.round(amount * 100) / 100 });
  }
  const totalSurcharge = surcharges.reduce((s, c) => s + c.amount, 0);
  return { surcharges, totalSurcharge, finalPrice: basePrice + totalSurcharge };
}
```

### Modify 21: Add price audit trail
**Description:** Log all price changes for compliance
```javascript
function createPriceAudit() {
  const log = [];
  return {
    recordChange: (itemId, oldPrice, newPrice, reason, userId) => {
      log.push({
        itemId, oldPrice, newPrice, reason, userId: userId || 'system',
        timestamp: new Date().toISOString(),
        changePercent: oldPrice > 0 ? ((newPrice - oldPrice) / oldPrice * 100).toFixed(2) : 0
      });
    },
    getAuditLog: (filters = {}) => {
      let filtered = [...log];
      if (filters.itemId) filtered = filtered.filter(e => e.itemId === filters.itemId);
      if (filters.since) filtered = filtered.filter(e => new Date(e.timestamp) > new Date(filters.since));
      return filtered;
    }
  };
}
```

### Modify 22: Add price bracket generator
**Description:** Generate price brackets for tiered pricing
```javascript
function generatePriceBrackets(basePrice, numBrackets, stepPercent) {
  const brackets = [];
  for (let i = 0; i < numBrackets; i++) {
    const multiplier = 1 - (i * stepPercent / 100);
    const minQty = i === 0 ? 1 : Math.pow(10, i);
    brackets.push({
      tier: i + 1,
      minQuantity: minQty,
      unitPrice: Math.round(basePrice * multiplier * 100) / 100,
      savingsPercent: Math.round((1 - multiplier) * 100)
    });
  }
  return brackets;
}
```

### Modify 23: Add price matrix for variants
**Description:** Calculate price based on multiple variant dimensions
```javascript
function createPriceMatrix(basePrice, variantDimensions) {
  return function(variantSelections) {
    let finalPrice = basePrice;
    Object.entries(variantSelections).forEach(([dimension, value]) => {
      const dim = variantDimensions[dimension];
      if (dim && dim[value]) {
        finalPrice += dim[value];
      }
    });
    return finalPrice;
  };
}
```

### Modify 24: Add price negotiation system
**Description:** Allow counter-offers on price
```javascript
function createNegotiator(initialPrice, minPrice, maxDiscount) {
  let currentOffer = initialPrice;
  let counterCount = 0;
  return {
    makeOffer: (offerPrice) => {
      counterCount++;
      if (offerPrice >= currentOffer) {
        return { accepted: true, price: offerPrice, message: 'Offer accepted' };
      }
      if (offerPrice < minPrice) {
        return { accepted: false, message: `Offer too low. Minimum is $${minPrice}` };
      }
      const counterOffer = Math.round((offerPrice + currentOffer) / 2 * 100) / 100;
      currentOffer = counterOffer;
      return { accepted: false, counterOffer, message: `Counter offer: $${counterOffer}` };
    },
    getCurrentPrice: () => currentOffer,
    getAttempts: () => counterCount
  };
}
```

### Modify 25: Add price forecasting
**Description:** Forecast future prices based on trends
```javascript
function forecastPrice(historicalPrices, periods = 3) {
  if (historicalPrices.length < 2) return null;
  const changes = [];
  for (let i = 1; i < historicalPrices.length; i++) {
    changes.push(historicalPrices[i] - historicalPrices[i - 1]);
  }
  const avgChange = changes.reduce((s, c) => s + c, 0) / changes.length;
  const forecasts = [];
  let lastPrice = historicalPrices[historicalPrices.length - 1];
  for (let i = 1; i <= periods; i++) {
    lastPrice += avgChange;
    forecasts.push({ period: i, forecastedPrice: Math.round(lastPrice * 100) / 100 });
  }
  return { basedOn: historicalPrices.length, periods: forecasts, trend: avgChange > 0 ? 'increasing' : 'decreasing' };
}
```

### Modify 26: Add coupon usage tracking
**Description:** Track how many times a coupon is used
```javascript
function createCouponManager() {
  const coupons = new Map();
  const usage = new Map();
  return {
    addCoupon: (code, discount, maxUses = 0) => {
      coupons.set(code, { discount, maxUses, active: true });
    },
    applyCoupon: (code, price) => {
      const coupon = coupons.get(code);
      if (!coupon || !coupon.active) return { success: false, price, message: 'Invalid coupon' };
      const used = usage.get(code) || 0;
      if (coupon.maxUses > 0 && used >= coupon.maxUses) {
        return { success: false, price, message: 'Coupon usage limit reached' };
      }
      usage.set(code, used + 1);
      const discounted = price - coupon.discount;
      return { success: true, price: Math.max(0, discounted), message: 'Coupon applied' };
    },
    getUsageStats: () => {
      const stats = {};
      coupons.forEach((coupon, code) => {
        stats[code] = { used: usage.get(code) || 0, maxUses: coupon.maxUses };
      });
      return stats;
    }
  };
}
```

### Modify 27: Add tax exemption validation
**Description:** Check if items are tax exempt
```javascript
function validateTaxExemption(items, exemptionData) {
  const taxExemptCategories = ['Food', 'Medicine', 'Books', 'Childrens Clothing'];
  const exemptItems = items.filter(item => taxExemptCategories.includes(item.category));
  const taxableItems = items.filter(item => !taxExemptCategories.includes(item.category));
  return {
    exemptItems,
    taxableItems,
    exemptTotal: exemptItems.reduce((s, i) => s + i.price * i.qty, 0),
    taxableTotal: taxableItems.reduce((s, i) => s + i.price * i.qty, 0)
  };
}
```

### Modify 28: Add price matching system
**Description:** Match competitor prices
```javascript
function createPriceMatcher() {
  const competitorPrices = {};
  return {
    setCompetitorPrice: (itemId, price, competitor) => {
      if (!competitorPrices[itemId]) competitorPrices[itemId] = [];
      competitorPrices[itemId].push({ competitor, price, date: new Date().toISOString() });
    },
    getLowestCompetitorPrice: (itemId) => {
      const prices = competitorPrices[itemId];
      if (!prices || prices.length === 0) return null;
      return prices.reduce((min, p) => p.price < min.price ? p : min);
    },
    shouldMatchPrice: (itemId, ourPrice) => {
      const lowest = this.getLowestCompetitorPrice(itemId);
      if (!lowest) return false;
      return lowest.price < ourPrice;
    }
  };
}
```

### Modify 29: Add price index calculation
**Description:** Calculate price index relative to baseline
```javascript
function calculatePriceIndex(items, basePeriodPrices) {
  const baseMap = new Map(basePeriodPrices.map(i => [i.id, i.price]));
  const indexItems = items.map(item => {
    const basePrice = baseMap.get(item.id);
    if (!basePrice) return null;
    const change = item.price - basePrice;
    const percentChange = basePrice > 0 ? (change / basePrice) * 100 : 0;
    return { id: item.id, name: item.name, basePrice, currentPrice: item.price, change, percentChange: percentChange.toFixed(2) };
  }).filter(Boolean);
  const totalChange = indexItems.reduce((s, i) => s + i.change, 0);
  const avgPercent = indexItems.reduce((s, i) => s + parseFloat(i.percentChange), 0) / indexItems.length;
  return { items: indexItems, totalChange, avgPercentChange: avgPercent.toFixed(2), indexBase: 100, currentIndex: (100 + avgPercent).toFixed(2) };
}
```

### Modify 30: Add subscription pricing calculator
**Description:** Calculate subscription pricing with billing cycles
```javascript
function calculateSubscriptionPrice(monthlyPrice, billingCycle, discountPercent) {
  const cycles = { monthly: 1, quarterly: 3, semiannual: 6, annual: 12 };
  const months = cycles[billingCycle] || 1;
  const cyclePrice = monthlyPrice * months;
  const discounted = cyclePrice * (1 - (discountPercent || 0) / 100);
  return {
    monthlyEquivalent: Math.round(discounted / months * 100) / 100,
    perCycle: Math.round(discounted * 100) / 100,
    savings: Math.round((cyclePrice - discounted) * 100) / 100,
    savingsPercent: discountPercent || 0
  };
}
```

### Modify 31: Add dynamic exchange rate updater
**Description:** Auto-update exchange rates
```javascript
async function createLiveConverter() {
  let rates = { USD: 1 };
  let lastUpdated = null;
  async function fetchRates() {
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      rates = await res.json();
      lastUpdated = new Date();
    } catch (err) {
      console.warn('Using cached rates');
    }
  }
  await fetchRates();
  return {
    convert: (amount, from, to) => amount / rates.rates[from] * rates.rates[to],
    getRates: () => ({ ...rates.rates, lastUpdated }),
    refresh: fetchRates
  };
}
```

### Modify 32: Add wholesale price calculator
**Description:** Calculate wholesale pricing tiers
```javascript
function calculateWholesalePrice(retailPrice, tier) {
  const tiers = {
    basic: { discount: 0.2, minOrder: 50 },
    silver: { discount: 0.3, minOrder: 100 },
    gold: { discount: 0.4, minOrder: 500 },
    platinum: { discount: 0.5, minOrder: 1000 }
  };
  const selected = tiers[tier] || tiers.basic;
  return {
    wholesalePrice: Math.round(retailPrice * (1 - selected.discount) * 100) / 100,
    discountPercent: selected.discount * 100,
    minimumOrder: selected.minOrder,
    savingsPerUnit: Math.round(retailPrice * selected.discount * 100) / 100
  };
}
```

### Modify 33: Add price elasticity calculator
**Description:** Estimate demand change based on price change
```javascript
function calculatePriceElasticity(originalPrice, newPrice, originalDemand, newDemand) {
  const priceChange = (newPrice - originalPrice) / originalPrice;
  const demandChange = (newDemand - originalDemand) / originalDemand;
  const elasticity = priceChange !== 0 ? demandChange / priceChange : 0;
  return {
    priceChangePercent: (priceChange * 100).toFixed(2),
    demandChangePercent: (demandChange * 100).toFixed(2),
    elasticity: Math.abs(elasticity).toFixed(2),
    type: Math.abs(elasticity) > 1 ? 'elastic' : Math.abs(elasticity) < 1 ? 'inelastic' : 'unit elastic',
    revenueChange: ((newPrice * newDemand) - (originalPrice * originalDemand)).toFixed(2)
  };
}
```

### Modify 34: Add price guarantee badge
**Description:** Show price guarantee with time window
```javascript
function createPriceGuarantee(price, daysGuaranteed = 30) {
  const guaranteeEnd = new Date();
  guaranteeEnd.setDate(guaranteeEnd.getDate() + daysGuaranteed);
  return {
    guaranteedPrice: price,
    guaranteeUntil: guaranteeEnd.toISOString(),
    daysRemaining: () => Math.ceil((guaranteeEnd - new Date()) / (1000 * 60 * 60 * 24)),
    isExpired: () => new Date() > guaranteeEnd,
    refundIfLower: (lowerPrice) => {
      if (lowerPrice < price) return price - lowerPrice;
      return 0;
    }
  };
}
```

### Modify 35: Add multi-currency price display
**Description:** Show price in all available currencies
```javascript
function createMultiCurrencyDisplay(basePrice, baseCurrency = 'USD') {
  const rates = { USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110.5, CAD: 1.25, AUD: 1.35 };
  const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$' };
  return {
    getAllPrices: () => {
      const prices = {};
      Object.entries(rates).forEach(([currency, rate]) => {
        prices[currency] = {
          price: Math.round(basePrice * rate * 100) / 100,
          symbol: symbols[currency] || currency
        };
      });
      return prices;
    },
    getPrice: (currency) => {
      const rate = rates[currency];
      if (!rate) return null;
      return { price: Math.round(basePrice * rate * 100) / 100, symbol: symbols[currency] || currency };
    }
  };
}
```

### Modify 36: Add price markdown schedule
**Description:** Schedule automatic price reductions
```javascript
function createMarkdownSchedule(initialPrice, schedule) {
  let currentPrice = initialPrice;
  const events = schedule.map(s => ({
    ...s,
    triggered: false
  }));
  return {
    checkAndUpdate: () => {
      const now = new Date();
      events.forEach(event => {
        if (!event.triggered && new Date(event.date) <= now) {
          currentPrice = event.price;
          event.triggered = true;
        }
      });
      return currentPrice;
    },
    getCurrentPrice: () => currentPrice,
    getUpcomingMarkdowns: () => events.filter(e => !e.triggered).sort((a, b) => new Date(a.date) - new Date(b.date))
  };
}
```

### Modify 37: Add price rounding by denomination
**Description:** Round to nearest denomination (e.g., 0.05)
```javascript
function roundToDenomination(price, denomination = 0.05) {
  return Math.round(price / denomination) * denomination;
}
```

### Modify 38: Add price cap enforcement
**Description:** Ensure price doesn't exceed maximum
```javascript
function enforcePriceCap(price, cap, action = 'cap') {
  const actions = {
    cap: () => Math.min(price, cap),
    reject: () => price > cap ? null : price,
    warn: () => { if (price > cap) console.warn(`Price $${price} exceeds cap of $${cap}`); return price; },
    percent: () => price > cap ? cap * 1.1 : price
  };
  return (actions[action] || actions.cap)();
}
```

### Modify 39: Add price anonymization for analytics
**Description:** Anonymize prices for data privacy
```javascript
function anonymizePrice(price, precision = 10) {
  return Math.round(price / precision) * precision;
}
```

### Modify 40: Add price QR code generator (price as data)
**Description:** Generate QR code data string for price
```javascript
function generatePriceQRData(itemId, price, currency = 'USD') {
  const data = {
    version: '1.0',
    type: 'price',
    itemId,
    price: Math.round(price * 100),
    currency,
    timestamp: Date.now(),
    checksum: (itemId + price + currency).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  };
  return btoa(JSON.stringify(data));
}
function decodePriceQRData(encoded) {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}
```

### Modify 41: Add price lock feature
**Description:** Lock price for a period
```javascript
function createPriceLock(price, durationMs = 3600000) {
  const lockedAt = Date.now();
  const expiresAt = lockedAt + durationMs;
  return {
    price,
    lockedAt,
    expiresAt,
    isValid: () => Date.now() < expiresAt,
    timeRemaining: () => Math.max(0, expiresAt - Date.now()),
    extend: (extraMs) => { expiresAt += extraMs; }
  };
}
```

### Modify 42: Add price banding visualization data
**Description:** Create data for price distribution chart
```javascript
function createPriceBands(items, numBands = 5) {
  const prices = items.map(i => i.price).sort((a, b) => a - b);
  if (prices.length === 0) return [];
  const min = prices[0];
  const max = prices[prices.length - 1];
  const bandWidth = (max - min) / numBands;
  const bands = Array.from({ length: numBands }, (_, i) => ({
    band: i + 1,
    rangeStart: min + i * bandWidth,
    rangeEnd: min + (i + 1) * bandWidth,
    items: [],
    count: 0
  }));
  items.forEach(item => {
    const bandIndex = Math.min(Math.floor((item.price - min) / bandWidth), numBands - 1);
    bands[bandIndex].items.push(item.name);
    bands[bandIndex].count++;
  });
  return bands;
}
```

### Modify 43: Add price trigger automation
**Description:** Trigger actions when price crosses threshold
```javascript
function createPriceTrigger(threshold, direction, action) {
  let wasBelow = true;
  return function(currentPrice) {
    const isBelow = currentPrice < threshold;
    if (direction === 'above' && wasBelow && !isBelow) {
      action(currentPrice);
    }
    if (direction === 'below' && !wasBelow && isBelow) {
      action(currentPrice);
    }
    wasBelow = isBelow;
  };
}
```

### Modify 44: Add price calculator with memory
**Description:** Remember recent calculations
```javascript
function createPriceCalculator() {
  const memory = [];
  return {
    calculate: (operation, ...args) => {
      const result = operation(...args);
      memory.push({ operation: operation.name, args, result, timestamp: new Date().toISOString() });
      return result;
    },
    getHistory: () => [...memory],
    undo: () => memory.length > 0 ? memory.pop().result : null
  };
}
```

### Modify 45: Add price grid for matrix pricing
**Description:** 2D pricing matrix for options
```javascript
function createPriceGrid(rowOptions, colOptions, priceFn) {
  const grid = {};
  rowOptions.forEach(row => {
    colOptions.forEach(col => {
      const key = `${row}|${col}`;
      grid[key] = priceFn(row, col);
    });
  });
  return {
    getPrice: (row, col) => grid[`${row}|${col}`],
    getGrid: () => {
      const rows = rowOptions.map(row => ({
        label: row,
        cols: colOptions.map(col => ({ label: col, price: grid[`${row}|${col}`] }))
      }));
      return { rows, colHeaders: colOptions };
    }
  };
}
```

### Modify 46: Add price distribution analysis
**Description:** Statistical analysis of price distribution
```javascript
function analyzePriceDistribution(prices) {
  const sorted = [...prices].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((s, p) => s + p, 0) / n;
  const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
  const variance = sorted.reduce((s, p) => s + (p - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  return { mean: mean.toFixed(2), median: median.toFixed(2), stdDev: stdDev.toFixed(2), q1: q1.toFixed(2), q3: q3.toFixed(2), min: sorted[0].toFixed(2), max: sorted[n-1].toFixed(2), count: n };
}
```

### Modify 47: Add price rules engine
**Description:** Apply complex pricing rules
```javascript
function createPricingRulesEngine() {
  const rules = [];
  return {
    addRule: (name, condition, action) => {
      rules.push({ name, condition, action });
    },
    apply: (price, context) => {
      let currentPrice = price;
      const applied = [];
      rules.forEach(rule => {
        if (rule.condition(context)) {
          currentPrice = rule.action(currentPrice, context);
          applied.push(rule.name);
        }
      });
      return { finalPrice: currentPrice, appliedRules: applied };
    }
  };
}
```

### Modify 48: Add price break-even analysis
**Description:** Calculate break-even point
```javascript
function calculateBreakeven(fixedCosts, variableCostPerUnit, sellingPrice) {
  const contributionMargin = sellingPrice - variableCostPerUnit;
  if (contributionMargin <= 0) return { profitable: false, message: 'Price does not cover variable costs' };
  const unitsToBreakeven = Math.ceil(fixedCosts / contributionMargin);
  return {
    breakevenUnits: unitsToBreakeven,
    breakevenRevenue: Math.round(unitsToBreakeven * sellingPrice * 100) / 100,
    contributionMargin: contributionMargin,
    profitable: true,
    profitAt100Units: Math.round((100 * contributionMargin - fixedCosts) * 100) / 100
  };
}
```

### Modify 49: Add price estimator with confidence
**Description:** Estimate price range with confidence interval
```javascript
function estimatePriceRange(historicalPrices, confidenceLevel = 0.95) {
  const sorted = [...historicalPrices].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((s, p) => s + p, 0) / n;
  const variance = sorted.reduce((s, p) => s + (p - mean) ** 2, 0) / n;
  const stdErr = Math.sqrt(variance / n);
  const zScore = confidenceLevel === 0.99 ? 2.576 : confidenceLevel === 0.95 ? 1.96 : 1.645;
  const margin = zScore * stdErr;
  return {
    estimatedPrice: mean.toFixed(2),
    confidenceLevel,
    range: { low: (mean - margin).toFixed(2), high: (mean + margin).toFixed(2) },
    basedOn: n + ' data points'
  };
}
```

### Modify 50: Add price API endpoint simulator
**Description:** Simulate price API responses
```javascript
function createPriceAPISimulator() {
  const priceData = {};
  return {
    setPrice: (sku, price, currency = 'USD') => {
      priceData[sku] = { price, currency, updatedAt: new Date().toISOString() };
    },
    getPrice: async (sku) => {
      await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
      const data = priceData[sku];
      if (!data) throw new Error('Price not found for SKU: ' + sku);
      return { sku, ...data };
    },
    bulkGetPrices: async (skus) => {
      const results = await Promise.allSettled(skus.map(s => this.getPrice(s)));
      return results.map((r, i) => ({
        sku: skus[i],
        status: r.status === 'fulfilled' ? 'success' : 'error',
        data: r.status === 'fulfilled' ? r.value : null,
        error: r.status === 'rejected' ? r.reason.message : null
      }));
    }
  };
}
```
