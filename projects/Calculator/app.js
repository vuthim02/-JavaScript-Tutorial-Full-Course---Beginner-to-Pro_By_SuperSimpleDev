// input number
function appendToDisplay(value) {
    document.getElementById('result').value += value;
}
// clear number
function clearDisplay() {
    document.getElementById('result').value = '';
}
// delete
function deleteLastChar() {
    const display = document.getElementById('result');
    display.value = display.value.slice(0, -1);
}
// safe math parser (no eval)
function safeCalculate(expression) {
    const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, '');
    if (sanitized.trim() === '') return '';
    const result = Function('"use strict"; return (' + sanitized + ')')();
    return result;
}

function calculate() {
    const display = document.getElementById('result');
    try {
        display.value = safeCalculate(display.value);
    } catch {
        display.value = 'Error';
    }
}

// support keyboard
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (/^[0-9]$/.test(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === '(' || key === ')') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLastChar();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
