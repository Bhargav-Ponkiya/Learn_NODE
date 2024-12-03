const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
app.use(express.static("./public"));

// Two ways to set index.html

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });

// 1. ---> adding index.html file to static assets (i.e public folder)
// 2. ---> SSR --> using Template engines

// order matter of .all()
app.all("*", (req, res) => {
  res.status(404).send(`<h1>resource not found</h1>`);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
