const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const bookRouter = require("./book");
const authRouter = require("./auth");
const feedbackRouter = require("./feedback");
const favoriteRouter = require("./favorite");

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/auth", authRouter);
router.use("/feedback", feedbackRouter);
router.use("/favorite", favoriteRouter);

module.exports = router;
