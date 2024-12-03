const express = require("express");
const app = express();

const auth = require("./final_code_by_me/11-routes-controllers/routes/auth");
const people = require("./final_code_by_me/11-routes-controllers/routes/people");

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

app.use("/login", auth);
app.use("/api/people", people);

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
