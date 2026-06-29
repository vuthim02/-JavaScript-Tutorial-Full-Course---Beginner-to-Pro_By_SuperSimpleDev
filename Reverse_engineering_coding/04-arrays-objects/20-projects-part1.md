# Projects 1-3

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Project 1: Student Management System

```javascript
function createStudentManager() {
    const students = [];

    return {
        addStudent(student) {
            if (!student.name || typeof student.age !== "number" || !student.grade) {
                throw new Error("Invalid student data");
            }
            students.push({ ...student, id: Date.now() });
        },

        removeStudent(id) {
            const index = students.findIndex(s => s.id === id);
            if (index === -1) throw new Error("Student not found");
            students.splice(index, 1);
        },

        findByName(name) {
            return students.filter(s =>
                s.name.toLowerCase().includes(name.toLowerCase())
            );
        },

        filterByGrade(minGrade) {
            return students.filter(s => s.grade >= minGrade);
        },

        getAverageAge() {
            if (students.length === 0) return 0;
            return students.reduce((sum, s) => sum + s.age, 0) / students.length;
        },

        sortByGrade(direction = "desc") {
            return [...students].sort((a, b) =>
                direction === "desc" ? b.grade - a.grade : a.grade - b.grade
            );
        },

        getSummary() {
            return {
                total: students.length,
                averageGrade: students.reduce((s, n) => s + n.grade, 0) / students.length || 0,
                oldest: students.reduce((max, s) => s.age > max.age ? s : max, students[0]),
                youngest: students.reduce((min, s) => s.age < min.age ? s : min, students[0])
            };
        },

        getAllStudents() {
            return [...students]; // return copy to prevent external mutation
        }
    };
}

// Usage
const manager = createStudentManager();
manager.addStudent({ name: "Alice", age: 20, grade: 85 });
manager.addStudent({ name: "Bob", age: 22, grade: 72 });
manager.addStudent({ name: "Charlie", age: 19, grade: 91 });
console.log(manager.getSummary());
```

## Project 2: Shopping Cart

```javascript
function createCart() {
    let items = [];

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, quantity) {
            const item = items.find(item => item.id === productId);
            if (!item) throw new Error("Item not found");
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
            }
        },

        getTotal() {
            return items.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },

        applyDiscount(percent) {
            const factor = 1 - percent / 100;
            return items.map(item => ({
                ...item,
                price: item.price * factor
            }));
        },

        getItems() {
            return [...items]; // defensive copy
        },

        clear() {
            items = [];
        }
    };
}

const cart = createCart();
cart.addItem({ id: 1, name: "Laptop", price: 1200 }, 1);
cart.addItem({ id: 2, name: "Mouse", price: 25 }, 2);
console.log(`Total: $${cart.getTotal()}`);  // Total: $1250
console.log(`Items: ${cart.getItemCount()}`); // Items: 3
```

## Project 3: Inventory System with Object Operations

```javascript
function createInventory() {
    let stock = {};

    return {
        addItem(sku, item) {
            stock[sku] = { ...item, sku };
        },

        updateStock(sku, quantity) {
            if (!stock[sku]) throw new Error(`SKU ${sku} not found`);
            stock[sku].quantity = quantity;
            return stock[sku];
        },

        getItem(sku) {
            return stock[sku] ? { ...stock[sku] } : null;
        },

        getAllItems() {
            return Object.entries(stock).map(([sku, item]) => ({ sku, ...item }));
        },

        filterByPrice(maxPrice) {
            return Object.values(stock)
                .filter(item => item.price <= maxPrice)
                .sort((a, b) => a.price - b.price);
        },

        getLowStock(threshold = 5) {
            return Object.entries(stock)
                .filter(([_, item]) => item.quantity < threshold)
                .map(([sku, item]) => ({ sku, quantity: item.quantity }));
        },

        getTotalValue() {
            return Object.values(stock).reduce(
                (total, item) => total + item.price * item.quantity, 0
            );
        },

        removeItem(sku) {
            const { [sku]: removed, ...rest } = stock;
            stock = rest;
            return removed || null;
        },

        getSummary() {
            const items = Object.values(stock);
            return {
                totalItems: items.length,
                totalUnits: items.reduce((s, i) => s + i.quantity, 0),
                totalValue: this.getTotalValue(),
                categories: [...new Set(items.map(i => i.category))]
            };
        }
    };
}
```
## Next Steps

[Back to Chapter 19](19-chaining-performance.md): Chaining Methods
[Proceed to Chapter 21](21-projects-part2.md): Projects 4-5 to learn about projects 4-5.
