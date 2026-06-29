# Level 129: User Activity Feed (arrays + objects + rendering)

## Error Snippets

### Error 1: Push to undefined array
**Description:** Add activity to feed
```javascript
let feed;
feed.push({ type: 'purchase', item: 'Shirt' });
```

### Error 2: Not handling empty feed
**Description:** Render activity feed
```javascript
function renderFeed(feed) {
  feed.forEach(activity => {
    const el = document.createElement('div');
    el.textContent = activity.message;
    document.body.appendChild(el);
  });
}
```

### Error 3: Wrong date comparison for recent
**Description:** Get activities from today
```javascript
const activities = [
  { type: 'purchase', date: '2024-03-15' },
  { type: 'review', date: '2024-03-10' }
];
const today = new Date().toISOString().split('T')[0];
const todayActivities = activities.filter(a => a.date === today);
```

### Error 4: Map without return
**Description:** Format activity messages
```javascript
const formatted = activities.map(a => {
  `${a.user} ${a.action} ${a.target}`;
});
```

### Error 5: Sorting by time using string comparison
**Description:** Sort activities by timestamp
```javascript
const activities = [
  { timestamp: '2024-03-15T10:30:00' },
  { timestamp: '2024-03-15T09:00:00' }
];
activities.sort((a, b) => a.timestamp - b.timestamp);
```

### Error 6: Not converting user ID to number
**Description:** Filter activities by user
```javascript
const userId = '42';
const userActivities = activities.filter(a => a.userId === userId);
```

### Error 7: Reduce to count activity types
**Description:** Count each type of activity
```javascript
const activities = [
  { type: 'purchase' },
  { type: 'review' },
  { type: 'purchase' }
];
const counts = activities.reduce((acc, a) => {
  acc[a.type] = (acc[a.type] || 0) + 1;
}, {});
```

### Error 8: Not cloning before reverse
**Description:** Show most recent first
```javascript
function getRecentFeed(activities) {
  return activities.reverse();
}
```

### Error 9: Filter by undefined property
**Description:** Get liked activities
```javascript
const liked = activities.filter(a => a.liked);
```

### Error 10: Using find instead of filter
**Description:** Get all activities of type 'purchase'
```javascript
const purchases = activities.find(a => a.type === 'purchase');
```

### Error 11: Not handling null user in activity
**Description:** Display activity author
```javascript
function renderActivity(activity) {
  return `<div>${activity.user.name}: ${activity.message}</div>`;
}
```

### Error 12: Wrong index in splice for removing activity
**Description:** Delete activity from feed
```javascript
function deleteActivity(id) {
  const index = activities.findIndex(a => a.id === id);
  activities.splice(index);
}
```

### Error 13: For loop with const inside
**Description:** Render each activity
```javascript
for (const i = 0; i < activities.length; i++) {
  renderActivity(activities[i]);
}
```

### Error 14: Not checking array before forEach
**Description:** Process incoming activities
```javascript
function processActivities(data) {
  data.activities.forEach(a => process(a));
}
```

### Error 15: Sort comparator returning boolean
**Description:** Sort by number of likes
```javascript
activities.sort((a, b) => a.likes > b.likes);
```

### Error 16: Not using data-* attributes
**Description:** Add click handler to activity items
```javascript
document.querySelectorAll('.activity-item').forEach(el => {
  el.addEventListener('click', function() {
    showActivityDetail(el.textContent);
  });
});
```

### Error 17: Concat instead of push
**Description:** Add new activities to feed
```javascript
feed = feed.concat(newActivities);
```

### Error 18: Wrong property for activity time
**Description:** Format relative time
```javascript
function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  return Math.floor(diff / 60000) + ' minutes ago';
}
```

### Error 19: Not removing event listeners on feed update
**Description:** Re-render entire feed
```javascript
function updateFeed(newActivities) {
  const container = document.getElementById('feed');
  container.innerHTML = '';
  newActivities.forEach(a => {
    container.appendChild(createActivityElement(a));
  });
}
```

### Error 20: GroupBy without return
**Description:** Group activities by type
```javascript
const grouped = activities.reduce((acc, a) => {
  if (!acc[a.type]) acc[a.type] = [];
  acc[a.type].push(a);
}, {});
```

### Error 21: Not handling pagination
**Description:** Load all activities
```javascript
function loadFeed() {
  const allActivities = getActivities();
  renderActivities(allActivities);
}
```

### Error 22: Set for activity IDs
**Description:** Track unique activity IDs
```javascript
const activityIds = new Set(activities.map(a => a.id));
```

### Error 23: Wrong field for activity link
**Description:** Get activity target URL
```javascript
function getActivityLink(activity) {
  return activity.url;
}
```

### Error 24: Not using optional chaining for activity metadata
**Description:** Access activity metadata
```javascript
function getMetadata(activity) {
  return activity.metadata.category;
}
```

### Error 25: Flatten nested activity comments
**Description:** Get all comments from activities
```javascript
const activities = [
  { comments: [{ text: 'Great!' }] },
  { comments: [{ text: 'Nice' }] }
];
const allComments = activities.flatMap(a => a.comments.text);
```

### Error 26: Not filtering deleted activities
**Description:** Display all activities
```javascript
function displayFeed() {
  return activities.filter(a => !a.deleted).map(a => formatActivity(a));
}
```

### Error 27: Concatenating strings in loop for feed HTML
**Description:** Build feed HTML
```javascript
let html = '';
for (const a of activities) {
  html += '<div class="activity">' + a.message + '</div>';
}
```

### Error 28: Not debouncing feed refresh
**Description:** Auto-refresh feed
```javascript
setInterval(() => {
  fetchNewActivities().then(appendActivities);
}, 3000);
```

### Error 29: Wrong method for checking seen status
**Description:** Mark activities as seen
```javascript
function markAsSeen(ids) {
  activities.forEach(a => {
    if (ids.includes(a.id)) a.seen = true;
  });
}
```

### Error 30: Not using spread for immutable addition
**Description:** Add activity without mutation
```javascript
function addActivity(feed, activity) {
  feed.push(activity);
  return feed;
}
```

### Error 31: Reduce returning string
**Description:** Create summary of activities
```javascript
const summary = activities.reduce((str, a) => {
  return str + a.type + ', ';
}, '');
```

### Error 32: Calling map on NodeList
**Description:** Get data from activity elements
```javascript
const elements = document.querySelectorAll('.activity');
const ids = elements.map(el => el.dataset.id);
```

### Error 33: Not handling activity image errors
**Description:** Display user avatar in activity
```javascript
function renderAvatar(activity) {
  const img = document.createElement('img');
  img.src = activity.user.avatar;
  return img;
}
```

### Error 34: Using innerHTML with user content
**Description:** Show activity message
```javascript
function renderActivityMessage(activity) {
  const el = document.createElement('div');
  el.innerHTML = activity.message;
  return el;
}
```

### Error 35: Not disallowing empty activities
**Description:** Submit new activity
```javascript
function postActivity(message) {
  if (message) {
    activities.push({ message, timestamp: Date.now() });
  }
}
```

### Error 36: Wrong format for timestamps
**Description:** Parse activity timestamps
```javascript
const timestamp = '1710595200000';
const date = new Date(timestamp);
```

### Error 37: Not limiting feed size
**Description:** Add new activity (feed can grow unbounded)
```javascript
function addToFeed(activity) {
  feed.unshift(activity);
}
```

### Error 38: Using == for activity type comparison
**Description:** Filter by activity type
```javascript
const filtered = activities.filter(a => a.type == 'purchase');
```

### Error 39: Not handling empty state in feed
**Description:** Show feed
```javascript
function showFeed() {
  const container = document.getElementById('feed');
  activities.forEach(a => container.appendChild(createCard(a)));
}
```

### Error 40: Overwriting activity on edit
**Description:** Edit activity content
```javascript
function editActivity(id, newMessage) {
  const activity = activities.find(a => a.id === id);
  activity = { ...activity, message: newMessage };
}
```

### Error 41: Wrong variable in forEach
**Description:** Log activity details
```javascript
activities.forEach(a => {
  console.log(`${activity.type}: ${activity.message}`);
});
```

### Error 42: Not checking for duplicate activities
**Description:** Add activities from API
```javascript
function addActivitiesFromAPI(newActivities) {
  newActivities.forEach(a => {
    if (!activities.find(existing => existing.id === a.id)) {
      activities.push(a);
    }
  });
}
```

### Error 43: Date subtraction returning NaN
**Description:** Calculate time since activity
```javascript
function timeSince(activity) {
  const now = new Date();
  const activityDate = new Date(activity.date);
  return now - activityDate;
}
```

### Error 44: Not using template literals
**Description:** Format activity description
```javascript
function formatActivity(a) {
  return a.user + ' ' + a.verb + ' ' + a.object;
}
```

### Error 45: Filter by truthy on object
**Description:** Get activities with comments
```javascript
const withComments = activities.filter(a => a.comments);
```

### Error 46: ForEach on null
**Description:** Process feed data
```javascript
function processFeed(data) {
  data.forEach(item => console.log(item));
}
```

### Error 47: Not converting activity ID to string
**Description:** Find activity by ID from URL param
```javascript
const id = new URLSearchParams(location.search).get('id');
const activity = activities.find(a => a.id === id);
```

### Error 48: Wrong method for likes count
**Description:** Count total likes across activities
```javascript
const totalLikes = activities.reduce((sum, a) => sum + a.likes, 0);
```

### Error 49: Not checking if activity has target
**Description:** Show activity target link
```javascript
activities.forEach(a => {
  console.log(a.target.name);
});
```

### Error 50: Using const for variable that needs reassignment
**Description:** Process feed with filters
```javascript
const processed = activities;
processed = processed.filter(a => a.active);
processed = processed.map(a => formatActivity(a));
```

### Error 51: Wrong destructuring for nested activity data
**Description:** Extract user info from activity
```javascript
const activity = { user: { name: 'John', id: 1 }, message: 'Hello' };
const { user: { name } } = activity;
```

### Error 52: Not preserving feed scroll position
**Description:** Load more activities
```javascript
function loadMore() {
  const newActivities = fetchMore();
  appendActivities(newActivities);
}
```

### Error 53: Typo in array method
**Description:** Remove duplicate activities
```javascript
function deduplicate(feed) {
  return [...new Set(feed)];
}
```

### Error 54: Using delete on activity array
**Description:** Remove an activity
```javascript
function removeActivity(index) {
  delete activities[index];
}
```

### Error 55: Wrong comparison for activity importance
**Description:** Get important activities
```javascript
const important = activities.filter(a => a.important === true);
```

### Error 56: Not using toLocaleString for dates
**Description:** Display activity date
```javascript
function displayDate(activity) {
  return activity.date.toString();
}
```

### Error 57: Spread in reduce causing performance issues
**Description:** Convert activities array to map
```javascript
const activityMap = activities.reduce((map, a) => ({ ...map, [a.id]: a }), {});
```

### Error 58: Not validating activity before render
**Description:** Render activity feed
```javascript
function renderActivity(activity) {
  const el = document.createElement('div');
  el.textContent = activity.message.toUpperCase();
  return el;
}
```

### Error 59: Activity feed polling too frequent
**Description:** Poll for new activities
```javascript
setInterval(fetchNewActivities, 100);
```

### Error 60: Using valueOf instead of value for input
**Description:** Get new activity input
```javascript
const input = document.getElementById('activity-input');
const message = input.valueOf();
```

### Error 61: Wrong property for number of shares
**Description:** Count total shares
```javascript
const totalShares = activities.reduce((s, a) => s + a.shares, 0);
```

### Error 62: Not sanitizing activity input
**Description:** Post new activity
```javascript
function postActivity(text) {
  const activity = { message: text, timestamp: Date.now() };
  activities.unshift(activity);
  renderFeed();
}
```

### Error 63: Slicing array incorrectly
**Description:** Get first 10 activities
```javascript
const recent = activities.slice(0, 10);
```

### Error 64: Not using Array.isArray
**Description:** Process feed data
```javascript
function processFeedData(data) {
  data.forEach(d => process(d));
}
```

### Error 65: Activity pagination with hardcoded limits
**Description:** Load next page of activities
```javascript
function loadNextPage() {
  const nextPage = activities.slice(currentPage * 20, 20);
  renderActivities(nextPage);
}
```

### Error 66: Wrong method for unread count
**Description:** Count unread activities
```javascript
const unreadCount = activities.filter(a => !a.read).length;
```

### Error 67: Not handling async activity posting
**Description:** Post activity to server
```javascript
function postActivity(activity) {
  fetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify(activity)
  });
  activities.unshift(activity);
}
```

### Error 68: Assignment instead of comparison in filter
**Description:** Filter activities with likes
```javascript
const popular = activities.filter(a => a.likes = 10);
```

### Error 69: Wrong method for activity reaction
**Description:** Toggle like on activity
```javascript
function toggleLike(activityId) {
  const activity = activities.find(a => a.id === activityId);
  activity.liked = !activity.liked;
}
```

### Error 70: Not using Number for activity count
**Description:** Display activity count
```javascript
const count = activities.length;
document.getElementById('count').textContent = 'Activities: ' + count;
```

## Issue Snippets

### Issue 1: Polling instead of WebSocket for live feed
**Description:** Get new activities
```javascript
setInterval(async () => {
  const newItems = await fetch('/api/feed/new').then(r => r.json());
  prependActivities(newItems);
}, 5000);
```

### Issue 2: Not virtualizing long feed lists
**Description:** Render all activities
```javascript
function renderFeed() {
  const container = document.getElementById('feed');
  activities.forEach(a => container.appendChild(createActivityEl(a)));
}
```

### Issue 3: Not grouping activities by time
**Description:** Show activities in flat list
```javascript
function renderActivities(activities) {
  activities.forEach(a => renderCard(a));
}
```

### Issue 4: Using index as key
**Description:** Render activity list
```javascript
activities.forEach((a, i) => {
  const el = createActivityEl(a);
  el.dataset.index = i;
  container.appendChild(el);
});
```

### Issue 5: Not using IntersectionObserver for load more
**Description:** Load more on scroll
```javascript
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    loadMoreActivities();
  }
});
```

### Issue 6: Not debouncing like/action buttons
**Description:** Handle like button click
```javascript
likeBtn.addEventListener('click', () => {
  fetch('/api/like', { method: 'POST', body: JSON.stringify({ id }) });
});
```

### Issue 7: Mutating activity objects on render
**Description:** Add display properties
```javascript
function prepareActivities(activities) {
  activities.forEach(a => {
    a.formattedTime = formatTime(a.timestamp);
  });
  return activities;
}
```

### Issue 8: Not using skeleton loading
**Description:** Show feed
```javascript
function showFeed() {
  const container = document.getElementById('feed');
  container.innerHTML = '<div class="loading">Loading...</div>';
  fetchFeed().then(data => renderFeed(data));
}
```

### Issue 9: Inefficient comment counting
**Description:** Get comment count per activity
```javascript
activities.forEach(a => {
  a.commentCount = activities.filter(x => x.parentId === a.id).length;
});
```

### Issue 10: Not collapsing duplicate activities
**Description:** Show all activities individually
```javascript
activities.forEach(a => renderCard(a));
```

### Issue 11: Not using avatars from cache
**Description:** Load user avatar for each activity
```javascript
async function renderActivity(a) {
  const avatar = await fetch(`/api/users/${a.userId}/avatar`).then(r => r.blob());
  // render
}
```

### Issue 12: Single notification sound for all activities
**Description:** Notify of new activity
```javascript
function notifyNewActivity() {
  playSound('notification.mp3');
}
```

### Issue 13: Not filtering muted users
**Description:** Display all activities
```javascript
function getFeed() {
  return activities;
}
```

### Issue 14: No distinction between activity types
**Description:** Render activity card
```javascript
function renderActivity(a) {
  return `<div>${a.user} ${a.action}</div>`;
}
```

### Issue 15: Not using optimistic UI for posting
**Description:** Post new activity
```javascript
async function postActivity(text) {
  const response = await fetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify({ message: text })
  });
  const saved = await response.json();
  prependActivity(saved);
}
```

### Issue 16: Not sanitizing user-generated HTML in activity
**Description:** Render activity content
```javascript
function renderActivityContent(text) {
  container.innerHTML = text;
}
```

### Issue 17: Not handling deleted user activities
**Description:** Display user activities
```javascript
function displayUserActivities(userId) {
  return activities.filter(a => a.userId === userId);
}
```

### Issue 18: Not debouncing activity feed refresh
**Description:** Refresh activity feed
```javascript
async function refreshFeed() {
  const data = await fetch('/api/activities');
  renderActivities(data);
}
```

### Issue 19: Not validating activity attachment types
**Description:** Upload activity attachment
```javascript
function uploadAttachment(file) {
  const formData = new FormData();
  formData.append('file', file);
  return fetch('/api/attachments', { method: 'POST', body: formData });
}
```

### Issue 20: Not handling rate limiting for posting
**Description:** Post activity to feed
```javascript
async function postActivity(content) {
  await fetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify({ content })
  });
}
```

### Issue 21: Not sorting activities by timestamp
**Description:** Get recent activities
```javascript
function getRecentActivities(limit = 10) {
  return activities.slice(0, limit);
}
```

### Issue 22: Not handling empty feed state
**Description:** Render activity feed
```javascript
function renderFeed(activities) {
  activities.forEach(a => container.appendChild(createActivityElement(a)));
}
```

### Issue 23: Not truncating long activity text
**Description:** Display activity with full text
```javascript
function renderActivity(activity) {
  const el = document.createElement('div');
  el.textContent = `${activity.user}: ${activity.text}`;
  return el;
}
```

### Issue 24: Not lazy loading activity images
**Description:** Load activity images
```javascript
function renderActivityImage(url) {
  const img = document.createElement('img');
  img.src = url;
  return img;
}
```

### Issue 25: Not persisting activity draft to localStorage
**Description:** Save draft activity
```javascript
let activityDraft = '';
```

### Issue 26: Not handling mentions in activities
**Description:** Parse mentions in activity text
```javascript
function renderWithMentions(text) {
  return text.replace(/@(\w+)/g, '<a href="/profile/$1">@$1</a>');
}
```

### Issue 27: Not validating activity visibility settings
**Description:** Set activity visibility
```javascript
function setVisibility(activityId, visibility) {
  const activity = activities.find(a => a.id === activityId);
  if (activity) activity.visibility = visibility;
}
```

### Issue 28: Not handling activity edit history
**Description:** Edit activity content
```javascript
function editActivity(id, newText) {
  const activity = activities.find(a => a.id === id);
  if (activity) activity.text = newText;
}
```

### Issue 29: Not caching user profiles in activity feed
**Description:** Load user profile for activity
```javascript
async function loadUserProfile(userId) {
  return fetch(`/api/users/${userId}`).then(r => r.json());
}
```

### Issue 30: Not implementing infinite scroll in feed
**Description:** Load more activities on scroll
```javascript
async function loadMore() {
  const data = await fetch(`/api/activities?offset=${activities.length}`);
  const newActivities = await data.json();
  renderActivities(newActivities);
}
```

## Modify Snippets

### Modify 1: Add activity type filtering
**Description:** Filter feed by activity type
```javascript
function filterByType(activities, types) {
  if (!types || types.length === 0) return activities;
  return activities.filter(a => types.includes(a.type));
}
```

### Modify 2: Add activity search
**Description:** Search activities by text
```javascript
function searchActivities(activities, query) {
  const term = query.toLowerCase();
  return activities.filter(a =>
    a.message.toLowerCase().includes(term) ||
    a.user?.name.toLowerCase().includes(term) ||
    a.target?.toLowerCase().includes(term)
  );
}
```

### Modify 3: Add activity grouping by time
**Description:** Group activities by time periods
```javascript
function groupByTime(activities) {
  const now = Date.now();
  const groups = { today: [], yesterday: [], earlier: [] };
  activities.forEach(a => {
    const diff = now - new Date(a.timestamp).getTime();
    if (diff < 86400000) groups.today.push(a);
    else if (diff < 172800000) groups.yesterday.push(a);
    else groups.earlier.push(a);
  });
  return groups;
}
```

### Modify 4: Add relative time formatting
**Description:** Show time in human-readable format
```javascript
function formatRelativeTime(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}
```

### Modify 5: Add activity interaction buttons
**Description:** Like, comment, share buttons
```javascript
function createInteractionButtons(activity) {
  const container = document.createElement('div');
  container.className = 'interactions';
  const actions = [
    { label: `Like (${activity.likes || 0})`, icon: 'heart', action: 'like' },
    { label: `Comment (${activity.commentCount || 0})`, icon: 'comment', action: 'comment' },
    { label: 'Share', icon: 'share', action: 'share' }
  ];
  actions.forEach(({ label, action }) => {
    const btn = document.createElement('button');
    btn.className = `action-${action}`;
    btn.textContent = label;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleActivityAction(activity.id, action);
    });
    container.appendChild(btn);
  });
  return container;
}
```

### Modify 6: Add activity detail expansion
**Description:** Expand activity to show details
```javascript
function toggleActivityDetail(activityId) {
  const detail = document.getElementById(`detail-${activityId}`);
  if (detail.classList.contains('hidden')) {
    const activity = activities.find(a => a.id === activityId);
    detail.innerHTML = `
      <div class="activity-detail">
        <p>${activity.message}</p>
        <p>${new Date(activity.timestamp).toLocaleString()}</p>
        ${activity.image ? `<img src="${activity.image}" />` : ''}
        ${activity.link ? `<a href="${activity.link}">View Details</a>` : ''}
      </div>
    `;
    detail.classList.remove('hidden');
  } else {
    detail.classList.add('hidden');
  }
}
```

### Modify 7: Add infinite scroll
**Description:** Load more activities on scroll
```javascript
function setupInfiniteScroll(loadFn) {
  const sentinel = document.getElementById('feed-sentinel');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadFn();
    }
  }, { rootMargin: '200px' });
  if (sentinel) observer.observe(sentinel);
  return observer;
}
```

### Modify 8: Add activity deduplication
**Description:** Remove duplicate activities
```javascript
function deduplicateActivities(activities) {
  const seen = new Set();
  return activities.filter(a => {
    const key = `${a.type}-${a.targetId}-${a.timestamp}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
```

### Modify 9: Add activity pinning
**Description:** Pin important activities to top
```javascript
function togglePin(activityId) {
  activities = activities.map(a =>
    a.id === activityId ? { ...a, pinned: !a.pinned } : a
  );
  sortAndRender();
}
function sortFeed(activities) {
  return [...activities].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}
```

### Modify 10: Add activity read status
**Description:** Track which activities are read
```javascript
function markAsRead(activityIds) {
  activities = activities.map(a =>
    activityIds.includes(a.id) ? { ...a, read: true } : a
  );
  updateUnreadBadge();
}
function getUnreadCount() {
  return activities.filter(a => !a.read).length;
}
```

### Modify 11: Add activity notification preferences
**Description:** Filter activities by notification preference
```javascript
function filterByPreference(activities, preferences) {
  return activities.filter(a => {
    if (a.type === 'mention' && !preferences.mentions) return false;
    if (a.type === 'like' && !preferences.likes) return false;
    if (a.type === 'comment' && !preferences.comments) return false;
    if (a.type === 'follow' && !preferences.follows) return false;
    return true;
  });
}
```

### Modify 12: Add activity bookmarking
**Description:** Save activities to bookmarks
```javascript
function toggleBookmark(activityId) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarkedActivities') || '[]');
  const index = bookmarks.indexOf(activityId);
  if (index === -1) bookmarks.push(activityId);
  else bookmarks.splice(index, 1);
  localStorage.setItem('bookmarkedActivities', JSON.stringify(bookmarks));
}
function getBookmarkedActivities() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedActivities') || '[]');
  return activities.filter(a => bookmarks.includes(a.id));
}
```

### Modify 13: Add activity sharing
**Description:** Share activity on social media
```javascript
function shareActivity(activityId) {
  const activity = activities.find(a => a.id === activityId);
  if (!activity) return;
  const shareData = {
    title: 'Check this out!',
    text: activity.message,
    url: `${window.location.origin}/activity/${activityId}`
  };
  if (navigator.share) {
    navigator.share(shareData);
  } else {
    navigator.clipboard.writeText(shareData.url);
    showTooltip('Link copied!');
  }
}
```

### Modify 14: Add activity analytics
**Description:** Track activity engagement
```javascript
function trackActivityEngagement(activityId, action) {
  const key = `activity_${activityId}_${action}`;
  const count = parseInt(localStorage.getItem(key) || '0');
  localStorage.setItem(key, (count + 1).toString());
}
function getActivityStats() {
  const stats = {};
  activities.forEach(a => {
    stats[a.id] = {
      likes: parseInt(localStorage.getItem(`activity_${a.id}_like`) || '0'),
      shares: parseInt(localStorage.getItem(`activity_${a.id}_share`) || '0'),
      clicks: parseInt(localStorage.getItem(`activity_${a.id}_click`) || '0')
    };
  });
  return stats;
}
```

### Modify 15: Add activity mentions
**Description:** Parse and highlight @mentions
```javascript
function parseMentions(text) {
  const mentionRegex = /@(\w+)/g;
  const mentions = [];
  let match;
  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push(match[1]);
  }
  const highlighted = text.replace(mentionRegex, '<span class="mention">@$1</span>');
  return { text: highlighted, mentions };
}
```

### Modify 16: Add activity hashtags
**Description:** Parse and link #hashtags
```javascript
function parseHashtags(text) {
  const tagRegex = /#(\w+)/g;
  const tags = [];
  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    tags.push(match[1]);
  }
  const linked = text.replace(tagRegex, '<a href="/search?tag=$1" class="hashtag">#$1</a>');
  return { html: linked, tags };
}
```

### Modify 17: Add activity sound notifications
**Description:** Play sound for new activities
```javascript
function playNotificationSound(type) {
  const sounds = {
    default: 'notification.mp3',
    mention: 'mention.mp3',
    like: 'like.mp3',
    comment: 'comment.mp3'
  };
  const soundFile = sounds[type] || sounds.default;
  const audio = new Audio(`/sounds/${soundFile}`);
  audio.volume = 0.5;
  audio.play().catch(() => {});
}
```

### Modify 18: Add activity toast notifications
**Description:** Show toast for new activity
```javascript
function showActivityToast(activity) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <img src="${activity.user?.avatar || 'default-avatar.png'}" class="toast-avatar">
    <div class="toast-content">
      <strong>${activity.user?.name || 'Unknown'}</strong>
      <p>${activity.message}</p>
    </div>
    <button class="toast-close">&times;</button>
  `;
  toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}
```

### Modify 19: Add activity undo
**Description:** Allow undoing activity actions
```javascript
let lastAction = null;
function performAction(action, ...args) {
  lastAction = { action, args, timestamp: Date.now() };
  action(...args);
}
function undoLastAction() {
  if (!lastAction) return;
  const { action, args } = lastAction;
  if (action === deleteActivity) {
    restoreActivity(args[0]);
  }
  if (action === toggleLike) {
    toggleLike(args[0]);
  }
  lastAction = null;
  showToast('Action undone');
}
```

### Modify 20: Add activity importance scoring
**Description:** Score activities by relevance
```javascript
function scoreActivity(activity, userPreferences) {
  let score = 0;
  const recency = Date.now() - new Date(activity.timestamp).getTime();
  score += Math.max(0, 100 - recency / 3600000);
  score += (activity.likes || 0) * 2;
  score += (activity.comments || 0) * 3;
  if (activity.type === 'mention') score += 50;
  if (activity.type === 'follow') score += 30;
  if (activity.user?.id === userPreferences?.closeFriend) score += 40;
  return score;
}
```

### Modify 21: Add activity scheduling
**Description:** Schedule activities for later
```javascript
function scheduleActivity(message, scheduleTime) {
  const scheduled = {
    id: Date.now().toString(36),
    message,
    scheduledTime,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  const scheduledList = JSON.parse(localStorage.getItem('scheduledActivities') || '[]');
  scheduledList.push(scheduled);
  localStorage.setItem('scheduledActivities', JSON.stringify(scheduledList));
  const delay = new Date(scheduledTime).getTime() - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      postActivity(message);
      scheduled.status = 'posted';
      localStorage.setItem('scheduledActivities', JSON.stringify(scheduledList));
    }, delay);
  }
  return scheduled;
}
```

### Modify 22: Add activity translation
**Description:** Translate activity text
```javascript
async function translateActivity(activityId, targetLang) {
  const activity = activities.find(a => a.id === activityId);
  if (!activity || !activity.message) return;
  try {
    const res = await fetch('https://api.translation.io/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: activity.message, target: targetLang })
    });
    const data = await res.json();
    const translatedActivity = { ...activity, translatedText: data.translated, originalLang: data.detectedLanguage };
    const el = document.getElementById(`activity-text-${activityId}`);
    if (el) el.textContent = data.translated;
    return translatedActivity;
  } catch (err) {
    console.warn('Translation failed');
    return activity;
  }
}
```

### Modify 23: Add activity poll/voting
**Description:** Create polls in activity feed
```javascript
function createPoll(question, options, durationHours = 24) {
  const poll = {
    id: Date.now().toString(36),
    question,
    options: options.map(text => ({ text, votes: 0 })),
    votes: {},
    expiresAt: new Date(Date.now() + durationHours * 3600000).toISOString(),
    createdAt: new Date().toISOString()
  };
  return poll;
}
function votePoll(pollId, optionIndex, userId) {
  const polls = JSON.parse(localStorage.getItem('polls') || '[]');
  const poll = polls.find(p => p.id === pollId);
  if (!poll) return;
  if (poll.votes[userId]) return { error: 'Already voted' };
  if (new Date(poll.expiresAt) < new Date()) return { error: 'Poll expired' };
  poll.options[optionIndex].votes++;
  poll.votes[userId] = optionIndex;
  localStorage.setItem('polls', JSON.stringify(polls));
  return { success: true };
}
```

### Modify 24: Add activity reaction picker
**Description:** React with emojis to activities
```javascript
function createReactionPicker(activityId) {
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
  const picker = document.createElement('div');
  picker.className = 'reaction-picker';
  reactions.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.addEventListener('click', () => addReaction(activityId, emoji));
    picker.appendChild(btn);
  });
  return picker;
}
function addReaction(activityId, emoji) {
  activities = activities.map(a => {
    if (a.id !== activityId) return a;
    const reactions = a.reactions || {};
    reactions[emoji] = (reactions[emoji] || 0) + 1;
    return { ...a, reactions };
  });
  renderActivityReactions(activityId);
}
```

### Modify 25: Add activity thread/replies
**Description:** Threaded comments on activities
```javascript
function addComment(activityId, text, parentId = null) {
  const comment = {
    id: Date.now().toString(36),
    activityId,
    parentId,
    text,
    author: { name: 'Current User', id: localStorage.getItem('userId') },
    timestamp: new Date().toISOString(),
    likes: 0
  };
  const comments = JSON.parse(localStorage.getItem('activityComments') || '[]');
  comments.push(comment);
  localStorage.setItem('activityComments', JSON.stringify(comments));
  return comment;
}
function getCommentThread(activityId) {
  const allComments = JSON.parse(localStorage.getItem('activityComments') || '[]');
  const threadComments = allComments.filter(c => c.activityId === activityId);
  const topLevel = threadComments.filter(c => !c.parentId);
  const replies = threadComments.filter(c => c.parentId);
  return topLevel.map(comment => ({
    ...comment,
    replies: replies.filter(r => r.parentId === comment.id)
  }));
}
```

### Modify 26: Add activity data export
**Description:** Export activity feed as JSON
```javascript
function exportActivityFeed() {
  const data = {
    exportedAt: new Date().toISOString(),
    totalActivities: activities.length,
    activities: activities.map(a => ({
      id: a.id,
      type: a.type,
      message: a.message,
      timestamp: a.timestamp,
      user: a.user?.name
    }))
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `activity-feed-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
```

### Modify 27: Add activity feed preferences
**Description:** Customize feed display preferences
```javascript
const feedPreferences = {
  groupByTime: true,
  showPinned: true,
  pageSize: 20,
  compactMode: false,
  excludedTypes: []
};
function saveFeedPreferences(prefs) {
  Object.assign(feedPreferences, prefs);
  localStorage.setItem('feedPreferences', JSON.stringify(feedPreferences));
  renderFeed();
}
function loadFeedPreferences() {
  const saved = localStorage.getItem('feedPreferences');
  if (saved) Object.assign(feedPreferences, JSON.parse(saved));
}
```

### Modify 28: Add activity hashtag trending
**Description:** Track trending hashtags in feed
```javascript
function getTrendingHashtags(activities, limit = 10) {
  const tagCounts = {};
  activities.forEach(a => {
    const tags = a.message?.match(/#(\w+)/g) || [];
    tags.forEach(tag => {
      const clean = tag.toLowerCase().slice(1);
      tagCounts[clean] = (tagCounts[clean] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}
```

### Modify 29: Add activity mute/snooze
**Description:** Mute specific users or activity types
```javascript
function muteUser(userId) {
  let muted = JSON.parse(localStorage.getItem('mutedUsers') || '[]');
  if (!muted.includes(userId)) muted.push(userId);
  localStorage.setItem('mutedUsers', JSON.stringify(muted));
  activities = activities.filter(a => a.user?.id !== userId);
  renderFeed();
}
function muteType(type) {
  let muted = JSON.parse(localStorage.getItem('mutedTypes') || '[]');
  if (!muted.includes(type)) muted.push(type);
  localStorage.setItem('mutedTypes', JSON.stringify(muted));
  activities = activities.filter(a => a.type !== type);
  renderFeed();
}
function getMutedContent() {
  return {
    users: JSON.parse(localStorage.getItem('mutedUsers') || '[]'),
    types: JSON.parse(localStorage.getItem('mutedTypes') || '[]')
  };
}
```

### Modify 30: Add activity scheduled summary
**Description:** Send daily/weekly activity summary
```javascript
function generateActivitySummary(period = 'daily') => {
  const now = new Date();
  const startDate = new Date(now);
  if (period === 'daily') startDate.setDate(startDate.getDate() - 1);
  if (period === 'weekly') startDate.setDate(startDate.getDate() - 7);
  if (period === 'monthly') startDate.setMonth(startDate.getMonth() - 1);
  const filtered = activities.filter(a => new Date(a.timestamp) >= startDate);
  return {
    period,
    totalActivities: filtered.length,
    byType: filtered.reduce((acc, a) => {
      acc[a.type] = (acc[a.type] || 0) + 1;
      return acc;
    }, {}),
    topUsers: [...new Set(filtered.map(a => a.user?.name).filter(Boolean))].slice(0, 5),
    topHashtags: getTrendingHashtags(filtered, 5)
  };
}
```

### Modify 31: Add activity pin/unpin
**Description:** Pin important activity to top
```javascript
function togglePin(activityId) {
  const activity = activities.find(a => a.id === activityId);
  if (!activity) return;
  if (activity.pinned) {
    activity.pinnedAt = null;
    activity.pinned = false;
  } else {
    activity.pinned = true;
    activity.pinnedAt = Date.now();
  }
  localStorage.setItem('activities', JSON.stringify(activities));
}
function getPinnedActivities() {
  return activities.filter(a => a.pinned).sort((a, b) => b.pinnedAt - a.pinnedAt);
}
```

### Modify 32: Add activity bookmark collection
**Description:** Bookmark activities to collections
```javascript
function bookmarkActivity(activityId, collection = 'default') {
  const bookmarks = JSON.parse(localStorage.getItem('activityBookmarks') || '{}');
  if (!bookmarks[collection]) bookmarks[collection] = [];
  if (!bookmarks[collection].includes(activityId)) {
    bookmarks[collection].push(activityId);
  }
  localStorage.setItem('activityBookmarks', JSON.stringify(bookmarks));
}
function getBookmarkedActivities(collection = 'default') {
  const bookmarks = JSON.parse(localStorage.getItem('activityBookmarks') || '{}');
  const ids = bookmarks[collection] || [];
  return activities.filter(a => ids.includes(a.id));
}
```

### Modify 33: Add activity trending hashtags
**Description:** Track trending hashtags
```javascript
function getTrendingHashtags(activities, limit = 10) {
  const tagCounts = {};
  activities.forEach(a => {
    const tags = a.text.match(/#\w+/g);
    if (tags) tags.forEach(t => {
      const tag = t.toLowerCase();
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}
```

### Modify 34: Add activity cross-posting
**Description:** Post activity to multiple platforms
```javascript
function crossPost(activity, platforms) {
  const results = { success: [], failed: [] };
  platforms.forEach(async platform => {
    try {
      if (platform === 'twitter') await postToTwitter(activity);
      else if (platform === 'facebook') await postToFacebook(activity);
      else if (platform === 'linkedin') await postToLinkedIn(activity);
      results.success.push(platform);
    } catch (e) {
      results.failed.push({ platform, error: e.message });
    }
  });
  return results;
}
```

### Modify 35: Add activity read receipts
**Description:** Track who has seen an activity
```javascript
function markActivityRead(activityId, userId) {
  const activity = activities.find(a => a.id === activityId);
  if (!activity) return;
  if (!activity.readBy) activity.readBy = [];
  if (!activity.readBy.includes(userId)) {
    activity.readBy.push(userId);
  }
  localStorage.setItem('activities', JSON.stringify(activities));
}
function getActivityReadCount(activityId) {
  const activity = activities.find(a => a.id === activityId);
  return activity?.readBy?.length || 0;
}
```

### Modify 36: Add activity scheduled posting
**Description:** Schedule activity for future posting
```javascript
function scheduleActivity(content, scheduledDate) {
  const scheduled = JSON.parse(localStorage.getItem('scheduledActivities') || '[]');
  scheduled.push({
    id: `SCHED-${Date.now()}`,
    content,
    scheduledDate: scheduledDate.toISOString(),
    created: new Date().toISOString(),
    status: 'pending'
  });
  localStorage.setItem('scheduledActivities', JSON.stringify(scheduled));
}
function processScheduledActivities() {
  const scheduled = JSON.parse(localStorage.getItem('scheduledActivities') || '[]');
  const now = Date.now();
  const toPost = scheduled.filter(s => s.status === 'pending' && new Date(s.scheduledDate) <= now);
  toPost.forEach(s => {
    postActivity(s.content);
    s.status = 'posted';
  });
  localStorage.setItem('scheduledActivities', JSON.stringify(scheduled));
}
```

### Modify 37: Add activity poll/voting
**Description:** Create poll in activity feed
```javascript
function createPoll(question, options, expiresIn = 86400000) {
  const poll = {
    id: `POLL-${Date.now()}`,
    question,
    options: options.map(o => ({ text: o, votes: 0 })),
    totalVotes: 0,
    expiresAt: Date.now() + expiresIn,
    created: new Date().toISOString()
  };
  const polls = JSON.parse(localStorage.getItem('activityPolls') || '[]');
  polls.push(poll);
  localStorage.setItem('activityPolls', JSON.stringify(polls));
  return poll;
}
function votePoll(pollId, optionIndex) {
  const polls = JSON.parse(localStorage.getItem('activityPolls') || '[]');
  const poll = polls.find(p => p.id === pollId);
  if (!poll || Date.now() > poll.expiresAt) return false;
  poll.options[optionIndex].votes++;
  poll.totalVotes++;
  localStorage.setItem('activityPolls', JSON.stringify(polls));
  return true;
}
```

### Modify 38: Add activity thread/reply system
**Description:** Reply to activity creating thread
```javascript
function replyToActivity(parentId, content) {
  const reply = {
    id: `REPLY-${Date.now()}`,
    parentId,
    content,
    author: currentUser,
    timestamp: new Date().toISOString(),
    likes: 0
  };
  const replies = JSON.parse(localStorage.getItem('activityReplies') || '[]');
  replies.push(reply);
  localStorage.setItem('activityReplies', JSON.stringify(replies));
  const activity = activities.find(a => a.id === parentId);
  if (activity) {
    activity.replyCount = (activity.replyCount || 0) + 1;
    localStorage.setItem('activities', JSON.stringify(activities));
  }
  return reply;
}
function getActivityThread(activityId) {
  const replies = JSON.parse(localStorage.getItem('activityReplies') || '[]');
  return replies.filter(r => r.parentId === activityId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}
```

### Modify 39: Add activity moderation queue
**Description:** Moderate flagged activities
```javascript
function flagActivity(activityId, reason) {
  const flags = JSON.parse(localStorage.getItem('flaggedActivities') || '[]');
  flags.push({
    activityId,
    reason,
    flaggedBy: currentUser,
    timestamp: new Date().toISOString(),
    resolved: false
  });
  localStorage.setItem('flaggedActivities', JSON.stringify(flags));
}
function getModerationQueue() {
  const flags = JSON.parse(localStorage.getItem('flaggedActivities') || '[]');
  const unresolved = flags.filter(f => !f.resolved);
  return unresolved.map(f => ({
    ...f,
    activity: activities.find(a => a.id === f.activityId)
  })).filter(f => f.activity);
}
function resolveFlag(flagId) {
  const flags = JSON.parse(localStorage.getItem('flaggedActivities') || '[]');
  const flag = flags.find(f => f.activityId === flagId);
  if (flag) flag.resolved = true;
  localStorage.setItem('flaggedActivities', JSON.stringify(flags));
}
```

### Modify 40: Add activity rich embed previews
**Description:** Show link preview in activity
```javascript
async function generateEmbedPreview(url) {
  try {
    const response = await fetch(`/api/embed?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return {
      title: data.title || url,
      description: data.description || '',
      image: data.image || null,
      url: url
    };
  } catch {
    return { title: url, description: '', image: null, url };
  }
}
function renderEmbedPreview(embed) {
  const el = document.createElement('div');
  el.className = 'embed-preview';
  if (embed.image) {
    const img = document.createElement('img');
    img.src = embed.image;
    img.alt = embed.title;
    el.appendChild(img);
  }
  const title = document.createElement('a');
  title.href = embed.url;
  title.target = '_blank';
  title.textContent = embed.title;
  el.appendChild(title);
  if (embed.description) {
    const desc = document.createElement('p');
    desc.textContent = embed.description;
    el.appendChild(desc);
  }
  return el;
}
```

### Modify 41: Add activity collaboration/co-authoring
**Description:** Create activity with multiple authors
```javascript
function createCollaborativeActivity(content, coAuthors) {
  const activity = {
    id: `ACT-${Date.now()}`,
    content,
    authors: [currentUser, ...coAuthors.filter(a => a !== currentUser)],
    timestamp: new Date().toISOString(),
    type: 'collaborative',
    likes: 0
  };
  activities.unshift(activity);
  localStorage.setItem('activities', JSON.stringify(activities));
  return activity;
}
```

### Modify 42: Add activity location tagging
**Description:** Tag location in activity
```javascript
function tagLocation(activityId, lat, lng, name) {
  const activity = activities.find(a => a.id === activityId);
  if (!activity) return;
  activity.location = { lat, lng, name };
  localStorage.setItem('activities', JSON.stringify(activities));
}
function getActivitiesNearLocation(lat, lng, radiusKm = 10) {
  return activities.filter(a => {
    if (!a.location) return false;
    const R = 6371;
    const dLat = (a.location.lat - lat) * Math.PI / 180;
    const dLng = (a.location.lng - lng) * Math.PI / 180;
    const a_h = Math.sin(dLat/2)**2 + Math.cos(lat * Math.PI / 180) * Math.cos(a.location.lat * Math.PI / 180) * Math.sin(dLng/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a_h), Math.sqrt(1 - a_h));
    return R * c <= radiusKm;
  });
}
```

### Modify 43: Add activity achievement badges
**Description:** Award badges for activity milestones
```javascript
function checkActivityBadges(userId) {
  const userActivities = activities.filter(a =>
    a.authors?.includes(userId) || a.userId === userId
  );
  const badges = [];
  if (userActivities.length >= 1) badges.push('first_post');
  if (userActivities.length >= 10) badges.push('regular');
  if (userActivities.length >= 100) badges.push('prolific');
  if (userActivities.filter(a => a.likes >= 10).length >= 5) badges.push('popular');
  if (getStreakDays(userId) >= 7) badges.push('streak_7');
  if (getStreakDays(userId) >= 30) badges.push('streak_30');
  localStorage.setItem(`badges_${userId}`, JSON.stringify(badges));
  return badges;
}
function getStreakDays(userId) {
  const userActivities = activities.filter(a =>
    (a.authors?.includes(userId) || a.userId === userId)
  ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  if (userActivities.length === 0) return 0;
  let streak = 1;
  for (let i = 1; i < userActivities.length; i++) {
    const diff = new Date(userActivities[i-1].timestamp) - new Date(userActivities[i].timestamp);
    if (diff <= 86400000 * 1.5) streak++;
    else break;
  }
  return streak;
}
```

### Modify 44: Add activity digest email
**Description:** Send daily digest of top activities
```javascript
function generateDigest(type = 'daily') {
  const now = Date.now();
  const cutoff = new Date(now - (type === 'daily' ? 86400000 : 604800000));
  const recent = activities.filter(a => new Date(a.timestamp) >= cutoff);
  const topByLikes = [...recent].sort((a, b) => b.likes - a.likes).slice(0, 5);
  const topByComments = [...recent].sort((a, b) => (b.replyCount || 0) - (a.replyCount || 0)).slice(0, 5);
  return {
    type,
    generated: new Date().toISOString(),
    totalActivities: recent.length,
    topPicks: [...new Set([...topByLikes, ...topByComments])].slice(0, 5),
    trending: getTrendingHashtags(recent, 5)
  };
}
```

### Modify 45: Add activity import/export
**Description:** Import and export activities
```javascript
function exportActivities(format = 'json') {
  const data = { activities, replies: JSON.parse(localStorage.getItem('activityReplies') || '[]') };
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activities-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
function importActivities(jsonData) {
  try {
    const data = JSON.parse(jsonData);
    if (data.activities) {
      const existing = activities;
      const merged = [...data.activities.filter(a => !existing.some(e => e.id === a.id)), ...existing];
      localStorage.setItem('activities', JSON.stringify(merged));
    }
    if (data.replies) {
      localStorage.setItem('activityReplies', JSON.stringify(data.replies));
    }
    return { success: true, count: data.activities?.length || 0 };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
```

### Modify 46: Add activity team/workspace
**Description:** Create team activity feed
```javascript
function createTeamWorkspace(name, members) {
  const workspace = {
    id: `WS-${Date.now()}`,
    name,
    members,
    created: new Date().toISOString(),
    createdBy: currentUser
  };
  const workspaces = JSON.parse(localStorage.getItem('activityWorkspaces') || '[]');
  workspaces.push(workspace);
  localStorage.setItem('activityWorkspaces', JSON.stringify(workspaces));
  return workspace;
}
function getTeamFeed(workspaceId) {
  const workspace = JSON.parse(localStorage.getItem('activityWorkspaces') || '[]')
    .find(w => w.id === workspaceId);
  if (!workspace) return [];
  return activities.filter(a =>
    a.authors?.some(author => workspace.members.includes(author)) ||
    workspace.members.includes(a.userId)
  );
}
```

### Modify 47: Add activity sentiment analysis
**Description:** Analyze sentiment of activity
```javascript
function analyzeSentiment(text) {
  const positive = ['great', 'awesome', 'love', 'amazing', 'fantastic', 'excellent', 'happy'];
  const negative = ['terrible', 'awful', 'hate', 'worst', 'horrible', 'bad', 'sad'];
  const words = text.toLowerCase().split(/\s+/);
  const posCount = words.filter(w => positive.includes(w)).length;
  const negCount = words.filter(w => negative.includes(w)).length;
  if (posCount > negCount) return 'positive';
  if (negCount > posCount) return 'negative';
  return 'neutral';
}
function getFeedSentiment() {
  const sentiments = activities.map(a => analyzeSentiment(a.text || a.content));
  const counts = sentiments.reduce((acc, s) => { acc[s]++; return acc; }, { positive: 0, negative: 0, neutral: 0 });
  return counts;
}
```

### Modify 48: Add activity custom themes
**Description:** Apply custom theme to activity feed
```javascript
function applyFeedTheme(theme) {
  const themes = {
    light: { bg: '#ffffff', text: '#333333', accent: '#0066cc', card: '#f5f5f5' },
    dark: { bg: '#1a1a1a', text: '#e0e0e0', accent: '#66aaff', card: '#2d2d2d' },
    sepia: { bg: '#fbf0d9', text: '#5b4636', accent: '#8b4513', card: '#efe5cd' }
  };
  const t = themes[theme] || themes.light;
  Object.entries(t).forEach(([key, val]) => {
    document.documentElement.style.setProperty(`--feed-${key}`, val);
  });
  localStorage.setItem('feedTheme', theme);
}
```

### Modify 49: Add activity real-time collaboration
**Description:** Real-time activity editing with presence
```javascript
class ActivityCollaboration {
  constructor(activityId) {
    this.activityId = activityId;
    this.presence = new Set();
    this.changes = [];
  }
  join(userId) {
    this.presence.add(userId);
    this.broadcastPresence();
  }
  leave(userId) {
    this.presence.delete(userId);
    this.broadcastPresence();
  }
  broadcastPresence() {
    const event = new CustomEvent('presenceUpdate', {
      detail: { activityId: this.activityId, users: [...this.presence] }
    });
    document.dispatchEvent(event);
  }
  applyChange(change) {
    this.changes.push({ ...change, timestamp: Date.now() });
    const event = new CustomEvent('activityChange', {
      detail: { activityId: this.activityId, change }
    });
    document.dispatchEvent(event);
  }
  getPresenceCount() { return this.presence.size; }
}
```

### Modify 50: Add activity recommender system
**Description:** Recommend activities based on user preferences
```javascript
function getRecommendedActivities(userId, limit = 10) {
  const userActivity = activities.filter(a =>
    a.authors?.includes(userId) || a.userId === userId
  );
  const likedTags = userActivity.flatMap(a => (a.text || a.content || '').match(/#\w+/g) || [])
    .reduce((acc, t) => { acc[t.toLowerCase()]++; return acc; }, {});
  const topTags = Object.entries(likedTags).sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => e[0]);
  const scored = activities
    .filter(a => !(a.authors?.includes(userId) || a.userId === userId))
    .map(a => {
      const tags = (a.text || a.content || '').match(/#\w+/g) || [];
      const tagScore = tags.filter(t => topTags.includes(t.toLowerCase())).length;
      const recencyScore = Math.max(0, 1 - (Date.now() - new Date(a.timestamp)) / (7 * 86400000));
      const popularityScore = Math.min(1, (a.likes || 0) / 100);
      return { activity: a, score: tagScore * 2 + recencyScore * 0.5 + popularityScore };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored;
}
```
