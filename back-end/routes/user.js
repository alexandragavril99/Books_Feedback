const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;

router.post("/createUsers", userController.createUsers);
router.post("/addUser", userController.addUser);
router.get("/getUser/:id", userController.getUser);

module.exports = router;
