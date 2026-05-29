const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  people: {
    type: Number,
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  username: String
});

module.exports = mongoose.model("Booking", bookingSchema);