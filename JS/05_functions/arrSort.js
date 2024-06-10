let myArray = [12, 33, 3, 44, 100];

function arrSort(array = []) {
  for (let i = 0; i < array.length; ++i) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j + 1] < array[j]) {
        let temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}

console.log(arrSort(myArray));
