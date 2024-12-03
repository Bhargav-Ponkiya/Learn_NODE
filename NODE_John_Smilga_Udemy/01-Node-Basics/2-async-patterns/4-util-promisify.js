const { readFile, writeFile } = require("fs");
const util = require("util");

const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

const start = async () => {
  try {
    const first = await readFilePromise("./content/first.txt", "utf-8");
    console.log(first);
    const second = await readFilePromise("./content/second.txt", "utf-8");
    console.log(second);

    await writeFilePromise(
      "./content/result-mind-grenade1.txt",
      `RESULT: ${first} <><><> ${second}`
    );
  } catch (error) {
    console.log(error);
  }
};

start();
