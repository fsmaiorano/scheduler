const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
require("dotenv").config({ path: envPath });

const app = require("express")();
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const bodyParser = require("body-parser");
const cors = require("./config/cors");

const serverConfig = require("./config/server");
const dbConfig = require("./config/database");

mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());
app.use("/api", require("./app/routes"));

app.use(cors);

app.listen(process.env.PORT || serverConfig.port);

module.exports = app;
