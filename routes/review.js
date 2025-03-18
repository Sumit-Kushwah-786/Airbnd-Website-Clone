const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview , isLoggendIn , isReviewAuthor} = require("../middleware.js")
const reviewControllers = require("../controllers/reviews.js");


// post Review route
router.post("/",isLoggendIn,validateReview,wrapAsync(reviewControllers.creatReview));

//Delete Review Route
router.delete("/:reviewId",isLoggendIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));


module.exports = router;