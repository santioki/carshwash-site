const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST a new booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking({
      fullName: req.body.fullName,
      phone: req.body.phone,
      location: req.body.location,
      service: req.body.service,
      carSize: req.body.carSize,
    });

    const savedBooking = await newBooking.save();
    console.log("Booking saved:", savedBooking);  // ✅ Show confirmation in terminal
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error saving booking:", error);  // ✅ Helpful error log
    res.status(500).json({ error: "Booking could not be saved." });
  }
});

module.exports = router;
