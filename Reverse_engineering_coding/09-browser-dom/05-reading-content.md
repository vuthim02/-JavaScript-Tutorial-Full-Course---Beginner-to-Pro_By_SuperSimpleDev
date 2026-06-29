# Reading Content

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## textContent

Gets or sets the **text** content of an element (ignores HTML tags).

HTML:

```html
<h1>Hello</h1>
```

Read:

```javascript
element.textContent
```

Output: `Hello`

HTML with nested tags:

```html
<div>
    <b>Hello</b>
</div>
```

```javascript
console.log(div.textContent);
// "Hello" (tags removed, only text)
```

---

## innerText vs textContent

```html
<div>
  <span style="display: none;">Hidden</span>
  Visible
</div>
```

```javascript
console.log(element.textContent); // " Hidden\n  Visible" (includes hidden text)
console.log(element.innerText);   // "Visible" (respects CSS, excludes hidden)
```

| Property | Includes hidden text | Includes spacing | Triggers reflow |
|----------|---------------------|------------------|-----------------|
| `textContent` | Yes | Yes | No |
| `innerText` | No | Normalized | Yes (slower) |

---

## innerHTML

Gets or sets HTML markup (including tags).

HTML:

```html
<div>
    <b>Hello</b>
</div>
```

```javascript
console.log(div.innerHTML);
// "<b>Hello</b>"
```

---

## outerHTML

Gets or sets the element **including itself**.

```html
<div id="box"><b>Hello</b></div>
```

```javascript
console.log(box.outerHTML);
// '<div id="box"><b>Hello</b></div>'

box.outerHTML = "<p>Replaced</p>";
// The div is GONE from the DOM, replaced by p
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Plain text? | Use `textContent` (faster, safer). |
| HTML markup? | Use `innerHTML` (but beware of XSS). |
| What is the difference between `textContent` and `innerText`? | `innerText` respects CSS (slower). `textContent` returns all text (faster). |
| Is `innerHTML` safe? | Only if the content is trusted. User input in `innerHTML` = XSS vulnerability. |
## Next Steps

[Back to Chapter 4](04-selecting-elements.md): Selecting Elements
[Proceed to Chapter 6](06-modifying-content.md): Modifying Content to learn about modifying content.
