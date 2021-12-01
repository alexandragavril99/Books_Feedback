const user = require("./user");
const book = require("./book");
const auth = require("./auth");
const review = require("./review");
const checkAuthorization = require("./middleware").checkAuthorization;

const controller = {
  user,
  book,
  auth,
  review,
  checkAuthorization,
};

module.exports = controller;
