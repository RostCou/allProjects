const container = document.getElementsByClassName("container")[0];
const input = document.getElementById("prop-input");
const btn = document.getElementById("prop-btn");

container.style.maxWidth = "60%";

btn.addEventListener("click", () => {
  if (container.querySelector("ol")) container.querySelector("ol").remove();

  if (typeof window[input.value.trim()] === "function") {
    input.classList.remove("border-danger");

    let obj;

    if (window[input.value.trim()].prototype)
      obj = window[input.value.trim()].prototype;
    else obj = window[input.value.trim()];

    const list = document.createElement("ol");
    list.classList.add("list-group", "list-group-numbered");

    do {
      const elem = document.createElement("li");

      elem.classList.add("list-group-item");

      elem.textContent = obj["constructor"]
        ? obj.constructor.name
        : "[Без названия]";

      list.append(elem);

      const enumerableList = document.createElement("ol");
      enumerableList.classList.add("list-group", "list-group-numbered");

      const propertyObj = Object.getOwnPropertyDescriptors(obj);

      for (const key in propertyObj) {
        if (propertyObj[key].enumerable === true) {
          const enumerableElem = document.createElement("li");
          enumerableElem.classList.add("list-group-item");

          if (propertyObj[key].writable || propertyObj[key].value) {
            enumerableElem.innerHTML =
              `<strong>${key}</strong>` +
              " typeof " +
              `<strong>${typeof obj[key]}</strong>`;
          } else {
            enumerableElem.innerHTML =
              `<strong>${key}</strong>` +
              " typeof " +
              `<strong>${typeof propertyObj[key]}</strong>`;
          }

          enumerableList.append(enumerableElem);
        }
      }
      elem.append(enumerableList);

      obj = Object.getPrototypeOf(obj);
    } while (obj);

    container.append(list);
  } else {
    input.classList.add("border-danger");
  }
});
