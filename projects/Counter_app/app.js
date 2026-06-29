let count = 0;
let history = [];

const countEl = document.getElementById('count');
const historyList = document.getElementById('historyList');

function updateDisplay() {
  countEl.textContent = count;
}

function addHistory(value) {
  const prefix = value > 0 ? '+' : '';
  history.push(`${prefix}${value}`);
  const li = document.createElement('li');
  li.textContent = `${prefix}${value}  →  ${count}`;
  historyList.appendChild(li);
  historyList.scrollTop = historyList.scrollHeight;
}

function increase() {
  count++;
  updateDisplay();
  addHistory(1);
}

function decrease() {
  count--;
  updateDisplay();
  addHistory(-1);
}

function reset() {
  count = 0;
  updateDisplay();
  history = [];
  historyList.innerHTML = '';
}

document.getElementById('increaseBtn').addEventListener('click', increase);
document.getElementById('decreaseBtn').addEventListener('click', decrease);
document.getElementById('resetBtn').addEventListener('click', reset);
