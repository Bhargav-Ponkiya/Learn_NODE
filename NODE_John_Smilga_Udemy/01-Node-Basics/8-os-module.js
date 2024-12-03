// os is a built in module in nodeJS

const os = require("os");

// info about user
const userInfo = os.userInfo();
console.log(userInfo);

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};

console.log(currentOS);
