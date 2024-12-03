const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", (name, age) => {
  console.log(`data received : user ${name} and age ${age}`);
});

customEmitter.on("response", () => {
  console.log(`some other logic here`);
});

console.log("before emit");

// order matters where we are putting .emit() code...
// we can pass argument also...
customEmitter.emit("response", "bhargav", 24);

console.log("after emit");
