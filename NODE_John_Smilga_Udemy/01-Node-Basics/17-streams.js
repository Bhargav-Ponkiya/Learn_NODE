// streams ---> read, write data sequentially

// Writeable
// Readable
// Duplex
// Transform

/*
const { createReadStream } = require("fs");

const stream = createReadStream("./content/big.txt");

console.log("before on()");

stream.on("data", (data) => {
  console.log(data);
});

console.log("after on()");
*/

/////////////////////////// Streams --> Additional info //////////////////////////////

// default size --> 64kb
// last buffer --> remainder
// highWaterMark --> control size
/*
const stream = createReadStream("./content/bit.txt", {
  highWaterMark: 90000,
  encoding: "utf-8",
});
*/

const { createReadStream } = require("fs");

const stream = createReadStream("./content/big.txt", {
  highWaterMark: 90000,
  //  encoding: "utf-8",
});

stream.on("data", (result) => {
  console.log(result);
});

stream.on("error", (error) => console.log(error));
