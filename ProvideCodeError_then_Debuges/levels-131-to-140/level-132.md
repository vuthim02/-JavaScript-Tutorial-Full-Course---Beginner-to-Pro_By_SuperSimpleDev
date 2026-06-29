# Level 132 - Date/time utility library with DayJS

## Error Snippets

### Error 1: dayjs is not imported
**Description:** Import dayjs library before using it.
```javascript
// app.js
const now = dayjs();
console.log(now.format("YYYY-MM-DD"));
```

### Error 2: Calling format on undefined
**Description:** dayjs() returns an object but the variable might be undefined.
```javascript
let date;
console.log(date.format("YYYY"));
```

### Error 3: Wrong format string tokens
**Description:** Use correct DayJS format tokens.
```javascript
const d = dayjs("2024-01-15");
console.log(d.format("YYYY-MM-DD"));
```

### Error 4: Mutating dayjs object
**Description:** DayJS objects are immutable; add() returns a new object.
```javascript
const d = dayjs("2024-01-01");
d.add(1, "day");
console.log(d.format());
```

### Error 5: Invalid date string parsing
**Description:** Parse an invalid date string without checking validity.
```javascript
const d = dayjs("not-a-date");
console.log(d.format());
```

### Error 6: Missing plugin for extended functionality
**Description:** Use relativeTime plugin before calling fromNow().
```javascript
const d = dayjs("2024-01-01");
console.log(d.fromNow());
```

### Error 7: Wrong dayjs plugin import syntax
**Description:** Import and use the relativeTime plugin correctly.
```javascript
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
```

### Error 8: Comparing dayjs objects with ===
**Description:** Use isSame() to compare dayjs objects, not ===.
```javascript
const a = dayjs("2024-01-01");
const b = dayjs("2024-01-01");
console.log(a === b);
```

### Error 9: Using deprecated moment.js syntax
**Description:** Use dayjs instead of moment.js for date manipulation.
```javascript
const now = moment();
console.log(now.format("MM/DD/YYYY"));
```

### Error 10: Forgetting to call dayjs() on string
**Description:** Call dayjs() on a date string before formatting.
```javascript
const dateStr = "2024-06-15";
console.log(dateStr.format("YYYY"));
```

### Error 11: Wrong locale registration
**Description:** Register and use a locale correctly with dayjs.
```javascript
import "dayjs/locale/fr";
const d = dayjs("2024-01-01").locale("fr");
console.log(d.format("dddd"));
```

### Error 12: Incorrect diff units
**Description:** Use correct unit string in diff() method.
```javascript
const a = dayjs("2024-01-01");
const b = dayjs("2024-06-01");
console.log(a.diff(b, "months"));
```

### Error 13: Using dayjs() with timestamp without milliseconds
**Description:** Pass a Unix timestamp in seconds instead of milliseconds.
```javascript
const d = dayjs.unix(1704067200);
console.log(d.format());
```

### Error 14: StartOf/endOf wrong method name
**Description:** Use correct method name startOf or endOf.
```javascript
const d = dayjs("2024-01-15");
console.log(d.startOf("month").format());
```

### Error 15: Chaining without immutability
**Description:** Each dayjs method returns a new object; chain correctly.
```javascript
const d = dayjs("2024-01-15").add(1, "month").add(5, "day");
```

### Error 16: Incorrect dayjs plugin extend call
**Difficulty:** Call extend on the dayjs function, not an instance.
```javascript
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
const d = dayjs();
d.extend(utc);
```

### Error 17: Using isBefore with swapped arguments
**Description:** Check if date A is before date B with correct argument order.
```javascript
const a = dayjs("2024-06-01");
const b = dayjs("2024-01-01");
console.log(a.isBefore(b)); // true if a is before b
```

### Error 18: Subtracting days with wrong syntax
**Description:** Use subtract method correctly with days unit.
```javascript
const d = dayjs("2024-01-10");
console.log(d.subtract("5", "day").format());
```

### Error 19: Forgetting to parse timezone offset
**Description:** Use utc plugin to handle timezone offsets.
```javascript
const d = dayjs("2024-01-15T10:00:00+05:00");
console.log(d.utc().format());
```

### Error 20: Invalid format token case
**Description:** Use correct case for format tokens (MM vs mm).
```javascript
const d = dayjs("2024-01-15 14:30:00");
console.log(d.format("MM:mm"));
```

### Error 21: Calling dayjs on dayjs object
**Description:** Do not wrap an existing dayjs object in dayjs() again.
```javascript
const d = dayjs("2024-01-01");
const d2 = dayjs(d);
console.log(d2.format());
```

### Error 22: Wrong get method syntax
**Description:** Use get() with correct unit string.
```javascript
const d = dayjs("2024-01-15");
console.log(d.get("year"));
```

### Error 23: Missing year in date string
**Description:** Provide a complete date string with year.
```javascript
const d = dayjs("Jan 15");
console.log(d.format());
```

### Error 24: Using isSameOrBefore without plugin
**Description:** isSameOrBefore requires the isSameOrBefore plugin.
```javascript
import dayjs from "dayjs";
const a = dayjs("2024-01-01");
const b = dayjs("2024-01-15");
console.log(a.isSameOrBefore(b));
```

### Error 25: locale import path is wrong
**Description:** Import locale from correct path.
```javascript
import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");
```

### Error 26: dayjs extend before import
**Description:** Call extend after importing the plugin.
```javascript
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
import customParseFormat from "dayjs/plugin/customParseFormat";
```

### Error 27: Wrong unit for get method
**Description:** Use valid unit string for get() method.
```javascript
const d = dayjs("2024-01-15");
console.log(d.get("years"));
```

### Error 28: Calling toDate wrong way
**Description:** Use toDate() method to get native Date object.
```javascript
const d = dayjs("2024-01-15");
console.log(d.toDate());
```

### Error 29: Using dayjs in Node without require/import
**Description:** Import dayjs in Node.js environment.
```javascript
const dayjs = require("dayjs");
```

### Error 30: Wrong advancedFormat usage
**Description:** Use advancedFormat plugin for ordinal dates.
```javascript
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
const d = dayjs("2024-01-15");
console.log(d.format("Do"));
```

### Error 31: isYesterday without isYesterday plugin
**Description:** isYesterday requires the isYesterday plugin.
```javascript
import dayjs from "dayjs";
const d = dayjs("2024-01-15");
console.log(d.isYesterday());
```

### Error 32: Using Unix timestamp incorrectly
**Description:** Pass Unix timestamp correctly to dayjs.unix().
```javascript
const ts = 1704067200;
console.log(dayjs.unix(ts).format());
```

### Error 33: Wrong year in set method
**Description:** Use set() with valid numeric values.
```javascript
const d = dayjs("2024-01-15");
d.set("year", 2025);
console.log(d.format("YYYY"));
```

### Error 34: Forgetting to handle invalid dates
**Description:** Check if dayjs object is valid before using it.
```javascript
const d = dayjs("invalid");
console.log(d.format());
```

### Error 35: Wrong array parameter to dayjs
**Description:** Pass array [year, month, day] correctly (month is 0-indexed).
```javascript
const d = dayjs([2024, 1, 15]); // Feb 15, not Jan 15
console.log(d.format("MMM"));
```

### Error 36: Using dayjs with null
**Description:** Handle null input before passing to dayjs.
```javascript
const input = null;
const d = dayjs(input);
console.log(d.isValid());
```

### Error 37: Inconsistent locale switching
**Description:** Set locale globally before creating dates.
```javascript
dayjs.locale("es");
const d = dayjs("2024-01-15");
console.log(d.format("dddd"));
```

### Error 38: Missing customParseFormat plugin
**Description:** Use customParseFormat plugin for non-standard date formats.
```javascript
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const d = dayjs("15-01-2024", "DD-MM-YYYY");
```

### Error 39: Comparing dates with isAfter correctly
**Description:** Use isAfter with correct argument order.
```javascript
const a = dayjs("2024-06-01");
const b = dayjs("2024-01-01");
console.log(a.isAfter(b));
```

### Error 40: Using dayjs in browser without CDN
**Description:** Load dayjs from CDN before using it.
```javascript
// index.html
<script src="app.js"></script>
// app.js
const d = dayjs();
```

### Error 41: Wrong dayjs locale registration path
**Description:** Import locale with correct module path.
```javascript
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");
```

### Error 42: minute vs minutes in diff
**Description:** Use singular unit strings in diff().
```javascript
const a = dayjs("2024-01-01 10:00:00");
const b = dayjs("2024-01-01 10:30:00");
console.log(a.diff(b, "minutes"));
```

### Error 43: Forgetting timezone offset in ISO string
**Description:** Parse ISO string with timezone offset correctly.
```javascript
const d = dayjs("2024-01-15T00:00:00Z");
console.log(d.format());
```

### Error 44: Using format without plugin for Q
**Description:** Quarter formatting requires the advancedFormat plugin.
```javascript
import dayjs from "dayjs";
const d = dayjs("2024-01-15");
console.log(d.format("Q"));
```

### Error 45: Locale not applying to format
**Description:** Set locale before formatting to apply correctly.
```javascript
const d = dayjs("2024-01-15");
d.locale("fr");
console.log(d.format("dddd")); // may still be English
```

### Error 46: Incorrect isBetween plugin usage
**Description:** isBetween requires the isBetween plugin.
```javascript
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
const a = dayjs("2024-01-15");
console.log(a.isBetween("2024-01-01", "2024-01-31"));
```

### Error 47: Calling valueOf on string
**Description:** Call valueOf() on a dayjs object, not a plain string.
```javascript
const dateStr = "2024-01-15";
console.log(dateStr.valueOf());
```

### Error 48: Wrong weekOfYear plugin
**Description:** weekOfYear plugin provides week() method.
```javascript
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);
const d = dayjs("2024-01-15");
console.log(d.week());
```

### Error 49: Using unix with milliseconds
**Description:** dayjs.unix() expects seconds, not milliseconds.
```javascript
const ms = Date.now();
console.log(dayjs.unix(ms).format());
```

### Error 50: dayjs extend overwrites previous
**Description:** Extending multiple plugins works cumulatively.
```javascript
dayjs.extend(pluginA);
dayjs.extend(pluginB);
```

### Error 51: Two-digit year parsing assumption
**Description:** DayJS parsing of two-digit years may be unexpected.
```javascript
const d = dayjs("24-01-15");
console.log(d.format("YYYY"));
```

### Error 52: Setting hour with set method
**Description:** Use set() with hour unit correctly.
```javascript
const d = dayjs("2024-01-15");
d.set("hour", 14);
console.log(d.format("HH"));
```

### Error 53: Wrong plural unit in add
**Description:** Use singular unit names in add().
```javascript
const d = dayjs("2024-01-15");
console.log(d.add(1, "months").format());
```

### Error 54: Using dayjs in strict mode without format
**Description:** Parse date in strict mode with matching format.
```javascript
const d = dayjs("01/15/2024", "MM/DD/YYYY", true);
console.log(d.format());
```

### Error 55: Timezone offset with utc plugin
**Description:** Convert to UTC timezone correctly with utc plugin.
```javascript
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const d = dayjs("2024-01-15T10:00:00");
console.log(d.utc().format());
```

### Error 56: Using year month day without padded zeros
**Description:** Parse date components without leading zeros.
```javascript
const d = dayjs("2024-1-5");
console.log(d.format());
```

### Error 57: Calling toISOString on dayjs
**Description:** DayJS does not have toISOString; use format() or toJSON().
```javascript
const d = dayjs("2024-01-15");
console.log(d.toISOString());
```

### Error 58: IsLeapYear without plugin
**Description:** isLeapYear requires the isLeapYear plugin.
```javascript
import dayjs from "dayjs";
const d = dayjs("2024-01-01");
console.log(d.isLeapYear());
```

### Error 59: Mixing dayjs and Date APIs
**Description:** Do not mix dayjs methods with native Date methods.
```javascript
const d = dayjs("2024-01-15");
console.log(d.getMonth());
```

### Error 60: Wrong second parameter in diff
**Description:** diff() second parameter is a boolean for float result.
```javascript
const a = dayjs("2024-01-01");
const b = dayjs("2024-01-15");
console.log(a.diff(b, "day", true));
```

### Error 61: Using utcOffset without utc plugin
**Description:** utcOffset requires the utc plugin to be extended.
```javascript
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const d = dayjs("2024-01-15").utcOffset(-300);
```

### Error 62: Forgetting to chain clone on set
**Description:** set() returns a new dayjs object.
```javascript
const d = dayjs("2024-01-15");
d.set("year", 2025);
console.log(d.format("YYYY")); // still 2024
```

### Error 63: Wrong argument order to dayjs
**Description:** dayjs accepts (date, format, locale, strict).
```javascript
const d = dayjs("2024-01-15", "en", "YYYY-MM-DD");
```

### Error 64: Using daysInMonth without validation
**Description:** Check validity before calling daysInMonth().
```javascript
const d = dayjs("invalid");
console.log(d.daysInMonth());
```

### Error 65: Mismatched locale file version
**Description:** Ensure locale file matches dayjs version.
```javascript
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
```

### Error 66: Using subtract with incorrect unit
**Description:** Use valid unit string in subtract().
```javascript
const d = dayjs("2024-01-15");
console.log(d.subtract(1, "day").format());
```

### Error 67: Wrong isSame month comparison
**Description:** Compare only month part using isSame with unit.
```javascript
const a = dayjs("2024-01-15");
const b = dayjs("2023-01-01");
console.log(a.isSame(b, "month"));
```

### Error 68: Wrong timeFormat plugin
**Description:** Use localizedFormat plugin for localized time formats.
```javascript
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
console.log(dayjs().format("LTS"));
```

### Error 69: Using dayjs with no arguments in Node
**Description:** dayjs() without arguments returns current date.
```javascript
console.log(dayjs().format());
```

### Error 70: Forgetting to call dayjs constructor
**Description:** Call dayjs() as a function, not a constructor with new.
```javascript
const d = new dayjs("2024-01-15");
```

## Issue Snippets

### Issue 1: Calculating date differences manually
**Description:** Using raw math instead of dayjs diff() method.
```javascript
const a = new Date("2024-01-01");
const b = new Date("2024-01-15");
const diff = (b - a) / (1000 * 60 * 60 * 24);
```

### Issue 2: Creating multiple dayjs instances for same date
**Description:** Create one dayjs instance and reuse it.
```javascript
const start = dayjs("2024-01-01");
const end1 = dayjs("2024-01-01").add(1, "day");
const end2 = dayjs("2024-01-01").add(7, "day");
```

### Issue 3: Not using relative time for display
**Description:** Hardcoding time-ago strings instead of using fromNow().
```javascript
function timeAgo(date) {
  const diff = Date.now() - date;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
  return "long ago";
}
```

### Issue 4: No fallback for invalid dates
**Description:** Formatting an invalid date without checking isValid().
```javascript
function formatDate(input) {
  return dayjs(input).format("YYYY-MM-DD");
}
```

### Issue 5: Locale not set globally
**Description:** Setting locale per instance instead of globally.
```javascript
const d1 = dayjs("2024-01-01").locale("fr");
const d2 = dayjs("2024-01-15").locale("fr");
```

### Issue 6: Mutating original date variable
**Description:** Reassigning variable instead of creating new dayjs objects.
```javascript
let date = dayjs("2024-01-01");
date = date.add(1, "month");
date = date.add(5, "day");
```

### Issue 7: Unnecessary timezone conversions
**Description:** Converting to UTC and back without need.
```javascript
const d = dayjs("2024-01-15");
const utc = d.utc();
const local = utc.local();
console.log(local.format());
```

### Issue 8: DayJS bundled with all locales
**Description:** Importing all locales instead of only needed ones.
```javascript
import "dayjs/locale/fr";
import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/it";
```

### Issue 9: Using native Date with dayjs mixed
**Description:** Mixing native Date methods with dayjs formatting.
```javascript
const d = new Date();
console.log(dayjs(d).format("YYYY"));
```

### Issue 10: Complex date math without using plugin
**Description:** Manually calculating business days instead of using plugin.
```javascript
function addBusinessDays(date, days) {
  let d = dayjs(date);
  let added = 0;
  while (added < days) {
    d = d.add(1, "day");
    if (d.day() !== 0 && d.day() !== 6) added++;
  }
  return d;
}
```

### Issue 11: Parsing dates without format string
**Description:** Using ambiguous date string without specifying format.
```javascript
const d = dayjs("01-02-2024"); // Jan 2 or Feb 1?
```

### Issue 12: Creating dayjs inside loop
**Description:** Calling dayjs() repeatedly inside a loop.
```javascript
const dates = ["2024-01-01", "2024-01-02", "2024-01-03"];
for (const d of dates) {
  console.log(dayjs(d).format("dddd"));
}
```

### Issue 13: Not using unix() for API timestamps
**Description:** Passing Unix timestamp as number without unix().
```javascript
const d = dayjs(1704067200); // treated as milliseconds
```

### Issue 14: Comparing dates without normalizing
**Description:** Comparing dates at different times of day.
```javascript
const a = dayjs("2024-01-01T10:00:00");
const b = dayjs("2024-01-01");
console.log(a.isSame(b));
```

### Issue 15: Hardcoded date format strings
**Description:** Repeating format strings instead of using constants.
```javascript
console.log(dayjs().format("YYYY-MM-DD"));
console.log(dayjs(d1).format("YYYY-MM-DD"));
console.log(dayjs(d2).format("YYYY-MM-DD"));
```

### Issue 16: Not using duration plugin for time spans
**Description:** Calculating time spans manually instead of using duration plugin.
```javascript
const start = dayjs("2024-01-01");
const end = dayjs("2024-06-15");
const diffDays = end.diff(start, "day");
const hours = diffDays * 24;
```

### Issue 17: Over-fetching with all plugins
**Description:** Importing every dayjs plugin when only a few are needed.
```javascript
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
```

### Issue 18: Using dayjs for simple year extraction
**Description:** DayJS is overkill for getting just the year from a Date.
```javascript
const d = dayjs("2024-01-15");
const year = d.year();
```

### Issue 19: Not caching dayjs instances
**Description:** Creating the same dayjs instance multiple times.
```javascript
function getMonth(d) { return dayjs(d).month(); }
function getYear(d) { return dayjs(d).year(); }
```

### Issue 20: Chaining too many methods
**Description:** Long chains of dayjs methods reduce readability.
```javascript
const result = dayjs("2024-01-15")
  .add(1, "month")
  .startOf("month")
  .add(2, "day")
  .subtract(1, "hour")
  .format("YYYY-MM-DD HH:mm");
```

### Issue 21: Not using shorthand for current date
**Description:** Creating dayjs with current timestamp instead of empty call.
```javascript
const now = dayjs(Date.now());
```

### Issue 22: Confusing clone vs mutate
**Description:** Not realizing dayjs returns new instances from methods.
```javascript
let d = dayjs("2024-01-01");
d.add(1, "day");
// d is unchanged
```

### Issue 23: ISO string without timezone
**Description:** Parsing ISO string without timezone info.
```javascript
const d = dayjs("2024-01-15T00:00:00");
```

### Issue 24: Using dayjs in server middleware repeatedly
**Description:** Creating dayjs instance on every request for static format.
```javascript
app.use((req, res, next) => {
  req.timestamp = dayjs().format("HH:mm:ss");
  next();
});
```

### Issue 25: Not handling edge dates
**Description:** DayJS may behave unexpectedly with year 0 or negative years.
```javascript
const d = dayjs("0000-01-01");
```

### Issue 26: Inconsistent format tokens
**Description:** Mixing moment.js format tokens with dayjs (dayjs uses different set).
```javascript
console.log(dayjs().format("YYYY-MM-DD hh:mm:ss A")); // hh vs HH
```

### Issue 27: Using dayjs without plugin for quarters
**Description:** Assuming quarter format is built-in.
```javascript
console.log(dayjs().format("[Q]Q"));
```

### Issue 28: Using dayjs to validate dates with strict false
**Description:** lenient parsing may accept invalid dates silently.
```javascript
const d = dayjs("2024-13-01"); // invalid month passes silently
console.log(d.isValid());
```

### Issue 29: Setting global locale mid-execution
**Description:** Changing global locale after dayjs instances exist.
```javascript
dayjs.locale("en");
const d = dayjs("2024-01-15");
dayjs.locale("fr");
console.log(d.format("dddd")); // still English
```

### Issue 30: Not using Bundle Analyzer with dayjs
**Description:** DayJS imports can bloat bundle without tree-shaking analysis.
```javascript
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/de";
```

## Modify Snippets

### Modify 1: Create dayjs instance and format date
**Description:** Create a dayjs instance for 2024-12-25 and format as "YYYY/MM/DD".
```javascript
// Format Christmas 2024
```

### Modify 2: Add days to a date
**Description:** Add 7 days to 2024-01-01 and log the result.
```javascript
const d = dayjs("2024-01-01");
// Add 7 days and format
```

### Modify 3: Calculate difference between dates
**Description:** Calculate the difference in days between two dates.
```javascript
const start = dayjs("2024-01-01");
const end = dayjs("2024-12-31");
// Log diff in days
```

### Modify 4: Check if date is before another
**Description:** Check if date A is before date B using isBefore().
```javascript
const a = dayjs("2024-06-01");
const b = dayjs("2024-12-25");
// Log isBefore result
```

### Modify 5: Format with relative time
**Description:** Import relativeTime plugin and use fromNow().
```javascript
import dayjs from "dayjs";
// Import and extend relativeTime plugin, then use fromNow()
```

### Modify 6: Check date validity
**Description:** Validate a date string before formatting.
```javascript
function safeFormat(input) {
  // Check if valid, return formatted or "Invalid date"
}
```

### Modify 7: Get start of month
**Description:** Get the first day of the month for 2024-03-15.
```javascript
const d = dayjs("2024-03-15");
// Get start of month and format
```

### Modify 8: Get end of month
**Description:** Get the last day of the month for 2024-02-10.
```javascript
const d = dayjs("2024-02-10");
// Get end of month and format
```

### Modify 9: Use unix timestamp
**Description:** Create a dayjs from Unix timestamp 1704067200.
```javascript
// Use dayjs.unix() and format the result
```

### Modify 10: Set year to 2025
**Description:** Change the year of 2024-06-15 to 2025.
```javascript
const d = dayjs("2024-06-15");
// Set year to 2025 and format
```

### Modify 11: Compare two dates for equality
**Description:** Check if two dates are the same day.
```javascript
const a = dayjs("2024-01-01");
const b = dayjs("2024-01-01");
// Use isSame to compare
```

### Modify 12: Format date with locale
**Description:** Import and use the fr locale for formatting.
```javascript
import dayjs from "dayjs";
// Import fr locale and format date in French
```

### Modify 13: Parse custom date format
**Description:** Parse "25/12/2024" with DD/MM/YYYY format using customParseFormat.
```javascript
// Use customParseFormat plugin to parse
```

### Modify 14: Get current month name
**Description:** Get the current month name in English.
```javascript
// Use dayjs to get the month name
```

### Modify 15: Calculate age from birthdate
**Description:** Calculate age in years from a birthdate.
```javascript
function calculateAge(birthdate) {
  // Use dayjs diff to calculate years
}
```

### Modify 16: Check if date is weekend
**Description:** Check if 2024-12-25 is a Saturday or Sunday.
```javascript
const d = dayjs("2024-12-25");
// Check if day() is 0 or 6
```

### Modify 17: Add months and format
**Description:** Add 3 months to 2024-10-31 and format as YYYY-MM-DD.
```javascript
const d = dayjs("2024-10-31");
// Add 3 months
```

### Modify 18: Get days in month
**Description:** Get the number of days in February 2024.
```javascript
const d = dayjs("2024-02-01");
// Use daysInMonth()
```

### Modify 19: Format with time
**Description:** Format 2024-01-15 14:30:00 as "HH:mm:ss".
```javascript
const d = dayjs("2024-01-15 14:30:00");
// Format with time
```

### Modify 20: Use isBetween plugin
**Description:** Check if 2024-06-15 is between 2024-01-01 and 2024-12-31.
```javascript
// Import isBetween plugin and check
```

### Modify 21: Convert to UTC
**Description:** Convert a local date to UTC and format.
```javascript
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const d = dayjs("2024-01-15T10:00:00");
// Convert to UTC
```

### Modify 22: Get quarter of year
**Description:** Get the quarter (Q1, Q2, Q3, Q4) for a given date.
```javascript
const d = dayjs("2024-07-01");
// Determine which quarter
```

### Modify 23: Subtract hours from time
**Description:** Subtract 5 hours from 2024-01-15 10:00.
```javascript
const d = dayjs("2024-01-15 10:00");
// Subtract 5 hours and format
```

### Modify 24: Format as relative from now
**Description:** Show "3 days ago" for a past date using relativeTime.
```javascript
// Import relativeTime, show how long ago 2024-01-01 was
```

### Modify 25: Get week of year
**Description:** Get the week number for 2024-12-25.
```javascript
// Import weekOfYear plugin and get week number
```

### Modify 26: Create date range array
**Description:** Create an array of dates from 2024-01-01 to 2024-01-07.
```javascript
function getDateRange(start, end) {
  // Use dayjs to generate range
}
```

### Modify 27: Check if year is leap year
**Description:** Check if 2024 is a leap year using isLeapYear plugin.
```javascript
// Import isLeapYear plugin and check 2024
```

### Modify 28: Format with ordinal
**Description:** Format 2024-01-15 as "January 15th, 2024" using advancedFormat.
```javascript
// Use advancedFormat plugin for ordinal
```

### Modify 29: Get start of week
**Description:** Get Monday of the week for 2024-01-17.
```javascript
const d = dayjs("2024-01-17");
// Get start of week (Monday)
```

### Modify 30: Parse time only
**Description:** Parse "14:30:00" as a time.
```javascript
// Parse time string with customParseFormat
```

### Modify 31: Use isToday plugin
**Description:** Check if a given date is today using isToday plugin.
```javascript
// Import isToday and check dayjs()
```

### Modify 32: Create birthday countdown
**Description:** Calculate days until next birthday from today.
```javascript
function daysUntilBirthday(month, day) {
  // Calculate days until next birthday
}
```

### Modify 33: Format in different timezone
**Description:** Use timezone plugin to format in America/New_York.
```javascript
// Import timezone plugin and format in NYC timezone
```

### Modify 34: Get first and last of month
**Description:** For a given date, return { firstDay, lastDay } of that month.
```javascript
function getMonthBounds(date) {
  // Return startOf and endOf month
}
```

### Modify 35: Human-readable duration
**Description:** Use duration plugin to format time span between two dates.
```javascript
// Import duration plugin and format duration between dates
```

### Modify 36: Get date from object
**Description:** Create dayjs from { year: 2024, month: 6, day: 15 }.
```javascript
const input = { year: 2024, month: 6, day: 15 };
// Create dayjs from object
```

### Modify 37: Finding next Monday
**Description:** Find the next Monday from a given date.
```javascript
function nextMonday(date) {
  // Add days until next Monday
}
```

### Modify 38: Check if it's a birthday
**Description:** Check if today matches a given birth month and day.
```javascript
function isBirthday(month, day) {
  // Check if today's month and day match
}
```

### Modify 39: Create work week dates
**Description:** Get an array of weekdays (Mon-Fri) for a given week.
```javascript
function getWorkWeek(date) {
  // Return array of Mon-Fri dates
}
```

### Modify 40: Age verification check
**Description:** Check if someone is 18 or older based on birthdate.
```javascript
function isAdult(birthdate) {
  // Use diff to check if >= 18 years
}
```

### Modify 41: Format last modified timestamp
**Description:** Format a file's last modified timestamp as relative time.
```javascript
function formatLastModified(timestamp) {
  // Return relative time string
}
```

### Modify 42: Get time until midnight
**Description:** Calculate hours and minutes until midnight.
```javascript
function timeUntilMidnight() {
  // Use dayjs to calculate
}
```

### Modify 43: Detect overlapping date ranges
**Description:** Check if two date ranges overlap.
```javascript
function rangesOverlap(start1, end1, start2, end2) {
  // Use dayjs comparison
}
```

### Modify 44: Sort dates array
**Description:** Sort an array of date strings chronologically with dayjs.
```javascript
const dates = ["2024-03-01", "2024-01-15", "2024-06-01"];
// Sort using dayjs
```

### Modify 45: Get age in days
**Description:** Calculate age in days from birthdate.
```javascript
function ageInDays(birthdate) {
  // Calculate days since birth
}
```

### Modify 46: Format with custom locale data
**Description:** Use localeData plugin to get localized month names.
```javascript
// Import localeData plugin and get French month names
```

### Modify 47: Create meeting scheduler
**Description:** Given start time and duration, calculate end time.
```javascript
function scheduleMeeting(start, durationMinutes) {
  // Add duration to start time
}
```

### Modify 48: Get ISO week number
**Description:** Get ISO week number using weekOfYear plugin.
```javascript
// Get ISO week for 2024-12-31
```

### Modify 49: Check if date is in the past
**Description:** Check if a given date is before today.
```javascript
function isPast(date) {
  // Use isBefore with today
}
```

### Modify 50: Format date with timezone abbreviation
**Description:** Format a date with timezone abbreviation like "EST".
```javascript
// Use timezone plugin to add timezone abbreviation
```
