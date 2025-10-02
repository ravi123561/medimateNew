const mongoose = require("mongoose");

const MedicineDoseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // user model ka reference
    required: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  doseTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "taken", "missed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Jab bhi document update ho, `updatedAt` ko refresh karo
MedicineDoseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("MedicineDose", MedicineDoseSchema);
