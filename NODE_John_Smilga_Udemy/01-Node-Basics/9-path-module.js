// path - built in module provided by nodeJS

const path = require("path");

console.log(path.sep);

const filePath = path.join("/content/", "/subfolder/", "/text.txt/");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

const dir = __dirname;
const file = __filename;
console.log(dir, file);

const absolute = path.resolve(__dirname, "content", "subfolder", "text.txt");
console.log(absolute);
