# Canvas API

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Drawing Graphics Programmatically

The `<canvas>` element provides a bitmap drawing surface controlled by JavaScript.

```html
<canvas id="myCanvas" width="800" height="600"></canvas>
```

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
```

## Basic Drawing

```javascript
// Rectangle
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 50);        // Filled rectangle

ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctx.strokeRect(10, 10, 100, 50);       // Outlined rectangle

// Clear
ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas
```

## Paths and Shapes

```javascript
// Line
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
ctx.lineTo(200, 150);
ctx.closePath();
ctx.stroke();                          // Draw outline
ctx.fill();                            // Fill shape

// Circle
ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
ctx.fillStyle = "green";
ctx.fill();

// Arc (partial circle)
ctx.beginPath();
ctx.arc(150, 150, 40, 0, Math.PI);     // Half circle
ctx.stroke();
```

## Text

```javascript
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Hello Canvas", 50, 100);  // Filled text

ctx.strokeStyle = "red";
ctx.strokeText("Hello Canvas", 50, 150); // Outlined text

// Text alignment
ctx.textAlign = "center";               // "left", "center", "right"
ctx.textBaseline = "middle";            // "top", "middle", "bottom"
ctx.fillText("Centered", 400, 300);
```

## Images

```javascript
const img = new Image();
img.src = "image.png";
img.onload = () => {
    ctx.drawImage(img, 0, 0);                          // At (0,0)
    ctx.drawImage(img, 50, 50, 200, 150);              // Scaled
    ctx.drawImage(img, 0, 0, 100, 75, 50, 50, 200, 150); // Cropped
};
```

## Colors and Styles

```javascript
// Fill and stroke colors
ctx.fillStyle = "#FF0000";
ctx.fillStyle = "rgb(255, 0, 0)";
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillStyle = "hsl(0, 100%, 50%)";

// Gradients
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(1, "blue");
ctx.fillStyle = gradient;

// Shadows
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
```

## Animation Loop

```javascript
let x = 0;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw moving circle
    ctx.beginPath();
    ctx.arc(x, 300, 30, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    x += 2;
    if (x > canvas.width) x = 0;

    requestAnimationFrame(animate);
}

animate();
```

## Saving and Restoring State

```javascript
ctx.save();                              // Save current state
ctx.translate(100, 100);                 // Move origin
ctx.rotate(Math.PI / 4);                 // Rotate 45 degrees
ctx.scale(2, 2);                         // Scale 2x
ctx.fillRect(-25, -25, 50, 50);          // Draw at new origin
ctx.restore();                           // Restore original state
```

## Converting to Image/Blob

```javascript
// To data URL
const dataUrl = canvas.toDataURL("image/png");
console.log(dataUrl); // "data:image/png;base64,..."

// To blob
canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = url;
    document.body.appendChild(img);
}, "image/jpeg", 0.8);  // Format, quality
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is Canvas being used? | Check for `<canvas>` element and `getContext("2d")`. |
| What is being drawn? | Analyze `fillRect`, `arc`, `drawImage` calls to understand the drawing. |
| Is there an animation loop? | Look for `requestAnimationFrame` or `setInterval` calling canvas operations. |
| How to capture canvas content? | Use `canvas.toDataURL()` or `canvas.toBlob()`. |
## Next Steps

[Back to Chapter 37](37-websocket.md): WebSocket
[Proceed to Chapter 39](39-web-components.md): Web Components to learn about web components.
