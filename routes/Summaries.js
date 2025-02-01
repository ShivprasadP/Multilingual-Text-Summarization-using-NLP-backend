const express = require("express");
const router = express.Router();
const Summary = require("../models/Summary");

// Middleware to get a summary by ID
async function getSummary(req, res, next) {
  let summary;
  try {
    summary = await Summary.findById(req.params.id);
    if (summary == null) {
      return res.status(404).json({ message: "Summary not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.summary = summary;
  next();
}

// Add a new summary
router.post("/", async (req, res) => {
  const { email, text, inputLanguage, outputLanguage, summary } = req.body;
  const newSummary = new Summary({
    email,
    text,
    inputLanguage,
    outputLanguage,
    summary,
  });
  try {
    const savedSummary = await newSummary.save();
    res.status(201).json(savedSummary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all summaries
router.get("/", async (req, res) => {
  try {
    const summaries = await Summary.find();
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get summaries by email
router.get("/user/:email", async (req, res) => {
  try {
    const summaries = await Summary.find({ email: req.params.email });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific summary
router.get("/:id", getSummary, (req, res) => {
  res.json(res.summary);
});

// Update a summary
router.put("/:id", async (req, res) => {
  const { text, summary, inputLanguage, outputLanguage } = req.body;

  try {
    const updatedSummary = await Summary.findByIdAndUpdate(
      req.params.id,
      {
        text,
        summary,
        inputLanguage,
        outputLanguage,
        last_update_date: new Date(),
      },
      { new: true }
    );

    if (updatedSummary == null) {
      return res.status(404).json({ message: "Summary not found" });
    }

    res.json(updatedSummary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove a summary
router.delete("/:id", async (req, res) => {
  try {
    const summary = await Summary.findByIdAndDelete(req.params.id);
    if (summary == null) {
      return res.status(404).json({ message: "Summary not found" });
    }
    res.json({ message: "Summary deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
