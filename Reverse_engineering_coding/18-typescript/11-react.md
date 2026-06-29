# TypeScript with React

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Typing Props

```typescript
import { ReactNode } from "react";

interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    onClick: () => void;
    children?: ReactNode;
}

function Button({ label, variant = "primary", disabled = false, onClick, children }: ButtonProps) {
    return (
        <button className={`btn btn-${variant}`} disabled={disabled} onClick={onClick}>
            {label}
            {children}
        </button>
    );
}
```

## useState

TypeScript infers state type from initial value:

```typescript
const [count, setCount] = useState(0);            // type: number
const [name, setName] = useState("");              // type: string
const [items, setItems] = useState<string[]>([]);  // type: string[]

// Union state
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

// Complex state
interface UserState { id: number; name: string; email: string; }
const [user, setUser] = useState<UserState | null>(null);

// Functional update preserves type safety
setCount(prev => prev + 1); // prev is number
```

## useRef

```typescript
import { useRef, useEffect } from "react";

// DOM element ref
function Input() {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { inputRef.current?.focus(); }, []);
    return <input ref={inputRef} type="text" />;
}

// Mutable value ref (not DOM)
function Timer() {
    const countRef = useRef(0);
    useEffect(() => { countRef.current += 1; }); // no re-render
}
```

## Event Handlers

```typescript
import { ChangeEvent, FormEvent, MouseEvent, KeyboardEvent } from "react";

function Form() {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }
    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        console.log(event.clientX, event.clientY);
    }
    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") { /* submit */ }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} />
            <button onClick={handleClick}>Submit</button>
        </form>
    );
}
```

## Typing Children

```typescript
import { ReactNode, ReactElement } from "react";

// Most permissive
interface ContainerProps {
    children: ReactNode; // anything renderable
}

// Single React element
interface SingleChildProps {
    children: ReactElement;
}

// Render function (render props)
interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
    return <ul>{items.map((item, i) => <li key={i}>{renderItem(item, i)}</li>)}</ul>;
}
```

## Generic Components

```typescript
interface SelectProps<T> {
    items: T[];
    selectedItem: T | null;
    onSelect: (item: T) => void;
    getLabel: (item: T) => string;
}

function Select<T>({ items, selectedItem, onSelect, getLabel }: SelectProps<T>) {
    return (
        <select value={selectedItem ? getLabel(selectedItem) : ""}
            onChange={(e) => {
                const item = items.find(i => getLabel(i) === e.target.value);
                if (item) onSelect(item);
            }}
        >
            {items.map((item, i) => (
                <option key={i} value={getLabel(item)}>{getLabel(item)}</option>
            ))}
        </select>
    );
}

// Usage with inference
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
<Select
    items={users}
    selectedItem={null}
    onSelect={(user) => console.log(user.name)} // user inferred
    getLabel={(user) => user.name}
/>
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How are props typed? | Using an interface or type for the props parameter |
| How is state typed? | Inferred from `useState(initial)` or explicit generic |
| How is a ref typed? | `useRef<HTMLInputElement>(null)` for DOM refs |
| How are event handlers typed? | React event types: `ChangeEvent`, `MouseEvent`, etc. |
| What type is `children`? | `ReactNode` for most cases |
## Next Steps

[Back to Chapter 10](10-declaration-files.md): Declaration Files and DefinitelyTyped
[Proceed to Chapter 12](12-node-express.md): TypeScript with Node.js / Express to learn about typescript with node.js / express.
