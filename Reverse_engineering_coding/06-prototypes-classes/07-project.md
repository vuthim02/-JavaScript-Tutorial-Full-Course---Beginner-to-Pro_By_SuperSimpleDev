# Projects

## 1. Student Management System (Full Demo)

Demonstrates classes, inheritance, encapsulation, polymorphism, and composition.

```javascript
class Person {
    constructor(name, age) {
        if (new.target === Person) throw new Error("Person is abstract");
        this.name = name;
        this.age = age;
    }
    introduce() { return `Hi, I'm ${this.name}, age ${this.age}`; }
    birthday() { this.age++; return this.age; }
}

class Student extends Person {
    #grades = [];
    constructor(name, age, studentId) { super(name, age); this.studentId = studentId; }
    addGrade(subject, score) {
        if (score < 0 || score > 100) throw new Error("Score must be 0-100");
        this.#grades.push({ subject, score, date: new Date() });
    }
    getAverage() {
        if (this.#grades.length === 0) return 0;
        const sum = this.#grades.reduce((s, g) => s + g.score, 0);
        return Math.round((sum / this.#grades.length) * 100) / 100;
    }
    getGradeReport() {
        return { student: this.name, id: this.studentId, average: this.getAverage(), grades: [...this.#grades] };
    }
    introduce() { return `${super.introduce()} (ID: ${this.studentId}, Avg: ${this.getAverage()})`; }
}

class Teacher extends Person {
    #students;
    constructor(name, age, subject) { super(name, age); this.subject = subject; this.#students = []; }
    addStudent(student) {
        if (!(student instanceof Student)) throw new Error("Must be a Student instance");
        this.#students.push(student);
    }
    getStudentCount() { return this.#students.length; }
    introduce() { return `${super.introduce()} — I teach ${this.subject}`; }
}

class Course {
    static #courseCount = 0;
    static getCourseCount() { return this.#courseCount; }
    #students = [];
    constructor(name, teacher) {
        if (!(teacher instanceof Teacher)) throw new Error("Teacher must be a Teacher instance");
        this.name = name;
        this.teacher = teacher;
        Course.#courseCount++;
    }
    enroll(student) {
        if (!(student instanceof Student)) throw new Error("Must be a Student instance");
        this.#students.push(student);
        this.teacher.addStudent(student);
    }
    getRoster() {
        return this.#students.map(s => ({ name: s.name, id: s.studentId, average: s.getAverage() }))
            .sort((a, b) => b.average - a.average);
    }
    getClassAverage() {
        if (this.#students.length === 0) return 0;
        const sum = this.#students.reduce((s, st) => s + st.getAverage(), 0);
        return Math.round((sum / this.#students.length) * 100) / 100;
    }
}

const teacher = new Teacher("Ms. Smith", 35, "Math");
const course = new Course("Algebra", teacher);

const alice = new Student("Alice", 16, "S001");
const bob = new Student("Bob", 17, "S002");

alice.addGrade("Algebra", 95);
alice.addGrade("Algebra", 88);
bob.addGrade("Algebra", 72);

course.enroll(alice);
course.enroll(bob);

console.log("Roster:", course.getRoster());
console.log("Class Average:", course.getClassAverage());
console.log("Total Courses:", Course.getCourseCount());
```

## 2. Event Emitter (Prototype Pattern)

Demonstrates prototypes and `this`.

```javascript
function EventEmitter() {
    this._events = {};
}

EventEmitter.prototype.on = function(event, listener) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(listener);
    return this;
};

EventEmitter.prototype.emit = function(event, ...args) {
    const listeners = this._events[event];
    if (!listeners) return false;
    listeners.forEach(fn => fn.apply(this, args));
    return true;
};

EventEmitter.prototype.off = function(event, listenerToRemove) {
    const listeners = this._events[event];
    if (!listeners) return this;
    this._events[event] = listeners.filter(fn => fn !== listenerToRemove);
    return this;
};

const logger = new EventEmitter();
logger.on("log", msg => console.log("Log:", msg));
logger.on("log", msg => console.log("Also logged:", msg));
logger.emit("log", "Hello");
// "Log: Hello"
// "Also logged: Hello"
```

## 3. Observable State (Encapsulation + Getters/Setters)

```javascript
function createObservableState(initial, onChange) {
    const state = { ...initial };

    return {
        get(key) {
            return state[key];
        },
        set(key, value) {
            const old = state[key];
            state[key] = value;
            if (old !== value) onChange(key, value, old);
        },
        keys() {
            return Object.keys(state);
        },
        toJSON() {
            return { ...state };
        }
    };
}

const store = createObservableState({ count: 0, name: "App" }, (key, newVal, oldVal) => {
    console.log(`State: ${key} changed from ${oldVal} to ${newVal}`);
});

store.set("count", 1); // "State: count changed from 0 to 1"
store.set("name", "Dashboard"); // "State: name changed from App to Dashboard"
```

## 4. Shape Calculator (Polymorphism)

```javascript
class Shape {
    area() { return 0; }
    describe() { return `${this.constructor.name} area: ${this.area()}`; }
}

class Circle extends Shape {
    constructor(radius) { super(); this.radius = radius; }
    area() { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
    constructor(w, h) { super(); this.w = w; this.h = h; }
    area() { return this.w * this.h; }
}

class Triangle extends Shape {
    constructor(base, height) { super(); this.base = base; this.height = height; }
    area() { return 0.5 * this.base * this.height; }
}

const shapes = [new Circle(5), new Rectangle(4, 6), new Triangle(3, 8)];
shapes.forEach(s => console.log(s.describe()));
// "Circle area: 78.53981633974483"
// "Rectangle area: 24"
// "Triangle area: 12"
```

## 5. Composable Formatter (Composition over Inheritance)

```javascript
class UpperCaseFormatter {
    format(str) { return str.toUpperCase(); }
}

class LowerCaseFormatter {
    format(str) { return str.toLowerCase(); }
}

class ReversedFormatter {
    format(str) { return str.split("").reverse().join(""); }
}

class TextProcessor {
    constructor(formatter) { this.formatter = formatter; }
    process(text) { return this.formatter.format(text); }
    setFormatter(formatter) { this.formatter = formatter; }
}

const processor = new TextProcessor(new UpperCaseFormatter());
console.log(processor.process("Hello")); // "HELLO"

processor.setFormatter(new ReversedFormatter());
console.log(processor.process("Hello")); // "olleH"
```
## Next Steps

[Back to Chapter 6](06-encapsulation-polymorphism.md): Encapsulation, Polymorphism & Composition
[Proceed to Chapter 8](08-object-static-methods.md): Object Static Methods: keys, values, entries, assign, is & More to learn about object static methods: keys, values, entries, assign, is & more.
