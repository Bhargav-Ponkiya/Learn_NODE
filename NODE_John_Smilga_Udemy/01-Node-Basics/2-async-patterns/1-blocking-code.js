const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home page");
    return;
  } else if (req.url === "/about") {
    // ------> block the whole flow of the website
    // BLOCKING CODE !!!!!
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`);
      }
    }

    res.end("About page");
    return;
  }
  res.end("error page");
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
