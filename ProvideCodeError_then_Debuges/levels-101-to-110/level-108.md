# Debugging Challenges - Level 108
## Theme: Simple Budget Tracker with Fundamentals

---

### Error 1: Add income not updating total
**Description:** Should add income amount to total balance
```javascript
let balance = 0;
function addIncome(amount) {
  balance + amount;
}
addIncome(1000);
console.log(balance);
```

### Error 2: Add expense not subtracting
**Description:** Should subtract expense from balance
```javascript
let balance = 1000;
function addExpense(amount) {
  return balance - amount;
}
addExpense(200);
console.log(balance);
```

### Error 3: Budget total calculation
**Description:** Should calculate total of all budget items
```javascript
let items = [{amount: 100}, {amount: 200}, {amount: 300}];
let total = 0;
for (let i = 0; i < items.length; i++) {
  total = items[i].amount;
}
console.log(total);
```

### Error 4: Balance variable undefined
**Description:** Should track running balance
```javascript
function addTransaction(type, amount) {
  if (type === "income") balance += amount;
  if (type === "expense") balance -= amount;
}
addTransaction("income", 1000);
console.log(balance);
```

### Error 5: Const for balance reassignment
**Description:** Should allow balance to change
```javascript
const balance = 0;
balance += 1000;
console.log(balance);
```

### Error 6: Missing return in getter
**Description:** Should return current balance
```javascript
function getBalance() {
  console.log(balance);
}
console.log(getBalance());
```

### Error 7: Typo in variable name
**Description:** Should use correct variable for total
```javascript
let totalIncome = 5000;
let totalExpenses = 3000;
let balance = totalIncome - totalExpense;
console.log(balance);
```

### Error 8: Wrong property access in object
**Description:** Should access category from transaction object
```javascript
let transaction = {type: "income", amount: 1000, category: "salary"};
console.log(transaction.Category);
```

### Error 9: Push return value confusion
**Description:** Should add transaction to history
```javascript
let history = [];
let newLength = history.push({type: "income", amount: 1000});
console.log(history.length);
```

### Error 10: Pop from empty history
**Description:** Should safely undo last transaction
```javascript
let history = [];
let last = history.pop();
console.log(last);
```

### Error 11: Filter transactions by type
**Description:** Should get only income transactions
```javascript
let transactions = [
  {type: "income", amount: 1000},
  {type: "expense", amount: 200}
];
let incomes = transactions.filter(t => t.type === "income");
console.log(incomes);
```

### Error 12: Map to extract amounts
**Description:** Should get array of all amounts
```javascript
let transactions = [{amount: 100}, {amount: 200}];
let amounts = transactions.map(t => t.amount);
console.log(amounts);
```

### Error 13: Reduce for total expenses
**Description:** Should sum all expense amounts
```javascript
let transactions = [
  {type: "expense", amount: 100},
  {type: "expense", amount: 200}
];
let total = transactions.reduce((sum, t) => sum + t.amount);
console.log(total);
```

### Error 14: Find transaction by category
**Description:** Should find first transaction with given category
```javascript
let transactions = [
  {category: "food", amount: 50},
  {category: "rent", amount: 1000}
];
let found = transactions.find(t => t.category === "rent");
console.log(found);
```

### Error 15: Every for budget check
**Description:** Should check if all expenses are under $500
```javascript
let expenses = [{amount: 100}, {amount: 600}];
let allUnder500 = expenses.every(e => e.amount < 500);
console.log(allUnder500);
```

### Error 16: Some for over budget check
**Description:** Should check if any expense exceeds $1000
```javascript
let expenses = [{amount: 500}, {amount: 1500}];
let hasLarge = expenses.some(e => e.amount > 1000);
console.log(hasLarge);
```

### Error 17: Sort transactions by amount
**Description:** Should sort transactions by amount descending
```javascript
let transactions = [{amount: 100}, {amount: 300}, {amount: 200}];
transactions.sort((a, b) => a.amount - b.amount);
console.log(transactions);
```

### Error 18: Includes for category check
**Description:** Should check if "food" category exists
```javascript
let categories = ["food", "rent", "utilities"];
console.log(categories.includes("food"));
```

### Error 19: IndexOf for category position
**Description:** Should find index of "rent" category
```javascript
let categories = ["food", "rent", "utilities"];
console.log(categories.indexOf("rent"));
```

### Error 20: Slice to get recent transactions
**Description:** Should get last 5 transactions
```javascript
let transactions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let recent = transactions.slice(-5);
console.log(recent);
```

### Error 21: Splice to remove transaction
**Description:** Should remove transaction at index 2
```javascript
let transactions = ["a", "b", "c", "d"];
transactions.splice(2);
console.log(transactions);
```

### Error 22: Concat to combine budgets
**Description:** Should combine two budget arrays
```javascript
let jan = [{amount: 100}];
let feb = [{amount: 200}];
let combined = jan.concat(feb);
console.log(combined.length);
```

### Error 23: Reverse for chronological order
**Description:** Should show newest transactions first
```javascript
let transactions = [1, 2, 3, 4, 5];
console.log(transactions.reverse());
```

### Error 24: Spread to copy array
**Description:** Should copy transactions array
```javascript
let transactions = [{amount: 100}];
let copy = [...transactions];
copy[0].amount = 200;
console.log(transactions[0].amount);
```

### Error 25: Destructure transaction object
**Description:** Should destructure amount and category
```javascript
let t = {amount: 100, category: "food"};
let {amount, category} = t;
console.log(amount, category);
```

### Error 26: Rest parameter for multiple items
**Description:** Should accept multiple expenses
```javascript
function addExpenses(...expenses) {
  return expenses.reduce((sum, e) => sum + e, 0);
}
console.log(addExpenses(10, 20, 30));
```

### Error 27: Default parameter for category
**Description:** Should default category to "misc"
```javascript
function addExpense(amount, category) {
  return {amount, category};
}
console.log(addExpense(50));
```

### Error 28: Shorthand property in transaction
**Description:** Should use shorthand property names
```javascript
function createTransaction(amount, category) {
  return {amount: amount, category: category};
}
console.log(createTransaction(100, "food"));
```

### Error 29: Method shorthand in budget object
**Description:** Should define method using shorthand
```javascript
let budget = {
  balance: 0,
  addIncome(amount) {
    this.balance += amount;
  }
};
budget.addIncome(1000);
console.log(budget.balance);
```

### Error 30: Computed property for categories
**Description:** Should use computed property for dynamic category key
```javascript
let cat = "food";
let budget = {[cat]: 500};
console.log(budget.food);
```

### Error 31: Optional chaining for nested
**Description:** Should safely access nested budget data
```javascript
let data = {budget: {balance: 1000}};
console.log(data.budget?.balance);
```

### Error 32: Nullish coalescing for defaults
**Description:** Should use 0 as default balance
```javascript
function getBalance(data) {
  return data.balance ?? 0;
}
console.log(getBalance({}));
```

### Error 33: Logical OR assignment
**Description:** Should set default if falsy
```javascript
let budget = {balance: 0};
budget.balance ||= 1000;
console.log(budget.balance);
```

### Error 34: AND assignment for existing
**Description:** Should assign only if property exists
```javascript
let budget = {balance: 500};
budget.balance &&= 1000;
console.log(budget.balance);
```

### Error 35: Nullish assignment
**Description:** Should assign only if null/undefined
```javascript
let budget = {balance: null};
budget.balance ??= 1000;
console.log(budget.balance);
```

### Error 36: Template literal for report
**Description:** Should generate budget report string
```javascript
let income = 5000, expenses = 3000;
console.log(`Income: ${income}, Expenses: ${expenses}, Balance: ${income - expenses}`);
```

### Error 37: String concatenation for display
**Description:** Should display transaction description
```javascript
let t = {category: "food", amount: 50};
console.log(t.category + ": $" + t.amount);
```

### Error 38: Number formatting for currency
**Description:** Should format amount as currency
```javascript
let amount = 1000;
console.log("$" + amount.toFixed(2));
```

### Error 39: toFixed on null amount
**Description:** Should handle null amount formatting
```javascript
let amount = null;
console.log("$" + amount.toFixed(2));
```

### Error 40: parseFloat for user input
**Description:** Should parse amount from user input
```javascript
let input = "1000.50";
console.log(parseFloat(input));
```

### Error 41: parseInt for amount
**Description:** Should not lose decimal when parsing
```javascript
let input = "1000.50";
console.log(parseInt(input));
```

### Error 42: toString on undefined balance
**Description:** Should convert balance safely
```javascript
let balance;
console.log("Balance: " + balance.toString());
```

### Error 43: String length for validation
**Description:** Should check if category name is valid length
```javascript
let category = "food";
if (category.length >= 2 && category.length <= 20) {
  console.log("Valid");
}
```

### Error 44: CharAt for category initial
**Description:** Should get first letter of category
```javascript
let category = "food";
console.log(category.charAt(0));
```

### Error 45: ToUpperCase for category display
**Description:** Should display category in uppercase
```javascript
let category = "food";
console.log(category.toUpperCase());
```

### Error 46: ToLowerCase for comparison
**Description:** Should compare categories case-insensitively
```javascript
function isFood(category) {
  return category === "food";
}
console.log(isFood("Food"));
```

### Error 47: Trim for input cleaning
**Description:** Should clean whitespace from category input
```javascript
let input = "  food  ";
console.log(input.trim());
```

### Error 48: PadStart for account display
**Description:** Should right-align amounts in report
```javascript
let amounts = [50, 1000, 250];
for (let a of amounts) {
  console.log("$" + String(a.toFixed(2)).padStart(8));
}
```

### Error 49: PadEnd for category labels
**Description:** Should left-align category names
```javascript
console.log("Category".padEnd(15) + "Amount");
```

### Error 50: Repeat for visual separator
**Description:** Should create budget report separator
```javascript
console.log("=".repeat(30));
```

### Error 51: Split for CSV budget data
**Description:** Should parse CSV budget line
```javascript
let line = "food,50.00";
console.log(line.split(","));
```

### Error 52: Replace for currency symbol removal
**Description:** Should remove $ from amount string
```javascript
let amount = "$50.00";
console.log(amount.replace("$", ""));
```

### Error 53: Includes for category filter
**Description:** Should check if note mentions "urgent"
```javascript
let note = "Need to pay rent urgently";
console.log(note.includes("urgent"));
```

### Error 54: StartsWith for payee check
**Description:** Should check if payee starts with specific prefix
```javascript
let payee = "Netflix Subscription";
console.log(payee.startsWith("Netflix"));
```

### Error 55: EndsWith for category checking
**Description:** Should check if category ends with "ing"
```javascript
let category = "shopping";
console.log(category.endsWith("ing"));
```

### Error 56: IndexOf for note search
**Description:** Should find position of keyword in note
```javascript
let note = "Payment for utilities";
console.log(note.indexOf("utilities"));
```

### Error 57: LastIndexOf for date parsing
**Description:** Should find last slash in date string
```javascript
let date = "2024/01/15";
console.log(date.lastIndexOf("/"));
```

### Error 58: Search for pattern in note
**Description:** Should find first digit in transaction note
```javascript
let note = "Refund for order #12345";
console.log(note.search(/\d/));
```

### Error 59: Match for amount extraction
**Description:** Should extract dollar amount from note
```javascript
let note = "Paid $50.00 for food";
console.log(note.match(/\$(\d+\.\d{2})/));
```

### Error 60: MatchAll for all amounts in note
**Description:** Should find all dollar amounts in description
```javascript
let note = "Bought $30 food and $50 gas";
let matches = [...note.matchAll(/\$(\d+)/g)];
console.log(matches.length);
```

### Error 61: Test for valid amount format
**Description:** Should validate amount has correct format
```javascript
let amount = "50.00";
console.log(/^\d+\.\d{2}$/.test(amount));
```

### Error 62: Regex for category validation
**Description:** Should validate category only contains letters
```javascript
let category = "food123";
console.log(/^[a-zA-Z]+$/.test(category));
```

### Error 63: Split by newline for report lines
**Description:** Should split multi-line report
```javascript
let report = "Income: $5000\nExpenses: $3000\nBalance: $2000";
console.log(report.split("\n"));
```

### Error 64: Join for building CSV
**Description:** Should join transactions into CSV string
```javascript
let transactions = [
  {category: "food", amount: 50},
  {category: "rent", amount: 1000}
];
let csv = transactions.map(t => `${t.category},${t.amount}`).join("\n");
console.log(csv);
```

### Error 65: toLocaleString for currency
**Description:** Should use locale formatting for amounts
```javascript
let amount = 1000.5;
console.log(amount.toLocaleString("en-US", {style: "currency", currency: "USD"}));
```

### Error 66: ValueOf on budget object
**Description:** Should get primitive value of balance
```javascript
let balance = new Number(1000);
console.log(balance.valueOf());
```

### Error 67: isNaN for input validation
**Description:** Should check if amount input is valid
```javascript
function isValidAmount(amount) {
  return !isNaN(amount);
}
console.log(isValidAmount("abc"));
```

```

### Error 68: isFinite for amount check
**Description:** Should check if amount is finite
```javascript
function isValidAmount(amount) {
  return isFinite(amount);
}
console.log(isValidAmount(Infinity));
```

### Error 69: Number.isInteger for count validation
**Description:** Should check if transaction count is integer
```javascript
let count = 5.5;
console.log(Number.isInteger(count));
```

### Error 70: Array.isArray for validation
**Description:** Should check if transactions is an array
```javascript
let data = {transactions: []};
console.log(Array.isArray(data.transactions));
```

---

### Issue 1: Double counting income
**Description:** Should not count income twice
```javascript
let balance = 0;
function addIncome(amount) {
  balance += amount;
  return balance;
}
addIncome(1000);
let current = addIncome(1000);
console.log(current);
```

### Issue 2: Negative expense allowed
**Description:** Should reject negative expense amounts
```javascript
function addExpense(amount) {
  if (amount > 0) {
    balance -= amount;
  }
}
```

### Issue 3: Budget category totals
**Description:** Should sum amounts by category
```javascript
let transactions = [
  {category: "food", amount: 50},
  {category: "food", amount: 30},
  {category: "rent", amount: 1000}
];
let foodTotal = 0;
for (let t of transactions) {
  if (t.category === "food") foodTotal += t.amount;
}
console.log(foodTotal);
```

### Issue 4: Overspending detection
**Description:** Should detect when expenses exceed income
```javascript
let income = 5000, expenses = 6000;
if (expenses > income) {
  console.log("Over budget!");
}
```

### Issue 5: Savings rate calculation
**Description:** Should calculate savings as percentage of income
```javascript
let income = 5000, expenses = 3500;
let savings = income - expenses;
let rate = (savings / income) * 100;
console.log(rate);
```

### Issue 6: Budget period reset
**Description:** Should reset budget for new month
```javascript
let monthlyBudget = {income: 0, expenses: 0};
function resetBudget() {
  monthlyBudget = {income: 0, expenses: 0};
}
resetBudget();
console.log(monthlyBudget.income);
```

### Issue 7: Recurring transaction detection
**Description:** Should identify recurring monthly transactions
```javascript
let transactions = [
  {category: "rent", amount: 1000, date: "2024-01-01"},
  {category: "rent", amount: 1000, date: "2024-02-01"}
];
let isRecurring = transactions.filter(t => t.category === "rent").length >= 2;
console.log(isRecurring);
```

### Issue 8: Partial budget allocation
**Description:** Should allocate remaining budget to savings
```javascript
let income = 5000;
let allocated = 4500;
let savings = income - allocated;
console.log(savings);
```

### Issue 9: Multiple currency support
**Description:** Should handle different currencies in budget
```javascript
let transactions = [
  {amount: 100, currency: "USD"},
  {amount: 50, currency: "EUR"}
];
let total = 0;
for (let t of transactions) {
  total += t.amount;
}
console.log(total);
```

### Issue 10: Empty transaction list
**Description:** Should handle empty transaction array
```javascript
function getTotal(transactions) {
  if (transactions.length === 0) return 0;
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
console.log(getTotal([]));
```

### Issue 11: Date sorting
**Description:** Should sort transactions by date
```javascript
let transactions = [
  {date: "2024-03-01", amount: 100},
  {date: "2024-01-01", amount: 200},
  {date: "2024-02-01", amount: 150}
];
transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
console.log(transactions);
```

### Issue 12: Duplicate transaction detection
**Description:** Should detect and flag duplicate transactions
```javascript
let t1 = {category: "food", amount: 50};
let t2 = {category: "food", amount: 50};
console.log(JSON.stringify(t1) === JSON.stringify(t2));
```

### Issue 13: Running balance accuracy
**Description:** Should maintain accurate running balance
```javascript
let balance = 1000;
balance -= 200;
balance -= 100;
balance += 500;
balance -= 300;
console.log(balance);
```

### Issue 14: Large number formatting
**Description:** Should format large budget numbers
```javascript
let amount = 1000000;
console.log(amount.toLocaleString());
```

### Issue 15: Percent calculation rounding
**Description:** Should round percentage to 1 decimal
```javascript
let spent = 3333, total = 10000;
let percent = (spent / total) * 100;
console.log(percent.toFixed(1));
```

### Issue 16: Budget vs actual comparison
**Description:** Should compare budgeted vs actual spending
```javascript
let budgeted = 500, actual = 450;
let diff = budgeted - actual;
console.log(diff);
```

### Issue 17: Recurring transaction frequency
**Description:** Should mark transactions that repeat monthly
```javascript
let transactions = [
  {category: "rent", date: "2024-01-01"},
  {category: "rent", date: "2024-02-01"},
  {category: "food", date: "2024-02-05"}
];
function isRecurring(t, all) {
  return all.filter(x => x.category === t.category).length > 1;
}
console.log(isRecurring(transactions[0], transactions));
```

### Issue 18: Projected vs actual savings
**Description:** Should track projected savings target vs actual
```javascript
let target = 10000;
let saved = 7500;
let progress = (saved / target) * 100;
console.log(progress);
```

### Issue 19: Budget category with no transactions
**Description:** Should show $0 for categories with no spending
```javascript
let categories = ["food", "rent", "utilities"];
let transactions = [{category: "food", amount: 100}];
for (let cat of categories) {
  let total = transactions.filter(t => t.category === cat).reduce((s, t) => s + t.amount, 0);
  console.log(cat + ": $" + total);
}
```

### Issue 20: Weekly vs monthly budget comparison
**Description:** Should normalize budgets to same time period
```javascript
let weeklyBudget = 500;
let monthlyBudget = weeklyBudget * 4;
console.log(monthlyBudget);
```

### Issue 21: Shared expense split calculation
**Description:** Should split shared expenses equally
```javascript
let sharedExpenses = [100, 50, 30];
let perPerson = sharedExpenses.reduce((s, e) => s + e, 0) / 2;
console.log(perPerson);
```

### Issue 22: Reimbursement tracking
**Description:** Should track who owes whom
```javascript
let paid = {Alice: 200, Bob: 150, Charlie: 100};
let eachOwes = (paid.Alice + paid.Bob + paid.Charlie) / 3;
console.log("Alice paid extra: " + (paid.Alice - eachOwes));
```

### Issue 23: Annual subscription cost display
**Description:** Should show per-month cost of annual subscriptions
```javascript
let annualFee = 119.88;
console.log("$" + (annualFee / 12).toFixed(2) + "/month");
```

### Issue 24: Coffee shop spending tracker
**Description:** Should calculate monthly coffee spending
```javascript
let dailyCoffee = 4.50;
let workingDays = 22;
console.log("$" + (dailyCoffee * workingDays).toFixed(2));
```

### Issue 25: Utility bill averaging
**Description:** Should average utility bills over 12 months
```javascript
let bills = [120, 115, 110, 105, 130, 140, 150, 145, 135, 125, 120, 115];
let avg = bills.reduce((s, b) => s + b, 0) / bills.length;
console.log(avg);
```

### Issue 26: Emergency fund target calculation
**Description:** Should calculate 6 months of expenses for emergency fund
```javascript
let monthlyExpenses = 3000;
let emergencyTarget = monthlyExpenses * 6;
console.log("$" + emergencyTarget);
```

### Issue 27: 50/30/20 budget rule
**Description:** Should allocate 50% needs, 30% wants, 20% savings
```javascript
let income = 5000;
let needs = income * 0.5;
let wants = income * 0.3;
let savings = income * 0.2;
console.log({needs, wants, savings});
```

### Issue 28: Discretionary spending remaining
**Description:** Should calculate remaining fun money after bills
```javascript
let income = 4000;
let bills = 2000;
let savings = 800;
let fun = income - bills - savings;
console.log("$" + fun);
```

### Issue 29: Daily spending limit
**Description:** Should calculate daily spending limit for month
```javascript
let monthlyBudget = 2000;
let daysInMonth = 30;
let daily = monthlyBudget / daysInMonth;
console.log("$" + daily.toFixed(2) + "/day");
```

### Issue 30: Rounding individual transactions vs total
**Description:** Should decide when to round in multi-step calculations
```javascript
let prices = [10.99, 5.49, 3.79];
let tax = prices.reduce((s, p) => s + p * 0.08, 0);
console.log(tax.toFixed(2));
```
---

### Modify 1: Add monthly budget reset
**Description:** Reset all budget data at start of new month
```javascript
function resetMonthly() {
  console.log("Budget reset");
}
```

### Modify 2: Add budget categories
**Description:** Organize expenses by predefined categories
```javascript
let categories = ["food", "rent", "utilities", "transportation", "entertainment"];
```

### Modify 3: Add category spending limits
**Description:** Set and enforce spending limits per category
```javascript
let limits = {food: 500, rent: 1000, utilities: 200};
```

### Modify 4: Add budget progress bars
**Description:** Show visual progress toward budget limits
```javascript
function showProgress(category, spent, limit) {
  return 0;
}
console.log(showProgress("food", 250, 500));
```

### Modify 5: Add income sources tracking
**Description:** Track multiple income sources separately
```javascript
let incomeSources = [{source: "Salary", amount: 5000}, {source: "Freelance", amount: 1000}];
```

### Modify 6: Add expense receipt storage
**Description:** Store receipt URLs with expenses
```javascript
let transaction = {category: "food", amount: 50, receipt: ""};
```

### Modify 7: Add transaction search
**Description:** Search transactions by keyword in notes
```javascript
function searchTransactions(transactions, keyword) {
  return transactions;
}
console.log(searchTransactions([{note: "groceries"}], "groceries"));
```

### Modify 8: Add date range filter
**Description:** Filter transactions between two dates
```javascript
function filterByDate(transactions, start, end) {
  return transactions;
}
```

### Modify 9: Add export to CSV
**Description:** Export all transactions as CSV
```javascript
function exportCSV(transactions) {
  return "";
}
```

### Modify 10: Add import from CSV
**Description:** Import transactions from CSV data
```javascript
function importCSV(csvData) {
  return [];
}
```

### Modify 11: Add budget goal tracking
**Description:** Set and track savings goals
```javascript
let goals = [{name: "Emergency Fund", target: 10000, saved: 5000}];
```

### Modify 12: Add debt tracking
**Description:** Track debts and payments
```javascript
let debts = [{name: "Credit Card", balance: 5000, apr: 0.18, minPayment: 150}];
```

### Modify 13: Add investment tracking
**Description:** Track investment portfolio value
```javascript
let investments = [{name: "AAPL", shares: 10, price: 150}];
```

### Modify 14: Add net worth calculation
**Description:** Calculate net worth (assets - liabilities)
```javascript
function calcNetWorth(assets, liabilities) {
  return 0;
}
console.log(calcNetWorth(50000, 20000));
```

### Modify 15: Add budget alerts
**Description:** Send alert when approaching category limit
```javascript
function checkAlerts(spent, limit) {
  return "";
}
console.log(checkAlerts(450, 500));
```

### Modify 16: Add recurring transaction automation
**Description:** Auto-add recurring monthly transactions
```javascript
function addRecurringTransactions(transactions) {
  return transactions;
}
```

### Modify 17: Add budget rollover
**Description:** Roll over unused budget to next month
```javascript
function rolloverBudget(currentBudget) {
  return currentBudget;
}
```

### Modify 18: Add envelope budgeting
**Description:** Implement envelope budgeting system
```javascript
let envelopes = {food: 500, rent: 1000};
function spendFromEnvelope(envelope, amount) {
  return true;
}
```

### Modify 19: Add multi-user budget
**Description:** Support shared budgets for couples/families
```javascript
let sharedBudget = {users: ["Alice", "Bob"], balance: 5000};
```

### Modify 20: Add budget sharing
**Description:** Share budget data with family members
```javascript
function shareBudget(budgetId, email) {
  return true;
}
```

### Modify 21: Add currency conversion for transactions
**Description:** Convert foreign transactions to base currency
```javascript
function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  return amount;
}
```

### Modify 22: Add tax deduction categorization
**Description:** Flag tax-deductible expenses
```javascript
let categories = {donations: true, medical: true, food: false};
```

### Modify 23: Add receipt scanning (OCR)
**Description:** Extract amount from receipt image
```javascript
function scanReceipt(image) {
  return {amount: 0, category: ""};
}
```

### Modify 24: Add spending insights
**Description:** Analyze spending patterns and provide insights
```javascript
function analyzeSpending(transactions) {
  return {biggestCategory: "", totalSpent: 0};
}
```

### Modify 25: Add budget variance report
**Description:** Compare actual vs planned spending
```javascript
function varianceReport(planned, actual) {
  return {};
}
console.log(varianceReport({food: 500}, {food: 450}));
```

### Modify 26: Add annual budget projection
**Description:** Project annual spending based on current trends
```javascript
function projectAnnual(monthlyAvg) {
  return monthlyAvg * 12;
}
console.log(projectAnnual(4000));
```

### Modify 27: Add emergency fund calculator
**Description:** Calculate how many months of expenses covered
```javascript
function emergencyFundMonths(savings, monthlyExpenses) {
  return 0;
}
console.log(emergencyFundMonths(15000, 3000));
```

### Modify 28: Add retirement readiness check
**Description:** Estimate if on track for retirement
```javascript
function retirementReadiness(age, savings, income) {
  return "on track";
}
```

### Modify 29: Add savings challenge tracker
**Description:** Track 52-week money challenge progress
```javascript
function savingsChallenge(week) {
  return 0;
}
console.log(savingsChallenge(10));
```

### Modify 30: Add no-spend day tracker
**Description:** Track days with zero spending
```javascript
function trackNoSpendDay(date) {
  return true;
}
```

### Modify 31: Add spending freeze period
**Description:** Track progress during spending freeze
```javascript
function freezeProgress(startDate, endDate) {
  return {daysPassed: 0, daysTotal: 0};
}
```

### Modify 32: Add impulse purchase tracker
**Description:** Log and analyze impulse purchases
```javascript
function logImpulse(item, amount) {
  return {item, amount, date: new Date()};
}
```

### Modify 33: Add subscription tracker
**Description:** Track all active subscriptions
```javascript
let subscriptions = [
  {name: "Netflix", amount: 15.99, renewal: "2024-02-15"}
];
```

### Modify 34: Add bill payment calendar
**Description:** Show upcoming bills in calendar view
```javascript
function upcomingBills(bills, days) {
  return [];
}
```

### Modify 35: Add payment reminder
**Description:** Remind about upcoming bill payments
```javascript
function paymentReminder(bill, daysUntilDue) {
  return "";
}
```

### Modify 36: Add amortization schedule
**Description:** Generate loan amortization schedule
```javascript
function amortizationSchedule(principal, rate, months) {
  return [];
}
console.log(amortizationSchedule(10000, 0.05, 12));
```

### Modify 37: Add compound interest calculator
**Description:** Calculate compound interest growth
```javascript
function compoundInterest(principal, rate, times, years) {
  return 0;
}
console.log(compoundInterest(1000, 0.05, 12, 10));
```

### Modify 38: Add inflation adjustment
**Description:** Adjust historical spending for inflation
```javascript
function inflationAdjust(amount, fromYear, toYear) {
  return amount;
}
console.log(inflationAdjust(1000, 2020, 2024));
```

### Modify 39: Add budget template system
**Description:** Create and apply budget templates
```javascript
let templates = {frugal: {food: 300, rent: 800}, moderate: {food: 500, rent: 1200}};
```

### Modify 40: Add budget cloning
**Description:** Clone last month's budget to current month
```javascript
function cloneBudget(lastMonth) {
  return JSON.parse(JSON.stringify(lastMonth));
}
```

### Modify 41: Add budget comparison (month over month)
**Description:** Compare spending between months
```javascript
function compareMonths(month1, month2) {
  return {changes: {}};
}
```

### Modify 42: Add spending trend line
**Description:** Calculate 3-month spending trend
```javascript
function spendingTrend(monthlyTotals) {
  return "increasing";
}
console.log(spendingTrend([3000, 3200, 3100]));
```

### Modify 43: Add seasonal spending adjustment
**Description:** Adjust budget for seasonal variations
```javascript
function seasonalAdjustment(category, month) {
  return 1.0;
}
console.log(seasonalAdjustment("utilities", 7));
```

### Modify 44: Add windfall management
**Description:** Suggest how to allocate unexpected income
```javascript
function allocateWindfall(amount) {
  return {savings: 0, debt: 0, spending: 0};
}
console.log(allocateWindfall(5000));
```

### Modify 45: Add budget gamification
**Description:** Award points for staying under budget
```javascript
function budgetScore(category, spent, limit) {
  return 0;
}
console.log(budgetScore("food", 400, 500));
```

### Modify 46: Add achievement badges
**Description:** Unlock badges for budget milestones
```javascript
function checkAchievements(transactions) {
  return [];
}
```

### Modify 47: Add spending streak counter
**Description:** Track consecutive days without overspending
```javascript
let streak = {current: 0, best: 0};
function logDay(withinBudget) {
  return streak;
}
```

### Modify 48: Add budget challenge mode
**Description:** Create 30-day budget challenge
```javascript
function startChallenge(dailyLimit) {
  return {day: 1, remaining: dailyLimit};
}
```

### Modify 49: Add financial personality quiz
**Description:** Determine user's spending personality
```javascript
function financialPersonality(answers) {
  return "saver";
}
```

### Modify 50: Add budget API integration
**Description:** Connect to bank API for auto-import
```javascript
function syncWithBank(apiKey, accountId) {
  return [];
}
```
