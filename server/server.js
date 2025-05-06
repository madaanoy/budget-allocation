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

// Serve static files from React build
const clientBuildPath = path.join(__dirname, "client", "build");
app.use(express.static(clientBuildPath));

// For any routes not handled by Express (e.g. React Router paths)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});


app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));