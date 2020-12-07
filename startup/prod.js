const helmet = require("helmet");
const compression = require("compression");
//const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
  //app.use(bodyParser.json());
  //app.use(bodyParser.urlEncoded({ extended: false }));
};
