const mongoose = require("mongoose");
const stdRentBookSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  booksId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
  },
  addQuantity: {
    type: Number,
    required: true,
  },
  adminApprove: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
  },
});
module.exports = new mongoose.model("stdRended", stdRentBookSchema);
