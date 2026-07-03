# Form Submission

## The submit Event

```javascript
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page reload
    // Process form data
});
```

---

## Why preventDefault?

Without `preventDefault()`:

```
User clicks submit → form submits → page reloads
                                       ↓
                              All JavaScript state lost
```

With `preventDefault()`:

```
User clicks submit → e.preventDefault() → JavaScript handles data
                                           ↓
                          Fetch API (AJAX) → update page dynamically
```

---

## Getting Form Data

```javascript
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Method 1: individual fields
    const name = document.getElementById("name").value;

    // Method 2: FormData
    const formData = new FormData(form);
    const name2 = formData.get("name");

    // Method 3: Object from FormData
    const data = Object.fromEntries(formData);
    console.log(data); // { name: "John", email: "john@example.com" }
});
```

---

## Submit Button Identification

```javascript
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitter = e.submitter; // The button that was clicked
    console.log(submitter.value); // "save" or "delete" depending on button
});
```

```html
<button type="submit" name="action" value="save">Save</button>
<button type="submit" name="action" value="delete">Delete</button>
```

---

## Input Events

```javascript
// Fires on every keystroke
input.addEventListener("input", () => {
    console.log("Current value:", input.value);
});

// Fires when focus leaves and value changed
input.addEventListener("change", () => {
    console.log("Final value:", input.value);
});

// Fires when element gains focus
input.addEventListener("focus", () => {
    input.style.borderColor = "blue";
});

// Fires when element loses focus
input.addEventListener("blur", () => {
    input.style.borderColor = "";
});
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why page reload? | The `submit` event default action was not prevented. |
| Was default prevented? | Check if `e.preventDefault()` is called inside the submit handler. |
| How to get all form values at once? | Use `new FormData(form)` and `Object.fromEntries()`. |
| What is the difference between `input` and `change` events? | `input` fires on every keystroke. `change` fires when the value is committed (blur + changed). |
## Next Steps

[Back to Chapter 15](15-forms-basics.md): Forms — Input Elements
[Proceed to Chapter 17](17-validation.md): Validation to learn about validation.
