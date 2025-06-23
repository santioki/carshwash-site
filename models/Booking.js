const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  service: { type: String, required: true },
  carSize: { type: String, required: true }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
