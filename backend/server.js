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
    urlToImage: String,
    description: String,
    college: String,
  })
);

// Routes
app.post("/news", async (req, res) => {
  const { title, urlToImage, description, college } = req.body;
  const newItem = new Item({
    title,
    urlToImage,
    description,
    college,
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
// DELETE Route for Deleting an Item by ID
app.delete("/news/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const deletedItem = await Item.findByIdAndDelete(id); // Attempt to find and delete the item by ID

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found." }); // Item not found
    }

    res.json({ message: "Item deleted successfully.", deletedItem }); // Respond with success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Server error occurred
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
