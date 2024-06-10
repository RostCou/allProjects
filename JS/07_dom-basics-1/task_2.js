function createStudentCard(student) {
  let newDiv = document.createElement("div");
  let newTitle = document.createElement("h2");
  let newSpan = document.createElement("span");

  newTitle.textContent = student.name;
  newSpan.textContent = "Возраст: " + student.age + " лет";

  newDiv.append(newTitle);
  newDiv.append(newSpan);

  document.body.append(newDiv);
}

let studentObj = {
  name: 'Игорь',
  age: 17
}

createStudentCard(studentObj);
