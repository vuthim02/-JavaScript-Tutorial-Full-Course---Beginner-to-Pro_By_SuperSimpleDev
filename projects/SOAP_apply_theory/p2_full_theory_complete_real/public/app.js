// ═════════════════════════════════════════════════════════════
// MOBILE RESPONSIVE NAVIGATION
// ═════════════════════════════════════════════════════════════

const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const navBtns = document.querySelectorAll('.nav-btn');

// Toggle sidebar visibility on mobile
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// Close sidebar when clicking overlay
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

// Close sidebar when nav item is clicked (mobile)
navBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
});

// ─── Section Switching ───
const sections = document.querySelectorAll('.section');

navBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    switchSection(btn.dataset.section);
  });
});

function switchSection(name) {
  navBtns.forEach((b) => b.classList.remove('active'));
  sections.forEach((s) => s.classList.remove('active'));
  document.querySelector(`[data-section="${name}"]`).classList.add('active');
  document.getElementById(`section-${name}`).classList.add('active');
}
window.switchSection = switchSection;

// ═════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═════════════════════════════════════════════════════════════

// ─── XML Utilities ───
function escapeXml(str) {
  const m = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };
  return String(str).replace(/[&<>"']/g, (c) => m[c]);
}

function buildSoapEnvelope(bodyXml, headerXml) {
  let hdr = '';
  if (headerXml) {
    hdr = `<soap:Header>${headerXml}</soap:Header>`;
  }
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:book="http://example.com/bookstore">
${hdr}
  <soap:Body>
    ${bodyXml}
  </soap:Body>
</soap:Envelope>`;
}

function parseXmlText(xml) {
  const parser = new DOMParser();
  return parser.parseFromString(xml, 'text/xml');
}

function getText(el, tag) {
  if (!el) return null;
  const found = el.querySelector(tag) || el.getElementsByTagName(tag)[0];
  return found ? found.textContent : null;
}

function getAll(el, tag) {
  const arr = [];
  const items = el.querySelectorAll(tag);
  items.forEach((i) => arr.push(i));
  if (arr.length) return arr;
  const items2 = el.getElementsByTagName(tag);
  for (const i of items2) arr.push(i);
  return arr;
}

// ─── Inspector ───
const inspectorLog = document.getElementById('inspector-log');
const autoScrollCheck = document.getElementById('auto-scroll');

function addInspectorEntry(type, title, body) {
  const placeholder = inspectorLog.querySelector('.inspector-placeholder');
  if (placeholder) placeholder.remove();

  const entry = document.createElement('div');
  entry.className = 'inspector-entry';

  const header = document.createElement('div');
  header.className = 'inspector-header';
  header.innerHTML = `<span class="entry-title ${type}">${escapeXml(title)}</span>
    <span class="entry-time">${new Date().toLocaleTimeString()}</span>`;

  const bodyEl = document.createElement('div');
  bodyEl.className = 'inspector-body';
  bodyEl.textContent = body || '(no body)';

  header.addEventListener('click', () => {
    bodyEl.classList.toggle('collapsed');
  });

  entry.appendChild(header);
  entry.appendChild(bodyEl);
  inspectorLog.prepend(entry);

  if (autoScrollCheck && autoScrollCheck.checked) {
    inspectorLog.scrollTop = 0;
  }

  while (inspectorLog.children.length > 50) {
    inspectorLog.lastChild.remove();
  }
}

document.getElementById('clear-log').addEventListener('click', () => {
  inspectorLog.innerHTML = '';
});

// ─── Generic SOAP Sender ───
async function sendSoap(endpoint, soapAction, envelopeXml) {
  addInspectorEntry('soap-request', `➜ POST ${endpoint} [${soapAction}]`, envelopeXml);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: soapAction,
    },
    body: envelopeXml,
  });

  const responseText = await response.text();
  addInspectorEntry('soap-response', `➜ ${response.status} ${endpoint}`, responseText);

  return { status: response.status, text: responseText, doc: parseXmlText(responseText) };
}

// ═══════════════════════════════════════════
// BOOKSTORE SOAP CLIENT
// ═══════════════════════════════════════════

function soapBody_listBooks() {
  return `<book:listBooks/>`;
}

function soapBody_getBook(id) {
  return `<book:getBook><book:id>${escapeXml(id)}</book:id></book:getBook>`;
}

function soapBody_addBook(title, author, year) {
  return `<book:addBook>
    <book:title>${escapeXml(title)}</book:title>
    <book:author>${escapeXml(author)}</book:author>
    <book:year>${escapeXml(year)}</book:year>
  </book:addBook>`;
}

function soapBody_updateBook(id, title, author, year) {
  return `<book:updateBook>
    <book:id>${escapeXml(id)}</book:id>
    <book:title>${escapeXml(title)}</book:title>
    <book:author>${escapeXml(author)}</book:author>
    <book:year>${escapeXml(year)}</book:year>
  </book:updateBook>`;
}

function soapBody_deleteBook(id) {
  return `<book:deleteBook><book:id>${escapeXml(id)}</book:id></book:deleteBook>`;
}

function soapBody_searchBooks(query) {
  return `<book:searchBooks><book:query>${escapeXml(query)}</book:query></book:searchBooks>`;
}

async function callBookstore(bodyXml, soapAction) {
  const envelope = buildSoapEnvelope(bodyXml);
  return sendSoap('/bookstore', soapAction, envelope);
}

async function listBooks() {
  const res = await callBookstore(soapBody_listBooks(), 'http://example.com/bookstore/listBooks');
  const books = [];
  const bookNodes = getAll(res.doc, 'book') || getAll(res.doc, 'Book');
  bookNodes.forEach((node) => {
    const id = getText(node, 'id');
    const title = getText(node, 'title');
    const author = getText(node, 'author');
    const year = getText(node, 'year');
    if (id && title) books.push({ id, title, author, year });
  });
  renderBookList(books);
  return books;
}

async function addBook(title, author, year) {
  const res = await callBookstore(
    soapBody_addBook(title, author, year),
    'http://example.com/bookstore/addBook'
  );
  const success = getText(res.doc, 'success') === 'true';
  if (success) {
    await listBooks();
    document.getElementById('add-title').value = '';
    document.getElementById('add-author').value = '';
    document.getElementById('add-year').value = '';
  }
  showStatus(
    'add-form-status',
    success ? 'Book added successfully' : 'Failed to add book',
    success
  );
  return success;
}

async function getBook(id) {
  const res = await callBookstore(soapBody_getBook(id), 'http://example.com/bookstore/getBook');
  const bookEl = getAll(res.doc, 'book')[0] || getAll(res.doc, 'Book')[0];
  if (!bookEl) {
    showStatus('book-detail', 'Book not found', false);
    return null;
  }
  const book = {
    id: getText(bookEl, 'id'),
    title: getText(bookEl, 'title'),
    author: getText(bookEl, 'author'),
    year: getText(bookEl, 'year'),
  };
  showBookDetail(book);
  return book;
}

async function updateBook(id, title, author, year) {
  const res = await callBookstore(
    soapBody_updateBook(id, title, author, year),
    'http://example.com/bookstore/updateBook'
  );
  const success = getText(res.doc, 'success') === 'true';
  if (success) await listBooks();
  return success;
}

async function deleteBook(id) {
  const res = await callBookstore(
    soapBody_deleteBook(id),
    'http://example.com/bookstore/deleteBook'
  );
  const success = getText(res.doc, 'success') === 'true';
  if (success) await listBooks();
  return success;
}

async function searchBooks(query) {
  const res = await callBookstore(
    soapBody_searchBooks(query),
    'http://example.com/bookstore/searchBooks'
  );
  const books = [];
  const bookNodes = getAll(res.doc, 'book') || getAll(res.doc, 'Book');
  bookNodes.forEach((node) => {
    books.push({
      id: getText(node, 'id'),
      title: getText(node, 'title'),
      author: getText(node, 'author'),
      year: getText(node, 'year'),
    });
  });
  renderBookList(books);
  return books;
}

// ─── Bookstore UI ───

const bookListEl = document.getElementById('book-list');
const bookDetailEl = document.getElementById('book-detail');
const detailContent = document.getElementById('detail-content');
const addForm = document.getElementById('add-form');

function renderBookList(books) {
  if (!books.length) {
    bookListEl.innerHTML = '<p class="dim">No books found.</p>';
    return;
  }
  bookListEl.innerHTML = books
    .map(
      (b) => `
    <div class="book-card" data-id="${b.id}">
      <div class="book-title">${escapeXml(b.title)}</div>
      <div class="book-author">${escapeXml(b.author)}</div>
      <div class="book-year">${b.year}</div>
      <div class="book-actions">
        <button class="btn" data-action="view">View</button>
        <button class="btn" data-action="delete">Delete</button>
      </div>
    </div>
  `
    )
    .join('');

  bookListEl.querySelectorAll('.book-card').forEach((card) => {
    const id = card.dataset.id;

    card.querySelector('[data-action="view"]').addEventListener('click', () => getBook(id));
    card.querySelector('[data-action="delete"]').addEventListener('click', async () => {
      if (confirm('Delete this book?')) await deleteBook(id);
    });
  });

  document.getElementById('stat-books').textContent = books.length;
}

function showBookDetail(book) {
  bookDetailEl.classList.remove('hidden');
  detailContent.innerHTML = `
    <p><strong>ID:</strong> ${escapeXml(book.id)}</p>
    <p><strong>Title:</strong> ${escapeXml(book.title)}</p>
    <p><strong>Author:</strong> ${escapeXml(book.author)}</p>
    <p><strong>Year:</strong> ${book.year}</p>
    <div style="margin-top:0.8rem">
      <button class="btn" id="close-detail">Close</button>
    </div>
  `;
  document.getElementById('close-detail').addEventListener('click', () => {
    bookDetailEl.classList.add('hidden');
  });
}

function showStatus(elId, msg, ok) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = msg;
  el.className = `status-msg ${ok ? 'success' : 'error'}`;
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 3000);
}

// ─── Bookstore Event Listeners ───

document.querySelector('[data-op="listBooks"]').addEventListener('click', listBooks);

document.getElementById('show-add-form').addEventListener('click', () => {
  addForm.classList.toggle('hidden');
});

document.getElementById('add-btn').addEventListener('click', async () => {
  const title = document.getElementById('add-title').value.trim();
  const author = document.getElementById('add-author').value.trim();
  const year = document.getElementById('add-year').value;
  if (!title || !author || !year) return alert('Fill all fields');
  await addBook(title, author, year);
});

document.getElementById('search-btn').addEventListener('click', () => {
  const q = document.getElementById('search-query').value.trim();
  if (!q) return listBooks();
  searchBooks(q);
});

document.getElementById('search-query').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('search-btn').click();
});

// ─── Add a status msg container to the bookstore section ───
const addFormEl = document.getElementById('add-form');
const statusMsg = document.createElement('div');
statusMsg.id = 'add-form-status';
statusMsg.style.display = 'none';
addFormEl.appendChild(statusMsg);

// Also add one for book detail
const detailStatus = document.createElement('div');
detailStatus.id = 'book-detail-status';
detailStatus.style.display = 'none';
document.getElementById('book-detail').appendChild(detailStatus);

// ═══════════════════════════════════════════
// CALCULATOR SOAP CLIENT (via proxy)
// ═══════════════════════════════════════════

function buildCalcEnvelope(op, a, b) {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:web="http://tempuri.org/">
  <soap:Body>
    <web:${op}>
      <web:intA>${escapeXml(a)}</web:intA>
      <web:intB>${escapeXml(b)}</web:intB>
    </web:${op}>
  </soap:Body>
</soap:Envelope>`;
}

document.getElementById('calc-btn').addEventListener('click', async () => {
  const op = document.getElementById('calc-op').value;
  const a = document.getElementById('calc-a').value;
  const b = document.getElementById('calc-b').value;
  const soapAction = `http://tempuri.org/${op}`;
  const envelope = buildCalcEnvelope(op, a, b);

  document.getElementById('calc-request-xml').textContent = envelope;

  try {
    const response = await fetch('/calculator-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: soapAction,
      },
      body: envelope,
    });

    const data = await response.json();

    addInspectorEntry('soap-request', `➜ POST /calculator-proxy [${op}]`, envelope);
    addInspectorEntry(
      'soap-response',
      `➜ ${data.status} /calculator-proxy`,
      data.body || '(no body)'
    );

    document.getElementById('calc-response-xml').textContent = data.body || '(no response)';

    if (data.body) {
      const doc = parseXmlText(data.body);
      const resultEl =
        doc.querySelector(`${op}Result`) || doc.querySelector('[localName="AddResult"]');
      const faultEl = doc.querySelector('faultstring');

      if (resultEl) {
        document.getElementById('calc-result').textContent =
          `Result: ${a} ${opSymbol(op)} ${b} = ${resultEl.textContent}`;
      } else if (faultEl) {
        document.getElementById('calc-result').textContent = `SOAP Fault: ${faultEl.textContent}`;
      } else {
        document.getElementById('calc-result').textContent =
          'Could not parse result (see Inspector)';
      }
    } else {
      document.getElementById('calc-result').textContent = `Error: HTTP ${data.status}`;
    }
  } catch (err) {
    document.getElementById('calc-result').textContent = `Error: ${err.message}`;
  }
});

function opSymbol(op) {
  return { Add: '+', Subtract: '-', Multiply: '×', Divide: '÷' }[op] || '?';
}

// ═══════════════════════════════════════════
// WS-SECURITY LAB
// ═══════════════════════════════════════════

function buildUsernameToken(username, password) {
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
  const created = new Date().toISOString();
  return `
<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
  xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
  <wsse:UsernameToken wsu:Id="UsernameToken-1">
    <wsse:Username>${escapeXml(username)}</wsse:Username>
    <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${escapeXml(password)}</wsse:Password>
    <wsse:Nonce>${nonce}</wsse:Nonce>
    <wsu:Created>${created}</wsu:Created>
  </wsse:UsernameToken>
</wsse:Security>`;
}

document.getElementById('sec-username').addEventListener('input', updateSecPreview);
document.getElementById('sec-password').addEventListener('input', updateSecPreview);
updateSecPreview();

function updateSecPreview() {
  const user = document.getElementById('sec-username').value || 'username';
  const pass = document.getElementById('sec-password').value || 'password';
  document.getElementById('sec-header-xml').textContent = buildUsernameToken(user, pass);
}

document.getElementById('sec-add-btn').addEventListener('click', async () => {
  const user = document.getElementById('sec-username').value;
  const pass = document.getElementById('sec-password').value;
  const tokenXml = buildUsernameToken(user, pass);
  const bodyXml = soapBody_addBook('Secured Book', 'SOAP Demo', 2024);
  const envelope = buildSoapEnvelope(bodyXml, tokenXml);

  addInspectorEntry('soap-request', `➜ POST /bookstore [addBook + WS-Security]`, envelope);

  try {
    const response = await fetch('/bookstore', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: 'http://example.com/bookstore/addBook',
      },
      body: envelope,
    });

    const text = await response.text();
    addInspectorEntry('soap-response', `➜ ${response.status} /bookstore`, text);

    const doc = parseXmlText(text);
    const success = getText(doc, 'success') === 'true';
    const fault = getText(doc, 'faultstring');

    const statusEl = document.getElementById('sec-status');
    const faultEl = document.getElementById('sec-fault-xml');

    if (success) {
      statusEl.className = 'status-msg success';
      statusEl.textContent = 'Book added via secure SOAP!';
      statusEl.style.display = 'block';
      faultEl.classList.add('hidden');
      await listBooks();
    } else if (fault) {
      statusEl.className = 'status-msg error';
      statusEl.textContent = `SOAP Fault: ${fault}`;
      statusEl.style.display = 'block';
      faultEl.classList.remove('hidden');
      faultEl.textContent = text;
    } else {
      statusEl.className = 'status-msg error';
      statusEl.textContent = 'Unexpected response — see Inspector';
      statusEl.style.display = 'block';
    }
  } catch (err) {
    const statusEl = document.getElementById('sec-status');
    statusEl.className = 'status-msg error';
    statusEl.textContent = `Error: ${err.message}`;
    statusEl.style.display = 'block';
  }
});

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════

listBooks();
