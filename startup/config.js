const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("DATAL ERROR: jwtPrivateKey is not defined.");
  }
};
