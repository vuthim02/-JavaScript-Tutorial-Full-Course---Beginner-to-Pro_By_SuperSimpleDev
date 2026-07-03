require('dotenv').config();
const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} else {
  console.log('Stripe key not configured — payment features disabled. Set STRIPE_SECRET_KEY in .env');
}

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5000';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

function withStripe(handler) {
  return async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ error: 'Payment service not configured. Add STRIPE_SECRET_KEY to .env' });
    }
    try { await handler(req, res); }
    catch (err) { console.error('Stripe error:', err); res.status(500).json({ error: err.message }); }
  };
}

// ─── Stripe: Create Payment Intent ───
app.post('/api/create-payment-intent', withStripe(async (req, res) => {
  const { amount, currency = 'usd', metadata = {} } = req.body;
  if (!amount || amount < 0.5) return res.status(400).json({ error: 'Invalid amount (min $0.50)' });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), currency, metadata,
    automatic_payment_methods: { enabled: true },
  });
  res.json({ clientSecret: paymentIntent.client_secret });
}));

// ─── Stripe: Create Checkout Session ───
app.post('/api/create-checkout-session', withStripe(async (req, res) => {
  const { items, successUrl, cancelUrl, customerEmail } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: 'No items provided' });
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name, images: item.image ? [item.image] : [] },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.qty || 1,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl || `${CLIENT_ORIGIN}/?order=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl || `${CLIENT_ORIGIN}/?order=cancel`,
    customer_email: customerEmail,
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'KH', 'GB', 'DE', 'AU', 'JP', 'SG', 'TH', 'VN', 'MY', 'PH', 'ID'] },
  });
  res.json({ url: session.url, sessionId: session.id });
}));

// ─── Stripe: Retrieve Session ───
app.get('/api/session/:sessionId', withStripe(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId, {
    expand: ['line_items', 'payment_intent'],
  });
  res.json(session);
}));

// ─── Generate QR Code for Khmer Payments ───
app.post('/api/generate-qr', async (req, res) => {
  try {
    const { method, amount, orderId } = req.body;
    const validMethods = ['aba', 'wing', 'acleda', 'emv'];
    if (!method || !validMethods.includes(method.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid payment method. Use: aba, wing, acleda, emv' });
    }

    let qrData;
    const m = method.toLowerCase();

    if (m === 'aba') {
      qrData = `ABA|${process.env.ABA_PAYMENT_ACCOUNT || '000123456'}|${process.env.ABA_PAYMENT_NAME || 'Google Store'}|${amount || '0'}|${orderId || uuidv4()}`;
    } else if (m === 'wing') {
      qrData = `WING|${process.env.WING_PAYMENT_ACCOUNT || '012345678'}|${amount || '0'}|${orderId || uuidv4()}`;
    } else if (m === 'acleda') {
      qrData = `ACLEDA|${process.env.ACLEDA_PAYMENT_ACCOUNT || '000789012'}|${amount || '0'}|${orderId || uuidv4()}`;
    } else {
      qrData = `EMV|${amount || '0'}|${orderId || uuidv4()}|KHMER`;
    }

    const qrImage = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: { dark: '#131921', light: '#ffffff' },
    });

    res.json({ qrImage, method: m, amount: amount || 0, orderId: orderId || '' });
  } catch (err) {
    console.error('QR error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── Google Maps Config (proxy to avoid exposing key) ───
app.get('/api/maps-key', (req, res) => {
  res.json({ key: process.env.GOOGLE_MAPS_API_KEY || '' });
});

// ─── Serve static files in production ───
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'API route not found' });
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Google Store server running on http://localhost:${PORT}`);
  console.log(`Client origin: ${CLIENT_ORIGIN}`);
});
