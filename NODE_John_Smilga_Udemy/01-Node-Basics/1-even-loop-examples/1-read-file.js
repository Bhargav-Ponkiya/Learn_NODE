const { readFile } = require("fs");

console.log("Started first task");

readFile("../content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
    console.log("Completed first task");
  }
});

console.log("Started next task");
