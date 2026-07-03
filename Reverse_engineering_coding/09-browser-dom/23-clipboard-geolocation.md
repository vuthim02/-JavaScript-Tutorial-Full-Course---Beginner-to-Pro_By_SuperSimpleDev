# Clipboard API

## Copying to Clipboard

```javascript
navigator.clipboard.writeText()
```

```javascript
navigator.clipboard.writeText("Hello, world!")
    .then(() => console.log("Copied!"))
    .catch(err => console.error("Copy failed:", err));

// Async/await:
async function copy(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error("Copy failed:", err);
    }
}
```

---

## Reading from Clipboard

```javascript
navigator.clipboard.readText()
```

```javascript
navigator.clipboard.readText()
    .then(text => console.log("Pasted:", text))
    .catch(err => console.error("Read failed:", err));
```

---

## Copying Images and Rich Content

```javascript
async function copyImage() {
    const canvas = document.getElementById("myCanvas");
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    
    await navigator.clipboard.write([
        new ClipboardItem({
            "image/png": blob
        })
    ]);
}
```

---

## Permissions

```javascript
// Clipboard API requires:
// 1. HTTPS (or localhost)
// 2. User gesture (click, keypress) for write
// 3. Permission for read
```

---

# Geolocation

## Getting Position

```javascript
navigator.geolocation.getCurrentPosition()
```

```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
        console.log("Accuracy:", position.coords.accuracy, "meters");
    },
    (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied permission");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Position unavailable");
                break;
            case error.TIMEOUT:
                console.error("Request timed out");
                break;
        }
    },
    {
        enableHighAccuracy: true,  // Use GPS if available (slower, more battery)
        timeout: 10000,            // Max wait (ms)
        maximumAge: 60000          // Accept cached position up to 1 min old
    }
);
```

---

## Watching Position

```javascript
const watchId = navigator.geolocation.watchPosition(
    (position) => {
        console.log("New position:", position.coords);
        updateMap(position.coords.latitude, position.coords.longitude);
    },
    (error) => console.error(error),
    { enableHighAccuracy: true }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

---

## Position Object

```javascript
position.coords.latitude       // Latitude (degrees)
position.coords.longitude      // Longitude (degrees)
position.coords.accuracy       // Accuracy (meters)
position.coords.altitude       // Altitude (meters above sea level)
position.coords.altitudeAccuracy // Altitude accuracy
position.coords.heading        // Direction (degrees clockwise from North)
position.coords.speed          // Speed (meters/second)
position.timestamp             // When position was acquired
```
## Next Steps

[Back to Chapter 22](22-navigator-screen.md): Navigator Object
[Proceed to Chapter 24](24-drag-and-drop.md): Drag and Drop to learn about drag and drop.
