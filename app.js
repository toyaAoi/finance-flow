const express = require("express");
const cors = require("cors");
const app = express();

// TODO: Configure CORS origins
app.use(cors());
app.use(express.json);

module.exports = app;
