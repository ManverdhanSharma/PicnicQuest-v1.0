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
mongoose.connect("mongodb://127.0.0.1:27017/PicnicQuest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// --- User Registration & Login ---

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", userSchema);

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
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

// Review Schema and Model
const reviewSchema = new mongoose.Schema({
  locationName: String,
  nearestLandmark: String,
  reason: String,
  submittedAt: { type: Date, default: Date.now }
});
const Review = mongoose.model("Review", reviewSchema);

// Submit a new review
app.post("/submit-review", async (req, res) => {
  try {
    const { locationName, nearestLandmark, reason } = req.body;
    if (!locationName || !nearestLandmark || !reason) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }
    const newReview = new Review({ locationName, nearestLandmark, reason });
    await newReview.save();
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

// Booking Schema and Model
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  people: { type: Number, required: true },
  payment: { type: Number, required: true }
});
const Booking = mongoose.model("Booking", bookingSchema);

// Handle picnic booking
app.post("/book-picnic", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "✅ Picnic booking successful!" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "❌ Error saving booking", error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
