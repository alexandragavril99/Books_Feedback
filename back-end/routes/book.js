const express = require("express");
const router = express.Router();
const bookController = require("../controllers").book;
const checkAuthorization = require("../controllers").checkAuthorization;

router.post("/createBooks", checkAuthorization, bookController.createBooks);

router.get("/getAllBooks", bookController.getAllBooks);

module.exports = router;
