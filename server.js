require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


const bookingsRoute = require("./routes/bookings");
const contactRoute = require("./routes/contact");
const adminRoute = require("./routes/admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect non-www to www
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host === "prowash.it.com") {
    return res.redirect(301, "https://www.prowash.it.com" + req.url);
  }
  next();
});

// Serve static files
app.use(express.static("public"));

// Routes
app.use("/api/bookings", bookingsRoute);
app.use("/api/contact", contactRoute);
app.use("/api/admin", adminRoute);
console.log("Admin route mounted at /api/admin");


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
