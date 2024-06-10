const inputNumber = document.getElementsByClassName("input")[0];
const form = document.getElementsByClassName("form")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    parseInt(inputNumber.value) % 2 === 0 &&
    parseInt(inputNumber.value) >= 2 &&
    parseInt(inputNumber.value) <= 10
  ) {
    form.remove();
    startGame(parseInt(inputNumber.value));
  } else {
    inputNumber.value = 4;
  }
});

class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.flip = flip;
    this.element = this.createElement();
    this.cardNumber = cardNumber;
    this.open = false;
    this.success = false;
  }

  createElement() {
    const card = document.createElement("li");

    card.addEventListener("click", () => {
      if (this.success) return;
      this.flip(this);
    });

    this.container.append(card);

    return card;
  }

  set cardNumber(value) {
    if (!typeof value === "number" && value <= 0)
      throw new TypeError("Error card number");

    const newSpan = document.createElement("span");
    newSpan.style.fontSize = "42px";
    newSpan.textContent = "";
    this.element.append(newSpan);
    this._cardNumder = value;
  }
  get cardNumber() {
    return this._cardNumder;
  }

  set open(value) {
    if (!typeof value === "boolean") throw new TypeError("Not a boolean");
    this._open = value;
    this.element.firstChild.textContent = value ? this.cardNumber : "";
  }
  get open() {
    return this._open;
  }

  set success(value) {
    if (!typeof value === "boolean") throw new TypeError("Not a boolean");
    this._success = value;
    if (value) this.element.style.backgroundColor = "green";
  }
  get success() {
    return this._success;
  }
}

class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
  }

  set cardNumber(value) {
    this._cardNumder = value;
    const cardsImgArray = ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg"];
    const img = document.createElement("img");
    img.src = cardsImgArray[value];
    img.onerror = function () {
      img.src = "./img/defaul.jpg";
    };
    img.style.display = "none";
    this.element.append(img);
  }
  get cardNumber() {
    return this._cardNumder;
  }

  set open(value) {
    if (!typeof value === "boolean") throw new TypeError("Not a boolean");
    this._open = value;
    this.element.firstChild.style.display = value ? "" : "none";
  }
  get open() {
    return this._open;
  }
}

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

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
function startGame(count) {
  const arrNumber = createNumbersArray(count);
  const arrRandom = shuffle(arrNumber);

  createCard(arrRandom);
}

function createCard(arrCard = []) {
  const newDiv = document.getElementsByClassName("container")[0];
  newDiv.style.paddingTop = "20px";

  const newUl = document.createElement("ul");
  newUl.classList.add("list-reset", "col-12", "flex", "justify-content-center");
  newUl.style.gap = "10px";

  const arrClassCard = [];
  const arrTemp = [];
  let idCard = 0;
  let finalGame = 0;

  for (const cardNumber of arrCard) {
    const card = new AmazingCard(newUl, cardNumber, function handlerClick(
      card
    ) {
      if (card.open) return;
      card.open = !card.open;
      if (arrTemp.length <= 1) {
        arrTemp.push(arrClassCard[card.element.id]);
        if (finalGame === arrClassCard.length - 2) {
          clearTimeout(timeout);
          arrClassCard[arrTemp[0].element.id].success = true;
          arrClassCard[arrTemp[1].element.id].success = true;
          arrTemp.length = 0;
          const btn = document.createElement("button");
          btn.classList.add("btn-reset", "btn");
          btn.innerHTML = "Сыграть ещё раз";
          btn.addEventListener("click", () => {
            location.reload();
          });
          newDiv.append(btn);
        }
      } else {
        if (arrTemp[0].cardNumber === arrTemp[1].cardNumber) {
          arrClassCard[arrTemp[0].element.id].success = true;
          arrClassCard[arrTemp[1].element.id].success = true;
          arrTemp.length = 0;
          arrTemp.push(arrClassCard[card.element.id]);
          finalGame += 2;
        } else {
          arrClassCard[arrTemp[0].element.id].open = false;
          arrClassCard[arrTemp[1].element.id].open = false;
          arrTemp.length = 0;
          arrTemp.push(arrClassCard[card.element.id]);
        }
      }
    });

    card.element.id = idCard;

    switch (arrCard.length) {
      case 4:
        card.element.classList.add("col-6", "list-item", "flex");
        card.element.style.maxWidth = "300px";
        card.element.style.height = "300px";
        break;
      case 16:
        card.element.classList.add("col-3", "list-item", "flex");
        card.element.style.maxWidth = "200px";
        card.element.style.height = "200px";
        break;
      case 36:
        card.element.classList.add("col-2", "list-item", "flex");
        card.element.style.maxWidth = "130px";
        card.element.style.height = "130px";
        break;
      case 64:
        card.element.classList.add("list-item", "flex");
        card.element.style.width = "100px";
        card.element.style.height = "100px";
        break;
      case 100:
        card.element.classList.add("list-item", "flex");
        card.element.style.width = "80px";
        card.element.style.height = "80px";
        break;
    }

    idCard++;
    arrClassCard.push(card);
  }

  newDiv.append(newUl);

  let timeout = setTimeout(() => {
    alert("Время закончилось!");
    location.reload();
  }, 60000);
}
