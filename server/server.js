require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const budgetRouter = require("./router/routes");

const app = express();

// List of allowed origins
const allowedOrigins = [
  "https://budget-allocation-o58h.onrender.com", 
  "https://next-auro.vercel.app"
];

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins list
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true  // Allow cookies/credentials
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Gracefully shut down the server if DB connection fails
  });

// Routes
app.use('/api', budgetRouter);

const path = require("path");

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
