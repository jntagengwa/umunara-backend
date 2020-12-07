const winston = require("winston");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
//require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");
app.use("/", (req, res) => {
  MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
    db.collection("Example", function (err, collection) {
      collection.insert({ pageHits: "pageHits" });
      db.collection("Example").count(function (err, count) {
        if (err) throw err;
        res.status(200).send("Page Hits: " + Math.floor(count / 2));
      });
    });
  });
});

app.listen(port);
console.log(`Server running at http://${db}:${port}/`);

module.exports = server;
