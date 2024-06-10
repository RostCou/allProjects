// let n = 0, m = 100;
// let n = 2, m = 5;
// let n = 100, m = -5;
let n = -3, m = -5;

let min = Math.min(n, m);
let max = Math.max(n, m);

min = Math.ceil(min)
max = Math.floor(max)

let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
let num2 = Math.floor(Math.random() * (max - min + 1)) + min;

console.log(num1, num2);
console.log('> ' + (num1 > num2))
console.log('< ' + (num1 < num2))
console.log('>= ' + (num1 >= num2))
console.log('<= ' + (num1 <= num2))
console.log('=== ' + (num1 === num2))
console.log('!== ' + (num1 !== num2))
