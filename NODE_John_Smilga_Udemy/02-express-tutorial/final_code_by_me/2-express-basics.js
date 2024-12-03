const express = require("express");
const app = express();

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen

app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

// order matter of .all()
app.all("*", (req, res) => {
  res.status(404).send(`<h1>resource not found</h1>`);
});

app.get("/about", (req, res) => {
  res.status(200).send("About page");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
