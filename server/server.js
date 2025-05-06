require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const budgetRouter = require("./router/routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Routes
app.use('/api', budgetRouter);

const path = require("path");

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));