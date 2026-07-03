const mainEl = document.getElementById('main-content');
let currentUser = null;
let searchTimeout = null;
let addToCartTimers = {};

const a = (id) => document.getElementById(id);

a('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    a('auth-login').classList.add('hidden');
    a('auth-signup').classList.remove('hidden');
    a('auth-error').textContent = '';
    a('signup-error').textContent = '';
});
a('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    a('auth-signup').classList.add('hidden');
    a('auth-login').classList.remove('hidden');
    a('auth-error').textContent = '';
    a('signup-error').textContent = '';
});

a('signup-btn').addEventListener('click', async () => {
    const name = a('signup-name').value.trim();
    const email = a('signup-email').value.trim();
    const pw = a('signup-password').value;
    if (!name || !email || !pw) {
        a('signup-error').textContent = 'Fill all fields.';
        return;
    }
    if (pw.length < 6) {
        a('signup-error').textContent = 'Password 6+ chars.';
        return;
    }
    try {
        const cred = await auth.createUserWithEmailAndPassword(email, pw);
        await cred.user.updateProfile({ displayName: name });
    } catch (err) {
        a('signup-error').textContent = err.message;
    }
});

a('login-btn').addEventListener('click', async () => {
    const email = a('login-email').value.trim();
    const pw = a('login-password').value;
    if (!email || !pw) {
        a('auth-error').textContent = 'Fill all fields.';
        return;
    }
    try {
        await auth.signInWithEmailAndPassword(email, pw);
    } catch (err) {
        a('auth-error').textContent = err.message;
    }
});

function handleGoogleCredential(response) {
    const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
    auth.signInWithCredential(credential).catch((err) => {
        const el = document.getElementById('auth-error');
        if (el) el.textContent = err.message;
    });
}

let gisInitialized = false;
function initGIS() {
    if (gisInitialized || typeof google === 'undefined' || !google.accounts) return;
    gisInitialized = true;
    google.accounts.id.initialize({
        client_id: '312928677219-rm1716f767pnvauqota3mdunn1oeam1a.apps.googleusercontent.com',
        callback: handleGoogleCredential,
        cancel_on_tap_outside: false,
    });
    google.accounts.id.prompt();
}

function googleSignIn() {
    const p = new firebase.auth.GoogleAuthProvider();
    const errEl = document.getElementById('auth-error');
    try {
        auth.signInWithPopup(p).catch((err) => {
            if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
                auth.signInWithRedirect(p).catch((e2) => {
                    if (errEl) errEl.textContent = 'Redirect failed: ' + (e2.message || e2);
                });
            } else {
                if (errEl) errEl.textContent = err.message;
            }
        });
    } catch (err) {
        if (errEl) errEl.textContent = err.message;
    }
}
a('google-btn').addEventListener('click', googleSignIn);
a('google-btn-signup').addEventListener('click', googleSignIn);

a('logout-btn').addEventListener('click', () => auth.signOut());
a('logout-btn-mobile').addEventListener('click', () => auth.signOut());

setTimeout(initGIS, 1000);

auth.getRedirectResult()
    .then((result) => {
        if (result.user) {
        }
    })
    .catch((err) => {
        if (err.code && err.code !== 'auth/credential-already-in-use') {
            a('auth-error').textContent = err.message;
            a('signup-error').textContent = err.message;
        }
    });

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((err) => {
    console.warn('Auth persistence error:', err);
});

auth.onAuthStateChanged((user) => {
    if (unsubOrders) {
        unsubOrders();
        unsubOrders = null;
    }
    if (user) {
        currentUser = user;
        a('auth-overlay').classList.add('hidden');
        a('app').classList.remove('hidden');
        const displayName = user.displayName || user.email;
        a('nav-user').textContent = displayName;
        a('nav-user-sub').textContent = 'Hello, ' + displayName;
        a('mobile-user-name').textContent = 'Hello, ' + displayName;
        syncCartFromFirestore();
        updateWishlistBadge();
        const params = new URLSearchParams(window.location.search);
        if (params.get('order') === 'success') {
            handleOrderSuccess(params.get('session_id'));
        } else {
            navigate('home');
        }
    } else {
        currentUser = null;
        a('auth-overlay').classList.remove('hidden');
        a('app').classList.add('hidden');
        localStorage.removeItem('cart');
        updateCartBadge(0);
        a('auth-login').classList.remove('hidden');
        a('auth-signup').classList.add('hidden');
        a('login-email').value = '';
        a('login-password').value = '';
        a('nav-user').textContent = 'Sign in';
        a('nav-user-sub').textContent = '';
        a('mobile-user-name').textContent = 'Hello, Sign in';
        initGIS();
    }
});

async function handleOrderSuccess(sessionId) {
    try {
        let items = getCartItems();
        let total = items.reduce((s, i) => s + i.price * i.qty, 0);
        if (sessionId) {
            try {
                const session = await api.getSession(sessionId);
                total = (session.amount_total || total * 100) / 100;
                if (session.payment_intent?.metadata?.items) {
                    items = JSON.parse(session.payment_intent.metadata.items);
                }
            } catch (e) {}
        }
        if (items.length > 0 && currentUser) {
            await db.collection('orders').add({
                userId: currentUser.uid,
                items,
                total,
                status: 'processing',
                paymentMethod: 'card',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            saveCart([]);
        }
        navigate('orders');
        showToast('Order placed successfully!');
    } catch (err) {
        console.error('Order save error:', err);
        navigate('orders');
    }
}

function navigate(page) {
    document.querySelectorAll('.modal-overlay').forEach((el) => el.remove());

    document.querySelectorAll('[data-page]').forEach((el) => el.classList.remove('active'));
    document.querySelectorAll(`[data-page="${page}"]`).forEach((el) => el.classList.add('active'));

    a('mobile-menu').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (page) {
        case 'home':
            renderHome();
            break;
        case 'products':
            renderProducts();
            break;
        case 'cart':
            renderCart();
            break;
        case 'checkout':
            renderCheckout();
            break;
        case 'orders':
            renderOrders();
            break;
        case 'wishlist':
            renderWishlist();
            break;
        case 'profile':
            renderProfile();
            break;
        case 'store-locator':
            renderStoreLocator();
            break;
        case 'about':
            renderAbout();
            break;
        case 'admin':
            renderAdmin();
            break;
        default:
            renderHome();
            break;
    }
}

document.querySelectorAll('[data-page]').forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(el.dataset.page);
    });
});

a('hamburger').addEventListener('click', () => {
    a('mobile-menu').classList.toggle('hidden');
});
a('hamburger2').addEventListener('click', () => {
    a('mobile-menu').classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    const menu = a('mobile-menu');
    if (
        !menu.classList.contains('hidden') &&
        !menu.contains(e.target) &&
        !e.target.closest('.hamburger') &&
        !e.target.closest('#hamburger2')
    ) {
        menu.classList.add('hidden');
    }
});

let lastSearchQuery = '';
a('search-input').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const q = e.target.value.trim();
    if (q.length === 0) {
        lastSearchQuery = '';
        navigate('products');
        return;
    }
    if (q.length < 2) return;
    searchTimeout = setTimeout(() => {
        if (q === lastSearchQuery) return;
        lastSearchQuery = q;
        const ql = q.toLowerCase();
        const results = PRODUCTS.filter(
            (p) =>
                !p.isCategory &&
                (p.name.toLowerCase().includes(ql) || p.desc.toLowerCase().includes(ql))
        );
        const filtered = results;
        mainEl.innerHTML = `
      <div class="products-header">
        <h2>Results for "${esc(q)}"</h2>
        <p style="font-size:13px;color:var(--text-mid);">${filtered.length} result${filtered.length !== 1 ? 's' : ''}</p>
      </div>
      <div class="product-grid">
        ${filtered.map((p) => productCard(p)).join('')}
        ${filtered.length === 0 ? '<div class="cart-empty" style="grid-column:1/-1"><i class="fas fa-search"></i><p>No products found for "' + esc(q) + '". Try a different search.</p></div>' : ''}
      </div>`;
        mainEl.querySelectorAll('.product-card').forEach((el) => {
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('add-btn') || e.target.closest('.wishlist-btn'))
                    return;
                const p = PRODUCTS.find((x) => x.id === el.dataset.id);
                if (p) showProductModal(p);
            });
        });
        mainEl.querySelectorAll('.add-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const p = PRODUCTS.find((x) => x.id === btn.dataset.id);
                if (p) addToCart(p);
            });
        });
        mainEl.querySelectorAll('.wishlist-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const p = PRODUCTS.find((x) => x.id === btn.dataset.id);
                if (p) toggleWishlist(p);
            });
        });
    }, 300);
});

a('search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        a('search-input').dispatchEvent(new Event('input'));
    }
});

function starRating(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const stars = [];
    for (let i = 0; i < full; i++) stars.push('<i class="fas fa-star"></i>');
    if (half) stars.push('<i class="fas fa-star-half-alt"></i>');
    while (stars.length < 5) stars.push('<i class="far fa-star"></i>');
    return stars.join('');
}

function randomRating() {
    return (3 + Math.random() * 2).toFixed(1);
}

function randomReviews() {
    const n = Math.floor(Math.random() * 15000) + 50;
    return n > 999 ? (n / 1000).toFixed(1) + 'K' : n;
}

function hasPrime(id) {
    const primeIds = [
        'p1',
        'p4',
        'p9',
        'p10',
        'p11',
        'p18',
        'p20',
        'p24',
        'p32',
        'p33',
        'p41',
        'p42',
        'p45',
        'p50',
        'p51',
        'p57',
        'p58',
        'p65',
        'p69',
        'p76',
        'p77',
        'p81',
        'p84',
        'p85',
        'p87',
        'p96',
        'p99',
        'p100',
    ];
    return primeIds.includes(id);
}

function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
        return [];
    }
}

function saveCart(items) {
    localStorage.setItem('cart', JSON.stringify(items));
    const count = items.reduce((s, i) => s + i.qty, 0);
    updateCartBadge(count);
    if (currentUser) syncCartToFirestore(items);
}

function updateCartBadge(count) {
    document.querySelectorAll('#cart-count, #cart-count-mobile').forEach((el) => {
        if (count > 0) {
            el.textContent = count;
            el.classList.remove('hidden');
        } else el.classList.add('hidden');
    });
}

function addToCart(product) {
    const items = getCartItems();
    const existing = items.find((i) => i.id === product.id);
    if (existing) existing.qty++;
    else
        items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1,
        });
    saveCart(items);
    showToast(`${product.name} added to cart`);
    const btn = document.querySelector(`.add-btn[data-id="${product.id}"]`);
    if (btn) {
        if (addToCartTimers[product.id]) clearTimeout(addToCartTimers[product.id]);
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        addToCartTimers[product.id] = setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.classList.remove('added');
            delete addToCartTimers[product.id];
        }, 1200);
    }
}

function updateCartQty(id, delta) {
    const items = getCartItems();
    const item = items.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) items.splice(items.indexOf(item), 1);
    saveCart(items);
}

function removeFromCart(id) {
    let items = getCartItems();
    items = items.filter((i) => i.id !== id);
    saveCart(items);
}

async function syncCartToFirestore(items) {
    try {
        await db
            .collection('carts')
            .doc(currentUser.uid)
            .set({ items, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    } catch (err) {
        console.error('Cart sync error:', err);
    }
}

function setLocalCart(items) {
    localStorage.setItem('cart', JSON.stringify(items));
    const count = items.reduce((s, i) => s + i.qty, 0);
    updateCartBadge(count);
}

async function syncCartFromFirestore() {
    try {
        const doc = await db.collection('carts').doc(currentUser.uid).get();
        if (doc.exists) {
            const data = doc.data();
            if (data.items && data.items.length > 0) {
                setLocalCart(data.items);
                return;
            }
        }
    } catch (err) {
        console.warn('Cart fetch error, using local:', err);
    }
    const items = getCartItems();
    if (items.length > 0) syncCartToFirestore(items);
}

async function checkout() {
    const items = getCartItems();
    if (items.length === 0) return;
    navigate('checkout');
}

function esc(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
}
function escUrl(u) {
    return u.replace(/"/g, '%22').replace(/'/g, '%27');
}

function getFallbackImageUrl(product) {
    const categoryFallbacks = {
        'AI & Subscriptions':
            'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
        Phones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
        'Smart Home':
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
        Wearables:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
        'TV & Entertainment':
            'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80',
        'Tablets & Laptops':
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
        Audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        Accessories:
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        'Software & Services':
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    };
    return (
        categoryFallbacks[product?.category] ||
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
    );
}

function getProductImageUrl(product) {
    if (product?.image && typeof product.image === 'string' && product.image.trim())
        return product.image;
    return getFallbackImageUrl(product);
}

function productCard(p) {
    const rating = randomRating();
    const reviews = randomReviews();
    const prime = hasPrime(p.id);
    const inWish = isInWishlist(p.id);
    return `
    <div class="product-card" data-id="${p.id}">
      <div class="img-wrap">
        <img src="${escUrl(getProductImageUrl(p))}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${escUrl(getFallbackImageUrl(p))}';this.classList.add('fallback-img')" />
        ${prime ? '<span class="prime-badge">PRIME</span>' : ''}
        <button class="wishlist-btn ${inWish ? 'in-wishlist' : ''}" data-id="${p.id}" title="Add to wishlist">
          ${inWish ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}
        </button>
      </div>
      <div class="info">
        <h3>${esc(p.name)}</h3>
        <div class="rating-row">
          <span class="stars">${starRating(rating)}</span>
          <span class="review-count">${reviews}</span>
        </div>
        <p class="desc">${esc(p.desc)}</p>
        <div class="price-row">
          <span class="price">$${p.price.toFixed(2)}</span>
        </div>
        <p class="price-cat">${esc(p.category)}</p>
      </div>
      <button class="add-btn" data-id="${p.id}">Add to Cart</button>
    </div>`;
}

document.addEventListener('click', function (e) {
    if (
        e.target.closest('[data-page="home"]') ||
        e.target.closest('[data-page="products"]') ||
        e.target.closest('[data-page="cart"]') ||
        e.target.closest('[data-page="orders"]') ||
        e.target.closest('[data-page="checkout"]') ||
        e.target.closest('[data-page="wishlist"]') ||
        e.target.closest('[data-page="profile"]') ||
        e.target.closest('[data-page="store-locator"]')
    ) {
    }
});

const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollTopBtn.classList.remove('hidden');
    else scrollTopBtn.classList.add('hidden');
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
