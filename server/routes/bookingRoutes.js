const router =
require("express").Router();

const booking =
require(
"../controllers/bookingController"
);

router.post(
"/book-picnic",
booking.bookPicnic
);

router.get(
"/users/:username/badges",
booking.getBadges
);

module.exports =
router;