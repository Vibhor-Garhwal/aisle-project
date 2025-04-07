//the data must be created as in the following format
const jsonFile = require("./dummyData.json");
const fs = require("fs");
const filepath = "./scannedData.json";


let itemdata = {
  Num: "1",
  EPC: "54-34-23-AC",
  "Device ID": "HGN783HJ",
  "Last Read Time": "2025-04-01 18:02:12",
  "ASCI Value": "TCSL",
};
let newObj = {
  Num: "2",
  EPC: "45-G5-AH-12",
  "Device ID": "HJF83HJ",
  "Last Read Time": "2024-01-11 13:22:12",
  "ASCI Value": "TCSL",
};
function createData() {
  let dummyData = [];
  for (let i = 0; i < 6; i++) {
    dummyData = [...dummyData, data];
  }
  return dummyData;
}

function readData(filepath) {
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return `An error occurred reading the file:${err}`;
    } else {
      try {
        const jsonData = JSON.parse(data);
        console.log(jsonData.details);
        return jsonData;
      } catch (err) {
        console.log("Error parsing the JSON");
        return `Error occurred parsing the JSON in readFile ${err}`;
      }
    }
  });
}

function writeData(filepath, writeData) {
  fs.writeFile(filepath, JSON.stringify(writeData, null, 2), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written is successfull");
    }
  });
}



// console.log(x);
// writeData(filepath, data);
// readData(filepath);

// let exmp = createData();
// console.log(jsonFile);
