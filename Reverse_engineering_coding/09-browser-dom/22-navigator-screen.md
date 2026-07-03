# Navigator Object

## Browser Information

```javascript
navigator.userAgent       // Browser identification string
navigator.language        // Browser language ("en-US")
navigator.languages       // Array of preferred languages
navigator.platform        // OS ("Win32", "MacIntel", "Linux x86_64")
navigator.onLine          // Is the browser online?
navigator.cookieEnabled   // Are cookies enabled?
```

---

## User Agent Parsing (Caution)

```javascript
// User agent is unreliable (can be spoofed)
console.log(navigator.userAgent);
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ..."

// Use feature detection instead of browser detection:
if ("geolocation" in navigator) {
    // Use geolocation
} else {
    // Fallback
}
```

---

## Device Capabilities

```javascript
// Battery (deprecated in some browsers)
navigator.getBattery().then(battery => {
    console.log(battery.level);       // 0.85 (85%)
    console.log(battery.charging);    // true/false
});

// Connection
const connection = navigator.connection;
if (connection) {
    console.log(connection.effectiveType); // "4g", "3g", "2g", "slow-2g"
    console.log(connection.downlink);      // Mbps
}

// Memory
console.log(navigator.deviceMemory); // 4, 8 (GB, approximate)
```

---

## Permissions

```javascript
navigator.permissions.query({ name: "geolocation" }).then(result => {
    console.log(result.state); // "granted", "denied", "prompt"
    
    result.onchange = () => {
        console.log("Permission changed to:", result.state);
    };
});
```

---

# Screen Object

## Display Information

```javascript
screen.width        // Total screen width (px)
screen.height       // Total screen height (px)
screen.availWidth   // Available width (minus taskbar)
screen.availHeight  // Available height (minus taskbar)
screen.colorDepth   // Color depth (24, 32)
screen.pixelDepth   // Pixel depth
screen.orientation  // Screen orientation object
```

---

## Orientation

```javascript
console.log(screen.orientation.type);
// "portrait-primary", "landscape-primary"

// Lock orientation (requires fullscreen)
screen.orientation.lock("landscape").catch(err => console.warn(err));

// Unlock
screen.orientation.unlock();

// Listen for changes
screen.orientation.addEventListener("change", () => {
    console.log("Orientation changed:", screen.orientation.type);
});
```

---

## Window vs Screen

```javascript
// Viewport (visible document area)
window.innerWidth    // Content area width
window.innerHeight   // Content area height

// Browser window
window.outerWidth    // Entire browser window width
window.outerHeight   // Entire browser window height

// Display
screen.width         // Physical monitor width
screen.height        // Physical monitor height
```
## Next Steps

[Back to Chapter 21](21-location-history.md): Location Object
[Proceed to Chapter 23](23-clipboard-geolocation.md): Clipboard API to learn about clipboard api.
