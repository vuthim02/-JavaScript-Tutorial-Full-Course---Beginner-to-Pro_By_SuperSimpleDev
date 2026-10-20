class CounterApp {
    constructor() {
        this.count = this.loadFromStorange() || 0;
        this.countDisplay = document.getElementById('counter');
        this.increaseBtn = document.getElementById('increaseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.dicreaseBtn = document.getElementById('decreaseBtn');

        this.init();
    }

    init() {
        this.updateDisplay();
        this.addEventListeners();
    }

    addEventListeners() {
        this.increaseBtn.addEventListener('click', () => this.increase());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.dicreaseBtn.addEventListener('click', () => this.dicrease());

        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
            e.preventDefault();
            this.increase();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            e.preventDefault();
            this.dicrease();
        } else if (e.key === 'q' || e.key === 'Escape' || e.key === 'r') {
            e.preventDefault();
            this.reset();
        }
    }

    increase() {
        this.count++;
        this.updateDisplay();
        this.saveToStorange();
    }

    reset() {
        this.count = 0;
        this.updateDisplay();
        this.saveToStorange();
    }

    dicrease() {
        this.count--;
        this.updateDisplay();
        this.saveToStorange();
    }

    updateDisplay() {
        this.countDisplay.textContent = this.count;

        this.countDisplay.classList.remove('negative', 'positive');
        if (this.count > 0) {
            this.countDisplay.classList.add('positive');
        } else if (this.count < 0) {
            this.countDisplay.classList.add('negative');
        }
    }

    saveToStorange() {
        localStorage.setItem('counterValue', this.count.toString());
    }

    loadFromStorange() {
        const stored = localStorage.getItem('counterValue');
        return stored ? parseInt(stored, 10) : null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CounterApp();
});
