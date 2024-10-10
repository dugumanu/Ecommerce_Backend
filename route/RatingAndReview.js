const express = require("express");
const { auth, isAdminOrSeller } = require("../middleware/auth");
const { createRatingAndReview, getAvgRating, getAllRatingsAndReviews } = require("../controller/RatingAndReview");
const router = express.Router();
router.post("/create-ratingandreview/:productId",  auth, createRatingAndReview );
router.get("/getavgrating/:productId", getAvgRating);
router.get("/getall-ratingandreview", getAllRatingsAndReviews);

module.exports = router;