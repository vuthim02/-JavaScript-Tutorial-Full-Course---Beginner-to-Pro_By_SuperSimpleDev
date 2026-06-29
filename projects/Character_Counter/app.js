const textarea = document.getElementById('textarea');
const charCount = document.getElementById('charCount');
const maxCount = document.getElementById('maxCount');
const remaining = document.getElementById('remaining');
const progressFill = document.getElementById('progressFill');
const max = 200;

maxCount.textContent = max;

textarea.addEventListener('input', () => {
  const len = textarea.value.length;
  const remain = max - len;

  charCount.textContent = len;
  remaining.textContent = `(${remain} remaining)`;

  const pct = (len / max) * 100;
  progressFill.style.width = `${pct}%`;

  if (remain < 20) {
    progressFill.style.background = '#e74c3c';
  } else if (remain < 50) {
    progressFill.style.background = '#f39c12';
  } else {
    progressFill.style.background = '#2ecc71';
  }
});
