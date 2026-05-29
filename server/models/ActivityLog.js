const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now }
}, { collection: "activities" }); // Keeps collection name lowercase matching your DB logs

module.exports = mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);