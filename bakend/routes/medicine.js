const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/medicines/add
router.post("/add", async (req, res) => {
  const { userId, medicine } = req.body;

  if (!userId || !medicine) {
    return res.status(400).json({ error: "Missing userId or medicine data" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.medicines.push(medicine);
    await user.save();

    res.status(201).json({ message: "Medicine added successfully", medicine });
  } catch (err) {
    console.error("Add medicine error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
