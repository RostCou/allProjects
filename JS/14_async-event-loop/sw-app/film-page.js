import { loadOtherInfo } from "./film-advanced.js";

export function render(loadData) {
  const list = [];

  Promise.all(
    loadData.properties.planets
      .concat(loadData.properties.species)
      .concat(loadData.properties.starships)
      .map((link) => fetch(link).then((res) => res.json()))
  ).then((data) => {
    for (const item of data) {
      list.push(item.result.properties);
    }
    document.getElementById("app").append(loadOtherInfo(loadData.properties, list));
  });
}
