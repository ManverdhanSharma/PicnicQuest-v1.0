const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (database: PicnicQuest)
mongoose.connect("mongodb://127.0.0.1:27017/PicnicQuest")
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// --- User Schema and Model ---
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  badges: [{
    name: String,
    description: String,
    icon: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  stats: {
    totalBookings: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    favoriteSpots: [{ type: mongoose.Schema.Types.ObjectId }],
    streakDays: { type: Number, default: 0 },
    lastActivity: Date
  }
});
const User = mongoose.model("User", userSchema);

// --- Review Schema and Model ---
const reviewSchema = new mongoose.Schema({
  locationName: String,
  nearestLandmark: String,
  reason: String,
  submittedAt: { type: Date, default: Date.now }
});
const Review = mongoose.model("Review", reviewSchema);

// --- Booking Schema and Model ---
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  people: { type: Number, required: true },
  payment: { type: Number, required: true }
});
const Booking = mongoose.model("Booking", bookingSchema);

// --- User Registration & Login ---

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      username, 
      password: hashedPassword,
      badges: [],
      stats: {
        totalBookings: 0,
        totalReviews: 0,
        lastActivity: new Date()
      }
    });
    await newUser.save();
    res.json({ message: "✅ Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error registering user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "❌ User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "❌ Incorrect password" });
    }
    res.json({ message: "✅ Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error logging in" });
  }
});

// --- Reviews ---

// Submit a new review
app.post("/submit-review", async (req, res) => {
  try {
    const { locationName, nearestLandmark, reason, username } = req.body;
    if (!locationName || !nearestLandmark || !reason) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }
    
    const newReview = new Review({ locationName, nearestLandmark, reason });
    await newReview.save();
    
    // Award badges if username is provided
    if (username) {
      const user = await User.findOne({ username });
      if (user) {
        // Initialize badges array if it doesn't exist
        if (!user.badges) user.badges = [];
        
        // Initialize stats if they don't exist
        if (!user.stats) user.stats = {};
        
        // Update stats
        user.stats.totalReviews = (user.stats.totalReviews || 0) + 1;
        user.stats.lastActivity = new Date();
        
        console.log("Total reviews:", user.stats.totalReviews); // Add logging
        
        // Check for first review badge
        if (user.stats.totalReviews === 1 && !user.badges.some(b => b.name === "First Review")) {
          console.log("Adding First Review badge"); // Add logging
          user.badges.push({
            name: "First Review",
            description: "Wrote your first review",
            icon: "/badges/first-review.svg",
            earnedAt: new Date()
          });
        }
        
        await user.save();
        console.log("User saved with badges after review:", user.badges.length); // Add logging
      }
    }
    
    res.json({ message: "✅ Review submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error submitting review!" });
  }
});

// Fetch all reviews
app.get("/get-reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ submittedAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching reviews!" });
  }
});

// --- Picnic Booking ---

// Handle picnic booking
app.post("/book-picnic", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    
    console.log("Booking saved, username:", req.body.username); // Add logging
    
    // Award badges if username is provided
    if (req.body.username) {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        console.log("Found user:", user.username); // Add logging
        
        // Initialize badges array if it doesn't exist
        if (!user.badges) user.badges = [];
        
        // Initialize stats if they don't exist
        if (!user.stats) user.stats = {};
        
        // Update stats
        user.stats.totalBookings = (user.stats.totalBookings || 0) + 1;
        user.stats.lastActivity = new Date();
        
        console.log("Total bookings:", user.stats.totalBookings); // Add logging
        
        // Check for first booking badge
        if (user.stats.totalBookings === 1 && !user.badges.some(b => b.name === "First Booking")) {
          console.log("Adding First Booking badge"); // Add logging
          user.badges.push({
            name: "First Booking",
            description: "Made your first booking",
            icon: "/badges/first-booking.svg",
            earnedAt: new Date()
          });
        }
        
        // Check for 5 bookings badge
        if (user.stats.totalBookings >= 5 && !user.badges.some(b => b.name === "Booking Pro")) {
          console.log("Adding Booking Pro badge"); // Add logging
          user.badges.push({
            name: "Booking Pro",
            description: "Made 5 or more bookings",
            icon: "/badges/booking-pro.svg",
            earnedAt: new Date()
          });
        }
        
        await user.save();
        console.log("User saved with badges:", user.badges.length); // Add logging
      }
    }
    
    res.status(201).json({ message: "✅ Picnic booking successful!" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "❌ Error saving booking", error });
  }
});

// --- User Badges ---

// Get user badges
app.get("/users/:username/badges", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user || !user.badges) return res.json([]);
    res.json(user.badges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching badges", error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
