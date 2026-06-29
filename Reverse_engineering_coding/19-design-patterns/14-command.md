# Command Pattern

<img src="https://media.giphy.com/media/MdA16VIoXKKxNE8Stk/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Problem It Solves

You need to parameterize objects with operations, queue operations, support undo/redo, or log changes. The Command pattern turns a request into a standalone object.

## Implementation

```javascript
// Receiver
class TextEditor {
    constructor() { this.content = ""; }

    insert(text, position = this.content.length) {
        const before = this.content.slice(0, position);
        const after = this.content.slice(position);
        this.content = before + text + after;
    }

    delete(start, end) {
        const before = this.content.slice(0, start);
        const after = this.content.slice(end);
        this.content = before + after;
    }

    getContent() { return this.content; }
}

// Command interface
class Command {
    execute() { throw new Error("Must implement execute()"); }
    undo() { throw new Error("Must implement undo()"); }
}

// Concrete commands
class InsertCommand extends Command {
    constructor(editor, text, position) {
        super();
        this.editor = editor;
        this.text = text;
        this.position = position;
    }

    execute() { this.editor.insert(this.text, this.position); }
    undo() { this.editor.delete(this.position, this.position + this.text.length); }
}

class DeleteCommand extends Command {
    constructor(editor, start, end) {
        super();
        this.editor = editor;
        this.start = start;
        this.end = end;
        this.deletedText = "";
    }

    execute() {
        this.deletedText = this.editor.getContent().slice(this.start, this.end);
        this.editor.delete(this.start, this.end);
    }

    undo() { this.editor.insert(this.deletedText, this.start); }
}

// Invoker
class CommandHistory {
    constructor() { this.history = []; this.index = -1; }

    execute(command) {
        command.execute();
        this.history = this.history.slice(0, this.index + 1);
        this.history.push(command);
        this.index++;
    }

    undo() { if (this.index >= 0) { this.history[this.index].undo(); this.index--; } }

    redo() {
        if (this.index < this.history.length - 1) {
            this.index++;
            this.history[this.index].execute();
        }
    }
}

const editor = new TextEditor();
const history = new CommandHistory();
history.execute(new InsertCommand(editor, "Hello", 0));
history.execute(new InsertCommand(editor, " World", 5));
console.log(editor.getContent()); // "Hello World"
history.undo();
console.log(editor.getContent()); // "Hello"
history.redo();
console.log(editor.getContent()); // "Hello World"
```

## Command with Functions

JavaScript's first-class functions make Command trivially simple:

```javascript
function createCommand(execute, undo) {
    return { execute, undo };
}

const commands = [];
const history2 = {
    execute(command) { command.execute(); commands.push(command); },
    undo() { const cmd = commands.pop(); if (cmd) cmd.undo(); }
};

const addFive = createCommand(
    () => { value += 5; },
    () => { value -= 5; }
);

let value = 10;
history2.execute(addFive);
console.log(value); // 15
history2.undo();
console.log(value); // 10
```

## Real-World Use Case

Redux actions and reducers are a Command pattern variant. `git` operations are commands with undo/redo. Text editors use Command patterns for every operation.

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does the Command pattern enable undo/redo? |
| 2 | What is the relationship between Command and Strategy? |
| 3 | How would you persist commands for crash recovery? |
| 4 | When is the Command pattern over-engineering? |
## Next Steps

[Back to Chapter 13](13-mediator.md): Mediator Pattern
[Proceed to Chapter 15](15-strategy.md): Strategy Pattern to learn about strategy pattern.
