const express = require("express");
const logger = require("./logger");
const app = express();

// order matter where we place use()
// use() ----> apply logger middleware to all the routes
//app.use(logger);

// use() ---> only apply where base path match (i.e. /api)
app.use("/api", logger);

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
