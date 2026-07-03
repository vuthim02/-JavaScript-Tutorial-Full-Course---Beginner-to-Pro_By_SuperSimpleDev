let savedAddresses = [];

function loadSavedAddresses() {
  try { savedAddresses = JSON.parse(localStorage.getItem('addresses')) || []; }
  catch { savedAddresses = []; }
}

function saveAddresses() {
  localStorage.setItem('addresses', JSON.stringify(savedAddresses));
}

function renderProfile() {
  loadSavedAddresses();

  mainEl.innerHTML = `
    <div class="profile-page">
      <div class="profile-header">
        <div class="profile-avatar">
          <i class="fas fa-user-circle"></i>
        </div>
        <div>
          <h2>${esc(currentUser?.displayName || 'User')}</h2>
          <p>${esc(currentUser?.email || '')}</p>
        </div>
      </div>

      <div class="profile-tabs">
        <button class="profile-tab active" data-tab="addresses"><i class="fas fa-map-marker-alt"></i> Addresses</button>
        <button class="profile-tab" data-tab="payment"><i class="fas fa-credit-card"></i> Payment Methods</button>
        <button class="profile-tab" data-tab="settings"><i class="fas fa-cog"></i> Settings</button>
      </div>

      <div id="profile-content">
        ${renderAddressesTab()}
      </div>
    </div>`;

  document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById('profile-content');
      const t = tab.dataset.tab;
      if (t === 'addresses') content.innerHTML = renderAddressesTab();
      else if (t === 'payment') content.innerHTML = renderPaymentTab();
      else if (t === 'settings') content.innerHTML = renderSettingsTab();
      attachProfileEvents();
    });
  });

  attachProfileEvents();
}

function renderAddressesTab() {
  return `
    <div class="profile-section">
      <div class="profile-section-header">
        <h3><i class="fas fa-map-marker-alt"></i> Saved Addresses</h3>
        <button class="btn-add-address" id="add-address-btn"><i class="fas fa-plus"></i> Add Address</button>
      </div>
      <div class="address-grid">
        ${savedAddresses.length === 0
          ? '<p class="empty-state"><i class="fas fa-map-marker-alt"></i> No saved addresses yet</p>'
          : savedAddresses.map((addr, i) => `
            <div class="address-card">
              <div class="addr-header">
                <span class="addr-label">${esc(addr.label || 'Address ' + (i+1))}</span>
                ${addr.default ? '<span class="addr-default">Default</span>' : ''}
              </div>
              <p class="addr-name">${esc(addr.firstName)} ${esc(addr.lastName)}</p>
              <p class="addr-detail">${esc(addr.line1)}${addr.line2 ? ', ' + esc(addr.line2) : ''}</p>
              <p class="addr-detail">${esc(addr.city)}${addr.state ? ', ' + esc(addr.state) : ''} ${esc(addr.zip)}</p>
              <p class="addr-detail">${esc(addr.country)}</p>
              <p class="addr-phone">${esc(addr.phone)}</p>
              <div class="addr-actions">
                <button class="addr-edit" data-index="${i}"><i class="fas fa-edit"></i></button>
                <button class="addr-del" data-index="${i}"><i class="fas fa-trash"></i></button>
                ${!addr.default ? `<button class="addr-set-default" data-index="${i}">Set Default</button>` : ''}
              </div>
            </div>`).join('')}
      </div>
    </div>`;
}

function renderPaymentTab() {
  return `
    <div class="profile-section">
      <div class="profile-section-header">
        <h3><i class="fas fa-credit-card"></i> Payment Methods</h3>
      </div>
      <div class="payment-card-list">
        <div class="payment-card-item">
          <i class="fab fa-cc-visa pay-card-icon"></i>
          <div>
            <p class="pay-card-name">Visa ending in 4242</p>
            <p class="pay-card-exp">Expires 12/28</p>
          </div>
          <span class="pay-card-default">Default</span>
        </div>
        <p class="empty-state" style="margin-top:12px;"><i class="fas fa-lock"></i> Your payment info is securely handled by Stripe</p>
      </div>
    </div>`;
}

function renderSettingsTab() {
  return `
    <div class="profile-section">
      <div class="profile-section-header">
        <h3><i class="fas fa-cog"></i> Account Settings</h3>
      </div>
      <div class="settings-list">
        <div class="setting-item">
          <div>
            <strong>Email Notifications</strong>
            <p>Receive order updates and promotions</p>
          </div>
          <label class="toggle">
            <input type="checkbox" checked />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <div>
            <strong>SMS Notifications</strong>
            <p>Get shipping updates via text</p>
          </div>
          <label class="toggle">
            <input type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <div>
            <strong>Two-Factor Auth</strong>
            <p>Add extra security to your account</p>
          </div>
          <button class="btn-outline">Enable 2FA</button>
        </div>
      </div>
      <hr style="margin:20px 0;border:none;border-top:1px solid var(--border-light);" />
      <button class="btn-danger" id="delete-account-btn"><i class="fas fa-exclamation-triangle"></i> Delete Account</button>
    </div>`;
}

function attachProfileEvents() {
  const addBtn = document.getElementById('add-address-btn');
  if (addBtn) addBtn.addEventListener('click', showAddressModal);

  document.querySelectorAll('.addr-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      showAddressModal(savedAddresses[i], i);
    });
  });

  document.querySelectorAll('.addr-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      if (confirm('Delete this address?')) {
        savedAddresses.splice(i, 1);
        saveAddresses();
        renderProfile();
      }
    });
  });

  document.querySelectorAll('.addr-set-default').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      savedAddresses.forEach((a, idx) => a.default = idx === i);
      saveAddresses();
      renderProfile();
    });
  });
}

function showAddressModal(editAddr = null, editIndex = null) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width:500px;">
      <button class="modal-close"><i class="fas fa-times"></i></button>
      <h2 style="margin-bottom:16px;">${editAddr ? 'Edit Address' : 'Add Address'}</h2>
      <div class="checkout-form">
        <div class="form-group">
          <label>Label (e.g. Home, Office)</label>
          <input type="text" id="modal-addr-label" placeholder="Home" value="${esc(editAddr?.label || '')}" />
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>First Name</label>
            <input type="text" id="modal-addr-first" value="${esc(editAddr?.firstName || '')}" />
          </div>
          <div class="form-group half">
            <label>Last Name</label>
            <input type="text" id="modal-addr-last" value="${esc(editAddr?.lastName || '')}" />
          </div>
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" id="modal-addr-phone" value="${esc(editAddr?.phone || '')}" />
        </div>
        <div class="form-group">
          <label>Address Line 1</label>
          <input type="text" id="modal-addr-line1" value="${esc(editAddr?.line1 || '')}" />
        </div>
        <div class="form-group">
          <label>Address Line 2 (Optional)</label>
          <input type="text" id="modal-addr-line2" value="${esc(editAddr?.line2 || '')}" />
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>City</label>
            <input type="text" id="modal-addr-city" value="${esc(editAddr?.city || '')}" />
          </div>
          <div class="form-group half">
            <label>State/Province</label>
            <input type="text" id="modal-addr-state" value="${esc(editAddr?.state || '')}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>ZIP Code</label>
            <input type="text" id="modal-addr-zip" value="${esc(editAddr?.zip || '')}" />
          </div>
          <div class="form-group half">
            <label>Country</label>
            <select id="modal-addr-country">
              ${['US', 'CA', 'KH', 'GB', 'DE', 'AU', 'JP'].map(c =>
                `<option value="${c}" ${editAddr?.country === c ? 'selected' : ''}>${c === 'KH' ? 'Cambodia' : c}</option>`
              ).join('')}
            </select>
          </div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;">
          <button class="btn-ghost" id="modal-addr-cancel">Cancel</button>
          <button class="btn-primary" id="modal-addr-save" style="width:auto;padding:10px 24px;">Save Address</button>
        </div>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#modal-addr-cancel').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelector('#modal-addr-save').addEventListener('click', () => {
    const addr = {
      label: document.getElementById('modal-addr-label').value || 'Address',
      firstName: document.getElementById('modal-addr-first').value,
      lastName: document.getElementById('modal-addr-last').value,
      phone: document.getElementById('modal-addr-phone').value,
      line1: document.getElementById('modal-addr-line1').value,
      line2: document.getElementById('modal-addr-line2').value,
      city: document.getElementById('modal-addr-city').value,
      state: document.getElementById('modal-addr-state').value,
      zip: document.getElementById('modal-addr-zip').value,
      country: document.getElementById('modal-addr-country').value,
      default: false,
    };
    if (!addr.firstName || !addr.line1 || !addr.city) { alert('Fill required fields.'); return; }
    if (editIndex !== null) {
      savedAddresses[editIndex] = addr;
    } else {
      if (savedAddresses.length === 0) addr.default = true;
      savedAddresses.push(addr);
    }
    saveAddresses();
    overlay.remove();
    renderProfile();
  });
}
