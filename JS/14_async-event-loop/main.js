const cssPromises = {};

function loadResourse(src) {
  if (src.endsWith(".js")) return import(src);

  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }

  return fetch(src).then((res) => res.json());
}

const searchParams = new URLSearchParams(location.search);
let filmNumber = searchParams.get("filmNumber");

function renderPage(moduleName, apiUrl, css) {
  app.innerHTML = "";
  Promise.all([moduleName, apiUrl, css].map((src) => loadResourse(src)))
    .then(([pageModule, data]) => {
      pageModule.render(data.result);
    })
    .then(() => {
      const listLink = document.getElementsByTagName("a");

      if (listLink) {
        for (const iterator of listLink) {
          iterator.addEventListener("click", (e) => {
            e.preventDefault();

            history.pushState(null, "", iterator.href);

            loadPage(
              iterator.href.slice(iterator.href.lastIndexOf("filmNumber=") + 11)
            );
          });
        }
      }
    });
}

function loadPage(filmNumber) {
  renderPage(
    `${filmNumber ? "./sw-app/film-page.js" : "./sw-app/films-page.js"}`,
    `https://www.swapi.tech/api/films/${filmNumber ? filmNumber : ""}`,
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  );
}

if (filmNumber) loadPage(filmNumber);
else loadPage();

window.addEventListener("popstate", () => {
  if (location.href.includes("filmNumber"))
    loadPage(
      location.href.slice(location.href.lastIndexOf("filmNumber=") + 11)
    );
  else loadPage();
});
