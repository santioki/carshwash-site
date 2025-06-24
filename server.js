const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const bookingsRoute = require('./routes/bookings');
const contactRoute = require('./routes/contact');
const adminRoute = require('./routes/admin');

const app = express();
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host === 'prowash.it.com') {
    return res.redirect(301, 'https://www.prowash.it.com' + req.url);
  }
  next();
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.user(express.urlencoded({ extended: true }))

// ✅ Serve static files from the "public" folder
app.use(express.static('public'));

// Routes
app.use('/api/bookings', bookingsRoute);
app.use('/api/contact', contactRoute);
app.use('/api/admin', adminRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
