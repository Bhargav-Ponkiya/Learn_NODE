const { readFile, writeFile } = require("fs").promises;

const start = async () => {
  try {
    const first = await readFile("./content/first.txt", "utf-8");
    console.log(first);
    const second = await readFile("./content/second.txt", "utf-8");
    console.log(second);

    await writeFile(
      "./content/result-mind-grenade2.txt",
      `RESULT: ${first} <><><> ${second}`
    );
  } catch (error) {
    console.log(error);
  }
};

start();
