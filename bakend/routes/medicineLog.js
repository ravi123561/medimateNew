const express = require("express");
const router = express.Router();
const MedicineLog = require("../models/MedicineLog");

// ✅ Save Taken/Missed status
router.post("/medicine-status", async (req, res) => {
  const { userId, medicineName, doseTime, status } = req.body;

  try {
    const log = new MedicineLog({ userId, medicineName, doseTime, status });
    await log.save();
    res.status(201).json({ message: "Log saved successfully" });
  } catch (err) {
    console.error("Save log error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all logs for a user
router.get("/medicine-status/:userId", async (req, res) => {
  try {
    const logs = await MedicineLog.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    console.error("Fetch logs error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
