const mongoose = require("mongoose");
const stdRentBookSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    booksId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
    addedQuantity: {
      type: Number,
      required: true,
    },
    adminApprove: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    returnBook: {
      type: String,
      enum: ["pending", "approved", "onRent", "rejected"],
      default: "pending",
    },
    approvedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("stdRended", stdRentBookSchema);
