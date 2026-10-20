// Module script - Word Count Application

// Get DOM elements
const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

// Add event listener for input changes
textInput.addEventListener('input', updateStats);

// Add event listeners for buttons (instead of onclick attributes)
copyBtn.addEventListener('click', copyText);
clearBtn.addEventListener('click', clearText);

// Function to update statistics (module scope - not global)
function updateStats() {
    const text = textInput.value;

    // Count characters
    const chars = text.length;

    // Count words (split by whitespace and filter empty strings)
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    // Count sentences (split by . ! ?)
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Count paragraphs (split by double newlines)
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    // Update display
    wordCount.textContent = words;
    charCount.textContent = chars;
    sentenceCount.textContent = sentences;
    paragraphCount.textContent = paragraphs;
}

// Function to copy text to clipboard (module scope - not global)
function copyText() {
    const text = textInput.value;

    if (text.trim() === '') {
        alert('Nothing to copy!');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy text');
    });
}

// Function to clear text (module scope - not global)
function clearText() {
    if (textInput.value.trim() === '') {
        return;
    }

    if (confirm('Are you sure you want to clear the text?')) {
        textInput.value = '';
        updateStats();
    }
}

// Initialize stats on page load
updateStats();
