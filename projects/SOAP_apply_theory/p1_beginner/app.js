// ─── Tab switching ───
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
  });
});

// ─── SOAP XML Builder ───
function buildSoapEnvelope(op, a, b, token) {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:web="http://tempuri.org/">
  <soap:Header>
    <auth:Authentication xmlns:auth="http://example.com/auth">
      <auth:Token>${escapeXml(token)}</auth:Token>
    </auth:Authentication>
  </soap:Header>
  <soap:Body>
    <web:${escapeXml(op)}>
      <web:intA>${escapeXml(a)}</web:intA>
      <web:intB>${escapeXml(b)}</web:intB>
    </web:${escapeXml(op)}>
  </soap:Body>
</soap:Envelope>`;
}

function escapeXml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
  return String(str).replace(/[&<>"']/g, ch => map[ch]);
}

// ─── Live XML Preview ───
const opEl = document.getElementById('operation');
const aEl = document.getElementById('numA');
const bEl = document.getElementById('numB');
const tokenEl = document.getElementById('auth-token');
const xmlOutput = document.getElementById('xml-output');
const statusEl = document.getElementById('status');

function updatePreview() {
  const xml = buildSoapEnvelope(
    opEl.value,
    aEl.value || '0',
    bEl.value || '0',
    tokenEl.value || ''
  );
  xmlOutput.textContent = xml;
}

[opEl, aEl, bEl, tokenEl].forEach(el => {
  el.addEventListener('input', updatePreview);
  el.addEventListener('change', updatePreview);
});

updatePreview();

// ─── Send SOAP Request ───
const sendBtn = document.getElementById('send-btn');
const logList = document.getElementById('log-list');

sendBtn.addEventListener('click', async () => {
  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending...';
  statusEl.className = '';
  statusEl.style.display = 'none';

  const op = opEl.value;
  const a = aEl.value || '0';
  const b = bEl.value || '0';
  const token = tokenEl.value || '';

  const soapXml = buildSoapEnvelope(op, a, b, token);

  const soapAction = `http://tempuri.org/${op}`;

  try {
    const response = await fetch('/soap-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapAction
      },
      body: soapXml
    });

    const responseText = await response.text();

    const { result, raw } = parseSoapResult(responseText, op);

    if (raw) {
      addLogEntry('success', `SOAP Response — ${op}(${a}, ${b})`, responseText);
      statusEl.className = 'success';
      statusEl.textContent = `Result: ${result}`;
      statusEl.style.display = 'block';
    } else {
      addLogEntry('error', `Parse failed — raw response`, responseText);
      statusEl.className = 'error';
      statusEl.textContent = `Parse error: ${result}`;
      statusEl.style.display = 'block';
    }

  } catch (err) {
    statusEl.className = 'error';
    statusEl.textContent = `Error: ${err.message}`;
    statusEl.style.display = 'block';

    addLogEntry('error', `Request failed: ${err.message}`, '');
  }

  sendBtn.disabled = false;
  sendBtn.textContent = 'Send SOAP Request';
});

function parseSoapResult(xml, operation) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  const resultTag = `${operation}Result`;
  const ns = 'http://tempuri.org/';

  let el = doc.getElementsByTagNameNS(ns, resultTag)[0];

  if (!el) {
    const all = doc.getElementsByTagName('*');
    for (const e of all) {
      if (e.localName === resultTag) {
        el = e;
        break;
      }
    }
  }

  if (el) {
    return { result: el.textContent, raw: true };
  }

  const fault = doc.querySelector('faultstring');
  if (fault) {
    return { result: `Fault: ${fault.textContent}`, raw: true };
  }

  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    return { result: `XML parse error: ${parserError.textContent}`, raw: false };
  }

  return { result: 'Could not parse result — see log for raw XML', raw: false };
}

function addLogEntry(type, title, body) {
  const placeholder = logList.querySelector('p.dim');
  if (placeholder) placeholder.remove();

  const entry = document.createElement('div');
  entry.className = 'log-entry';

  const time = document.createElement('div');
  time.className = 'log-time';
  time.textContent = new Date().toLocaleTimeString();

  const t = document.createElement('div');
  t.className = `log-title ${type}`;
  t.textContent = title;

  entry.appendChild(time);
  entry.appendChild(t);

  if (body) {
    const b = document.createElement('div');
    b.className = 'log-body';
    b.textContent = body;
    entry.appendChild(b);
  }

  logList.prepend(entry);

  while (logList.children.length > 20) {
    logList.lastChild.remove();
  }
}
