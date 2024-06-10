// let n = 0, m = 100, count = 100;
// let n = 2, m = 5, count = 50;
// let n = 100, m = -5, count = 70;
let n = -3, m = -10, count = 42;

let min = Math.min(n, m);
let max = Math.max(n, m);

min = Math.ceil(min)
max = Math.floor(max)

let myArray = [];

for (let i = 0; i < count; ++i) {
  myArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
}

console.log(myArray)
