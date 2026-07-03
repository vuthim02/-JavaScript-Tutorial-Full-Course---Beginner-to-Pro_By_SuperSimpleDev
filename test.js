// const user = {
//     id: 23,
//     name:"tim"
// }

// user.name = "Ham"
// // user = {}

// console.log(user.name)

// var name = "Tim"
// name = "ham"
// console.log(name)

// var name = "Bopha"
// console.log(name)

// function randomNum(min,max) {
//     return Math.floor(Math.random() * (max-min))+min
// }

// console.log(randomNum(1,8))

// const cube = document.getElementById('cube')
// const rollBtn = document.getElementById('rollBtn')
// const result = document.getElementById('result')

// const rotations = {
//     1: { x: 0, y: 0 },
//     2: { x: 0, y: -90 },
//     3: { x: -90, y: 0 },
//     4: { x: 90, y: 0 },
//     5: { x: 0, y: 90 },
//     6: { X: 0, y : 180}
// }

// function rollDice() {
//     rollBtn.disabled = true;
//     result.textContent = 'Rolling...';

//     const value = Math.floor(Math.random() * 6) + 1;
//     const rot = rotations[value];
//     // x + 360 * 3 = 1080 + x
//     const extraSpins = 3;
//     const targetX = rot.x + 360 * extraSpins;
//     const targetY = rot.y + 360 * extraSpins;

//     cube.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
//     cube.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)`;

//     setTimeout(() => {
//         result.textContent = `You rolled a ${value}!`;
//         rollBtn.disabled = false;
//     }, 90);

// }

// function greet(str) {
//     return `Hello ${str}`;
// }
// console.info(greet('tim'));
// import promptSync from 'prompt-sync';

// const prompt = promptSync();
// const name = prompt('What is your name: ');

// console.log(name);

// const birthYear = 2007;
// const currentYear = new Date().getFullYear();
// const age = currentYear - birthYear;

// console.log(`You are ${age} years old.`);

// function one() {
//     return two();
// }

// function two() {
//     return three();
// }

// function three() {
//     return "Done Call Stack!"
// }
// // one();
// console.log(one())
// // console.trace(one())

// const Person = {
//     age: 34,
//     name: "tim"
// }

// Person.age = 45
// Person.name = 23

// let Person = {
//     age: 44,
//     name: 'Bopha'
// }

// console.log(
//     Person.age,
//     Person.name
// )

// let a = 34;
// [1, 2, 3].forEach(
//     console.log
// )
// // var a;
// {
//     let a;
//     console.log(a);
//     a = 3;
//     console.log(a);
// }
// // var a = "tim"

// for (let i = 0; i < 3; i++) {
//     setTimeout(() => console.log(i), 2000);
// }

// for (var i = 0; i < 3;i++){
//     console.log(i)
// }
/**
 * for (let i = 0; i < 3; i++) {
 *  setTimeout(() => console.log(i), 2000);
 * }
 */

/**
 * Converts Celsius to Fahrenheit
 * @param {number} celsius - The temperature in Celsius
 * @returns {number} The temperature in Fahrenheit
 */
// function toFahrenhiet(celsius) {
//     return (celsius *9/5) + 32
// }

// let age = 23
// if (age > 56) {
//     console.log(age)
// } else {
//     console.log("He older than me!")
// }

// let score = 89;
// let grade = score >= 90 ? "A" :
//             score >= 80 ? "B" :
//             score >= 70 ? "C" :
//             "D"
            
// console.log("Hello World!")

// let x = 3;
// let y = x; y = 34;
// console.log(x)
// let arr = [1, 2, 3];
// let c = arr;
// c.push(34);
// console.log(arr)

// let obj = { n: 1 }
// let ref = obj;
// ref = { n: 334 }
// console.log(obj.n)

// function wait(seconds) {
//     const start = Date.now();
//     while (Date.now() - start < seconds * 1000) {
//         // Busy-wait: completely blocks the thread
//     }
// }

// console.log("Start");
// wait(3);  // Browser freezes for 3 seconds
// console.log("End");
const seconds = 0
const start = Date.now()
console.log(Date.now()- start < seconds * 1000)
