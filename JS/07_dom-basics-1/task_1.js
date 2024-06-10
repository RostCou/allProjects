function createStudentCard(name, age) {
  let newDiv = document.createElement("div");
  let newTitle = document.createElement("h2");
  let newSpan = document.createElement("span");

  newTitle.textContent = name;
  newSpan.textContent = "Возраст: " + age + " лет";

  newDiv.append(newTitle);
  newDiv.append(newSpan);

  document.body.append(newDiv);
}

createStudentCard("Игорь", 17)
