# Debugging Challenges - Level 106
## Theme: Tip Calculator Combining Strings, Math, HTML

---

### Error 1: Tip calculation formula
**Description:** Should calculate tip as bill * tipPercent / 100
```javascript
function calcTip(bill, percent) {
  return bill / percent * 100;
}
console.log(calcTip(50, 15));
```

### Error 2: Total calculation missing tip
**Description:** Should return bill plus tip
```javascript
function totalWithTip(bill, tip) {
  return bill;
}
console.log(totalWithTip(50, 7.5));
```

### Error 3: Split bill not dividing
**Description:** Should split total among number of people
```javascript
function splitTotal(total, people) {
  return total * people;
}
console.log(splitTotal(57.5, 4));
```

### Error 4: Round to cents missing
**Description:** Should round amount to 2 decimal places
```javascript
function roundMoney(amount) {
  return amount;
}
console.log(roundMoney(14.375));
```

### Error 5: Display as currency typo
**Description:** Should format as $XX.XX
```javascript
let amount = 14.375;
console.log("$" + amount.toFixed(1));
```

### Error 6: Percent as decimal instead of integer
**Description:** Should treat 15 as 15%, not 0.15%
```javascript
function calcTip(bill, percent) {
  return bill * percent;
}
console.log(calcTip(50, 15));
```

### Error 7: String concatenation in display
**Description:** Should display "Tip: $7.50"
```javascript
let tip = 7.5;
console.log("Tip: " + "$" + tip);
```

### Error 8: Template literal typo
**Description:** Should use template literal with expression
```javascript
let bill = 50, tip = 7.5;
console.log(`Total: ${bill + tip}`);
```

### Error 9: Undefined variable for tax
**Description:** Should include tax in total calculation
```javascript
function calcTotal(bill, tipPercent) {
  let tip = bill * tipPercent / 100;
  return bill + tip + tax;
}
console.log(calcTotal(50, 15));
```

### Error 10: Wrong property name
**Description:** Should access billAmount from object
```javascript
let transaction = {billAmount: 50, tipPercent: 15};
console.log(transaction.bill * transaction.tipPercent / 100);
```

### Error 11: Const reassignment for bill
**Description:** Should modify bill value
```javascript
const bill = 50;
bill = bill + 10;
console.log(bill);
```

### Error 12: Function not returning tip
**Description:** Should return the calculated tip amount
```javascript
function calcTip(bill, percent) {
  let tip = bill * percent / 100;
}
console.log(calcTip(50, 15));
```

### Error 13: Wrong operator for percentage
**Description:** Should calculate percentage correctly
```javascript
let tip = 50 * 15%;
console.log(tip);
```

### Error 14: Missing parameter default
**Description:** Should use 15% as default tip
```javascript
function calcTip(bill, percent) {
  return bill * percent / 100;
}
console.log(calcTip(50));
```

### Error 15: Division by zero not handled
**Description:** Should handle splitting among 0 people
```javascript
function splitBill(total, people) {
  return total / people;
}
console.log(splitBill(100, 0));
```

### Error 16: parseInt for bill input
**Description:** Should parse bill amount from string
```javascript
let billInput = "50.50";
console.log(parseInt(billInput));
```

### Error 17: parseFloat for percent input
**Description:** Should parse tip percentage from string
```javascript
let percentInput = "15.5%";
console.log(parseFloat(percentInput));
```

### Error 18: Global variable from function
**Description:** Should not create unintended global
```javascript
function calcTip(bill, percent) {
  tip = bill * percent / 100;
  return tip;
}
console.log(calcTip(50, 15));
console.log(tip);
```

### Error 19: Variable shadowing
**Description:** Should use correct bill value
```javascript
let bill = 100;
function calcTip(bill, percent) {
  return bill * percent / 100;
}
console.log(calcTip(50, 15));
console.log(bill);
```

### Error 20: toFixed on undefined
**Description:** Should safely format amount
```javascript
let amount;
console.log(amount.toFixed(2));
```

### Error 21: toFixed returns string for math
**Description:** Should do math with number, not string
```javascript
let tip = 7.5;
let formatted = tip.toFixed(2);
let total = 50 + formatted;
console.log(total);
```

### Error 22: NaN from invalid input
**Description:** Should handle invalid numeric input
```javascript
function calcTip(bill, percent) {
  return bill * percent / 100;
}
console.log(calcTip("abc", "xyz"));
```

### Error 23: isNaN check wrong
**Description:** Should validate inputs are numbers
```javascript
function validateInput(value) {
  if (value === NaN) return false;
  return true;
}
console.log(validateInput("abc"));
```

### Error 24: Math.round for currency
**Description:** Should round to 2 decimal places
```javascript
let amount = 14.375;
console.log(Math.round(amount));
```

### Error 25: Math.floor for rounding down
**Description:** Should not round down currency
```javascript
let amount = 14.379;
console.log(Math.floor(amount * 100) / 100);
```

### Error 26: Math.ceil for rounding up
**Description:** Should not overcharge customer
```javascript
let amount = 14.371;
console.log(Math.ceil(amount * 100) / 100);
```

### Error 27: Number.EPSILON for precision
**Description:** Should handle floating point precisely
```javascript
let total = 0.1 + 0.2;
console.log(total === 0.3);
```

### Error 28: String repeat for UI
**Description:** Should create separator line
```javascript
console.log("-".repeat(30));
```

### Error 29: PadStart for alignment
**Description:** Should align currency values
```javascript
let amounts = [7.5, 57.5, 14.38];
for (let a of amounts) {
  console.log("$" + String(a.toFixed(2)).padStart(8));
}
```

### Error 30: PadEnd for labels
**Description:** Should align labels to the left
```javascript
console.log("Subtotal".padEnd(15) + "$50.00");
```

### Error 31: Slice for string formatting
**Description:** Should extract last 2 chars from amount
```javascript
let amount = "7.50";
console.log(amount.slice(-2));
```

### Error 32: Split for display
**Description:** Should split label and value
```javascript
let line = "Tip: $7.50";
console.log(line.split(": "));
```

### Error 33: Replace for formatting
**Description:** Should replace decimal with comma
```javascript
let amount = "7.50";
console.log(amount.replace(".", ","));
```

### Error 34: IndexOf to find decimal
**Description:** Should find position of decimal point
```javascript
let amount = "7.50";
console.log(amount.indexOf("."));
```

### Error 35: CharAt to check first char
**Description:** Should get currency symbol
```javascript
let formatted = "$7.50";
console.log(formatted.charAt(0));
```

### Error 36: String indexing for last char
**Description:** Should get last digit
```javascript
let amount = "7.50";
console.log(amount[amount.length]);
```

### Error 37: Includes for validation
**Description:** Should check if input contains "$"
```javascript
let input = "$50";
console.log(input.includes("$"));
```

### Error 38: StartsWith for currency check
**Description:** Should check if string starts with "$"
```javascript
let formatted = "$50.00";
console.log(formatted.startsWith("$"));
```

### Error 39: EndsWith for cent check
**Description:** Should check if amount ends with "00"
```javascript
let amount = "50.00";
console.log(amount.endsWith("00"));
```

### Error 40: Trim for input cleanup
**Description:** Should clean whitespace from input
```javascript
let input = "  50  ";
console.log(parseFloat(input));
```

### Error 41: ToLowerCase for comparison
**Description:** Should handle case-insensitive currency code
```javascript
function isUSD(code) {
  return code === "USD";
}
console.log(isUSD("usd"));
```

### Error 42: ToUpperCase for code
**Description:** Should convert currency code to uppercase
```javascript
let code = "usd";
console.log(code.toUpperCase());
```

### Error 43: Length check for empty bill
**Description:** Should check if bill input is empty
```javascript
let input = "";
if (input.length === 0) {
  console.log("Enter a bill amount");
}
```

### Error 44: Concat for building string
**Description:** Should build complete receipt line
```javascript
let label = "Total";
let amount = "$57.50";
console.log(label.concat(": ", amount));
```

### Error 45: Substring for extracting cents
**Description:** Should get cents part of amount
```javascript
let amount = "57.50";
console.log(amount.substring(amount.indexOf(".") + 1));
```

### Error 46: LastIndexOf for multiple decimals
**Description:** Should check if input has multiple decimals
```javascript
let input = "5.5.0";
console.log(input.lastIndexOf("."));
```

### Error 47: Search for pattern
**Description:** Should find first digit in string
```javascript
let input = "Bill: $50";
console.log(input.search(/\d/));
```

### Error 48: Match for extracting amount
**Description:** Should extract dollar amount from string
```javascript
let text = "Total: $57.50";
console.log(text.match(/\d+\.\d{2}/));
```

### Error 49: MatchAll for all amounts
**Description:** Should find all dollar amounts in text
```javascript
let text = "$10.00 tip on $50.00 bill";
let matches = [...text.matchAll(/\$(\d+\.\d{2})/g)];
console.log(matches);
```

### Error 50: Replace with regex
**Description:** Should remove $ sign from amount
```javascript
let amount = "$57.50";
console.log(amount.replace("$", ""));
```

### Error 51: Test for valid bill format
**Description:** Should validate bill format (number with 2 decimals)
```javascript
let bill = "50.00";
console.log(/^\d+\.\d{2}$/.test(bill));
```

### Error 52: Split on newline for receipt
**Description:** Should split receipt into lines
```javascript
let receipt = "Subtotal: $50.00\nTip: $7.50\nTotal: $57.50";
console.log(receipt.split("\n"));
```

### Error 53: Join for building receipt
**Description:** Should join array into receipt string
```javascript
let lines = ["Subtotal: $50.00", "Tip: $7.50", "Total: $57.50"];
console.log(lines.join("\n"));
```

### Error 54: toLocaleString for currency
**Description:** Should format number as currency
```javascript
let amount = 57.5;
console.log(amount.toLocaleString("en-US", {style: "currency", currency: "USD"}));
```

### Error 55: toExponential wrong usage
**Description:** Should not use scientific notation for currency
```javascript
let amount = 57.5;
console.log(amount.toExponential(2));
```

### Error 56: toPrecision wrong usage
**Description:** Should use correct precision for money
```javascript
let amount = 57.5;
console.log(amount.toPrecision(4));
```

### Error 57: ValueOf on number object
**Description:** Should get primitive value
```javascript
let amount = new Number(57.5);
console.log(amount.valueOf());
```

### Error 58: Number.MAX_VALUE misunderstanding
**Description:** Should not use MAX_VALUE as max bill
```javascript
let maxBill = Number.MAX_VALUE;
console.log(maxBill);
```

### Error 59: Number.MIN_VALUE as smallest
**Description:** Should use 0 as minimum bill
```javascript
let minBill = Number.MIN_VALUE;
console.log(minBill);
```

### Error 60: isFinite check
**Description:** Should check if bill amount is finite
```javascript
function isValidBill(amount) {
  return isFinite(amount);
}
console.log(isValidBill(Infinity));
```

### Error 61: isInteger for person count
**Description:** Should validate people count is integer
```javascript
function isValidPeople(n) {
  return Number.isInteger(n);
}
console.log(isValidPeople(4.5));
```

### Error 62: isSafeInteger for large bills
**Description:** Should check if bill is safe integer
```javascript
console.log(Number.isSafeInteger(9007199254740992));
```

### Error 63: Array for tip percentages
**Description:** Should store common tip percentages
```javascript
let tipPercentages = [10, 15, 18, 20, 25];
console.log(tipPercentages[2]);
```

### Error 64: For loop to calculate all tips
**Description:** Should show tip for each percentage
```javascript
let bill = 50;
let percentages = [10, 15, 20];
for (let i = 0; i < percentages.length; i++) {
  console.log(bill * percentages[i] / 100);
}
```

### Error 65: ForEach for tip options
**Description:** Should display each tip option
```javascript
let bill = 50;
[10, 15, 20].forEach(p => {
  console.log(`${p}%: $${(bill * p / 100).toFixed(2)}`);
});
```

### Error 66: Map for tip array
**Description:** Should create array of tip amounts
```javascript
let bill = 50;
let tips = [10, 15, 20].map(p => bill * p / 100);
console.log(tips);
```

### Error 67: Reduce for total calculation
**Description:** Should sum multiple bills
```javascript
let bills = [25, 35, 40];
let total = bills.reduce((sum, b) => sum + b, 0);
console.log(total);
```

### Error 68: Filter for bills under threshold
**Description:** Should filter bills that qualify for discount
```javascript
let bills = [25, 50, 75];
let small = bills.filter(b => b < 50);
console.log(small);
```

### Error 69: Find custom tip rate
**Description:** Should find tip rate matching criteria
```javascript
let rates = [10, 15, 18, 20, 25];
let found = rates.find(r => r >= 18);
console.log(found);
```

### Error 70: Every for valid bills
**Description:** Should check all bills are positive
```javascript
let bills = [25, -5, 50];
let allPositive = bills.every(b => b > 0);
console.log(allPositive);
```

---

### Issue 1: Tip on tax amount
**Description:** Should calculate tip on pre-tax bill only
```javascript
function calcTip(bill, tax, percent) {
  return (bill + tax) * percent / 100;
}
console.log(calcTip(50, 5, 15));
```

### Issue 2: Rounding differences between methods
**Description:** Should use consistent rounding across calculations
```javascript
function calcTip(bill, percent) {
  let tip = bill * percent / 100;
  return Math.round(tip * 100) / 100;
}
console.log(calcTip(50, 15));
```

### Issue 3: Split uneven amounts
**Description:** Should handle remainder when splitting unevenly
```javascript
function splitBill(total, people) {
  return total / people;
}
console.log(splitBill(100, 3));
```

### Issue 4: Displaying $0.00 tip
**Description:** Should properly display $0.00 for zero tip
```javascript
let tip = 0;
console.log("$" + tip.toFixed(2));
```

### Issue 5: Large group splitting
**Description:** Should split bill for large groups correctly
```javascript
function split(total, people) {
  return (total / people).toFixed(2);
}
console.log(split(100, 7));
```

### Issue 6: Tip percentage display format
**Description:** Should display "15%" not "0.15"
```javascript
let percent = 0.15;
console.log("Tip: " + percent);
```

### Issue 7: Memory of previous calculations
**Description:** Should clear or update previous result
```javascript
let lastResult = null;
function calcTip(bill, percent) {
  let tip = bill * percent / 100;
  lastResult = tip;
  return tip;
}
calcTip(50, 15);
calcTip(100, 20);
console.log(lastResult);
```

### Issue 8: Result caching
**Description:** Should return cached result for same inputs
```javascript
let cache = {};
function calcTip(bill, percent) {
  let key = bill + "-" + percent;
  if (cache[key]) return cache[key];
  let tip = bill * percent / 100;
  cache[key] = tip;
  return tip;
}
console.log(calcTip(50, 15));
```

### Issue 9: Input sanitization
**Description:** Should sanitize dollar sign in bill input
```javascript
let input = "$50.00";
console.log(parseFloat(input));
```

### Issue 10: Percent input with % sign
**Description:** Should handle percent sign in input
```javascript
let input = "15%";
console.log(parseInt(input));
```

### Issue 11: Rounding total to customer benefit
**Description:** Should decide whether to round up or down
```javascript
let total = 57.53;
console.log(Math.round(total * 100) / 100);
```

### Issue 12: Quick tip buttons calculation
**Description:** Should pre-calculate amounts for tip buttons
```javascript
let bill = 47.85;
[15, 18, 20].forEach(p => {
  console.log(`$${(bill * p / 100).toFixed(2)}`);
});
```

### Issue 13: Custom tip input validation
**Description:** Should accept custom tip percentage 0-100
```javascript
function isValidTip(percent) {
  return percent >= 0 && percent <= 100;
}
console.log(isValidTip(150));
```

### Issue 14: Receipt generation formatting
**Description:** Should generate properly formatted receipt
```javascript
function generateReceipt(bill, tip, total) {
  return `Bill: $${bill}\nTip: $${tip}\nTotal: $${total}`;
}
console.log(generateReceipt(50, 7.5, 57.5));
```

### Issue 15: Negative bill protection
**Description:** Should reject negative bill amounts
```javascript
function calcTip(bill, percent) {
  if (bill < 0) return 0;
  return bill * percent / 100;
}
console.log(calcTip(-50, 15));
```

### Issue 16: Tip shown per person before split
**Description:** Should show total tip before per-person calculation
```javascript
function splitTip(total, people) {
  let perPerson = total / people;
  return perPerson;
}
console.log(splitTip(57.5, 4));
```

### Issue 17: Gratuity auto-included for large parties
**Description:** Should not double-add gratuity when user adds tip manually
```javascript
let bill = 200;
let partySize = 8;
let autoGrat = 0.18;
let userTip = 15;
let total = bill + bill * autoGrat / 100 + bill * userTip / 100;
console.log(total);
```

### Issue 18: Currency conversion rate accuracy
**Description:** Should use accurate and current conversion rates
```javascript
let usdToEur = 0.85;
console.log(57.5 * usdToEur);
```

### Issue 19: Tip on discounted amount
**Description:** Should calculate tip on discounted total, not original
```javascript
let original = 100;
let discount = 20;
let tipPercent = 15;
let total = original - discount;
let tip = original * tipPercent / 100;
console.log(total + tip);
```

### Issue 20: Rounding per-person amount correctly
**Description:** Should round individual amounts, not total before division
```javascript
function calcPerPerson(total, people) {
  return (total / people).toFixed(2);
}
console.log(calcPerPerson(57.53, 3));
```

### Issue 21: Tax calculation on subtotal vs total
**Description:** Should calculate tax on pre-tip amount
```javascript
let bill = 50;
let taxRate = 0.08;
let tipPercent = 15;
let tax = bill * taxRate;
let tip = (bill + tax) * tipPercent / 100;
console.log(bill + tax + tip);
```

### Issue 22: Tip percentage input as decimal
**Description:** Should handle user entering 0.15 instead of 15
```javascript
function calcTip(bill, percent) {
  return bill * percent;
}
console.log(calcTip(50, 0.15));
```

### Issue 23: Multiple currency displays at once
**Description:** Should show converted amounts without changing base
```javascript
let total = 57.5;
console.log("USD: $" + total + " EUR: " + (total * 0.85));
```

### Issue 24: Remembering tip rate across visits
**Description:** Should save and restore last used tip rate
```javascript
let lastTipRate = 15;
```

### Issue 25: Displaying 0.00 for no-tip scenario
**Description:** Should show $0.00 tip when tip is 0%
```javascript
function displayTip(percent) {
  return "$" + (50 * percent / 100).toFixed(2);
}
console.log(displayTip(0));
```

### Issue 26: Service charge vs tip confusion
**Description:** Should distinguish between service charge and voluntary tip
```javascript
let bill = 100;
let serviceCharge = 5;
let tip = 15;
let total = bill + serviceCharge + bill * tip / 100;
console.log(total);
```

### Issue 27: Gratuity included in taxable amount
**Description:** Should not charge tax on gratuity in some jurisdictions
```javascript
let bill = 50;
let gratuity = 10;
let tax = (bill + gratuity) * 0.08;
console.log(bill + gratuity + tax);
```

### Issue 28: Tip pooling distribution fairness
**Description:** Should distribute pooled tips based on hours worked
```javascript
function distributePool(pool, hours) {
  let totalHours = hours.reduce((s, h) => s + h, 0);
  return hours.map(h => (pool * h / totalHours).toFixed(2));
}
console.log(distributePool(100, [8, 6, 6]));
```

### Issue 29: Over-tipping protection
**Description:** Should warn when tip exceeds 30% of bill
```javascript
function warnExcessiveTip(bill, tip) {
  let pct = tip / bill * 100;
  if (pct > 30) return "high";
  return "ok";
}
console.log(warnExcessiveTip(50, 20));
```

### Issue 30: Split by unequal amounts
**Description:** Allow splitting bill by custom amounts per person
```javascript
function splitUnequal(total, amounts) {
  let sum = amounts.reduce((s, a) => s + a, 0);
  return amounts.map(a => (total * a / sum).toFixed(2));
}
console.log(splitUnequal(100, [30, 30, 40]));
```

---

### Modify 1: Add different tip percentages
**Description:** Offer 10%, 15%, 18%, 20%, and custom buttons
```javascript
let bill = 50;
```

### Modify 2: Add round up tip option
**Description:** Round total up to nearest dollar
```javascript
function roundUp(total) {
  return total;
}
console.log(roundUp(57.5));
```

### Modify 3: Add custom tip input
**Description:** Allow entering custom percentage
```javascript
function calcTip(bill, percent) {
  return bill * percent / 100;
}
```

### Modify 4: Add split bill feature
**Description:** Calculate amount per person
```javascript
function calcPerPerson(total, people) {
  return total;
}
console.log(calcPerPerson(100, 4));
```

### Modify 5: Add service rating buttons
**Description:** Set tip based on service: poor(10%), good(15%), great(20%)
```javascript
let bill = 50;
let service = "good";
```

### Modify 6: Add tax calculation
**Description:** Calculate and display tax amount
```javascript
function calcTotal(bill, taxRate, tipPercent) {
  return bill;
}
console.log(calcTotal(50, 8, 15));
```

### Modify 7: Add discount application
**Description:** Apply discount before tip calculation
```javascript
function calcTip(bill, discount, tipPercent) {
  return bill;
}
console.log(calcTip(50, 10, 15));
```

### Modify 8: Add currency selector
**Description:** Display amounts in different currencies
```javascript
function formatCurrency(amount, currency) {
  return amount;
}
console.log(formatCurrency(57.5, "EUR"));
```

### Modify 9: Add receipt preview
**Description:** Generate HTML receipt preview
```javascript
function generateHTML(bill, tip, total) {
  return "<div></div>";
}
```

### Modify 10: Add tip splitting by item
**Description:** Split tip based on what each person ordered
```javascript
function splitByItem(items, tipPercent) {
  return items;
}
console.log(splitByItem([{person: "A", amount: 30}, {person: "B", amount: 20}], 15));
```

### Modify 11: Add no-tip option
**Description:** Add button for no tip (0%)
```javascript
function calcTip(bill, percent) {
  return bill * percent / 100;
}
```

### Modify 12: Add tip rounding options
**Description:** Round tip to nearest $0.50 or $1
```javascript
function roundTip(tip, increment) {
  return tip;
}
console.log(roundTip(7.33, 0.5));
```

### Modify 13: Add tip pooling
**Description:** Pool tips and split among staff
```javascript
function poolTips(tips, staffCount) {
  return 0;
}
console.log(poolTips([10, 15, 20], 3));
```

### Modify 14: Add minimum tip warning
**Description:** Warn if tip is below 10%
```javascript
function warnLowTip(percent) {
  return false;
}
console.log(warnLowTip(5));
```

### Modify 15: Add maximum tip warning
**Description:** Warn if tip exceeds 50%
```javascript
function warnHighTip(percent) {
  return false;
}
console.log(warnHighTip(75));
```

### Modify 16: Add tip history
**Description:** Save recent tip calculations to array
```javascript
let tipHistory = [];
function calcTip(bill, percent) {
  return bill * percent / 100;
}
```

### Modify 17: Add average tip rate
**Description:** Calculate average tip percentage from history
```javascript
function avgTipRate(history) {
  return 0;
}
console.log(avgTipRate([{bill: 50, tip: 7.5}, {bill: 100, tip: 15}]));
```

### Modify 18: Add generous tipper badge
**Description:** Award badge if average tip > 20%
```javascript
function getBadge(avgRate) {
  return "normal";
}
console.log(getBadge(22));
```

### Modify 19: Add tip calculator preset
**Description:** Load preset values for common scenarios
```javascript
let presets = {
  quickMeal: {bill: 15, percent: 15},
  dinner: {bill: 50, percent: 18},
  celebration: {bill: 100, percent: 20}
};
```

### Modify 20: Add party size adjustment
**Description:** Adjust tip for large parties (auto-add gratuity)
```javascript
function recommendedTip(partySize) {
  return 15;
}
console.log(recommendedTip(8));
```

### Modify 21: Add coupon code feature
**Description:** Apply discount coupon before tip
```javascript
function applyCoupon(bill, code) {
  return bill;
}
console.log(applyCoupon(50, "SAVE10"));
```

### Modify 22: Add loyalty program
**Description:** Apply loyalty discount for return customers
```javascript
function loyaltyDiscount(bill, visits) {
  return bill;
}
console.log(loyaltyDiscount(50, 10));
```

### Modify 23: Add happy hour discount
**Description:** Apply happy hour discount automatically
```javascript
function happyHourDiscount(bill) {
  return bill;
}
```

### Modify 24: Add location-based tax
**Description:** Apply different tax rates by location
```javascript
function getTaxRate(location) {
  return 0.08;
}
console.log(getTaxRate("NY"));
```

### Modify 25: Add delivery fee
**Description:** Add delivery fee for takeout orders
```javascript
function addDeliveryFee(total, isDelivery) {
  return total;
}
console.log(addDeliveryFee(50, true));
```

### Modify 26: Add service charge
**Description:** Add service charge for large parties
```javascript
function addServiceCharge(total, partySize) {
  return total;
}
console.log(addServiceCharge(200, 10));
```

### Modify 27: Add currency conversion
**Description:** Convert total to different currency
```javascript
function convertCurrency(amount, from, to) {
  return amount;
}
console.log(convertCurrency(57.5, "USD", "EUR"));
```

### Modify 28: Add tip sharing
**Description:** Share tip breakdown via text message
```javascript
function shareTipBreakdown(bill, tip, people) {
  return "";
}
console.log(shareTipBreakdown(50, 7.5, 2));
```

### Modify 29: Add email receipt
**Description:** Send receipt via email
```javascript
function emailReceipt(email, bill, tip, total) {
  return true;
}
```

### Modify 30: Add print receipt
**Description:** Generate printer-friendly receipt
```javascript
function printReceipt(bill, tip, total) {
  return "";
}
```

### Modify 31: Add voice input
**Description:** Accept voice commands for bill amount
```javascript
function processVoiceInput(transcript) {
  return 0;
}
console.log(processVoiceInput("fifty dollars"));
```

### Modify 32: Add barcode scanner
**Description:** Scan bill barcode to auto-fill amount
```javascript
function scanBarcode(data) {
  return 0;
}
console.log(scanBarcode("012345678905"));
```

### Modify 33: Add photo receipt OCR
**Description:** Extract bill amount from photo
```javascript
function extractAmountFromImage(imageData) {
  return 0;
}
```

### Modify 34: Add tip suggestion AI
**Description:** Suggest tip based on service keywords
```javascript
function suggestTip(serviceDescription) {
  return 15;
}
console.log(suggestTip("The service was excellent"));
```

### Modify 35: Add currency detection
**Description:** Auto-detect currency from bill format
```javascript
function detectCurrency(billText) {
  return "USD";
}
console.log(detectCurrency("$50.00"));
```

### Modify 36: Add tip calculator themes
**Description:** Switch between light and dark themes
```javascript
function setTheme(theme) {
  console.log("Theme set");
}
```

### Modify 37: Add animation on tip calculation
**Description:** Animate tip amount when calculating
```javascript
function animateTip(tip) {
  console.log(tip);
}
```

### Modify 38: Add sound effects
**Description:** Play sound when tip is calculated
```javascript
function playTipSound() {
  console.log("cha-ching");
}
```

### Modify 39: Add haptic feedback
**Description:** Vibrate on button press (mobile)
```javascript
function hapticFeedback() {
  console.log("vibrate");
}
```

### Modify 40: Add keyboard shortcuts
**Description:** Press 1-5 for quick tip percentages
```javascript
function handleKeyPress(key) {
  console.log(key);
}
```

### Modify 41: Add tip calculator widget
**Description:** Create embeddable tip calculator widget
```javascript
function createWidget(containerId) {
  return document.getElementById(containerId);
}
```

### Modify 42: Add tip calculator API
**Description:** Create API for tip calculations
```javascript
let tipAPI = {
  calculate: function(bill, percent) {
    return bill * percent / 100;
  }
};
```

### Modify 43: Add offline support
**Description:** Cache tip calculator for offline use
```javascript
function enableOffline() {
  console.log("Ready offline");
}
```

### Modify 44: Add multi-language support
**Description:** Translate tip calculator UI
```javascript
function setLanguage(lang) {
  let translations = {en: "Tip", es: "Propina"};
  return translations[lang];
}
console.log(setLanguage("es"));
```

### Modify 45: Add accessibility features
**Description:** Add ARIA labels for screen readers
```javascript
function makeAccessible(element, label) {
  element.setAttribute("aria-label", label);
}
```

### Modify 46: Add tip calculation history chart
**Description:** Show chart of past tip calculations
```javascript
function generateChart(data) {
  return [];
}
console.log(generateChart([{date: "2024-01-01", tip: 7.5}]));
```

### Modify 47: Add tip splitting visualization
**Description:** Show pie chart of per-person amounts
```javascript
function generatePieChart(amounts) {
  return [];
}
console.log(generatePieChart([25, 25, 25, 25]));
```

### Modify 48: Add receipt itemization
**Description:** Allow itemizing bill items
```javascript
function addItem(items, name, price) {
  items.push({name, price});
  return items;
}
console.log(addItem([], "Burger", 12.99));
```

### Modify 49: Add tax deduction report
**Description:** Generate report for business meal tax deduction
```javascript
function taxDeductionReport(bill, tip, tax) {
  return {deductible: 0};
}
console.log(taxDeductionReport(50, 7.5, 4));
```

### Modify 50: Add expense categorization
**Description:** Categorize meals for expense tracking
```javascript
function categorizeMeal(restaurant, amount) {
  return "Meals & Entertainment";
}
console.log(categorizeMeal("McDonald's", 15));
```
