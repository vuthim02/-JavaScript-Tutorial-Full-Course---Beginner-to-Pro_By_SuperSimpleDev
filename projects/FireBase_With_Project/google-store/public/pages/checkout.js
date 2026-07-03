let checkoutStep = 1;
let checkoutData = {
  shippingAddress: null,
  shippingMethod: 'standard',
  paymentMethod: 'card',
  khmerPaymentMethod: 'aba',
};

function renderCheckout() {
  const items = getCartItems();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = checkoutData.shippingMethod === 'express' ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  mainEl.innerHTML = `
    <div class="checkout-page">
      <div class="checkout-container">
        <div class="checkout-main">
          <div class="checkout-steps">
            <div class="step-indicators">
              <span class="step-dot ${checkoutStep >= 1 ? 'active' : ''} ${checkoutStep > 1 ? 'done' : ''}">
                ${checkoutStep > 1 ? '<i class="fas fa-check"></i>' : '1'}
              </span>
              <span class="step-line ${checkoutStep > 1 ? 'active' : ''}"></span>
              <span class="step-dot ${checkoutStep >= 2 ? 'active' : ''} ${checkoutStep > 2 ? 'done' : ''}">
                ${checkoutStep > 2 ? '<i class="fas fa-check"></i>' : '2'}
              </span>
              <span class="step-line ${checkoutStep > 2 ? 'active' : ''}"></span>
              <span class="step-dot ${checkoutStep >= 3 ? 'active' : ''} ${checkoutStep > 3 ? 'done' : ''}">
                ${checkoutStep > 3 ? '<i class="fas fa-check"></i>' : '3'}
              </span>
            </div>
            <div class="step-labels">
              <span>Shipping</span>
              <span>Payment</span>
              <span>Review</span>
            </div>
          </div>
          <div id="checkout-content">
            ${checkoutStep === 1 ? renderCheckoutAddress() : ''}
            ${checkoutStep === 2 ? renderCheckoutPayment() : ''}
            ${checkoutStep === 3 ? renderCheckoutReview(items, subtotal, shipping, tax, total) : ''}
          </div>
        </div>
        <div class="checkout-sidebar">
          <div class="checkout-summary-card">
            <h3>Order Summary</h3>
            ${items.map(item => `
              <div class="cos-item">
                <img src="${escUrl(item.image)}" alt="${esc(item.name)}" />
                <div>
                  <p class="cos-name">${esc(item.name)}</p>
                  <p class="cos-qty">Qty: ${item.qty}</p>
                </div>
                <span class="cos-price">$${(item.price * item.qty).toFixed(2)}</span>
              </div>
            `).join('')}
            <div class="cos-divider"></div>
            <div class="cos-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="cos-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
            <div class="cos-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
            <div class="cos-divider"></div>
            <div class="cos-row cos-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>`;

  attachCheckoutEvents();
}

function renderCheckoutAddress() {
  return `
    <div class="checkout-section">
      <h2><i class="fas fa-map-marker-alt"></i> Shipping Address</h2>
      <div class="checkout-form">
        <div class="form-row">
          <div class="form-group half">
            <label>First Name</label>
            <input type="text" id="addr-first" placeholder="John" value="${esc(checkoutData.shippingAddress?.firstName || '')}" />
          </div>
          <div class="form-group half">
            <label>Last Name</label>
            <input type="text" id="addr-last" placeholder="Doe" value="${esc(checkoutData.shippingAddress?.lastName || '')}" />
          </div>
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" id="addr-phone" placeholder="+1 555-000-0000" value="${esc(checkoutData.shippingAddress?.phone || '')}" />
        </div>
        <div class="form-group">
          <label>Address Line 1</label>
          <input type="text" id="addr-line1" placeholder="123 Main Street" value="${esc(checkoutData.shippingAddress?.line1 || '')}" />
        </div>
        <div class="form-group">
          <label>Address Line 2 (Optional)</label>
          <input type="text" id="addr-line2" placeholder="Apt, Suite, Building" value="${esc(checkoutData.shippingAddress?.line2 || '')}" />
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>City</label>
            <input type="text" id="addr-city" placeholder="Phnom Penh" value="${esc(checkoutData.shippingAddress?.city || '')}" />
          </div>
          <div class="form-group half">
            <label>State / Province</label>
            <input type="text" id="addr-state" placeholder="" value="${esc(checkoutData.shippingAddress?.state || '')}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>ZIP / Postal Code</label>
            <input type="text" id="addr-zip" placeholder="12000" value="${esc(checkoutData.shippingAddress?.zip || '')}" />
          </div>
          <div class="form-group half">
            <label>Country</label>
            <select id="addr-country">
              ${['US', 'CA', 'KH', 'GB', 'DE', 'AU', 'JP', 'SG', 'TH', 'VN'].map(c =>
                `<option value="${c}" ${checkoutData.shippingAddress?.country === c ? 'selected' : ''}>${c === 'KH' ? 'Cambodia' : c === 'US' ? 'United States' : c}</option>`
              ).join('')}
            </select>
          </div>
        </div>

        <h3 style="margin-top:24px;margin-bottom:12px;"><i class="fas fa-truck"></i> Shipping Method</h3>
        <div class="shipping-options">
          <label class="ship-option ${checkoutData.shippingMethod === 'standard' ? 'selected' : ''}">
            <input type="radio" name="shipping" value="standard" ${checkoutData.shippingMethod === 'standard' ? 'checked' : ''} />
            <div class="ship-option-content">
              <strong>Standard Shipping</strong>
              <span class="ship-desc">5-8 business days</span>
            </div>
            <span class="ship-price">FREE</span>
          </label>
          <label class="ship-option ${checkoutData.shippingMethod === 'express' ? 'selected' : ''}">
            <input type="radio" name="shipping" value="express" ${checkoutData.shippingMethod === 'express' ? 'checked' : ''} />
            <div class="ship-option-content">
              <strong>Express Shipping</strong>
              <span class="ship-desc">2-3 business days</span>
            </div>
            <span class="ship-price">$9.99</span>
          </label>
        </div>
      </div>
      <div class="checkout-actions">
        <button class="btn-back" id="checkout-back"><i class="fas fa-arrow-left"></i> Back to Cart</button>
        <button class="btn-next" id="checkout-next">Continue to Payment <i class="fas fa-arrow-right"></i></button>
      </div>
    </div>`;
}

function renderCheckoutPayment() {
  const khmerMethods = [
    { id: 'aba', name: 'ABA Bank', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/ABA_Bank_Logo.svg/120px-ABA_Bank_Logo.svg.png' },
    { id: 'wing', name: 'Wing Bank', icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Wing_Bank_logo.svg/120px-Wing_Bank_logo.svg.png' },
    { id: 'acleda', name: 'ACLEDA Bank', icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/ACLEDA_Bank_logo.svg/120px-ACLEDA_Bank_logo.svg.png' },
  ];

  return `
    <div class="checkout-section">
      <h2><i class="fas fa-credit-card"></i> Payment Method</h2>
      <div class="payment-methods">
        <label class="payment-option ${checkoutData.paymentMethod === 'card' ? 'selected' : ''}">
          <input type="radio" name="payment" value="card" ${checkoutData.paymentMethod === 'card' ? 'checked' : ''} />
          <i class="fas fa-credit-card"></i>
          <div>
            <strong>Credit / Debit Card</strong>
            <span class="pay-desc">Visa, Mastercard, Amex</span>
          </div>
          <div class="pay-icons">
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-amex"></i>
          </div>
        </label>

        <label class="payment-option ${checkoutData.paymentMethod === 'khmer' ? 'selected' : ''}">
          <input type="radio" name="payment" value="khmer" ${checkoutData.paymentMethod === 'khmer' ? 'checked' : ''} />
          <i class="fas fa-qrcode"></i>
          <div>
            <strong>QR Code Payment</strong>
            <span class="pay-desc">ABA / Wing / ACLEDA (Cambodia)</span>
          </div>
        </label>
      </div>

      <div id="card-payment-section" class="${checkoutData.paymentMethod === 'card' ? '' : 'hidden'}">
        <div class="form-group">
          <label>Card Number</label>
          <div id="card-element" class="stripe-input">
            <div class="card-placeholder">
              <i class="far fa-credit-card"></i>
              <span>Enter card details</span>
            </div>
          </div>
          <div id="card-errors" class="error-msg" style="text-align:left;margin-top:8px;"></div>
        </div>
        <p class="pay-secure"><i class="fas fa-lock"></i> Your payment info is securely processed by Stripe</p>
      </div>

      <div id="khmer-payment-section" class="${checkoutData.paymentMethod === 'khmer' ? '' : 'hidden'}">
        <p class="pay-secure" style="margin-bottom:12px;"><i class="fas fa-mobile-alt"></i> Scan with your banking app</p>
        <div class="khmer-methods">
          ${khmerMethods.map(m => `
            <button class="khmer-btn ${checkoutData.khmerPaymentMethod === m.id ? 'active' : ''}" data-method="${m.id}">
              <span>${m.name}</span>
              <i class="fas fa-check-circle"></i>
            </button>
          `).join('')}
        </div>
        <div id="qr-preview" class="qr-preview">
          <div class="qr-placeholder">
            <i class="fas fa-qrcode" style="font-size:64px;color:var(--border);"></i>
            <p>Select a method and continue to generate QR</p>
          </div>
        </div>
      </div>

      <div class="checkout-actions">
        <button class="btn-back" id="checkout-back"><i class="fas fa-arrow-left"></i> Back to Shipping</button>
        <button class="btn-next" id="checkout-next">Continue to Review <i class="fas fa-arrow-right"></i></button>
      </div>
    </div>`;
}

function renderCheckoutReview(items, subtotal, shipping, tax, total) {
  const addr = checkoutData.shippingAddress || {};
  const payMethod = checkoutData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'QR Code (' + checkoutData.khmerPaymentMethod.toUpperCase() + ')';

  return `
    <div class="checkout-section">
      <h2><i class="fas fa-check-circle"></i> Review Your Order</h2>

      <div class="review-card">
        <h3><i class="fas fa-map-marker-alt"></i> Shipping To</h3>
        <p>${esc(addr.firstName)} ${esc(addr.lastName)}</p>
        <p>${esc(addr.line1)}${addr.line2 ? ', ' + esc(addr.line2) : ''}</p>
        <p>${esc(addr.city)}${addr.state ? ', ' + esc(addr.state) : ''} ${esc(addr.zip)}</p>
        <p>${addr.country === 'KH' ? 'Cambodia' : addr.country} &middot; ${esc(addr.phone)}</p>
      </div>

      <div class="review-card">
        <h3><i class="fas fa-truck"></i> Shipping Method</h3>
        <p>${checkoutData.shippingMethod === 'express' ? 'Express Shipping (2-3 days)' : 'Standard Shipping (5-8 days)'} — ${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</p>
      </div>

      <div class="review-card">
        <h3><i class="fas fa-credit-card"></i> Payment Method</h3>
        <p>${payMethod}</p>
      </div>

      <div class="review-card">
        <h3><i class="fas fa-box"></i> Items (${items.length})</h3>
        ${items.map(item => `
          <div class="review-item">
            <img src="${escUrl(item.image)}" alt="${esc(item.name)}" />
            <div>
              <p class="ri-name">${esc(item.name)} <span class="ri-qty">x${item.qty}</span></p>
              <p class="ri-price">$${(item.price * item.qty).toFixed(2)}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="checkout-actions">
        <button class="btn-back" id="checkout-back"><i class="fas fa-arrow-left"></i> Back to Payment</button>
        <button class="btn-next btn-place-order" id="place-order">
          <i class="fas fa-lock"></i> Place Order — $${total.toFixed(2)}
        </button>
      </div>
    </div>`;
}

function attachCheckoutEvents() {
  const backBtn = document.getElementById('checkout-back');
  const nextBtn = document.getElementById('checkout-next');

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (checkoutStep === 1) navigate('cart');
      else { if (checkoutStep === 2) saveAddressData(); checkoutStep--; renderCheckout(); }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (checkoutStep === 1) {
        saveAddressData();
        if (!validateAddress()) return;
        checkoutStep = 2;
        renderCheckout();
      } else if (checkoutStep === 2) {
        checkoutStep = 3;
        renderCheckout();
      }
    });
  }

  document.querySelectorAll('.ship-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.ship-option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      el.querySelector('input').checked = true;
      checkoutData.shippingMethod = el.querySelector('input').value;
    });
  });

  document.querySelectorAll('.payment-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      el.querySelector('input').checked = true;
      checkoutData.paymentMethod = el.querySelector('input').value;
      document.getElementById('card-payment-section').classList.toggle('hidden', checkoutData.paymentMethod !== 'card');
      document.getElementById('khmer-payment-section').classList.toggle('hidden', checkoutData.paymentMethod !== 'khmer');
    });
  });

  document.querySelectorAll('.khmer-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.khmer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      checkoutData.khmerPaymentMethod = btn.dataset.method;
      const items = getCartItems();
      const total = items.reduce((s, i) => s + i.price * i.qty, 0);
      try {
        const result = await api.generateQR(checkoutData.khmerPaymentMethod, total, 'preview');
        const preview = document.getElementById('qr-preview');
        if (preview) {
          preview.innerHTML = `<img src="${result.qrImage}" alt="QR Code" class="qr-code-img" />
            <p class="qr-amount">Amount: $${total.toFixed(2)}</p>
            <p class="qr-instruct">Scan with ${btn.dataset.method.toUpperCase()} app to pay</p>`;
        }
      } catch (err) {
        console.error('QR gen error:', err);
      }
    });
  });

  const placeBtn = document.getElementById('place-order');
  if (placeBtn) {
    placeBtn.addEventListener('click', placeOrder);
  }
}

function saveAddressData() {
  checkoutData.shippingAddress = {
    firstName: document.getElementById('addr-first')?.value || '',
    lastName: document.getElementById('addr-last')?.value || '',
    phone: document.getElementById('addr-phone')?.value || '',
    line1: document.getElementById('addr-line1')?.value || '',
    line2: document.getElementById('addr-line2')?.value || '',
    city: document.getElementById('addr-city')?.value || '',
    state: document.getElementById('addr-state')?.value || '',
    zip: document.getElementById('addr-zip')?.value || '',
    country: document.getElementById('addr-country')?.value || 'US',
  };
}

function validateAddress() {
  const a = checkoutData.shippingAddress;
  if (!a.firstName || !a.lastName) { alert('Please enter your name.'); return false; }
  if (!a.phone) { alert('Please enter a phone number.'); return false; }
  if (!a.line1) { alert('Please enter your address.'); return false; }
  if (!a.city) { alert('Please enter your city.'); return false; }
  return true;
}

async function placeOrder() {
  const items = getCartItems();
  if (items.length === 0) return;
  const placeBtn = document.getElementById('place-order');
  placeBtn.disabled = true;
  placeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  try {
    if (checkoutData.paymentMethod === 'card') {
      const total = items.reduce((s, i) => s + i.price * i.qty, 0);
      const shipping = checkoutData.shippingMethod === 'express' ? 9.99 : 0;
      const tax = total * 0.08;
      const grandTotal = total + shipping + tax;

      const session = await api.createCheckoutSession(items, {
        successUrl: window.location.origin + '/?order=success&session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: window.location.origin + '/?order=cancel',
        customerEmail: currentUser?.email,
      });

      window.location.href = session.url;
    } else {
      await placeKhmerOrder(items);
    }
  } catch (err) {
    alert('Checkout failed: ' + err.message);
    placeBtn.disabled = false;
    placeBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
  }
}

async function placeKhmerOrder(items) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = checkoutData.shippingMethod === 'express' ? 9.99 : 0;
  const tax = total * 0.08;

  const orderRef = await db.collection('orders').add({
    userId: currentUser.uid,
    items,
    shippingAddress: checkoutData.shippingAddress,
    shippingMethod: checkoutData.shippingMethod,
    paymentMethod: 'khmer_' + checkoutData.khmerPaymentMethod,
    subtotal: total,
    shipping,
    tax,
    total: total + shipping + tax,
    status: 'pending_payment',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  const qrResult = await api.generateQR(checkoutData.khmerPaymentMethod, total + shipping + tax, orderRef.id);

  saveCart([]);
  localStorage.setItem('lastOrder', JSON.stringify({
    id: orderRef.id,
    total: total + shipping + tax,
    qrImage: qrResult.qrImage,
  }));

  navigate('orders');
  alert('Order created! Complete payment by scanning the QR code within 24 hours.');
}
