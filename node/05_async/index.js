console.log("OK");

if (!process.argv[2]) {
  console.error("Нет аргументов для поиска");
  process.exit();
}

const url = "https://www.swapi.tech/api/people/?name=";
let urlList = [];
const arrayPeople = [];

process.argv.forEach((val, index) => {
  if (index > 1) {
    urlList.push(url + val);
  }
});

const promises = (url) =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw reject(res.statusText);
      })
      .then((data) => {
        if (data.result.length > 0) resolve(data.result);
        else {
          throw reject(`No results found for "` + url.slice(url.lastIndexOf("=") + 1) + `"`);
        }
      })
      .catch((err) => reject(err));
  });

Promise.allSettled(urlList.map((url) => promises(url)))
  .then((responses) => {
    for (const response of responses) {
      if (response.status === "fulfilled") {
        for (const elem of response.value) {
          if (arrayPeople.findIndex((people) => people.name === elem.properties.name) === -1) {
            arrayPeople.push({
              name: elem.properties.name,
              height: elem.properties.height,
            });
          }
        }
      } else console.error(response.reason);
    }
    if (arrayPeople.length > 0) {
      console.log("Total results: " + arrayPeople.length + "\n");
      console.log(
        "All:" + arrayPeople.sort((a, b) => (a.name > b.name ? 1 : -1)).map((p) => " " + p.name) + "." + "\n"
      );
      const arrayPeopleSortHeight = arrayPeople.sort((a, b) => (Number(a.height) > Number(b.height) ? 1 : -1) + "\n");
      console.log(
        "Min height: " + arrayPeopleSortHeight[0].name + ", " + arrayPeopleSortHeight[0].height + " cm." + "\n"
      );
      console.log(
        "Max height: " +
          arrayPeopleSortHeight[arrayPeopleSortHeight.length - 1].name +
          ", " +
          arrayPeopleSortHeight[arrayPeopleSortHeight.length - 1].height +
          " cm." +
          "\n"
      );
    }
  })
  .catch((err) => console.error(err));
