// Задание 4

let arr1 = [2, 2, 17, 21, 45, 12, 54, 31, 53];
let arr2 = [12, 44, 23, 5];

// let myArray = arr1;

// for (let value of arr2) {
//   myArray.push(value);
// }

// console.log(myArray);

//вариант 2

// let myArrayTwo = [];

// let arrLength = arr1.length <= arr2.length ? arr2.length : arr1.length;

// for (let i = 0; i < arrLength; ++i) {
//   if (i < arr1.length) {
//     myArrayTwo.unshift(arr1[arr1.length - i - 1]);
//   }

//   if (i < arr2.length) {
//     myArrayTwo.push(arr2[i]);
//   }
// }

// console.log(myArrayTwo);

// Вариант 3

let myArrayThree = [];

let arrsLength = arr1.length + arr2.length;

for (let i = 0; i < arrsLength; ++i) {
  if (i < arr1.length) {
    myArrayThree.push(arr1[i]);
  } else {
    myArrayThree.push(arr2[i - arr1.length]);
  }
}

console.log(myArrayThree);

//Вариант 4

myArrayFour = [];

for (let value of arr1.concat(arr2)) {
  myArrayFour.push(value);
}

console.log(myArrayFour);
