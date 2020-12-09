const mongoose = require("mongoose"); // Import mongoose library
const config = require("config");

module.exports = function () {
  mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", function () {
      console.log("Conection has been made!");
    })
    .on("error", function (error) {
      console.log("Error is: ", error);
    });
};
