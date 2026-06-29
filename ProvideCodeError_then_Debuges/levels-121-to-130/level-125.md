# Level 125: Multi-step Checkout Form (functions + state management)

## Error Snippets

### Error 1: State mutation in function
**Description:** Update checkout step
```javascript
const checkoutState = { currentStep: 1, steps: ['Cart', 'Shipping', 'Payment', 'Review'] };
function goToNextStep() {
  checkoutState = { ...checkoutState, currentStep: checkoutState.currentStep + 1 };
}
```

### Error 2: Form field validation not returning
**Description:** Validate email field in checkout
```javascript
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return 'Invalid email';
  }
}
```

### Error 3: Not preventing form submission
**Description:** Handle checkout form submit
```javascript
document.getElementById('checkout-form').addEventListener('submit', function(e) {
  const data = new FormData(this);
  processPayment(data);
});
```

### Error 4: Step indicator array index out of bounds
**Description:** Show current step in checkout progress
```javascript
const steps = ['Cart', 'Shipping', 'Payment', 'Confirm'];
const currentStepIndex = 4;
document.getElementById('step-label').textContent = steps[currentStepIndex];
```

### Error 5: Not clearing timer on step change
**Description:** Auto-save checkout form every 30 seconds
```javascript
let autoSaveTimer = setInterval(() => {
  saveCheckoutState(checkoutData);
}, 30000);
function goToStep(step) {
  renderStep(step);
}
```

### Error 6: Closures in step navigation losing state
**Description:** Create step navigation buttons
```javascript
const steps = ['shipping', 'payment', 'review'];
for (var i = 0; i < steps.length; i++) {
  document.getElementById(`btn-${steps[i]}`).addEventListener('click', function() {
    goToStep(steps[i]);
  });
}
```

### Error 7: Accumulating validation errors into wrong structure
**Description:** Validate all checkout form fields
```javascript
function validateForm(formData) {
  const errors = [];
  if (!formData.email) errors.push('Email required');
  if (!formData.name) errors.push('Name required');
  return errors;
}
```

### Error 8: Not restoring form state correctly
**Description:** Load saved checkout state
```javascript
function loadCheckoutState() {
  const saved = localStorage.getItem('checkoutState');
  if (saved) {
    checkoutState = JSON.parse(saved);
  }
}
```

### Error 9: Credit card validation using incorrect Luhn implementation
**Description:** Validate credit card number
```javascript
function validateCardNumber(number) {
  const digits = number.replace(/\D/g, '');
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i]);
    if (i % 2 === 0) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  return sum % 10 === 0;
}
```

### Error 10: Function redefinition inside loop
**Description:** Create step validation functions
```javascript
const stepValidators = {};
['shipping', 'payment', 'review'].forEach(step => {
  stepValidators[step] = function() {
    validateStep(step);
  };
});
```

### Error 11: Global state mutated directly
**Description:** Update shipping info in checkout state
```javascript
function updateShipping(field, value) {
  checkoutState.shipping[field] = value;
}
```

### Error 12: Not validating required fields before submission
**Description:** Submit checkout order
```javascript
async function submitOrder() {
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(checkoutState)
  });
  return response.json();
}
```

### Error 13: Wrong property used for form data
**Description:** Get form field value
```javascript
function getFieldValue(fieldId) {
  const element = document.getElementById(fieldId);
  return element.value;
}
```

### Error 14: Step state not preserved on browser back
**Description:** Navigate to previous step
```javascript
function goBack() {
  if (checkoutState.currentStep > 1) {
    checkoutState.currentStep--;
    renderStep(checkoutState.currentStep);
  }
}
```

### Error 15: Not disabling next button on invalid step
**Description:** Enable/disable next button
```javascript
function updateNextButton() {
  const btn = document.getElementById('next-btn');
  btn.disabled = !isStepValid();
}
```

### Error 16: State spread losing nested objects
**Description:** Update checkout state with new data
```javascript
function updateCheckout(updates) {
  checkoutState = { ...checkoutState, ...updates };
}
```

### Error 17: Arrow function this in form handler
**Description:** Handle form field change
```javascript
class CheckoutForm {
  constructor() {
    this.data = {};
    document.getElementById('email').addEventListener('input', (e) => {
      this.data.email = e.target.value;
    });
  }
}
```

### Error 18: Using var in block scope for step rendering
**Description:** Render form fields for each step
```javascript
for (var i = 1; i <= 4; i++) {
  const btn = document.createElement('button');
  btn.textContent = `Step ${i}`;
  btn.addEventListener('click', function() {
    renderStep(i);
  });
  document.body.appendChild(btn);
}
```

### Error 19: Not extracting validation into separate functions
**Description:** Validate checkout step
```javascript
function validateStep(step) {
  if (step === 1) {
    // validate cart
  } else if (step === 2) {
    // validate shipping
  } else if (step === 3) {
    // validate payment
  }
}
```

### Error 20: State reset on page refresh
**Description:** Initialize checkout state
```javascript
function initCheckout() {
  checkoutState = { currentStep: 1, data: {} };
}
```

### Error 21: Missing default case in step render
**Description:** Render current checkout step
```javascript
function renderStep(step) {
  const container = document.getElementById('step-content');
  switch(step) {
    case 1: renderCartReview(); break;
    case 2: renderShippingForm(); break;
    case 3: renderPaymentForm(); break;
    case 4: renderOrderReview(); break;
  }
}
```

### Error 22: Not resetting form errors on step change
**Description:** Show validation errors
```javascript
function showErrors(errors) {
  const container = document.getElementById('step-errors');
  container.innerHTML = '';
  errors.forEach(error => {
    const div = document.createElement('div');
    div.className = 'error';
    div.textContent = error;
    container.appendChild(div);
  });
}
```

### Error 23: Object property with undefined value
**Description:** Set default shipping address
```javascript
function getDefaultShipping() {
  return {
    firstName: '',
    lastName: '',
    address: undefined,
    city: '',
    zip: ''
  };
}
```

### Error 24: Async step validation not awaited
**Description:** Validate address with API
```javascript
function validateAddress(address) {
  return fetch('/api/validate-address', {
    method: 'POST',
    body: JSON.stringify(address)
  }).then(r => r.json());
}
function goToNextStep() {
  if (checkoutState.currentStep === 2) {
    validateAddress(checkoutState.shipping);
  }
  proceedToNextStep();
}
```

### Error 25: JSON.parse with malformed stored data
**Description:** Load saved checkout progress
```javascript
function loadSavedProgress() {
  const saved = localStorage.getItem('checkoutProgress');
  return JSON.parse(saved);
}
```

### Error 26: Not sanitizing form input before display
**Description:** Display order summary with user input
```javascript
function renderOrderSummary(data) {
  document.getElementById('summary').innerHTML = `
    <p>Name: ${data.fullName}</p>
    <p>Address: ${data.address}</p>
  `;
}
```

### Error 27: Wrong step index math
**Description:** Calculate progress percentage for checkout
```javascript
const totalSteps = 4;
const currentProgress = (checkoutState.currentStep / totalSteps) * 100;
```

### Error 28: Not using name attribute for form elements
**Description:** Get form data on submit
```javascript
function handleSubmit(e) {
  const form = e.target;
  const data = {
    email: form.email.value,
    name: form.name.value
  };
}
```

### Error 29: Checkbox value always returns 'on'
**Description:** Get newsletter subscription value
```javascript
function getNewsletterPref() {
  const checkbox = document.getElementById('newsletter');
  return checkbox.value;
}
```

### Error 30: Not handling disabled state for payment button
**Description:** Submit payment button handler
```javascript
document.getElementById('pay-btn').addEventListener('click', async function() {
  this.disabled = true;
  await processPayment();
  this.disabled = false;
});
```

### Error 31: Confusing function hoisting in step validation
**Description:** Validate checkout step
```javascript
function validateStep(step) {
  return stepValidators[step]();
}
var stepValidators = {
  shipping: () => validateShipping(),
  payment: () => validatePayment()
};
```

### Error 32: Not preserving radio button state
**Description:** Get selected shipping method
```javascript
function getShippingMethod() {
  const radios = document.getElementsByName('shipping-method');
  radios.forEach(r => {
    if (r.checked) return r.value;
  });
}
```

### Error 33: Object.assign for array state
**Description:** Add item to checkout order
```javascript
function addOrderItem(item) {
  checkoutState.items = Object.assign([], checkoutState.items, [item]);
}
```

### Error 34: Not using preventDefault for back button
**Description:** Handle browser back during checkout
```javascript
window.addEventListener('popstate', function(e) {
  if (checkoutState.currentStep > 1) {
    goToStep(checkoutState.currentStep - 1);
  }
});
```

### Error 35: Wrong field name in validation
**Description:** Validate ZIP code format
```javascript
function validateZip(zip) {
  const re = /^\d{5}(-\d{4})?$/;
  return re.test(zip);
}
```

### Error 36: Not handling empty cart for checkout
**Description:** Proceed to checkout
```javascript
function proceedToCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;
  renderStep(1);
}
```

### Error 37: State spread overwriting nested objects
**Description:** Update payment info in checkout
```javascript
function updatePaymentInfo(paymentData) {
  checkoutState = {
    ...checkoutState,
    payment: paymentData
  };
}
```

### Error 38: Not accounting for tax changes in review
**Description:** Calculate order total for review
```javascript
function calculateOrderTotal() {
  const subtotal = checkoutState.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  return subtotal + tax;
}
```

### Error 39: Function default parameters with mutable objects
**Description:** Set default checkout options
```javascript
function createCheckout(options = { shipping: 'standard', gift: false }) {
  return { ...options };
}
```

### Error 40: Step render not cleaning up previous step
**Description:** Render checkout step content
```javascript
function renderStep(step) {
  const container = document.getElementById('step-content');
  if (step === 1) renderCart();
  if (step === 2) renderShipping();
}
```

### Error 41: Not using strict equality for step comparison
**Description:** Check if on last step
```javascript
const isLastStep = checkoutState.currentStep == checkoutState.totalSteps;
```

### Error 42: Input event fired before binding
**Description:** Initialize form with saved data
```javascript
function initForm() {
  const saved = loadSavedData();
  document.getElementById('email').value = saved.email;
  document.getElementById('email').addEventListener('input', handleEmailChange);
}
```

### Error 43: Using innerHTML with unsanitized input
**Description:** Display shipping address in review step
```javascript
function displayShipping(address) {
  document.getElementById('shipping-display').innerHTML = `
    <strong>${address.name}</strong><br>
    ${address.street}<br>
    ${address.city}, ${address.state} ${address.zip}
  `;
}
```

### Error 44: Promise.allSettled not handling rejections
**Description:** Validate multiple checkout fields asynchronously
```javascript
async function validateAllFields(fields) {
  const results = await Promise.allSettled(fields.map(f => validateField(f)));
  const errors = results.filter(r => r.status === 'rejected').map(r => r.reason);
  return errors;
}
```

### Error 45: Not disabling form during submission
**Description:** Submit checkout form
```javascript
async function submitCheckout() {
  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Processing...';
  await fetch('/api/checkout', { method: 'POST', body: JSON.stringify(checkoutState) });
  btn.textContent = 'Submit Order';
}
```

### Error 46: State cache not updated on mutation
**Description:** Save checkout state after update
```javascript
function updateAndSave(field, value) {
  checkoutState[field] = value;
  localStorage.setItem('checkoutState', JSON.stringify(checkoutState));
}
```

### Error 47: Using array index as React key (not React but state management)
**Description:** Render list of cart items in checkout
```javascript
function renderCheckoutItems(items) {
  return items.map((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `<span>${item.name}</span><span>${item.price}</span>`;
    return div;
  });
}
```

### Error 48: Not validating step transition
**Description:** Allow moving to next step
```javascript
function canGoNext() {
  return true;
}
```

### Error 49: Freezing entire state object prevents updates
**Description:** Create immutable checkout state
```javascript
function createState(initial) {
  return Object.freeze(initial);
}
const state = createState({ step: 1, data: {} });
state.step = 2;
```

### Error 50: Mismatched form enctype
**Description:** Submit checkout form with file upload
```javascript
const form = document.getElementById('checkout-form');
form.enctype = 'application/x-www-form-urlencoded';
```

### Error 51: Step component not unmounting properly
**Description:** Clean up step resources
```javascript
function renderShippingForm() {
  const container = document.getElementById('step-content');
  container.innerHTML = getShippingFormHTML();
  initAutocomplete();
}
```

### Error 52: Not handling payment gateway timeout
**Description:** Process payment with timeout
```javascript
async function processPayment(timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const result = await fetch('/api/pay', { signal: controller.signal });
    clearTimeout(timer);
    return result;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}
```

### Error 53: String concatenation instead of template literals
**Description:** Build order confirmation message
```javascript
function buildConfirmation(orderId) {
  return 'Order ' + orderId + ' confirmed!';
}
```

### Error 54: State not deeply cloned for undo
**Description:** Save state snapshot before changes
```javascript
let previousState = checkoutState;
checkoutState.shipping = newShipping;
```

### Error 55: Switch fallthrough in step rendering
**Description:** Render different step content
```javascript
function renderStep(step) {
  switch(step) {
    case 1:
      renderCart();
    case 2:
      renderShipping();
    case 3:
      renderPayment();
  }
}
```

### Error 56: Not showing spinner on step transition
**Description:** Navigate between checkout steps
```javascript
function transitionStep(from, to) {
  hideStep(from);
  showStep(to);
}
```

### Error 57: Form validation on wrong event
**Description:** Validate field on every keystroke
```javascript
document.getElementById('email').addEventListener('change', validateEmail);
```

### Error 58: Not resetting checkout on order completion
**Description:** Complete order and show confirmation
```javascript
function completeOrder() {
  renderConfirmation();
}
```

### Error 59: Wrong API endpoint for address validation
**Description:** Validate shipping address
```javascript
async function validateShippingAddress(address) {
  const res = await fetch('/api/check-address', {
    method: 'POST',
    body: address
  });
  return res.json();
}
```

### Error 60: Not handling payment decline gracefully
**Description:** Process payment and handle errors
```javascript
async function processPayment() {
  try {
    const result = await chargeCard(checkoutState.payment);
    completeOrder();
  } catch (err) {
    alert('Payment failed');
  }
}
```

### Error 61: Not using requestSubmit for form validation
**Description:** Submit checkout form programmatically
```javascript
function submitForm() {
  const form = document.getElementById('checkout-form');
  form.submit();
}
```

### Error 62: State update with stale closure
**Description:** Update shipping after async validation
```javascript
function validateAndUpdate(field, value) {
  setTimeout(() => {
    checkoutState.shipping[field] = value;
  }, 1000);
}
```

### Error 63: Inconsistent state shape between steps
**Description:** Initialize checkout state
```javascript
const initialState = {
  step: 1,
  shipping: {},
  payment: {}
};
```

### Error 64: Not validating card expiry date correctly
**Description:** Validate credit card expiration
```javascript
function validateExpiry(month, year) {
  const now = new Date();
  const expiry = new Date(year, month);
  return expiry > now;
}
```

### Error 65: Field dependencies not validated together
**Description:** Validate state and zip code
```javascript
function validateLocation(state, zip) {
  if (!state) return 'State required';
  if (!zip) return 'ZIP required';
}
```

### Error 66: Not prefilling form from saved state
**Description:** Render shipping form
```javascript
function renderShippingForm() {
  const form = document.getElementById('shipping-form');
  form.innerHTML = shippingFormHTML;
  form.addEventListener('submit', handleShippingSubmit);
}
```

### Error 67: Falsey check on number zero
**Description:** Check if discount amount is valid
```javascript
function isValidDiscount(amount) {
  if (!amount) return false;
  return amount > 0;
}
```

### Error 68: Not extracting city/state from address autocomplete
**Description:** Handle address autocomplete selection
```javascript
function onAddressSelect(address) {
  checkoutState.shipping.street = address.street;
  checkoutState.shipping.city = address.city;
}
```

### Error 69: Wrong order of operations in total calculation
**Description:** Calculate order total with discounts
```javascript
function calculateTotal(items, discount) {
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const discounted = subtotal - discount;
  const tax = discounted * 0.08;
  return discounted + tax;
}
```

### Error 70: Module state shared across instances
**Description:** Create checkout module
```javascript
const CheckoutModule = (function() {
  let state = {};
  return {
    getState: () => state,
    setState: (newState) => { state = newState; }
  };
})();
```

## Issue Snippets

### Issue 1: Long function handling multiple steps
**Description:** Process checkout step
```javascript
function processStep(step, data) {
  if (step === 1) {
    // validate cart
    // calculate totals
    // show summary
  } else if (step === 2) {
    // validate address
    // save shipping
  } else if (step === 3) {
    // validate payment
    // process card
  }
}
```

### Issue 2: No visual feedback for step transitions
**Description:** Change checkout step
```javascript
function changeStep(newStep) {
  currentStep = newStep;
  renderStep(currentStep);
}
```

### Issue 3: Step data stored in separate variables
**Description:** Store checkout form data
```javascript
let shippingData = {};
let paymentData = {};
let reviewData = {};
```

### Issue 4: Using alert for form validation messages
**Description:** Validate checkout form
```javascript
function validateForm() {
  if (!email) {
    alert('Email is required');
    return false;
  }
}
```

### Issue 5: Not saving partial form progress
**Description:** Initialize checkout
```javascript
function initCheckout() {
  renderStep(1);
}
```

### Issue 6: Inline styles for step indicators
**Description:** Mark active step
```javascript
function setActiveStep(step) {
  document.getElementById(`step-${step}`).style.backgroundColor = 'blue';
  document.getElementById(`step-${step}`).style.color = 'white';
}
```

### Issue 7: Not using data attributes for step elements
**Description:** Get step number from element
```javascript
document.querySelectorAll('.step-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const step = this.className.split('-')[1];
    goToStep(parseInt(step));
  });
});
```

### Issue 8: Multiple form submit handlers
**Description:** Setup checkout form
```javascript
document.getElementById('checkout-form').addEventListener('submit', validateStep);
document.getElementById('checkout-form').addEventListener('submit', submitOrder);
```

### Issue 9: Re-fetching data on every step render
**Description:** Render shipping step
```javascript
function renderShipping() {
  const userData = await fetchUserData();
  renderForm(userData.shipping);
}
```

### Issue 10: Not using form autocomplete attributes
**Description:** Create shipping form fields
```javascript
function createShippingFields() {
  return `
    <input type="text" name="name" placeholder="Full Name">
    <input type="text" name="address" placeholder="Address">
  `;
}
```

### Issue 11: Hardcoded step names in render logic
**Description:** Get step display name
```javascript
function getStepName(step) {
  if (step === 1) return 'Cart';
  if (step === 2) return 'Shipping';
  if (step === 3) return 'Payment';
}
```

### Issue 12: Not handling back navigation in multi-step
**Description:** Go to previous step
```javascript
function prevStep() {
  currentStep--;
  renderStep(currentStep);
}
```

### Issue 13: Single validation message instead of per-field
**Description:** Show validation error
```javascript
function showError(message) {
  document.getElementById('form-error').textContent = message;
}
```

### Issue 14: Not trimming whitespace from inputs
**Description:** Get form field values
```javascript
function collectFormData() {
  return {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value
  };
}
```

### Issue 15: Checkout progress using magic numbers
**Description:** Calculate progress bar width
```javascript
const progressWidth = (currentStep / 4) * 100;
```

### Issue 16: Not validating email format in checkout
**Description:** Validate checkout email
```javascript
function validateEmail(email) {
  return email.includes('@');
}
```

### Issue 17: Not preventing double form submission
**Description:** Submit checkout form
```javascript
submitBtn.addEventListener('click', () => {
  submitOrder();
});
```

### Issue 18: Not trimming address fields
**Description:** Save shipping address
```javascript
function saveAddress(address) {
  localStorage.setItem('shippingAddress', JSON.stringify(address));
}
```

### Issue 19: Not validating credit card expiry
**Description:** Validate card expiry date
```javascript
function validateExpiry(month, year) {
  return month > 0 && month < 13;
}
```

### Issue 20: Not sanitizing promo code input
**Description:** Apply promo code
```javascript
function applyPromo(code) {
  const discount = getPromoDiscount(code);
  updateTotal(discount);
}
```

### Issue 21: Not checking required fields before submit
**Description:** Submit checkout form
```javascript
function handleSubmit() {
  submitOrder(checkoutState);
}
```

### Issue 22: Not handling payment gateway timeout
**Description:** Process payment
```javascript
async function processPayment(cardInfo) {
  const result = await paymentGateway.charge(cardInfo);
  return result;
}
```

### Issue 23: Not resetting form after successful submission
**Description:** Handle successful order
```javascript
function onOrderSuccess(orderId) {
  showConfirmation(orderId);
}
```

### Issue 24: Not showing field-level validation errors
**Description:** Validate checkout fields
```javascript
function validateField(name, value) {
  if (!value) return false;
  return true;
}
```

### Issue 25: Not saving draft state periodically
**Description:** Auto-save checkout draft
```javascript
setInterval(() => {
  localStorage.setItem('checkoutDraft', JSON.stringify(checkoutState));
}, 30000);
```

### Issue 26: Not handling back button during checkout
**Description:** Go to previous checkout step
```javascript
function goBack() {
  currentStep--;
  renderStep(currentStep);
}
```

### Issue 27: Not validating phone number format
**Description:** Validate shipping phone
```javascript
function validatePhone(phone) {
  return phone.length > 6;
}
```

### Issue 28: Not checking cart expiry before checkout
**Description:** Load cart for checkout
```javascript
function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
```

### Issue 29: Not handling quantity changes during checkout
**Description:** Update item quantity
```javascript
function updateQty(itemId, newQty) {
  const item = checkoutState.items.find(i => i.id === itemId);
  if (item) item.qty = newQty;
}
```

### Issue 30: Not confirming before cancelling checkout
**Description:** Cancel checkout
```javascript
function cancelCheckout() {
  window.location.href = '/cart';
}
```

## Modify Snippets

### Modify 1: Add step progress indicator
**Description:** Show step progress bar with labels
```javascript
function renderProgressBar(currentStep, totalSteps) {
  const progressBar = document.getElementById('progress-bar');
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressBar.style.width = `${percentage}%`;
}
```

### Modify 2: Add form data persistence
**Description:** Save form data to localStorage on each change
```javascript
function autoSaveCheckout(data) {
  localStorage.setItem('checkoutDraft', JSON.stringify({
    data,
    step: checkoutState.currentStep,
    timestamp: Date.now()
  }));
}
```

### Modify 3: Add step validation before proceeding
**Description:** Validate current step before moving to next
```javascript
function canProceedToNext(step) {
  const validators = {
    1: validateCart,
    2: validateShipping,
    3: validatePayment
  };
  const validator = validators[step];
  if (!validator) return true;
  const errors = validator(checkoutState);
  showErrors(errors);
  return errors.length === 0;
}
```

### Modify 4: Add address autocomplete
**Description:** Autocomplete shipping address with Google Places API
```javascript
function setupAddressAutocomplete(inputId) {
  const input = document.getElementById(inputId);
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    const address = parseGoogleAddress(place);
    fillShippingFields(address);
  });
}
```

### Modify 5: Add order summary review step
**Description:** Show complete order summary before final submission
```javascript
function renderOrderSummary() {
  const state = checkoutState;
  const container = document.getElementById('step-content');
  container.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-section">
      <h4>Shipping To:</h4>
      <p>${state.shipping.firstName} ${state.shipping.lastName}</p>
      <p>${state.shipping.address}</p>
    </div>
    <div class="summary-section">
      <h4>Payment:</h4>
      <p>Card ending in ${state.payment.cardLastFour}</p>
    </div>
    <div class="summary-section">
      <h4>Items:</h4>
      ${state.cart.map(item => `
        <div class="summary-item">
          <span>${item.name} x${item.qty}</span>
          <span>$${(item.price * item.qty).toFixed(2)}</span>
        </div>
      `).join('')}
    </div>
    <div class="summary-total">
      <strong>Total: $${calculateTotal()}</strong>
    </div>
  `;
}
```

### Modify 6: Add edit button for each step in review
**Description:** Allow editing previous steps from review
```javascript
function renderReviewWithEdit() {
  const steps = ['cart', 'shipping', 'payment'];
  steps.forEach((step, index) => {
    const section = document.getElementById(`review-${step}`);
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => goToStep(index + 1));
    section.appendChild(editBtn);
  });
}
```

### Modify 7: Add form field error highlighting
**Description:** Highlight invalid fields in red
```javascript
function highlightFieldErrors(errors) {
  document.querySelectorAll('.form-field').forEach(f => f.classList.remove('error'));
  errors.forEach(error => {
    const field = document.getElementById(`field-${error.field}`);
    if (field) {
      field.classList.add('error');
      const errorMsg = document.createElement('span');
      errorMsg.className = 'field-error';
      errorMsg.textContent = error.message;
      field.parentNode.appendChild(errorMsg);
    }
  });
}
```

### Modify 8: Add conditional field display
**Description:** Show/hide fields based on selections
```javascript
function setupConditionalFields() {
  const shippingMethod = document.getElementsByName('shipping-method');
  shippingMethod.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const expressFields = document.getElementById('express-fields');
      if (e.target.value === 'express') {
        expressFields.classList.remove('hidden');
      } else {
        expressFields.classList.add('hidden');
      }
    });
  });
}
```

### Modify 9: Add billing address same as shipping toggle
**Description:** Copy shipping address to billing
```javascript
document.getElementById('same-as-shipping').addEventListener('change', function(e) {
  if (e.target.checked) {
    const shipping = checkoutState.shipping;
    document.getElementById('billing-name').value = shipping.firstName + ' ' + shipping.lastName;
    document.getElementById('billing-address').value = shipping.address;
    document.getElementById('billing-city').value = shipping.city;
    document.getElementById('billing-zip').value = shipping.zip;
  }
});
```

### Modify 10: Add real-time field validation
**Description:** Validate field on blur
```javascript
function setupFieldValidation() {
  const validations = {
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : 'Invalid email',
    phone: (val) => /^\d{10}$/.test(val.replace(/\D/g, '')) ? null : 'Invalid phone',
    zip: (val) => /^\d{5}$/.test(val) ? null : 'Invalid ZIP code'
  };
  Object.entries(validations).forEach(([fieldId, validator]) => {
    const input = document.getElementById(fieldId);
    input.addEventListener('blur', () => {
      const error = validator(input.value);
      showFieldError(fieldId, error);
    });
  });
}
```

### Modify 11: Add loading state for step transitions
**Description:** Show spinner when loading next step
```javascript
function transitionStep(toStep) {
  const container = document.getElementById('step-content');
  container.classList.add('loading');
  container.innerHTML = '<div class="spinner"></div>';
  setTimeout(() => {
    renderStep(toStep);
    container.classList.remove('loading');
    updateProgressBar(toStep);
  }, 300);
}
```

### Modify 12: Add payment method selection
**Description:** Toggle between credit card, PayPal, etc.
```javascript
function setupPaymentMethods() {
  const methods = ['credit-card', 'paypal', 'apple-pay'];
  methods.forEach(method => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'payment-method';
    radio.value = method;
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.payment-fields').forEach(f => f.classList.add('hidden'));
      document.getElementById(`${e.target.value}-fields`).classList.remove('hidden');
    });
  });
}
```

### Modify 13: Add order notes field
**Description:** Allow adding special instructions to order
```javascript
function addOrderNotesField() {
  const container = document.getElementById('order-notes');
  const textarea = document.createElement('textarea');
  textarea.id = 'order-notes-input';
  textarea.placeholder = 'Special instructions for your order...';
  textarea.maxLength = 500;
  const charCount = document.createElement('span');
  charCount.className = 'char-count';
  charCount.textContent = '0/500';
  textarea.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length}/500`;
    checkoutState.notes = textarea.value;
  });
  container.appendChild(textarea);
  container.appendChild(charCount);
}
```

### Modify 14: Add estimated delivery date
**Description:** Show delivery estimate based on shipping method
```javascript
function calculateDeliveryDate(shippingMethod) {
  const now = new Date();
  const estimates = {
    standard: 5,
    express: 2,
    overnight: 1
  };
  const days = estimates[shippingMethod] || 5;
  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + days);
  return deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}
```

### Modify 15: Add coupon code input
**Description:** Apply discount coupon at checkout
```javascript
function applyCoupon(code) {
  const validCoupons = { SAVE10: 0.1, SAVE20: 0.2, FREESHIP: { type: 'freeShipping' } };
  const coupon = validCoupons[code.toUpperCase()];
  if (!coupon) {
    showCouponError('Invalid coupon code');
    return;
  }
  checkoutState.coupon = coupon;
  if (typeof coupon === 'number') {
    checkoutState.discount = checkoutState.subtotal * coupon;
  }
  updateOrderTotal();
  showCouponSuccess(`Coupon ${code} applied!`);
}
```

### Modify 16: Add multi-address shipping
**Description:** Ship items to different addresses
```javascript
function addShippingAddress() {
  if (!checkoutState.shippingAddresses) {
    checkoutState.shippingAddresses = [];
  }
  checkoutState.shippingAddresses.push({ items: [], address: {} });
  renderAddressForm(checkoutState.shippingAddresses.length - 1);
}
```

### Modify 17: Add gift message option
**Description:** Add gift message to order
```javascript
function toggleGiftOption() {
  const giftFields = document.getElementById('gift-fields');
  giftFields.classList.toggle('hidden');
  if (!giftFields.classList.contains('hidden')) {
    checkoutState.gift = {
      message: '',
      wrap: false,
      receipt: false
    };
  }
}
```

### Modify 18: Add shipping cost calculation
**Description:** Calculate shipping based on weight and method
```javascript
function calculateShipping(cart, method) {
  const totalWeight = cart.reduce((sum, item) => sum + (item.weight || 0) * item.qty, 0);
  const rates = {
    standard: { base: 4.99, perLb: 0.5 },
    express: { base: 9.99, perLb: 1.0 },
    overnight: { base: 19.99, perLb: 2.0 }
  };
  const rate = rates[method] || rates.standard;
  return rate.base + (totalWeight * rate.perLb);
}
```

### Modify 19: Add tax calculation by location
**Description:** Calculate tax based on shipping state
```javascript
function calculateTax(subtotal, state) {
  const stateTaxRates = {
    CA: 0.0875, NY: 0.08875, TX: 0.0825,
    FL: 0.07, IL: 0.0875, PA: 0.06,
    default: 0.08
  };
  const rate = stateTaxRates[state] || stateTaxRates.default;
  return subtotal * rate;
}
```

### Modify 20: Add form auto-fill from saved profile
**Description:** Auto-fill shipping from user profile
```javascript
async function autoFillFromProfile() {
  try {
    const profile = await fetchUserProfile();
    if (profile.shipping) {
      Object.entries(profile.shipping).forEach(([field, value]) => {
        const input = document.getElementById(`shipping-${field}`);
        if (input) {
          input.value = value;
          checkoutState.shipping[field] = value;
        }
      });
    }
  } catch (err) {
    console.log('Could not load profile');
  }
}
```

### Modify 21: Add step transition animations
**Description:** Animate step content changes
```javascript
function animateStepTransition(fromStep, toStep) {
  const current = document.getElementById(`step-${fromStep}`);
  const next = document.getElementById(`step-${toStep}`);
  current.classList.add('slide-out-left');
  setTimeout(() => {
    current.classList.add('hidden');
    next.classList.remove('hidden');
    next.classList.add('slide-in-right');
  }, 300);
}
```

### Modify 22: Add checkout session timeout
**Description:** Warn user after 20 minutes of inactivity
```javascript
function setupSessionTimer() {
  let sessionTimer;
  const TIMEOUT_MS = 20 * 60 * 1000;
  const WARNING_MS = 5 * 60 * 1000;
  function resetTimer() {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(() => {
      showTimeoutWarning();
    }, TIMEOUT_MS - WARNING_MS);
  }
  ['click', 'keydown', 'scroll'].forEach(event => {
    document.addEventListener(event, resetTimer);
  });
  resetTimer();
}
```

### Modify 23: Add guest checkout option
**Description:** Allow checkout without account
```javascript
function setupGuestCheckout() {
  const guestBtn = document.getElementById('guest-checkout');
  const loginBtn = document.getElementById('login-checkout');
  guestBtn.addEventListener('click', () => {
    checkoutState.isGuest = true;
    renderStep(2);
  });
  loginBtn.addEventListener('click', () => {
    showLoginModal(() => {
      checkoutState.isGuest = false;
      autoFillFromProfile();
      renderStep(2);
    });
  });
}
```

### Modify 24: Add order notes character counter
**Description:** Show remaining characters for order notes
```javascript
function setupNotesCounter() {
  const textarea = document.getElementById('order-notes');
  const counter = document.getElementById('notes-counter');
  const maxLength = 500;
  textarea.addEventListener('input', () => {
    const remaining = maxLength - textarea.value.length;
    counter.textContent = `${remaining} characters remaining`;
    counter.style.color = remaining < 50 ? 'red' : '#666';
  });
}
```

### Modify 25: Add save progress indicator
**Description:** Show auto-save status
```javascript
function showSaveIndicator(status) {
  const indicator = document.getElementById('save-indicator');
  const messages = {
    saving: 'Saving...',
    saved: 'Saved ✓',
    error: 'Save failed ✗'
  };
  indicator.textContent = messages[status] || '';
  indicator.className = `save-${status}`;
  if (status === 'saved') {
    setTimeout(() => { indicator.textContent = ''; }, 3000);
  }
}
```

### Modify 26: Add form field character limits
**Description:** Enforce max length on form fields
```javascript
function setupCharacterLimits() {
  const limits = {
    'card-name': 50,
    'shipping-address': 100,
    'shipping-city': 50
  };
  Object.entries(limits).forEach(([fieldId, maxLen]) => {
    const input = document.getElementById(fieldId);
    input.addEventListener('input', () => {
      if (input.value.length > maxLen) {
        input.value = input.value.slice(0, maxLen);
      }
    });
  });
}
```

### Modify 27: Add card type detection
**Description:** Detect card type from number
```javascript
function detectCardType(cardNumber) {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6011/
  };
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber.replace(/\D/g, ''))) {
      return type;
    }
  }
  return 'unknown';
}
```

### Modify 28: Add address validation with API
**Description:** Validate address via external API
```javascript
async function validateAddressWithAPI(address) {
  try {
    const res = await fetch('https://api.address-validator.com/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(address)
    });
    const result = await res.json();
    if (!result.valid) {
      showAddressSuggestions(result.suggestions);
    }
    return result;
  } catch (err) {
    console.warn('Address validation unavailable, proceeding without');
    return { valid: true };
  }
}
```

### Modify 29: Add checkout analytics
**Description:** Track checkout funnel steps
```javascript
function trackCheckoutStep(step, data = {}) {
  const event = {
    type: 'checkout_step',
    step,
    timestamp: new Date().toISOString(),
    data
  };
  if (typeof gtag === 'function') {
    gtag('event', 'checkout_progress', {
      checkout_step: step,
      ...data
    });
  }
  const analytics = JSON.parse(localStorage.getItem('checkoutAnalytics') || '[]');
  analytics.push(event);
  localStorage.setItem('checkoutAnalytics', JSON.stringify(analytics));
}
```

### Modify 30: Add payment error recovery
**Description:** Handle payment failure with retry options
```javascript
function handlePaymentError(error) {
  const errorMessages = {
    card_declined: 'Your card was declined. Please try another payment method.',
    insufficient_funds: 'Insufficient funds. Please use a different card.',
    expired_card: 'Your card has expired. Please use a different card.',
    processing_error: 'An error occurred. Please try again.'
  };
  showErrorModal({
    title: 'Payment Failed',
    message: errorMessages[error.code] || 'An unexpected error occurred.',
    actions: [
      { text: 'Try Again', primary: true, onClick: () => retryPayment() },
      { text: 'Change Payment', onClick: () => goToStep(3) }
    ]
  });
}
```

### Modify 31: Add real-time shipping quotes
**Description:** Fetch shipping rates from carriers
```javascript
async function fetchShippingQuotes(cart, address) {
  try {
    const res = await fetch('/api/shipping-quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, destination: address })
    });
    const quotes = await res.json();
    const container = document.getElementById('shipping-options');
    container.innerHTML = '';
    quotes.forEach(quote => {
      const label = document.createElement('label');
      label.className = 'shipping-option';
      label.innerHTML = `
        <input type="radio" name="shipping" value="${quote.method}">
        <span>${quote.carrier} - ${quote.method}</span>
        <span>$${quote.rate.toFixed(2)}</span>
        <span>${quote.estimatedDays} business days</span>
      `;
      container.appendChild(label);
    });
  } catch (err) {
    showShippingFallback();
  }
}
```

### Modify 32: Add order summary accordion
**Description:** Expandable sections in order review
```javascript
function renderAccordionReview() {
  const sections = [
    { id: 'items', title: 'Items', content: renderItemsSummary },
    { id: 'shipping', title: 'Shipping Address', content: renderShippingSummary },
    { id: 'payment', title: 'Payment Method', content: renderPaymentSummary }
  ];
  sections.forEach(section => {
    const header = document.createElement('button');
    header.className = 'accordion-header';
    header.textContent = section.title;
    const content = document.createElement('div');
    content.className = 'accordion-content';
    header.addEventListener('click', () => content.classList.toggle('open'));
    document.getElementById('order-review').appendChild(header);
    document.getElementById('order-review').appendChild(content);
  });
}
```

### Modify 33: Add gift receipt option
**Description:** Option to hide prices on receipt
```javascript
function toggleGiftReceipt() {
  checkoutState.giftReceipt = !checkoutState.giftReceipt;
  const receiptPreview = document.getElementById('receipt-preview');
  if (checkoutState.giftReceipt) {
    receiptPreview.innerHTML = '<p>Items: Shirt, Pants</p><p>Gift Receipt</p>';
  } else {
    receiptPreview.innerHTML = '<p>Items: Shirt ($25), Pants ($40)</p>';
  }
}
```

### Modify 34: Add checkout FAQ accordion
**Description:** Show common checkout questions
```javascript
function renderCheckoutFAQ() {
  const faqs = [
    { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days.' },
    { q: 'What is your return policy?', a: 'Free returns within 30 days.' },
    { q: 'Is my payment secure?', a: 'Yes, we use 256-bit SSL encryption.' }
  ];
  const container = document.getElementById('checkout-faq');
  faqs.forEach(faq => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = faq.q;
    const answer = document.createElement('p');
    answer.textContent = faq.a;
    details.appendChild(summary);
    details.appendChild(answer);
    container.appendChild(details);
  });
}
```

### Modify 35: Add mobile-responsive step layout
**Description:** Adapt checkout layout for mobile
```javascript
function setupResponsiveCheckout() {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  function handleResize(e) {
    const stepContent = document.getElementById('step-content');
    const sidebar = document.getElementById('order-sidebar');
    if (e.matches) {
      stepContent.style.width = '100%';
      sidebar.style.display = 'none';
    } else {
      stepContent.style.width = '60%';
      sidebar.style.display = 'block';
    }
  }
  mediaQuery.addEventListener('change', handleResize);
  handleResize(mediaQuery);
}
```

### Modify 36: Add saved payment methods
**Description:** Show saved cards for returning users
```javascript
async function loadSavedPaymentMethods() {
  try {
    const methods = await fetch('/api/payment-methods');
    const container = document.getElementById('saved-payments');
    methods.forEach(method => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="saved-payment" value="${method.id}">
        <span>${method.type} ending in ${method.lastFour}</span>
        <span>Expires ${method.expMonth}/${method.expYear}</span>
      `;
      label.addEventListener('click', () => fillSavedPayment(method));
      container.appendChild(label);
    });
  } catch (err) {
    showNewCardForm();
  }
}
```

### Modify 37: Add checkout keyboard shortcuts
**Description:** Navigate checkout with keyboard
```javascript
function setupCheckoutShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const activeBtn = document.querySelector('.btn-primary:not(:disabled)');
      if (activeBtn) activeBtn.click();
    }
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal:not(.hidden)');
      if (modal) modal.classList.add('hidden');
    }
    if (e.altKey && e.key === 'b') {
      goToPreviousStep();
    }
    if (e.altKey && e.key === 'n') {
      goToNextStep();
    }
  });
}
```

### Modify 38: Add order confirmation email preview
**Description:** Show what confirmation email will look like
```javascript
function renderEmailPreview() {
  const preview = document.getElementById('email-preview');
  const state = checkoutState;
  preview.innerHTML = `
    <div class="email-template">
      <h2>Order Confirmation</h2>
      <p>Hi ${state.shipping.firstName},</p>
      <p>Your order has been confirmed!</p>
      <div class="order-details">
        ${state.cart.map(item => `
          <div>${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</div>
        `).join('')}
      </div>
      <p><strong>Total: $${calculateTotal()}</strong></p>
      <p>Shipping to: ${state.shipping.address}</p>
    </div>
  `;
}
```

### Modify 39: Add checkout data export
**Description:** Download checkout data as JSON
```javascript
function exportCheckoutData() {
  const data = {
    state: checkoutState,
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `checkout-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
```

### Modify 40: Add checkout undo/redo
**Description:** Undo/redo changes in checkout forms
```javascript
function createCheckoutHistory() {
  const history = [JSON.stringify(checkoutState)];
  let historyIndex = 0;
  function saveState() {
    history.splice(historyIndex + 1);
    history.push(JSON.stringify(checkoutState));
    historyIndex = history.length - 1;
  }
  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      checkoutState = JSON.parse(history[historyIndex]);
      renderStep(checkoutState.currentStep);
    }
  }
  function redo() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      checkoutState = JSON.parse(history[historyIndex]);
      renderStep(checkoutState.currentStep);
    }
  }
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
    if (e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); }
  });
  return { saveState, undo, redo };
}
```

### Modify 41: Add stock availability check during checkout
**Description:** Verify stock before completing order
```javascript
async function verifyStock() {
  const unavailable = [];
  for (const item of checkoutState.cart) {
    try {
      const stock = await fetchStock(item.id);
      if (stock < item.qty) {
        unavailable.push({ ...item, availableStock: stock });
      }
    } catch (err) {
      console.warn(`Could not verify stock for ${item.id}`);
    }
  }
  if (unavailable.length > 0) {
    showStockIssues(unavailable);
    return false;
  }
  return true;
}
```

### Modify 42: Add checkout form password strength
**Description:** Show password strength for account creation
```javascript
function setupPasswordStrength() {
  const passwordInput = document.getElementById('password');
  const strengthBar = document.getElementById('password-strength');
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[a-z]/.test(val) && /[A-Z]/.test(val)) strength++;
    if (/\d/.test(val)) strength++;
    if (/[^a-zA-Z0-9]/.test(val)) strength++;
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['red', 'orange', 'yellow', 'green'];
    strengthBar.style.width = `${(strength / 4) * 100}%`;
    strengthBar.style.backgroundColor = colors[strength] || 'red';
    strengthBar.textContent = labels[strength] || '';
  });
}
```

### Modify 43: Add checkout accessibility improvements
**Description:** Add ARIA labels and roles to checkout
```javascript
function setupAccessibility() {
  document.querySelectorAll('.step').forEach((step, i) => {
    step.setAttribute('role', 'tab');
    step.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    step.setAttribute('tabindex', '0');
  });
  document.querySelectorAll('.form-field').forEach(field => {
    field.setAttribute('aria-required', field.required ? 'true' : 'false');
    field.setAttribute('aria-invalid', 'false');
  });
  document.getElementById('step-content').setAttribute('role', 'tabpanel');
  document.getElementById('step-content').setAttribute('aria-live', 'polite');
}
```

### Modify 44: Add checkout confirmation number animation
**Description:** Animate order confirmation number
```javascript
function animateConfirmationNumber(orderNumber) {
  const container = document.getElementById('confirmation-number');
  const digits = orderNumber.toString().split('');
  container.innerHTML = '';
  digits.forEach((digit, i) => {
    const span = document.createElement('span');
    span.className = 'confirmation-digit';
    span.textContent = digit;
    span.style.animationDelay = `${i * 0.1}s`;
    span.classList.add('pop-in');
    container.appendChild(span);
  });
}
```

### Modify 45: Add checkout social proof
**Description:** Show recent purchases notification
```javascript
function setupSocialProof() {
  const messages = [
    'Someone in Portland just bought a Shirt',
    '5 people are viewing this item',
    'Only 3 left in stock - size Medium'
  ];
  let messageIndex = 0;
  const container = document.getElementById('social-proof');
  setInterval(() => {
    container.textContent = messages[messageIndex % messages.length];
    container.classList.add('fade-in');
    setTimeout(() => container.classList.remove('fade-in'), 4000);
    messageIndex++;
  }, 5000);
}
```

### Modify 46: Add checkout referral code
**Description:** Apply referral discount at checkout
```javascript
function applyReferralCode(code) {
  if (!code) return;
  const cleanCode = code.trim().toUpperCase();
  if (validReferralCodes.includes(cleanCode)) {
    checkoutState.referralDiscount = 0.1;
    checkoutState.referralCode = cleanCode;
    updateOrderTotal();
    showReferralSuccess('10% referral discount applied!');
  } else {
    showReferralError('Invalid referral code');
  }
}
```

### Modify 47: Add checkout product upsells
**Description:** Show related products during checkout
```javascript
async function showCheckoutUpsells(cart) {
  const categories = cart.map(item => item.category);
  try {
    const upsells = await fetchUpsellProducts(categories);
    const container = document.getElementById('checkout-upsells');
    upsells.slice(0, 3).forEach(product => {
      const card = document.createElement('div');
      card.className = 'upsell-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    // Silently fail if upsells unavailable
  }
}
```

### Modify 48: Add checkout fraud detection
**Description:** Basic fraud checks before processing
```javascript
function performFraudCheck(order) {
  const flags = [];
  const shippingCost = order.shippingCost || 0;
  const totalValue = order.cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (shippingCost > totalValue * 0.5 && totalValue > 500) {
    flags.push('High-value order with high shipping ratio');
  }
  if (order.shipping.address !== order.billing.address && totalValue > 1000) {
    flags.push('Shipping and billing addresses differ on high-value order');
  }
  const emailDomain = order.email.split('@')[1];
  if (emailDomain && emailDomain.match(/tempmail|throwaway|disposable/i)) {
    flags.push('Disposable email domain detected');
  }
  return { passed: flags.length === 0, flags };
}
```

### Modify 49: Add checkout order timing
**Description:** Track time spent on each step
```javascript
const stepTiming = {};
function startStepTimer(step) {
  stepTiming[step] = { start: Date.now() };
}
function endStepTimer(step) {
  if (stepTiming[step]) {
    stepTiming[step].end = Date.now();
    stepTiming[step].duration = stepTiming[step].end - stepTiming[step].start;
    trackAnalytics('step_time', { step, durationMs: stepTiming[step].duration });
  }
}
```

### Modify 50: Add checkout order tagging
**Description:** Tag orders for organizational purposes
```javascript
function addOrderTag(tag) {
  if (!checkoutState.tags) checkoutState.tags = [];
  if (!checkoutState.tags.includes(tag)) {
    checkoutState.tags.push(tag);
    updateTagsDisplay();
  }
}
function removeOrderTag(tag) {
  if (checkoutState.tags) {
    checkoutState.tags = checkoutState.tags.filter(t => t !== tag);
    updateTagsDisplay();
  }
}
function updateTagsDisplay() {
  const container = document.getElementById('order-tags');
  container.innerHTML = '';
  (checkoutState.tags || []).forEach(tag => {
    const span = document.createElement('span');
    span.className = 'order-tag';
    span.textContent = tag;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => removeOrderTag(tag));
    span.appendChild(removeBtn);
    container.appendChild(span);
  });
}
```
