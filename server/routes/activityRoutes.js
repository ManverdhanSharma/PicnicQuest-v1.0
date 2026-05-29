const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");

// CHANGED: Added (.*) to explicitly allow periods and emails in the parameter
router.get("/:username(.*)", async (req, res) => {
  try {
    const logs = await ActivityLog.find({ username: req.params.username })
      .sort({ timestamp: -1 })
      .limit(20);

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activity" });
  }
});

module.exports = router;