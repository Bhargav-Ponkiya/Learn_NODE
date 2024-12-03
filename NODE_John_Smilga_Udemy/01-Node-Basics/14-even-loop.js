// Event Loop ---> allow Node.js to perform non-blocking I/O operations - despite the fact that JavaScript is single-threaded.
// -> by offloading operations to the system kernel whenever possible.

/*
console.log("start");

for (let i = 0; i < 10000; i++) {
  console.log(i);
}

console.log("end");
*/

/*
console.log("start");

setTimeout(() => {
  console.log("in set timeout");
}, 0);

for (let i = 0; i < 1000; i++) {
  console.log(i);
}

console.log("end");
*/
