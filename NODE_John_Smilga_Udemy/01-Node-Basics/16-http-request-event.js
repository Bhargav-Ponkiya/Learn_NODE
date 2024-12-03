// bunch of built-in module heavily depends (use) ---> Events behind the scene

const http = require("http");

// Using Event Emitter API
const server = http.createServer();

// server behind the scene, emit 'request' event
server.on("request", (req, res) => {
  res.end("Welcome");
});

server.listen(5000, () => {
  console.log("server is listening on port: 5000...");
});
