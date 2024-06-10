const _URL = "/api/products";
// const _URL = "/api/products?status=200";
// const _URL = "/api/products?status=500";

const popup = document.createElement("div");
const popupText = document.createElement("h5");
const boxPopup = document.createElement("div");

popup.style.width = "300px";
popup.style.height = "110px";
popup.classList.add("card", "p-3", "popup-item");
popupText.classList.add("card-text");
popup.append(popupText);

boxPopup.classList.add("popup", "d-flex", "flex-column-reverse", "gap-3");
boxPopup.style.position = "absolute";
boxPopup.style.right = "20px";
boxPopup.style.bottom = "20px";
boxPopup.style.height = "100%";

fetch(_URL)
  .then((res) => {
    if (res.status === 500) return fetch(_URL);
    return res;
  })
  .then((res) => {
    if (res.status === 500) return fetch(_URL);
    return res;
  })
  .then((res) => {
    if (res.status === 500) throw new Error(res.statusText);
    return res;
  })
  .then((res) => {
    if (res.status === 200) return res.json();
    if (res.status === 404) {
      popupInfo("Произошла ошибка, попробуйте обновить страницу позже");
      return;
    }
  })
  .then((data) => {
    render(data);
  })
  .catch(() => {
    popupInfo("Произошла ошибка, попробуйте обновить страницу позже");
  })
  .finally(() => {
    spinnerSwitch();
  });

function render(data) {
  const container = document.getElementById("app");

  if (!data) {
    const title = document.createElement("h2");
    title.style.textAlign = "center";
    title.textContent = "Список товаров пуст";
    container.append(title);
    return;
  }

  const list = document.createElement("ul");

  container.classList.add("pt-3");
  list.style.textDecoration = "none";
  list.classList.add("d-flex", "flex-wrap", "justify-content-center", "gap-4");

  for (const product of data.products) {
    const item = document.createElement("li");
    const itemBody = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemTitle = document.createElement("h5");
    const itemPrice = document.createElement("p");

    item.classList.add("card");
    item.style.width = "30%";
    itemImg.classList.add("card-img-top");
    itemBody.classList.add("card-body");
    itemTitle.classList.add("card-title");
    itemPrice.classList.add("card-text");

    itemImg.src = product.image;
    itemTitle.textContent = product.name;
    itemPrice.textContent = product.price + " денег";

    itemBody.append(itemTitle);
    itemBody.append(itemPrice);
    item.append(itemImg);
    item.append(itemBody);

    list.append(item);
  }
  container.append(list);
}

function spinnerSwitch() {
  const spinner = document.getElementById("spinner");

  if (spinner.classList.value.includes("d-none"))
    spinner.classList.remove("d-none");
  else spinner.classList.add("d-none");
}

function popupInfo(info, status) {
  if (document.querySelectorAll(".popup").length == 0) {
    document.body.append(boxPopup);
  }

  popup.classList.remove(status ? "text-bg-danger" : "text-bg-success");
  popup.classList.add(status ? "text-bg-success" : "text-bg-danger");
  popupText.textContent = info;

  const clonePopup = popup.cloneNode(true);

  document.querySelector(".popup").append(clonePopup);

  setTimeout(() => {
    clonePopup.remove();
    if (document.querySelectorAll(".popup-item").length == 0) {
      document.querySelector(".popup").remove();
    }
  }, 3000);
}

window.addEventListener("offline", () => {
  popupInfo("Произошла ошибка, проверьте подключение к интернету");
});

window.addEventListener("online", () => {
  popupInfo("Подключение к интернету восстановлено", true);
});
