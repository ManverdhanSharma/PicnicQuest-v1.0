// server/models/User.js
module.exports = (mongoose) => {
    const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      email: String,
      name: String,
      badges: [{
        badgeId: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
        earnedAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 },
        completed: { type: Boolean, default: false }
      }],
      stats: {
        totalBookings: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        favoriteSpots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Spot" }],
        streakDays: { type: Number, default: 0 },
        lastActivity: Date
      }
    });
    
    // Only create the model if it doesn't already exist
    return mongoose.models.User || mongoose.model("User", userSchema);
  };
  