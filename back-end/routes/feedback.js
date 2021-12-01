const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers").feedback;
const checkAuthorization = require("../controllers").checkAuthorization;

router.post(
  "/createFakeFeedback/:id",
  checkAuthorization,
  feedbackController.createFakeFeedback
);

router.get("/getFeedbackPerBook/:id", feedbackController.getFeedbackPerBook);

router.post(
  "/createFeedback/:id",
  checkAuthorization,
  feedbackController.createFeedback
);

router.delete(
  "/deleteFeedback/:id",
  checkAuthorization,
  feedbackController.deleteFeedback
);

router.put(
  "/editFeedback/:id",
  checkAuthorization,
  feedbackController.editFeedback
);

module.exports = router;
