const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");
const { nanoid } = require("nanoid");
const crypto = require("crypto");

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
app.use(cookieParser());

const auth = () => (req, res, next) => {
  if (!req.cookies["sessionId"]) return next();
  const user = findUserBySessionId(req.cookies["sessionId"]);
  req.user = user;
  req.sessionId = req.cookies["sessionId"];
  next();
};

const hash = (pass) => crypto.createHash("sha256").update(pass).digest("hex");

const DB = {
  users: [
    {
      _id: nanoid(),
      username: "admin",
      password: hash("pwd007"),
    },
  ],
  sessions: {},
  timers: [],
};

app.get("/", auth(), (req, res) => {
  res.render("index", {
    user: req.user,
    authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
  });
});

const findUserByUsername = (username) => DB.users.find((u) => u.username === username);

const findUserBySessionId = (sessionId) => {
  const userId = DB.sessions[sessionId];
  if (!userId) return;
  return DB.users.find((u) => u._id === userId);
};

const createSession = (userId) => {
  const sessionId = nanoid();
  DB.sessions[sessionId] = userId;
  return sessionId;
};

const deleteSession = (sessionId) => {
  delete DB.sessions[sessionId];
};

app.post("/login", bodyParser.urlencoded({ extended: false }), (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user || user.password !== hash(password)) return res.redirect("/?authError=true");
  const sessionId = createSession(user._id);
  res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/");
});

app.post("/signup", bodyParser.urlencoded({ extended: false }), (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") return res.redirect("/?authError=Invalid username or password");
  if (DB.users.find((user) => user.username === username)) return res.redirect("/?authError=The user already exists");
  const userId = nanoid();
  DB.users.push({
    _id: userId,
    username: username,
    password: hash(password),
  });
  const sessionId = createSession(userId);
  res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/");
});

app.get("/logout", auth(), (req, res) => {
  if (!req.user) return res.redirect("/");
  deleteSession(req.sessionId);
  res.clearCookie("sessionId").redirect("/");
});

app.get("/api/timers", auth(), (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const userTimers = DB.timers.filter((timer) => timer.userId === req.user._id);
  if (userTimers.length > 0) {
    if (req.query.isActive === "true") {
      if (userTimers.filter((elem) => elem.isActive === true).length > 0) {
        const arr = userTimers.filter((elem) => elem.isActive === true);
        arr.forEach((item) => (item.progress = Date.now() - item.start));
        res.status(200).send(arr);
      } else res.sendStatus(204);
    } else {
      if (userTimers.filter((elem) => elem.isActive === false).length > 0)
        res.status(200).send(userTimers.filter((elem) => elem.isActive === false));
      else res.sendStatus(204);
    }
  } else res.sendStatus(204);
});

app.post("/api/timers", auth(), (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const idTimer = nanoid();
  DB.timers.push({
    userId: req.user._id,
    start: Date.now(),
    description: req.body.description,
    isActive: true,
    id: idTimer,
  });
  res.status(201).send({ id: idTimer });
});

app.post("/api/timers/:id/stop", auth(), (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const userTimers = DB.timers.filter((timer) => timer.userId === req.user._id);
  userTimers
    .filter((elem) => elem.id === req.params.id)
    .forEach((item) => {
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
