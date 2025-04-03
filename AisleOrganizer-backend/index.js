const express = require("express");
const cors = require("cors");
const { createProductJSON, createResponseJSON } = require("./routes/utilities");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const n = parseInt(req.query.n) || 10;
  const product = createProductJSON(n);
  const response = createResponseJSON(product);
  res.json(response);
});

app.listen(3000, () => console.log("Server running on port 3000"));
