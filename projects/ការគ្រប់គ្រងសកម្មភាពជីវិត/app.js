const activityForm = document.getElementById('activityForm');
const activityInput = document.getElementById('activityInput');
const categorySelect = document.getElementById('categorySelect');
const activitiesList = document.getElementById('activitiesList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const currentDate = document.getElementById('currentDate');
const filterBtns = document.querySelectorAll('.filter-btn');

let activities = JSON.parse(localStorage.getItem('lifeActivities')) || [];
let currentFilter = 'all';

function formatDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDate.textContent = new Date().toLocaleDateString('en-US', options);
}

function save() {
  localStorage.setItem('lifeActivities', JSON.stringify(activities));
}

function updateStats() {
  const total = activities.length;
  const completed = activities.filter(a => a.completed).length;
  totalCount.textContent = `Total: ${total}`;
  completedCount.textContent = `Completed: ${completed}`;
}

function getCategoryLabel(category) {
  const labels = { morning: '🌅 Morning', afternoon: '☀️ Afternoon', evening: '🌙 Evening' };
  return labels[category] || category;
}

function render() {
  const filtered = currentFilter === 'all'
    ? activities
    : activities.filter(a => a.category === currentFilter);

  if (filtered.length === 0) {
    activitiesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <p>No activities yet. Add one above!</p>
      </div>`;
    updateStats();
    return;
  }

  activitiesList.innerHTML = filtered.map((activity, index) => {
    const realIndex = activities.indexOf(activity);
    return `
      <div class="activity-item ${activity.completed ? 'completed' : ''}">
        <input type="checkbox" class="activity-checkbox" data-index="${realIndex}" ${activity.completed ? 'checked' : ''}>
        <span class="activity-text">${activity.text}</span>
        <span class="activity-category ${activity.category}">${getCategoryLabel(activity.category)}</span>
        <button class="delete-btn" data-index="${realIndex}">&times;</button>
      </div>`;
  }).join('');

  updateStats();
}

function addActivity(e) {
  e.preventDefault();
  const text = activityInput.value.trim();
  if (!text) return;

  activities.push({
    text,
    category: categorySelect.value,
    completed: false
  });

  activityInput.value = '';
  save();
  render();
}

function toggleComplete(index) {
  activities[index].completed = !activities[index].completed;
  save();
  render();
}

function deleteActivity(index) {
  activities.splice(index, 1);
  save();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  render();
}

activityForm.addEventListener('submit', addActivity);

activitiesList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteActivity(Number(e.target.dataset.index));
  }
});

activitiesList.addEventListener('change', (e) => {
  if (e.target.classList.contains('activity-checkbox')) {
    toggleComplete(Number(e.target.dataset.index));
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

formatDate();
render();
