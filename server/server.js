require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const budgetRouter = require("./router/routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://budget-allocation.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Optional
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);  // Optional: gracefully shutdown server if DB connection fails
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
