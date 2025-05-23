const { createResponse2 } = require("../createResponse");

function createProductJSON(length) {
  let result = [];
  for (let i = 0; i < length; i++) {
    let radar = createRandomRadar();
    let product = createRandomProductId();
    let linkedRadar = getDifferentRadar(radar); // Ensure it's different
    result.push({ radar, product, linkedRadar });
  }
  return result;
}

function randomUtility(n) {
  return Math.floor(Math.random() * n);
}

function createRandomProductId() {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let product = "#";
  for (let i = 0; i < 6; i++) {
    product += numbers[randomUtility(10)];
  }
  return product;
}

function createRandomRadar() {
  const radars = ["R1", "R2", "R3"];
  return radars[randomUtility(radars.length)];
}

// Ensures `linkedRadar` is different from `radar`
function getDifferentRadar(currentRadar) {
  const availableRadars = ["R1", "R2", "R3"].filter((r) => r !== currentRadar);
  return availableRadars[randomUtility(availableRadars.length)];
}

function createResponseJSON(productData) {
  return productData.reduce((acc, { radar, product, linkedRadar }) => {
    if (!acc[radar]) {
      acc[radar] = [];
    }
    acc[radar].push({ id: product, linkedRadar });
    return acc;
  }, {});
}

async function groupByCurrentZone() {
  // Get the response from createResponse2
  const response = await createResponse2();

  // Initialize an empty object to group by zones
  const groupedByZone = {};

  // Iterate through the response and group by currentZone
  response.forEach((item) => {
    const zone = item.currentZone;

    // If the zone doesn't exist in the grouped object, initialize it as an array
    if (!groupedByZone[zone]) {
      groupedByZone[zone] = [];
    }

    // Add the current item to the corresponding zone
    groupedByZone[zone].push({
      SKU: item.SKU,
      CorrectlyPlaced: item.CorrectlyPlaced,
      correctZone: item.correctZone,
    });
  });

  return groupedByZone;
}

// Example usage
// groupByCurrentZone().then((groupedData) => console.log(groupedData));

module.exports = { createProductJSON, createResponseJSON, groupByCurrentZone };
