# 17 — Internationalization API (Intl)

## Number Formatting

```javascript
// Currency
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});
console.log(formatter.format(1234567.89)); // "$1,234,567.89"

// Different locales
const deFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
});
console.log(deFormatter.format(1234567.89)); // "1.234.567,89 €"
```

---

## Number Options

```javascript
// Percentage
const pct = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1
});
console.log(pct.format(0.875)); // "87.5%"

// Units
const distance = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "long"
});
console.log(distance.format(42)); // "42 kilometers"

// Compact notation
const compact = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short"
});
console.log(compact.format(1500000)); // "1.5M"
```

---

## Date Formatting

```javascript
const date = new Date("2025-01-15T10:30:00");

// Full date
const full = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});
console.log(full.format(date)); // "Wednesday, January 15, 2025"

// Short date
const short = new Intl.DateTimeFormat("en-US");
console.log(short.format(date)); // "1/15/2025"

// Time
const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
});
console.log(time.format(date)); // "10:30:00 AM"
```

---

## Relative Time

```javascript
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

console.log(rtf.format(-1, "day"));   // "yesterday"
console.log(rtf.format(-3, "day"));   // "3 days ago"
console.log(rtf.format(1, "hour"));   // "in 1 hour"
console.log(rtf.format(0, "minute")); // "now"
```

---

## Plural Rules & List Format

```javascript
const plural = new Intl.PluralRules("en-US");
console.log(plural.select(0));  // "other"
console.log(plural.select(1));  // "one"
console.log(plural.select(2));  // "other"

const items = ["apple", "banana", "cherry"];
const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction"
});
console.log(formatter.format(items)); // "apple, banana, and cherry"
```

---

## Collation (String Comparison)

```javascript
const names = ["ñuñez", "nunez", "núñez"];

// Default (US) sort
names.sort();
console.log(names); // May not be correct for Spanish

// Language-aware sort
names.sort(new Intl.Collator("es").compare);
console.log(names); // Correct Spanish sort order
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How to format currency for different locales? | `new Intl.NumberFormat(locale, { style: "currency", currency: "..." })`. |
| How to format dates for different locales? | `new Intl.DateTimeFormat(locale, options)`. |
| How to show "2 days ago"? | `new Intl.RelativeTimeFormat("en", { numeric: "auto" })`. |
## Next Steps

[Back to Chapter 16](16-tagged-templates.md): 16 — Tagged Template Literals
[Proceed to Chapter 18](18-proxy.md): 18 — Proxy to learn about 18 — proxy.
