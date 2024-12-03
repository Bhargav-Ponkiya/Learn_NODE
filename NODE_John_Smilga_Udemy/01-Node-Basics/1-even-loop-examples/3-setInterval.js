setInterval(() => {
  console.log("hello world");
}, 2000);

console.log("I will run first due to above setInterval is Asynchronous");

// Above process stays alive unless
// Kill process --> CONTROL+C
// unexpected error occur
