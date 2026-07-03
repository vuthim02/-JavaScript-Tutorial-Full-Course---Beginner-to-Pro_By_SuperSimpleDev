function renderStoreLocator() {
  mainEl.innerHTML = `
    <div class="section" style="padding:24px 20px;">
      <div class="section-header">
        <h2 class="section-title"><i class="fas fa-map-marked-alt"></i> Find a Store</h2>
      </div>
      <div class="store-locator-layout">
        <div class="store-list">
          <div class="store-search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="store-search" placeholder="Search by city or country..." />
          </div>
          <div id="store-results">
            ${renderStoreList()}
          </div>
        </div>
        <div class="store-map-container">
          <div id="store-map">
            <div class="map-placeholder">
              <i class="fas fa-map"></i>
              <h3>Google Maps</h3>
              <p>Find Google Store locations near you</p>
              <div class="store-grid-mini">
                <div class="store-mini-card">
                  <i class="fas fa-map-pin" style="color:#ea4335;"></i>
                  <strong>Phnom Penh</strong>
                  <span>AEON Mall, 132 St.</span>
                </div>
                <div class="store-mini-card">
                  <i class="fas fa-map-pin" style="color:#4285f4;"></i>
                  <strong>Siem Reap</strong>
                  <span>Lucky Mall, Downtown</span>
                </div>
                <div class="store-mini-card">
                  <i class="fas fa-map-pin" style="color:#34a853;"></i>
                  <strong>New York</strong>
                  <span>Google HQ, Manhattan</span>
                </div>
                <div class="store-mini-card">
                  <i class="fas fa-map-pin" style="color:#fbbc05;"></i>
                  <strong>Tokyo</strong>
                  <span>Shibuya, Google JP</span>
                </div>
              </div>
              <p class="map-note"><i class="fas fa-info-circle"></i> Add a Google Maps API key to enable interactive maps</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById('store-search')?.addEventListener('input', filterStores);
}

function renderStoreList() {
  const stores = [
    { name: 'Google Store Phnom Penh', city: 'Phnom Penh', country: 'KH', address: 'AEON Mall 1, 132 St. Preah Monivong', hours: '9AM - 9PM', phone: '+855 23 999 888' },
    { name: 'Google Store Siem Reap', city: 'Siem Reap', country: 'KH', address: 'Lucky Mall, Downtown Siem Reap', hours: '9AM - 8PM', phone: '+855 63 999 777' },
    { name: 'Google Store New York', city: 'New York', country: 'US', address: '111 8th Avenue, Manhattan, NY 10011', hours: '9AM - 7PM', phone: '+1 212-555-0100' },
    { name: 'Google Store Tokyo', city: 'Tokyo', country: 'JP', address: 'Shibuya Scramble Square, Shibuya-ku', hours: '10AM - 9PM', phone: '+81 3-5555-0100' },
    { name: 'Google Store London', city: 'London', country: 'GB', address: '6 Pancras Square, London N1C 4AG', hours: '9AM - 6PM', phone: '+44 20 5555 0100' },
    { name: 'Google Store Singapore', city: 'Singapore', country: 'SG', address: '71 Robinson Road, Singapore 068895', hours: '9AM - 7PM', phone: '+65 6555 0100' },
    { name: 'Google Store Sydney', city: 'Sydney', country: 'AU', address: '5 Hickson Road, Sydney NSW 2000', hours: '9AM - 6PM', phone: '+61 2 5555 0100' },
    { name: 'Google Store Bangkok', city: 'Bangkok', country: 'TH', address: 'Siam Paragon, 991 Rama 1 Rd.', hours: '10AM - 9PM', phone: '+66 2 555 0100' },
    { name: 'Google Store Ho Chi Minh', city: 'Ho Chi Minh', country: 'VN', address: 'Saigon Centre, 67 Le Loi St.', hours: '9AM - 9PM', phone: '+84 28 5555 0100' },
    { name: 'Google Store Seoul', city: 'Seoul', country: 'JP', address: 'Gangnam-gu, 123 Teheran-ro', hours: '10AM - 8PM', phone: '+82 2-5555-0100' },
  ];

  return stores.map(s => `
    <div class="store-card" data-city="${s.city.toLowerCase()}" data-country="${s.country.toLowerCase()}">
      <div class="store-card-header">
        <i class="fas fa-store-alt"></i>
        <h4>${esc(s.name)}</h4>
      </div>
      <p class="store-addr"><i class="fas fa-map-pin"></i> ${esc(s.address)}</p>
      <p class="store-hours"><i class="far fa-clock"></i> ${esc(s.hours)}</p>
      <p class="store-phone"><i class="fas fa-phone"></i> ${esc(s.phone)}</p>
    </div>
  `).join('');
}

function filterStores() {
  const q = document.getElementById('store-search').value.toLowerCase();
  document.querySelectorAll('.store-card').forEach(card => {
    const city = card.dataset.city;
    const country = card.dataset.country;
    card.style.display = (!q || city.includes(q) || country.includes(q)) ? '' : 'none';
  });
}
