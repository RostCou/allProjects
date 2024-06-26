(() => {
  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
  function createNumbersArray(count) {
    const arrNumberCard = [];

    for (let i = 1; i <= (count * count) / 2; ++i) {
      arrNumberCard.push(i);
      arrNumberCard.push(i);
    }

    return arrNumberCard;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
  function shuffle(arr) {
    let temp;
    let j;

    for (let i = 0; i < arr.length; ++i) {
      j = Math.floor(Math.random() * (arr.length - 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

  function creareCard(arrCard = []) {
    const newDiv = document.getElementsByClassName("container")[0];

    const newUl = document.createElement("ul");
    newUl.classList.add(
      "list-reset",
      "col-12",
      "flex",
      "justify-content-center"
    );

    const objCardArr = [];
    const arrTemp = [];
    let finalGame = 0;

    // let timeout = setTimeout(() => {
    //   (alert("Время закончилось!"))
    //   location.reload()
    // }, 60000);

    for (let i = 0; i < arrCard.length; ++i) {
      const newLi = document.createElement("li");

      switch (arrCard.length) {
        case 4:
          newLi.classList.add("col-6", "list-item", "flex");
          newLi.style.maxWidth = "300px";
          newLi.style.height = "300px";
          break;
        case 16:
          newLi.classList.add("col-3", "list-item", "flex");
          newLi.style.maxWidth = "200px";
          newLi.style.height = "200px";
          break;
        case 36:
          newLi.classList.add("col-2", "list-item", "flex");
          newLi.style.maxWidth = "130px";
          newLi.style.height = "130px";
          break;
        case 64:
          newLi.classList.add("list-item", "flex");
          newLi.style.width = "100px";
          newLi.style.height = "100px";
          break;
        case 100:
          newLi.classList.add("list-item", "flex");
          newLi.style.width = "80px";
          newLi.style.height = "80px";
          break;
      }

      const objCard = {};

      objCard.id = i + 1;
      objCard.card = arrCard[i];
      objCardArr.push(objCard);

      newLi.id = i + 1;
      newLi.addEventListener("click", function handlerClick() {
        this.firstChild.textContent = objCardArr[this.id - 1].card;
        if (arrTemp.length <= 1) {
          arrTemp.push(objCardArr[this.id - 1]);
          if (finalGame === objCardArr.length - 2) {
            // clearTimeout(timeout);
            document.getElementById(arrTemp[0].id).firstChild.textContent =
              arrTemp[0].card;
            document.getElementById(arrTemp[1].id).firstChild.textContent =
              arrTemp[0].card;
            const btn = document.createElement("button");
            btn.classList.add("btn-reset", "btn");
            btn.innerHTML = "Сыграть ещё раз";
            btn.addEventListener("click", () => {
              location.reload();
            });
            newDiv.append(btn);
          }
        } else {
          if (arrTemp[0].card === arrTemp[1].card) {
            document.getElementById(arrTemp[0].id).firstChild.textContent =
              arrTemp[0].card;
            document.getElementById(arrTemp[1].id).firstChild.textContent =
              arrTemp[0].card;
            arrTemp.pop();
            arrTemp.pop();
            arrTemp.push(objCardArr[this.id - 1]);
            finalGame += 2;
          } else {
            document.getElementById(arrTemp[0].id).firstChild.textContent = "";
            document.getElementById(arrTemp[1].id).firstChild.textContent = "";
            document
              .getElementById(arrTemp[0].id)
              .addEventListener("click", handlerClick);
            document
              .getElementById(arrTemp[1].id)
              .addEventListener("click", handlerClick);
            arrTemp.pop();
            arrTemp.pop();
            arrTemp.push(objCardArr[this.id - 1]);
          }
        }
        this.removeEventListener("click", handlerClick);
      });
      const newSpan = document.createElement("span");
      newSpan.style.fontSize = "42px";
      newSpan.textContent = "";
      newLi.append(newSpan);
      newUl.append(newLi);
    }
    newDiv.append(newUl);
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
  function startGame(count) {
    const arrNumber = createNumbersArray(count);
    const arrRandom = shuffle(arrNumber);

    creareCard(arrRandom);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const inputNumber = document.getElementsByClassName("input")[0];
    const input = document.getElementsByClassName("form")[0];

    input.addEventListener("submit", (e) => {
      e.preventDefault();

      if (
        parseInt(inputNumber.value) % 2 === 0 &&
        parseInt(inputNumber.value) >= 2 &&
        parseInt(inputNumber.value) <= 10
      ) {
        document.querySelector("form").remove();
        startGame(parseInt(inputNumber.value));
      } else {
        inputNumber.value = 4;
      }
    });
  });
})();
