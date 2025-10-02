const express = require("express");
const MedicineDose = require("../models/MedicineDose"); // tumhara schema

const router = express.Router();

// 📌 Update medicine dose status
router.post("/medicine-status", async (req, res) => {
  try {
    const { doseId, userId, status } = req.body;

    if (!doseId || !userId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Update dose status in DB
    const updatedDose = await MedicineDose.findByIdAndUpdate(
      doseId,
      {
        status, // "taken" ya "missed"
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedDose) {
      return res.status(404).json({ message: "Dose not found" });
    }

    res.json({ message: "Status updated successfully", dose: updatedDose });
  } catch (error) {
    console.error("❌ Error updating medicine status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
