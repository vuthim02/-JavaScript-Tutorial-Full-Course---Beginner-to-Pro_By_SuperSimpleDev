# Level 123: Data Analytics Dashboard (reduce + sort + filter)

## Error Snippets

### Error 1: Reduce returning undefined for empty dataset
**Description:** Calculate average of an array of numbers
```javascript
const data = [];
const sum = data.reduce((acc, val) => acc + val, 0);
const avg = sum / data.length;
```

### Error 2: Sort comparator returning boolean
**Description:** Sort sales data ascending by amount
```javascript
const sales = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 800 },
  { month: 'Mar', amount: 1500 }
];
sales.sort((a, b) => a.amount > b.amount);
```

### Error 3: Filter by string comparison case sensitivity
**Description:** Filter data by category name
```javascript
const data = [
  { category: 'Electronics', sales: 500 },
  { category: 'Clothing', sales: 300 }
];
const filtered = data.filter(d => d.category === 'electronics');
```

### Error 4: Parsing date strings incorrectly for sorting
**Description:** Sort data by date in chronological order
```javascript
const data = [
  { date: '2024-03-15', value: 100 },
  { date: '2024-01-10', value: 200 },
  { date: '2024-02-20', value: 150 }
];
data.sort((a, b) => a.date - b.date);
```

### Error 5: GroupBy using reduce with wrong accumulator structure
**Description:** Group transactions by month
```javascript
const transactions = [
  { month: 'Jan', amount: 100 },
  { month: 'Jan', amount: 200 },
  { month: 'Feb', amount: 150 }
];
const grouped = transactions.reduce((acc, t) => {
  acc[t.month] = (acc[t.month] || 0) + t.amount;
}, {});
```

### Error 6: Map not returning for transformation
**Description:** Format numbers as currency strings
```javascript
const amounts = [100, 200, 150];
const formatted = amounts.map(amount => {
  `$${amount.toFixed(2)}`;
});
```

### Error 7: reduceRight used incorrectly
**Description:** Apply discount chain in reverse order
```javascript
const discounts = [0.1, 0.05, 0.2];
const finalPrice = discounts.reduceRight((price, discount) => {
  price * (1 - discount);
}, 100);
```

### Error 8: Filter on NaN values
**Description:** Remove invalid entries from dataset
```javascript
const data = [10, NaN, 20, null, 30, undefined];
const clean = data.filter(d => d);
```

### Error 9: Chart data not sorted before rendering
**Description:** Render bar chart with sorted data but sorting after render
```javascript
function renderChart(data) {
  data.sort((a, b) => a.value - b.value);
  data.forEach(d => {
    const bar = document.createElement('div');
    bar.style.height = `${d.value}px`;
    document.body.appendChild(bar);
  });
}
```

### Error 10: For loop boundary off by one
**Description:** Calculate moving average over 3 data points
```javascript
const data = [10, 20, 30, 40, 50];
const movingAvg = [];
for (let i = 0; i < data.length; i++) {
  const slice = data.slice(i, i + 3);
  const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
  movingAvg.push(avg);
}
```

### Error 11: Using forEach to build a new array
**Description:** Double all values in dataset
```javascript
const data = [1, 2, 3, 4, 5];
const doubled = data.forEach(d => d * 2);
```

### Error 12: Checking array emptiness wrong
**Description:** Check if filtered dataset has results
```javascript
const filtered = data.filter(d => d.value > 100);
if (filtered === []) {
  console.log('No results');
}
```

### Error 13: Wrong property in reduce for counting
**Description:** Count how many items are above threshold
```javascript
const data = [10, 50, 30, 80, 20];
const threshold = 25;
const count = data.reduce((acc, val) => {
  if (val > threshold) acc[val]++;
  return acc;
}, {});
```

### Error 14: Sort by string numbers
**Description:** Sort product IDs numerically
```javascript
const ids = ['10', '2', '100', '1'];
ids.sort();
```

### Error 15: Missing return in filter
**Description:** Get items with sales above 500
```javascript
const data = [
  { item: 'Shirt', sales: 300 },
  { item: 'Pants', sales: 600 }
];
const top = data.filter(d => {
  d.sales > 500;
});
```

### Error 16: Calling reduce on object values without Object.values
**Description:** Sum all values in a data object
```javascript
const data = { shirts: 10, pants: 20, hats: 15 };
const total = data.reduce((sum, val) => sum + val, 0);
```

### Error 17: Mutating original array in sort callback
**Description:** Sort data by value and add rank
```javascript
const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 10 },
  { name: 'C', value: 20 }
];
data.sort((a, b) => {
  a.rank = 1;
  return a.value - b.value;
});
```

### Error 18: Wrong accumulation in nested reduce
**Description:** Calculate total sales per category and overall total
```javascript
const data = [
  { category: 'A', sales: [100, 200] },
  { category: 'B', sales: [150, 50] }
];
const result = data.reduce((acc, item) => {
  const categoryTotal = item.sales.reduce((sum, s) => sum + s, 0);
  acc.total += categoryTotal;
  acc.byCategory[item.category] = categoryTotal;
  return acc;
}, { total: 0, byCategory: {} });
```

### Error 19: Using fill with objects in arrays
**Description:** Initialize an array of data objects for chart
```javascript
const chartData = new Array(12).fill({ month: '', value: 0 });
chartData[0].month = 'Jan';
```

### Error 20: Filter then map could be flatMap
**Description:** Get all high-value transaction amounts
```javascript
const transactions = [
  { id: 1, amounts: [100, 200, 50] },
  { id: 2, amounts: [300, 25] }
];
const highValues = transactions
  .filter(t => t.amounts.some(a => a > 100))
  .flatMap(t => t.amounts)
  .filter(a => a > 100);
```

### Error 21: Sort mutating original when copy needed
**Description:** Display top 5 values from dataset
```javascript
const data = [10, 50, 30, 80, 20, 60, 40, 70];
const sorted = data.sort((a, b) => b - a);
const top5 = sorted.slice(0, 5);
```

### Error 22: Template literal misplaced
**Description:** Format data point label
```javascript
const data = { month: 'Jan', value: 100 };
console.log('${data.month}: ${data.value}');
```

### Error 23: Parsing float with wrong radix
**Description:** Parse percentage values from strings
```javascript
const percentages = ['10.5%', '20.3%', '15.8%'];
const values = percentages.map(p => parseFloat(p, 10));
```

### Error 24: toFixed returns string
**Description:** Format average to 2 decimal places
```javascript
const values = [10.123, 20.456, 30.789];
const avg = values.reduce((a, b) => a + b, 0) / values.length;
const formatted = avg.toFixed(2);
const doubled = formatted * 2;
```

### Error 25: Reduce with spread operator for object creation
**Description:** Convert array of key-value pairs to object
```javascript
const pairs = [['a', 1], ['b', 2], ['c', 3]];
const obj = pairs.reduce((acc, [key, val]) => {
  return { ...acc, [key]: val };
});
```

### Error 26: Wrong method for checking all elements pass test
**Description:** Check if all data points are positive
```javascript
const data = [1, -2, 3, 4, 5];
const allPositive = data.some(d => d > 0);
```

### Error 27: Using indexOf for object lookup in array
**Description:** Find index of specific data point in array
```javascript
const data = [
  { id: 1, value: 10 },
  { id: 2, value: 20 }
];
const idx = data.indexOf({ id: 1, value: 10 });
```

### Error 28: Cumulative sum with wrong initial value
**Description:** Calculate cumulative sum of dataset
```javascript
const data = [10, 20, 30];
const cumulative = data.reduce((acc, val) => {
  const last = acc[acc.length - 1] || 0;
  acc.push(last + val);
  return acc;
}, 0);
```

### Error 29: FlatMap expecting single level
**Description:** Get all tags from all data items
```javascript
const data = [
  { name: 'A', tags: ['x', 'y'] },
  { name: 'B', tags: ['z'] }
];
const allTags = data.flatMap(d => d.tags.length);
```

### Error 30: Sort ignoring locale
**Description:** Sort names alphabetically with special characters
```javascript
const names = ['éclair', 'apple', 'zebra', 'café'];
names.sort();
```

### Error 31: Calling Math.max on array without spread
**Description:** Get maximum value from dataset
```javascript
const data = [10, 50, 30, 80, 20];
const max = Math.max(data);
```

### Error 32: Filter returning all objects due to truthy reference
**Description:** Get items with non-null description
```javascript
const data = [
  { name: 'A', description: 'First item' },
  { name: 'B', description: null },
  { name: 'C', description: '' }
];
const withDesc = data.filter(d => d.description);
```

### Error 33: Wrong argument in slice for quarterly data
**Description:** Get Q2 data (months 4-6) from annual data
```javascript
const monthly = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
const q2 = monthly.slice(3, 6);
```

### Error 34: Double counting in nested loops
**Description:** Count total occurrences of each category
```javascript
const data = [
  { categories: ['A', 'B'] },
  { categories: ['A', 'C'] },
  { categories: ['B', 'C'] }
];
const counts = {};
data.forEach(d => {
  d.categories.forEach(c => {
    if (counts[c]) {
      counts[c]++;
    } else {
      counts[c] = 1;
    }
  });
});
```

### Error 35: Not using nullish coalescing for defaults
**Description:** Set default value when data is missing
```javascript
const data = [
  { name: 'A', value: 10 },
  { name: 'B' }
];
data.forEach(d => {
  d.value = d.value || 0;
});
```

### Error 36: Type coercion in sort comparator
**Description:** Sort mixed type array
```javascript
const data = [10, '2', 30, '1', 20];
data.sort((a, b) => a - b);
```

### Error 37: Reduce for summing missing initial value
**Description:** Sum array of objects by property
```javascript
const data = [
  { value: 10 },
  { value: 20 },
  { value: 30 }
];
const sum = data.reduce((acc, d) => acc + d.value);
```

### Error 38: Not handling negative values in filter
**Description:** Keep only positive values from dataset
```javascript
const data = [-5, 0, 10, -3, 8];
const positive = data.filter(d => d);
```

### Error 39: Using delete on array element
**Description:** Remove outlier data points
```javascript
const data = [10, 2000, 20, 30, 40];
delete data[1];
```

### Error 40: Wrong spread location for merging
**Description:** Merge two datasets into one array
```javascript
const dataset1 = [1, 2, 3];
const dataset2 = [4, 5, 6];
const merged = dataset1.push(...dataset2);
```

### Error 41: Calling sort on non-array iterable
**Description:** Sort values from a Set
```javascript
const values = new Set([30, 10, 20]);
const sorted = values.sort((a, b) => a - b);
```

### Error 42: Reduce with property access on undefined
**Description:** Get total sales for specific category
```javascript
const data = [
  { category: 'A', sales: 100 },
  { category: 'B', sales: 200 }
];
const totalA = data.reduce((acc, d) => {
  if (d.category === 'A') acc += d.sales;
  return acc;
}, undefined);
```

### Error 43: Slice with negative start and end
**Description:** Get last 3 months from data
```javascript
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const last3 = months.slice(-3, months.length);
```

### Error 44: Map callback not returning for edge case
**Description:** Calculate growth percentage for each data point
```javascript
const data = [100, 200, 150, 300];
const growth = data.map((val, i, arr) => {
  if (i === 0) return 0;
  const prev = arr[i - 1];
  ((val - prev) / prev) * 100;
});
```

### Error 45: Wrong extraction in destructuring with rest
**Description:** Get first and last items from sorted data
```javascript
const data = [10, 20, 30, 40, 50];
const [first, ...middle, last] = data;
```

### Error 46: Calling every on empty array
**Description:** Check if all filtered items meet criteria
```javascript
function allAboveThreshold(data, threshold) {
  const filtered = data.filter(d => d.active);
  return filtered.every(d => d.value > threshold);
}
```

### Error 47: Not cloning data before sorting for display
**Description:** Display top 3 values without modifying original
```javascript
function getTop3(data) {
  data.sort((a, b) => b.value - a.value);
  return data.slice(0, 3);
}
```

### Error 48: Math operations on string values
**Description:** Calculate total revenue from string amounts
```javascript
const revenue = ['100', '200', '150'];
const total = revenue.reduce((sum, val) => sum + val, 0);
```

### Error 49: Truthy check on zero value
**Description:** Filter out data points with value zero
```javascript
const data = [0, 10, 0, 20, 30];
const nonZero = data.filter(d => d);
```

### Error 50: Confusing accumulator and current in reduce
**Description:** Find the data point with highest value
```javascript
const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 50 },
  { name: 'C', value: 20 }
];
const max = data.reduce((acc, cur) => acc.value > cur.value ? acc : cur);
```

### Error 51: Wrong method for getting unique values
**Description:** Get unique categories from data
```javascript
const data = [
  { category: 'A' },
  { category: 'B' },
  { category: 'A' }
];
const unique = [...new Set(data)];
```

### Error 52: Too many re-renders in chart update
**Description:** Update dashboard chart on data change
```javascript
function updateDashboard(newData) {
  data = newData;
  renderChart(data);
  updateTotals(data);
  renderChart(data);
  updateSummary(data);
  renderChart(data);
}
```

### Error 53: Date subtraction produces NaN
**Description:** Calculate days between two dates in data
```javascript
const data = [
  { start: '2024-01-01', end: '2024-01-15' }
];
data.forEach(d => {
  const diff = new Date(d.end) - new Date(d.start);
  const days = diff / (1000 * 60 * 60 * 24);
});
```

### Error 54: Filter before sort when sort needs all data
**Description:** Get top 5 items by value after filtering
```javascript
const data = [
  { name: 'A', value: 10, active: false },
  { name: 'B', value: 50, active: true },
  { name: 'C', value: 30, active: true },
  { name: 'D', value: 40, active: true },
  { name: 'E', value: 20, active: true }
];
const top5 = data
  .filter(d => d.active)
  .sort((a, b) => b.value - a.value)
  .slice(0, 5);
```

### Error 55: Spread operator on function arguments confusion
**Description:** Calculate sum of variable data points
```javascript
function sumData(...values) {
  return values.reduce((acc, val) => acc + val);
}
const data = [10, 20, 30];
const total = sumData(data);
```

### Error 56: Not converting NodeList to array before methods
**Description:** Get values from all chart bar elements
```javascript
const bars = document.querySelectorAll('.chart-bar');
const values = bars.map(bar => parseInt(bar.dataset.value));
```

### Error 57: Reduce with conditional accumulation
**Description:** Sum only positive values
```javascript
const data = [10, -5, 20, -3, 30];
const sum = data.reduce((acc, val) => {
  if (val > 0) acc += val;
  return acc;
});
```

### Error 58: toLocaleString returns string, not number
**Description:** Format large numbers with commas
```javascript
const value = 1000000;
const formatted = value.toLocaleString();
const doubled = formatted * 2;
```

### Error 59: Using some instead of every
**Description:** Check if all data points are above minimum
```javascript
const data = [10, 20, 5, 30];
const min = 5;
const allAbove = data.some(d => d >= min);
```

### Error 60: Wrong index calculation for percentile
**Description:** Calculate 90th percentile of dataset
```javascript
const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
data.sort((a, b) => a - b);
const index = Math.floor(90 * data.length / 100);
const percentile = data[10];
```

### Error 61: For...in on array iterates indices as strings
**Description:** Sum all values in dataset
```javascript
const data = [10, 20, 30];
let sum = 0;
for (const val in data) {
  sum += val;
}
```

### Error 62: Reversing array for chronological order
**Description:** Display data in chronological order (oldest first)
```javascript
const data = [
  { date: '2024-03-01', value: 30 },
  { date: '2024-01-01', value: 10 },
  { date: '2024-02-01', value: 20 }
];
const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();
```

### Error 63: Filter with regex mismatch
**Description:** Get data points matching pattern
```javascript
const data = ['prod-1', 'prod-2', 'test-1', 'prod-3'];
const products = data.filter(d => d.match(/prod-/));
```

### Error 64: Wrong method for finding min/max in objects
**Description:** Find item with the highest sales
```javascript
const data = [
  { name: 'A', sales: 100 },
  { name: 'B', sales: 200 }
];
const maxSales = Math.max(data.sales);
```

### Error 65: Not using global flag for regex match
**Description:** Count occurrences of pattern in strings
```javascript
const data = ['apple,banana', 'banana,cherry', 'date'];
const bananaCount = data.reduce((count, str) => {
  return count + (str.match(/banana/) || []).length;
}, 0);
```

### Error 66: Wrong comparator for descending sort
**Description:** Sort values in descending order
```javascript
const data = [10, 50, 30, 80, 20];
data.sort((a, b) => a - b);
```

### Error 67: Not accounting for null values in sort
**Description:** Sort data with null values
```javascript
const data = [30, null, 10, null, 20];
data.sort((a, b) => a - b);
```

### Error 68: String concatenation with number for currency
**Description:** Display dollar amounts
```javascript
const value = 100;
const display = '$' + value + '.00';
```

### Error 69: Wrong method signature for findIndex
**Description:** Find index of first value above 50
```javascript
const data = [10, 60, 30, 80, 20];
const idx = data.findIndex(d => d > 50);
```

### Error 70: Premature rounding causes cumulative error
**Description:** Calculate percentages with rounding at each step
```javascript
const data = [30, 20, 50];
const total = data.reduce((a, b) => a + b, 0);
const percentages = data.map(d => Math.round((d / total) * 100));
```

## Issue Snippets

### Issue 1: Re-computing total on every render
**Description:** Display dashboard with total
```javascript
function renderDashboard(data) {
  const total = data.reduce((s, d) => s + d.value, 0);
  document.getElementById('total').textContent = total;
}
```

### Issue 2: Inefficient filter inside a loop
**Description:** Get counts for each category
```javascript
const categories = ['A', 'B', 'C'];
categories.forEach(cat => {
  const count = data.filter(d => d.category === cat).length;
  console.log(`${cat}: ${count}`);
});
```

### Issue 3: Deep cloning data unnecessarily
**Description:** Sort data for chart display
```javascript
const chartData = JSON.parse(JSON.stringify(data));
chartData.sort((a, b) => a.value - b.value);
```

### Issue 4: Not using Map for key-value lookups
**Description:** Find item by ID repeatedly in loop
```javascript
function getItemsByIds(ids) {
  return ids.map(id => data.find(d => d.id === id));
}
```

### Issue 5: Nested ternary for color coding
**Description:** Assign color based on value range
```javascript
function getColor(value) {
  return value > 100 ? value > 200 ? 'red' : 'orange' : value > 50 ? 'yellow' : 'green';
}
```

### Issue 6: Using var for loop variable in async operations
**Description:** Fetch data for each item
```javascript
for (var i = 0; i < items.length; i++) {
  fetch(`/api/data/${i}`).then(r => r.json()).then(d => {
    items[i].value = d.value;
  });
}
```

### Issue 7: Not using short-circuit evaluation for defaults
**Description:** Set default color for missing values
```javascript
data.forEach(d => {
  if (!d.color) {
    d.color = 'blue';
  }
});
```

### Issue 8: Single-letter variable names
**Description:** Process data with reduce
```javascript
const r = d.reduce((a, c) => {
  const v = c.v * c.q;
  a.t += v;
  a.i.push({ n: c.n, t: v });
  return a;
}, { t: 0, i: [] });
```

### Issue 9: Not removing event listeners on data refresh
**Description:** Refresh dashboard data
```javascript
function refreshDashboard() {
  document.querySelectorAll('.chart-bar').forEach(el => el.remove());
  renderChart(data);
}
```

### Issue 10: Repeated DOM queries in loops
**Description:** Update each data row in table
```javascript
data.forEach(d => {
  document.getElementById('table-body').innerHTML += `<tr><td>${d.name}</td></tr>`;
});
```

### Issue 11: Using concat inside loop
**Description:** Build filtered dataset from multiple sources
```javascript
let result = [];
sources.forEach(src => {
  result = result.concat(src.filter(d => d.active));
});
```

### Issue 12: Not using Intl for number formatting
**Description:** Format currency values
```javascript
function formatCurrency(value) {
  return '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```

### Issue 13: Performing sort inside render function
**Description:** Render sorted data table
```javascript
function renderTable(data) {
  data.sort((a, b) => a.name.localeCompare(b.name));
  // render rows
}
```

### Issue 14: Not using Set for category dedup
**Description:** Get unique categories
```javascript
const categories = [];
data.forEach(d => {
  if (categories.indexOf(d.category) === -1) {
    categories.push(d.category);
  }
});
```

### Issue 15: Unnecessary array spread for iteration
**Description:** Iterate over array
```javascript
[...data].forEach(d => process(d));
```

### Issue 16: Hardcoded thresholds for data filtering
**Description:** Filter significant events
```javascript
const significant = data.filter(d => d.value > 1000);
```

### Issue 17: Using for loop when forEach would be clearer
**Description:** Process each data item
```javascript
for (let i = 0; i < data.length; i++) {
  data[i].processed = true;
}
```

### Issue 18: Not using Object.entries for object iteration
**Description:** Iterate over data object keys and values
```javascript
Object.keys(data).forEach(key => {
  console.log(key, data[key]);
});
```

### Issue 19: Not caching computed values
**Description:** Get average multiple times
```javascript
function getAverage(data) {
  return data.reduce((s, d) => s + d.value, 0) / data.length;
}
function displayStats(data) {
  document.getElementById('avg').textContent = getAverage(data);
  document.getElementById('above-avg').textContent = data.filter(d => d.value > getAverage(data)).length;
}
```

### Issue 20: Excessive chaining making code unreadable
**Description:** Process data pipeline
```javascript
const result = data.filter(d => d.active).map(d => ({ ...d, total: d.price * d.qty })).sort((a, b) => b.total - a.total).slice(0, 10).reduce((acc, d) => acc + d.total, 0);
```

### Issue 21: Mutating input data in analysis function
**Description:** Analyze data and add computed fields
```javascript
function analyzeData(data) {
  data.forEach(d => {
    d.percentage = d.value / getTotal(data) * 100;
  });
  return data;
}
```

### Issue 22: Not using nullish coalescing for optional data
**Description:** Access nested data properties
```javascript
data.forEach(d => {
  const region = d.location && d.location.region;
  if (region) {
    console.log(region);
  }
});
```

### Issue 23: Re-creating same array methods chain repeatedly
**Description:** Get active high-value items multiple times
```javascript
function expensiveActive(data) {
  return data.filter(d => d.active).filter(d => d.value > 100);
}
function expensiveActiveNames(data) {
  return data.filter(d => d.active).filter(d => d.value > 100).map(d => d.name);
}
function expensiveActiveTotal(data) {
  return data.filter(d => d.active).filter(d => d.value > 100).reduce((s, d) => s + d.value, 0);
}
```

### Issue 24: Using splice to remove items in forEach
**Description:** Remove outliers from dataset
```javascript
data.forEach((d, i) => {
  if (d.value > 1000) {
    data.splice(i, 1);
  }
});
```

### Issue 25: Not using default sort for strings
**Description:** Sort strings alphabetically (case-insensitive)
```javascript
const names = ['Zebra', 'apple', 'Banana', 'orange'];
names.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
```

### Issue 26: Overwriting array reference in function
**Description:** Process and return filtered data
```javascript
function filterData(data) {
  data = data.filter(d => d.active);
  return data;
}
```

### Issue 27: Not handling empty data edge case
**Description:** Render data chart
```javascript
function renderChart(data) {
  const max = Math.max(...data.map(d => d.value));
  data.forEach(d => {
    // render bars
  });
}
```

### Issue 28: Using == for null/undefined check
**Description:** Check if data exists before processing
```javascript
if (data == null) {
  return;
}
```

### Issue 29: Not using template literals for string building
**Description:** Build HTML for data rows
```javascript
data.forEach(d => {
  html += '<tr><td>' + d.name + '</td><td>' + d.value + '</td></tr>';
});
```

### Issue 30: Confusing method chaining order
**Description:** Get top categories by total value
```javascript
const topCategories = data
  .filter(d => d.active)
  .sort((a, b) => b.value - a.value)
  .reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + d.value;
    return acc;
  }, {});
```

## Modify Snippets

### Modify 1: Add data summary statistics
**Description:** Calculate min, max, mean, median of dataset
```javascript
function calculateStats(data) {
  const sorted = [...data].sort((a, b) => a - b);
  const mean = data.reduce((s, v) => s + v, 0) / data.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  return { min: sorted[0], max: sorted[sorted.length - 1], mean, median };
}
```

### Modify 2: Add data filtering by date range
**Description:** Filter dataset between start and end dates
```javascript
function filterByDateRange(data, startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return data.filter(d => {
    const date = new Date(d.date).getTime();
  });
}
```

### Modify 3: Add percentage change calculation
**Description:** Calculate day-over-day percentage change
```javascript
function calculateDayOverDay(data) {
  return data.map((d, i, arr) => {
    if (i === 0) return { ...d, change: 0, percentChange: 0 };
    const prev = arr[i - 1].value;
    const change = d.value - prev;
    const percentChange = prev !== 0 ? (change / prev) * 100 : 0;
    return { ...d, change, percentChange: percentChange.toFixed(2) };
  });
}
```

### Modify 4: Add data aggregation by time period
**Description:** Group data by month and calculate totals
```javascript
function aggregateByMonth(data) {
  return data.reduce((acc, d) => {
    const month = new Date(d.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[month]) acc[month] = { total: 0, count: 0 };
    acc[month].total += d.value;
    acc[month].count += 1;
    return acc;
  }, {});
}
```

### Modify 5: Add moving average calculation
**Description:** Calculate 7-day moving average
```javascript
function movingAverage(data, windowSize = 7) {
  return data.map((d, i, arr) => {
    const start = Math.max(0, i - windowSize + 1);
    const slice = arr.slice(start, i + 1);
    const avg = slice.reduce((sum, v) => sum + v.value, 0) / slice.length;
    return { ...d, movingAvg: avg.toFixed(2) };
  });
}
```

### Modify 6: Add data export to CSV
**Description:** Export dataset as CSV download
```javascript
function exportToCSV(data, filename) {
  const headers = Object.keys(data[0] || {}).join(',');
  const rows = data.map(d => Object.values(d).join(',')).join('\n');
  const csv = `${headers}\n${rows}`;
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
}
```

### Modify 7: Add correlation coefficient calculation
**Description:** Calculate Pearson correlation between two datasets
```javascript
function calculateCorrelation(x, y) {
  const n = Math.min(x.length, y.length);
  const sumX = x.slice(0, n).reduce((s, v) => s + v, 0);
  const sumY = y.slice(0, n).reduce((s, v) => s + v, 0);
  const sumXY = x.slice(0, n).reduce((s, v, i) => s + v * y[i], 0);
  const sumX2 = x.slice(0, n).reduce((s, v) => s + v * v, 0);
  const sumY2 = y.slice(0, n).reduce((s, v) => s + v * v, 0);
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  return denominator === 0 ? 0 : numerator / denominator;
}
```

### Modify 8: Add data pagination for large datasets
**Description:** Show paginated data table
```javascript
function paginateData(data, page, pageSize = 20) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageData = data.slice(start, end);
  const totalPages = Math.ceil(data.length / pageSize);
  return { data: pageData, page, totalPages, total: data.length };
}
```

### Modify 9: Add data normalization
**Description:** Normalize values to 0-1 range
```javascript
function normalizeData(data) {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  return data.map(d => ({
    ...d,
    normalized: range === 0 ? 0 : (d.value - min) / range
  }));
}
```

### Modify 10: Add sorting by multiple columns
**Description:** Sort data by category, then by value descending
```javascript
function multiColumnSort(data, columns) {
  return [...data].sort((a, b) => {
    for (const { key, desc } of columns) {
      if (a[key] < b[key]) return desc ? 1 : -1;
      if (a[key] > b[key]) return desc ? -1 : 1;
    }
    return 0;
  });
}
```

### Modify 11: Add data filtering with search term
**Description:** Filter data by search query across all fields
```javascript
function searchData(data, query) {
  const term = query.toLowerCase();
  return data.filter(d => {
    return Object.values(d).some(val =>
      String(val).toLowerCase().includes(term)
    );
  });
}
```

### Modify 12: Add cumulative total calculation
**Description:** Calculate running total over dataset
```javascript
function calculateCumulativeTotal(data) {
  let runningTotal = 0;
  return data.map(d => {
    runningTotal += d.value;
    return { ...d, cumulativeTotal: runningTotal };
  });
}
```

### Modify 13: Add data binning/histogram
**Description:** Group data into value ranges
```javascript
function createHistogram(data, numBins = 10) {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binWidth = (max - min) / numBins;
  const bins = Array.from({ length: numBins }, (_, i) => ({
    rangeStart: min + i * binWidth,
    rangeEnd: min + (i + 1) * binWidth,
    count: 0
  }));
  values.forEach(v => {
    const binIndex = Math.min(Math.floor((v - min) / binWidth), numBins - 1);
    bins[binIndex].count++;
  });
  return bins;
}
```

### Modify 14: Add data ranking
**Description:** Assign rank to each data point based on value
```javascript
function rankData(data) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  let rank = 1;
  return sorted.map((d, i, arr) => {
    if (i > 0 && d.value < arr[i - 1].value) rank = i + 1;
    return { ...d, rank };
  }).sort((a, b) => a.id - b.id);
}
```

### Modify 15: Add quartile calculation
**Description:** Calculate Q1, Q2 (median), Q3 of dataset
```javascript
function calculateQuartiles(data) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const q2 = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];
  const lowerHalf = sorted.slice(0, Math.floor(n / 2));
  const upperHalf = sorted.slice(Math.ceil(n / 2));
  const q1 = lowerHalf.length % 2 === 0
    ? (lowerHalf[lowerHalf.length / 2 - 1] + lowerHalf[lowerHalf.length / 2]) / 2
    : lowerHalf[Math.floor(lowerHalf.length / 2)];
  const q3 = upperHalf.length % 2 === 0
    ? (upperHalf[upperHalf.length / 2 - 1] + upperHalf[upperHalf.length / 2]) / 2
    : upperHalf[Math.floor(upperHalf.length / 2)];
  return { q1, q2, q3, iqr: q3 - q1 };
}
```

### Modify 16: Add outlier detection
**Description:** Detect outliers using IQR method
```javascript
function detectOutliers(data) {
  const values = data.map(d => d.value);
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  return data.map(d => ({
    ...d,
    isOutlier: d.value < lowerBound || d.value > upperBound
  }));
}
```

### Modify 17: Add data smoothing
**Description:** Apply exponential smoothing to time series data
```javascript
function exponentialSmoothing(data, alpha = 0.3) {
  let smoothed = data[0].value;
  return data.map((d, i) => {
    if (i === 0) return { ...d, smoothed: d.value };
    smoothed = alpha * d.value + (1 - alpha) * smoothed;
    return { ...d, smoothed: Math.round(smoothed * 100) / 100 };
  });
}
```

### Modify 18: Add data comparison with previous period
**Description:** Compare current data with previous year data
```javascript
function compareYearOverYear(currentData, previousData) {
  const prevMap = new Map(previousData.map(d => [d.month, d.value]));
  return currentData.map(d => {
    const prevValue = prevMap.get(d.month) || 0;
    const change = d.value - prevValue;
    const percentChange = prevValue > 0 ? (change / prevValue) * 100 : 0;
    return { ...d, prevValue, change, percentChange: percentChange.toFixed(2) };
  });
}
```

### Modify 19: Add data drill-down capability
**Description:** Filter data by clicking on chart segment
```javascript
function drillDown(category) {
  const filtered = allData.filter(d => d.category === category);
  updateChart(filtered);
  updateSummary(filtered);
}
```

### Modify 20: Add trend line calculation
**Description:** Calculate linear regression trend line
```javascript
function calculateTrendLine(data) {
  const n = data.length;
  const xMean = (n - 1) / 2;
  const yMean = data.reduce((s, d) => s + d.value, 0) / n;
  let numerator = 0, denominator = 0;
  data.forEach((d, i) => {
    numerator += (i - xMean) * (d.value - yMean);
    denominator += (i - xMean) ** 2;
  });
  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = yMean - slope * xMean;
  return data.map((d, i) => ({ ...d, trendValue: slope * i + intercept }));
}
```

### Modify 21: Add data dashboard refresh timer
**Description:** Auto-refresh data every 30 seconds
```javascript
function startAutoRefresh(intervalMs = 30000) {
  setInterval(async () => {
    const newData = await fetchData();
    updateDashboard(newData);
  }, intervalMs);
}
```

### Modify 22: Add data annotation feature
**Description:** Allow adding notes to specific data points
```javascript
function addAnnotation(dataPointId, note) {
  const annotations = JSON.parse(localStorage.getItem('annotations') || '{}');
  annotations[dataPointId] = { note, createdAt: new Date().toISOString() };
  localStorage.setItem('annotations', JSON.stringify(annotations));
}
```

### Modify 23: Add data color coding by threshold
**Description:** Color code values above/below threshold
```javascript
function getColorByThreshold(value, thresholds) {
  for (const t of thresholds) {
    if (value >= t.min && value <= t.max) {
      return t.color;
    }
  }
  return '#ccc';
}
```

### Modify 24: Add data summary cards
**Description:** Create summary stat cards for dashboard
```javascript
function createSummaryCards(data) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const avg = (total / data.length).toFixed(2);
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const cards = [
    { label: 'Total', value: total, icon: 'sum' },
    { label: 'Average', value: avg, icon: 'avg' },
    { label: 'Maximum', value: max, icon: 'max' },
    { label: 'Minimum', value: min, icon: 'min' }
  ];
  return cards;
}
```

### Modify 25: Add data zoom/range selector
**Description:** Allow selecting date range on chart
```javascript
function setupRangeSelector() {
  const slider = document.getElementById('range-slider');
  const minDate = new Date(slider.min);
  const maxDate = new Date(slider.max);
  slider.addEventListener('input', (e) => {
    const range = e.target.value.split(',').map(v => new Date(parseInt(v)));
    filterDataByRange(range[0], range[1]);
  });
}
```

### Modify 26: Add data comparison mode
**Description:** Compare two datasets side by side
```javascript
function compareDatasets(dataset1, dataset2, key) {
  const map1 = new Map(dataset1.map(d => [d[key], d]));
  const map2 = new Map(dataset2.map(d => [d[key], d]));
  const allKeys = new Set([...map1.keys(), ...map2.keys()]);
  const comparison = [];
  allKeys.forEach(k => {
    const d1 = map1.get(k);
    const d2 = map2.get(k);
    comparison.push({ key: k, value1: d1?.value, value2: d2?.value, diff: (d2?.value || 0) - (d1?.value || 0) });
  });
  return comparison;
}
```

### Modify 27: Add data anomaly detection
**Description:** Flag data points deviating from standard deviation
```javascript
function detectAnomalies(data) {
  const values = data.map(d => d.value);
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
  const stdDev = Math.sqrt(variance);
  const threshold = 2;
  return data.map(d => ({
    ...d,
    isAnomaly: Math.abs(d.value - mean) > threshold * stdDev,
    zScore: (d.value - mean) / stdDev
  }));
}
```

### Modify 28: Add data aggregation by week
**Description:** Group data into weekly buckets
```javascript
function aggregateByWeek(data) {
  const weekData = {};
  data.forEach(d => {
    const date = new Date(d.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    if (!weekData[weekKey]) weekData[weekKey] = { total: 0, count: 0, weekStart };
    weekData[weekKey].total += d.value;
    weekData[weekKey].count++;
  });
  return Object.entries(weekData).map(([week, data]) => ({
    week,
    total: data.total,
    avg: data.total / data.count
  }));
}
```

### Modify 29: Add data forecasting (simple linear)
**Description:** Simple linear forecast for next N periods
```javascript
function simpleForecast(data, periods) {
  const n = data.length;
  const xMean = (n - 1) / 2;
  const yMean = data.reduce((s, d) => s + d.value, 0) / n;
  let num = 0, den = 0;
  data.forEach((d, i) => {
    num += (i - xMean) * (d.value - yMean);
    den += (i - xMean) ** 2;
  });
  const slope = den !== 0 ? num / den : 0;
  const intercept = yMean - slope * xMean;
  const forecasts = [];
  for (let i = 1; i <= periods; i++) {
    forecasts.push({
      period: n + i,
      forecast: slope * (n + i - 1) + intercept
    });
  }
  return forecasts;
}
```

### Modify 30: Add data sparkline generation
**Description:** Generate inline sparkline chart for data
```javascript
function generateSparkline(data, width = 100, height = 30) {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  return `<svg width="${width}" height="${height}"><polyline points="${points}" fill="none" stroke="blue" stroke-width="2"/></svg>`;
}
```

### Modify 31: Add data bookmarking
**Description:** Allow bookmarking specific data views
```javascript
function bookmarkView(name, filters) {
  const bookmarks = JSON.parse(localStorage.getItem('dataBookmarks') || '[]');
  bookmarks.push({ name, filters, createdAt: new Date().toISOString() });
  localStorage.setItem('dataBookmarks', JSON.stringify(bookmarks));
}
```

### Modify 32: Add data cross-filtering
**Description:** Filter data across multiple dimensions
```javascript
function crossFilter(data, dimensions) {
  return data.filter(d => {
    return Object.entries(dimensions).every(([key, value]) => {
      if (Array.isArray(value)) return value.includes(d[key]);
      return d[key] === value;
    });
  });
}
```

### Modify 33: Add data merge from multiple sources
**Description:** Merge data from multiple API endpoints
```javascript
async function mergeDataSources(sources) {
  const results = await Promise.all(sources.map(src => fetch(src.url).then(r => r.json())));
  const merged = results.reduce((acc, data, i) => {
    const key = sources[i].key;
    return acc.map(item => ({
      ...item,
      [key]: data.find(d => d.id === item.id)
    }));
  }, results[0]);
  return merged;
}
```

### Modify 34: Add data validation rules
**Description:** Validate data against schema rules
```javascript
function validateData(data, rules) {
  const errors = [];
  data.forEach((d, i) => {
    Object.entries(rules).forEach(([field, validators]) => {
      validators.forEach(v => {
        if (v.type === 'required' && !d[field]) {
          errors.push({ row: i, field, message: `${field} is required` });
        }
        if (v.type === 'range' && (d[field] < v.min || d[field] > v.max)) {
          errors.push({ row: i, field, message: `${field} must be between ${v.min} and ${v.max}` });
        }
      });
    });
  });
  return { valid: errors.length === 0, errors };
}
```

### Modify 35: Add data undo/redo
**Description:** Track data changes for undo/redo
```javascript
function createDataHistory() {
  let history = [];
  let currentIndex = -1;
  function saveSnapshot(data) {
    history = history.slice(0, currentIndex + 1);
    history.push(JSON.stringify(data));
    currentIndex++;
  }
  function undo() {
    if (currentIndex > 0) {
      currentIndex--;
      return JSON.parse(history[currentIndex]);
    }
    return null;
  }
  function redo() {
    if (currentIndex < history.length - 1) {
      currentIndex++;
      return JSON.parse(history[currentIndex]);
    }
    return null;
  }
  return { saveSnapshot, undo, redo };
}
```

### Modify 36: Add data notification alerts
**Description:** Alert when data crosses threshold
```javascript
function setupDataAlerts(data, rules) {
  rules.forEach(rule => {
    const currentValue = data.reduce((s, d) => s + d.value, 0);
    if (rule.type === 'max' && currentValue > rule.threshold) {
      showNotification(`Alert: ${rule.name} exceeded ${rule.threshold} (current: ${currentValue})`);
    }
    if (rule.type === 'min' && currentValue < rule.threshold) {
      showNotification(`Alert: ${rule.name} below ${rule.threshold} (current: ${currentValue})`);
    }
  });
}
```

### Modify 37: Add data dashboard export as image
**Description:** Export dashboard as PNG image
```javascript
function exportDashboardAsImage() {
  const dashboard = document.getElementById('dashboard');
  html2canvas(dashboard).then(canvas => {
    const link = document.createElement('a');
    link.download = 'dashboard-export.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
```

### Modify 38: Add data tooltip on hover
**Description:** Show data details on hover over chart
```javascript
function setupDataTooltips() {
  const elements = document.querySelectorAll('.data-point');
  elements.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = `${e.target.dataset.label}: ${e.target.dataset.value}`;
      document.body.appendChild(tooltip);
    });
    el.addEventListener('mouseleave', () => {
      document.querySelector('.tooltip')?.remove();
    });
  });
}
```

### Modify 39: Add data refresh indicator
**Description:** Show spinning indicator while data loads
```javascript
function showLoadingIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'loading-spinner';
  indicator.id = 'data-loading';
  document.body.appendChild(indicator);
}
function hideLoadingIndicator() {
  const indicator = document.getElementById('data-loading');
  if (indicator) indicator.remove();
}
```

### Modify 40: Add data keyboard shortcuts
**Description:** Keyboard shortcuts for common data actions
```javascript
function setupDataKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      document.getElementById('search-input').focus();
    }
    if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
      refreshData();
    }
    if (e.key === 'Escape') {
      clearFilters();
    }
  });
}
```

### Modify 41: Add data comparison with baseline
**Description:** Compare values against a baseline period
```javascript
function compareToBaseline(data, baselinePeriod) {
  const baselineData = data.filter(d => d.period === baselinePeriod);
  const baselineAvg = baselineData.reduce((s, d) => s + d.value, 0) / baselineData.length;
  return data.map(d => ({
    ...d,
    baselineValue: baselineAvg,
    vsBaseline: d.value - baselineAvg,
    vsBaselinePercent: baselineAvg > 0 ? ((d.value - baselineAvg) / baselineAvg * 100).toFixed(2) : 0
  }));
}
```

### Modify 42: Add data grid with inline editing
**Description:** Allow editing data values directly in table
```javascript
function setupInlineEditing() {
  const cells = document.querySelectorAll('.data-cell.editable');
  cells.forEach(cell => {
    cell.addEventListener('dblclick', () => {
      const input = document.createElement('input');
      input.value = cell.textContent;
      input.className = 'inline-edit';
      cell.textContent = '';
      cell.appendChild(input);
      input.focus();
      input.addEventListener('blur', () => {
        cell.textContent = input.value;
        onDataEdit(cell.dataset.id, cell.dataset.field, input.value);
      });
    });
  });
}
```

### Modify 43: Add data grouping by custom expression
**Description:** Group data by computed expression
```javascript
function groupByExpression(data, getGroupKey) {
  const groups = {};
  data.forEach(d => {
    const key = getGroupKey(d);
    if (!groups[key]) groups[key] = [];
    groups[key].push(d);
  });
  return Object.entries(groups).map(([key, items]) => ({
    key,
    count: items.length,
    total: items.reduce((s, i) => s + i.value, 0),
    items
  }));
}
```

### Modify 44: Add data thumbnail/preview
**Description:** Show mini preview chart on hover
```javascript
function setupDataPreview() {
  const items = document.querySelectorAll('.data-item');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const previewData = JSON.parse(item.dataset.preview);
      const miniChart = generateSparkline(previewData, 200, 60);
      const preview = document.createElement('div');
      preview.className = 'data-preview';
      preview.innerHTML = miniChart;
      item.appendChild(preview);
    });
    item.addEventListener('mouseleave', () => {
      const preview = item.querySelector('.data-preview');
      if (preview) preview.remove();
    });
  });
}
```

### Modify 45: Add data error boundaries
**Description:** Gracefully handle data processing errors
```javascript
function safeProcessData(data, processor) {
  try {
    return { success: true, data: processor(data) };
  } catch (error) {
    console.error('Data processing error:', error);
    return { success: false, error: error.message, fallback: [] };
  }
}
```

### Modify 46: Add data version comparison
**Description:** Compare two versions of same dataset
```javascript
function compareDataVersions(versionA, versionB) {
  const changes = [];
  const maxLen = Math.max(versionA.length, versionB.length);
  for (let i = 0; i < maxLen; i++) {
    const a = versionA[i];
    const b = versionB[i];
    if (!a) changes.push({ index: i, type: 'added', value: b });
    else if (!b) changes.push({ index: i, type: 'removed', value: a });
    else if (a.value !== b.value) changes.push({ index: i, type: 'modified', oldValue: a.value, newValue: b.value });
  }
  return { changes, changeCount: changes.length };
}
```

### Modify 47: Add data filter presets
**Description:** Save and load predefined filter configurations
```javascript
const filterPresets = {
  'high-value': { minValue: 1000, activeOnly: true },
  'recent': { daysAgo: 30 },
  'needs-review': { valueRange: [0, 100], flagged: true }
};
function applyFilterPreset(name) {
  const preset = filterPresets[name];
  if (preset) {
    Object.entries(preset).forEach(([key, value]) => {
      document.getElementById(`filter-${key}`).value = value;
    });
    applyFilters();
  }
}
```

### Modify 48: Add data row expansion
**Description:** Expand data row to show details
```javascript
function toggleRowExpansion(rowId) {
  const detailRow = document.getElementById(`detail-${rowId}`);
  if (detailRow) {
    detailRow.classList.toggle('hidden');
  } else {
    const row = document.getElementById(`row-${rowId}`);
    const detail = document.createElement('tr');
    detail.id = `detail-${rowId}`;
    detail.className = 'detail-row';
    detail.innerHTML = '<td colspan="5">Loading details...</td>';
    row.after(detail);
    loadRowDetails(rowId);
  }
}
```

### Modify 49: Add data bulk selection
**Description:** Select multiple data points with checkbox
```javascript
function setupBulkSelection() {
  let selectedIds = new Set();
  document.getElementById('select-all').addEventListener('change', (e) => {
    const checked = e.target.checked;
    document.querySelectorAll('.data-checkbox').forEach(cb => {
      cb.checked = checked;
      if (checked) selectedIds.add(cb.dataset.id);
      else selectedIds.delete(cb.dataset.id);
    });
    updateBulkActions(selectedIds.size);
  });
  document.querySelectorAll('.data-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      if (e.target.checked) selectedIds.add(e.target.dataset.id);
      else selectedIds.delete(e.target.dataset.id);
      updateBulkActions(selectedIds.size);
    });
  });
}
```

### Modify 50: Add data audit log
**Description:** Track all changes made to dataset
```javascript
function logDataChange(action, details) {
  const log = {
    timestamp: new Date().toISOString(),
    action,
    details,
    userId: localStorage.getItem('userId') || 'anonymous'
  };
  const auditLog = JSON.parse(localStorage.getItem('auditLog') || '[]');
  auditLog.push(log);
  if (auditLog.length > 1000) auditLog.shift();
  localStorage.setItem('auditLog', JSON.stringify(auditLog));
}
```
