// npm --> global command, comes with node when we install node
// npm --version

// local dependency - use it only in this particular project
// npm i <packageName>

// global dependency - use it in any project
// npm i -g <packageName>

// package.json ---> manifest file (store important info about project/package)
/////// 3 ways through which we can create package.json file ////////////////

// manual approach (create package.json in the root, create required properties)
// npm init (step by step, press enter to skip)
// npm init -y (everything default)

// uninstall package ---> npm uninstall <packageName>
// uninstall package globally ---> npm uninstall -g <packageName>

// npx create-react-app my-app   ---> no need to install 'create-react-app' globally

// package-lock.json ---> store info about version of all the dependecies and dependent dependencies used in this project

const _ = require("lodash");

const items = [1, [2, [3, [4, [5]]]]];
const newItems = _.flattenDeep(items);
console.log(newItems);

console.log("Hello world");
