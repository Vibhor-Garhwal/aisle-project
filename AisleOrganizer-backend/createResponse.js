// import { log } from 'console';

const fs = require('fs').promises;

async function createResponse() {
    //this has to read the data from the scannedDatas.json and ownershipData.json

    const scannedRaw = await fs.readFile('./scannedData.json', 'utf-8');
    const ownershipRaw = await fs.readFile('./ownerShipData.json', 'utf-8');

    const scannedData = JSON.parse(scannedRaw);
    const ownershipData = JSON.parse(ownershipRaw);

    const scannedProducts = scannedData.details;

    for (const product of scannedProducts) {
        let productid = product.EPC;
        let deviceId = product["Device ID"];
        
        if (ownershipData[productid] != deviceId) {
            
        }
        
        // console.log(productid);


        // console.log(deviceId);
    }

    // console.log(scannedProducts);
    // console.log(ownershipData);
}

createResponse();