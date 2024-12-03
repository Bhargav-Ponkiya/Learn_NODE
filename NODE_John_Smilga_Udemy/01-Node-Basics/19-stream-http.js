const http = require("http");
const fs = require("fs");

/*
http
  .createServer((req, res) => {
    const text = fs.readFileSync("./content/big.txt", "utf-8");
    res.end(text);
  })
  .listen(5000, () => {
    console.log("Server is listening on port 5000...");
  });
  */

http
  .createServer((req, res) => {
    const stream = fs.createReadStream("./content/big.txt", "utf-8");
    stream.on("open", (result) => {
      // pipe() --> write data in chunk
      stream.pipe(res); /// --------> need to understand how this works ??????????????????
    });

    stream.on("error", (err) => {
      console.log(err); //  ----> why err is printing 2 times in console ??????????????????///
      //    res.end(err);     --->  TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance of Buffer or Uint8Array.
      res.end();
    });
  })
  .listen(5000, () => {
    console.log("Server is listening on port 5000...");
  });
