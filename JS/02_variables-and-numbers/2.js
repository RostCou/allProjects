let a = 13.123456789, b = 2.123, n = 5; // дробные части: 12345, 12300.
// let a = 13.890123, b = 2.891564, n = 2; // дробные части: 89, 89.
// let a = 13.890123, b = 2.891564, n = 3; // дробные части: 890, 891.

let fractionalA = Math.trunc((a % 1) * Math.pow(10, n));
let fractionalB = Math.trunc((b % 1) * Math.pow(10, n));

console.log('a= ' + fractionalA);
console.log('b= ' + fractionalB);
console.log('> ' + (fractionalA > fractionalB))
console.log('< ' + (fractionalA < fractionalB))
console.log('>= ' + (fractionalA >= fractionalB))
console.log('<= ' + (fractionalA <= fractionalB))
console.log('=== ' + (fractionalA === fractionalB))
console.log('!== ' + (fractionalA !== fractionalB))
