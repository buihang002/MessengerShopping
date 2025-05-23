//bài nào cũng giống nhau
const express = require("express");
const { connect } = require("mongoose");
const router = require("./src/routers/index.js");
const dotenv = require("dotenv");
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
connect(MONGODB_URI);

// For parsing application/json
//app.use(express.json());
app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
