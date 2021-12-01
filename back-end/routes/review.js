const express = require("express");
const router = express.Router();
const reviewController = require("../controllers").review;
const checkAuthorization = require("../controllers").checkAuthorization;

router.post(
  "/createFakeReviews",
  checkAuthorization,
  reviewController.createFakeReviews
);

router.get("/getReviewsPerBook/:id", reviewController.getReviewsPerBook);

router.post(
  "/createReview/:id",
  checkAuthorization,
  reviewController.createReview
);

router.delete(
  "/deleteReview",
  checkAuthorization,
  reviewController.deleteReview
);

router.put("/editReview", checkAuthorization, reviewController.editReview);

module.exports = router;
