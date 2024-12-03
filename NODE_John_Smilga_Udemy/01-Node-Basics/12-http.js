const http = require("http");

const server = http.createServer((req, res) => {
  //   res.write("Welcome to our home page");
  //   res.end();

  if (req.url === "/") {
    res.end("Welcome to our home page");
    return;
  }
  if (req.url === "/about") {
    res.end("about page");
    return;
  }

  res.end(`<h1>Oops! Page not found</h1>`);
});

server.listen(5000);
