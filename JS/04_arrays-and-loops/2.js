let count = 5;

let myArray = [];

for (let i = 1; i <= count; ++i) {
  myArray.push(i);
}

console.log(myArray)

let temp;
let j;

for (let i = 0; i < count; ++i) {
  j = Math.floor(Math.random() * (count-1));
  temp = myArray[i];
  myArray[i] = myArray[j];
  myArray[j] = temp;
}

console.log(myArray);

// Задание №3

let n = 3;

for (let index in myArray) {
  if (myArray[index] === n){
    console.log("Индекс элемента = " + index);
    break;
  }
}
