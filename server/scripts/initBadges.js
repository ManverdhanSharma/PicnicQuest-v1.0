// server/scripts/initBadges.js
const mongoose = require("mongoose");
const Badge = require("../models/Badge");

mongoose.connect("mongodb://127.0.0.1:27017/PicnicQuest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const badges = [
  {
    name: "First Timer",
    description: "Book your first picnic",
    icon: "/badges/first-timer.svg",
    category: "booking",
    criteria: {
      type: "count",
      value: 1
    },
    level: 1
  },
  {
    name: "Regular Explorer",
    description: "Book 5 picnics",
    icon: "/badges/regular-explorer.svg",
    category: "booking",
    criteria: {
      type: "count",
      value: 5
    },
    level: 2
  },
  {
    name: "Picnic Expert",
    description: "Book 10 picnics",
    icon: "/badges/picnic-expert.svg",
    category: "booking",
    criteria: {
      type: "count",
      value: 10
    },
    level: 3
  },
  {
    name: "First Review",
    description: "Write your first review",
    icon: "/badges/first-review.svg",
    category: "review",
    criteria: {
      type: "count",
      value: 1
    },
    level: 1
  },
  {
    name: "Review Pro",
    description: "Write 5 reviews",
    icon: "/badges/review-pro.svg",
    category: "review",
    criteria: {
      type: "count",
      value: 5
    },
    level: 2
  },
  {
    name: "Critic",
    description: "Write 10 reviews",
    icon: "/badges/critic.svg",
    category: "review",
    criteria: {
      type: "count",
      value: 10
    },
    level: 3
  },
  {
    name: "Beach Lover",
    description: "Visit Marina Beach",
    icon: "/badges/beach-lover.svg",
    category: "exploration",
    criteria: {
      type: "milestone",
      value: 1,
      target: "1234567890" // Replace with actual spot ID
    },
    level: 1
  },
  {
    name: "Consistent Explorer",
    description: "Visit for 3 consecutive days",
    icon: "/badges/consistent-explorer.svg",
    category: "social",
    criteria: {
      type: "streak",
      value: 3
    },
    level: 2
  },
  {
    name: "Early Bird",
    description: "Book a morning picnic (before 8 AM)",
    icon: "/badges/early-bird.svg",
    category: "special",
    criteria: {
      type: "achievement",
      value: 1
    },
    level: 1
  }
];

const initBadges = async () => {
  try {
    // Clear existing badges
    await Badge.deleteMany({});
    
    // Insert new badges
    await Badge.insertMany(badges);
    
    console.log("✅ Badges initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing badges:", error);
    process.exit(1);
  }
};

initBadges();
