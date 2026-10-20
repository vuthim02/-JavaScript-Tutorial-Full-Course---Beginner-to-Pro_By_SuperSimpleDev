export function uid(prefix = 'id') {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function offsetISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function priorityLabel(priority) {
  const map = { 1: 'Low', 2: 'Medium', 3: 'High' };
  return map[Number(priority)] || 'Medium';
}

export function formatDue(due) {
  if (!due) return 'No due date';
  const today = todayISO();
  if (due === today) return 'Due today';
  if (due < today) return `Overdue · ${due}`;
  return `Due ${due}`;
}

export function initials(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'DF';
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('');
}
