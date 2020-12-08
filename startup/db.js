const mongoose = require("mongoose"); // Import mongoose library

module.exports = function () {
  mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  mongoose.connection
    .once("open", function () {
      console.log("Conection has been made!");
    })
    .on("error", function (error) {
      console.log("Error is: ", error);
    });
};
