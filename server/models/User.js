const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  badges: [{
    name: String,
    description: String,
    icon: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  stats: {
    totalBookings: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    favoriteSpots: [{
      type: mongoose.Schema.Types.ObjectId
    }],
    streakDays: {
      type: Number,
      default: 0
    },
    lastActivity: Date
  }
});

module.exports = mongoose.model("User", userSchema);