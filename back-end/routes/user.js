const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;

router.post("/createUsers", userController.createUsers);
router.post("/addUser", userController.addUser);

module.exports = router;
