const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/vite_app")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define a schema and model
const NameSchema = new mongoose.Schema({
  name: { type: String,
  required: true },
});
const Name = mongoose.model("Name", NameSchema);

// API route to save a name
app.post("/api/names", async (req, res) => {
  try {
    const { name } = req.body;
    const newName = new Name({ name });
    await newName.save();
    res.status(201).json({ message: "Name saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving name", error });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
