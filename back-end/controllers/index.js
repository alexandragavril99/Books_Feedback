const user = require("./user");
const book = require("./book");
const auth = require("./auth");
const feedback = require("./feedback");
const favorite = require("./favorite");
const checkAuthorization = require("./middleware").checkAuthorization;

const controller = {
  user,
  book,
  auth,
  feedback,
  favorite,
  checkAuthorization,
};

module.exports = controller;
