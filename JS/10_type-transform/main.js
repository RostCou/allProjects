(() => {
  // Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).
  // Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов,
  // например 5 студентов.
  const studentsList = [
    // Добавьте сюда объекты студентов
    {
      name: "Иван",
      surname: "Шуткин",
      lastName: "Иванович",
      birth: new Date(1990, 11, 18),
      startTraining: 2023,
      specialization: "Экономический"
    },
    {
      name: "Иван",
      surname: "Иванов",
      lastName: "Сергеевич",
      birth: new Date(1993, 03, 10),
      startTraining: 2010,
      specialization: "Исторический"
    },
    {
      name: "Леонид",
      surname: "Лимонов",
      lastName: "Иванович",
      birth: new Date(1995, 03, 01),
      startTraining: 2021,
      specialization: "Энергетический"
    },
    {
      name: "Юрий",
      surname: "Персиков",
      lastName: "Викторович",
      birth: new Date(1999, 10, 18),
      startTraining: 2020,
      specialization: "Энергетический"
    },
    {
      name: "Петр",
      surname: "Семенов",
      lastName: "Николаевич",
      birth: new Date(1996, 05, 05),
      startTraining: 2010,
      specialization: "Экономический"
    },
  ]

  let arrTemp = [];

  function createTepmArr(arrStudents) {
    const arr = [];
    for (let i = 0; i < arrStudents.length; ++i) {
      arr.push({
        name: arrStudents[i].surname + " " + arrStudents[i].name + " "
          + arrStudents[i].lastName,
        specialization: arrStudents[i].specialization,
        birth: arrStudents[i].birth,
        startTraining: arrStudents[i].startTraining
      });
    }
    return arr;
  }
  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем,
  // как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с
  // информацией и пользователе.У функции должен быть один аргумент - объект студента.
  function getStudentItem(studentObj) {
    const item = document.createElement("tr");

    for (let i = 0; i < 6; ++i) {
      const newElem = document.createElement("td");
      switch (i) {
        case 0:
          newElem.textContent = studentObj.name;
          newElem.classList.add("table__item");
          item.append(newElem);
          break;
        case 3:
          newElem.textContent = studentObj.specialization;
          newElem.classList.add("table__item");
          item.append(newElem);
          break;
        case 4:
          newElem.textContent = correctDateNumber(studentObj.birth.getDate()) + ".";
          newElem.textContent += correctDateNumber(studentObj.birth.getMonth() + 1) + ".";
          newElem.textContent += studentObj.birth.getFullYear() +
            " (" + calculateAge(studentObj.birth) + ")";
          newElem.classList.add("table__item");
          item.append(newElem);
          break;
        case 5:
          newElem.textContent = studentObj.startTraining + "-" + (studentObj.startTraining + 4) +
            " (" + getCourse(studentObj.startTraining) + ")";
          newElem.classList.add("table__item");
          item.append(newElem);
          break;
      }
    };

    return item;
  }

  function calculateAge(birthDate) {
    const nowDate = new Date();
    let years = (nowDate.getFullYear() - birthDate.getFullYear());
    if (nowDate.getMonth() < birthDate.getMonth() ||
      nowDate.getMonth() == birthDate.getMonth() &&
      nowDate.getDate() < birthDate.getDate()) {
      years--;
    }
    return years;
  }

  function correctDateNumber(date) {
    const newDate = date < 10 ? "0" + date : date;
    return newDate;
  }

  function getCourse(startCourses) {
    const nowDate = new Date();
    const endCourses = new Date(startCourses + 4, 8, 1);

    if ((nowDate - endCourses) > 0) {
      return "закончил";
    }

    if (nowDate.getMonth() >= 8) {
      return (nowDate.getFullYear() - startCourses + 1 + " курс");
    } else {
      return (nowDate.getFullYear() - startCourses + " курс");
    }
  }

  // Этап 4. Создайте функцию отрисовки всех студентов.
  // Аргументом функции будет массив студентов.Функция должна использовать ранее созданную
  // функцию создания одной записи для студента.Цикл поможет вам создать список студентов.
  // Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки
  // таблицы.
  function renderStudentsTable(studentsArray) {
    if (document.querySelector(".table__body")) {
      document.querySelector(".table__body").remove();
    }

    const table = document.createElement("tbody");
    table.classList.add("table__body");

    for (const value of studentsArray) {
      table.append(getStudentItem(value));
    }

    document.querySelector(".table").append(table);
  }

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы,
  // в котором будет проверка введенных данных.Если проверка пройдет успешно,
  // добавляйте объект с данными студентов в массив студентов и запустите функцию
  // отрисовки таблицы студентов, созданную на этапе 4.
  document.addEventListener("DOMContentLoaded", () => {
    arrTemp = createTepmArr(studentsList);
    renderStudentsTable(arrTemp);

    addClickTable();
    addEventInput();

    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();

      if (document.querySelector("span")) {
        do {
          document.querySelector("span").remove();
        } while (document.querySelectorAll("span").length != 0);

      }

      const arrErrors = [];

      const name = document.getElementById("studentName");
      const surName = document.getElementById("studentSurname");
      const middleName = document.getElementById("studentMiddlename");
      const startTraining = document.getElementById("startTraining");
      const studentBirth = document.getElementById("studentBirth");
      const specialization = document.getElementById("specialization");

      if ((name.value.trim() == "") || (surName.value.trim() == "") || (middleName.value.trim() == "")
        || (specialization.value.trim() == "") || (startTraining.value.trim() == "")
        || (studentBirth.valueAsDate == null)) {
        arrErrors.push("Заполните все поля!");
      }
      if (new Date(1900, 0, 1) > studentBirth.valueAsDate
        || studentBirth.valueAsDate > new Date() || studentBirth.valueAsDate == null) {
        arrErrors.push("Дата рождения вне диапазона (01.01.1900 - "
          + new Date().getDate() + "." + (new Date().getMonth() + 1) + "."
          + new Date().getFullYear() + ")!");
      }
      if (parseInt(startTraining.value.trim()) < 2000
        || parseInt(startTraining.value.trim())
        > new Date().getFullYear() || startTraining.value.trim() == "") {
        arrErrors.push("Год начала обучения вне диапазона (2000 - "
          + new Date().getFullYear() + ")!");
      }
      if (arrErrors.length != 0) {
        for (value of arrErrors) {
          const newSpan = document.createElement("span");
          newSpan.style.backgroundColor = "red";
          newSpan.textContent = value;
          document.getElementById("formBtn").before(newSpan);
        }
      } else {
        studentsList.push({
          name: returnCapital(name.value.trim()),
          surname: returnCapital(surName.value.trim()),
          lastName: returnCapital(middleName.value.trim()),
          birth: studentBirth.valueAsDate,
          startTraining: parseInt(startTraining.value.trim()),
          specialization: returnCapital(specialization.value.trim())
        });
        enterInput(document.querySelector(".search").children);
        name.value = "";
        surName.value = "";
        middleName.value = "";
        startTraining.value = "";
        studentBirth.valueAsDate = null;
        specialization.value = "";
      }
    });
  })

  function returnCapital(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
  }

  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на
  // соответствующие колонки.
  function sortStudents(arr, prop, dir) {
    return arr.sort((a, b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0);
  }

  function addClickTable() {
    const rows = document.querySelectorAll(".table__btn");
    let dir = "";
    for (let i = 0; i < rows.length; ++i) {
      rows[i].addEventListener("click", () => {
        switch (i) {
          case 0:
            arrTemp = sortStudents(arrTemp, "name", (dir == "name"));
            dir = dir == "name" ? "" : "name";
            break;
          case 1:
            arrTemp = sortStudents(arrTemp, "specialization", (dir == "specialization"));
            dir = dir == "specialization" ? "" : "specialization";
            break;
          case 2:
            arrTemp = sortStudents(arrTemp, "birth", (dir == "birth"));
            dir = dir == "birth" ? "" : "birth";
            break;
          case 3:
            arrTemp = sortStudents(arrTemp, "startTraining", (dir == "startTraining"));
            dir = dir == "startTraining" ? "" : "startTraining";
            break;
        }
        renderStudentsTable(arrTemp);
      });
    };
  }

  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события
  // для элементов формы.
  function filterStudents(arr, prop, value) {
    let result = [],
      copy = [...arr];
    for (const item of copy) {
      if (String(item[prop]).toLowerCase().includes(value.toLowerCase()) == true) {
        result.push(item);
      }
    }
    return result;
  }

  function addEventInput() {
    const inputList = document.getElementsByName("inputSearch");

    for (let i = 0; i < inputList.length; ++i) {
      inputList[i].addEventListener("input", () => enterInput(inputList));
    }
  }

  function enterInput(inputList) {
    arrTemp = createTepmArr(studentsList);
    if (inputList[0].value != "") {
      arrTemp = filterStudents(arrTemp, "name", inputList[0].value);
    }
    if (inputList[1].value != "") {
      arrTemp = filterStudents(arrTemp, "specialization", inputList[1].value);
    }
    if (inputList[2].value != "" && inputList[2].value.length == 4) {
      arrTemp = filterStudents(arrTemp, "startTraining", inputList[2].value);
    }
    if (inputList[3].value != "" && inputList[3].value.length == 4) {
      arrTemp = filterStudents(arrTemp, "startTraining", String(Number(inputList[3].value) - 4));
    }
    renderStudentsTable(arrTemp);
  }
})();
