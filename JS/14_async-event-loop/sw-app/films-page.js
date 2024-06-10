export function render(data) {
  document.body.classList.add("bg-body-tertiary");
  const list = document.createElement("ul");
  list.classList.add(
    "container",
    "d-flex",
    "justify-content-between",
    "flex-wrap",
    "py-4"
  );

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "Star Wars Films";
  pageTitle.style.textAlign = "center";
  document.getElementById("app").append(pageTitle);

  for (const item of data) {
    const listItem = document.createElement("li");
    const itemLink = document.createElement("a");
    const itemNumber = document.createElement("h2");
    const ItemTitle = document.createElement("p");

    listItem.style.width = "30%";
    listItem.classList.add("card", "my-2", "text-center");
    itemLink.style.width = "100%";
    itemLink.style.minHeight = "110px";
    itemLink.style.textDecoration = "none";
    itemLink.classList.add(
      "text-bg-info",
      "d-flex",
      "flex-column",
      "justify-content-between"
    );
    itemNumber.classList.add("card-title");
    ItemTitle.classList.add("card-text");

    listItem.append(itemLink);
    itemLink.append(itemNumber);
    itemLink.append(ItemTitle);

    itemNumber.textContent = item.properties.title;
    ItemTitle.textContent = "Episode №" + item.properties.episode_id;
    itemLink.href =
      "?filmNumber=" +
      item.properties.url.slice(item.properties.url.lastIndexOf("films") + 6);

    list.append(listItem);
  }

  document.getElementById("app").append(list);
}
