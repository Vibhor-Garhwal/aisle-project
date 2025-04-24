const express = require("express");
const cors = require("cors");
const {
  createProductJSON,
  createResponseJSON,
  groupByCurrentZone,
} = require("./routes/utilities");
const { createResponse, createResponse2 } = require("./createResponse");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const n = parseInt(req.query.n) || 10;
  const product = createProductJSON(n);
  const response = createResponseJSON(product);
  res.json(response);
});
app.get("/mapping", async (req, res) => {
  const mappingDetails = await createResponse();
  // console.log(mappingDetails);
  const response = await groupByCurrentZone();
  // console.log(x);
  res.status(200).json(response);
});

app.listen(3000, () => console.log("Server running on port 3000"));
