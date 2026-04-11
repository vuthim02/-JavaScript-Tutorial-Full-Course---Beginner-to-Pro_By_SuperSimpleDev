// Game State
let playerScore = 0;
let computerScore = 0;
let draws = 0;
let history = [];

// DOM Elements
const resultText = document.getElementById('result-text');
const movesDisplay = document.getElementById('moves');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const drawsDisplay = document.getElementById('draws');
const historyList = document.getElementById('history-list');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetButton = document.getElementById('reset-btn');

// Game Choices
const choices = ['rock', 'paper', 'scissors'];

// Get computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Determine winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  }
  
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  }
  
  return 'lose';
}

// Format choice for display
function formatChoice(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

// Update score display
function updateScore() {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  drawsDisplay.textContent = draws;
}

// Add to history
function addToHistory(playerChoice, computerChoice, result) {
  const item = document.createElement('li');
  item.className = `history-item ${result}`;
  item.textContent = `You: ${formatChoice(playerChoice)} vs Computer: ${formatChoice(computerChoice)} - ${result.toUpperCase()}`;
  historyList.insertBefore(item, historyList.firstChild);
  
  history.unshift({ playerChoice, computerChoice, result });
}

// Play game
function play(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  
  // Update result display
  movesDisplay.textContent = `You chose ${formatChoice(playerChoice)}, Computer chose ${formatChoice(computerChoice)}`;
  
  // Set result text and style
  if (result === 'win') {
    resultText.textContent = 'You Win!';
    resultText.className = 'result-text win';
    playerScore++;
  } else if (result === 'lose') {
    resultText.textContent = 'You Lose!';
    resultText.className = 'result-text lose';
    computerScore++;
  } else {
    resultText.textContent = "It's a Draw!";
    resultText.className = 'result-text draw';
    draws++;
  }
  
  // Update score and history
  updateScore();
  addToHistory(playerChoice, computerChoice, result);
}

// Reset game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  draws = 0;
  history = [];
  
  resultText.textContent = 'Make your choice!';
  resultText.className = 'result-text';
  movesDisplay.textContent = '';
  
  updateScore();
  historyList.innerHTML = '';
}

// Event Listeners
choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.dataset.choice;
    play(choice);
  });
});

resetButton.addEventListener('click', resetGame);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    play('rock');
  } else if (e.key === 'p' || e.key === 'P') {
    play('paper');
  } else if (e.key === 's' || e.key === 'S') {
    play('scissors');
  }
});
