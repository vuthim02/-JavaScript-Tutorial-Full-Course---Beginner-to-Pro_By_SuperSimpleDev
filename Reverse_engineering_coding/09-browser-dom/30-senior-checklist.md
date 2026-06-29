# Senior Reverse Engineering Checklist

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


Whenever reading browser code, ask these questions.

---

### Which element is selected?

Check the selector: `#id`, `.class`, `[attribute]`, tag.

---

### How was it found?

`getElementById`, `querySelector`, `getElementsByClassName`. Legacy methods are slower.

---

### Who created it?

Parsed from HTML? Created by `createElement`? Cloned? innerHTML?

---

### Which event triggers execution?

Click? Load? Input? Scroll? Custom event?

---

### Is bubbling involved?

Could `stopPropagation` affect other listeners? Is delegation used?

---

### Does event delegation exist?

Is there one listener on a parent instead of many on children?

---

### Does DOM change?

Is there a MutationObserver? Does the element get removed/replaced?

---

### Is layout recalculated?

Changing width/height/margin/padding triggers reflow. Check for performance issues.

---

### Is data persistent?

localStorage (permanent), sessionStorage (tab), cookie (server), or in-memory (volatile)?

---

### Which storage mechanism is used?

Check for `localStorage`, `sessionStorage`, `document.cookie`, `indexedDB`.

---

### Is network request involved?

`fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `Service Worker`.

---

### Which browser API provides functionality?

`navigator.geolocation`, `navigator.clipboard`, `IntersectionObserver`, `ResizeObserver`.
## Next Steps

[Back to Chapter 29](29-mutationobserver.md): MutationObserver
[Proceed to Chapter 31](31-projects.md): Projects to learn about projects.
