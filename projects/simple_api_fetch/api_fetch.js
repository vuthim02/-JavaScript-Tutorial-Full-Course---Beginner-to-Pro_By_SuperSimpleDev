const card = document.getElementById('card');

card.addEventListener('click', () => {
    card.classList.add('loading');
    card.classList.remove('fade-in');
    card.innerHTML = '<p>Loading....<span class="dots"></span></p>';

    fetch('https://api.adviceslip.com/advice')
        .then((response) => response.json())
        .then((data) => {
            card.classList.remove('loading');
            card.innerHTML = `
                <h1 class="card-title">Advice</h1>
                <p>${data.slip.advice}</p>
            `;
            card.classList.add('fade-in');
        })
        .catch(() => {
            card.classList.remove('loading');
            card.innerHTML = '<p>Failed to fetch advice. Click to try again.</p>';
            card.classList.add('fade-in');
        });
});
