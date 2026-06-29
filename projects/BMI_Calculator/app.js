const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const resultEl = document.getElementById('result');
const categoryEl = document.getElementById('category');

function calculateBMI() {
  const height = Number(heightInput.value);
  const weight = Number(weightInput.value);

  if (!height || !weight) {
    resultEl.textContent = '--';
    categoryEl.textContent = 'Enter both values';
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  const rounded = Math.round(bmi * 10) / 10;
  resultEl.textContent = rounded;

  let category;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }
  categoryEl.textContent = category;
}

document.getElementById('calcBtn').addEventListener('click', calculateBMI);
