let entries = JSON.parse(localStorage.getItem('entries')) || [];

const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const entriesEl = document.getElementById('entries');

function save() {
  localStorage.setItem('entries', JSON.stringify(entries));
}

function updateUI() {
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach(entry => {
    if (entry.amount > 0) {
      totalIncome += entry.amount;
    } else {
      totalExpense += Math.abs(entry.amount);
    }
  });

  const balance = totalIncome - totalExpense;

  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${totalIncome.toFixed(2)}`;
  expenseEl.textContent = `$${totalExpense.toFixed(2)}`;

  entriesEl.innerHTML = '';
  entries.forEach((entry, i) => {
    const li = document.createElement('li');
    li.className = `entry${entry.amount < 0 ? ' expense' : ''}`;
    li.innerHTML = `
      <span class="desc">${entry.description}</span>
      <span class="amt ${entry.amount >= 0 ? 'positive' : 'negative'}">${entry.amount >= 0 ? '+' : '-'}$${Math.abs(entry.amount).toFixed(2)}</span>
      <button class="delete-btn" data-index="${i}">&times;</button>
    `;
    entriesEl.appendChild(li);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      entries.splice(idx, 1);
      save();
      updateUI();
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = description.value.trim();
  const amt = parseFloat(amount.value);

  if (!desc || isNaN(amt)) return;

  entries.push({ description: desc, amount: amt });
  save();
  updateUI();
  form.reset();
});

updateUI();
