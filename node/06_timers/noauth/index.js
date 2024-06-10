const express = require("express");
const nunjucks = require("nunjucks");
const { nanoid } = require("nanoid");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  tags: {
    blockStart: "[%",
    blockEnd: "%]",
    variableStart: "[[",
    variableEnd: "]]",
    commentStart: "[#",
    commentEnd: "#]",
  },
});

app.set("view engine", "njk");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

// You can use these initial data

const TIMERS = [
  {
    start: Date.now(),
    description: "Timer 1",
    isActive: true,
    id: nanoid(),
  },
  {
    start: Date.now() - 5000,
    end: Date.now() - 3000,
    duration: 2000,
    description: "Timer 0",
    isActive: false,
    id: nanoid(),
  },
];

app.get("/api/timers", (req, res) => {
  if (TIMERS.length > 0) {
    if (req.query.isActive === "true") {
      if (TIMERS.filter((elem) => elem.isActive === true).length > 0) {
        const arr = TIMERS.filter((elem) => elem.isActive === true);
        arr.forEach((item) => (item.progress = Date.now() - item.start));
        res.status(200).send(arr);
      } else res.sendStatus(204);
    } else {
      if (TIMERS.filter((elem) => elem.isActive === false).length > 0)
        res.status(200).send(TIMERS.filter((elem) => elem.isActive === false));
      else res.sendStatus(204);
    }
  } else res.sendStatus(204);
});

app.post("/api/timers", (req, res) => {
  const idTimer = nanoid();
  TIMERS.push({
    start: Date.now(),
    description: req.body.description,
    isActive: true,
    id: idTimer,
  });
  res.status(201).send({ id: idTimer });
});

app.post("/api/timers/:id/stop", (req, res) => {
  TIMERS.filter((elem) => elem.id === req.params.id).forEach((item) => {
    item.isActive = false;
    item.end = Date.now();
    item.duration = Date.now() - item.start;
  });
  res.sendStatus(204);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
