const { readFile } = require("fs");

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf-8", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const start = async () => {
  try {
    const first = await getText("./content/first.txt");
    console.log(first);
    const second = await getText("../content/second.txt");
    console.log(second);
  } catch (error) {
    console.log(error);
  }
};

start();
