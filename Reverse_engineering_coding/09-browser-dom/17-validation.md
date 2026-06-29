# Validation

<img src="https://media.giphy.com/media/yYSSBtDgbbRzq/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## JavaScript Validation

```javascript
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    let isValid = true;

    if (name === "") {
        showError("name", "Name is required");
        isValid = false;
    } else if (name.length < 2) {
        showError("name", "Name must be at least 2 characters");
        isValid = false;
    }

    if (email === "") {
        showError("email", "Email is required");
        isValid = false;
    } else if (!email.includes("@")) {
        showError("email", "Invalid email format");
        isValid = false;
    }

    if (isValid) {
        submitForm({ name, email });
    }
});
```

---

## Regex Patterns

```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    showError("email", "Invalid email");
}

// Phone validation (US format)
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
// Matches: (555) 123-4567

// Password strength
const hasUpperCase = /[A-Z]/;
const hasNumber = /[0-9]/;
const hasSpecial = /[!@#$%^&*]/;
```

---

## HTML5 Built-in Validation

```html
<form>
    <input type="text" required minlength="2" maxlength="50">
    <input type="email" required>
    <input type="number" min="0" max="100">
    <input type="password" pattern=".{8,}" title="At least 8 characters">
    <input type="url">
    <input type="date">
    
    <button type="submit">Submit</button>
</form>
```

---

## Constraint Validation API

```javascript
const input = document.getElementById("email");

// Check validity
console.log(input.validity.valid);       // true/false
console.log(input.validity.valueMissing); // Required field empty?
console.log(input.validity.typeMismatch); // Wrong type (email, url)?
console.log(input.validity.tooShort);     // Too few characters?
console.log(input.validity.rangeUnderflow); // Number too small?

// Custom validation message
input.setCustomValidity("Please enter a valid email address");

// Report validation
input.reportValidity(); // Shows the browser's validation bubble
```

---

## Showing Errors

```javascript
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = field.nextElementSibling; // Assume <span class="error"> exists
    
    if (error && error.classList.contains("error")) {
        error.textContent = message;
        error.style.display = "block";
    }
    
    field.classList.add("invalid");
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.style.display = "none");
    document.querySelectorAll(".invalid").forEach(e => e.classList.remove("invalid"));
}
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is validation server-side or client-side? | Client-side = immediate feedback. Server-side = security. Both are needed. |
| Is HTML5 validation being used? | Check for `required`, `pattern`, `min`, `max`, `type` attributes. |
| Is custom validation in JavaScript? | Check for `.validity`, `.setCustomValidity()`, or manual checks. |
| Can client-side validation be bypassed? | Yes (disable JS, modify requests). Always validate on the server too. |
## Next Steps

[Back to Chapter 16](16-form-submission.md): Form Submission
[Proceed to Chapter 18](18-timers.md): Timers to learn about timers.
