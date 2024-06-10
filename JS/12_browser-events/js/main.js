(() => {
  //Задание 1
  const dropBtn = document.querySelector(".dropdown-toggle");
  const dropList = document.querySelector(".dropdown-menu");

  dropList.style.display = "none";

  document.addEventListener("click", e => {
    if (e.target === dropBtn)
      dropList.style.display = dropList.style.display == "none" ? "block" : "none";
    else if (e.target.className === "dropdown-item")
      return;
    else
      dropList.style.display = "none";
  })
  ////

  //Задание 2
  const form = document.getElementsByClassName("form")[0];

  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  const input3 = document.getElementById("input3");

  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя -"

  input1.addEventListener("keypress", checkKey);
  input2.addEventListener("keypress", checkKey);
  input3.addEventListener("keypress", checkKey);

  input1.addEventListener("blur", checkValue);
  input2.addEventListener("blur", checkValue);
  input3.addEventListener("blur", checkValue);

  function checkKey(e) {
    if (e.key == "Enter") {
      e.target.blur();
      return;
    }
    else if (alphabet.indexOf(e.key.toLowerCase()) == -1) e.preventDefault();
  }

  function checkValue() {
    if (this.value) {
      let value = "";

      for (const elem of this.value.trim()) {
        if (alphabet.indexOf(elem.toLowerCase()) != -1) value += elem;
      }

      value = value
        .replace(/\s+/g, " ")
        .replace(/ - /g, "-")
        .replace(/ -/g, "-")
        .replace(/- /g, "-")
        .replace(/-+/g, "-")

      if (value[value.length - 1] === "-") value = value.slice(0, -1);
      if (value[0] === "-") value = value.slice(1);

      value = value[0].toUpperCase() + value.substring(1);

      for (let i = 0; i < value.length - 1; i++) {
        if (value[i] === " " || value[i] === "-") {
          value = value.substring(0, i + 1) + value[i + 1].toUpperCase() + value.substring(i + 2);
        }
      }

      this.value = value;
    }
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const result = document.createElement("p");

    result.textContent = (input1.value + " " + input2.value + " " + input3.value).trim();
    if (result.textContent.trim()) form.appendChild(result);

    input1.value = "";
    input2.value = "";
    input3.value = "";
  })
  ////

  //Задание 3
  const btnUp = document.getElementsByClassName("btn-up")[0];

  if (window.pageYOffset > 100) btnUp.style.display = "block";

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) btnUp.style.display = "block";
    else btnUp.style.display = "none";
  }, { passive: true })

  btnUp.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
  ////

})();
