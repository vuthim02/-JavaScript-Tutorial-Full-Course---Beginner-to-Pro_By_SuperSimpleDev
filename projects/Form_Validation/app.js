// ============================================
// PROXY / REFLECT + REGULAR EXPRESSIONS
// ============================================

// --- Advanced Regex Patterns with Named Groups ---

const validators = {
  name: {
    regex: /^[a-zA-ZÀ-ÿ]+([ '-][a-zA-ZÀ-ÿ]+)*$/,
    test(value) {
      const result = this.regex.exec(value);
      if (!value) return { valid: false, message: 'Name is required' };
      if (!result) return { valid: false, message: 'Name: only letters, spaces, hyphens, apostrophes' };
      return { valid: true, message: `Valid name: "${result.groups?.first || value}"` };
    },
  },

  email: {
    regex: /^(?<local>[a-zA-Z0-9._%+-]+)@(?<domain>[a-zA-Z0-9.-]+)\.(?<tld>[a-zA-Z]{2,})$/,
    test(value) {
      if (!value) return { valid: false, message: 'Email is required' };
      const result = this.regex.exec(value);
      if (!result) return { valid: false, message: 'Enter a valid email address' };
      const { local, domain, tld } = result.groups;
      return { valid: true, message: `Email: ${local} at ${domain}.${tld}` };
    },
  },

  password: {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    regexWeak: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{6,}$/,
    test(value) {
      if (!value) return { valid: false, message: 'Password is required' };
      if (value.length < 8) return { valid: false, message: 'Password: min 8 characters' };

      // Named groups to check individual requirements
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecial = /[@$!%*?&#]/.test(value);

      if (!hasUpper) return { valid: false, message: 'Password needs 1 uppercase letter' };
      if (!hasLower) return { valid: false, message: 'Password needs 1 lowercase letter' };
      if (!hasDigit) return { valid: false, message: 'Password needs 1 number' };
      if (!hasSpecial) return { valid: false, message: 'Password needs 1 special char (@$!%*?&#)' };

      // Strength meter using regex
      let strength = 0;
      if (/[a-z]/.test(value)) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/\d/.test(value)) strength++;
      if (/[@$!%*?&#]/.test(value)) strength++;
      if (value.length >= 12) strength++;

      const levels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
      return { valid: true, message: `Strength: ${levels[strength - 1] || 'Weak'}` };
    },
  },

  phone: {
    // International format: optional country code, flexible separators
    regex: /^(?<country>\+?\d{1,3}[-.\s]?)?\(?(?<area>\d{3})\)?[-.\s]?(?<first>\d{3})[-.\s]?(?<last>\d{4})$/,
    test(value) {
      if (!value) return { valid: false, message: 'Phone is required' };
      const result = this.regex.exec(value);
      if (!result) return { valid: false, message: 'Enter a valid phone number' };
      const { country, area, first, last } = result.groups;
      const formatted = country
        ? `${country}(${area}) ${first}-${last}`
        : `(${area}) ${first}-${last}`;
      return { valid: true, message: `Formatted: ${formatted}` };
    },
  },
};

// --- Proxy for Auto-Validation ---

const formFields = { name: '', email: '', password: '', phone: '' };
const validationState = { name: false, email: false, password: false, phone: false };

// Error display elements
const errors = {
  name:    document.getElementById('nameError'),
  email:   document.getElementById('emailError'),
  password: document.getElementById('passwordError'),
  phone:   document.getElementById('phoneError'),
};

const inputs = {
  name:    document.getElementById('name'),
  email:   document.getElementById('email'),
  password: document.getElementById('password'),
  phone:   document.getElementById('phone'),
};

// Handler with Reflect traps
const handler = {
  // Trap: whenever a property is SET (e.g. formData.email = "test")
  set(target, property, value) {
    console.log(`[Proxy SET] ${property} = "${value}"`);

    // Use Reflect to perform the actual set
    const success = Reflect.set(target, property, value);

    // Auto-validate after every set
    if (validators[property]) {
      const result = validators[property].test(value);
      validationState[property] = result.valid;

      // Update UI via Reflect
      const inputEl = inputs[property];
      const errorEl = errors[property];

      if (inputEl) {
        Reflect.set(inputEl, 'className', result.valid ? 'valid' : (value ? 'invalid' : ''));
      }
      if (errorEl) {
        Reflect.set(errorEl, 'textContent', value ? result.message : '');
      }

      console.log(`[Proxy VALIDATE] ${property}: ${result.valid ? 'PASS' : 'FAIL'} — ${result.message}`);
    }

    return success;
  },

  // Trap: whenever a property is READ
  get(target, property) {
    const value = Reflect.get(target, property);
    console.log(`[Proxy GET] ${property} = "${value}"`);
    return value;
  },

  // Trap: check if property exists
  has(target, property) {
    const exists = Reflect.has(target, property);
    console.log(`[Proxy HAS] ${property}: ${exists}`);
    return exists;
  },
};

// Create the Proxy — setting ANY field auto-validates it
const formData = new Proxy(formFields, handler);

// --- Sync inputs with Proxy ---

Object.keys(inputs).forEach(field => {
  inputs[field].addEventListener('input', (e) => {
    // This triggers the Proxy set trap → auto-validates
    formData[field] = e.target.value.trim();
  });

  inputs[field].addEventListener('blur', () => {
    // Re-validate on blur
    formData[field] = inputs[field].value.trim();
  });
});

// --- Form Submit ---

const form = document.getElementById('form');
const success = document.getElementById('success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Trigger validation for all fields via Proxy
  Object.keys(formData).forEach(field => {
    formData[field] = inputs[field].value.trim();
  });

  const allValid = Object.values(validationState).every(Boolean);

  if (allValid) {
    success.style.display = 'block';
    form.reset();
    // Reset proxy values
    Object.keys(formData).forEach(field => {
      formData[field] = '';
    });
  }
});

// --- Demo: Log Proxy capabilities ---
console.log('=== Proxy Demo ===');
console.log('name' in formData);              // triggers has trap
console.log('formData.name:', formData.name);  // triggers get trap
formData.name = 'John';                        // triggers set trap + auto-validate
formData.email = 'john@example.com';           // triggers set trap + auto-validate
