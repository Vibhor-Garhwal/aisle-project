const fs = require("fs").promises;

async function createResponse() {
  //this has to read the data from the scannedDatas.json and ownershipData.json

  const scannedRaw = await fs.readFile("./scannedData.json", "utf-8");
  const ownershipRaw = await fs.readFile("./ownerShipData.json", "utf-8");

  const scannedData = JSON.parse(scannedRaw);
  //Data structure
  // {
  //     "details":[
  //         {   "Num": "1",
  //             "EPC": "54-34-23-AC",
  //             "Device ID": "HGN783HJ",
  //             "Last Read Time": "2025-04-01 18:02:12",
  //             "ASCI Value": "TCSL"
  //         },
  //         {   "Num": "2",
  //             "EPC": "54-G5-AH-AC",
  //             "Device ID": "HGN783HJ",
  //             "Last Read Time": "2025-04-01 18:02:12",
  //             "ASCI Value": "TCSL"
  //         },
  //         {
  //             "Num": "3",
  //             "EPC": "45-G5-AH-12",
  //             "Device ID": "HJF83HJ",
  //             "Last Read Time": "2024-01-11 13:22:12",
  //             "ASCI Value": "TCSL"
  //           }
  //     ]
  // }

  const ownershipData = JSON.parse(ownershipRaw);
  // 'EPC':'Device ID'
  // console.log(ownershipData);
  const scannedProducts = scannedData.details;

  const response = [];

  for (const product of scannedProducts) {
    let productid = product.EPC;
    // console.log(productid);
    let deviceId = product["Device ID"];
    // console.log(deviceId);
    if (ownershipData[productid] != deviceId) {
      // console.log(false);
      const responseItem = {
        EPC: productid,
        "Device ID": deviceId,
        "Correct Device": ownershipData[productid] || "Unknown",
      };
      response.push(responseItem);
      //   console.log(responseItem);
    }

    // console.log(productid);

    // console.log(deviceId);
  }
  //   console.log(`Response is : \n`,response);

  // console.log(scannedProducts);
  // console.log(ownershipData);
  return response;
}
// createResponse().then((res) => console.log(res));

async function createResponse2() {
  const productRaw = await fs.readFile("./productData.json", "utf-8");
  const scannedRaw = await fs.readFile("./scannedData.json", "utf-8");
  const scannedData = JSON.parse(scannedRaw);
  const productData = JSON.parse(productRaw);

  // console.log(scannedData);
  // console.log(productData);
  const scannedSKU = scannedData.scannedSKU;
  const productDetails = productData.data;

  // console.log(scannedSKU);
  // console.log(productDetails);

  const response = scannedSKU.map((scannedItem) => {
    const product = productDetails.find((p) => p.SKU === scannedItem.SKU);

    if (product) {
      return {
        SKU: scannedItem.SKU,
        CorrectlyPlaced: scannedItem.zone === product.zone,
        currentZone: scannedItem.zone,
        correctZone: product.zone,
      };
    } else {
      return {
        SKU: scannedItem.SKU,
        CorrectlyPlaced: false,
        currentZone: scannedItem.zone,
        correctZone: "unknown",
      };
    }
  });
  // console.log(response);
  
  return response;
}
module.exports = { createResponse, createResponse2 };
