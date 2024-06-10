let allStudents = [
  { name: 'Валя', age: 11 },
  { name: 'Таня', age: 24 },
  { name: 'Рома', age: 21 },
  { name: 'Надя', age: 34 },
  { name: 'Антон', age: 7 }
]

function createStudentsList(listArr) {
  let newUl = document.createElement("ul");

  for (let value of listArr) {
    let newLi = document.createElement("li");
    let newTitle = document.createElement("h2");
    let newSpan = document.createElement("span");

    newTitle.textContent = value.name;
    newSpan.textContent = "Возраст: " + value.age + " лет";

    newLi.append(newTitle);
    newLi.append(newSpan);

    newUl.append(newLi);
  }

  document.body.append(newUl);
}

createStudentsList(allStudents);
