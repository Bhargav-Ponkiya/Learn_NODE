const { readFile, writeFile } = require("fs");

console.log("start");
readFile("./content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;

  readFile("./content/second.txt", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;

    writeFile(
      "./content/result-async.txt",
      `result: ${first + second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("ended writing in file");
      }
    );
  });
});

console.log("start new task");
