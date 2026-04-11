// console.log("Hello World!")
// // This is block of comment
// /**
//  * This
//  * are 
//  * for  
//  * many
//  * of 
//  * comment
//  * for
//  * details 
//  * explains
// */
// var hello = "Hello World,JavaScript!"
// console.log(hello)
// let age = 34
// console.log("Hello World!")
// console.log('My name is Zone!')
// console.log(`I'm ${age = 45} years old`)
// // I want to return type of age 

// console.log(typeof(age))
// console.log(age)

// Now we create simple function by key function

// declare function
// function greet(name , age=23) {
//   // console.log("Hello JavaSript!")
//   console.log(`My name is ${name} and i'm ${age}`);
// }
// // Call back function
// greet("Vuthim",14);
// greet("Zone",);

// return function

// function add(a,b) {
//   // return function 
//   return (a + b)
// }
// let sum = add(34,4)
// console.log(sum)


// return early
// function proccessAge(age) {
//   if (age < 0){
//     return 'Invalid age!';
//   }else if(age < 18){
//     return 'Minor';
//   }else if(age < 65){
//     return 'Adult';
//   }else{
//     return 'Senior';
//   }
// }

// console.log(proccessAge(25))
// console.log(proccessAge(-23))

//  Ro
// function proccessAge(age) {
//   if (age < 0){
//     return 'Invalid age!';
//   } if(age < 18){
//     return 'Minor';
//   } if(age < 65){
//     return 'Adult';
//   }
//     return 'Senior';
// }

// console.log(proccessAge(25))
// console.log(proccessAge(-23))

// function printMessage(message) {
//   console.log(message);
// }

// let result = printMessage('Hello');
// // console.log(result);  // undefined


// function add(a,b){
//   return a + b;
// }

// const add = (a,b) => {
//   return a + b;
// }
// let adds = add (56,88)
// console.log(adds)

// processUser(function(name) {
//   console.log('Hi, ' + name);
// });

// // Or with arrow syntax
// processUser(name => console.log('Hi, ' + name));
// const numbers = [1, 2, 3];

// numbers.forEach(function(num) {
//   console.log(num);
// });

// // Arrow version
// numbers.forEach(num => console.log(num));

// function isEmail(email) {
//   return email.includes('@') && email.includes('.');
// }

// function isValidAge(age) {
//   return typeof age === 'number' && age >= 0 && age <= 150;
// }

// function validateUser(name, email, age) {
//   if (!name || name.length < 2) {
//     return 'Invalid name';
//   }
//   if (!isEmail(email)) {
//     return 'Invalid email';
//   }
//   if (!isValidAge(age)) {
//     return 'Invalid age';
//   }
//   return 'Valid user!';
// }

// console.log(validateUser('Jo', 'invalid', 25));    // Invalid name
// console.log(validateUser('John', 'bad', 25));       // Invalid email
// console.log(validateUser('John', 'john@test.com', 25)); // Valid user!

// const numbers = [1,2,3,4,5,6,7]

// numbers.forEach(function(num){
//     console.log(num);
// })

// Asynchronous Callbacks

// console.log('1: Start');
// setTimeout(function(){
//     console.log(`3: Inside TimeOut`);
// },5000)

// console.log("2: End")

//  Promise 
// Promise provide cleaner async code

// const promise = new Promise(function(resolve, reject){
//     // create delay for find person in database 
//     // This "Promise" is will give data to promise follow promise
//     setTimeout(function(){
//         resolve('Data loaded successfully');
//     },1000)
// })

// promise
//     .then(function(result){
//         console.log(result);
//     })
//     .catch(function(error){
//         console.log(error);
//     })

// Now i will create promise for practices right now ok



// function fetchUser(id) {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       if (id > 0) {
//         resolve({ id: id, name: 'User ' + id });
//       } else {
//         reject(new Error('Invalid user ID'));
//       }
//     }, 10000);
//   });
// }

// fetchUser(1)
//   .then(function(user) {
//     console.log(user);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
// fetchUser(2)
//   .then(function(user) {
//     console.log(user);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
//   console.log('Please wait system finding in database')

// Promis.all()

// const promise1 = Promise.resolve(1);
// const promise2 = Promise.resolve(2);
// const promise3 = Promise.resolve(3);

// Promise.all([promise1, promise2, promise3])
//     .then(function(results){
//         console.log(results);
//     })

// Basic await
// async function loadData(){
//     const result = await fetchData()
//     console.log(result)
// }

// function fetchUser(id) {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       if (id > 0) {
//         resolve({ id: id, name: 'User ' + id });
//       } else {
//         reject(new Error('Invalid user ID'));
//       }
//     }, 1000);
//   });
// }

// fetchUser(1)
//   .then(function(user) {
//     console.log(user);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });


// OOP

// This a object
// Standart Property
// const person = {
//     name: 'Jonh Doe',
//     age: 30,
//     isEmployed: true
// }
// // PorPerty name wuth space (use qoute)
// const user2 = {
//     'First-name': 'Bon',
//     'last name':'Lok'
// }

// // Numbers as property names

// const numbers = {
//     1: 'one',
//     2: 'two'
// }


// console.log(person.name)
// console.log(person.age)
// console.log(person.isEmployed)
// console.log(person['name'])

// const key = 'name'
//  console.log(person.key) //Dot notation (.): Use when you know the exact, literal name of the property.
// console.log(person[key]) //Bracket notation ([]): Use when the property name is stored in a variable or contains special characters (like spaces).

// const person = {
//     name: 'Jonh Doe',
//     age: 30,
//     isEmployed: true,
// }

// const key = 'name'
// console.log(person[key])

// // common pattern 

// function getProperty(obj,key){
//     return obj[key]
// }

// console.log(getProperty(person,'age'))

// const person = {
//     name: "Jonh"
// }

// person.age = 34
// person['email'] = 'john@test.com'
// console.log(person)

// const person = {
//   name: 'John',
//   age: 30,
//   email: 'john@test.com'
// };

// delete person.email;       // Delete email property
// // OR
// delete person['email'];    // Same thing

// console.log(person);
// // { name: 'John', age: 30 }


// Object with method 

// 

// const user = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john@example.com',
  
//   getFullName() {
//     return `${this.firstName} ${this.lastName}`;
//   },
  
//   getInitials() {
//     return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
//   },
  
//   updateEmail(newEmail) {
//     if (newEmail.includes('@')) {
//       this.email = newEmail;
//       return true;
//     }
//     return false;
//   }
// };

// console.log(user.getFullName());  // John Doe
// console.log(user.getInitials());  // JD
// console.log(user.updateEmail('new@email.com'));  // true
// console.log(user.email);  // new@email.com

// cart system 

// const cart = {
//   items: [],
  
//   addItem(product, quantity = 1) {
//     const existing = this.items.find(item => item.product === product);
//     if (existing) {
//       existing.quantity += quantity;
//     } else {
//       this.items.push({ product, quantity });
//     }
//   },
  
//   removeItem(product) {
//     this.items = this.items.filter(item => item.product !== product);
//   },
  
//   getTotal() {
//     return this.items.reduce((sum, item) => sum + item.quantity, 0);
//   },
  
//   clear() {
//     this.items = [];
//   }
// };

// cart.addItem('Apple', 3);
// cart.addItem('Banana', 2);
// cart.addItem('Apple');  // Increases to 4
// console.log(cart.items);  // [{product: 'Apple', quantity: 4}, {product: 'Banana', quantity: 2}]
// console.log(cart.getTotal());  // 6


//  i promise you hey hey 
