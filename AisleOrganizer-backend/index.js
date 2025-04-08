const express = require("express");
const cors = require("cors");
const { createProductJSON, createResponseJSON } = require("./routes/utilities");
const  createResponse  = require("./createResponse");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const n = parseInt(req.query.n) || 10;
  const product = createProductJSON(n);
  const response = createResponseJSON(product);
  res.json(response);
});
app.get("/mapping", async(req, res) => {
  const mappingDetails = await createResponse();
  res.status(200).json(mappingDetails);
});

app.listen(3000, () => console.log("Server running on port 3000"));
