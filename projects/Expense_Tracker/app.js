// ============================================
// CLASS / OOP: Encapsulate data + behavior
// ============================================

class Entry {
  #description;
  #amount;
  #id;

  static #nextId = Date.now();

  constructor(description, amount) {
    this.#id = Entry.#nextId++;
    this.#description = description;
    this.#amount = amount;
  }

  get id()        { return this.#id; }
  get description() { return this.#description; }
  get amount()    { return this.#amount; }
  get isIncome()  { return this.#amount > 0; }
  get isExpense() { return this.#amount < 0; }

  get formattedAmount() {
    const sign = this.#amount >= 0 ? '+' : '-';
    return `${sign}$${Math.abs(this.#amount).toFixed(2)}`;
  }

  toObject() {
    return { id: this.#id, description: this.#description, amount: this.#amount };
  }

  static fromObject(obj) {
    return new Entry(obj.description, obj.amount);
  }
}

class ExpenseTracker {
  #entries = [];
  #storageKey;

  constructor(storageKey = 'entries') {
    this.#storageKey = storageKey;
    this.#load();
  }

  #load() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.#storageKey)) || [];
      this.#entries = raw.map(Entry.fromObject);
    } catch {
      this.#entries = [];
    }
  }

  #save() {
    localStorage.setItem(
      this.#storageKey,
      JSON.stringify(this.#entries.map(e => e.toObject()))
    );
  }

  addEntry(description, amount) {
    const entry = new Entry(description, amount);
    this.#entries.push(entry);
    this.#save();
    return entry;
  }

  removeEntry(id) {
    this.#entries = this.#entries.filter(e => e.id !== id);
    this.#save();
  }

  getEntries()     { return [...this.#entries]; }
  getBalance()     { return this.getIncome() - this.getExpense(); }
  getIncome()      { return this.#entries.filter(e => e.isIncome).reduce((s, e) => s + e.amount, 0); }
  getExpense()     { return this.#entries.filter(e => e.isExpense).reduce((s, e) => s + Math.abs(e.amount), 0); }
  getEntryCount()  { return this.#entries.length; }
}

// --- UI Controller ---
class TrackerUI {
  #tracker;
  #form;
  #els;

  constructor(tracker) {
    this.#tracker = tracker;
    this.#form = document.getElementById('form');
    this.#els = {
      description: document.getElementById('description'),
      amount:      document.getElementById('amount'),
      balance:     document.getElementById('balance'),
      income:      document.getElementById('income'),
      expense:     document.getElementById('expense'),
      entries:     document.getElementById('entries'),
    };

    this.#form.addEventListener('submit', (e) => this.#handleSubmit(e));
    this.#render();
  }

  #handleSubmit(e) {
    e.preventDefault();
    const desc = this.#els.description.value.trim();
    const amt  = parseFloat(this.#els.amount.value);
    if (!desc || isNaN(amt)) return;

    this.#tracker.addEntry(desc, amt);
    this.#form.reset();
    this.#render();
  }

  #render() {
    this.#els.balance.textContent = `$${this.#tracker.getBalance().toFixed(2)}`;
    this.#els.income.textContent  = `$${this.#tracker.getIncome().toFixed(2)}`;
    this.#els.expense.textContent = `$${this.#tracker.getExpense().toFixed(2)}`;

    this.#els.entries.innerHTML = '';
    this.#tracker.getEntries().forEach((entry) => {
      const li = document.createElement('li');
      li.className = `entry${entry.isExpense ? ' expense' : ''}`;
      li.innerHTML = `
        <span class="desc">${entry.description}</span>
        <span class="amt ${entry.isIncome ? 'positive' : 'negative'}">${entry.formattedAmount}</span>
        <button class="delete-btn" data-id="${entry.id}">&times;</button>
      `;
      this.#els.entries.appendChild(li);
    });

    this.#els.entries.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.#tracker.removeEntry(Number(btn.dataset.id));
        this.#render();
      });
    });
  }
}

// --- Init ---
const tracker = new ExpenseTracker();
const ui = new TrackerUI(tracker);
