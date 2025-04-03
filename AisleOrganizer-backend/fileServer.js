const express = require("express");
const mainrouter = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000);