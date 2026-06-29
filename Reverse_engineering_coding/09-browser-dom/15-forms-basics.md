# Forms — Input Elements

<img src="https://media.giphy.com/media/yYSSBtDgbbRzq/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Input

```html
<input id="name" type="text" value="John">
```

```javascript
const input = document.getElementById("name");
input.value;     // Current value ("John")
input.type;      // "text"
input.name;      // "name"
input.placeholder; // "" (placeholder text)
input.disabled;  // false
input.readOnly;  // false
```

---

## Checkbox

```html
<input type="checkbox" id="agree" checked>
```

```javascript
const checkbox = document.getElementById("agree");
checkbox.checked; // true (not .value)
```

---

## Radio Buttons

```html
<input type="radio" name="color" value="red" checked>
<input type="radio" name="color" value="blue">
```

```javascript
const radios = document.querySelectorAll('input[name="color"]');
radios.forEach(r => {
    if (r.checked) console.log(r.value); // "red"
});
```

---

## Select / Dropdown

```html
<select id="city">
    <option value="nyc">New York</option>
    <option value="london" selected>London</option>
</select>
```

```javascript
const select = document.getElementById("city");
select.value;    // "london" (selected option value)
select.selectedIndex; // 1 (index of selected option)
```

---

## Textarea

```html
<textarea id="bio">Hello world</textarea>
```

```javascript
const textarea = document.getElementById("bio");
textarea.value; // "Hello world"
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How to get value from an input? | `input.value`. |
| How to check if a checkbox is checked? | `checkbox.checked`. |
| How to get selected value from a dropdown? | `select.value`. |
| What is the difference between `value` and `defaultValue`? | `value` is current; `defaultValue` is the initial HTML value. |
## Next Steps

[Back to Chapter 14](14-event-delegation.md): Event Delegation
[Proceed to Chapter 16](16-form-submission.md): Form Submission to learn about form submission.
