require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const analyticsRoutes =
require(
"./routes/analyticsRoutes"
);
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
// Imported our new live logging controller route block
const activityRoutes = require("./routes/activityRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Core Route Middleware Handlers
app.use(authRoutes);
app.use(reviewRoutes);
app.use(bookingRoutes);
// Registered our new live logging namespace gateway middleware
app.use("/activity", activityRoutes);
// Registered our new analytics namespace gateway middleware
app.use("/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});