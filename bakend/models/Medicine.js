const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  dosage: String,
  frequency: String,
  startDate: Date,
  endDate: Date,
  taken: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);
