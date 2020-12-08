const winston = require("winston");
const express = require("express");
const config = require("config");
const http = require("http");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
//require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");
const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
module.exports = server;
