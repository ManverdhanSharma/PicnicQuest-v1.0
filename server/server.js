require('dotenv').config(); // Load .env locally; ignored on Railway [471]

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

// Respect platform PORT; default to 3002 locally [473][476]
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- MongoDB connection with explicit env check ---
const uri = process.env.MONGODB_URI; // Must be set in Railway Variables (raw string, no quotes) [259][449]

if (!uri) {
  console.error("❌ MONGODB_URI missing at runtime. Set it in Railway Variables as the raw mongodb+srv://... string (no quotes)."); // [441][259]
  process.exit(1);
}

mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 5000, // faster feedback during deploys [504][505]
  })
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas")) // [504]
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err); // [441]
    process.exit(1);
  });

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
  payment: { type: Number, required: true },
  username: String
});
const Booking = mongoose.model("Booking", bookingSchema);

// --- Auth: Register ---
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

// --- Auth: Login ---
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

// --- Reviews: Submit ---
app.post("/submit-review", async (req, res) => {
  try {
    const { locationName, nearestLandmark, reason, username } = req.body;
    if (!locationName || !nearestLandmark || !reason) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }

    const newReview = new Review({ locationName, nearestLandmark, reason });
    await newReview.save();

    if (username) {
      const user = await User.findOne({ username });
      if (user) {
        user.stats.totalReviews = (user.stats.totalReviews || 0) + 1;
        user.stats.lastActivity = new Date();

        if (user.stats.totalReviews === 1 && !user.badges.some(b => b.name === "First Review")) {
          user.badges.push({
            name: "First Review",
            description: "Wrote your first review",
            icon: "/badges/first-review.svg",
            earnedAt: new Date()
          });
        }
        await user.save();
      }
    }
    res.json({ message: "✅ Review submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error submitting review!" });
  }
});

// --- Reviews: Fetch all ---
app.get("/get-reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ submittedAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching reviews!" });
  }
});

// --- Bookings: Create ---
app.post("/book-picnic", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    if (req.body.username) {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        user.stats.totalBookings = (user.stats.totalBookings || 0) + 1;
        user.stats.lastActivity = new Date();

        if (user.stats.totalBookings === 1 && !user.badges.some(b => b.name === "First Booking")) {
          user.badges.push({ name: "First Booking", description: "Made your first booking", icon: "/badges/first-booking.svg" });
        }
        if (user.stats.totalBookings >= 5 && !user.badges.some(b => b.name === "Booking Pro")) {
          user.badges.push({ name: "Booking Pro", description: "Made 5 or more bookings", icon: "/badges/booking-pro.svg" });
        }
        await user.save();
      }
    }
    res.status(201).json({ message: "✅ Picnic booking successful!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving booking", error: error.message });
  }
});

// --- User Badges: Get ---
app.get("/users/:username/badges", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user || !user.badges) return res.json([]);
    res.json(user.badges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching badges", error: error.message });
  }
});

// Start HTTP server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
