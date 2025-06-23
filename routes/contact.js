const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
  try {
    const newMessage = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;
