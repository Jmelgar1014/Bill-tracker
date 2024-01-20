const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));

//middleware for JSON
app.use(express.json());

//serve static files

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "index.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "login.html"));
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "pages", "404.html"));
});

console.log(path.join(__dirname, "public", "JS-pages", "home.js"));
app.listen(PORT, () => {
  console.log(`listening on port${PORT}`);
});
