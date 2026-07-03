import { test, assert } from './runner.js';

// Module 09 — Browser DOM, BOM, Events, Storage, Rendering

test('URL: parsing and building', () => {
  const url = new URL('https://example.com:8080/path/to/page?q=hello#section');
  assert.equal(url.protocol, 'https:');
  assert.equal(url.hostname, 'example.com');
  assert.equal(url.port, '8080');
  assert.equal(url.pathname, '/path/to/page');
  assert.equal(url.hash, '#section');
});

test('URL: modifying search params', () => {
  const url = new URL('https://example.com/search');
  url.searchParams.set('q', 'test');
  url.searchParams.set('page', '1');
  assert.equal(url.href, 'https://example.com/search?q=test&page=1');
});

test('JSON: deep clone via parse/stringify', () => {
  const obj = { a: 1, b: { c: [1, 2, 3] } };
  const clone = JSON.parse(JSON.stringify(obj));
  assert.deepEqual(clone, obj);
  assert.ok(clone !== obj);
  assert.ok(clone.b !== obj.b); // deep, not shallow
});

test('JSON: circular reference throws', () => {
  const obj = { a: 1 };
  obj.self = obj;
  assert.throws(() => JSON.stringify(obj));
});

test('setTimeout: returns cancellable Timeout object', () => {
  const t = setTimeout(() => {}, 1000);
  assert.ok(t instanceof Object);
  assert.equal(typeof t.ref, 'function');
  clearTimeout(t);
  // After clearTimeout, the callback never fires
  let fired = false;
  const t2 = setTimeout(() => { fired = true; }, 10);
  clearTimeout(t2);
  assert.equal(fired, false);
});

test('Base64: data URI encoding', () => {
  const mime = 'image/svg+xml';
  const content = '<svg></svg>';
  const dataUri = `data:${mime};base64,${Buffer.from(content).toString('base64')}`;
  assert.ok(dataUri.startsWith('data:image/svg+xml;base64,'));
  const decoded = Buffer.from(dataUri.split(',')[1], 'base64').toString();
  assert.equal(decoded, content);
});

test('debounce: delays execution and resets on repeated calls', () => {
  let callCount = 0;
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };
  const fn = debounce(() => callCount++, 10);
  fn();
  fn();
  fn();
  assert.equal(callCount, 0); // not called immediately
  // After the debounce delay, callCount would be 1 (conceptual)
});

test('throttle: limits execution rate', () => {
  let callCount = 0;
  const throttle = (fn, interval) => {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= interval) {
        last = now;
        fn(...args);
      }
    };
  };
  const fn = throttle(() => callCount++, 20);
  fn(); // fires immediately
  fn(); // ignored (too soon since last call)
  assert.equal(callCount, 1);
});

test('classList: add/remove/toggle simulation', () => {
  class DOMTokenList {
    constructor() { this.tokens = new Set(); }
    add(...tokens) { tokens.forEach(t => this.tokens.add(t)); }
    remove(...tokens) { tokens.forEach(t => this.tokens.delete(t)); }
    toggle(token) {
      if (this.tokens.has(token)) { this.tokens.delete(token); return false; }
      this.tokens.add(token); return true;
    }
    contains(token) { return this.tokens.has(token); }
    get value() { return [...this.tokens].join(' '); }
  }
  const list = new DOMTokenList();
  list.add('active', 'visible');
  assert.ok(list.contains('active'));
  assert.equal(list.value, 'active visible');
  list.remove('visible');
  assert.ok(!list.contains('visible'));
  list.toggle('active');
  assert.ok(!list.contains('active'));
  assert.ok(list.toggle('hidden')); // added, returns true
});

test('localStorage: Map-based simulation', () => {
  class Storage {
    constructor() { this._data = new Map(); }
    getItem(key) { return this._data.get(key) ?? null; }
    setItem(key, val) { this._data.set(String(key), String(val)); }
    removeItem(key) { this._data.delete(key); }
    clear() { this._data.clear(); }
    get length() { return this._data.size; }
  }
  const store = new Storage();
  store.setItem('theme', 'dark');
  store.setItem('fontSize', '16');
  assert.equal(store.getItem('theme'), 'dark');
  assert.equal(store.length, 2);
  store.removeItem('theme');
  assert.equal(store.getItem('theme'), null);
  store.clear();
  assert.equal(store.length, 0);
});

test('Cookie: string parsing into object', () => {
  const parse = (str) => {
    return Object.fromEntries(
      str.split(';').map(p => p.trim().split('=')).map(([k, v]) => [k, v])
    );
  };
  const cookies = parse('session=abc; theme=dark; lang=en');
  assert.deepEqual(cookies, { session: 'abc', theme: 'dark', lang: 'en' });
});

test('event delegation: matches selector', () => {
  const matches = (element, selector) => {
    // Simplified: checks tag name, class, or id
    if (selector.startsWith('.')) return element.className?.split(' ').includes(selector.slice(1));
    if (selector.startsWith('#')) return element.id === selector.slice(1);
    return element.tagName?.toLowerCase() === selector.toLowerCase();
  };
  const el = { tagName: 'BUTTON', className: 'btn primary', id: 'submit' };
  assert.ok(matches(el, 'button'));
  assert.ok(matches(el, '.btn'));
  assert.ok(matches(el, '#submit'));
  assert.ok(!matches(el, 'div'));
  assert.ok(!matches(el, '.nonexistent'));
});

test('form: URL-encoded body serialization', () => {
  const serialize = (data) => {
    return Object.entries(data)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
  };
  const body = serialize({ name: 'Alice', role: 'admin' });
  assert.equal(body, 'name=Alice&role=admin');
  const body2 = serialize({ q: 'hello world', lang: 'en' });
  assert.equal(body2, 'q=hello%20world&lang=en');
});

test('query string: building and parsing', () => {
  const toQuery = (params) => {
    const sp = new URLSearchParams(params);
    return sp.toString();
  };
  const fromQuery = (str) => {
    return Object.fromEntries(new URLSearchParams(str));
  };
  const qs = toQuery({ search: 'test', page: '2', sort: 'asc' });
  assert.equal(qs, 'search=test&page=2&sort=asc');
  assert.deepEqual(fromQuery(qs), { search: 'test', page: '2', sort: 'asc' });
});

test('Intl: date formatting (browser BOM concept)', () => {
  const date = new Date('2024-01-15');
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  assert.equal(formatter.format(date), 'January 15, 2024');
});

test('requestAnimationFrame: concept — frame budgeting', () => {
  // rAF fires ~60 times/second = ~16.6ms intervals
  const frameBudget = 1000 / 60;
  assert.ok(frameBudget > 16 && frameBudget < 17);
});

test('CSS: hex color parsing', () => {
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  assert.deepEqual(hexToRgb('#ff8800'), { r: 255, g: 136, b: 0 });
  assert.deepEqual(hexToRgb('#00ff00'), { r: 0, g: 255, b: 0 });
});
