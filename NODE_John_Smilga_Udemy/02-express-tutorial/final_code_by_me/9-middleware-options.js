const express = require("express");
const app = express();

const logger = require("./logger");
const authorize = require("./authorize");
const morgan = require("morgan");

// multiple middleware - put it in array
// order matters
// app.use([logger, authorize]);

// Middleware options:-
//1. our own --> logger, authorize
//2. express --> express.static("./public")  ---> here, static() is a middleware
//3. third party --> morgan

// third party middleware (morgan)  --> npm i morgan
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", [logger, authorize], (req, res) => {
  console.log(req.user);
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
