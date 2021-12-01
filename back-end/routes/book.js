const express = require("express");
const router = express.Router();
const bookController = require("../controllers").book;
const checkAuthorization = require("../controllers").checkAuthorization;

router.post("/createBooks", checkAuthorization, bookController.createBooks);

module.exports = router;
