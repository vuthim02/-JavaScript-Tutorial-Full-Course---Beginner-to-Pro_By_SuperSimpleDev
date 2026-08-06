// ============================================
// CLOSURES: Private variables via factory functions
// ============================================

// Factory function: inner function "close over" the outer variable
function createCounter(initial = 0) {
  let count = initial; // PRIVATE - cannot be accessed directly from outside

  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    reset()     { count = initial; return count; },
    getValue()  { return count; },
  };
}

// Factory function: history log with closure over private array
function createHistory() {
  const entries = []; // PRIVATE array

  return {
    add(value, current) {
      const prefix = value > 0 ? '+' : '';
      entries.push({ value, current, text: `${prefix}${value}  →  ${current}` });
    },
    getAll()    { return [...entries]; }, // return copy, not reference
    getLast()   { return entries[entries.length - 1] || null; },
    clear()     { entries.length = 0; },
    getCount()  { return entries.length; },
  };
}

// Factory function: UI renderer with closure over DOM elements
function createRenderer(countEl, historyList) {
  function updateCount(count) {
    countEl.textContent = count;
  }

  function addHistoryEntry(text) {
    const li = document.createElement('li');
    li.textContent = text;
    historyList.appendChild(li);
    historyList.scrollTop = historyList.scrollHeight;
  }

  function clearHistory() {
    historyList.innerHTML = '';
  }

  return { updateCount, addHistoryEntry, clearHistory };
}

// --- Setup ---
const counter = createCounter(0);
const history = createHistory();
const renderer = createRenderer(
  document.getElementById('count'),
  document.getElementById('historyList')
);

function increase() {
  const newVal = counter.increment();
  history.add(1, newVal);
  renderer.updateCount(newVal);
  renderer.addHistoryEntry(history.getLast().text);
}

function decrease() {
  const newVal = counter.decrement();
  history.add(-1, newVal);
  renderer.updateCount(newVal);
  renderer.addHistoryEntry(history.getLast().text);
}

function reset() {
  counter.reset();
  history.clear();
  renderer.updateCount(0);
  renderer.clearHistory();
}

document.getElementById('increaseBtn').addEventListener('click', increase);
document.getElementById('decreaseBtn').addEventListener('click', decrease);
document.getElementById('resetBtn').addEventListener('click', reset);
