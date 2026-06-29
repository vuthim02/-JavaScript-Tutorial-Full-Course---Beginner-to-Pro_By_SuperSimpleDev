# Projects 4-5

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Project 4: Statistics Calculator

```javascript
function createStatsCalculator() {
    return {
        sum(numbers) {
            return numbers.reduce((acc, n) => acc + n, 0);
        },

        average(numbers) {
            if (numbers.length === 0) return 0;
            return this.sum(numbers) / numbers.length;
        },

        min(numbers) {
            return Math.min(...numbers);
        },

        max(numbers) {
            return Math.max(...numbers);
        },

        range(numbers) {
            return this.max(numbers) - this.min(numbers);
        },

        median(numbers) {
            const sorted = [...numbers].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            if (sorted.length % 2 === 0) {
                return (sorted[mid - 1] + sorted[mid]) / 2;
            }
            return sorted[mid];
        },

        mode(numbers) {
            const counts = numbers.reduce((acc, n) => {
                acc[n] = (acc[n] || 0) + 1;
                return acc;
            }, {});

            const maxCount = Math.max(...Object.values(counts));
            return Object.entries(counts)
                .filter(([_, count]) => count === maxCount)
                .map(([num]) => Number(num));
        },

        variance(numbers) {
            const avg = this.average(numbers);
            return numbers.reduce((acc, n) => acc + (n - avg) ** 2, 0) / numbers.length;
        },

        stdDev(numbers) {
            return Math.sqrt(this.variance(numbers));
        },

        allStats(numbers) {
            return {
                sum: this.sum(numbers),
                average: this.average(numbers),
                min: this.min(numbers),
                max: this.max(numbers),
                range: this.range(numbers),
                median: this.median(numbers),
                mode: this.mode(numbers),
                variance: this.variance(numbers),
                stdDev: this.stdDev(numbers),
                count: numbers.length
            };
        }
    };
}

const stats = createStatsCalculator();
const data = [1, 2, 2, 3, 4, 4, 4, 5, 6, 7];
console.log(stats.allStats(data));
```

## Project 5: Immutable Todo List

```javascript
function createTodoApp() {
    let todos = [];

    return {
        addTodo(text) {
            const newTodo = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            todos = [...todos, newTodo];
            return todos;
        },

        toggleTodo(id) {
            todos = todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            return todos;
        },

        updateText(id, text) {
            todos = todos.map(todo =>
                todo.id === id ? { ...todo, text } : todo
            );
            return todos;
        },

        removeTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            return todos;
        },

        clearCompleted() {
            todos = todos.filter(todo => !todo.completed);
            return todos;
        },

        getActive() {
            return todos.filter(todo => !todo.completed);
        },

        getCompleted() {
            return todos.filter(todo => todo.completed);
        },

        getStats() {
            return {
                total: todos.length,
                active: this.getActive().length,
                completed: this.getCompleted().length
            };
        },

        getAllTodos() {
            return [...todos]; // immutable — return copy
        }
    };
}
```
## Next Steps

[Back to Chapter 20](20-projects-part1.md): Projects 1-3
[Proceed to Chapter 22](22-array-methods-extra.md): Extra Array Methods: `forEach`, `flat`, `flatMap`, `at` to learn about extra array methods: `foreach`, `flat`, `flatmap`, `at`.
