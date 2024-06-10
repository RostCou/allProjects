// Обязательная часть задания
let user1 = {
  name: 'Игорь',
  age: 17
}

let user2 = {
  name: 'Оля',
  age: 21
}

function getOlderUser(userOne, userTwo) {
  // Здесь решение задачи
  let result = userOne.age < userTwo.age ? userTwo.name : userOne.name;

  return result;
}

let result = getOlderUser(user1, user2)
console.log('Старший пользователь:', result);


// Не обязательная часть задания
let allUsers = [
  {
    name: 'Валя',
    age: 11
  },
  {
    name: 'Таня',
    age: 24
  },
  {
    name: 'Рома',
    age: 21
  },
  {
    name: 'Надя',
    age: 34
  },
  {
    name: 'Антон',
    age: 7
  }
]

function getOlderUserArray(usersArray = []) {
  // Здесь решение задачи

  // вариант 1
  let result = usersArray[0];

  for (let i = 1; i < usersArray.length; ++i) {
    if (result.age < usersArray[i].age) {
      result = usersArray[i];
    }
  }

  // Вариант 2

  // for (let value of usersArray) {
  //   if (result.age < value.age) {
  //     result = value;
  //   }
  // }

  return result.name;
}

let result2 = getOlderUserArray(allUsers)
console.log('Старший пользователь:', result2);
