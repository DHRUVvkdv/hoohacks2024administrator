require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    // Step 2: Use the CORS middleware
    origin: "http://localhost:3001", // This allows only your React app to make requests to the server
  })
);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://dhruvvarshneyemail:hoohacks2024@hoohacks2024.otyt9ir.mongodb.net/bytes",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Model
const Item = mongoose.model(
  "SchoolNews",
  new mongoose.Schema({
    title: String,
    imageUrl: String,
    description: String,
  })
);

// Routes
app.post("/news", async (req, res) => {
  const { title, imageUrl, description } = req.body;
  const newItem = new Item({
    title,
    imageUrl,
    description,
  });
  try {
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/news", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
