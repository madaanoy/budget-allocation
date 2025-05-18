require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const budgetRouter = require("./router/routes");

const app = express();

// List of allowed origins
const allowedOrigins = [
  "https://budget-allocation.onrender.com", 
  "https://next-auro.vercel.app",
   "https://fams-m6yv.onrender.com"
];

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use('/api', budgetRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));