# Facade Pattern

## What Problem It Solves

A complex subsystem with many classes and interactions is hard to use. A *facade* provides a simple, unified interface to the subsystem.

## Implementation

```javascript
// Complex subsystem
class CPU {
    freeze() { console.log("CPU frozen"); }
    jump(position) { console.log(`CPU jumping to ${position}`); }
    execute() { console.log("CPU executing"); }
}

class Memory {
    load(position, data) { console.log(`Memory loading "${data}" at ${position}`); }
}

class HardDrive {
    read(lba, size) { return `data_from_sector_${lba}`; }
}

// Facade
class ComputerFacade {
    constructor() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    start() {
        this.cpu.freeze();
        this.memory.load(0, this.hardDrive.read(0, 1024));
        this.cpu.jump(0);
        this.cpu.execute();
        console.log("Computer started successfully");
    }
}

const computer = new ComputerFacade();
computer.start();
// CPU frozen
// Memory loading "data_from_sector_0" at 0
// CPU jumping to 0
// CPU executing
// Computer started successfully
```

## Real-World Use Case

JavaScript libraries like jQuery are facades over the DOM API. Axios is a facade over XMLHttpRequest or `fetch`.

```javascript
class DOMManipulator {
    constructor(selector) { this.element = document.querySelector(selector); }

    hide() { this.element.style.display = "none"; return this; }
    show() { this.element.style.display = ""; return this; }

    text(content) {
        if (content === undefined) return this.element.textContent;
        this.element.textContent = content;
        return this;
    }

    on(event, handler) { this.element.addEventListener(event, handler); return this; }

    attr(name, value) {
        if (value === undefined) return this.element.getAttribute(name);
        this.element.setAttribute(name, value);
        return this;
    }
}

const title = new DOMManipulator("#title");
title.text("Hello").show().on("click", () => console.log("Clicked!"));
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How is Facade different from Adapter? |
| 2 | Does Facade hide the subsystem or just simplify it? |
| 3 | When should you create multiple facades for the same subsystem? |
| 4 | How does Facade affect testability? |
## Next Steps

[Back to Chapter 7](07-decorator.md): Decorator Pattern
[Proceed to Chapter 9](09-proxy.md): Proxy Pattern to learn about proxy pattern.
