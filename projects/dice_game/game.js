const cube = document.getElementById('cube');
const rollBtn = document.getElementById('rollBtn');
const result = document.getElementById('result');

const rotations = {
    1: { x: 0,    y: 0 },
    2: { x: 0,    y: -90 },
    3: { x: -90,  y: 0 },
    4: { x: 90,   y: 0 },
    5: { x: 0,    y: 90 },
    6: { x: 0,    y: 180 }
};

function rollDice() {
    rollBtn.disabled = true;
    result.textContent = 'Rolling...';

    const value = Math.floor(Math.random() * 6) + 1;
    const rot = rotations[value];

    const extraSpins = 3;
    const targetX = rot.x + 360 * extraSpins;
    const targetY = rot.y + 360 * extraSpins;

    cube.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    cube.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)`;

    setTimeout(() => {
        result.textContent = `You rolled a ${value}!`;
        rollBtn.disabled = false;
    }, 600);
}

rollBtn.addEventListener('click', rollDice);
