const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  locationName: String,
  nearestLandmark: String,
  reason: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Review", reviewSchema);