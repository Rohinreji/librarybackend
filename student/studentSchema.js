const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: Object,
    required: true,
  },
  isActive: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
  },
});

module.exports = new mongoose.model("student", studentSchema);
