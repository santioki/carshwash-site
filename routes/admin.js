require('dotenv').config();

const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking'); // ✅ Add this
const Contact = require('../models/contact'); // ✅ Add this

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log("Entered username:", username);
  console.log("Entered password:", password);
  console.log("Expected username:", ADMIN_USERNAME);
  console.log("Expected username:", ADMIN_PASSWORD);

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// GET /api/admin/bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// GET /api/admin/contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts); // ← SAME HERE
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// DELETE a booking by ID
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings); // ← THIS MUST BE "res.json", not "res.send"
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// DELETE a booking by ID
router.delete('/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});



// DELETE a contact message by ID
router.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact message' });
  }
});

module.exports = router;
