export function loadOtherInfo(data, list) {
  document.body.classList.add("bg-body-tertiary");
  const container = document.createElement("div");
  container.classList.add(
    "container",
    "d-flex",
    "justify-content-between",
    "flex-wrap"
  );

  const title = document.createElement("h1");
  const opening = document.createElement("p");

  title.textContent = data.title + " - " + "Episode №" + data.episode_id;
  opening.textContent = data.opening_crawl;

  title.style.width = "100%";
  title.style.textAlign = "center";

  container.append(title);
  container.append(opening);

  const listOtherData = getObjectOtherData(data, list);

  for (const key in listOtherData) {
    const containerList = document.createElement("div");
    const nameGroup = document.createElement("h2");
    const list = document.createElement("ul");
    containerList.classList.add("card", "align-self-start");
    containerList.style.width = "22rem";
    nameGroup.classList.add("card-header");
    list.classList.add("list-group", "list-group-flush");
    list.style.listStyleType = "none";
    nameGroup.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    for (const i of listOtherData[key]) {
      const listItem = document.createElement("li");
      const item = document.createElement("h5");
      item.textContent = i;
      listItem.classList.add("list-group-item");
      listItem.append(item);
      list.append(listItem);
    }
    containerList.append(nameGroup);
    containerList.append(list);
    container.append(containerList);
  }

  return container;
}

function getObjectOtherData(data, list) {
  const resultOtherData = {};

  for (const key in data) {
    const temp = [];
    for (const i of list) {
      if (i.url.includes(key)) {
        temp.push(i.name);
        resultOtherData[key.toString()] = temp;
      }
    }
  }
  return resultOtherData;
}
