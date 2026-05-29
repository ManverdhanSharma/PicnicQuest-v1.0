const router =
require("express").Router();

const review =
require(
"../controllers/reviewController"
);

router.post(
"/submit-review",
review.submitReview
);

router.get(
"/get-reviews",
review.getReviews
);

module.exports =
router;