// API Base URL
// - When using `npm run dev` (Express serves frontend + API on same port): '' (relative)
// - When using `firebase serve` locally + backend on :3001: 'http://localhost:3001'
// - When deployed: set to your backend URL, or use same-origin if backend is on the same domain
const API_BASE = (function () {
  // Allow override via window.__API_BASE (set before this script loads)
  if (window.__API_BASE) return window.__API_BASE;
  // Dev mode: firebase serve on :5000 + backend on :3001
  if (window.location.port === '5000' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }
  // Production or Express dev mode: same origin (relative URLs work)
  return '';
})();

const api = {
  async request(path, options = {}) {
    const url = `${API_BASE}${path}`;
    const config = {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    };
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    const res = await fetch(url, config);
    if (!res.ok) {
      const text = await res.text();
      let msg;
      try { msg = JSON.parse(text).error; } catch { msg = text || res.statusText; }
      throw new Error(msg || `Request failed: ${res.status}`);
    }
    return res.json();
  },

  createPaymentIntent(amount, metadata = {}) {
    return this.request('/api/create-payment-intent', {
      method: 'POST',
      body: { amount, metadata },
    });
  },

  createCheckoutSession(items, options = {}) {
    return this.request('/api/create-checkout-session', {
      method: 'POST',
      body: {
        items,
        successUrl: options.successUrl,
        cancelUrl: options.cancelUrl,
        customerEmail: options.customerEmail,
      },
    });
  },

  getSession(sessionId) {
    return this.request(`/api/session/${sessionId}`);
  },

  generateQR(method, amount, orderId) {
    return this.request('/api/generate-qr', {
      method: 'POST',
      body: { method, amount, orderId },
    });
  },

  getMapsKey() {
    return this.request('/api/maps-key');
  },
};
