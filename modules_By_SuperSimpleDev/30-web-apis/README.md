# Module 30: Web APIs

**Duration:** ~50 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand modern browser APIs
- Use IntersectionObserver for lazy loading
- Implement MutationObserver for DOM changes
- Work with Web Workers for parallel processing
- Use Geolocation API
- Implement Drag and Drop API

## IntersectionObserver

Detect when elements enter/leave viewport.

### Basic Usage

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible:', entry.target);
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
});

// Observe elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### Lazy Loading Images

```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'  // Start loading 50px before visible
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

### Infinite Scroll

```javascript
const loadMoreObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMorePosts();
  }
}, { threshold: 0.1 });

loadMoreObserver.observe(document.querySelector('#load-more'));
```

## MutationObserver

Watch for DOM changes.

### Basic Usage

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('Type:', mutation.type);
    
    if (mutation.type === 'childList') {
      console.log('Added nodes:', mutation.addedNodes);
      console.log('Removed nodes:', mutation.removedNodes);
    }
    
    if (mutation.type === 'attributes') {
      console.log('Attribute changed:', mutation.attributeName);
    }
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  attributes: true,
  subtree: true
});

// Stop observing
observer.disconnect();
```

### Dynamic Content Detection

```javascript
const contentObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Initialize any new elements
        if (node.matches('.auto-init')) {
          initializeComponent(node);
        }
      }
    }
  }
});

contentObserver.observe(document.body, {
  childList: true,
  subtree: true
});
```

## Web Workers

Run JavaScript in background threads.

### Basic Worker

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: [1, 2, 3, 4, 5] });

worker.onmessage = (event) => {
  console.log('Result:', event.data);
};

worker.onerror = (error) => {
  console.error('Worker error:', error);
};

// worker.js
self.onmessage = (event) => {
  const { data } = event.data;
  
  // Heavy computation
  const result = data.reduce((sum, n) => sum + n, 0);
  
  self.postMessage(result);
};
```

### Worker Pool

```javascript
class WorkerPool {
  constructor(workerScript, poolSize = 4) {
    this.workers = [];
    this.queue = [];
    
    for (let i = 0; i < poolSize; i++) {
      this.workers.push({
        worker: new Worker(workerScript),
        busy: false
      });
    }
  }
  
  runTask(data) {
    return new Promise((resolve, reject) => {
      const available = this.workers.find(w => !w.busy);
      
      if (available) {
        available.busy = true;
        available.worker.onmessage = (e) => {
          available.busy = false;
          resolve(e.data);
        };
        available.worker.postMessage(data);
      } else {
        this.queue.push({ data, resolve, reject });
      }
    });
  }
}

// Usage
const pool = new WorkerPool('worker.js');
const result = await pool.runTask({ numbers: [1, 2, 3, 4, 5] });
```

## Geolocation API

Get user's location.

```javascript
// Get current position
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log('Latitude:', position.coords.latitude);
    console.log('Longitude:', position.coords.longitude);
    console.log('Accuracy:', position.coords.accuracy);
  },
  (error) => {
    console.error('Error:', error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
);

// Watch position changes
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log('Location updated:', position.coords);
  },
  (error) => {
    console.error('Error:', error);
  }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

### Distance Calculator

```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in km
}
```

## Drag and Drop API

### Basic Implementation

```html
<div class="draggable" draggable="true" id="drag1">Drag me</div>
<div class="dropzone" id="drop1">Drop here</div>
```

```javascript
const draggable = document.getElementById('drag1');
const dropzone = document.getElementById('drop1');

draggable.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add('dragging');
});

draggable.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('drag-over');
});

dropzone.addEventListener('dragleave', (e) => {
  dropzone.classList.remove('drag-over');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const element = document.getElementById(id);
  dropzone.appendChild(element);
  dropzone.classList.remove('drag-over');
});
```

### Sortable List

```javascript
class SortableList {
  constructor(container) {
    this.container = container;
    this.draggedItem = null;
    
    this.init();
  }
  
  init() {
    this.container.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('sortable-item')) {
        this.draggedItem = e.target;
        e.target.classList.add('dragging');
      }
    });
    
    this.container.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('sortable-item')) {
        e.target.classList.remove('dragging');
        this.draggedItem = null;
      }
    });
    
    this.container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(e.clientY);
      
      if (afterElement) {
        this.container.insertBefore(this.draggedItem, afterElement);
      } else {
        this.container.appendChild(this.draggedItem);
      }
    });
  }
  
  getDragAfterElement(y) {
    const items = [...this.container.querySelectorAll('.sortable-item:not(.dragging)')];
    
    return items.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}
```

## Clipboard API

### Copy to Clipboard

```javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied!');
  } catch (error) {
    console.error('Failed to copy:', error);
  }
}

// Usage
copyToClipboard('Hello, World!');
```

### Read from Clipboard

```javascript
async function readClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Clipboard:', text);
  } catch (error) {
    console.error('Failed to read:', error);
  }
}
```

## Notification API

```javascript
// Request permission
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Send notification
function sendNotification(title, options = {}) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon.png',
      badge: '/badge.png',
      ...options
    });
  }
}

// Usage
if (await requestNotificationPermission()) {
  sendNotification('Hello!', {
    body: 'You have a new message',
    tag: 'message'
  });
}
```

## Web Storage API

### Cache API (Service Workers)

```javascript
// Cache responses
async function cacheResponse(url, response) {
  const cache = await caches.open('v1');
  await cache.put(url, response);
}

// Fetch from cache
async function fetchFromCache(url) {
  const cache = await caches.open('v1');
  const response = await cache.match(url);
  return response;
}
```

## Practice Exercises

### Exercise 30.1: Lazy Loading Gallery
Create an image gallery that loads images as they scroll into view.

### Exercise 30.2: Sortable Task Board
Build a Trello-like board with drag and drop.

### Exercise 30.3: Location Tracker
Implement a location tracker that shows distance traveled.

## Summary

- IntersectionObserver: detect element visibility
- MutationObserver: watch DOM changes
- Web Workers: background processing
- Geolocation: get user location
- Drag and Drop: implement dragging
- Clipboard: copy/paste functionality
- Notifications: desktop notifications
- These APIs enhance user experience

## Previous

[Proceed to Module 29](../29-security-basics/README.md)

## Congratulations!

You've completed all 30 modules! You now have comprehensive JavaScript knowledge.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
