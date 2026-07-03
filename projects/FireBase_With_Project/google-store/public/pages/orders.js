let unsubOrders = null;

const ORDER_STATUSES = {
  pending_payment: { label: 'Pending Payment', icon: 'far fa-clock', color: '#9c7c0e' },
  pending: { label: 'Pending', icon: 'far fa-clock', color: '#f9ab00' },
  processing: { label: 'Processing', icon: 'fas fa-spinner', color: '#1a73e8' },
  shipped: { label: 'Shipped', icon: 'fas fa-shipping-fast', color: '#067d62' },
  delivered: { label: 'Delivered', icon: 'fas fa-check-circle', color: '#067d62' },
  cancelled: { label: 'Cancelled', icon: 'fas fa-times-circle', color: '#b12704' },
};

function statusBadgeHTML(status) {
  const s = ORDER_STATUSES[status] || ORDER_STATUSES.pending;
  return `<span class="order-status ${status}"><i class="${s.icon}"></i> ${s.label}</span>`;
}

function renderOrders() {
  if (!currentUser) return;

  mainEl.innerHTML = `
    <div class="orders-page">
      <div class="section-header">
        <h2 class="section-title"><i class="fas fa-clipboard-list"></i> Your Orders</h2>
      </div>
      <div class="orders-tabs">
        <button class="order-tab active" data-filter="all">All Orders</button>
        <button class="order-tab" data-filter="processing">Processing</button>
        <button class="order-tab" data-filter="shipped">Shipped</button>
        <button class="order-tab" data-filter="delivered">Delivered</button>
        <button class="order-tab" data-filter="cancelled">Cancelled</button>
      </div>
      <div id="orders-list">
        <p style="text-align:center;padding:60px 20px;color:var(--text-mid);">
          <i class="fas fa-spinner fa-spin" style="font-size:24px;display:block;margin-bottom:12px;"></i>
          Loading your orders...
        </p>
      </div>
    </div>`;

  if (unsubOrders) unsubOrders();

  let currentFilter = 'all';

  document.querySelectorAll('.order-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      applyOrderFilter();
    });
  });

  unsubOrders = db.collection('orders')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      window._allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      applyOrderFilter();
    }, err => {
      console.error('Orders listener error:', err);
      const listEl = document.getElementById('orders-list');
      if (listEl) listEl.innerHTML = '<div class="cart-empty"><i class="fas fa-exclamation-triangle" style="color:var(--danger);"></i><p>Failed to load orders. Check Firestore indexes.</p></div>';
    });
}

function applyOrderFilter() {
  const listEl = document.getElementById('orders-list');
  if (!listEl || !window._allOrders) return;

  let orders = window._allOrders;
  const filter = document.querySelector('.order-tab.active')?.dataset.filter || 'all';
  if (filter !== 'all') orders = orders.filter(o => o.status === filter);

  if (orders.length === 0) {
    listEl.innerHTML = '<div class="cart-empty"><i class="fas fa-clipboard-list"></i><p>No orders found.</p></div>';
    return;
  }

  listEl.innerHTML = orders.map(o => {
    const items = o.items || [];
    const itemHTML = items.map(item => `
      <div class="order-item">
        <img src="${escUrl(item.image)}" alt="${esc(item.name)}" onerror="this.style.display='none'" />
        <div class="oi-info">
          <h4>${esc(item.name)}</h4>
          <p>Qty: ${item.qty} &times; $${item.price.toFixed(2)}</p>
        </div>
        <div class="oi-total">$${(item.price * item.qty).toFixed(2)}</div>
      </div>`).join('');
    const date = o.createdAt ? new Date(o.createdAt.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Just now';
    const statusInfo = ORDER_STATUSES[o.status] || ORDER_STATUSES.pending;

    return `
      <div class="order-card">
        <div class="order-header">
          <div>
            <span class="order-id">Order #${o.id.slice(0, 8)}</span>
            <span class="order-date">${date}</span>
          </div>
          ${statusBadgeHTML(o.status || 'pending')}
        </div>
        ${o.paymentMethod === 'khmer_aba' || o.paymentMethod === 'khmer_wing' || o.paymentMethod === 'khmer_acleda' ? `
          <div class="order-payment-notice">
            <i class="fas fa-qrcode"></i> Pay with ${o.paymentMethod.replace('khmer_', '').toUpperCase()} — scan QR in store or pay online
          </div>` : ''}
        ${itemHTML}
        <div class="order-footer">
          <div class="order-total-row">
            <span>Subtotal: $${(o.subtotal || 0).toFixed(2)}</span>
            <span>Shipping: ${o.shipping === 0 ? 'FREE' : '$' + (o.shipping || 0).toFixed(2)}</span>
            <span class="order-grand-total">Total: $${(o.total || 0).toFixed(2)}</span>
          </div>
          <div class="order-address" title="Shipping Address">
            <i class="fas fa-map-marker-alt"></i>
            ${o.shippingAddress ? esc(o.shippingAddress.line1) + ', ' + esc(o.shippingAddress.city) : 'No address'}
          </div>
        </div>
      </div>`;
  }).join('');
}
