const mongoose = require("mongoose");

const medicineLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medicineName: { type: String, required: true },
  doseTime: { type: Date, required: true },
  status: { type: String, enum: ["taken", "missed"], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MedicineLog", medicineLogSchema);
