# Module 22: Date and Time (Native API)

**Duration:** ~45 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Create Date objects in various ways
- Get and set date components (year, month, day, etc.)
- Format dates for display
- Calculate date differences
- Handle timezones
- Work with timestamps

## Creating Date Objects

```javascript
// Current date and time
const now = new Date();
console.log(now);  // Current date and time

// From date string
const date1 = new Date('2024-01-15');
const date2 = new Date('January 15, 2024');
const date3 = new Date('2024-01-15T10:30:00');

// From components (year, month [0-indexed], day, hour, minute, second)
const date4 = new Date(2024, 0, 15);  // January 15, 2024
const date5 = new Date(2024, 0, 15, 10, 30, 0);  // Jan 15, 2024 10:30:00

// From timestamp (milliseconds since Jan 1, 1970)
const date6 = new Date(1705276800000);

// Current timestamp
const timestamp = Date.now();
console.log(timestamp);  // e.g., 1705334400000
```

## Getting Date Components

```javascript
const now = new Date('2024-01-15T14:30:45');

// Date components
console.log(now.getFullYear());    // 2024
console.log(now.getMonth());       // 0 (January - 0-indexed!)
console.log(now.getDate());        // 15 (day of month)
console.log(now.getDay());         // 1 (Monday - 0=Sunday)

// Time components
console.log(now.getHours());       // 14
console.log(now.getMinutes());     // 30
console.log(now.getSeconds());     // 45
console.log(now.getMilliseconds()); // 0

// Timestamp
console.log(now.getTime());        // milliseconds since 1970
```

**Important:** Months are 0-indexed! January = 0, December = 11

```javascript
const date = new Date(2024, 0, 15);  // January 15
console.log(date.getMonth());  // 0 (not 1!)

const december = new Date(2024, 11, 25);  // December 25
console.log(december.getMonth());  // 11
```

## Setting Date Components

```javascript
const date = new Date();

// Set methods
date.setFullYear(2025);
date.setMonth(5);        // June (0-indexed)
date.setDate(20);
date.setHours(14);
date.setMinutes(30);
date.setSeconds(0);

console.log(date);  // June 20, 2025 14:30:00

// Set with offset
date.setDate(date.getDate() + 7);  // Add 7 days
date.setMonth(date.getMonth() + 1);  // Add 1 month
```

## Formatting Dates

### toDateString()

```javascript
const date = new Date('2024-01-15');
console.log(date.toDateString());  // 'Mon Jan 15 2024'
```

### toTimeString()

```javascript
const date = new Date('2024-01-15T14:30:45');
console.log(date.toTimeString());  // '14:30:45 GMT-0500'
```

### toISOString()

```javascript
const date = new Date('2024-01-15T14:30:45');
console.log(date.toISOString());  // '2024-01-15T19:30:45.000Z' (UTC)
```

### toLocaleDateString()

```javascript
const date = new Date('2024-01-15');

console.log(date.toLocaleDateString('en-US'));
// '1/15/2024'

console.log(date.toLocaleDateString('en-GB'));
// '15/01/2024'

console.log(date.toLocaleDateString('de-DE'));
// '15.1.2024'
```

### toLocaleTimeString()

```javascript
const date = new Date('2024-01-15T14:30:45');

console.log(date.toLocaleTimeString('en-US'));
// '2:30:45 PM'

console.log(date.toLocaleTimeString('en-GB'));
// '14:30:45'
```

### toLocaleString() with Options

```javascript
const date = new Date('2024-01-15T14:30:45');

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  weekday: 'long'
};

console.log(date.toLocaleString('en-US', options));
// 'Monday, January 15, 2024 at 02:30 PM'
```

## Common Date Formats

### Custom Format Function

```javascript
function formatDate(date, format) {
  const options = {
    YYYY: date.getFullYear(),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0')
  };
  
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => options[match]);
}

const date = new Date('2024-01-15T14:30:45');
console.log(formatDate(date, 'YYYY-MM-DD'));           // '2024-01-15'
console.log(formatDate(date, 'DD/MM/YYYY'));           // '15/01/2024'
console.log(formatDate(date, 'YYYY-MM-DD HH:mm:ss')); // '2024-01-15 14:30:45'
```

### Relative Time Formatting

```javascript
function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}

console.log(getRelativeTime(new Date(Date.now() - 300000)));  // '5 minutes ago'
console.log(getRelativeTime(new Date(Date.now() - 86400000))); // '1 day ago'
```

## Calculating Date Differences

### Difference in Days

```javascript
function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffMs = Math.abs(date2 - date1);
  return Math.floor(diffMs / oneDay);
}

const birthday = new Date('2000-06-15');
const today = new Date();
console.log(daysBetween(birthday, today));  // e.g., 8765
```

### Add/Subtract Days

```javascript
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function subtractDays(date, days) {
  return addDays(date, -days);
}

const today = new Date();
console.log(addDays(today, 7));      // Next week
console.log(subtractDays(today, 7)); // Last week
```

### Add/Subtract Months

```javascript
function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

const today = new Date();
console.log(addMonths(today, 3));  // 3 months from now
```

### Start and End of Period

```javascript
function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function endOfDay(date) {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

function startOfWeek(date) {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - day);
  return startOfDay(result);
}

const today = new Date();
console.log(startOfDay(today));   // Today at 00:00:00
console.log(endOfDay(today));     // Today at 23:59:59
console.log(startOfWeek(today));  // Sunday of this week
```

## Timezone Handling

### Getting Timezone Info

```javascript
const date = new Date();

console.log(date.getTimezoneOffset());  // Offset in minutes from UTC
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);  // 'America/New_York'
```

### Formatting with Timezone

```javascript
const date = new Date('2024-01-15T14:30:00');

// Format in different timezones
const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' };
console.log(date.toLocaleTimeString('en-US', options));  // '09:30 AM'

const tokyoOptions = { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' };
console.log(date.toLocaleTimeString('en-US', tokyoOptions));  // '11:30 PM'
```

### UTC Methods

```javascript
const date = new Date();

// UTC equivalents
console.log(date.getUTCFullYear());
console.log(date.getUTCMonth());
console.log(date.getUTCDate());
console.log(date.getUTCHours());
console.log(date.getUTCMinutes());
console.log(date.getUTCSeconds());
```

## Timestamps

### Unix Timestamp

```javascript
// Current timestamp in seconds
const timestampSeconds = Math.floor(Date.now() / 1000);
console.log(timestampSeconds);

// Convert timestamp to date
const date = new Date(timestampSeconds * 1000);
console.log(date);
```

### Performance Timing

```javascript
// Measure execution time
const start = performance.now();

// Some operation
for (let i = 0; i < 1000000; i++) {
  Math.random();
}

const end = performance.now();
console.log(`Execution time: ${end - start} milliseconds`);
```

## Practical Examples

### Age Calculator

```javascript
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

console.log(calculateAge('2000-06-15'));  // e.g., 24
```

### Days Until Event

```javascript
function daysUntil(eventDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);
  
  const diffMs = event - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

console.log(daysUntil('2024-12-25'));  // Days until Christmas
console.log(daysUntil('2025-01-01'));  // Days until New Year
```

### Is Date Between Range

```javascript
function isDateBetween(date, startDate, endDate) {
  const check = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return check >= start && check <= end;
}

console.log(isDateBetween('2024-06-15', '2024-01-01', '2024-12-31'));  // true
console.log(isDateBetween('2025-06-15', '2024-01-01', '2024-12-31'));  // false
```

### Business Days Calculator

```javascript
function addBusinessDays(date, days) {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return result;
}

const today = new Date();
console.log(addBusinessDays(today, 5));  // 5 business days from now
```

### Format Duration

```javascript
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours % 24 > 0) parts.push(`${hours % 24} hour${hours % 24 > 1 ? 's' : ''}`);
  if (minutes % 60 > 0) parts.push(`${minutes % 60} minute${minutes % 60 > 1 ? 's' : ''}`);
  if (seconds % 60 > 0) parts.push(`${seconds % 60} second${seconds % 60 > 1 ? 's' : ''}`);
  
  return parts.join(', ') || '0 seconds';
}

console.log(formatDuration(3661000));  // '1 hour, 1 minute, 1 second'
```

## Practice Exercises

### Exercise 22.1: Countdown Timer
Create a function that returns days, hours, minutes, and seconds until a target date.

### Exercise 22.2: Calendar Generator
Generate a text-based calendar for a given month and year.

### Exercise 22.3: Age in Days, Hours, Minutes
Calculate exact age in days, hours, and minutes from birthdate.

### Exercise 22.4: Working Days Calculator
Calculate number of working days between two dates (excluding weekends).

## Summary

- `new Date()` creates Date objects
- Months are 0-indexed (January = 0)
- Use `getTime()` for timestamps in milliseconds
- Format with `toLocaleDateString()` and options
- Calculate differences by subtracting dates
- Handle timezones with `Intl.DateTimeFormat`
- Use `Date.now()` for current timestamp

## Previous

[Proceed to Module 21](../21-regular-expressions/README.md)

## Next Steps

[Proceed to Module 23](../23-json-in-depth/README.md): JSON In Depth to learn about JSON parsing and manipulation.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
