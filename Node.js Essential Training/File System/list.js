/*const fs = require("fs");

const files = fs.readdirSync("./assets");
console.log(files);*/

const fs = require("fs");

fs.readdir("./assets", (err, files) => {
  if (err) {
    throw err;
  }
  console.log("complete");
  console.log(files);
});

console.log("started reading files");
